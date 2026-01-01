"use client"

export default function CarouselSlide({ member, isActive }) {
  return (
    <div className="relative w-full h-96 md:h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={member.image || "/placeholder.jpg"} alt={member.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div
        className={`absolute inset-0 flex items-end justify-start p-6 md:p-12 transition-all duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-white max-w-xl animate-fade-in-up">
          {member.photo && (
            <img
              src={member.photo || "/placeholder.svg"}
              alt={member.name}
              className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-secondary mb-4 object-cover"
            />
          )}
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-secondary">{member.name}</h2>
          <p className="text-lg md:text-2xl text-white/90 mb-4">{member.designation}</p>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-lg">{member.description}</p>
        </div>
      </div>

      {/* Geometric Pattern Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <pattern id="geometric" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,0 L10,10 M10,0 L0,10" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#geometric)" />
        </svg>
      </div>
    </div>
  )
}
