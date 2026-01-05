"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhone,
  FaUser,
  FaQuoteLeft,
  FaQuoteRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaCalendarAlt,
  FaHeart,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";
import { HiUserGroup, HiAcademicCap, HiLightBulb } from "react-icons/hi";
import { GiJusticeStar, GiLinkedRings } from "react-icons/gi";
import { MdCelebration } from "react-icons/md";
import Link from "next/link";
import NavigationL from "../components/Navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Footer from "../components/Footer";

function CenterLine() {
  return (
    <div className="relative -translate-y-7 h-0 z-30">
      <div className="relative z-10 h-14 flex items-center justify-center">
        {/* Wrapper div for drop-shadow filter */}
        <div className="h-[1px] w-56 bg-gradient-to-r from-transparent to-[#d6b46c]"></div>
        <div
          className="relative z-20"
          style={{
            filter:
              "drop-shadow(0 0 10px rgba(125, 15, 5, 0.8)) drop-shadow(5px 5px 10px rgba(45, 155, 0, 0.6))",
          }}
        >
          <img
            src="/nn/a25.png"
            alt=""
            className="h-14 w-32 rotate-180 opacity-80 z-10"
          />
        </div>


           <div className="h-[1px] w-56 bg-gradient-to-l from-transparent to-[#d6b46c]"></div>
       
       {/*  <span className="bg-amber-500 h-0.5 w-full  opacity-50 absolute z-0"></span>
       */}</div>
    </div>
  );
}
function SectionHeading({ title }) {
  return (
    <div className="text-center relative mb-10 px-4">
      <div className="flex flex-col items-center justify-center">
        {/* Top Ornament */}
        <img src="/nn/a10.png" className="h-10 w-auto mb-2 opacity-80" alt="" />
        
        <div className="relative inline-block">
           <h2 className="text-3xl md:text-5xl font-serif text-[#f5e9c6] drop-shadow-lg z-10 relative px-6 py-2 border-y border-[#d6b46c]/30">
            {title}
          </h2>
          {/* Background shape for text - optional */}
          <div className="absolute inset-0 bg-[#098a5f]/40 blur-md -z-10"></div>
        </div>

        {/* Bottom Ornament */}
        <img src="/nn/a11.png" className="h-8 w-48 mt-2 opacity-70 rotate-180" alt="" />
      </div>
    </div>
  );
}


export default function Home() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFounders = async () => {
      try {
        const response = await fetch("/api/committee-members?role=founder");
        const data = await response.json();
        if (data.members) {
          setFounders(data.members);
        }
      } catch (error) {
        console.error("Error loading founders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFounders();
  }, []);

  return (
    <div
      className="bg-[#01482c] text-[#f5e9c6] overflow-hidden"
      style={{
         background: `linear-gradient(rgba( 9,23, 3, 0.6), rgba(9,3,  5, 0.6)), url('/nn/d2.jpeg')`,
        backgroundSize: "100%",
        backgroundPositionY: "fixed",
        backgroundPosition: "center",
      }}
    >
      <NavigationL />

      
      <CommitteeHero />
      <CenterLine />

      <InfoCardsSection />
      <CenterLine />
      <ExamCTA />
      <CenterLine />
      <GallerySection />
      <CenterLine />

      <Footer />
    </div>
  );
}


function CommitteeHero() {
  return (
    <section className="relative py-20 px-4 bg-[#0a1a145e] overflow-hidden">
      {/* --- Decorative Background Elements --- */}
      {/* Top Left Decoration */}
      <div className="absolute top-0 left-0 opacity-40 pointer-events-none">
        <img src="/nn/c4.png" alt="" className="h-64 w-auto -translate-x-10 -translate-y-10" />
      </div>
      
      {/* Top Right Decoration */}
      <div className="absolute top-0 right-0 opacity-40 pointer-events-none scale-x-[-1]">
        <img src="/nn/c4.png" alt="" className="h-64 w-auto -translate-x-10 -translate-y-10" />
      </div>

      <div className="relative z-10">
        <SectionHeading title="Our Committee" />
        <p className="text-[#d6b46c] text-center max-w-2xl mx-auto mb-12 opacity-80 uppercase tracking-widest text-sm">
          Leading with Vision & Integrity
        </p>
        <CommitteeCarousel />
      </div>
    </section>
  );
}

