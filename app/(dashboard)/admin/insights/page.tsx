"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Brain, TrendingUp, ShieldAlert, Activity, AlertTriangle,
  CheckCircle2, Dumbbell, Target, Heart, Zap, ArrowRight,
  BarChart3, Users, Flame, Droplets, SmilePlus, CalendarDays,
  Code2, ChevronLeft, X, Trophy, Shield, Swords, ShieldCheck,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "soldier" | "battalion" | "schedule" | "medical"

// ── Full Data ─────────────────────────────────────────────────────────────────
const ALL_SOLDIERS = [
  { id: "AGN-2024-0101", name: "Rajveer Singh Chauhan", battalion: "RR-1", batName: "1st Rajputana Rifles", physical: 91, weapons: 88, mental: 78, combat: 89, attendance: 96, discipline: 92, overall: 89 },
  { id: "AGN-2024-0102", name: "Priya Sharma", battalion: "RR-1", batName: "1st Rajputana Rifles", physical: 85, weapons: 72, mental: 94, combat: 80, attendance: 98, discipline: 95, overall: 87.3 },
  { id: "AGN-2024-0103", name: "Arjun Mehra", battalion: "RR-1", batName: "1st Rajputana Rifles", physical: 96, weapons: 94, mental: 88, combat: 95, attendance: 100, discipline: 97, overall: 95 },
  { id: "AGN-2024-0104", name: "Sunil Kumar", battalion: "RR-1", batName: "1st Rajputana Rifles", physical: 68, weapons: 72, mental: 65, combat: 70, attendance: 82, discipline: 75, overall: 72 },
  { id: "AGN-2024-0105", name: "Kavita Rajput", battalion: "RR-1", batName: "1st Rajputana Rifles", physical: 78, weapons: 74, mental: 82, combat: 76, attendance: 88, discipline: 85, overall: 80.5 },
  { id: "AGN-2024-0106", name: "Mahesh Choudhary", battalion: "RR-1", batName: "1st Rajputana Rifles", physical: 82, weapons: 91, mental: 70, combat: 84, attendance: 91, discipline: 88, overall: 84.3 },
  { id: "AGN-2024-0201", name: "Vikram Nair", battalion: "PARA-2", batName: "2nd Parachute Regiment", physical: 94, weapons: 88, mental: 86, combat: 93, attendance: 97, discipline: 94, overall: 92 },
  { id: "AGN-2024-0202", name: "Ananya Krishnan", battalion: "PARA-2", batName: "2nd Parachute Regiment", physical: 80, weapons: 75, mental: 91, combat: 78, attendance: 95, discipline: 96, overall: 85.8 },
  { id: "AGN-2024-0203", name: "Rohit Sharma", battalion: "PARA-2", batName: "2nd Parachute Regiment", physical: 75, weapons: 69, mental: 72, combat: 71, attendance: 79, discipline: 74, overall: 73.3 },
  { id: "AGN-2024-0204", name: "Deepak Yadav", battalion: "PARA-2", batName: "2nd Parachute Regiment", physical: 88, weapons: 82, mental: 79, combat: 86, attendance: 93, discipline: 90, overall: 86.3 },
  { id: "AGN-2024-0301", name: "Sourav Das", battalion: "BEN-3", batName: "3rd Bengal Regiment", physical: 86, weapons: 80, mental: 83, combat: 85, attendance: 94, discipline: 88, overall: 86 },
  { id: "AGN-2024-0302", name: "Rekha Bose", battalion: "BEN-3", batName: "3rd Bengal Regiment", physical: 79, weapons: 71, mental: 90, combat: 75, attendance: 96, discipline: 94, overall: 84.2 },
  { id: "AGN-2024-0303", name: "Amit Ghosh", battalion: "BEN-3", batName: "3rd Bengal Regiment", physical: 72, weapons: 65, mental: 68, combat: 69, attendance: 80, discipline: 72, overall: 71 },
  { id: "AGN-2024-0304", name: "Ranjit Singh", battalion: "BEN-3", batName: "3rd Bengal Regiment", physical: 90, weapons: 92, mental: 84, combat: 91, attendance: 98, discipline: 95, overall: 91.7 },
  { id: "AGN-2024-0401", name: "Suresh Patil", battalion: "MAR-4", batName: "4th Maratha Light Infantry", physical: 83, weapons: 79, mental: 76, combat: 81, attendance: 89, discipline: 86, overall: 82.3 },
  { id: "AGN-2024-0402", name: "Rohini Jadhav", battalion: "MAR-4", batName: "4th Maratha Light Infantry", physical: 76, weapons: 68, mental: 86, combat: 72, attendance: 91, discipline: 90, overall: 79.5 },
  { id: "AGN-2024-0403", name: "Santosh More", battalion: "MAR-4", batName: "4th Maratha Light Infantry", physical: 70, weapons: 66, mental: 62, combat: 68, attendance: 78, discipline: 70, overall: 69 },
  { id: "AGN-2024-0404", name: "Vijay Deshmukh", battalion: "MAR-4", batName: "4th Maratha Light Infantry", physical: 88, weapons: 85, mental: 82, combat: 87, attendance: 95, discipline: 92, overall: 88.2 },
]

