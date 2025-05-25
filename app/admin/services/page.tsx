"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import { Plus, Edit, Trash2, Globe, Palette, Search, Target } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  price: number
  features: string[]
  icon: string
  isActive: boolean
  category: string
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      title: "Website Development",
      description: "Custom, responsive websites that convert visitors into customers",
      price: 2999,
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First"],
      icon: "Globe",
      isActive: true,
      category: "Development",
    },
    {
      id: "2",
      title: "UI/UX Design",
      description: "Intuitive, beautiful interfaces that provide exceptional user experiences",
      price: 1999,
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      icon: "Palette",
      isActive: true,
      category: "Design",
    },
    {
      id: "3",
      title: "SEO Optimization",
      description: "Dominate search results with proven SEO strategies",
      price: 1499,
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy"],
      icon: "Search",
      isActive: true,
      category: "Marketing",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: 0,
    features: "",
    icon: "",
    category: "",
  })

  const handleAddService = () => {
    const service: Service = {
      id: Date.now().toString(),
      ...newService,
      features: newService.features.split(",").map((f) => f.trim()),
      isActive: true,
    }

    setServices([...services, service])
    setNewService({
      title: "",
      description: "",
      price: 0,
      features: "",
      icon: "",
      category: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setNewService({
      title: service.title,
      description: service.description,
      price: service.price,
      features: service.features.join(", "),
      icon: service.icon,
      category: service.category,
    })
  }

  const handleUpdateService = () => {
    if (!editingService) return

    const updatedServices = services.map((service) =>
      service.id === editingService.id
        ? {
            ...service,
            ...newService,
            features: newService.features.split(",").map((f) => f.trim()),
          }
        : service,
    )

    setServices(updatedServices)
    setEditingService(null)
    setNewService({
      title: "",
      description: "",
      price: 0,
      features: "",
      icon: "",
      category: "",
    })
  }

  const toggleServiceStatus = (id: string) => {
    setServices(services.map((service) => (service.id === id ? { ...service, isActive: !service.isActive } : service)))
  }

  const deleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return Globe
      case "Palette":
        return Palette
      case "Search":
        return Search
      case "Target":
        return Target
      default:
        return Globe
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Manage your service offerings and pricing</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Create a new service offering</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon Name</Label>
                  <Input
                    id="icon"
                    value={newService.icon}
                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                    placeholder="Globe, Palette, Search, Target"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={newService.features}
                  onChange={(e) => setNewService({ ...newService, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.filter((s) => s.isActive).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(services.map((s) => s.category)).size}</div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = getIconComponent(service.icon)
          return (
            <Card key={service.id} className={`${!service.isActive ? "opacity-50" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>
                  </div>
                  <Switch checked={service.isActive} onCheckedChange={() => toggleServiceStatus(service.id)} />
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-purple-600">${service.price.toLocaleString()}</div>
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteService(service.id)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update service details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Service Title</Label>
                <Input
                  id="edit-title"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-icon">Icon Name</Label>
                <Input
                  id="edit-icon"
                  value={newService.icon}
                  onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-features">Features (comma-separated)</Label>
              <Input
                id="edit-features"
                value={newService.features}
                onChange={(e) => setNewService({ ...newService, features: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingService(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateService}>Update Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
