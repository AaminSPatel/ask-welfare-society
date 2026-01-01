"use client"

import { useState } from "react"

export default function CandidateDetailsForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    fullName: "",
    parentName: "",
    mobile: "",
    email: "",
    city: "",
    address:'',
    role: "student",
  })

  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) newErrors.mobile = "Invalid mobile number"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (formData.role === "student" || formData.role === "parent") {
      if (!formData.parentName.trim()) newErrors.parentName = "Parent/Guardian name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const roles = [
    { value: "student", label: "Student", icon: "👨‍🎓" },
    { value: "parent", label: "Parent/Guardian", icon: "👨‍👩‍👧" },
    { value: "teacher", label: "Teacher", icon: "👨‍🏫" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-card border border-border rounded-xl p-8 md:p-12">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Candidate Registration</h2>
        <p className="text-muted-foreground">Please fill in your details to begin the examination</p>
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-4">Select Your Role *</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((roleOption) => (
            <button
              key={roleOption.value}
              type="button"
              onClick={() => setFormData({ ...formData, role: roleOption.value })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.role === roleOption.value
                  ? "border-secondary bg-secondary/10"
                  : "border-border hover:border-secondary/50"
              }`}
            >
              <div className="text-3xl mb-2">{roleOption.icon}</div>
              <p className="font-semibold text-foreground">{roleOption.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onFocus={() => setFocusedField("fullName")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground transition ${
              errors.fullName ? "border-destructive" : "border-border"
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-destructive text-sm mt-2">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Parent/Guardian Name</label>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            onFocus={() => setFocusedField("parentName")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground transition ${
              errors.parentName ? "border-destructive" : "border-border"
            }`}
            placeholder="Enter parent/guardian name"
          />
          {errors.parentName && <p className="text-destructive text-sm mt-2">{errors.parentName}</p>}
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Mobile Number *</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            onFocus={() => setFocusedField("mobile")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground transition ${
              errors.mobile ? "border-destructive" : "border-border"
            }`}
            placeholder="+91 XXXXXXXXXX"
          />
          {errors.mobile && <p className="text-destructive text-sm mt-2">{errors.mobile}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground transition ${
              errors.email ? "border-destructive" : "border-border"
            }`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onFocus={() => setFocusedField("address")}
          onBlur={() => setFocusedField(null)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground transition ${
            errors.address ? "border-destructive" : "border-border"
          }`}
          placeholder="Enter your address"
        />
        {errors.address && <p className="text-destructive text-sm mt-2">{errors.address}</p>}
      </div>
  {/* City */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          onFocus={() => setFocusedField("city")}
          onBlur={() => setFocusedField(null)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground transition ${
            errors.city ? "border-destructive" : "border-border"
          }`}
          placeholder="Enter your city"
        />
        {errors.city && <p className="text-destructive text-sm mt-2">{errors.city}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Proceed to Instructions →"}
      </button>

      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Note:</span> Please provide accurate information. Verification may be required
          for winners.
        </p>
      </div>
    </form>
  )
}
