import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"
import { db } from "@/lib/database"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ success: false, message: "Email and code are required" }, { status: 400 })
    }

    // Get verification code from database
    const storedCode = await db.getVerificationCode(email)

    if (!storedCode) {
      return NextResponse.json({ success: false, message: "No verification code found" }, { status: 404 })
    }

    if (storedCode.expires < Date.now()) {
      await db.deleteVerificationCode(email)
      return NextResponse.json({ success: false, message: "Verification code has expired" }, { status: 400 })
    }

    if (storedCode.code !== code) {
      return NextResponse.json({ success: false, message: "Invalid verification code" }, { status: 400 })
    }

    if (storedCode.type !== "signup") {
      return NextResponse.json({ success: false, message: "Invalid verification type" }, { status: 400 })
    }

    // Get pending user data
    const pendingUser = await db.getPendingUser(email)
    if (!pendingUser) {
      return NextResponse.json({ success: false, message: "No pending registration found" }, { status: 404 })
    }

    // Create the user account
    const newUser = await db.saveUser({
      email: pendingUser.email!,
      firstName: pendingUser.firstName!,
      lastName: pendingUser.lastName!,
      company: pendingUser.company,
      phone: pendingUser.phone,
      role: "user",
      emailVerified: true,
    })

    // Clean up verification code and pending user
    await db.deleteVerificationCode(email)
    await db.deletePendingUser(email)

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || "fallback-secret-key"
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      jwtSecret,
      { expiresIn: "7d" },
    )

    // Send welcome email
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`
    await emailService.sendWelcomeEmail({
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      dashboardUrl,
    })

    // Send account activation confirmation
    await emailService.sendAccountActivationEmail({
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      dashboardUrl,
    })

    console.log(`✅ User account created and activated: ${newUser.email}`)

    return NextResponse.json({
      success: true,
      message: "Email verified successfully! Account created.",
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      token,
    })
  } catch (error) {
    console.error("Verify signup error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
