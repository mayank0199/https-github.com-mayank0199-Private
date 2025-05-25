"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, CreditCard, Mail, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  totalRevenue: number
  newContacts: number
  completedOrders: number
  conversionRate: number
  monthlyGrowth: number
  activeProjects: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 125000,
    newContacts: 24,
    completedOrders: 18,
    conversionRate: 24.5,
    monthlyGrowth: 12.3,
    activeProjects: 8,
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "contact",
      message: "New consultation request from John Doe",
      time: "2 minutes ago",
      status: "new",
    },
    {
      id: 2,
      type: "order",
      message: "Payment completed for Professional Plan - $7,999",
      time: "15 minutes ago",
      status: "completed",
    },
    {
      id: 3,
      type: "project",
      message: "Portfolio project updated for TechInnovate",
      time: "1 hour ago",
      status: "updated",
    },
    {
      id: 4,
      type: "contact",
      message: "New project inquiry from Sarah Wilson",
      time: "2 hours ago",
      status: "new",
    },
  ])

  const quickActions = [
    { title: "Add Portfolio Item", action: () => (window.location.href = "/admin/portfolio"), icon: "+" },
    { title: "View New Contacts", action: () => (window.location.href = "/admin/contacts"), icon: "👥" },
    { title: "Process Orders", action: () => (window.location.href = "/admin/orders"), icon: "💳" },
    { title: "Update Services", action: () => (window.location.href = "/admin/services"), icon: "⚙️" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />+{stats.monthlyGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newContacts}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +5 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={action.action}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm text-center">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "new"
                        ? "destructive"
                        : activity.status === "completed"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Revenue Goal</span>
                <span>$125K / $150K</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Client Satisfaction</span>
                <span>98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Project Completion Rate</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Lead Response Time</span>
                <span>2.3 hours avg</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
