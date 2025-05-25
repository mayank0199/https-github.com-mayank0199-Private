"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Smartphone, Building, Globe, Shield, Zap, Check, ArrowRight, Lock } from "lucide-react"

interface PaymentProps {
  plan: {
    name: string
    price: number
    features: string[]
  }
}

export default function PaymentIntegration({ plan }: PaymentProps) {
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const handlePayment = async (method: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan.price,
          currency: "INR",
          plan: plan.name,
          customerInfo,
          paymentMethod: method,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // In production, redirect to payment gateway
        window.open(data.paymentUrl, "_blank")
      } else {
        alert("Payment initiation failed. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Google Pay, PhonePe, Paytm",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Globe,
      description: "International payments",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Shield,
      description: "Bitcoin, Ethereum",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: "wire",
      name: "Wire Transfer",
      icon: Zap,
      description: "Bank transfer",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="w-5 h-5 mr-2 text-green-600" />
              Order Summary
            </CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{plan.name} Plan</h3>
              <div className="text-3xl font-bold text-purple-600 mb-4">₹{plan.price.toLocaleString()}</div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Customer Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                />
                <Input
                  placeholder="Company (Optional)"
                  value={customerInfo.company}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                />
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-700">256-bit SSL Encrypted Payment</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
            <CardDescription>Select your preferred payment option</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon
                return (
                  <Button
                    key={method.id}
                    variant="outline"
                    className="h-auto p-4 justify-start hover:shadow-md transition-all duration-200"
                    onClick={() => handlePayment(method.id)}
                    disabled={loading || !customerInfo.name || !customerInfo.email}
                  >
                    <div className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center mr-4`}>
                      <IconComponent className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">{method.name}</div>
                      <div className="text-sm text-muted-foreground">{method.description}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </Button>
                )
              })}
            </div>

            {/* Payment Details */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3">Payment Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{plan.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>₹{Math.round(plan.price * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{Math.round(plan.price * 1.18).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <div className="text-sm space-y-1">
                <p>📧 support@zenbourg.onmicrosoft.com</p>
                <p>📞 +91 7772828027</p>
                <p>📞 +91 8094102789</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
