"use client"

import { BrandLogo } from "@/components/shared/Brand"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import {
  Award,
  Bot,
  Brain,
  CalendarRange,
  ChevronsUpDown,
  ClipboardClock,
  Landmark,
  LayoutDashboard,
  LogOut,
  ScrollText,
  TriangleAlert,
  Trophy,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "../../theme-toggle"

const MENU = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
      },
      {
        name: "SOS Alerts",
        icon: TriangleAlert,
        path: "/admin/sos-alerts",
      },
      {
        name: "Audit Log",
        icon: ClipboardClock,
        path: "/admin/audit-log",
      },
    ],
  },
  {
    label: "AI & Intelligence",
    items: [
      {
        name: "AgniAssist AI",
        icon: Bot,
        path: "/admin/assist",
      },
      {
        name: "ML Insights",
        icon: Brain,
        path: "/admin/insights",
      },
    ],
  },
  {
    label: "Recruitment",
    items: [
      {
        name: "Applications",
        icon: ScrollText,
        path: "/admin/applications",
      },
    ],
  },
  {
    label: "Events participations and awards",
    items: [
      {
        name: "Events",
        icon: CalendarRange,
        path: "/admin/events",
      },
      {
        name: "Awards",
        icon: Award,
        path: "/admin/awards",
      },
    ],
  },
  {
    label: "Battalion & Soldiers",
    items: [
      {
        name: "All Battalions",
        icon: Landmark,
        path: "/admin/battalions",
      },
      {
        name: "All Soldiers",
        icon: Users,
        path: "/admin/soldiers",
      },
      {
        name: "Rankings",
        icon: Trophy,
        path: "/admin/rankings",
      },
    ],
  },
]

export function AdminSidebar() {
  const pathName = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 font-medium">
          <BrandLogo className="text-white" />
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-col text-sm">
              <span> Admin</span>
              <span className="text-muted-foreground">Maj. Ankit Verma</span>
            </div>
            <ChevronsUpDown className="text-muted-foreground" size={16} />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {MENU.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <Link href={item.path}>
                    <SidebarMenuButton
                      className={cn(
                        pathName == item.path
                          ? "bg-primary text-white shadow-md hover:bg-primary hover:text-white"
                          : ""
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathName == item.path
                            ? "text-white"
                            : "text-muted-foreground"
                        )}
                      />
                      {item.name}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton>
                <LogOut /> Logout
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
