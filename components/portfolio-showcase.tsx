"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PortfolioItem {
  id: number
  title: string
  category: string
  client: string
  description: string
  image: string
  technologies: string[]
  results: Record<string, string>
  testimonial: string
  clientName: string
  clientRole: string
  clientImage: string
  projectUrl: string
  completedDate: string
}

export default function PortfolioShowcase() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      if (data.success) {
        setPortfolio(data.portfolio)
      }
    } catch (error) {
      console.error("Failed to fetch portfolio:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["All", ...Array.from(new Set(portfolio.map((item) => item.category)))]
  const filteredPortfolio =
    selectedCategory === "All" ? portfolio : portfolio.filter((item) => item.category === selectedCategory)

  if (loading) {
    return (
      <div className="py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-pulse">Loading portfolio...</div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 border-purple-200 text-purple-700">
            Our Work
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Portfolio Showcase
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we've helped businesses transform and achieve remarkable results
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  : "border-purple-200 hover:border-purple-300 hover:bg-purple-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {filteredPortfolio.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">{item.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => window.open(item.projectUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{item.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(item.completedDate).toLocaleDateString()}
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Key Results
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(item.results).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Testimonial */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm italic mb-3">"{item.testimonial}"</p>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.clientImage || "/placeholder.svg"} />
                      <AvatarFallback>
                        {item.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{item.clientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.clientRole}, {item.client}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => window.open(item.projectUrl, "_blank")}
                >
                  View Live Project
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business and achieve similar remarkable results.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => (window.location.href = "/services")}
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  )
}
