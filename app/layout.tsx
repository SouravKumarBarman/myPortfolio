import type React from "react"
import { Providers } from "./providers"
import { Analytics } from "@vercel/analytics/react"
import './globals.css'

export const metadata = {
  title: "Sourav - Full Stack Developer",
  description: "Portfolio of Sourav Kumar Barman - Full Stack Web Developer specializing in React, Node.js, and modern web technologies",
  keywords: ["Full Stack Developer", "React", "Node.js", "JavaScript", "TypeScript", "Web Development"],
  authors: [{ name: "Sourav Kumar Barman" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/image.png',
    apple: '/image.png',
  },
  openGraph: {
    title: "Sourav Kumar Barman - Full Stack Developer",
    description: "Portfolio of Sourav Kumar Barman - Full Stack Web Developer",
    type: "website",
  },
  verification: {
    google: 'C257maFEzCBUJhL4vMxfCyJ6Eav12d6YlKnOi2hML_g',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
