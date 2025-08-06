"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, AlertTriangle } from "lucide-react"

export default function FPICDashboard() {
  const [city, setCity] = useState("Sault Ste. Marie, ON")
  const status = "Not Held"
  const risk = "High"
  const quotes = [
    {
      text: "No formal engagement with Batchewana Nation took place prior to zoning vote.",
      tag: "#NoConsultation",
      source: "Council Transcript",
      date: "2023-09-14",
    },
    {
      text: "The motion to consult was tabled indefinitely without community input.",
      tag: "#PermittingDelay",
      source: "City Minutes",
      date: "2024-01-12",
    },
    {
      text: "Protests were registered by local leadership but no FPIC hearing was held.",
      tag: "#FPICViolation",
      source: "Indigenous Radio",
      date: "2024-03-09",
    },
  ]

  // Add state for interactive elements
  const [isLoadingBrief, setIsLoadingBrief] = useState(false)
  const [showPricingHint, setShowPricingHint] = useState(false)

  // Improve the unlock button interaction
  const handleUnlockBrief = async () => {
    setIsLoadingBrief(true)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoadingBrief(false)

    // Show pricing modal or redirect
    setShowPricingHint(true)
    setTimeout(() => setShowPricingHint(false), 3000)
  }

  // Add hover effects and better visual feedback
  const handlePricingClick = () => {
    // Smooth scroll to pricing section
    const pricingSection = document.querySelector('[data-section="pricing"]')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-900 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">FPIC Risk Dashboard</h1>
        <p className="text-sm text-gray-500">
          A litigation-grade snapshot of Indigenous consultation status, sourced from public transcripts.
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border-l-4 border-red-600 bg-red-50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{city}</h2>
              <p className="text-sm text-gray-700">Last updated: June 2025</p>
            </div>
            <Badge className="bg-red-600 text-white">{status}</Badge>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-800">FPIC Risk Score</p>
            <Progress value={92} className="h-2 bg-red-200" />
            <p className="text-xs text-red-800">High risk of litigation or project delay due to consultation failure</p>
          </div>
        </CardContent>
      </Card>

      {/* Transcript Evidence */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transcript Evidence (Preview)</h3>
        {quotes.map((q, i) => (
          <div key={i} className="border-l-2 border-gray-300 pl-4 py-2 bg-gray-50">
            <p className="text-sm italic">"{q.text}"</p>
            <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
              <span>{q.tag}</span>
              <span>{q.source}</span>
              <span>{q.date}</span>
            </div>
          </div>
        ))}
        <div className="text-center mt-4">
          {/* Replace the unlock button with improved version */}
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 bg-transparent hover:bg-blue-50 transition-colors disabled:opacity-50"
            onClick={handleUnlockBrief}
            disabled={isLoadingBrief}
          >
            {isLoadingBrief ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                Loading...
              </>
            ) : (
              <>
                Unlock Full Legal Brief <Download className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {showPricingHint && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 animate-fade-in">
              💡 Full legal briefs are available in our Standard and Strategic tiers
            </div>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Includes 15+ transcript insights, consultation timeline, and legal brief PDF
          </p>
        </div>
      </div>

      {/* Visual Insight Teaser */}
      <div className="mt-8 bg-white shadow rounded p-6">
        <h4 className="font-medium text-sm text-gray-700 mb-2">FPIC Risk Map (Teaser View)</h4>
        <div className="relative bg-gray-200 h-48 rounded-md flex items-center justify-center text-gray-500">
          <AlertTriangle className="w-8 h-8 mr-2" />
          Risk map locked — Available in Strategic Reports only
        </div>
        <div className="text-center mt-2">
          <Button size="sm" variant="secondary" onClick={handlePricingClick} data-section="pricing">
            See Pricing
          </Button>
        </div>
      </div>
    </div>
  )
}
