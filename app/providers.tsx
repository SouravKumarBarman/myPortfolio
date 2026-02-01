"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { AdminProvider } from "@/lib/admin-auth"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminProvider>{children}</AdminProvider>
    </ThemeProvider>
  )
}

