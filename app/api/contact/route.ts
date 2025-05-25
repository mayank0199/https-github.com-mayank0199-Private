"use server"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, type } = body

    // Here you would typically save to your database
    // For now, we'll simulate the database save
    const contactData = {
      id: Date.now(),
      name,
      email,
      phone,
      company,
      message,
      type, // 'consultation' or 'project'
      createdAt: new Date().toISOString(),
      status: "new",
    }

    // In a real application, you would save this to your database
    console.log("New contact submission:", contactData)

    // You could also send an email notification here
    // await sendEmailNotification(contactData)

    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry! We will get back to you within 24 hours.",
      id: contactData.id,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