const ALL_BATTALIONS = [
  { id: "RR-1", name: "1st Rajputana Rifles", commander: "Col. R.K. Verma", location: "Jaipur, Rajasthan" },
  { id: "PARA-2", name: "2nd Parachute Regiment", commander: "Col. S.P. Mehta", location: "Agra, Uttar Pradesh" },
  { id: "BEN-3", name: "3rd Bengal Regiment", commander: "Col. D.K. Roy", location: "Kolkata, West Bengal" },
  { id: "MAR-4", name: "4th Maratha Light Infantry", commander: "Col. V.B. Patil", location: "Pune, Maharashtra" },
]

// ── Monthly Trend Data (per soldier, 6 months) ────────────────────────────────
// Each soldier gets scores that lead up to their current March value
// We simulate a realistic improvement trajectory
function buildMonthlyData() {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  return ALL_SOLDIERS.map(s => {
    // Generate a realistic 6-month progression ending at current overall
    const base = Math.max(60, s.overall - 8)
    const step = (s.overall - base) / 5
    return {
      ...s,
      monthly: months.map((m, i) => {
        const raw = Math.round((base + step * i) * 10) / 10
        // per-category slight variance per month
        const delta = (i - 2.5) * 0.6
        return {
          month: m,
          overall: Math.min(100, Math.round((raw) * 10) / 10),
          physical: Math.min(100, Math.round((s.physical + delta - (5 - i) * 0.8) * 10) / 10),
          weapons: Math.min(100, Math.round((s.weapons + delta - (5 - i) * 0.7) * 10) / 10),
          mental: Math.min(100, Math.round((s.mental + delta - (5 - i) * 0.6) * 10) / 10),
          combat: Math.min(100, Math.round((s.combat + delta - (5 - i) * 0.8) * 10) / 10),
          attendance: Math.min(100, Math.round((s.attendance + delta - (5 - i) * 0.4) * 10) / 10),
          discipline: Math.min(100, Math.round((s.discipline + delta - (5 - i) * 0.3) * 10) / 10),
        }
      }),
    }
  })
}

const MONTHLY_DATA = buildMonthlyData()

const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

// Global trend (avg of all soldiers)
const GLOBAL_TREND = MONTHS.map(m => {
  const scores = MONTHLY_DATA.map(s => s.monthly.find(mo => mo.month === m)!.overall)
  return { month: m, score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10 }
})

const SCHEDULE = [
  { day: "Monday", focus: "Cardio & Endurance", items: [{ time: "05:00", activity: "5km Run (Timed)", duration: "40 min", intensity: "HIGH" }, { time: "08:00", activity: "Endurance Circuit", duration: "45 min", intensity: "HIGH" }, { time: "16:30", activity: "Evening PT", duration: "30 min", intensity: "MEDIUM" }] },
  { day: "Tuesday", focus: "Weapons Training", items: [{ time: "08:30", activity: "INSAS Rifle Practice", duration: "2 hrs", intensity: "MEDIUM" }, { time: "11:00", activity: "Marksmanship Drills", duration: "1.5 hrs", intensity: "MEDIUM" }, { time: "16:00", activity: "Weapon Handling", duration: "1 hr", intensity: "LOW" }] },
  { day: "Wednesday", focus: "Strength & Combat", items: [{ time: "06:00", activity: "Weight Training", duration: "1 hr", intensity: "HIGH" }, { time: "10:00", activity: "Combat Drills", duration: "2 hrs", intensity: "HIGH" }, { time: "15:00", activity: "Obstacle Course", duration: "1 hr", intensity: "MEDIUM" }] },
  { day: "Thursday", focus: "Tactical Operations", items: [{ time: "07:00", activity: "Map Reading & Navigation", duration: "2 hrs", intensity: "LOW" }, { time: "10:00", activity: "Field Tactics", duration: "3 hrs", intensity: "MEDIUM" }, { time: "16:00", activity: "Night Patrol Prep", duration: "1 hr", intensity: "LOW" }] },
]

