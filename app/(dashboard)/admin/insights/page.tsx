"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  ShieldAlert,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Dumbbell,
  Target,
  Heart,
  Zap,
  ArrowRight,
  BarChart3,
  Users,
  Flame,
  Droplets,
  SmilePlus,
  CalendarDays,
  Code2,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "soldier" | "battalion" | "schedule" | "medical"

// ── Data ──────────────────────────────────────────────────────────────────────
const SOLDIERS = [
  { id: "AGN-2024-0101", name: "Rajveer Singh Chauhan" },
  { id: "AGN-2024-0102", name: "Arjun Mehra" },
  { id: "AGN-2024-0103", name: "Vikram Nair" },
  { id: "AGN-2024-0104", name: "Santosh More" },
]

const BATTALIONS = [
  "1st Rajputana Rifles",
  "1st Parachute Regiment",
  "2nd Bengal Regiment",
  "4th Maratha Light Infantry",
]

const TREND_DATA = [
  { month: "Oct", score: 81 },
  { month: "Nov", score: 83 },
  { month: "Dec", score: 85 },
  { month: "Jan", score: 86 },
  { month: "Feb", score: 88 },
  { month: "Mar", score: 89 },
]

const SCHEDULE = [
  {
    day: "Monday",
    focus: "Cardio & Endurance",
    items: [
      {
        time: "05:00",
        activity: "5km Run (Timed)",
        duration: "40 min",
        intensity: "HIGH",
      },
      {
        time: "08:00",
        activity: "Endurance Circuit",
        duration: "45 min",
        intensity: "HIGH",
      },
      {
        time: "16:30",
        activity: "Evening PT",
        duration: "30 min",
        intensity: "MEDIUM",
      },
    ],
  },
  {
    day: "Tuesday",
    focus: "Weapons Training",
    items: [
      {
        time: "08:30",
        activity: "INSAS Rifle Practice",
        duration: "2 hrs",
        intensity: "MEDIUM",
      },
      {
        time: "11:00",
        activity: "Marksmanship Drills",
        duration: "1.5 hrs",
        intensity: "MEDIUM",
      },
      {
        time: "16:00",
        activity: "Weapon Handling",
        duration: "1 hr",
        intensity: "LOW",
      },
    ],
  },
  {
    day: "Wednesday",
    focus: "Strength & Combat",
    items: [
      {
        time: "06:00",
        activity: "Weight Training",
        duration: "1 hr",
        intensity: "HIGH",
      },
      {
        time: "10:00",
        activity: "Combat Drills",
        duration: "2 hrs",
        intensity: "HIGH",
      },
      {
        time: "15:00",
        activity: "Obstacle Course",
        duration: "1 hr",
        intensity: "MEDIUM",
      },
    ],
  },
  {
    day: "Thursday",
    focus: "Tactical Operations",
    items: [
      {
        time: "07:00",
        activity: "Map Reading & Navigation",
        duration: "2 hrs",
        intensity: "LOW",
      },
      {
        time: "10:00",
        activity: "Field Tactics",
        duration: "3 hrs",
        intensity: "MEDIUM",
      },
      {
        time: "16:00",
        activity: "Night Patrol Prep",
        duration: "1 hr",
        intensity: "LOW",
      },
    ],
  },
]

