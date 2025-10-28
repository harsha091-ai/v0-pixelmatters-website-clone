"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, TrendingUp, FileText, Layers } from "lucide-react"
import { SplineScene } from "@/components/ui/spline-scene"
import { Spotlight } from "@/components/ui/spotlight"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [featuresVisible, setFeaturesVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Check if features section is in view
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75) {
          setFeaturesVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-light tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <span>PRISM</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-light hover:text-blue-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-light hover:text-blue-400 transition-colors">
              How it works
            </a>
            <a href="#research" className="text-sm font-light hover:text-blue-400 transition-colors">
              Research
            </a>
            <Link href="/auth">
              <Button
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-full px-6 text-sm"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Link href="/auth" className="md:hidden">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              Start
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-20">
        <div className="fixed inset-0 z-0 overflow-hidden">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 z-10" fill="rgba(59, 130, 246, 0.5)" />
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full opacity-60 md:opacity-70"
            />
          </div>
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-[1]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center space-y-6 sm:space-y-8"
              style={{
                opacity: Math.max(0.3, 1 - scrollY / 600),
                transform: `translateY(${scrollY * 0.15}px)`,
              }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm rounded-full px-4 py-2 text-xs sm:text-sm text-blue-300 border border-blue-500/30">
                <Sparkles className="w-4 h-4" />
                <span>Powered by IISc Research</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light leading-[1.1] tracking-tight max-w-5xl mx-auto drop-shadow-2xl">
                Universal AI Framework for{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Product Intelligence
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto px-4 drop-shadow-lg">
                Analyze products across 5 functional factors with multimodal AI. Get explainable scores, benchmarking
                insights, and actionable intelligence in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 text-base w-full sm:w-auto shadow-xl shadow-blue-600/30"
                  >
                    Start Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 hover:bg-white/10 text-white rounded-full px-8 text-base w-full sm:w-auto bg-black/30 backdrop-blur-sm"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Functional Factors Section */}
        <div
          ref={featuresRef}
          id="features"
          className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-transparent via-blue-950/30 to-black/90 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">5 Functional Factors</h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                Comprehensive analysis across critical product dimensions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: "🌡️",
                  title: "Thermal Efficiency",
                  description: "Insulation capability and temperature retention performance",
                  delay: 0,
                },
                {
                  icon: "💪",
                  title: "Durability & Impact Resistance",
                  description: "Structural strength and long-term reliability assessment",
                  delay: 100,
                },
                {
                  icon: "🧼",
                  title: "Contamination Resistance",
                  description: "Hygienic design and cleanliness maintenance evaluation",
                  delay: 200,
                },
                {
                  icon: "🔬",
                  title: "Chemical Safety",
                  description: "Material safety and regulatory compliance verification",
                  delay: 300,
                },
                {
                  icon: "✋",
                  title: "Ergonomics & Handling",
                  description: "User-friendliness and comfort during daily use",
                  delay: 400,
                },
              ].map((factor, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 ${
                    featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${factor.delay}ms`,
                  }}
                >
                  <div className="text-4xl mb-4">{factor.icon}</div>
                  <h3 className="text-lg sm:text-xl font-light mb-2">{factor.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{factor.description}</p>
                </div>
              ))}

              {/* Overall Score Card */}
              <div
                className={`bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-500/50 transition-all duration-500 ${
                  featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: "500ms",
                }}
              >
                <Sparkles className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-lg sm:text-xl font-light mb-2">Product Intelligence Score</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Comprehensive overall rating combining all functional factors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div
          id="how-it-works"
          className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-black/90 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {[
                {
                  icon: <Layers className="w-8 h-8 text-blue-400" />,
                  title: "Multimodal Analysis",
                  description:
                    "Process both product images and text specifications for comprehensive evaluation. Our AI understands visual and textual data to provide accurate assessments.",
                },
                {
                  icon: <FileText className="w-8 h-8 text-cyan-400" />,
                  title: "Explainable AI",
                  description:
                    "Understand exactly why each score was given. Visual attention maps and detailed reasoning show which product features influenced the evaluation.",
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-green-400" />,
                  title: "Industry Benchmarking",
                  description:
                    "Compare your product against industry standards and competitors. See how your product stacks up and identify areas for improvement.",
                },
                {
                  icon: <Target className="w-8 h-8 text-purple-400" />,
                  title: "Cross-Domain Ready",
                  description:
                    "Extensible framework that works across different product categories. Start with bottles, expand to any consumer product.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          id="research"
          className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gradient-to-t from-blue-950/30 to-transparent backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">Ready to analyze your products?</h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Get started with PRISM today and unlock actionable product intelligence
            </p>
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 text-base mt-6 shadow-xl shadow-blue-600/30"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
