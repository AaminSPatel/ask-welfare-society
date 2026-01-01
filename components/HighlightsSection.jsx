"use client"

export default function HighlightsSection() {
  const highlights = [
    {
      title: "स्वतंत्रता दिवस कार्यक्रम",
      description: "राष्ट्रीय इतिहास और मूल्यों का ज्ञान प्रदर्शित करने वाली देशभक्ति बहुविकल्पी परीक्षा।",
      icon: "🇮🇳",
      date: "15 अगस्त",
    },
    {
      title: "गणतंत्र दिवस समारोह",
      description: "भारत के संविधान और लोकतांत्रिक मूल्यों का सम्मान करने हेतु सामुदायिक समारोह।",
      icon: "📜",
      date: "26 जनवरी",
    },
    {
      title: "शैक्षिक छात्रवृत्तियाँ",
      description: "वंचित पृष्ठभूमि के योग्य छात्रों के लिए योग्यता-आधारित वित्तीय सहायता।",
      icon: "📚",
      date: "निरंतर",
    },
    {
      title: "सामुदायिक कल्याण",
      description: "चिकित्सा, भोजन और बुनियादी आवश्यकताओं में सहायता के लिए नियमित कल्याण अभियान।",
      icon: "❤️",
      date: "मासिक",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">प्रमुख कार्यक्रम</h2>
        <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
          उन प्रमुख पहलों की खोज करें जो हमारे समुदाय को मजबूत और अधिक एकजुट बनाती हैं
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:border-secondary hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{item.description}</p>
              <p className="text-xs text-secondary font-semibold">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}