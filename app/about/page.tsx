"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Lightbulb, Heart, Award, Rocket, Globe, Star, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Innovation First",
      description:
        "We push the boundaries of technology to create solutions that don't just meet today's needs, but anticipate tomorrow's challenges.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Client-Centric Approach",
      description:
        "Every decision we make is guided by one question: How does this benefit our clients? Your success is our success.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Quality & Reliability",
      description:
        "We deliver robust, scalable solutions that stand the test of time. No shortcuts, no compromises on quality.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Collaborative Excellence",
      description:
        "We believe the best solutions emerge from diverse perspectives working together towards a common goal.",
    },
  ]

  const teamMembers = [
    {
      name: "Mayank Bhayal",
      role: "Founder & CEO",
      image: "/images/mayank-ceo.png",
      description: "IIT Mandi Graduate • Tech Visionary • Innovation Leader",
      expertise: ["Full-Stack Development", "AI/ML", "System Architecture", "Product Strategy"],
    },
    {
      name: "Priya Sharma",
      role: "CTO & Co-Founder",
      image: "/images/team-priya.png",
      description: "Former Google Engineer • Cloud Architecture Expert",
      expertise: ["Cloud Infrastructure", "DevOps", "Scalable Systems", "Team Leadership"],
    },
    {
      name: "Arjun Patel",
      role: "Head of Design",
      image: "/images/team-arjun.png",
      description: "Award-winning UX Designer • Design Thinking Expert",
      expertise: ["UI/UX Design", "Design Systems", "User Research", "Brand Strategy"],
    },
    {
      name: "Sneha Gupta",
      role: "Lead Developer",
      image: "/images/team-sneha.png",
      description: "Full-Stack Expert • Open Source Contributor",
      expertise: ["React/Next.js", "Node.js", "Database Design", "API Development"],
    },
  ]

  const achievements = [
    { number: "50+", label: "Projects Delivered", icon: <Rocket className="h-6 w-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Star className="h-6 w-6" /> },
    { number: "3x", label: "Average ROI for Clients", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "24/7", label: "Support & Maintenance", icon: <Shield className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">Our Story</Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Zenbourg
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Born from a vision to democratize cutting-edge technology for businesses of all sizes, Zenbourg is where
              innovation meets execution.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Founder's Journey</Badge>
              <h2 className="text-4xl font-bold mb-6">The Vision Behind Zenbourg</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  <strong className="text-foreground">Mayank Bhayal</strong>, a brilliant mind from the prestigious
                  <strong className="text-foreground"> IIT Mandi</strong>, founded Zenbourg with a simple yet powerful
                  belief: every business, regardless of size, deserves access to world-class technology solutions.
                </p>
                <p>
                  Growing up in <strong className="text-foreground">Indore, Madhya Pradesh</strong>, Mayank witnessed
                  firsthand how small and medium businesses struggled with outdated systems and limited access to modern
                  technology. This sparked his passion for creating a company that would bridge this gap.
                </p>
                <p>
                  With his exceptional technical expertise and deep understanding of business challenges, Mayank
                  assembled a team of like-minded innovators who shared his vision of making enterprise-grade technology
                  accessible to everyone.
                </p>
                <p>
                  <strong className="text-foreground">
                    "Technology should empower, not intimidate. Our mission is to create solutions so intuitive and
                    powerful that they transform how businesses operate."
                  </strong>
                  - Mayank Bhayal, Founder & CEO
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
                <img
                  src="/images/mayank-founder.png"
                  alt="Mayank Bhayal - Founder & CEO"
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold">Mayank Bhayal</h3>
                  <p className="text-purple-600 font-semibold">Founder & CEO</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    IIT Mandi Graduate • Tech Visionary • Based in Indore, MP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">Our Principles</Badge>
            <h2 className="text-4xl font-bold mb-6">Core Values That Drive Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we create.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{value.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">Our Team</Badge>
            <h2 className="text-4xl font-bold mb-6">Meet the Innovators</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A diverse team of passionate professionals united by a common goal: creating technology that transforms
              businesses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.description}</p>
                  <div className="space-y-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Our Impact</Badge>
            <h2 className="text-4xl font-bold mb-6">Achievements That Matter</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and client success.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {achievement.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-white/90">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  To democratize access to cutting-edge technology solutions, empowering businesses of all sizes to
                  achieve extraordinary growth through innovation, efficiency, and digital transformation.
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <Globe className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  To become the global leader in accessible enterprise technology, where every business, regardless of
                  size or industry, has the tools and support needed to thrive in the digital age.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the growing community of businesses that trust Zenbourg to power their digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/enterprise-consultation">
                <Zap className="mr-2 h-5 w-5" />
                Start Your Project
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/case-studies">
                <Award className="mr-2 h-5 w-5" />
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