const MEDICAL_RISKS = [
  { label: "Fatigue Risk", value: "LOW", status: "Normal", color: "emerald", icon: <Flame size={16} /> },
  { label: "Overtraining Risk", value: "MODERATE", status: "Monitor", color: "amber", icon: <Activity size={16} /> },
  { label: "Injury Probability", value: "8%", status: "Normal", color: "emerald", icon: <ShieldAlert size={16} /> },
  { label: "Dehydration Risk", value: "LOW", status: "Normal", color: "emerald", icon: <Droplets size={16} /> },
  { label: "Mental Health Flag", value: "NORMAL", status: "Normal", color: "emerald", icon: <SmilePlus size={16} /> },
  { label: "Follow-up Needed", value: "NO", status: "Normal", color: "emerald", icon: <CheckCircle2 size={16} /> },
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
function grade(v: number) {
  if (v >= 90) return { l: "Outstanding", c: "bg-emerald-100 text-emerald-700 border-emerald-200" }
  if (v >= 80) return { l: "Good", c: "bg-sky-100 text-sky-700 border-sky-200" }
  if (v >= 70) return { l: "Average", c: "bg-amber-100 text-amber-700 border-amber-200" }
  return { l: "Needs Improvement", c: "bg-rose-100 text-rose-600 border-rose-200" }
}
function avgOf(arr: number[]) {
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 10) / 10
}
function intensityColor(i: string) {
  if (i === "HIGH") return "text-rose-500 bg-rose-50 border-rose-200"
  if (i === "MEDIUM") return "text-amber-600 bg-amber-50 border-amber-200"
  return "text-sky-600 bg-sky-50 border-sky-200"
}

