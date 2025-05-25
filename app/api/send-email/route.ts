"use server"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    // In development, log the email details
    console.log("📧 Email Details:")
    console.log("To:", to)
    console.log("Subject:", subject)
    console.log("HTML content length:", html.length)

    // In production, integrate with actual email service (SendGrid, AWS SES, etc.)
    // For now, we'll simulate successful email sending

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
