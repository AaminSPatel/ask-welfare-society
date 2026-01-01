"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import { useAsk } from "@/lib/askContext"

export default function AdminCandidatesPage() {
  const router = useRouter()
  const { candidates, fetchCandidates } = useAsk()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [viewMode, setViewMode] = useState("table")
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Use the admin auth hook for authentication checking
  const { authChecked, isAuthorized } = useAdminAuth({
    onAuthSuccess: () => {
      setLoading(true)
      fetchCandidates().finally(() => setLoading(false))
    }
  })

  const filteredCandidates = filter === "all" 
    ? candidates 
    : candidates.filter((c) => c.role === filter)

  const searchedCandidates = filteredCandidates.filter(candidate => 
    candidate.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.city?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted": return "bg-green-100 text-green-800"
      case "approved": return "bg-blue-100 text-blue-800"
      case "rejected": return "bg-red-100 text-red-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "student": return "🎓"
      case "parent": return "👨‍👩‍👧‍👦"
      case "teacher": return "👨‍🏫"
      default: return "👤"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Candidates</h1>
              <p className="text-gray-600 mt-2">Manage and review candidate profiles</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by name, email, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  🔍
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 hidden md:block">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                      viewMode === "table" 
                        ? "bg-white text-gray-900 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                      viewMode === "grid" 
                        ? "bg-white text-gray-900 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Grid
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {["all", "student", "parent", "teacher"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setFilter(role)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      filter === role 
                        ? "bg-black text-white shadow-sm" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{getRoleIcon(role)}</span>
                      <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                      {filter === "all" ? (
                        <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                          {candidates.filter(c => role === "all" ? true : c.role === role).length}
                        </span>
                      ) : (
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                          {candidates.filter(c => c.role === role).length}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Candidates Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{searchedCandidates.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{candidates.length}</span> candidates
              {searchTerm && (
                <span>
                  {" "}for "<span className="font-semibold text-gray-900">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>

          {/* Table View */}
          {viewMode === "table" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">City</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Score</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {searchedCandidates.map((candidate) => (
                      <tr 
                        key={candidate._id} 
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/admin/candidates/${candidate._id}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-gray-900">
                                {candidate.fullName?.charAt(0) || "?"}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{candidate.fullName}</div>
                              <div className="text-sm text-gray-500 md:hidden">{candidate.email}</div>
                              <div className="flex items-center gap-2 md:hidden mt-1">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                                  {candidate.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <span>{getRoleIcon(candidate.role)}</span>
                            <span className="capitalize text-gray-900">{candidate.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">{candidate.email}</td>
                        <td className="px-6 py-4 text-gray-900 hidden lg:table-cell">{candidate.city || "-"}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">
                            {candidate.score !== undefined && candidate.score !== null ? candidate.score : "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {searchedCandidates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates found</h3>
                  <p className="text-gray-600">
                    {searchTerm 
                      ? "Try a different search term" 
                      : "No candidates match the current filter"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedCandidates.map((candidate) => (
                <div 
                  key={candidate._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/admin/candidates/${candidate._id}`)}
                >
                  <div className="p-6">
                    {/* Candidate Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-900">
                            {candidate.fullName?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{candidate.fullName}</h3>
                          <p className="text-sm text-gray-500">{candidate.email}</p>
                        </div>
                      </div>
                      <div className="text-2xl">
                        {getRoleIcon(candidate.role)}
                      </div>
                    </div>

                    {/* Candidate Info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Role</span>
                        <span className="font-medium text-gray-900 capitalize">{candidate.role}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">City</span>
                        <span className="font-medium text-gray-900">{candidate.city || "-"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Score</span>
                        <span className="font-bold text-gray-900">
                          {candidate.score !== undefined && candidate.score !== null ? candidate.score : "-"}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State for Grid View */}
          {viewMode === "grid" && searchedCandidates.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {searchTerm 
                  ? "No candidates match your search. Try different keywords."
                  : "There are no candidates matching the selected filters."}
              </p>
              <button
                onClick={() => {
                  setFilter("all")
                  setSearchTerm("")
                }}
                className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Footer Info */}
          {searchedCandidates.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Click on any candidate to view detailed profile
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}