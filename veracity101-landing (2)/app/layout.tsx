import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Veracity101 - U.S. Location Intelligence | Fortune 500 Site Selection | The Map Is Not The Territory",
  description:
    "Stop believing city brochures. Start reading council transcripts. Veracity101 reveals the $100M gap between what cities promise and what they deliver. Trusted by Fortune 500 site selectors for audit-ready location intelligence with ESG materiality scoring, FPIC risk assessment, and regulatory timeline analysis.",
  keywords: [
    "location intelligence",
    "site selection",
    "Fortune 500",
    "city analysis",
    "council transcripts",
    "ESG risk assessment",
    "opportunity zones",
    "QOZ analysis",
    "real estate intelligence",
    "municipal analysis",
    "regulatory risk",
    "FPIC compliance",
    "materiality scoring",
    "investment due diligence",
    "corporate real estate",
    "industrial site selection",
    "water rights analysis",
    "permit risk assessment",
    "tribal consultation",
    "infrastructure risk",
    "climate risk assessment",
    "tax incentive optimization",
    "labor market analysis",
    "supply chain risk",
    "business location strategy",
  ].join(", "),
  authors: [{ name: "Veracity101", url: "https://veracity101.com" }],
  creator: "Veracity101",
  publisher: "Veracity101",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://veracity101.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veracity101.com",
    siteName: "Veracity101",
    title: "Veracity101 - Fortune 500 Location Intelligence | The Map Is Not The Territory",
    description:
      "Stop believing city brochures. Start reading council transcripts. Veracity101 reveals the $100M gap between what cities promise and what they deliver. Trusted by Fortune 500 executives for $100M+ investment decisions.",
    images: [
      {
        url: "/og-image-main.png",
        width: 1200,
        height: 630,
        alt: "Veracity101 - Location Intelligence Platform for Fortune 500 Companies",
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "Veracity101 Logo - Location Intelligence",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@veracity101",
    creator: "@veracity101",
    title: "Veracity101 - Fortune 500 Location Intelligence | Stop Believing City Brochures",
    description:
      "Trusted by Fortune 500 executives for $100M+ location decisions. Council transcript analysis reveals the truth behind city marketing. ESG materiality scoring included.",
    images: {
      url: "/twitter-image.png",
      alt: "Veracity101 - Location Intelligence Platform",
      width: 1200,
      height: 630,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d9488" },
    { media: "(prefers-color-scheme: dark)", color: "#14b8a6" },
  ],
  colorScheme: "light",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0d9488",
      },
    ],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "Business Intelligence",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  applicationName: "Veracity101",
  appleWebApp: {
    capable: true,
    title: "Veracity101",
    statusBarStyle: "default",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Veracity101",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#0d9488",
    "msapplication-TileImage": "/mstile-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#0d9488",
    "color-scheme": "light",
    "supported-color-schemes": "light",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://veracity101.com" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Veracity101",
              alternateName: "Veracity 101",
              url: "https://veracity101.com",
              logo: "https://veracity101.com/logo.png",
              description:
                "Fortune 500 location intelligence platform providing audit-ready city analysis, council transcript insights, and ESG materiality scoring for $100M+ investment decisions.",
              foundingDate: "2024",
              industry: "Business Intelligence",
              serviceType: "Location Intelligence",
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              target: [
                "Fortune 500 Companies",
                "Corporate Real Estate",
                "Site Selection Consultants",
                "Investment Firms",
                "Industrial Development",
              ],
              offers: {
                "@type": "Service",
                name: "City Intelligence Reports",
                description:
                  "Comprehensive city analysis including council transcript analysis, ESG scoring, and regulatory risk assessment",
                provider: {
                  "@type": "Organization",
                  name: "Veracity101",
                },
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Sales",
                email: "contact@veracity101.com",
                availableLanguage: "English",
              },
              sameAs: ["https://twitter.com/veracity101", "https://linkedin.com/company/veracity101"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
