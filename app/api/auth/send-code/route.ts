import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json()

    if (!email || !type) {
      return NextResponse.json({ success: false, message: "Email and type are required" }, { status: 400 })
    }

    // For signin, check if user exists
    if (type === "signin") {
      const existingUser = await db.getUserByEmail(email)
      if (!existingUser) {
        return NextResponse.json(
          { success: false, message: "No account found with this email address" },
          { status: 404 },
        )
      }
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store verification code in database
    await db.saveVerificationCode(email, { code, expires, type, email })

    // Get user info for personalized email
    const user = await db.getUserByEmail(email)
    const firstName = user?.firstName

    // Send verification email
    const emailSent = await emailService.sendVerificationCode({
      email,
      code,
      type,
      firstName,
    })

    if (emailSent) {
      console.log(`📧 Verification code sent to ${email}: ${code}`)
      return NextResponse.json({
        success: true,
        message: "Verification code sent successfully to your email",
      })
    } else {
      // Fallback: log to console if email fails
      console.log(`📧 Email failed, verification code for ${email}: ${code}`)
      return NextResponse.json({
        success: true,
        message: "Verification code generated (check console in development)",
      })
    }
  } catch (error) {
    console.error("Send code error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
