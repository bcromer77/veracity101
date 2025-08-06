"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Download, MessageCircle, CheckCircle, FileText, Shield, Crown, Star } from "lucide-react"

interface PricingTiersProps {
  className?: string
}

export default function PricingTiers({ className = "" }: PricingTiersProps) {
  const { toast } = useToast()
  const [isMonthly, setIsMonthly] = useState(false)
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})

  const handlePurchase = async (tierName: string, price: string) => {
    const loadingKey = `purchase-${tierName}`
    setLoadingStates((prev) => ({ ...prev, [loadingKey]: true }))

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: `${tierName} Selected`,
        description: `Redirecting to secure checkout for ${price}...`,
        duration: 3000,
      })

      // Placeholder for Stripe integration
      console.log(`Purchase initiated for ${tierName} at ${price}`)
    } catch (error) {
      toast({
        title: "Error processing request",
        description: "Please try again or contact support.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setLoadingStates((prev) => ({ ...prev, [loadingKey]: false }))
    }
  }

  const handleSampleDownload = async (tierName: string) => {
    const loadingKey = `sample-${tierName}`
    setLoadingStates((prev) => ({ ...prev, [loadingKey]: true }))

    try {
      // Simulate download preparation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Sample Report Downloaded",
        description: `${tierName} sample report is downloading...`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again or contact support.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setLoadingStates((prev) => ({ ...prev, [loadingKey]: false }))
    }
  }

  const handleTalkToUs = () => {
    toast({
      title: "Contact Form Opened",
      description: "Redirecting to contact our sales team...",
      duration: 3000,
    })
  }

  const tiers = [
    {
      id: "lite",
      name: "Lite",
      icon: <FileText className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-200 hover:border-green-300",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      pricePerReport: 600,
      priceMonthly: 1800,
      description: "Essential city intelligence for initial screening",
      features: [
        { icon: "✅", text: "ESG & Tax Score Analysis" },
        { icon: "✅", text: "Water + Housing Index" },
        { icon: "📄", text: "Downloadable PDF Report" },
        { icon: "✅", text: "Basic Risk Assessment" },
        { icon: "✅", text: "Email Support" },
      ],
      popular: false,
    },
    {
      id: "standard",
      name: "Standard",
      icon: <Shield className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-200 hover:border-blue-300",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      pricePerReport: 1200,
      priceMonthly: 3600,
      description: "Comprehensive analysis with regulatory insights",
      features: [
        { icon: "✅", text: "Everything in Lite" },
        { icon: "⚖️", text: "FPIC Risk Assessment Log" },
        { icon: "✅", text: "Council Transcript Highlights" },
        { icon: "✅", text: "Infrastructure Permitting Score" },
        { icon: "✅", text: "Regulatory Timeline Analysis" },
        { icon: "✅", text: "Priority Support" },
      ],
      popular: true,
    },
    {
      id: "strategic",
      name: "Strategic",
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-200 hover:border-purple-300",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      pricePerReport: 1800,
      priceMonthly: 5400,
      description: "Executive-grade intelligence for $100M+ decisions",
      features: [
        { icon: "✅", text: "Everything in Standard" },
        { icon: "📈", text: "3-Year Growth Forecasts" },
        { icon: "✅", text: "City Comparison Pack" },
        { icon: "📄", text: "CSV + Legal Dossier Export" },
        { icon: "⚖️", text: "Executive Risk Summary" },
        { icon: "✅", text: "Dedicated Account Manager" },
      ],
      popular: false,
    },
  ]

  const renderPurchaseButton = (tier: any) => {
    const loadingKey = `purchase-${tier.name}`
    const isLoading = loadingStates[loadingKey]

    return (
      <Button
        onClick={() =>
          handlePurchase(tier.name, isMonthly ? `$${tier.priceMonthly}/month` : `$${tier.pricePerReport}/report`)
        }
        disabled={isLoading}
        className={`w-full h-12 bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          `Get ${tier.name} Report`
        )}
      </Button>
    )
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Choose Your Intelligence Level</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From essential screening to executive-grade analysis. Every report is audit-ready and investment-grade.
        </p>

        {/* Pricing Toggle */}
        <div className="flex items-center justify-center gap-4 p-1 bg-gray-100 rounded-2xl w-fit mx-auto">
          <span
            className={`px-4 py-2 text-sm font-medium transition-colors ${!isMonthly ? "text-gray-900" : "text-gray-500"}`}
          >
            Per Report
          </span>
          <Switch checked={isMonthly} onCheckedChange={setIsMonthly} className="data-[state=checked]:bg-teal-600" />
          <span
            className={`px-4 py-2 text-sm font-medium transition-colors ${isMonthly ? "text-gray-900" : "text-gray-500"}`}
          >
            Monthly
          </span>
          {isMonthly && <Badge className="bg-green-100 text-green-800 border-green-200 ml-2">Save 25%</Badge>}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative border-2 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl ${
              tier.borderColor
            } ${hoveredTier === tier.id ? "scale-105 shadow-2xl" : ""}`}
            onMouseEnter={() => setHoveredTier(tier.id)}
            onMouseLeave={() => setHoveredTier(null)}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 text-sm font-semibold shadow-lg">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {tier.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{tier.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isMonthly ? tier.priceMonthly.toLocaleString() : tier.pricePerReport}
                  </span>
                  <span className="text-gray-600">{isMonthly ? "/month" : "/report"}</span>
                </div>
                {isMonthly && <p className="text-sm text-gray-500">~${Math.round(tier.priceMonthly / 3)} per report</p>}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features List */}
              <div className="space-y-3">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{feature.icon}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {renderPurchaseButton(tier)}

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSampleDownload(tier.name)}
                    className="text-xs border-gray-300 hover:border-gray-400 rounded-lg"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTalkToUs}
                    className="text-xs border-gray-300 hover:border-gray-400 rounded-lg bg-transparent"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Talk to Us
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className={`p-3 ${tier.bgColor} rounded-xl border border-gray-200`}>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Audit-ready • SOX compliant • 24hr delivery</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-8">
        <p className="text-gray-600">Need a custom package for multiple cities or enterprise requirements?</p>
        <Button
          variant="outline"
          onClick={handleTalkToUs}
          className="border-2 border-gray-300 hover:border-teal-500 px-8 py-3 rounded-xl bg-transparent"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Enterprise Sales
        </Button>
      </div>
    </div>
  )
}
