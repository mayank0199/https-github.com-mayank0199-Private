import { type NextRequest, NextResponse } from "next/server"
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

    if (storedCode.type !== "signin") {
      return NextResponse.json({ success: false, message: "Invalid verification type" }, { status: 400 })
    }

    // Get user from database
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Clean up verification code
    await db.deleteVerificationCode(email)

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || "fallback-secret-key"
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "7d" },
    )

    console.log(`✅ User signed in successfully: ${user.email}`)

    return NextResponse.json({
      success: true,
      message: "Sign in successful!",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Verify code error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
