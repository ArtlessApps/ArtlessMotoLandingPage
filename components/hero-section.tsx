"use client"

import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = (await response.json().catch(() => ({}))) as {
        error?: string
      }

      if (!response.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        )
        return
      }

      setIsSuccess(true)
      setEmail("")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-du4vwm5IoS8UUAGkN5nScXaRJEEyBW.png')`,
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <div className="mb-12">
          <h2 className="text-sm tracking-[0.4em] text-muted-foreground uppercase mb-2">
            Artless
          </h2>
          <div className="text-2xl font-bold tracking-wider text-foreground">
            MOTO
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground uppercase mb-6 text-balance">
          The American-Made
          <br />
          Tenere 700 Airbox
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Better Airflow. More Power. No Tariffs.
          <br />
          The GYTR Alternative That Ships Now.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
          <StatItem label="Airflow" value="Improved" />
          <div className="hidden md:block w-px bg-border h-16" />
          <StatItem label="Filter" value="GYTR Compatible" />
          <div className="hidden md:block w-px bg-border h-16" />
          <StatItem label="Origin" value="Made in USA" />
        </div>

        {/* Email Form */}
        {isSuccess ? (
          <div className="max-w-xl mx-auto">
            <div className="bg-accent/20 border border-accent/30 rounded px-6 py-4">
              <p className="text-accent font-medium text-lg">
                {"You're on the list!"}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                {"We'll notify you when pre-orders open."}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Get Notified"
                )}
              </button>
            </div>
            {error && (
              <p className="text-destructive text-sm mt-2">{error}</p>
            )}
            <p className="text-muted-foreground text-sm mt-4">
              Be first in line. No spam, just launch updates.
            </p>
          </form>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-2">
        {label}
      </p>
      <p className="text-xl md:text-2xl font-bold tracking-wide text-foreground uppercase">
        {value}
      </p>
    </div>
  )
}
