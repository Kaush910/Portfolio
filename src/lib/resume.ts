// lib/resume.ts - Enhanced structured resume with more specific details
const RESUME_SECTIONS = {
  summary: `
I'm a Software Engineer specializing in Cloud Infrastructure & DevOps with hands-on experience at companies like Charter Communications, Mastronardi Produce, and Qualcomm. I excel at building scalable systems using AWS, Azure, Kubernetes, and Terraform. I'm passionate about automation, distributed systems, and integrating AI into development workflows.
`,

  skills: `
CLOUD PLATFORMS & INFRASTRUCTURE:
• Microsoft Azure: Function Apps, AKS, Azure SQL, Application Insights, Front Door, APIM
• AWS: EC2, RDS, Lambda, CloudFormation, S3, IAM
• Infrastructure as Code: Terraform (advanced), Helm charts, Kubernetes manifests

PROGRAMMING & SCRIPTING:
• Primary: Python, Go, Bash, PowerShell, SQL
• Secondary: Java, C++, YAML, JSON
• Databases: MySQL, PostgreSQL, Azure SQL, MongoDB

DEVOPS & AUTOMATION:
• Container Orchestration: Kubernetes, Docker, Helm
• CI/CD: GitHub Actions, GitLab CI/CD, Azure DevOps, Jenkins, Bitbucket Pipelines
• GitOps: ArgoCD for automated deployments
• Configuration Management: Terraform modules, Infrastructure automation

MONITORING & OBSERVABILITY:
• Enterprise: Splunk, Datadog, AppDynamics
• Open Source: Prometheus, Grafana, ELK Stack
• Cloud Native: Azure Monitor, Application Insights
• Custom dashboards and alerting systems

DATA & MESSAGING:
• Real-time Processing: Apache Kafka, Apache NiFi
• Data Pipeline: ETL workflows, batch processing
• Event-driven architecture, REST APIs

COLLABORATION & METHODOLOGY:
• Version Control: Git, GitHub, GitLab
• Project Management: JIRA, Confluence, Agile/Scrum
• Documentation: Technical writing, API documentation
• Team Leadership: Mentorship, code reviews, knowledge sharing
`,

  experience: `
SOFTWARE ENGINEER - INFRASTRUCTURE | Mastronardi Produce Limited | May 2025 – Present
Current Role: Leading cloud infrastructure automation for enterprise produce supply chain systems.

Key Achievements:
• Built reusable Terraform modules that reduced infrastructure provisioning time by 70%
• Automated deployment of Azure APIMs, Function Apps, and AKS clusters using CI/CD pipelines
• Integrated Delinia & CrowdStrike security solutions across Azure environment
• Architected Azure Front Door + Fortigate Firewall + WAF setup for enhanced security
• Implemented proactive monitoring with Azure Metric Insights reducing downtime by 40%
• Supporting cloud infrastructure for enterprise-scale produce analytics processing millions of records daily

Technologies Used: Terraform, Azure (APIM, Function Apps, AKS, SQL), GitHub Actions, Azure Monitor, Delinia, CrowdStrike

SOFTWARE ENGINEER – DEVOPS | Charter Communications | May 2024 – Apr 2025
Role: DevOps engineer for high-volume telecommunications infrastructure supporting millions of customers.

Key Achievements:
• Successfully migrated mission-critical transactional databases to Azure SQL with zero downtime
• Containerized 20+ Java Spring Boot microservices using Docker and deployed with Helm on Kubernetes
• Built robust CI/CD pipelines in GitLab and Bitbucket with automated testing, reducing deployment errors by 60%
• Administered Apache Kafka clusters processing tens of millions of daily events for real-time data streaming
• Managed Apache NiFi flows for data ingestion and transformation pipelines
• Implemented blue-green deployment strategies for zero-downtime releases

Technologies Used: Azure SQL, Kubernetes, Docker, Helm, GitLab CI/CD, Bitbucket, Apache Kafka, Apache NiFi, Java Spring Boot

SOFTWARE ENGINEER | Pristen IT Systems | Aug 2023 – May 2024
Role: Full-stack engineer focusing on data processing and microservices architecture.

Key Achievements:
• Designed Python modules for Verastel-Spark integration handling large-scale data processing
• Built RESTful APIs with OAuth/JWT authentication serving 10k+ requests per day
• Developed scalable microservices architecture for ETL workflows processing GB-scale datasets
• Automated deployments using Kubernetes and Helm charts for blue-green deployment patterns
• Deployed comprehensive monitoring with Prometheus + Grafana for hybrid cloud observability
• Created detailed API documentation and integration guides

Technologies Used: Python, Spark, Kubernetes, Helm, REST APIs, OAuth/JWT, Prometheus, Grafana, ETL pipelines

SOFTWARE DEVELOPER | Qualcomm India | May 2019 – July 2021
Role: Embedded systems developer for Bluetooth and Wi-Fi firmware in mobile chipsets.

Key Achievements:
• Implemented and optimized C++ modules for Bluetooth and Wi-Fi firmware in embedded systems
• Automated nightly build validation reducing manual testing time by 80%
• Created Python and Bash scripts for regression testing of firmware components
• Integrated Jenkins pipelines for continuous builds, testing, and release packaging
• Debugged kernel-level crashes and memory leaks using GDB and custom diagnostic tools
• Developed internal tools for parsing and visualizing performance logs, improving debugging efficiency by 50%

Technologies Used: C++, Python, Bash, Jenkins, GDB, Embedded Systems, Firmware Development
`,

  projects: `
CONTEXTBRIDGE – AI-AWARE TASK & NOTE SYNC | 2024
Personal productivity tool leveraging semantic context and MCP (Model Context Protocol) integration.

What I built:
• Cross-platform task synchronization using semantic analysis
• MCP integration for AI-aware context switching
• REST API backend with Python for data processing
• Real-time sync across multiple devices and platforms

Technologies: Python, MCP, REST APIs, Semantic Analysis
GitHub: Available upon request

JOB NOTIFICATION BOT | 2024
Telegram bot delivering personalized job alerts based on user preferences.

What I built:
• Python bot with Telegram API integration
• Web scraping engine for LinkedIn job postings
• Custom filtering algorithm based on skills, location, and experience level
• Automated daily notifications with 95% accuracy rate
• Deployed on cloud with scheduled tasks

Technologies: Python, Telegram API, Web Scraping, Cloud Deployment
Users: 50+ active users receiving daily notifications

STREAK WIDGET | iOS APP | 2024
Minimalist habit-tracking widget for iOS with customizable streaks.

What I built:
• Native iOS widget using SwiftUI
• Custom animation framework for streak visualization
• Local data persistence with Core Data
• Customizable themes and notification scheduling
• App Store ready with beta testing completed

Technologies: SwiftUI, iOS Development, Core Data, Widget Framework

FIREFLY CLONE | WEB APPLICATION | 2023
Full-featured web application clone with responsive design.

What I built:
• Complete React application with state management
• Responsive CSS design matching original UI/UX
• Component-based architecture with reusable elements
• Figma integration for design consistency
• Deployed version available for demonstration

Technologies: React, CSS, Figma, State Management, Responsive Design
`,

  education: `
MASTER OF SCIENCE IN SOFTWARE ENGINEERING | Gannon University | Aug 2021 – May 2023
GPA: 3.5/4.0

Relevant Coursework:
• Real-Time Operating Systems - Embedded system design and RTOS implementation
• Software System Design and Implementation - Large-scale architecture patterns
• Microcontroller Programming - ARM Cortex-M programming in C/C++
• Data Structures and Algorithms - Advanced algorithmic problem solving
• Hardware-Software Integration - Embedded systems and IoT development
• Cloud Infrastructure Automation - AWS, Azure, Infrastructure as Code
• DevOps and CI/CD Pipelines - Modern deployment and automation practices
• Distributed Systems - Microservices, message queues, consistency patterns
• AI Integration - Machine learning model deployment and API integration
• Embedded Systems Design - Real-time constraints and hardware optimization

Academic Projects:
• Built a distributed task scheduler using Go and Docker
• Implemented a real-time IoT monitoring system with MQTT and time-series databases
• Created a CI/CD pipeline for automated testing and deployment of microservices
`,

  certifications: `
CURRENT CERTIFICATIONS:
• Microsoft Certified: Azure Fundamentals (AZ-900) - 2024
• Microsoft Certified: Azure AI Fundamentals (AI-900) - 2024  
• AWS Certified DevOps Engineer - Associate Level - 2023

CERTIFICATION DETAILS:
Azure Fundamentals (AZ-900): Core Azure services, pricing models, security, and governance
Azure AI Fundamentals (AI-900): AI workloads, machine learning on Azure, cognitive services
AWS DevOps Engineer: CI/CD pipelines, monitoring, security, and automation on AWS

IN PROGRESS:
• Azure Solutions Architect Expert (AZ-305) - Planning to complete by Q2 2025
• Certified Kubernetes Administrator (CKA) - Currently studying
`
};

