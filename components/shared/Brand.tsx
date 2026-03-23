import { ShieldHalf } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link href="/" className="cursor-pointer rounded bg-primary p-2 shadow">
        <ShieldHalf size={34} />
      </Link>
      <div className="flex flex-col">
        <h1 className="font-[Tilt_Warp] text-2xl">Agniveer</h1>
        <span className="hidden text-xs text-muted lg:flex">
          Agnipath Scheme · Indian Army · Ministry of Defence
        </span>
      </div>
    </div>
  )
}

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "w-fit cursor-pointer rounded bg-primary p-2 shadow",
        className
      )}
    >
      <ShieldHalf size={18} />
    </Link>
  )
}
