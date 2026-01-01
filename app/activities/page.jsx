"use client"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function ActivitiesPage() {
  const activities = [
    {
      title: "Community Welfare Programs",
      description:
        "We provide financial assistance, educational scholarships, and healthcare support to underprivileged members of our community.",
      points: ["Financial assistance", "Education scholarships", "Healthcare support", "Emergency relief"],
    },
    {
      title: "Educational Initiatives",
      description: "Promoting literacy and skill development through workshops, seminars, and training programs.",
      points: ["Literacy programs", "Skill development", "Career counseling", "Scholarship programs"],
    },
    {
      title: "Cultural & Social Events",
      description:
        "Celebrating our heritage and promoting community bonding through cultural festivals and social gatherings.",
      points: ["Festival celebrations", "Social gatherings", "Cultural programs", "Interfaith dialogue"],
    },
    {
      title: "Patriotic Education",
      description:
        "Promoting national integration and pride through our patriotic exam focused on India's freedom struggle.",
      points: ["National pride", "Freedom fighter education", "History awareness", "Civic responsibility"],
    },
  ]

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Activities</h1>
            <p className="text-lg text-primary-foreground/90">Making a difference in our community every day</p>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-12">
              {activities.map((activity, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <h2 className="text-3xl font-bold text-primary mb-4">{activity.title}</h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{activity.description}</p>

                    <ul className="space-y-3">
                      {activity.points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                          <span className="text-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`bg-gradient-to-br from-primary/20 to-secondary/20 aspect-square rounded-lg flex items-center justify-center text-6xl ${index % 2 === 1 ? "md:order-1" : ""}`}
                  >
                    {index === 0 && "🤝"}
                    {index === 1 && "📚"}
                    {index === 2 && "🎭"}
                    {index === 3 && "🇮🇳"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
