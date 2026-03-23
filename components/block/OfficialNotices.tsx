import W from "../custom/W"
import { Badge } from "../ui/badge"
import { Megaphone, CalendarDays } from "lucide-react"

export default function OfficialNotices() {
  return (
    <W className="mt-16 bg-gradient-to-b from-[#222529] to-[#191B1D] py-12">
      <div className="flex flex-col gap-8">
        <div className="mb-2">
          <p className="text-sm font-medium tracking-widest text-orange-500 uppercase">
            Official Notices
          </p>
          <h2 className="text-3xl font-bold text-amber-50 md:text-4xl">
            Announcements
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {NOTICES.map((n, idx) => (
            <li
              key={n.notice}
              className="flex items-start gap-4 rounded-xl border border-muted-foreground/25 bg-secondary-foreground p-4 shadow"
            >
              <Megaphone size={18} className="mt-2 text-amber-100" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-amber-50 md:text-lg">
                    {n.notice}
                  </span>
                  {n.isNew && (
                    <Badge className="ml-2 border-none bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow">
                      New
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <CalendarDays size={16} />
                  <span className="mt-0.5">{n.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </W>
  )
}

const NOTICES: { notice: string; date: string; isNew: boolean }[] = [
  {
    notice:
      "Agnipath Recruitment Rally 2025 — Online applications open till 31 March 2025",
    date: "10 Mar 2025",
    isNew: true,
  },
  {
    notice: "Physical Fitness Test date for Batch 2025-A — 15 April 2025",
    date: "08 Mar 2025",
    isNew: true,
  },
  {
    notice: "March stipend disbursed for all active Agniveers",
    date: "28 Feb 2025",
    isNew: false,
  },
  {
    notice: "New training module: Advanced Weapons Handling from April 2025",
    date: "25 Feb 2025",
    isNew: false,
  },
  {
    notice: "Annual medical examinations scheduled for April–May 2025",
    date: "20 Feb 2025",
    isNew: false,
  },
  {
    notice: "February 2025 performance rankings now published on portal",
    date: "15 Feb 2025",
    isNew: false,
  },
]
