"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, DollarSign, CreditCard, Eye, Download } from "lucide-react"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  plan: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  createdAt: string
  services: string[]
}

export default function OrdersManagement() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      plan: "Professional",
      amount: 7999,
      currency: "USD",
      status: "completed",
      paymentMethod: "Credit Card",
      createdAt: new Date().toISOString(),
      services: ["Website Development", "SEO Optimization"],
    },
    {
      id: "ORD-002",
      customerName: "Sarah Wilson",
      customerEmail: "sarah@company.com",
      plan: "Enterprise",
      amount: 15000,
      currency: "USD",
      status: "pending",
      paymentMethod: "Wire Transfer",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      services: ["Custom Development", "AI Tools", "Cloud Services"],
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      customerEmail: "mike@startup.io",
      plan: "Starter",
      amount: 2999,
      currency: "USD",
      status: "completed",
      paymentMethod: "PayPal",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      services: ["Website Development"],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      case "refunded":
        return "outline"
      default:
        return "secondary"
    }
  }

  const totalRevenue = orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.amount, 0)

  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const completedOrders = orders.filter((order) => order.status === "completed").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">Track and manage customer orders and payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Manage customer orders and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {order.services.slice(0, 2).map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {order.services.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{order.services.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${order.amount.toLocaleString()} {order.currency}
                    </div>
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Select defaultValue={order.status}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
