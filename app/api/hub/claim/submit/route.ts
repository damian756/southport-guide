import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { DELIVERY_EMAIL } from "@/lib/contact";
import { buildClaimNotice, cleanSubject, escapeHtml, isHoneypotFilled, logSendError, plainAddress } from "@/lib/enquiry-email";
import { ClaimSchema } from "@/lib/claim-schema";
import { CLAIM_FORM_ERROR, claimFieldErrors } from "@/lib/claim-form";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "SouthportGuide <noreply@southportguide.co.uk>";
// The admin notice of a new claim is an enquiry: it goes to DELIVERY_EMAIL.
const ADMIN_EMAIL = DELIVERY_EMAIL;
const BASE_URL = process.env.NEXTAUTH_URL || "https://www.southportguide.co.uk";

function randomPassword(): string {
  return crypto.randomBytes(24).toString("base64url");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }

  // Honeypot filled in: a bot. Answer as if accepted; create nothing, send nothing.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: true });
  }

  // A refused field gets a plain sentence beside it (lib/claim-form.ts), never
  // an error object: the form renders `error` as text.
  const parsed = ClaimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: CLAIM_FORM_ERROR, fieldErrors: claimFieldErrors(parsed.error.issues) },
      { status: 400 }
    );
  }

  const { businessId } = parsed.data;
  const message = parsed.data.message ?? null;

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    include: { category: { select: { name: true } } },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found." }, { status: 404 });
  }

  if (business.claimed) {
    return NextResponse.json(
      { error: "This listing is already claimed." },
      { status: 400 }
    );
  }

  const existingPending = await prisma.claimRequest.findFirst({
    where: { businessId, status: "pending" },
  });

  if (existingPending) {
    return NextResponse.json(
      { error: "A claim request is already pending for this listing." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    include: { businesses: { select: { id: true, name: true } } },
  });

  // The same answer whatever the email: an email that already manages a listing is not
  // refused (that told anyone which emails own listings). The claim is stored for the
  // admin to decide, and the admin notice says which listing the email already manages.
  const alreadyManages = existingUser?.businesses.map((b) => b.name).join(", ") || null;

  const tempPassword = await bcrypt.hash(randomPassword(), 12);
  let userId: string;

  if (!existingUser) {
    const newUser = await prisma.user.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name,
        password: tempPassword,
        role: "user",
      },
    });
    userId = newUser.id;
  } else {
    // Never change an existing account from a public form: overwriting its name and
    // password let anyone lock out the owner of that email (including an admin login).
    // The account owner gets a set-password link only if the claim is approved.
    userId = existingUser.id;
  }

  await prisma.claimRequest.create({
    data: {
      businessId,
      userId,
      name: parsed.data.name,
      email: parsed.data.email,
      message,
      status: "pending",
    },
  });

  // Confirmation to claimant. The claim is stored by now, so a failed send is
  // logged (name and message only) and the claimant still sees success.
  try {
    const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: parsed.data.email,
    subject: `We've received your claim request: ${cleanSubject(business.name)}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 32px; border-radius: 8px;">
        <div style="border-bottom: 3px solid #C9A84C; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="font-size: 24px; color: #1B2E4B; margin: 0;">
            Southport<span style="color: #C9A84C;">Guide</span>.co.uk
          </h1>
          <p style="color: #666; font-size: 13px; margin: 4px 0 0;">Claim request received</p>
        </div>
        <p style="color: #1B2E4B; font-size: 16px;">Hello,</p>
        <p style="color: #444; line-height: 1.7;">
          Thanks for submitting a claim request for <strong>${escapeHtml(business.name)}</strong>.
          We reply within one working day.
        </p>
        <p style="color: #444; line-height: 1.7;">
          Once approved, you'll receive a link to set your password and access your Business Hub dashboard.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">
          SouthportGuide.co.uk. Built by <a href="https://churchtownmedia.co.uk" style="color: #C9A84C;">Churchtown Media</a>
        </p>
      </div>
    `,
    });
    if (error) logSendError("claim", "claimant confirmation", error);
  } catch (err) {
    logSendError("claim", "claimant confirmation", err);
  }

  // Notification to admin (an enquiry): to DELIVERY_EMAIL, reply-to the claimant,
  // every value escaped, and a failed send logged.
  const notice = buildClaimNotice(
    {
      businessName: business.name,
      address: `${business.address}, ${business.postcode}`,
      category: business.category.name,
      claimantName: parsed.data.name,
      claimantEmail: parsed.data.email,
      message,
      reviewUrl: `${BASE_URL}/admin/claims`,
      alreadyManages,
    },
    { from: FROM_EMAIL, to: ADMIN_EMAIL, replyTo: plainAddress(parsed.data.email) },
  );
  try {
    const { error } = await resend.emails.send(notice);
    if (error) logSendError("claim", "admin notice", error);
  } catch (err) {
    // Logged, not thrown: the claim is already stored, so the visitor sees success.
    logSendError("claim", "admin notice", err);
  }

  return NextResponse.json({ ok: true });
}
