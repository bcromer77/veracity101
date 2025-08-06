"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Zap } from "lucide-react"

export default function CityImpactCalculator() {
  const [calculatorStep, setCalculatorStep] = useState(1)
  const [selectedCity, setSelectedCity] = useState("")
  const [calculatorResults, setCalculatorResults] = useState(null)

  const handleCalculate = () => {
    if (!selectedCity) return

    setCalculatorStep(2)
    // Simulate calculation
    setTimeout(() => {
      setCalculatorResults({
        city: selectedCity,
        materialityScore: Math.floor(Math.random() * 40) + 20,
        esgScore: Math.floor(Math.random() * 30) + 60,
        riskLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        waterSecurity: Math.floor(Math.random() * 40) + 40,
        fpicRisk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        infrastructureScore: Math.floor(Math.random() * 30) + 60,
      })
      setCalculatorStep(3)
    }, 3000)
  }

  const resetCalculator = () => {
    setCalculatorStep(1)
    setSelectedCity("")
    setCalculatorResults(null)
  }

  const getCityDisplayName = (cityKey: string) => {
    const cityMap = {
      "chico-ca": "Chico, California",
      "buffalo-ny": "Buffalo, New York",
      "phoenix-az": "Phoenix, Arizona",
      "atlanta-ga": "Atlanta, Georgia",
      "austin-tx": "Austin, Texas",
      "denver-co": "Denver, Colorado",
    }
    return cityMap[cityKey] || cityKey
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-10 h-10 text-teal-600" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">City Impact Rating Calculator</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get a preview of our proprietary materiality scoring system used by Fortune 500 executives
        </p>
      </div>

      {/* Step 1: City Selection */}
      {calculatorStep === 1 && (
        <Card className="max-w-4xl mx-auto border-2 border-gray-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">Select a City to Analyze</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">Choose a city:</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select a city...</option>
                  <option value="chico-ca">Chico, California</option>
                  <option value="buffalo-ny">Buffalo, New York</option>
                  <option value="phoenix-az">Phoenix, Arizona</option>
                  <option value="atlanta-ga">Atlanta, Georgia</option>
                  <option value="austin-tx">Austin, Texas</option>
                  <option value="denver-co">Denver, Colorado</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200">
                  <h4 className="font-bold text-teal-800 mb-3">What We Analyze</h4>
                  <div className="space-y-2 text-sm text-teal-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Council transcript sentiment analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Water security & infrastructure scoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>FPIC legal exposure assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>ESG materiality impact modeling</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Materiality Formula</h4>
                  <div className="text-sm text-blue-700 space-y-2">
                    <div className="font-mono bg-white p-3 rounded border text-center">
                      Score = Scale × Scope × Irremediability × Likelihood
                    </div>
                    <p className="text-center">Based on Upright methodology, adapted for municipal risk assessment</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-xl py-4 rounded-xl shadow-lg"
                disabled={!selectedCity}
                onClick={handleCalculate}
              >
                Calculate Impact Rating
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Loading */}
      {calculatorStep === 2 && (
        <Card className="max-w-4xl mx-auto border-2 border-gray-200 shadow-xl">
          <CardContent className="p-16">
            <div className="text-center">
              <div className="w-24 h-24 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
              <h4 className="text-3xl font-bold text-gray-900 mb-6">Analyzing {getCityDisplayName(selectedCity)}...</h4>
              <div className="max-w-md mx-auto space-y-4 text-lg text-gray-600">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Processing council transcripts</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Calculating water security metrics</span>
                  <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Assessing FPIC legal exposure</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Computing materiality score</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Results */}
      {calculatorStep === 3 && calculatorResults && (
        <div className="space-y-8">
          <Card className="max-w-6xl mx-auto border-2 border-gray-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200">
              <div className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  {getCityDisplayName(selectedCity)} Impact Rating
                </CardTitle>
                <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Analysis Complete
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200">
                  <div className="text-4xl font-bold text-teal-600 mb-2">{calculatorResults.materialityScore}</div>
                  <p className="text-teal-800 font-semibold">Materiality Score</p>
                  <p className="text-sm text-teal-600 mt-1">
                    {calculatorResults.materialityScore > 30 ? "Material" : "Not Material"}
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{calculatorResults.esgScore}/100</div>
                  <p className="text-blue-800 font-semibold">ESG Score</p>
                  <p className="text-sm text-blue-600 mt-1">
                    {calculatorResults.esgScore > 75 ? "Excellent" : calculatorResults.esgScore > 60 ? "Good" : "Fair"}
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{calculatorResults.riskLevel}</div>
                  <p className="text-purple-800 font-semibold">Overall Risk</p>
                  <p className="text-sm text-purple-600 mt-1">Investment Grade</p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h5 className="font-bold text-gray-900 mb-4 text-lg">Key Metrics Preview</h5>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Water Security</span>
                      <span className="font-semibold">{calculatorResults.waterSecurity}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${calculatorResults.waterSecurity}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Infrastructure Score</span>
                      <span className="font-semibold">{calculatorResults.infrastructureScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${calculatorResults.infrastructureScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-yellow-800">FPIC Risk: {calculatorResults.fpicRisk}</p>
                      <p className="text-yellow-700 text-sm">
                        {calculatorResults.fpicRisk === "High"
                          ? "Tribal consultation gaps identified in recent permits"
                          : calculatorResults.fpicRisk === "Medium"
                            ? "Some consultation delays noted in council records"
                            : "Strong tribal relations and consultation processes"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teaser Warning */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-red-800 mb-2 text-lg">This is just a preview</h5>
                    <p className="text-red-700 mb-4">
                      The full Veracity101 report includes 50+ additional metrics, council transcript analysis,
                      regulatory timeline projections, and investment-grade risk assessments.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="font-semibold text-red-800">Full Report Includes:</p>
                        <ul className="text-red-700 space-y-1">
                          <li>• Complete transcript sentiment analysis</li>
                          <li>• 3-year regulatory timeline</li>
                          <li>• Permit delay probability modeling</li>
                          <li>• Community stakeholder mapping</li>
                        </ul>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-red-800">Plus:</p>
                        <ul className="text-red-700 space-y-1">
                          <li>• Tax incentive optimization</li>
                          <li>• Labor market deep-dive</li>
                          <li>• Climate risk projections</li>
                          <li>• Executive summary & recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-xl py-4 rounded-xl shadow-lg"
                  onClick={() => {
                    // Scroll to reports section
                    document.querySelector(".grid.lg\\:grid-cols-3")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }}
                >
                  Get Full Intelligence Report - $1,200
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-teal-500 rounded-xl bg-transparent"
                  onClick={resetCalculator}
                >
                  Try Another City
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
