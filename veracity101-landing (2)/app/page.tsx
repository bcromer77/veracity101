"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Globe, FileText, Search, Scale, Droplets, Building } from "lucide-react"

// Import all components
import CityImpactCalculator from "@/components/city-impact-calculator"
import WaterCaseStudy from "@/components/water-case-study"
import ContactPricingDemo from "@/components/contact-pricing-demo"
import LocationOS from "@/components/location-os"
import CityDashboard from "@/components/city-dashboard"
import CityScoreCard from "@/components/city-scorecard"
import ImpactStatementExtractor from "@/components/impact-statement-extractor"
import FPICDashboard from "@/components/fpic-dashboard"
import PricingTiers from "@/components/pricing-tiers"

export default function HomePage() {
  const { toast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = [
        "hero",
        "features",
        "dashboard",
        "vector-search",
        "calculator",
        "case-study",
        "pricing",
        "contact",
      ]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">
                <span className="text-teal-600">Veracity</span>
                <span className="text-blue-600">101</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { id: "dashboard", label: "Dashboard" },
                { id: "vector-search", label: "Vera Search" },
                { id: "calculator", label: "Calculator" },
                { id: "case-study", label: "Case Study" },
                { id: "pricing", label: "Pricing" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                    activeSection === item.id ? "text-teal-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">Cities Talk Big</h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                But the information is in the transcripts, not the brochures. Veracity101 reads council meetings so you
                don't have to believe the marketing.
              </p>

              {/* Cities Talk Big vs Reality */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left side - Cities Promise */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/cities-talk-big.png" alt="Cities Talk Big" className="w-12 h-12 rounded-lg" />
                      <h3 className="text-2xl font-bold text-green-800">Cities Promise:</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-green-700">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>"World-class infrastructure ready for investment"</span>
                      </div>
                      <div className="flex items-center gap-3 text-green-700">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>"Streamlined permitting process"</span>
                      </div>
                      <div className="flex items-center gap-3 text-green-700">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>"Strong community support for development"</span>
                      </div>
                      <div className="flex items-center gap-3 text-green-700">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>"Abundant water resources secured"</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Council Reality */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/council-truth.png" alt="Council Truth" className="w-12 h-12 rounded-lg" />
                      <h3 className="text-2xl font-bold text-red-800">But in council meetings? You hear the truth:</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-red-700 bg-red-100 p-3 rounded-lg">
                        <span className="text-red-600">❌</span>
                        <span>Aging pipes with no replacement plan</span>
                      </div>
                      <div className="flex items-center gap-3 text-red-700 bg-red-100 p-3 rounded-lg">
                        <span className="text-red-600">❌</span>
                        <span>Traffic congestion choking logistics</span>
                      </div>
                      <div className="flex items-center gap-3 text-red-700 bg-red-100 p-3 rounded-lg">
                        <span className="text-red-600">❌</span>
                        <span>Zero community consultation</span>
                      </div>
                      <div className="flex items-center gap-3 text-red-700 bg-red-100 p-3 rounded-lg">
                        <span className="text-red-600">❌</span>
                        <span>Water access stretched to the brink</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("dashboard")}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Building className="w-6 h-6 mr-2" />
                  Try Dashboard
                </Button>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("vector-search")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Search className="w-6 h-6 mr-2" />
                  Vera Search
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("case-study")}
                  className="text-xl px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-teal-500 bg-transparent"
                >
                  <FileText className="w-6 h-6 mr-2" />
                  Case Study
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
                  <p className="text-gray-600">Cities Analyzed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$50B+</div>
                  <p className="text-gray-600">Investments Guided</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24hr</div>
                  <p className="text-gray-600">Report Delivery</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">SOX</div>
                  <p className="text-gray-600">Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Beyond City Marketing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We analyze what cities don't want you to see: council transcripts, permit delays, tribal consultation
              gaps, and infrastructure reality.
            </p>
          </div>

          <Tabs defaultValue="transcripts" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 bg-gray-100 p-1 rounded-2xl">
              <TabsTrigger value="transcripts" className="flex items-center gap-2 px-6 py-3 rounded-xl">
                <Search className="w-4 h-4" />
                Council Transcripts
              </TabsTrigger>
              <TabsTrigger value="fpic" className="flex items-center gap-2 px-6 py-3 rounded-xl">
                <Scale className="w-4 h-4" />
                FPIC Risk
              </TabsTrigger>
              <TabsTrigger value="water" className="flex items-center gap-2 px-6 py-3 rounded-xl">
                <Droplets className="w-4 h-4" />
                Water Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transcripts" className="space-y-8">
              <Card className="max-w-4xl mx-auto border-2 border-teal-200 hover:border-teal-300 transition-all hover:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900">Council Transcript Analysis</CardTitle>
                      <p className="text-lg text-gray-600 mt-2">
                        AI-powered sentiment analysis of city council meetings reveals hidden risks, permit delays, and
                        community opposition before they become headlines.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-teal-50 rounded-2xl border border-teal-200">
                      <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-teal-800 mb-2">Real-time Monitoring</h4>
                      <p className="text-sm text-teal-700">Continuous transcript monitoring across 100+ cities</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-800 mb-2">Sentiment Scoring</h4>
                      <p className="text-sm text-blue-700">Risk alerts based on community sentiment analysis</p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-800 mb-2">Pattern Analysis</h4>
                      <p className="text-sm text-purple-700">Historical trends and predictive risk modeling</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fpic" className="space-y-8">
              <Card className="max-w-4xl mx-auto border-2 border-purple-200 hover:border-purple-300 transition-all hover:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Scale className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900">FPIC Risk Assessment</CardTitle>
                      <p className="text-lg text-gray-600 mt-2">
                        Free, Prior, and Informed Consent violations can halt $100M+ projects. We track tribal
                        consultation gaps and litigation risks.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-800 mb-2">Territory Mapping</h4>
                      <p className="text-sm text-purple-700">
                        Comprehensive tribal territory and jurisdiction analysis
                      </p>
                    </div>
                    <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-200">
                      <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-pink-800 mb-2">Timeline Tracking</h4>
                      <p className="text-sm text-pink-700">Consultation process monitoring and gap identification</p>
                    </div>
                    <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-200">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-red-800 mb-2">Legal Precedents</h4>
                      <p className="text-sm text-red-700">Case law analysis and litigation risk assessment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="water" className="space-y-8">
              <Card className="max-w-4xl mx-auto border-2 border-orange-200 hover:border-orange-300 transition-all hover:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                      <Droplets className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900">Water Security Intelligence</CardTitle>
                      <p className="text-lg text-gray-600 mt-2">
                        Beyond drought maps: we analyze legal compacts, interstate disputes, and infrastructure reality
                        to predict water availability.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-200">
                      <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-orange-800 mb-2">Legal Compacts</h4>
                      <p className="text-sm text-orange-700">Interstate water agreements and allocation analysis</p>
                    </div>
                    <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-200">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-red-800 mb-2">Dispute Tracking</h4>
                      <p className="text-sm text-red-700">Interstate conflicts and litigation monitoring</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-800 mb-2">Stress Modeling</h4>
                      <p className="text-sm text-blue-700">Infrastructure capacity and failure risk analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Interactive City Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore city scorecards, materiality calculators, and impact statement extractors in one unified platform.
            </p>
          </div>
          <CityDashboard />
        </div>
      </section>

      {/* Vector Search Section */}
      <section id="vector-search" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">LocationOS Vera Search</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered semantic search across 100+ cities. Find locations similar to your requirements using natural
              language.
            </p>
          </div>
          <LocationOS />
        </div>
      </section>

      {/* Sample Reports Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Sample City Reports</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See our intelligence in action with real city analysis examples.
            </p>
          </div>

          <Tabs defaultValue="scorecard" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 bg-gray-100 p-1 rounded-2xl">
              <TabsTrigger value="scorecard" className="flex items-center gap-2 px-6 py-3 rounded-xl">
                <FileText className="w-4 h-4" />
                City Scorecard
              </TabsTrigger>
              <TabsTrigger value="fpic" className="flex items-center gap-2 px-6 py-3 rounded-xl">
                <Scale className="w-4 h-4" />
                FPIC Dashboard
              </TabsTrigger>
              <TabsTrigger value="extractor" className="flex items-center gap-2 px-6 py-3 rounded-xl">
                <Search className="w-4 h-4" />
                Impact Extractor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scorecard" className="space-y-8">
              <CityScoreCard />
            </TabsContent>

            <TabsContent value="fpic" className="space-y-8">
              <FPICDashboard />
            </TabsContent>

            <TabsContent value="extractor" className="space-y-8">
              <ImpactStatementExtractor />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* City Calculator Section */}
      <section id="calculator" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CityImpactCalculator />
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case-study" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WaterCaseStudy />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white border-t border-gray-100" data-section="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTiers />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactPricingDemo />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">
                  <span className="text-teal-400">Veracity</span>
                  <span className="text-blue-400">101</span>
                </div>
              </div>
              <p className="text-gray-400">Fortune 500 location intelligence. The map is not the territory.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-gray-400">
                <div>City Reports</div>
                <div>Risk Assessment</div>
                <div>FPIC Analysis</div>
                <div>Water Intelligence</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Methodology</div>
                <div>Case Studies</div>
                <div>Contact</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-gray-400">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Data Security</div>
                <div>SOX Compliance</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400">© 2024 Veracity101. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="text-gray-400">Enterprise-grade • SOX compliant • 24hr delivery</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
