"use client"

import { useState, useEffect } from "react"
import CarouselSlide from "./CarouselSlide"

export default function HeroCarousel({ founders = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const defaultFounders = [
    {
      name: "कालिम शेख",
      designation: "अध्यक्ष",
      description: "1995 से समाज का नेतृत्व कर रहे हैं, सामुदायिक कल्याण और शैक्षिक उत्कृष्टता के लिए दृष्टि के साथ।",
      image: "/w7.jpeg",
      photo: "/cards/ca1.jpg",
    },
    {
      name: "मो. एजाज",
      designation: "उपाध्यक्ष",
      description: "हमारे समुदाय में महिला सशक्तिकरण और सांस्कृतिक संरक्षण के लिए समर्पित।",
      image: "/w2.jpeg",
      photo: "/cards/ca2.jpg",
    }, 
  ]

  const slides = founders.length > 0 ? founders : defaultFounders

  useEffect(() => {
    if (!autoplay) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoplay, slides.length])

  const goToSlide = (index) => {
    setActiveIndex(index)
    setAutoplay(false)
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
    setAutoplay(false)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoplay(false)
  }

  return (
    <div className="relative w-full bg-black overflow-hidden group">
      {/* स्लाइड्स */}
      <div className="relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "opacity-0 absolute"}`}
          >
            <CarouselSlide member={slide} isActive={index === activeIndex} />
          </div>
        ))}
      </div>

      {/* नेविगेशन एरो बटन */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-secondary/80 hover:bg-secondary text-primary w-12 h-12 rounded-full flex items-center justify-center transition opacity-0 group-hover:opacity-100"
        aria-label="पिछली स्लाइड"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-secondary/80 hover:bg-secondary text-primary w-12 h-12 rounded-full flex items-center justify-center transition opacity-0 group-hover:opacity-100"
        aria-label="अगली स्लाइड"
      >
        ›
      </button>

      {/* पेजिनेशन डॉट्स */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex ? "bg-secondary w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`स्लाइड ${index + 1} पर जाएं`}
          />
        ))}
      </div>

      {/* स्लाइड काउंटर */}
      <div className="absolute top-6 right-6 z-20 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
        {activeIndex + 1} / {slides.length}
      </div>
    </div>
  )
}