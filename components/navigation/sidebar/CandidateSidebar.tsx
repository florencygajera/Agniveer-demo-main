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
  BookCopy,
  Bot,
  Brain,
  ChevronsUpDown,
  ClipboardClock,
  IdCard,
  Landmark,
  LayoutDashboard,
  LogOut,
  ScrollText,
  Search,
  TriangleAlert,
  Trophy,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MENU = [
  {
    label: "Candidate Portal",
    items: [
      {
        name: "My Application",
        icon: BookCopy,
        path: "/candidate",
      },
      {
        name: "Track Status",
        icon: Search,
        path: "/candidate/track-status",
      },
      {
        name: "Admin Card",
        icon: IdCard,
        path: "/candidate/admin-card",
      },
    ],
  },
]

export function CandidateSidebar() {
  const pathName = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 font-medium">
          <BrandLogo className="text-white" />
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-col text-sm">
              <span>Candidate</span>
              <span className="text-muted-foreground">Aryan Kumar</span>
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
