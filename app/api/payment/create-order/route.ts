"use server"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, plan, customerInfo } = body

    // Simulate payment order creation
    // In production, you would integrate with Razorpay, Stripe, etc.
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const orderData = {
      id: orderId,
      amount: amount * 100, // Convert to smallest currency unit
      currency: currency || "INR",
      plan,
      customerInfo,
      status: "created",
      createdAt: new Date().toISOString(),
    }

    // Save order to database
    console.log("Payment order created:", orderData)

    return NextResponse.json({
      success: true,
      orderId,
      amount: orderData.amount,
      currency: orderData.currency,
      // In production, return payment gateway specific data
      paymentUrl: `/payment/checkout?orderId=${orderId}`,
    })
  } catch (error) {
    console.error("Payment order creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create payment order" }, { status: 500 })
  }
}
