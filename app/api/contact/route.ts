import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { DELIVERY_EMAIL } from "@/lib/contact";
import {
  MAX_SHORT,
  buildAutoReply,
  buildEnquiryEmail,
  firstTooLong,
  isHoneypotFilled,
  logSendError,
  plainAddress,
} from "@/lib/enquiry-email";

const resend = new Resend(process.env.RESEND_API_KEY);
// Enquiries are delivered to DELIVERY_EMAIL and sent from the site's own verified domain.
const TO_EMAIL = DELIVERY_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "SouthportGuide <noreply@southportguide.co.uk>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot filled in: a bot. Answer as if sent, and send nothing.
    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true });
    }

    const { name, email, subject, message, businessName } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
      businessName?: string;
    };

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }
    const replyTo = plainAddress(email);
    if (!replyTo) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (firstTooLong({ name, subject, businessName }, { name: MAX_SHORT, subject: MAX_SHORT, businessName: MAX_SHORT })) {
      return NextResponse.json({ error: `Name, enquiry type and business name must be ${MAX_SHORT} characters or fewer.` }, { status: 400 });
    }
    if (message.length > 3000) {
      return NextResponse.json({ error: "Message is too long (max 3000 characters)." }, { status: 400 });
    }

    const enquiry = {
      name: String(name).trim(),
      email: replyTo,
      subject: String(subject ?? "General enquiry"),
      message: String(message),
      businessName: businessName ? String(businessName) : undefined,
    };

    try {
      const { error } = await resend.emails.send(buildEnquiryEmail(enquiry, { from: FROM_EMAIL, to: TO_EMAIL, replyTo }));
      if (error) {
        logSendError("contact", "enquiry", error);
        return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
      }
    } catch (err) {
      logSendError("contact", "enquiry", err);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    // Auto-reply to the sender, with no user-supplied text in it. A failure is
    // logged; the enquiry itself was sent.
    try {
      const { error } = await resend.emails.send(buildAutoReply({ from: FROM_EMAIL, to: replyTo }));
      if (error) logSendError("contact", "auto-reply", error);
    } catch (err) {
      logSendError("contact", "auto-reply", err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logSendError("contact", "route", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
