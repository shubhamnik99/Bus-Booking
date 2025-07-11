import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const POPULAR_ROUTES = [
  { from: "Delhi", to: "Jaipur", price: 850 },
  { from: "Mumbai", to: "Pune", price: 450 },
  { from: "Bangalore", to: "Chennai", price: 750 },
  { from: "Hyderabad", to: "Bangalore", price: 950 },
  { from: "Kolkata", to: "Bhubaneswar", price: 650 },
  { from: "Ahmedabad", to: "Mumbai", price: 1200 },
]

export function PopularRoutes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {POPULAR_ROUTES.map((route, index) => (
        <Link
          key={index}
          href={`/search?from=${route.from}&to=${route.to}&date=${new Date().toISOString().split("T")[0]}&passengers=1`}
          className="transition-transform hover:scale-105"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{route.from}</p>
                  <div className="flex items-center text-muted-foreground my-2">
                    <ArrowRight className="h-4 w-4 mx-2" />
                  </div>
                  <p className="text-lg font-medium">{route.to}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-2xl font-bold text-primary">₹{route.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
