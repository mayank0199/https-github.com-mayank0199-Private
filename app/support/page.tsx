export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Contact Support
        </h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Our support team is available 24/7 to help you with any questions or issues.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p>📧 support@zenbourg.onmicrosoft.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p>📞 +91 7772828027</p>
              <p>📞 +91 8094102789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
