"use client"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/icons/tiktok-icon"
import BackgroundVideo from "@/components/ui/background-video"
import { SimpleButton } from "@/components/ui/simple-button"
import { scrollToSection } from "@/lib/utils"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen h-screen flex items-center">
      {/* Background Video */}
      <BackgroundVideo
        src="final_exam_mov.mp4"
        fallbackImage="/placeholder.svg?height=1080&width=1920"
        overlay={true}
        overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <Image
                src="bear_head.png"
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
                onClick={() => scrollToSection("contact")}
              >
                JOIN US
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
              <Link href="https://facebook.com/@theforumsfu" className="text-white hover:text-gray-300 transition">
                <Facebook className="h-6 w-6" />
              </Link>
              
              <span className="text-sm text-gray-400">@theforumsfu</span>
            </div>
          </div>

          <div className="flex-1 mt-8 md:mt-0">
            <Link href = "https://www.ticketweb.ca/event/final-exam-sfus-celebrities-nightclub-tickets/14306713?pl=blueprint~">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/20 shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/final_exam_logo.png"
                  alt="Featured Event"
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-sm font-medium bg-white text-black px-3 py-1 rounded-full">FEATURED</span>
                  <h3 className="text-2xl font-bold mt-3">FINAL EXAM 2025</h3>
                  <p className="text-gray-300 mt-1">April 24 • 9PM - 2AM</p>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  )
}