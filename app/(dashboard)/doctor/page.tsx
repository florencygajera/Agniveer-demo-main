"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
    LayoutDashboard, FilePlus, BarChart3, Search,
    HeartPulse, AlertTriangle, CheckCircle2, Clock,
    ChevronRight, User, Stethoscope, Activity,
    Pill, LogOut, Plus, X, CalendarDays, Shield,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// ── Types ─────────────────────────────────────────────────────────────────────
type Section = "dashboard" | "add" | "records" | "stats"

// ── Data ──────────────────────────────────────────────────────────────────────
const DOCTOR = { name: "Dr. Sunita Rao", id: "MED-001", role: "Medical Officer", unit: "Agnipath Command" }

const INIT_RECORDS = [
    { id: "MR-001", soldierName: "Arjun Mehra", soldierId: "AGN-2024-0103", date: "01 Mar 2025", type: "Regular Checkup", doctor: "Dr. Sunita Rao", diagnosis: "Fit for Duty", status: "Normal", followup: "01 Sep 2025", bp: "118/76", hr: "64", weight: "72", notes: "Excellent fitness. No issues." },
    { id: "MR-002", soldierName: "Rajveer Singh", soldierId: "AGN-2024-0101", date: "01 Mar 2025", type: "Regular Checkup", doctor: "Dr. Sunita Rao", diagnosis: "Fit for Duty", status: "Normal", followup: "01 Sep 2025", bp: "120/78", hr: "68", weight: "68", notes: "Good overall health." },
    { id: "MR-003", soldierName: "Sunil Kumar", soldierId: "AGN-2024-0104", date: "15 Jan 2025", type: "Treatment", doctor: "Dr. Rajan Mehta", diagnosis: "Minor sprain — right ankle", status: "Recovered", followup: "15 Mar 2025", bp: "116/74", hr: "72", weight: "65", notes: "Ankle recovered. Cleared for full duty." },
    { id: "MR-004", soldierName: "Rohit Sharma", soldierId: "AGN-2024-0203", date: "20 Feb 2025", type: "Treatment", doctor: "Dr. Sunita Rao", diagnosis: "Knee pain — patellofemoral", status: "Under Observation", followup: "20 Mar 2025", bp: "122/80", hr: "76", weight: "70", notes: "Restricted from high-impact training for 3 weeks." },
    { id: "MR-005", soldierName: "Santosh More", soldierId: "AGN-2024-0403", date: "10 Feb 2025", type: "Treatment", doctor: "Dr. Sunita Rao", diagnosis: "Lower back strain", status: "Under Observation", followup: "10 Mar 2025", bp: "124/82", hr: "74", weight: "67", notes: "Physiotherapy recommended. Avoid heavy lifting." },
    { id: "MR-006", soldierName: "Priya Sharma", soldierId: "AGN-2024-0102", date: "01 Mar 2025", type: "Regular Checkup", doctor: "Dr. Sunita Rao", diagnosis: "Fit for Duty", status: "Normal", followup: "01 Sep 2025", bp: "110/70", hr: "66", weight: "56", notes: "All vitals normal. BMI optimal." },
    { id: "MR-007", soldierName: "Vikram Nair", soldierId: "AGN-2024-0201", date: "15 Feb 2025", type: "Regular Checkup", doctor: "Dr. Sunita Rao", diagnosis: "Fit for Duty", status: "Normal", followup: "15 Aug 2025", bp: "116/74", hr: "62", weight: "74", notes: "Outstanding physical fitness." },
    { id: "MR-008", soldierName: "Ananya Krishnan", soldierId: "AGN-2024-0202", date: "01 Mar 2025", type: "Regular Checkup", doctor: "Dr. Sunita Rao", diagnosis: "Fit for Duty", status: "Normal", followup: "01 Sep 2025", bp: "108/68", hr: "64", weight: "58", notes: "Normal checkup. No concerns." },
]

