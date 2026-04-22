"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const LOGIN_TABS = [
  { id: "soldier", label: "Agniveer" },
  { id: "admin", label: "Admin" },
  { id: "trainer", label: "Trainer" },
  { id: "doctor", label: "Doctor" },
]

const TRAINER_ROLES = [
  { id: "commanding-officer", label: "Commanding Officer" },
  { id: "company-commander", label: "Company Commander" },
  { id: "platoon-commander", label: "Platoon Commander" },
]

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const route = useRouter()

  const [selectedTab, setSelectedTab] = useState(LOGIN_TABS[2].id)
  const [trainerRole, setTrainerRole] = useState(TRAINER_ROLES[0].id)

  const getDisplayLabel = () => {
    if (selectedTab === "trainer") {
      const role = TRAINER_ROLES.find((r) => r.id === trainerRole)
      return role ? `${role.label}` : "Trainer"
    }
    return LOGIN_TABS.find((tab) => tab.id === selectedTab)?.label
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login as a {getDisplayLabel()}
          </p>
          <div className="mt-2 mb-1 flex items-center justify-center gap-2">
            {LOGIN_TABS.map((tab) => {
              if (tab.id === "trainer" && selectedTab === "trainer") {
                return (
                  <DropdownMenu key={tab.id}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        className="flex items-center gap-1 rounded px-3 py-1 text-xs"
                      >
                        {TRAINER_ROLES.find((r) => r.id === trainerRole)
                          ?.label || "Trainer"}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      {TRAINER_ROLES.map((role) => (
                        <DropdownMenuItem
                          key={role.id}
                          onClick={() => setTrainerRole(role.id)}
                          className="cursor-pointer"
                        >
                          {role.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
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
              )
            })}
          </div>
        </div>

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
            autoComplete="current-password"
          />
          <a
            href="#"
            className="ml-auto text-xs underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </Field>
        <Field>
          <Button
            onClick={() => {
              if (selectedTab === "trainer") {
                route.replace(`${selectedTab}/${trainerRole}`)
              } else {
                route.replace(selectedTab)
              }
            }}
            type="button"
          >
            Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
