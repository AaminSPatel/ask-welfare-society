"use client"

import { useState } from "react"
import Link from "next/link"
import { useAsk } from "@/lib/askContext"

export default function AdminHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAsk()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-2xl font-bold">
          Admin Panel
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/admin/exams" className="hover:text-secondary transition">
            Exams
          </Link>
          <Link href="/admin/candidates" className="hover:text-secondary transition">
            Candidates
          </Link>
          <Link href="/admin/results" className="hover:text-secondary transition">
            Results
          </Link>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-lg hover:bg-secondary transition"
            >
              {user?.email || "Admin"}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-muted text-destructive"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
