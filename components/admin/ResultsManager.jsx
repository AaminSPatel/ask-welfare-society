"use client"

import { useEffect, useState } from "react"
import { useAsk } from "@/lib/askContext"

export default function ResultsManager() {
  const [activeTab, setActiveTab] = useState("student")
  const [selectedCandidates, setSelectedCandidates] = useState({
    qualified: [],
    final: [],
  })
  const [isPublishing, setIsPublishing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { results, fetchResults, publishResults, loading , user } = useAsk()

  useEffect(() => {
    if(!results.length) return
    fetchResults()
  }, [results, user])

  // Check screen size for responsive design
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function handlePublishResults() {
    setIsPublishing(true)
    try {
      const qualifiedIds = Object.values(selectedCandidates.qualified).flat()
      const finalIds = Object.values(selectedCandidates.final).flat()

      await publishResults({ qualifiedIds, finalIds })

      // Refresh results
      await fetchResults()
      
      // Show success message
      const event = new CustomEvent('toast', {
        detail: { 
          type: 'success', 
          message: 'Results published successfully!' 
        }
      })
      window.dispatchEvent(event)
    } catch (error) {
      console.error("Error publishing results:", error)
      const event = new CustomEvent('toast', {
        detail: { 
          type: 'error', 
          message: 'Error publishing results' 
        }
      })
      window.dispatchEvent(event)
    } finally {
      setIsPublishing(false)
    }
  }

  function toggleCandidate(role, type, candidateId) {
    setSelectedCandidates((prev) => {
      const key = type
      const current = prev[key][role] || []
      const updated = current.includes(candidateId)
        ? current.filter((id) => id !== candidateId)
        : [...current, candidateId]

      return {
        ...prev,
        [key]: { ...prev[key], [role]: updated },
      }
    })
  }

  function toggleAllCandidates(role, type, candidates) {
    setSelectedCandidates((prev) => {
      const key = type
      const current = prev[key][role] || []
      const allSelected = current.length === candidates.length
      
      return {
        ...prev,
        [key]: {
          ...prev[key],
          [role]: allSelected ? [] : candidates.map(c => c.id)
        }
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!results || !results.byRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Available</h2>
          <p className="text-gray-600">Results data will appear here once exams are completed.</p>
        </div>
      </div>
    )
  }

  const roleData = results.byRole[activeTab]
  const totalQualifiedSelected = Object.values(selectedCandidates.qualified).flat().length
  const totalFinalSelected = Object.values(selectedCandidates.final).flat().length

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Results Management</h1>
            <p className="text-gray-600 mt-2">Review and publish exam results</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Selected</p>
              <p className="text-lg font-semibold text-gray-900">
                {totalQualifiedSelected} Qualified • {totalFinalSelected} Final
              </p>
            </div>
            <button
              onClick={handlePublishResults}
              disabled={isPublishing || (totalQualifiedSelected === 0 && totalFinalSelected === 0)}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
            >
              {isPublishing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Publishing...
                </span>
              ) : "Publish Results"}
            </button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Candidates</p>
                <p className="text-3xl font-bold text-gray-900">{results.totalCandidates || 0}</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">To Qualify</p>
                <p className="text-3xl font-bold text-gray-900">100</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Final Selection</p>
                <p className="text-3xl font-bold text-gray-900">10</p>
              </div>
              <div className="text-2xl">🏆</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">By Role</p>
                <p className="text-lg font-bold text-gray-900">5 / 3 / 2</p>
                <p className="text-xs text-gray-500">Student / Parent / Teacher</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
            {Object.keys(results.byRole).map((role) => (
              <button
                key={role}
                onClick={() => setActiveTab(role)}
                className={`px-4 py-3 font-semibold text-sm rounded-t-lg transition-all duration-200 ${
                  activeTab === role 
                    ? "bg-black text-white border-b-2 border-black" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-8">
          {/* Qualified Candidates Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Qualified Candidates</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {roleData.qualified} of {roleData.total} selected for next round
                  </p>
                </div>
                {roleData.candidates && roleData.candidates.length > 0 && (
                  <button
                    onClick={() => toggleAllCandidates(activeTab, "qualified", roleData.candidates.slice(0, roleData.qualified))}
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    {selectedCandidates.qualified[activeTab]?.length === roleData.qualified 
                      ? "Deselect All" 
                      : "Select All"}
                  </button>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
              {roleData.candidates && roleData.candidates.slice(0, roleData.qualified).map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-gray-900">
                            {candidate.name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 truncate">{candidate.name}</h3>
                          <p className="text-sm text-gray-500 truncate">{candidate.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <span className="text-sm text-gray-600">Score</span>
                        <p className="text-lg font-bold text-gray-900">{candidate.score}</p>
                      </div>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.qualified[activeTab]?.includes(candidate.id) || false}
                          onChange={() => toggleCandidate(activeTab, "qualified", candidate.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Selection Section */}
          {roleData.qualified > 0 && roleData.final > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-900">Final Selection</h2>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                        🏆 Final Round
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Top {roleData.final} candidates for final selection
                    </p>
                  </div>
                  {roleData.candidates && roleData.candidates.length > 0 && (
                    <button
                      onClick={() => toggleAllCandidates(activeTab, "final", roleData.candidates.slice(0, roleData.final))}
                      className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    >
                      {selectedCandidates.final[activeTab]?.length === roleData.final 
                        ? "Deselect All" 
                        : "Select All"}
                    </button>
                  )}
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {roleData.candidates && roleData.candidates.slice(0, roleData.final).map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-4 hover:bg-gray-50 transition-colors bg-yellow-50/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-yellow-800">
                              {candidate.name?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 truncate">{candidate.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{candidate.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 ml-4">
                        <div className="text-right">
                          <span className="text-sm text-gray-600">Score</span>
                          <p className="text-lg font-bold text-gray-900">{candidate.score}</p>
                        </div>
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCandidates.final[activeTab]?.includes(candidate.id) || false}
                            onChange={() => toggleCandidate(activeTab, "final", candidate.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">Selection Summary</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Review your selections before publishing
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalQualifiedSelected}</div>
                  <div className="text-sm text-gray-600">Qualified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalFinalSelected}</div>
                  <div className="text-sm text-gray-600">Final</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalQualifiedSelected + totalFinalSelected}</div>
                  <div className="text-sm text-gray-600">Total Selected</div>
                </div>
              </div>
              
              <button
                onClick={handlePublishResults}
                disabled={isPublishing || (totalQualifiedSelected === 0 && totalFinalSelected === 0)}
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isPublishing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Publishing...
                  </span>
                ) : "Confirm & Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}