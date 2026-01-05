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

//import Footer from "../components/Footer";
//import FounderCarousel from "../components/FounderCarousel";

function BgBox({ children, position , bgImage , bgImageCenter}) {
  return (
    <div className="relative z-0 bg-[#144d3a00]  overflow-hidden">
      <div
        className="relative z-0"
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      >
        <img
          src={bgImage || '/nn/c3.png'}
          alt="Lights decoration"
          className={`absolute top-0 ${position}-0 z-0 h-64  ${
            position === "left" ? "rotate-y-180 left-0" : "rotate-y-0 right-0"
          } opacity-40`}
        />
      </div>
      <div
        className="relative z-0 flex items-center opacity-40 justify-center"
        /* style={{
    filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.7))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.5))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.3))
    `,
  }} */
      >
        <img
          src={bgImageCenter || '/nn/c18.png'}
          alt="Lights decoration"
          className={`absolute -top-4 
       hidden sm:block
      z-0 h-64 opacity-40 `}
        />
      </div>
      <div
        className="relative z-0"
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      >
        <img
          src={bgImage || '/nn/c3.png'}
          alt="Lights decoration"
          className={`absolute top-0 
      ${position === "left" ? "rotate-y-0 right-0" : "rotate-y-180 left-0"}
      z-0 h-64 opacity-50`}
        />
      </div>

      <div className="z-40">{children}</div>
    </div>
  );
}
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
    <section
      className="relative py-16 px-2"
     /*  style={{
        background: `linear-gradient(rgba( 9,23, 3, 0.6), rgba(9,3,  5, 0.6)), url('/nn/b14.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
      }} */
    >
      <div
        className="relative z-0 top-0  opacity-40"
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      >

 <img
        src="/nn/c4.png"
        alt="Lights decoration"
        className="absolute -top-16 -right-6 z-0 h-64  rotate-y-180  -mr-3"
      />
      </div>   
      <div
        className="relative z-0 top-0 opacity-40"
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      >


      <img
        src="/nn/c4.png"
        alt="Lights decoration"
        className="absolute -top-16 -left-4 z-0 h-64 -ml-4"
      />
      </div>
      
      <SectionHeading title="Our Committee" />
     
<CommitteeCarousel />
    </section>
  );
}

