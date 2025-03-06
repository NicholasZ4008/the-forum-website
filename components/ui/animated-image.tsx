"use client"

import React, { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface AnimatedImageProps {
  src: string
  alt: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonAction?: () => void
  width?: number
  height?: number
  className?: string
}

export default function AnimatedImage({
  src,
  alt,
  title,
  subtitle,
  description,
  buttonText,
  buttonAction,
  width = 600,
  height = 400,
  className = "",
}: AnimatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const xRef = useRef(0)
  const yRef = useRef(0)
  const frameRef = useRef<number>()

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return

      const x = xRef.current
      const y = yRef.current

      containerRef.current.style.setProperty("--x", `${x}px`)
      containerRef.current.style.setProperty("--y", `${y}px`)

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return

    const r = el.getBoundingClientRect()
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2))
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2))
  }

  const handleMouseLeave = () => {
    xRef.current = 0
    yRef.current = 0
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 ease-out cursor-pointer"
        style={{
          transform: isHovered 
            ? "scale(1.02) rotateX(0deg) translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" 
            : "scale(1) rotateX(3deg)",
          transformOrigin: "center",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div className="aspect-[3/2] w-full overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
                isHovered ? "scale-105 grayscale-0" : "grayscale"
              }`}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-500"
              style={{
                opacity: isHovered ? 0.9 : 0.3
              }}
            />
          </div>
        </div>

        {(title || subtitle || description || buttonText) && (
          <div 
            className="absolute bottom-0 left-0 w-full p-5 space-y-2 text-white transition-all duration-500"
            style={{
              transform: isHovered ? "translateY(0)" : "translateY(20px)",
              opacity: isHovered ? 1 : 0.7,
            }}
          >
            {title && <h3 className="text-xl font-bold">{title}</h3>}
            {subtitle && <p className="text-sm font-medium">{subtitle}</p>}
            {description && <p className="text-sm">{description}</p>}
            
            {buttonText && (
              <Button
                variant="outline"
                onClick={buttonAction}
                className="mt-2 border-white text-white hover:bg-white hover:text-black transition-colors"
              >
                {buttonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}