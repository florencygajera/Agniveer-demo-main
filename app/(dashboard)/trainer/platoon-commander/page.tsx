"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LayoutDashboard,
  Upload,
  Dumbbell,
  Target,
  Brain,
  Swords,
  CalendarDays,
  ShieldCheck,
  Users,
  TrendingUp,
  Star,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileSpreadsheet,
  Download,
  Plus,
  Search,
  LogOut,
  Activity,
  Pencil,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScoresSection } from "../comp/ScoresSection"
import AttendanceReportPage from "../comp/AttendenceReport"

// ── Types ─────────────────────────────────────────────────────────────────────
type Section =
  | "dashboard"
  | "upload"
  | "program"
  | "scores"
  | "attendanceReport"
  | "report"

// ── Data ──────────────────────────────────────────────────────────────────────
const TRAINER = {
  name: "Cpt. Pradeep Kumar",
  id: "TRN-001",
  battalion: "1st Rajputana Rifles",
  code: "RR-1",
}

const SOLDIERS = [
  {
    id: "AGN-2024-0101",
    name: "Rajveer Singh Chauhan",
    rank: "Sepoy",
    physical: 91,
    weapons: 88,
    mental: 78,
    combat: 89,
    attendance: 96,
    sports: 84,
    mapReading: 74,
    tactics: 81,
    overall: 83.6,
    status: "active",
  },
  {
    id: "AGN-2024-0102",
    name: "Priya Sharma",
    rank: "Sepoy",
    physical: 85,
    weapons: 72,
    mental: 94,
    combat: 80,
    attendance: 98,
    sports: 90,
    mapReading: 86,
    tactics: 88,
    overall: 85.4,
    status: "active",
  },
  {
    id: "AGN-2024-0103",
    name: "Arjun Mehra",
    rank: "Lance Naik",
    physical: 96,
    weapons: 94,
    mental: 88,
    combat: 95,
    attendance: 100,
    sports: 98,
    mapReading: 92,
    tactics: 93,
    overall: 94.5,
    status: "active",
  },
  {
    id: "AGN-2024-0104",
    name: "Sunil Kumar",
    rank: "Sepoy",
    physical: 68,
    weapons: 72,
    mental: 65,
    combat: 70,
    attendance: 82,
    sports: 60,
    mapReading: 62,
    tactics: 64,
    overall: 67.9,
    status: "active",
  },
  {
    id: "AGN-2024-0105",
    name: "Kavita Rajput",
    rank: "Sepoy",
    physical: 78,
    weapons: 74,
    mental: 82,
    combat: 76,
    attendance: 88,
    sports: 77,
    mapReading: 85,
    tactics: 80,
    overall: 80.0,
    status: "on_leave",
  },
  {
    id: "AGN-2024-0106",
    name: "Mahesh Choudhary",
    rank: "Sepoy",
    physical: 82,
    weapons: 91,
    mental: 70,
    combat: 84,
    attendance: 91,
    sports: 79,
    mapReading: 80,
    tactics: 84,
    overall: 82.6,
    status: "active",
  },
]

