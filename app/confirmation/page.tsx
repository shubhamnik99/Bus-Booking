"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Download, Calendar, MapPin, Clock, Users } from "lucide-react"

// Mock booking data with Indian context
const BOOKING_DATA = {
  bookingId:
    "BK" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0"),
  busName: "Volvo AC Sleeper",
  from: "Mumbai",
  to: "Pune",
  date: new Date().toISOString().split("T")[0],
  departureTime: "21:00",
  arrivalTime: "00:30",
  seats: [12, 13],
  passengers: [
    { name: "Rahul Sharma", age: "35", gender: "male" },
    { name: "Priya Sharma", age: "32", gender: "female" },
  ],
  totalAmount: 2500,
}

export default function ConfirmationPage() {
  const [bookingData, setBookingData] = useState(BOOKING_DATA)

  // Format date for display
  const formattedDate = new Date(bookingData.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your booking has been confirmed. Your booking ID is{" "}
            <span className="font-medium">{bookingData.bookingId}</span>
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-4">{bookingData.busName}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p>{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Route</p>
                      <p>
                        {bookingData.from} to {bookingData.to}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Departure Time</p>
                      <p>{bookingData.departureTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Ticket Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Passengers</p>
                      <p>{bookingData.passengers.length}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-3 flex items-center justify-center text-muted-foreground">#</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seat Numbers</p>
                      <p>{bookingData.seats.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-3 flex items-center justify-center text-muted-foreground">₹</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p>₹{bookingData.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-lg mb-4">Passenger Details</h3>
              <div className="space-y-4">
                {bookingData.passengers.map((passenger, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p>{passenger.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p>{passenger.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p>{passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
