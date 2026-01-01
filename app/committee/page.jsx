"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import CommitteeMemberCard from "@/components/CommitteeMemberCard"

export default function CommitteePage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [founders, setFounders] = useState([])
  const [otherMembers, setOtherMembers] = useState([])

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/committee-members")
        const data = await response.json()

        if (data.members) {
          const foundersData = data.members.filter((m) => m.isFounder)
          const othersData = data.members.filter((m) => !m.isFounder)

          setFounders(foundersData)
          setOtherMembers(othersData)
          setMembers(data.members)
        }
      } catch (error) {
        console.error("Error fetching members:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Committee Members</h1>
            <p className="text-lg text-primary-foreground/90">Meet the dedicated leaders driving our mission forward</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {/* Founders */}
                {founders.length > 0 && (
                  <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Founders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {founders.map((member) => (
                        <CommitteeMemberCard key={member._id} member={member} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Members */}
                {otherMembers.length > 0 && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Core Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {otherMembers.map((member) => (
                        <CommitteeMemberCard key={member._id} member={member} />
                      ))}
                    </div>
                  </div>
                )}

                {members.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No committee members found</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
