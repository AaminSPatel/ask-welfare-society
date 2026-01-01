"use client"

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaUser, FaQuoteLeft, FaQuoteRight, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter, FaCalendarAlt, FaHeart, FaUsers, FaHandsHelping } from "react-icons/fa";
import { HiUserGroup, HiAcademicCap, HiLightBulb } from "react-icons/hi";
import { GiJusticeStar, GiLinkedRings   } from "react-icons/gi";
import { MdCelebration } from "react-icons/md";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FounderCarousel from "../components/FounderCarousel";

export default function Home() {
  const [founders, setFounders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFounders = async () => {
      try {
        const response = await fetch("/api/committee-members?role=founder")
        const data = await response.json()
        if (data.members) {
          setFounders(data.members)
        }
      } catch (error) {
        console.error("Error loading founders:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFounders()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 max-w-screen overflow-hidden">
      <Navigation />
      <HeroCarousel founders={founders} />
      <FounderCarousel founders={founders} />
      <IntroductionSection />
      <VisionMissionSection />
      <HighlightsSection />
      <CTASection />
      <Footer />
    </div>
  )
}



function HeroCarousel({ founders = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const defaultFounders = [
    {
      name: "कालिम शेख",
      designation: "संस्थापक और अध्यक्ष",
      description: "इस समाज की शुरुआत 5 साल पहले 2019 में की थी। उनके नेतृत्व में, समाज ने सिर्फ 2024 में ही 17 जोड़ों की शादी करवाई है और हर राष्ट्रीय त्योहार पर देशभक्ति परीक्षा आयोजित करता है।",
      image: "/w7.jpeg",
      photo: "/cards/ca1.jpg",
    },
    {
      name: "मोहम्मद एजाज (बा साहब)",
      designation: "उपाध्यक्ष",
      description: "बहुत दयालु इंसान हैं जो गरीब लड़कियों की शादी करवाने में मदद करते हैं। समाज का मुख्य काम है सामूहिक शादी समारोह आयोजित करना जहाँ हर साल कई शादियाँ एक साथ होती हैं।",
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
    setTimeout(() => setAutoplay(true), 8000)
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 8000)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 8000)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-emerald-900 via-green-800 to-emerald-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl min-h-28 flex items-center flex-col justify-center  font-bold text-white mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r  p-1 from-amber-300 to-yellow-300">
              अहले सरज़मी खिदमत-ए-कौम
            </span>
            <br />
            <span className="text-2xl md:text-4xl text-emerald-200">वेलफेयर सोसाइटी</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mt-6">
            "समाज की सेवा, शादी समारोह, और देशभक्ति शिक्षा के माध्यम से"
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {/* Image Section */}
                <div className="relative">
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img
                      src={slides[activeIndex].image || slides[activeIndex].photo}
                      alt={slides[activeIndex].name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {slides[activeIndex].designation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center text-white">
                  <div className="mb-6">
                    <FaQuoteLeft className="text-amber-300 text-2xl mb-2" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {slides[activeIndex].name}
                    </h2>
                    <p className="text-emerald-100 text-lg leading-relaxed">
                      {slides[activeIndex].description}
                    </p>
                    <FaQuoteRight className="text-amber-300 text-2xl mt-4 ml-auto" />
                  </div>

                  <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <GiLinkedRings   className="text-amber-300 text-2xl" />
                      <p className="text-emerald-50">
                        <span className="font-semibold text-amber-300">खास काम:</span> हर साल सामूहिक शादी समारोह आयोजित करते हैं
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-[38%] -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
            aria-label="पिछली स्लाइड"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-[38%] -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
            aria-label="अगली स्लाइड"
          >
            ›
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 w-8' 
                    : 'bg-white/40 hover:bg-white/60 w-3'
                }`}
                aria-label={`स्लाइड ${index + 1} पर जाएं`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            {activeIndex + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-950/50 to-transparent"></div>
    </div>
  )
}

function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GiJusticeStar className="w-20 h-20 mx-auto text-amber-400 mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            हमारी देशभक्ति परीक्षा दें
          </h2>
          <p className="text-lg mb-10 text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            हर साल राष्ट्रीय त्योहारों पर, हम 100 सवालों की एक देशभक्ति परीक्षा आयोजित करते हैं जिसमें स्वतंत्रता सेनानियों और भारतीय इतिहास के बारे में पूछा जाता है।
            हमारे साथ जुड़ें, अपना ज्ञान परखें, और हमारे समाज में देशभक्ति बढ़ाएं।
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/exam"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-12 py-4 rounded-full font-semibold hover:shadow-2xl transition-all text-lg shadow-lg"
            >
              परीक्षा शुरू करें
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}



function IntroductionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Decorative Element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-600"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <GiLinkedRings  className="w-24 h-24 mb-6 text-amber-300" />
                <h3 className="text-3xl font-bold mb-4">2024 में 17 जोड़ों की शादी</h3>
                <p className="text-center text-emerald-100">
                  हर साल सामूहिक शादी समारोह
                  <br />
                  गरीब लड़कियों की मदद
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full font-semibold mb-4">
                हमारा परिचय
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
                अहले सरज़मी सोसाइटी के बारे में
              </h2>
              <p className="text-lg text-emerald-800 leading-relaxed">
                <span className="font-semibold text-emerald-700">कलिम शेख</span> ने 2019 में इस सोसाइटी की शुरुआत की थी। अब तक 5 साल हो गए हैं। हमारा मुख्य काम है सामूहिक शादी समारोह आयोजित करना जहाँ गरीब लड़कियों की शादी होती है।
                <br /><br />
                2024 में हमने 17 जोड़ों की शादी करवाई है। हर साल हम एक बड़ा समारोह करते हैं जहाँ कई शादियाँ एक साथ होती हैं।
              </p>
            </div>

            <div className="space-y-6">
              <FeatureItem
                icon={<GiLinkedRings   className="text-2xl" />}
                title="सामूहिक शादी समारोह"
                description="हर साल बड़े समारोह में कई शादियाँ एक साथ। गरीब लड़कियों की मदद।"
              />
              <FeatureItem
                icon={<GiJusticeStar className="text-2xl" />}
                title="देशभक्ति परीक्षा"
                description="हर राष्ट्रीय त्योहार पर 100 सवालों की परीक्षा। स्वतंत्रता सेनानियों के बारे में जानकारी।"
              />
              <FeatureItem
                icon={<FaHandsHelping className="text-2xl" />}
                title="समुदाय मदद"
                description="जरूरतमंद परिवारों की मदद। समाज कल्याण के काम।"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex gap-4 group cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-emerald-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
          {title}
        </h4>
        <p className="text-emerald-700">{description}</p>
      </div>
    </div>
  )
}

function HighlightsSection() {
  const highlights = [
    {
      title: "सामूहिक शादी समारोह",
      description: "हर साल का मुख्य कार्यक्रम। 2024 में 17 जोड़ों की शादी। गरीब लड़कियों की मदद।",
      icon: <GiLinkedRings  className="text-5xl" />,
      date: "हर साल",
      stat: "17 शादियाँ (2024)"
    },
    {
      title: "देशभक्ति परीक्षा",
      description: "हर राष्ट्रीय त्योहार पर। 100 सवाल, 100 जवाब। स्वतंत्रता सेनानियों के बारे में।",
      icon: <GiJusticeStar className="text-5xl" />,
      date: "हर त्योहार",
      stat: "100 सवाल"
    },
    {
      title: "समुदाय मदद",
      description: "जरूरतमंद परिवारों की मदद। बीमारों की देखभाल। गरीब बच्चों की पढ़ाई।",
      icon: <FaHandsHelping className="text-5xl" />,
      date: "निरंतर",
      stat: "सभी की मदद"
    },
    {
      title: "सामाजिक कार्यक्रम",
      description: "त्योहार मनाना। सामुदायिक भोज। शिक्षा कार्यक्रम। स्वास्थ्य जांच।",
      icon: <MdCelebration className="text-5xl" />,
      date: "मासिक",
      stat: "सक्रिय"
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full font-semibold mb-4">
            हमारे कार्यक्रम
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
            मुख्य गतिविधियाँ
          </h2>
          <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
            वो काम जो हमारे समाज को मजबूत बनाते हैं
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 h-full">
                <div className="mb-6 transform group-hover:scale-125 transition-transform duration-300 text-emerald-600">
                  {item.icon}
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">{item.title}</h3>
                </div>
                <p className="text-emerald-700 text-sm mb-6 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-emerald-600">{item.date}</span>
                    <p className="text-xs text-emerald-500 mt-1">{item.stat}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-8 transition-all duration-300"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisionMissionSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            हमारा लक्ष्य और काम
          </h2>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            समाज की सेवा, गरीबों की मदद, देशभक्ति बढ़ाना
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 hover:border-white/40 transition-all"
          >
            <div className="inline-block p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-8">
              <HiLightBulb className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">हमारा लक्ष्य</h3>
            <p className="text-emerald-100 leading-relaxed text-lg">
              एक ऐसा समाज बनाना जहाँ हर गरीब लड़की की शादी हो सके।
              <br /><br />
              हर कोई देश के बारे में जाने और देशभक्त बने।
              <br /><br />
              सभी लोग एक साथ मिलकर रहें और एक दूसरे की मदद करें।
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 hover:border-white/40 transition-all"
          >
            <div className="inline-block p-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl mb-8">
              <FaHeart className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">हमारा काम</h3>
            <p className="text-emerald-100 leading-relaxed text-lg">
              हर साल सामूहिक शादी समारोह आयोजित करना।
              <br /><br />
              हर राष्ट्रीय त्योहार पर देशभक्ति परीक्षा करवाना।
              <br /><br />
              जरूरतमंद परिवारों की मदद करना।
              <br /><br />
              समुदाय के लोगों को एक साथ लाना।
            </p>
          </motion.div>
        </div>

        {/* Center Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-8 py-6 rounded-2xl border border-amber-500/30">
            <p className="text-2xl text-amber-300 font-semibold">
              "हमारी कोशिश है कि हर गरीब लड़की की शादी हो, हर व्यक्ति देशभक्त बने"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
