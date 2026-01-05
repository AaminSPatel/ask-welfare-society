"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import html2canvas from "html2canvas"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import CandidateDetailsForm from "@/components/exam/CandidateDetailsForm"
import ExamInstructions from "@/components/exam/ExamInstructions"
import QuestionCard from "@/components/exam/QuestionCard"
import ExamTimer from "@/components/exam/ExamTimer"
import { useAsk } from "../../lib/askContext"

export default function ExamPage() {
  const router = useRouter()
  const resultRef = useRef(null)

  const [stage, setStage] = useState("details")
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [candidate, setCandidate] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(null)
  const [candidateId, setCandidateId] = useState(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

  const {
    fetchActiveExam,
    fetchExamQuestions,
    createCandidate,
    submitExam,
  } = useAsk()

  /* -------------------- LOAD EXAM -------------------- */
  useEffect(() => {
    const loadExam = async () => {
      try {
        const activeExam = await fetchActiveExam()
        setExam(activeExam)

        if (activeExam) {
          const examQuestions = await fetchExamQuestions(activeExam._id)
          setQuestions(examQuestions || [])
        }
      } catch (error) {
        console.error("Error loading exam:", error)
      }
    }

    loadExam()

    const savedStage = localStorage.getItem("examStage")
    const savedCandidate = localStorage.getItem("examCandidate")
    const savedAnswers = localStorage.getItem("examAnswers")
    const savedCandidateId = localStorage.getItem("examCandidateId")

    if (savedStage && savedCandidate && savedAnswers && savedCandidateId) {
      setStage(savedStage)
      setCandidate(JSON.parse(savedCandidate))
      setAnswers(JSON.parse(savedAnswers))
      setCandidateId(savedCandidateId)

      if (savedStage === "exam") {
        const savedQuestionIndex = localStorage.getItem("examQuestionIndex")
        setCurrentQuestionIndex(Number(savedQuestionIndex) || 0)
      }
    }
  }, [])

  /* -------------------- DETAILS SUBMIT -------------------- */
  const handleDetailsSubmit = async (formData) => {
    setLoading(true)
    try {
      const data = await createCandidate({ ...formData, examId: exam._id })

      setCandidate(formData)
      setCandidateId(data._id)

      localStorage.setItem("examStage", "instructions")
      localStorage.setItem("examCandidate", JSON.stringify(formData))
      localStorage.setItem("examCandidateId", data._id)
      localStorage.setItem("examAnswers", JSON.stringify({}))

      setStage("instructions")
    } finally {
      setLoading(false)
    }
  }

  /* -------------------- START EXAM -------------------- */
  const handleInstructionsConfirm = () => {
    localStorage.setItem("examStage", "exam")
    localStorage.setItem("examQuestionIndex", "0")
    setStage("exam")
  }

  /* -------------------- ANSWER -------------------- */
  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: optionIndex }
    setAnswers(newAnswers)
    localStorage.setItem("examAnswers", JSON.stringify(newAnswers))
  }

  const handleNextQuestion = async (selectedOption) => {
    setLoading(true)
    try {
      await fetch(`${API_BASE_URL}/candidates/${candidateId}/answers`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionNumber: currentQuestionIndex,
          selectedOption,
          correctAnswer: questions[currentQuestionIndex].correctAnswer,
        }),
      })

      if (currentQuestionIndex < questions.length - 1) {
        const next = currentQuestionIndex + 1
        setCurrentQuestionIndex(next)
        localStorage.setItem("examQuestionIndex", next.toString())
      } else {
        await handleSubmitExam()
      }
    } finally {
      setLoading(false)
    }
  }

  /* -------------------- SUBMIT EXAM -------------------- */
  const handleSubmitExam = async () => {
    const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}`)
    const { candidate } = await response.json()

    let correct = 0
    candidate.answers.forEach((a) => {
      if (a.selectedOption === a.correctAnswer) correct++
    })

    const percentage = Math.round((correct / questions.length) * 100)

    await submitExam(candidateId, percentage, 0)

    setScore({
      percentage,
      correctAnswers: correct,
      totalQuestions: questions.length,
    })

    localStorage.clear()
    setStage("results")
  }

  /* -------------------- SCREENSHOT -------------------- */
  const handleScreenshot = async () => {
    if (!resultRef.current) return

    const canvas = await html2canvas(resultRef.current, { scale: 2 })
    const link = document.createElement("a")
    link.download = `exam-result-${candidateId}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  /* -------------------- LOADING -------------------- */
  if (!exam) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-14 w-14 border-b-2 border-primary rounded-full mx-auto mb-4" />
            <h1 className="text-2xl font-bold">परीक्षा लोड हो रही है</h1>
            <p className="text-muted-foreground">
              कृपया प्रतीक्षा करें, आपकी परीक्षा तैयार की जा रही है...
            </p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  /* ==================== UI ==================== */
  return (
    <>
      <Navigation />

      <main className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4">

          {stage === "details" && (
            <>
              <h1 className="text-4xl font-bold text-center mb-8">
                ऑनलाइन परीक्षा
              </h1>
              <CandidateDetailsForm
                onSubmit={handleDetailsSubmit}
                isLoading={loading}
              />
            </>
          )}

          {stage === "instructions" && (
            <>
              <h1 className="text-4xl font-bold text-center mb-8">
                परीक्षा की जानकारी
              </h1>
              <ExamInstructions
                exam={exam}
                onConfirm={handleInstructionsConfirm}
                isLoading={loading}
              />
            </>
          )}

          {stage === "exam" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  प्रश्न {currentQuestionIndex + 1} / {questions.length}
                </h2>
                <ExamTimer
                  duration={exam.duration}
                  onTimeExpired={handleSubmitExam}
                />
              </div>

              <QuestionCard
                question={{
                  ...questions[currentQuestionIndex],
                  questionNumber: currentQuestionIndex + 1,
                }}
                currentAnswer={answers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
                onSubmit={handleNextQuestion}
                isLoading={loading}
                isLastQuestion={currentQuestionIndex === questions.length - 1}
              />
            </>
          )}

 {stage === "results" && (
  <div
    className="max-w-2xl mx-auto rounded-2xl p-4 md:p-14 text-center shadow-lg"
    style={{
      backgroundColor: "#ffffff",
      border: "1px solid #bbf7d0",
    }}
  >
    {/* ================= PRINTABLE RESULT ================= */}
    <div ref={resultRef} className="p-4">

      {/* Header */}
      <div className="mb-10">
        <div className="text-6xl mb-4">🎉</div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: "#15803d" }}
        >
          Exam Submitted Successfully
        </h1>
        <p className="text-lg" style={{ color: "#6b7280" }}>
          Your responses have been recorded successfully.
        </p>
      </div>

      {/* Score Card */}
      {score && (
        <div
          className="mb-10 p-8 rounded-xl"
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          <p className="text-sm mb-2" style={{ color: "#6b7280" }}>
            Your Score
          </p>

          <div
            className="text-7xl font-extrabold mb-4"
            style={{ color: "#16a34a" }}
          >
            {score.percentage}%
          </div>

          <p
            className="text-xl font-semibold mb-6"
            style={{ color: "#111827" }}
          >
            {score.correctAnswers} correct out of {score.totalQuestions} questions
          </p>

          <div className="flex justify-center gap-10">
            <div className="text-center">
              <p className="text-sm" style={{ color: "#6b7280" }}>
                Correct
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: "#16a34a" }}
              >
                {score.correctAnswers}
              </p>
            </div>

            <div
              className="w-px"
              style={{ backgroundColor: "#bbf7d0" }}
            ></div>

            <div className="text-center">
              <p className="text-sm" style={{ color: "#6b7280" }}>
                Incorrect
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: "#dc2626" }}
              >
                {score.totalQuestions - score.correctAnswers}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Details */}
      <div
        className="mb-4 rounded-xl p-4 text-left"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #bbf7d0",
        }}
      >
        <h3
          className="text-lg font-bold mb-4 text-center"
          style={{ color: "#15803d" }}
        >
          Candidate Details
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span style={{ color: "#6b7280" }}>Candidate ID</span>
            <span style={{ color: "#111827", fontWeight: 500 }}>
              {candidateId}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ color: "#6b7280" }}>Name</span>
            <span style={{ color: "#111827", fontWeight: 500 }}>
              {candidate?.fullName}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ color: "#6b7280" }}>Email</span>
            <span style={{ color: "#111827", fontWeight: 500 }}>
              {candidate?.email}
            </span>
          </div>
        </div>
      </div>
   <div 
  style={{ 
    display: 'flex', 
    alignItems: 'center', 
    padding: '0.5rem', 
    justifyContent: 'center', 
    color: '#fd5453', 
    fontWeight: '600', 
    fontSize: '1.06rem' ,

  }}
