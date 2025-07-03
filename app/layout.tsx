import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { PerformanceMonitor } from "@/components/performance-monitor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MD Electronics - Premium Home Appliances",
  description:
    "Your trusted partner for premium home appliances. Quality products, exceptional service, and competitive prices.",
  keywords: "electronics, appliances, refrigerators, ovens, televisions, air conditioners, washing machines",
  authors: [{ name: "MD Electronics" }],
  creator: "MD Electronics",
  publisher: "MD Electronics",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#3b82f6",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdelectronics.com",
    title: "MD Electronics - Premium Home Appliances",
    description:
      "Your trusted partner for premium home appliances. Quality products, exceptional service, and competitive prices.",
    siteName: "MD Electronics",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Electronics - Premium Home Appliances",
    description:
      "Your trusted partner for premium home appliances. Quality products, exceptional service, and competitive prices.",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <PerformanceMonitor />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
