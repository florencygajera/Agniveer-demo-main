import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function WIcon({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "smooth hover-shadow cursor-pointer rounded-lg border bg-primary-foreground p-[1.5px] text-muted-foreground shadow-xs",
        className
      )}
    >
      <div className="rounded-md bg-primary/5 p-1">{children}</div>
    </div>
  )
}
