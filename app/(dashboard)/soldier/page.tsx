"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Dumbbell,
  CalendarDays,
  HeartPulse,
  Package,
  Landmark,
  Bot,
  TrendingUp,
  FileText,
  ChevronRight,
  Trophy,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Star,
  Swords,
  Brain,
  Target,
  ShieldCheck,
  Clock,
  Pill,
  Activity,
  ArrowRight,
  Send,
  RotateCcw,
  Loader2,
  LogOut,
  User,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// ── Types ─────────────────────────────────────────────────────────────────────
type Section =
  | "dashboard"
  | "training"
  | "schedule"
  | "medical"
  | "equipment"
  | "stipend"
  | "ai"
  | "insights"

// ── Soldier Data ──────────────────────────────────────────────────────────────
const SOLDIER = {
  name: "Rajveer Singh Chauhan",
  id: "AGN-2024-0101",
  rank: "Sepoy",
  battalion: "1st Rajputana Rifles",
  battalionCode: "RR-1",
  state: "Rajasthan",
  city: "Jodhpur",
  dob: "2003-04-12",
  joining: "2024-01-15",
  blood: "B+",
  phone: "9876501001",
  email: "rajveer@army.in",
  status: "active",
  medical: "Fit",
  scores: {
    physical: 91,
    weapons: 88,
    mental: 78,
    combat: 89,
    attendance: 96,
    discipline: 92,
  },
  overall: 89,
  globalRank: 4,
  batRank: 1,
  equipment: [
    {
      name: "INSAS Rifle",
      type: "Weapon",
      issued: "15 Jan 2024",
      condition: "Good",
    },
    {
      name: "Combat Uniform",
      type: "Uniform",
      issued: "15 Jan 2024",
      condition: "Good",
    },
    {
      name: "Tactical Backpack",
      type: "Gear",
      issued: "15 Jan 2024",
      condition: "Good",
    },
    {
      name: "Ballistic Helmet",
      type: "Uniform",
      issued: "15 Jan 2024",
      condition: "Worn",
    },
  ],
  events: [
    "Won 200m Sprint — Batch Rally 2024",
    "Best Shooter Award — March 2025",
  ],
}

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
function grade(v: number) {
  if (v >= 90)
    return {
      l: "Outstanding",
      c: "bg-emerald-100 text-emerald-700 border-emerald-200",
    }
  if (v >= 80) return { l: "Good", c: "bg-sky-100 text-sky-700 border-sky-200" }
  if (v >= 70)
    return { l: "Average", c: "bg-amber-100 text-amber-700 border-amber-200" }
  return {
    l: "Needs Improvement",
    c: "bg-rose-100 text-rose-600 border-rose-200",
  }
}