const PROGRAM = [
  {
    date: "14 Mar 2025",
    module: "Physical",
    soldiers: 6,
    avg: 88,
    remarks:
      "Physical Training: 5km timed run. Platoon achieved a new speed record and improvement in overall endurance.",
    status: "Completed",
  },
  {
    date: "13 Mar 2025",
    module: "Weapons",
    soldiers: 6,
    avg: 84,
    remarks:
      "Weapon Training: Live range session focused on INSAS & SLR marksmanship. All Agniveers qualified, notable improvement in grouping accuracy.",
    status: "Completed",
  },
  {
    date: "12 Mar 2025",
    module: "Tactics",
    soldiers: 6,
    avg: 81,
    remarks:
      "Tactics Exercise: Platoon executed team obstacle navigation and section attack drills. Improved coordination and response under pressure.",
    status: "Completed",
  },
  {
    date: "11 Mar 2025",
    module: "Combat",
    soldiers: 6,
    avg: 90,
    remarks:
      "Combat Training: Simulated field medical response and battle drill practice. Excellent participation; all Agniveers demonstrated rapid evaluation skills.",
    status: "Completed",
  },
  {
    date: "10 Mar 2025",
    module: "Map-Reading",
    soldiers: 5,
    avg: 76,
    remarks:
      "Map Reading: Night compass navigation and orienteering. One Agniveer (Kavita) on leave, rest completed night nav exercise successfully.",
    status: "Completed",
  },
  {
    date: "16 Mar 2025",
    module: "Weapons",
    soldiers: 6,
    avg: 0,
    remarks:
      "Upcoming: INSAS night firing practice scheduled for weapons proficiency enhancement.",
    status: "Scheduled",
  },
  {
    date: "17 Mar 2025",
    module: "Physical",
    soldiers: 6,
    avg: 0,
    remarks:
      "Planned: Combat Fitness Test (CFT) route march (10km), load carry with rifle. Endurance and stamina assessment.",
    status: "Scheduled",
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function sc(v: number) {
  if (v >= 90) return "text-emerald-600"
  if (v >= 80) return "text-[#4a5c2f]"
  if (v >= 70) return "text-amber-600"
  return "text-rose-500"
}
function bc(v: number) {
  if (v >= 90) return "bg-emerald-500"
  if (v >= 80) return "bg-[#4a5c2f]"
  if (v >= 70) return "bg-amber-500"
  return "bg-rose-500"
}

function avg(arr: number[]) {
  return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
  { id: "scores", label: "Agniveer Scores", icon: <TrendingUp size={14} /> },
  {
    id: "program",
    label: "Training Program",
    icon: <CalendarDays size={14} />,
  },
  { id: "upload", label: "Upload Data", icon: <Upload size={14} /> },
]

function Sidebar({
  active,
  setActive,
}: {
  active: Section
  setActive: (s: Section) => void
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
      <div className="flex h-full flex-col overflow-auto">
        <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-sm font-bold text-white">
              P
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-stone-800">
                Platoon commander
              </div>
              <div className="font-mono text-[10px] text-orange-500">Portl</div>
              <div className="text-[10px] text-stone-400"> Dashboard</div>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="border border-sky-200 bg-sky-50 text-[10px] text-sky-700">
              Trainer · Active
            </Badge>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          <p className="px-2 pt-2 pb-1 text-[9px] font-bold tracking-widest text-stone-400 uppercase">
            Trainer Portal
          </p>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              // For the active tab, make the button "primary"
              className={
                active === n.id
                  ? "flex items-center gap-2.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm"
                  : "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-500 transition-all hover:bg-stone-100 hover:text-stone-800"
              }
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>
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
      </div>
    </aside>
  )
}

function MobileNav({
  active,
  setActive,
}: {
  active: Section
  setActive: (s: Section) => void
}) {
  return (
    <div className="flex overflow-x-auto border-b border-stone-200 bg-white md:hidden">
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => setActive(n.id)}
          className={`flex shrink-0 flex-col items-center gap-0.5 border-b-2 px-4 py-2.5 text-[10px] font-semibold whitespace-nowrap transition-colors ${
            active === n.id
              ? "border-[#1a2d4a] text-[#1a2d4a]"
              : "border-transparent text-stone-400"
          }`}
        >
          {n.icon}
          {n.label}
        </button>
      ))}
    </div>
  )
}

function ScoresSectionWithAttendanceButton({
  setSection,
  onViewAttendance,
}: {
  onViewAttendance: () => void
  setSection: (s: Section) => void
}) {
  return <ScoresSection onClick={onViewAttendance}   onPage={() => setSection("report")} />
}

