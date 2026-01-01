"use client"

export default function IntroductionSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* बाईं ओर: सजावटी तत्व */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg transform -rotate-6"></div>
              <div className="absolute inset-4 bg-background rounded-lg flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">25+</div>
                  <p className="text-muted-foreground">वर्षों की सेवा</p>
                </div>
              </div>
            </div>
          </div>

          {/* दाईं ओर: सामग्री */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">हमारे वेलफेयर सोसाइटी के बारे में</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              0000 में स्थापित, अहले सरज़मी खिदमत-ए-कौम वेलफेयर सोसाइटी, सांस्कृतिक संरक्षण और शैक्षिक उत्कृष्टता का प्रकाशस्तंभ रही है।
              हम समाज की विभिन्न आवश्यकताओं को पूरा करने और समावेशी विकास को बढ़ावा देने के लिए हमारे समुदाय के विविध सदस्यों को एकजुट करते हैं।
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">सामुदायिक कल्याण</h4>
                  <p className="text-muted-foreground">कमजोर सदस्यों को सहायता और संसाधनों के साथ समर्थन</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">शैक्षिक कार्यक्रम</h4>
                  <p className="text-muted-foreground">छात्रवृत्ति और सीखने के अवसर प्रदान करना</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">सांस्कृतिक विरासत</h4>
                  <p className="text-muted-foreground">इस्लामी परंपराओं का संरक्षण और उत्सव मनाना</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}