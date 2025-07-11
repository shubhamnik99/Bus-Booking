"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SeatSelector } from "@/components/seat-selector"
import { format, parse } from "date-fns"

// Mock bus data with Indian context
const BUS_DATA = {
  id: "bus1",
  name: "Volvo AC Sleeper",
  departureTime: "21:00",
  arrivalTime: "06:30",
  duration: "9h 30m",
  price: 1250,
  totalSeats: 40,
  bookedSeats: [3, 4, 7, 12, 15, 22, 25, 28, 33, 36, 38],
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const date = searchParams.get("date") || ""
  const passengers = Number.parseInt(searchParams.get("passengers") || "1")

  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [passengerDetails, setPassengerDetails] = useState(
    Array(passengers)
      .fill(0)
      .map(() => ({ name: "", age: "", gender: "" })),
  )

  const formattedDate = date ? format(parse(date, "yyyy-MM-dd", new Date()), "EEEE, MMMM d, yyyy") : "Selected date"

  const totalPrice = selectedSeats.length * BUS_DATA.price

  const handleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber))
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  const handlePassengerDetailChange = (index: number, field: string, value: string) => {
    const newPassengerDetails = [...passengerDetails]
    newPassengerDetails[index] = { ...newPassengerDetails[index], [field]: value }
    setPassengerDetails(newPassengerDetails)
  }

  const handleProceedToPayment = () => {
    if (selectedSeats.length !== passengers) {
      alert(`Please select ${passengers} seats.`)
      return
    }

    // Check if all passenger details are filled
    const allDetailsFilled = passengerDetails.every((passenger) => passenger.name && passenger.age && passenger.gender)

    if (!allDetailsFilled) {
      alert("Please fill in all passenger details.")
      return
    }

    // In a real app, you would save the booking details to state/context or API
    // before redirecting to payment
    router.push(`/payment?amount=${totalPrice}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Your Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="font-medium">
                  {from} to {to}
                </p>
                <p className="text-muted-foreground">
                  {formattedDate} • {BUS_DATA.departureTime}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Please select {passengers} {passengers === 1 ? "seat" : "seats"}
                </p>
                <SeatSelector
                  totalSeats={BUS_DATA.totalSeats}
                  bookedSeats={BUS_DATA.bookedSeats}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelection}
                />
              </div>

              <div className="flex items-center justify-between text-sm mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passenger Details</CardTitle>
            </CardHeader>
            <CardContent>
              {passengerDetails.map((passenger, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-medium mb-3">Passenger {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`}>Full Name</Label>
                      <Input
                        id={`name-${index}`}
                        value={passenger.name}
                        onChange={(e) => handlePassengerDetailChange(index, "name", e.target.value)}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`age-${index}`}>Age</Label>
                      <Input
                        id={`age-${index}`}
                        type="number"
                        value={passenger.age}
                        onChange={(e) => handlePassengerDetailChange(index, "age", e.target.value)}
                        placeholder="Enter age"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`gender-${index}`}>Gender</Label>
                      <select
                        id={`gender-${index}`}
                        value={passenger.gender}
                        onChange={(e) => handlePassengerDetailChange(index, "gender", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  {index < passengerDetails.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{BUS_DATA.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {from} to {to} • {formattedDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Departure Time</p>
                  <p>{BUS_DATA.departureTime}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Selected Seats</p>
                  <p>
                    {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(", ") : "No seats selected"}
                  </p>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <p>Ticket Price</p>
                  <p>
                    ₹{BUS_DATA.price} x {selectedSeats.length}
                  </p>
                </div>

                <div className="flex justify-between font-bold">
                  <p>Total Amount</p>
                  <p>₹{totalPrice}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleProceedToPayment}
                className="w-full"
                disabled={selectedSeats.length !== passengers}
              >
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
