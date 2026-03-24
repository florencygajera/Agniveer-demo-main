import { AdminSidebar } from "@/components/navigation/sidebar/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AdminSidebar />
        {/* min-w-0 prevents main from exceeding the remaining flex width */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f4f3ef]">
          <Topbar />
          <div className="min-h-0 flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

const Topbar = () => {
  return (
    <nav className="z-20 flex shrink-0 items-center justify-between gap-4 border-b bg-background p-2">
      <SidebarTrigger />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Admin</span>
        <span>|</span>
        <span>Maj. Ankit Verma</span>
      </div>
    </nav>
  )
}
