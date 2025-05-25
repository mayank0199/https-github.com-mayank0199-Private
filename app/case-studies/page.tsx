"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, TrendingUp, Users, DollarSign, Clock, Star, ExternalLink, Download } from "lucide-react"
import Image from "next/image"

const caseStudies = [
  {
    id: 1,
    title: "EcoFashion E-commerce Platform",
    client: "EcoFashion Inc.",
    industry: "E-commerce",
    duration: "8 months",
    teamSize: "12 developers",
    challenge:
      "EcoFashion needed a complete digital transformation to compete with major e-commerce platforms while maintaining their sustainable fashion focus.",
    solution:
      "We built a comprehensive e-commerce platform with AI-powered recommendations, sustainable product tracking, and seamless user experience across all devices.",
    image: "/images/ecofashion-cover.png",
    clientPhoto: "/images/client-ecofashion.png",
    clientName: "Emma Rodriguez",
    clientRole: "CEO, EcoFashion Inc.",
    testimonial:
      "Zenbourg transformed our vision into reality. The platform exceeded our expectations and helped us achieve 300% growth in just 6 months.",
    technologies: ["Next.js", "Stripe", "AI/ML", "PostgreSQL", "AWS"],
    results: {
      revenue: "+300%",
      users: "50K+",
      conversion: "+85%",
      performance: "99.9%",
    },
    metrics: [
      { label: "Revenue Growth", value: "300%", icon: DollarSign, color: "text-green-600" },
      { label: "New Users", value: "50,000+", icon: Users, color: "text-blue-600" },
      { label: "Conversion Rate", value: "85%", icon: TrendingUp, color: "text-purple-600" },
      { label: "Uptime", value: "99.9%", icon: Clock, color: "text-orange-600" },
    ],
    benefits: [
      "Increased online sales by 300% within 6 months",
      "Reduced cart abandonment rate by 45%",
      "Improved customer satisfaction score to 4.8/5",
      "Automated inventory management saving 20 hours/week",
      "Enhanced mobile experience leading to 60% mobile sales",
    ],
    timeline: [
      { phase: "Discovery & Planning", duration: "2 weeks", status: "completed" },
      { phase: "Design & Prototyping", duration: "4 weeks", status: "completed" },
      { phase: "Development", duration: "20 weeks", status: "completed" },
      { phase: "Testing & Launch", duration: "6 weeks", status: "completed" },
      { phase: "Post-Launch Support", duration: "Ongoing", status: "active" },
    ],
  },
  {
    id: 2,
    title: "TechInnovate SaaS Dashboard",
    client: "TechInnovate Solutions",
    industry: "Technology",
    duration: "6 months",
    teamSize: "8 developers",
    challenge:
      "TechInnovate needed a powerful analytics dashboard to help their clients visualize complex data and make informed business decisions.",
    solution:
      "We developed an advanced SaaS dashboard with real-time analytics, customizable widgets, and AI-powered insights for data-driven decision making.",
    image: "/images/techinnovate-dashboard.png",
    clientPhoto: "/images/client-techinnovate.png",
    clientName: "David Chen",
    clientRole: "CTO, TechInnovate Solutions",
    testimonial:
      "The dashboard revolutionized how our clients interact with their data. We've seen a 250% increase in user engagement and retention.",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Docker"],
    results: {
      engagement: "+250%",
      retention: "+180%",
      efficiency: "+90%",
      satisfaction: "4.9/5",
    },
    metrics: [
      { label: "User Engagement", value: "250%", icon: TrendingUp, color: "text-green-600" },
      { label: "Client Retention", value: "180%", icon: Users, color: "text-blue-600" },
      { label: "Efficiency Gain", value: "90%", icon: Clock, color: "text-purple-600" },
      { label: "Satisfaction", value: "4.9/5", icon: Star, color: "text-orange-600" },
    ],
    benefits: [
      "Increased user engagement by 250%",
      "Improved client retention rate by 180%",
      "Reduced data processing time by 90%",
      "Enhanced decision-making speed by 75%",
      "Automated reporting saving 30 hours/week",
    ],
    timeline: [
      { phase: "Requirements Analysis", duration: "2 weeks", status: "completed" },
      { phase: "UI/UX Design", duration: "3 weeks", status: "completed" },
      { phase: "Backend Development", duration: "12 weeks", status: "completed" },
      { phase: "Frontend Development", duration: "8 weeks", status: "completed" },
      { phase: "Integration & Testing", duration: "3 weeks", status: "completed" },
    ],
  },
  {
    id: 3,
    title: "LogiFlow Operations Platform",
    client: "LogiFlow Logistics",
    industry: "Logistics",
    duration: "10 months",
    teamSize: "15 developers",
    challenge:
      "LogiFlow needed to modernize their logistics operations with real-time tracking, route optimization, and automated workflow management.",
    solution:
      "We built a comprehensive logistics platform with GPS tracking, AI-powered route optimization, and automated dispatch management.",
    image: "/images/logiflow-platform.png",
    clientPhoto: "/images/client-logiflow.png",
    clientName: "Michael Johnson",
    clientRole: "Operations Director, LogiFlow",
    testimonial:
      "Zenbourg's platform transformed our operations. We've reduced delivery times by 40% and increased customer satisfaction significantly.",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Google Maps API"],
    results: {
      efficiency: "+65%",
      costs: "-40%",
      delivery: "+40%",
      accuracy: "99.5%",
    },
    metrics: [
      { label: "Operational Efficiency", value: "65%", icon: TrendingUp, color: "text-green-600" },
      { label: "Cost Reduction", value: "40%", icon: DollarSign, color: "text-blue-600" },
      { label: "Faster Delivery", value: "40%", icon: Clock, color: "text-purple-600" },
      { label: "Accuracy Rate", value: "99.5%", icon: Star, color: "text-orange-600" },
    ],
    benefits: [
      "Improved operational efficiency by 65%",
      "Reduced operational costs by 40%",
      "Faster delivery times by 40%",
      "Increased tracking accuracy to 99.5%",
      "Automated 80% of manual processes",
    ],
    timeline: [
      { phase: "System Analysis", duration: "3 weeks", status: "completed" },
      { phase: "Architecture Design", duration: "4 weeks", status: "completed" },
      { phase: "Core Development", duration: "24 weeks", status: "completed" },
      { phase: "Integration Testing", duration: "6 weeks", status: "completed" },
      { phase: "Deployment & Training", duration: "3 weeks", status: "completed" },
    ],
  },
  {
    id: 4,
    title: "HealthCare Connect Mobile App",
    client: "HealthCare Connect",
    industry: "Healthcare",
    duration: "7 months",
    teamSize: "10 developers",
    challenge:
      "HealthCare Connect needed a secure mobile platform to connect patients with healthcare providers while ensuring HIPAA compliance.",
    solution:
      "We developed a secure mobile health platform with telemedicine capabilities, appointment scheduling, and encrypted patient data management.",
    image: "/images/healthcare-app.png",
    clientPhoto: "/images/client-healthcare.png",
    clientName: "Dr. Sarah Williams",
    clientRole: "Chief Medical Officer",
    testimonial:
      "The app has revolutionized patient care delivery. We've seen 200% increase in patient engagement and improved health outcomes.",
    technologies: ["React Native", "Node.js", "MongoDB", "WebRTC", "AWS HIPAA"],
    results: {
      engagement: "+200%",
      satisfaction: "4.8/5",
      efficiency: "+75%",
      appointments: "+150%",
    },
    metrics: [
      { label: "Patient Engagement", value: "200%", icon: Users, color: "text-green-600" },
      { label: "Satisfaction Score", value: "4.8/5", icon: Star, color: "text-blue-600" },
      { label: "Care Efficiency", value: "75%", icon: TrendingUp, color: "text-purple-600" },
      { label: "Appointments", value: "150%", icon: Clock, color: "text-orange-600" },
    ],
    benefits: [
      "Increased patient engagement by 200%",
      "Improved patient satisfaction to 4.8/5",
      "Enhanced care delivery efficiency by 75%",
      "Reduced appointment no-shows by 60%",
      "Streamlined provider workflows saving 25 hours/week",
    ],
    timeline: [
      { phase: "Compliance Review", duration: "2 weeks", status: "completed" },
      { phase: "Security Architecture", duration: "3 weeks", status: "completed" },
      { phase: "App Development", duration: "20 weeks", status: "completed" },
      { phase: "Security Testing", duration: "4 weeks", status: "completed" },
      { phase: "HIPAA Certification", duration: "3 weeks", status: "completed" },
    ],
  },
  {
    id: 5,
    title: "FinTech Investment Platform",
    client: "InvestSmart Financial",
    industry: "Financial Services",
    duration: "12 months",
    teamSize: "18 developers",
    challenge:
      "InvestSmart needed a sophisticated trading platform with real-time market data, portfolio management, and regulatory compliance.",
    solution:
      "We built a comprehensive fintech platform with advanced trading tools, risk management, and automated compliance reporting.",
    image: "/images/fintech-platform.png",
    clientPhoto: "/images/client-fintech.png",
    clientName: "Robert Martinez",
    clientRole: "CEO, InvestSmart Financial",
    testimonial:
      "Zenbourg delivered a world-class platform that helped us scale from 1,000 to 50,000 active traders in just 8 months.",
    technologies: ["Angular", "Java", "PostgreSQL", "Kafka", "Kubernetes"],
    results: {
      users: "+5000%",
      volume: "+800%",
      performance: "99.99%",
      compliance: "100%",
    },
    metrics: [
      { label: "User Growth", value: "5000%", icon: Users, color: "text-green-600" },
      { label: "Trading Volume", value: "800%", icon: DollarSign, color: "text-blue-600" },
      { label: "Platform Uptime", value: "99.99%", icon: Clock, color: "text-purple-600" },
      { label: "Compliance Rate", value: "100%", icon: Star, color: "text-orange-600" },
    ],
    benefits: [
      "Scaled user base from 1,000 to 50,000 traders",
      "Increased trading volume by 800%",
      "Achieved 99.99% platform uptime",
      "Maintained 100% regulatory compliance",
      "Reduced trade execution time by 95%",
    ],
    timeline: [
      { phase: "Regulatory Planning", duration: "4 weeks", status: "completed" },
      { phase: "Platform Architecture", duration: "6 weeks", status: "completed" },
      { phase: "Core Development", duration: "32 weeks", status: "completed" },
      { phase: "Security & Compliance", duration: "8 weeks", status: "completed" },
      { phase: "Launch & Monitoring", duration: "2 weeks", status: "completed" },
    ],
  },
]

