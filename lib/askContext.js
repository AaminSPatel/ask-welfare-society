"use client"
import React, { createContext, useContext, useState, useEffect , useMemo} from 'react';
import axios from 'axios';

const AskContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'; // Adjust if backend port changes

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

 const api = React.useMemo(() => {
  return axios.create({
    baseURL: API_BASE_URL,
  });
}, []);

  // Add response interceptor to handle 401 errors
  React.useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [api]);

  // Add token to requests if user is logged in
  useEffect(() => {
    if (user && user.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // Admin functions
  const adminLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/admin/login', { email, password });
      const userData = { ...response.data, role: 'admin', expiry: Date.now() + 15 * 24 * 60 * 60 * 1000 }; // 15 days
      setUser(userData);
      console.log(userData);

      localStorage.setItem('user', JSON.stringify(userData));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const adminSignup = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/admin/signup', { email, password });
      const userData = { ...response.data, role: 'admin', expiry: Date.now() + 15 * 24 * 60 * 60 * 1000 }; // 15 days
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  // Exam functions
  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/exams');
      setExams(response.data.exams);
            console.log('this is rendering 3',response.data.exams);

      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch exams');
    } finally {
      setLoading(false);
    }
  };

  const createExam = async (examData) => {
    try {
      setLoading(true);
      const response = await api.post('/admin/exams', examData);
      setExams([...exams, response.data.exam]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create exam');
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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update exam');
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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update exam status');
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
    } finally {
      setLoading(false);
    }
  };

  const addExamQuestions = async (examId, questions) => {
    try {
      setLoading(true);
      console.log('is it working');
      
      const response = await api.post(`/exams/${examId}/questions`, { questions });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add exam questions');
    } finally {
      setLoading(false);
    }
  };

  // Candidate functions
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/candidates');
      setCandidates(response.data.candidates);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  const createCandidate = async (candidateData) => {
    try {
      setLoading(true);
      const response = await api.post('/candidates', candidateData);
      setCandidates([...candidates, response.data.candidate]);
      setError(null);
      return response.data.candidate
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create candidate');
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
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async (candidateId, score, totalTime) => {
    try {
      setLoading(true);
      console.log('candidateId, score, totalTime',candidateId, score, totalTime);
      
      const response = await api.post(`/candidates/${candidateId}/submit`, { score, totalTime });
      setCandidates(candidates.map(candidate => candidate._id === candidateId ? response.data.candidate : candidate));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit exam');
    } finally {
      setLoading(false);
    }
  };

  // Committee member functions
  const fetchCommitteeMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/committee-members');
      setCommitteeMembers(response.data.members);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch committee members');
    } finally {
      setLoading(false);
    }
  };

  const createCommitteeMember = async (memberData) => {
    try {
      setLoading(true);
      const response = await api.post('/committee-members', memberData);
      setCommitteeMembers([...committeeMembers, response.data.member]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create committee member');
    } finally {
      setLoading(false);
    }
  };

  // Event functions
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data.events);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await api.post('/events', eventData);
      setEvents([...events, response.data.event]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  // Results functions
  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/results');
      setResults(response.data.results);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const publishResults = async (data = {}) => {
    try {
      setLoading(true);
      await api.post('/admin/results/publish', data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to publish results');
    } finally {
      setLoading(false);
    }
  };

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.expiry && Date.now() < userData.expiry) {
        setUser(userData);
      } else {
        localStorage.removeItem('user');
      }
    }
    setIsInitialized(true);
  }, []);

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
    createCandidate,API_BASE_URL,
    updateCandidateAnswers,
    submitExam,
    fetchCommitteeMembers,
    createCommitteeMember,
    fetchEvents,
    createEvent,
    fetchResults,
    publishResults,
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

