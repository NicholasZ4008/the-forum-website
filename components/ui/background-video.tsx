"use client"

import { useEffect, useRef } from "react"

interface BackgroundVideoProps {
  src: string
  fallbackImage?: string
  overlay?: boolean
  overlayOpacity?: number
}

export default function BackgroundVideo({
  src,
  fallbackImage = "/placeholder.svg?height=1080&width=1920",
  overlay = true,
  overlayOpacity = 0.6,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Attempt to play the video
    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.error("Error playing video:", error)
      }
    }

    playVideo()

    // Cleanup
    return () => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage}
      >
        <source src={src} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        ></div>
      </video>

      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"
          style={{ opacity: overlayOpacity }}
        ></div>
      )}
    </div>
  )
}

