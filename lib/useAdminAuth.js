"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAsk } from './askContext';

export const useAdminAuth = (options = {}) => {
  const router = useRouter();
  const { user, isInitialized, logout } = useAsk();
  const { onAuthSuccess, requireAuth = true } = options;

  useEffect(() => {
    if (isInitialized) {
      if (requireAuth && (!user || user.role !== 'admin')) {
        // Only redirect if we're not already on the login page
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
          router.push('/admin/login');
        }
      } else if (user && user.role === 'admin' && onAuthSuccess) {
        // Call the success callback if provided
        onAuthSuccess();
      }
    }
  }, [user, isInitialized, router, requireAuth, onAuthSuccess]);

  return {
    authChecked: isInitialized,
    isAuthorized: user && user.role === 'admin',
    user,
    logout
  };
};