"use server"

import { type NextRequest, NextResponse } from "next/server"

interface AppointmentData {
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  date: string
  time: string
  duration: number
  meetingType: "video-call" | "phone-call" | "in-person"
  type: "consultation" | "meeting" | "demo" | "support"
  location?: string
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const appointmentData: AppointmentData = body

    // Generate appointment ID
    const appointmentId = `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create appointment record
    const appointment = {
      id: appointmentId,
      ...appointmentData,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In production, save to database
    console.log("New appointment created:", appointment)

    // Send confirmation email (in production)
    await sendAppointmentConfirmation(appointment)

    // Send notification to admin (in production)
    await sendAdminNotification(appointment)

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully!",
      appointmentId,
      appointment,
    })
  } catch (error) {
    console.error("Appointment booking error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to book appointment. Please try again." },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const service = searchParams.get("service")

    // In production, fetch from database
    const appointments = [
      // Mock data for available time slots
    ]

    // Get available time slots for the date
    const availableSlots = getAvailableTimeSlots(date)

    return NextResponse.json({
      success: true,
      appointments,
      availableSlots,
    })
  } catch (error) {
    console.error("Failed to fetch appointments:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { appointmentId, status, ...updateData } = body

    // In production, update in database
    const updatedAppointment = {
      id: appointmentId,
      ...updateData,
      status,
      updatedAt: new Date().toISOString(),
    }

    console.log("Appointment updated:", updatedAppointment)

    // Send status update email if needed
    if (status === "confirmed" || status === "cancelled") {
      await sendStatusUpdateEmail(updatedAppointment)
    }

    return NextResponse.json({
      success: true,
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    })
  } catch (error) {
    console.error("Appointment update error:", error)
    return NextResponse.json({ success: false, message: "Failed to update appointment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const appointmentId = searchParams.get("id")

    if (!appointmentId) {
      return NextResponse.json({ success: false, message: "Appointment ID is required" }, { status: 400 })
    }

    // In production, delete from database
    console.log("Appointment deleted:", appointmentId)

    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully",
    })
  } catch (error) {
    console.error("Appointment deletion error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete appointment" }, { status: 500 })
  }
}

// Helper functions
async function sendAppointmentConfirmation(appointment: any) {
  // In production, integrate with email service
  console.log("📧 Sending appointment confirmation to:", appointment.customerEmail)
  console.log("Appointment details:", {
    service: appointment.service,
    date: appointment.date,
    time: appointment.time,
    meetingType: appointment.meetingType,
  })
}

async function sendAdminNotification(appointment: any) {
  // In production, send notification to admin
  console.log("🔔 New appointment notification sent to admin")
  console.log("Customer:", appointment.customerName)
  console.log("Service:", appointment.service)
  console.log("Date/Time:", `${appointment.date} at ${appointment.time}`)
}

async function sendStatusUpdateEmail(appointment: any) {
  // In production, send status update email
  console.log("📧 Sending status update email")
  console.log("Status:", appointment.status)
  console.log("Customer:", appointment.customerEmail)
}

function getAvailableTimeSlots(date: string | null) {
  // In production, check against existing appointments
  const allSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  // Mock some unavailable slots
  const unavailableSlots = ["12:00", "12:30", "15:00"]

  return allSlots.filter((slot) => !unavailableSlots.includes(slot))
}
