"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, CheckCircle2, Smartphone } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount") || "0"

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails({
      ...cardDetails,
      [field]: value,
    })
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate card details (simplified)
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.cardholderName || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert("Please fill in all card details")
        return
      }
    }

    // Simulate payment processing
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        router.push("/confirmation")
      }, 2000)
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your booking has been confirmed. Redirecting to confirmation page...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment}>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      UPI
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleCardDetailsChange("cardNumber", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={cardDetails.cardholderName}
                        onChange={(e) => handleCardDetailsChange("cardholderName", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) => handleCardDetailsChange("expiryDate", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardDetailsChange("cvv", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="name@upi" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will receive a payment request on your UPI app. Please complete the payment within 5 minutes.
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : `Pay ₹${amount}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>Ticket Price</p>
                  <p>₹{amount}</p>
                </div>

                <div className="flex justify-between">
                  <p>Booking Fee</p>
                  <p>₹0.00</p>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>₹{amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
