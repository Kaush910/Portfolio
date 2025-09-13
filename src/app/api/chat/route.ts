import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getResumeText } from "@/lib/resume"

export async function POST(req: Request) {
  const { message } = await req.json()
  const resume = await getResumeText()

  // ✅ Instantiate client here, at runtime
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
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
    return NextResponse.json(
      { reply: "Sorry, there was an error processing your request." },
      { status: 500 }
    )
  }
}