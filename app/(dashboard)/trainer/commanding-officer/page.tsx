"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Upload,
  CalendarDays,
  TrendingUp,
  LogOut,
  User,
  ClipboardList,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Plus,
  Sword,
  Target,
  Users,
  UserCheck,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScoresSection } from "../comp/ScoresSection"
import { PLATOONS } from "../data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AttendanceReportPage from "../comp/AttendenceReport"

const COMPANIES = [
  {
    id: "C-001",
    name: "Sikh Regiment",
    avgPhysical: 84.2,
    avgWeapons: 79.5,
    avgCombat: 81.4,
    avgTactics: 77.8,
    overall: 80.7,
    totalPlatoons: 6,
    color: "#25447C",
  },
  {
    id: "C-002",
    name: "Punjab Regiment",
    avgPhysical: 79.8,
    avgWeapons: 76.3,
    avgCombat: 78.4,
    avgTactics: 80.2,
    overall: 78.7,
    totalPlatoons: 4,
    color: "#4A5C2F",
  },
  {
    id: "C-003",
    name: "Grenadiers",
    avgPhysical: 87.1,
    avgWeapons: 83.7,
    avgCombat: 86.1,
    avgTactics: 81.5,
    overall: 84.6,
    totalPlatoons: 5,
    color: "#2767A0",
  },
  {
    id: "C-004",
    name: "Jat Regiment",
    avgPhysical: 73.5,
    avgWeapons: 77.8,
    avgCombat: 74.0,
    avgTactics: 73.6,
    overall: 74.7,
    totalPlatoons: 7,
    color: "#775222",
  },
]

const DASHBOARD_CARD_DATA = [
  {
    title: "Total Companies",
    value: COMPANIES.length,
    icon: <LayoutDashboard size={18} className="text-[#25447C]" />, // lucide
  },
  {
    title: "Avg. Physical Score",
    value: (
      COMPANIES.reduce((sum, c) => sum + c.avgPhysical, 0) / COMPANIES.length
    ).toFixed(1),
    icon: <User size={18} className="text-[#2767A0]" />, // lucide (can also use Lucide "Activity" or "Users" if needed)
  },
  {
    title: "Avg. Weapons Score",
    value: (
      COMPANIES.reduce((sum, c) => sum + c.avgWeapons, 0) / COMPANIES.length
    ).toFixed(1),
    icon: <ClipboardList size={18} className="text-[#4A5C2F]" />, // lucide (no gun icon: ClipboardList for stats or list)
  },
  {
    title: "Avg. Combat Score",
    value: (
      COMPANIES.reduce((sum, c) => sum + c.avgCombat, 0) / COMPANIES.length
    ).toFixed(1),
    icon: <Sword size={18} className="text-[#775222]" />, // lucide (Sword for combat)
  },
  {
    title: "Avg. Tactics Score",
    value: (
      COMPANIES.reduce((sum, c) => sum + c.avgTactics, 0) / COMPANIES.length
    ).toFixed(1),
    icon: <Target size={18} className="text-[#25447C]" />, // lucide (Target for tactics)
  },
]

