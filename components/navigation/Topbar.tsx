"use client"

import W from "../custom/W"
import { Button } from "../ui/button"
import { useSize } from "@ajx2/menu"
import { useState } from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/sheet"
import { Menu as MenuIcon } from "lucide-react"
import { Brand } from "../shared/Brand"
import Link from "next/link"

export default function Topbar() {
  const isMobile = useSize(900)
  const isMobileTwo = useSize(530)

  return (
    <W>
      <div className="flex items-center justify-between gap-8 py-4 text-white">
        <Brand />
        {!isMobile && <Menu />}
        <div className="flex items-center gap-2">
          {isMobile && <MobileMenu />}
          {!isMobileTwo && <CTABtn />}
        </div>
      </div>
    </W>
  )
}

function Menu() {
  return (
    <div className="flex items-center gap-2">
      {MENU.map((m) => (
        <Button key={m.name} variant="ghost">
          {m.name}
        </Button>
      ))}
    </div>
  )
}

function CTABtn() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/apply-now">
        <Button
          key={"getStrt"}
          variant="default"
          className="h-9 rounded p-4 shadow"
        >
          Get Started
        </Button>
      </Link>
    </div>
  )
}

const MENU: { name: string }[] = [
  {
    name: "Home",
  },
  {
    name: "About Agnipath",
  },
  {
    name: "Recruitment",
  },
  {
    name: "Results",
  },
]

function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon-lg" className="rounded">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1 px-4">
          {MENU.map((m) => (
            <SheetClose asChild key={m.name}>
              <Button
                variant="ghost"
                className="w-full justify-start rounded text-base"
              >
                {m.name}
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
