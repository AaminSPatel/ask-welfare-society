"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAsk } from './askContext'

/**
 * Custom hook for admin authentication checking
 * Handles initialization waiting, auth verification, and redirects
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.requireAuth - Whether to require authentication (default: true)
 * @param {boolean} options.requireAdmin - Whether to require admin role (default: true)
 * @param {Function} options.onAuthSuccess - Callback when auth succeeds
 * @param {Function} options.onAuthFailure - Callback when auth fails
 * @returns {Object} - Auth state and loading status
 */
export const useAdminAuth = (options = {}) => {
  const {
    requireAuth = true,
    requireAdmin = true,
    onAuthSuccess,
    onAuthFailure
  } = options

  const router = useRouter()
  const { user, isInitialized, loading } = useAsk()
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Wait for context to be initialized
    if (!isInitialized) {
      return
    }

    // Check authentication requirements
    if (requireAuth && !user) {
      console.log('Auth required but no user found, redirecting to login')
      if (onAuthFailure) {
        onAuthFailure()
      } else {
        router.replace('/admin/login')
      }
      return
    }

    // Check admin role requirements
    if (requireAdmin && (!user || user.role !== 'admin')) {
      console.log('Admin role required but user is not admin, redirecting to login')
      if (onAuthFailure) {
        onAuthFailure()
      } else {
        router.replace('/admin/login')
      }
      return
    }

    // Auth checks passed
    setIsAuthorized(true)
    setAuthChecked(true)

    if (onAuthSuccess) {
      onAuthSuccess()
    }

  }, [user, isInitialized, router, requireAuth, requireAdmin, onAuthSuccess, onAuthFailure])

  return {
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isAuthorized,
    authChecked,
    isLoading: !isInitialized || loading,
    user
  }
}

/**
 * Higher-order component for admin pages that require authentication
 * Wraps a component with admin auth checking
 */
export const withAdminAuth = (WrappedComponent, options = {}) => {
  return function AdminProtectedComponent(props) {
    const auth = useAdminAuth(options)

    if (!auth.authChecked) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Verifying authentication...</p>
          </div>
        </div>
      )
    }

    if (!auth.isAuthorized) {
      return null // Will redirect via useAdminAuth
    }

    return <WrappedComponent {...props} auth={auth} />
  }
}
