"use client";
import React, { useState, useEffect } from "react";

type Project = {
  id: number;
  title: string;
  tech: string;
  description: string;
  details: string;
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "🤖 Hi! I'm Sai's AI assistant. Ask me about his experience, skills, or projects!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100); // Slight delay for smooth initial render
  }, []);

  // --- Project Data ---
  const projects = [
    {
      id: 1,
      title: "ContextBridge – AI-Aware Task & Note Sync",
      tech: "Python, MCP, REST APIs",
      description:
        "Developed a personal productivity tool that synchronizes tasks and notes across apps using semantic context and AI-driven prioritization.",
      details:
        "I built ContextBridge as a personal project to explore how AI can improve productivity workflows. The system synchronizes tasks, notes, and schedules across multiple platforms while preserving semantic context such as project tags, deadlines, and related notes.\n\nOn the technical side, I used Python to implement the core engine, leveraged the Model Context Protocol (MCP) for standardized context handling, and exposed REST APIs for integration with external task managers and note-taking apps. The system also includes AI-based prioritization and scheduling suggestions, real-time syncing with offline/online support, and automatic conflict resolution.\n\nEven as a solo build, ContextBridge produced measurable improvements: reducing manual rescheduling by ~60%, improving task discoverability by ~75%, and helping users recover several hours per week.\n\nKey Features:\n- Context-aware syncing engine\n- REST APIs for cross-tool integration\n- Real-time sync with offline/online support\n- AI-driven prioritization and task linking\n- Practical experience in protocol design (MCP) and system interoperability",
    },
    {
      id: 2,
      title: "Job Notification Bot",
      tech: "Python, Telegram API, Web Scraping",
      description:
        "Built a Telegram bot that delivers real-time job alerts using keyword matching, resume-driven filtering, and automated web scraping.",
      details:
        "I created this project to streamline the job search process by delivering personalized job alerts directly to Telegram. The bot scrapes multiple job boards, filters results using keyword matching, and tailors notifications to a user's resume profile.\n\nThe system was implemented in Python, with job data collected using web scraping libraries and parsed for relevance. Notifications are delivered instantly via the Telegram API, ensuring users never miss a relevant posting.\n\nThis project demonstrated the power of automation in job searching by reducing manual searching effort, improving relevance of job matches, and ensuring faster responses to openings.\n\nKey Features:\n- Real-time job scraping and parsing\n- Resume-driven filtering logic\n- Keyword-based alert customization\n- Instant Telegram notifications\n- Automated scheduling for regular scans",
    },
    {
      id: 3,
      title: "Streak Widget",
      tech: "SwiftUI, iOS",
      description:
        "Designed a minimalist iOS habit-tracking widget with streak visualization, smart reminders, and adaptive UI for user motivation.",
      details:
        "I developed Streak Widget as a personal productivity tool to help users build and maintain habits. The widget emphasizes simplicity and motivation by visually representing habit streaks directly on the iOS home screen.\n\nBuilt with SwiftUI, the app leverages native iOS widget APIs for seamless integration. It supports streak visualization, goal customization, and adaptive UI that dynamically adjusts to user behavior. Smart reminders nudge users when streaks are at risk of breaking, promoting consistency.\n\nThis project strengthened my experience with iOS development and user-centric design, particularly around lightweight interactions and motivational UX patterns.\n\nKey Features:\n- Habit streak visualization directly on iOS widgets\n- Smart reminders and notifications\n- Goal customization with progress tracking\n- Adaptive UI for improved engagement\n- Minimalist, distraction-free design",
    },
    {
      id: 4,
      title: "FireFly Clone",
      tech: "React, CSS, Figma",
      description:
        "Built a full-featured clone of the FireFly app with React and CSS, replicating its UI with pixel-perfect precision and responsive design.",
      details:
        "This project was a UI/UX exercise where I replicated the FireFly app to practice frontend engineering and design fidelity. Using React for component-based structure and CSS for styling, I recreated the app's look and feel with precision across devices.\n\nI worked from Figma designs, ensuring pixel-perfect accuracy and responsiveness for both desktop and mobile. The project also emphasized best practices in React component architecture, reusable styling, and responsive layout techniques.\n\nThe end result was a polished, fully responsive clone of FireFly that demonstrates my ability to translate design mockups into production-ready frontends.\n\nKey Features:\n- Pixel-perfect UI replication from Figma\n- Fully responsive layout for desktop and mobile\n- Component-based architecture in React\n- Clean CSS styling and transitions\n- Attention to UX detail and design fidelity",
    },
  ];

  // --- Contact Info ---
  const contactInfo = {
    name: "Sai Kaushik Manchala",
    phone: "+1 (667) 324-9355",
    email: "kaushikworks@outlook.com",
    address: "Saint Charles, Missouri, US",
    linkedin: "https://www.linkedin.com/in/sai-kaushik-manchala-4b922b19b/",
    twitter: "https://x.com/saikaushik16",
    github: "https://github.com/Kaush910",
  };

  // --- Chat Handler ---
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { type: "user", text: inputValue }];
    setMessages(newMessages);
    const userInput = inputValue;
    setInputValue("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      setMessages([...newMessages, { type: "bot", text: data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { type: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    }
  };

  // --- Render Home ---
  const renderHome = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" style={{ backgroundColor: '#1a2332' }}></div>
      <div className="relative z-10 text-center px-4">
        <div className={`transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-light text-white">
            Hi, I'm <span className="font-light text-white">Sai Kaushik Manchala</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
            Software Engineer - Cloud Infrastructure — From Code to Cloud
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-12 transform transition-all duration-1000 ease-in-out delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <a
            href="/resume.pdf"
            className="px-8 py-4 rounded-full bg-white text-slate-900 text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-600 ease-in-out hover:scale-105"
          >
            Download Resume
          </a>
          <button
            onClick={() => setIsChatOpen(true)}
            className="px-8 py-4 rounded-full border border-gray-500 text-gray-300 hover:border-white hover:text-white text-lg font-semibold transition-all duration-600 ease-in-out hover:scale-105"
          >
            Ask My AI Assistant
          </button>
        </div>

        <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 ease-in-out delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {[
            { name: "Java", icon: "☕" },
            { name: "Python", icon: "🐍" },
            { name: "React", icon: "⚛️" },
            { name: "Spring Boot", icon: "🌱" },
            { name: "SQL", icon: "🗄️" },
            { name: "AWS", icon: "☁️" },
            { name: "Azure", icon: "🌐" },
            { name: "Terraform", icon: "🏗️" },
            { name: "Kubernetes", icon: "⚙️" },
            { name: "Splunk", icon: "📊" },
            { name: "MCP", icon: "🔗" },
            { name: "LLMs", icon: "🧠" },
          ].map((skill, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <div className="w-14 h-14 bg-slate-800/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-600 ease-in-out hover:scale-110 hover:-translate-y-1 border border-slate-600">
                <div className="text-lg text-gray-300">{skill.icon}</div>
              </div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300 mt-2 font-medium transition-colors duration-600 ease-in-out">
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // --- Render Contact ---
  const renderContact = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" style={{ backgroundColor: '#1a2332' }}></div>
      <div className="relative z-10 text-center px-4">
        <div className={`transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-light text-white">
            Contact Me
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Let's connect and discuss opportunities
          </p>
        </div>
        <div className={`grid md:grid-cols-2 gap-8 transform transition-all duration-1000 ease-in-out delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="bg-slate-800/40 backdrop-blur-md rounded-lg p-8 border border-slate-700 hover:bg-slate-800/60 transition-all duration-600 ease-in-out shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
              <span className="text-3xl">👤</span>
              Personal Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-600 ease-in-out">
                <span className="text-2xl text-gray-300">📱</span>
                <div>
                  <div className="font-semibold text-white">Phone</div>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-300 hover:text-white transition-colors duration-600 ease-in-out"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-700/50 transition-all duration-600 ease-in-out">
                <span className="text-2xl text-gray-300">📧</span>
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-300 hover:text-white transition-colors duration-600 ease-in-out"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-600 ease-in-out">
                <span className="text-2xl text-gray-300">📍</span>
                <div>
                  <div className="font-semibold text-white">Location</div>
                  <div className="text-gray-300">{contactInfo.address}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-md rounded-lg p-8 border border-slate-700 hover:bg-slate-800/60 transition-all duration-600 ease-in-out shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
              <span className="text-3xl">🌐</span>
              Connect Online
            </h3>
            <div className="space-y-4">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group"
              >
                <span className="text-3xl">💼</span>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                    Professional Profile
                  </div>
                </div>
              </a>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group"
              >
                <span className="text-3xl">💻</span>
                <div>
                  <div className="font-semibold">GitHub</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                    Code Repository
                  </div>
                </div>
              </a>
              <a
                href={contactInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group"
              >
                <span className="text-3xl">🐦</span>
                <div>
                  <div className="font-semibold">Twitter</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                    Follow for Updates
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // --- Render Projects ---
  const renderProjects = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" style={{ backgroundColor: '#1a2332' }}></div>
      <div className="relative z-10 text-center px-6 ml-20"> {/* Added ml-20 to shift content right */}
        <div className={`transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-light text-white">
            My Projects
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Showcasing technical expertise and innovation
          </p>
        </div>
        {!selectedProject ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group bg-slate-800/40 backdrop-blur-md rounded-lg p-4 border border-slate-700 cursor-pointer hover:bg-slate-800/60 hover:border-gray-500 transition-all duration-600 ease-in-out hover:scale-105 hover:-translate-y-2 hover:shadow-xl transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${300 + index * 200}ms`, maxWidth: '400px' }} // Reduced max width
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-gray-200 transition-colors duration-600 ease-in-out">
                    {project.title}
                  </h3>
                  <div className="inline-block px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full mb-2 border border-slate-600 group-hover:bg-slate-600/60 group-hover:border-slate-500 transition-all duration-600 ease-in-out">
                    {project.tech}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                  {project.description}
                </p>
                <div className="flex items-center">
                  <div className="text-gray-300 font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-600 ease-in-out group-hover:text-white">
                    <span>Learn More</span>
                    <span className="text-base transform group-hover:translate-x-2 transition-transform duration-600 ease-in-out">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`bg-slate-800/40 backdrop-blur-md rounded-lg p-8 border border-slate-700 shadow-lg transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} text-left`}>
            <button
              onClick={() => setSelectedProject(Project)}
              className="mb-6 text-gray-300 hover:text-white flex items-center gap-2 hover:gap-3 transition-all duration-600 ease-in-out group transform hover:-translate-x-1"
            >
              <span className="text-lg transform group-hover:-translate-x-1 transition-transform duration-600 ease-in-out">←</span>
              Back to Projects
            </button>
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-3 text-white">
                {selectedProject.title}
              </h3>
              <div className="inline-block px-4 py-2 bg-slate-700/50 text-gray-300 rounded-full mb-4 border border-slate-600">
                {selectedProject.tech}
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {selectedProject.details}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // --- Return Whole Page ---
  return (
    <>
      <style jsx>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        html, body, * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; /* Matching Brittany Chiang's font style */
        }
      `}</style>

      <nav className={`fixed top-8 right-8 z-50 flex gap-4 p-2 transform transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
        {["home", "projects", "contact"].map((page, index) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-600 ease-in-out hover:scale-105 ${
              currentPage === page
                ? "bg-white text-slate-900 shadow-lg scale-105"
                : "bg-transparent border border-slate-600 text-gray-300 hover:bg-slate-700/60 hover:text-white"
            }`}
            style={{ transitionDelay: `${100 + index * 150}ms` }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>

      <div className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
        {[
          { href: contactInfo.linkedin, icon: "💼", label: "LinkedIn Profile" },
          { href: `mailto:${contactInfo.email}`, icon: "📧", label: contactInfo.email },
          { href: `tel:${contactInfo.phone}`, icon: "📱", label: contactInfo.phone },
          { href: contactInfo.github, icon: "💻", label: "GitHub" },
        ].map((social, index) => (
          <div
            key={index}
            className={`relative group transform transition-all duration-800 ease-in-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            style={{ transitionDelay: `${150 + index * 200}ms` }}
          >
            <a
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="w-12 h-12 bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center border border-slate-600 hover:bg-slate-700/80 hover:border-gray-500 transition-all duration-600 ease-in-out hover:scale-110 hover:shadow-lg"
            >
              <span className="text-xl text-gray-300">{social.icon}</span>
            </a>
            <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-600 ease-in-out whitespace-nowrap shadow-lg border border-slate-600">
              {social.label}
            </span>
          </div>
        ))}
      </div>

      <main className="min-h-screen flex items-center justify-center p-8">
        {currentPage === "home" && renderHome()}
        {currentPage === "contact" && renderContact()}
        {currentPage === "projects" && renderProjects()}
      </main>

      {isChatOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800/95 backdrop-blur-md rounded-lg w-full max-w-lg h-[500px] flex flex-col border border-slate-600 shadow-2xl transform transition-all duration-800 ease-in-out animate-fadeSlideIn">
            <div className="flex justify-between items-center p-6 border-b border-slate-600">
              <div>
                <h3 className="text-xl font-semibold text-white">AI Assistant</h3>
                <p className="text-sm text-gray-300">Ask me about Sai's experience</p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-gray-200 w-8 h-8 rounded-full hover:bg-slate-700 flex items-center justify-center transition-all duration-600 ease-in-out hover:scale-110 hover:rotate-90"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fadeSlideIn`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg transition-all duration-600 ease-in-out hover:scale-105 ${
                      msg.type === "user"
                        ? "bg-white text-slate-900 shadow-lg"
                        : "bg-slate-700 text-gray-100 border border-slate-600 shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-600">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about experience, skills, projects..."
                  className="flex-1 bg-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 transition-all duration-600 ease-in-out focus:scale-105"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-white text-slate-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-all duration-600 ease-in-out font-medium hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
