"use client"  // Add this at the top!

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/utils"


export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/tf-logo-white.png"
            alt="TF Logo"
            width={50}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold tracking-wider hidden sm:inline-block">THE FORUM</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">

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
          
          <button
            onClick={() => scrollToSection("photos")}
            className="text-sm font-medium tracking-widest hover:text-gray-300 transition"
          >
            PHOTOS
          </button>
          <button
            onClick={() => scrollToSection("community")}
            className="text-sm font-medium tracking-widest hover:text-gray-300 transition"
          >
            COMMUNITY
          </button>

          <Button
            variant="outline"
            className="border-white text-black hover:bg-gray-200 transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            JOIN US
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  )
}