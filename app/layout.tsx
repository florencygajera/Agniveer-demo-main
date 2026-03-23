import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import "@fontsource/tilt-warp"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Agniveer - Official Portal",
  description:
    "Complete digital platform managing Agnipath scheme — recruitment, training, medical, performance analytics, and stipend for all serving Agniveers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  )
}
