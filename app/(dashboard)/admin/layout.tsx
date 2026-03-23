import { AdminSidebar } from "@/components/navigation/sidebar/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Moon, Sun } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <div className="flex items-center justify-end gap-4 border-b px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Admin</span>
            <span>|</span>
            <span>Maj. Ankit Verma</span>
          </div>
          <ThemeToggle />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
