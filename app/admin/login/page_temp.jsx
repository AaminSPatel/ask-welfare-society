"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        return
      }

      localStorage.setItem("adminToken", data.token)
      router.push("/admin")
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
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
              <span className="text-2xl">🛡️</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Portal</h1>
            <p className="text-muted-foreground">Welfare Society Management System</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="admin@welfare.org"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 rounded-lg font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm mb-2">
              Don't have an account?
            </p>
            <Link href="/admin/signup" className="text-primary hover:text-primary/80 font-medium text-sm block mb-2">
              Create Admin Account
            </Link>
            <Link href="/" className="text-primary hover:text-primary/80 font-medium text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>

        <p className="text-center text-primary-foreground/70 text-sm mt-6">
          Default Credentials: admin@welfare.org / password123
        </p>
      </div>
    </div>
  )
}
