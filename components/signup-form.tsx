"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LOGIN_TABS = [
  { id: "candidate", label: "Candidate" },
  { id: "soldier", label: "Soldier" },
  { id: "admin", label: "Admin" },
  { id: "trainer", label: "Trainer" },
  { id: "doctor", label: "Doctor" },
]

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const route = useRouter()

  const [selectedTab, setSelectedTab] = useState(LOGIN_TABS[2].id)
  const [selectedState, setSelectedState] = useState(INDIAN_STATES[0])

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-xl font-bold">Apply for Agnipath Scheme</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to start your application as a{" "}
            {LOGIN_TABS.find((tab) => tab.id === selectedTab)?.label}
          </p>
          <div className="mt-2 mb-1 flex justify-center gap-2">
            {LOGIN_TABS.map((tab) => (
              <Button
                key={tab.id}
                type="button"
                variant={selectedTab === tab.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded px-3 py-1 text-xs",
                  selectedTab === tab.id ? "" : "bg-background"
                )}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        <Field>
          <FieldLabel htmlFor="fullName">
            Full Name ( As in Aadhaar )
          </FieldLabel>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            required
            className="bg-background"
            autoComplete="name"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="mobile">Mobile Number</FieldLabel>
          <Input
            id="mobile"
            type="tel"
            placeholder="10-digit mobile number"
            pattern="[0-9]{10}"
            maxLength={10}
            required
            className="bg-background"
            autoComplete="tel"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
            autoComplete="email"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
            autoComplete="new-password"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
          <Input
            id="dob"
            type="date"
            required
            className="bg-background"
            autoComplete="bday"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="state">State</FieldLabel>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <Button onClick={() => route.replace("/apply-success")} type="button">
            Apply
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
