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
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScoresSection } from "../comp/ScoresSection"
import { PLATOON_COMMANDERS } from "../data"
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

// Static data for Company Officers
const COMPANY_OFFICERS = [
  {
    id: "CO-001",
    name: "Col. Aarav Sharma",
    designation: "Company Officer",
    profileImg:
      "https://media.istockphoto.com/id/1215339100/photo/indian-military-man-stock-images.jpg?s=1024x1024&w=is&k=20&c=LTRWp56rxhKTjYO0KVolWiU_e-ySgMxf3-jQJYIpJiI=",
    serviceNo: "IC-210056A",
    company: "Alpha Company",
    commandSince: "2022-03-01",
    reports: 6,
    medals: ["VSM", "Sena Medal"],
    email: "aarav.sharma@army.co.in",
    phone: "+91 98765 43210",
  },
  {
    id: "CO-002",
    name: "Lt. Col. Rajat Singh",
    designation: "Company Officer",
    profileImg:
      "https://i.pinimg.com/736x/d3/6e/5d/d36e5d1e5bed79014c0609c04d72e8b8.jpg",
    serviceNo: "IC-220123B",
    company: "Bravo Company",
    commandSince: "2021-11-15",
    reports: 4,
    medals: ["VSM"],
    email: "rajat.singh@army.co.in",
    phone: "+91 98765 43212",
  },
  {
    id: "CO-003",
    name: "Maj. Vikram Yadav",
    designation: "Company Officer",
    profileImg:
      "https://i.pinimg.com/736x/12/d4/14/12d4141533884aa35c6ade513dbea2e8.jpg",
    serviceNo: "IC-230345C",
    company: "Charlie Company",
    commandSince: "2020-07-24",
    reports: 5,
    medals: ["Sena Medal"],
    email: "vikram.yadav@army.co.in",
    phone: "+91 98765 43213",
  },
  {
    id: "CO-004",
    name: "Capt. Ankit Verma",
    designation: "Company Officer",
    profileImg:
      "https://i.pinimg.com/736x/d3/cf/e1/d3cfe116b49304520c6b292e74b24814.jpg",
    serviceNo: "IC-240789D",
    company: "Delta Company",
    commandSince: "2023-01-10",
    reports: 7,
    medals: [],
    email: "ankit.verma@army.co.in",
    phone: "+91 98765 43214",
  },
  {
    id: "CO-005",
    name: "Lt. Col. Sandeep Joshi",
    designation: "Company Officer",
    profileImg:
      "https://media.istockphoto.com/id/90833602/photo/profile-of-an-asian-man.jpg?s=2048x2048&w=is&k=20&c=j2VMoUuALKNkwAIVDeHArexIoJ0RBc1EPFJpzwDRu2k=",
    serviceNo: "IC-250321E",
    company: "Echo Company",
    commandSince: "2020-09-30",
    reports: 3,
    medals: ["VSM", "COAS Commendation"],
    email: "sandeep.joshi@army.co.in",
    phone: "+91 98765 43215",
  },
  {
    id: "CO-006",
    name: "Maj. Akash Mehra",
    designation: "Company Officer",
    profileImg:
      "https://i.pinimg.com/736x/db/2f/77/db2f7713aad075be54219fa89427fcc7.jpg",
    serviceNo: "IC-263456F",
    company: "Foxtrot Company",
    commandSince: "2022-05-20",
    reports: 4,
    medals: [],
    email: "akash.mehra@army.co.in",
    phone: "+91 98765 43216",
  },
]

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
    label: "Program",
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

