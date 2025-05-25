"use server"

import { type NextRequest, NextResponse } from "next/server"

interface PaymentData {
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
  upiId?: string
  bankAccount?: string
  ifscCode?: string
}

interface ConsultationData {
  type: string
  services: string[]
  date: string
  time: string
  meetingType: string
  customerInfo: {
    name: string
    email: string
    phone: string
    company: string
    position: string
    companySize: string
    budget: string
    timeline: string
    requirements: string
    currentChallenges: string
    goals: string
  }
  fee: number
  createdAt: string
}

interface PaymentPayload {
  amount: number
  currency: string
  paymentMethod: string
  paymentData: PaymentData
  consultationData: ConsultationData
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentPayload = await request.json()
    const { amount, currency, paymentMethod, paymentData, consultationData } = body

    // Simulate payment processing
    const paymentSuccess = await processPayment(paymentMethod, paymentData, amount)

    if (paymentSuccess) {
      // Generate consultation ID and payment transaction ID
      const consultationId = `CONS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Save consultation booking to database
      const consultation = {
        id: consultationId,
        ...consultationData,
        paymentStatus: "completed",
        transactionId,
        paymentMethod,
        paidAmount: amount,
        currency,
        bookedAt: new Date().toISOString(),
      }

      // In production, save to database
      console.log("Enterprise consultation booked:", consultation)

      // Send confirmation emails
      await sendConsultationConfirmationEmail(consultation)
      await sendAdminNotificationEmail(consultation)

      return NextResponse.json({
        success: true,
        message: "Payment successful and consultation booked!",
        consultationId,
        transactionId,
        consultation,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Payment failed. Please check your payment details and try again.",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json(
      { success: false, message: "Payment processing failed. Please try again." },
      { status: 500 },
    )
  }
}

async function processPayment(paymentMethod: string, paymentData: PaymentData, amount: number): Promise<boolean> {
  // Simulate payment processing with different success rates
  console.log(`Processing ${paymentMethod} payment for $${amount}`)

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate payment validation
  if (paymentMethod === "card") {
    // Basic card validation
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName) {
      return false
    }
    // Simulate 90% success rate for cards
    return Math.random() > 0.1
  } else if (paymentMethod === "upi") {
    // Basic UPI validation
    if (!paymentData.upiId || !paymentData.upiId.includes("@")) {
      return false
    }
    // Simulate 95% success rate for UPI
    return Math.random() > 0.05
  } else if (paymentMethod === "bank") {
    // Basic bank transfer validation
    if (!paymentData.bankAccount || !paymentData.ifscCode) {
      return false
    }
    // Simulate 85% success rate for bank transfers
    return Math.random() > 0.15
  }

  return false
}

async function sendConsultationConfirmationEmail(consultation: any) {
  const { customerInfo, date, time, meetingType, services, transactionId, paidAmount } = consultation

  const serviceNames = services
    .map((serviceId: string) => {
      const serviceMap: Record<string, string> = {
        "custom-development": "Custom Development",
        "cloud-infrastructure": "Cloud Infrastructure",
        "data-analytics": "Advanced Data Analytics",
        "ai-integration": "AI Integration",
        "enterprise-support": "24/7 Enterprise Support",
        "digital-transformation": "Digital Transformation",
      }
      return serviceMap[serviceId] || serviceId
    })
    .join(", ")

  const meetingTypeMap: Record<string, string> = {
    "video-call": "Video Call (Google Meet/Zoom)",
    "phone-call": "Phone Call",
    "in-person": "In-Person Meeting",
  }

  const emailTemplate = {
    to: customerInfo.email,
    subject: "🎉 Enterprise Consultation Confirmed - Payment Successful",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enterprise Consultation Confirmed</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
          }
          .logo { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 10px; 
          }
          .success-icon { 
            font-size: 48px; 
            margin-bottom: 15px; 
          }
          .header-title { 
            font-size: 24px; 
            margin: 0; 
            font-weight: 600; 
          }
          .content { 
            padding: 40px 30px; 
          }
          .greeting { 
            font-size: 18px; 
            margin-bottom: 20px; 
            color: #374151; 
          }
          .message { 
            font-size: 16px; 
            margin-bottom: 25px; 
            color: #6b7280; 
            line-height: 1.7; 
          }
          .details-card { 
            background: #f8fafc; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            padding: 20px; 
            margin: 20px 0; 
          }
          .details-card h3 { 
            color: #374151; 
            margin-top: 0; 
            margin-bottom: 15px; 
            font-size: 18px; 
          }
          .detail-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 8px 0; 
            border-bottom: 1px solid #e5e7eb; 
          }
          .detail-row:last-child { 
            border-bottom: none; 
          }
          .detail-label { 
            font-weight: 600; 
            color: #374151; 
          }
          .detail-value { 
            color: #6b7280; 
          }
          .payment-success { 
            background: #dcfce7; 
            border: 1px solid #bbf7d0; 
            border-radius: 8px; 
            padding: 15px; 
            margin: 20px 0; 
            text-align: center; 
          }
          .payment-success h4 { 
            color: #166534; 
            margin: 0 0 5px 0; 
          }
          .payment-success p { 
            color: #15803d; 
            margin: 0; 
            font-size: 14px; 
          }
          .next-steps { 
            background: #dbeafe; 
            border: 1px solid #bfdbfe; 
            border-radius: 8px; 
            padding: 20px; 
            margin: 20px 0; 
          }
          .next-steps h4 { 
            color: #1e40af; 
            margin-top: 0; 
          }
          .next-steps ul { 
            color: #1e40af; 
            margin: 0; 
            padding-left: 20px; 
          }
          .footer { 
            background: #f9fafb; 
            padding: 30px; 
            text-align: center; 
            border-top: 1px solid #e5e7eb; 
          }
          .footer-text { 
            font-size: 14px; 
            color: #6b7280; 
            margin: 5px 0; 
          }
          .contact-info { 
            margin-top: 20px; 
          }
          .contact-info a { 
            color: #7c3aed; 
            text-decoration: none; 
            margin: 0 10px; 
          }
          .contact-info a:hover { 
            text-decoration: underline; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚡ Zenbourg</div>
            <div class="success-icon">✅</div>
            <h1 class="header-title">Consultation Confirmed!</h1>
          </div>
          
          <div class="content">
            <div class="greeting">Hello ${customerInfo.name},</div>
            
            <div class="message">
              Excellent! Your enterprise consultation has been successfully booked and your payment has been processed. 
              We're excited to discuss your ${customerInfo.company}'s digital transformation journey.
            </div>

            <div class="payment-success">
              <h4>💳 Payment Successful</h4>
              <p>Transaction ID: ${transactionId} | Amount: $${paidAmount}</p>
            </div>
            
            <div class="details-card">
              <h3>📅 Consultation Details</h3>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${time} (60 minutes)</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Meeting Type:</span>
                <span class="detail-value">${meetingTypeMap[meetingType] || meetingType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Services Discussed:</span>
                <span class="detail-value">${serviceNames}</span>
              </div>
            </div>

            <div class="details-card">
              <h3>🏢 Company Information</h3>
              <div class="detail-row">
                <span class="detail-label">Company:</span>
                <span class="detail-value">${customerInfo.company}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Contact Person:</span>
                <span class="detail-value">${customerInfo.name} (${customerInfo.position})</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Company Size:</span>
                <span class="detail-value">${customerInfo.companySize} employees</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Budget Range:</span>
                <span class="detail-value">${customerInfo.budget}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Timeline:</span>
                <span class="detail-value">${customerInfo.timeline}</span>
              </div>
            </div>

            <div class="next-steps">
              <h4>🚀 What Happens Next?</h4>
              <ul>
                <li>Our enterprise team will contact you within 24 hours</li>
                <li>We'll send meeting links and preparation materials</li>
                <li>Review your requirements and prepare custom recommendations</li>
                <li>During the call, we'll discuss solutions, timeline, and next steps</li>
                <li>If you proceed with a project, the $99 fee will be credited to your invoice</li>
              </ul>
            </div>

            <div class="message">
              If you need to reschedule or have any questions before the consultation, 
              please don't hesitate to contact our team.
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-text"><strong>Best regards,</strong></div>
            <div class="footer-text">The Zenbourg Enterprise Team</div>
            
            <div class="contact-info">
              <a href="mailto:info@zenbourg.onmicrosoft.com">info@zenbourg.onmicrosoft.com</a>
              <a href="tel:+917772828027">+91 7772828027</a>
              <a href="tel:+918094102789">+91 8094102789</a>
            </div>
            
            <div class="footer-text" style="margin-top: 20px; font-size: 12px;">
              105, Ab Rd, Sector C, Slice 5, Part 2, Shalimar Township<br>
              Indore, Madhya Pradesh 452010, India
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  // Send email using the email service
  try {
    await fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailTemplate),
    })
    console.log("✅ Consultation confirmation email sent to:", customerInfo.email)
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error)
  }
}

async function sendAdminNotificationEmail(consultation: any) {
  const { customerInfo, date, time, services, transactionId, paidAmount } = consultation

  const adminEmailTemplate = {
    to: "info@zenbourg.onmicrosoft.com",
    subject: `🎯 New Enterprise Consultation Booked - ${customerInfo.company}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Enterprise Consultation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #7c3aed; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .detail { margin: 10px 0; }
          .highlight { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎯 New Enterprise Consultation Booked</h2>
          </div>
          <div class="content">
            <div class="highlight">
              <strong>💰 Payment Confirmed:</strong> $${paidAmount} | Transaction: ${transactionId}
            </div>
            
            <h3>📅 Consultation Details</h3>
            <div class="detail"><strong>Date:</strong> ${date}</div>
            <div class="detail"><strong>Time:</strong> ${time}</div>
            <div class="detail"><strong>Services:</strong> ${services.join(", ")}</div>
            
            <h3>🏢 Company Information</h3>
            <div class="detail"><strong>Company:</strong> ${customerInfo.company}</div>
            <div class="detail"><strong>Contact:</strong> ${customerInfo.name} (${customerInfo.position})</div>
            <div class="detail"><strong>Email:</strong> ${customerInfo.email}</div>
            <div class="detail"><strong>Phone:</strong> ${customerInfo.phone}</div>
            <div class="detail"><strong>Company Size:</strong> ${customerInfo.companySize}</div>
            <div class="detail"><strong>Budget:</strong> ${customerInfo.budget}</div>
            <div class="detail"><strong>Timeline:</strong> ${customerInfo.timeline}</div>
            
            <h3>📋 Requirements</h3>
            <div class="detail">${customerInfo.requirements}</div>
            
            <h3>🎯 Goals</h3>
            <div class="detail">${customerInfo.goals}</div>
            
            <h3>⚠️ Challenges</h3>
            <div class="detail">${customerInfo.currentChallenges}</div>
            
            <div class="highlight">
              <strong>Action Required:</strong> Contact the client within 24 hours to confirm meeting details.
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminEmailTemplate),
    })
    console.log("✅ Admin notification email sent")
  } catch (error) {
    console.error("❌ Failed to send admin notification:", error)
  }
}