function CommitteeCarousel() {
  const members = [
    { name: "Kalim Sheikh", role: "President", img: "/nn/k2r.png", bio: "Dedicated leader working for unity and education." },
    { name: "Dr. Imran Khan", role: "Vice President", img: "/nn/k2rr.png", bio: "Social activist with a vision for community welfare." }
  ];

  return (
    <section className="relative py-12 px-2 max-w-5xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d6b46c]/30"
      >
        {members.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="relative bg-[#1b5e46] flex flex-col md:flex-row items-center p-4 md:p-10 gap-8 min-h-[450px]">
 <img
        src="/nn/bg2.png"
        alt="Lights decoration"
        className="absolute bottom-0 right-0 opacity-50 z-0 h-96 rotate-y-180 -mr-3"
      />
              
              {/* Image Frame (AI Style) */}
              <div className="w-full md:w-2/5 relative z-40">
                <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#d6b46c] relative z-10 shadow-lg">
                  <img src={member.img} className="w-full h-full object-cover" alt={member.name} style={{background:`url('/nn/tiranga.jpeg')`, backgroundPosition:'center'}}/>
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01482c]/60 to-transparent"></div>
                </div>
                {/* Decorative Pattern behind image */}
                <div className="absolute -inset-2 border border-[#d6b46c]/20 rounded-xl -z-0 rotate-3"></div>
              </div>

              {/* Text & Button Section */}
              <div className="flex-1 text-center md:text-left space-y-4  relative z-40">
                <div className="inline-block px-4 py-1 bg-[#d6b46c] text-[#01482c] text-xs font-bold uppercase tracking-widest rounded-full mb-2">
                   Board Member
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-[#f5e9c6]">{member.name}</h3>
                <p className="text-[#d6b46c] text-lg italic font-medium">{member.role}</p>
                
                <div className="h-1 w-20 bg-[#d6b46c]/30 mx-auto md:mx-0"></div>
                
                <p className="text-[#f5e9c6]/80 text-lg leading-relaxed max-w-md">
                  "{member.bio}"
                </p>

                {/* Action Button */}
                <div className="pt-6">
                  <Link href={`/committee/${index}`}>
                    <motion.button 
                      whileHover={{ x: 5 }}
                      className="bg-gradient-to-r from-[#d6b46c] to-[#b8954b] text-[#01482c] px-8 py-3 rounded-lg font-bold shadow-lg flex items-center gap-3 mx-auto md:mx-0"
                    >
                      View Full Profile <span className="text-xl">→</span>
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Background Ornaments inside Slide */}
              <img src="/nn/a10.png" className="absolute top-4 right-4 h-12 opacity-10" alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Arrows (Add to your CSS) */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #d6b46c !important;
          transform: scale(0.7);
        }
        .swiper-pagination-bullet-active {
          background: #d6b46c !important;
        }
      `}</style>
    </section>
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
    <section className="py-16 px-4 relative bg-[#f5e9c6]/5">
      <img
        src="/nn/c9.png"
        alt="Lights decoration"
        className="absolute top-0 left-4 z-0 h-64   rotate-y-180 opacity-60"
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      /> 
      <img
        src="/nn/c9.png"
        alt="Lights decoration"
        className="absolute top-0 right-4 z-0 h-44 opacity-60 h-64 "
        style={{
          filter: `
      drop-shadow(0 0 12px rgba(255, 200, 120, 0.9))
      drop-shadow(0 0 25px rgba(255, 170, 60, 0.6))
      drop-shadow(0 0 45px rgba(255, 140, 0, 0.4))
    `,
        }}
      />
      <SectionHeading title="Photo Gallery" />

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

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#0f3d2e" }}
      className="text-[#f5e9c6] pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* ABOUT */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div
                style={{ backgroundColor: "#d6b46c" }}
                className="w-12 h-12 flex items-center justify-center font-bold text-[#0f3d2e]"
              >
                ASK
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-tight">
                  Ahle Sarzami Khidmat-E-Kaum Welfare Society
                </h3>
                <p className="text-sm text-[#d6b46c]">Established 2019</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#e8dcc0]">
              समाज सेवा, शिक्षा, सांस्कृतिक कार्यक्रम और राष्ट्रभक्ति से जुड़े
              सामाजिक कार्यों में निरंतर सक्रिय।
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <FooterTitle title="Quick Links" />
            <ul className="space-y-3">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/committee" text="Committee" />
              <FooterLink href="/activities" text="Activities" />
              <FooterLink href="/exam" text="Online Exam" />
              <FooterLink href="/admin" text="Admin Panel" />
            </ul>
          </div>

          {/* PROGRAMS */}
          <div>
            <FooterTitle title="Our Programs" />
            <ul className="space-y-3">
              <FooterLink href="/events" text="Events & Seminars" />
              <FooterLink href="/gallery" text="Photo Gallery" />
              <FooterLink href="/activities" text="Cultural Programs" />
              <FooterLink href="/marriage" text="Marriage Ceremonies" />
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <FooterTitle title="Contact Us" />

            <ul className="space-y-4 text-sm text-[#e8dcc0]">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-[#d6b46c]" />
                <span>
                  Kisan House, 93 Shershah Suri Nagar, Khajrana, Indore
                </span>
              </li>

              <li className="flex items-center gap-3">
                <FaPhone className="text-[#d6b46c]" />
                <span>+91 99900 44002</span>
              </li>

              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#d6b46c]" />
                <span>info@ahsark.org</span>
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaFacebook />} />
              <SocialIcon icon={<FaTwitter />} />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ borderColor: "#2f6f55" }} className="border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
            <p className="text-[#cfc4a3]">
              © 2025 Ahle Sarzami Welfare Society
            </p>
            <p className="text-[#b9ad8b]">Serving the community since 2019</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function FooterTitle({ title }) {
  return <h4 className="text-lg font-semibold mb-5 text-[#d6b46c]">{title}</h4>;
}

function FooterLink({ href, text }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 text-sm text-[#e8dcc0] hover:text-[#d6b46c] transition"
      >
        <span style={{ backgroundColor: "#d6b46c" }} className="w-1.5 h-1.5" />
        {text}
      </Link>
    </li>
  );
}

function SocialIcon({ icon }) {
  return (
    <Link
      href="#"
      style={{ backgroundColor: "#1b5e46" }}
      className="w-10 h-10 flex items-center justify-center text-white hover:scale-105 transition"
    >
      {icon}
    </Link>
  );
}