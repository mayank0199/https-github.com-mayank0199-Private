"use server"

import { NextResponse } from "next/server"

// Updated portfolio data with real links and brand information
const portfolioData = [
  {
    id: 1,
    title: "EcoFashion E-commerce Platform",
    category: "E-commerce Development",
    client: "Dribbble Design Community",
    description:
      "Complete e-commerce solution with AI-powered recommendations and sustainable fashion focus, showcasing creative design portfolios.",
    image: "/images/dribbble-cover.png",
    technologies: ["Next.js", "Stripe", "AI/ML", "PostgreSQL"],
    results: {
      trafficIncrease: "400%",
      salesIncrease: "250%",
      conversionRate: "8.5%",
    },
    testimonial:
      "Zenbourg transformed our design community platform completely. User engagement increased by 400% within 6 months!",
    clientName: "Sarah Peterson",
    clientRole: "Community Director",
    clientImage: "/images/reviewer-sarah.png",
    projectUrl: "https://dribbble.com/",
    completedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "TechInnovate SaaS Dashboard",
    category: "SaaS Development",
    client: "TechInnovate Solutions",
    description:
      "Advanced analytics dashboard with real-time data visualization and AI-powered insights for technology innovation.",
    image: "/images/techinnovate-dashboard.png",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    results: {
      userEngagement: "300%",
      dataProcessing: "10x faster",
      customerSatisfaction: "98%",
    },
    testimonial:
      "The dashboard revolutionized how we analyze data. Our decision-making is now data-driven and efficient.",
    clientName: "Rajesh Kumar",
    clientRole: "CTO",
    clientImage: "/images/reviewer-rajesh.png",
    projectUrl: "https://www.techinnovate.co.uk/",
    completedDate: "2024-02-20",
  },
  {
    id: 3,
    title: "LogiFlow Operations Platform",
    category: "Enterprise Software",
    client: "LogiFlow Logistics",
    description:
      "Comprehensive logistics management system with AI-powered route optimization and real-time tracking capabilities.",
    image: "/images/logiflow-platform.png",
    technologies: ["Vue.js", "Python", "PostgreSQL", "AWS"],
    results: {
      costReduction: "35%",
      deliveryTime: "50% faster",
      efficiency: "200% improvement",
    },
    testimonial:
      "Outstanding platform that optimized our entire logistics operation. Cost savings were immediate and substantial.",
    clientName: "Michael Liu",
    clientRole: "Operations Director",
    clientImage: "/images/reviewer-michael.png",
    projectUrl: "https://www.logiflow.com/",
    completedDate: "2024-03-10",
  },
  {
    id: 4,
    title: "HealthCare Connect Mobile App",
    category: "Mobile App Development",
    client: "Our Ritual Wellness",
    description:
      "Comprehensive wellness and ritual tracking mobile application with personalized health insights and community features.",
    image: "/images/healthcare-app.png",
    technologies: ["React Native", "Firebase", "WebRTC", "Node.js"],
    results: {
      userBase: "50K+ users",
      consultations: "10K+ monthly",
      rating: "4.8/5 stars",
    },
    testimonial:
      "The app made wellness tracking accessible and engaging. User feedback has been overwhelmingly positive.",
    clientName: "Dr. Priya Sharma",
    clientRole: "Wellness Director",
    clientImage: "/images/reviewer-priya.png",
    projectUrl: "https://www.ourritual.com/",
    completedDate: "2024-04-05",
  },
  {
    id: 5,
    title: "FinTech Investment Platform",
    category: "FinTech Development",
    client: "Yubi Investment Solutions",
    description:
      "AI-powered investment platform with portfolio management, risk assessment, and automated trading capabilities.",
    image: "/images/fintech-platform.png",
    technologies: ["Angular", "Python", "TensorFlow", "PostgreSQL"],
    results: {
      assetsManaged: "$50M+",
      userGrowth: "500% in 6 months",
      returns: "15% average",
    },
    testimonial:
      "The platform's AI recommendations have consistently outperformed market averages. Exceptional development work!",
    clientName: "James Wilson",
    clientRole: "Investment Director",
    clientImage: "/images/reviewer-james.png",
    projectUrl: "https://www.go-yubi.com/",
    completedDate: "2024-05-12",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      portfolio: portfolioData,
    })
  } catch (error) {
    console.error("Portfolio fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch portfolio" }, { status: 500 })
  }
}
