"use client"

export default function VisionMissionSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* ज्यामितीय पृष्ठभूमि पैटर्न */}
      <div className="absolute inset-0 opacity-10">
        <div className="geometric-pattern"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">हमारी दृष्टि और मिशन</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* दृष्टि */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-8 hover:border-primary-foreground/40 transition">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">हमारी दृष्टि</h3>
            <p className="text-primary-foreground/90 leading-relaxed">
              एक समृद्ध, समावेशी समुदाय बनाना जहां प्रत्येक व्यक्ति को गुणवत्तापूर्ण शिक्षा, सामाजिक समर्थन और सांस्कृतिक समृद्धि तक पहुंच हो,
              जो आने वाली पीढ़ियों के लिए एकता और प्रगति को बढ़ावा दे।
            </p>
          </div>

          {/* मिशन */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-8 hover:border-primary-foreground/40 transition">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">हमारा मिशन</h3>
            <p className="text-primary-foreground/90 leading-relaxed">
              कल्याणकारी पहलों, शैक्षिक कार्यक्रमों और सांस्कृतिक गतिविधियों के माध्यम से हमारे समुदाय की सेवा करना,
              साथ ही हमारे इस्लामी मूल्यों को बनाए रखते हुए सामाजिक सद्भाव, न्याय और सामूहिक विकास को बढ़ावा देना।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}