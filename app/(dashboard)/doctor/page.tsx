"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  FilePlus,
  BarChart3,
  Search,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  User,
  Stethoscope,
  Activity,
  LogOut,
  Plus,
  X,
  CalendarDays,
  Shield,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  Ruler,
  ScanEye,
  ClipboardList,
  Clock7,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// ── Types ─────────────────────────────────────────────────────────────────────
type Section = "dashboard" | "add" | "records" | "stats"

// ── Theme constants ────────────────────────────────────────────────────────────
const SIDEBAR_BG = "#1a2d4a"
const ACTIVE_BG = "#CA3500"

// ── Data ──────────────────────────────────────────────────────────────────────
const DOCTOR = {
  name: "Dr. Sunita Rao",
  id: "MED-001",
  role: "Medical Officer",
  unit: "Agnipath Command",
}

const INIT_RECORDS = [
  {
    id: "MR-001",
    soldierName: "Arjun Mehra",
    soldierId: "AGN-2024-0103",
    date: "01 Mar 2025",
    type: "Pre-Exercise Screening",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Fit for Duty",
    status: "Normal",
    followup: "01 Sep 2025",
    bp: "118/76",
    hr: "64",
    weight: "72",
    notes: "Excellent fitness. No issues detected during examination.",
    admitDate: "11 Oct 2024",
    dischargeDate: "01 Nov 2024",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "None required.",
    prescriptions: "Multivitamins (preventive)",
    eyeSight: "6/6",
    height: "178 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-002",
    soldierName: "Rajveer Singh",
    soldierId: "AGN-2024-0101",
    date: "01 Mar 2025",
    type: "Mental Health Review",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Fit for Duty",
    status: "Normal",
    followup: "01 Sep 2025",
    bp: "120/78",
    hr: "68",
    weight: "68",
    notes: "Good overall health. All parameters within normal limits.",
    admitDate: "8 Jan 2024",
    dischargeDate: "10 Jan 2024",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "None required.",
    prescriptions: "None",
    eyeSight: "6/6",
    height: "175 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-003",
    soldierName: "Sunil Kumar",
    soldierId: "AGN-2024-0104",
    date: "15 Jan 2025",
    type: "Emergency",
    doctor: "Dr. Rajan Mehta",
    doctorDesignation: "Orthopedic Surgeon",
    diagnosis: "Minor sprain — right ankle",
    status: "Recovered",
    followup: "15 Mar 2025",
    bp: "116/74",
    hr: "72",
    weight: "65",
    notes: "Ankle fully recovered. Cleared for full duty post review.",
    admitDate: "15 Jan 2025",
    dischargeDate: "16 Jan 2025",
    hospitalLocation: "Command Hospital Pune",
    treatment: "R.I.C.E protocol, minor physiotherapy.",
    prescriptions: "Ibuprofen 400mg as needed.",
    eyeSight: "6/6",
    height: "172 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-004",
    soldierName: "Rohit Sharma",
    soldierId: "AGN-2024-0203",
    date: "20 Feb 2025",
    type: "Treatment",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Knee pain — patellofemoral syndrome",
    status: "Under Observation",
    followup: "20 Mar 2025",
    bp: "122/80",
    hr: "76",
    weight: "70",
    notes: "Restricted from high-impact training for 3 weeks. Monitor progress.",
    admitDate: "12 Sep 2024",
    dischargeDate: "14 Sep 2024",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "Physiotherapy sessions twice weekly.",
    prescriptions: "Pain relief gel (topical).",
    eyeSight: "6/9",
    height: "180 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-005",
    soldierName: "Santosh More",
    soldierId: "AGN-2024-0403",
    date: "10 Feb 2025",
    type: "Treatment",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Lower back strain",
    status: "Under Observation",
    followup: "10 Mar 2025",
    bp: "124/82",
    hr: "74",
    weight: "67",
    notes: "Physiotherapy recommended. Avoid heavy lifting and strenuous activity.",
    admitDate: "23 Feb 2025",
    dischargeDate: "25 Feb 2025",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "Rest and localized heat therapy.",
    prescriptions: "Muscle relaxants for 5 days.",
    eyeSight: "6/6",
    height: "169 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-006",
    soldierName: "Priya Sharma",
    soldierId: "AGN-2024-0102",
    date: "01 Mar 2025",
    type: "Mental Health Review",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Fit for Duty",
    status: "Normal",
    followup: "01 Sep 2025",
    bp: "110/70",
    hr: "66",
    weight: "56",
    notes: "All vitals normal. BMI optimal. Excellent overall health profile.",
    admitDate: "10 Dec 2024",
    dischargeDate: "12 Dec 2024",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "None",
    prescriptions: "None",
    eyeSight: "6/6",
    height: "162 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-007",
    soldierName: "Vikram Nair",
    soldierId: "AGN-2024-0201",
    date: "15 Feb 2025",
    type: "Treatment",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Fit for Duty",
    status: "Normal",
    followup: "15 Aug 2025",
    bp: "116/74",
    hr: "62",
    weight: "74",
    notes: "Outstanding physical fitness. No issues found.",
    admitDate: "25 Jan 2025",
    dischargeDate: "27 Jan 2025",
    hospitalLocation: "Command Hospital Pune",
    treatment: "None",
    prescriptions: "None",
    eyeSight: "6/6",
    height: "182 cm",
    lasikReport: "N/A",
  },
  {
    id: "MR-008",
    soldierName: "Ananya Krishnan",
    soldierId: "AGN-2024-0202",
    date: "01 Mar 2025",
    type: "Pre-Exercise Screening",
    doctor: "Dr. Sunita Rao",
    doctorDesignation: "Medical Officer",
    diagnosis: "Fit for Duty",
    status: "Normal",
    followup: "01 Sep 2025",
    bp: "108/68",
    hr: "64",
    weight: "58",
    notes: "Normal checkup completed. No concerns identified.",
    admitDate: "18 March 2026",
    dischargeDate: "19 March 2026",
    hospitalLocation: "Base Hospital Delhi",
    treatment: "None",
    prescriptions: "None",
    eyeSight: "6/6",
    height: "165 cm",
    lasikReport: "N/A",
  },
]