// Company Officers dashboard section
function DashboardSection({ gotoPlatoons }: { gotoPlatoons: () => void }) {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-[#1a2d4a]">Company Officers</h1>
        <p className="mt-1 text-sm text-stone-500">
          Overview of company officers in command. Click a card to view their
          platoons.
        </p>
      </section>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {COMPANY_OFFICERS.map((officer) => (
          <Card
            key={officer.id}
            className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[#6d7da7] bg-linear-to-br from-[#f4f7fb] to-[#e5eaf3] shadow-lg transition-all hover:border-[#25447C] hover:shadow-xl"
            onClick={gotoPlatoons}
          >
            <CardHeader className="flex flex-row items-center gap-4 pt-6 pb-0">
              <img
                src={officer.profileImg}
                className="h-20 w-20 rounded-full border-4 border-[#25447C] object-cover shadow-lg"
                alt={officer.name}
                style={{ background: "#dbe9ff" }}
              />
              <div>
                <CardTitle className="mb-0.5 text-xl font-extrabold text-[#25447C]">
                  {officer.name}
                </CardTitle>
                <span className="text-[13px] font-semibold text-stone-600">
                  {officer.designation}
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-3">
              <div className="mb-1 flex flex-wrap items-center gap-3 text-xs">
                <Badge className="border border-emerald-200 bg-emerald-50 px-2 text-muted-foreground">
                  {officer.company}
                </Badge>
                <Badge className="border border-sky-200 bg-sky-50 px-2 text-muted-foreground">
                  {officer.reports} Platoons
                </Badge>
                <Badge className="border-none bg-[#25447C] px-2 text-white">
                  Cmd. since: {officer.commandSince}
                </Badge>
                {officer.medals?.length > 0 && (
                  <Badge className="border border-amber-200 bg-amber-50 px-2 text-amber-700">
                    <span className="font-medium">
                      {officer.medals.join(", ")}
                    </span>
                  </Badge>
                )}
              </div>
              <div className="mt-3 mb-4 flex flex-col gap-1 text-xs text-stone-700">
                <div>
                  <span className="text-stone-400">Service No: </span>
                  {officer.serviceNo}
                </div>
                <div>
                  <span className="text-stone-400">Email: </span>
                  {officer.email}
                </div>
                <div>
                  <span className="text-stone-400">Phone: </span>
                  {officer.phone}
                </div>
              </div>
              <Button
                size="sm"
                className="mt-3 w-full rounded-full bg-[#25447C] py-2 text-xs font-semibold text-white shadow hover:bg-[#48619a]"
                onClick={gotoPlatoons}
              >
                View Platoons
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="mt-6 text-center text-xs text-stone-500">
        Tap or click on a company officer card to see their platoons.
      </footer>
    </div>
  )
}

function PlatoonsSection({ setActive }: { setActive: (s: Section) => void }) {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-[#1a2d4a]">Platoons Overview</h1>
        <p className="mt-1 text-sm text-stone-500">
          Explore up-to-date profiles, key roles, and quick stats for each
          platoon or company leader.
        </p>
      </section>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLATOON_COMMANDERS.map((cmd) => (
          <Card
            key={cmd.id}
            className="group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-[#b3b7bf] bg-white shadow-lg transition-all hover:border-[#25447C] hover:shadow-xl"
            onClick={() => {
              setActive("scores")
              window.localStorage.setItem(
                "selected_commander",
                JSON.stringify(cmd)
              )
            }}
          >
            <CardHeader className="flex flex-col items-center pt-6 pb-0">
              <img
                src={cmd.profileImg}
                className="mb-3 h-20 w-20 rounded-full border-4 border-[#25447C] object-cover shadow-lg"
                alt={cmd.name}
                style={{ background: "#cfd9eb" }}
              />
              <CardTitle className="mb-1 truncate text-center text-lg font-bold text-[#25447C]">
                {cmd.name}
              </CardTitle>
              <span className="mb-1 text-[13px] text-stone-600">
                {cmd.designation}
              </span>
              <div className="mt-1 flex flex-wrap justify-center gap-2">
                <Badge className="border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs text-sky-700">
                  {cmd.soldiers} Agniveers
                </Badge>
                <Badge className="border-none bg-[#25447C] px-2 py-0.5 text-xs text-white">
                  Joined: {cmd.joined}
                </Badge>
                {cmd.medals.length > 0 && (
                  <Badge className="border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                    <span className="font-medium">{cmd.medals.join(", ")}</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-3 px-6 py-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center text-sm font-semibold text-stone-800">
                  <span className="mr-1 text-stone-400">Battalion:</span>
                  <span className="truncate">{cmd.battalion}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-stone-600">
                  <div>
                    <span className="text-stone-400">ID:</span> {cmd.id}
                  </div>
                  <div>
                    <span className="text-stone-400">Svc No:</span>{" "}
                    {cmd.serviceNo}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  size="sm"
                  className="w-[85%] rounded-full bg-[#25447C] py-2 text-xs font-semibold text-white shadow transition-colors hover:bg-[#48619a]"
                >
                  View Agniveer Scores
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <footer className="mt-6 text-center text-xs text-stone-500">
        Tap or click on any commander to see
        <span className="mx-1 font-bold text-[#25447C]">
          their platoon's Agniveer scores.
        </span>
      </footer>
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
