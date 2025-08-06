"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Download, TrendingUp } from "lucide-react"

interface CityScoreCardProps {
  city?: string
  data?: any
}

export default function CityScoreCard({
  city = "Chico, California",
  data = {
    esgScore: 72,
    materialityScore: 28,
    materialityStatus: "Material",
    fpicStatus: "High litigation risk",
    fpicDetails: "Tribal consultation bypassed in 2023",
    transcriptSignal: "Protest over pipeline expansion (Feb 2024)",
    waterSecurity: "Medium",
    waterDetails: "Reservoir delayed, 2040 projections weak",
    taxBenefit: "Tier 1 QOZ + CA green infra credits",
    permitFriction: "9-month average delay",
    growthForecast: {
      population: 3.8,
      taxBase: 6.4,
    },
    reportPrice: 1200,
  },
}: CityScoreCardProps) {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="max-w-4xl mx-auto border-2 border-gray-200 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{city}</CardTitle>
            <div className="flex items-center gap-4">
              <Badge
                className={`${data.materialityStatus === "Material" ? "bg-orange-100 text-orange-800 border-orange-200" : "bg-green-100 text-green-800 border-green-200"} border text-sm px-3 py-1`}
              >
                {data.materialityStatus === "Material" ? "✅ Material" : "❌ Not Material"} (Score:{" "}
                {data.materialityScore})
              </Badge>
              <div className={`text-2xl font-bold ${getScoreColor(data.esgScore)}`}>ESG: {data.esgScore}/100</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Report Price</div>
            <div className="text-3xl font-bold text-teal-600">${data.reportPrice.toLocaleString()}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Risk Factors */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Risk Assessment</h4>

              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-800 text-sm">FPIC Status</p>
                      <p className="text-red-700 font-medium">{data.fpicStatus}</p>
                      <p className="text-red-600 text-sm mt-1">{data.fpicDetails}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-yellow-800 text-sm">Transcript Signal</p>
                      <p className="text-yellow-700 font-medium">{data.transcriptSignal}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-800 text-sm">Water Security</p>
                      <p className="text-blue-700 font-medium">{data.waterSecurity}</p>
                      <p className="text-blue-600 text-sm mt-1">{data.waterDetails}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-orange-800 text-sm">Permit Friction</p>
                      <p className="text-orange-700 font-medium">⚠️ {data.permitFriction}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Opportunities & Metrics */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Opportunities</h4>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 text-sm">Tax Benefits</p>
                    <p className="text-green-700 font-medium">{data.taxBenefit}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-4">3-Year Growth Forecast</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Population Growth</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">{data.growthForecast.population}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Tax Base Growth</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">{data.growthForecast.taxBase}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
              <h5 className="font-semibold text-teal-800 mb-3">Materiality Breakdown</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-teal-700">Scale Impact</span>
                  <span className="font-semibold text-teal-800">7.2/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-700">Scope Reach</span>
                  <span className="font-semibold text-teal-800">6.8/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-700">Irremediability</span>
                  <span className="font-semibold text-teal-800">5.4/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-700">Likelihood</span>
                  <span className="font-semibold text-teal-800">8.1/10</span>
                </div>
                <div className="border-t border-teal-300 pt-2 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-teal-800">Final Score</span>
                    <span className="font-bold text-teal-900">{data.materialityScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex gap-4">
            <Button className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-lg py-3 rounded-xl">
              <Download className="w-5 h-5 mr-2" />
              Download Full Report - ${data.reportPrice.toLocaleString()}
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg border-2 border-gray-300 hover:border-teal-500 rounded-xl bg-transparent"
            >
              Compare with: Davis, CA → Fresno, CA
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
