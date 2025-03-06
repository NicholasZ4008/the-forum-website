import { Button } from "@/components/ui/button"
import QrCode from "@/components/qr-code"

export default function QrSection() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">GET YOUR TICKETS</h2>
            <p className="text-gray-300">
              Scan the QR code to purchase tickets for our upcoming events. Early bird pricing available for a limited
              time.
            </p>
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors">BUY TICKETS ONLINE</Button>
          </div>
          <div className="flex-1 flex justify-center">
            <QrCode />
          </div>
        </div>
      </div>
    </section>
  )
}

