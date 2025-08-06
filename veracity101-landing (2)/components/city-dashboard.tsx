"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Download, Globe, Zap, FileText } from "lucide-react"
import CityScoreCard from "./city-scorecard"
import ImpactStatementExtractor from "./impact-statement-extractor"

export default function CityDashboard() {
  const [selectedCity, setSelectedCity] = useState("chico-ca")

  const cities = [
    { id: "chico-ca", name: "Chico, CA", risk: "High", score: 72 },
    { id: "buffalo-ny", name: "Buffalo, NY", risk: "Medium", score: 68 },
    { id: "phoenix-az", name: "Phoenix, AZ", risk: "High", score: 62 },
    { id: "atlanta-ga", name: "Atlanta, GA", risk: "Medium", score: 74 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              <span className="text-teal-600">Veracity</span>
              <span className="text-blue-600">101</span> Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            World-class city intelligence for $100M+ investment decisions. Materiality scoring meets Bloomberg-grade
            analytics.
          </p>
        </div>

        {/* City Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {cities.map((city) => (
              <Button
                key={city.id}
                variant={selectedCity === city.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-xl ${
                  selectedCity === city.id
                    ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white"
                    : "border-2 border-gray-300 hover:border-teal-500"
                }`}
                onClick={() => setSelectedCity(city.id)}
              >
                {city.name}
                <Badge
                  className={`ml-2 ${
                    city.risk === "High"
                      ? "bg-red-100 text-red-800"
                      : city.risk === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {city.score}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="scorecard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="scorecard"
              className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <FileText className="w-4 h-4" />
              City Scorecard
            </TabsTrigger>
            <TabsTrigger
              value="calculator"
              className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Zap className="w-4 h-4" />
              Materiality Calculator
            </TabsTrigger>
            <TabsTrigger
              value="extractor"
              className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              Impact Extractor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scorecard" className="space-y-8">
            <CityScoreCard
              city={cities.find((c) => c.id === selectedCity)?.name}
              data={{
                esgScore: cities.find((c) => c.id === selectedCity)?.score || 72,
                materialityScore: selectedCity === "chico-ca" ? 28 : selectedCity === "buffalo-ny" ? 24 : 32,
                materialityStatus: "Material",
                fpicStatus: selectedCity === "chico-ca" ? "High litigation risk" : "Medium consultation gaps",
                fpicDetails:
                  selectedCity === "chico-ca"
                    ? "Tribal consultation bypassed in 2023"
                    : "Some delays in tribal outreach",
                transcriptSignal:
                  selectedCity === "chico-ca"
                    ? "Protest over pipeline expansion (Feb 2024)"
                    : "Union negotiations ongoing",
                waterSecurity: selectedCity === "phoenix-az" ? "Critical" : "Medium",
                waterDetails:
                  selectedCity === "phoenix-az"
                    ? "Moratorium on new permits"
                    : "Reservoir delayed, 2040 projections weak",
                taxBenefit: "Tier 1 QOZ + State incentives",
                permitFriction: selectedCity === "buffalo-ny" ? "6-month average delay" : "9-month average delay",
                growthForecast: {
                  population: 3.8,
                  taxBase: 6.4,
                },
                reportPrice: 1200,
              }}
            />
          </TabsContent>

          <TabsContent value="calculator" className="space-y-8">
            <Card className="border-2 border-gray-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Materiality Calculator</CardTitle>
                <p className="text-lg text-gray-600">
                  Calculate materiality scores using our proprietary formula: Scale × Scope × Irremediability ×
                  Likelihood
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-bold text-gray-900 text-lg">Input Parameters</h4>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Scale Impact (0-10)</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          defaultValue="7.2"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Minimal</span>
                          <span className="font-semibold">7.2</span>
                          <span>Severe</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Scope Reach (0-10)</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          defaultValue="6.8"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Local</span>
                          <span className="font-semibold">6.8</span>
                          <span>Regional</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Irremediability (0-10)</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          defaultValue="5.4"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Reversible</span>
                          <span className="font-semibold">5.4</span>
                          <span>Permanent</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Likelihood (0-10)</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          defaultValue="8.1"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Unlikely</span>
                          <span className="font-semibold">8.1</span>
                          <span>Certain</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold text-gray-900 text-lg">Calculated Results</h4>

                    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-200">
                      <div className="text-center mb-4">
                        <div className="text-5xl font-bold text-teal-600 mb-2">28</div>
                        <p className="text-teal-800 font-semibold">Materiality Score</p>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-teal-700">Scale (7.2)</span>
                          <span className="font-semibold text-teal-800">High Impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-teal-700">Scope (6.8)</span>
                          <span className="font-semibold text-teal-800">Regional</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-teal-700">Irremediability (5.4)</span>
                          <span className="font-semibold text-teal-800">Moderate</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-teal-700">Likelihood (8.1)</span>
                          <span className="font-semibold text-teal-800">Very Likely</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-orange-800">Material Impact Detected</span>
                      </div>
                      <p className="text-orange-700 text-sm">
                        Score above 25 indicates material impact requiring disclosure and risk mitigation strategies.
                      </p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-lg py-3 rounded-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Export Calculation Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extractor" className="space-y-8">
            <ImpactStatementExtractor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
