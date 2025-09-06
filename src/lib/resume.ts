const RESUME_TEXT = `
Sai Kaushik Manchala
Saint Charles, Missouri, 63303
+1 (667)-324-9355 | kaushikworks@outlook.com | linkedin.com/in/sai-kaushik-manchala

Cloud Infrastructure DevOps Engineer with expertise in AWS, Azure, Kubernetes, and Terraform. Architected scalable, secure platforms for enterprise applications and real-time analytics. Passionate about automation, distributed systems, and AI.

TECHNICAL SKILLS
Cloud Platforms: Microsoft Azure, AWS
Programming Languages: Python, Go, Bash, PowerShell, SQL, Java, C++, YAML, JSON
Infrastructure DevOps Tools: Terraform, Kubernetes, Helm, Docker, ArgoCD, GitHub Actions, Azure DevOps, Jenkins
Monitoring Observability: Splunk, Datadog, AppDynamics, Prometheus, Grafana, ELK Stack, Azure Monitor
Database Storage: MySQL, PostgreSQL, Azure SQL, MongoDB, Azure Files, NFS
AI Automation: Python-based automation, AI integration, REST APIs, Event-driven architecture
Version Control Collaboration: Git, GitHub, GitLab, JIRA, Confluence
Operating Systems: Linux (Ubuntu, CentOS), Windows Server
Interpersonal: Technical Documentation, Mentorship, Team Collaboration, Agile Methodologies

EXPERIENCE

Software Engineer – DevOps | May 2024 – Apr 2025
Charter Communications | St.Louis, MO
• Executed zero-downtime migration of high-volume transactional databases to Amazon RDS using Terraform and Multi-AZ architecture—automated schema deployments to safeguard $30M/day in business operations.
• Containerized and deployed 20+ Java Spring Boot microservices using Docker and Helm charts on Kubernetes CaaS clusters—enhanced scalability, simplified rollbacks, and ensured consistent runtime environments across dev, staging, and production.
• Engineered robust CI/CD pipelines in GitLab and Bitbucket for 20+ services—automated build, test, and deployment workflows with environment-specific configurations, cutting release cycles by 40% and increasing deployment success rates by 50%.
• Administered Kafka clusters and NiFi flows processing tens of millions of daily events—implemented real-time monitoring and alerting with Splunk, AppDynamics, and Datadog, reducing incident response times by 60% and improving system reliability.

Software Engineer | Aug 2023 – May 2024
Pristen IT Systems | Austin, TX
• Engineered Python-based modules for Verastel-Spark, a proactive risk evaluation platform with real-time compliance monitoring.
• Collaborated cross-functionally to design scalable APIs and automation pipelines, enhancing product reliability and deployment efficiency.
• Developed scalable microservices and data ingestion workflows for TechUnicorn as a Python/Go developer for CORA and AMS applications.

SUMMARY
• Designed reusable Terraform modules and automated Azure infrastructure provisioning for 6+ enterprise applications (Grower Supply Portal GSP 2.0, NAV 2018, MPL Vision and MPL Floor), ensuring consistency and reducing provisioning time by 40%.
• Automated deployments of APIMs, Function Apps, AKS clusters, and Azure SQL using Azure DevOps reduced release cycles by 35%.
• Provisioned Delinia & CrowdStrike and architected Azure Front Door, Fortigate Firewall, and WAF, reducing exposure by 40%.
• Implemented proactive monitoring with Azure Metric Insights and Application Insights, reducing MTTR by 60%.
• Supported the cloud infrastructure team powering enterprise-scale operations across North America greenhouses and supply chains.

PROJECTS
ContextBridge – AI-Aware Task & Note Sync | Python, MCP, REST APIs
• Developed a cross-platform productivity tool leveraging semantic context and MCP integration for intelligent task syncing and scheduling.

Job Notification Bot | Python, Telegram API, Web Scraping
• Created a Telegram bot in Python that delivers real-time job alerts using web scraping, keyword matching, and resume-driven filtering logic.

Streak Widget | SwiftUI, iOS
• Designed a minimalist habit-tracking widget in SwiftUI featuring streak visualization, smart reminders, goal customization, and adaptive UI.

FireFly Clone | React, CSS, Figma
• Built a full-featured clone of the FireFly app using React and CSS, replicating its UI with pixel-perfect accuracy and responsive design.

EDUCATION
Gannon University | Aug 2021 – May 2023
Master of Science in Software Engineering | GPA: 3.5/4.0
Coursework: Real-Time Operating Systems, Software System Design and Implementation, Microcontroller Programming, Data Structures and Algorithms, Hardware-Software Integration, Cloud Infrastructure Automation, DevOps and CI/CD Pipelines, Distributed Systems, AI Integration, Embedded Systems Design

CERTIFICATIONS
• Microsoft Certified: Azure Fundamentals (AZ-900), Azure AI Fundamentals (AI-900)
• AWS Certified DevOps Engineer
`

export async function getResumeText() {
  console.log("🚀 getResumeText called with Kaushik's actual resume")
  return RESUME_TEXT.trim()
}