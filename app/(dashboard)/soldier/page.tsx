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
  ChevronRight,
  Trophy,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Swords,
  Brain,
  Target,
  ShieldCheck,
  Clock,
  Activity,
  LogOut,
  User,
  MapPin,
  Phone,
  Mail,
  Droplets,
  Calendar,
  Hash,
  Users,
  Building,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Eye,
  Ruler,
  Weight,
  Heart,
  Zap,
  Shirt,
  Footprints,
  HardHat,
  Crosshair,
  Scale,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// ── Types ─────────────────────────────────────────────────────────────────────
type Section = "profile" | "training" | "schedule" | "medical" | "equipment"

// ── Agniveer Data ──────────────────────────────────────────────────────────────
const AGNIVEER = {
  name: "Rajveer Singh Chauhan",
  id: "AGN-2024-0101",
  rank: "Sepoy",
  battalion: "1st Rajputana Rifles",
  battalionCode: "RR-1",
  state: "Rajasthan",
  city: "Jodhpur",
  address: "Village Mandore, Post Mandore, Dist. Jodhpur, Rajasthan – 342304",
  dob: "12 April 2003",
  joining: "15 January 2024",
  blood: "B+",
  phone: "9876501001",
  email: "rajveer@army.in",
  status: "active",
  medical: "Fit",
  caste: "Rajput (General)",
  eroName: "Col. Arvind Sharma",
  nextOfKeen: "Shri Balveer Singh Chauhan (Father)",
  nextOfKeenPhone: "9876500001",
  platoon: "Platoon 3",
  company: "Alpha Company",
  agniveerNo: "AGV/RR1/2024/0101",
  events: [
    "Won 200m Sprint — Batch Rally 2024",
    "Best Shooter Award — March 2025",
  ],
}

// ── Navigation ────────────────────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User size={14} /> },
  { id: "training", label: "Training", icon: <Dumbbell size={14} /> },
  { id: "schedule", label: "Schedule", icon: <CalendarDays size={14} /> },
  { id: "medical", label: "Medical", icon: <HeartPulse size={14} /> },
  { id: "equipment", label: "Equipment", icon: <Package size={14} /> },
]

