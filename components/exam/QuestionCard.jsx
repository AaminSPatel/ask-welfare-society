"use client"

import { useState } from "react"

export default function QuestionCard({ question:allQuestion, currentAnswer, onAnswerSelect, onSubmit, isLoading, isLastQuestion }) {
  const [selectedOption, setSelectedOption] = useState(currentAnswer)
//console.log(allQuestion);
  const question = allQuestion
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex )
  }

  const handleSubmit = async () => {
    if (selectedOption !== null) {
      onAnswerSelect(selectedOption)
      console.log('handlesubmit cliked');

      await onSubmit(selectedOption)
      setSelectedOption(null)

    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Question {question.questionNumber}</h2>
          <span className="text-sm font-semibold text-secondary">1 Mark</span>
        </div>
        <p className="text-lg text-foreground leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question?.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            className={`w-full text-left p-4 md:p-6 rounded-lg border-2 transition-all duration-200 ${
              selectedOption === index
                ? "border-secondary bg-secondary/10 shadow-md"
                : "border-border hover:border-secondary/50 hover:bg-card"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  selectedOption === index
                    ? "border-secondary bg-secondary text-primary"
                    : "border-border group-hover:border-secondary"
                }`}
              >
                {selectedOption === index && <span className="font-bold">✓</span>}
              </div>
              <span className="text-foreground font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-border">
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || isLoading}
          className="flex-1 bg-primary text-primary-foreground py-3 md:py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span>
              Submitting...
            </>
          ) : (
            <>
              {isLastQuestion ? "Submit Final Answer" : "Next Question"}
              <span>→</span>
            </>
          )}
        </button>
      </div>

      {/* Info Message */}
      <p className="text-xs md:text-sm text-muted-foreground text-center">
        {selectedOption === null ? "Please select an option to continue" : "Click button to proceed"}
      </p>
    </div>
  )
}
