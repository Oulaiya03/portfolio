"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("")
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartTyping(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!startTyping) return

    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [text, startTyping])

  return (
    <>
      {displayedText}
      {displayedText.length < text.length && <span className="animate-pulse">|</span>}
    </>
  )
}

export default function Portfolio() {
  const [displayedName, setDisplayedName] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const fullName = "Oulaiya Gaddari"

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullName.length) {
        setDisplayedName(fullName.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
              {displayedName}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl md:text-2xl text-accent mb-6 animate-fade-in-up animation-delay-500">
              AI Engineer — Data Science, LLMs & Agentic AI
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-in-up animation-delay-700">
              Graduate Data Science & AI Engineer pursuing an MSc in Data Science. I'm currently an AI & Automation
              Engineer Intern at Mantu in Paris, building multi-agent AI systems, with hands-on experience in
              Generative AI, RAG, Machine Learning and Computer Vision. I'm seeking a full-time AI Engineer position
              starting September 2026 to apply cutting-edge AI solutions to real-world challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="default"
                asChild
                className="animate-fade-in-up animation-delay-900 hover:scale-105 transition-transform"
              >
                <a href="mailto:oulaiya.gaddari03@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="animate-fade-in-up animation-delay-1000 hover:scale-105 transition-transform bg-transparent"
              >
                <a href="tel:+33609550458">
                  <Phone className="mr-2 h-4 w-4" />
                  +33 6 09 55 04 58
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="animate-fade-in-up animation-delay-1100 hover:scale-105 transition-transform bg-transparent"
              >
                <a
                  href="https://www.linkedin.com/in/oulaiya-gaddari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 animate-fade-in-up animation-delay-300">
            <div className="absolute inset-0 bg-accent rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <Image
              src="/images/design-mode/IMG_E4271.png(1).jpeg"
              alt="Oulaiya Gaddari"
              width={320}
              height={320}
              className="relative rounded-full border-4 border-accent shadow-2xl shadow-accent/30 hover:scale-105 transition-transform duration-100 object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border mt-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">
            <span className="text-accent">$ </span>
            <TypewriterText text="Education" delay={200} />
          </h2>
          <div className="space-y-6">
            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">Master's Degree in Data Science</h3>
                  <p className="text-muted-foreground">University Claude Bernard Lyon 1, Lyon</p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">2025 – 2026</span>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">Engineering in Data Science and Artificial Intelligence</h3>
                  <p className="text-muted-foreground">National School of Arts and Crafts (ENSAM), Rabat</p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">2022 – 2025</span>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-400">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">Preparatory Classes</h3>
                  <p className="text-muted-foreground">AL QALAM, Agadir – Mathematics and Physics</p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">2020 – 2022</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">
            <span className="text-accent">$ </span>
            <TypewriterText text="Experience" delay={400} />
          </h2>
          <div className="space-y-6">
            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">AI & Automation Engineer Intern</h3>
                  <p className="text-muted-foreground">Mantu Group — Paris</p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">March 2026 – Present</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Built "Madame Irma", an organization digital twin using AI agents to simulate strategic decision
                  cascades across 123 employees modeled from Mantu's org chart
                </li>
                <li>
                  Designed a multi-agent simulation engine (Python, GPT-5.1, Neo4j) reproducing internal communications
                  to assess organizational impact before deployment
                </li>
                <li>
                  Built an executive report pipeline (ReAct loop, graph + SQL retrieval) producing governance audits and
                  strategic recommendations
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">AI Engineer Intern (PFE)</h3>
                  <p className="text-muted-foreground">Orange Group, Sofrecom — Rabat</p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">February – July 2025</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Built a RAG pipeline (LangChain, LLaMA 3.1 8B, ChromaDB, HuggingFace) automating QoS report commentary
                  generation for 18 OMEA countries
                </li>
                <li>Designed a predictive module (LSTM vs XGBoost) to forecast network congestion; XGBoost selected (R² = 0.91)</li>
                <li>Developed an interactive dashboard (Dash/Plotly) visualizing 300+ KPIs and AI-generated insights</li>
              </ul>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-400">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">AI & Data Science Engineer Intern (PFA)</h3>
                  <p className="text-muted-foreground">Caisse de Dépôt et de Gestion (CDG) — Rabat</p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">July – September 2024</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Built a WhatsApp chatbot (Node.js, Twilio API, Python) automating responses to notaries and clients
                  (~80% automation rate)
                </li>
                <li>Developed a Power BI dashboard to automate and visualize operational data</li>
                <li>Created a user guide and tutorial video to enhance Power BI adoption</li>
              </ul>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold">Introductory Internship</h3>
                  <p className="text-muted-foreground">Al Barid Bank (ABB) — Rabat</p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">August – September 2023</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Built a banking complaint management platform with an agile deployment workflow</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">
            <span className="text-accent">$ </span>
            <TypewriterText text="Personal Projects" delay={600} />
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-200">
              <h3 className="text-xl font-semibold mb-3">Bank Customer Churn Prediction</h3>
              <p className="text-muted-foreground mb-4">
                End-to-end churn prediction on a 10,000+ customer dataset. Benchmarked Random Forest, XGBoost and
                LightGBM (best F1 = 0.91), with a full MLOps pipeline — CI/CD, drift monitoring and a RAG/LLM assistant.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  FastAPI
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  LightGBM
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  MLOps
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  Jenkins
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  Docker
                </Badge>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-300">
              <h3 className="text-xl font-semibold mb-3">Machine Learning Detection</h3>
              <p className="text-muted-foreground mb-4">
                Computer Vision models for sign language recognition and tumor detection using Python, OpenCV, and
                Mediapipe.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  Python
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  OpenCV
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  Mediapipe
                </Badge>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-400">
              <h3 className="text-xl font-semibold mb-3">ENSAM Intelligent Chatbot</h3>
              <p className="text-muted-foreground mb-4">
                Developed a generative-AI chatbot using LangChain and GPT-3.5 to automate responses for students and
                visitors.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  LangChain
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  GPT-3.5
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  NLP
                </Badge>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-500">
              <h3 className="text-xl font-semibold mb-3">Multi-Agent AI System</h3>
              <p className="text-muted-foreground mb-4">
                Designed a multi-agent system using CrewAI to coordinate multiple AIs for complex task execution.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  CrewAI
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  Multi-Agent
                </Badge>
                <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                  Python
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">
            <span className="text-accent">$ </span>
            <TypewriterText text="Technical Skills" delay={800} />
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-200">
              <h3 className="text-lg font-semibold mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="hover:scale-110 transition-transform">Python</Badge>
                <Badge className="hover:scale-110 transition-transform">SQL</Badge>
                <Badge className="hover:scale-110 transition-transform">R</Badge>
                <Badge className="hover:scale-110 transition-transform">TypeScript</Badge>
                <Badge className="hover:scale-110 transition-transform">JavaScript</Badge>
                <Badge className="hover:scale-110 transition-transform">Java</Badge>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-300">
              <h3 className="text-lg font-semibold mb-4">AI & Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="hover:scale-110 transition-transform">LLMs</Badge>
                <Badge className="hover:scale-110 transition-transform">RAG</Badge>
                <Badge className="hover:scale-110 transition-transform">Agentic AI</Badge>
                <Badge className="hover:scale-110 transition-transform">Prompt Engineering</Badge>
                <Badge className="hover:scale-110 transition-transform">Fine-tuning</Badge>
                <Badge className="hover:scale-110 transition-transform">Embeddings</Badge>
                <Badge className="hover:scale-110 transition-transform">Vector Databases</Badge>
                <Badge className="hover:scale-110 transition-transform">NLP</Badge>
                <Badge className="hover:scale-110 transition-transform">Computer Vision</Badge>
                <Badge className="hover:scale-110 transition-transform">Deep Learning</Badge>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-400">
              <h3 className="text-lg font-semibold mb-4">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="hover:scale-110 transition-transform">LangChain</Badge>
                <Badge className="hover:scale-110 transition-transform">LangGraph</Badge>
                <Badge className="hover:scale-110 transition-transform">CrewAI</Badge>
                <Badge className="hover:scale-110 transition-transform">PyTorch</Badge>
                <Badge className="hover:scale-110 transition-transform">TensorFlow</Badge>
                <Badge className="hover:scale-110 transition-transform">Scikit-learn</Badge>
                <Badge className="hover:scale-110 transition-transform">OpenCV</Badge>
                <Badge className="hover:scale-110 transition-transform">Mediapipe</Badge>
                <Badge className="hover:scale-110 transition-transform">Pandas</Badge>
                <Badge className="hover:scale-110 transition-transform">NumPy</Badge>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-500">
              <h3 className="text-lg font-semibold mb-4">Tools & Deployment</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="hover:scale-110 transition-transform">Docker</Badge>
                <Badge className="hover:scale-110 transition-transform">Jenkins</Badge>
                <Badge className="hover:scale-110 transition-transform">Git</Badge>
                <Badge className="hover:scale-110 transition-transform">Azure DevOps</Badge>
                <Badge className="hover:scale-110 transition-transform">Neo4j</Badge>
                <Badge className="hover:scale-110 transition-transform">ChromaDB</Badge>
                <Badge className="hover:scale-110 transition-transform">Power BI</Badge>
                <Badge className="hover:scale-110 transition-transform">Dash</Badge>
                <Badge className="hover:scale-110 transition-transform">Streamlit</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">
            <span className="text-accent">$ </span>
            <TypewriterText text="Extracurricular Activities" delay={1000} />
          </h2>
          <div className="space-y-4">
            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-200">
              <h3 className="text-lg font-semibold mb-2">Top 10 Team - MEGA HACKATHON ORANGE 2024</h3>
              <p className="text-muted-foreground">
                Ranked among the top 10 teams in the prestigious Orange Hackathon competition.
              </p>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-300">
              <h3 className="text-lg font-semibold mb-2">Co-founder of ALTs Morocco</h3>
              <p className="text-muted-foreground">
                A weekly coworking event where creators meet to work on their projects.
              </p>
            </Card>

            <Card className="p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-400">
              <h3 className="text-lg font-semibold mb-2">Co-lead of TEDxENSAM</h3>
              <p className="text-muted-foreground">Planning and organizing a TEDx event within ENSAM.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">
            <span className="text-accent">$ </span>
            <TypewriterText text="Languages" delay={1200} />
          </h2>
          <div className="flex flex-wrap gap-4">
            <Card className="p-6 flex-1 min-w-[200px] hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-200">
              <h3 className="text-lg font-semibold mb-2">Arabic</h3>
              <p className="text-muted-foreground">Native</p>
            </Card>
            <Card className="p-6 flex-1 min-w-[200px] hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-300">
              <h3 className="text-lg font-semibold mb-2">French</h3>
              <p className="text-muted-foreground">Professional - C1 Level</p>
            </Card>
            <Card className="p-6 flex-1 min-w-[200px] hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up animation-delay-400">
              <h3 className="text-lg font-semibold mb-2">English</h3>
              <p className="text-muted-foreground">Fluent</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Oulaiya Gaddari. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="mailto:oulaiya.gaddari03@gmail.com" className="hover:text-accent transition-colors">
              Email
            </a>
            <a
              href="https://linkedin.com/in/oulaiya-gaddari"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
