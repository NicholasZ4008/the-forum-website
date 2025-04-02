"use client"
import { ChevronRight, ChevronLeft} from "lucide-react"
import type React from "react"
import Link from "next/link"

import { useState, useRef, useId, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface EventData {
  title: string
  date: string
  time: string
  location: string
  image: string
  src: string
}

interface EventCardProps {
  event: EventData
  index: number
  current: number
  handleCardClick: (index: number) => void
}

const EventCard = ({ event, index, current, handleCardClick }: EventCardProps) => {
  const cardRef = useRef<HTMLLIElement>(null)

  const xRef = useRef(0)
  const yRef = useRef(0)
  const frameRef = useRef<number>()

  useEffect(() => {
    const animate = () => {
      if (!cardRef.current) return

      const x = xRef.current
      const y = yRef.current

      cardRef.current.style.setProperty("--x", `${x}px`)
      cardRef.current.style.setProperty("--y", `${y}px`)

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
    const el = cardRef.current
    if (!el) return

    const r = el.getBoundingClientRect()
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2))
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2))
  }

  const handleMouseLeave = () => {
    xRef.current = 0
    yRef.current = 0
  }

  const { image, title, date, time, location, src } = event

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={cardRef}
        className="flex flex-1 flex-col relative w-[70vmin] h-[70vmin] mx-[4vmin] z-10 transition-all duration-300 ease-in-out"
        onClick={() => handleCardClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-150 ease-out group"
          style={{
            transform: current === index ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none",
          }}
        >
          <div className="aspect-[3/2] w-full overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={image || "/placeholder.svg?height=400&width=600"}
                alt={title}
                fill
                className={`object-cover grayscale transition-all duration-600 ease-in-out ${
                  current === index ? "group-hover:scale-105 grayscale-0" : "opacity-50"
                }`}
              />
              {current === index && <div className="absolute inset-0 bg-black/10 transition-all duration-1000" />}
            </div>
          </div>

          <div
            className={`p-5 space-y-3 transition-opacity duration-1000 ease-in-out ${
              current === index ? "opacity-100" : "opacity-70"
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{title}</h3>
              <span className="text-sm font-medium bg-black text-white px-3 py-1 rounded-full">{date}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">{time}</p>
              <p className="text-sm text-gray-700">{location}</p>
            </div>
            <Link href={src}>
              <Button
                variant="outline"
                className="w-full mt-3 border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                GET TICKETS
            </Button>
            </Link>
            
          </div>
        </div>
      </li>
    </div>
  )
}

interface CarouselControlProps {
  type?: string
  title: string
  handleClick: () => void
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200"
      title={title}
      onClick={handleClick}
    >
      {type === "previous" ? (
        <ChevronLeft className="text-neutral-600 dark:text-neutral-200" />
      ) : (
        <ChevronRight className="text-neutral-600 dark:text-neutral-200" />
      )}
    </button>
  )
}

interface CarouselProps {
  events: EventData[]
}

export default function AceCarousel({ events }: CarouselProps) {
  const [current, setCurrent] = useState(0)

  const handlePreviousClick = () => {
    const previous = current - 1
    setCurrent(previous < 0 ? events.length - 1 : previous)
  }

  const handleNextClick = () => {
    const next = current + 1
    setCurrent(next === events.length ? 0 : next)
  }

  const handleCardClick = (index: number) => {
    if (current !== index) {
      setCurrent(index)
    }
  }

  const id = useId()

  return (
    <div className="relative w-[70vmin] h-[70vmin] mx-auto" aria-labelledby={`carousel-heading-${id}`}>
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / events.length)}%)`,
        }}
      >
        {events.map((event, index) => (
          <EventCard key={index} event={event} index={index} current={current} handleCardClick={handleCardClick} />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl type="previous" title="Go to previous event" handleClick={handlePreviousClick} />

        <CarouselControl title="Go to next event" handleClick={handleNextClick} />
      </div>
    </div>
  )
}

