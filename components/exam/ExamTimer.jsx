"use client"

import { useEffect, useState } from "react"

export default function ExamTimer({ duration, onTimeExpired }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isWarning, setIsWarning] = useState(false)
  const [isCritical, setIsCritical] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeExpired()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        setIsWarning(newTime < 300) // Less than 5 minutes
        setIsCritical(newTime < 60) // Less than 1 minute
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeExpired])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const percentage = (timeLeft / (duration * 60)) * 100

  return (
    <div
      className={`flex flex-col items-center gap-3 px-6 py-4 rounded-lg border-2 font-semibold transition-all ${
        isCritical
          ? "bg-destructive/20 border-destructive text-destructive animate-pulse"
          : isWarning
            ? "bg-secondary/20 border-secondary text-secondary"
            : "bg-primary/20 border-primary text-primary"
      }`}
    >
      <div className="text-sm font-semibold uppercase tracking-wide">Time Remaining</div>
      <div className="text-3xl md:text-4xl font-bold font-mono">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            isCritical ? "bg-destructive" : isWarning ? "bg-secondary" : "bg-primary"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {isCritical && <div className="text-xs font-bold">HURRY UP!</div>}
      {isWarning && !isCritical && <div className="text-xs">5 minutes left</div>}
    </div>
  )
}
