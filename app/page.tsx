import { Card, CardContent } from "@/components/ui/card"
import { SearchForm } from "@/components/search-form"
import { PopularRoutes } from "@/components/popular-routes"
import { HeroSection } from "@/components/hero-section"
import { ChatbotButton } from "@/components/chatbot-button"
import { Shield, Clock, Tag } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <Card className="w-full max-w-4xl mx-auto -mt-20 relative z-10 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Find Your Bus</h2>
            <SearchForm />
          </CardContent>
        </Card>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Popular Routes</h2>
          <PopularRoutes />
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <FeatureCard
              icon="Shield"
              title="Secure Booking"
              description="Your payments and personal information are always protected"
            />
            <FeatureCard
              icon="Clock"
              title="24/7 Support"
              description="Our customer service team is available round the clock"
            />
            <FeatureCard icon="Tag" title="Best Prices" description="We guarantee the best prices for your journey" />
          </div>
        </section>
      </div>

      <ChatbotButton />
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  // Import specific icons instead of using require
  const IconMap = {
    Shield: () => <Shield className="h-6 w-6 text-primary" />,
    Clock: () => <Clock className="h-6 w-6 text-primary" />,
    Tag: () => <Tag className="h-6 w-6 text-primary" />,
  }

  const IconComponent = IconMap[icon as keyof typeof IconMap]

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
          <IconComponent />
        </div>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
