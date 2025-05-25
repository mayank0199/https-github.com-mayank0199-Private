"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  ArrowRight,
  Globe,
  Palette,
  Search,
  Target,
  Share2,
  TrendingUp,
  Brain,
  MousePointer,
  Cloud,
  Database,
} from "lucide-react"
import { useRouter } from "next/navigation"

const services = [
  {
    id: "website-development",
    title: "Website Development",
    icon: Globe,
    description: "Custom, responsive websites that convert visitors into customers",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading",
      "Mobile First",
      "CMS Integration",
      "E-commerce Ready",
    ],
    price: 2999,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: Palette,
    description: "Intuitive, beautiful interfaces that provide exceptional user experiences",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing", "Design Systems"],
    price: 1999,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    icon: Search,
    description: "Dominate search results with proven SEO strategies",
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Content Strategy",
      "Link Building",
      "Analytics Setup",
    ],
    price: 1499,
    color: "from-green-500 to-green-600",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Target,
    description: "Data-driven marketing campaigns that maximize ROI",
    features: [
      "PPC Campaigns",
      "Social Media Ads",
      "Email Marketing",
      "Content Marketing",
      "Conversion Optimization",
      "Analytics & Reporting",
    ],
    price: 2499,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    icon: Share2,
    description: "Build your brand presence across all major platforms",
    features: [
      "Content Creation",
      "Community Management",
      "Influencer Outreach",
      "Paid Social Campaigns",
      "Brand Monitoring",
      "Performance Analytics",
    ],
    price: 1799,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "business-scaling",
    title: "Scale Your Business",
    icon: TrendingUp,
    description: "Strategic consulting and automation for sustainable growth",
    features: [
      "Business Strategy",
      "Process Automation",
      "Team Training",
      "Performance Metrics",
      "Growth Planning",
      "Technology Integration",
    ],
    price: 3999,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    icon: Brain,
    description: "Cutting-edge AI solutions for competitive advantages",
    features: [
      "AI Chatbots",
      "Predictive Analytics",
      "Process Automation",
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
    ],
    price: 4999,
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    icon: MousePointer,
    description: "Proven systems to attract and convert high-quality leads",
    features: [
      "Landing Pages",
      "Lead Magnets",
      "Email Sequences",
      "CRM Integration",
      "Lead Scoring",
      "Conversion Tracking",
    ],
    price: 2299,
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "cloud-services",
    title: "Cloud Services",
    icon: Cloud,
    description: "Secure, scalable cloud infrastructure solutions",
    features: [
      "Cloud Migration",
      "Infrastructure Setup",
      "Security Configuration",
      "Backup Solutions",
      "Monitoring & Alerts",
      "Cost Optimization",
    ],
    price: 3499,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: Database,
    description: "Transform raw data into actionable business insights",
    features: [
      "Data Collection",
      "Dashboard Creation",
      "Predictive Modeling",
      "Business Intelligence",
      "Custom Reports",
      "Data Visualization",
    ],
    price: 3799,
    color: "from-emerald-500 to-emerald-600",
  },
]

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const router = useRouter()

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

  const proceedToPayment = () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service")
      return
    }

    const selectedServiceData = services.filter((s) => selectedServices.includes(s.id))
    localStorage.setItem("selectedServices", JSON.stringify(selectedServiceData))
    router.push("/payment")
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-purple-200 text-purple-700">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select the services you need and we'll create a custom package for your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon
            const isSelected = selectedServices.includes(service.id)

            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  isSelected ? "ring-2 ring-purple-500 shadow-lg" : ""
                }`}
                onClick={() => toggleService(service.id)}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    {isSelected && <Check className="w-6 h-6 text-purple-600" />}
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                  <div className="text-2xl font-bold text-purple-600">${service.price.toLocaleString()}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle>Selected Services Summary</CardTitle>
              <CardDescription>
                {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {selectedServices.map((serviceId) => {
                  const service = services.find((s) => s.id === serviceId)
                  return (
                    <div key={serviceId} className="flex justify-between items-center">
                      <span>{service?.title}</span>
                      <span className="font-semibold">${service?.price.toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-purple-600">${getTotalPrice().toLocaleString()}</span>
              </div>
              <Button
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={proceedToPayment}
              >
                Proceed to Payment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
