"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { TikTokIcon } from "./icons/tiktok-icon"
import { scrollToSection } from "@/lib/utils"

export default function Footer() {
  return (
    <footer className="py-10 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/tf-logo-white.png"
              alt="THE FORUM Logo"
              width={60}
              height={60}
              className="h-12 w-auto"
            />
            <div>
              <p className="text-sm font-medium">THE FORUM at SFU</p>
              <p className="text-xs text-gray-400">Elevating SFU Student Life</p>
            </div>
          </div>

          <nav className="flex gap-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium tracking-widest hover:text-gray-300 transition"
            >
              HOME
            </button>

            <button
              onClick={() => scrollToSection("events")}
              className="text-sm font-medium tracking-widest hover:text-gray-300 transition"
            >
              EVENTS
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="https://instagram.com/theforumsfu" className="text-gray-300 hover:text-white transition">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com/@theforumsfu" className="text-gray-300 hover:text-white transition">
              <TikTokIcon className="h-5 w-5"/>
            </Link>
            <Link href="https://twitter.com/@theforumsfu" className="text-gray-300 hover:text-white transition">
              <Facebook className="h-5 w-5"/>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} THE FORUM at SFU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

