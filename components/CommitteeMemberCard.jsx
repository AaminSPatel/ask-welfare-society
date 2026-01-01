"use client"

export default function CommitteeMemberCard({ member }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition hover:-translate-y-1">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl font-bold text-primary/30">
        {member.image ? (
          <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          member.name.charAt(0)
        )}
      </div>

      <div className="p-6">
        {member.isFounder && (
          <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded mb-2 inline-block">
            Founder
          </span>
        )}

        <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
        <p className="text-secondary font-semibold mb-3">{member.role}</p>

        {member.description && (
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{member.description}</p>
        )}

        <div className="space-y-2 text-sm">
          {member.email && (
            <a href={`mailto:${member.email}`} className="text-primary hover:text-secondary transition block">
              {member.email}
            </a>
          )}
          {member.phone && <p className="text-muted-foreground">{member.phone}</p>}
        </div>
      </div>
    </div>
  )
}
