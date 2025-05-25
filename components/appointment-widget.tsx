"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, Phone, MapPin } from "lucide-react"

interface AppointmentWidgetProps {
  className?: string
}

export default function AppointmentWidget({ className }: AppointmentWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const quickServices = [
    {
      name: "Free Consultation",
      duration: "30 min",
      icon: Video,
      description: "Discuss your project needs",
    },
    {
      name: "Website Demo",
      duration: "45 min",
      icon: Phone,
      description: "See our work examples",
    },
    {
      name: "Strategy Session",
      duration: "60 min",
      icon: MapPin,
      description: "Plan your digital strategy",
    },
  ]

  return (
    <Card className={`fixed bottom-6 right-6 w-80 z-50 shadow-lg ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">Book a Meeting</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "−" : "+"}
          </Button>
        </div>
        <CardDescription>Schedule a free consultation with our experts</CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          {quickServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => (window.location.href = "/book-appointment")}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {service.duration}
                </div>
              </div>
            )
          })}

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={() => (window.location.href = "/book-appointment")}
          >
            View All Services
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>Available Mon-Fri, 9 AM - 6 PM</p>
            <p>Response within 24 hours</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
