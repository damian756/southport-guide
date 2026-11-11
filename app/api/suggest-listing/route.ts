import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { DELIVERY_EMAIL } from "@/lib/contact";
import { MAX_SHORT, buildSuggestionEmail, firstTooLong, isHoneypotFilled, logSendError, plainAddress } from "@/lib/enquiry-email";

const resend = new Resend(process.env.RESEND_API_KEY);
// Suggestions are delivered to DELIVERY_EMAIL and sent from the site's own verified domain.
const TO_EMAIL = DELIVERY_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "SouthportGuide <noreply@southportguide.co.uk>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot filled in: a bot. Answer as if sent, and send nothing.
    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true });
    }

    const { businessName, category, address, website, phone, contactName, contactEmail } = body as {
      businessName: string;
      category: string;
      address: string;
      website?: string;
      phone?: string;
      contactName: string;
      contactEmail: string;
    };

    if (!businessName?.trim() || !category?.trim() || !contactName?.trim() || !contactEmail?.trim()) {
      return NextResponse.json({ error: "Business name, category, your name and email are required." }, { status: 400 });
    }
    const replyTo = plainAddress(contactEmail);
    if (!replyTo) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (firstTooLong(
      { businessName, category, contactName, phone, address, website },
      { businessName: MAX_SHORT, category: MAX_SHORT, contactName: MAX_SHORT, phone: MAX_SHORT, address: 200, website: 300 },
    )) {
      return NextResponse.json({ error: "One of the fields is too long. Please shorten it and try again." }, { status: 400 });
    }

    const suggestion = {
      businessName: String(businessName),
      category: String(category),
      address: address ? String(address) : undefined,
      website: website ? String(website) : undefined,
      phone: phone ? String(phone) : undefined,
      contactName: String(contactName),
      contactEmail: replyTo,
    };

    try {
      const { error } = await resend.emails.send(buildSuggestionEmail(suggestion, { from: FROM_EMAIL, to: TO_EMAIL, replyTo }));
      if (error) {
        logSendError("suggest-listing", "suggestion", error);
        return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
      }
    } catch (err) {
      logSendError("suggest-listing", "suggestion", err);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logSendError("suggest-listing", "route", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
