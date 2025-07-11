"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SeatSelectorProps = {
  totalSeats: number
  bookedSeats: number[]
  selectedSeats: number[]
  onSeatSelect: (seatNumber: number) => void
}

export function SeatSelector({ totalSeats, bookedSeats, selectedSeats, onSeatSelect }: SeatSelectorProps) {
  // Calculate rows and columns (assuming 4 seats per row)
  const seatsPerRow = 4
  const rows = Math.ceil(totalSeats / seatsPerRow)

  // Create a 2D array of seats
  const seatMap = Array(rows)
    .fill(0)
    .map((_, rowIndex) =>
      Array(seatsPerRow)
        .fill(0)
        .map((_, colIndex) => {
          const seatNumber = rowIndex * seatsPerRow + colIndex + 1
          return seatNumber <= totalSeats ? seatNumber : null
        }),
    )

  return (
    <div className="bus-layout">
      {/* Driver's seat */}
      <div className="flex justify-end mb-8">
        <div className="w-12 h-12 bg-gray-300 rounded-t-full flex items-center justify-center text-sm">Driver</div>
      </div>

      {/* Seat grid */}
      <div className="grid grid-cols-4 gap-2">
        {seatMap.flat().map((seatNumber, index) => {
          if (seatNumber === null) return <div key={`empty-${index}`} className="w-10 h-10"></div>

          const isBooked = bookedSeats.includes(seatNumber)
          const isSelected = selectedSeats.includes(seatNumber)

          return (
            <Button
              key={seatNumber}
              variant="outline"
              size="sm"
              className={cn(
                "w-10 h-10 p-0",
                isBooked && "bg-gray-500 text-white cursor-not-allowed",
                isSelected && "bg-primary text-primary-foreground",
              )}
              disabled={isBooked}
              onClick={() => onSeatSelect(seatNumber)}
            >
              {seatNumber}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
