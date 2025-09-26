import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getResumeSections } from "@/lib/resume"

// Enhanced keyword matching for better context retrieval
function getRelevantSections(userMessage: string, sections: any) {
  const message = userMessage.toLowerCase()
  const relevantSections: string[] = []
  
  // Always include summary for context
  relevantSections.push(`=== SUMMARY ===\n${sections.summary}`)
  
  // Skill-related keywords
  if (message.match(/skill|technology|tech|stack|tool|language|framework|cloud|aws|azure|kubernetes|docker|python|go|terraform|devops|programming/)) {
    relevantSections.push(`=== TECHNICAL SKILLS ===\n${sections.skills}`)
  }
  
  // Experience-related keywords
  if (message.match(/work|job|experience|role|company|project|responsibility|achievement|career|previous|current|employer/)) {
    relevantSections.push(`=== WORK EXPERIENCE ===\n${sections.experience}`)
  }
  
  // Project-related keywords
  if (message.match(/project|built|created|developed|application|app|build|side project/)) {
    relevantSections.push(`=== PROJECTS ===\n${sections.projects}`)
  }
  
  // Education-related keywords
  if (message.match(/education|degree|university|college|study|gpa|coursework|academic/)) {
    relevantSections.push(`=== EDUCATION ===\n${sections.education}`)
  }
  
  // Certification-related keywords
  if (message.match(/certification|certified|cert|credential|azure|aws|microsoft/)) {
    relevantSections.push(`=== CERTIFICATIONS ===\n${sections.certifications}`)
  }
  
  // If no specific matches, include key sections
  if (relevantSections.length === 1) { // Only summary
    relevantSections.push(`=== TECHNICAL SKILLS ===\n${sections.skills}`)
    relevantSections.push(`=== WORK EXPERIENCE ===\n${sections.experience}`)
  }
  
  return relevantSections.join('\n\n')
}

export async function POST(req: Request) {
  try {
    // Simplified API key retrieval with proper trimming
    let apiKey = process.env.OPENAI_API_KEY?.trim() || 
                 process.env.MY_SECRET_KEY?.trim() ||
                 process.env.OPENAI_KEY?.trim() ||
                 process.env.MY_OPENAI_KEY?.trim()

    console.log("🔍 API Key Debug:", {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      keyLength: apiKey?.length || 0,
      startsWithSk: apiKey?.startsWith('sk-') || false,
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    })

    if (!apiKey) {
      console.error("❌ No API key found in environment variables")
      return NextResponse.json({
        reply: "Server configuration error: API key not found. Please contact the administrator."
      }, { status: 500 })
    }

    if (!apiKey.startsWith('sk-')) {
      console.error("❌ Invalid API key format")
      return NextResponse.json({
        reply: "Server configuration error: Invalid API key format."
      }, { status: 500 })
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    })

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { reply: "Please send a valid message to get started!" }, 
        { status: 400 }
      )
    }

    const userMessage = messages[messages.length - 1]?.content || ""
    
    let sections
    try {
      sections = await getResumeSections()
    } catch (error) {
      console.error("❌ Error loading resume sections:", error)
      return NextResponse.json(
        { reply: "I'm having trouble accessing my resume data. Please try again." },
        { status: 500 }
      )
    }
    
    const relevantContext = getRelevantSections(userMessage, sections)

    const systemPrompt = `You are Kaushik speaking directly to someone asking about my background. I am a Software Engineer with cloud infrastructure expertise.

STRICT RULES:
1. Always use "I", "my", "me" - NEVER "he", "his", "him", "Kaushik"
2. Give specific details: company names, years, technologies, metrics
3. If something isn't in my resume, say "I don't have that information in my resume"
4. Keep responses under 150 words
5. Sound natural and conversational

MY RESUME DATA:
${relevantContext}

Examples of good responses:
- "I worked at Charter Communications from May 2024 to April 2025 where I migrated databases to Azure SQL..."
- "I'm experienced with Azure, AWS, Kubernetes, and Terraform. At my current role at Mastronardi Produce..."
- "My recent projects include ContextBridge, which I built using Python and MCP integration..."

Always speak as ME (Kaushik) directly answering the question.`

    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-6)
    ]

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: conversationMessages,
        temperature: 0.3,
        max_tokens: 250,   
        top_p: 0.8,
        presence_penalty: 0.2,
        frequency_penalty: 0.3
      })

      const reply = completion.choices[0].message.content?.trim() || 
        "I apologize, but I couldn't generate a proper response. Could you try asking again?"

      return NextResponse.json({ reply })
      
    } catch (apiError: any) {
      console.error("🔥 OpenAI API Error:", {
        message: apiError?.message,
        code: apiError?.code,
        type: apiError?.type,
        status: apiError?.status
      })
      
      if (apiError?.code === 'invalid_api_key') {
        return NextResponse.json(
          { reply: "API authentication failed. Please check the API key configuration." },
          { status: 401 }
        )
      }
      
      if (apiError?.code === 'insufficient_quota') {
        return NextResponse.json(
          { reply: "API quota exceeded. Please try again later." },
          { status: 429 }
        )
      }
      
      return NextResponse.json(
        { reply: "I'm experiencing technical difficulties. Please try again." },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error("❌ General Error:", error?.message)
    
    return NextResponse.json(
      { reply: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}