export default function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState(caseStudies[0])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Success Stories
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover how we've helped businesses achieve remarkable growth and transformation through innovative digital
            solutions. Real results, real impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              5 Major Projects
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              $50M+ Revenue Generated
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              99.9% Success Rate
            </Badge>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCase.id === study.id ? "ring-2 ring-purple-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedCase(study)}
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-purple-600 hover:bg-white">{study.industry}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-muted-foreground mb-4">{study.client}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{study.duration}</span>
                    <span>{study.teamSize}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Case Study */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">{selectedCase.title}</h2>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedCase.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-red-600">Challenge</h3>
                          <p className="text-muted-foreground">{selectedCase.challenge}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-green-600">Solution</h3>
                          <p className="text-muted-foreground">{selectedCase.solution}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-blue-600">Key Benefits</h3>
                          <ul className="space-y-2">
                            {selectedCase.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <ArrowRight className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                        <Image
                          src={selectedCase.image || "/placeholder.svg"}
                          alt={selectedCase.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {selectedCase.metrics.map((metric, index) => (
                          <Card key={index}>
                            <CardContent className="p-4 text-center">
                              <metric.icon className={`h-8 w-8 mx-auto mb-2 ${metric.color}`} />
                              <div className="text-2xl font-bold">{metric.value}</div>
                              <div className="text-sm text-muted-foreground">{metric.label}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="results" className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold mb-6">Measurable Impact</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {selectedCase.metrics.map((metric, index) => (
                          <Card key={index} className="p-6">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-full bg-gray-100`}>
                                <metric.icon className={`h-6 w-6 ${metric.color}`} />
                              </div>
                              <div>
                                <div className="text-3xl font-bold">{metric.value}</div>
                                <div className="text-muted-foreground">{metric.label}</div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-4">Business Outcomes</h4>
                        <div className="space-y-3">
                          {selectedCase.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Card className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Project Details</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Client</div>
                            <div className="font-medium">{selectedCase.client}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Industry</div>
                            <div className="font-medium">{selectedCase.industry}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Duration</div>
                            <div className="font-medium">{selectedCase.duration}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Team Size</div>
                            <div className="font-medium">{selectedCase.teamSize}</div>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                          <Button className="w-full" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Case Study
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Project Timeline</h3>
                  <div className="space-y-6">
                    {selectedCase.timeline.map((phase, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            phase.status === "completed"
                              ? "bg-green-500"
                              : phase.status === "active"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">{phase.phase}</h4>
                            <Badge
                              variant={
                                phase.status === "completed"
                                  ? "default"
                                  : phase.status === "active"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {phase.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{phase.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="testimonial" className="p-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={selectedCase.clientPhoto || "/placeholder.svg"}
                          alt={selectedCase.clientName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{selectedCase.clientName}</h3>
                      <p className="text-muted-foreground">{selectedCase.clientRole}</p>
                    </div>

                    <blockquote className="text-2xl font-medium mb-8 text-muted-foreground italic">
                      "{selectedCase.testimonial}"
                    </blockquote>

                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <Button size="lg">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Project
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our portfolio of successful clients and transform your business with innovative digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Your Project
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-purple-600"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
