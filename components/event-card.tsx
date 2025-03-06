import Image from "next/image"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  image: string
}

export default function EventCard({ title, date, time, location, image }: EventCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200">
      <div className="aspect-[3/2] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="object-cover w-full h-full grayscale group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm font-medium bg-black text-white px-3 py-1 rounded-full">{date}</span>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-700">{time}</p>
          <p className="text-sm text-gray-700">{location}</p>
        </div>
        <Button
          variant="outline"
          className="w-full mt-3 border-black text-black hover:bg-black hover:text-white transition-colors"
        >
          GET TICKETS
        </Button>
      </div>
    </div>
  )
}

