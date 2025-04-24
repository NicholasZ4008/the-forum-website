"use client"

import { useEffect, useState } from "react"
import AnimatedCarousel from "@/components/ui/animated-carousel"

export default function CarouselSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const brands = [
    { name: "Flair Airlines", logo: "/flair.svg?height=80&width=160" },
    { name: "Redbull", logo: "/redbull.svg?height=80&width=160" },
    { name: "Monster Energy", logo: "/monster.svg?height=80&width=160" },
    { name: "SFSS", logo: "/sfss.png?height=80&width=160" },
    { name: "AMS Events", logo: "/ams.png?height=80&width=160" },
    { name: "Blueprint", logo: "/blueprint.png?height=80&width=160" },
    { name: "Beyond Boxing", logo: "/beyondboxing.png?height=80&width=160" },
    { name: "Coco Bubble Tea", logo: "/coco.png?height=80&width=160" },
    { name: "Fan Tuan", logo: "/fantuan.png?height=80&width=160" },
    { name: "The Hive", logo: "/thehive.png?height=80&width=160" },
    { name: "YVR International Airport", logo: "/yvr.png?height=80&width=160" },
    { name: "Wake Water", logo: "/wakewater.webp?height=80&width=160" },
    { name: "Hey Yalls", logo: "/heyyall.avif?height=80&width=160" },
  ]

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white">OUR SPONSORS</h2>
          </div>
          <div className="h-1 w-20 bg-white mt-1.5" />
        </div>

        {isMounted && <AnimatedCarousel brands={brands} />}
      </div>
    </section>
  )
}