const MEDICAL_RISKS = [
  {
    label: "Fatigue Risk",
    value: "LOW",
    status: "Normal",
    color: "emerald",
    icon: <Flame size={16} />,
  },
  {
    label: "Overtraining Risk",
    value: "MODERATE",
    status: "Monitor",
    color: "amber",
    icon: <Activity size={16} />,
  },
  {
    label: "Injury Probability",
    value: "8%",
    status: "Normal",
    color: "emerald",
    icon: <ShieldAlert size={16} />,
  },
  {
    label: "Dehydration Risk",
    value: "LOW",
    status: "Normal",
    color: "emerald",
    icon: <Droplets size={16} />,
  },
  {
    label: "Mental Health Flag",
    value: "NORMAL",
    status: "Normal",
    color: "emerald",
    icon: <SmilePlus size={16} />,
  },
  {
    label: "Follow-up Needed",
    value: "NO",
    status: "Normal",
    color: "emerald",
    icon: <CheckCircle2 size={16} />,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function intensityColor(i: string) {
  if (i === "HIGH") return "text-rose-500 bg-rose-50 border-rose-200"
  if (i === "MEDIUM") return "text-amber-600 bg-amber-50 border-amber-200"
  return "text-sky-600 bg-sky-50 border-sky-200"
}

function riskAccent(color: string) {
  if (color === "amber")
    return {
      border: "border-l-amber-500",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
    }
  return {
    border: "border-l-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  }
}

const MAX_SCORE = 100

// ── Tab: Soldier Insights ─────────────────────────────────────────────────────
function SoldierInsights() {
  const [soldier, setSoldier] = useState(SOLDIERS[0].id)
  const sel = SOLDIERS.find((s) => s.id === soldier)!

  return (
    <div className="space-y-5">
      {/* Select */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-700">
            Select Soldier
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <Select value={soldier} onValueChange={setSoldier}>
            <SelectTrigger className="w-80 border-stone-200 bg-stone-50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOLDIERS.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} — {s.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Injury Risk */}
        <Card className="border-l-4 border-stone-200 border-l-emerald-500 bg-white shadow-sm">
          <CardContent className="space-y-2 px-5 pt-5 pb-5">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              Injury Risk
            </p>
            <p className="text-4xl font-black text-stone-800">LOW</p>
            <p className="text-xs text-stone-400">Probability: 12%</p>
            <Badge className="border border-emerald-200 bg-emerald-100 text-xs text-emerald-700 hover:bg-emerald-100">
              LOW
            </Badge>
          </CardContent>
        </Card>

        {/* Predicted Score */}
        <Card className="border-l-4 border-stone-200 border-l-[#4a5c2f] bg-white shadow-sm">
          <CardContent className="space-y-2 px-5 pt-5 pb-5">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              Predicted Score (30 Days)
            </p>
            <p className="text-4xl font-black text-stone-800">91</p>
            <p className="text-xs text-stone-400">Current: 89 · Change: +2.0</p>
            <Badge className="gap-1 border border-emerald-200 bg-emerald-100 text-xs text-emerald-700 hover:bg-emerald-100">
              <TrendingUp size={11} /> Improving
            </Badge>
          </CardContent>
        </Card>

        {/* Performance Status */}
        <Card className="border-l-4 border-stone-200 border-l-sky-500 bg-white shadow-sm">
          <CardContent className="space-y-2 px-5 pt-5 pb-5">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              Performance Status
            </p>
            <p className="text-4xl font-black text-emerald-600">Excellent</p>
            <p className="text-xs text-stone-400">Rank #4 of 18</p>
            <Badge className="border border-sky-200 bg-sky-100 text-xs text-sky-700 hover:bg-sky-100">
              Good
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* AI Recommendations */}
        <Card className="border-stone-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Brain size={15} className="text-violet-500" />
              AI Recommendations for {sel.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-5 pb-5">
            {[
              {
                area: "Mental Resilience",
                tip: "Continue resilience workshops. Group problem-solving.",
              },
              {
                area: "Physical Endurance",
                tip: "Add 1 extra cardio session per week for sustained gains.",
              },
              {
                area: "Weapons Accuracy",
                tip: "Schedule 2 additional range sessions this month.",
              },
            ].map((r, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <ArrowRight
                  size={14}
                  className="mt-0.5 shrink-0 text-[#4a5c2f]"
                />
                <span>
                  <strong className="text-stone-700">{r.area}</strong>
                  <span className="text-stone-500"> : {r.tip}</span>
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 6-Month Trend */}
        <Card className="border-stone-200 bg-white shadow-sm lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <BarChart3 size={15} className="text-[#4a5c2f]" />
              6-Month Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-5 pb-5">
            {TREND_DATA.map((d, i) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="w-7 text-xs font-medium text-stone-400">
                  {d.month}
                </span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className={`h-full rounded-full transition-all ${i === TREND_DATA.length - 1 ? "bg-amber-600" : "bg-[#4a5c2f]"}`}
                    style={{ width: `${(d.score / MAX_SCORE) * 100}%` }}
                  />
                </div>
                <span
                  className={`w-8 text-right text-sm font-bold ${i === TREND_DATA.length - 1 ? "text-amber-600" : "text-[#4a5c2f]"}`}
                >
                  {d.score}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ── Tab: Battalion Insights ───────────────────────────────────────────────────
function BattalionInsights() {
  const [battalion, setBattalion] = useState(BATTALIONS[0])

  return (
    <div className="space-y-5">
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-700">
            Select Battalion
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <Select value={battalion} onValueChange={setBattalion}>
            <SelectTrigger className="w-80 border-stone-200 bg-stone-50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BATTALIONS.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-stone-200 border-l-emerald-500 bg-white shadow-sm">
          <CardContent className="space-y-2 px-5 pt-5 pb-5">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              Average Performance
            </p>
            <p className="text-4xl font-black text-stone-800">84.7</p>
            <p className="text-xs text-stone-400">6 soldiers · 3 outstanding</p>
            <Badge className="border border-emerald-200 bg-emerald-100 text-xs text-emerald-700 hover:bg-emerald-100">
              Good
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-stone-200 border-l-amber-500 bg-white shadow-sm">
          <CardContent className="space-y-2 px-5 pt-5 pb-5">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              High Injury Risk Soldiers
            </p>
            <p className="text-4xl font-black text-stone-800">1</p>
            <p className="text-xs text-stone-400">Physical score below 75</p>
            <Badge className="border border-amber-200 bg-amber-100 text-xs text-amber-700 hover:bg-amber-100">
              Action Needed
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-stone-200 border-l-amber-500 bg-white shadow-sm">
          <CardContent className="space-y-2 px-5 pt-5 pb-5">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              Declining Performance
            </p>
            <p className="text-4xl font-black text-stone-800">1</p>
            <p className="text-xs text-stone-400">Overall score below 75</p>
            <Badge className="border border-amber-200 bg-amber-100 text-xs text-amber-700 hover:bg-amber-100">
              Monitor
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
            <Brain size={15} className="text-violet-500" />
            Battalion AI Recommendations — {battalion}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-5 pb-5">
          {[
            "Organise additional fitness training for 1 soldier with scores below 75. Assign senior Naik as buddy trainer.",
            "Medical review recommended for 1 soldier with high injury risk. Schedule checkup with Medical Officer.",
            "Monthly peer mentorship sessions — pair top-performing soldiers (Score ≥ 90) with those in the 70–80 range.",
            "Weapons accuracy average is 82. Schedule 2 additional range sessions this month.",
            "Attendance rate is 93%. Any soldier below 85% should be counselled.",
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3 text-sm"
            >
              <ArrowRight
                size={14}
                className="mt-0.5 shrink-0 text-[#4a5c2f]"
              />
              <span className="text-stone-600">{r}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tab: AI-Optimised Schedule ────────────────────────────────────────────────
function AiSchedule() {
  const [soldier, setSoldier] = useState(SOLDIERS[0].name)

  return (
    <div className="space-y-5">
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-700">
            Select Soldier for AI-Optimised Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <Select value={soldier} onValueChange={setSoldier}>
            <SelectTrigger className="w-80 border-stone-200 bg-stone-50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOLDIERS.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-lg border border-l-4 border-sky-100 border-l-sky-400 bg-sky-50 px-4 py-3">
        <Code2 size={14} className="mt-0.5 shrink-0 text-sky-500" />
        <p className="text-sm text-sky-700">
          AI-generated weekly schedule for <strong>{soldier}</strong> based on
          current scores and identified weaknesses. Endpoint:{" "}
          <code className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-xs">
            /api/ml/training/optimize
          </code>
        </p>
      </div>

      {/* Schedule Days */}
      <div className="space-y-3">
        {SCHEDULE.map((day) => (
          <Card
            key={day.day}
            className="overflow-hidden border-stone-200 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-[#4a5c2f]" />
                <span className="text-sm font-bold text-stone-800">
                  {day.day}
                </span>
              </div>
              <span className="text-xs text-stone-400">Focus: {day.focus}</span>
            </div>
            <div className="divide-y divide-stone-50">
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-stone-50"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-12 shrink-0 font-mono text-xs text-stone-400">
                      {item.time}
                    </span>
                    <span className="text-sm font-medium text-stone-700">
                      {item.activity}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400">
                      {item.duration}
                    </span>
                    <Badge
                      variant="outline"
                      className={`border text-xs font-semibold ${intensityColor(item.intensity)}`}
                    >
                      {item.intensity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── Tab: Medical Risk Analysis ────────────────────────────────────────────────
function MedicalRisk() {
  const [soldier, setSoldier] = useState(SOLDIERS[0].name)

  return (
    <div className="space-y-5">
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-700">
            Select Soldier for Medical Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <Select value={soldier} onValueChange={setSoldier}>
            <SelectTrigger className="w-80 border-stone-200 bg-stone-50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOLDIERS.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-lg border border-l-4 border-sky-100 border-l-sky-400 bg-sky-50 px-4 py-3">
        <Code2 size={14} className="mt-0.5 shrink-0 text-sky-500" />
        <p className="text-sm text-sky-700">
          Medical risk analysis for <strong>{soldier}</strong> · Endpoint:{" "}
          <code className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-xs">
            /api/ml/medical/analyze
          </code>
        </p>
      </div>

      {/* Risk Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEDICAL_RISKS.map((risk) => {
          const accent = riskAccent(risk.color)
          return (
            <Card
              key={risk.label}
              className={`border-l-4 border-stone-200 bg-white shadow-sm ${accent.border}`}
            >
              <CardContent className="space-y-2 px-5 pt-5 pb-5">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      risk.color === "amber"
                        ? "text-amber-500"
                        : "text-emerald-500"
                    }
                  >
                    {risk.icon}
                  </span>
                  <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
                    {risk.label}
                  </p>
                </div>
                <p className="text-3xl font-black text-stone-800">
                  {risk.value}
                </p>
                <Badge
                  className={`border text-xs hover:opacity-100 ${accent.badge}`}
                >
                  {risk.status}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary note */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="px-5 py-4">
          <div className="flex items-start gap-3">
            <Heart size={16} className="mt-0.5 shrink-0 text-rose-400" />
            <p className="text-sm text-stone-600">
              <strong className="text-stone-800">Overall Assessment:</strong>{" "}
              {soldier} is in good medical standing. Overtraining risk is
              moderate — consider a recovery day mid-week. No immediate
              follow-up required. Next scheduled medical review:{" "}
              <span className="font-medium text-stone-700">15 Apr 2025</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Root Page ─────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "soldier", label: "Soldier Insights", icon: <Users size={14} /> },
  { id: "battalion", label: "Battalion Insights", icon: <Shield size={14} /> },
  {
    id: "schedule",
    label: "AI-Optimised Schedule",
    icon: <CalendarDays size={14} />,
  },
  { id: "medical", label: "Medical Risk Analysis", icon: <Heart size={14} /> },
]

function Shield({ size }: { size: number }) {
  return <ShieldAlert size={size} />
}

export default function MLInsightsPage() {
  const [tab, setTab] = useState<Tab>("soldier")

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 pt-4 pb-0">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-stone-900">
                <Brain size={22} className="text-violet-500" />
                ML Insights Engine
              </h1>
              <p className="mt-0.5 mb-3 text-sm text-stone-500">
                Powered by AgniAssist ML Service · Performance predictions,
                injury risk & trend analysis
              </p>
            </div>
            <Badge className="mt-1 shrink-0 gap-1 border border-violet-200 bg-violet-50 text-xs text-violet-600 hover:bg-violet-50">
              <Zap size={10} />
              ML Active
            </Badge>
          </div>

          {/* Tab Bar */}
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? "border-[#4a5c2f] text-[#4a5c2f]"
                    : "border-transparent text-stone-400 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        {tab === "soldier" && <SoldierInsights />}
        {tab === "battalion" && <BattalionInsights />}
        {tab === "schedule" && <AiSchedule />}
        {tab === "medical" && <MedicalRisk />}
      </div>
    </div>
  )
}
