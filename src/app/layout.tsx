import '@/app/globals.css'
import { Toaster } from '@/components/ui/toaster'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/stores/theme-provider'
import { Inter as FontSans } from 'next/font/google'
import React from 'react'

interface RootLayoutProps {
  children: React.ReactNode
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <head>
          <title>Dashboard</title>
        </head>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  )
}
