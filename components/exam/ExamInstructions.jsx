"use client"

import { useState } from "react"

export default function ExamInstructions({ exam, onConfirm, isLoading }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary/90 text-primary-foreground rounded-xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {exam?.title || "Online Examination"}
        </h1>
        <p className="text-lg text-primary-foreground/90">
          स्वतंत्रता दिवस एवं गणतंत्र दिवस के अवसर पर देशभक्ति आधारित MCQ परीक्षा
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Quick Stats */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">कुल प्रश्न</p>
            <p className="text-4xl font-bold text-primary">
              {exam?.totalQuestions || 100}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">समय सीमा</p>
            <p className="text-4xl font-bold text-secondary">
              {exam?.duration || 90} min
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">प्रति प्रश्न अंक</p>
            <p className="text-4xl font-bold text-primary">1</p>
          </div>
        </div>

        {/* Right: Instructions */}
        <div className="md:col-span-2 bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            महत्वपूर्ण निर्देश
          </h2>

          <div className="space-y-4 mb-8">
            {/* 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                <span className="text-secondary font-bold p-3">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Reload से सुरक्षा
                </h4>
                <p className="text-muted-foreground">
                  आपकी प्रगति अपने आप सेव होती रहती है। अगर पेज reload हो जाए,
                  तो आप वहीं से परीक्षा दोबारा शुरू कर सकते हैं।
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                <span className="text-secondary font-bold p-3">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  एक समय में एक प्रश्न
                </h4>
                <p className="text-muted-foreground">
                  हर स्क्रीन पर केवल एक ही प्रश्न दिखाई देगा। उत्तर देने के बाद
                  अगले प्रश्न पर जाएं।
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                <span className="text-secondary font-bold p-3">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  विकल्प चुनना अनिवार्य
                </h4>
                <p className="text-muted-foreground">
                  अगले प्रश्न पर जाने से पहले किसी एक विकल्प का चयन करना
                  आवश्यक है। प्रश्न छोड़ा नहीं जा सकता।
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                <span className="text-secondary font-bold p-3">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  समय समाप्त होने पर Auto-Submit
                </h4>
                <p className="text-muted-foreground">
                  समय समाप्त होते ही परीक्षा अपने आप submit हो जाएगी। स्क्रीन
                  पर countdown timer दिखाई देगा।
                </p>
              </div>
            </div>

            {/* 5 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                <span className="text-secondary font-bold p-3">5</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  उत्तर सुरक्षित रूप से सेव
                </h4>
                <p className="text-muted-foreground">
                  आपके सभी उत्तर real-time में हमारे server पर सुरक्षित रूप से
                  सेव होते रहते हैं।
                </p>
              </div>
            </div>

            {/* 6 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                <span className="text-secondary font-bold p-3">6</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  तुरंत परिणाम
                </h4>
                <p className="text-muted-foreground">
                  परीक्षा submit होते ही आपका परिणाम तुरंत दिखा दिया जाएगा।
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-foreground mb-2">
              परीक्षा की ईमानदारी
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              इस परीक्षा को शुरू करके आप यह स्वीकार करते हैं कि सभी प्रश्नों को
              ईमानदारी से और स्वयं हल करेंगे। किसी भी प्रकार की नकल या अनुचित
              साधनों का प्रयोग करने पर आपकी परीक्षा रद्द की जा सकती है।
            </p>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 mb-8">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 mt-1 rounded border-2 border-primary cursor-pointer"
            />
            <label htmlFor="agree" className="text-muted-foreground cursor-pointer">
              मैंने सभी निर्देश ध्यान से पढ़ लिए हैं और उनका पालन करने के लिए
              सहमत हूं।
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={onConfirm}
            disabled={!agreed || isLoading}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Initializing Exam..." : "Start Examination →"}
          </button>
        </div>
      </div>
    </div>
  )
}
