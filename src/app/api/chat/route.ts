// src/app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getResumeText } from "@/lib/resume"

export async function POST(req: Request) {
  console.log("🚀 API Route called")
  
  try {
    // Check API key
    const hasApiKey = !!process.env.OPENAI_API_KEY
    const apiKeyLength = process.env.OPENAI_API_KEY?.length || 0
    console.log("🔑 OPENAI_API_KEY exists:", hasApiKey)
    console.log("🔑 OPENAI_API_KEY length:", apiKeyLength)
    
    if (!hasApiKey) {
      console.error("❌ Missing OPENAI_API_KEY environment variable")
      return NextResponse.json(
        { reply: "OpenAI API key is not configured" },
        { status: 500 }
      )
    }

    // Parse request
    console.log("📥 Parsing request body...")
    const { message } = await req.json()
    console.log("💬 User message:", message?.substring(0, 100) + "...")

    // Get resume
    console.log("📄 Getting resume text...")
    const resume = await getResumeText()
    console.log("📄 Resume length:", resume?.length || 0, "characters")

    // Initialize OpenAI
    console.log("🤖 Initializing OpenAI client...")
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Make API call
    console.log("🔄 Making OpenAI API call...")
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
    console.log("✅ OpenAI response received:", reply?.substring(0, 100) + "...")
    
    return NextResponse.json({ reply })
    
  } catch (err: any) {
    console.error("❌ Error occurred:", err.name)
    console.error("❌ Error message:", err.message)
    console.error("❌ Error stack:", err.stack)
    
    // More specific error messages
    if (err.message?.includes('API key')) {
      return NextResponse.json(
        { reply: "OpenAI API key issue: " + err.message },
        { status: 500 }
      )
    }
    
    if (err.message?.includes('quota')) {
      return NextResponse.json(
        { reply: "OpenAI quota exceeded. Please try again later." },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        reply: "Sorry, there was an error processing your request.", 
        error: err.message 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log("🔍 GET request to /api/chat")
  
  return NextResponse.json({ 
    message: "Chat API is running",
    hasApiKey: !!process.env.OPENAI_API_KEY,
    apiKeyLength: process.env.OPENAI_API_KEY?.length || 0,
    timestamp: new Date().toISOString()
  })
}