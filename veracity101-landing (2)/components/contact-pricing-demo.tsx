"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactForm from "./contact-form"
import PricingTiers from "./pricing-tiers"
import { Mail, CreditCard } from "lucide-react"

export default function ContactPricingDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-gray-100 p-1 rounded-2xl">
            <TabsTrigger
              value="pricing"
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-8">
            <PricingTiers />
          </TabsContent>

          <TabsContent value="contact" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
