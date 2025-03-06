"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle } from "lucide-react"

export default function CtaSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isHoveringMascot, setIsHoveringMascot] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log("Subscribed with:", email)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(50,50,50,0.3) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Mascot with hover effect */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsHoveringMascot(true)}
            onMouseLeave={() => setIsHoveringMascot(false)}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bear%20Head%20Icon-X7HZbzWCrG4eCa9ltcylJrj0rQjfpQ.png"
              alt="TF Bear Mascot"
              width={80}
              height={80}
              className={`h-20 w-auto mx-auto transition-transform duration-500 ${isHoveringMascot ? "scale-110" : ""}`}
            />

            {/* Glow effect on hover */}
            <div
              className={`absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-500 blur-xl ${
                isHoveringMascot ? "opacity-20" : ""
              }`}
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative">
            <span className="relative inline-block">
              JOIN
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </span>{" "}
            <span className="relative inline-block">
              THE
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left delay-100"></span>
            </span>{" "}
            <span className="relative inline-block">
              MOVEMENT
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left delay-200"></span>
            </span>
          </h2>

          <p className="text-gray-300">
            Be the first to know about upcoming events, exclusive offers, and community initiatives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-4">
                <div className={`relative flex-1 group ${isFocused ? "ring-2 ring-white/30 rounded-md" : ""}`}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-4 py-2 bg-transparent border border-white/30 rounded-md focus:outline-none transition-all duration-300 ${
                      isFocused ? "border-white/60 pr-10" : "hover:border-white/50"
                    }`}
                  />
                  <div
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 transition-all duration-300 ${
                      isFocused ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Send className="h-4 w-4" />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    SUBSCRIBE
                  </span>
                  <span className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Button>
              </form>
            ) : (
              <div className="w-full bg-white/10 p-4 rounded-md flex items-center justify-center space-x-3 animate-pulse">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-green-400">Thanks for subscribing!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