function ScoreBar({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: React.ReactNode
}) {
  const g = grade(value)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          {icon}
          {label}
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`border text-[10px] font-semibold ${g.c}`}>
            {g.l}
          </Badge>
          <span className={`text-sm font-black ${sc(value)}`}>{value}</span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ${bc(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

// ── Navigation ────────────────────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
  { id: "training", label: "Training", icon: <Dumbbell size={14} /> },
  { id: "schedule", label: "Schedule", icon: <CalendarDays size={14} /> },
  { id: "medical", label: "Medical", icon: <HeartPulse size={14} /> },
  { id: "equipment", label: "Equipment", icon: <Package size={14} /> },
  { id: "stipend", label: "Stipend", icon: <Landmark size={14} /> },
  { id: "ai", label: "AgniAssist AI", icon: <Bot size={14} /> },
  { id: "insights", label: "My AI Insights", icon: <TrendingUp size={14} /> },
]

function Sidebar({
  active,
  setActive,
}: {
  active: Section
  setActive: (s: Section) => void
}) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
      <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-sm font-bold text-white">
            R
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-stone-800">
              {SOLDIER.name}
            </div>
            <div className="font-mono text-[10px] text-orange-500">
              {SOLDIER.id}
            </div>
            <div className="text-[10px] text-stone-400">
              {SOLDIER.rank} · {SOLDIER.battalionCode}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Badge className="border border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700">
            Active Duty
          </Badge>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        <p className="px-2 pt-2 pb-1 text-[9px] font-bold tracking-widest text-stone-400 uppercase">
          Soldier Portal
        </p>
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              active === n.id
                ? "bg-[#1a2d4a] text-white shadow-sm"
                : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
            }`}
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
    <div className="scrollbar-hide flex overflow-x-auto border-b border-stone-200 bg-white md:hidden">
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => setActive(n.id)}
          className={`flex shrink-0 flex-col items-center gap-0.5 border-b-2 px-3 py-2.5 text-[10px] font-semibold whitespace-nowrap transition-colors ${
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

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardSection({ setActive }: { setActive: (s: Section) => void }) {
  const s = SOLDIER
  const scores = s.scores

  const strengths = Object.entries(scores).filter(([, v]) => v >= 85)
  const improvements = Object.entries(scores).filter(([, v]) => v < 70)

  const scoreLabels: Record<string, string> = {
    physical: "Physical",
    weapons: "Weapons",
    mental: "Mental",
    combat: "Combat",
    attendance: "Attendance",
    discipline: "Discipline",
  }

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-stone-900">
          Welcome, {s.name.split(" ")[0]}
        </h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Friday, 14 March 2025 · {s.battalion}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Overall Score",
            value: s.overall,
            sub: grade(s.overall).l,
            accent: "text-orange-500",
            topBorder: "border-t-[#c8601a]",
          },
          {
            label: "Global Rank",
            value: `#${s.globalRank}`,
            sub: "All Agniveers",
            accent: "text-[#1a2d4a]",
            topBorder: "border-t-[#1a2d4a]",
          },
          {
            label: "Battalion Rank",
            value: `#${s.batRank}`,
            sub: s.battalionCode,
            accent: "text-[#4a5c2f]",
            topBorder: "border-t-[#4a5c2f]",
          },
          {
            label: "Attendance",
            value: `${scores.attendance}%`,
            sub: "This batch",
            accent: "text-emerald-600",
            topBorder: "border-t-emerald-500",
          },
        ].map((c) => (
          <Card
            key={c.label}
            className={`border border-t-4 border-stone-200 ${c.topBorder} bg-white shadow-sm`}
          >
            <CardContent className="px-4 pt-3 pb-3">
              <div className="text-[10px] font-medium tracking-wide text-stone-400 uppercase">
                {c.label}
              </div>
              <div className={`mt-1 text-2xl font-black ${c.accent}`}>
                {c.value}
              </div>
              <div className="mt-0.5 text-[10px] text-stone-400">{c.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scores + insights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Score bars */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-stone-800">
              My Scores — March 2025
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
            ].map((row) => (
              <ScoreBar
                key={row.key}
                label={row.label}
                value={scores[row.key as keyof typeof scores]}
                icon={row.icon}
              />
            ))}
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="space-y-3">
          {/* Strengths */}
          <Card className="border border-emerald-200 bg-emerald-50 shadow-sm">
            <CardHeader className="pb-1.5">
              <CardTitle className="text-sm font-semibold text-emerald-800">
                ✅ Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4">
              {strengths.length === 0 ? (
                <p className="text-xs text-emerald-700">
                  No category above 85 yet. Keep going!
                </p>
              ) : (
                strengths.map(([k, v]) => (
                  <div key={k} className="flex items-start gap-2">
                    <Star
                      size={12}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    <div>
                      <span className="text-xs font-semibold text-emerald-800">
                        {scoreLabels[k]} — {v}
                      </span>
                      <p className="mt-0.5 text-[10px] text-emerald-700">
                        {v >= 95
                          ? "Exceptional — lead PT sessions to mentor peers."
                          : "Excellent — maintain this standard."}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Areas to improve */}
          <Card className="border border-amber-200 bg-amber-50 shadow-sm">
            <CardHeader className="pb-1.5">
              <CardTitle className="text-sm font-semibold text-amber-800">
                🔧 Areas to Improve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4">
              {improvements.length === 0 ? (
                <p className="text-xs font-semibold text-emerald-700">
                  No critical weaknesses. Great work!
                </p>
              ) : (
                improvements.map(([k, v]) => (
                  <div key={k} className="flex items-start gap-2">
                    <AlertTriangle
                      size={12}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                    <div>
                      <span className="text-xs font-semibold text-amber-800">
                        {scoreLabels[k]} — {v}
                      </span>
                      <p className="mt-0.5 text-[10px] text-amber-700">
                        Needs focused improvement. Target: +10 in 8 weeks.
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Events */}
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardHeader className="pb-1.5">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold text-stone-800">
                <Trophy size={14} className="text-amber-500" /> Awards & Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4">
              {s.events.map((ev, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-stone-700"
                >
                  <Trophy size={11} className="shrink-0 text-amber-400" />
                  {ev}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "View Training",
            section: "training" as Section,
            icon: <Dumbbell size={14} />,
            color: "text-[#4a5c2f]",
          },
          {
            label: "Daily Schedule",
            section: "schedule" as Section,
            icon: <CalendarDays size={14} />,
            color: "text-sky-600",
          },
          {
            label: "Medical Records",
            section: "medical" as Section,
            icon: <HeartPulse size={14} />,
            color: "text-rose-500",
          },
          {
            label: "Stipend",
            section: "stipend" as Section,
            icon: <Landmark size={14} />,
            color: "text-amber-600",
          },
        ].map((q) => (
          <button
            key={q.label}
            onClick={() => setActive(q.section)}
            className="flex items-center justify-between gap-2 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-300 hover:shadow-md"
          >
            <div className={`flex items-center gap-2 ${q.color}`}>
              {q.icon}
              {q.label}
            </div>
            <ChevronRight size={13} className="text-stone-300" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── TRAINING ──────────────────────────────────────────────────────────────────
function TrainingSection() {
  const records = [
    {
      date: "14 Mar",
      type: "Physical",
      details: "Run: 12:34 min, Pushups: 52, Pullups: 14",
      score: 91,
    },
    {
      date: "12 Mar",
      type: "Weapons",
      details: "Shooting: 88%, Handling: 86",
      score: 85,
    },
    {
      date: "10 Mar",
      type: "Mental",
      details: "Strategy: 79, Decision making: 82",
      score: 79,
    },
    {
      date: "07 Mar",
      type: "Physical",
      details: "Run: 12:15 min, Pushups: 55, Pullups: 15",
      score: 93,
    },
    {
      date: "05 Mar",
      type: "Combat",
      details: "Drill: 90, Obstacle course: 88",
      score: 89,
    },
    {
      date: "02 Mar",
      type: "Weapons",
      details: "Long range: 85%, Close range: 91",
      score: 88,
    },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Training Records</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Your performance history · 1st Rajputana Rifles
        </p>
      </div>

      {/* Personal bests */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Running Best", value: "12:15 min" },
          { label: "Max Pushups", value: "55" },
          { label: "Shooting Acc.", value: "91%" },
          { label: "Overall Score", value: "89" },
        ].map((c) => (
          <Card key={c.label} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="px-4 pt-3 pb-3">
              <div className="text-[10px] tracking-wide text-stone-400 uppercase">
                {c.label}
              </div>
              <div className="mt-1 text-xl font-black text-[#1a2d4a]">
                {c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training history table */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Training History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {["Date", "Type", "Details", "Score", "Grade"].map((h) => (
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
                {records.map((r, i) => (
                  <tr key={i} className="hover:bg-stone-50">
                    <td className="px-4 py-3 font-mono text-xs text-stone-400">
                      {r.date}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="border border-sky-200 bg-sky-50 text-xs text-sky-700">
                        {r.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">
                      {r.details}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-black ${sc(r.score)}`}>
                        {r.score}
                      </span>
                      <span className="text-xs text-stone-400">/100</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`border text-xs ${grade(r.score).c}`}>
                        {grade(r.score).l}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Score trend */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            6-Month Score Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 px-4 pb-4">
          {[
            { m: "Oct", v: 81 },
            { m: "Nov", v: 83 },
            { m: "Dec", v: 85 },
            { m: "Jan", v: 86 },
            { m: "Feb", v: 88 },
            { m: "Mar", v: 89 },
          ].map((pt, i, arr) => (
            <div key={pt.m} className="flex items-center gap-3">
              <span className="w-7 text-xs font-medium text-stone-400">
                {pt.m}
              </span>
              <div className="h-5 flex-1 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${i === arr.length - 1 ? "bg-[#c8601a]" : "bg-[#4a5c2f]"}`}
                  style={{ width: `${pt.v}%` }}
                />
              </div>
              <span
                className={`w-8 text-right text-sm font-bold ${i === arr.length - 1 ? "text-[#c8601a]" : "text-[#4a5c2f]"}`}
              >
                {pt.v}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ── SCHEDULE ──────────────────────────────────────────────────────────────────
function ScheduleSection() {
  const [day, setDay] = useState(4) // Friday

  const schedule = [
    {
      time: "05:00",
      activity: "Morning Physical Training",
      location: "Parade Ground",
      color: "#4a5e3a",
      done: true,
    },
    {
      time: "07:00",
      activity: "Breakfast & Rest",
      location: "Mess Hall",
      color: "#b8941a",
      done: true,
    },
    {
      time: "08:30",
      activity: "Weapons Training",
      location: "Range Area",
      color: "#c0392b",
      done: true,
    },
    {
      time: "11:00",
      activity: "Combat Drills",
      location: "Obstacle Course",
      color: "#1a2d4a",
      active: true,
    },
    {
      time: "13:00",
      activity: "Lunch Break",
      location: "Mess Hall",
      color: "#b8941a",
    },
    {
      time: "14:30",
      activity: "Mental Resilience Class",
      location: "Classroom Block A",
      color: "#1565c0",
    },
    {
      time: "16:30",
      activity: "Evening Run (5 km)",
      location: "Track",
      color: "#4a5e3a",
    },
    {
      time: "19:00",
      activity: "Study Hours",
      location: "Barrack",
      color: "#777",
    },
    {
      time: "21:00",
      activity: "Lights Out",
      location: "Barrack",
      color: "#444",
    },
  ]

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Daily Schedule</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          14 March 2025 · {SOLDIER.battalion}
        </p>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => setDay(i)}
            className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
              i === day
                ? "border-[#1a2d4a] bg-[#1a2d4a] text-white"
                : "border-stone-200 bg-white text-stone-500 hover:border-stone-300"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            {days[day]} Programme
          </CardTitle>
          <Badge className="border border-emerald-200 bg-emerald-50 text-xs text-emerald-700">
            On Schedule
          </Badge>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-[68px] w-px bg-stone-100" />

            {schedule.map((item, i) => (
              <div
                key={i}
                className={`mb-1 flex items-start gap-4 rounded-lg px-3 py-3 transition-all ${
                  (item as any).active
                    ? "border border-orange-200 bg-orange-50"
                    : "hover:bg-stone-50"
                }`}
              >
                {/* Time */}
                <span className="mt-0.5 w-12 shrink-0 font-mono text-xs font-medium text-stone-400">
                  {item.time}
                </span>

                {/* Dot */}
                <div className="relative z-10 mt-1 shrink-0">
                  <div
                    className={`h-3.5 w-3.5 rounded-full border-2 transition-all`}
                    style={{
                      borderColor: item.color,
                      background:
                        (item as any).done || (item as any).active
                          ? item.color
                          : "#fff",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        (item as any).active
                          ? "text-[#c8601a]"
                          : (item as any).done
                            ? "text-stone-400 line-through"
                            : "text-stone-800"
                      }`}
                    >
                      {(item as any).active && "▶ "}
                      {item.activity}
                    </span>
                    {(item as any).done && (
                      <span className="text-[10px] font-bold text-emerald-600">
                        ✓ Done
                      </span>
                    )}
                    {(item as any).active && (
                      <Badge className="border border-amber-200 bg-amber-50 text-[10px] text-amber-700">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-400">
                    📍 {item.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── MEDICAL ───────────────────────────────────────────────────────────────────
function MedicalSection() {
  const records = [
    {
      date: "01 Mar 2025",
      type: "Regular Checkup",
      doctor: "Dr. Sunita Rao",
      diagnosis: "Fit for Duty",
      status: "Normal",
    },
    {
      date: "15 Jan 2025",
      type: "Treatment",
      doctor: "Dr. Rajan Mehta",
      diagnosis: "Minor sprain — right ankle",
      status: "Recovered",
    },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Medical Records</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Confidential — Health History
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Blood Group", value: SOLDIER.blood },
          { label: "BMI", value: "23.4" },
          { label: "Last Checkup", value: "01 Mar 2025" },
          { label: "Fitness Status", value: "Fit for Duty" },
        ].map((c) => (
          <Card key={c.label} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="px-4 pt-3 pb-3">
              <div className="text-[10px] tracking-wide text-stone-400 uppercase">
                {c.label}
              </div>
              <div className="mt-1 text-base font-black text-[#1a2d4a]">
                {c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Medical fitness summary */}
      <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
        <div className="text-sm text-emerald-800">
          <strong>Currently Fit for Duty.</strong> No active medical
          restrictions. Next scheduled checkup: 01 Sep 2025.
        </div>
      </div>

      {/* Health vitals */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Latest Health Vitals
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: "Blood Pressure",
                value: "118/76 mmHg",
                status: "Normal",
                color: "emerald",
              },
              {
                label: "Heart Rate",
                value: "68 bpm",
                status: "Normal",
                color: "emerald",
              },
              {
                label: "Weight",
                value: "68 kg",
                status: "Normal",
                color: "emerald",
              },
              {
                label: "Vision",
                value: "6/6 (Both)",
                status: "Normal",
                color: "emerald",
              },
            ].map((v) => (
              <div
                key={v.label}
                className="rounded-lg border border-stone-100 bg-stone-50 p-3"
              >
                <div className="text-[10px] tracking-wide text-stone-400 uppercase">
                  {v.label}
                </div>
                <div className="mt-1 text-sm font-bold text-stone-800">
                  {v.value}
                </div>
                <Badge className="mt-1 border border-emerald-200 bg-emerald-100 text-[10px] text-emerald-700">
                  {v.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History table */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Medical History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {["Date", "Type", "Doctor", "Diagnosis", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-stone-500 uppercase"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {records.map((r, i) => (
                  <tr key={i} className="hover:bg-stone-50">
                    <td className="px-4 py-3 font-mono text-xs text-stone-400">
                      {r.date}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="border border-sky-200 bg-sky-50 text-xs text-sky-700">
                        {r.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      {r.doctor}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600">
                      {r.diagnosis}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`border text-xs ${r.status === "Normal" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-sky-200 bg-sky-50 text-sky-700"}`}
                      >
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── EQUIPMENT ─────────────────────────────────────────────────────────────────
function EquipmentSection() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Equipment & Arms</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Issued weapons, uniform, and gear
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
        <Shield size={14} className="shrink-0" />
        <span>
          All equipment is under your personal responsibility. Report any loss
          or damage to the Quartermaster immediately.
        </span>
      </div>

      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Issued Items
          </CardTitle>
          <Badge className="border border-[#c5d9a0] bg-[#eef3e6] text-xs text-[#4a5c2f]">
            {SOLDIER.equipment.length} Items
          </Badge>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {[
                    "#",
                    "Item Name",
                    "Type",
                    "Issued On",
                    "Condition",
                    "Action",
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
                {SOLDIER.equipment.map((eq, i) => (
                  <tr key={i} className="hover:bg-stone-50">
                    <td className="px-4 py-3 font-mono text-xs text-stone-400">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-stone-800">
                      📦 {eq.name}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="border border-sky-200 bg-sky-50 text-xs text-sky-700">
                        {eq.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-400">
                      {eq.issued}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`border text-xs ${
                          eq.condition === "Worn"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {eq.condition}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 border-stone-200 px-2 text-[10px] text-stone-500"
                      >
                        Report Issue
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Items",
            value: SOLDIER.equipment.length,
            color: "text-stone-700",
          },
          {
            label: "Good Condition",
            value: SOLDIER.equipment.filter((e) => e.condition === "Good")
              .length,
            color: "text-emerald-600",
          },
          {
            label: "Needs Attention",
            value: SOLDIER.equipment.filter((e) => e.condition === "Worn")
              .length,
            color: "text-amber-600",
          },
        ].map((s) => (
          <Card key={s.label} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="px-4 pt-3 pb-3 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="mt-0.5 text-[10px] text-stone-400">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── STIPEND ───────────────────────────────────────────────────────────────────
function StipendSection() {
  const paySlips = [
    {
      month: "March 2025",
      base: 30000,
      allow: 5400,
      deduct: 2000,
      net: 33400,
      txn: "TXN9847261",
      status: "Paid",
    },
    {
      month: "February 2025",
      base: 30000,
      allow: 5400,
      deduct: 1800,
      net: 33600,
      txn: "TXN9841034",
      status: "Paid",
    },
    {
      month: "January 2025",
      base: 30000,
      allow: 5400,
      deduct: 2200,
      net: 33200,
      txn: "TXN9836720",
      status: "Paid",
    },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Stipend Records</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Monthly pay & Seva Nidhi Fund
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "March Net Pay",
            value: "₹33,400",
            accent: "text-[#1a2d4a]",
          },
          { label: "Annual CTC", value: "₹3.96 L", accent: "text-stone-700" },
          { label: "Seva Nidhi", value: "₹1.02 L", accent: "text-[#4a5c2f]" },
          {
            label: "March Status",
            value: "Paid ✓",
            accent: "text-emerald-600",
          },
        ].map((c) => (
          <Card key={c.label} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="px-4 pt-3 pb-3">
              <div className="text-[10px] tracking-wide text-stone-400 uppercase">
                {c.label}
              </div>
              <div className={`mt-1 text-base font-black ${c.accent}`}>
                {c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seva Nidhi progress */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Seva Nidhi Fund Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-xs text-stone-400">Current Corpus</span>
            <span className="text-lg font-black text-[#4a5c2f]">₹1,02,000</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-[#4a5c2f] transition-all duration-700"
              style={{ width: "8.7%" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-stone-400">
            <span>₹0</span>
            <span className="font-semibold text-stone-500">
              8.7% of target ₹11.71 L at completion
            </span>
            <span>₹11.71 L</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-stone-600">
            <div className="rounded border border-stone-100 bg-stone-50 px-3 py-2">
              <div className="font-semibold">Your monthly contribution</div>
              <div className="mt-0.5 text-sm font-black text-[#4a5c2f]">
                ₹9,000
              </div>
            </div>
            <div className="rounded border border-stone-100 bg-stone-50 px-3 py-2">
              <div className="font-semibold">Govt. matching contribution</div>
              <div className="mt-0.5 text-sm font-black text-[#4a5c2f]">
                ₹9,000
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pay slip table */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Pay Slip History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {[
                    "Month",
                    "Base Pay",
                    "Allowances",
                    "Deductions",
                    "Net Pay",
                    "Transaction ID",
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
                {paySlips.map((r, i) => (
                  <tr key={i} className="hover:bg-stone-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-800">
                      {r.month}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-600">
                      ₹{r.base.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-emerald-600">
                      +₹{r.allow.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-rose-500">
                      -₹{r.deduct.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm font-black text-stone-800">
                      ₹{r.net.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-400">
                      {r.txn}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="border border-emerald-200 bg-emerald-50 text-xs text-emerald-700">
                        ✓ {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── AGNIASSIST AI ─────────────────────────────────────────────────────────────
type Msg = { from: "bot" | "user"; text: string }

const CANNED: Record<string, string> = {
  "physical training":
    "Physical training standards: Daily 5km run, 50 push-ups, 10 pull-ups, 50 sit-ups. Minimum passing: 1.6km in 7 min, 20 push-ups, 8 pull-ups. All personnel must pass Physical Efficiency Test every quarter.",
  stipend:
    "Agniveer stipend: ₹30,000/month in Year 1, rising to ₹40,000 in Year 4. 30% deposited into Seva Nidhi corpus, matched by the Government. At the end of 4 years, total Seva Nidhi payout is approximately ₹11.71 lakh (tax-exempt).",
  schedule:
    "Daily schedule: 05:00 Morning PT, 07:00 Breakfast, 08:30 Weapons Training, 11:00 Combat Drills, 13:00 Lunch, 14:30 Mental Resilience, 16:30 Evening Run, 19:00 Study Hours, 22:00 Lights Out.",
  weapons:
    "Weapons training includes INSAS Rifle, LMG, grenade throwing, and field tactics. Minimum qualifying score: 35/50 in marksmanship. Weekly training sessions of 4 hours mandatory.",
  medical:
    "Medical fitness required for active duty. Checkups every 6 months. BMI: 18.5–25. Vision: 6/6 both eyes. Height minimum: 170 cm. Medical leave requires doctor's certificate.",
  leave:
    "Agniveers are entitled to 30 days annual leave, 10 days casual leave, and medical leave as certified. Leave must be approved by the battalion commander.",
  rank: "Agniveer ranks: Sepoy → Lance Naik → Naik → Havildar. Promotions based on performance scores, attendance, discipline, and tenure. Top 25% may be retained in regular cadre.",
  sos: "In an SOS situation: (1) All units report to designated stations immediately. (2) Unit commanders acknowledge within 5 minutes. (3) Drill coordinators mark completion in the portal.",
  documents:
    "Required documents: Aadhaar card, Class 10/12 marksheets, domicile certificate, caste certificate (if applicable), medical fitness certificate, passport-size photographs.",
  battalion:
    "Battalions are operational units with up to 150 Agniveers each. Each battalion has a commander, assigned location, and specific mission. Performance is measured monthly.",
}

function AgniAssistSection() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Namaste 🫡 I'm AgniAssist, your AI assistant for the Agnipath Portal. Ask me about training standards, stipend, schedule, medical requirements, leave policy, SOS protocols, or anything else.",
    },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msgs, typing])

  const getReply = (q: string) => {
    const lower = q.toLowerCase()
    for (const [key, ans] of Object.entries(CANNED)) {
      if (lower.includes(key)) return ans
    }
    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("namaste")
    )
      return "Namaste! Ready to assist. Ask me about training, stipend, schedules, medical standards, or any aspect of the Agnipath programme."
    if (lower.includes("help"))
      return "I can help with: Physical training, Weapons training, Medical fitness, Stipend & benefits, Daily schedules, SOS alerts, Battalion info, Ranks & promotions, Leave policy, and Required documents."
    return `I've noted your query. For detailed guidance on this specific topic, please consult your battalion commander or the Agnipath programme handbook.`
  }

  const send = (text = input) => {
    const q = text.trim()
    if (!q || typing) return
    setMsgs((m) => [...m, { from: "user", text: q }])
    setInput("")
    setTyping(true)
    setTimeout(
      () => {
        setMsgs((m) => [...m, { from: "bot", text: getReply(q) }])
        setTyping(false)
      },
      800 + Math.random() * 600
    )
  }

  const suggestions = [
    "Physical training",
    "Stipend & Seva Nidhi",
    "Daily schedule",
    "Leave policy",
    "Rank & promotion",
    "Medical requirements",
  ]

  return (
    <div className="flex h-[calc(100vh-130px)] flex-col space-y-0">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-900">
            AgniAssist — AI Assistant
          </h1>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
            <Zap size={10} className="text-amber-500" /> Powered by RAG ·
            Offline military knowledge base
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="border border-emerald-200 bg-emerald-50 text-xs text-emerald-600">
            ● Online
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setMsgs([
                {
                  from: "bot",
                  text: "Conversation reset. How can I help you?",
                },
              ])
              setInput("")
            }}
            className="h-7 gap-1 text-xs"
          >
            <RotateCcw size={11} /> Reset
          </Button>
        </div>
      </div>

      {/* Chat */}
      <Card className="flex flex-1 flex-col overflow-hidden border-stone-200 bg-white shadow-sm">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.from === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${m.from === "user" ? "bg-stone-700" : "bg-[#4a5c2f]"}`}
              >
                {m.from === "user" ? <User size={12} /> : <Bot size={12} />}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  m.from === "user"
                    ? "rounded-tr-sm bg-[#1a2d4a] text-white"
                    : "rounded-tl-sm border border-stone-100 bg-stone-50 text-stone-800"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4a5c2f]">
                <Bot size={12} className="text-white" />
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-stone-100 bg-stone-50 px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="space-y-2 border-t border-stone-100 p-3">
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={typing}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[10px] font-medium text-stone-500 transition-all hover:border-[#4a5c2f] hover:bg-[#4a5c2f] hover:text-white disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm placeholder:text-stone-400 focus:border-[#4a5c2f] focus:ring-1 focus:ring-[#4a5c2f] focus:outline-none disabled:opacity-50"
              placeholder="Ask about training, stipend, schedule, medical..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              disabled={typing}
            />
            <Button
              onClick={() => send()}
              disabled={!input.trim() || typing}
              className="h-9 w-9 shrink-0 rounded-lg bg-[#4a5c2f] p-0 text-white hover:bg-[#344228] disabled:opacity-40"
            >
              {typing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ── MY AI INSIGHTS ────────────────────────────────────────────────────────────
function InsightsSection() {
  const s = SOLDIER.scores
  const overall = SOLDIER.overall
  const predicted = Math.min(100, Math.round(overall + 2.3))
  const injRisk =
    s.physical < 75 ? "HIGH" : s.physical < 85 ? "MODERATE" : "LOW"

  const recs = [
    {
      area: "Mental Resilience",
      tip: "Continue resilience workshops. Add 20 min meditation daily. Group problem-solving exercises recommended.",
      icon: <Brain size={13} />,
    },
    {
      area: "Weapons Accuracy",
      tip: "Schedule 2 extra range sessions per week. Focus on moving target drills and reload speed.",
      icon: <Target size={13} />,
    },
    {
      area: "Physical Endurance",
      tip: "Maintain your excellent physical standards. Add 1 extra interval sprint session per week.",
      icon: <Dumbbell size={13} />,
    },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">My AI Insights</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Powered by AgniAssist ML Service · Performance predictions & analysis
        </p>
      </div>

      {/* Key metric cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            label: "Injury Risk",
            value: injRisk,
            sub: `Probability: ${injRisk === "LOW" ? "12%" : injRisk === "MODERATE" ? "28%" : "47%"}`,
            badge: injRisk,
            color:
              injRisk === "LOW"
                ? "emerald"
                : injRisk === "MODERATE"
                  ? "amber"
                  : "rose",
            border:
              injRisk === "LOW"
                ? "border-l-emerald-500"
                : injRisk === "MODERATE"
                  ? "border-l-amber-500"
                  : "border-l-rose-500",
          },
          {
            label: "Predicted Score (30 Days)",
            value: predicted,
            sub: `Current: ${overall} · Change: +${(predicted - overall).toFixed(1)}`,
            badge: "↑ Improving",
            color: "emerald",
            border: "border-l-[#4a5c2f]",
          },
          {
            label: "Performance Status",
            value:
              overall >= 85
                ? "Excellent"
                : overall >= 75
                  ? "Average"
                  : "At Risk",
            sub: `Rank #${SOLDIER.globalRank} of 18 Agniveers`,
            badge: grade(overall).l,
            color: overall >= 85 ? "emerald" : overall >= 75 ? "amber" : "rose",
            border:
              overall >= 85 ? "border-l-emerald-500" : "border-l-amber-500",
          },
        ].map((c) => (
          <Card
            key={c.label}
            className={`border border-l-4 border-stone-200 ${c.border} bg-white shadow-sm`}
          >
            <CardContent className="space-y-1.5 px-4 pt-4 pb-4">
              <div className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                {c.label}
              </div>
              <div
                className={`text-3xl font-black ${c.color === "emerald" ? "text-emerald-600" : c.color === "amber" ? "text-amber-600" : "text-rose-500"}`}
              >
                {c.value}
              </div>
              <div className="text-xs text-stone-400">{c.sub}</div>
              <Badge
                className={`border text-[10px] ${
                  c.color === "emerald"
                    ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                    : c.color === "amber"
                      ? "border-amber-200 bg-amber-100 text-amber-700"
                      : "border-rose-200 bg-rose-100 text-rose-600"
                }`}
              >
                {c.badge}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recommendations */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Brain size={14} className="text-violet-500" /> AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4">
            {recs.map((r, i) => (
              <div key={i} className="flex gap-2.5">
                <ArrowRight
                  size={13}
                  className="mt-0.5 shrink-0 text-[#4a5c2f]"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
                    {r.icon}
                    {r.area}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-500">{r.tip}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 6-month trend */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Activity size={14} className="text-[#4a5c2f]" /> 6-Month Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 px-4 pb-4">
            {[
              { m: "Oct", v: 81 },
              { m: "Nov", v: 83 },
              { m: "Dec", v: 85 },
              { m: "Jan", v: 86 },
              { m: "Feb", v: 88 },
              { m: "Mar", v: 89 },
            ].map((pt, i, arr) => (
              <div key={pt.m} className="flex items-center gap-3">
                <span className="w-7 text-xs font-medium text-stone-400">
                  {pt.m}
                </span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${i === arr.length - 1 ? "bg-[#c8601a]" : "bg-[#4a5c2f]"}`}
                    style={{ width: `${pt.v}%` }}
                  />
                </div>
                <span
                  className={`w-8 text-right text-sm font-black ${i === arr.length - 1 ? "text-[#c8601a]" : "text-[#4a5c2f]"}`}
                >
                  {pt.v}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Medical risk panel */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
            <HeartPulse size={14} className="text-rose-400" /> Medical Risk
            Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Fatigue Risk", value: "LOW", color: "emerald" },
              {
                label: "Overtraining Risk",
                value: s.physical > 90 ? "MODERATE" : "LOW",
                color: s.physical > 90 ? "amber" : "emerald",
              },
              { label: "Injury Probability", value: "8%", color: "emerald" },
              { label: "Dehydration Risk", value: "LOW", color: "emerald" },
              {
                label: "Mental Health",
                value: s.mental < 70 ? "MONITOR" : "NORMAL",
                color: s.mental < 70 ? "amber" : "emerald",
              },
              { label: "Follow-up Needed", value: "NO", color: "emerald" },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-lg border p-3 ${
                  item.color === "emerald"
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <div
                  className={`text-[10px] font-semibold tracking-wide uppercase ${item.color === "emerald" ? "text-emerald-600" : "text-amber-600"}`}
                >
                  {item.label}
                </div>
                <div
                  className={`mt-1 text-lg font-black ${item.color === "emerald" ? "text-emerald-700" : "text-amber-700"}`}
                >
                  {item.value}
                </div>
                <Badge
                  className={`mt-1 border text-[10px] ${item.color === "emerald" ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-amber-200 bg-amber-100 text-amber-700"}`}
                >
                  {item.color === "emerald" ? "Normal" : "Monitor"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── ROOT PAGE ─────────────────────────────────────────────────────────────────
export default function SoldierPage() {
  const [section, setSection] = useState<Section>("dashboard")

  const sectionTitle: Record<Section, string> = {
    dashboard: "Dashboard",
    training: "Training Records",
    schedule: "Daily Schedule",
    medical: "Medical Records",
    equipment: "Equipment & Arms",
    stipend: "Stipend",
    ai: "AgniAssist AI",
    insights: "My AI Insights",
  }

  return (
    <div className="flex min-h-screen bg-[#f4f3ef] font-sans">
      <Sidebar active={section} setActive={setSection} />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-base font-bold text-stone-900">
                {sectionTitle[section]}
              </h1>
              <p className="text-xs text-stone-400">
                {SOLDIER.battalion} · Agnipath Portal
              </p>
            </div>
            <Badge className="shrink-0 border border-emerald-200 bg-emerald-50 text-xs text-emerald-700">
              Active Duty
            </Badge>
          </div>
          <MobileNav active={section} setActive={setSection} />
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {section === "dashboard" && (
            <DashboardSection setActive={setSection} />
          )}
          {section === "training" && <TrainingSection />}
          {section === "schedule" && <ScheduleSection />}
          {section === "medical" && <MedicalSection />}
          {section === "equipment" && <EquipmentSection />}
          {section === "stipend" && <StipendSection />}
          {section === "ai" && <AgniAssistSection />}
          {section === "insights" && <InsightsSection />}
        </main>
      </div>
    </div>
  )
}
