"use client"
import { useState, useRef, useEffect } from "react"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

// Predefined quick questions to guide users
const QUICK_QUESTIONS = [
  "What technologies do you work with?",
  "Tell me about your recent projects",
  "What's your experience with Azure?",
  "What DevOps tools do you use?",
  "Tell me about your current role"
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "👋 Hi! I'm Kaushik's AI assistant. I can tell you about my experience, skills, projects, and background. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showQuestions, setShowQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input.trim()
    console.log("🔍 FRONTEND - sendMessage called with:", messageToSend)
    
    if (!messageToSend || isLoading) {
      console.log("🔍 FRONTEND - Message blocked:", { messageToSend, isLoading })
      return
    }

    console.log("🔍 FRONTEND - Processing message...")

    // Hide quick questions after first user message
    setShowQuestions(false)

    const newMessage: Message = { 
      role: "user", 
      content: messageToSend, 
      timestamp: new Date() 
    }
    const newMessages = [...messages, newMessage]
    
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    console.log("🔍 FRONTEND - About to call API with:", newMessages.length, "messages")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      console.log("🔍 FRONTEND - API response status:", res.status)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log("🔍 FRONTEND - API response data:", data)
      
      const assistantMessage: Message = { 
        role: "assistant", 
        content: data.reply,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      
      // Focus back to input after response
      setTimeout(() => inputRef.current?.focus(), 100)
      
    } catch (error) {
      console.error("🔍 FRONTEND - Chat error:", error)
      const errorMessage: Message = { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.", 
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Simple formatting for bullet points and line breaks
    return content
      .split('\n')
      .map((line, index) => {
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          return <li key={index} className="ml-4">{line.trim().substring(1).trim()}</li>
        }
        return line.trim() ? <p key={index} className="mb-1">{line}</p> : <br key={index} />
      })
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <h3 className="text-white font-semibold">💬 Chat with Kaushik's AI</h3>
        <p className="text-gray-400 text-xs">Ask about experience, skills, or projects</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-xl text-sm ${
                message.role === "assistant"
                  ? "bg-purple-600/20 text-purple-100 border border-purple-400/20"
                  : "bg-green-600/20 text-green-100 border border-green-400/20"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="space-y-1">
                  {formatMessage(message.content)}
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-purple-600/20 text-purple-300 border border-purple-400/20 p-3 rounded-xl text-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                </div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick questions (shown initially) */}
        {showQuestions && messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-gray-400 text-xs">Try asking:</p>
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => sendMessage(question)}
                className="block w-full text-left p-2 text-xs bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 rounded-lg text-gray-300 hover:text-white transition-all"
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            className="flex-1 px-3 py-2 rounded-xl bg-gray-800/80 border border-gray-600/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 outline-none text-white placeholder-gray-400 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Kaushik..."
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            maxLength={500}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 text-sm"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send • {input.length}/500
        </div>
      </div>
    </div>
  )
}