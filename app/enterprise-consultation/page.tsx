"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, Video, Phone, MapPin, CheckCircle, DollarSign, ArrowLeft, X } from "lucide-react"
import { format, addDays, isAfter, isBefore } from "date-fns"

const enterpriseServices = [
  {
    id: "custom-development",
    name: "Custom Development",
    description: "Tailored software solutions for your specific business needs",
  },
  {
    id: "cloud-infrastructure",
    name: "Cloud Infrastructure",
    description: "Scalable cloud solutions and migration services",
  },
  {
    id: "data-analytics",
    name: "Advanced Data Analytics",
    description: "Business intelligence and data-driven insights",
  },
  {
    id: "ai-integration",
    name: "AI Integration",
    description: "Custom AI solutions and automation",
  },
  {
    id: "enterprise-support",
    name: "24/7 Enterprise Support",
    description: "Dedicated support team and account management",
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    description: "Complete business digitalization strategy",
  },
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

const meetingTypes = [
  {
    id: "video-call",
    name: "Video Call",
    icon: Video,
    description: "Meet via Google Meet or Zoom",
  },
  {
    id: "phone-call",
    name: "Phone Call",
    icon: Phone,
    description: "Traditional phone conversation",
  },
  {
    id: "in-person",
    name: "In Person",
    icon: MapPin,
    description: "Meet at our office in Indore",
  },
]

export default function EnterpriseConsultation() {
  const [step, setStep] = useState(1)
  const [paymentStep, setPaymentStep] = useState(0) // 0: not started, 1: payment options, 2: processing, 3: success, 4: failed
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: "",
    bankAccount: "",
    ifscCode: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [meetingType, setMeetingType] = useState<string>("video-call")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    companySize: "",
    budget: "",
    timeline: "",
    requirements: "",
    currentChallenges: "",
    goals: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const isDateUnavailable = (date: Date) => {
    return isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 60))
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleSubmit = async () => {
    setPaymentStep(1) // Show payment options
  }

  const handlePayment = async () => {
    setPaymentStep(2) // Processing payment
    setIsSubmitting(true)

    try {
      const paymentPayload = {
        amount: 99,
        currency: "USD",
        paymentMethod: selectedPaymentMethod,
        paymentData,
        consultationData: {
          type: "enterprise-consultation",
          services: selectedServices,
          date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
          time: selectedTime,
          meetingType,
          customerInfo,
          fee: 99,
          createdAt: new Date().toISOString(),
        },
      }

      // Simulate payment processing
      const response = await fetch("/api/payment/process-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentPayload),
      })

      const result = await response.json()

      if (result.success) {
        setPaymentStep(3) // Payment successful
        setIsBooked(true)
      } else {
        setPaymentStep(4) // Payment failed
      }
    } catch (error) {
      console.error("Payment failed:", error)
      setPaymentStep(4) // Payment failed
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isBooked && paymentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
              <CardDescription>
                Thank you for your payment. Your enterprise consultation has been confirmed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-800">✅ Payment Confirmed</h3>
                <p className="text-sm text-green-700">
                  Payment of $99 has been successfully processed using{" "}
                  {selectedPaymentMethod === "card"
                    ? "Credit/Debit Card"
                    : selectedPaymentMethod === "upi"
                      ? "UPI"
                      : "Bank Transfer"}
                  .
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Consultation Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Date:</strong> {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : ""}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTime}
                  </p>
                  <p>
                    <strong>Duration:</strong> 60 minutes
                  </p>
                  <p>
                    <strong>Meeting Type:</strong> {meetingTypes.find((t) => t.id === meetingType)?.name}
                  </p>
                  <p>
                    <strong>Consultation Fee:</strong> $99 (Paid)
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800">📧 Email Confirmation Sent</h3>
                <p className="text-sm text-blue-700">
                  A detailed confirmation email with meeting details, payment receipt, and next steps has been sent to{" "}
                  <strong>{customerInfo.email}</strong>
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Our enterprise team will contact you within 24 hours to confirm final details and send meeting links.
                </p>
                <p className="text-sm text-muted-foreground">
                  For any questions, contact us at <strong>info@zenbourg.onmicrosoft.com</strong> or{" "}
                  <strong>+91 7772828027</strong>
                </p>
              </div>

              <Button onClick={() => (window.location.href = "/")} className="w-full">
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => (window.location.href = "/")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Button>
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              Enterprise Consultation
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Schedule Your Enterprise Consultation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Book a comprehensive 60-minute consultation with our enterprise team to discuss your custom requirements
              and digital transformation needs.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold">$99 Consultation Fee</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold">60 Minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-purple-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Services of Interest</CardTitle>
              <CardDescription>Choose the enterprise services you'd like to discuss (select multiple)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {enterpriseServices.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedServices.includes(service.id)
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                      />
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={() => setStep(2)} disabled={selectedServices.length === 0} className="bg-purple-600">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Company Information */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Tell us about your organization and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position/Title *</Label>
                  <Input
                    id="position"
                    value={customerInfo.position}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, position: e.target.value })}
                    placeholder="CTO, VP Engineering, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={customerInfo.company}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                    placeholder="Your Company Inc."
                  />
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <RadioGroup
                    value={customerInfo.companySize}
                    onValueChange={(value) => setCustomerInfo({ ...customerInfo, companySize: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50-200" id="size1" />
                      <Label htmlFor="size1">50-200 employees</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="200-1000" id="size2" />
                      <Label htmlFor="size2">200-1000 employees</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1000+" id="size3" />
                      <Label htmlFor="size3">1000+ employees</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Estimated Budget Range</Label>
                  <Input
                    id="budget"
                    value={customerInfo.budget}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, budget: e.target.value })}
                    placeholder="$50K - $500K"
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <Input
                    id="timeline"
                    value={customerInfo.timeline}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, timeline: e.target.value })}
                    placeholder="3-6 months"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Detailed Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={customerInfo.requirements}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, requirements: e.target.value })}
                  placeholder="Describe your specific requirements, technical needs, and project scope..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="challenges">Current Challenges</Label>
                <Textarea
                  id="challenges"
                  value={customerInfo.currentChallenges}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, currentChallenges: e.target.value })}
                  placeholder="What challenges is your organization currently facing?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="goals">Business Goals</Label>
                <Textarea
                  id="goals"
                  value={customerInfo.goals}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, goals: e.target.value })}
                  placeholder="What are your main business objectives for this project?"
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={
                    !customerInfo.name ||
                    !customerInfo.email ||
                    !customerInfo.phone ||
                    !customerInfo.company ||
                    !customerInfo.requirements
                  }
                  className="bg-purple-600"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Date & Time Selection */}
        {step === 3 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred consultation date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateUnavailable}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Time & Meeting Type</CardTitle>
                <CardDescription>Choose your preferred time and meeting format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedDate && (
                  <>
                    <div>
                      <Label className="text-base font-semibold">Available Times</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={selectedTime === time ? "bg-purple-600" : ""}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Meeting Type</Label>
                      <RadioGroup value={meetingType} onValueChange={setMeetingType} className="mt-2">
                        {meetingTypes.map((type) => {
                          const IconComponent = type.icon
                          return (
                            <div key={type.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={type.id} id={type.id} />
                              <Label htmlFor={type.id} className="flex items-center space-x-2 cursor-pointer">
                                <IconComponent className="w-4 h-4" />
                                <span>{type.name}</span>
                                <span className="text-sm text-muted-foreground">- {type.description}</span>
                              </Label>
                            </div>
                          )
                        })}
                      </RadioGroup>
                    </div>

                    {selectedTime && (
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setStep(2)}>
                          Back
                        </Button>
                        <Button onClick={() => setStep(4)} className="bg-purple-600">
                          Continue
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Review & Payment Options */}
        {step === 4 && paymentStep === 0 && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Existing consultation summary card */}
            <Card>
              <CardHeader>
                <CardTitle>Consultation Summary</CardTitle>
                <CardDescription>Review your consultation details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Enterprise Consultation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {selectedDate ? format(selectedDate, "EEEE, MMMM dd, yyyy") : ""}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedTime} (60 minutes)
                    </div>
                    <div className="flex items-center">
                      {meetingTypes.find((t) => t.id === meetingType)?.icon && (
                        <>
                          {(() => {
                            const IconComponent = meetingTypes.find((t) => t.id === meetingType)!.icon
                            return <IconComponent className="w-4 h-4 mr-2" />
                          })()}
                          {meetingTypes.find((t) => t.id === meetingType)?.name}
                        </>
                      )}
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-lg font-bold text-purple-600">Consultation Fee: $99</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Selected Services</h4>
                  <div className="space-y-1">
                    {selectedServices.map((serviceId) => {
                      const service = enterpriseServices.find((s) => s.id === serviceId)
                      return (
                        <div key={serviceId} className="text-sm">
                          • {service?.name}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Company Details</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Company:</strong> {customerInfo.company}
                    </p>
                    <p>
                      <strong>Contact:</strong> {customerInfo.name} ({customerInfo.position})
                    </p>
                    <p>
                      <strong>Size:</strong> {customerInfo.companySize}
                    </p>
                    <p>
                      <strong>Budget:</strong> {customerInfo.budget}
                    </p>
                    <p>
                      <strong>Timeline:</strong> {customerInfo.timeline}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Book?</CardTitle>
                <CardDescription>Proceed to payment to confirm your consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-800">What's Included</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 60-minute consultation with enterprise specialists</li>
                    <li>• Detailed requirements analysis</li>
                    <li>• Custom solution recommendations</li>
                    <li>• Project timeline and budget estimation</li>
                    <li>• Technical architecture overview</li>
                    <li>• Next steps and implementation plan</li>
                  </ul>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="bg-purple-600 flex-1">
                    Proceed to Payment ($99)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payment Step 1: Payment Options */}
        {paymentStep === 1 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method for the $99 consultation fee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Credit/Debit Card */}
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === "card"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("card")}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      💳
                    </div>
                    <h3 className="font-semibold">Credit/Debit Card</h3>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                  </div>
                </div>

                {/* UPI */}
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === "upi"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("upi")}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      📱
                    </div>
                    <h3 className="font-semibold">UPI Payment</h3>
                    <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                  </div>
                </div>

                {/* Bank Transfer */}
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === "bank"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("bank")}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      🏦
                    </div>
                    <h3 className="font-semibold">Bank Transfer</h3>
                    <p className="text-sm text-muted-foreground">Direct bank transfer</p>
                  </div>
                </div>
              </div>

              {/* Payment Form based on selected method */}
              {selectedPaymentMethod === "card" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">Card Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === "upi" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">UPI Details</h4>
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@paytm"
                      value={paymentData.upiId}
                      onChange={(e) => setPaymentData({ ...paymentData, upiId: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {selectedPaymentMethod === "bank" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">Bank Transfer Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankAccount">Account Number</Label>
                      <Input
                        id="bankAccount"
                        placeholder="1234567890"
                        value={paymentData.bankAccount}
                        onChange={(e) => setPaymentData({ ...paymentData, bankAccount: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        placeholder="SBIN0001234"
                        value={paymentData.ifscCode}
                        onChange={(e) => setPaymentData({ ...paymentData, ifscCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setPaymentStep(0)}>
                  Back to Review
                </Button>
                <Button onClick={handlePayment} disabled={!selectedPaymentMethod} className="bg-purple-600 flex-1">
                  Pay $99 & Book Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Step 2: Processing */}
        {paymentStep === 2 && (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Processing Payment...</h3>
              <p className="text-muted-foreground">Please wait while we process your payment securely.</p>
            </CardContent>
          </Card>
        )}

        {/* Payment Step 4: Payment Failed */}
        {paymentStep === 4 && (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-red-600">Payment Unsuccessful</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't process your payment. Please check your payment details and try again.
              </p>
              <div className="space-y-2">
                <Button onClick={() => setPaymentStep(1)} className="bg-purple-600">
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/")}>
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
