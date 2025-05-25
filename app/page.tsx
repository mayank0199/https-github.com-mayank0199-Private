"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  BarChart3,
  Palette,
  Search,
  Share2,
  SproutIcon as GrowthIcon,
} from "lucide-react"
import Link from "next/link"
import PortfolioShowcase from "@/components/portfolio-showcase"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure"],
  },
  {
    icon: Zap,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services for modern businesses",
    features: ["AWS/Azure", "Auto Scaling", "Cost Optimization", "24/7 Monitoring"],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets",
    features: ["Threat Detection", "Data Encryption", "Compliance", "Security Audits"],
  },
  {
    icon: Users,
    title: "Digital Transformation",
    description: "End-to-end digital transformation consulting and implementation",
    features: ["Process Automation", "Legacy Modernization", "Change Management", "Training"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transform your data into actionable insights with advanced analytics",
    features: ["Business Intelligence", "Predictive Analytics", "Data Visualization", "Real-time Dashboards"],
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Complete brand identity and design solutions for your business",
    features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Digital Assets"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Boost your online visibility with comprehensive SEO strategies",
    features: ["Keyword Research", "On-page SEO", "Link Building", "Performance Tracking"],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Engage your audience with strategic social media marketing",
    features: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics"],
  },
  {
    icon: GrowthIcon,
    title: "Growth Hacking",
    description: "Accelerate your business growth with data-driven strategies",
    features: ["A/B Testing", "Conversion Optimization", "User Acquisition", "Retention Strategies"],
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO, TechCorp",
    content:
      "Zenbourg transformed our entire infrastructure. Their cloud solutions reduced our costs by 40% while improving performance.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CEO, StartupXYZ",
    content: "The team's expertise in digital transformation helped us modernize our operations and stay competitive.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthCo",
    content: "Outstanding results! Their SEO and social media strategies increased our online presence by 300%.",
    rating: 5,
  },
]

const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Team Members" },
  { number: "24/7", label: "Support Available" },
]

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      })

      if (response.ok) {
        alert("Thank you for your message! We'll get back to you soon.")
        setContactForm({ name: "", email: "", company: "", message: "" })
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Zenbourg
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-gray-600 hover:text-purple-600 transition-colors">
                Services
              </Link>
              <Link href="#portfolio" className="text-gray-600 hover:text-purple-600 transition-colors">
                Portfolio
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            🚀 Leading Digital Transformation
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Transform Your Business with Zenbourg
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            We deliver cutting-edge digital solutions that drive growth, enhance efficiency, and position your business
            for the future. From cloud infrastructure to AI integration, we're your trusted technology partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#services">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-lg px-8 py-4">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/book-appointment">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From strategy to implementation, we provide end-to-end digital services that transform your business and
              drive sustainable growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">Our Work</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Portfolio Showcase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we've helped businesses across industries achieve their digital transformation goals.
            </p>
          </div>
          <PortfolioShowcase />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">Pricing Plans</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed to meet your business needs and budget.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative border-2 border-gray-200 hover:border-purple-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription>Perfect for small businesses getting started</CardDescription>
                <div className="text-4xl font-bold text-purple-600">$2,999</div>
                <div className="text-gray-500">per project</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Basic Web Development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Responsive Design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    SEO Optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />3 Months Support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Basic Analytics
                  </li>
                </ul>
                <Link href="/services">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative border-2 border-purple-500 hover:border-purple-600 transition-colors">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription>Ideal for growing businesses</CardDescription>
                <div className="text-4xl font-bold text-purple-600">$7,999</div>
                <div className="text-gray-500">per project</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Advanced Web Development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Cloud Integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Security Implementation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />6 Months Support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Advanced Analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Priority Support
                  </li>
                </ul>
                <Link href="/services">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative border-2 border-gray-200 hover:border-purple-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>For large organizations with custom needs</CardDescription>
                <div className="text-4xl font-bold text-purple-600">Custom</div>
                <div className="text-gray-500">pricing</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Custom Development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Cloud Infrastructure
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Advanced Data Analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    24/7 Priority Support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Dedicated Account Manager
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Contact Sales, In this make contact sale button clickable , for scheduling a meeting with a breif
                    description about the services they need.
                  </li>
                </ul>
                <Link href="/enterprise-consultation">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Contact Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">Get In Touch</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's discuss how we can help you achieve your digital transformation goals. Get in touch with our team
              today.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">support@zenbourg.onmicrosoft.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">+91 7772828027</p>
                      <p className="text-gray-600">+91 8094102789</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">
                        105, Ab Rd, Sector C, Slice 5, Part 2, Shalimar Township
                        <br />
                        Indore, Madhya Pradesh 452010, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Zenbourg</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming businesses through innovative digital solutions and cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" target="_blank" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" target="_blank" className="hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" target="_blank" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" target="_blank" className="hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" target="_blank" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" target="_blank" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" target="_blank" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" target="_blank" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" target="_blank" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" target="_blank" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Zenbourg. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
