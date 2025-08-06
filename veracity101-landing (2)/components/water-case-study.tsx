"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Droplets,
  AlertTriangle,
  MapPin,
  Calendar,
  Scale,
  Download,
  ExternalLink,
  Zap,
  Globe,
  TrendingDown,
  Users,
  Building,
  FileText,
  Clock,
} from "lucide-react"

interface LegalClaim {
  id: string
  jurisdiction: string
  topic: string
  summary: string
  parties: { plaintiff: string; defendant: string }
  status: "Filed" | "Active" | "Resolved"
  upstreamImpact?: boolean
  url?: string
}

interface CityRisk {
  name: string
  state: string
  waterDependency: number
  riskLevel: "Critical" | "High" | "Medium" | "Low"
  keyThreats: string[]
  olympicsImpact?: boolean
}

const timelineEvents = [
  {
    year: 1922,
    title: "Colorado River Compact",
    description: "Allocated 7.5 MAF each to Upper and Lower Basin states",
    impact: "Overestimated flows at 16.4 MAF; actual flows average 12.3 MAF",
    status: "foundational",
  },
  {
    year: 1928,
    title: "Boulder Canyon Project Act",
    description: "Authorized Hoover Dam construction",
    impact: "Allocated 4.4 MAF to California, 2.8 MAF to Arizona, 0.3 MAF to Nevada",
    status: "foundational",
  },
  {
    year: 1963,
    title: "Arizona v. California",
    description: "Supreme Court affirmed Lower Basin allocations",
    impact: "Enabled Central Arizona Project, solidified water rights",
    status: "foundational",
  },
  {
    year: 2007,
    title: "Interim Guidelines",
    description: "Shortage management based on Lake Mead levels",
    impact: "Cuts triggered at 1,075 feet elevation",
    status: "expiring",
  },
  {
    year: 2019,
    title: "Drought Contingency Plan",
    description: "Voluntary water cuts agreement",
    impact: "Temporary relief, expires 2026",
    status: "expiring",
  },
  {
    year: 2025,
    title: "Nebraska vs. Colorado",
    description: "South Platte River water rights lawsuit",
    impact: "Warning sign for Colorado River interstate disputes",
    status: "active",
  },
  {
    year: 2026,
    title: "Guidelines Expiration",
    description: "Current water management agreements end",
    impact: "Potential legal chaos without new agreements",
    status: "critical",
  },
  {
    year: 2027,
    title: "Dead Pool Projection",
    description: "Lake Mead could drop below 895 feet",
    impact: "Hoover Dam unable to generate power or supply water",
    status: "critical",
  },
]

const cityRisks: CityRisk[] = [
  {
    name: "Las Vegas",
    state: "NV",
    waterDependency: 90,
    riskLevel: "Critical",
    keyThreats: [
      "90% reliant on Lake Mead",
      "Dead pool at 895 feet eliminates supply",
      "Power grid disruption from Hoover Dam",
    ],
  },
  {
    name: "Los Angeles",
    state: "CA",
    waterDependency: 65,
    riskLevel: "Critical",
    keyThreats: ["2028 Olympics water demands", "Colorado River Aqueduct dependency", "Global embarrassment risk"],
    olympicsImpact: true,
  },
  {
    name: "Phoenix",
    state: "AZ",
    waterDependency: 75,
    riskLevel: "High",
    keyThreats: ["Central Arizona Project reliance", "Industrial water needs", "Urban growth pressures"],
  },
  {
    name: "San Diego",
    state: "CA",
    waterDependency: 55,
    riskLevel: "High",
    keyThreats: ["Aqueduct supply cuts", "Desalination plant limitations", "Population growth demands"],
  },
]

