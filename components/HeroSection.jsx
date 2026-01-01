"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function HeroSection() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <section className="bg-linear-to-br from-primary via-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 geometric-pattern"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${animate ? "animate-slide-in-left" : "opacity-0"}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Serving Our <span className="text-secondary">Community</span> With Pride
            </h1>
            <p className="text-lg mb-8 text-primary-foreground/90 leading-relaxed">
              The Muslim Welfare Society is dedicated to fostering social growth, cultural harmony, and educational
              excellence within our community. We believe in the power of unity and collective progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/exam"
                className="bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition text-center"
              >
                Take Exam
              </Link>
              <Link
                href="/activities"
                className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/10 transition text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Decorative Element */}
          <div
            className={`hidden md:flex items-center justify-center ${animate ? "animate-slide-in-right" : "opacity-0"}`}
          >
            <div className="w-80 h-80 bg-gradient-to-br from-secondary to-secondary/50 rounded-full relative shadow-2xl">
              <div className="absolute inset-8 border-4 border-primary-foreground rounded-full"></div>
              <div className="absolute inset-16 border-2 border-primary-foreground rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
