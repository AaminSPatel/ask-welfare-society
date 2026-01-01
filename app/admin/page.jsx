"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import { useAsk } from "@/lib/askContext"
import { useAdminAuth } from "@/lib/useAdminAuth"

export default function AdminDashboard() {
  const router = useRouter()
  const { exams, candidates, results, fetchExams, fetchCandidates, fetchResults } = useAsk()
  const [statsLoaded, setStatsLoaded] = useState(false)

  const fetchStats = useCallback(async () => {
    try {
      await Promise.all([
        fetchExams(),
        fetchCandidates(),
        fetchResults(),
      ])
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setStatsLoaded(true)
    }
  }, [fetchExams, fetchCandidates, fetchResults])

  // Use the admin auth hook for authentication checking
  const { authChecked, isAuthorized } = useAdminAuth()

  // Fetch stats when authentication is confirmed
  useEffect(() => {
    if (authChecked && isAuthorized && !statsLoaded) {
      fetchStats()
    }
  }, [authChecked, isAuthorized, statsLoaded, fetchStats])

  const stats = {
    totalExams: exams?.length || 0,
    totalCandidates: candidates?.length || 0,
    totalResults: results?.length || 0,
  }

  if (!authChecked || !statsLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {!authChecked ? "Verifying authentication..." : "Loading dashboard data..."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Exams</p>
                <p className="text-3xl font-bold text-primary">{stats.totalExams}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Candidates</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalCandidates}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Results Published</p>
                <p className="text-3xl font-bold text-primary">{stats.totalResults}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/exams"
              className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition text-center"
            >
              Manage Exams
            </a>
            <a
              href="/admin/candidates"
              className="bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition text-center"
            >
              View Candidates
            </a>
            <a
              href="/admin/results"
              className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition text-center"
            >
              Manage Results
            </a>
            <a
              href="/admin/signup"
              className="bg-muted text-muted-foreground px-4 py-3 rounded-lg font-semibold hover:bg-muted/80 transition text-center"
            >
              Add Admin
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
