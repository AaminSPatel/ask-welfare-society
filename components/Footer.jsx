"use client"

import Link from "next/link"
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa"

export default function Footer() {
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
                style={{ backgroundColor: "#d6b46c00" }}
                className="w-12 h-12 flex items-center justify-center font-bold text-[#0f3d2e]"
              >
               <img src="/logo.png" alt="Ahle Sarzami Khidmat-E-Kaum Welfare Society Logo" 
              className="rounded-xl"
              />
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