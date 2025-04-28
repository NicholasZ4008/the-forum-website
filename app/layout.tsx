import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'The Forum',
  description: "The Forum - SFU's party organization hosting Vancouver's most hype student events. Experience unforgettable nights, exclusive venues, and top entertainment across the city.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'icon',
      url: '/tf-logo-black.png',
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theforumuniversity.com/',
    title: 'The Forum',
    description: "The Forum - SFU's premier party organization hosting Vancouver's most hype student events. Experience unforgettable nights, exclusive venues, and top entertainment across the city.",
    siteName: 'The Forum',
    images: [
      {
        url: 'https://theforumuniversity.com/tf-logo-black.png',
        width: 1200,
        height: 630,
        alt: 'The Forum Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Forum',
    description: "The Forum - SFU's premier party organization hosting Vancouver's most hype student events.",
    images: ['https://theforumuniversity.com/tf-logo-black.png'],
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
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://theforumuniversity.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fbPixelId = process.env.YOUR_PIXEL_ID;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Forum Entertainment",
    "url": "https://theforumuniversity.com",
    "logo": "https://theforumuniversity.com/tf-logo-black.png",
    "sameAs": [
      // Add your social profiles here if applicable
      // "https://www.instagram.com/yourhandle",
      // "https://www.facebook.com/yourpage"
    ],
    "description": "The Forum - SFU's premier party organization hosting Vancouver's most hype student events. Experience unforgettable nights, exclusive venues, and top entertainment across the city."
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Forum",
    "url": "https://theforumuniversity.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://theforumuniversity.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

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
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}