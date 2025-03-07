"use client"

import { Mail, Github, Linkedin, ExternalLink, X, Moon, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  const skills = [
    { name: "C/C++", level: "Advanced", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    {
      name: "JavaScript",
      level: "Advanced",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      level: "Advanced",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Java",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "SQL",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "Python",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "ReactJS",
      level: "Advanced",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "FastAPI",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    },
    {
      name: "React Native",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "MongoDB",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Postgres",
      level: "Intermediate",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    { name: "Git", level: "Advanced", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ]

  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 dark:border-gray-700">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl ml-2">
            <Link href="/">Sourav</Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
              Experience
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="md:mr-2">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMenu}>
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-16 bg-background z-40 border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <nav className="container py-4 flex flex-col gap-4">
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="#skills"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Projects
              </Link>
              <Link
                href="#experience"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Experience
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-12 xl:py-12 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hi, I'm Sourav Kumar Barman
                  </h1>
                  <p className="text-xl text-muted-foreground dark:text-gray-300">
                    Computer Science Engineering Student
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </Button>
                  <Link
                    href="https://res.cloudinary.com/dyxfmln9h/image/upload/v1740851596/SouravResume_3_j2vguw.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    passHref // Important for passing href to child component
                  >
                    <Button variant="outline">
                      Download Resume
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-4">
                  <Link href="https://github.com/souravkumarbarman" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/sourav1729" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="https://avatars.githubusercontent.com/u/127683168?v=4"
                  alt="Profile"
                  width={600}
                  height={600}
                  className="rounded-full aspect-square object-cover border-4 border-border dark:border-gray-700"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h2>
                <p className="max-w-[900px] text-muted-foreground dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I'm a Computer Science Engineering student passionate about building web applications and solving
                  complex problems.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://res.cloudinary.com/dyxfmln9h/image/upload/v1740850982/RDT_20240607_152155566367229771748949_pl0fmn.jpg"
                alt="About Me"
                width={400}
                height={400}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Education</h3>
                      <p className="text-muted-foreground dark:text-gray-400 font-medium">
                        Bachelor of Technology in Computer Science and Engineering
                      </p>
                      <p className="text-muted-foreground dark:text-gray-400">
                        Jorhat Engineering College, Jorhat (Oct 2022 – May 2026)
                      </p>
                      <p className="text-muted-foreground dark:text-gray-400">Currently in 3rd Year | CGPA: 8.86</p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Interests</h3>
                      <p className="text-muted-foreground dark:text-gray-400">
                        Web Development, Machine Learning, Problem Solving, and Open Source
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Skills</h2>
                <p className="max-w-[900px] text-muted-foreground dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the technologies and tools I work with.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-4">
              {skills.map((skill) => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} logo={skill.logo} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h2>
                <p className="max-w-[900px] text-muted-foreground dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of my recent work.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <ProjectCard
                title="Chat with PDF"
                description="A web application that allows users to upload PDF documents and ask questions about the content using natural language processing."
                image="https://raw.githubusercontent.com/SouravKumarBarman/pdf-reader-chatbot/refs/heads/main/desktop.png"
                tags={["React", "Tailwind", "FastAPI", "LangChain", "NLP"]}
                
                codeLink="https://github.com/SouravKumarBarman/pdf-reader-chatbot"
              />
              <ProjectCard
                title="Full-Stack Blog Website"
                description="A complete blog platform with rich text editing features, user authentication, and image upload capabilities."
                image="https://res.cloudinary.com/dyxfmln9h/image/upload/v1741321014/Screenshot_2024-11-04_112609_rngmad.png"
                tags={["React", "Appwrite", "Tailwind CSS", "Redux"]}
                demoLink="https://blog-website-gules-sigma.vercel.app/"
                codeLink="https://github.com/SouravKumarBarman/blog-website"
              />
              <ProjectCard
                title="To-Do List Web Application"
                description="A task management application with features for creating, deleting, and marking tasks as complete, with data persistence."
                image="https://res.cloudinary.com/dyxfmln9h/image/upload/v1741321292/Screenshot_2025-03-07_095107_whvr5d.png"
                tags={["React", "Redux", "Tailwind CSS", "localStorage"]}
                demoLink="https://todo-app-tau-six-82.vercel.app/"
                codeLink="https://github.com/SouravKumarBarman/todo-redux"
              />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Experience</h2>
                <p className="max-w-[900px] text-muted-foreground dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My professional journey and contributions.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl space-y-8 py-12">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h3 className="text-xl font-bold">Research Intern</h3>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline">Jun 2024 - Jul 2024</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Open Source Intelligence Lab, IIT Guwahati</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Guwahati, Assam</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground dark:text-gray-400">
                      <li>
                        Gained hands-on experience with basic machine learning and deep learning classifiers and
                        libraries.
                      </li>
                      <li>
                        Developed a natural language processing (NLP) project focused on sentiment analysis, applying
                        learned techniques to real-world data.
                      </li>
                      <li>
                        Enhanced understanding of practical applications of machine learning in open source
                        intelligence.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h3 className="text-xl font-bold">Mentor, Data Structures and Algorithms Workshop</h3>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline">Oct 2023 - Nov 2023</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">DCODE Club, Jorhat Engineering College</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Jorhat, Assam</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground dark:text-gray-400">
                      <li>
                        Provided mentorship and guidance to participants in understanding data structures and
                        algorithms.
                      </li>
                      <li>
                        Assisted in developing problem-solving skills through practical exercises and coding challenges.
                      </li>
                      <li>Incorporated problem-solving techniques from LeetCode to enhance learning outcomes.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get In Touch</h2>
                <p className="max-w-[900px] text-muted-foreground dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have a project in mind or want to chat? Feel free to reach out!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground dark:text-gray-400" />
                  <span>souravkumarbarman1729@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 text-muted-foreground dark:text-gray-400">📱</span>
                  <span>+91-9707454684</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-muted-foreground dark:text-gray-400" />
                  <Link href="https://github.com/souravkumarbarman" className="hover:text-primary transition-colors" target="_blank">
                    github.com/souravkumarbarman
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Send Me a Message</h3>
                <form className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="Your message"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            © {new Date().getFullYear()} Sourav Kumar Barman. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://github.com/souravkumarbarman" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/souravkumarbarman/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:souravkumarbarman1729@gmail.com">
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SkillCard({ name, level, logo }: { name: string; level: string; logo: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-4 flex flex-col items-center gap-2">
          <div className="w-12 h-12 mb-2">
            <img src={logo || "/placeholder.svg"} alt={`${name} logo`} className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold">{name}</h3>
          <Badge variant={level === "Advanced" ? "default" : level === "Intermediate" ? "secondary" : "outline"}>
            {level}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ProjectCard({
  title,
  description,
  image,
  tags,
  demoLink,
  codeLink,
}: {
  title: string
  description: string
  image: string
  tags: string[]
  demoLink?: string
  codeLink: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={300}
          className="w-full h-[200px] object-cover"
        />
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground dark:text-gray-400 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            {demoLink?
            <Link href={demoLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </Link>:null}
            
            <Link href={codeLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

