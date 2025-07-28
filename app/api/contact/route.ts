import { mailOptions } from "@/lib/mail-options";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received contact form data:", body);

    // Check if required environment variables are set
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error("Missing SMTP environment variables");
      return NextResponse.json(
        { success: false, error: "Email configuration error." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return NextResponse.json(
        { success: false, error: "SMTP connection failed." },
        { status: 500 }
      );
    }

    const mailOptionsData = mailOptions(body);
    console.log("Sending email with options:", {
      to: mailOptionsData.to,
      subject: mailOptionsData.subject,
      from: mailOptionsData.from,
    });

    await transporter.sendMail(mailOptionsData);
    console.log("Email sent successfully");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Email failed to send.",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