const riskFactors = [
  {
    category: "Interstate Disputes",
    probability: 85,
    severity: 9,
    description: "Post-2026 guideline failures could trigger Supreme Court battles",
  },
  {
    category: "Tribal Claims",
    probability: 70,
    severity: 8,
    description: "30 tribes hold 3.2 MAF in rights with infrastructure gaps",
  },
  {
    category: "Environmental Lawsuits",
    probability: 60,
    severity: 7,
    description: "Endangered Species Act could force ecological releases",
  },
  {
    category: "Power Grid Failure",
    probability: 40,
    severity: 10,
    description: "Hoover Dam power loss would destabilize regional grids",
  },
  {
    category: "International Disputes",
    probability: 50,
    severity: 6,
    description: "Mexico treaty violations over water quality issues",
  },
]

const legalClaims: LegalClaim[] = [
  {
    id: "NE-CO-2025",
    jurisdiction: "U.S. Supreme Court",
    topic: "Water Rights",
    summary: "Nebraska sues Colorado over South Platte River diversions, alleging 1.3 MAF annual loss",
    parties: { plaintiff: "State of Nebraska", defendant: "State of Colorado" },
    status: "Active",
    upstreamImpact: true,
    url: "https://nebraskaexaminer.com/2025/07/16/nebraska-sues-colorado-over-south-platte-river-water-rights-perkins-county-canal/",
  },
  {
    id: "NAVAJO-2023",
    jurisdiction: "U.S. Supreme Court",
    topic: "Tribal Rights",
    summary: "Navajo Nation water rights claim rejected, but legislative efforts continue",
    parties: { plaintiff: "Navajo Nation", defendant: "United States" },
    status: "Resolved",
    upstreamImpact: false,
  },
]

