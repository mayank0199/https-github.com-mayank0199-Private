"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Mail,
  Briefcase,
  Settings,
  FileText,
  BarChart3,
  Globe,
  MessageSquare,
  Calendar,
  LogOut,
  User,
  Bell,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Content Management",
    items: [
      { title: "Portfolio", url: "/admin/portfolio", icon: Briefcase },
      { title: "Services", url: "/admin/services", icon: Globe },
      { title: "Blog Posts", url: "/admin/blog", icon: FileText },
      { title: "Testimonials", url: "/admin/testimonials", icon: MessageSquare },
    ],
  },
  {
    title: "Customer Management",
    items: [
      { title: "Contacts", url: "/admin/contacts", icon: Mail },
      { title: "Clients", url: "/admin/clients", icon: Users },
      { title: "Orders", url: "/admin/orders", icon: CreditCard },
      { title: "Appointments", url: "/admin/appointments", icon: Calendar },
    ],
  },
  {
    title: "System",
    items: [{ title: "Settings", url: "/admin/settings", icon: Settings }],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState("/admin/dashboard")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <div>
                <h2 className="font-semibold">Zenbourg Admin</h2>
                <p className="text-xs text-muted-foreground">Content Management</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {navigation.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={currentPath === item.url}
                            onClick={() => setCurrentPath(item.url)}
                          >
                            <a href={item.url}>
                              <IconComponent className="w-4 h-4" />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Admin User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Suspense>{children}</Suspense>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
