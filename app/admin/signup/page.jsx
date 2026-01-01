"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAsk } from "@/lib/askContext"

export default function AdminSignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const { adminSignup, loading } = useAsk()
  const router = useRouter()

  async function handleSignup(e) {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await adminSignup(formData.email, formData.password)
      // Redirect to login page after successful signup
      router.push("/admin/login?message=Account created successfully")
    } catch (err) {
      setError(err || "Signup failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="geometric-pattern"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">👤</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Signup</h1>
            <p className="text-muted-foreground">Create your admin account</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="admin@welfare.org"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="••••••••"
                minLength="6"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="••••••••"
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 rounded-lg font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Admin Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm mb-2">
              Already have an account?
            </p>
            <Link href="/admin/login" className="text-primary hover:text-primary/80 font-medium text-sm">
              Login to Dashboard
            </Link>
          </div>
        </div>

        <p className="text-center text-primary-foreground/70 text-sm mt-6">
          Create your admin account to access the management system
        </p>
      </div>
    </div>
  )
}
