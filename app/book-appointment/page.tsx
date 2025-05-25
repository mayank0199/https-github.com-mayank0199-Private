"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Clock, Video, Phone, MapPin, CheckCircle } from "lucide-react"
import { format, addDays, isSameDay, isAfter, isBefore } from "date-fns"

const services = [
  {
    id: "consultation",
    name: "Free Consultation",
    duration: 30,
    price: 0,
    description: "Discuss your project requirements and get expert advice",
  },
  {
    id: "website-demo",
    name: "Website Development Demo",
    duration: 45,
    price: 0,
    description: "See examples of our work and discuss your website needs",
  },
  {
    id: "marketing-strategy",
    name: "Digital Marketing Strategy",
    duration: 60,
    price: 99,
    description: "Comprehensive marketing plan discussion",
  },
  {
    id: "design-review",
    name: "UI/UX Design Review",
    duration: 45,
    price: 79,
    description: "Review your current design or discuss new design needs",
  },
  {
    id: "seo-audit",
    name: "SEO Audit Session",
    duration: 60,
    price: 149,
    description: "Analyze your website's SEO performance",
  },
  {
    id: "ai-demo",
    name: "AI Tools Demo",
    duration: 30,
    price: 0,
    description: "Explore how AI can transform your business",
  },
]

const timeSlots = [
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
    description: "Meet at our office",
  },
]

export default function BookAppointment() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [meetingType, setMeetingType] = useState<string>("video-call")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  // Mock unavailable dates and times
  const unavailableDates = [
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 11, 31), // New Year's Eve
  ]

  const unavailableTimes = ["12:00", "12:30"] // Lunch break

  const isDateUnavailable = (date: Date) => {
    return (
      unavailableDates.some((unavailableDate) => isSameDay(date, unavailableDate)) ||
      isBefore(date, new Date()) ||
      isAfter(date, addDays(new Date(), 60))
    ) // Only allow booking up to 60 days ahead
  }

  const isTimeUnavailable = (time: string) => {
    return unavailableTimes.includes(time)
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep(2)
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const appointmentData = {
        service: selectedService,
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        time: selectedTime,
        meetingType,
        customerInfo,
        createdAt: new Date().toISOString(),
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Appointment booked:", appointmentData)
      setIsBooked(true)
    } catch (error) {
      console.error("Booking failed:", error)
      alert("Booking failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedServiceData = services.find((s) => s.id === selectedService)

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Appointment Booked Successfully!</CardTitle>
              <CardDescription>
                Your appointment has been scheduled. We'll send you a confirmation email shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Service:</strong> {selectedServiceData?.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : ""}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTime}
                  </p>
                  <p>
                    <strong>Duration:</strong> {selectedServiceData?.duration} minutes
                  </p>
                  <p>
                    <strong>Meeting Type:</strong> {meetingTypes.find((t) => t.id === meetingType)?.name}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  You'll receive a confirmation email with meeting details at <strong>{customerInfo.email}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Need to reschedule? Contact us at support@zenbourg.onmicrosoft.com
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
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Book Your Appointment
          </h1>
          <p className="text-xl text-muted-foreground">
            Schedule a consultation with our experts to discuss your project
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
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
              <CardTitle>Choose Your Service</CardTitle>
              <CardDescription>Select the service you'd like to discuss</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedService === service.id ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">
                            {service.price === 0 ? "Free" : `$${service.price}`}
                          </div>
                          <div className="text-sm text-muted-foreground">{service.duration} min</div>
                        </div>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred date</CardDescription>
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
                <CardDescription>Choose your preferred time and how you'd like to meet</CardDescription>
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
                            disabled={isTimeUnavailable(time)}
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
                        <Button variant="outline" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button onClick={handleDateTimeSelect} className="bg-purple-600">
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

        {/* Step 3: Customer Information */}
        {step === 3 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Please provide your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={customerInfo.company}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                      placeholder="Your Company"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={customerInfo.message}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, message: e.target.value })}
                    placeholder="Tell us about your project or any specific questions you have..."
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || isSubmitting}
                    className="bg-purple-600"
                  >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
                <CardDescription>Review your appointment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">{selectedServiceData?.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {selectedDate ? format(selectedDate, "EEEE, MMMM dd, yyyy") : ""}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedTime} ({selectedServiceData?.duration} minutes)
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
                      <div className="text-lg font-bold text-purple-600">
                        {selectedServiceData?.price === 0 ? "Free" : `$${selectedServiceData?.price}`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• You'll receive a confirmation email with meeting details</p>
                  <p>• For video calls, we'll send you a meeting link</p>
                  <p>• You can reschedule up to 24 hours before the appointment</p>
                  <p>• Our team will contact you if any changes are needed</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="text-sm space-y-1">
                    <p>📧 support@zenbourg.onmicrosoft.com</p>
                    <p>📞 +91 7772828027</p>
                    <p>📞 +91 8094102789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
