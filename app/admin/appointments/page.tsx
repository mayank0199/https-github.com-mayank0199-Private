"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CalendarIcon,
  Clock,
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  MapPin,
} from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from "date-fns"

interface Appointment {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  date: string
  time: string
  duration: number
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  type: "consultation" | "meeting" | "demo" | "support"
  meetingType: "in-person" | "video-call" | "phone-call"
  location?: string
  notes?: string
  createdAt: string
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const services = [
  "Free Consultation",
  "Website Development Discussion",
  "Digital Marketing Strategy",
  "UI/UX Design Review",
  "SEO Audit",
  "AI Tools Demo",
  "Project Planning",
  "Support Session",
]

export default function AppointmentsManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+91 9876543210",
      service: "Free Consultation",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "10:00",
      duration: 30,
      status: "confirmed",
      type: "consultation",
      meetingType: "video-call",
      notes: "Interested in website development for startup",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      customerName: "Sarah Wilson",
      customerEmail: "sarah@company.com",
      customerPhone: "+91 8765432109",
      service: "Digital Marketing Strategy",
      date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      time: "14:00",
      duration: 60,
      status: "scheduled",
      type: "meeting",
      meetingType: "in-person",
      location: "Office Conference Room",
      notes: "Discuss comprehensive marketing plan",
      createdAt: new Date().toISOString(),
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [newAppointment, setNewAppointment] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    service: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    duration: 30,
    type: "consultation" as const,
    meetingType: "video-call" as const,
    location: "",
    notes: "",
  })

  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "secondary"
      case "confirmed":
        return "default"
      case "completed":
        return "default"
      case "cancelled":
        return "destructive"
      case "no-show":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "no-show":
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-blue-600" />
    }
  }

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case "video-call":
        return <Video className="w-4 h-4" />
      case "phone-call":
        return <Phone className="w-4 h-4" />
      case "in-person":
        return <MapPin className="w-4 h-4" />
      default:
        return <Video className="w-4 h-4" />
    }
  }

  const handleAddAppointment = async () => {
    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    }

    setAppointments([...appointments, appointment])
    setNewAppointment({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      service: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      duration: 30,
      type: "consultation",
      meetingType: "video-call",
      location: "",
      notes: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setNewAppointment({
      customerName: appointment.customerName,
      customerEmail: appointment.customerEmail,
      customerPhone: appointment.customerPhone,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      type: appointment.type,
      meetingType: appointment.meetingType,
      location: appointment.location || "",
      notes: appointment.notes || "",
    })
  }

  const handleUpdateAppointment = () => {
    if (!editingAppointment) return

    const updatedAppointments = appointments.map((apt) =>
      apt.id === editingAppointment.id ? { ...apt, ...newAppointment } : apt,
    )

    setAppointments(updatedAppointments)
    setEditingAppointment(null)
    setNewAppointment({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      service: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      duration: 30,
      type: "consultation",
      meetingType: "video-call",
      location: "",
      notes: "",
    })
  }

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt)))
  }

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((apt) => apt.id !== id))
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments
      .filter((apt) => isSameDay(parseISO(apt.date), date))
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  const getWeekDays = () => {
    return eachDayOfInterval({
      start: weekStart,
      end: endOfWeek(weekStart),
    })
  }

  const todayAppointments = getAppointmentsForDate(new Date())
  const upcomingAppointments = appointments
    .filter((apt) => new Date(apt.date) > new Date() && apt.status !== "cancelled")
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Appointment Management</h1>
          <p className="text-muted-foreground">Manage customer appointments and scheduling</p>
        </div>
        <div className="flex space-x-2">
          <Button variant={viewMode === "calendar" ? "default" : "outline"} onClick={() => setViewMode("calendar")}>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
            List View
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
                <DialogDescription>Schedule a new appointment with a customer</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={newAppointment.customerName}
                      onChange={(e) => setNewAppointment({ ...newAppointment, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={newAppointment.customerEmail}
                      onChange={(e) => setNewAppointment({ ...newAppointment, customerEmail: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input
                      id="customerPhone"
                      value={newAppointment.customerPhone}
                      onChange={(e) => setNewAppointment({ ...newAppointment, customerPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service</Label>
                    <Select
                      value={newAppointment.service}
                      onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Select
                      value={newAppointment.time}
                      onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Select
                      value={newAppointment.duration.toString()}
                      onValueChange={(value) =>
                        setNewAppointment({ ...newAppointment, duration: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Appointment Type</Label>
                    <Select
                      value={newAppointment.type}
                      onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="demo">Demo</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="meetingType">Meeting Type</Label>
                    <Select
                      value={newAppointment.meetingType}
                      onValueChange={(value) => setNewAppointment({ ...newAppointment, meetingType: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video-call">Video Call</SelectItem>
                        <SelectItem value="phone-call">Phone Call</SelectItem>
                        <SelectItem value="in-person">In Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {newAppointment.meetingType === "in-person" && (
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newAppointment.location}
                      onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                      placeholder="Meeting location"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Additional notes or requirements"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAppointment}>Book Appointment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                appointments.filter((apt) => {
                  const aptDate = parseISO(apt.date)
                  return aptDate >= weekStart && aptDate <= endOfWeek(weekStart)
                }).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((apt) => apt.status === "confirmed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
          </CardContent>
        </Card>
      </div>

      {viewMode === "calendar" ? (
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Weekly View */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setWeekStart(addDays(weekStart, -7))}>
                  Previous Week
                </Button>
                <Button variant="outline" size="sm" onClick={() => setWeekStart(addDays(weekStart, 7))}>
                  Next Week
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {getWeekDays().map((day) => (
                  <div key={day.toISOString()} className="border rounded-lg p-2 min-h-[200px]">
                    <div className="font-semibold text-sm mb-2">{format(day, "EEE dd")}</div>
                    <div className="space-y-1">
                      {getAppointmentsForDate(day).map((apt) => (
                        <div
                          key={apt.id}
                          className="text-xs p-2 bg-purple-100 rounded cursor-pointer hover:bg-purple-200"
                          onClick={() => handleEditAppointment(apt)}
                        >
                          <div className="font-medium">{apt.time}</div>
                          <div className="truncate">{apt.customerName}</div>
                          <div className="flex items-center space-x-1">
                            {getMeetingTypeIcon(apt.meetingType)}
                            {getStatusIcon(apt.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* List View */
        <Card>
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
            <CardDescription>Manage all scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{apt.customerName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          {apt.customerEmail}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {apt.customerPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{apt.service}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {format(parseISO(apt.date), "MMM dd, yyyy")}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {apt.time} ({apt.duration} min)
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getMeetingTypeIcon(apt.meetingType)}
                        <span className="text-sm">{apt.meetingType.replace("-", " ")}</span>
                      </div>
                      {apt.location && <div className="text-xs text-muted-foreground">{apt.location}</div>}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={apt.status}
                        onValueChange={(value) => updateAppointmentStatus(apt.id, value as Appointment["status"])}
                      >
                        <SelectTrigger className="w-[130px]">
                          <Badge variant={getStatusColor(apt.status)}>{apt.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="no-show">No Show</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditAppointment(apt)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteAppointment(apt.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Appointments scheduled for today</CardDescription>
        </CardHeader>
        <CardContent>
          {todayAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No appointments scheduled for today</p>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="font-bold text-lg">{apt.time}</div>
                      <div className="text-xs text-muted-foreground">{apt.duration} min</div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{apt.customerName}</h4>
                      <p className="text-sm text-muted-foreground">{apt.service}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        {getMeetingTypeIcon(apt.meetingType)}
                        <span>{apt.meetingType.replace("-", " ")}</span>
                        {apt.location && <span>• {apt.location}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(apt.status)}
                    <Badge variant={getStatusColor(apt.status)}>{apt.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingAppointment} onOpenChange={() => setEditingAppointment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Update appointment details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-customerName">Customer Name</Label>
                <Input
                  id="edit-customerName"
                  value={newAppointment.customerName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, customerName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-customerEmail">Email</Label>
                <Input
                  id="edit-customerEmail"
                  type="email"
                  value={newAppointment.customerEmail}
                  onChange={(e) => setNewAppointment({ ...newAppointment, customerEmail: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-customerPhone">Phone</Label>
                <Input
                  id="edit-customerPhone"
                  value={newAppointment.customerPhone}
                  onChange={(e) => setNewAppointment({ ...newAppointment, customerPhone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-service">Service</Label>
                <Select
                  value={newAppointment.service}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-time">Time</Label>
                <Select
                  value={newAppointment.time}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration (min)</Label>
                <Select
                  value={newAppointment.duration.toString()}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, duration: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Appointment Type</Label>
                <Select
                  value={newAppointment.type}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-meetingType">Meeting Type</Label>
                <Select
                  value={newAppointment.meetingType}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, meetingType: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video-call">Video Call</SelectItem>
                    <SelectItem value="phone-call">Phone Call</SelectItem>
                    <SelectItem value="in-person">In Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {newAppointment.meetingType === "in-person" && (
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                />
              </div>
            )}
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAppointment(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAppointment}>Update Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
