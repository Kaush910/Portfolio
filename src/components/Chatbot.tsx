"use client"
import { useState } from "react"

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "🤖 Hi! I'm Kaushik's AI assistant. Ask me about his skills, projects, or experience!" }
  ])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    if (!input) return

    const newMessages = [...messages, { sender: "user", text: input }]
    setMessages(newMessages)
    setInput("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      setMessages([...newMessages, { sender: "bot", text: data.reply }])
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Something went wrong. Please try again." }])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-gray-900/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl p-4 animate-fadeIn">
      {/* Messages */}
      <div className="h-64 overflow-y-auto mb-3 space-y-2 pr-1 custom-scrollbar">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg text-sm ${
              m.sender === "bot"
                ? "bg-purple-600/20 text-purple-300 border border-purple-400/20"
                : "bg-green-600/20 text-green-300 border border-green-400/20 text-right"
            }`}
          >
            <b>{m.sender === "bot" ? "AI:" : "You:"}</b> {m.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex">
        <input
          className="flex-1 px-3 py-2 rounded-l-xl bg-gray-800/80 border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500/30 outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-r-xl font-semibold hover:scale-105 transition-transform"
        >
          Send
        </button>
      </div>
    </div>
  )
}
