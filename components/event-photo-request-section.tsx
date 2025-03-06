"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, CheckCircle, Send, X } from "lucide-react"

export default function EventPhotosSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  // For the floating particles effect
  const particlesRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Submitted email:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  // Create photo grid data
  const photos = [
    { id: 1, x: 10, y: 10, width: 40, height: 40, rotation: -5 },
    { id: 2, x: 55, y: 15, width: 35, height: 30, rotation: 3 },
    { id: 3, x: 15, y: 55, width: 30, height: 35, rotation: 6 },
    { id: 4, x: 50, y: 50, width: 40, height: 40, rotation: -3 },
    { id: 5, x: 30, y: 30, width: 25, height: 25, rotation: 0 },
  ]

  // Create floating particles for background effect
  useEffect(() => {
    if (!particlesRef.current) return

    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-white/20 rounded-full"

      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100

      // Random size
      const size = Math.random() * 3 + 1

      // Set styles
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Animation
      particle.animate(
        [
          { opacity: 0, transform: "translateY(0)" },
          { opacity: 0.5, transform: "translateY(-20px)" },
          { opacity: 0, transform: "translateY(-40px)" },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          iterations: Number.POSITIVE_INFINITY,
        },
      )

      particlesRef.current?.appendChild(particle)
    }

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle()
    }

    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Floating particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight animate-pulse">GET YOUR EVENT PHOTOS</h2>
            <p className="text-gray-300">
              Relive the memories! Enter your email to receive a gallery of photos from our previous events.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 pr-10 focus:ring-2 focus:ring-white/30 transition-all duration-300 group-hover:bg-white/15"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-white transition-colors duration-300">
                    <Send className="h-4 w-4" />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    GET MY PHOTOS
                  </span>
                  <span className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Button>
              </form>
            ) : (
              <div className="bg-white/10 p-6 rounded-md relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="flex items-center space-x-3 text-green-400">
                  <CheckCircle className="h-6 w-6 animate-bounce" />
                  <p className="font-medium">Thanks! Check your email for your event photos.</p>
                </div>
                <p className="text-gray-400 mt-3 text-sm">
                  We've sent a link to access your photos. If you don't see it, please check your spam folder.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-white/70 hover:text-white"
                  onClick={() => setIsSubmitted(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reset Form
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center">
            <div
              className={`relative w-full max-w-md aspect-square rounded-lg border border-white/10 overflow-hidden ${
                activePhoto !== null ? "z-50" : "z-10"
              }`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false)
                // Don't reset active photo on mouse leave to allow viewing the enlarged photo
              }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 animate-pulse"></div>

              {/* Photo grid */}
              <div className="absolute inset-0">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`absolute rounded-md overflow-hidden shadow-lg transition-all duration-500 cursor-pointer`}
                    style={{
                      top: `${photo.y}%`,
                      left: `${photo.x}%`,
                      width: `${photo.width}%`,
                      height: `${photo.height}%`,
                      transform: `rotate(${photo.rotation}deg) ${activePhoto === photo.id ? "scale(1.5)" : "scale(1)"}`,
                      zIndex: activePhoto === photo.id ? 30 : 10,
                      opacity: activePhoto !== null && activePhoto !== photo.id ? 0.3 : 1,
                      transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                    onClick={() => setActivePhoto(activePhoto === photo.id ? null : photo.id)}
                  >
                    <Image
                      src={`/placeholder.svg?height=${200 + index * 50}&width=${300 + index * 50}`}
                      alt={`Event Photo ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className={`transition-all duration-500 ${
                        activePhoto === photo.id ? "grayscale-0" : "grayscale hover:grayscale-0"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Center icon */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  activePhoto !== null || isHovering ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="relative">
                  <Camera className="w-16 h-16 text-white/70" />
                  <div className="absolute inset-0 animate-ping">
                    <Camera className="w-16 h-16 text-white/30" />
                  </div>
                </div>
              </div>

              {/* Overlay text when hovering */}
              <div
                className={`absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 transform transition-transform duration-500 ${
                  isHovering && activePhoto === null ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <p className="text-sm font-medium">Click on a photo to enlarge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

