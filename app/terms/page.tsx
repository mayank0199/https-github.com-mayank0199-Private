export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            These Terms of Service govern your use of Zenbourg's website and services. By accessing or using our
            services, you agree to be bound by these terms.
          </p>
        </div>
      </div>
    </div>
  )
}