function DashboardSection({ gotoPlatoons }: { gotoPlatoons: () => void }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-5">
        {DASHBOARD_CARD_DATA.map((c, index) => {
          const colors = ["#25447C", "#FF8C1A", "#4A5C2F", "#FF9800", "#25447C"]

          const color = colors[index]

          return (
            <Card
              key={c.title}
              className="overflow-hidden border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              style={{
                borderTopWidth: "4px",
                borderTopColor: color,
              }}
            >
              <CardContent className="px-5 py-4">
                {/* icon */}
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="rounded-full p-2"
                    style={{
                      backgroundColor: `${color}15`,
                    }}
                  >
                    {c.icon}
                  </div>
                </div>

                {/* value */}
                <div
                  className="text-3xl font-black"
                  style={{
                    color,
                  }}
                >
                  {c.value}
                </div>

                {/* label */}
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  <span className="text-[11px] leading-tight font-semibold tracking-wide text-stone-400 uppercase">
                    {c.title}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mx-auto w-full">
        <h2 className="mb-3 text-lg font-bold tracking-tight text-stone-700">
          Company Overview
        </h2>

        <div className="flex flex-col gap-4">
          {COMPANIES.map((company) => (
            <div
              key={company.id}
              className="mb-2 flex flex-col gap-4 rounded-xl border bg-white p-6 shadow transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-full border-4"
                  style={{
                    borderColor: company.color,
                    background: "#f1f7ff",
                    opacity: 0.6,
                  }}
                >
                  <span
                    className="flex h-full w-full items-center justify-center text-[1.3rem] font-black"
                    style={{ color: company.color, opacity: 0.6 }}
                  >
                    {company.name.charAt(0)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-lg font-black">
                    {company.name}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    Platoons: {company.totalPlatoons}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                    Average Performance:{" "}
                    <span className="text-lg font-black text-stone-800">
                      {company.overall}
                    </span>
                  </span>
                </div>
              </div>
              <div className="mb-2 grid grid-cols-2 gap-4 border-b pb-3 md:grid-cols-4">
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Physical</span>
                  <span className="text-lg font-extrabold text-stone-700">
                    {company.avgPhysical}
                  </span>
                </div>
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Weapons</span>
                  <span className="text-lg font-extrabold text-[#4A5C2F]">
                    {company.avgWeapons}
                  </span>
                </div>
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Combat</span>
                  <span className="text-lg font-extrabold text-[#775222]">
                    {company.avgCombat}
                  </span>
                </div>
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Tactics</span>
                  <span className="text-lg font-extrabold text-stone-800">
                    {company.avgTactics}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-stone-500">
                    Total Platoons:{" "}
                    <span className="font-bold text-stone-800">
                      {company.totalPlatoons}
                    </span>
                  </span>
                </div>
                <Button
                  size="sm"
                  className="bg-opacity-70 rounded-full bg-[#25447C] px-5 py-1.5 text-xs font-semibold text-white shadow hover:bg-[#25447C]/80"
                  onClick={gotoPlatoons}
                >
                  View Platoons
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="mt-6 text-center text-xs text-stone-500">
        Company overview - view scores, details, and actions directly.
      </footer>
    </div>
  )
}

// --- ADD: Attendance Report Section & Nav entry ---

type Section =
  | "dashboard"
  | "platoons"
  | "upload"
  | "program"
  | "scores"
  | "attendance"

// Change label containing "Soldier" to "Agniveer" in NAV
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <User size={14} /> },
  { id: "platoons", label: "Platoons", icon: <LayoutDashboard size={14} /> },
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
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col overflow-auto border-r border-stone-200 bg-white md:flex">
      <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-xl font-bold text-white">
            C
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-stone-800">
              Company Commander
            </div>
            <div className="font-mono text-[10px] text-orange-500">Portal</div>
            <div className="text-[10px] text-stone-400">
              {active === "dashboard"
                ? "Dashboard"
                : active.charAt(0).toUpperCase() + active.slice(1)}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Badge className="border border-sky-200 bg-sky-50 text-[10px] text-sky-700">
            Command · Active
          </Badge>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        <p className="px-2 pt-2 pb-1 text-[9px] font-bold tracking-widest text-stone-400 uppercase">
          Company Officer Menu
        </p>
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
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

const DASHBOARD_CARD_DATAS = [
  {
    title: "Total Platoons",
    value: PLATOONS.length,
    icon: <LayoutDashboard size={18} className="text-[#25447C]" />,
  },
  {
    title: "Avg. Physical Score",
    value: (
      PLATOONS.reduce((sum, p) => sum + p.avgPhysical, 0) / PLATOONS.length
    ).toFixed(1),
    icon: <User size={18} className="text-[#2767A0]" />,
  },
  {
    title: "Avg. Weapons Score",
    value: (
      PLATOONS.reduce((sum, p) => sum + p.avgWeapons, 0) / PLATOONS.length
    ).toFixed(1),
    icon: <ClipboardList size={18} className="text-[#4A5C2F]" />,
  },
  {
    title: "Avg. Combat Score",
    value: (
      PLATOONS.reduce((sum, p) => sum + p.avgCombat, 0) / PLATOONS.length
    ).toFixed(1),
    icon: <Sword size={18} className="text-[#775222]" />,
  },
  {
    title: "Avg. Tactics Score",
    value: (
      PLATOONS.reduce((sum, p) => sum + p.avgTactics, 0) / PLATOONS.length
    ).toFixed(1),
    icon: <Target size={18} className="text-[#25447C]" />,
  },
]

function PlatoonsSection({ setActive }: { setActive: (s: Section) => void }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-5">
        {DASHBOARD_CARD_DATAS.map((c, index) => {
          const colors = ["#25447C", "#FF8C1A", "#4A5C2F", "#FF9800", "#25447C"]

          const color = colors[index]

          return (
            <Card
              key={c.title}
              className="overflow-hidden border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              style={{
                borderTopWidth: "4px",
                borderTopColor: color,
              }}
            >
              <CardContent className="px-5 py-4">
                {/* icon */}
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="rounded-full p-2"
                    style={{
                      backgroundColor: `${color}15`,
                    }}
                  >
                    {c.icon}
                  </div>
                </div>

                {/* value */}
                <div
                  className="text-3xl font-black"
                  style={{
                    color,
                  }}
                >
                  {c.value}
                </div>

                {/* label */}
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  <span className="text-[11px] leading-tight font-semibold tracking-wide text-stone-400 uppercase">
                    {c.title}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="mx-auto w-full">
        <h2 className="mb-3 text-lg font-bold tracking-tight text-stone-700">
          Platoon Overview
        </h2>

        <div className="flex flex-col gap-4">
          {PLATOONS.map((platoon) => (
            <div
              key={platoon.id}
              className="mb-2 flex flex-col gap-4 rounded-xl border bg-white p-6 shadow transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-full border-4"
                  style={{
                    borderColor: platoon.color,
                    background: "#f1f7ff",
                    opacity: 0.6,
                  }}
                >
                  <span
                    className="flex h-full w-full items-center justify-center text-[1.3rem] font-black"
                    style={{ color: platoon.color, opacity: 0.6 }}
                  >
                    {platoon.name.charAt(0)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-lg font-black">
                    {platoon.name}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    Company: {platoon.company}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                    Overall Performance:{" "}
                    <span className="text-lg font-black text-stone-800">
                      {platoon.overall}
                    </span>
                  </span>
                  <span className="mt-0.5 text-xs text-stone-400">
                    Total Agniveers:{" "}
                    <span className="font-bold text-stone-700">
                      {platoon.totalSoldiers}
                    </span>
                  </span>
                </div>
              </div>
              <div className="mb-2 grid grid-cols-2 gap-4 border-b pb-3 md:grid-cols-4">
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Physical</span>
                  <span className="text-lg font-extrabold text-stone-700">
                    {platoon.avgPhysical}
                  </span>
                </div>
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Weapons</span>
                  <span className="text-lg font-extrabold text-[#4A5C2F]">
                    {platoon.avgWeapons}
                  </span>
                </div>
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Combat</span>
                  <span className="text-lg font-extrabold text-[#775222]">
                    {platoon.avgCombat}
                  </span>
                </div>
                <div className="flex flex-col items-center text-xs">
                  <span className="mb-1 text-stone-500">Tactics</span>
                  <span className="text-lg font-extrabold text-stone-800">
                    {platoon.avgTactics}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-stone-500">
                    Platoon ID:{" "}
                    <span className="font-bold text-stone-800">
                      {platoon.id}
                    </span>
                  </span>
                </div>
                <Button
                  onClick={() => setActive("scores")}
                  size="sm"
                  className="bg-opacity-70 rounded-full bg-[#25447C] px-5 py-1.5 text-xs font-semibold text-white shadow hover:bg-[#25447C]/80"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Army-style training program data, replacing SESSIONS
const PROGRAM = [
  {
    date: "14 Mar 2025",
    module: "Physical Endurance",
    soldiers: 6,
    avg: 88,
    remarks: "Morning PT: 5km timed run, platoon achieved new speed record.",
    status: "Completed",
  },
  {
    date: "13 Mar 2025",
    module: "Weapons Proficiency",
    soldiers: 6,
    avg: 84,
    remarks:
      "Live range: INSAS & SLR marksmanship, all passed. Focused on accuracy.",
    status: "Completed",
  },
  {
    date: "12 Mar 2025",
    module: "Tactical Drills",
    soldiers: 6,
    avg: 81,
    remarks: "Team obstacle navigation, section attack practice.",
    status: "Completed",
  },
  {
    date: "11 Mar 2025",
    module: "Battlefield First Aid",
    soldiers: 6,
    avg: 90,
    remarks:
      "Basic field medical training, rapid-response simulation. All soldiers attended.",
    status: "Completed",
  },
  {
    date: "10 Mar 2025",
    module: "Night Navigation",
    soldiers: 5,
    avg: 76,
    remarks: "Night compass navigation. Kavita on leave.",
    status: "Completed",
  },
  {
    date: "16 Mar 2025",
    module: "Weapons Proficiency",
    soldiers: 6,
    avg: 0,
    remarks: "Scheduled: INSAS night firing.",
    status: "Scheduled",
  },
  {
    date: "17 Mar 2025",
    module: "Combat Fitness Assessment",
    soldiers: 6,
    avg: 0,
    remarks: "Planned: CFT route march (10km, load carry with rifle).",
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
// ── PROGRAM ───────────────────────────────────────────────────────────────────
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
    "Physical Endurance": "border-sky-200 bg-sky-50 text-sky-700",
    "Weapons Proficiency": "border-rose-200 bg-rose-50 text-rose-700",
    "Tactical Drills": "border-amber-200 bg-amber-50 text-amber-700",
    "Battlefield First Aid": "border-violet-200 bg-violet-50 text-violet-700",
    "Night Navigation": "border-stone-200 bg-stone-50 text-stone-600",
    "Combat Fitness Assessment":
      "border-emerald-200 bg-emerald-50 text-emerald-700",
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

// ── UPLOAD ────────────────────────────────────────────────────────────────────
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

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function CommandingOfficerPage() {
  const [section, setSection] = useState<Section>("dashboard")
  const router = useRouter()

  // Handle the correct title
  let customTitle = "Dashboard"
  if (section === "dashboard") {
    customTitle = "Company Officers Dashboard"
  } else if (section === "platoons") {
    customTitle = "Platoons"
  } else if (section === "scores") {
    // Try to read from local storage
    let sel = null
    if (typeof window !== "undefined") {
      try {
        sel = window.localStorage.getItem("selected_commander")
      } catch (_e) {}
    }
    if (sel) {
      try {
        const obj = typeof sel === "string" ? JSON.parse(sel) : sel
        customTitle = `${obj?.name ?? ""} · Platoon Commander's Agniveer Scores`
      } catch {
        customTitle = "Platoon Commander's Agniveer Scores"
      }
    } else {
      customTitle = "Platoon Commander's Agniveer Scores"
    }
  } else if (section === "attendance") {
    customTitle = "Attendance Report"
  } else if (section === "program") {
    customTitle = "Program"
  } else if (section === "upload") {
    customTitle = "Upload Data"
  }

  // Function to go to platoons section
  function gotoPlatoons() {
    setSection("platoons")
  }

  return (
    <div className="flex min-h-screen w-full bg-[#f4f3ef] font-sans">
      <Sidebar active={section} setActive={setSection} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-base font-bold text-stone-900">
                {customTitle}
              </h1>
              <p className="text-xs text-stone-400">
                Company Officer · {customTitle}
              </p>
            </div>
            <Badge className="shrink-0 border border-sky-200 bg-sky-50 text-xs text-sky-700">
              Company Officer · Active
            </Badge>
          </div>
          <MobileNav active={section} setActive={setSection} />
        </header>
        <main className="mx-auto w-full flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {section === "dashboard" && (
            <DashboardSection gotoPlatoons={gotoPlatoons} />
          )}
          {section === "platoons" && <PlatoonsSection setActive={setSection} />}
          {section === "scores" && (
            <ScoresSection onClick={() => setSection("attendance")} />
          )}
          {section === "attendance" && <AttendanceReportPage />}
          {section === "program" && <ProgramSection />}
          {section === "upload" && <UploadSection />}
        </main>
      </div>
    </div>
  )
}
