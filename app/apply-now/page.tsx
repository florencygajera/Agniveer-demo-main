"use client"

import { BrandLogo } from "@/components/shared/Brand"
import { SignupForm } from "@/components/signup-form"

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-center gap-2 md:justify-start">
        <BrandLogo className="text-white" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
