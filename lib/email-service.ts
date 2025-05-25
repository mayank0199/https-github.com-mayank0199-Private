// Email service for sending verification codes and notifications
// This uses SendGrid for production email delivery

interface EmailTemplate {
  to: string
  subject: string
  html: string
}

interface VerificationEmailData {
  email: string
  code: string
  type: "signin" | "signup"
  firstName?: string
}

interface WelcomeEmailData {
  email: string
  firstName: string
  lastName: string
  dashboardUrl: string
}

class EmailService {
  private apiKey: string
  private fromEmail: string

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || "demo-key"
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || "noreply@zenbourg.com"
  }

  async sendVerificationCode(data: VerificationEmailData): Promise<boolean> {
    const template = this.createVerificationTemplate(data)
    return await this.sendEmail(template)
  }

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    const template = this.createWelcomeTemplate(data)
    return await this.sendEmail(template)
  }

  async sendAccountActivationEmail(data: WelcomeEmailData): Promise<boolean> {
    const template = this.createActivationTemplate(data)
    return await this.sendEmail(template)
  }

  private createVerificationTemplate(data: VerificationEmailData): EmailTemplate {
    const { email, code, type, firstName } = data
    const isSignIn = type === "signin"

    const subject = isSignIn ? "Your Zenbourg Sign In Code" : "Welcome to Zenbourg - Verify Your Email"

    const greeting = firstName ? `Hello ${firstName}` : "Hello"

    const message = isSignIn
      ? "You requested to sign in to your Zenbourg account. Use the verification code below:"
      : "Thank you for joining Zenbourg! To complete your registration, please verify your email address with the code below:"

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
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
            background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
          }
          .logo { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 10px; 
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
            margin-bottom: 30px; 
            color: #6b7280; 
            line-height: 1.7; 
          }
          .code-container { 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); 
            border: 2px solid #e5e7eb; 
            border-radius: 12px; 
            padding: 30px; 
            text-align: center; 
            margin: 30px 0; 
          }
          .code-label { 
            font-size: 14px; 
            color: #6b7280; 
            margin-bottom: 10px; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
          }
          .code { 
            font-size: 36px; 
            font-weight: bold; 
            letter-spacing: 8px; 
            color: #7c3aed; 
            font-family: 'Courier New', monospace; 
            margin: 10px 0; 
          }
          .expiry { 
            font-size: 14px; 
            color: #ef4444; 
            margin-top: 15px; 
          }
          .security-note { 
            background: #fef3c7; 
            border-left: 4px solid #f59e0b; 
            padding: 15px; 
            margin: 25px 0; 
            border-radius: 0 8px 8px 0; 
          }
          .security-note p { 
            margin: 0; 
            font-size: 14px; 
            color: #92400e; 
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
          @media (max-width: 600px) {
            .container { margin: 10px; }
            .content { padding: 30px 20px; }
            .code { font-size: 28px; letter-spacing: 4px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚡ Zenbourg</div>
            <h1 class="header-title">${isSignIn ? "Sign In to Your Account" : "Welcome to Zenbourg!"}</h1>
          </div>
          
          <div class="content">
            <div class="greeting">${greeting},</div>
            
            <div class="message">${message}</div>
            
            <div class="code-container">
              <div class="code-label">Verification Code</div>
              <div class="code">${code}</div>
              <div class="expiry">⏰ This code will expire in 10 minutes</div>
            </div>
            
            <div class="security-note">
              <p><strong>Security Notice:</strong> If you didn't request this code, please ignore this email and contact our support team immediately.</p>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-text"><strong>Best regards,</strong></div>
            <div class="footer-text">The Zenbourg Team</div>
            
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
    `

    return { to: email, subject, html }
  }

  private createWelcomeTemplate(data: WelcomeEmailData): EmailTemplate {
    const { email, firstName, lastName, dashboardUrl } = data

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Zenbourg - Account Created Successfully!</title>
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
            font-size: 20px; 
            margin-bottom: 20px; 
            color: #374151; 
            font-weight: 600; 
          }
          .message { 
            font-size: 16px; 
            margin-bottom: 25px; 
            color: #6b7280; 
            line-height: 1.7; 
          }
          .cta-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            font-size: 16px; 
            margin: 20px 0; 
            transition: transform 0.2s; 
          }
          .cta-button:hover { 
            transform: translateY(-2px); 
          }
          .features { 
            background: #f8fafc; 
            border-radius: 8px; 
            padding: 25px; 
            margin: 25px 0; 
          }
          .features h3 { 
            color: #374151; 
            margin-top: 0; 
            margin-bottom: 15px; 
          }
          .feature-list { 
            list-style: none; 
            padding: 0; 
            margin: 0; 
          }
          .feature-list li { 
            padding: 8px 0; 
            color: #6b7280; 
            position: relative; 
            padding-left: 25px; 
          }
          .feature-list li:before { 
            content: '✅'; 
            position: absolute; 
            left: 0; 
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
          @media (max-width: 600px) {
            .container { margin: 10px; }
            .content { padding: 30px 20px; }
            .cta-button { display: block; text-align: center; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚡ Zenbourg</div>
            <div class="success-icon">🎉</div>
            <h1 class="header-title">Account Created Successfully!</h1>
          </div>
          
          <div class="content">
            <div class="greeting">Welcome ${firstName} ${lastName}!</div>
            
            <div class="message">
              Congratulations! Your Zenbourg account has been successfully created and verified. 
              You're now part of our community of forward-thinking businesses transforming their operations with cutting-edge technology.
            </div>
            
            <div style="text-align: center;">
              <a href="${dashboardUrl}" class="cta-button">Access Your Dashboard →</a>
            </div>
            
            <div class="features">
              <h3>🚀 What's Next? Here's what you can do:</h3>
              <ul class="feature-list">
                <li>Explore your personalized dashboard</li>
                <li>Book a free consultation with our experts</li>
                <li>Browse our portfolio of successful transformations</li>
                <li>Access exclusive resources and case studies</li>
                <li>Connect with our team for custom solutions</li>
                <li>Track your project progress in real-time</li>
              </ul>
            </div>
            
            <div class="message">
              Our team is excited to help you achieve your business transformation goals. 
              If you have any questions or need assistance getting started, don't hesitate to reach out!
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-text"><strong>Best regards,</strong></div>
            <div class="footer-text">The Zenbourg Team</div>
            
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
    `

    return {
      to: email,
      subject: "🎉 Welcome to Zenbourg - Account Created Successfully!",
      html,
    }
  }

  private createActivationTemplate(data: WelcomeEmailData): EmailTemplate {
    const { email, firstName, dashboardUrl } = data

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Activated - Welcome to Zenbourg!</title>
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
            background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); 
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
          .cta-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            font-size: 16px; 
            margin: 20px 0; 
            transition: transform 0.2s; 
          }
          .cta-button:hover { 
            transform: translateY(-2px); 
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
          @media (max-width: 600px) {
            .container { margin: 10px; }
            .content { padding: 30px 20px; }
            .cta-button { display: block; text-align: center; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚡ Zenbourg</div>
            <div class="success-icon">✅</div>
            <h1 class="header-title">Account Activated!</h1>
          </div>
          
          <div class="content">
            <div class="greeting">Hello ${firstName},</div>
            
            <div class="message">
              Great news! Your email has been successfully verified and your Zenbourg account is now fully activated. 
              You can now access all features and start your business transformation journey with us.
            </div>
            
            <div style="text-align: center;">
              <a href="${dashboardUrl}" class="cta-button">Go to Dashboard →</a>
            </div>
            
            <div class="message">
              Your dashboard is ready with personalized insights, project tracking, and direct access to our expert team. 
              We're here to help you every step of the way!
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-text"><strong>Best regards,</strong></div>
            <div class="footer-text">The Zenbourg Team</div>
            
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
    `

    return {
      to: email,
      subject: "✅ Account Activated - Welcome to Zenbourg!",
      html,
    }
  }

  private async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      // In development, log the email
      if (process.env.NODE_ENV === "development" || !this.apiKey || this.apiKey === "demo-key") {
        console.log("📧 Email would be sent to:", template.to)
        console.log("📧 Subject:", template.subject)
        console.log("📧 Email service not configured - check console for verification codes")
        return true
      }

      // Production email sending with SendGrid
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: template.to }],
              subject: template.subject,
            },
          ],
          from: { email: this.fromEmail, name: "Zenbourg" },
          content: [
            {
              type: "text/html",
              value: template.html,
            },
          ],
        }),
      })

      if (response.ok) {
        console.log("✅ Email sent successfully to:", template.to)
        return true
      } else {
        console.error("❌ Failed to send email:", await response.text())
        return false
      }
    } catch (error) {
      console.error("❌ Email service error:", error)
      return false
    }
  }
}

export const emailService = new EmailService()