// ── Month Detail Drill-Down ───────────────────────────────────────────────────
function MonthDetailView({ month, soldierFilter, batFilter, onClose }: {
  month: string
  soldierFilter?: string   // soldier id or undefined (all)
  batFilter?: string       // battalion id or undefined (all)
  onClose: () => void
}) {
  const idx = MONTHS.indexOf(month)

  // Which soldiers to show
  const soldiers = MONTHLY_DATA.filter(s => {
    if (soldierFilter) return s.id === soldierFilter
    if (batFilter) return s.battalion === batFilter
    return true
  })

  const monthScores = soldiers.map(s => ({ ...s, ...s.monthly[idx] }))
  const prevScores = idx > 0
    ? soldiers.map(s => ({ id: s.id, overall: s.monthly[idx - 1].overall }))
    : null

  const avgOverall = avgOf(monthScores.map(s => s.overall))
  const avgPhysical = avgOf(monthScores.map(s => s.physical))
  const avgWeapons = avgOf(monthScores.map(s => s.weapons))
  const avgMental = avgOf(monthScores.map(s => s.mental))
  const avgCombat = avgOf(monthScores.map(s => s.combat))

  const topSoldier = [...monthScores].sort((a, b) => b.overall - a.overall)[0]
  const mostImproved = prevScores
    ? monthScores.reduce((best, s) => {
      const prev = prevScores.find(p => p.id === s.id)?.overall ?? s.overall
      const delta = s.overall - prev
      const bestPrev = prevScores.find(p => p.id === best.id)?.overall ?? best.overall
      return delta > (best.overall - bestPrev) ? s : best
    }, monthScores[0])
    : null

  const categories = [
    { key: "physical", label: "Physical Fitness", icon: <Dumbbell size={12} /> },
    { key: "weapons", label: "Weapons", icon: <Target size={12} /> },
    { key: "mental", label: "Mental", icon: <Brain size={12} /> },
    { key: "combat", label: "Combat", icon: <Swords size={12} /> },
    { key: "attendance", label: "Attendance", icon: <CalendarDays size={12} /> },
    { key: "discipline", label: "Discipline", icon: <ShieldCheck size={12} /> },
  ]

  const catAvgs = {
    physical: avgPhysical,
    weapons: avgWeapons,
    mental: avgMental,
    combat: avgCombat,
    attendance: avgOf(monthScores.map(s => s.attendance)),
    discipline: avgOf(monthScores.map(s => s.discipline)),
  }

  const outstanding = monthScores.filter(s => s.overall >= 90).length
  const needsAttn = monthScores.filter(s => s.overall < 70).length
  const improved = prevScores
    ? monthScores.filter(s => s.overall > (prevScores.find(p => p.id === s.id)?.overall ?? s.overall)).length
    : 0
  const declined = prevScores
    ? monthScores.filter(s => s.overall < (prevScores.find(p => p.id === s.id)?.overall ?? s.overall)).length
    : 0

  const title = soldierFilter
    ? `${soldiers[0]?.name} — ${month} 2024/25`
    : batFilter
      ? `${ALL_BATTALIONS.find(b => b.id === batFilter)?.name} — ${month} 2024/25`
      : `All Agniveers — ${month} 2024/25`

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4 pt-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a2d4a] px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <button onClick={onClose} className="hover:text-white flex items-center gap-1 transition-colors">
                <ChevronLeft size={12} /> Back
              </button>
              <span>/</span>
              <span>Monthly Drill-Down</span>
            </div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="text-white/60 text-xs mt-0.5">
              {monthScores.length} soldier{monthScores.length !== 1 ? "s" : ""} · Analytical performance breakdown
            </p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors mt-1">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">

          {/* Summary KPI row */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {[
              { label: "Avg. Score", value: avgOverall, accent: "text-[#1a2d4a]", border: "border-t-[#1a2d4a]" },
              { label: "Outstanding", value: outstanding, accent: "text-emerald-600", border: "border-t-emerald-500" },
              { label: "Needs Attn.", value: needsAttn, accent: "text-rose-500", border: "border-t-rose-500" },
              { label: "Soldiers", value: monthScores.length, accent: "text-stone-700", border: "border-t-stone-300" },
              ...(prevScores ? [
                { label: "Improved", value: improved, accent: "text-sky-600", border: "border-t-sky-500" },
                { label: "Declined", value: declined, accent: "text-amber-600", border: "border-t-amber-500" },
              ] : []),
            ].map(c => (
              <Card key={c.label} className={`border border-stone-200 border-t-4 ${c.border} bg-white shadow-sm`}>
                <CardContent className="px-3 pt-2.5 pb-2.5">
                  <div className="text-[9px] text-stone-400 uppercase tracking-wide">{c.label}</div>
                  <div className={`mt-0.5 text-xl font-black ${c.accent}`}>{c.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Highlights row */}
          {(topSoldier || mostImproved) && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {topSoldier && (
                <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                  <Trophy size={20} className="text-amber-500 shrink-0" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-amber-600">Top Performer — {month}</div>
                    <div className="text-sm font-bold text-stone-800">{topSoldier.name}</div>
                    <div className="text-xs text-stone-500">{topSoldier.batName} · Score: <span className={`font-black ${sc(topSoldier.overall)}`}>{topSoldier.overall}</span></div>
                  </div>
                </div>
              )}
              {mostImproved && prevScores && (() => {
                const prev = prevScores.find(p => p.id === mostImproved.id)?.overall ?? mostImproved.overall
                const delta = Math.round((mostImproved.overall - prev) * 10) / 10
                return delta > 0 ? (
                  <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <TrendingUp size={20} className="text-emerald-500 shrink-0" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">Most Improved — {month}</div>
                      <div className="text-sm font-bold text-stone-800">{mostImproved.name}</div>
                      <div className="text-xs text-stone-500">{mostImproved.batName} · +<span className="font-black text-emerald-600">{delta}</span> pts from {MONTHS[idx - 1]}</div>
                    </div>
                  </div>
                ) : null
              })()}
            </div>
          )}

          {/* Category averages */}
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                <BarChart3 size={13} className="text-[#4a5c2f]" /> Category Averages — {month}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map(cat => {
                  const v = catAvgs[cat.key as keyof typeof catAvgs]
                  return (
                    <div key={cat.key} className="space-y-1.5 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-stone-400">{cat.icon}{cat.label}</div>
                      <div className={`text-2xl font-black ${sc(v)}`}>{v}</div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                        <div className={`h-full rounded-full ${bc(v)}`} style={{ width: `${v}%` }} />
                      </div>
                      <Badge className={`border text-[9px] ${grade(v).c}`}>{grade(v).l}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Individual soldier breakdown */}
          <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                <Users size={13} className="text-[#1a2d4a]" /> Individual Soldier Scores — {month}
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">Soldier</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">Battalion</th>
                    {categories.map(c => (
                      <th key={c.key} className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">
                        <span className="flex items-center gap-1">{c.icon}{c.label.split(" ")[0]}</span>
                      </th>
                    ))}
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">Overall</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">Grade</th>
                    {prevScores && <th className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">vs {MONTHS[idx - 1]}</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {[...monthScores].sort((a, b) => b.overall - a.overall).map(s => {
                    const prev = prevScores?.find(p => p.id === s.id)?.overall
                    const delta = prev != null ? Math.round((s.overall - prev) * 10) / 10 : null
                    return (
                      <tr key={s.id} className={`hover:bg-stone-50 ${s.overall >= 90 ? "bg-emerald-50/20" : s.overall < 70 ? "bg-rose-50/20" : ""}`}>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <div className="font-semibold text-stone-800 text-sm">{s.name}</div>
                          <div className="font-mono text-[10px] text-stone-400">{s.id}</div>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <Badge className="border border-stone-200 bg-stone-50 text-stone-600 font-mono text-[10px]">{s.battalion}</Badge>
                        </td>
                        {categories.map(cat => {
                          const v = s[cat.key as keyof typeof s] as number
                          return (
                            <td key={cat.key} className="px-3 py-2.5">
                              <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-10 overflow-hidden rounded-full bg-stone-100">
                                  <div className={`h-full rounded-full ${bc(v)}`} style={{ width: `${v}%` }} />
                                </div>
                                <span className={`text-xs font-bold ${sc(v)}`}>{v}</span>
                              </div>
                            </td>
                          )
                        })}
                        <td className="px-3 py-2.5">
                          <span className={`text-base font-black ${sc(s.overall)}`}>{s.overall}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <Badge className={`border text-xs ${grade(s.overall).c}`}>{grade(s.overall).l}</Badge>
                        </td>
                        {prevScores && (
                          <td className="px-3 py-2.5">
                            {delta != null ? (
                              <span className={`text-xs font-bold flex items-center gap-0.5 ${delta > 0 ? "text-emerald-600" : delta < 0 ? "text-rose-500" : "text-stone-400"
                                }`}>
                                {delta > 0 ? "▲" : delta < 0 ? "▼" : "—"}
                                {delta !== 0 ? Math.abs(delta) : ""}
                              </span>
                            ) : <span className="text-xs text-stone-300">—</span>}
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2 text-xs text-stone-400">
              {monthScores.length} soldier{monthScores.length !== 1 ? "s" : ""} · Sorted by overall score (highest first)
              {prevScores && ` · ▲/▼ shows change from ${MONTHS[idx - 1]}`}
            </div>
          </Card>

          {/* Distribution */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-stone-800">Score Distribution</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {[
                  { label: "Outstanding (≥90)", count: monthScores.filter(s => s.overall >= 90).length, color: "bg-emerald-500", textColor: "text-emerald-600" },
                  { label: "Good (80–89)", count: monthScores.filter(s => s.overall >= 80 && s.overall < 90).length, color: "bg-sky-500", textColor: "text-sky-600" },
                  { label: "Average (70–79)", count: monthScores.filter(s => s.overall >= 70 && s.overall < 80).length, color: "bg-amber-500", textColor: "text-amber-600" },
                  { label: "Needs Improvement (<70)", count: monthScores.filter(s => s.overall < 70).length, color: "bg-rose-500", textColor: "text-rose-500" },
                ].map(d => (
                  <div key={d.label} className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${d.color} shrink-0`} />
                    <span className="flex-1 text-xs text-stone-600">{d.label}</span>
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-stone-100">
                      <div className={`h-full ${d.color}`} style={{ width: `${monthScores.length ? d.count / monthScores.length * 100 : 0}%` }} />
                    </div>
                    <span className={`w-6 text-right text-sm font-black ${d.textColor}`}>{d.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-stone-800">Battalion Comparison</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {ALL_BATTALIONS.map(bat => {
                  const batSoldiers = MONTHLY_DATA.filter(s => s.battalion === bat.id)
                  if (!batSoldiers.length) return null
                  const batAvg = avgOf(batSoldiers.map(s => s.monthly[idx].overall))
                  return (
                    <div key={bat.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Badge className="border border-stone-200 bg-stone-50 font-mono text-[10px] text-stone-600">{bat.id}</Badge>
                          <span className="text-xs text-stone-500 truncate max-w-[110px]">{bat.name.split(" ").slice(0, 2).join(" ")}</span>
                        </div>
                        <span className={`text-sm font-black ${sc(batAvg)}`}>{batAvg}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                        <div className={`h-full rounded-full ${bc(batAvg)}`} style={{ width: `${batAvg}%` }} />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Trend Chart (clickable bars) ──────────────────────────────────────────────
function TrendChart({ data, onMonthClick, title, activeMonth }: {
  data: { month: string; score: number }[]
  onMonthClick: (m: string) => void
  title: string
  activeMonth?: string
}) {
  const max = Math.max(...data.map(d => d.score))
  const min = Math.min(...data.map(d => d.score))

  return (
    <Card className="border-stone-200 bg-white shadow-sm">
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center justify-between text-sm font-semibold text-stone-800">
          <span className="flex items-center gap-2"><BarChart3 size={13} className="text-[#4a5c2f]" />{title}</span>
          <span className="text-[10px] font-normal text-stone-400">Click any bar or month to drill down</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {/* Bar chart */}
        <div className="flex items-end gap-2 h-28 mb-3">
          {data.map((pt, i) => {
            const heightPct = ((pt.score - (min - 4)) / ((max + 2) - (min - 4))) * 100
            const isActive = activeMonth === pt.month
            const isLast = i === data.length - 1
            return (
              <button key={pt.month} onClick={() => onMonthClick(pt.month)}
                className="flex flex-1 flex-col items-center gap-1 group"
                title={`${pt.month}: ${pt.score} — click for detail`}>
                <span className={`text-xs font-bold transition-all ${isActive ? sc(pt.score) : "text-stone-400 group-hover:text-stone-600"
                  }`}>{pt.score}</span>
                <div className={`w-full rounded-t-md transition-all duration-200 ${isActive
                    ? `${isLast ? "bg-[#c8601a]" : "bg-[#4a5c2f]"} ring-2 ring-offset-1 ${isLast ? "ring-[#c8601a]" : "ring-[#4a5c2f]"}`
                    : `${isLast ? "bg-[#c8601a]/70" : "bg-[#4a5c2f]/60"} group-hover:${isLast ? "bg-[#c8601a]" : "bg-[#4a5c2f]"}`
                  }`} style={{ height: `${heightPct}%` }} />
              </button>
            )
          })}
        </div>

        {/* Month labels + click row */}
        <div className="flex gap-2">
          {data.map((pt, i) => {
            const isLast = i === data.length - 1
            const isActive = activeMonth === pt.month
            return (
              <button key={pt.month} onClick={() => onMonthClick(pt.month)}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${isActive
                    ? `${isLast ? "bg-[#c8601a]" : "bg-[#4a5c2f]"} text-white`
                    : "text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                  }`}>
                {pt.month}
              </button>
            )
          })}
        </div>

        {activeMonth && (
          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs text-sky-700">
            <Activity size={11} />
            Showing <strong>{activeMonth}</strong> — click the bar again or select a different month
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ── SOLDIER INSIGHTS TAB ──────────────────────────────────────────────────────
function SoldierInsights() {
  const [soldierIds, setSoldierIds] = useState(ALL_SOLDIERS[0].id)
  const [drillMonth, setDrillMonth] = useState<string | null>(null)
  const sel = ALL_SOLDIERS.find(s => s.id === soldierIds)!
  const selData = MONTHLY_DATA.find(s => s.id === soldierIds)!

  const trend = selData.monthly.map(m => ({ month: m.month, score: m.overall }))
  const predicted = Math.min(100, Math.round(sel.overall + 2.3))
  const injRisk = sel.physical < 75 ? "HIGH" : sel.physical < 85 ? "MODERATE" : "LOW"

  const recs = [
    { area: "Mental Resilience", tip: "Continue resilience workshops. Group problem-solving.", icon: <Brain size={13} /> },
    { area: "Physical Endurance", tip: "Add 1 extra cardio session per week for sustained gains.", icon: <Dumbbell size={13} /> },
    { area: "Weapons Accuracy", tip: "Schedule 2 additional range sessions this month.", icon: <Target size={13} /> },
  ]

  return (
    <>
      {drillMonth && (
        <MonthDetailView
          month={drillMonth}
          soldierFilter={soldierIds}
          onClose={() => setDrillMonth(null)}
        />
      )}
      <div className="space-y-5">
        {/* Soldier selector */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-stone-700">Select Soldier</CardTitle></CardHeader>
          <CardContent className="pb-4">
            <Select value={soldierIds} onValueChange={setSoldierIds}>
              <SelectTrigger className="w-full max-w-sm border-stone-200 bg-stone-50 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ALL_SOLDIERS.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name} — {s.id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Injury Risk", value: injRisk, sub: `Probability: ${injRisk === "LOW" ? "12%" : injRisk === "MODERATE" ? "28%" : "47%"}`, badge: injRisk, color: injRisk === "LOW" ? "emerald" : injRisk === "MODERATE" ? "amber" : "rose", border: `border-l-${injRisk === "LOW" ? "emerald-500" : injRisk === "MODERATE" ? "amber-500" : "rose-500"}` },
            { label: "Predicted Score (30d)", value: predicted, sub: `Current: ${sel.overall} · Change: +${(predicted - sel.overall).toFixed(1)}`, badge: "↑ Improving", color: "emerald", border: "border-l-[#4a5c2f]" },
            { label: "Performance Status", value: sel.overall >= 85 ? "Excellent" : sel.overall >= 75 ? "Average" : "At Risk", sub: `Rank #${[...ALL_SOLDIERS].sort((a, b) => b.overall - a.overall).findIndex(s => s.id === sel.id) + 1} of ${ALL_SOLDIERS.length}`, badge: grade(sel.overall).l, color: sel.overall >= 85 ? "emerald" : "amber", border: `border-l-${sel.overall >= 85 ? "emerald-500" : "amber-500"}` },
          ].map(c => (
            <Card key={c.label} className={`border border-stone-200 border-l-4 ${c.border} bg-white shadow-sm`}>
              <CardContent className="px-4 pt-4 pb-4 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{c.label}</div>
                <div className={`text-3xl font-black ${c.color === "emerald" ? "text-emerald-600" : c.color === "amber" ? "text-amber-600" : "text-rose-500"}`}>{c.value}</div>
                <div className="text-xs text-stone-400">{c.sub}</div>
                <Badge className={`border text-[10px] ${c.color === "emerald" ? "border-emerald-200 bg-emerald-100 text-emerald-700" : c.color === "amber" ? "border-amber-200 bg-amber-100 text-amber-700" : "border-rose-200 bg-rose-100 text-rose-600"}`}>{c.badge}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Recommendations */}
          <Card className="border-stone-200 bg-white shadow-sm lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Brain size={13} className="text-violet-500" /> AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {recs.map((r, i) => (
                <div key={i} className="flex gap-2.5">
                  <ArrowRight size={13} className="mt-0.5 shrink-0 text-[#4a5c2f]" />
                  <div>
                    <div className="text-sm font-semibold text-stone-700 flex items-center gap-1.5">{r.icon}{r.area}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{r.tip}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trend chart */}
          <div className="lg:col-span-3">
            <TrendChart
              data={trend}
              title={`6-Month Trend — ${sel.name}`}
              onMonthClick={m => setDrillMonth(m)}
              activeMonth={drillMonth ?? undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ── BATTALION INSIGHTS TAB ────────────────────────────────────────────────────
function BattalionInsights() {
  const [batId, setBatId] = useState(ALL_BATTALIONS[0].id)
  const [drillMonth, setDrillMonth] = useState<string | null>(null)

  const soldiers = ALL_SOLDIERS.filter(s => s.battalion === batId)
  const batAvg = avgOf(soldiers.map(s => s.overall))
  const highRisk = soldiers.filter(s => s.physical < 75).length
  const declining = soldiers.filter(s => s.overall < 75).length

  // Trend for this battalion across 6 months
  const trend = MONTHS.map(m => {
    const batMonthly = MONTHLY_DATA.filter(s => s.battalion === batId)
    const avg2 = avgOf(batMonthly.map(s => s.monthly.find(mo => mo.month === m)!.overall))
    return { month: m, score: Math.round(avg2 * 10) / 10 }
  })

  return (
    <>
      {drillMonth && (
        <MonthDetailView
          month={drillMonth}
          batFilter={batId}
          onClose={() => setDrillMonth(null)}
        />
      )}
      <div className="space-y-5">
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-stone-700">Select Battalion</CardTitle></CardHeader>
          <CardContent className="pb-4">
            <Select value={batId} onValueChange={setBatId}>
              <SelectTrigger className="w-full max-w-sm border-stone-200 bg-stone-50 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ALL_BATTALIONS.map(b => (
                  <SelectItem key={b.id} value={b.id}>{b.name} ({b.id})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Avg. Performance", value: batAvg, sub: `${soldiers.length} soldiers · ${soldiers.filter(s => s.overall >= 85).length} outstanding`, color: "emerald", border: "border-l-emerald-500" },
            { label: "High Injury Risk", value: highRisk, sub: "Physical score below 75", color: highRisk === 0 ? "emerald" : "amber", border: `border-l-${highRisk === 0 ? "emerald-500" : "amber-500"}` },
            { label: "Declining Performance", value: declining, sub: "Overall score below 75", color: declining === 0 ? "emerald" : "amber", border: `border-l-${declining === 0 ? "emerald-500" : "amber-500"}` },
          ].map(c => (
            <Card key={c.label} className={`border border-stone-200 border-l-4 ${c.border} bg-white shadow-sm`}>
              <CardContent className="px-4 pt-4 pb-4 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{c.label}</div>
                <div className={`text-3xl font-black ${c.color === "emerald" ? "text-emerald-600" : "text-amber-600"}`}>{c.value}</div>
                <div className="text-xs text-stone-400">{c.sub}</div>
                <Badge className={`border text-[10px] ${c.color === "emerald" ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-amber-200 bg-amber-100 text-amber-700"}`}>
                  {c.color === "emerald" ? "Good" : "Action Needed"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Brain size={13} className="text-violet-500" /> Battalion AI Recommendations — {ALL_BATTALIONS.find(b => b.id === batId)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2.5">
            {[
              declining > 0 && `Organise additional fitness training for ${declining} soldier${declining > 1 ? "s" : ""} with scores below 75. Assign senior Lance Naik as buddy trainer.`,
              highRisk > 0 && `Medical review recommended for ${highRisk} soldier${highRisk > 1 ? "s" : ""} with high injury risk. Schedule checkup with Medical Officer.`,
              "Monthly peer mentorship sessions — pair top-performing soldiers (Score ≥ 90) with those in the 70–80 range.",
              `Weapons accuracy average is ${avgOf(soldiers.map(s => s.weapons))}. Schedule 2 additional range sessions this month.`,
              `Attendance rate is ${avgOf(soldiers.map(s => s.attendance))}%. Any soldier below 85% should be counselled.`,
            ].filter(Boolean).map((r, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3 text-sm">
                <ArrowRight size={13} className="mt-0.5 shrink-0 text-[#4a5c2f]" />
                <span className="text-stone-600">{r}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trend chart */}
        <TrendChart
          data={trend}
          title={`6-Month Trend — ${ALL_BATTALIONS.find(b => b.id === batId)?.name}`}
          onMonthClick={m => setDrillMonth(m)}
          activeMonth={drillMonth ?? undefined}
        />
      </div>
    </>
  )
}

// ── AI SCHEDULE TAB ───────────────────────────────────────────────────────────
function AiSchedule() {
  const [soldierName, setSoldierName] = useState(ALL_SOLDIERS[0].name)
  return (
    <div className="space-y-5">
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-stone-700">Select Soldier for AI-Optimised Schedule</CardTitle></CardHeader>
        <CardContent className="pb-4">
          <Select value={soldierName} onValueChange={setSoldierName}>
            <SelectTrigger className="w-full max-w-sm border-stone-200 bg-stone-50 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ALL_SOLDIERS.map(s => (
                <SelectItem key={s.id} value={s.name}>{s.name} — {s.id}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <div className="flex items-start gap-3 rounded-lg border border-l-4 border-sky-100 border-l-sky-400 bg-sky-50 px-4 py-3">
        <Code2 size={14} className="mt-0.5 shrink-0 text-sky-500" />
        <p className="text-sm text-sky-700">AI-generated weekly schedule for <strong>{soldierName}</strong> based on current scores and identified weaknesses. Endpoint: <code className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-xs">/api/ml/training/optimize</code></p>
      </div>
      <div className="space-y-3">
        {SCHEDULE.map(day => (
          <Card key={day.day} className="overflow-hidden border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-[#4a5c2f]" />
                <span className="text-sm font-bold text-stone-800">{day.day}</span>
              </div>
              <span className="text-xs text-stone-400">Focus: {day.focus}</span>
            </div>
            <div className="divide-y divide-stone-50">
              {day.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-12 shrink-0 font-mono text-xs text-stone-400">{item.time}</span>
                    <span className="text-sm font-medium text-stone-700">{item.activity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400">{item.duration}</span>
                    <Badge variant="outline" className={`border text-xs font-semibold ${intensityColor(item.intensity)}`}>{item.intensity}</Badge>
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

// ── MEDICAL RISK TAB ──────────────────────────────────────────────────────────
function MedicalRisk() {
  const [soldierName, setSoldierName] = useState(ALL_SOLDIERS[0].name)
  return (
    <div className="space-y-5">
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-stone-700">Select Soldier for Medical Risk Analysis</CardTitle></CardHeader>
        <CardContent className="pb-4">
          <Select value={soldierName} onValueChange={setSoldierName}>
            <SelectTrigger className="w-full max-w-sm border-stone-200 bg-stone-50 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ALL_SOLDIERS.map(s => (
                <SelectItem key={s.id} value={s.name}>{s.name} — {s.id}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <div className="flex items-start gap-3 rounded-lg border border-l-4 border-sky-100 border-l-sky-400 bg-sky-50 px-4 py-3">
        <Code2 size={14} className="mt-0.5 shrink-0 text-sky-500" />
        <p className="text-sm text-sky-700">Medical risk analysis for <strong>{soldierName}</strong> · Endpoint: <code className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-xs">/api/ml/medical/analyze</code></p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEDICAL_RISKS.map(risk => (
          <Card key={risk.label} className={`border-l-4 border-stone-200 bg-white shadow-sm ${risk.color === "amber" ? "border-l-amber-500" : "border-l-emerald-500"
            }`}>
            <CardContent className="space-y-2 px-5 pt-5 pb-5">
              <div className="flex items-center gap-2">
                <span className={risk.color === "amber" ? "text-amber-500" : "text-emerald-500"}>{risk.icon}</span>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">{risk.label}</p>
              </div>
              <p className="text-3xl font-black text-stone-800">{risk.value}</p>
              <Badge className={`border text-xs ${risk.color === "amber"
                  ? "border-amber-200 bg-amber-100 text-amber-700"
                  : "border-emerald-200 bg-emerald-100 text-emerald-700"
                }`}>{risk.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="px-5 py-4">
          <div className="flex items-start gap-3">
            <Heart size={16} className="mt-0.5 shrink-0 text-rose-400" />
            <p className="text-sm text-stone-600">
              <strong className="text-stone-800">Overall Assessment:</strong> {soldierName} is in good medical standing. Overtraining risk is moderate — consider a recovery day mid-week. No immediate follow-up required. Next scheduled medical review: <span className="font-medium text-stone-700">15 Apr 2025</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── PAGE ROOT ─────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "soldier", label: "Soldier Insights", icon: <Users size={14} /> },
  { id: "battalion", label: "Battalion Insights", icon: <Shield size={14} /> },
  { id: "schedule", label: "AI-Optimised Schedule", icon: <CalendarDays size={14} /> },
  { id: "medical", label: "Medical Risk Analysis", icon: <Heart size={14} /> },
]

export default function MLInsightsPage() {
  const [tab, setTab] = useState<Tab>("soldier")

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 pt-4 pb-0">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-stone-900">
                <Brain size={22} className="text-violet-500" /> ML Insights Engine
              </h1>
              <p className="mt-0.5 mb-3 text-sm text-stone-500">
                Powered by AgniAssist ML · {ALL_SOLDIERS.length} soldiers · {ALL_BATTALIONS.length} battalions · Click any trend bar for monthly drill-down
              </p>
            </div>
            <Badge className="mt-1 shrink-0 gap-1 border border-violet-200 bg-violet-50 text-xs text-violet-600 hover:bg-violet-50">
              <Zap size={10} /> ML Active
            </Badge>
          </div>
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? "border-[#4a5c2f] text-[#4a5c2f]"
                    : "border-transparent text-stone-400 hover:border-stone-300 hover:text-stone-700"
                  }`}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        {tab === "soldier" && <SoldierInsights />}
        {tab === "battalion" && <BattalionInsights />}
        {tab === "schedule" && <AiSchedule />}
        {tab === "medical" && <MedicalRisk />}
      </div>
    </div>
  )
}