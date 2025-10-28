"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Download, ArrowLeft, TrendingUp, Info } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const factorScores = [
  {
    id: 1,
    name: "Thermal Efficiency",
    score: 8.5,
    icon: "🌡️",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: 2,
    name: "Durability & Impact Resistance",
    score: 9.2,
    icon: "💪",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: 3,
    name: "Contamination Resistance",
    score: 7.8,
    icon: "🧼",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  {
    id: 4,
    name: "Chemical Safety",
    score: 9.5,
    icon: "🔬",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    id: 5,
    name: "Ergonomics & Handling",
    score: 8.1,
    icon: "✋",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
]

const overallScore = (factorScores.reduce((acc, factor) => acc + factor.score, 0) / factorScores.length).toFixed(1)

const benchmarkData = [
  { factor: "Thermal", yourProduct: 8.5, industryAvg: 7.2, topPerformer: 9.1 },
  { factor: "Durability", yourProduct: 9.2, industryAvg: 7.8, topPerformer: 9.5 },
  { factor: "Contamination", yourProduct: 7.8, industryAvg: 8.1, topPerformer: 9.3 },
  { factor: "Chemical", yourProduct: 9.5, industryAvg: 8.5, topPerformer: 9.7 },
  { factor: "Ergonomics", yourProduct: 8.1, industryAvg: 7.5, topPerformer: 8.8 },
]

export default function ResultsPage() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100)
  }, [])

  const getScoreLabel = (score: number) => {
    if (score >= 9) return { label: "Excellent", color: "text-green-400" }
    if (score >= 7.5) return { label: "Good", color: "text-blue-400" }
    if (score >= 6) return { label: "Fair", color: "text-yellow-400" }
    return { label: "Needs Improvement", color: "text-red-400" }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-light tracking-tight">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <span>PRISM</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Overall Score Section */}
        <div
          className={`mb-8 p-6 sm:p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl transition-all duration-1000 ${
            animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl sm:text-2xl font-light">Product Intelligence Score</h2>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">Overall evaluation across all functional factors</p>
            </div>
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-light text-blue-400 mb-2">{overallScore}</div>
              <div className="text-sm text-gray-400">out of 10</div>
              <div className={`text-lg font-light mt-2 ${getScoreLabel(Number(overallScore)).color}`}>
                {getScoreLabel(Number(overallScore)).label}
              </div>
            </div>
          </div>
        </div>

        {/* Individual Factor Scores */}
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-light mb-6">Functional Factor Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {factorScores.map((factor, index) => (
              <div
                key={factor.id}
                className={`p-6 ${factor.bgColor} border ${factor.borderColor} rounded-2xl transition-all duration-700 hover:scale-105 ${
                  animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{factor.icon}</div>
                  <div className="text-right">
                    <div className="text-3xl font-light">{factor.score}</div>
                    <div className="text-xs text-gray-400">/ 10</div>
                  </div>
                </div>
                <h4 className="text-lg font-light mb-3">{factor.name}</h4>
                <Progress value={factor.score * 10} className="h-2 bg-white/10" />
                <div className={`text-sm mt-2 ${getScoreLabel(factor.score).color}`}>
                  {getScoreLabel(factor.score).label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Image with Annotations */}
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-light mb-6">Visual Analysis</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                <img src="/water-bottle-product.jpg" alt="Analyzed product" className="w-full h-full object-contain" />
                {/* Annotation markers */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-light mb-1">Insulation Design</div>
                    <div className="text-sm text-gray-400">
                      Double-wall construction detected, contributing to high thermal efficiency score
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-light mb-1">Material Quality</div>
                    <div className="text-sm text-gray-400">
                      Stainless steel surface indicates good contamination resistance
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-light mb-1">Ergonomic Features</div>
                    <div className="text-sm text-gray-400">
                      Grip design and bottle shape optimized for comfortable handling
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explainable AI Reasoning */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl sm:text-3xl font-light">Explainable AI Reasoning</h3>
          </div>

          <div className="space-y-4">
            {factorScores.map((factor, index) => (
              <div
                key={factor.id}
                className={`p-6 bg-white/5 border border-white/10 rounded-2xl transition-all duration-500 ${
                  animated ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 800}ms` }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-3xl">{factor.icon}</div>
                    <div>
                      <div className="font-light text-lg">{factor.name}</div>
                      <div className="text-2xl font-light text-blue-400">{factor.score}/10</div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="text-sm text-gray-300 leading-relaxed">
                      {factor.id === 1 && (
                        <>
                          <strong className="text-white">Analysis:</strong> The product demonstrates excellent thermal
                          retention capabilities. Double-wall vacuum insulation detected with minimal heat transfer
                          points. Material composition shows high-grade stainless steel with low thermal conductivity.
                          <div className="mt-2">
                            <strong className="text-white">Key Factors:</strong> Insulation thickness (8mm), vacuum seal
                            integrity (98%), material thermal resistance (R-value: 4.2)
                          </div>
                        </>
                      )}
                      {factor.id === 2 && (
                        <>
                          <strong className="text-white">Analysis:</strong> Superior structural integrity with
                          reinforced construction. Impact testing simulation shows high resistance to drops and
                          compression. Material thickness and quality exceed industry standards.
                          <div className="mt-2">
                            <strong className="text-white">Key Factors:</strong> Wall thickness (2.5mm), impact
                            resistance (15J), compression strength (500N)
                          </div>
                        </>
                      )}
                      {factor.id === 3 && (
                        <>
                          <strong className="text-white">Analysis:</strong> Good hygienic design with smooth interior
                          surfaces. Wide mouth opening facilitates easy cleaning. Some areas identified for improvement
                          in crevice reduction.
                          <div className="mt-2">
                            <strong className="text-white">Key Factors:</strong> Surface smoothness (Ra: 0.8μm),
                            cleanability score (7.5/10), bacterial adhesion resistance (moderate)
                          </div>
                        </>
                      )}
                      {factor.id === 4 && (
                        <>
                          <strong className="text-white">Analysis:</strong> Exceptional chemical safety profile.
                          Materials meet FDA and EU regulations. BPA-free, phthalate-free composition verified. No
                          leaching detected in standard tests.
                          <div className="mt-2">
                            <strong className="text-white">Key Factors:</strong> FDA compliance (✓), BPA-free (✓),
                            leaching test results (0 ppm), material grade (food-safe 304 SS)
                          </div>
                        </>
                      )}
                      {factor.id === 5 && (
                        <>
                          <strong className="text-white">Analysis:</strong> Well-designed ergonomic features with
                          comfortable grip. Weight distribution is balanced. Slight improvement possible in cap design
                          for easier one-handed operation.
                          <div className="mt-2">
                            <strong className="text-white">Key Factors:</strong> Grip comfort (8.2/10), weight balance
                            (good), one-handed usability (7.8/10), cap operation force (moderate)
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs">
                        AI Confidence: {(85 + Math.random() * 10).toFixed(1)}%
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs">
                        Data Points: {Math.floor(150 + Math.random() * 100)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Benchmarking */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-2xl sm:text-3xl font-light">Industry Benchmarking</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Compare your product's performance against industry averages and top performers in each functional factor
            </p>

            <div className="h-[400px] sm:h-[500px]">
              <ChartContainer
                config={{
                  yourProduct: {
                    label: "Your Product",
                    color: "hsl(217, 91%, 60%)",
                  },
                  industryAvg: {
                    label: "Industry Average",
                    color: "hsl(0, 0%, 50%)",
                  },
                  topPerformer: {
                    label: "Top Performer",
                    color: "hsl(142, 71%, 45%)",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="factor" stroke="rgba(255,255,255,0.5)" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 10]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Bar dataKey="yourProduct" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="industryAvg" fill="hsl(0, 0%, 50%)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="topPerformer" fill="hsl(142, 71%, 45%)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="text-sm text-gray-400 mb-1">Your Product Average</div>
                <div className="text-2xl font-light text-blue-400">{overallScore}/10</div>
                <div className="text-xs text-gray-500 mt-1">Above industry standard</div>
              </div>

              <div className="p-4 bg-gray-500/10 border border-gray-500/30 rounded-xl">
                <div className="text-sm text-gray-400 mb-1">Industry Average</div>
                <div className="text-2xl font-light text-gray-400">7.8/10</div>
                <div className="text-xs text-gray-500 mt-1">Market baseline</div>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="text-sm text-gray-400 mb-1">Top Performer</div>
                <div className="text-2xl font-light text-green-400">9.3/10</div>
                <div className="text-xs text-gray-500 mt-1">Best in class</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-light mb-2">Key Insights</div>
                  <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                    <li>Your product exceeds industry average in 4 out of 5 factors</li>
                    <li>Durability and Chemical Safety are standout strengths</li>
                    <li>Contamination Resistance has room for improvement to match top performers</li>
                    <li>Overall performance places you in the top 25% of analyzed products</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 flex-1">
            <Download className="mr-2 h-5 w-5" />
            Download Full Report
          </Button>
          <Link href="/dashboard" className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10 bg-transparent rounded-full px-8"
            >
              Analyze Another Product
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
