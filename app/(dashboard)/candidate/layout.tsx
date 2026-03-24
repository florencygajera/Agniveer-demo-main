import { CandidateSidebar } from "@/components/navigation/sidebar/CandidateSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <CandidateSidebar />
        <main className="flex flex-1 flex-col overflow-hidden bg-[#f4f3ef]">
          <div className="flex items-center justify-between gap-4 border-b bg-background p-2">
            <SidebarTrigger />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Candidate</span>
              <span>|</span>
              <span>Aryan Kumar</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
