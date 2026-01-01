import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AskProvider } from "../lib/askContext"

export const metadata = {
  title: "Muslim Welfare Society - Community Service",
  description: "A dedicated platform for community welfare, education, and cultural programs",
  generator: "Aamin Patel",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <AskProvider>
          {children}
        </AskProvider>
        <Analytics />
      </body>
    </html>
  )
}