const EYE_SIGHT_RECORDS = [
  { soldierId: "AGN-2024-0103", soldierName: "Arjun Mehra", eyeSight: "6/6", status: "Normal", issue: "None", lastChecked: "01 Mar 2025" },
  { soldierId: "AGN-2024-0101", soldierName: "Rajveer Singh", eyeSight: "6/6", status: "Normal", issue: "None", lastChecked: "01 Mar 2025" },
  { soldierId: "AGN-2024-0104", soldierName: "Sunil Kumar", eyeSight: "6/6", status: "Normal", issue: "None", lastChecked: "15 Jan 2025" },
  { soldierId: "AGN-2024-0203", soldierName: "Rohit Sharma", eyeSight: "6/9", status: "Weak", issue: "Mild myopia detected, monitoring required", lastChecked: "20 Feb 2025" },
  { soldierId: "AGN-2024-0403", soldierName: "Santosh More", eyeSight: "6/6", status: "Normal", issue: "None", lastChecked: "10 Feb 2025" },
  { soldierId: "AGN-2024-0102", soldierName: "Priya Sharma", eyeSight: "6/6", status: "Good", issue: "None", lastChecked: "01 Mar 2025" },
  { soldierId: "AGN-2024-0201", soldierName: "Vikram Nair", eyeSight: "6/6", status: "Good", issue: "None", lastChecked: "15 Feb 2025" },
  { soldierId: "AGN-2024-0202", soldierName: "Ananya Krishnan", eyeSight: "6/6", status: "Normal", issue: "None", lastChecked: "01 Mar 2025" },
]

const LASIK_RECORDS = [
  {
    id: "LR-001",
    soldierName: "Suresh Patil",
    soldierId: "AGN-2024-0401",
    rank: "Sepoy",
    reportDate: "12 Feb 2025",
    doctor: "Dr. Anil Verma",
    doctorDesignation: "Ophthalmologist",
    presentingComplaint: "Mild blurry vision in left eye during night drills.",
    diagnosis: "Myopia (-1.25 D Left, -0.75 D Right)",
    treatmentGiven: "Detailed topographic scan done. Recommended for LASIK evaluation.",
    restLightDuty: "None required.",
    eyeSightDetails: "L: 6/12, R: 6/9",
    lasikRecommendation: "Recommended for PRK/LASIK",
    outcome: "Pending Surgery",
    status: "Pending",
    notes: "Agniveer is highly motivated. Clearance for surgery given by CO.",
  },
  {
    id: "LR-002",
    soldierName: "Amit Ghosh",
    soldierId: "AGN-2024-0303",
    rank: "Naik",
    reportDate: "28 Jan 2025",
    doctor: "Dr. Anil Verma",
    doctorDesignation: "Ophthalmologist",
    presentingComplaint: "Routine LASIK follow-up 6 months post-op.",
    diagnosis: "Post-LASIK 6 months. Cornea stable.",
    treatmentGiven: "Routine check. Artificial tears prescribed.",
    restLightDuty: "Cleared for full duty.",
    eyeSightDetails: "L: 6/6, R: 6/6",
    lasikRecommendation: "Surgery Completed (Aug 2024)",
    outcome: "Successful, Fully Recovered",
    status: "Cleared",
    notes: "Perfect vision. No halos or glare reported during night firing.",
  },
  {
    id: "LR-003",
    soldierName: "Deepak Yadav",
    soldierId: "AGN-2024-0204",
    rank: "Sepoy",
    reportDate: "05 Mar 2025",
    doctor: "Dr. Meena Iyer",
    doctorDesignation: "Ophthalmic Surgeon",
    presentingComplaint: "Eye strain and dry eyes.",
    diagnosis: "Mild Astigmatism. Dry Eye Syndrome.",
    treatmentGiven: "Lubricating eye drops. Rest advised for 2 days.",
    restLightDuty: "Light Duty (2 days)",
    eyeSightDetails: "L: 6/6, R: 6/9",
    lasikRecommendation: "Not Recommended Currently",
    outcome: "Under Observation",
    status: "Observation",
    notes: "Wait 6 months before re-evaluating for LASIK. Monitor dry eyes.",
  },
]