const SOLDIERS_LIST = [
    "Rajveer Singh Chauhan (AGN-2024-0101)", "Priya Sharma (AGN-2024-0102)",
    "Arjun Mehra (AGN-2024-0103)", "Sunil Kumar (AGN-2024-0104)",
    "Kavita Rajput (AGN-2024-0105)", "Mahesh Choudhary (AGN-2024-0106)",
    "Vikram Nair (AGN-2024-0201)", "Ananya Krishnan (AGN-2024-0202)",
    "Rohit Sharma (AGN-2024-0203)", "Deepak Yadav (AGN-2024-0204)",
    "Sourav Das (AGN-2024-0301)", "Rekha Bose (AGN-2024-0302)",
    "Amit Ghosh (AGN-2024-0303)", "Ranjit Singh (AGN-2024-0304)",
    "Suresh Patil (AGN-2024-0401)", "Rohini Jadhav (AGN-2024-0402)",
    "Santosh More (AGN-2024-0403)", "Vijay Deshmukh (AGN-2024-0404)",
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function statusStyle(s: string) {
    if (s === "Normal") return "border-emerald-200 bg-emerald-50 text-emerald-700"
    if (s === "Recovered") return "border-sky-200 bg-sky-50 text-sky-700"
    if (s === "Under Observation") return "border-amber-200 bg-amber-50 text-amber-700"
    return "border-rose-200 bg-rose-50 text-rose-600"
}

function typeColor(t: string) {
    if (t === "Regular Checkup") return "border-emerald-200 bg-emerald-50 text-emerald-700"
    if (t === "Treatment") return "border-amber-200 bg-amber-50 text-amber-700"
    if (t === "Emergency") return "border-rose-200 bg-rose-50 text-rose-600"
    return "border-stone-200 bg-stone-50 text-stone-600"
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
    { id: "records", label: "Medical Records", icon: <HeartPulse size={14} /> },
    { id: "add", label: "Add Record", icon: <FilePlus size={14} /> },
    { id: "stats", label: "Health Stats", icon: <BarChart3 size={14} /> },
]

function Sidebar({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
    return (
        <aside className="hidden w-56 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
            <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-sm font-bold">S</div>
                    <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-stone-800">{DOCTOR.name}</div>
                        <div className="font-mono text-[10px] text-orange-500">{DOCTOR.id}</div>
                        <div className="text-[10px] text-stone-400">{DOCTOR.role}</div>
                    </div>
                </div>
                <div className="mt-2">
                    <Badge className="border border-rose-200 bg-rose-50 text-[10px] text-rose-600">Medical Officer</Badge>
                </div>
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 p-2">
                <p className="px-2 pt-2 pb-1 text-[9px] font-bold uppercase tracking-widest text-stone-400">Medical Portal</p>
                {NAV.map(n => (
                    <button key={n.id} onClick={() => setActive(n.id)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${active === n.id ? "bg-rose-600 text-white shadow-sm" : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                    }`}>
                {n.icon}{n.label}
            </button>
        ))}
          </nav>
          <div className="border-t border-stone-100 p-2 space-y-1">
              <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-stone-400">Theme</span>
                  <ThemeToggle />
              </div>
              <Link href="/">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors">
                      <LogOut size={14} /> Logout
                  </button>
              </Link>
          </div>
      </aside>
  )
}

function MobileNav({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
    return (
        <div className="flex border-b border-stone-200 bg-white md:hidden overflow-x-auto">
            {NAV.map(n => (
                <button key={n.id} onClick={() => setActive(n.id)}
              className={`flex shrink-0 flex-col items-center gap-0.5 border-b-2 px-4 py-2.5 text-[10px] font-semibold whitespace-nowrap transition-colors ${active === n.id ? "border-rose-600 text-rose-600" : "border-transparent text-stone-400"
                  }`}>
              {n.icon}{n.label}
          </button>
      ))}
      </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardSection({ records, setActive }: {
    records: typeof INIT_RECORDS; setActive: (s: Section) => void
}) {
    const underObs = records.filter(r => r.status === "Under Observation")
    const upcoming = records.filter(r => r.followup && new Date(r.followup) >= new Date())

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-stone-900">Medical Officer Dashboard</h1>
                <p className="text-xs text-stone-400 mt-0.5">Manage soldier health records · 14 March 2025</p>
            </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                  { label: "Soldiers Under Care", value: SOLDIERS_LIST.length, accent: "text-[#1a2d4a]", border: "border-t-[#1a2d4a]" },
                  { label: "Records This Month", value: records.length, accent: "text-sky-600", border: "border-t-sky-500" },
                  { label: "Follow-ups Pending", value: upcoming.length, accent: "text-amber-600", border: "border-t-amber-500" },
                  { label: "Under Observation", value: underObs.length, accent: "text-rose-500", border: "border-t-rose-500" },
              ].map(c => (
                  <Card key={c.label} className={`border border-stone-200 border-t-4 ${c.border} bg-white shadow-sm`}>
                      <CardContent className="px-4 pt-3 pb-3">
                          <div className="text-[10px] text-stone-400 uppercase tracking-wide">{c.label}</div>
                          <div className={`mt-1 text-2xl font-black ${c.accent}`}>{c.value}</div>
                      </CardContent>
                  </Card>
              ))}
          </div>

          {/* Under observation alert */}
          {underObs.length > 0 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                      <AlertTriangle size={14} /> {underObs.length} Soldier{underObs.length > 1 ? "s" : ""} Under Observation
                  </div>
                  {underObs.map(r => (
                      <div key={r.id} className="flex items-center justify-between rounded bg-white border border-amber-200 px-3 py-2">
                          <div>
                              <div className="text-sm font-semibold text-stone-800">{r.soldierName}</div>
                              <div className="text-xs text-stone-500">{r.diagnosis}</div>
                          </div>
                          <div className="text-right">
                              <div className="text-[10px] text-stone-400">Follow-up</div>
                              <div className="text-xs font-semibold text-amber-700">{r.followup}</div>
                          </div>
                      </div>
                  ))}
              </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Recent records */}
              <Card className="border-stone-200 bg-white shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-semibold text-stone-800">Recent Records</CardTitle>
                      <Button size="sm" variant="outline" onClick={() => setActive("records")} className="h-6 gap-1 px-2 text-[10px] border-stone-200 text-stone-500">
                          View All <ChevronRight size={10} />
                      </Button>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-2">
                      {records.slice(0, 5).map(r => (
                          <div key={r.id} className="flex items-center justify-between py-1.5 border-b border-stone-50 last:border-0">
                              <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs">👤</div>
                                  <div className="min-w-0">
                                      <div className="text-sm font-semibold text-stone-800 truncate">{r.soldierName}</div>
                                      <div className="text-xs text-stone-400">{r.type} · {r.date}</div>
                                  </div>
                              </div>
                              <Badge className={`border text-xs shrink-0 ml-2 ${statusStyle(r.status)}`}>{r.status}</Badge>
                          </div>
                      ))}
                  </CardContent>
              </Card>

              {/* Quick actions */}
              <div className="space-y-3">
                  <Card className="border-stone-200 bg-white shadow-sm">
                      <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-semibold text-stone-800">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 grid grid-cols-1 gap-2">
                          {[
                              { label: "Add Medical Record", section: "add" as Section, icon: <FilePlus size={14} />, color: "text-rose-500" },
                              { label: "View All Records", section: "records" as Section, icon: <HeartPulse size={14} />, color: "text-sky-600" },
                              { label: "Health Statistics", section: "stats" as Section, icon: <BarChart3 size={14} />, color: "text-violet-600" },
                          ].map(q => (
                              <button key={q.label} onClick={() => setActive(q.section)}
                                  className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-300 hover:shadow-md">
                                  <span className={q.color}>{q.icon}</span>{q.label}
                      <ChevronRight size={13} className="ml-auto text-stone-300" />
                  </button>
              ))}
                      </CardContent>
                  </Card>

                  {/* Upcoming follow-ups */}
                  <Card className="border-stone-200 bg-white shadow-sm">
                      <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                              <CalendarDays size={13} className="text-sky-500" /> Upcoming Follow-ups
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 space-y-2">
                          {records.filter(r => r.status === "Under Observation").map(r => (
                              <div key={r.id} className="flex items-center justify-between">
                                  <div>
                                      <div className="text-sm font-semibold text-stone-800">{r.soldierName}</div>
                                      <div className="text-xs text-stone-400">{r.diagnosis}</div>
                                  </div>
                                  <div className="text-right shrink-0 ml-2">
                                      <Badge className="border border-amber-200 bg-amber-50 text-amber-700 text-xs">{r.followup}</Badge>
                                  </div>
                              </div>
                          ))}
                          {records.filter(r => r.status === "Under Observation").length === 0 && (
                              <div className="text-xs text-stone-400">No pending follow-ups.</div>
                          )}
                      </CardContent>
                  </Card>
              </div>
          </div>
      </div>
  )
}

// ── ADD RECORD ────────────────────────────────────────────────────────────────
function AddRecordSection({ onAdd }: { onAdd: (r: typeof INIT_RECORDS[0]) => void }) {
    const empty = {
        soldier: "", date: "", type: "Regular Checkup", diagnosis: "", bp: "", hr: "", weight: "", followup: "", notes: ""
    }
    const [form, setForm] = useState(empty)
    const [saved, setSaved] = useState(false)
    const f = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

    const handleSave = () => {
        if (!form.soldier || !form.date || !form.diagnosis) return
        const parts = form.soldier.split("(")
        const name = parts[0].trim()
      const id = parts[1]?.replace(")", "").trim() ?? ""
      onAdd({
          id: `MR-${Date.now()}`,
          soldierName: name, soldierId: id,
          date: form.date, type: form.type,
          doctor: DOCTOR.name,
          diagnosis: form.diagnosis, status: "Normal",
          followup: form.followup, bp: form.bp, hr: form.hr, weight: form.weight,
          notes: form.notes,
      })
      setForm(empty)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
  }

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-stone-900">Add Medical Record</h1>
                <p className="text-xs text-stone-400 mt-0.5">Log a new checkup, treatment, or emergency record</p>
            </div>

          {saved && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <CheckCircle2 size={14} /> Medical record saved successfully.
              </div>
          )}

          <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                      <Stethoscope size={14} className="text-rose-500" /> New Medical Record
                  </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-5 space-y-4">

                  {/* Soldier + type row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                          <Label className="text-xs font-semibold text-stone-600">Soldier <span className="text-rose-500">*</span></Label>
                          <Select value={form.soldier} onValueChange={v => f("soldier", v)}>
                              <SelectTrigger className="text-sm h-9"><SelectValue placeholder="Select soldier…" /></SelectTrigger>
                              <SelectContent>
                                  {SOLDIERS_LIST.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                          </Select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                          <Label className="text-xs font-semibold text-stone-600">Record Type <span className="text-rose-500">*</span></Label>
                          <Select value={form.type} onValueChange={v => f("type", v)}>
                              <SelectTrigger className="text-sm h-9"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="Regular Checkup">Regular Checkup</SelectItem>
                                  <SelectItem value="Treatment">Treatment</SelectItem>
                                  <SelectItem value="Emergency">Emergency</SelectItem>
                                  <SelectItem value="Mental Health">Mental Health Review</SelectItem>
                                  <SelectItem value="Pre-Exercise">Pre-Exercise Screening</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                          <Label className="text-xs font-semibold text-stone-600">Visit Date <span className="text-rose-500">*</span></Label>
                          <Input type="date" value={form.date} onChange={e => f("date", e.target.value)} className="h-9 text-sm" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                          <Label className="text-xs font-semibold text-stone-600">Follow-up Date</Label>
                          <Input type="date" value={form.followup} onChange={e => f("followup", e.target.value)} className="h-9 text-sm" />
                      </div>
                  </div>

                  {/* Vitals */}
                  <div>
                      <Label className="text-xs font-semibold text-stone-600 mb-2 block">Vitals Recorded</Label>
                      <div className="grid grid-cols-3 gap-3">
                          <div className="flex flex-col gap-1.5">
                              <Label className="text-[10px] text-stone-400">Blood Pressure (mmHg)</Label>
                              <Input placeholder="e.g. 120/78" value={form.bp} onChange={e => f("bp", e.target.value)} className="h-8 text-sm" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                              <Label className="text-[10px] text-stone-400">Heart Rate (bpm)</Label>
                              <Input type="number" placeholder="e.g. 72" value={form.hr} onChange={e => f("hr", e.target.value)} className="h-8 text-sm" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                              <Label className="text-[10px] text-stone-400">Weight (kg)</Label>
                              <Input type="number" placeholder="e.g. 68" value={form.weight} onChange={e => f("weight", e.target.value)} className="h-8 text-sm" />
                          </div>
                      </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-semibold text-stone-600">Diagnosis / Findings <span className="text-rose-500">*</span></Label>
                      <Input placeholder="Primary diagnosis or finding…" value={form.diagnosis} onChange={e => f("diagnosis", e.target.value)} className="h-9 text-sm" />
                  </div>

                  {/* Fitness status */}
                  <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-semibold text-stone-600">Fitness Assessment</Label>
                      <div className="flex flex-wrap gap-2">
                          {["Fit for Duty", "Light Duty Only", "Restricted Activity", "Temporarily Unfit", "Referred to Specialist"].map(opt => (
                              <button key={opt} type="button"
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${form.notes.includes(opt)
                              ? "border-[#4a5c2f] bg-[#4a5c2f] text-white"
                              : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
                          }`}
                      onClick={() => f("notes", form.notes === opt ? "" : opt)}>
                      {opt}
                  </button>
              ))}
                      </div>
                  </div>

                  {/* Remarks */}
                  <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-semibold text-stone-600">Detailed Remarks</Label>
                      <Textarea rows={3} placeholder="Additional notes, treatment prescribed, observations…"
                          value={form.notes.startsWith("Fit") || form.notes.startsWith("Light") || form.notes.startsWith("Rest") || form.notes.startsWith("Temp") || form.notes.startsWith("Ref") ? "" : form.notes}
                          onChange={e => f("notes", e.target.value)}
                          className="text-sm resize-none" />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                      <Button onClick={handleSave} className="gap-2 bg-rose-600 text-white hover:bg-rose-700 text-sm">
                          <Plus size={14} /> Save Medical Record
                      </Button>
                      <Button variant="outline" onClick={() => setForm(empty)} className="gap-2 text-sm text-stone-500">
                          <X size={14} /> Clear Form
                      </Button>
                  </div>
              </CardContent>
          </Card>
      </div>
  )
}

// ── MEDICAL RECORDS ───────────────────────────────────────────────────────────
function RecordsSection({ records }: { records: typeof INIT_RECORDS }) {
    const [search, setSearch] = useState("")
    const [statusF, setStatusF] = useState("all")
    const [typeF, setTypeF] = useState("all")

    const filtered = records.filter(r => {
        const q = search.toLowerCase()
        const matchQ = !q || r.soldierName.toLowerCase().includes(q) || r.soldierId.toLowerCase().includes(q)
        const matchS = statusF === "all" || r.status === statusF
      const matchT = typeF === "all" || r.type === typeF
      return matchQ && matchS && matchT
  })

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-stone-900">Medical Records</h1>
                <p className="text-xs text-stone-400 mt-0.5">All soldier health records · Confidential</p>
            </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[180px]">
                  <Search size={13} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400" />
                  <Input placeholder="Search name or ID..." value={search} onChange={e => setSearch(e.target.value)}
                      className="h-8 pl-8 text-xs border-stone-200 bg-white" />
              </div>
              <Select value={statusF} onValueChange={setStatusF}>
                  <SelectTrigger className="h-8 w-40 text-xs border-stone-200 bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Under Observation">Under Observation</SelectItem>
                      <SelectItem value="Recovered">Recovered</SelectItem>
                  </SelectContent>
              </Select>
              <Select value={typeF} onValueChange={setTypeF}>
                  <SelectTrigger className="h-8 w-40 text-xs border-stone-200 bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Regular Checkup">Regular Checkup</SelectItem>
                      <SelectItem value="Treatment">Treatment</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
              </Select>
              <span className="text-xs text-stone-400 ml-auto">{filtered.length} records</span>
          </div>

          {/* Records table */}
          <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                      <thead>
                          <tr className="border-b border-stone-100 bg-stone-50">
                              {["Record ID", "Soldier", "Date", "Type", "Doctor", "Diagnosis", "BP", "HR", "Wt", "Follow-up", "Status", "Notes"].map(h => (
                                  <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                              ))}
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50">
                          {filtered.length === 0 ? (
                              <tr><td colSpan={12} className="py-12 text-center text-sm text-stone-400">No records match your filter.</td></tr>
                          ) : filtered.map(r => (
                  <tr key={r.id} className={`hover:bg-stone-50 ${r.status === "Under Observation" ? "bg-amber-50/30" : ""}`}>
                      <td className="px-3 py-3 font-mono text-xs text-stone-400">{r.id}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                          <div className="font-semibold text-sm text-stone-800">{r.soldierName}</div>
                          <div className="font-mono text-[10px] text-stone-400">{r.soldierId}</div>
                      </td>
                      <td className="px-3 py-3 text-xs text-stone-500 whitespace-nowrap">{r.date}</td>
                      <td className="px-3 py-3"><Badge className={`border text-xs ${typeColor(r.type)}`}>{r.type}</Badge></td>
                      <td className="px-3 py-3 text-xs text-stone-600 whitespace-nowrap">{r.doctor}</td>
                      <td className="px-3 py-3 text-xs text-stone-700 max-w-[150px]"><span className="line-clamp-2">{r.diagnosis}</span></td>
                      <td className="px-3 py-3 font-mono text-xs text-stone-500">{r.bp || "—"}</td>
                      <td className="px-3 py-3 font-mono text-xs text-stone-500">{r.hr || "—"}</td>
                      <td className="px-3 py-3 font-mono text-xs text-stone-500">{r.weight ? `${r.weight}kg` : "—"}</td>
                      <td className="px-3 py-3 text-xs text-stone-400 whitespace-nowrap">{r.followup || "—"}</td>
                      <td className="px-3 py-3"><Badge className={`border text-xs ${statusStyle(r.status)}`}>{r.status}</Badge></td>
                      <td className="px-3 py-3 text-xs text-stone-400 max-w-[120px]"><span className="line-clamp-1">{r.notes || "—"}</span></td>
                  </tr>
              ))}
                      </tbody>
                  </table>
              </div>
              <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2 text-xs text-stone-400">
                  {filtered.length} of {records.length} records
              </div>
          </Card>
      </div>
  )
}

// ── HEALTH STATS ──────────────────────────────────────────────────────────────
function StatsSection({ records }: { records: typeof INIT_RECORDS }) {
    const normal = records.filter(r => r.status === "Normal").length
    const underObs = records.filter(r => r.status === "Under Observation").length
    const recovered = records.filter(r => r.status === "Recovered").length
    const total = records.length

    const types: Record<string, number> = {}
    records.forEach(r => { types[r.type] = (types[r.type] || 0) + 1 })

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-stone-900">Health Statistics</h1>
                <p className="text-xs text-stone-400 mt-0.5">Overall fitness overview for the command</p>
            </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                  { label: "Total Records", value: total, accent: "text-[#1a2d4a]", border: "border-t-[#1a2d4a]" },
                  { label: "Fit for Duty", value: normal, accent: "text-emerald-600", border: "border-t-emerald-500" },
                  { label: "Under Observation", value: underObs, accent: "text-amber-600", border: "border-t-amber-500" },
                  { label: "Recovered", value: recovered, accent: "text-sky-600", border: "border-t-sky-500" },
              ].map(c => (
                  <Card key={c.label} className={`border border-stone-200 border-t-4 ${c.border} bg-white shadow-sm`}>
                      <CardContent className="px-4 pt-3 pb-3">
                          <div className="text-[10px] text-stone-400 uppercase tracking-wide">{c.label}</div>
                          <div className={`mt-1 text-2xl font-black ${c.accent}`}>{c.value}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{Math.round(c.value / total * 100)}% of total</div>
                </CardContent>
            </Card>
        ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Status breakdown */}
              <Card className="border-stone-200 bg-white shadow-sm">
                  <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                          <Activity size={13} className="text-emerald-500" /> Fitness Status Breakdown
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                      {[
                          { label: "Fit for Duty", value: normal, color: "bg-emerald-500", textColor: "text-emerald-600" },
                          { label: "Under Observation", value: underObs, color: "bg-amber-500", textColor: "text-amber-600" },
                          { label: "Recovered", value: recovered, color: "bg-sky-500", textColor: "text-sky-600" },
                      ].map(item => (
                          <div key={item.label} className="space-y-1">
                              <div className="flex items-center justify-between">
                                  <span className="text-xs text-stone-600">{item.label}</span>
                                  <div className="flex items-center gap-2">
                            <span className="text-xs text-stone-400">{Math.round(item.value / total * 100)}%</span>
                            <span className={`text-sm font-black ${item.textColor}`}>{item.value}</span>
                        </div>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
                        <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${Math.round(item.value / total * 100)}%` }} />
                    </div>
                </div>
            ))}
                  </CardContent>
              </Card>

              {/* Record type distribution */}
              <Card className="border-stone-200 bg-white shadow-sm">
                  <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                          <Stethoscope size={13} className="text-rose-500" /> Record Type Distribution
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                      {Object.entries(types).map(([type, count]) => (
                          <div key={type} className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 min-w-0">
                                  <Badge className={`border text-xs shrink-0 ${typeColor(type)}`}>{type}</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                  <div className="h-2 w-24 overflow-hidden rounded-full bg-stone-100">
                            <div className="h-full rounded-full bg-[#1a2d4a]" style={{ width: `${count / total * 100}%` }} />
                        </div>
                        <span className="text-sm font-black text-stone-700 w-4 text-right">{count}</span>
                    </div>
                </div>
            ))}
                  </CardContent>
              </Card>
          </div>

          {/* Vitals averages */}
          <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                      <HeartPulse size={13} className="text-rose-500" /> Average Vitals Across Command
                  </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {[
                          { label: "Avg. Heart Rate", value: "68 bpm", sub: "Normal range: 60–100", color: "text-rose-500", icon: <HeartPulse size={18} /> },
                          { label: "Avg. Weight", value: "67.9 kg", sub: "Target BMI: 18.5–25", color: "text-sky-600", icon: <User size={18} /> },
                          { label: "Fit for Duty", value: "75%", sub: `${normal} of ${total} soldiers`, color: "text-emerald-600", icon: <Shield size={18} /> },
                          { label: "Follow-ups Due", value: underObs, sub: "Action required", color: "text-amber-600", icon: <CalendarDays size={18} /> },
                      ].map(v => (
                          <div key={v.label} className="rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
                              <div className={`flex justify-center mb-2 ${v.color}`}>{v.icon}</div>
                              <div className={`text-xl font-black ${v.color}`}>{v.value}</div>
                              <div className="text-[10px] font-semibold text-stone-500 mt-0.5">{v.label}</div>
                              <div className="text-[9px] text-stone-400 mt-0.5">{v.sub}</div>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function DoctorPage() {
    const [section, setSection] = useState<Section>("dashboard")
    const [records, setRecords] = useState(INIT_RECORDS)

    const titles: Record<Section, string> = {
      dashboard: "Dashboard", add: "Add Record", records: "Medical Records", stats: "Health Stats"
  }

    return (
        <div className="flex min-h-screen bg-[#f4f3ef] font-sans">
          <Sidebar active={section} setActive={setSection} />
          <div className="flex flex-1 flex-col min-w-0">
              <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                      <div>
                          <h1 className="text-base font-bold text-stone-900">{titles[section]}</h1>
                          <p className="text-xs text-stone-400">Medical Officer · Agnipath Command</p>
                      </div>
                      <Badge className="border border-rose-200 bg-rose-50 text-xs text-rose-600 shrink-0">Medical Officer</Badge>
                  </div>
                  <MobileNav active={section} setActive={setSection} />
              </header>
              <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 max-w-5xl w-full mx-auto">
                  {section === "dashboard" && <DashboardSection records={records} setActive={setSection} />}
                  {section === "add" && <AddRecordSection onAdd={r => { setRecords(p => [r, ...p]); setSection("records") }} />}
                  {section === "records" && <RecordsSection records={records} />}
                  {section === "stats" && <StatsSection records={records} />}
              </main>
          </div>
      </div>
  )
}