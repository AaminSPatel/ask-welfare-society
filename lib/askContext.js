"use client"
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

const AskContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AskProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [exams, setExams] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
    });

    return instance;
  }, []);

  // Add response interceptor to handle 401 errors
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          // Redirect to login page if not already there
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
            window.location.href = '/admin/login';
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [api]);

  // Update token in axios headers when user changes
  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user, api]);

  // Admin functions
  const adminLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/admin/login', { email, password });
      const userData = {
        ...response.data,
        role: 'admin',
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000
      };
      
      // Set the token in axios headers
      if (userData.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setError(null);
      return userData;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const adminSignup = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/admin/signup', { email, password });
      const userData = {
        ...response.data,
        role: 'admin',
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000
      };
      
      // Set the token in axios headers
      if (userData.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setError(null);
      return userData;
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  };

  // Exam functions
  const fetchExams = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/exams');
      setExams(response.data.exams);
      setError(null);
      return response.data.exams;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch exams');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createExam = async (examData) => {
    try {
      setLoading(true);
      const response = await api.post('/admin/exams', examData);
      setExams([...exams, response.data.exam]);
      setError(null);
      return response.data.exam;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExam = async (examId, examData) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/exams/${examId}`, examData);
      setExams(exams.map(exam => exam._id === examId ? response.data.exam : exam));
      setError(null);
      return response.data.exam;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExamStatus = async (examId, status) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/exams/${examId}/status`, { status });
      setExams(exams.map(exam => exam._id === examId ? response.data.exam : exam));
      setError(null);
      return response.data.exam;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update exam status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExam = async (examId) => {
    try {
      setLoading(true);
      await api.delete(`/admin/exams/${examId}`);
      setExams(exams.filter(exam => exam._id !== examId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveExam = async () => {
    try {
      setLoading(true);
      const response = await api.get('/exams/active');
      setError(null);
      return response.data.exam;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch active exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchExamQuestions = async (examId) => {
    try {
      setLoading(true);
      const response = await api.get(`/exams/${examId}/questions`);
      setError(null);
      return response.data.questions;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch exam questions');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addExamQuestions = async (examId, questions) => {
    try {
      setLoading(true);
      const response = await api.post(`/exams/${examId}/questions`, { questions });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add exam questions');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Candidate functions
  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/candidates');
      setCandidates(response.data.candidates);
      setError(null);
      return response.data.candidates;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch candidates');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createCandidate = async (candidateData) => {
    try {
      setLoading(true);
      const response = await api.post('/candidates', candidateData);
      setCandidates([...candidates, response.data.candidate]);
      setError(null);
      return response.data.candidate;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create candidate');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCandidateAnswers = async (candidateId, answers) => {
    try {
      setLoading(true);
      const response = await api.put(`/candidates/${candidateId}/answers`, { answers });
      setCandidates(candidates.map(candidate => candidate._id === candidateId ? response.data.candidate : candidate));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update answers');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async (candidateId, score, totalTime) => {
    try {
      setLoading(true);
      const response = await api.post(`/candidates/${candidateId}/submit`, { score, totalTime });
      setCandidates(candidates.map(candidate => candidate._id === candidateId ? response.data.candidate : candidate));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Committee member functions
  const fetchCommitteeMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/committee-members');
      setCommitteeMembers(response.data.members);
      setError(null);
      return response.data.members;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch committee members');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createCommitteeMember = async (memberData, imageFile = null) => {
    try {
      setLoading(true);

      let formData = new FormData();

      // Add all member data to FormData
      Object.keys(memberData).forEach(key => {
        if (memberData[key] !== null && memberData[key] !== undefined) {
          formData.append(key, memberData[key]);
        }
      });

      // Add image file if provided
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await api.post('/committee-members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCommitteeMembers([...committeeMembers, response.data.member]);
      setError(null);
      return response.data.member;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create committee member');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Event functions
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data.events);
      setError(null);
      return response.data.events;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch events');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await api.post('/events', eventData);
      setEvents([...events, response.data.event]);
      setError(null);
      return response.data.event;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Results functions
  const fetchResults = useCallback(async () => {
    try {
      // Check if Authorization header is present
      if (!api.defaults.headers.common['Authorization']) {
        console.warn('🚫 fetchResults called without Authorization header');
        throw new Error('No authorization token available');
      }
      console.log('📊 Fetching results with auth header present');
      setLoading(true);
      const response = await api.get('/admin/results');
      setResults(response.data.results);
      setError(null);
      return response.data.results;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch results');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const publishResults = async (data = {}) => {
    try {
      setLoading(true);
      await api.post('/admin/results/publish', data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to publish results');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Validate token with backend
  const validateToken = useCallback(async (token) => {
    try {
      // Temporarily set the token to validate it
      const tempApi = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${token}` }
      });
      await tempApi.get('/admin/validate');
      return true;
    } catch (error) {
      console.log('❌ Token validation failed:', error.response?.data?.error || error.message);
      return false;
    }
  }, []);

  // Load user from localStorage on app start and validate token
  useEffect(() => {
    const loadUser = async () => {
      if (typeof window !== 'undefined') {
        console.log('🔄 Loading user from localStorage...');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            console.log('📦 Parsed user data:', { hasToken: !!userData.token, expiry: userData.expiry, currentTime: Date.now() });

            // Check local expiry first
            if (userData.expiry && Date.now() < userData.expiry && userData.token) {
              // Validate token with backend
              const isValid = await validateToken(userData.token);
              if (isValid) {
                // Set token in axios headers
                api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
                setUser(userData);
                console.log('✅ User loaded and token validated with backend');
              } else {
                console.log('❌ Token validation failed, clearing localStorage');
                localStorage.removeItem('user');
                delete api.defaults.headers.common['Authorization'];
              }
            } else {
              console.log('❌ User token expired locally, clearing localStorage');
              localStorage.removeItem('user');
              delete api.defaults.headers.common['Authorization'];
            }
          } catch (error) {
            console.error('❌ Error parsing stored user:', error);
            localStorage.removeItem('user');
            delete api.defaults.headers.common['Authorization'];
          }
        } else {
          console.log('ℹ️ No stored user found');
        }
      }
      console.log('🏁 Setting isInitialized to true');
      setIsInitialized(true);
    };

    loadUser();
  }, [api, validateToken]);

  const value = {
    user,
    isInitialized,
    exams,
    candidates,
    committeeMembers,
    events,
    results,
    loading,
    error,
    adminLogin,
    adminSignup,
    logout,
    fetchExams,
    createExam,
    updateExam,
    updateExamStatus,
    deleteExam,
    fetchActiveExam,
    fetchExamQuestions,
    addExamQuestions,
    fetchCandidates,
    createCandidate,
    updateCandidateAnswers,
    submitExam,
    fetchCommitteeMembers,
    createCommitteeMember,
    fetchEvents,
    createEvent,
    fetchResults,
    publishResults,
    API_BASE_URL,
  };

  return (
    <AskContext.Provider value={value}>
      {children}
    </AskContext.Provider>
  );
};

export const useAsk = () => {
  const context = useContext(AskContext);
  if (!context) {
    throw new Error('useAsk must be used within an AskProvider');
  }
  return context;
};