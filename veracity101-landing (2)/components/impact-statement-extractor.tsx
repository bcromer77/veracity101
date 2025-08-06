"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, AlertTriangle, XCircle, CheckCircle, Download, Calendar, Tag } from "lucide-react"

interface ImpactStatement {
  id: string
  statement: string
  category: "Infrastructure" | "Water Risk" | "FPIC Violation" | "Environmental" | "Labor" | "Regulatory"
  severity: "Low" | "Medium" | "High"
  fpicRisk: "Low" | "Medium" | "High"
  scoreImpact: number
  date: string
  source: string
  selected: boolean
}

const sampleStatements: Record<string, ImpactStatement[]> = {
  "buffalo-ny": [
    {
      id: "1",
      statement: "Water treatment upgrades postponed to 2028",
      category: "Infrastructure",
      severity: "Medium",
      fpicRisk: "Low",
      scoreImpact: 3,
      date: "2024-01-15",
      source: "City Council Meeting #2024-003",
      selected: false,
    },
    {
      id: "2",
      statement: "No community consultation for lithium corridor vote",
      category: "FPIC Violation",
      severity: "High",
      fpicRisk: "High",
      scoreImpact: 6,
      date: "2024-02-08",
      source: "Planning Commission Minutes",
      selected: false,
    },
    {
      id: "3",
      statement: "Sewer bond blocked in budget committee",
      category: "Infrastructure",
      severity: "High",
      fpicRisk: "Low",
      scoreImpact: 4,
      date: "2024-01-22",
      source: "Budget Committee Transcript",
      selected: false,
    },
    {
      id: "4",
      statement: "Union strike authorization vote scheduled for Q2",
      category: "Labor",
      severity: "High",
      fpicRisk: "Low",
      scoreImpact: 5,
      date: "2024-03-01",
      source: "Labor Relations Board",
      selected: false,
    },
  ],
  "chico-ca": [
    {
      id: "1",
      statement: "Tribal consultation bypassed for pipeline expansion",
      category: "FPIC Violation",
      severity: "High",
      fpicRisk: "High",
      scoreImpact: 8,
      date: "2023-11-12",
      source: "Environmental Impact Report",
      selected: false,
    },
    {
      id: "2",
      statement: "Water reservoir construction delayed indefinitely",
      category: "Water Risk",
      severity: "High",
      fpicRisk: "Medium",
      scoreImpact: 6,
      date: "2024-01-08",
      source: "Water Board Meeting Minutes",
      selected: false,
    },
    {
      id: "3",
      statement: "Protest over pipeline expansion disrupts council meeting",
      category: "Environmental",
      severity: "Medium",
      fpicRisk: "High",
      scoreImpact: 4,
      date: "2024-02-14",
      source: "City Council Session #2024-007",
      selected: false,
    },
  ],
}

export default function ImpactStatementExtractor() {
  const [cityQuery, setCityQuery] = useState("")
  const [statements, setStatements] = useState<ImpactStatement[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState("2023-01-01 to 2024-03-31")

  const handleSearch = () => {
    if (!cityQuery.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const cityKey = cityQuery.toLowerCase().replace(/[^a-z]/g, "-")
      const foundStatements = sampleStatements[cityKey] || []
      setStatements(foundStatements)
      setIsLoading(false)
    }, 2000)
  }

  const toggleStatement = (id: string) => {
    setStatements((prev) => prev.map((stmt) => (stmt.id === id ? { ...stmt, selected: !stmt.selected } : stmt)))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Infrastructure":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Water Risk":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "FPIC Violation":
        return "bg-red-100 text-red-800 border-red-200"
      case "Environmental":
        return "bg-green-100 text-green-800 border-green-200"
      case "Labor":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Regulatory":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "Medium":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "Low":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const selectedCount = statements.filter((s) => s.selected).length
  const totalScoreImpact = statements.filter((s) => s.selected).reduce((sum, s) => sum + s.scoreImpact, 0)

  return (
    <Card className="max-w-6xl mx-auto border-2 border-gray-200 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <CardTitle className="text-3xl font-bold text-gray-900 mb-4">City Impact Statement Extractor</CardTitle>
        <p className="text-lg text-gray-600 mb-6">
          AI-powered analysis of council transcripts, Indigenous radio, and permitting logs
        </p>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Enter city name (e.g., Buffalo, NY or Chico, CA)"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              className="h-12 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={!cityQuery.trim() || isLoading}
            className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-lg font-semibold"
          >
            <Search className="w-5 h-5 mr-2" />
            {isLoading ? "Analyzing..." : "Extract Statements"}
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Date Range: {dateRange}</span>
          </div>
          {statements.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>{statements.length} statements found</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {isLoading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Extracting Impact Statements...</h4>
            <div className="max-w-md mx-auto space-y-2 text-gray-600">
              <p>🔍 Parsing council transcripts and meeting minutes</p>
              <p>📻 Analyzing Indigenous radio broadcasts</p>
              <p>📋 Processing permitting logs and regulatory filings</p>
              <p>🤖 Applying ESG categorization and risk scoring</p>
            </div>
          </div>
        )}

        {!isLoading && statements.length === 0 && cityQuery && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">No statements found</h4>
            <p className="text-gray-600">Try searching for "Buffalo, NY" or "Chico, CA" to see sample results.</p>
          </div>
        )}

        {!isLoading && statements.length === 0 && !cityQuery && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to Extract Impact Statements</h4>
            <p className="text-gray-600">
              Enter a city name above to analyze council transcripts and regulatory filings.
            </p>
          </div>
        )}

        {!isLoading && statements.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900">Extracted Statements for {cityQuery}</h4>
              {selectedCount > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {selectedCount} selected • Impact Score: +{totalScoreImpact}
                  </span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Download className="w-4 h-4 mr-2" />
                    Add to Report
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {statements.map((statement) => (
                <div
                  key={statement.id}
                  className={`p-6 border-2 rounded-xl transition-all cursor-pointer ${
                    statement.selected
                      ? "border-purple-300 bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  onClick={() => toggleStatement(statement.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={statement.selected}
                        onChange={() => toggleStatement(statement.id)}
                        className="w-5 h-5 text-purple-600 rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-lg font-medium text-gray-900 leading-relaxed">🗣️ "{statement.statement}"</p>
                        <div className="flex items-center gap-2 ml-4">
                          {getSeverityIcon(statement.severity)}
                          <span className="text-sm font-semibold text-gray-700">
                            Score Impact: +{statement.scoreImpact}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`${getCategoryColor(statement.category)} border text-sm px-3 py-1`}>
                          {statement.category}
                        </Badge>
                        <Badge
                          className={`${
                            statement.severity === "High"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : statement.severity === "Medium"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-green-100 text-green-800 border-green-200"
                          } border text-sm px-3 py-1`}
                        >
                          {statement.severity} Severity
                        </Badge>
                        <Badge
                          className={`${
                            statement.fpicRisk === "High"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : statement.fpicRisk === "Medium"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-green-100 text-green-800 border-green-200"
                          } border text-sm px-3 py-1`}
                        >
                          FPIC Risk: {statement.fpicRisk}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📅 {new Date(statement.date).toLocaleDateString()}</span>
                        <span>📄 {statement.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCount > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-purple-800 mb-1">{selectedCount} statements selected for analysis</h5>
                    <p className="text-purple-700">
                      Combined impact score: +{totalScoreImpact} points • Estimated report enhancement: $
                      {selectedCount * 150}
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Download className="w-5 h-5 mr-2" />
                    Generate Enhanced Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