function DashboardSection({ setActive }: { setActive: (s: Section) => void }) {
  const actives = SOLDIERS.filter((s) => s.status === "active")
  const avgScore = avg(SOLDIERS.map((s) => s.overall))
  const above85 = SOLDIERS.filter((s) => s.overall >= 85).length
  const needsAttn = SOLDIERS.filter((s) => s.overall < 75)
  const passRate = Math.round(
    (SOLDIERS.filter((s) => s.overall >= 70).length / SOLDIERS.length) * 100
  )

  const catAvgs = {
    physical: avg(SOLDIERS.map((s) => s.physical)),
    weapons: avg(SOLDIERS.map((s) => s.weapons)),
    mental: avg(SOLDIERS.map((s) => s.mental)),
    combat: avg(SOLDIERS.map((s) => s.combat)),
    attendance: avg(SOLDIERS.map((s) => s.attendance)),
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Total Agniveers",
            value: SOLDIERS.length,
            accent: "text-[#1a2d4a]",
            border: "border-t-[#1a2d4a]",
          },
          {
            label: "Avg. Score",
            value: avgScore,
            accent: "text-[#4a5c2f]",
            border: "border-t-[#4a5c2f]",
          },
          {
            label: "Above 85",
            value: above85,
            accent: "text-emerald-600",
            border: "border-t-emerald-500",
          },
          {
            label: "Pass Rate",
            value: `${passRate}%`,
            accent: "text-sky-600",
            border: "border-t-sky-500",
          },
        ].map((c) => (
          <Card
            key={c.label}
            className={`border border-t-4 border-stone-200 ${c.border} bg-white shadow-sm`}
          >
            <CardContent className="px-4 pt-3 pb-3">
              <div className="text-[10px] tracking-wide text-stone-400 uppercase">
                {c.label}
              </div>
              <div className={`mt-1 text-2xl font-black ${c.accent}`}>
                {c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Category averages */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-stone-800">
              Battalion Category Averages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4">
            {[
              {
                key: "physical",
                label: "Physical Fitness",
                icon: <Dumbbell size={12} />,
              },
              {
                key: "weapons",
                label: "Weapons Handling",
                icon: <Target size={12} />,
              },
              {
                key: "mental",
                label: "Mental Resilience",
                icon: <Brain size={12} />,
              },
              {
                key: "combat",
                label: "Combat Drills",
                icon: <Swords size={12} />,
              },
              {
                key: "attendance",
                label: "Attendance",
                icon: <CalendarDays size={12} />,
              },
              {
                key: "discipline",
                label: "Discipline",
                icon: <ShieldCheck size={12} />,
              },
            ].map((row) => {
              const v = catAvgs[row.key as keyof typeof catAvgs]
              return (
                <div key={row.key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      {row.icon}
                      {row.label}
                    </div>
                    <span className={`text-sm font-black ${sc(v)}`}>{v}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className={`h-full rounded-full ${bc(v)}`}
                      style={{ width: `${v}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Needs attention + top performers */}
        <div className="space-y-3">
          {needsAttn.length > 0 && (
            <Card className="border border-amber-200 bg-amber-50 shadow-sm">
              <CardHeader className="pb-1.5">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                  <AlertTriangle size={14} /> Needs Attention (
                  {needsAttn.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-4 pb-4">
                {needsAttn.map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-stone-800">
                        {s.name}
                      </div>
                      <div className="text-xs text-stone-400">
                        {s.rank} · Score {s.overall}
                      </div>
                    </div>
                    <Badge className="border border-rose-200 bg-rose-100 text-xs text-rose-600">
                      Critical
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="border-stone-200 bg-white shadow-sm">
            <CardHeader className="pb-1.5">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Star size={14} className="text-amber-500" /> Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4">
              {[...SOLDIERS]
                .sort((a, b) => b.overall - a.overall)
                .slice(0, 3)
                .map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white ${
                        i === 0
                          ? "bg-amber-500"
                          : i === 1
                            ? "bg-stone-400"
                            : "bg-amber-700"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-stone-800">
                        {s.name}
                      </div>
                      <div className="text-xs text-stone-400">{s.rank}</div>
                    </div>
                    <span className={`text-sm font-black ${sc(s.overall)}`}>
                      {s.overall}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "View Scores",
                section: "scores" as Section,
                icon: <TrendingUp size={13} />,
              },
              {
                label: "View Program",
                section: "program" as Section,
                icon: <CalendarDays size={13} />,
              },
              {
                label: "Upload Data",
                section: "upload" as Section,
                icon: <Upload size={13} />,
              },
              {
                label: "Add Program Module",
                section: "program" as Section,
                icon: <Plus size={13} />,
              },
            ].map((q) => (
              <button
                key={q.label}
                onClick={() => setActive(q.section)}
                className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs font-medium text-stone-600 shadow-sm transition-all hover:border-stone-300 hover:shadow-md"
              >
                <span className="text-[#4a5c2f]">{q.icon}</span>
                {q.label}
                <ChevronRight size={11} className="ml-auto text-stone-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgramSection() {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({
    date: "",
    module: "Physical Endurance",
    soldiers: "6",
    remarks: "",
  })
  const [program, setProgram] = useState(PROGRAM)
  const [saved, setSaved] = useState(false)

  const handleAdd = () => {
    if (!form.date || !form.module) return
    setProgram((prev) => [
      {
        date: form.date,
        module: form.module,
        soldiers: +form.soldiers,
        avg: 0,
        remarks: form.remarks,
        status: "Scheduled",
      },
      ...prev,
    ])
    setForm({
      date: "",
      module: "Physical Endurance",
      soldiers: "6",
      remarks: "",
    })
    setShowAdd(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const typeColor: Record<string, string> = {
    Physical: "border-sky-200 bg-sky-50 text-sky-700",
    Weapons: "border-rose-200 bg-rose-50 text-rose-700",
    Tactics: "border-amber-200 bg-amber-50 text-amber-700",
    Combat: "border-violet-200 bg-violet-50 text-violet-700",
    "Map-Reading": "border-stone-200 bg-stone-50 text-stone-600",
    Sport: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-stone-900">
            Platoon Training Program
          </h1>
          <p className="mt-0.5 text-xs text-stone-400">
            Plan and track core army training modules for your platoon
          </p>
        </div>
        <Button
          onClick={() => setShowAdd(!showAdd)}
          className="shrink-0 gap-1.5 bg-[#1a2d4a] text-xs text-white hover:bg-[#243d61]"
        >
          <Plus size={13} /> {showAdd ? "Cancel" : "Add Module"}
        </Button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
          <CheckCircle2 size={14} /> Module added successfully.
        </div>
      )}

      {/* Add program module form */}
      {showAdd && (
        <Card className="border border-sky-200 bg-sky-50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-sky-800">
              Add New Training Module
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-stone-600">
                  Date <span className="text-rose-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className="h-8 bg-white text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-stone-600">
                  Module <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={form.module}
                  onValueChange={(v) => setForm((f) => ({ ...f, module: v }))}
                >
                  <SelectTrigger className="h-8 bg-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Physical Endurance",
                      "Weapons Proficiency",
                      "Tactical Drills",
                      "Battlefield First Aid",
                      "Night Navigation",
                      "Combat Fitness Assessment",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-stone-600">
                  Agniveers Present
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={form.soldiers}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, soldiers: e.target.value }))
                  }
                  className="h-8 bg-white text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-stone-600">
                  Remarks
                </Label>
                <Input
                  placeholder="Brief training details..."
                  value={form.remarks}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, remarks: e.target.value }))
                  }
                  className="h-8 bg-white text-sm"
                />
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="h-8 gap-1.5 bg-[#4a5c2f] text-xs text-white hover:bg-[#344228]"
            >
              <CheckCircle2 size={12} /> Save Module
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Program table */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                {[
                  "Date",
                  "Module",
                  "Agniveers",
                  "Avg. Score",
                  "Remarks",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-stone-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {program.map((mod, i) => (
                <tr
                  key={i}
                  className={`hover:bg-stone-50 ${mod.status === "Scheduled" ? "bg-sky-50/30" : ""}`}
                >
                  <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-stone-500">
                    {mod.date}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`border text-xs ${typeColor[mod.module] ?? typeColor["Physical Endurance"]}`}
                    >
                      {mod.module}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-stone-700">
                    {mod.soldiers}
                  </td>
                  <td className="px-4 py-3">
                    {mod.avg > 0 ? (
                      <span className={`text-sm font-black ${sc(mod.avg)}`}>
                        {mod.avg}
                      </span>
                    ) : (
                      <span className="text-xs text-stone-300">—</span>
                    )}
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-xs text-stone-500">
                    <span className="line-clamp-2">{mod.remarks || "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`border text-xs ${
                        mod.status === "Completed"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-sky-200 bg-sky-50 text-sky-700"
                      }`}
                    >
                      {mod.status === "Completed" ? (
                        <>
                          <CheckCircle2 size={10} className="mr-1 inline" />
                          Completed
                        </>
                      ) : (
                        mod.status
                      )}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2 text-xs text-stone-400">
          {program.filter((s) => s.status === "Completed").length} completed ·{" "}
          {program.filter((s) => s.status === "Scheduled").length} scheduled
        </div>
      </Card>
    </div>
  )
}

function UploadSection() {
  const [dragging, setDragging] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setUploaded(true)
    }, 2000)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">
          Upload Training Data
        </h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Bulk upload scores and training records via Excel or CSV
        </p>
      </div>

      {/* Upload zone */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
            <FileSpreadsheet size={14} className="text-emerald-600" /> Bulk
            Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5">
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-all ${
              dragging
                ? "border-[#4a5c2f] bg-[#f0f5e8]"
                : uploaded
                  ? "border-emerald-400 bg-emerald-50"
                  : processing
                    ? "border-amber-300 bg-amber-50"
                    : "border-stone-200 bg-stone-50 hover:border-stone-300"
            }`}
          >
            {processing ? (
              <>
                <div className="mb-3 text-3xl">⏳</div>
                <div className="text-sm font-semibold text-amber-700">
                  Processing file…
                </div>
                <div className="mt-1 text-xs text-stone-400">
                  Validating columns and importing scores
                </div>
              </>
            ) : uploaded ? (
              <>
                <CheckCircle2 size={40} className="mb-3 text-emerald-500" />
                <div className="text-sm font-bold text-emerald-700">
                  Upload Successful!
                </div>
                <div className="mt-1 text-xs text-stone-400">
                  6 records processed · 0 errors
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setUploaded(false)}
                  className="mt-3 border-stone-200 text-xs text-stone-600"
                >
                  Upload Another
                </Button>
              </>
            ) : (
              <>
                <FileSpreadsheet size={40} className="mb-3 text-[#4a5c2f]" />
                <div className="text-sm font-semibold text-stone-700">
                  Drag & drop your Excel file here
                </div>
                <div className="mt-1 text-xs text-stone-400">
                  .xlsx, .xls, .csv · Max 10 MB
                </div>
                <Button
                  size="sm"
                  className="mt-4 bg-[#1a2d4a] text-xs text-white hover:bg-[#243d61]"
                >
                  <Upload size={12} className="mr-1" /> Browse File
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Template */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Required Column Format
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4">
          <div className="overflow-x-auto rounded-lg bg-stone-900 px-4 py-3 font-mono text-xs text-emerald-400">
            soldier_id · training_date · training_module · running_min · pushups
            · pullups · shooting_pct · overall_score · remarks
          </div>
          <div className="space-y-1 text-xs text-stone-500">
            <div>
              • <strong>soldier_id</strong>: Must match existing Agniveer ID
              (e.g. AGN-2024-0101)
            </div>
            <div>
              • <strong>training_module</strong>: Physical Endurance / Weapons
              Proficiency / Tactical Drills / Battlefield First Aid etc.
            </div>
            <div>
              • <strong>overall_score</strong>: 0–100 (calculated field, or
              leave blank to auto-compute)
            </div>
            <div>
              • All score fields should be numeric · Leave blank cells if not
              applicable
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-stone-200 text-xs text-stone-600"
          >
            <Download size={12} /> Download Template (.xlsx)
          </Button>
        </CardContent>
      </Card>

      {/* Upload history */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Upload History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                {["File Name", "Uploaded On", "Records", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-stone-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {[
                {
                  file: "program_mar14_2025.xlsx",
                  date: "14 Mar 2025, 09:30",
                  records: 6,
                  status: "Success",
                },
                {
                  file: "program_mar05_2025.xlsx",
                  date: "05 Mar 2025, 10:15",
                  records: 6,
                  status: "Success",
                },
                {
                  file: "program_feb28_2025.xlsx",
                  date: "28 Feb 2025, 09:00",
                  records: 5,
                  status: "Partial",
                },
              ].map((r, i) => (
                <tr key={i} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-mono text-xs text-stone-600">
                    📄 {r.file}
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-400">{r.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-stone-700">
                    {r.records}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`border text-xs ${
                        r.status === "Success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TrainerPage() {
  const [section, setSection] = useState<Section>("dashboard")


  // const titles: Record<Section, string> = {
  //   dashboard: "Dashboard",
  //   scores: "Agniveer Scores",
  //   program: "Training Program",
  //   upload: "Upload Data",
  //   attendanceReport: "Attendance Report",
  // }

  return (
    <div className="flex min-h-screen w-full bg-[#f4f3ef] font-sans">
      <Sidebar active={section} setActive={setSection} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-base font-bold text-stone-900">
                Platoon Commander Dashboard
              </h1>
              <p className="text-xs text-stone-400">
                View, manage, and track your Agniveer platoon's performance and
                progress.
              </p>
            </div>
            <Badge className="shrink-0 border border-sky-200 bg-sky-50 text-xs text-sky-700">
              Trainer · Active
            </Badge>
          </div>
          <MobileNav active={section} setActive={setSection} />
        </header>
        <main className="mx-auto w-full flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {section === "dashboard" && (
            <DashboardSection setActive={setSection} />
          )}
          {section === "scores" && (
            <ScoresSectionWithAttendanceButton
              onViewAttendance={() => setSection("attendanceReport")
              }
              setSection={setSection}
            />
          )}
          {section === "attendanceReport" && (
            <div>
              <div className="mb-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 border-stone-200 text-xs text-stone-600"
                  onClick={() => setSection("scores")}
                >
                  ← Back to Agniveer Scores
                </Button>
              </div>
              <AttendanceReportPage />
            </div>
          )}
          {section === "program" && <ProgramSection />}
             {section === "report" && <ReportsSection report={INIT_RECORDS[0]} />}
          {section === "upload" && <UploadSection />}
        </main>
      </div>
    </div>
  )
}

function ReportsSection({ report }: { report: typeof INIT_RECORDS[0] }) {
  return (
    <div className="p-6 bg-stone-0 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Header Card - Army Style */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-stone-800 rounded">
                <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-800 tracking-tight">Medical Report</h1>
                <p className="text-xs text-stone-500">OFFICIAL HEALTH RECORD</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-stone-100 border border-stone-200 rounded">
              <span className="text-xs font-mono text-stone-600">CLASSIFIED</span>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-stone-400" />
              <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide">Patient Information</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-1">Full Name</label>
                <p className="text-sm font-medium text-stone-800">{report.soldierName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-1">Service No.</label>
                <p className="text-sm font-mono text-stone-800">{report.soldierId}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-1">Height</label>
                <p className="text-sm font-medium text-stone-800">{report.height}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-1">Weight</label>
                <p className="text-sm font-medium text-stone-800">{report.weight} kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-stone-400" />
              <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide">Vital Signs</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border-r border-stone-100 last:border-0">
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-2">BP</label>
                <p className="text-lg font-bold text-stone-800">{report.bp}</p>
              </div>
              <div className="border-r border-stone-100 last:border-0">
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-2">Heart Rate</label>
                <p className="text-lg font-bold text-stone-800">{report.hr} <span className="text-sm font-normal text-stone-500">bpm</span></p>
              </div>
              <div className="border-r border-stone-100 last:border-0">
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-2">Eye Sight</label>
                <p className="text-lg font-bold text-stone-800">{report.eyeSight}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase block mb-2">LASIK</label>
                <p className="text-lg font-bold text-stone-800">{report.lasikReport}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hospitalization */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-stone-400" />
              <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide">Hospitalization</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase block">Location</label>
                  <p className="text-sm font-medium text-stone-700">{report.hospitalLocation}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase block">Admit Date</label>
                  <p className="text-sm font-medium text-stone-700">{report.admitDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase block">Discharge Date</label>
                  <p className="text-sm font-medium text-stone-700">{report.dischargeDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis - Subdued alert */}
        <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-700 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Primary Diagnosis</h3>
              <p className="text-sm text-stone-700">{report.diagnosis}</p>
            </div>
          </div>
        </div>

        {/* Treatment */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-stone-400" />
              <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide">Treatment Plan</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="bg-stone-50 rounded p-4 border border-stone-200">
              <p className="text-sm text-stone-700 leading-relaxed">{report.treatment}</p>
            </div>
          </div>
        </div>

        {/* Notes and Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Notes */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-stone-50 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-4 bg-stone-400" />
                <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide">Clinical Notes</h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-stone-600 italic leading-relaxed">{report.notes}</p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-stone-50 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-4 bg-stone-400" />
                <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide">Follow-up & Medical Officer</h2>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-stone-100">
                <label className="text-xs font-semibold text-stone-500 uppercase">Follow-up Date</label>
                <p className="text-sm font-medium text-stone-800">{report.followup}</p>
              </div>
              <div className="flex justify-between items-center py-2">
                <label className="text-xs font-semibold text-stone-500 uppercase">Medical Officer</label>
                <p className="text-sm font-medium text-stone-800">{report.doctor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Signature Line */}
        <div className="pt-2 border-t border-stone-200">
          <div className="flex justify-end">
            <div className="text-right">
              <div className="h-px w-32 bg-stone-300 mb-1" />
              <p className="text-xs text-stone-400">Signature & Stamp</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* SMALL COMPONENTS */

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-zinc-500 uppercase">{label}</p>
      <p className="font-medium text-zinc-800">{value}</p>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div>
      <p className="text-xl font-semibold text-zinc-800">{value}</p>
      <p className="text-xs text-zinc-500 uppercase">{label}</p>
    </div>
  );
}

const INIT_RECORDS = [
  {
    id: "MR-001",
    soldierName: "Maj. Ravi Kumar",
    soldierId: "AGN-2024-0103",
    date: "15 Mar 2026",
    description: "Low Energy",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "High fever",
    status: "Under Care",
    followup: "22 Mar 2026",
    bp: "118/76",
    hr: "72",
    weight: "68",
    notes:
      "Soldier complaining of low energy during field obstacle training. Suggested rest and protein intake.",
    admitDate: "15 Mar 2026",
    dischargeDate: "18 Mar 2026",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "Rest (2 days), balanced diet recommendation.",
    prescriptions: "Iron supplement (21 days)",
    eyeSight: "6/6",
    height: "178 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-002",
    soldierName: "Jay Chauhan",
    soldierId: "AGN-2024-0104",
    date: "12 Mar 2026",
    description: "Severe chills",
    doctor: "Col. Sharma",
    doctorDesignation: "Orthopedic Surgeon",
    diagnosis: "Knee Tendinitis",
    status: "Under Care",
    followup: "19 Mar 2026",
    bp: "116/74",
    hr: "68",
    weight: "72",
    notes:
      "Acute knee pain following long march practice. Restricted from high-impact exercises and loaded marching.",
    admitDate: "12 Mar 2026",
    dischargeDate: "16 Mar 2026",
    hospitalLocation: "Command Hospital Pune",
    treatment: "Ice therapy, physiotherapy 3x weekly.",
    prescriptions: "Ibuprofen 400mg (10 days), pain relief gel.",
    eyeSight: "6/6",
    height: "175 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-003",
    soldierName: "Om Singh",
    soldierId: "AGN-2024-0203",
    date: "10 Mar 2026",
    description: "Deep Weakness",
    doctor: "Maj. Sharma",
    doctorDesignation: "Senior Medical Officer",
    diagnosis: "Knee pain",
    status: "Under Care",
    followup: "24 Mar 2026",
    bp: "112/70",
    hr: "76",
    weight: "65",
    notes:
      "Soldier showing signs of fatigue during parade. Additional rest and iron supplements advised.",
    admitDate: "10 Mar 2026",
    dischargeDate: "14 Mar 2026",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "Iron-rich diet, light duty schedule.",
    prescriptions: "Iron tablets daily (30 days), multivitamin.",
    eyeSight: "6/6",
    height: "172 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-004",
    soldierName: "Kishan Patel",
    soldierId: "AGN-2024-0403",
    date: "05 Mar 2026",
    description: "Severe Headache and Intense Chills",
    doctor: "Col. Chauhan",
    doctorDesignation: "Chief Medical Officer",
    diagnosis: "Body ache",
    status: "Under Care",
    followup: "09 Mar 2026",
    bp: "122/80",
    hr: "74",
    weight: "70",
    notes:
      "Severe headache, intense chills, and high fever after overnight field exercises. Soldier appears extremely weak and low on energy.",
    admitDate: "05 Mar 2026",
    dischargeDate: "08 Mar 2026",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "Paracetamol, IV fluids, isolation for observation.",
    prescriptions:
      "Paracetamol 500mg (as needed), antibiotics (pending culture)",
    eyeSight: "6/5",
    height: "180 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-005",
    soldierName: "Manish Rawat",
    soldierId: "AGN-2024-0506",
    date: "02 Mar 2026",
    description: "High Fever and Body Aches after Night Outpost Duty",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Headache",
    status: "Discharge",
    followup: "07 Mar 2026",
    bp: "119/78",
    hr: "80",
    weight: "64",
    notes:
      "Reported shivering and muscular aches after 24-hour guard rotation. Kept under observation, daily temperature monitoring.",
    admitDate: "02 Mar 2026",
    dischargeDate: "07 Mar 2026",
    hospitalLocation: "Army Field Hospital Ambala",
    treatment: "ORS, paracetamol, fever monitoring.",
    prescriptions: "Paracetamol 500mg, hydration therapy",
    eyeSight: "6/6",
    height: "176 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-006",
    soldierName: "Arjun Singh",
    soldierId: "AGN-2024-0607",
    date: "28 Feb 2026",
    description: "Shoulder Injury During Live-Fire Drill",
    doctor: "Maj. Rajput",
    doctorDesignation: "Senior Medical Officer",
    diagnosis: "Weakness",
    status: "Discharge",
    followup: "10 Mar 2026",
    bp: "117/76",
    hr: "77",
    weight: "75",
    notes:
      "Injury sustained during rifle drill. Movement restricted, not fit for parade or strenuous PT.",
    admitDate: "28 Feb 2026",
    dischargeDate: "10 Mar 2026",
    hospitalLocation: "Command Hospital Pune",
    treatment: "Arm sling, pain management, physiotherapy.",
    prescriptions: "Analgesic as prescribed, muscle relaxant (5 days)",
    eyeSight: "6/6",
    height: "179 cm",
    lasikReport: "N/A",
  },
];