"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, CheckCircle, Building, User, MessageSquare } from "lucide-react"

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    roleTitle: "",
    message: "",
    requestType: "demo", // demo, sample, custom
  })

  // Add real-time validation
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({})

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "fullName":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : ""
      case "workEmail":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid business email" : ""
      case "companyName":
        return value.trim().length < 2 ? "Company name is required" : ""
      default:
        return ""
    }
  }

  const handleFieldBlur = (field: string, value: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setFieldErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleFieldChange = (field: string, value: string) => {
    handleInputChange(field, value)

    // Clear error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Improve the submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const errors: { [key: string]: string } = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "fullName" || key === "workEmail" || key === "companyName") {
        const error = validateField(key, value)
        if (error) errors[key] = error
      }
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setTouchedFields({
        fullName: true,
        workEmail: true,
        companyName: true,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Message sent successfully!",
        description: "Our team will respond within 24 hours.",
        duration: 5000,
      })

      // Reset form
      setFormData({
        fullName: "",
        workEmail: "",
        companyName: "",
        roleTitle: "",
        message: "",
        requestType: "demo",
      })
      setFieldErrors({})
      setTouchedFields({})
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const requestTypes = [
    { id: "demo", label: "Schedule Demo", icon: "🎯" },
    { id: "sample", label: "Sample Report", icon: "📊" },
    { id: "custom", label: "Custom Analysis", icon: "⚖️" },
  ]

  // Update input className to show errors
  const getInputClassName = (fieldName: string) => {
    const baseClass = "h-12 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-colors"
    const hasError = touchedFields[fieldName] && fieldErrors[fieldName]

    if (hasError) {
      return `${baseClass} border-red-300 focus:border-red-500`
    }

    return `${baseClass} border-gray-200 focus:border-teal-500`
  }

  return (
    <Card className={`border-0 bg-white/80 backdrop-blur-xl shadow-2xl ${className}`}>
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Contact Our Intelligence Team</CardTitle>
        </div>
        <p className="text-gray-600 text-lg">Get expert guidance for your $100M+ location strategy</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">What can we help you with?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {requestTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleInputChange("requestType", type.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.requestType === type.id
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                onBlur={(e) => handleFieldBlur("fullName", e.target.value)}
                placeholder="John Smith"
                className={getInputClassName("fullName")}
              />
              {touchedFields.fullName && fieldErrors.fullName && (
                <p className="text-red-500 text-sm">{fieldErrors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Work Email *
              </label>
              <Input
                required
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleFieldChange("workEmail", e.target.value)}
                onBlur={(e) => handleFieldBlur("workEmail", e.target.value)}
                placeholder="john@company.com"
                className={getInputClassName("workEmail")}
              />
              {touchedFields.workEmail && fieldErrors.workEmail && (
                <p className="text-red-500 text-sm">{fieldErrors.workEmail}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Company Name
              </label>
              <Input
                value={formData.companyName}
                onChange={(e) => handleFieldChange("companyName", e.target.value)}
                onBlur={(e) => handleFieldBlur("companyName", e.target.value)}
                placeholder="Fortune 500 Corp"
                className={getInputClassName("companyName")}
              />
              {touchedFields.companyName && fieldErrors.companyName && (
                <p className="text-red-500 text-sm">{fieldErrors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Role / Title</label>
              <Input
                value={formData.roleTitle}
                onChange={(e) => handleInputChange("roleTitle", e.target.value)}
                placeholder="VP Strategy, Site Selection Director"
                className="h-12 border-2 border-gray-200 focus:border-teal-500 rounded-xl bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your location requirements, investment size, timeline, or specific challenges..."
              rows={4}
              className="border-2 border-gray-200 focus:border-teal-500 rounded-xl bg-white/50 backdrop-blur-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.fullName || !formData.workEmail}
            className="w-full h-14 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Message...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5" />
                Send Message
              </div>
            )}
          </Button>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>24-hour response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Enterprise confidentiality</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>No spam, ever</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
