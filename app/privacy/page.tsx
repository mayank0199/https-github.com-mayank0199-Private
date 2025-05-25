export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            At Zenbourg, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our services.
          </p>
        </div>
      </div>
    </div>
  )
}
