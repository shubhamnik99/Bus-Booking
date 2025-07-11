"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, X } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] shadow-xl flex flex-col z-50">
          <div className="flex items-center justify-between bg-primary text-primary-foreground p-4">
            <h3 className="font-medium">Travel Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ChatInterface />
        </Card>
      )}
    </>
  )
}
