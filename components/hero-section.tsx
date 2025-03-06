"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/icons/tiktok-icon"
import BackgroundVideo from "@/components/ui/background-video"
import { SimpleButton } from "@/components/ui/simple-button"
import { scrollToSection } from "@/lib/utils"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen h-screen flex items-center">
      {/* Background Video */}
      <BackgroundVideo
        src="/placeholder.mp4"
        fallbackImage="/placeholder.svg?height=1080&width=1920"
        overlay={true}
        overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bear%20Head%20Icon-X7HZbzWCrG4eCa9ltcylJrj0rQjfpQ.png"
                alt="TF Bear Mascot"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
              <div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">THE FORUM</h1>
                <p className="text-xl md:text-3xl font-light text-gray-300 mt-2">Elevating SFU Student Life</p>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              Join us for unforgettable events, connect with fellow students, and be part of the most vibrant community
              at Simon Fraser University.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SimpleButton
                onClick={() => scrollToSection("join")}
              >
                WIN VIP PASSES
              </SimpleButton>
              <SimpleButton
                onClick={() => scrollToSection("events")}
              >
                UPCOMING EVENTS
              </SimpleButton>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <span className="text-sm text-gray-400">FOLLOW US</span>
              <Link href="https://instagram.com/theforumsfu" className="text-white hover:text-gray-300 transition">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://tiktok.com/@theforumsfu" className="text-white hover:text-gray-300 transition">
                <TikTokIcon className="h-6 w-6" />
              </Link>
              <span className="text-sm text-gray-400">@theforumsfu</span>
            </div>
          </div>

          <div className="flex-1 mt-8 md:mt-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/20 shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Featured Event"
                width={800}
                height={600}
                className="object-cover w-full h-full grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-sm font-medium bg-white text-black px-3 py-1 rounded-full">FEATURED</span>
                <h3 className="text-2xl font-bold mt-3">NIGHT VIBES 2025</h3>
                <p className="text-gray-300 mt-1">March 15 • 9PM - 2AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}