import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Bus travel in India"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Across India with Comfort</h1>
        <p className="text-xl mb-8 max-w-xl">
          Book your bus tickets online and enjoy a hassle-free journey to your destination
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Book Now
        </Button>
      </div>
    </div>
  )
}
