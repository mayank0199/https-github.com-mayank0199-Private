export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Help Center
        </h1>
        <p className="text-xl text-muted-foreground">
          Find answers to frequently asked questions and get support for all Zenbourg services.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
          <p>📧 support@zenbourg.onmicrosoft.com</p>
          <p>📞 +91 7772828027</p>
          <p>📞 +91 8094102789</p>
        </div>
      </div>
    </div>
  )
}
