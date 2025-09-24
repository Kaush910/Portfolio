import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getResumeSections } from "@/lib/resume"

// Remove the global client initialization - this was causing the build error!
// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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
    // Initialize the OpenAI client here instead of at module level
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const { messages } = await req.json()

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { reply: "Please send a valid message to get started!" }, 
        { status: 400 }
      )
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || ""
    console.log("🔍 DEBUG - User message:", userMessage)
    
    // Load resume sections
    const sections = await getResumeSections()
    
    // Get relevant context based on user query
    const relevantContext = getRelevantSections(userMessage, sections)
    console.log("🔍 DEBUG - Relevant context length:", relevantContext.length)

    // Create a focused system prompt
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

    console.log("🔍 DEBUG - System prompt preview:", systemPrompt.substring(0, 100) + "...")

    // Build conversation with context
    const conversationMessages = [
      { role: "system", content: systemPrompt },
      // Only keep last few messages to avoid context dilution
      ...messages.slice(-6)
    ]

    // Call OpenAI with optimized parameters
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: conversationMessages,
      temperature: 0.3, // Lower temperature for more consistent first-person responses
      max_tokens: 250,   
      top_p: 0.8,
      presence_penalty: 0.2,  // Encourage staying on topic
      frequency_penalty: 0.3   // Reduce repetitive responses
    })

    const reply = completion.choices[0].message.content?.trim() || 
      "I apologize, but I couldn't generate a proper response. Could you try asking again?"

    console.log("🔍 DEBUG - OpenAI reply:", reply)
    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("OpenAI API Error:", error)
    
    // More helpful error responses
    const errorMessage = error?.error?.message || error?.message || "Unknown error"
    
    if (errorMessage.includes("API key")) {
      return NextResponse.json(
        { reply: "I'm having trouble with my configuration. Please check the API key setup." },
        { status: 500 }
      )
    }
    
    if (errorMessage.includes("quota") || errorMessage.includes("rate limit")) {
      return NextResponse.json(
        { reply: "I'm currently experiencing high demand. Please try again in a moment." },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { reply: "I encountered an issue processing your request. Please try again." },
      { status: 500 }
    )
  }
}