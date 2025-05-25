"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Edit, Trash2, ExternalLink, Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PortfolioItem {
  id: number
  title: string
  category: string
  client: string
  description: string
  image: string
  technologies: string[]
  projectUrl: string
  completedDate: string
  status: "active" | "archived"
}

export default function PortfolioManagement() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [newItem, setNewItem] = useState({
    title: "",
    category: "",
    client: "",
    description: "",
    image: "",
    technologies: "",
    projectUrl: "",
    completedDate: "",
  })

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      if (data.success) {
        setPortfolio(
          data.portfolio.map((item: any) => ({
            ...item,
            status: "active",
          })),
        )
      }
    } catch (error) {
      console.error("Failed to fetch portfolio:", error)
    }
  }

  const handleAddItem = async () => {
    const portfolioItem = {
      ...newItem,
      id: Date.now(),
      technologies: newItem.technologies.split(",").map((tech) => tech.trim()),
      status: "active" as const,
    }

    setPortfolio([...portfolio, portfolioItem])
    setNewItem({
      title: "",
      category: "",
      client: "",
      description: "",
      image: "",
      technologies: "",
      projectUrl: "",
      completedDate: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item)
    setNewItem({
      title: item.title,
      category: item.category,
      client: item.client,
      description: item.description,
      image: item.image,
      technologies: item.technologies.join(", "),
      projectUrl: item.projectUrl,
      completedDate: item.completedDate,
    })
  }

  const handleUpdateItem = () => {
    if (!editingItem) return

    const updatedPortfolio = portfolio.map((item) =>
      item.id === editingItem.id
        ? {
            ...item,
            ...newItem,
            technologies: newItem.technologies.split(",").map((tech) => tech.trim()),
          }
        : item,
    )

    setPortfolio(updatedPortfolio)
    setEditingItem(null)
    setNewItem({
      title: "",
      category: "",
      client: "",
      description: "",
      image: "",
      technologies: "",
      projectUrl: "",
      completedDate: "",
    })
  }

  const handleDeleteItem = (id: number) => {
    setPortfolio(portfolio.filter((item) => item.id !== id))
  }

  const toggleStatus = (id: number) => {
    setPortfolio(
      portfolio.map((item) =>
        item.id === id ? { ...item, status: item.status === "active" ? "archived" : "active" } : item,
      ),
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <p className="text-muted-foreground">Manage your portfolio items and showcase projects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Portfolio Item</DialogTitle>
              <DialogDescription>Create a new portfolio showcase item</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client Name</Label>
                  <Input
                    id="client"
                    value={newItem.client}
                    onChange={(e) => setNewItem({ ...newItem, client: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="completedDate">Completion Date</Label>
                  <Input
                    id="completedDate"
                    type="date"
                    value={newItem.completedDate}
                    onChange={(e) => setNewItem({ ...newItem, completedDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={newItem.technologies}
                  onChange={(e) => setNewItem({ ...newItem, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="projectUrl">Project URL</Label>
                  <Input
                    id="projectUrl"
                    value={newItem.projectUrl}
                    onChange={(e) => setNewItem({ ...newItem, projectUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Portfolio Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolio.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolio.filter((item) => item.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(portfolio.map((item) => item.category)).size}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Table */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Items</CardTitle>
          <CardDescription>Manage and edit your portfolio showcase</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description.slice(0, 50)}...</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.client}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.slice(0, 2).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.technologies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(item.completedDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => window.open(item.projectUrl, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(item.id)}>
                        {item.status === "active" ? "Archive" : "Activate"}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
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

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Item</DialogTitle>
            <DialogDescription>Update portfolio item details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Project Title</Label>
                <Input
                  id="edit-title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-client">Client Name</Label>
                <Input
                  id="edit-client"
                  value={newItem.client}
                  onChange={(e) => setNewItem({ ...newItem, client: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-completedDate">Completion Date</Label>
                <Input
                  id="edit-completedDate"
                  type="date"
                  value={newItem.completedDate}
                  onChange={(e) => setNewItem({ ...newItem, completedDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-technologies">Technologies (comma-separated)</Label>
              <Input
                id="edit-technologies"
                value={newItem.technologies}
                onChange={(e) => setNewItem({ ...newItem, technologies: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-projectUrl">Project URL</Label>
                <Input
                  id="edit-projectUrl"
                  value={newItem.projectUrl}
                  onChange={(e) => setNewItem({ ...newItem, projectUrl: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateItem}>Update Portfolio Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