function CommitteeCarousel() {
     const founders = [
    {
      id: 1,
      name: "कलिम शेख",
      role: "संस्थापक और अध्यक्ष",
      description: "इस समाज की शुरुआत 5 साल पहले की थी। हर साल सामूहिक शादी समारोह आयोजित करते हैं। 2024 में, 17 जोड़ों की शादी करवाने में मदद की। राष्ट्रीय त्योहारों पर देशभक्ति परीक्षा करवाते हैं।",
      contact: "+91 99900 44002",
      image: "./w7.jpeg",
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
      name: "ज़हिर अब्बासी",
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


  return (
    <div className="max-w-6xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="rounded-3xl shadow-2xl overflow-visible"
      >
        {founders.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="relative bg-gradient-to-br from-[#123d2e] to-[#0a241a] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center min-h-[500px]">
              
              {/* Image Section with Frame Effect */}
              <div className="w-full md:w-5/12 p-6 md:p-12 relative z-10">
                <div className="relative group">
                  {/* Decorative Frame Background */}
                  <div className="absolute -inset-4 border border-[#d6b46c]/30 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                  
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#d6b46c]/50 shadow-2xl">
                    <img 
                      src={member.image} 
                      className="w-full h-full object-cover z-10 relative" 
                      alt={member.name}
                      style={{
                         background: `linear-gradient(to right,rgba( 9,23, 3, 0) , rgba( 10,34, 26, 1) ), url('/nn/tiranga.jpeg')`,
                        
                        backgroundSize: 'cover',
                        backgroundBlendMode: 'scree',
                        backgroundPositionX:'center'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a241a] via-transparent to-transparent opacity-60"></div>
                  </div>
                </div>
              </div>

              {/* Text Content Section */}
              <div className="w-full z-10 md:w-7/12 p-4 md:p-16 text-center md:text-left space-y-6">
                <div className="space-y-2">
                  <span className="inline-block px-4 py-1 bg-[#d6b46c]/10 border border-[#d6b46c]/30 text-[#d6b46c] text-[10px] font-bold uppercase tracking-[0.2em] rounded-md">
                    Leadership Council
                  </span>
                  <h3 className="text-2xl p-1 md:text-6xl font-serif text-white leading-tight line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-[#d6b46c] text-md font-medium italic line-clamp-1">
                    {member.role}
                  </p>
                </div>

                <div className="w-16 h-[2px] bg-[#d6b46c] mx-auto md:mx-0"></div>

                <p className="text-gray-300 min-h-22 line-clamp-3 text-lg leading-relaxed font-light italic italic max-w-lg">
                  "{member.description}"
                </p>

                <div className="pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#d6b46c] hover:bg-[#c4a259] text-[#0a241a] px-10 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(214,180,108,0.2)] flex items-center gap-3 mx-auto md:mx-0 transition-all"
                  >
                    View Full Profile
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Subtle Corner Decoration inside slide */}
              <img src="/nn/bg2.png" className="absolute z-0 -bottom-10 -right-10 rotate-y-180 h-64 opacity-20 pointer-events-none" alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 20px !important; font-weight: bold; }
        .swiper-button-next, .swiper-button-prev {
          background: rgba(214, 180, 108, 0.1);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          color: #d6b46c !important;
          border: 1px solid rgba(214, 180, 108, 0.3);
          backdrop-filter: blur(4px);
        }
        .swiper-pagination-bullet { background: #d6b46c !important; opacity: 0.3; }
        .swiper-pagination-bullet-active { opacity: 1 !important; width: 24px !important; border-radius: 5px !important; }
      `}</style>
    </div>
  );
}


function InfoCardsSection() {
  return (
    <div className="relative bg-[#f5e9c6] ">
      <img
        src="/nn/c4.png"
        alt="Lights decoration"
        className="absolute top-0 right-0 z-0 h-64  rotate-y-180 opacity-80"
      />
      <img
        src="/nn/c4.png"
        alt="Lights decoration"
        className="absolute top-0 left-0 z-0 h-64 opacity-80"
      />
      <section className="py-20 text-[#0f3d2e]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <InfoCard
            title="About Our Society"
            desc="Working for welfare and unity of our community."
          />

          <InfoCard
            title="Our Mission & Vision"
            desc="Promoting education, national values and social harmony."
          />

          <InfoCard
            title="Recent Events"
            desc="See all community programs and celebrations."
            btn="View Events"
          />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, desc, btn, imageSrc }) {
  return (
    <div className="relative group overflow-hidden rounded-xl border border-[#d6b46c]/40 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
       {/* Background Image with Overlay */}
        <img
        src="/nn/c10.png"
        alt="Lights decoration"
        className="absolute top-0 right-4 z-10 h-24   rotate-y-180 opacity-70"
      />  
      <img
        src="/nn/c9.png"
        alt="Lights decoration"
        className="absolute top-0 left-4 z-10 h-24   rotate-y-180 opacity-70"
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      />
       <div className="absolute inset-0 z-0">
          <img src={imageSrc || "/nn/b12.png"} className="w-full h-full object-cover opacity-20" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#01482c]"></div>
       </div>

       <div className="relative z-10 p-6 flex flex-col items-center text-center">
          <h3 className="text-xl font-serif text-[#f5e9c6] mb-3">{title}</h3>
          <p className="text-sm text-[#f5e9c6]/70 leading-relaxed mb-5">{desc}</p>
          {btn && (
            <button className="px-6 py-2 bg-[#d6b46c] text-[#01482c] text-sm font-bold rounded-full shadow-lg transform active:scale-95 transition-all">
              {btn}
            </button>
          )}
       </div>
    </div>
  );
}
function ExamCTA() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background with Dark Green Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/nn/b18.jpeg" 
          className="w-full h-full object-cover opacity-30 scale-110" 
          alt="background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#01482c] via-[#01482c]/80 to-[#01482c]"></div>
      </div>

      {/* Decorative Side Ornaments (AI Style) */}
      <img src="/nn/c4.png" className="absolute top-0 -left-10  h-64 opacity-20 pointer-events-none" alt="" 
       style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}/>
      <img src="/nn/c4.png" className="absolute  top-0 -right-10 h-64 opacity-20 rotate-y-180  pointer-events-none" alt="" 
       style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      />
<div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-[#f5e9c6]/10 backdrop-blur-md border border-[#d6b46c]/30 p-8 rounded-3xl text-center shadow-2xl">
          <img src="/nn/a10.png" className="h-12 mx-auto mb-4 opacity-80" alt="" />
          
          <h2 className="text-3xl md:text-4xl font-serif text-[#f5e9c6] mb-4">
            Participate in Our Special <br/>
            <span className="text-[#d6b46c] italic">Online Exam!</span>
          </h2>
          
          <p className="text-[#f5e9c6]/80 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Test your knowledge on India's Freedom Fighters and win exciting prizes.
          </p>

         
           {/* 3D Golden Button */}
        <Link href="/exam">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-gradient-to-r from-[#d6b46c] via-[#f5e9c6] to-[#b8954b] text-[#01482c] px-6 py-3 rounded-xl font-black text-xl uppercase tracking-widest shadow-[0_15px_30px_-5px_rgba(214,180,108,0.4)] border-b-8 border-[#8e7235] transition-all"
          >
            Start Exam Now
          </motion.button>
        </Link>
        
        {/* Subtle Bottom Decoration */}
        <div className="mt-10 flex justify-center items-center gap-4">
           <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#d6b46c]"></div>
           <div className="w-2 h-2 rotate-45 bg-[#d6b46c]"></div>
           <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#d6b46c]"></div>
        </div>
        </div>
        </div>
       
    </section>
  );
}



function GallerySection() {
  const categories = ["All", "Independence Day", "Republic Day", "Other"];
 const gallery = [
  {
    image:'/w2.jpeg',
    title:'Sadi karwai',
    date:'2024'
  },
  {
    image:'/w6.jpeg',
    title:'Sadi karwai',
    date:'2024'
  },
  {
    image:'/w10.jpeg',
    title:'Sadi karwai',
    date:'2024'
  },
  
 ]
  return (
    <section className="py-16 bg-[#0a1a145e]  px-4 relative ">
      <img
        src="/nn/c3.png"
        alt="Lights decoration"
        className="absolute top-0 -left-4 z-0 h-64   rotate-y-180 opacity-60"
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      /> 
      <img
        src="/nn/c3.png"
        alt="Lights decoration"
        className="absolute top-0 -right-4 z-0 h-44 opacity-60 h-64 "
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      />
      <SectionHeading title="Pho Gallery" />

      {/* Category Tabs - Scrollable on Mobile */}
      <div className="flex overflow-x-auto gap-3 mb-10 pb-4 no-scrollbar justify-start md:justify-center px-4">
        {categories.map((tab) => (
          <button
            key={tab}
            className="whitespace-nowrap px-6 py-2 rounded-full border border-[#d6b46c]/30 bg-[#1b5e46] text-[#f5e9c6] text-sm font-medium hover:bg-[#d6b46c] hover:text-[#01482c] transition-all shadow-md"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gallery.map((item) => (
          <GalleryCard key={item.name} item={item}/>
        ))}
      </div>
      
      <div className="text-center mt-12">
         <button className="text-[#d6b46c] border-b border-[#d6b46c] pb-1 hover:text-[#f5e9c6] transition-all">
            View All Photos →
         </button>
      </div>
    </section>
  );
}

function GalleryCard({item}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-[#f5e9c6] p-2 rounded-2xl shadow-xl border border-[#d6b46c]/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img 
          src={item.image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          alt="Event"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#01482c]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <span className="text-white bg-black/50 p-2 rounded-full px-4 text-xs">View Full Image</span>
        </div>
      </div>
      
      <div className="p-4 text-center">
        <h4 className="text-[#0f3d2e] font-serif font-bold">Independence Day</h4>
        <p className="text-[#0f3d2e]/60 text-xs mt-1 italic">Organized on 15th August 2024</p>
      </div>
    </motion.div>
  );
}