export default function WaterCaseStudy() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [lakeMeadLevel, setLakeMeadLevel] = useState(1061.56)
  const [activeTab, setActiveTab] = useState("overview")

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-green-100 text-green-800 border-green-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500"
      case "expiring":
        return "bg-orange-500"
      case "active":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Droplets className="w-4 h-4" />
          Case Study: Water Crisis Intelligence
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">You Can't Negotiate with Water</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          The risk of 895 feet and the existential threat of shared basin risk. How the Colorado River crisis threatens
          40 million people, the 2028 Olympics, and century-old legal compacts.
        </p>

        {/* Critical Stats */}
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">895 ft</div>
            <p className="text-sm text-gray-600">Dead Pool Level</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">40M</div>
            <p className="text-sm text-gray-600">People at Risk</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">2026</div>
            <p className="text-sm text-gray-600">Agreements Expire</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">1,061 ft</div>
            <p className="text-sm text-gray-600">Current Lake Mead</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="overview" className="flex items-center gap-2 px-4 py-3 rounded-lg">
            <Globe className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2 px-4 py-3 rounded-lg">
            <Calendar className="w-4 h-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="cities" className="flex items-center gap-2 px-4 py-3 rounded-lg">
            <Building className="w-4 h-4" />
            Cities at Risk
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2 px-4 py-3 rounded-lg">
            <Scale className="w-4 h-4" />
            Legal Analysis
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2 px-4 py-3 rounded-lg">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <TrendingDown className="w-5 h-5" />
                  The Crisis Unfolds
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Dead Pool Scenario</h4>
                    <p className="text-red-700 text-sm">
                      Lake Mead dropping below 895 feet would halt Hoover Dam's water delivery and power generation,
                      affecting Las Vegas (90% dependent), Los Angeles (2028 Olympics), and millions across the
                      Southwest.
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Legal Compact Crisis</h4>
                    <p className="text-orange-700 text-sm">
                      The 1922 Colorado River Compact, based on optimistic flow estimates of 16.4 MAF, faces reality:
                      actual flows average only 12.3 MAF (2000-2021).
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Nebraska Warning</h4>
                    <p className="text-yellow-700 text-sm">
                      The 2025 Nebraska vs. Colorado lawsuit over South Platte River rights serves as a cautionary tale
                      for Colorado River states facing post-2026 negotiations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <AlertTriangle className="w-5 h-5" />
                  Risk Assessment Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 text-sm">{risk.category}</h5>
                        <p className="text-xs text-gray-600 mt-1">{risk.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{risk.probability}%</div>
                          <div className="text-xs text-gray-500">Probability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">{risk.severity}/10</div>
                          <div className="text-xs text-gray-500">Severity</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-8">
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Law of the River: 1922-2027
              </CardTitle>
              <p className="text-gray-600">Interactive timeline of Colorado River legal framework</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(event.status)} mt-1`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-900">{event.year}</span>
                        <Badge variant="outline" className={`${getStatusColor(event.status)} text-white border-0`}>
                          {event.status}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                      <p className="text-gray-700 text-sm mb-2">{event.description}</p>
                      <p className="text-gray-600 text-xs italic">{event.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cities at Risk Tab */}
        <TabsContent value="cities" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {cityRisks.map((city, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-xl">
                          {city.name}, {city.state}
                        </CardTitle>
                        {city.olympicsImpact && (
                          <Badge className="bg-gold-100 text-gold-800 border-gold-300 mt-1">
                            🏅 2028 Olympics Host
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge className={`${getRiskColor(city.riskLevel)} border text-sm px-3 py-1`}>
                      {city.riskLevel} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Water Dependency</span>
                        <span className="text-sm font-bold text-blue-600">{city.waterDependency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${city.waterDependency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900">Key Threats:</h5>
                    {city.keyThreats.map((threat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                        {threat}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Legal Analysis Tab */}
        <TabsContent value="legal" className="space-y-8">
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Active Legal Claims & Precedents
              </CardTitle>
              <p className="text-gray-600">Interstate water disputes and tribal rights litigation</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {legalClaims.map((claim, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-300">{claim.topic}</Badge>
                          <Badge
                            className={`${
                              claim.status === "Active"
                                ? "bg-orange-100 text-orange-800 border-orange-300"
                                : claim.status === "Filed"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                  : "bg-green-100 text-green-800 border-green-300"
                            }`}
                          >
                            {claim.status}
                          </Badge>
                          {claim.upstreamImpact && (
                            <Badge className="bg-red-100 text-red-800 border-red-300">Upstream Impact</Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{claim.jurisdiction}</h4>
                        <p className="text-gray-700 text-sm mb-2">{claim.summary}</p>
                        <p className="text-gray-600 text-xs">
                          {claim.parties.plaintiff} vs {claim.parties.defendant}
                        </p>
                      </div>
                    </div>
                    {claim.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 bg-transparent"
                        onClick={() => window.open(claim.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Case Details
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200 hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-green-900">Las Vegas Crisis Report</CardTitle>
                <p className="text-green-700 text-sm">Dead pool scenario analysis</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span>90% water dependency analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span>Power grid impact assessment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>Population displacement risks</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">$1,299</div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Purchase Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="text-blue-900">2028 Olympics Impact</CardTitle>
                <p className="text-blue-700 text-sm">Los Angeles water security</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Global reputation risks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-gray-600" />
                    <span>Infrastructure stress analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span>Emergency contingency plans</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">$1,599</div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Purchase Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-purple-900">Tribal Rights Analysis</CardTitle>
                <p className="text-purple-700 text-sm">30 tribes, 3.2 MAF at stake</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Scale className="w-4 h-4 text-purple-600" />
                    <span>Unresolved claims analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-green-600" />
                    <span>FPIC consultation gaps</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Legislative tracking (S.953/H.R.2025)</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-2">$999</div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Purchase Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Water Crisis Intelligence Package</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get all three reports plus exclusive access to our interactive risk dashboard, real-time legal updates,
                and quarterly briefings on Colorado River developments.
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-400 line-through">$3,897</span>
                <span className="text-4xl font-bold text-green-600">$2,999</span>
                <Badge className="bg-green-100 text-green-800 border-green-300">Save $898</Badge>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-8 py-4"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Complete Package
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
