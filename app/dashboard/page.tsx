"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Upload, ImageIcon, FileText, ArrowRight, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [textSpecs, setTextSpecs] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!imageFile) return

    setIsAnalyzing(true)
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
    router.push("/dashboard/results")
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

          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => router.push("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-2">Product Analysis</h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Upload a product image and optional specifications for AI-powered evaluation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-blue-400" />
              <Label className="text-lg font-light">Product Image</Label>
              <span className="text-red-400">*</span>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : selectedImage
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected product"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/20 hover:bg-white/10 bg-transparent"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                      onClick={() => {
                        setSelectedImage(null)
                        setImageFile(null)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg mb-2">Drag and drop your product image here</p>
                    <p className="text-sm text-gray-400">or</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 bg-transparent"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </Button>
                  <p className="text-xs text-gray-500">Supports: JPG, PNG, WebP (Max 10MB)</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            </div>
          </div>

          {/* Text Specifications Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-cyan-400" />
              <Label className="text-lg font-light">Product Specifications</Label>
              <span className="text-gray-500 text-sm">(Optional)</span>
            </div>

            <div className="border border-white/20 rounded-2xl p-6 bg-white/5 space-y-4">
              <Textarea
                placeholder="Enter product specifications, compliance documents, or any additional text information...

Examples:
• Material: Stainless steel 304
• Capacity: 750ml
• Insulation: Double-wall vacuum
• Certifications: FDA approved, BPA-free
• Dimensions: 10cm x 25cm"
                value={textSpecs}
                onChange={(e) => setTextSpecs(e.target.value)}
                className="min-h-[300px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none"
              />

              <div className="flex items-start gap-2 text-sm text-gray-400">
                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <p>
                  Adding text specifications helps our AI provide more accurate analysis by combining visual and textual
                  data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-light mb-1">Ready to analyze?</h3>
            <p className="text-sm text-gray-400">
              {selectedImage
                ? "Your product will be evaluated across 5 functional factors"
                : "Please upload a product image to continue"}
            </p>
          </div>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 w-full sm:w-auto"
            disabled={!selectedImage || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="text-2xl font-light text-blue-400 mb-1">5</div>
            <div className="text-sm text-gray-400">Functional Factors</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="text-2xl font-light text-cyan-400 mb-1">~30s</div>
            <div className="text-sm text-gray-400">Analysis Time</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="text-2xl font-light text-green-400 mb-1">AI</div>
            <div className="text-sm text-gray-400">Explainable Results</div>
          </div>
        </div>
      </main>
    </div>
  )
}
