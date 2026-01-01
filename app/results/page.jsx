"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function PublicResultsPage() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("final")

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch("/api/public/results")
        const data = await response.json()
        setResults(data.results)
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading results...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!results) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">Results not yet published</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Results</h1>
            <p className="text-lg text-primary-foreground/90">Exam results and final selections</p>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-border">
              {["final", "qualified"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold border-b-2 transition ${
                    activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                  {tab === "final" ? "Final Selection (10)" : "Qualified (100)"}
                </button>
              ))}
            </div>

            {/* Category Sections */}
            {["student", "parent", "teacher"].map((role) => (
              <div key={role} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4 capitalize">{role}s</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results[activeTab]?.[role]?.map((candidate, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        </div>
                        <span className="text-3xl font-bold text-secondary">{candidate.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {results[activeTab]?.[role]?.length === 0 && (
                  <p className="text-muted-foreground">No candidates in this category</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
