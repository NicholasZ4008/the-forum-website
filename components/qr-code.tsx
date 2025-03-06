import Image from "next/image"

export default function QrCode() {
  return (
    <div className="relative p-6 bg-white rounded-lg max-w-xs mx-auto">
      <div className="absolute -top-3 -left-3">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bear%20Head%20Icon-X7HZbzWCrG4eCa9ltcylJrj0rQjfpQ.png"
          alt="TF Bear Mascot"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      </div>
      <div className="text-center text-black mb-4">
        <h3 className="text-lg font-bold">SCAN TO BUY</h3>
        <p className="text-xs text-gray-600">@theforumsfu</p>
      </div>
      <div className="bg-black p-4 rounded">
        <div className="aspect-square w-full bg-white p-2 rounded">
          {/* This would be a real QR code in production */}
          <div className="grid grid-cols-5 grid-rows-5 gap-1 h-full w-full">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`bg-black rounded-sm ${
                  [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24].includes(i) ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-black mt-4">
        <p className="text-xs">Scan with your phone camera</p>
      </div>
    </div>
  )
}

