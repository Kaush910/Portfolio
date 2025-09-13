import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getResumeText } from "@/lib/resume"

export async function POST(req: Request) {
  // Debug logging
  console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY)
  console.log("OPENAI_API_KEY length:", process.env.OPENAI_API_KEY?.length || 0)
  
  const { message } = await req.json()
  
  // Check if API key exists before proceeding
  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY environment variable")
    return NextResponse.json(
      { reply: "OpenAI API key is not configured" },
      { status: 500 }
    )
  }

  try {
    const resume = await getResumeText()
    
    // ✅ Instantiate client here, at runtime
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Sai Kaushik Manchala. Answer questions based on the following resume:

${resume}

Instructions:
- Answer questions about Kaushik's skills, experience, projects, education, and background based on the resume
- Be conversational and helpful 
- Look for partial matches, acronyms, and related terms (e.g., if someone asks about "MCP", relate it to "MCP integration" in the projects)
- If someone asks about specific technologies, tools, or concepts mentioned in the resume, provide relevant details
- If the information is not in the resume or not related to Kaushik's background, politely say "This is not mentioned in Kaushik's resume" or "I don't have information about that in Kaushik's resume"
- Be specific and detailed when the information is available in the resume
- Use a friendly, professional tone`
        },
        { role: "user", content: message }
      ]
    })

    const reply = completion.choices[0].message.content
    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error("OpenAI API error:", err)
    console.error("Error details:", err.message)
    return NextResponse.json(
      { reply: "Sorry, there was an error processing your request." },
      { status: 500 }
    )
  }
}

// Add a GET method for testing
export async function GET() {
  return NextResponse.json({ 
    message: "Chat API is running",
    hasApiKey: !!process.env.OPENAI_API_KEY,
    apiKeyLength: process.env.OPENAI_API_KEY?.length || 0
  })
}