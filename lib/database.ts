// Database configuration and utilities
// In production, you would use a real database like PostgreSQL, MongoDB, etc.

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  type: "consultation" | "project"
  status: "new" | "contacted" | "converted" | "closed"
  createdAt: string
  updatedAt: string
}

export interface PaymentOrder {
  id: string
  amount: number
  currency: string
  plan: string
  customerInfo: {
    name: string
    email: string
    phone: string
    company?: string
  }
  status: "created" | "pending" | "completed" | "failed"
  paymentMethod?: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export interface PortfolioItem {
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
  projectUrl: string
  completedDate: string
  featured: boolean
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
  role: "user" | "admin"
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

export interface VerificationCode {
  code: string
  expires: number
  type: "signin" | "signup"
  email: string
}

// Mock database functions - replace with real database operations
class MockDatabase {
  private contacts: ContactSubmission[] = []
  private orders: PaymentOrder[] = []

  private verificationCodes: Map<string, VerificationCode> = new Map()
  private users: Map<string, User> = new Map()
  private pendingUsers: Map<string, Partial<User>> = new Map()

  constructor() {
    // Add default admin user
    this.users.set("admin@zenbourg.com", {
      id: "admin_1",
      email: "admin@zenbourg.com",
      firstName: "Admin",
      lastName: "User",
      company: "Zenbourg",
      phone: "+91 7772828027",
      role: "admin",
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    // Add demo user
    this.users.set("demo@example.com", {
      id: "user_1",
      email: "demo@example.com",
      firstName: "Demo",
      lastName: "User",
      company: "Demo Company",
      phone: "+1 555-0123",
      role: "user",
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  async saveContact(contact: Omit<ContactSubmission, "id" | "createdAt" | "updatedAt">): Promise<ContactSubmission> {
    const newContact: ContactSubmission = {
      ...contact,
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.contacts.push(newContact)

    // In production, you would also send email notifications here
    await this.sendContactNotification(newContact)

    return newContact
  }

  async savePaymentOrder(order: Omit<PaymentOrder, "id" | "createdAt" | "updatedAt">): Promise<PaymentOrder> {
    const newOrder: PaymentOrder = {
      ...order,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.orders.push(newOrder)
    return newOrder
  }

  async getContacts(): Promise<ContactSubmission[]> {
    return this.contacts
  }

  async getOrders(): Promise<PaymentOrder[]> {
    return this.orders
  }

  async saveUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.users.set(user.email, newUser)
    return newUser
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.get(email) || null
  }

  async saveVerificationCode(email: string, code: VerificationCode): Promise<void> {
    this.verificationCodes.set(email, code)
  }

  async getVerificationCode(email: string): Promise<VerificationCode | null> {
    return this.verificationCodes.get(email) || null
  }

  async deleteVerificationCode(email: string): Promise<void> {
    this.verificationCodes.delete(email)
  }

  async savePendingUser(email: string, userData: Partial<User>): Promise<void> {
    this.pendingUsers.set(email, userData)
  }

  async getPendingUser(email: string): Promise<Partial<User> | null> {
    return this.pendingUsers.get(email) || null
  }

  async deletePendingUser(email: string): Promise<void> {
    this.pendingUsers.delete(email)
  }

  private async sendContactNotification(contact: ContactSubmission): Promise<void> {
    // In production, integrate with email service (SendGrid, AWS SES, etc.)
    console.log("📧 New contact submission notification:", {
      to: "support@zenbourg.onmicrosoft.com",
      subject: `New ${contact.type} inquiry from ${contact.name}`,
      body: `
        New contact submission received:
        
        Name: ${contact.name}
        Email: ${contact.email}
        Phone: ${contact.phone || "Not provided"}
        Company: ${contact.company || "Not provided"}
        Type: ${contact.type}
        Message: ${contact.message}
        
        Submitted at: ${contact.createdAt}
      `,
    })
  }
}

export const db = new MockDatabase()
