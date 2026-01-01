"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)

  // Sample gallery images
  const galleryImages = [
    { id: 1, title: "Community Gathering", category: "events" },
    { id: 2, title: "Charity Drive", category: "activities" },
    { id: 3, title: "Educational Workshop", category: "programs" },
    { id: 4, title: "Cultural Festival", category: "events" },
    { id: 5, title: "Youth Meeting", category: "activities" },
    { id: 6, title: "Award Ceremony", category: "programs" },
    { id: 7, title: "Community Service", category: "activities" },
    { id: 8, title: "Independence Day Celebration", category: "events" },
    { id: 9, title: "Training Session", category: "programs" },
  ]

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-lg text-primary-foreground/90">Capturing moments of community and service</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 aspect-square cursor-pointer hover:shadow-lg transition"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition">
                    📷
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <div className="text-primary-foreground">
                      <p className="font-semibold">{image.title}</p>
                      <p className="text-sm text-primary-foreground/80">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-3xl w-full bg-card rounded-lg overflow-hidden animate-fade-in-up">
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 aspect-video flex items-center justify-center text-8xl">
              📷
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-2">{selectedImage.title}</h2>
              <p className="text-muted-foreground mb-4">Category: {selectedImage.category}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
