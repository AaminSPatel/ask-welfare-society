"use client"

import { useEffect, useState } from "react"
import { useAsk } from "@/lib/askContext"
import { useAdminAuth } from "@/lib/useAdminAuth"

export default function ExamManager() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
  })
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
  })
  const [isMobile, setIsMobile] = useState(false)

  const { exams, fetchExams, createExam, updateExam, addExamQuestions, loading, user } = useAsk()
  const { isAuthorized } = useAdminAuth()

  // Check screen size for responsive design
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch exams when component mounts and user is authorized
  useEffect(() => {
    if (isAuthorized) {
      fetchExams();
    }
  }, [isAuthorized, fetchExams]);

  async function handleCreateExam(e) {
    e.preventDefault()
    try {
      await createExam(formData)
      setFormData({
        title: "",
        description: "",
        date: "",
        duration: "",
      })
      setShowForm(false)
    } catch (error) {
      console.error("Error creating exam:", error)
    }
  }

  async function handleToggleStatus(examId, currentStatus) {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active"
      await updateExam(examId, { status: newStatus })
    } catch (error) {
      console.error("Error updating exam:", error)
    }
  }

  async function handleEditExam(e) {
    e.preventDefault()
    try {
      await updateExam(selectedExam._id, editFormData)
      setShowEditForm(false)
      setSelectedExam(null)
      setEditFormData({
        title: "",
        description: "",
        date: "",
        duration: "",
      })
    } catch (error) {
      console.error("Error updating exam:", error)
    }
  }

  function openEditForm(exam) {
    setSelectedExam(exam)
    setEditFormData({
      title: exam.title,
      description: exam.description,
      date: exam.date.split('T')[0],
      duration: exam.duration,
    })
    setShowEditForm(true)
  }

  function addQuestion() {
    setQuestions([...questions, {
      questionNumber: questions.length + 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      difficulty: "medium"
    }])
  }

  function removeQuestion(index) {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  function updateQuestion(index, field, value) {
    const updatedQuestions = [...questions]
    updatedQuestions[index][field] = value
    setQuestions(updatedQuestions)
  }

  function updateOption(index, optionIndex, value) {
    const updatedQuestions = [...questions]
    updatedQuestions[index].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  async function handleAddQuestions(e) {
    e.preventDefault()
    if (questions.length === 0) return
    try {
      await addExamQuestions(selectedExam._id, questions)
      await fetchExams()
      setQuestions([])
      setShowQuestionForm(false)
    } catch (error) {
      console.error("Error adding questions:", error)
    }
  }

  if (loading && exams.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Exam Manager</h1>
            <p className="text-gray-600 mt-2">Create and manage your exams</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 md:mt-0 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {showForm ? "Cancel" : "Create New Exam"}
          </button>
        </div>

        {/* Create Exam Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Exam</h2>
            <form onSubmit={handleCreateExam} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Exam Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                    placeholder="Enter exam title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                    placeholder="Enter duration"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                    rows="3"
                    placeholder="Enter exam description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Create Exam
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Exam Form */}
        {showEditForm && selectedExam && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Exam: {selectedExam.title}</h2>
              <button
                onClick={() => {
                  setShowEditForm(false)
                  setSelectedExam(null)
                  setEditFormData({
                    title: "",
                    description: "",
                    date: "",
                    duration: "",
                  })
                }}
                className="text-gray-500 hover:text-gray-900 text-2xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditExam} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Exam Title</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={editFormData.duration}
                    onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Date</label>
                  <input
                    type="date"
                    value={editFormData.date}
                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Update Exam
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add Questions Form */}
        {showQuestionForm && selectedExam && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add Questions</h2>
                <p className="text-gray-600 mt-1">Exam: {selectedExam.title}</p>
              </div>
              <button
                onClick={() => {
                  setShowQuestionForm(false)
                  setSelectedExam(null)
                  setQuestions([])
                }}
                className="text-gray-500 hover:text-gray-900 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 mb-8">
              {questions.map((q, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 space-y-4 bg-gray-50">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Question Text</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                      rows="2"
                      placeholder="Enter question text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">Options</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Option {optionIndex + 1}</label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent bg-white text-gray-900"
                            placeholder={`Enter option ${optionIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Correct Answer</label>
                      <select
                        value={q.correctAnswer}
                        onChange={(e) => updateQuestion(index, 'correctAnswer', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                      >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Difficulty Level</label>
                      <select
                        value={q.difficulty}
                        onChange={(e) => updateQuestion(index, 'difficulty', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addQuestion}
                className="flex-1 border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:border-black hover:bg-gray-50 transition-all duration-200"
              >
                + Add New Question
              </button>

              {questions.length > 0 && (
                <button
                  onClick={handleAddQuestions}
                  className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Save All Questions
                </button>
              )}
            </div>
          </div>
        )}

        {/* Exams List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Exams ({exams.length})</h2>
          
          {exams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-lg">No exams created yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200"
              >
                Create Your First Exam
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {exams.map((exam) => (
                <div key={exam._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            exam.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {exam.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{exam.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900 font-medium">Duration:</span>
                            <span className="text-gray-600">{exam.duration} mins</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900 font-medium">Questions:</span>
                            <span className="text-gray-600">{exam.totalQuestions || 0}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900 font-medium">Date:</span>
                            <span className="text-gray-600">{new Date(exam.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions - Responsive layout */}
                      <div className={`flex ${isMobile ? 'flex-wrap gap-2' : 'flex-col gap-2'} md:flex-col md:gap-2`}>
                        <button
                          onClick={() => openEditForm(exam)}
                          className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedExam(exam)
                            setShowQuestionForm(true)
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm"
                        >
                          Add Questions
                        </button>
                        <button
                          onClick={() => handleToggleStatus(exam._id, exam.status)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                            exam.status === "active"
                              ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                              : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                          }`}
                        >
                          {exam.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}