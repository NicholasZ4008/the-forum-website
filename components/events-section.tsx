import Link from "next/link"
import AceCarousel from "@/components/ui/ace-carousel"

export default function EventsSection() {
  const eventData = [
    {
      title: "NEON NIGHTS",
      date: "APR 12",
      time: "10PM - 3AM",
      location: "SFU Burnaby Campus",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "SUMMER KICKOFF",
      date: "MAY 5",
      time: "8PM - 1AM",
      location: "Downtown Vancouver",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "FROSH WEEK",
      date: "SEP 2-8",
      time: "VARIOUS TIMES",
      location: "SFU Campus",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">UPCOMING EVENTS</h2>
            <Link href="/events" className="text-sm font-medium underline underline-offset-4">
              VIEW ALL
            </Link>
          </div>
          <div className="h-1 w-20 bg-black mt-1.5" />
        </div>
        <div>
          <AceCarousel events={eventData} />
        </div>
      </div>
    </section>
  )
}