function Sidebar({
  active,
  setActive,
}: {
  active: Section
  setActive: (s: Section) => void
}) {
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col overflow-y-auto border-r border-stone-200 bg-white">
      <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-sm font-bold text-white">
            R
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-stone-800">
              {AGNIVEER.name}
            </div>
            <div className="font-mono text-[10px] text-orange-500">
              {AGNIVEER.agniveerNo}
            </div>
            <div className="text-[10px] text-stone-400">
              {AGNIVEER.rank} · {AGNIVEER.battalionCode}
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
          Agniveer Portal
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

// ── PROFILE ───────────────────────────────────────────────────────────────────
function ProfileSection({ setActive }: { setActive: (s: Section) => void }) {
  const a = AGNIVEER

  const profileFields = [
    {
      label: "Agniveer No.",
      value: a.agniveerNo,
      icon: <Hash size={14} className="text-orange-500" />,
    },
    {
      label: "Full Name",
      value: a.name,
      icon: <User size={14} className="text-[#1a2d4a]" />,
    },
    {
      label: "Date of Birth",
      value: a.dob,
      icon: <Calendar size={14} className="text-[#4a5c2f]" />,
    },
    {
      label: "Date of Joining",
      value: a.joining,
      icon: <Calendar size={14} className="text-[#4a5c2f]" />,
    },
    {
      label: "Address",
      value: a.address,
      icon: <MapPin size={14} className="text-rose-500" />,
    },
    {
      label: "Mobile No.",
      value: a.phone,
      icon: <Phone size={14} className="text-emerald-600" />,
    },
    {
      label: "ERO Name",
      value: a.eroName,
      icon: <UserCheck size={14} className="text-violet-600" />,
    },
    {
      label: "Next of Kin",
      value: `${a.nextOfKeen} · ${a.nextOfKeenPhone}`,
      icon: <Users size={14} className="text-amber-600" />,
    },
    {
      label: "Class / Caste",
      value: a.caste,
      icon: <BookOpen size={14} className="text-sky-600" />,
    },
    {
      label: "Platoon No.",
      value: a.platoon,
      icon: <Hash size={14} className="text-stone-500" />,
    },
    {
      label: "Company",
      value: a.company,
      icon: <Building size={14} className="text-[#1a2d4a]" />,
    },
    {
      label: "Battalion",
      value: a.battalion,
      icon: <Shield size={14} className="text-[#1a2d4a]" />,
    },
    {
      label: "Rank",
      value: a.rank,
      icon: <ShieldCheck size={14} className="text-[#4a5c2f]" />,
    },
    {
      label: "Blood Group",
      value: a.blood,
      icon: <Droplets size={14} className="text-rose-500" />,
    },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Agniveer Profile</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Personal & Service Information · {a.battalion}
        </p>
      </div>

      {/* Profile header card */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <div className="h-2 bg-gradient-to-r from-[#1a2d4a] via-[#4a5c2f] to-[#c8601a]" />
        <CardContent className="px-6 py-5">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-2xl font-black text-white shadow-md">
              {a.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-black text-stone-900">{a.name}</div>
              <div className="font-mono text-sm font-semibold text-[#c8601a]">
                {a.agniveerNo}
              </div>
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge className="border border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700">
                  Active Duty
                </Badge>
                <Badge className="border border-[#c5d9a0] bg-[#eef3e6] text-[10px] text-[#4a5c2f]">
                  {a.rank}
                </Badge>
                <Badge className="border border-sky-200 bg-sky-50 text-[10px] text-sky-700">
                  {a.company}
                </Badge>
                <Badge className="border border-amber-200 bg-amber-50 text-[10px] text-amber-700">
                  {a.platoon}
                </Badge>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[10px] tracking-wide text-stone-400 uppercase">
                Medical Status
              </div>
              <div className="mt-1 font-bold text-emerald-600">{a.medical}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile details */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Service & Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="divide-y divide-stone-50">
            {profileFields.map((field, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-5 py-3 transition-colors hover:bg-stone-50"
              >
                <div className="mt-0.5 shrink-0">{field.icon}</div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-6">
                  <div className="w-40 shrink-0 text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                    {field.label}
                  </div>
                  <div className="text-sm font-medium break-all text-stone-800 sm:break-normal">
                    {field.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Awards */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm font-semibold text-stone-800">
            <Trophy size={14} className="text-amber-500" /> Awards &
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-5 pb-4">
          {a.events.map((ev, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-stone-700"
            >
              <Trophy size={12} className="shrink-0 text-amber-400" />
              {ev}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Training",
            section: "training" as Section,
            icon: <Dumbbell size={14} />,
            color: "text-[#4a5c2f]",
          },
          {
            label: "Schedule",
            section: "schedule" as Section,
            icon: <CalendarDays size={14} />,
            color: "text-sky-600",
          },
          {
            label: "Medical",
            section: "medical" as Section,
            icon: <HeartPulse size={14} />,
            color: "text-rose-500",
          },
          {
            label: "Equipment",
            section: "equipment" as Section,
            icon: <Package size={14} />,
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
  const [activeTab, setActiveTab] = useState<"history" | "plan" | "goals">(
    "history"
  )

  const records = [
    {
      date: "14 Mar 2025",
      type: "Physical",
      details: "5km Run: 23:10 min · Pushups: 52 · Pullups: 14 · Situps: 48",
      instructor: "Sub. Ramesh Kumar",
      status: "Completed",
    },
    {
      date: "12 Mar 2025",
      type: "Weapons",
      details: "INSAS Range: 44/50 · Zeroing: Done · Handling Drill: Passed",
      instructor: "Nb. Sub. Anil Verma",
      status: "Completed",
    },
    {
      date: "10 Mar 2025",
      type: "Combat",
      details:
        "Obstacle Course: 8:42 min · Field Craft: Satisfactory · Section Attack: Passed",
      instructor: "Hav. Dinesh Yadav",
      status: "Completed",
    },
    {
      date: "07 Mar 2025",
      type: "Physical",
      details: "5km Run: 22:45 min · Pushups: 55 · Pullups: 15 · Situps: 50",
      instructor: "Sub. Ramesh Kumar",
      status: "Completed",
    },
    {
      date: "05 Mar 2025",
      type: "Drill",
      details:
        "Parade Ground: Good · Arms Drill: Satisfactory · March Past: Good",
      instructor: "JCO Mahendra Singh",
      status: "Completed",
    },
    {
      date: "02 Mar 2025",
      type: "Weapons",
      details:
        "Long Range 300m: 40/50 · Close Range 100m: 46/50 · Bayonet Drill: Passed",
      instructor: "Nb. Sub. Anil Verma",
      status: "Completed",
    },
  ]

  const weeklyPlan = [
    {
      day: "Monday",
      sessions: [
        "05:00 – Morning PT (Run + Calisthenics)",
        "08:30 – Weapons Training (INSAS)",
        "14:30 – Combat Drills",
      ],
    },
    {
      day: "Tuesday",
      sessions: [
        "05:00 – Morning PT (Obstacle Course)",
        "09:00 – Map Reading & Navigation",
        "15:00 – Bayonet Drill",
      ],
    },
    {
      day: "Wednesday",
      sessions: [
        "05:00 – Swimming / Cross Training",
        "08:30 – Section Attack Drill",
        "14:30 – First Aid Training",
      ],
    },
    {
      day: "Thursday",
      sessions: [
        "05:00 – Morning PT (Strength)",
        "08:30 – Shooting Range",
        "14:30 – Field Craft",
      ],
    },
    {
      day: "Friday",
      sessions: [
        "05:00 – Morning PT + Formation Run",
        "08:30 – Weapons Cleaning & Maintenance",
        "14:30 – Combat Fitness Test",
      ],
    },
    {
      day: "Saturday",
      sessions: [
        "05:00 – Long March (10 km)",
        "10:00 – Platoon-level Drills",
        "14:00 – Inspection",
      ],
    },
    {
      day: "Sunday",
      sessions: [
        "Rest / Optional PT",
        "Church/Temple Parade (0800)",
        "Personal Time",
      ],
    },
  ]

  const goals = [
    {
      goal: "5km Run under 22:00 min",
      current: "23:10 min",
      target: "22:00 min",
      deadline: "Jun 2025",
      onTrack: true,
    },
    {
      goal: "Pushups ≥ 60 reps",
      current: "55 reps",
      target: "60 reps",
      deadline: "May 2025",
      onTrack: true,
    },
    {
      goal: "Shooting Accuracy ≥ 90%",
      current: "88%",
      target: "90%",
      deadline: "Jul 2025",
      onTrack: true,
    },
    {
      goal: "Pullups ≥ 18 reps",
      current: "15 reps",
      target: "18 reps",
      deadline: "Jun 2025",
      onTrack: false,
    },
    {
      goal: "Obstacle Course under 8:00 min",
      current: "8:42 min",
      target: "8:00 min",
      deadline: "Aug 2025",
      onTrack: false,
    },
  ]

  const typeColor: Record<string, string> = {
    Physical: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Weapons: "border-rose-200 bg-rose-50 text-rose-700",
    Combat: "border-[#1a2d4a]/20 bg-[#1a2d4a]/5 text-[#1a2d4a]",
    Drill: "border-amber-200 bg-amber-50 text-amber-700",
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Training Records</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Performance history & weekly plan · 1st Rajputana Rifles
        </p>
      </div>

      {/* Personal bests */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Best 5km Run",
            value: "22:45 min",
            sub: "07 Mar 2025",
            icon: <Activity size={14} className="text-emerald-500" />,
          },
          {
            label: "Max Pushups",
            value: "55 reps",
            sub: "07 Mar 2025",
            icon: <Dumbbell size={14} className="text-[#4a5c2f]" />,
          },
          {
            label: "Best Shooting",
            value: "46 / 50",
            sub: "02 Mar 2025",
            icon: <Target size={14} className="text-rose-500" />,
          },
          {
            label: "Max Pullups",
            value: "15 reps",
            sub: "07 Mar 2025",
            icon: <Zap size={14} className="text-amber-500" />,
          },
        ].map((c) => (
          <Card key={c.label} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="px-4 pt-3 pb-3">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] tracking-wide text-stone-400 uppercase">
                {c.icon} {c.label}
              </div>
              <div className="text-xl font-black text-[#1a2d4a]">{c.value}</div>
              <div className="mt-0.5 text-[10px] text-stone-400">{c.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-stone-200 bg-stone-50 p-1">
        {[
          { key: "history", label: "Training History" },
          { key: "plan", label: "Weekly Plan" },
          { key: "goals", label: "Goals" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-all ${
              activeTab === t.key
                ? "bg-white text-[#1a2d4a] shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* History tab */}
      {activeTab === "history" && (
        <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {["Date", "Type", "Details", "Instructor", "Status"].map(
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
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-stone-400">
                        {r.date}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`border text-xs ${typeColor[r.type] || "border-sky-200 bg-sky-50 text-sky-700"}`}
                        >
                          {r.type}
                        </Badge>
                      </td>
                      <td className="min-w-[200px] px-4 py-3 text-xs text-stone-600">
                        {r.details}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap text-stone-500">
                        {r.instructor}
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
      )}

      {/* Weekly plan tab */}
      {activeTab === "plan" && (
        <div className="space-y-2">
          {weeklyPlan.map((day, i) => (
            <Card
              key={i}
              className={`border-stone-200 bg-white shadow-sm ${i === 4 ? "border-l-4 border-l-[#c8601a]" : ""}`}
            >
              <CardContent className="px-5 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <div
                    className={`w-24 shrink-0 text-xs font-bold tracking-wide uppercase ${i === 4 ? "text-[#c8601a]" : "text-[#1a2d4a]"}`}
                  >
                    {day.day}
                    {i === 4 && (
                      <span className="ml-1 text-[9px] font-normal text-stone-400">
                        (Today)
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {day.sessions.map((s, j) => (
                      <span
                        key={j}
                        className="rounded border border-stone-100 bg-stone-50 px-2 py-1 text-xs text-stone-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Goals tab */}
      {activeTab === "goals" && (
        <div className="space-y-3">
          {goals.map((g, i) => (
            <Card
              key={i}
              className={`border bg-white shadow-sm ${g.onTrack ? "border-emerald-200" : "border-amber-200"}`}
            >
              <CardContent className="px-5 py-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {g.onTrack ? (
                        <CheckCircle2
                          size={13}
                          className="shrink-0 text-emerald-500"
                        />
                      ) : (
                        <AlertTriangle
                          size={13}
                          className="shrink-0 text-amber-500"
                        />
                      )}
                      <span className="text-sm font-semibold text-stone-800">
                        {g.goal}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-stone-500">
                      <span>
                        Current:{" "}
                        <strong className="text-stone-700">{g.current}</strong>
                      </span>
                      <span>
                        Target:{" "}
                        <strong className="text-stone-700">{g.target}</strong>
                      </span>
                      <span>
                        Deadline:{" "}
                        <strong className="text-stone-700">{g.deadline}</strong>
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={`shrink-0 border text-xs ${g.onTrack ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}
                  >
                    {g.onTrack ? "On Track" : "Needs Focus"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// ── SCHEDULE ──────────────────────────────────────────────────────────────────
function ScheduleSection() {
  const [day, setDay] = useState(4)
  const [view, setView] = useState<"daily" | "monthly">("daily")

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const weeklySchedules: Record<
    number,
    Array<{
      time: string
      activity: string
      location: string
      category: string
      done?: boolean
      active?: boolean
    }>
  > = {
    0: [
      {
        time: "05:00",
        activity: "Morning Physical Training",
        location: "Parade Ground",
        category: "PT",
        done: true,
      },
      {
        time: "07:00",
        activity: "Breakfast",
        location: "Mess Hall",
        category: "Meal",
        done: true,
      },
      {
        time: "08:30",
        activity: "Weapons Training (INSAS Drill)",
        location: "Range Area",
        category: "Weapons",
        done: true,
      },
      {
        time: "11:00",
        activity: "Map Reading & Navigation",
        location: "Classroom A",
        category: "Academic",
      },
      {
        time: "13:00",
        activity: "Lunch Break",
        location: "Mess Hall",
        category: "Meal",
      },
      {
        time: "14:30",
        activity: "Section Attack Drill",
        location: "Training Ground",
        category: "Combat",
      },
      {
        time: "16:30",
        activity: "Evening Run (5 km)",
        location: "Track",
        category: "PT",
      },
      {
        time: "19:00",
        activity: "Study Hours",
        location: "Barrack",
        category: "Academic",
      },
      {
        time: "22:00",
        activity: "Lights Out",
        location: "Barrack",
        category: "Rest",
      },
    ],
    1: [
      {
        time: "05:00",
        activity: "Morning PT (Obstacle Course)",
        location: "Obstacle Track",
        category: "PT",
        done: true,
      },
      {
        time: "07:00",
        activity: "Breakfast",
        location: "Mess Hall",
        category: "Meal",
        done: true,
      },
      {
        time: "09:00",
        activity: "Map Reading & Navigation",
        location: "Classroom B",
        category: "Academic",
      },
      {
        time: "11:00",
        activity: "Bayonet Drill",
        location: "Drill Square",
        category: "Combat",
      },
      {
        time: "13:00",
        activity: "Lunch Break",
        location: "Mess Hall",
        category: "Meal",
      },
      {
        time: "14:30",
        activity: "First Aid & Buddy Aid",
        location: "Medical Block",
        category: "Academic",
      },
      { time: "16:30", activity: "Free PT", location: "Gym", category: "PT" },
      {
        time: "19:00",
        activity: "Study Hours",
        location: "Barrack",
        category: "Academic",
      },
      {
        time: "22:00",
        activity: "Lights Out",
        location: "Barrack",
        category: "Rest",
      },
    ],
    4: [
      {
        time: "05:00",
        activity: "Morning Physical Training",
        location: "Parade Ground",
        category: "PT",
        done: true,
      },
      {
        time: "07:00",
        activity: "Breakfast",
        location: "Mess Hall",
        category: "Meal",
        done: true,
      },
      {
        time: "08:30",
        activity: "Weapons Training",
        location: "Range Area",
        category: "Weapons",
        done: true,
      },
      {
        time: "11:00",
        activity: "Combat Drills",
        location: "Obstacle Course",
        category: "Combat",
        active: true,
      },
      {
        time: "13:00",
        activity: "Lunch Break",
        location: "Mess Hall",
        category: "Meal",
      },
      {
        time: "14:30",
        activity: "Mental Resilience Class",
        location: "Classroom Block A",
        category: "Academic",
      },
      {
        time: "16:30",
        activity: "Evening Run (5 km)",
        location: "Track",
        category: "PT",
      },
      {
        time: "19:00",
        activity: "Study Hours",
        location: "Barrack",
        category: "Academic",
      },
      {
        time: "22:00",
        activity: "Lights Out",
        location: "Barrack",
        category: "Rest",
      },
    ],
    5: [
      {
        time: "05:00",
        activity: "Long March (10 km)",
        location: "Training Area",
        category: "PT",
        done: true,
      },
      {
        time: "09:00",
        activity: "Breakfast",
        location: "Mess Hall",
        category: "Meal",
        done: true,
      },
      {
        time: "10:00",
        activity: "Platoon-level Drills",
        location: "Parade Ground",
        category: "Combat",
      },
      {
        time: "13:00",
        activity: "Lunch Break",
        location: "Mess Hall",
        category: "Meal",
      },
      {
        time: "14:30",
        activity: "Kit & Barrack Inspection",
        location: "Barracks",
        category: "Admin",
      },
      {
        time: "16:30",
        activity: "Sports Hour",
        location: "Sports Ground",
        category: "PT",
      },
      {
        time: "19:00",
        activity: "Free Time / Personal Admin",
        location: "Barrack",
        category: "Rest",
      },
      {
        time: "22:00",
        activity: "Lights Out",
        location: "Barrack",
        category: "Rest",
      },
    ],
    6: [
      {
        time: "06:00",
        activity: "Sunday Parade / Church-Temple",
        location: "Parade Ground",
        category: "Admin",
      },
      {
        time: "08:00",
        activity: "Breakfast",
        location: "Mess Hall",
        category: "Meal",
      },
      {
        time: "09:30",
        activity: "Optional PT / Games",
        location: "Sports Ground",
        category: "PT",
      },
      {
        time: "13:00",
        activity: "Lunch",
        location: "Mess Hall",
        category: "Meal",
      },
      {
        time: "14:00",
        activity: "Personal Time / Letter Writing",
        location: "Barrack",
        category: "Rest",
      },
      {
        time: "19:00",
        activity: "Dinner",
        location: "Mess Hall",
        category: "Meal",
      },
      {
        time: "22:00",
        activity: "Lights Out",
        location: "Barrack",
        category: "Rest",
      },
    ],
  }

  const defaultSchedule = [
    {
      time: "05:00",
      activity: "Morning Physical Training",
      location: "Parade Ground",
      category: "PT",
    },
    {
      time: "07:00",
      activity: "Breakfast",
      location: "Mess Hall",
      category: "Meal",
    },
    {
      time: "08:30",
      activity: "Training Session",
      location: "Training Area",
      category: "Combat",
    },
    {
      time: "13:00",
      activity: "Lunch Break",
      location: "Mess Hall",
      category: "Meal",
    },
    {
      time: "16:30",
      activity: "Evening Run",
      location: "Track",
      category: "PT",
    },
    {
      time: "19:00",
      activity: "Study Hours",
      location: "Barrack",
      category: "Academic",
    },
    {
      time: "22:00",
      activity: "Lights Out",
      location: "Barrack",
      category: "Rest",
    },
  ]

  const schedule = weeklySchedules[day] || defaultSchedule

  const catColor: Record<string, string> = {
    PT: "#4a5c2f",
    Weapons: "#c0392b",
    Combat: "#1a2d4a",
    Academic: "#1565c0",
    Meal: "#b8941a",
    Admin: "#6d4c41",
    Rest: "#757575",
  }

  const monthlyHighlights = [
    { date: "01 Mar", event: "Batch Physical Efficiency Test", type: "PT" },
    { date: "05 Mar", event: "Combat Drill Assessment", type: "Combat" },
    { date: "12 Mar", event: "Weapons Range Day (Full Day)", type: "Weapons" },
    { date: "14 Mar", event: "Commanding Officer's Inspection", type: "Admin" },
    { date: "20 Mar", event: "Medical Check-up", type: "Medical" },
    { date: "25 Mar", event: "Cross-Country Run (20 km)", type: "PT" },
    { date: "28 Mar", event: "Night Exercise", type: "Combat" },
    { date: "31 Mar", event: "End-of-Month Review", type: "Admin" },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Daily Schedule</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          March 2025 · {AGNIVEER.battalion}
        </p>
      </div>

      {/* View toggle */}
      <div className="flex w-fit gap-1 rounded-lg border border-stone-200 bg-stone-50 p-1">
        {[
          { key: "daily", label: "Daily View" },
          { key: "monthly", label: "Monthly Events" },
        ].map((v) => (
          <button
            key={v.key}
            onClick={() => setView(v.key as any)}
            className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${view === v.key ? "bg-white text-[#1a2d4a] shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === "daily" && (
        <>
          {/* Day selector */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setDay(i)}
                className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                  i === day
                    ? "border-[#1a2d4a] bg-[#1a2d4a] text-white"
                    : i === 4
                      ? "border-[#c8601a] bg-orange-50 text-[#c8601a]"
                      : "border-stone-200 bg-white text-stone-500 hover:border-stone-300"
                }`}
              >
                {d}
                {i === 4 && (
                  <span className="block text-[9px] font-normal">Today</span>
                )}
              </button>
            ))}
          </div>

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
                    <span className="mt-0.5 w-12 shrink-0 font-mono text-xs font-medium text-stone-400">
                      {item.time}
                    </span>
                    <div className="relative z-10 mt-1 shrink-0">
                      <div
                        className="h-3.5 w-3.5 rounded-full border-2 transition-all"
                        style={{
                          borderColor: catColor[item.category] || "#ccc",
                          background:
                            (item as any).done || (item as any).active
                              ? catColor[item.category] || "#ccc"
                              : "#fff",
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${(item as any).active ? "text-[#c8601a]" : (item as any).done ? "text-stone-400 line-through" : "text-stone-800"}`}
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
                        <Badge className="border border-stone-100 bg-stone-50 text-[10px] text-stone-500">
                          {item.category}
                        </Badge>
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
        </>
      )}

      {view === "monthly" && (
        <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-stone-800">
              March 2025 — Key Events
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {["Date", "Event", "Type"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-stone-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {monthlyHighlights.map((e, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-stone-400">
                        {e.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-stone-700">
                        {e.event}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`border text-xs ${typeColor2[e.type] || "border-stone-200 bg-stone-50 text-stone-600"}`}
                        >
                          {e.type}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const typeColor2: Record<string, string> = {
  PT: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Weapons: "border-rose-200 bg-rose-50 text-rose-700",
  Combat: "border-[#1a2d4a]/20 bg-[#1a2d4a]/5 text-[#1a2d4a]",
  Admin: "border-amber-200 bg-amber-50 text-amber-700",
  Medical: "border-sky-200 bg-sky-50 text-sky-700",
}

// ── MEDICAL ───────────────────────────────────────────────────────────────────
function MedicalSection() {
  const [sickReportOpen, setSickReportOpen] = useState(false)

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

  const lastSickReport = {
    date: "15 Jan 2025",
    reportNo: "SR/RR1/2025/0042",
    doctor: "Dr. Rajan Mehta",
    presenting:
      "Pain and swelling in right ankle after obstacle course training",
    diagnosis: "Grade I ankle sprain (right lateral ligament)",
    treatment:
      "RICE protocol, diclofenac 50mg BD × 5 days, physiotherapy × 3 sessions",
    restDays: "5 days light duty",
    followUp: "22 Jan 2025",
    outcome: "Fully recovered — returned to full duty",
    status: "Closed",
  }

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
          {
            label: "Blood Group",
            value: AGNIVEER.blood,
            icon: <Droplets size={13} className="text-rose-500" />,
          },
          {
            label: "BMI",
            value: "23.4",
            icon: <Weight size={13} className="text-sky-500" />,
          },
          {
            label: "Height",
            value: "174 cm",
            icon: <Ruler size={13} className="text-[#4a5c2f]" />,
          },
          {
            label: "Fitness Status",
            value: "Fit for Duty",
            icon: <Heart size={13} className="text-emerald-500" />,
          },
        ].map((c) => (
          <Card key={c.label} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="px-4 pt-3 pb-3">
              <div className="mb-1 flex items-center gap-1 text-[10px] tracking-wide text-stone-400 uppercase">
                {c.icon} {c.label}
              </div>
              <div className="mt-0.5 text-base font-black text-[#1a2d4a]">
                {c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fit for duty banner */}
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              {
                label: "Blood Pressure",
                value: "118/76 mmHg",
                icon: <Activity size={13} />,
              },
              {
                label: "Heart Rate",
                value: "68 bpm",
                icon: <Heart size={13} />,
              },
              { label: "Weight", value: "68 kg", icon: <Weight size={13} /> },
              { label: "Height", value: "174 cm", icon: <Ruler size={13} /> },
              {
                label: "Vision — Right Eye",
                value: "6/6",
                icon: <Eye size={13} />,
              },
              {
                label: "Vision — Left Eye",
                value: "6/6",
                icon: <Eye size={13} />,
              },
              {
                label: "Colour Vision",
                value: "Normal",
                icon: <Eye size={13} />,
              },
              {
                label: "Hearing",
                value: "Normal (Both)",
                icon: <Activity size={13} />,
              },
              {
                label: "Chest (Normal)",
                value: "82 cm",
                icon: <Ruler size={13} />,
              },
              {
                label: "Chest (Expanded)",
                value: "87 cm",
                icon: <Ruler size={13} />,
              },
              {
                label: "Blood Group",
                value: AGNIVEER.blood,
                icon: <Droplets size={13} />,
              },
              {
                label: "Dental",
                value: "Healthy",
                icon: <ShieldCheck size={13} />,
              },
            ].map((v) => (
              <div
                key={v.label}
                className="rounded-lg border border-stone-100 bg-stone-50 p-3"
              >
                <div className="mb-1 flex items-center gap-1 text-[10px] tracking-wide text-stone-400 uppercase">
                  <span className="text-stone-400">{v.icon}</span> {v.label}
                </div>
                <div className="text-sm font-bold text-stone-800">
                  {v.value}
                </div>
                <Badge className="mt-1 border border-emerald-200 bg-emerald-100 text-[10px] text-emerald-700">
                  Normal
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Last Sick Report — collapsible */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <button
          className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-stone-50"
          onClick={() => setSickReportOpen(!sickReportOpen)}
        >
          <div className="flex items-center gap-2">
            <HeartPulse size={15} className="text-rose-500" />
            <span className="text-sm font-semibold text-stone-800">
              Last Sick Report
            </span>
            <Badge className="border border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700">
              Closed
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>{lastSickReport.date}</span>
            {sickReportOpen ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </div>
        </button>
        {sickReportOpen && (
          <div className="border-t border-stone-100 bg-stone-50 px-5 pt-4 pb-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: "Report No.", value: lastSickReport.reportNo },
                { label: "Date", value: lastSickReport.date },
                { label: "Attending Doctor", value: lastSickReport.doctor },
                { label: "Follow-up Date", value: lastSickReport.followUp },
                {
                  label: "Presenting Complaint",
                  value: lastSickReport.presenting,
                },
                { label: "Diagnosis", value: lastSickReport.diagnosis },
                { label: "Treatment Given", value: lastSickReport.treatment },
                { label: "Rest / Light Duty", value: lastSickReport.restDays },
                { label: "Outcome", value: lastSickReport.outcome },
                { label: "Status", value: lastSickReport.status },
              ].map((f, i) => (
                <div
                  key={i}
                  className="rounded border border-stone-100 bg-white p-3"
                >
                  <div className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                    {f.label}
                  </div>
                  <div className="mt-0.5 text-sm text-stone-700">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
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
  const equipment = [
    {
      name: "INSAS Rifle",
      type: "Weapon",
      serial: "WPN/INSAS/2024/0312",
      issued: "15 Jan 2024",
      condition: "Good",
      remarks: "Maintained and zeroed. Last cleaned 12 Mar 2025.",
    },
    {
      name: "Ballistic Helmet (MK II)",
      type: "Protective Gear",
      serial: "EQP/HLM/2024/0712",
      issued: "15 Jan 2024",
      condition: "Good",
      remarks: "No visible damage. Chin strap intact.",
    },
    {
      name: "Wooden Rifle (Drill)",
      type: "Drill Equipment",
      serial: "DRILL/WR/2024/0101",
      issued: "15 Jan 2024",
      condition: "Good",
      remarks: "Used for parade and drill practice only.",
    },
    {
      name: "Combat Uniform (Set of 3)",
      type: "Uniform",
      serial: "UNF/CMB/2024/0101",
      issued: "15 Jan 2024",
      condition: "Worn",
      remarks: "One set showing wear at elbows. Replacement requested.",
    },
    {
      name: "Combat Shoes (DMS Boots)",
      type: "Footwear",
      serial: "FTW/DMS/2024/0202",
      issued: "15 Jan 2024",
      condition: "Worn",
      remarks: "Sole wear observed. Due for replacement.",
    },
    {
      name: "Be Scale (Basic Equipment Scale)",
      type: "Field Kit",
      serial: "BESC/RR1/2024/0101",
      issued: "15 Jan 2024",
      condition: "Good",
      remarks:
        "Complete kit: water bottle, mess tin, haversack, bayonet, entrenching tool, ammo pouches, cape groundsheet.",
    },
  ]

  const conditionStyle: Record<string, string> = {
    Good: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Worn: "border-amber-200 bg-amber-50 text-amber-700",
    Damaged: "border-rose-200 bg-rose-50 text-rose-700",
  }

  const typeIcon: Record<string, React.ReactNode> = {
    Weapon: <Crosshair size={14} className="text-rose-500" />,
    "Protective Gear": <HardHat size={14} className="text-[#1a2d4a]" />,
    "Drill Equipment": <Crosshair size={14} className="text-stone-500" />,
    Uniform: <Shirt size={14} className="text-[#4a5c2f]" />,
    Footwear: <Footprints size={14} className="text-amber-600" />,
    "Field Kit": <Package size={14} className="text-sky-600" />,
  }

  const good = equipment.filter((e) => e.condition === "Good").length
  const worn = equipment.filter((e) => e.condition === "Worn").length

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Equipment & Arms</h1>
        <p className="mt-0.5 text-xs text-stone-400">
          Issued weapons, uniform, and field kit
        </p>
      </div>

      {/* Warning banner */}
      <div className="flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
        <Shield size={14} className="mt-0.5 shrink-0" />
        <span>
          All equipment is under your personal responsibility. Report any loss
          or damage to the Quartermaster immediately. Unauthorized transfer of
          equipment is a punishable offence.
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Items",
            value: equipment.length,
            color: "text-stone-700",
            border: "border-t-stone-400",
          },
          {
            label: "Good Condition",
            value: good,
            color: "text-emerald-600",
            border: "border-t-emerald-500",
          },
          {
            label: "Needs Attention",
            value: worn,
            color: "text-amber-600",
            border: "border-t-amber-500",
          },
        ].map((s) => (
          <Card
            key={s.label}
            className={`border border-t-4 border-stone-200 ${s.border} bg-white shadow-sm`}
          >
            <CardContent className="px-4 pt-3 pb-3 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="mt-0.5 text-[10px] text-stone-400">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Equipment cards */}
      <div className="space-y-3">
        {equipment.map((eq, i) => (
          <Card
            key={i}
            className={`border bg-white shadow-sm ${eq.condition === "Worn" ? "border-amber-200" : "border-stone-200"}`}
          >
            <CardContent className="px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone-100 bg-stone-50">
                  {typeIcon[eq.type] || (
                    <Package size={14} className="text-stone-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">
                      {eq.name}
                    </span>
                    <Badge
                      className={`border text-[10px] ${conditionStyle[eq.condition]}`}
                    >
                      {eq.condition}
                    </Badge>
                    <Badge className="border border-stone-100 bg-stone-50 text-[10px] text-stone-500">
                      {eq.type}
                    </Badge>
                  </div>
                  <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-0.5 text-xs text-stone-400 sm:grid-cols-3">
                    <span>
                      Serial:{" "}
                      <span className="font-mono text-stone-600">
                        {eq.serial}
                      </span>
                    </span>
                    <span>
                      Issued:{" "}
                      <span className="text-stone-600">{eq.issued}</span>
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs text-stone-500 italic">
                    {eq.remarks}
                  </div>
                </div>
                <div className="shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 border-stone-200 px-3 text-[10px] text-stone-500"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Be Scale note */}
      <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-3">
        <div className="mb-1 text-xs font-semibold text-sky-800">
          📋 Note on Be Scale (Basic Equipment Scale)
        </div>
        <div className="text-xs text-sky-700">
          The Be Scale (Basic Equipment Scale) refers to the complete set of
          personal field equipment issued to every Agniveer. It includes: water
          bottle, mess tin, large pack haversack, bayonet with scabbard,
          entrenching tool, ammunition pouches, cape groundsheet, and other
          field essentials as prescribed by the battalion quartermaster.
        </div>
      </div>
    </div>
  )
}

// ── ROOT PAGE ─────────────────────────────────────────────────────────────────
export default function AgniveerPage() {
  const [section, setSection] = useState<Section>("profile")

  const sectionTitle: Record<Section, string> = {
    profile: "Agniveer Profile",
    training: "Training Records",
    schedule: "Daily Schedule",
    medical: "Medical Records",
    equipment: "Equipment & Arms",
  }

  return (
    <div className="flex min-h-screen bg-[#f4f3ef] font-sans">
      {/* Sidebar — fixed, never scrolls */}
      <aside className="hidden md:flex">
        <div className="fixed top-0 left-0 z-20 h-screen w-56">
          <Sidebar active={section} setActive={setSection} />
        </div>
      </aside>

      {/* Main content — offset by sidebar width */}
      <div className="flex min-w-0 flex-1 flex-col md:ml-56">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-base font-bold text-stone-900">
                {sectionTitle[section]}
              </h1>
              <p className="text-xs text-stone-400">
                {AGNIVEER.battalion} · Agnipath Portal
              </p>
            </div>
            <Badge className="shrink-0 border border-emerald-200 bg-emerald-50 text-xs text-emerald-700">
              Active Duty
            </Badge>
          </div>
          <MobileNav active={section} setActive={setSection} />
        </header>

        {/* Content — full width, no artificial max-width centering gap */}
        <main className="w-full flex-1 px-4 py-5 sm:px-6">
          {section === "profile" && <ProfileSection setActive={setSection} />}
          {section === "training" && <TrainingSection />}
          {section === "schedule" && <ScheduleSection />}
          {section === "medical" && <MedicalSection />}
          {section === "equipment" && <EquipmentSection />}
        </main>
      </div>
    </div>
  )
}
