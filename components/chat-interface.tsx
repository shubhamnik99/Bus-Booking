"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// Initial welcome message
const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    content: "नमस्ते! I'm your travel assistant. How can I help you with your bus booking today?",
    role: "assistant",
    timestamp: new Date(),
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // In a real app, this would be an API call to your AI service
    // For now, we'll simulate a response with Indian context
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        hi: "नमस्ते! How can I help you with your bus booking today?",
        hello: "नमस्ते! Looking to book a bus ticket?",
        booking:
          "You can book a ticket by using our search form at the top of the page. Just enter your departure city, destination, date, and number of passengers.",
        cancel:
          "To cancel a booking, please go to your account page and select the booking you wish to cancel. You can then follow the cancellation process. Cancellations made 24 hours before departure receive a 75% refund.",
        refund:
          "Refunds are processed within 3-5 business days after a successful cancellation. The refund amount depends on how early you cancel before the departure date.",
        baggage:
          "Each passenger is allowed one piece of luggage up to 15kg and one carry-on bag. Additional baggage can be purchased during the booking process for ₹100 per kg.",
        payment:
          "We accept all major credit/debit cards, UPI, net banking, and popular wallets like Paytm and PhonePe.",
        mumbai:
          "We have multiple buses operating from Mumbai to popular destinations like Pune, Nashik, Goa, and Ahmedabad.",
        delhi: "From Delhi, we offer services to Jaipur, Chandigarh, Agra, Dehradun, and many more destinations.",
        bangalore:
          "Our Bangalore services connect to Chennai, Hyderabad, Mysore, and Coimbatore with frequent departures.",
      }

      // Check if the user's message contains any keywords
      const lowercaseInput = input.toLowerCase()
      let responseText =
        "I'm not sure how to help with that. Could you try asking something about bookings, cancellations, refunds, baggage allowance, or payment methods?"

      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(keyword)) {
          responseText = response
          break
        }
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseText,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
