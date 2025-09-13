"use client";
import React, { useState, useEffect } from "react";


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
 const [messages, setMessages] = useState([
   {
     type: "bot",
     text: "🤖 Hi! I'm Sai's AI assistant. Ask me about his experience, skills, or projects!",
   },
 ]);
 const [inputValue, setInputValue] = useState("");
 const [isLoaded, setIsLoaded] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [expandedProject, setExpandedProject] = useState(null);


 useEffect(() => {
   setTimeout(() => setIsLoaded(true), 100);
 }, []);


 // --- Enhanced Experience Data ---
 const experiences: Experience[] = [
   {
     id: 1,
     title: "Software Engineer - Infrastructure",
     company: "Mastronardi Produce Limited",
     period: "May 2025 – Present",
     location: "Remote",
     technologies: ["Terraform", "Azure", "DevOps", "Kubernetes", "Monitoring"],
     achievements: [
      
       "Designed reusable Terraform modules and automated Azure infrastructure provisioning for 6 enterprise applications, including GSP 2.0 and NAV 2018",
       "Automated deployment of Azure SQL (Databases, SQL Server, Flexible Server, and Managed Instances) using Terraform and Azure DevOps pipelines",
       "Deployed and configured Azure APIMs, Function Apps, Web App Services, App Service Plans, and AKS clusters for highly available application hosting",
       "Built Terraform-based automation for NSGs, WAFs, and related Azure security resources, ensuring compliance and protection",
       "Integrated Delinia and CrowdStrike into Azure workloads for enterprise-grade endpoint protection and identity access management",
       "Implemented proactive monitoring with Azure Metric Insights to optimize performance and enable early alerting",
       "Led end-to-end Azure infrastructure provisioning fully through Terraform and Azure DevOps, enabling scalable and version-controlled deployments",
       "Architected and deployed Azure Front Door, Fortigate Firewall, and Application Gateway WAF for global traffic management, security, and high availability",
       "Configured and maintained Application Insights and Azure Synapse for API governance, monitoring, and analytics",
       "Engineered secure networking with Private Endpoints, Virtual Networks, Public IPs, and Network Interfaces for controlled communication",
       "Implemented Azure Storage Accounts, Blob Storage, and Key Vault for secure data and secret management",
       "Integrated third-party platforms and services including Boomi, Anaplan, Vaisala Weather API, Postmark, SharePoint, and NAV Webservices into Azure workflows",
       "Orchestrated CI/CD automation using Azure DevOps, Git Repositories, and Pipelines to streamline deployments and reduce release cycles",
       "Managed Azure Service Fabric Clusters to host and scale distributed applications",
       "Delivered infrastructure within the Azure Landing Zone framework to ensure compliance, governance, and security standards"
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
      "Led migration of mission-critical transactional databases from on-prem MS SQL Server to Azure SQL Managed Instances using Azure DMS with near-zero downtime strategies.",
      "Architected Azure DevOps YAML pipelines for automated deployment of database schema changes, including pre- and post-deployment validation scripts using SSDT and PowerShell.",
      "Developed advanced Terraform modules for deploying Azure SQL Databases, configuring Private Endpoints, VNET service endpoints, and firewall rules.",
      "Implemented custom alerting via Azure Monitor and Log Analytics to track long-running queries and DTU consumption, improving query performance by 30%.",
      "Integrated Azure Active Directory authentication for Azure SQL Databases to enforce RBAC and MFA controls.",
      "Automated index maintenance, statistics updates, and backups using Azure Automation Runbooks and Logic Apps.",
      "Configured failover groups for Azure SQL Databases across regions, ensuring high availability and disaster recovery readiness.",
      "Developed PowerShell modules to automate SQL Data Export/Import across environments during migration cutovers.",
      "Used Azure Data Factory for orchestrating ETL pipelines during phased migrations.",
      "Created custom dashboards using Azure Workbooks for executive-level reporting on migration progress and post-migration performance metrics.",
      "Designed and implemented CI/CD pipelines using Bitbucket and GitLab CI/CD, automating the build, test, and deployment process for over 20+ microservices, ensuring faster and reliable releases across dev, QA, and prod environments.",
      "Containerized Java Spring Boot applications using Docker, wrote custom Helm charts, and deployed services to Kubernetes CaaS clusters, enabling modular deployments and improved scalability across multiple namespaces.",
      "Provisioned and managed cloud infrastructure using Terraform, including Kubernetes namespaces, AWS IAM roles, S3 buckets, security groups, and networking components. Used modular Terraform code to standardize environments and enable infrastructure-as-code (IaC) practices.",
      "Set up application and infrastructure monitoring using Splunk (for log analytics and custom dashboards), AppDynamics (for business transaction tracing), and Datadog (for real-time cluster and pod-level metrics).",
      "Provided 24/7 primary-secondary on-call support, resolved real-time production issues on war rooms, conducted root cause analysis (RCA), and implemented long-term fixes, significantly reducing repeat incidents.",
      "Wrote and managed JSON-based firewall policies to establish secure connectivity between OIS microservices and third-party/internal applications. Worked closely with the network team to troubleshoot cross-org communication issues and validate access via port checks and logs.",
      "Acted as a liaison between developers, architects, and external teams. Managed complete deployment lifecycle (from kickoff to production), tracked progress using Cherwell, scheduled and led change review meetings, and ensured successful go-lives with thorough smoke testing.",
      "Used Postman and Swagger UI to test REST APIs, validated endpoint functionality, and collaborated with developers to improve backend logic and fix defects. Reviewed Java/Spring Boot code and JUnit test cases to identify performance bottlenecks.",
      "Queried Oracle databases to validate transactions and debug issues. Performed database patching, and authored SQL scripts to insert, update, or modify schema objects as part of application releases.",
      "Managed Kafka clusters to support real-time streaming data for OIS transactions. Designed and maintained Apache NiFi data flows to ingest, process, and route customer data into OIS systems and the internal SOAR portal (Spectrum Ordering Analysis Reporting) for transaction insights.",
      "Worked with onboarding teams to streamline AWS and GitLab CI/CD integrations, enabling new microservices to deploy seamlessly into CaaS clusters. Assisted in IAM role setup, S3 bucket usage, and environment-specific configuration management.",
      "Partnered with enterprise architects to design and implement complex networking for OIS, involving GSLBs, F5, and Avi Load Balancers. Supported hostname mapping, traffic routing policies, and failover configurations to maintain high availability."
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
      "Designed and implemented Python modules for the Verastel-Spark compliance monitoring platform using event-driven architecture, ensuring high availability and fault tolerance.",
      "Developed and documented RESTful APIs with robust authentication and authorization controls, enabling secure integration with external services.",
      "Engineered scalable microservices and data ingestion workflows for TechUnicorn’s CORA and AMS applications, improving data processing efficiency.",
      "Automated application deployments across environments by writing Kubernetes manifests and Helm charts, reducing manual intervention by 70%.",
      "Optimized Python services by profiling and tuning performance bottlenecks, reducing API response times and improving throughput.",
      "Integrated CI/CD pipelines (GitLab/Jenkins) for automated builds, testing, and deployments of Python services, ensuring faster release cycles.",
      "Implemented monitoring and alerting using Prometheus, Grafana, and ELK stack for Python-based microservices, improving incident response time.",
      "Collaborated with cross-functional teams (DevOps, QA, and product owners) to deliver new features and ensure compliance with industry standards.",
      "Wrote comprehensive unit and integration tests using PyTest and unittest, achieving 85%+ test coverage for mission-critical Python modules.",
      "Authored technical documentation and API specifications, streamlining onboarding for new developers and external partners."      
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
      "Implemented and optimized C++ modules for Bluetooth and Wi-Fi firmware, ensuring compliance with IEEE 802.11 and Bluetooth specifications.",
      "Automated nightly build validation and regression testing using Python and Bash, reducing manual QA effort by 30% and improving release reliability.",
      "Integrated Jenkins CI/CD pipelines to streamline continuous builds, regression testing, and release packaging, accelerating delivery timelines.",
      "Debugged kernel-level crashes and memory leaks using GDB, Valgrind, and performance profilers, significantly improving firmware stability.",
      "Collaborated with hardware and systems engineers to validate firmware performance across multiple chipsets and platforms.",
      "Developed Python-based test harnesses for automated validation of wireless protocols, increasing test coverage and accuracy.",
      "Optimized memory management and threading models in embedded C++ firmware, improving throughput and reducing latency in real-time environments.",
      "Authored technical documentation and debugging guides for cross-team knowledge sharing and faster onboarding of new engineers.",
      "Participated in code reviews and static analysis sessions, ensuring adherence to Qualcomm’s coding standards and improving overall code quality.",
      "Contributed to cross-functional design discussions with system architects, helping define requirements and influence future firmware features."      
     ]
   }
 ];


 // --- Enhanced Project Data ---
 const projects: Project[] = [
   {
     id: 1,
     title: "ContextBridge – AI-Aware Task & Note Sync",
     tech: "Python • MCP • REST APIs • AI",
     description: "Personal productivity tool that synchronizes tasks and notes across apps using semantic context and AI-driven prioritization.",
     features: [
       "Context-aware syncing engine",
       "REST APIs for cross-tool integration",
       "Real-time sync with offline support",
       "AI-driven prioritization and task linking",
       "MCP protocol implementation"
     ],
     details: `Built as a personal exploration into AI-enhanced productivity workflows, ContextBridge addresses the fragmentation of modern task management by creating intelligent connections between disparate productivity tools.


The system maintains semantic context across platforms, preserving project relationships, deadlines, and note associations while enabling AI-powered suggestions for task prioritization and scheduling optimization.


Technical implementation leverages Python for the core synchronization engine, implements the Model Context Protocol (MCP) for standardized context handling, and exposes RESTful APIs for seamless integration with existing productivity ecosystems.`
   },
   {
     id: 2,
     title: "Job Notification Bot",
     tech: "Python • Telegram API • Web Scraping • Automation",
     description: "Intelligent Telegram bot delivering personalized job alerts through advanced keyword matching and resume-driven filtering.",
     features: [
       "Multi-platform job scraping",
       "Resume-driven filtering logic",
       "Keyword-based alert customization",
       "Instant Telegram notifications",
       "Automated scheduling system"
     ],
     details: `Developed to streamline the job search process by delivering highly relevant opportunities directly to users' mobile devices through Telegram's instant messaging platform.


The system employs sophisticated web scraping techniques to monitor multiple job boards simultaneously, applies intelligent filtering based on user resume profiles and preferences, and delivers notifications with sub-minute latency.


Built with Python's robust ecosystem including BeautifulSoup for web scraping, natural language processing for relevance scoring, and the Telegram Bot API for seamless user interaction.`
   },
   {
     id: 3,
     title: "Streak Widget",
     tech: "SwiftUI • iOS • Widget Extensions • Core Data",
     description: "Minimalist iOS habit-tracking widget featuring streak visualization, smart reminders, and adaptive motivational UI.",
     features: [
       "Home screen widget integration",
       "Streak visualization and analytics",
       "Smart reminder system",
       "Goal customization and tracking",
       "Minimalist, distraction-free design"
     ],
     details: `Designed as a native iOS application focused on habit formation through visual motivation and seamless user experience integration with the iOS ecosystem.


The widget leverages iOS 14+ Widget Extensions to provide always-visible progress tracking directly on the home screen, while smart notifications intelligently remind users before streaks are at risk of breaking.


Built entirely in SwiftUI with Core Data persistence, the app demonstrates modern iOS development practices including widget lifecycle management, background processing, and adaptive UI design.`
   },
   {
     id: 4,
     title: "FireFly Clone",
     tech: "React • CSS3 • Responsive Design • Figma",
     description: "Pixel-perfect recreation of the FireFly application featuring responsive design and polished user interactions.",
     features: [
       "Pixel-perfect UI replication",
       "Fully responsive layout system",
       "Component-based architecture",
       "Smooth animations and transitions",
       "Cross-browser compatibility"
     ],
     details: `A comprehensive frontend engineering exercise focused on translating high-fidelity designs into production-quality code while maintaining design system consistency and responsive behavior.


The project emphasizes precision in visual implementation, utilizing advanced CSS techniques for layouts, animations, and responsive breakpoints while maintaining clean, maintainable React component architecture.


Developed from Figma specifications with attention to micro-interactions, typography, spacing, and color accuracy across multiple screen sizes and device types.`
   }
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


   // Simulate AI response
   setTimeout(() => {
     const responses = [
       "I can help you learn more about Sai's experience! He has 5+ years in software engineering and DevOps.",
       "Sai specializes in cloud infrastructure, having worked with Azure, AWS, Terraform, and Kubernetes extensively.",
       "His recent projects include ContextBridge, an AI-powered productivity tool, and various infrastructure automation solutions.",
       "Would you like to know more about his experience at Charter Communications or Mastronardi Produce?",
       "Sai has strong expertise in Python, Java, React, and modern DevOps practices. What specific area interests you?"
     ];
     const randomResponse = responses[Math.floor(Math.random() * responses.length)];
     setMessages(prev => [...prev, { type: "bot", text: randomResponse }]);
   }, 1000);
 };


 // --- Render Home ---
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


 // --- Enhanced Experience Section ---
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
                 {/* Experience Header */}
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
                     <div className="inline-block px-4 py-2 bg-slate-700/50 text-gray-300 text-sm rounded-full border border-slate-600 group-hover:bg-slate-600/60 group-hover:border-slate-500 transition-all duration-600 ease-in-out">
                       {exp.period}
                     </div>
                   </div>
                 </div>


                 {/* Technologies */}
                 <div className="mb-6">
                   <div className="flex flex-wrap gap-2">
                     {exp.technologies.map((tech, techIndex) => (
                       <span
                         key={techIndex}
                         className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-600 ease-in-out"
                       >
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>


                 {/* Key Achievements */}
                 <div>
                   <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                     Key Achievements
                   </h4>
                   <div className="grid gap-4">
                     {exp.achievements.map((achievement, achIndex) => (
                       <div key={achIndex} className="flex items-start gap-3 group/item">
                         <div className="flex-shrink-0 w-6 h-6 bg-slate-700/50 rounded-full flex items-center justify-center mt-0.5 group-hover/item:bg-cyan-400/20 transition-all duration-600 ease-in-out">
                           <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover/item:scale-110 transition-transform duration-600 ease-in-out"></div>
                         </div>
                         <p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-600 ease-in-out">
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


       {/* Call to Action */}
       <div className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 ease-in-out delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
         <p className="text-gray-300 mb-6 text-base sm:text-lg">
           Interested in my professional background? Let's discuss how I can contribute to your team.
         </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button
             onClick={() => setCurrentPage('contact')}
             className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-slate-900 text-base sm:text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-600 ease-in-out hover:scale-105"
           >
             Get In Touch
           </button>
           <button
             onClick={() => setIsChatOpen(true)}
             className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-gray-500 text-gray-300 hover:border-white hover:text-white text-base sm:text-lg font-semibold transition-all duration-600 ease-in-out hover:scale-105"
           >
             Ask About My Experience
           </button>
         </div>
       </div>
     </div>
   </div>
 );


 // --- Enhanced Projects Section ---
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
             {/* Project Header */}
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


             {/* Project Features */}
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


               {/* Expanded Details */}
               {expandedProject === project.id && (
                 <div className="border-t border-slate-700/50 pt-6 animate-fadeSlideIn">
                   <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                     Project Details
                   </h4>
                   <div className="prose prose-invert max-w-none">
                     <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                       {project.details.split('\n\n').map((paragraph, pIndex) => (
                         <p key={pIndex}>{paragraph}</p>
                       ))}
                     </div>
                   </div>
                 </div>
               )}
             </div>
           </div>
         ))}
       </div>


       {/* Call to Action */}
       <div className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 ease-in-out delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
         <p className="text-gray-300 mb-6 text-base sm:text-lg">
           Want to learn more about my work or discuss a project?
         </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button
             onClick={() => setCurrentPage('contact')}
             className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-slate-900 text-base sm:text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-600 ease-in-out hover:scale-105"
           >
             Get In Touch
           </button>
           <button
             onClick={() => setIsChatOpen(true)}
             className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-gray-500 text-gray-300 hover:border-white hover:text-white text-base sm:text-lg font-semibold transition-all duration-600 ease-in-out hover:scale-105"
           >
             Ask AI About Projects
           </button>
         </div>
       </div>
     </div>
   </div>
 );


 // --- Render Contact ---
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
                 <a
                   href={`tel:${contactInfo.phone}`}
                   className="text-gray-300 hover:text-white transition-colors duration-600 ease-in-out text-sm sm:text-base break-all"
                 >
                   {contactInfo.phone}
                 </a>
               </div>
             </div>
             <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-600 ease-in-out">
               <span className="text-xl sm:text-2xl text-gray-300 flex-shrink-0">📧</span>
               <div className="min-w-0">
                 <div className="font-semibold text-white text-sm sm:text-base">Email</div>
                 <a
                   href={`mailto:${contactInfo.email}`}
                   className="text-gray-300 hover:text-white transition-colors duration-600 ease-in-out text-sm sm:text-base break-all"
                 >
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
             <a
               href={contactInfo.linkedin}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group"
             >
               <span className="text-2xl sm:text-3xl flex-shrink-0">💼</span>
               <div className="min-w-0">
                 <div className="font-semibold text-sm sm:text-base">LinkedIn</div>
                 <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                   Professional Profile
                 </div>
               </div>
             </a>
             <a
               href={contactInfo.github}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group"
             >
               <span className="text-2xl sm:text-3xl flex-shrink-0">💻</span>
               <div className="min-w-0">
                 <div className="font-semibold text-sm sm:text-base">GitHub</div>
                 <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-600 ease-in-out">
                   Code Repository
                 </div>
               </div>
             </a>
             <a
               href={contactInfo.twitter}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-gray-300 hover:text-white transition-all duration-600 ease-in-out group"
             >
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
       .animate-fadeSlideIn {
         animation: fadeSlideIn 0.5s ease-out forwards;
       }
       html, body, * {
         font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
       }
     `}</style>


     {/* Mobile Navigation */}
     <nav className={`fixed top-4 right-4 z-50 transform transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
       {/* Desktop Navigation */}
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
             style={{ transitionDelay: `${100 + index * 150}ms` }}
           >
             {page.charAt(0).toUpperCase() + page.slice(1)}
           </button>
         ))}
       </div>


       {/* Mobile Navigation */}
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


     {/* Desktop Social Links - Hidden on projects page for better scrolling */}
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


     {isChatOpen && (
       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-slate-800/95 backdrop-blur-md rounded-lg w-full max-w-lg h-[500px] sm:h-[600px] flex flex-col border border-slate-600 shadow-2xl transform transition-all duration-800 ease-in-out animate-fadeSlideIn">
           <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-600">
             <div>
               <h3 className="text-lg sm:text-xl font-semibold text-white">AI Assistant</h3>
               <p className="text-xs sm:text-sm text-gray-300">Ask me about Sai's experience</p>
             </div>
             <button
               onClick={() => setIsChatOpen(false)}
               className="text-gray-400 hover:text-gray-200 w-8 h-8 rounded-full hover:bg-slate-700 flex items-center justify-center transition-all duration-600 ease-in-out hover:scale-110 hover:rotate-90"
             >
               ✕
             </button>
           </div>
           <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
             {messages.map((msg, idx) => (
               <div
                 key={idx}
                 className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fadeSlideIn`}
                 style={{ animationDelay: `${idx * 100}ms` }}
               >
                 <div
                   className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-600 ease-in-out hover:scale-105 text-sm sm:text-base ${
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
           <div className="p-4 sm:p-6 border-t border-slate-600">
             <div className="flex flex-col sm:flex-row gap-3">
               <input
                 type="text"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                 placeholder="Ask about experience, skills, projects..."
                 className="flex-1 bg-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 transition-all duration-600 ease-in-out focus:scale-105 text-sm sm:text-base"
               />
               <button
                 onClick={handleSendMessage}
                 disabled={!inputValue.trim()}
                 className="bg-white text-slate-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-600 ease-in-out font-medium hover:scale-105 hover:shadow-lg disabled:hover:scale-100 text-sm sm:text-base whitespace-nowrap"
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