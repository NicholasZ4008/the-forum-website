import Link from "next/link"
import AceCarousel from "@/components/ui/ace-carousel"

export default function EventsSection() {
  const eventData = [
    {
      title: "FINAL EXAM",
      date: "APR 24",
      time: "9PM - 2AM",
      location: "Celebrities Nightclub ",
      image: "/final_exam_logo.png",
      src: "https://www.ticketweb.ca/event/final-exam-sfus-celebrities-nightclub-tickets/14306713?pl=blueprint~"
    }
  ]

  return (
    <section className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">UPCOMING EVENTS</h2>
            <Link href="/events" className="text-sm font-medium underline underline-offset-4">
              {/* When we have a past events page */}
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

