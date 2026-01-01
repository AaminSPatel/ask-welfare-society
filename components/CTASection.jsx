"use client"

import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 geometric-pattern"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">हमारी देशभक्ति परीक्षा दें</h2>
        <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
          भारत के स्वतंत्रता संग्राम और मुस्लिम स्वतंत्रता सेनानियों के असाधारण योगदान के बारे में अपना ज्ञान परखें। राष्ट्रीय गौरव और एकता का जश्न मनाने के लिए हमारे समुदाय में शामिल हों।
        </p>

        <Link
          href="/exam"
          className="inline-block bg-secondary text-primary px-10 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition text-lg"
        >
          परीक्षा शुरू करें
        </Link>
      </div>
    </section>
  )
}