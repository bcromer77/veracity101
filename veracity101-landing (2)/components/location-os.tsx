"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, TrendingUp, CheckCircle, Zap, Globe } from "lucide-react"

interface CityResult {
  id: string
  name: string
  state: string
  similarity: number
  esgScore: number
  materialityScore: number
  riskLevel: "Low" | "Medium" | "High"
  waterSecurity: number
  fpicRisk: "Low" | "Medium" | "High"
  taxIncentives: string
  population: string
  keyHighlights: string[]
  coordinates: [number, number]
}

const sampleCities: CityResult[] = [
  {
    id: "austin-tx",
    name: "Austin",
    state: "TX",
    similarity: 94,
    esgScore: 78,
    materialityScore: 32,
    riskLevel: "Medium",
    waterSecurity: 72,
    fpicRisk: "Low",
    taxIncentives: "QOZ + State Tech Credits",
    population: "965K",
    keyHighlights: ["Strong tech ecosystem", "Growing talent pool", "Moderate water stress"],
    coordinates: [-97.7431, 30.2672],
  },
  {
    id: "denver-co",
    name: "Denver",
    state: "CO",
    similarity: 89,
    esgScore: 82,
    materialityScore: 28,
    riskLevel: "Low",
    waterSecurity: 68,
    fpicRisk: "Medium",
    taxIncentives: "Enterprise Zone + Green Credits",
    population: "715K",
    keyHighlights: ["Excellent infrastructure", "Strong regulatory framework", "Some tribal consultation gaps"],
    coordinates: [-104.9903, 39.7392],
  },
  {
    id: "raleigh-nc",
    name: "Raleigh",
    state: "NC",
    similarity: 87,
    esgScore: 75,
    materialityScore: 24,
    riskLevel: "Low",
    waterSecurity: 85,
    fpicRisk: "Low",
    taxIncentives: "Research Triangle Credits",
    population: "474K",
    keyHighlights: ["Research Triangle proximity", "Excellent water security", "Stable permitting"],
    coordinates: [-78.6382, 35.7796],
  },
  {
    id: "phoenix-az",
    name: "Phoenix",
    state: "AZ",
    similarity: 76,
    esgScore: 62,
    materialityScore: 45,
    riskLevel: "High",
    waterSecurity: 34,
    fpicRisk: "High",
    taxIncentives: "QOZ Available",
    population: "1.7M",
    keyHighlights: ["Large market size", "Critical water constraints", "Tribal consultation issues"],
    coordinates: [-112.074, 33.4484],
  },
]

export default function LocationOS() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<CityResult[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [animationStep, setAnimationStep] = useState(0)

  // Simulate vector search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setAnimationStep(1)

    // Simulate AI processing steps
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAnimationStep(2)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAnimationStep(3)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show results
    setResults(sampleCities)
    setIsSearching(false)
    setAnimationStep(0)
  }

  const toggleCitySelection = (cityId: string) => {
    setSelectedCities((prev) => (prev.includes(cityId) ? prev.filter((id) => id !== cityId) : [...prev, cityId]))
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const processingSteps = [
    { step: 1, text: "Vectorizing search query...", icon: "🔍" },
    { step: 2, text: "Comparing against 100+ cities...", icon: "🏙️" },
    { step: 3, text: "Ranking by similarity & risk factors...", icon: "📊" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                <span className="text-teal-600">Location</span>
                <span className="text-blue-600">OS</span>
              </h1>
              <p className="text-sm text-gray-500">Vector Search Engine</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered city comparison using semantic search across 100+ municipalities. Find cities similar to your
            requirements using natural language.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="max-w-4xl mx-auto mb-12 border-2 border-gray-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">Semantic City Search</CardTitle>
            <p className="text-center text-gray-600">Describe your ideal location in natural language</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <Input
                    placeholder="e.g., 'Tech-friendly city with good water security, low FPIC risk, and strong infrastructure'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 h-16 text-lg border-2 border-gray-200 focus:border-teal-500 rounded-xl"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || isSearching}
                  className="h-16 px-8 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-xl text-lg font-semibold"
                >
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Vector Search
                    </>
                  )}
                </Button>
              </div>

              {/* Sample Queries */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Try:</span>
                {[
                  "Manufacturing hub with water security",
                  "Low-risk tech corridor",
                  "Green energy friendly cities",
                ].map((query) => (
                  <Button
                    key={query}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(query)}
                    className="text-xs border-gray-300 hover:border-teal-500 rounded-full"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Animation */}
        {isSearching && (
          <Card className="max-w-2xl mx-auto mb-8 border-2 border-teal-200 bg-teal-50">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h3 className="text-2xl font-bold text-teal-800">Processing Vector Search...</h3>

                <div className="space-y-4">
                  {processingSteps.map((item) => (
                    <div
                      key={item.step}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        animationStep >= item.step
                          ? "bg-white border border-teal-200 text-teal-800"
                          : "bg-teal-100 text-teal-600"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                      {animationStep >= item.step && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {results.length > 0 && !isSearching && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Found {results.length} Similar Cities</h3>
              <p className="text-gray-600">Ranked by semantic similarity to your query • Click to compare</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {results.map((city, index) => (
                <Card
                  key={city.id}
                  className={`border-2 transition-all cursor-pointer hover:shadow-xl ${
                    selectedCities.includes(city.id)
                      ? "border-teal-300 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleCitySelection(city.id)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-teal-600" />
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900">
                            {city.name}, {city.state}
                          </CardTitle>
                          <p className="text-sm text-gray-600">Population: {city.population}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">{city.similarity}%</div>
                        <p className="text-xs text-gray-500">Similarity</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{city.esgScore}/100</div>
                        <p className="text-xs text-gray-600">ESG Score</p>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{city.waterSecurity}%</div>
                        <p className="text-xs text-gray-600">Water Security</p>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{city.materialityScore}</div>
                        <p className="text-xs text-gray-600">Materiality</p>
                      </div>
                    </div>

                    {/* Risk Badges */}
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`${getRiskColor(city.riskLevel)} border text-xs px-2 py-1`}>
                        Overall: {city.riskLevel}
                      </Badge>
                      <Badge className={`${getRiskColor(city.fpicRisk)} border text-xs px-2 py-1`}>
                        FPIC: {city.fpicRisk}
                      </Badge>
                    </div>

                    {/* Tax Incentives */}
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Tax Incentives</p>
                      <p className="text-sm text-green-700">{city.taxIncentives}</p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-800">Key Highlights:</p>
                      <div className="space-y-1">
                        {city.keyHighlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-teal-600 rounded-full"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedCities.includes(city.id) && (
                      <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg animate-fade-in">
                        <p className="text-sm font-medium text-teal-800">✓ Selected for Comparison</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Actions */}
            {selectedCities.length > 0 && (
              <div className="text-center space-y-4 p-6 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-900">
                  {selectedCities.length} Cities Selected for Comparison
                </h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-lg px-8 py-3 rounded-xl">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Generate Comparison Report - ${selectedCities.length * 400}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-teal-500 px-8 py-3 rounded-xl bg-transparent"
                    onClick={() => setSelectedCities([])}
                  >
                    Clear Selection
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Side-by-side analysis • Risk comparison matrix • Investment recommendations
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && !isSearching && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Search</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter your location requirements above to find similar cities using our AI-powered vector search engine.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
