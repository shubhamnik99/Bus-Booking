"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, MapPin } from "lucide-react"

// Popular Indian cities for autocomplete
const POPULAR_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Bhopal",
]

export function SearchForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([])
  const [toSuggestions, setToSuggestions] = useState<string[]>([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the date as YYYY-MM-DD
    const formattedDate = date ? format(date, "yyyy-MM-dd") : ""

    // Navigate to search results page with query parameters
    router.push(`/search?from=${from}&to=${to}&date=${formattedDate}&passengers=${passengers}`)
  }

  const handleFromChange = (value: string) => {
    setFrom(value)
    if (value.length > 1) {
      const filtered = POPULAR_CITIES.filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      setFromSuggestions(filtered)
      setShowFromSuggestions(true)
    } else {
      setShowFromSuggestions(false)
    }
  }

  const handleToChange = (value: string) => {
    setTo(value)
    if (value.length > 1) {
      const filtered = POPULAR_CITIES.filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      setToSuggestions(filtered)
      setShowToSuggestions(true)
    } else {
      setShowToSuggestions(false)
    }
  }

  const selectFromSuggestion = (city: string) => {
    setFrom(city)
    setShowFromSuggestions(false)
  }

  const selectToSuggestion = (city: string) => {
    setTo(city)
    setShowToSuggestions(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="from" className="text-sm font-medium">
            From
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="from"
              placeholder="Departure city"
              className="pl-9"
              value={from}
              onChange={(e) => handleFromChange(e.target.value)}
              onFocus={() => from.length > 1 && setShowFromSuggestions(true)}
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
              required
            />
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                {fromSuggestions.map((city) => (
                  <div
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-muted"
                    onMouseDown={() => selectFromSuggestion(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="to" className="text-sm font-medium">
            To
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="to"
              placeholder="Destination city"
              className="pl-9"
              value={to}
              onChange={(e) => handleToChange(e.target.value)}
              onFocus={() => to.length > 1 && setShowToSuggestions(true)}
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
              required
            />
            {showToSuggestions && toSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                {toSuggestions.map((city) => (
                  <div
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-muted"
                    onMouseDown={() => selectToSuggestion(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Date of Journey
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label htmlFor="passengers" className="text-sm font-medium">
            Passengers
          </label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger>
              <SelectValue placeholder="Select passengers" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Passenger" : "Passengers"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Search Buses
      </Button>
    </form>
  )
}
