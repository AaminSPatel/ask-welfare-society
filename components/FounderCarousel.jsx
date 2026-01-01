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
      name: "कलिम शेख",
      role: "संस्थापक और अध्यक्ष",
      description: "इस समाज की शुरुआत 5 साल पहले की थी। हर साल सामूहिक शादी समारोह आयोजित करते हैं। 2024 में, 17 जोड़ों की शादी करवाने में मदद की। राष्ट्रीय त्योहारों पर देशभक्ति परीक्षा करवाते हैं।",
      contact: "+91 99900 44002",
      image: "./cards/ca1.jpg",
    },
    {
      id: 2,
      name: "मोहम्मद एजाज (बा साहब)",
      role: "उपाध्यक्ष",
      description: "बहुत दयालु इंसान हैं जो गरीब लड़कियों की शादी करवाने में मदद करते हैं। मुख्य काम है शादी कमेटी का आयोजन जो हर साल के सामूहिक समारोह में कई शादियाँ करवाती है।",
      contact: "+91 90983 32168",
      image: "./cards/ca2.jpg",
    },
    {
      id: 3,
      name: "अब्दुल रहमान सिद्दीकी",
      role: "उप कोषाध्यक्ष",
      description: "समाज के पैसे का प्रबंधन करते हैं। शादी समारोह और समुदाय के कार्यक्रम आयोजित करने में मदद करते हैं।",
      contact: "+91 94259 39500",
      image: "./cards/ca5.jpg",
    },
    {
      id: 4,
      name: "डॉ. हसन खान",
      role: "सचिव",
      description: "समाज के रिकॉर्ड और मीटिंग्स का प्रबंधन करते हैं। शैक्षिक कार्यक्रमों और परीक्षाओं में मदद करते हैं।",
      contact: "+91 98765 43210",
      image: "./cards/ca6.jpg",
    },
    {
      id: 5,
      name: "ज़ाहिर अब्बासी",
      role: "सचिव, सामूहिक समारोह कमेटी",
      description: "सामूहिक शादी समारोह आयोजित करते हैं। शादियों के लिए परिवारों के साथ समन्वय करते हैं।",
      contact: "+91 87654 32109",
      image: "./cards/ca7.jpg",
    },
    {
      id: 6,
      name: "जावेद शेख",
      role: "सचिव, सामूहिक समारोह कमेटी",
      description: "शादी समारोहों में मदद करते हैं। समुदाय के कार्यक्रमों में युवाओं के साथ काम करते हैं।",
      contact: "+91 76543 21098",
      image: "./cards/ca8.jpg",
    },
    {
      id: 7,
      name: "नसीर भाई",
      role: "उप सचिव, सामूहिक समारोह कमेटी",
      description: "शादी समारोह आयोजित करने में मदद करते हैं। जरूरतमंद परिवारों की मदद करते हैं।",
      contact: "+91 65432 10987",
      image: "./cards/ca9.jpg",
    },
    {
      id: 8,
      name: "मुस्तफा शेख",
      role: "कोषाध्यक्ष, सामूहिक समारोह कमेटी",
      description: "शादी समारोहों के लिए पैसे का प्रबंधन करते हैं। वित्तीय कामकाज सुचारू रखते हैं।",
      contact: "+91 54321 09876",
      image: "./cards/ca16.jpg",
    },
    {
      id: 9,
      name: "डॉ. इमरान नबी",
      role: "सह सचिव",
      description: "डॉक्टर हैं जो समुदाय के स्वास्थ्य कार्यक्रमों में मदद करते हैं। समाज की गतिविधियों में सहायता करते हैं।",
      contact: "+91 43210 98765",
      image: "./cards/ca20.jpg",
    },
    {
      id: 10,
      name: "डॉ. वजीर खान",
      role: "सचिव, सामूहिक समारोह कमेटी",
      description: "शिक्षा विशेषज्ञ हैं। देशभक्ति परीक्षा की तैयारी और समुदाय शिक्षा में मदद करते हैं।",
      contact: "+91 32109 87654",
      image: "./cards/ca22.jpg",
    },
    {
      id: 11,
      name: "मोहम्मद यासीन शेख",
      role: "उप अध्यक्ष",
      description: "सभी गतिविधियों में अध्यक्ष की मदद करते हैं। शादी समारोह और समुदाय कार्य में मदद करते हैं।",
      contact: "+91 21098 76543",
      image: "./cards/ca23.jpg",
    },
    {
      id: 12,
      name: "सैय्यद दिलशाद अली",
      role: "अध्यक्ष, सामूहिक समारोह कमेटी",
      description: "सामूहिक शादी समारोह का नेतृत्व करते हैं। सभी जोड़ों के लिए समारोह सुचारू रूप से चलाते हैं।",
      contact: "+91 10987 65432",
      image: "./cards/ca24.jpg",
    },
    {
      id: 13,
      name: "हनीफ मंसूरी",
      role: "पत्रकार",
      description: "समाज की गतिविधियों को दस्तावेज़ करते हैं। समुदाय कार्य के बारे में जागरूकता फैलाते हैं।",
      contact: "+91 09876 54321",
      image: "./cards/ca30.jpg",
    },
    {
      id: 14,
      name: "आरिफ हुसैन बरकती",
      role: "पत्रकार",
      description: "समाज के कार्यक्रमों पर रिपोर्ट करते हैं। प्रचार और समुदाय जागरूकता में मदद करते हैं।",
      contact: "+91 98765 43210",
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
     <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* हेडर */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-block p-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl mb-6">
                <HiUserGroup className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
                अहले सरज़मी वेलफेयर सोसाइटी कमेटी
              </h1>
              <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
                हमारी समर्पित टीम से मिलें जो समुदाय कल्याण और सामूहिक शादी समारोहों के लिए काम कर रही है
              </p>
            </motion.div>
    
            {/* मुख्य कैरोसेल कंटेनर */}
            <div className="relative bg-linear-to-br from-white to-emerald-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-200 max-w-6xl mx-auto">
              {/* मोबाइल लेआउट */}
              <div className="md:hidden ">
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
                      <div className="w-48 h-56 mx-auto rounded-2xl overflow-hidden border-4 border-amber-400 shadow-xl">
                        <img
                          src={currentFounder.image}
                          alt={currentFounder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg whitespace-nowrap">
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
                        <FaQuoteLeft className="text-amber-500 mr-2" />
                        <h2 className="text-2xl font-bold text-emerald-900">
                          {currentFounder.name}
                        </h2>
                        <FaQuoteRight className="text-amber-500 ml-2" />
                      </div>
                      <div className="bg-linear-r from-emerald-50 to-green-50 p-4 rounded-xl border-l-4 border-amber-500">
                        <p className="text-emerald-800 leading-relaxed">
                          {currentFounder.description}
                        </p>
                      </div>
                    </motion.div>
    
                    {/* संपर्क जानकारी */}
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="bg-gradient-to-r mb-6 from-emerald-600 to-green-600 rounded-2xl p-5 shadow-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-3 rounded-full">
                          <FaPhone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm">संपर्क</p>
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
              <div className="hidden  md:block p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFounder.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="flex items-center justify-between h-[500px]"
                  >
                    {/* बाईं ओर - छवि */}
                    <motion.div
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex-1 relative"
                    >
                      <div className="relative w-96 h-96 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full blur-3xl opacity-20"></div>
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
                          <img
                            src={currentFounder.image}
                            alt={currentFounder.name}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-full font-bold shadow-xl">
                          {currentFounder.role}
                        </div>
                      </div>
                    </motion.div>
    
                    {/* दाईं ओर - विवरण */}
                    <motion.div
                      initial={{ x: 200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex-1 pl-12"
                    >
                      <div className="mb-8">
                        <div className="flex items-center mb-8">
                          <FaQuoteLeft className="w-10 h-10 text-amber-500 mr-4" />
                          <h2 className="text-4xl font-bold text-emerald-900">
                            {currentFounder.name}
                          </h2>
                          <FaQuoteRight className="w-10 h-10 text-amber-500 ml-4" />
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border-2 border-emerald-200 shadow-lg">
                          <p className="text-emerald-800 text-lg leading-relaxed">
                            {currentFounder.description}
                          </p>
                        </div>
                      </div>
    
                      {/* संपर्क जानकारी */}
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 shadow-2xl"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="bg-white/20 p-4 rounded-full">
                              <FaPhone className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <p className="text-white/80 text-sm">संपर्क सूत्र</p>
                              <p className="text-white text-2xl font-bold">
                                {currentFounder.contact}
                              </p>
                            </div>
                          </div>
                          <div className="text-white/60">
                            <p className="text-sm">सदस्य संख्या: {currentIndex + 1}</p>
                            <p className="text-xs">कुल सदस्य: {founders.length}</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
    
              {/* नेविगेशन डॉट्स */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {founders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-linear-to-r from-amber-500 to-orange-500 w-6"
                        : "bg-emerald-300 hover:bg-emerald-400 w-2"
                    }`}
                    aria-label={`स्लाइड ${index + 1} पर जाएं`}
                  />
                ))}
              </div>
    
              {/* टाइमर प्रोग्रेस बार */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-emerald-100 overflow-hidden">
                <motion.div
                  key={currentIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                />
              </div>
            </div>
    
            {/* संस्थापक गिनती */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <HiUserGroup className="text-emerald-600" />
                <span className="text-emerald-800 font-semibold">
                  कुल {founders.length} समर्पित सदस्य
                </span>
              </div>
            </motion.div>
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
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 blur-3xl opacity-30"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  );
};

export default FounderCarousel;