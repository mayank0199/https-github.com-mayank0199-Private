import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, phone } = await request.json()

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, message: "First name, last name, and email are required" },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists" },
        { status: 409 },
      )
    }

    // Store user data temporarily (will be saved permanently after email verification)
    const pendingUserData = {
      firstName,
      lastName,
      email,
      company: company || "",
      phone: phone || "",
      role: "user" as const,
      emailVerified: false,
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store verification code and pending user data
    await db.saveVerificationCode(email, { code, expires, type: "signup", email })
    await db.savePendingUser(email, pendingUserData)

    // Send welcome email with verification code
    await sendWelcomeEmail(email, firstName, code)

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

async function sendWelcomeEmail(email: string, firstName: string, code: string) {
  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Zenbourg - Verify Your Email</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f8fafc;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); 
          color: white; 
          padding: 40px 30px; 
          text-align: center; 
        }
        .logo { 
          font-size: 28px; 
          font-weight: bold; 
          margin-bottom: 10px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px;
        }
        .content { 
          padding: 40px 30px; 
        }
        .welcome-title { 
          font-size: 24px; 
          font-weight: bold; 
          color: #1f2937; 
          margin-bottom: 20px; 
        }
        .code-section { 
          background: #f8fafc; 
          border: 2px solid #e2e8f0; 
          border-radius: 12px; 
          padding: 30px; 
          text-align: center; 
          margin: 30px 0; 
        }
        .code { 
          font-size: 36px; 
          font-weight: bold; 
          letter-spacing: 8px; 
          color: #7c3aed; 
          font-family: 'Courier New', monospace; 
          background: white; 
          padding: 15px 25px; 
          border-radius: 8px; 
          display: inline-block; 
          border: 2px solid #7c3aed;
        }
        .features { 
          background: #f8fafc; 
          border-radius: 8px; 
          padding: 25px; 
          margin: 25px 0; 
        }
        .feature-list { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
        }
        .feature-item { 
          display: flex; 
          align-items: center; 
          margin-bottom: 12px; 
          font-size: 14px; 
        }
        .feature-icon { 
          color: #10b981; 
          margin-right: 10px; 
          font-weight: bold; 
        }
        .cta-button { 
          display: inline-block; 
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); 
          color: white; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: bold; 
          margin: 20px 0; 
        }
        .footer { 
          background: #f8fafc; 
          padding: 30px; 
          text-align: center; 
          border-top: 1px solid #e2e8f0; 
        }
        .contact-info { 
          margin-top: 20px; 
          font-size: 14px; 
          color: #6b7280; 
        }
        .contact-info a { 
          color: #7c3aed; 
          text-decoration: none; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">⚡ Zenbourg</div>
          <h1 style="margin: 0; font-size: 24px;">Welcome to the Future of Business!</h1>
        </div>
        
        <div class="content">
          <div class="welcome-title">Hello ${firstName}! 👋</div>
          
          <p>Welcome to <strong>Zenbourg</strong> - where innovation meets transformation! We're thrilled to have you join our community of forward-thinking businesses.</p>
          
          <p>To complete your registration and unlock your personalized dashboard, please verify your email address with the code below:</p>
          
          <div class="code-section">
            <p style="margin: 0 0 15px 0; font-weight: bold; color: #374151;">Your Verification Code</p>
            <div class="code">${code}</div>
            <p style="margin: 15px 0 0 0; font-size: 14px; color: #6b7280;">This code will expire in 10 minutes</p>
          </div>
          
          <div class="features">
            <h3 style="margin-top: 0; color: #1f2937;">What's waiting for you:</h3>
            <ul class="feature-list">
              <li class="feature-item">
                <span class="feature-icon">✓</span>
                Personalized business transformation dashboard
              </li>
              <li class="feature-item">
                <span class="feature-icon">✓</span>
                Direct access to our expert consultation team
              </li>
              <li class="feature-item">
                <span class="feature-icon">✓</span>
                Real-time project tracking and updates
              </li>
              <li class="feature-item">
                <span class="feature-icon">✓</span>
                Exclusive insights and performance analytics
              </li>
              <li class="feature-item">
                <span class="feature-icon">✓</span>
                Priority support and dedicated account management
              </li>
            </ul>
          </div>
          
          <p>Once verified, you'll have immediate access to:</p>
          <ul style="color: #4b5563;">
            <li>Your personalized business dashboard</li>
            <li>Project management tools</li>
            <li>Direct communication with our experts</li>
            <li>Comprehensive analytics and reporting</li>
          </ul>
          
          <p>If you didn't create this account, please ignore this email or contact our support team.</p>
        </div>
        
        <div class="footer">
          <p style="margin: 0; font-weight: bold; color: #1f2937;">Ready to transform your business?</p>
          <p style="margin: 10px 0; color: #6b7280;">Our team is here to help you succeed every step of the way.</p>
          
          <div class="contact-info">
            <p><strong>Get in touch:</strong></p>
            <p>
              📧 <a href="mailto:support@zenbourg.onmicrosoft.com">support@zenbourg.onmicrosoft.com</a><br>
              📞 <a href="tel:+917772828027">+91 7772828027</a><br>
              💬 Live chat available 24/7
            </p>
            <p style="margin-top: 20px; font-size: 12px;">
              © 2024 Zenbourg. All rights reserved.<br>
              Transforming businesses, one innovation at a time.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  // Log email for development
  console.log("📧 Welcome email sent to:", email)
  console.log("📧 Verification code:", code)
  console.log("📧 Email content ready for:", firstName)

  // In production, use actual email service:
  // await emailService.send({
  //   to: email,
  //   subject: "Welcome to Zenbourg - Verify Your Email",
  //   html: emailContent
  // })
}
