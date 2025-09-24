"use client";
import React, { useState, useEffect } from "react";
import Chatbot from '@/components/Chatbot';

type Project = {
 id: number;
 title: string;
 tech: string;
 description: string;
 details: string;
 features: string[];
 github?: string;
 demo?: string;
};

type Experience = {
 id: number;
 title: string;
 company: string;
 period: string;
 location: string;
 achievements: string[];
 technologies: string[];
};

export default function Home() {
 const [currentPage, setCurrentPage] = useState("home");
 const [isChatOpen, setIsChatOpen] = useState(false);
 const [isLoaded, setIsLoaded] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [expandedProject, setExpandedProject] = useState<number | null>(null);

 useEffect(() => {
   setTimeout(() => setIsLoaded(true), 100);
 }, []);

 // Enhanced Experience Data
 const experiences: Experience[] = [
   {
     id: 1,
     title: "Software Engineer - Infrastructure",
     company: "Mastronardi Produce Limited",
     period: "May 2025 – Present",
     location: "Remote",
     technologies: ["Terraform", "Azure", "DevOps", "Kubernetes", "Monitoring"],
     achievements: [
       "Designed reusable Terraform modules and automated Azure infrastructure provisioning for 6 enterprise applications",
       "Automated deployment of Azure SQL using Terraform and Azure DevOps pipelines",
       "Deployed and configured Azure APIMs, Function Apps, Web App Services, and AKS clusters",
       "Built Terraform-based automation for NSGs, WAFs, and related Azure security resources",
       "Integrated Delinia and CrowdStrike into Azure workloads for enterprise-grade endpoint protection",
       "Implemented proactive monitoring with Azure Metric Insights to optimize performance"
     ]
   },
   {
     id: 2,
     title: "Software Engineer – DevOps",
     company: "Charter Communications", 
     period: "May 2024 – Apr 2025",
     location: "St.Louis, MO",
     technologies: ["AWS", "Terraform", "Docker", "Kubernetes", "Java", "Spring Boot"],
     achievements: [
       "Led migration of mission-critical transactional databases to Azure SQL with zero downtime",
       "Containerized 20+ Java Spring Boot microservices using Docker and Helm",
       "Built robust CI/CD pipelines reducing deployment errors by 60%",
       "Administered Apache Kafka clusters processing tens of millions of daily events"
     ]
   },
   {
     id: 3,
     title: "Software Engineer",
     company: "Pristen IT Systems",
     period: "Aug 2023 – May 2024", 
     location: "Austin, TX",
     technologies: ["Python", "Go", "Kubernetes", "Microservices", "APIs"],
     achievements: [
       "Designed Python modules for Verastel-Spark compliance monitoring platform",
       "Developed RESTful APIs with robust authentication and authorization controls",
       "Engineered scalable microservices and data ingestion workflows",
       "Automated deployments using Kubernetes manifests and Helm charts"
     ]
   },
   {
     id: 4,
     title: "Software Developer",
     company: "Qualcomm India",
     period: "May 2019 – July 2021",
     location: "Hyderabad, India", 
     technologies: ["C++", "Python", "Jenkins", "Firmware", "Debugging"],
     achievements: [
       "Implemented C++ modules for Bluetooth and Wi-Fi firmware",
       "Automated nightly build validation reducing manual QA effort by 30%",
       "Integrated Jenkins CI/CD pipelines for continuous builds",
       "Debugged kernel-level crashes using GDB and performance profilers"
     ]
   }
 ];

 // Enhanced Project Data
 const projects: Project[] = [
   {
     id: 1,
     title: "ContextBridge – AI-Aware Task & Note Sync",
     tech: "Python • MCP • REST APIs • AI",
     description: "Personal productivity tool that synchronizes tasks and notes across apps using semantic context.",
     features: [
       "Context-aware syncing engine",
       "REST APIs for cross-tool integration", 
       "Real-time sync with offline support",
       "AI-driven prioritization",
       "MCP protocol implementation"
     ],
     details: "Built as a personal exploration into AI-enhanced productivity workflows, addressing task management fragmentation by creating intelligent connections between productivity tools."
   },
   {
     id: 2,
     title: "Job Notification Bot",
     tech: "Python • Telegram API • Web Scraping • Automation",
     description: "Intelligent Telegram bot delivering personalized job alerts through advanced keyword matching.",
     features: [
       "Multi-platform job scraping",
       "Resume-driven filtering logic",
       "Keyword-based alert customization",
       "Instant Telegram notifications", 
       "Automated scheduling system"
     ],
     details: "Developed to streamline job search by delivering relevant opportunities directly to mobile devices through Telegram's messaging platform."
   },
   {
     id: 3,
     title: "Streak Widget",
     tech: "SwiftUI • iOS • Widget Extensions • Core Data",
     description: "Minimalist iOS habit-tracking widget featuring streak visualization and smart reminders.",
     features: [
       "Home screen widget integration",
       "Streak visualization and analytics",
       "Smart reminder system",
       "Goal customization and tracking",
       "Minimalist, distraction-free design"
     ],
     details: "Native iOS application focused on habit formation through visual motivation and seamless iOS ecosystem integration."
   },
   {
     id: 4,
     title: "FireFly Clone", 
     tech: "React • CSS3 • Responsive Design • Figma",
     description: "Pixel-perfect recreation of the FireFly application featuring responsive design.",
     features: [
       "Pixel-perfect UI replication",
       "Fully responsive layout system",
       "Component-based architecture",
       "Smooth animations and transitions",
       "Cross-browser compatibility"
     ],
     details: "Comprehensive frontend engineering exercise focused on translating high-fidelity designs into production-quality code."
   }
 ];

 // Contact Info
 const contactInfo = {
   name: "Sai Kaushik Manchala",
   phone: "+1 (667) 324-9355", 
   email: "kaushikworks@outlook.com",
   address: "Saint Charles, Missouri, US",
   linkedin: "https://www.linkedin.com/in/sai-kaushik-manchala-4b922b19b/",
   twitter: "https://x.com/saikaushik16",
   github: "https://github.com/Kaush910",
 };

 // Render Home
 const renderHome = () => (
   <>
     <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" style={{ backgroundColor: '#1a2332' }}></div>
     <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
       <div className={`transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 font-light text-white leading-tight">
           Hi, I'm <span className="font-light text-white">Sai Kaushik Manchala</span>
         </h1>
         <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto font-light px-2">
           Software Engineer - Cloud Infrastructure — From Code to Cloud
         </p>
       </div>

       <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 transform transition-all duration-1000 ease-in-out delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} px-4`}>
         <a
           href="/resume.pdf"
           className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-slate-900 text-base sm:text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-600 ease-in-out hover:scale-105 text-center"
         >
           Download Resume
         </a>
         <button
           onClick={() => setIsChatOpen(true)}
           className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-gray-500 text-gray-300 hover:border-white hover:text-white text-base sm:text-lg font-semibold transition-all duration-600 ease-in-out hover:scale-105 text-center"
         >
           Ask My AI Assistant
         </button>
       </div>

       <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-4xl mx-auto transform transition-all duration-1000 ease-in-out delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} px-4`}>
         {[
           { name: "Java", icon: "{ }", color: "text-orange-400" },
           { name: "Python", icon: "λ", color: "text-green-400" },
           { name: "React", icon: "⚛", color: "text-cyan-400" },
           { name: "Spring Boot", icon: "◉", color: "text-green-500" },
           { name: "SQL", icon: "⚡", color: "text-yellow-400" },
           { name: "AWS", icon: "△", color: "text-orange-500" },
           { name: "Azure", icon: "◈", color: "text-blue-400" },
           { name: "Terraform", icon: "⟐", color: "text-purple-400" },
           { name: "Kubernetes", icon: "⬡", color: "text-blue-300" },
           { name: "Splunk", icon: "▣", color: "text-green-400" },
           { name: "MCP", icon: "⟋", color: "text-cyan-300" },
           { name: "LLMs", icon: "◎", color: "text-pink-400" },
         ].map((skill, idx) => (
           <div key={idx} className="group flex flex-col items-center">
             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-600 ease-in-out hover:scale-110 hover:-translate-y-1 border border-cyan-400/50 hover:border-cyan-300">
               <div className={`text-lg sm:text-xl ${skill.color} group-hover:brightness-110 transition-all duration-600 font-bold`}>{skill.icon}</div>
             </div>
             <div className="text-xs sm:text-xs text-cyan-400/80 group-hover:text-cyan-300 mt-2 font-medium transition-colors duration-600 ease-in-out text-center">
               {skill.name}
             </div>
           </div>
         ))}
       </div>
     </div>
   </>
 );

 // Enhanced Experience Section
 const renderExperience = () => (
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{ backgroundColor: '#1a2332' }}>
     <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
       <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-light text-white">
           Professional Experience
         </h2>
       </div>
      
       <div className="max-w-6xl mx-auto">
         <div className="space-y-8 sm:space-y-12">
           {experiences.map((exp, index) => (
             <div
               key={exp.id}
               className={`group bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700 hover:bg-slate-800/60 hover:border-gray-500 transition-all duration-600 ease-in-out hover:shadow-2xl transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
               style={{ transitionDelay: `${300 + index * 200}ms` }}
             >
               <div className="p-6 sm:p-8">
                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                   <div className="flex-grow">
                     <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-gray-200 transition-colors duration-600 ease-in-out mb-2">
                       {exp.title}
                     </h3>
                     <div className="text-cyan-400 font-semibold text-lg mb-2">
                       {exp.company}
                     </div>
                     <div className="text-gray-400 text-sm">
                       {exp.location}
                     </div>
                   </div>
                   <div className="flex-shrink-0">
                     <div className="inline-block px-4 py-2 bg-slate-700/50 text-gray-300 text-sm rounded-full border border-slate-600">
                       {exp.period}
                     </div>
                   </div>
                 </div>

                 <div className="mb-6">
                   <div className="flex flex-wrap gap-2">
                     {exp.technologies.map((tech, techIndex) => (
                       <span
                         key={techIndex}
                         className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20"
                       >
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>

                 <div>
                   <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                     Key Achievements
                   </h4>
                   <div className="grid gap-4">
                     {exp.achievements.map((achievement, achIndex) => (
                       <div key={achIndex} className="flex items-start gap-3">
                         <div className="flex-shrink-0 w-6 h-6 bg-slate-700/50 rounded-full flex items-center justify-center mt-0.5">
                           <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                         </div>
                         <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                           {achievement}
                         </p>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );

 // Enhanced Projects Section
 const renderProjects = () => (
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{ backgroundColor: '#1a2332' }}>
     <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
       <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-light text-white">
           Featured Projects
         </h2>
       </div>
      
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
         {projects.map((project, index) => (
           <div
             key={project.id}
             className={`group bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700 hover:bg-slate-800/60 hover:border-gray-500 transition-all duration-600 ease-in-out hover:shadow-2xl transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} overflow-hidden`}
             style={{ transitionDelay: `${300 + index * 200}ms` }}
           >
             <div className="p-6 sm:p-8 border-b border-slate-700/50">
               <div className="flex items-start justify-between gap-4 mb-4">
                 <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-gray-200 transition-colors duration-600 ease-in-out flex-grow">
                   {project.title}
                 </h3>
                 <button
                   onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                   className="flex-shrink-0 w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-600 ease-in-out"
                 >
                   {expandedProject === project.id ? '−' : '+'}
                 </button>
               </div>
              
               <div className="text-cyan-400 text-sm font-medium mb-4 bg-slate-900/30 rounded-lg px-3 py-2 border border-cyan-400/20">
                 {project.tech}
               </div>
              
               <p className="text-gray-300 text-sm leading-relaxed">
                 {project.description}
               </p>
             </div>

             <div className="p-6 sm:p-8">
               <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                 <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                 Key Features
               </h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                 {project.features.map((feature, featureIndex) => (
                   <div key={featureIndex} className="flex items-center gap-2 text-sm">
                     <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
                     <span className="text-gray-300">{feature}</span>
                   </div>
                 ))}
               </div>

               {expandedProject === project.id && (
                 <div className="border-t border-slate-700/50 pt-6">
                   <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                     Project Details
                   </h4>
                   <p className="text-gray-300 text-sm leading-relaxed">
                     {project.details}
                   </p>
                 </div>
               )}
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );

 // Render Contact
 const renderContact = () => (
   <>
     <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" style={{ backgroundColor: '#1a2332' }}></div>
     <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
       <div className={`transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-light text-white">
           Contact Me
         </h2>
         <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12">
           Let's connect and discuss opportunities
         </p>
       </div>
       <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 transform transition-all duration-1000 ease-in-out delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} max-w-4xl mx-auto`}>
         <div className="bg-slate-800/40 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-slate-700 hover:bg-slate-800/60 transition-all duration-600 ease-in-out shadow-lg">
           <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white flex items-center gap-3">
             <span className="text-2xl sm:text-3xl">👤</span>
             Personal Information
           </h3>
           <div className="space-y-4 sm:space-y-6">
             <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-600 ease-in-out">
               <span className="text-xl sm:text-2xl text-gray-300 flex-shrink-0">📱</span>
               <div className="min-w-0">
                 <div className="font-semibold text-white text-sm sm:text-base">Phone</div>
                 <a href={`tel:${contactInfo.phone}`} className="text-gray-300 hover:text-white transition-colors duration-600 ease-in-out text-sm sm:text-base break-all">
                   {contactInfo.phone}
                 </a>
               </div>
             </div>
             <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-600 ease-in-out">
               <span className="text-xl sm:text-2xl text-gray-300 flex-shrink-0">📧</span>
               <div className="min-w-0">
                 <div className="font-semibold text-white text-sm sm:text-base">Email</div>
                 <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-white transition-colors duration-600 ease-in-out text-sm sm:text-base break-all">
                   {contactInfo.email}
                 </a>
               </div>
             </div>
             <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-600 ease-in-out">
               <span className="text-xl sm:text-2xl text-gray-300 flex-shrink-0">📍</span>
               <div className="min-w-0">
                 <div className="font-semibold text-white text-sm sm:text-base">Location</div>
                 <div className="text-gray-300 text-sm sm:text-base">{contactInfo.address}</div>
               </div>
             </div>
           </div>
         </div>
         <div className="bg-slate-800/40 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-slate-700 hover:bg-slate-800/60 transition-all duration-600 ease-in-out shadow-lg">
           <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white flex items-center gap-3">
             <span className="text-2xl sm:text-3xl">🌐</span>
             Connect Online
           </h3>
           <div className="space-y-4">
             <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group">
               <span className="text-2xl sm:text-3xl flex-shrink-0">💼</span>
               <div className="min-w-0">
                 <div className="font-semibold text-sm sm:text-base">LinkedIn</div>
                 <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                   Professional Profile
                 </div>
               </div>
             </a>
             <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group">
               <span className="text-2xl sm:text-3xl flex-shrink-0">💻</span>
               <div className="min-w-0">
                 <div className="font-semibold text-sm sm:text-base">GitHub</div>
                 <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                   Code Repository
                 </div>
               </div>
             </a>
             <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group">
               <span className="text-2xl sm:text-3xl flex-shrink-0">🐦</span>
               <div className="min-w-0">
                 <div className="font-semibold text-sm sm:text-base">Twitter</div>
                 <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
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

 return (
   <>
     <style jsx>{`
       @keyframes fadeSlideIn {
         0% { opacity: 0; transform: translateY(20px); }
         100% { opacity: 1; transform: translateY(0); }
       }
       .animate-fadeSlideIn { animation: fadeSlideIn 0.5s ease-out forwards; }
       html, body, * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
     `}</style>

     {/* Navigation */}
     <nav className={`fixed top-4 right-4 z-50 transform transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
       <div className="hidden sm:flex gap-4 p-2">
         {["home", "experience", "projects", "contact"].map((page, index) => (
           <button
             key={page}
             onClick={() => setCurrentPage(page)}
             className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-600 ease-in-out hover:scale-105 text-sm lg:text-base ${
               currentPage === page
                 ? "bg-white text-slate-900 shadow-lg scale-105"
                 : "bg-transparent border border-slate-600 text-gray-300 hover:bg-slate-700/60 hover:text-white"
             }`}
           >
             {page.charAt(0).toUpperCase() + page.slice(1)}
           </button>
         ))}
       </div>

       <div className="sm:hidden">
         <button
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="w-12 h-12 bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center border border-slate-600 text-gray-300 hover:text-white transition-all duration-600 ease-in-out"
         >
           <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
         </button>
        
         {isMobileMenuOpen && (
           <div className="absolute top-16 right-0 bg-slate-800/95 backdrop-blur-md rounded-lg border border-slate-600 shadow-xl p-2 min-w-[150px]">
             {["home", "experience", "projects", "contact"].map((page) => (
               <button
                 key={page}
                 onClick={() => {
                   setCurrentPage(page);
                   setIsMobileMenuOpen(false);
                 }}
                 className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-600 ease-in-out ${
                   currentPage === page
                     ? "bg-white text-slate-900"
                     : "text-gray-300 hover:bg-slate-700/60 hover:text-white"
                 }`}
               >
                 {page.charAt(0).toUpperCase() + page.slice(1)}
               </button>
             ))}
           </div>
         )}
       </div>
     </nav>

     {/* Desktop Social Links */}
     {currentPage !== 'projects' && (
       <div className={`hidden lg:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-40 flex-col gap-4 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
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
     )}

     {/* Main Content */}
     <main className="min-h-screen">
       {currentPage === "home" && (
         <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
           {renderHome()}
         </div>
       )}
       {currentPage === "experience" && renderExperience()}
       {currentPage === "projects" && renderProjects()}
       {currentPage === "contact" && (
         <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
           {renderContact()}
         </div>
       )}
     </main>

     {/* Chatbot Component */}
     {isChatOpen && (
       <div className="fixed inset-0 z-50">
         <div 
           className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
           onClick={() => setIsChatOpen(false)}
         ></div>
         <div className="relative z-10 h-full flex items-center justify-center p-4">
           <div className="relative">
             <button
               onClick={() => setIsChatOpen(false)}
               className="absolute top-2 right-2 z-20 w-8 h-8 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
             >
               ✕
             </button>
             <Chatbot />
           </div>
         </div>
       </div>
     )}
   </>
 );
}