"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Users, DollarSign, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 45000, orders: 12 },
  { month: "Feb", revenue: 52000, orders: 15 },
  { month: "Mar", revenue: 48000, orders: 13 },
  { month: "Apr", revenue: 61000, orders: 18 },
  { month: "May", revenue: 55000, orders: 16 },
  { month: "Jun", revenue: 67000, orders: 20 },
]

const serviceData = [
  { name: "Website Development", value: 35, color: "#8884d8" },
  { name: "Digital Marketing", value: 25, color: "#82ca9d" },
  { name: "UI/UX Design", value: 20, color: "#ffc658" },
  { name: "SEO Optimization", value: 15, color: "#ff7300" },
  { name: "AI Tools", value: 5, color: "#00ff00" },
]

const trafficData = [
  { source: "Organic Search", visitors: 2840, percentage: 45 },
  { source: "Direct", visitors: 1890, percentage: 30 },
  { source: "Social Media", visitors: 945, percentage: 15 },
  { source: "Referral", visitors: 630, percentage: 10 },
]

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328,000</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,305</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +3.1% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue and order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Revenue breakdown by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficData.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{source.source}</span>
                  <span>{source.visitors.toLocaleString()} visitors</span>
                </div>
                <Progress value={source.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Goals</CardTitle>
            <CardDescription>Progress towards monthly targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Revenue Goal</span>
                <span>$328K / $400K</span>
              </div>
              <Progress value={82} className="h-2" />
              <Badge variant="secondary" className="mt-2">
                82% Complete
              </Badge>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>New Client Acquisition</span>
                <span>18 / 25</span>
              </div>
              <Progress value={72} className="h-2" />
              <Badge variant="secondary" className="mt-2">
                72% Complete
              </Badge>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Project Completion Rate</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
              <Badge variant="default" className="mt-2">
                Excellent
              </Badge>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Customer Satisfaction</span>
                <span>4.8 / 5.0</span>
              </div>
              <Progress value={96} className="h-2" />
              <Badge variant="default" className="mt-2">
                Outstanding
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
