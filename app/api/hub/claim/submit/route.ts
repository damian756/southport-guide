import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { DELIVERY_EMAIL } from "@/lib/contact";
import { buildClaimNotice, cleanSubject, escapeHtml, isHoneypotFilled, logSendError, plainAddress } from "@/lib/enquiry-email";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "SouthportGuide <noreply@southportguide.co.uk>";
// The admin notice of a new claim is an enquiry: it goes to DELIVERY_EMAIL.
const ADMIN_EMAIL = DELIVERY_EMAIL;
const BASE_URL = process.env.NEXTAUTH_URL || "https://www.southportguide.co.uk";

const Schema = z.object({
  businessId: z.string().uuid(),
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255),
  message: z.string().max(2000).trim().optional(),
});

function randomPassword(): string {
  return crypto.randomBytes(24).toString("base64url");
}

export async function POST(req: Request) {
  const body = await req.json();

  // Honeypot filled in: a bot. Answer as if accepted; create nothing, send nothing.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
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
    include: { businesses: { select: { id: true } } },
  });

  if (existingUser && existingUser.businesses.length > 0) {
    return NextResponse.json(
      { error: "An account with this email already manages a listing." },
      { status: 400 }
    );
  }

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
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { name: parsed.data.name, password: tempPassword },
    });
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

  // Confirmation to claimant
  await resend.emails.send({
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
          We'll review it and get back to you by email, usually within 1–2 business days.
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
    },
    { from: FROM_EMAIL, to: ADMIN_EMAIL, replyTo: plainAddress(parsed.data.email) },
  );
  try {
    const { error } = await resend.emails.send(notice);
    if (error) logSendError("claim", "admin notice", error);
  } catch (err) {
    logSendError("claim", "admin notice", err);
    throw err;
  }

  return NextResponse.json({ ok: true });
}
