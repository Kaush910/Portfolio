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
    // Step 1: Enhanced environment variable debugging
    console.log("🔍 ENVIRONMENT DEBUG:")
    console.log("- NODE_ENV:", process.env.NODE_ENV)
    console.log("- VERCEL:", process.env.VERCEL)
    console.log("- VERCEL_ENV:", process.env.VERCEL_ENV)
    
    // Check all possible API key environment variables
    const envKeys = [
      'OPENAI_API_KEY',
      'MY_SECRET_KEY', 
      'OPENAI_KEY',
      'MY_OPENAI_KEY',
      'API_KEY',
      'OPENAI_API_KEY_BASE64'
    ]
    
    console.log("🔍 CHECKING ALL POSSIBLE ENV VARS:")
    envKeys.forEach(key => {
      const value = process.env[key]
      console.log(`- ${key}:`, {
        exists: !!value,
        length: value?.length || 0,
        startsWithSk: value?.startsWith('sk-') || false,
        first10: value?.substring(0, 10) || 'none',
        last4: value?.substring(value?.length - 4) || 'none'
      })
    })

    // Step 2: Get API key with multiple fallbacks
    let apiKey = process.env.OPENAI_API_KEY?.trim() || 
                 process.env.MY_SECRET_KEY?.trim() ||
                 process.env.OPENAI_KEY?.trim() ||
                 process.env.MY_OPENAI_KEY?.trim() ||
                 process.env.API_KEY?.trim()

    // Handle base64 encoded key if present
    if (!apiKey && process.env.OPENAI_API_KEY_BASE64) {
      try {
        apiKey = Buffer.from(process.env.OPENAI_API_KEY_BASE64, 'base64').toString('utf-8').trim()
        console.log("✅ Using base64 decoded API key")
      } catch (e) {
        console.error("❌ Failed to decode base64 key:", e)
      }
    }

    // Step 3: Detailed API key validation
    console.log("🔍 FINAL API KEY ANALYSIS:")
    if (!apiKey) {
      console.error("❌ NO API KEY FOUND!")
      return NextResponse.json({
        reply: `DEBUG: No API key found. Environment: ${process.env.VERCEL_ENV || 'local'}. Total env vars: ${Object.keys(process.env).length}`
      }, { status: 500 })
    }

    console.log("- Key length:", apiKey.length)
    console.log("- Starts with sk-:", apiKey.startsWith('sk-'))
    console.log("- Contains sk-proj:", apiKey.includes('proj-'))
    console.log("- Has whitespace:", /\s/.test(apiKey))
    console.log("- Key structure:", `${apiKey.substring(0, 15)}...${apiKey.substring(apiKey.length - 10)}`)

    // Validate API key format
    if (!apiKey.startsWith('sk-')) {
      console.error("❌ API key doesn't start with 'sk-'")
      return NextResponse.json({
        reply: `Invalid API key format. Key starts with: ${apiKey.substring(0, 10)}`
      }, { status: 500 })
    }

    // Check if it's the new format (sk-proj-) or old format (sk-)
    const isNewFormat = apiKey.startsWith('sk-proj-')
    const isOldFormat = apiKey.startsWith('sk-') && !apiKey.startsWith('sk-proj-')
    
    console.log("- New format (sk-proj-):", isNewFormat)
    console.log("- Old format (sk-):", isOldFormat)

    // Step 4: Initialize OpenAI with enhanced configuration
    console.log("🔍 INITIALIZING OPENAI CLIENT...")
    
    const openai = new OpenAI({
      apiKey: apiKey,
      // Add additional configuration for debugging
      timeout: 30000, // 30 seconds timeout
      maxRetries: 2,
    })

    // Step 5: Process the request
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { reply: "Please send a valid message to get started!" }, 
        { status: 400 }
      )
    }

    const userMessage = messages[messages.length - 1]?.content || ""
    console.log("🔍 User message:", userMessage.substring(0, 100))
    
    // Step 6: Load resume sections
    let sections
    try {
      sections = await getResumeSections()
      console.log("✅ Resume sections loaded successfully")
    } catch (error) {
      console.error("❌ Error loading resume sections:", error)
      return NextResponse.json(
        { reply: "I'm having trouble accessing my resume data. Please try again." },
        { status: 500 }
      )
    }
    
    const relevantContext = getRelevantSections(userMessage, sections)
    console.log("🔍 Context length:", relevantContext.length)

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

    // Step 7: Make OpenAI API call with enhanced error handling
    console.log("🔍 CALLING OPENAI API...")
    console.log("- Model: gpt-4o-mini")
    console.log("- Messages count:", conversationMessages.length)

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

      console.log("✅ OpenAI API call successful")
      console.log("- Usage:", completion.usage)

      const reply = completion.choices[0].message.content?.trim() || 
        "I apologize, but I couldn't generate a proper response. Could you try asking again?"

      return NextResponse.json({ reply })
      
    } catch (apiError: any) {
      console.error("🔥 OPENAI API ERROR DETAILS:")
      console.error("- Error type:", apiError?.constructor?.name)
      console.error("- Message:", apiError?.message)
      console.error("- Code:", apiError?.code)
      console.error("- Type:", apiError?.type)
      console.error("- Status:", apiError?.status)
      console.error("- Response data:", apiError?.response?.data)
      console.error("- Headers:", apiError?.response?.headers)
      
      // Specific error handling based on OpenAI error types
      if (apiError?.code === 'invalid_api_key' || apiError?.message?.includes('Incorrect API key')) {
        return NextResponse.json(
          { 
            reply: `Authentication failed. API key issue detected. Key format: ${apiKey.startsWith('sk-proj-') ? 'new format' : 'old format'}. Please verify your OpenAI API key.` 
          },
          { status: 401 }
        )
      }
      
      if (apiError?.code === 'insufficient_quota') {
        return NextResponse.json(
          { reply: "OpenAI API quota exceeded. Please check your billing in the OpenAI dashboard." },
          { status: 429 }
        )
      }

      if (apiError?.code === 'rate_limit_exceeded') {
        return NextResponse.json(
          { reply: "Rate limit exceeded. Please wait a moment and try again." },
          { status: 429 }
        )
      }

      if (apiError?.code === 'model_not_found') {
        return NextResponse.json(
          { reply: "Model access issue. Please check your OpenAI plan supports gpt-4o-mini." },
          { status: 400 }
        )
      }
      
      // Generic API error
      return NextResponse.json(
        { 
          reply: `OpenAI API Error: ${apiError?.message || 'Unknown error'}. Code: ${apiError?.code || 'none'}` 
        },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error("❌ GENERAL ERROR:")
    console.error("- Type:", error?.constructor?.name)
    console.error("- Message:", error?.message)
    console.error("- Stack:", error?.stack?.split('\n').slice(0, 3))
    
    return NextResponse.json(
      { 
        reply: `Server error: ${error?.message || 'Unknown error'}. Please try again.` 
      },
      { status: 500 }
    )
  }
}