"use client"

export default function EventCard({ event }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition hover:-translate-y-1">
      {/* Image */}
      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
        {event.image ? (
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          "📸"
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
            {event.category}
          </span>
          <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
        </div>

        <h3 className="text-xl font-bold text-primary mb-2">{event.title}</h3>

        {event.location && <p className="text-muted-foreground text-sm mb-3">📍 {event.location}</p>}

        {event.description && <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>}
      </div>
    </div>
  )
}