>
  Ahle Sarzami Khidmat-E-Kaum Welfare Society
</div>
    </div>

    {/* ================= ACTIONS (NOT IN SCREENSHOT) ================= */}
    <div className="space-y-4">
      <button
        onClick={handleScreenshot}
        className="w-full py-4 rounded-lg font-bold text-lg"
        style={{
          border: "2px solid #16a34a",
          color: "#16a34a",
          backgroundColor: "transparent",
        }}
      >
        Download Result Screenshot
      </button>

      <button
        onClick={() => {
          localStorage.clear()
          router.push("/")
        }}
        className="w-full py-4 rounded-lg font-bold text-lg"
        style={{
          backgroundColor: "#16a34a",
          color: "#ffffff",
        }}
      >
        Return to Home
      </button>

      <button
        onClick={() => {
          localStorage.clear()
          router.push("/results")
        }}
        className="w-full py-4 rounded-lg font-semibold"
        style={{
          border: "1px solid #16a34a",
          color: "#16a34a",
          backgroundColor: "#ffffff",
        }}
      >
        View Leaderboard
      </button>
    </div>

    {/* Footer Note */}
    <p className="text-xs mt-6" style={{ color: "#6b7280" }}>
      Your result has been saved. Final rankings will be published after the exam ends.
    </p>
  </div>
)}


        </div>
      </main>

      <Footer />
    </>
  )
}
