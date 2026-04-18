"use client"

import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import {
  Award,
  CalendarRange,
  ClipboardClock,
  Landmark,
  LayoutDashboard,
  LogOut,
  ScrollText,
  TriangleAlert,
  Trophy,
  Users,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MENU = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
      { name: "SOS Alerts", icon: TriangleAlert, path: "/admin/sos-alerts" },
      { name: "Audit Log", icon: ClipboardClock, path: "/admin/audit-log" },
    ],
  },
  {
    label: "Recruitment",
    items: [
      { name: "Applications", icon: ScrollText, path: "/admin/applications" },
    ],
  },
  {
    label: "Events & Awards",
    items: [
      { name: "Events", icon: CalendarRange, path: "/admin/events" },
      { name: "Awards", icon: Award, path: "/admin/awards" },
    ],
  },
  {
    label: "Battalion & Agniveers",
    items: [
      { name: "All Battalions", icon: Landmark, path: "/admin/battalions" },
      { name: "All Agniveers", icon: Users, path: "/admin/soldiers" },
      { name: "Rankings", icon: Trophy, path: "/admin/rankings" },
    ],
  },
]

export function AdminSidebar() {
  const pathName = usePathname()

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col overflow-y-auto border-r border-stone-200 bg-white">
      {/* Profile header */}
      <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#CA3500] text-sm font-bold text-white">
            AV
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-stone-800">
              Maj. Ankit Verma
            </div>
            <div className="font-mono text-[10px] text-orange-500">
              ADMIN · HQ
            </div>
            <div className="text-[10px] text-stone-400">
              Major · Admin Panel
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Badge className="border border-[#CA3500]/20 bg-[#CA3500]/5 text-[10px] text-[#CA3500]">
            <ShieldCheck size={9} className="mr-1" />
            Admin Access
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        {MENU.map((group) => (
          <div key={group.label} className="mb-1">
            <p className="px-2 pt-3 pb-1 text-[9px] font-bold tracking-widest text-stone-400 uppercase">
              {group.label}
            </p>
            {group.items.map((item) => {
              const isActive = pathName === item.path
              return (
                <Link key={item.name} href={item.path}>
                  <button
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#CA3500] text-white shadow-sm"
                        : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                    )}
                  >
                    <item.icon
                      size={14}
                      className={cn(isActive ? "text-white" : "text-stone-400")}
                    />
                    {item.name}
                    {item.name === "SOS Alerts" && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                        3
                      </span>
                    )}
                  </button>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-stone-100 p-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs text-stone-400">Theme</span>
          <ThemeToggle />
        </div>
        <Link href="/">
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700">
            <LogOut size={14} /> Logout
          </button>
        </Link>
      </div>
    </aside>
  )
}
