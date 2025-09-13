// Remove the duplicate line and keep only this one:
const [expandedProject, setExpandedProject] = useState<number | null>(null);

// Also make sure your Experience type is properly defined:
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
  // ✅ Keep only this line, remove the duplicate
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Your experiences data...
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
      ]
    }
    // ... rest of your experiences
  ];

  // Rest of your component...
}