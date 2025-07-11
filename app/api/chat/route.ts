import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Allow responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // In a real application, this would connect to AWS Lex
  // For now, we'll use OpenAI as a placeholder
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system:
      "You are a helpful Indian bus booking assistant. Provide concise, accurate information about bus schedules, booking procedures, cancellations, refunds, and other travel-related inquiries for Indian routes. Keep responses brief and focused on bus travel information. Occasionally use Hindi greetings like 'नमस्ते' to add a local touch.",
  })

  return result.toDataStreamResponse()
}
