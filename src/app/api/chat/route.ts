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
    // Simplified API key handling
    const apiKey = process.env.OPENAI_API_KEY;
    
    console.log("🔍 DEBUG - Environment info:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_REGION: process.env.VERCEL_REGION
    });
    
    console.log("🔍 DEBUG - API Key check:", {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      startsCorrectly: apiKey?.startsWith('sk-') || false,
      firstChars: apiKey?.substring(0, 8) || 'none',
      // Show all env vars containing 'API' or 'OPENAI' for debugging
      allEnvKeys: Object.keys(process.env).filter(key => 
        key.includes('API') || key.includes('OPENAI')
      )
    });

    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY environment variable not found!");
      return NextResponse.json(
        { reply: "Configuration error: OPENAI_API_KEY environment variable is missing." },
        { status: 500 }
      );
    }

    if (!apiKey.startsWith('sk-')) {
      console.error("❌ API key doesn't start with 'sk-'");
      return NextResponse.json(
        { reply: "Configuration error: Invalid API key format." },
        { status: 500 }
      );
    }

    // Initialize the OpenAI client - no need to clean the key
    const client = new OpenAI({ apiKey });

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { reply: "Please send a valid message to get started!" }, 
        { status: 400 }
      );
    }

    const userMessage = messages[messages.length - 1]?.content || "";
    console.log("🔍 DEBUG - User message:", userMessage);
    
    let sections;
    try {
      sections = await getResumeSections();
      console.log("✅ Resume sections loaded successfully");
    } catch (error) {
      console.error("❌ Error loading resume sections:", error);
      return NextResponse.json(
        { reply: "I'm having trouble accessing my resume data. Please try again." },
        { status: 500 }
      );
    }
    
    const relevantContext = getRelevantSections(userMessage, sections);
    console.log("🔍 DEBUG - Relevant context length:", relevantContext.length);

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

Always speak as ME (Kaushik) directly answering the question.`;

    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-6)
    ];

    console.log("🔍 DEBUG - About to call OpenAI API...");

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: conversationMessages,
      temperature: 0.3,
      max_tokens: 250,   
      top_p: 0.8,
      presence_penalty: 0.2,
      frequency_penalty: 0.3
    });

    console.log("✅ OpenAI API call successful");

    const reply = completion.choices[0].message.content?.trim() || 
      "I apologize, but I couldn't generate a proper response. Could you try asking again?";

    console.log("🔍 DEBUG - OpenAI reply:", reply);
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("❌ API Error Details:", {
      message: error?.message,
      code: error?.code,
      type: error?.type,
      status: error?.status,
      response: error?.response?.data
    });
    
    const errorMessage = error?.error?.message || error?.message || "Unknown error";
    
    if (errorMessage.includes("API key") || errorMessage.includes("Incorrect API key") || error?.code === 'invalid_api_key') {
      return NextResponse.json(
        { reply: "Configuration issue: The OpenAI API key appears to be invalid. Please check the key setup." },
        { status: 500 }
      );
    }
    
    if (errorMessage.includes("quota") || errorMessage.includes("rate limit") || error?.code === 'insufficient_quota') {
      return NextResponse.json(
        { reply: "I'm currently experiencing high demand. Please try again in a moment." },
        { status: 429 }
      );
    }

    if (errorMessage.includes("network") || errorMessage.includes("timeout")) {
      return NextResponse.json(
        { reply: "Network connection issue. Please try again." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { reply: `I encountered an issue: ${errorMessage}. Please try again.` },
      { status: 500 }
    );
  }
}