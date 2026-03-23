import Footer from "@/components/block/Footer"
import Hero from "@/components/block/Hero"
import OfficialNotices from "@/components/block/OfficialNotices"
import PlatformFeatures from "@/components/block/PlatformFeatures"
import StartApplication from "@/components/block/StartApplication"
import Stats from "@/components/block/Stats"
import Topbar from "@/components/navigation/Topbar"

export default function Home() {
  return (
    <>
      <div className="relative flex min-h-screen flex-col gap-16 sm:gap-26">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
        <Topbar />
        <Hero />
        <Stats />
      </div>
      <PlatformFeatures />
      <OfficialNotices />
      <StartApplication />
      <Footer />
    </>
  )
}
