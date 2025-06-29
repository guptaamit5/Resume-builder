"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Plus,
  Trash2,
  Eye,
  Edit3,
  Palette,
  FileText,
  Award,
  BadgeIcon as Certificate,
  Menu,
  X,
  Smartphone,
  Tablet,
  Monitor,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface ContactInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
}

interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link?: string
  github?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  organization?: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  link?: string
}

interface ResumeData {
  contact: ContactInfo
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  achievements: Achievement[]
  certifications: Certification[]
}

const colorPalettes = {
  corporate: {
    name: "Corporate Blue",
    primary: "text-blue-800",
    secondary: "text-blue-600",
    accent: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    header: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white",
    section: "border-l-4 border-blue-500 pl-4",
  },
  executive: {
    name: "Executive Gray",
    primary: "text-gray-900",
    secondary: "text-gray-700",
    accent: "bg-gray-50",
    border: "border-gray-300",
    badge: "bg-gray-100 text-gray-800 border-gray-200",
    header: "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white",
    section: "border-l-4 border-gray-500 pl-4",
  },
  modern: {
    name: "Modern Teal",
    primary: "text-teal-800",
    secondary: "text-teal-600",
    accent: "bg-teal-50",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-800 border-teal-200",
    header: "bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white",
    section: "border-l-4 border-teal-500 pl-4",
  },
  professional: {
    name: "Professional Navy",
    primary: "text-slate-900",
    secondary: "text-slate-700",
    accent: "bg-slate-50",
    border: "border-slate-300",
    badge: "bg-slate-100 text-slate-800 border-slate-200",
    header: "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white",
    section: "border-l-4 border-slate-500 pl-4",
  },
  creative: {
    name: "Creative Purple",
    primary: "text-purple-800",
    secondary: "text-purple-600",
    accent: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    header: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white",
    section: "border-l-4 border-purple-500 pl-4",
  },
  elegant: {
    name: "Elegant Green",
    primary: "text-emerald-800",
    secondary: "text-emerald-600",
    accent: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    header: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white",
    section: "border-l-4 border-emerald-500 pl-4",
  },
}

const fontFamilies = {
  inter: { name: "Inter", class: "font-sans" },
  serif: { name: "Times New Roman", class: "font-serif" },
  mono: { name: "JetBrains Mono", class: "font-mono" },
}

const fontSizes = {
  small: { name: "Small", class: "text-sm" },
  medium: { name: "Medium", class: "text-base" },
  large: { name: "Large", class: "text-lg" },
}

const previewSizes = {
  mobile: { name: "Mobile", icon: Smartphone, width: "w-80", scale: "scale-75" },
  tablet: { name: "Tablet", icon: Tablet, width: "w-96", scale: "scale-90" },
  desktop: { name: "Desktop", icon: Monitor, width: "w-full", scale: "scale-100" },
}

