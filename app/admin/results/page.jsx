"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import ResultsManager from "@/components/admin/ResultsManager"
import { useAsk } from "@/lib/askContext"

export default function AdminResultsPage() {
  const router = useRouter()
  const { user, isInitialized, loading } = useAsk()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (!isInitialized) return; // wait till context is initialized

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/admin/login");
      return;
    }
    setAuthChecked(true)
  }, [user, isInitialized, router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ResultsManager />
      </main>
    </>
  )
}
