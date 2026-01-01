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
  const { loading } = useAsk()

  // Use the admin auth hook for authentication checking
  const { authChecked, isAuthorized } = useAdminAuth()

if (!authChecked) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Checking authentication...
    </div>
  );
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
