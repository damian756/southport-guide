import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "damian@churchtownmedia.co.uk";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "SouthportGuide <noreply@southportguide.co.uk>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: `${contactName} <${contactEmail}>`,
      subject: `[SouthportGuide] New listing suggestion: ${businessName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 32px; border-radius: 8px;">
          <div style="border-bottom: 3px solid #C9A84C; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; color: #1B2E4B; margin: 0;">
              Southport<span style="color: #C9A84C;">Guide</span><span style="color: #999; font-size: 14px;">.co.uk</span>
            </h1>
            <p style="color: #666; font-size: 13px; margin: 4px 0 0;">New business listing suggestion</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; width: 130px; vertical-align: top;">Business name</td>
              <td style="padding: 8px 0; color: #1B2E4B; font-weight: bold;">${businessName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; vertical-align: top;">Category</td>
              <td style="padding: 8px 0; color: #1B2E4B;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; vertical-align: top;">Address</td>
              <td style="padding: 8px 0; color: #1B2E4B;">${address || "Not provided"}</td>
            </tr>
            ${website ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px; vertical-align: top;">Website</td><td style="padding: 8px 0;"><a href="${website}" style="color: #C9A84C;">${website}</a></td></tr>` : ""}
            ${phone ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px; vertical-align: top;">Phone</td><td style="padding: 8px 0; color: #1B2E4B;">${phone}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; vertical-align: top;">Submitted by</td>
              <td style="padding: 8px 0; color: #1B2E4B;">${contactName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; vertical-align: top;">Contact email</td>
              <td style="padding: 8px 0;"><a href="mailto:${contactEmail}" style="color: #C9A84C;">${contactEmail}</a></td>
            </tr>
          </table>

          <p style="color: #999; font-size: 12px; text-align: center;">
            Reply directly to this email to contact ${contactName}.<br/>
            SouthportGuide.co.uk. Built by <a href="https://churchtownmedia.co.uk" style="color: #C9A84C;">Churchtown Media</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend suggest-listing error:", JSON.stringify(error));
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Suggest listing route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
