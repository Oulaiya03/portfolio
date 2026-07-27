"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Moon, Sun, MapPin, ArrowUp, Github } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"

/* ------------------------------------------------------------------ */
/*  Section registry (drives the scroll-spy rail)                      */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "activities", label: "Activities" },
  { id: "languages", label: "Languages" },
] as const

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

/** Tracks which section is currently in the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      // Only a thin band through the middle of the screen counts as "active".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )

    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return active
}

/** Reveals children the first time they scroll into view. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Never let content stay invisible if observers are unavailable.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    )

    io.observe(el)

    // Safety net: if nothing has fired shortly after mount (hidden tab,
    // restored session, odd browser), show the content anyway.
    const failsafe = window.setTimeout(() => setShown(true), 2500)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={`reveal ${shown ? "reveal-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/** Counts up to a number once it scrolls into view. */
function Counter({ to, decimals = 0, duration = 1500 }: { to: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.unobserve(el)

        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          // ease-out-cubic
          setValue(to * (1 - Math.pow(1 - p, 3)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return <span ref={ref}>{value.toFixed(decimals)}</span>
}

/** Cycles through a list of words with a soft blur-in. */
function RotatingText({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span key={index} className="animate-rotate-in inline-block text-accent">
      {words[index]}
    </span>
  )
}

/** Types a string out once it enters the viewport. */
function TypewriterText({ text, speed = 45 }: { text: string; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setStarted(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [started, text, speed])

  const done = shown === text

  return (
    <>
      {/* Carries the text for search engines, screen readers and no-JS until the
          animation finishes, then steps aside so the text is not duplicated. */}
      {!done && <span className="sr-only">{text}</span>}
      <span ref={ref} aria-hidden={!done}>
        {shown || " "}
        {started && shown.length < text.length && <span className="animate-pulse">|</span>}
      </span>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Chrome: progress bar, rails, back-to-top                           */
/* ------------------------------------------------------------------ */

function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-accent shadow-[0_0_12px_var(--accent)] transition-[width] duration-100 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

/** Desktop: a vertical rail whose thumb slides to the section you're reading. */
function SectionRail({ active, onJump }: { active: string; onJump: (id: string) => void }) {
  const index = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === active),
  )

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex items-stretch gap-3">
        {/* the rail + moving thumb */}
        <div className="relative w-0.5 rounded-full bg-border" aria-hidden="true">
          <div
            className="nav-rail-thumb absolute left-0 w-0.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
            style={{
              height: `${100 / SECTIONS.length}%`,
              transform: `translateY(${index * 100}%)`,
            }}
          />
        </div>

        <ul className="flex flex-col justify-between gap-1">
          {SECTIONS.map((s) => {
            const isActive = s.id === active
            return (
              <li key={s.id}>
                <button
                  onClick={() => onJump(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-center gap-2 py-1.5 text-sm transition-all duration-300 ${
                    isActive
                      ? "font-semibold text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-1.5 rounded-full bg-current transition-all duration-300 ${
                      isActive ? "w-5" : "w-1.5 opacity-50 group-hover:w-3 group-hover:opacity-100"
                    }`}
                  />
                  {s.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

/** Mobile/tablet: a sticky pill bar that scrolls the active chip into view. */
function SectionPills({
  active,
  onJump,
  themeToggle,
}: {
  active: string
  onJump: (id: string) => void
  themeToggle: React.ReactNode
}) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const chip = bar.querySelector<HTMLElement>(`[data-chip="${active}"]`)
    if (chip) {
      bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
    }
  }, [active])

  return (
    <div className="sticky top-0 z-40 flex items-center border-b border-border/60 bg-background/85 backdrop-blur-md lg:hidden">
      <div
        ref={barRef}
        className="flex flex-1 gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SECTIONS.map((s) => {
          const isActive = s.id === active
          return (
            <button
              key={s.id}
              data-chip={s.id}
              onClick={() => onJump(s.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-sm transition-colors duration-300 ${
                isActive
                  ? "bg-accent font-medium text-accent-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>
      {/* Sits in the bar so it never covers the chips. */}
      <div className="flex-shrink-0 border-l border-border/60 px-2">{themeToggle}</div>
    </div>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 rounded-full transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}

/** Shared section heading with the terminal prompt + typewriter. */
function SectionHeading({ text }: { text: string }) {
  return (
    <h2 className="mb-8 text-3xl font-bold">
      <span className="text-accent">$ </span>
      <TypewriterText text={text} />
    </h2>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [displayedName, setDisplayedName] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const active = useActiveSection()
  const fullName = "Oulaiya Gaddari"

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
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

  const jump = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const themeToggle = (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
    >
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  )

  return (
    // The right padding reserves room for the fixed section rail so content
    // never runs underneath it on narrower laptop screens.
    <div className="min-h-screen bg-background lg:pr-40 2xl:pr-34">
      <ScrollProgress />
      <SectionRail active={active} onJump={jump} />
      <BackToTop />

      {/* Desktop: floats top right. Mobile: lives inside the sticky pill bar. */}
      <div className="fixed right-4 top-4 z-50 hidden lg:block">{themeToggle}</div>

      <SectionPills active={active} onJump={jump} themeToggle={themeToggle} />

      {/* ---------------- Hero ---------------- */}
      <section id="home" className="relative overflow-hidden">
        {/* ambient glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float-slow absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div
            className="animate-float-slow absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="container mx-auto mb-12 px-4 py-16 md:mb-20 md:py-24">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
            <div className="max-w-2xl flex-1">
              <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                Paris, France
              </p>

              <h1 className="mb-4 text-balance text-4xl font-bold md:text-6xl">
                {displayedName}
                <span className="animate-pulse">|</span>
              </h1>

              <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
                AI Engineer building{" "}
                <RotatingText words={["LLM systems", "agentic AI", "RAG pipelines", "computer vision", "MLOps"]} />
              </p>

              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                Graduate Data Science &amp; AI Engineer pursuing an MSc in Data Science. I&apos;m currently an AI &amp;
                Automation Engineer Intern at Mantu in Paris, building multi-agent AI systems, with hands-on experience
                in Generative AI, RAG, Machine Learning and Computer Vision. I&apos;m seeking a full-time AI Engineer
                position starting September 2026.
              </p>

              <div className="mb-10 flex flex-wrap gap-4">
                <Button variant="default" asChild className="transition-transform hover:scale-105">
                  <a href="mailto:oulaiya.gaddari03@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </a>
                </Button>
                <Button variant="outline" asChild className="bg-transparent transition-transform hover:scale-105">
                  <a href="tel:+33609550458">
                    <Phone className="mr-2 h-4 w-4" />
                    +33 6 09 55 04 58
                  </a>
                </Button>
                <Button variant="outline" asChild className="bg-transparent transition-transform hover:scale-105">
                  <a href="https://www.linkedin.com/in/oulaiya-gaddari" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild className="bg-transparent transition-transform hover:scale-105">
                  <a href="https://github.com/Oulaiya03" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>

              {/* live stats */}
              <dl className="grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: <Counter to={4} />, label: "Internships" },
                  { value: <Counter to={18} />, label: "Countries reached" },
                  { value: <Counter to={0.91} decimals={2} />, label: "Best model F1" },
                  { value: <Counter to={3} />, label: "Languages" },
                ].map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 90} className="h-full">
                    <div className="flex h-full flex-col justify-center rounded-lg border border-border bg-card/60 p-3 text-center transition-colors hover:border-accent/50">
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="block text-2xl font-bold text-accent">{stat.value}</span>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            {/* portrait */}
            <div className="relative w-64 flex-shrink-0 md:w-80">
              <div
                aria-hidden="true"
                className="animate-spin-ring absolute -inset-3 rounded-full opacity-70 [background:conic-gradient(from_0deg,transparent,var(--accent),transparent_60%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_0)]"
              />
              <div aria-hidden="true" className="absolute inset-0 animate-pulse rounded-full bg-accent opacity-20 blur-2xl" />
              <Image
                src="/images/design-mode/IMG_E4271.png(1).jpeg"
                alt="Oulaiya Gaddari"
                width={320}
                height={320}
                className="relative rounded-full border-4 border-accent object-cover shadow-2xl shadow-accent/30 transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Education ---------------- */}
      <section id="education" className="container mx-auto border-t border-border px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading text="Education" />
          <div className="space-y-6">
            {[
              {
                degree: "Master's Degree in Data Science",
                school: "University Claude Bernard Lyon 1",
                place: "Lyon, France",
                years: "2025 → 2026",
                courses: "Data Mining, Graph Data Analysis, Probabilistic Graphical Models, Data Visualization",
              },
              {
                degree: "Engineering in Data Science and Artificial Intelligence",
                school: "National School of Arts and Crafts (ENSAM)",
                place: "Rabat, Morocco",
                years: "2022 → 2025",
                courses: "Machine Learning, Deep Learning, Big Data, Data Analysis",
              },
              {
                degree: "Preparatory Classes, Mathematics and Physics",
                school: "AL QALAM",
                place: "Agadir, Morocco",
                years: "2020 → 2022",
                courses: "",
              },
            ].map((item, i) => (
              <Reveal key={item.degree} delay={i * 110}>
                <Card className="card-interactive p-6">
                  <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{item.degree}</h3>
                      <p className="text-muted-foreground">{item.school}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {item.place}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-sm font-medium text-accent">{item.years}</span>
                  </div>
                  {item.courses && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Coursework: </span>
                      {item.courses}
                    </p>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Experience ---------------- */}
      <section id="experience" className="container mx-auto border-t border-border px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading text="Experience" />

          <div className="relative border-l border-border pl-6 md:pl-8">
            <div className="space-y-6">
              {[
                {
                  role: "AI & Automation Engineer Intern",
                  org: "Mantu Group",
                  place: "Paris, France",
                  dates: "Mar 2026 → Present",
                  current: true,
                  points: [
                    'Built "Madame Irma", an organization digital twin using AI agents to simulate strategic decision cascades across 123 employees modeled from Mantu\'s org chart',
                    "Designed a multi-agent simulation engine (Python, GPT-5.1, Neo4j) reproducing internal communications to assess organizational impact before deployment",
                    "Built an executive report pipeline (ReAct loop, graph and SQL retrieval) producing governance audits and strategic recommendations",
                  ],
                },
                {
                  role: "AI Engineer Intern (PFE)",
                  org: "Orange Group, Sofrecom",
                  place: "Rabat, Morocco",
                  dates: "Feb 2025 → Jul 2025",
                  current: false,
                  points: [
                    "Built a RAG pipeline (LangChain, LLaMA 3.1 8B, ChromaDB, HuggingFace) automating QoS report commentary generation for 18 OMEA countries",
                    "Designed a predictive module (LSTM vs XGBoost) to forecast network congestion, selecting XGBoost at R² = 0.91",
                    "Developed an interactive dashboard (Dash/Plotly) visualizing 300+ KPIs and AI-generated insights",
                  ],
                },
                {
                  role: "AI & Data Science Engineer Intern (PFA)",
                  org: "Caisse de Dépôt et de Gestion (CDG)",
                  place: "Rabat, Morocco",
                  dates: "Jul 2024 → Sep 2024",
                  current: false,
                  points: [
                    "Built a WhatsApp chatbot (Node.js, Twilio API, Python) automating responses to notaries and clients at roughly an 80% automation rate",
                    "Developed a Power BI dashboard to automate and visualize operational data",
                    "Created a user guide and tutorial video to enhance Power BI adoption",
                  ],
                },
                {
                  role: "Introductory Internship",
                  org: "Al Barid Bank (ABB)",
                  place: "Rabat, Morocco",
                  dates: "Aug 2023 → Sep 2023",
                  current: false,
                  points: ["Built a banking complaint management platform with an agile deployment workflow"],
                },
              ].map((job, i) => (
                <Reveal key={job.org} delay={i * 110}>
                  <div className="timeline-item relative">
                    <span
                      aria-hidden="true"
                      className="timeline-dot absolute -left-[31px] top-6 h-3 w-3 rounded-full bg-accent md:-left-[39px]"
                    />
                    <Card className="card-interactive p-6">
                      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="flex flex-wrap items-center gap-2 text-xl font-semibold">
                            {job.role}
                            {job.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                                </span>
                                Current
                              </span>
                            )}
                          </h3>
                          <p className="text-muted-foreground">{job.org}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-accent" />
                            {job.place}
                          </p>
                        </div>
                        <span className="whitespace-nowrap text-sm font-medium text-accent">{job.dates}</span>
                      </div>
                      <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                        {job.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Projects ---------------- */}
      <section id="projects" className="container mx-auto border-t border-border px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading text="Personal Projects" />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Bank Customer Churn Prediction",
                desc: "End-to-end churn prediction on a 10,000+ customer dataset. Benchmarked Random Forest, XGBoost and LightGBM (best F1 = 0.91), with a full MLOps pipeline covering CI/CD, drift monitoring and a RAG/LLM assistant.",
                tags: ["FastAPI", "LightGBM", "MLOps", "Jenkins", "Docker"],
              },
              {
                title: "Machine Learning Detection",
                desc: "Computer Vision models for sign language recognition and tumor detection using Python, OpenCV, and Mediapipe.",
                tags: ["Python", "OpenCV", "Mediapipe"],
              },
              {
                title: "ENSAM Intelligent Chatbot",
                desc: "Developed a generative AI chatbot using LangChain and GPT-3.5 to automate responses for students and visitors.",
                tags: ["LangChain", "GPT-3.5", "NLP"],
              },
              {
                title: "Multi-Agent AI System",
                desc: "Designed a multi-agent system using CrewAI to coordinate multiple AIs for complex task execution.",
                tags: ["CrewAI", "Multi-Agent", "Python"],
              },
            ].map((project, i) => (
              <Reveal key={project.title} delay={i * 110}>
                <Card className="card-interactive h-full p-6">
                  <h3 className="mb-3 text-xl font-semibold">{project.title}</h3>
                  <p className="mb-4 text-muted-foreground">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="badge-pop hover:bg-accent hover:text-accent-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Skills ---------------- */}
      <section id="skills" className="container mx-auto border-t border-border px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading text="Technical Skills" />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                group: "Programming Languages",
                items: ["Python", "SQL", "R", "TypeScript", "JavaScript", "Java"],
              },
              {
                group: "AI & Machine Learning",
                items: [
                  "LLMs",
                  "RAG",
                  "Agentic AI",
                  "Prompt Engineering",
                  "Fine-tuning",
                  "Embeddings",
                  "Vector Databases",
                  "NLP",
                  "Computer Vision",
                  "Deep Learning",
                ],
              },
              {
                group: "Frameworks & Libraries",
                items: [
                  "LangChain",
                  "LangGraph",
                  "CrewAI",
                  "PyTorch",
                  "TensorFlow",
                  "Scikit-learn",
                  "OpenCV",
                  "Mediapipe",
                  "Pandas",
                  "NumPy",
                ],
              },
              {
                group: "Tools & Deployment",
                items: [
                  "Docker",
                  "Jenkins",
                  "Git",
                  "Azure DevOps",
                  "Neo4j",
                  "ChromaDB",
                  "Power BI",
                  "Dash",
                  "Streamlit",
                ],
              },
            ].map((cat, i) => (
              <Reveal key={cat.group} delay={i * 110}>
                <Card className="card-interactive h-full p-6">
                  <h3 className="mb-4 text-lg font-semibold">{cat.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <Badge key={item} className="badge-pop">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Activities ---------------- */}
      <section id="activities" className="container mx-auto border-t border-border px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading text="Extracurricular Activities" />
          <div className="space-y-4">
            {[
              {
                title: "Top 10 Team, Mega Hackathon Orange 2024",
                desc: "Ranked among the top 10 teams nationally in the Orange Hackathon competition.",
                href: "",
              },
              {
                title: "Co-founder of ALTs Morocco",
                desc: "A weekly coworking event where creators meet to work on their projects.",
                href: "https://altsmorocco.com",
              },
              {
                title: "Co-lead of TEDxENSAM",
                desc: "Planning and organizing a TEDx event within ENSAM.",
                href: "",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <Card className="card-interactive p-6">
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">
                    {item.desc}
                    {item.href && (
                      <>
                        {" "}
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          altsmorocco.com
                        </a>
                      </>
                    )}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Languages ---------------- */}
      <section id="languages" className="container mx-auto border-t border-border px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading text="Languages" />
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Arabic", level: "Native", pct: 100 },
              { name: "French", level: "Professional, C1", pct: 90 },
              { name: "English", level: "Fluent, C1", pct: 90 },
            ].map((lang, i) => (
              <Reveal key={lang.name} delay={i * 110} className="min-w-[200px] flex-1">
                <Card className="card-interactive h-full p-6">
                  <h3 className="mb-1 text-lg font-semibold">{lang.name}</h3>
                  <p className="mb-3 text-muted-foreground">{lang.level}</p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-out"
                      style={{ width: `${lang.pct}%` }}
                    />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="container mx-auto border-t border-border px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 Oulaiya Gaddari. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="mailto:oulaiya.gaddari03@gmail.com" className="transition-colors hover:text-accent">
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/oulaiya-gaddari"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Oulaiya03"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
