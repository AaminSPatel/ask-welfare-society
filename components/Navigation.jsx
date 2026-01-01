"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleScroll()
    checkMobile()
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <nav className="w-full z-50 relative">
      <div className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-gradient-to-r from-emerald-900 to-green-900 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo - Responsive */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${scrolled ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-amber-400 to-yellow-400'}`}
              >
                <span className="font-bold text-white text-sm sm:text-lg">ASK</span>
              </motion.div>
              <div className="max-w-[180px] sm:max-w-none">
                <h1 className={`text-sm sm:text-lg font-bold leading-tight ${scrolled ? 'text-emerald-800' : 'text-white'}`}>
                  {isMobile ? "ASK Welfare Society" : "Ahle Sarzami Khidmat-E-Kaum Welfare Society"}
                </h1>
                <p className={`text-xs ${scrolled ? 'text-emerald-600' : 'text-amber-100'} mt-0.5`}>
                  2019 से समाज की सेवा
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <NavLink href="/" scrolled={scrolled}>
                होम
              </NavLink>
              <NavLink href="/committee" scrolled={scrolled}>
                कमेटी
              </NavLink>
              <NavLink href="/activities" scrolled={scrolled}>
                एक्टिविटीज
              </NavLink>
              <NavLink href="/events" scrolled={scrolled}>
                इवेंट्स
              </NavLink>
              <NavLink href="/gallery" scrolled={scrolled}>
                गैलरी
              </NavLink>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/exam"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 lg:px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-sm lg:text-base whitespace-nowrap"
                >
                  परीक्षा दें
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`md:hidden text-2xl p-2 -mr-2 ${scrolled ? 'text-emerald-700' : 'text-white'}`}
              aria-label="Menu"
            >
              {menuOpen ? '✕' : '☰'}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-xl">
                  <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
                    होम
                  </MobileNavLink>
                  <MobileNavLink href="/committee" onClick={() => setMenuOpen(false)}>
                    कमेटी
                  </MobileNavLink>
                  <MobileNavLink href="/activities" onClick={() => setMenuOpen(false)}>
                    एक्टिविटीज
                  </MobileNavLink>
                  <MobileNavLink href="/events" onClick={() => setMenuOpen(false)}>
                    इवेंट्स
                  </MobileNavLink>
                  <MobileNavLink href="/gallery" onClick={() => setMenuOpen(false)}>
                    गैलरी
                  </MobileNavLink>
                  <Link
                    href="/exam"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold text-center mx-2 hover:shadow-lg transition text-sm"
                  >
                    परीक्षा दें
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children, scrolled }) {
  return (
    <Link href={href} className="relative group">
      <span className={`font-medium transition-colors text-sm lg:text-base ${scrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'}`}>
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 rounded-lg mx-2 transition-all text-sm"
    >
      {children}
    </Link>
  )
}