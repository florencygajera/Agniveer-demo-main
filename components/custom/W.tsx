import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function W({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <main className={cn("flex w-full justify-center px-4 md:px-6", className)}>
      <div className="w-full max-w-360">{children}</div>
    </main>
  )
}