// Enhanced sample data for Amit Gupta's resume
const sampleResumeData: ResumeData = {
  contact: {
    fullName: "Amit Gupta",
    email: "amit.gupta@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    website: "https://amitgupta.dev",
    linkedin: "linkedin.com/in/amit-gupta-dev",
    github: "github.com/amit-gupta",
  },
  summary:
    "Passionate 4th-year Computer Engineering student at Don Bosco Institute of Technology with strong foundation in full-stack development, data structures, and algorithms. Experienced in building scalable web applications using modern technologies. Seeking software engineering opportunities to contribute to innovative projects and grow professionally in the tech industry.",
  experience: [
    {
      id: "1",
      company: "TechStart Solutions",
      position: "Software Development Intern",
      startDate: "2024-06",
      endDate: "2024-08",
      current: false,
      description:
        "Developed and maintained React-based web applications serving 10,000+ users. Collaborated with senior developers to implement new features and optimize application performance by 25%. Participated in code reviews and agile development processes, contributing to 3 major product releases. Implemented responsive design principles and improved user experience metrics.",
    },
    {
      id: "2",
      company: "DBIT Innovation Lab",
      position: "Research Assistant",
      startDate: "2023-09",
      endDate: "",
      current: true,
      description:
        "Leading a team of 4 students in developing machine learning models for predictive analytics. Published research paper on 'Optimizing Neural Networks for Edge Computing' in IEEE conference. Mentoring junior students in programming fundamentals and project development. Secured funding of ₹2,50,000 for research project from university grants.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "Don Bosco Institute of Technology (DBIT)",
      degree: "Bachelor of Engineering",
      field: "Computer Engineering",
      startDate: "2021-08",
      endDate: "2025-05",
      gpa: "8.7/10.0",
    },
    {
      id: "2",
      institution: "St. Xavier's Junior College",
      degree: "Higher Secondary Certificate",
      field: "Science (PCM)",
      startDate: "2019-06",
      endDate: "2021-03",
      gpa: "92.5%",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Docker",
    "AWS",
    "Machine Learning",
    "Data Structures",
    "Algorithms",
    "System Design",
    "Agile Development",
    "REST APIs",
    "GraphQL",
  ],
  projects: [
    {
      id: "1",
      name: "EcoTrack - Carbon Footprint Tracker",
      description:
        "Full-stack web application helping users track and reduce their carbon footprint. Features include activity logging, analytics dashboard, and personalized recommendations. Implemented real-time data visualization using Chart.js and user authentication with JWT. Achieved 95% user satisfaction rating and 40% reduction in user carbon footprint.",
      technologies: "React, Node.js, Express, MongoDB, Chart.js, JWT, AWS, Docker",
      link: "https://ecotrack-demo.vercel.app",
      github: "https://github.com/amit-gupta/ecotrack",
    },
    {
      id: "2",
      name: "SmartLibrary Management System",
      description:
        "Comprehensive library management system with features for book cataloging, member management, and automated fine calculation. Includes QR code integration for quick book checkout and return processes. Reduced manual processing time by 60% and improved library efficiency. Deployed for 3 college libraries serving 5000+ students.",
      technologies: "Java, Spring Boot, MySQL, Thymeleaf, Bootstrap, QR Code API",
      link: "",
      github: "https://github.com/amit-gupta/smart-library",
    },
    {
      id: "3",
      name: "AI-Powered Code Review Assistant",
      description:
        "Machine learning model that analyzes code quality and suggests improvements. Trained on 50,000+ code samples with 85% accuracy in detecting common programming issues and security vulnerabilities. Integrated with GitHub API for seamless workflow. Featured in university tech showcase and received recognition from industry experts.",
      technologies: "Python, TensorFlow, Flask, Docker, GitHub API, NLP",
      link: "",
      github: "https://github.com/amit-gupta/ai-code-reviewer",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Winner - National Level Hackathon 'CodeFest 2024'",
      description:
        "Led a team of 4 to develop an innovative healthcare management system using AI and blockchain technology. Competed against 200+ teams from across India and secured first place with a cash prize of ₹1,00,000. Solution focused on secure patient data management and predictive health analytics.",
      date: "2024-03",
      organization: "Indian Institute of Technology, Delhi",
    },
    {
      id: "2",
      title: "Best Research Paper Award",
      description:
        "Received recognition for research paper on 'Optimizing Neural Networks for Edge Computing' at IEEE International Conference on Computer Science and Engineering. Paper cited by 15+ researchers and contributed to advancing edge computing research in India.",
      date: "2024-01",
      organization: "IEEE Computer Society",
    },
    {
      id: "3",
      title: "Dean's List - Academic Excellence",
      description:
        "Consistently maintained GPA above 8.5 for 6 consecutive semesters. Recognized for outstanding academic performance in Computer Engineering program. Received merit scholarship of ₹50,000 for academic excellence.",
      date: "2023-12",
      organization: "Don Bosco Institute of Technology",
    },
    {
      id: "4",
      title: "Google Summer of Code Participant",
      description:
        "Selected among top 1% of applicants worldwide to contribute to open-source project 'TensorFlow Lite'. Implemented optimization algorithms for mobile deployment, improving inference speed by 30%. Mentored by Google engineers and contributed 15+ commits to the main repository.",
      date: "2023-08",
      organization: "Google",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2024-02",
      expiryDate: "2027-02",
      credentialId: "AWS-ASA-2024-AG789",
      link: "https://aws.amazon.com/verification",
    },
    {
      id: "2",
      name: "Google Cloud Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2023-11",
      expiryDate: "2025-11",
      credentialId: "GCP-PCD-2023-AG456",
      link: "https://cloud.google.com/certification",
    },
    {
      id: "3",
      name: "Microsoft Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "2023-09",
      expiryDate: "",
      credentialId: "MS-AZ900-2023-AG123",
      link: "https://docs.microsoft.com/en-us/learn/certifications",
    },
    {
      id: "4",
      name: "Oracle Certified Professional, Java SE 11 Developer",
      issuer: "Oracle",
      date: "2023-06",
      expiryDate: "",
      credentialId: "OCP-JAVA11-2023-AG321",
      link: "https://education.oracle.com/certification",
    },
  ],
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData)
  const [selectedPalette, setSelectedPalette] = useState<keyof typeof colorPalettes>("corporate")
  const [fontFamily, setFontFamily] = useState<keyof typeof fontFamilies>("inter")
  const [fontSize, setFontSize] = useState<keyof typeof fontSizes>("medium")
  const [previewSize, setPreviewSize] = useState<keyof typeof previewSizes>("desktop")
  const [newSkill, setNewSkill] = useState("")
  const [activeTab, setActiveTab] = useState("contact")
  const [showSampleData, setShowSampleData] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [screenSize, setScreenSize] = useState("desktop")
  const [isExporting, setIsExporting] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize("mobile")
        setPreviewSize("mobile")
      } else if (width < 1024) {
        setScreenSize("tablet")
        setPreviewSize("tablet")
      } else {
        setScreenSize("desktop")
        setPreviewSize("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const loadSampleData = () => {
    setResumeData(sampleResumeData)
    setShowSampleData(true)
  }

  const clearData = () => {
    setResumeData({
      contact: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
      },
      summary: "",
      experience: [],
      education: [],
      skills: [],
      projects: [],
      achievements: [],
      certifications: [],
    })
    setShowSampleData(false)
  }

  const updateContact = (field: keyof ContactInfo, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
      github: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
      organization: "",
    }
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }))
  }

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement,
      ),
    }))
  }

  const removeAchievement = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((achievement) => achievement.id !== id),
    }))
  }

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      link: "",
    }
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }))
  }

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    }))
  }

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }

  const exportToPDF = async () => {
    if (!previewRef.current) return

    setIsExporting(true)

    try {
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      // Create a temporary container for full-size rendering
      const tempContainer = document.createElement("div")
      tempContainer.style.position = "absolute"
      tempContainer.style.left = "-9999px"
      tempContainer.style.top = "0"
      tempContainer.style.width = "794px" // A4 width in pixels at 96 DPI
      tempContainer.style.backgroundColor = "#ffffff"
      tempContainer.style.fontFamily = previewRef.current.style.fontFamily || "sans-serif"

      // Clone the preview content
      const clonedContent = previewRef.current.cloneNode(true) as HTMLElement
      clonedContent.style.width = "100%"
      clonedContent.style.height = "auto"
      clonedContent.style.minHeight = "auto"
      clonedContent.style.maxHeight = "none"
      clonedContent.style.transform = "none"
      clonedContent.style.margin = "0"
      clonedContent.style.padding = "40px"
      clonedContent.style.boxShadow = "none"

      tempContainer.appendChild(clonedContent)
      document.body.appendChild(tempContainer)

      // Wait for fonts and layout to settle
      await new Promise((resolve) => setTimeout(resolve, 500))

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 794,
        height: tempContainer.scrollHeight,
        windowWidth: 794,
        windowHeight: tempContainer.scrollHeight,
      })

      // Remove temporary container
      document.body.removeChild(tempContainer)

      const imgData = canvas.toDataURL("image/png", 1.0)
      const pdf = new jsPDF("p", "mm", "a4")

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height

      // Calculate scaling to fit width perfectly
      const ratio = pdfWidth / (imgWidth / 2) // Divide by 2 because of scale: 2
      const scaledHeight = (imgHeight / 2) * ratio

      // Handle multi-page content
      if (scaledHeight <= pdfHeight) {
        // Single page
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight)
      } else {
        // Multi-page
        let yPosition = 0
        let pageNumber = 0

        while (yPosition < scaledHeight) {
          if (pageNumber > 0) {
            pdf.addPage()
          }

          const remainingHeight = scaledHeight - yPosition
          const pageContentHeight = Math.min(pdfHeight, remainingHeight)

          // Calculate source coordinates for this page
          const sourceY = (yPosition / ratio) * 2
          const sourceHeight = (pageContentHeight / ratio) * 2

          // Create canvas for this page
          const pageCanvas = document.createElement("canvas")
          pageCanvas.width = imgWidth
          pageCanvas.height = sourceHeight
          const pageCtx = pageCanvas.getContext("2d")

          if (pageCtx) {
            // Create image from original canvas data
            const img = new Image()
            await new Promise<void>((resolve) => {
              img.onload = () => {
                pageCtx.drawImage(img, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight)
                const pageImgData = pageCanvas.toDataURL("image/png", 1.0)
                pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, pageContentHeight)
                resolve()
              }
              img.src = imgData
            })
          }

          yPosition += pdfHeight
          pageNumber++
        }
      }

      // Use the contact name for filename, fallback to 'Amit Gupta'
      const fileName = resumeData.contact.fullName || "Amit Gupta"
      pdf.save(`${fileName}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const palette = colorPalettes[selectedPalette]
  const currentPreviewSize = previewSizes[previewSize]

  const FormContent = () => (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Customization Panel */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border-b border-gray-100 p-3 sm:p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-gray-900 text-base sm:text-lg lg:text-xl font-semibold">
            <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
              <Palette className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-indigo-600" />
            </div>
            <span className="text-sm sm:text-base lg:text-lg">Appearance Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Color Palette Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700">Color Theme</Label>
                <Select
                  value={selectedPalette}
                  onValueChange={(value: keyof typeof colorPalettes) => setSelectedPalette(value)}
                >
                  <SelectTrigger className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(colorPalettes).map(([key, palette]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div
                            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${palette.badge.split(" ")[0]} border`}
                          ></div>
                          <span className="font-medium text-sm sm:text-base">{palette.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700">Font Family</Label>
                <Select value={fontFamily} onValueChange={(value: keyof typeof fontFamilies) => setFontFamily(value)}>
                  <SelectTrigger className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(fontFamilies).map(([key, font]) => (
                      <SelectItem key={key} value={key}>
                        <span className={`${font.class} font-medium text-sm sm:text-base`}>{font.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700">Font Size</Label>
                <Select value={fontSize} onValueChange={(value: keyof typeof fontSizes) => setFontSize(value)}>
                  <SelectTrigger className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(fontSizes).map(([key, size]) => (
                      <SelectItem key={key} value={key}>
                        <span className="font-medium text-sm sm:text-base">{size.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview Size Selection - Only show on desktop */}
            {screenSize === "desktop" && (
              <div className="space-y-3 hidden lg:block">
                <Label className="text-sm font-semibold text-gray-700">Preview Size</Label>
                <div className="flex gap-2">
                  {Object.entries(previewSizes).map(([key, size]) => {
                    const IconComponent = size.icon
                    return (
                      <Button
                        key={key}
                        variant={previewSize === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewSize(key as keyof typeof previewSizes)}
                        className={`flex items-center gap-2 h-9 sm:h-10 px-3 sm:px-4 font-medium transition-all text-xs sm:text-sm ${
                          previewSize === key
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                        }`}
                      >
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">{size.name}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resume Information */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 border-b border-gray-100 p-3 sm:p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-gray-900 text-base sm:text-lg lg:text-xl font-semibold">
            <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
              <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-slate-600" />
            </div>
            <span className="text-sm sm:text-base lg:text-lg">Resume Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 mb-4 sm:mb-6 h-10 sm:h-12 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="contact"
                className="text-xs sm:text-sm font-medium px-1 sm:px-3 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Contact
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="text-xs sm:text-sm font-medium px-1 sm:px-3 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="text-xs sm:text-sm font-medium px-1 sm:px-3 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <span className="hidden sm:inline">Experience</span>
                <span className="sm:hidden">Exp</span>
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="text-xs sm:text-sm font-medium px-1 sm:px-3 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <span className="hidden sm:inline">Education</span>
                <span className="sm:hidden">Edu</span>
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="text-xs sm:text-sm font-medium px-1 sm:px-3 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm lg:col-span-1"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="text-xs sm:text-sm font-medium px-1 sm:px-3 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm lg:col-span-1"
              >
                <span className="hidden sm:inline">Awards</span>
                <span className="sm:hidden">Awards</span>
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="text-xs sm:text-sm font-medium px-1 sm:px-3 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm lg:col-span-1"
              >
                <span className="hidden sm:inline">Certs</span>
                <span className="sm:hidden">Certs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={resumeData.contact.fullName}
                    onChange={(e) => updateContact("fullName", e.target.value)}
                    placeholder="Amit Gupta"
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    placeholder="amit.gupta@example.com"
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={resumeData.contact.phone}
                    onChange={(e) => updateContact("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={resumeData.contact.location}
                    onChange={(e) => updateContact("location", e.target.value)}
                    placeholder="Mumbai, Maharashtra"
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={resumeData.contact.website}
                    onChange={(e) => updateContact("website", e.target.value)}
                    placeholder="https://amitgupta.dev"
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-xs sm:text-sm font-semibold text-gray-700">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={resumeData.contact.linkedin}
                    onChange={(e) => updateContact("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/amit-gupta-dev"
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <Label htmlFor="github" className="text-xs sm:text-sm font-semibold text-gray-700">
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={resumeData.contact.github}
                    onChange={(e) => updateContact("github", e.target.value)}
                    placeholder="github.com/amit-gupta"
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="summary" className="text-xs sm:text-sm font-semibold text-gray-700">
                  Professional Summary
                </Label>
                <Textarea
                  id="summary"
                  value={resumeData.summary}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                  className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                />
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Work Experience</h3>
                <Button
                  onClick={addExperience}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-10 sm:h-11 lg:h-12 px-3 sm:px-4 shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {resumeData.experience.map((exp) => (
                  <Card key={exp.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                placeholder="Company Name"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">Position</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                placeholder="Job Title"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 p-0 shrink-0"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Start Date</Label>
                            <Input
                              type="date"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">End Date</Label>
                            <Input
                              type="date"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              disabled={exp.current}
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <Label htmlFor={`current-${exp.id}`} className="text-xs sm:text-sm font-medium text-gray-700">
                            Currently working here
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm font-semibold text-gray-700">Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="Describe your key responsibilities, achievements, and impact..."
                            className="min-h-[100px] sm:min-h-[120px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Education</h3>
                <Button
                  onClick={addEducation}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-10 sm:h-11 lg:h-12 px-3 sm:px-4 shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Add Education
                </Button>
              </div>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {resumeData.education.map((edu) => (
                  <Card key={edu.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">Institution</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                placeholder="Institution Name"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="Degree"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 p-0 shrink-0"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                              placeholder="Field of Study"
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Start Date</Label>
                            <Input
                              type="date"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">End Date</Label>
                            <Input
                              type="date"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                            GPA/Percentage (Optional)
                          </Label>
                          <Input
                            value={edu.gpa || ""}
                            onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                            placeholder="8.7/10.0 or 92.5%"
                            className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <Label htmlFor="newSkill" className="text-xs sm:text-sm font-semibold text-gray-700">
                  Add Skills
                </Label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Input
                    id="newSkill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill (e.g., JavaScript, Python)"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base flex-1"
                  />
                  <Button
                    onClick={addSkill}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-10 sm:h-11 lg:h-12 px-4 sm:px-6 shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200 transition-colors text-xs sm:text-sm"
                  >
                    <span className="font-medium">{skill}</span>
                    <button
                      onClick={() => removeSkill(index)}
                      className="ml-1 text-red-500 hover:text-red-700 font-bold text-sm sm:text-lg leading-none"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <Separator className="my-4 sm:my-6 lg:my-8" />

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Projects</h3>
                  <Button
                    onClick={addProject}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-10 sm:h-11 lg:h-12 px-3 sm:px-4 shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {resumeData.projects.map((project) => (
                    <Card
                      key={project.id}
                      className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-3 sm:p-4 lg:p-6">
                        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                          <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-4">
                            <div className="space-y-2 flex-1">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">Project Name</Label>
                              <Input
                                value={project.name}
                                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                                placeholder="Project Name"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 p-0 shrink-0"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => updateProject(project.id, "description", e.target.value)}
                              placeholder="Describe the project, your role, and key achievements..."
                              className="min-h-[80px] sm:min-h-[100px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Technologies Used</Label>
                            <Input
                              value={project.technologies}
                              onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                              placeholder="React, Node.js, MongoDB, etc."
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">Live Demo Link</Label>
                              <Input
                                value={project.link || ""}
                                onChange={(e) => updateProject(project.id, "link", e.target.value)}
                                placeholder="https://project-demo.com"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                                GitHub Repository
                              </Label>
                              <Input
                                value={project.github || ""}
                                onChange={(e) => updateProject(project.id, "github", e.target.value)}
                                placeholder="https://github.com/username/repo"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Achievements & Awards</h3>
                <Button
                  onClick={addAchievement}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-10 sm:h-11 lg:h-12 px-3 sm:px-4 shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {resumeData.achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-4">
                          <div className="space-y-2 flex-1">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Achievement Title</Label>
                            <Input
                              value={achievement.title}
                              onChange={(e) => updateAchievement(achievement.id, "title", e.target.value)}
                              placeholder="Achievement Title"
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAchievement(achievement.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 p-0 shrink-0"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm font-semibold text-gray-700">Description</Label>
                          <Textarea
                            value={achievement.description}
                            onChange={(e) => updateAchievement(achievement.id, "description", e.target.value)}
                            placeholder="Describe your achievement and its significance..."
                            className="min-h-[80px] sm:min-h-[100px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Date</Label>
                            <Input
                              type="date"
                              value={achievement.date}
                              onChange={(e) => updateAchievement(achievement.id, "date", e.target.value)}
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                              Organization (Optional)
                            </Label>
                            <Input
                              value={achievement.organization || ""}
                              onChange={(e) => updateAchievement(achievement.id, "organization", e.target.value)}
                              placeholder="Organization/Institution"
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Certifications</h3>
                <Button
                  onClick={addCertification}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-10 sm:h-11 lg:h-12 px-3 sm:px-4 shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {resumeData.certifications.map((cert) => (
                  <Card key={cert.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                                Certification Name
                              </Label>
                              <Input
                                value={cert.name}
                                onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                                placeholder="Certification Name"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                                Issuing Organization
                              </Label>
                              <Input
                                value={cert.issuer}
                                onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                                placeholder="Issuing Organization"
                                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(cert.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 p-0 shrink-0"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">Issue Date</Label>
                            <Input
                              type="date"
                              value={cert.date}
                              onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                              Expiry Date (Optional)
                            </Label>
                            <Input
                              type="date"
                              value={cert.expiryDate || ""}
                              onChange={(e) => updateCertification(cert.id, "expiryDate", e.target.value)}
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                              Credential ID (Optional)
                            </Label>
                            <Input
                              value={cert.credentialId || ""}
                              onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                              placeholder="Credential ID"
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">
                              Verification Link (Optional)
                            </Label>
                            <Input
                              value={cert.link || ""}
                              onChange={(e) => updateCertification(cert.id, "link", e.target.value)}
                              placeholder="https://verification-link.com"
                              className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header - Responsive Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-0 sm:mb-1 lg:mb-2 tracking-tight truncate">
                Professional Resume Builder
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 hidden sm:block font-medium">
                Create stunning resumes with live preview and professional templates
              </p>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <Button
                variant="outline"
                onClick={loadSampleData}
                className="flex items-center gap-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium h-9 xl:h-10 px-3 xl:px-4 shadow-sm transition-all text-sm"
                size="sm"
              >
                <FileText className="w-3 h-3 xl:w-4 xl:h-4" />
                Sample Data
              </Button>
              <Button
                variant="outline"
                onClick={clearData}
                className="flex items-center gap-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium h-9 xl:h-10 px-3 xl:px-4 shadow-sm transition-all text-sm"
                size="sm"
              >
                Clear All
              </Button>
              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-9 xl:h-10 px-3 xl:px-4 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                size="sm"
              >
                <Download className="w-3 h-3 xl:w-4 xl:h-4" />
                <span>{isExporting ? "Exporting..." : "Export PDF"}</span>
              </Button>
            </div>

            {/* Mobile/Tablet Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center gap-1 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-9 sm:h-10 px-2 sm:px-3 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                size="sm"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{isExporting ? "Exporting..." : "Export"}</span>
                <span className="sm:hidden">{isExporting ? "..." : "PDF"}</span>
              </Button>

              {/* Hamburger Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-gray-200 hover:bg-gray-50 h-9 sm:h-10 w-9 sm:w-10 p-0"
                  >
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-96 p-0">
                  <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Resume Editor</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-8 w-8 sm:h-10 sm:w-10 p-0"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                  <div className="p-3 sm:p-4 overflow-y-auto h-full bg-gray-50">
                    <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          loadSampleData()
                          setMobileMenuOpen(false)
                        }}
                        className="w-full justify-start bg-white border-gray-200 hover:bg-gray-50 font-medium h-10 sm:h-12 text-sm sm:text-base"
                        size="sm"
                      >
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        Load Sample Data
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          clearData()
                          setMobileMenuOpen(false)
                        }}
                        className="w-full justify-start bg-white border-gray-200 hover:bg-gray-50 font-medium h-10 sm:h-12 text-sm sm:text-base"
                        size="sm"
                      >
                        Clear All Data
                      </Button>
                    </div>
                    <FormContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Form Section - Hidden on desktop, shown in hamburger menu */}
          <div className="lg:block">
            <div className="hidden lg:block">
              <FormContent />
            </div>
          </div>

          {/* Preview Section - Always visible, responsive sizing */}
          <div className="order-first lg:order-last lg:sticky lg:top-24">
            <Card className="shadow-xl border-0 bg-white overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 border-b border-gray-100 p-3 sm:p-4 lg:p-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-gray-900 text-base sm:text-lg lg:text-xl font-semibold">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-slate-600" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg">Live Preview</span>
                  {screenSize === "desktop" && (
                    <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">
                      ({currentPreviewSize.name})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-visible">
                <div
                  className={`transition-all duration-300 ${screenSize === "desktop" ? currentPreviewSize.width : "w-full"} ${screenSize === "desktop" ? currentPreviewSize.scale : "scale-100"} mx-auto`}
                >
                  <div
                    ref={previewRef}
                    className={`bg-white m-2 sm:m-3 lg:m-6 p-3 sm:p-4 lg:p-6 xl:p-8 shadow-lg ${fontSizes[fontSize].class} ${fontFamilies[fontFamily].class} leading-relaxed`}
                    style={{
                      width: "100%",
                      minHeight: "auto",
                      paddingBottom: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {/* Header */}
                    <div
                      className={`${palette.header} p-3 sm:p-4 lg:p-6 xl:p-8 rounded-lg sm:rounded-xl mb-4 sm:mb-6 lg:mb-8 shadow-lg`}
                    >
                      <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 tracking-tight">
                        {resumeData.contact.fullName || "Your Name"}
                      </h1>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base opacity-95">
                        <div className="space-y-1 sm:space-y-2">
                          {resumeData.contact.email && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{resumeData.contact.email}</span>
                            </div>
                          )}
                          {resumeData.contact.phone && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{resumeData.contact.phone}</span>
                            </div>
                          )}
                          {resumeData.contact.location && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{resumeData.contact.location}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          {resumeData.contact.website && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{resumeData.contact.website}</span>
                            </div>
                          )}
                          {resumeData.contact.linkedin && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{resumeData.contact.linkedin}</span>
                            </div>
                          )}
                          {resumeData.contact.github && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{resumeData.contact.github}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    {resumeData.summary && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className={`${palette.section} mb-2 sm:mb-3 lg:mb-4`}>
                          <h2
                            className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${palette.primary} mb-2 sm:mb-3 lg:mb-4 tracking-tight`}
                          >
                            Professional Summary
                          </h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-justify text-xs sm:text-sm lg:text-base font-medium">
                          {resumeData.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className={`${palette.section} mb-2 sm:mb-3 lg:mb-4`}>
                          <h2
                            className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${palette.primary} mb-3 sm:mb-4 lg:mb-5 tracking-tight`}
                          >
                            Professional Experience
                          </h2>
                        </div>
                        <div className="space-y-4 sm:space-y-5 lg:space-y-7">
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="last:mb-0">
                              <div className="flex flex-col lg:flex-row justify-between items-start mb-2 sm:mb-3 gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg xl:text-xl mb-1 truncate">
                                    {exp.position}
                                  </h3>
                                  <p
                                    className={`${palette.secondary} font-semibold text-xs sm:text-sm lg:text-base xl:text-lg truncate`}
                                  >
                                    {exp.company}
                                  </p>
                                </div>
                                <div
                                  className={`${palette.badge} border px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold shadow-sm shrink-0`}
                                >
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                                  <span className="whitespace-nowrap">
                                    {exp.startDate &&
                                      new Date(exp.startDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                      })}{" "}
                                    -{" "}
                                    {exp.current
                                      ? "Present"
                                      : exp.endDate &&
                                        new Date(exp.endDate).toLocaleDateString("en-US", {
                                          month: "short",
                                          year: "numeric",
                                        })}
                                  </span>
                                </div>
                              </div>
                              {exp.description && (
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed text-justify font-medium">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className={`${palette.section} mb-2 sm:mb-3 lg:mb-4`}>
                          <h2
                            className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${palette.primary} mb-3 sm:mb-4 lg:mb-5 tracking-tight`}
                          >
                            Education
                          </h2>
                        </div>
                        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                          {resumeData.education.map((edu) => (
                            <div key={edu.id} className="last:mb-0">
                              <div className="flex flex-col lg:flex-row justify-between items-start mb-1 sm:mb-2 gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base xl:text-lg mb-1">
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                  </h3>
                                  <p
                                    className={`${palette.secondary} font-semibold text-xs sm:text-sm lg:text-base xl:text-lg truncate`}
                                  >
                                    {edu.institution}
                                  </p>
                                </div>
                                <div
                                  className={`${palette.badge} border px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold shadow-sm shrink-0`}
                                >
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                                  <span className="whitespace-nowrap">
                                    {edu.startDate &&
                                      new Date(edu.startDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                      })}{" "}
                                    -{" "}
                                    {edu.endDate &&
                                      new Date(edu.endDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                      })}
                                  </span>
                                </div>
                              </div>
                              {edu.gpa && (
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base font-semibold">
                                  <span className="text-gray-600">GPA:</span> {edu.gpa}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className={`${palette.section} mb-2 sm:mb-3 lg:mb-4`}>
                          <h2
                            className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${palette.primary} mb-3 sm:mb-4 lg:mb-5 tracking-tight`}
                          >
                            Technical Skills
                          </h2>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-3">
                          {resumeData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`${palette.badge} border px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold shadow-sm`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className={`${palette.section} mb-2 sm:mb-3 lg:mb-4`}>
                          <h2
                            className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${palette.primary} mb-3 sm:mb-4 lg:mb-5 tracking-tight`}
                          >
                            Projects
                          </h2>
                        </div>
                        <div className="space-y-4 sm:space-y-5 lg:space-y-7">
                          {resumeData.projects.map((project) => (
                            <div key={project.id} className="last:mb-0">
                              <div className="flex flex-col lg:flex-row justify-between items-start mb-2 sm:mb-3 gap-2">
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg xl:text-xl flex-1 min-w-0 truncate">
                                  {project.name}
                                </h3>
                                <div className="flex gap-2 sm:gap-3 shrink-0">
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      className={`${palette.secondary} text-xs sm:text-sm lg:text-base hover:underline font-semibold flex items-center gap-1`}
                                    >
                                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                      Demo
                                    </a>
                                  )}
                                  {project.github && (
                                    <a
                                      href={project.github}
                                      className={`${palette.secondary} text-xs sm:text-sm lg:text-base hover:underline font-semibold flex items-center gap-1`}
                                    >
                                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                                      Code
                                    </a>
                                  )}
                                </div>
                              </div>
                              {project.description && (
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed mb-2 sm:mb-3 text-justify font-medium">
                                  {project.description}
                                </p>
                              )}
                              {project.technologies && (
                                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                                  <span className="font-bold text-gray-800">Technologies:</span>{" "}
                                  <span className="font-medium">{project.technologies}</span>
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {resumeData.achievements.length > 0 && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className={`${palette.section} mb-2 sm:mb-3 lg:mb-4`}>
                          <h2
                            className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${palette.primary} mb-3 sm:mb-4 lg:mb-5 tracking-tight`}
                          >
                            Achievements & Awards
                          </h2>
                        </div>
                        <div className="space-y-4 sm:space-y-5 lg:space-y-7">
                          {resumeData.achievements.map((achievement) => (
                            <div key={achievement.id} className="last:mb-0">
                              <div className="flex flex-col lg:flex-row justify-between items-start mb-2 sm:mb-3 gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base xl:text-lg flex items-center gap-1 sm:gap-2 mb-1">
                                    <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-600 shrink-0" />
                                    <span className="truncate">{achievement.title}</span>
                                  </h3>
                                  {achievement.organization && (
                                    <p
                                      className={`${palette.secondary} font-semibold text-xs sm:text-sm lg:text-base truncate`}
                                    >
                                      {achievement.organization}
                                    </p>
                                  )}
                                </div>
                                {achievement.date && (
                                  <div
                                    className={`${palette.badge} border px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold shadow-sm shrink-0`}
                                  >
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                                    <span className="whitespace-nowrap">
                                      {new Date(achievement.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {achievement.description && (
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed text-justify font-medium">
                                  {achievement.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {resumeData.certifications.length > 0 && (
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className={`${palette.section} mb-2 sm:mb-3 lg:mb-4`}>
                          <h2
                            className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${palette.primary} mb-3 sm:mb-4 lg:mb-5 tracking-tight`}
                          >
                            Certifications
                          </h2>
                        </div>
                        <div className="space-y-4 sm:space-y-5 lg:space-y-7">
                          {resumeData.certifications.map((cert) => (
                            <div key={cert.id} className="last:mb-0">
                              <div className="flex flex-col lg:flex-row justify-between items-start mb-2 sm:mb-3 gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base xl:text-lg flex items-center gap-1 sm:gap-2 mb-1">
                                    <Certificate className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600 shrink-0" />
                                    <span className="truncate">{cert.name}</span>
                                  </h3>
                                  <p
                                    className={`${palette.secondary} font-semibold text-xs sm:text-sm lg:text-base mb-1 truncate`}
                                  >
                                    {cert.issuer}
                                  </p>
                                  {cert.credentialId && (
                                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium truncate">
                                      <span className="font-semibold">ID:</span> {cert.credentialId}
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
                                  <div
                                    className={`${palette.badge} border px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold shadow-sm`}
                                  >
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                                    <span className="whitespace-nowrap">
                                      {cert.date &&
                                        new Date(cert.date).toLocaleDateString("en-US", {
                                          month: "short",
                                          year: "numeric",
                                        })}
                                    </span>
                                  </div>
                                  {cert.expiryDate && (
                                    <div className="text-xs lg:text-sm text-gray-500 font-medium">
                                      Expires:{" "}
                                      {new Date(cert.expiryDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {cert.link && (
                                <a
                                  href={cert.link}
                                  className={`${palette.secondary} text-xs sm:text-sm lg:text-base hover:underline font-semibold flex items-center gap-1`}
                                >
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Verify Certification
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
