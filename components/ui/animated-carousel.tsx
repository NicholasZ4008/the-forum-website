"use client"

import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react"
import Image from "next/image"

interface Brand {
  name: string
  logo: string
}

interface AnimatedCarouselProps {
  brands: Brand[]
  animationDuration?: number // in seconds
  itemWidth?: number
  showLabels?: boolean
  gap?: number // gap between items in pixels
}

const BrandItem = memo(({ 
  brand, 
  index, 
  itemWidth, 
  showLabels = true
}: { 
  brand: Brand
  index: number
  itemWidth: number
  showLabels?: boolean
}) => (
  <div
    className="flex flex-col items-center justify-center flex-shrink-0 group"
    style={{ minWidth: `${itemWidth}px`, width: `${itemWidth}px` }}
  >
    <div className="relative h-16 w-40 bg-white rounded-lg overflow-hidden flex items-center justify-center p-3 transition-all duration-300 group-hover:bg-white group-hover:scale-105 group-hover:shadow-sm">
      <Image
        src={brand.logo || "/placeholder.svg"}
        alt={`${brand.name} logo`}
        width={160}
        height={80}
        className="object-contain max-h-12 transition-opacity duration-300 filter grayscale hover:grayscale-0"
        priority={index < 10} // Prioritize loading only the first few images
      />
    </div>
    {showLabels && (
      <span className="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {brand.name}
      </span>
    )}
  </div>
))

BrandItem.displayName = "BrandItem"

export default function AnimatedCarousel({ 
  brands, 
  animationDuration = 40, 
  itemWidth = 160, 
  showLabels = true,
  gap = 48 // Default gap size in pixels
}: AnimatedCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Calculate how many duplicates we need for a smooth loop
  // We need enough items to fill the screen multiple times
  const duplicationFactor = useMemo(() => {
    // Assuming a max screen width of 2560px (4K displays)
    const maxScreenWidth = 2560
    const itemsNeededToFillScreen = Math.ceil(maxScreenWidth / (itemWidth + gap))
    // Multiply by 3 to ensure we have enough items for the infinite loop
    return Math.max(4, Math.ceil(itemsNeededToFillScreen * 3 / brands.length))
  }, [brands.length, itemWidth, gap])

  // Duplicate brands to create seamless loop
  const duplicatedBrands = useMemo(() => {
    const result = []
    for (let i = 0; i < duplicationFactor; i++) {
      result.push(...brands)
    }
    return result
  }, [brands, duplicationFactor])

  // Preload images for smoother animation
  useEffect(() => {
    const preloadImages = brands.map((brand) => {
      if (typeof window !== "undefined" && brand.logo) {
        const img = new window.Image()
        img.src = brand.logo
        return new Promise<void>((resolve) => {
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
      }
      return Promise.resolve()
    })
    
    Promise.all(preloadImages).catch(() => {
      // Silently handle any preloading errors
    })
  }, [brands])

  // Handle pause/resume with callbacks
  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  // Calculate animation properties
  const animationStyle = useMemo(() => {
    // Calculate the total width of ONE complete set of brands (including gaps)
    const totalSetWidth = brands.length * (itemWidth + gap) - gap // Subtract the last gap
    
    return {
      "--carousel-item-count": duplicatedBrands.length,
      "--carousel-item-width": `${itemWidth}px`,
      "--carousel-gap": `${gap}px`,
      "--carousel-animation-duration": `${animationDuration}s`,
      "--carousel-total-width": `${totalSetWidth}px`,
    } as React.CSSProperties
  }, [brands.length, duplicatedBrands.length, itemWidth, gap, animationDuration])

  // Calculate container classNames
  const containerClass = isPaused ? "pause-animation" : "carousel-animation"

  return (
    <div className="relative w-full overflow-hidden py-8 bg-gradient-to-r from-black via-gray-900 to-black rounded-lg">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <div
        className="w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={containerRef}
          className={`flex ${containerClass}`}
          style={{
            ...animationStyle,
            gap: `${gap}px`
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <BrandItem 
              key={`${brand.name}-${index}`}
              brand={brand} 
              index={index} 
              itemWidth={itemWidth}
              showLabels={showLabels}
            />
          ))}
        </div>
      </div>
    </div>
  )
}