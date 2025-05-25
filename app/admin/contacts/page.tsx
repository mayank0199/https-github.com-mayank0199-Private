"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Phone, Building, Calendar, Eye, MessageSquare, Filter } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  type: "consultation" | "project"
  status: "new" | "contacted" | "converted" | "closed"
  createdAt: string
  priority: "low" | "medium" | "high"
}

export default function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      company: "Tech Corp",
      message: "Interested in website development for our startup",
      type: "consultation",
      status: "new",
      createdAt: new Date().toISOString(),
      priority: "high",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah@company.com",
      phone: "+91 8765432109",
      company: "Digital Solutions",
      message: "Need a complete digital marketing strategy",
      type: "project",
      status: "contacted",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      priority: "medium",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@startup.io",
      company: "StartupIO",
      message: "Looking for AI tools integration",
      type: "consultation",
      status: "new",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      priority: "high",
    },
  ])

  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    let filtered = contacts

    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((contact) => contact.type === typeFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.company?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredContacts(filtered)
  }, [contacts, statusFilter, typeFilter, searchTerm])

  const updateContactStatus = (id: string, newStatus: Contact["status"]) => {
    setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, status: newStatus } : contact)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "destructive"
      case "contacted":
        return "default"
      case "converted":
        return "default"
      case "closed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-muted-foreground">Manage customer inquiries and leads</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.filter((c) => c.status === "new").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.filter((c) => c.status === "contacted").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.filter((c) => c.status === "converted").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="project">Project</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contact List</CardTitle>
          <CardDescription>Manage and respond to customer inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {contact.company && (
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {contact.company}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{contact.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getPriorityColor(contact.priority)}`}>
                      {contact.priority.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={contact.status}
                      onValueChange={(value) => updateContactStatus(contact.id, value as Contact["status"])}
                    >
                      <SelectTrigger className="w-[120px]">
                        <Badge variant={getStatusColor(contact.status)}>{contact.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedContact(contact)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Contact Details</DialogTitle>
                            <DialogDescription>Full contact information and message</DialogDescription>
                          </DialogHeader>
                          {selectedContact && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold">Contact Information</h4>
                                <p>Name: {selectedContact.name}</p>
                                <p>Email: {selectedContact.email}</p>
                                {selectedContact.phone && <p>Phone: {selectedContact.phone}</p>}
                                {selectedContact.company && <p>Company: {selectedContact.company}</p>}
                              </div>
                              <div>
                                <h4 className="font-semibold">Message</h4>
                                <p className="text-sm bg-gray-50 p-3 rounded">{selectedContact.message}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Details</h4>
                                <p>Type: {selectedContact.type}</p>
                                <p>Priority: {selectedContact.priority}</p>
                                <p>Status: {selectedContact.status}</p>
                                <p>Date: {new Date(selectedContact.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
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
