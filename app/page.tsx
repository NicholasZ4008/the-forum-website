import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import EventsSection from "@/components/events-section"
import EventPhotoRequestSection from "@/components/event-photo-request-section"
import CommunitySection from "@/components/community-section"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <div id="events">
          <EventsSection />
        </div>
        <div id="photos">
          <EventPhotoRequestSection />
        </div>
        <div id="community">
          <CommunitySection />
        </div>
        <div id="contact">
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

