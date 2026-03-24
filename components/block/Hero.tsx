import Link from "next/link"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <div className="flex w-full items-center justify-center px-4 text-white">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 sm:gap-8">
        <h1 className="text-center font-[Tilt_Warp] text-4xl text-shadow-amber-600 text-shadow-xs sm:text-6xl">
          Agniveer
        </h1>
        <p className="max-w-2xl text-center text-sm text-shadow-amber-600 text-shadow-xs sm:text-base">
          Complete digital platform managing Agniveer Agnipath scheme —
          recruitment, training, medical, performance analytics, and stipend for
          all serving Agniveers.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button className="h-10 rounded px-6 shadow" variant="secondary">
              Login to Portal
            </Button>
          </Link>
          <Link href="/apply-now">
            <Button className="h-10 rounded px-6 shadow">Apply Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
