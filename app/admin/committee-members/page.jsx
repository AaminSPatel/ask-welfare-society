"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import CommitteeMemberManager from "@/components/admin/CommitteeMemberManager"
import { useAdminAuth } from "@/lib/useAdminAuth"

export default function CommitteeMembersAdminPage() {
  const router = useRouter()
  const { authChecked, isAuthorized } = useAdminAuth()

  // Use the admin auth hook for authentication checking
  useEffect(() => {
    if (authChecked && !isAuthorized) {
      router.push('/admin/login')
    }
  }, [authChecked, isAuthorized, router])

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Will redirect
  }

  return (
    <>
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CommitteeMemberManager />
      </main>
    </>
  )
}