const SOLDIERS_LIST = [
  "Rajveer Singh Chauhan (AGN-2024-0101)",
  "Priya Sharma (AGN-2024-0102)",
  "Arjun Mehra (AGN-2024-0103)",
  "Sunil Kumar (AGN-2024-0104)",
  "Kavita Rajput (AGN-2024-0105)",
  "Mahesh Choudhary (AGN-2024-0106)",
  "Vikram Nair (AGN-2024-0201)",
  "Ananya Krishnan (AGN-2024-0202)",
  "Rohit Sharma (AGN-2024-0203)",
  "Deepak Yadav (AGN-2024-0204)",
  "Sourav Das (AGN-2024-0301)",
  "Rekha Bose (AGN-2024-0302)",
  "Amit Ghosh (AGN-2024-0303)",
  "Ranjit Singh (AGN-2024-0304)",
  "Suresh Patil (AGN-2024-0401)",
  "Rohini Jadhav (AGN-2024-0402)",
  "Santosh More (AGN-2024-0403)",
  "Vijay Deshmukh (AGN-2024-0404)",
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function statusStyle(s: string) {
  if (s === "Normal") return "border-emerald-300 bg-emerald-50 text-emerald-700"
  if (s === "Recovered") return "border-sky-300 bg-sky-50 text-sky-700"
  if (s === "Under Observation") return "border-amber-300 bg-amber-50 text-amber-700"
  return "border-rose-300 bg-rose-50 text-rose-600"
}

function typeColor(t: string) {
  if (t === "Treatment") return "border-amber-300 bg-amber-50 text-amber-700"
  if (t === "Emergency") return "border-rose-300 bg-rose-50 text-rose-600"
  return "border-stone-300 bg-stone-50 text-stone-600"
}

function eyeSightStatusStyle(s: string) {
  if (s === "Good") return "border-emerald-300 bg-emerald-50 text-emerald-700"
  if (s === "Normal") return "border-sky-300 bg-sky-50 text-sky-700"
  if (s === "Weak") return "border-amber-300 bg-amber-50 text-amber-700"
  return "border-rose-300 bg-rose-50 text-rose-600"
}

function doctorDisplayName(fullName: string) {
  return fullName.replace(/^Dr\.\s*/i, "")
}

function safeVal(val: string | undefined | null, suffix = "") {
  if (!val || val.trim() === "" || val === "—" || val === "N/A") return "—"
  return `${val}${suffix}`
}

// ── InfoField ─────────────────────────────────────────────────────────────────
function InfoField({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5 shadow-sm">
      <div className="text-[10px] font-black tracking-[0.12em] text-stone-400 uppercase mb-1.5">{label}</div>
      <div className={`text-sm font-semibold text-stone-800 ${mono ? "font-mono" : ""}`}>{value || "—"}</div>
    </div>
  )
}

// ── NAV config ────────────────────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={15} /> },
  { id: "records", label: "Medical Records", icon: <HeartPulse size={15} /> },
  { id: "add", label: "Add Record", icon: <FilePlus size={15} /> },
  { id: "stats", label: "Health Stats", icon: <BarChart3 size={15} /> },
]

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
  return (
    <aside
      className="hidden md:flex w-60 shrink-0 flex-col h-screen sticky top-0 z-20 overflow-y-auto"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Doctor Identity */}
      <div className="px-5 py-5 border-b bg-stone-100 border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ring-2 ring-white/20"
            style={{ backgroundColor: ACTIVE_BG }}
          >
            SR
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-black">{DOCTOR.name}</div>
            <div className="font-mono text-[10px] text-orange-500 mt-0.5">{DOCTOR.id}</div>
            <div className="text-[10px] text-stone-400 mt-0.5">{DOCTOR.role}</div>
          </div>
        </div>
        <div className="mt-2"><span data-slot="badge" data-variant="default" className="group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl px-2 py-0.5 font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-3! [a]:hover:bg-primary/80 border border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700">Active Session</span></div>
      </div>

      {/* Nav */}
      <nav
        className="flex flex-1 flex-col gap-1 p-3"
        style={{ backgroundColor: "#fff" }}
      >
        <p className="px-2 pt-2 pb-1.5 text-[9px] font-bold tracking-[0.18em] text-stone-400 uppercase">
          AGNIVEER PORTAL
        </p>

        {NAV.map((n) => {
          const isActive = active === n.id

          return (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 w-full text-left cursor-pointer ${isActive
                ? "text-white shadow-sm"
                : "text-stone-600 hover:bg-stone-100"
                }`}
              style={
                isActive
                  ? { backgroundColor: ACTIVE_BG }
                  : { backgroundColor: "transparent" }
              }
            >
              <span className={isActive ? "text-white" : "text-stone-500"}>
                {n.icon}
              </span>

              <span className="flex-1">{n.label}</span>

              {isActive && (
                <ChevronRight size={14} className="opacity-70" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-stone-200 bg-stone-50 p-3 space-y-2 shrink-0 relative z-30">
        {/* Theme Row */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white transition-colors">
          <span className="text-xs font-medium text-stone-600">Theme</span>
          <div className="relative z-50">
            <ThemeToggle />
          </div>
        </div>

        {/* Sign Out */}
        <Link href="/">
          <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-all hover:bg-white hover:text-red-500">
            <LogOut size={14} />
            Sign Out
          </button>
        </Link>

        {/* Unit */}
        <div className="px-3 pt-1 pb-1">
          <div className="text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400">
            {DOCTOR.unit}
          </div>
        </div>
      </div>
    </aside>
  )
}

function MobileNav({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
  return (
    <div className="flex overflow-x-auto border-b border-stone-200 bg-white md:hidden">
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => setActive(n.id)}
          className="flex shrink-0 flex-col items-center gap-1 border-b-2 px-4 py-2.5 text-[10px] font-semibold whitespace-nowrap transition-colors"
          style={
            active === n.id
              ? { borderBottomColor: ACTIVE_BG, color: ACTIVE_BG }
              : { borderBottomColor: "transparent", color: "#a8a29e" }
          }
        >
          {n.icon}
          {n.label}
        </button>
      ))}
    </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardSection({ records, setActive }: { records: typeof INIT_RECORDS; setActive: (s: Section) => void }) {
  const underObs = records.filter((r) => r.status === "Under Observation")
  const normal = records.filter((r) => r.status === "Normal").length
  const recovered = records.filter((r) => r.status === "Recovered").length
  const fitPct = records.length > 0 ? Math.round((normal / records.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Medical Officer Dashboard</h1>
          <p className="mt-1 text-xs text-stone-400 font-medium">Agnipath Command · March 2025</p>
        </div>
        <Badge className="border border-stone-200 bg-white text-[10px] text-stone-500 font-bold uppercase tracking-widest shadow-sm px-3 py-1.5">
          Confidential
        </Badge>
      </div>

      {/* Stat cards — fixed dot rendering */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Agniveer Under Care", value: SOLDIERS_LIST.length, color: SIDEBAR_BG },
          { label: "Total Records", value: records.length, color: "#0284c7" },
          { label: "Follow-ups Pending", value: underObs.length, color: "#f59e0b" },
          { label: "Under Observation", value: underObs.length, color: ACTIVE_BG },
        ].map((c) => (
          <Card
            key={c.label}
            className="border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            style={{ borderTopWidth: "4px", borderTopColor: c.color }}
          >
            <CardContent className="px-5 py-4">
              <div className="text-3xl font-black" style={{ color: c.color }}>{c.value}</div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide leading-tight">{c.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Observation alert */}
      {underObs.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
            <AlertTriangle size={15} className="text-amber-600" />
            {underObs.length} Agniveer{underObs.length > 1 ? "s" : ""} Currently Under Observation
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {underObs.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-amber-200 bg-white px-4 py-3 shadow-sm">
                <div>
                  <div className="text-sm font-bold text-stone-800">{r.soldierName}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{r.diagnosis}</div>
                </div>
                <div className="text-right ml-3 shrink-0">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Follow-up</div>
                  <div className="text-xs font-bold text-amber-700 mt-0.5">{r.followup}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent records */}
        <Card className="border-stone-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3 px-5 pt-5 border-b border-stone-100">
            <CardTitle className="text-sm font-bold text-stone-800 uppercase tracking-wide">Recent Records</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setActive("records")} className="h-7 gap-1 border-stone-200 px-3 text-[11px] text-stone-500 font-semibold">
              View All <ChevronRight size={11} />
            </Button>
          </CardHeader>
          <CardContent className="px-5 pb-4 pt-2">
            <div className="divide-y divide-stone-100">
              {records.slice(0, 6).map((r) => (
                <div key={r.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                      style={{ backgroundColor: SIDEBAR_BG }}
                    >
                      {r.soldierName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-800">{r.soldierName}</div>
                      <div className="text-xs text-stone-400 mt-0.5">{r.type} · {r.date}</div>
                    </div>
                  </div>
                  <Badge className={`ml-3 shrink-0 border text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 ${statusStyle(r.status)}`}>
                    {r.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          {/* Quick Actions */}
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardHeader className="pb-3 px-5 pt-5 border-b border-stone-100">
              <CardTitle className="text-sm font-bold text-stone-800 uppercase tracking-wide">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-5 pb-5 pt-3">
              {[
                { label: "Add Medical Record", section: "add" as Section, icon: <FilePlus size={14} />, color: ACTIVE_BG, bg: "#fff0eb" },
                { label: "View All Records", section: "records" as Section, icon: <HeartPulse size={14} />, color: "#0284c7", bg: "#f0f9ff" },
                { label: "Health Statistics", section: "stats" as Section, icon: <BarChart3 size={14} />, color: "#7c3aed", bg: "#f5f3ff" },
              ].map((q) => (
                <button
                  key={q.label}
                  onClick={() => setActive(q.section)}
                  className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:shadow-md hover:border-stone-300 text-left"
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md shrink-0"
                    style={{ color: q.color, backgroundColor: q.bg }}
                  >
                    {q.icon}
                  </span>
                  {q.label}
                  <ChevronRight size={13} className="ml-auto text-stone-300" />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming follow-ups */}
          <Card className="border-stone-200 bg-white shadow-sm flex-1">
            <CardHeader className="pb-3 px-5 pt-5 border-b border-stone-100">
              <CardTitle className="flex items-center gap-2 text-sm font-bold text-stone-800 uppercase tracking-wide">
                <CalendarDays size={14} className="text-sky-500" /> Upcoming Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-3 space-y-2.5">
              {underObs.map((r) => (
                <div key={r.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-stone-800 truncate">{r.soldierName}</div>
                    <div className="text-xs text-stone-400 mt-0.5 truncate">{r.diagnosis}</div>
                  </div>
                  <Badge className="border border-amber-200 bg-amber-50 text-[10px] font-bold text-amber-700 whitespace-nowrap shrink-0">
                    {r.followup}
                  </Badge>
                </div>
              ))}
              {underObs.length === 0 && (
                <div className="text-xs text-stone-400 py-2">No pending follow-ups.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ── ADD RECORD ────────────────────────────────────────────────────────────────
function AddRecordSection({ onAdd }: { onAdd: (r: (typeof INIT_RECORDS)[0]) => void }) {
  const empty = {
    soldier: "", date: "", type: "Treatment", diagnosis: "",
    bp: "", hr: "", weight: "", height: "", eyeSight: "",
    followup: "", hospitalLocation: "", admitDate: "", dischargeDate: "",
    treatment: "", prescriptions: "", notes: "", fitnessStatus: "",
  }
  const [form, setForm] = useState(empty)
  const [saved, setSaved] = useState(false)
  const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSave = () => {
    if (!form.soldier || !form.date || !form.diagnosis) return
    const parts = form.soldier.split("(")
    const name = parts[0].trim()
    const id = parts[1]?.replace(")", "").trim() ?? ""
    const combinedNotes = [form.fitnessStatus, form.notes].filter(Boolean).join(". ").trim()
    onAdd({
      id: `MR-${Date.now()}`,
      soldierName: name,
      soldierId: id,
      date: form.date,
      type: form.type,
      doctor: DOCTOR.name,
      doctorDesignation: DOCTOR.role,
      diagnosis: form.diagnosis,
      status: "Normal",
      followup: form.followup || "—",
      bp: form.bp || "—",
      hr: form.hr || "—",
      weight: form.weight || "—",
      notes: combinedNotes || "No additional notes.",
      admitDate: form.admitDate || "—",
      dischargeDate: form.dischargeDate || "—",
      hospitalLocation: form.hospitalLocation || "Base Hospital Delhi",
      treatment: form.treatment || "—",
      prescriptions: form.prescriptions || "—",
      eyeSight: form.eyeSight || "—",
      height: form.height ? `${form.height} cm` : "—",
      lasikReport: "N/A",
    })
    setForm(empty)
    setSaved(true)
    setTimeout(() => setSaved(false), 4000)
  }

  const FL = ({ children, required = false }: { children: React.ReactNode; required?: boolean }) => (
    <Label className="text-[11px] font-black text-stone-500 uppercase tracking-[0.1em]">
      {children}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </Label>
  )

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-2 pb-2 border-b border-stone-100 mb-4">
      <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em]">{children}</p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Add Medical Record</h1>
        <p className="mt-1 text-xs text-stone-400 font-medium">Log a new checkup, treatment, or emergency record</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          Medical record saved successfully and added to the records list.
        </div>
      )}

      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-4 px-6 pt-6 border-b border-stone-100">
          <CardTitle className="flex items-center gap-2.5 text-sm font-bold text-stone-800 uppercase tracking-wide">
            <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ backgroundColor: "#fff0eb" }}>
              <Stethoscope size={15} style={{ color: ACTIVE_BG }} />
            </div>
            New Medical Record Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-6 space-y-8">

          {/* Basic Info */}
          <div>
            <SectionTitle>Basic Information</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <FL required>Agniveer</FL>
                <Select value={form.soldier} onValueChange={(v) => f("soldier", v)}>
                  <SelectTrigger className="h-9 text-sm border-stone-200 w-full">
                    <SelectValue placeholder="Select Agniveer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SOLDIERS_LIST.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FL required>Record Type</FL>
                <Select value={form.type} onValueChange={(v) => f("type", v)}>
                  <SelectTrigger className="h-9 text-sm border-stone-200 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Treatment">Treatment</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Mental Health">Mental Health Review</SelectItem>
                    <SelectItem value="Pre-Exercise">Pre-Exercise Screening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FL required>Visit Date</FL>
                <Input type="date" value={form.date} onChange={(e) => f("date", e.target.value)} className="h-9 text-sm border-stone-200" />
              </div>
              <div className="space-y-1.5">
                <FL>Follow-up Date</FL>
                <Input type="date" value={form.followup} onChange={(e) => f("followup", e.target.value)} className="h-9 text-sm border-stone-200" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <FL>Hospital / Facility</FL>
                <Input placeholder="e.g. Base Hospital Delhi" value={form.hospitalLocation} onChange={(e) => f("hospitalLocation", e.target.value)} className="h-9 text-sm border-stone-200" />
              </div>
            </div>
          </div>

          {/* Hospitalization */}
          <div>
            <SectionTitle>Hospitalization (if applicable)</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FL>Admit Date</FL>
                <Input type="date" value={form.admitDate} onChange={(e) => f("admitDate", e.target.value)} className="h-9 text-sm border-stone-200" />
              </div>
              <div className="space-y-1.5">
                <FL>Discharge Date</FL>
                <Input type="date" value={form.dischargeDate} onChange={(e) => f("dischargeDate", e.target.value)} className="h-9 text-sm border-stone-200" />
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div>
            <SectionTitle>Vitals & Physical Measurements</SectionTitle>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { key: "bp", label: "Blood Pressure", ph: "120/78" },
                { key: "hr", label: "Heart Rate (bpm)", ph: "72", type: "number" },
                { key: "weight", label: "Weight (kg)", ph: "68", type: "number" },
                { key: "height", label: "Height (cm)", ph: "175", type: "number" },
                { key: "eyeSight", label: "Eye Sight", ph: "6/6" },
              ].map((v) => (
                <div key={v.key} className="space-y-1.5">
                  <FL>{v.label}</FL>
                  <Input
                    type={v.type || "text"}
                    placeholder={v.ph}
                    value={(form as Record<string, string>)[v.key]}
                    onChange={(e) => f(v.key, e.target.value)}
                    className="h-9 text-sm border-stone-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Details */}
          <div>
            <SectionTitle>Clinical Details</SectionTitle>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <FL required>Diagnosis / Findings</FL>
                <Input placeholder="Primary diagnosis or clinical finding…" value={form.diagnosis} onChange={(e) => f("diagnosis", e.target.value)} className="h-9 text-sm border-stone-200" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FL>Treatment Given</FL>
                  <Textarea rows={3} placeholder="Describe treatment administered…" value={form.treatment} onChange={(e) => f("treatment", e.target.value)} className="resize-none text-sm border-stone-200" />
                </div>
                <div className="space-y-1.5">
                  <FL>Prescriptions</FL>
                  <Textarea rows={3} placeholder="List prescribed medications and dosage…" value={form.prescriptions} onChange={(e) => f("prescriptions", e.target.value)} className="resize-none text-sm border-stone-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Assessment */}
          <div>
            <SectionTitle>Fitness Assessment</SectionTitle>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Fit for Duty", "Light Duty Only", "Restricted Activity", "Temporarily Unfit", "Referred to Specialist"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="rounded-lg border px-3.5 py-2 text-xs font-bold transition-all"
                  style={
                    form.fitnessStatus === opt
                      ? { backgroundColor: SIDEBAR_BG, borderColor: SIDEBAR_BG, color: "#fff" }
                      : { backgroundColor: "#f9f9f7", borderColor: "#e7e5e4", color: "#57534e" }
                  }
                  onClick={() => f("fitnessStatus", form.fitnessStatus === opt ? "" : opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              <FL>Additional Remarks</FL>
              <Textarea rows={3} placeholder="Additional notes, observations, restrictions…" value={form.notes} onChange={(e) => f("notes", e.target.value)} className="resize-none text-sm border-stone-200" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
            <Button
              onClick={handleSave}
              className="gap-2 text-sm text-white font-semibold shadow-sm"
              style={{ backgroundColor: ACTIVE_BG }}
            >
              <Plus size={14} /> Save Medical Record
            </Button>
            <Button variant="outline" onClick={() => setForm(empty)} className="gap-2 text-sm text-stone-500 border-stone-200 font-semibold">
              <X size={14} /> Clear Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── MEDICAL REPORT DIALOG ─────────────────────────────────────────────────────
function MedicalReportDialog({ report, open, onOpenChange }: {
  report: typeof INIT_RECORDS[0] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!report) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" 
    !max-w-none
    w-[95vw]
    sm:w-[90vw]
    md:w-[82vw]
    lg:w-[72vw]
    xl:w-[64vw]
    2xl:w-[58vw]
    h-auto
    p-0
    overflow-hidden
    rounded-2xl
    border-stone-200
    shadow-2xl
    bg-white
  ">
        {/* Header */}
        <DialogHeader className="px-8 py-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0" style={{ backgroundColor: "#fff0eb" }}>
                <FileText size={20} style={{ color: ACTIVE_BG }} />
              </div>
              <div>
                <DialogTitle className="text-xl font-black text-stone-900 tracking-tight">Medical Report</DialogTitle>
                <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5">
                  {report.id} &nbsp;·&nbsp; {report.date}
                </p>
              </div>
            </div>
            <Badge className={`border font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 shrink-0 mt-1 ${statusStyle(report.status)}`}>
              {report.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[80vh] px-8 py-6 space-y-7">
          {/* Patient Info */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">Patient Information</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoField label="Agniveer Name" value={report.soldierName} />
              <InfoField label="Service ID" value={report.soldierId} mono />
              <InfoField label="Height" value={safeVal(report.height)} />
              <InfoField label="Weight" value={report.weight && report.weight !== "—" ? `${report.weight} kg` : "—"} />
            </div>
          </section>

          {/* Vitals */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">Vitals & Assessment</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoField label="Blood Pressure" value={safeVal(report.bp)} mono />
              <InfoField label="Heart Rate" value={report.hr && report.hr !== "—" ? `${report.hr} bpm` : "—"} mono />
              <InfoField label="Eye Sight" value={safeVal(report.eyeSight)} mono />
              <InfoField label="LASIK Status" value={safeVal(report.lasikReport)} />
            </div>
          </section>

          {/* Hospitalization */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">Hospitalization & Treatment</p>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-stone-200 bg-stone-50 border-b border-stone-200">
                {[
                  { label: "Hospital Location", value: safeVal(report.hospitalLocation) },
                  { label: "Admit Date", value: safeVal(report.admitDate) },
                  { label: "Discharge Date", value: safeVal(report.dischargeDate) },
                ].map((fi) => (
                  <div key={fi.label} className="px-5 py-4">
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-1.5">{fi.label}</div>
                    <div className="text-sm font-semibold text-stone-800">{fi.value}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white space-y-5">
                <div>
                  <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Diagnosis</div>
                  <div className="text-sm font-semibold text-rose-900 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3">
                    {report.diagnosis}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Treatment Given</div>
                    <div className="text-sm text-stone-700 leading-relaxed">{safeVal(report.treatment)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Prescriptions</div>
                    <div className="text-sm text-stone-700 leading-relaxed">{safeVal(report.prescriptions)}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">Clinical Notes</p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 text-sm text-stone-700 leading-relaxed whitespace-pre-wrap min-h-[60px]">
              {report.notes || "No additional notes recorded."}
            </div>
          </section>

          {/* Follow-up + Doctor */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-100 pt-6">
            <div className="border border-stone-200 rounded-xl px-5 py-4 bg-white">
              <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Scheduled Follow-up</div>
              <div className="text-sm font-bold text-stone-800">{safeVal(report.followup)}</div>
            </div>
            <div className="border border-stone-200 rounded-xl px-5 py-4 bg-white flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: SIDEBAR_BG }}
              >
                <Stethoscope size={16} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-1">Attending Physician</div>
                <div className="text-sm font-black text-stone-900">{doctorDisplayName(report.doctor)}</div>
                <div className="text-[11px] font-semibold text-stone-400">{report.doctorDesignation || "Medical Officer"}</div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── SICK REPORT DIALOG ─────────────────────────────────────────────────────────
function SickReportDialog({ report, open, onOpenChange }: {
  report: typeof INIT_RECORDS[0] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!report) return null

  // Mapped data for the sick report view
  const srData = {
    reportNo: `SR/RR1/2025/${report.id.replace('MR-', '').slice(-4)}`,
    date: report.date,
    doctor: doctorDisplayName(report.doctor),
    followup: report.followup !== "—" ? report.followup : "N/A",
    complaint: report.notes || "Medical issue reported during training.",
    diagnosis: report.diagnosis,
    treatment: report.treatment && report.treatment !== "—" ? report.treatment : "RICE protocol, pain relief medication.",
    rest: report.status === "Under Observation" ? "5 days light duty" : "None required",
    outcome: report.status === "Recovered" || report.status === "Normal" ? "Fully recovered — returned to full duty" : "Under active medical care",
    status: report.status === "Normal" || report.status === "Recovered" ? "Closed" : "Active"
  }

  const badgeColor = srData.status === "Closed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"

  const Field = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
      <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1.5">{label}</div>
      <div className="text-sm font-semibold text-stone-700 leading-relaxed">{value}</div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-4xl p-0 overflow-hidden bg-stone-50/80 border-stone-200 rounded-2xl shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-stone-100 bg-white flex flex-row items-center justify-between sticky top-0 z-10 m-0">
          <div className="flex items-center gap-3">
            <HeartPulse size={18} className="text-rose-500" />
            <DialogTitle className="text-lg font-black text-stone-900 tracking-tight">Last Sick Report</DialogTitle>
            <Badge className={`ml-2 border font-bold uppercase tracking-widest text-[10px] px-2.5 py-0.5 ${badgeColor}`}>
              {srData.status}
            </Badge>
          </div>
          <div className="text-xs font-bold text-stone-400 mt-0">{srData.date}</div>
        </DialogHeader>

        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Report No." value={srData.reportNo} />
            <Field label="Date" value={srData.date} />

            <Field label="Attending Doctor" value={`Dr. ${srData.doctor}`} />
            <Field label="Follow-up Date" value={srData.followup} />

            <Field label="Presenting Complaint" value={srData.complaint} />
            <Field label="Diagnosis" value={srData.diagnosis} />

            <Field label="Treatment Given" value={srData.treatment} />
            <Field label="Rest / Light Duty" value={srData.rest} />

            <Field label="Outcome" value={srData.outcome} />
            <Field label="Status" value={srData.status} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── RECORDS ───────────────────────────────────────────────────────────────────
function RecordsSection({ records }: { records: typeof INIT_RECORDS }) {
  const [search, setSearch] = useState("")
  const [statusF, setStatusF] = useState("all")
  const [typeF, setTypeF] = useState("all")
  const [selectedReport, setSelectedReport] = useState<typeof INIT_RECORDS[0] | null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [selectedSickReport, setSelectedSickReport] = useState<typeof INIT_RECORDS[0] | null>(null)
  const [sickReportOpen, setSickReportOpen] = useState(false)

  const filtered = records.filter((r) => {
    const q = search.toLowerCase()
    const matchQ = !q || r.soldierName.toLowerCase().includes(q) || r.soldierId.toLowerCase().includes(q)
    const matchS = statusF === "all" || r.status === statusF
    const matchT = typeF === "all" || r.type === typeF
    return matchQ && matchS && matchT
  })

  return (
    <div className="space-y-6">
      <MedicalReportDialog report={selectedReport} open={reportOpen} onOpenChange={setReportOpen} />
      <SickReportDialog report={selectedSickReport} open={sickReportOpen} onOpenChange={setSickReportOpen} />

      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Medical Records</h1>
        <p className="mt-1 text-xs text-stone-400 font-medium">All Agniveer health records · Confidential</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
        <div className="relative min-w-[200px] flex-1">
          <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search by name or Service ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 border-stone-200 bg-stone-50 pl-9 text-sm"
          />
        </div>
        <Select value={statusF} onValueChange={setStatusF}>
          <SelectTrigger className="h-9 w-44 border-stone-200 bg-stone-50 text-sm shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Under Observation">Under Observation</SelectItem>
            <SelectItem value="Recovered">Recovered</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeF} onValueChange={setTypeF}>
          <SelectTrigger className="h-9 w-44 border-stone-200 bg-stone-50 text-sm shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Treatment">Treatment</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
        <Badge className="border border-stone-200 bg-stone-100 text-stone-600 font-bold px-3 py-1.5 text-[11px] shrink-0">
          {filtered.length} / {records.length} records
        </Badge>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <TooltipProvider delayDuration={150}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  {["Record ID", "Agniveer", "Date", "Admit Date", "Discharge Date", "Hospital", "Type", "Doctor", "Diagnosis", "Status", "Action"].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-[10px] font-black tracking-widest whitespace-nowrap text-stone-500 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-14 text-center text-sm text-stone-400 font-medium">
                      No records match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className={`transition-colors hover:bg-stone-50/80 ${r.status === "Under Observation" ? "bg-amber-50/20" : ""}`}>
                      <td className="px-4 py-3.5 font-mono text-xs text-stone-400 font-medium whitespace-nowrap">{r.id}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white" style={{ backgroundColor: SIDEBAR_BG }}>
                            {r.soldierName.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-stone-800">{r.soldierName}</div>
                            <div className="font-mono text-[10px] font-medium text-stone-400 mt-0.5">{r.soldierId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs whitespace-nowrap font-semibold text-stone-600">{r.date}</td>
                      <td className="px-4 py-3.5 text-xs whitespace-nowrap font-medium">
                        {r.admitDate && r.admitDate !== "—"
                          ? <span className="text-stone-800 font-semibold">{r.admitDate}</span>
                          : <span className="text-stone-300">—</span>}
                      </td>
                      <td className="px-4 py-3.5 text-xs whitespace-nowrap font-medium">
                        {r.dischargeDate && r.dischargeDate !== "—"
                          ? <span className="text-stone-800 font-semibold">{r.dischargeDate}</span>
                          : <span className="text-stone-300">—</span>}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-stone-600 font-medium">
                        <span className="block max-w-[120px] truncate">{r.hospitalLocation || "—"}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Badge className={`border text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 ${typeColor(r.type)}`}>{r.type}</Badge>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="text-xs font-bold text-stone-800">{doctorDisplayName(r.doctor)}</div>
                        <div className="text-[10px] text-stone-400 font-medium mt-0.5">{r.doctorDesignation || "Medical Officer"}</div>
                      </td>
                      <td className="px-4 py-3.5 max-w-[160px]">
                        <span className="line-clamp-2 text-xs font-medium text-stone-700 leading-relaxed">{r.diagnosis}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Badge className={`border text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 ${statusStyle(r.status)}`}>{r.status}</Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-stone-400 rounded-lg transition-colors"
                                onClick={() => { setSelectedReport(r); setReportOpen(true) }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ACTIVE_BG; (e.currentTarget as HTMLElement).style.color = "#fff" }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "#a8a29e" }}
                              >
                                <FileText size={15} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-stone-900 text-white text-xs font-semibold">
                              View Medical Report
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-stone-400 rounded-lg transition-colors hover:bg-rose-50 hover:text-rose-600"
                                onClick={() => { setSelectedSickReport(r); setSickReportOpen(true) }}
                              >
                                <Clock7 size={15} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-stone-900 text-white text-xs font-semibold">
                              Last Sick Report
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TooltipProvider>
        </div>
        <div className="border-t border-stone-200 bg-stone-50 px-5 py-3 text-xs font-semibold text-stone-500">
          Showing {filtered.length} of {records.length} records
        </div>
      </Card>
    </div>
  )
}

// ── LASIK REPORT DIALOG ───────────────────────────────────────────────────────
function LasikReportDialog({ report, open, onOpenChange }: {
  report: typeof LASIK_RECORDS[0] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!report) return null
  const sc =
    report.status === "Cleared" ? "border-emerald-300 bg-emerald-50 text-emerald-700"
      : report.status === "Pending" ? "border-amber-300 bg-amber-50 text-amber-700"
        : "border-sky-300 bg-sky-50 text-sky-700"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-none
    w-[95vw]
    sm:w-[90vw]
    md:w-[82vw]
    lg:w-[72vw]
    xl:w-[64vw]
    2xl:w-[58vw]
    h-auto
    p-0
    overflow-hidden
    rounded-2xl
    border-stone-200
    shadow-2xl
    bg-white">
        <DialogHeader className="px-8 py-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 shrink-0">
                <Eye size={20} className="text-sky-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-black text-stone-900 tracking-tight">Last Seek / Eye Report</DialogTitle>
                <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5">
                  {report.id} &nbsp;·&nbsp; {report.reportDate}
                </p>
              </div>
            </div>
            <Badge className={`border font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 shrink-0 mt-1 ${sc}`}>{report.status}</Badge>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[80vh] px-8 py-6 space-y-7">
          {/* Patient */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">Patient Information</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoField label="Agniveer Name" value={report.soldierName} />
              <InfoField label="Service ID" value={report.soldierId} mono />
              <InfoField label="Rank" value={report.rank} />
              <InfoField label="Follow-up Date" value="—" />
            </div>
          </section>

          {/* Clinical */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">Clinical Details</p>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="p-5 bg-white space-y-5">
                <div>
                  <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Presenting Complaint</div>
                  <div className="text-sm text-stone-700 leading-relaxed bg-stone-50 border border-stone-100 rounded-lg px-4 py-3">
                    {report.presentingComplaint}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Diagnosis</div>
                    <div className="text-sm font-semibold text-stone-800">{report.diagnosis}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Eye Sight Details</div>
                    <div className="text-sm font-mono font-black text-stone-800">{report.eyeSightDetails}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Treatment Given</div>
                  <div className="text-sm text-stone-700 leading-relaxed">{report.treatmentGiven}</div>
                </div>
              </div>
            </div>
          </section>

          {/* LASIK Assessment */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">LASIK Assessment</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-sky-50 border border-sky-100 rounded-xl px-5 py-4">
                <div className="text-[10px] font-black text-sky-600 uppercase tracking-wider mb-2">LASIK Recommendation</div>
                <div className="text-sm font-bold text-stone-900">{report.lasikRecommendation}</div>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-5 py-4">
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">Rest / Light Duty</div>
                <div className="text-sm font-semibold text-stone-800">{report.restLightDuty}</div>
              </div>
            </div>
          </section>

          {/* Outcome + Notes */}
          <section className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-2">Outcome / Status</p>
              <div className="text-sm font-semibold text-stone-800">{report.outcome}</div>
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-2">Clinical Notes</p>
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 text-sm text-stone-600 italic leading-relaxed">
                "{report.notes}"
              </div>
            </div>
          </section>

          {/* Doctor */}
          <section className="flex justify-end border-t border-stone-100 pt-5">
            <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-5 py-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: SIDEBAR_BG }}>
                <Stethoscope size={16} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-1">Attending Physician</div>
                <div className="text-sm font-black text-stone-900">{report.doctor}</div>
                <div className="text-[11px] font-semibold text-stone-400">{report.doctorDesignation}</div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── HEALTH STATS ──────────────────────────────────────────────────────────────
function StatsSection({ records }: { records: typeof INIT_RECORDS }) {
  const normal = records.filter((r) => r.status === "Normal").length
  const underObs = records.filter((r) => r.status === "Under Observation").length
  const recovered = records.filter((r) => r.status === "Recovered").length
  const total = records.length

  const [seekExpanded, setSeekExpanded] = useState(true)
  const [eyeExpanded, setEyeExpanded] = useState(true)
  const [selectedLasikReport, setSelectedLasikReport] = useState<typeof LASIK_RECORDS[0] | null>(null)

  // Real computed averages
  const hrs = records.map((r) => parseFloat(r.hr)).filter((v) => !isNaN(v) && v > 0)
  const avgHr = hrs.length ? Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length) : 0

  const wts = records.map((r) => parseFloat(r.weight)).filter((v) => !isNaN(v) && v > 0)
  const avgWeight = wts.length ? (wts.reduce((a, b) => a + b, 0) / wts.length).toFixed(1) : "—"

  const hts = records.map((r) => parseFloat((r.height || "").replace(" cm", ""))).filter((v) => !isNaN(v) && v > 0)
  const avgHeight = hts.length ? Math.round(hts.reduce((a, b) => a + b, 0) / hts.length) : 0

  const perfectVision = records.filter((r) => r.eyeSight === "6/6").length
  const fitPct = total > 0 ? Math.round((normal / total) * 100) : 0

  const types: Record<string, number> = {}
  records.forEach((r) => { types[r.type] = (types[r.type] || 0) + 1 })
  const maxTypeCount = Math.max(...Object.values(types), 1)

  const eyeSightCounts = {
    good: EYE_SIGHT_RECORDS.filter((r) => r.status === "Good").length,
    normal: EYE_SIGHT_RECORDS.filter((r) => r.status === "Normal").length,
    weak: EYE_SIGHT_RECORDS.filter((r) => r.status === "Weak").length,
  }

  const CollapsibleHeader = ({
    icon,
    iconBg,
    title,
    subtitle,
    pills,
    expanded,
    onToggle,
  }: {
    icon: React.ReactNode
    iconBg: string
    title: string
    subtitle: string
    pills?: React.ReactNode
    expanded: boolean
    onToggle: () => void
  }) => (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors focus:outline-none"
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${iconBg}`}>{icon}</div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wide">{title}</h3>
          <p className="text-xs text-stone-400 font-medium mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        {pills}
        {expanded ? <ChevronUp size={16} className="text-stone-400 shrink-0" /> : <ChevronDown size={16} className="text-stone-400 shrink-0" />}
      </div>
    </button>
  )

  return (
    <div className="space-y-6">
      <LasikReportDialog
        report={selectedLasikReport}
        open={!!selectedLasikReport}
        onOpenChange={(o) => !o && setSelectedLasikReport(null)}
      />

      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Health Statistics</h1>
        <p className="mt-1 text-xs text-stone-400 font-medium">Command-wide fitness and health overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Records", value: total, color: SIDEBAR_BG },
          { label: "Fit for Duty", value: normal, color: "#10b981" },
          { label: "Under Observation", value: underObs, color: "#f59e0b" },
          { label: "Recovered", value: recovered, color: "#0ea5e9" },
        ].map((c) => (
          <Card
            key={c.label}
            className="border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            style={{ borderTopWidth: "4px", borderTopColor: c.color }}
          >
            <CardContent className="px-5 py-4">
              <div className="text-3xl font-black" style={{ color: c.color }}>{c.value}</div>
              <div className="mt-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wide">{c.label}</div>
              <div className="mt-1 text-[10px] font-semibold text-stone-300">
                {total > 0 ? `${Math.round((c.value / total) * 100)}% of total` : "—"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Status breakdown */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-3 px-5 pt-5 border-b border-stone-100">
            <CardTitle className="flex items-center gap-2 text-sm font-bold text-stone-800 uppercase tracking-wide">
              <Activity size={15} className="text-emerald-500" /> Fitness Status Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 px-5 pb-5 pt-4">
            {[
              { label: "Fit for Duty", value: normal, color: "#10b981", textCls: "text-emerald-700" },
              { label: "Under Observation", value: underObs, color: "#f59e0b", textCls: "text-amber-700" },
              { label: "Recovered", value: recovered, color: "#0ea5e9", textCls: "text-sky-700" },
            ].map((item) => {
              const pct = total > 0 ? Math.round((item.value / total) * 100) : 0
              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-600">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-stone-400">{pct}%</span>
                      <span className={`text-sm font-black w-5 text-right ${item.textCls}`}>{item.value}</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Record type distribution — FIXED alignment */}
        <Card className="border-stone-200 bg-white shadow-sm rounded-2xl">
          {/* Header */}
          <CardHeader className="px-5 py-4 border-b border-stone-100">
            <CardTitle className="flex items-center gap-3 text-sm font-black tracking-[0.12em] uppercase text-stone-800">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#fff2ec" }}
              >
                <Stethoscope size={16} style={{ color: ACTIVE_BG }} />
              </div>

              <div>
                <div>Record Type Distribution</div>
                <p className="text-[10px] font-semibold tracking-wider text-stone-400 mt-0.5">
                  MEDICAL REPORT BREAKDOWN
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="px-5 py-5 space-y-4">
            {Object.entries(types).map(([type, count], index) => {
              const pct = Math.round((count / maxTypeCount) * 100)

              return (
                <div key={type} className="space-y-2">
                  {/* Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Dot */}
                      <div
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: ACTIVE_BG }}
                      />

                      {/* Label */}
                      <span className="text-sm font-semibold text-stone-700 truncate">
                        {type}
                      </span>
                    </div>

                    {/* Count */}
                    <div className="text-right">
                      <div className="text-base font-black text-stone-900 tabular-nums leading-none">
                        {count}
                      </div>
                      <div className="text-[10px] font-semibold text-stone-400 mt-0.5">
                        {pct}%
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="relative h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor:
                          index % 2 === 0 ? ACTIVE_BG : SIDEBAR_BG,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

      </div>

      {/* Command Health Overview */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-3 px-5 pt-5 border-b border-stone-100">
          <CardTitle className="flex items-center gap-2 text-sm font-bold text-stone-800 uppercase tracking-wide">
            <HeartPulse size={15} style={{ color: ACTIVE_BG }} /> Command Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Avg. Heart Rate", value: `${avgHr} bpm`, sub: "Normal: 60–100", color: ACTIVE_BG, bg: "#fff0eb", icon: <HeartPulse size={18} /> },
              { label: "Avg. Weight", value: `${avgWeight} kg`, sub: "BMI Target: 18.5–25", color: "#0284c7", bg: "#f0f9ff", icon: <User size={18} /> },
              { label: "Avg. Height", value: `${avgHeight} cm`, sub: "Across command", color: "#7c3aed", bg: "#f5f3ff", icon: <Ruler size={18} /> },
              { label: "Perfect Vision", value: `${perfectVision}/${total}`, sub: "6/6 eye sight", color: "#0d9488", bg: "#f0fdfa", icon: <ScanEye size={18} /> },
              { label: "Fit for Duty", value: `${fitPct}%`, sub: `${normal} of ${total} Agniveer`, color: "#10b981", bg: "#f0fdf4", icon: <Shield size={18} /> },
              { label: "Follow-ups Due", value: `${underObs}`, sub: underObs > 0 ? "Action required" : "All clear", color: "#f59e0b", bg: "#fffbeb", icon: <CalendarDays size={18} /> },
            ].map((v) => (
              <div key={v.label} className="rounded-xl border border-stone-100 p-4 text-center hover:shadow-sm transition-shadow bg-white">
                <div className="mb-3 flex justify-center items-center h-10 w-10 rounded-xl mx-auto" style={{ color: v.color, backgroundColor: v.bg }}>
                  {v.icon}
                </div>
                <div className="text-xl font-black" style={{ color: v.color }}>{v.value}</div>
                <div className="mt-1 text-[10px] font-black tracking-wide text-stone-500 uppercase leading-tight">{v.label}</div>
                <div className="mt-1 text-[10px] text-stone-400 font-medium">{v.sub}</div>
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
    dashboard: "Dashboard",
    add: "Add Record",
    records: "Medical Records",
    stats: "Health Stats",
  }

  return (
    // h-screen + overflow-hidden = sidebar never scrolls, only inner content does
    <div className="flex h-screen overflow-hidden bg-[#f0ede8] font-sans">
      <Sidebar active={section} setActive={setSection} />

      {/* Scrollable main area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {/* Sticky header inside scroll container */}
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95 backdrop-blur-sm shadow-sm shrink-0">
          <div className="flex items-center justify-between px-6 py-3.5">
            <div>
              <h1 className="text-base font-black text-stone-900 tracking-tight">{titles[section]}</h1>
              <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wide">Medical Officer · Agnipath Command</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Badge className="border border-stone-200 bg-white text-[10px] font-bold text-stone-500 uppercase tracking-widest shadow-sm px-3 py-1.5 hidden sm:inline-flex">
                Secure Portal
              </Badge>
              <Badge
                className="border text-[10px] font-bold uppercase tracking-widest px-3 py-1.5"
                style={{ borderColor: "#fca5a5", backgroundColor: "#fff1f2", color: ACTIVE_BG }}
              >
                Medical Officer
              </Badge>
            </div>
          </div>
          <MobileNav active={section} setActive={setSection} />
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 py-7 lg:px-10">
          <div className="mx-auto w-full max-w-[1600px]">
            {section === "dashboard" && <DashboardSection records={records} setActive={setSection} />}
            {section === "add" && (
              <AddRecordSection
                onAdd={(r) => {
                  setRecords((p) => [r, ...p])
                  setSection("records")
                }}
              />
            )}
            {section === "records" && <RecordsSection records={records} />}
            {section === "stats" && <StatsSection records={records} />}
          </div>
        </main>
      </div>
    </div>
  )
}