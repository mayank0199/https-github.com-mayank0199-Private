"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Bell, Shield, Globe, Building } from "lucide-react"

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: "Zenbourg",
    companyEmail: "support@zenbourg.onmicrosoft.com",
    companyPhone: "+91 7772828027",
    companyAddress: "123 Business Street, Tech City, TC 12345",
    website: "https://zenbourg.com",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    autoResponder: true,
    maintenanceMode: false,
    analyticsTracking: true,
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <div className="grid gap-8">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Company Information
            </CardTitle>
            <CardDescription>Update your company details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={settings.website}
                  onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={settings.companyEmail}
                  onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="companyPhone">Phone</Label>
                <Input
                  id="companyPhone"
                  value={settings.companyPhone}
                  onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="companyAddress">Address</Label>
              <Textarea
                id="companyAddress"
                value={settings.companyAddress}
                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings({ ...settings, marketingEmails: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Responder</Label>
                <p className="text-sm text-muted-foreground">Automatically respond to new inquiries</p>
              </div>
              <Switch
                checked={settings.autoResponder}
                onCheckedChange={(checked) => setSettings({ ...settings, autoResponder: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              System Settings
            </CardTitle>
            <CardDescription>Configure system-wide settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Put the website in maintenance mode</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
                {settings.maintenanceMode && <Badge variant="destructive">Active</Badge>}
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-muted-foreground">Enable Google Analytics and tracking</p>
              </div>
              <Switch
                checked={settings.analyticsTracking}
                onCheckedChange={(checked) => setSettings({ ...settings, analyticsTracking: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              API & Integrations
            </CardTitle>
            <CardDescription>Manage API keys and third-party integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
              <Input id="googleAnalytics" placeholder="GA-XXXXXXXXX-X" />
            </div>
            <div>
              <Label htmlFor="stripeKey">Stripe Public Key</Label>
              <Input id="stripeKey" placeholder="pk_live_..." type="password" />
            </div>
            <div>
              <Label htmlFor="emailService">Email Service API Key</Label>
              <Input id="emailService" placeholder="SG...." type="password" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Test Connection</Button>
              <Button variant="outline">Generate New Key</Button>
            </div>
          </CardContent>
        </Card>

        {/* Backup & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Backup & Security
            </CardTitle>
            <CardDescription>Manage data backups and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Database Backup</h4>
                <p className="text-sm text-muted-foreground">Last backup: 2 hours ago</p>
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Backup Now
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Security Scan</h4>
                <p className="text-sm text-muted-foreground">Last scan: 1 day ago</p>
              </div>
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Run Scan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
