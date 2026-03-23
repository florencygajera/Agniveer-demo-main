"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ApplicationSuccessPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Application Submitted</h1>
          <p className="text-sm text-muted-foreground">
            Your application has been submitted successfully.
          </p>
        </div>

        {/* CTA */}
        <Button size="lg" className="mt-2" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  )
}
