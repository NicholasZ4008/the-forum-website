import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'The Forum',
  description: "The Forum - SFU's party organization hosting Vancouver's most electrifying student events. Experience unforgettable nights, exclusive venues, and top entertainment across the city.",
  icons:{
    icon:'/favicon.ico'
  },
  openGraph:{
    type: 'website',
    locale: 'en_US',
    url: 'https://theforumuniversity.com/',
    title: 'The Forum',
    description: "The Forum - SFU's premier party organization hosting Vancouver's most electrifying student events. Experience unforgettable nightlife, exclusive venues, and top entertainment across the city.",
    siteName: 'The Forum',
  },
  keywords: 'Forum events, SFU parties, Vancouver nightlife, student parties, university events, campus parties, SFU nightlife, Vancouver student events, Burnaby events, college parties, Fraser Valley parties, weekend events Vancouver, SFU social scene, Vancouver party organization, student entertainment, Vancouver club nights, university nightlife, SFU student events, Vancouver dance parties, Metro Vancouver events, BC university parties, SFU social club, Vancouver party scene, Lower Mainland events, student social events, SFU entertainment, Vancouver student nightlife, campus social events, exclusive parties Vancouver, premier student events',
  applicationName: 'The Forum',
  authors: [{ name: 'Nicholas Zhang', url: 'https://theforumuniversity.com' }],
  creator: 'TheForumEntertainment',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification:{
    google: process.env.GOOGLE_VERIFICATION,

  },
  alternates: {
    canonical: 'https://theforumuniversity.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fbPixelId = process.env.YOUR_PIXEL_ID;
  return (
    <html lang="en">
      <body>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
