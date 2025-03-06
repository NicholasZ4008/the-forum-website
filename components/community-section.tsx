"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, HandHelping } from "lucide-react"

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  // Track mouse position for the spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Card data
  const cards = [
    {
      id: 1,
      title: "JOIN THE COMMUNITY",
      description: "Connect with fellow students, share experiences, be part of something bigger.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Users className="h-6 w-6" />,
      buttonText: "LEARN MORE",
    },
    {
      id: 2,
      title: "VOLUNTEER WITH US",
      description: "Help organize events, gain valuable experience, and make connections that last.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <HandHelping className="h-6 w-6" />,
      buttonText: "APPLY NOW",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white text-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <div
        className="absolute pointer-events-none opacity-20 bg-radial-gradient from-gray-200 to-transparent"
        style={{
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
          transition: "transform 0.2s ease-out",
          background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl font-bold tracking-tight mb-2">COMMUNITY</h2>

        <div className="h-1 w-20 bg-black mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="space-y-4"
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="aspect-video overflow-hidden rounded-lg relative group cursor-pointer">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  width={600}
                  height={400}
                  className={`object-cover w-full h-full transition-all duration-700 ${
                    activeCard === card.id ? "scale-110 grayscale-0" : "grayscale hover:scale-105"
                  }`}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                    activeCard === card.id ? "opacity-70" : "opacity-0 group-hover:opacity-50"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-full transition-all duration-500 ${
                    activeCard === card.id ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                >
                  {card.icon}
                </div>

                {/* Title overlay */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-500 ${
                    activeCard === card.id
                      ? "translate-y-0"
                      : "translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  }`}
                >
                  <h3 className="text-xl font-bold text-white">{card.title}</h3>
                </div>
              </div>

              <div className="space-y-3">
                <h3
                  className={`text-xl font-bold transition-all duration-300 ${
                    activeCard === card.id ? "scale-105 origin-left" : ""
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-gray-700 transition-all duration-300 ${activeCard === card.id ? "text-black" : ""}`}
                >
                  {card.description}
                </p>
                <Button
                  variant="outline"
                  className={`border-black text-black group overflow-hidden relative transition-all duration-300 ${
                    activeCard === card.id ? "bg-black text-white" : "hover:bg-black hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    {card.buttonText}
                    <ArrowRight
                      className={`h-4 w-0 transition-all duration-300 ${
                        activeCard === card.id ? "w-4" : "group-hover:w-4"
                      }`}
                    />
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Animated dots background */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-black"
              style={{
                top: `${Math.floor(i / 4) * 25}%`,
                left: `${(i % 4) * 25}%`,
                width: "4px",
                height: "4px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