export async function getResumeSections() {
  console.log("🚀 Loading Kaushik's enhanced resume data");
  return RESUME_SECTIONS;
}

// Helper function to get specific achievements by technology or company
export function getAchievementsByTechnology(tech: string): string[] {
  const achievements: { [key: string]: string[] } = {
    azure: [
      "Reduced infrastructure provisioning time by 70% with Terraform modules",
      "Implemented proactive monitoring reducing downtime by 40%",
      "Zero-downtime database migration to Azure SQL"
    ],
    kubernetes: [
      "Containerized 20+ Java Spring Boot microservices",
      "Deployed with Helm charts for blue-green deployments",
      "Managed AKS clusters for enterprise workloads"
    ],
    terraform: [
      "Built reusable Terraform modules for Azure infrastructure",
      "Automated provisioning of APIMs, Function Apps, and AKS clusters",
      "Infrastructure as Code reducing manual setup by 80%"
    ],
    kafka: [
      "Administered Kafka clusters processing tens of millions of daily events",
      "Built real-time data streaming pipelines",
      "Integrated with NiFi for data transformation workflows"
    ],
    python: [
      "Built automation scripts reducing manual testing time by 80%",
      "Developed RESTful APIs with OAuth/JWT authentication",
      "Created data processing modules for Spark integration"
    ]
  };
  
  return achievements[tech.toLowerCase()] || [];
}