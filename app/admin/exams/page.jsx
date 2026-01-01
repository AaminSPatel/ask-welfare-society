"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import ExamManager from "@/components/admin/ExamManager"
import { useAsk } from "@/lib/askContext"
import { useAdminAuth } from "@/lib/useAdminAuth"

export default function AdminExamsPage() {
  const router = useRouter()
  const { authChecked, isAuthorized } = useAdminAuth()
  const [dataFetched, setDataFetched] = useState(false)

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  // Show loading while checking authorization
  if (authChecked && !isAuthorized) {
    // This will trigger redirect in useAdminAuth hook
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <>
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ExamManager />
      </main>
    </>
  )
}
