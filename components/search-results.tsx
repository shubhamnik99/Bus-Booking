"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, parse } from "date-fns"
import { Clock, Users, ArrowRight } from "lucide-react"

// Mock data for bus routes with Indian cities
const MOCK_BUSES = [
  {
    id: "bus1",
    name: "Volvo AC Sleeper",
    departureTime: "21:00",
    arrivalTime: "06:30",
    duration: "9h 30m",
    price: 1250,
    availableSeats: 23,
    amenities: ["WiFi", "AC", "USB Charging", "Blanket"],
  },
  {
    id: "bus2",
    name: "Shrinath Travels",
    departureTime: "20:15",
    arrivalTime: "05:45",
    duration: "9h 30m",
    price: 1100,
    availableSeats: 15,
    amenities: ["WiFi", "AC", "Water Bottle"],
  },
  {
    id: "bus3",
    name: "SRS Travels",
    departureTime: "22:30",
    arrivalTime: "08:15",
    duration: "9h 45m",
    price: 950,
    availableSeats: 8,
    amenities: ["AC", "USB Charging"],
  },
  {
    id: "bus4",
    name: "IntrCity SmartBus",
    departureTime: "23:00",
    arrivalTime: "07:30",
    duration: "8h 30m",
    price: 1350,
    availableSeats: 30,
    amenities: ["WiFi", "AC", "Reclining Seats", "Snacks"],
  },
]

type SearchResultsProps = {
  from: string
  to: string
  date: string
  passengers: number
}

export function SearchResults({ from, to, date, passengers }: SearchResultsProps) {
  const router = useRouter()
  const [buses, setBuses] = useState(MOCK_BUSES)
  const [loading, setLoading] = useState(true)

  // Simulate API call to fetch buses
  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter buses based on search criteria (in a real app, this would be an API call)
      const filteredBuses = MOCK_BUSES.filter((bus) => bus.availableSeats >= passengers)

      setBuses(filteredBuses)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [from, to, date, passengers])

  const handleBookNow = (busId: string) => {
    router.push(`/booking?busId=${busId}&from=${from}&to=${to}&date=${date}&passengers=${passengers}`)
  }

  if (loading) {
    return <p>Loading buses...</p>
  }

  if (buses.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">No buses found</h2>
          <p className="text-muted-foreground mb-4">We couldn't find any buses matching your search criteria.</p>
          <p className="text-sm">Try adjusting your search parameters or selecting a different date.</p>
        </CardContent>
      </Card>
    )
  }

  // Format the date for display
  const formattedDate = date ? format(parse(date, "yyyy-MM-dd", new Date()), "EEEE, MMMM d, yyyy") : "Selected date"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">
            {from} to {to}
          </h2>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        <Badge variant="outline">{buses.length} buses found</Badge>
      </div>

      {buses.map((bus) => (
        <Card key={bus.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">{bus.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{bus.duration}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{bus.departureTime}</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="font-medium">{bus.arrivalTime}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {bus.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-2xl font-bold text-primary">₹{bus.price}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{bus.availableSeats} seats left</span>
                </div>
              </div>

              <Button onClick={() => handleBookNow(bus.id)}>Book Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
