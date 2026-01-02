"use client"

import Link from "next/link"
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa"

export default function Footer() {
   return (
      <footer className="bg-gradient-to-b from-emerald-900 to-green-950 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-amber-400 to-yellow-400 flex items-center justify-center">
                  <span className="font-bold text-emerald-900 text-xl">ASK</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ahle Sarzami Khidmat-E-Kaum Welfare Society</h3>
                  <p className="text-sm text-emerald-300">Since 2019</p>
                </div>
              </div>
              <p className="text-emerald-200 text-sm leading-relaxed">
                समाज की सेवा, शादी समारोह, और देशभक्ति शिक्षा के माध्यम से।
                5 साल से समुदाय कल्याण के काम में।
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-300">Quick Links</h3>
              <ul className="space-y-3">
                <FooterLink href="/" text="Home" />
                <FooterLink href="/committee" text="Committee" />
                <FooterLink href="/activities" text="Activities" />
                <FooterLink href="/exam" text="Exam" />
                <FooterLink href="/admin" text="Exam" />
              </ul>
            </div>
  
            {/* Programs */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-300">Programs</h3>
              <ul className="space-y-3">
                <FooterLink href="/events" text="Events & Seminars" />
                <FooterLink href="/gallery" text="Photo Gallery" />
                <FooterLink href="/activities" text="Cultural Programs" />
                <FooterLink href="/marriage" text="Marriage Ceremonies" />
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-300">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-amber-400" />
                  <span className="text-sm text-emerald-200">Office: Kisan House, 93 Shershah Suri Nagar (Samose wale chacha ki gali), Khajrana, Indore</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-amber-400" />
                  <span className="text-sm text-emerald-200">+91 99900 44002</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-amber-400" />
                  <span className="text-sm text-emerald-200">info@ahsark.org</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                <SocialIcon href="#" icon={<FaInstagram />} />
                <SocialIcon href="#" icon={<FaFacebook />} />
                <SocialIcon href="#" icon={<FaTwitter />} />
              </div>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-emerald-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-center text-sm text-emerald-400">
                © 2025 Ahle Sarzami Welfare Society. All rights reserved.
              </p>
              <p className="text-center text-xs text-emerald-500">
                Serving community since 2019
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
}

function FooterLink({ href, text }) {
  return (
    <li>
      <Link href={href} className="text-emerald-200 hover:text-amber-300 transition-colors text-sm flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-amber-400"></span>
        {text}
      </Link>
    </li>
  )
}

function SocialIcon({ href, icon }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full bg-emerald-800 hover:bg-linear-to-r hover:from-amber-500 hover:to-orange-500 flex items-center justify-center text-white hover:scale-110 transition-all"
    >
      {icon}
    </Link>
  )
}