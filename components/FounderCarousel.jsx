// components/FounderCarousel.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaUser, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

const FounderCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // संस्थापक डेटा - आप वास्तविक डेटा से प्रतिस्थापित कर सकते हैं
  const founders = [
    {
      id: 1,
      name: "कालिम शेख",
      role: "संस्थापक एवं अध्यक्ष",
      description: "",
      contact: "+91 99900 44002",
      image: "./cards/ca1.jpg",
    },
    {
      id: 2,
      name: "मो. एजाज (बा साहब)",
      role: "उपाध्यक्ष",
      description: "",
      contact: "+91 90983 32168",
      image: "./cards/ca2.jpg",
    },
    {
      id: 3,
      name: "अब्दुल रहमान सिद्दीकी",
      role: "उप कोषाध्यक्ष",
      description: "",
      contact: "+91 94259 39500",
      image: "./cards/ca5.jpg",
    },
    {
      id: 4,
      name: "डॉ. हसन खान",
      role: "सचिव",
      description: "",
      contact: "",
      image: "./cards/ca6.jpg",
    },
    {
      id: 5,
      name: "ज़ाहिर अब्बासी",
      role: "सचिव, इज्तिमाई सम्मेलन कमेटी",
      description: "",
      contact: "",
      image: "./cards/ca7.jpg",
    },
    {
      id: 6,
      name: "जावेद शेख",
      role: "सचिव, इज्तिमाई सम्मेलन कमेटी",
      description: "",
      contact: "",
      image: "./cards/ca8.jpg",
    },
    {
      id: 7,
      name: "नसीर भाई",
      role: "नायाब सैक्रेटरी, इज्तिमाई सम्मेलन कमेटी",
      description: "",
      contact: "",
      image: "./cards/ca9.jpg",
    },
    {
      id: 8,
      name: "मुस्तफा शेख",
      role: "खज़ांची, इज्तिमाई सम्मेलन कमेटी",
      description: "",
      contact: "",
      image: "./cards/ca16.jpg",
    },
    {
      id: 9,
      name: "डॉ. इमरान नबी",
      role: "सह सचिव",
      description: "",
      contact: "",
      image: "./cards/ca20.jpg",
    },
    {
      id: 10,
      name: "डॉ. वजीर खान",
      role: "सचिव, इज्तिमाई सम्मेलन कमेटी",
      description: "",
      contact: "",
      image: "./cards/ca22.jpg",
    },
    {
      id: 11,
      name: "मो. यासीन शेख",
      role: "नायाब सदर",
      description: "",
      contact: "",
      image: "./cards/ca23.jpg",
    },
    {
      id: 12,
      name: "सैय्यद दिलशाद अली",
      role: "सदर, इज्तिमाई सम्मेलन कमेटी",
      description: "",
      contact: "",
      image: "./cards/ca24.jpg",
    },
    {
      id: 13,
      name: "हनीफ मंसूरी",
      role: "पत्रकार",
      description: "",
      contact: "",
      image: "./cards/ca30.jpg",
    },
    {
      id: 14,
      name: "आरिफ हुसैन बरकती",
      role: "पत्रकार",
      description: "",
      contact: "",
      image: "./cards/ca31.jpg",
    },
  ];

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
      setIsAnimating(false);
    }, 800);
  }, [founders.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 7000); // हर 7 सेकंड में बदलें

    return () => clearInterval(timer);
  }, [isAnimating, nextSlide]);

  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  const currentFounder = founders[currentIndex];

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* शीर्षक */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <HiUserGroup className="w-16 h-16 mx-auto text-green-600 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            अहले सरज़मी खिदमत-ए-कौम वेलफेयर सोसाइटी
          </h1>
          <p className="text-green-600 text-lg md:text-xl max-w-3xl mx-auto">
            हमारे मिशन के प्रति समर्पित व्यक्तियों से मिलें
          </p>
        </motion.div>

        {/* मुख्य कैरोसेल कंटेनर */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200 max-w-6xl mx-auto">
          {/* मोबाइल लेआउट */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFounder.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.7 }}
                className="p-6"
              >
                {/* छवि कंटेनर */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative mb-6"
                >
                  <div className="w-48 h-56 pt-12 mx-auto rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-lg">
                    <img
                      src={currentFounder.image}
                      alt={currentFounder.name}
                      className="w-full h-full object-cover scale-200"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    {currentFounder.role}
                  </div>
                </motion.div>

                {/* विवरण कंटेनर */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-6"
                >
                  <div className="flex items-center mb-4">
                    <FaQuoteLeft className="text-yellow-400 mr-2" />
                    <h2 className="text-2xl font-bold text-green-800">
                      {currentFounder.name}
                    </h2>
                    <FaQuoteRight className="text-yellow-400 ml-2" />
                  </div>
                  {/* <div className="bg-green-50 p-4 rounded-xl border-l-4 border-yellow-500">
                    <p className="text-green-700 leading-relaxed">
                      {currentFounder.description}
                    </p>
                  </div> */}
                </motion.div>

                {/* संपर्क और भूमिका कंटेनर */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-linear-to-r from-green-500 to-yellow-500 rounded-2xl p-5 shadow-lg mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FaPhone className="w-6 h-6 text-white" />
                      <span className="text-white font-semibold text-lg">
                        {currentFounder.contact}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* डेस्कटॉप लेआउट */}
          <div className="hidden md:block p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFounder.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-between h-[500px]"
              >
                {/* बाईं ओर से छवि */}
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 relative"
                >
                  <div className="relative w-80 h-80 mx-auto">
                    <div className="absolute inset-0 bg-linear-to-r from-green-400 to-yellow-400 rounded-full blur-xl opacity-30"></div>
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
                      <img
                        src={currentFounder.image}
                        alt={currentFounder.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute flex flex-wrap -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                      {currentFounder.role}
                    </div>
                  </div>
                </motion.div>

                {/* दाईं ओर से विवरण */}
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex-1 pl-12"
                >
                  <div className="mb-6">
                    <div className="flex items-center mb-6">
                      <FaQuoteLeft className="w-8 h-8 text-yellow-500 mr-4" />
                      <h2 className="text-4xl font-bold text-green-900">
                        {currentFounder.name}
                      </h2>
                      <FaQuoteRight className="w-8 h-8 text-yellow-500 ml-4" />
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-2xl border-2 border-green-200 shadow-lg">
                      <p className="text-green-800 text-lg leading-relaxed">
                        {currentFounder.description}
                      </p>
                    </div>
                  </div>

                  {/* नीचे से संपर्क */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      {/* <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-full">
                          <FaUser className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm">पद</p>
                          <p className="text-white text-xl font-bold">
                            {currentFounder.role}
                          </p>
                        </div>
                      </div> */}
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-full">
                          <FaPhone className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm">संपर्क</p>
                          <p className="text-white text-xl font-bold">
                            {currentFounder.contact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* नेविगेशन डॉट्स */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {founders.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-600 w-4 scale-110"
                    : "bg-green-300 hover:bg-green-400"
                }`}
                aria-label={`स्लाइड ${index + 1} पर जाएं`}
              />
            ))}
          </div>

          {/* टाइमर प्रोग्रेस बार */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-100 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 7, ease: "linear" }}
              className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
            />
          </div>
        </div>

        {/* फुटर सूचना */}
     {/*    <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-green-700 text-sm md:text-base">
            प्रत्येक सदस्य 7 वर्ष की अवधि के लिए सेवा देता है • स्वतः हर 7 सेकंड में घूमता है
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-green-600 text-sm">वर्तमान</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-300"></div>
              <span className="text-green-600 text-sm">अन्य सदस्य</span>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* फ़ेड आउट एनिमेशन ओवरले */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 0.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 blur-3xl opacity-30"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FounderCarousel;