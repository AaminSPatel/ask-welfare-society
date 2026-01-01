"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import EventCard from "@/components/EventCard"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events")
        const data = await response.json()
        setEvents(data.events || [])
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const categories = ["all", "program", "activity", "workshop", "other"]
  const filteredEvents = filter === "all" ? events : events.filter((e) => e.category === filter)

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Programs</h1>
            <p className="text-lg text-primary-foreground/90">Join us for community events and cultural programs</p>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    filter === cat ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No events found in this category</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
