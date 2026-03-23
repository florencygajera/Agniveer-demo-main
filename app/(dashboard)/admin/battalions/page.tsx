"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  MapPin, Users, Shield, Plus, Pencil, ChevronRight,
  UserCheck, UserMinus, Star, TrendingUp, Search,
  Building2, ChevronLeft, X, Trophy, Dumbbell, Target,
  Brain, Swords, CalendarDays, ShieldCheck, Phone,
  Mail, Droplets, Activity,
} from "lucide-react"

// ══════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════
interface Battalion {
  id: string
  code: string
  name: string
  location: string
  commander: string
  score: number
  status: "Good" | "Average" | "Poor"
  total: number
  active: number
  onLeave: number
  scoreAbove85: number
  physical: number
  weapons: number
  mental: number
  accentColor: string
  accentBorder: string
}

interface Soldier {
  id: string
  soldierId: string
  name: string
  rank: string
  battalion: string      // battalion code e.g. "RR-1"
  battalionName: string
  gender: string
  state: string
  city: string
  dob: string
  joining: string
  blood: string
  phone: string
  email: string
  status: "active" | "on_leave" | "inactive"
  medical: string
  physical: number
  weapons: number
  mental: number
  combat: number
  attendance: number
  discipline: number
  overall: number
  equipment: string[]
  events: string[]
  emergency: { name: string; phone: string; relation: string }
}

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════
const BATTALIONS: Battalion[] = [
  { id: "1", code: "RR-1", name: "1st Rajputana Rifles", location: "Jaipur, Rajasthan", commander: "Col. R.K. Verma", score: 84.7, status: "Good", total: 6, active: 5, onLeave: 1, scoreAbove85: 3, physical: 83, weapons: 82, mental: 80, accentColor: "border-l-[#4a5c2f]", accentBorder: "#4a5c2f" },
  { id: "2", code: "PARA-2", name: "2nd Parachute Regiment", location: "Agra, Uttar Pradesh", commander: "Col. S.P. Mehta", score: 84.4, status: "Good", total: 4, active: 4, onLeave: 0, scoreAbove85: 3, physical: 84, weapons: 79, mental: 82, accentColor: "border-l-violet-500", accentBorder: "#7c3aed" },
  { id: "3", code: "BEN-3", name: "3rd Bengal Regiment", location: "Kolkata, West Bengal", commander: "Col. D.K. Roy", score: 83.2, status: "Good", total: 4, active: 4, onLeave: 0, scoreAbove85: 2, physical: 82, weapons: 77, mental: 81, accentColor: "border-l-sky-500", accentBorder: "#0284c7" },
  { id: "4", code: "MAR-4", name: "4th Maratha Light Infantry", location: "Pune, Maharashtra", commander: "Col. V.B. Patil", score: 80.0, status: "Good", total: 4, active: 4, onLeave: 0, scoreAbove85: 1, physical: 79, weapons: 75, mental: 77, accentColor: "border-l-amber-500", accentBorder: "#f59e0b" },
]

const ALL_SOLDIERS: Soldier[] = [
  { id: "1", soldierId: "AGN-2024-0101", name: "Rajveer Singh Chauhan", rank: "Sepoy", battalion: "RR-1", battalionName: "1st Rajputana Rifles", gender: "Male", state: "Rajasthan", city: "Jodhpur", dob: "2003-04-12", joining: "2024-01-15", blood: "B+", phone: "9876501001", email: "rajveer@army.in", status: "active", medical: "Fit", physical: 91, weapons: 88, mental: 78, combat: 89, attendance: 96, discipline: 92, overall: 89, equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack", "Ballistic Helmet"], events: ["Won 200m Sprint — Batch Rally 2024", "Best Shooter Award — March 2025"], emergency: { name: "Ratan Singh", phone: "9876501002", relation: "Father" } },
  { id: "2", soldierId: "AGN-2024-0102", name: "Priya Sharma", rank: "Sepoy", battalion: "RR-1", battalionName: "1st Rajputana Rifles", gender: "Female", state: "Rajasthan", city: "Jaipur", dob: "2002-08-22", joining: "2024-01-15", blood: "A+", phone: "9876501003", email: "priya.sharma@army.in", status: "active", medical: "Fit", physical: 85, weapons: 72, mental: 94, combat: 80, attendance: 98, discipline: 95, overall: 87.3, equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Top Mental Resilience — Batch 2024", "Academic Excellence Award"], emergency: { name: "Meena Sharma", phone: "9876501004", relation: "Mother" } },
  { id: "3", soldierId: "AGN-2024-0103", name: "Arjun Mehra", rank: "Lance Naik", battalion: "RR-1", battalionName: "1st Rajputana Rifles", gender: "Male", state: "Punjab", city: "Amritsar", dob: "2001-11-05", joining: "2024-01-15", blood: "O+", phone: "9876501005", email: "arjun.mehra@army.in", status: "active", medical: "Fit", physical: 96, weapons: 94, mental: 88, combat: 95, attendance: 100, discipline: 97, overall: 95, equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack", "Ballistic Helmet", "Night Vision Goggles"], events: ["Battalion Champion — Physical 2024", "All India #1 — March 2025"], emergency: { name: "Gurpreet Mehra", phone: "9876501006", relation: "Father" } },
  { id: "4", soldierId: "AGN-2024-0104", name: "Sunil Kumar", rank: "Sepoy", battalion: "RR-1", battalionName: "1st Rajputana Rifles", gender: "Male", state: "Haryana", city: "Rohtak", dob: "2003-02-18", joining: "2024-01-15", blood: "AB+", phone: "9876501007", email: "sunil.k@army.in", status: "active", medical: "Fit (Ankle — Recovered)", physical: 68, weapons: 72, mental: 65, combat: 70, attendance: 82, discipline: 75, overall: 72, equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Ram Kumar", phone: "9876501008", relation: "Father" } },
  { id: "5", soldierId: "AGN-2024-0105", name: "Kavita Rajput", rank: "Sepoy", battalion: "RR-1", battalionName: "1st Rajputana Rifles", gender: "Female", state: "UP", city: "Lucknow", dob: "2002-06-30", joining: "2024-01-15", blood: "B-", phone: "9876501009", email: "kavita.r@army.in", status: "on_leave", medical: "Fit", physical: 78, weapons: 74, mental: 82, combat: 76, attendance: 88, discipline: 85, overall: 80.5, equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Best Female Recruit — Batch 2024"], emergency: { name: "Sunita Rajput", phone: "9876501010", relation: "Mother" } },
  { id: "6", soldierId: "AGN-2024-0106", name: "Mahesh Choudhary", rank: "Sepoy", battalion: "RR-1", battalionName: "1st Rajputana Rifles", gender: "Male", state: "Rajasthan", city: "Bikaner", dob: "2003-09-14", joining: "2024-01-15", blood: "O-", phone: "9876501011", email: "mahesh.c@army.in", status: "active", medical: "Fit", physical: 82, weapons: 91, mental: 70, combat: 84, attendance: 91, discipline: 88, overall: 84.3, equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"], events: ["Best Shooter — Jan 2025"], emergency: { name: "Ramesh Choudhary", phone: "9876501012", relation: "Father" } },
  { id: "7", soldierId: "AGN-2024-0201", name: "Vikram Nair", rank: "Sepoy", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", gender: "Male", state: "Kerala", city: "Thiruvananthapuram", dob: "2002-03-25", joining: "2024-02-01", blood: "A+", phone: "9876502001", email: "vikram.n@army.in", status: "active", medical: "Fit", physical: 94, weapons: 88, mental: 86, combat: 93, attendance: 97, discipline: 94, overall: 92, equipment: ["INSAS Rifle", "Para Suit", "Combat Uniform", "Tactical Backpack"], events: ["Jump Certified — Mar 2024", "Best Para Recruit — 2024"], emergency: { name: "Suresh Nair", phone: "9876502002", relation: "Father" } },
  { id: "8", soldierId: "AGN-2024-0202", name: "Ananya Krishnan", rank: "Sepoy", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", gender: "Female", state: "Tamil Nadu", city: "Chennai", dob: "2003-07-11", joining: "2024-02-01", blood: "B+", phone: "9876502003", email: "ananya.k@army.in", status: "active", medical: "Fit", physical: 80, weapons: 75, mental: 91, combat: 78, attendance: 95, discipline: 96, overall: 85.8, equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Top Academic Score — 2024"], emergency: { name: "Kavitha Krishnan", phone: "9876502004", relation: "Mother" } },
  { id: "9", soldierId: "AGN-2024-0203", name: "Rohit Sharma", rank: "Sepoy", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", gender: "Male", state: "MP", city: "Bhopal", dob: "2002-12-01", joining: "2024-02-01", blood: "O+", phone: "9876502005", email: "rohit.s@army.in", status: "active", medical: "Under Observation (Knee)", physical: 75, weapons: 69, mental: 72, combat: 71, attendance: 79, discipline: 74, overall: 73.3, equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Mahesh Sharma", phone: "9876502006", relation: "Father" } },
  { id: "10", soldierId: "AGN-2024-0204", name: "Deepak Yadav", rank: "Sepoy", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", gender: "Male", state: "Bihar", city: "Patna", dob: "2003-05-19", joining: "2024-02-01", blood: "A-", phone: "9876502007", email: "deepak.y@army.in", status: "active", medical: "Fit", physical: 88, weapons: 82, mental: 79, combat: 86, attendance: 93, discipline: 90, overall: 86.3, equipment: ["INSAS Rifle", "Para Suit", "Combat Uniform"], events: ["Jump Certified — Apr 2024"], emergency: { name: "Sanjay Yadav", phone: "9876502008", relation: "Father" } },
  { id: "11", soldierId: "AGN-2024-0301", name: "Sourav Das", rank: "Sepoy", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", gender: "Male", state: "WB", city: "Kolkata", dob: "2002-01-14", joining: "2024-02-15", blood: "B+", phone: "9876503001", email: "sourav.d@army.in", status: "active", medical: "Fit", physical: 86, weapons: 80, mental: 83, combat: 85, attendance: 94, discipline: 88, overall: 86, equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"], events: ["Best Combat Drill — Mar 2025"], emergency: { name: "Tapan Das", phone: "9876503002", relation: "Father" } },
  { id: "12", soldierId: "AGN-2024-0302", name: "Rekha Bose", rank: "Sepoy", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", gender: "Female", state: "WB", city: "Howrah", dob: "2003-04-20", joining: "2024-02-15", blood: "O+", phone: "9876503003", email: "rekha.b@army.in", status: "active", medical: "Fit", physical: 79, weapons: 71, mental: 90, combat: 75, attendance: 96, discipline: 94, overall: 84.2, equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Best Academic — 2024"], emergency: { name: "Mina Bose", phone: "9876503004", relation: "Mother" } },
  { id: "13", soldierId: "AGN-2024-0303", name: "Amit Ghosh", rank: "Sepoy", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", gender: "Male", state: "WB", city: "Durgapur", dob: "2002-09-02", joining: "2024-02-15", blood: "A+", phone: "9876503005", email: "amit.g@army.in", status: "active", medical: "Fit", physical: 72, weapons: 65, mental: 68, combat: 69, attendance: 80, discipline: 72, overall: 71, equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Suresh Ghosh", phone: "9876503006", relation: "Father" } },
  { id: "14", soldierId: "AGN-2024-0304", name: "Ranjit Singh", rank: "Lance Naik", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", gender: "Male", state: "Punjab", city: "Ludhiana", dob: "2001-07-25", joining: "2024-02-15", blood: "B+", phone: "9876503007", email: "ranjit.s@army.in", status: "active", medical: "Fit", physical: 90, weapons: 92, mental: 84, combat: 91, attendance: 98, discipline: 95, overall: 91.7, equipment: ["INSAS Rifle", "Combat Uniform", "Ballistic Helmet"], events: ["Best Shooter — Feb 2025"], emergency: { name: "Gurjant Singh", phone: "9876503008", relation: "Father" } },
  { id: "15", soldierId: "AGN-2024-0401", name: "Suresh Patil", rank: "Sepoy", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", gender: "Male", state: "Maharashtra", city: "Pune", dob: "2002-06-18", joining: "2024-03-01", blood: "O+", phone: "9876504001", email: "suresh.p@army.in", status: "active", medical: "Fit", physical: 83, weapons: 79, mental: 76, combat: 81, attendance: 89, discipline: 86, overall: 82.3, equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"], events: ["Sprint Champion — 2024"], emergency: { name: "Ganesh Patil", phone: "9876504002", relation: "Father" } },
  { id: "16", soldierId: "AGN-2024-0402", name: "Rohini Jadhav", rank: "Sepoy", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", gender: "Female", state: "Maharashtra", city: "Nashik", dob: "2003-11-09", joining: "2024-03-01", blood: "A+", phone: "9876504003", email: "rohini.j@army.in", status: "active", medical: "Fit", physical: 76, weapons: 68, mental: 86, combat: 72, attendance: 91, discipline: 90, overall: 79.5, equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Best Mental Resilience — 2024"], emergency: { name: "Sunita Jadhav", phone: "9876504004", relation: "Mother" } },
  { id: "17", soldierId: "AGN-2024-0403", name: "Santosh More", rank: "Sepoy", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", gender: "Male", state: "Maharashtra", city: "Aurangabad", dob: "2002-03-14", joining: "2024-03-01", blood: "B-", phone: "9876504005", email: "santosh.m@army.in", status: "active", medical: "Under Observation (Back)", physical: 70, weapons: 66, mental: 62, combat: 68, attendance: 78, discipline: 70, overall: 69, equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Bhimrao More", phone: "9876504006", relation: "Father" } },
  { id: "18", soldierId: "AGN-2024-0404", name: "Vijay Deshmukh", rank: "Sepoy", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", gender: "Male", state: "Maharashtra", city: "Nagpur", dob: "2001-08-30", joining: "2024-03-01", blood: "A-", phone: "9876504007", email: "vijay.d@army.in", status: "active", medical: "Fit", physical: 88, weapons: 85, mental: 82, combat: 87, attendance: 95, discipline: 92, overall: 88.2, equipment: ["INSAS Rifle", "Combat Uniform", "Ballistic Helmet"], events: ["Best All-Rounder — 2024"], emergency: { name: "Prakash Deshmukh", phone: "9876504008", relation: "Father" } },
]

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════
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
function MiniBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-stone-100">
        <div className={`h-full rounded-full ${bc(value)}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-semibold tabular-nums ${sc(value)}`}>{value}</span>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// SOLDIER DETAIL MODAL — full tabbed profile
// ══════════════════════════════════════════════════════════════
function SoldierDetailModal({ soldier, onClose }: { soldier: Soldier; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "scores" | "personal" | "equipment" | "events">("overview")

  React.useEffect(() => setTab("overview"), [soldier.id])

  const allSorted = [...ALL_SOLDIERS].sort((a, b) => b.overall - a.overall)
  const globalRank = allSorted.findIndex(s => s.id === soldier.id) + 1
  const batSoldiers = ALL_SOLDIERS.filter(s => s.battalion === soldier.battalion)
  const batRank = [...batSoldiers].sort((a, b) => b.overall - a.overall).findIndex(s => s.id === soldier.id) + 1

  const SCORES = [
    { key: "physical", label: "Physical Fitness", icon: <Dumbbell size={12} /> },
    { key: "weapons", label: "Weapons Handling", icon: <Target size={12} /> },
    { key: "mental", label: "Mental Resilience", icon: <Brain size={12} /> },
    { key: "combat", label: "Combat Drills", icon: <Swords size={12} /> },
    { key: "attendance", label: "Attendance", icon: <CalendarDays size={12} /> },
    { key: "discipline", label: "Discipline", icon: <ShieldCheck size={12} /> },
  ]

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "scores", label: "All Scores" },
    { id: "personal", label: "Personal" },
    { id: "equipment", label: "Equipment" },
    { id: "events", label: "Events" },
  ] as const

  const statusMap = {
    active: "border-emerald-200 bg-emerald-50 text-emerald-700",
    on_leave: "border-amber-200 bg-amber-50 text-amber-700",
    inactive: "border-stone-200 bg-stone-50 text-stone-500",
  }
  const statusLabel = { active: "Active", on_leave: "On Leave", inactive: "Inactive" }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl p-0 gap-0">

        {/* ── dark header ── */}
        <div className="bg-[#1a2d4a] px-5 py-5 rounded-t-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-3xl">👤</div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">{soldier.name}</h2>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="font-mono text-[10px] text-orange-300 bg-white/10 px-2 py-0.5 rounded">{soldier.soldierId}</span>
                  <span className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded">{soldier.rank}</span>
                  <span className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded">{soldier.battalionName}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/60">
                  <span>📍 {soldier.city}, {soldier.state}</span>
                  <span>🩸 {soldier.blood}</span>
                  <span>🏥 {soldier.medical}</span>
                  <span>👤 {soldier.gender}</span>
                </div>
              </div>
            </div>
            {/* overall score pill */}
            <div className="shrink-0 text-center">
              <div className={`text-5xl font-black leading-none ${soldier.overall >= 90 ? "text-emerald-400"
                  : soldier.overall >= 80 ? "text-amber-300"
                    : "text-orange-400"
                }`}>{soldier.overall}</div>
              <div className="text-[10px] text-white/50 mt-1">Overall Score</div>
              <div className="text-xs text-white/70 mt-0.5">
                Global <span className="font-bold text-white">#{globalRank}</span> · Bat <span className="font-bold text-white">#{batRank}</span>
              </div>
            </div>
          </div>
          {/* status + grade badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className={`border text-xs font-medium ${statusMap[soldier.status]}`}>
              {statusLabel[soldier.status]}
            </Badge>
            <Badge className={`border text-xs font-semibold ${grade(soldier.overall).c}`}>
              {grade(soldier.overall).l}
            </Badge>
          </div>
        </div>

        {/* ── tab bar ── */}
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`border-b-2 px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${tab === t.id ? "border-[#4a5c2f] text-[#4a5c2f]" : "border-transparent text-stone-400 hover:text-stone-700"
                }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── tab content ── */}
        <div className="p-5 space-y-4">

          {/* OVERVIEW */}
          {tab === "overview" && <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SCORES.map(s => {
                const v = soldier[s.key as keyof Soldier] as number
                return (
                  <div key={s.key} className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                    <div className="flex items-center gap-1 text-[10px] text-stone-400 mb-1.5">{s.icon}{s.label}</div>
                    <div className={`text-2xl font-black ${sc(v)}`}>{v}</div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-200">
                      <div className={`h-full rounded-full ${bc(v)}`} style={{ width: `${v}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Strengths */}
              {SCORES.filter(s => (soldier[s.key as keyof Soldier] as number) >= 85).length > 0 && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <div className="text-xs font-bold text-emerald-700 mb-2">✅ Strengths</div>
                  {SCORES.filter(s => (soldier[s.key as keyof Soldier] as number) >= 85).map(s => (
                    <div key={s.key} className="flex items-center gap-1.5 text-xs text-emerald-700 py-0.5">
                      {s.icon}<span className="font-semibold">{s.label}</span>
                      <span className="ml-auto font-black">{soldier[s.key as keyof Soldier] as number}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Monitor */}
              {SCORES.filter(s => { const v = soldier[s.key as keyof Soldier] as number; return v >= 70 && v < 85 }).length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <div className="text-xs font-bold text-amber-700 mb-2">⚠️ Monitor</div>
                  {SCORES.filter(s => { const v = soldier[s.key as keyof Soldier] as number; return v >= 70 && v < 85 }).map(s => (
                    <div key={s.key} className="flex items-center gap-1.5 text-xs text-amber-700 py-0.5">
                      {s.icon}<span className="font-semibold">{s.label}</span>
                      <span className="ml-auto font-black">{soldier[s.key as keyof Soldier] as number}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Needs work */}
              {SCORES.filter(s => (soldier[s.key as keyof Soldier] as number) < 70).length > 0 && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                  <div className="text-xs font-bold text-rose-700 mb-2">🔧 Needs Work</div>
                  {SCORES.filter(s => (soldier[s.key as keyof Soldier] as number) < 70).map(s => (
                    <div key={s.key} className="flex items-center gap-1.5 text-xs text-rose-700 py-0.5">
                      {s.icon}<span className="font-semibold">{s.label}</span>
                      <span className="ml-auto font-black">{soldier[s.key as keyof Soldier] as number}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>}

          {/* ALL SCORES */}
          {tab === "scores" && (
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    {["Category", "Score", "Grade", "Progress"].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {SCORES.map(s => {
                    const v = soldier[s.key as keyof Soldier] as number
                    const g = grade(v)
                    return (
                      <tr key={s.key} className="hover:bg-stone-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-stone-700">{s.icon}{s.label}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-lg font-black ${sc(v)}`}>{v}</span>
                          <span className="text-xs text-stone-400">/100</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`border text-xs ${g.c}`}>{g.l}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-2 w-32 overflow-hidden rounded-full bg-stone-100">
                            <div className={`h-full rounded-full ${bc(v)}`} style={{ width: `${v}%` }} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="bg-stone-50 border-t-2 border-stone-200">
                    <td className="px-4 py-3 text-sm font-bold text-stone-800">Overall Score</td>
                    <td className="px-4 py-3"><span className={`text-xl font-black ${sc(soldier.overall)}`}>{soldier.overall}</span></td>
                    <td className="px-4 py-3"><Badge className={`border text-xs ${grade(soldier.overall).c}`}>{grade(soldier.overall).l}</Badge></td>
                    <td className="px-4 py-3 text-xs text-stone-400">Global #{globalRank} · Bat #{batRank}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* PERSONAL */}
          {tab === "personal" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Personal info */}
              <div className="rounded-xl border border-stone-200 overflow-hidden">
                <div className="bg-stone-50 border-b border-stone-100 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-stone-500">Personal Information</div>
                {[
                  ["Full Name", soldier.name],
                  ["Date of Birth", new Date(soldier.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })],
                  ["Gender", soldier.gender],
                  ["Blood Group", soldier.blood],
                  ["State", soldier.state],
                  ["City", soldier.city],
                  ["Phone", soldier.phone],
                  ["Email", soldier.email],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                    <span className="text-xs text-stone-400">{k}</span>
                    <span className="text-xs font-medium text-stone-700 text-right max-w-[60%] truncate">{v}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {/* Service */}
                <div className="rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-stone-50 border-b border-stone-100 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-stone-500">Service Details</div>
                  {[
                    ["Soldier ID", soldier.soldierId],
                    ["Rank", soldier.rank],
                    ["Battalion", soldier.battalionName],
                    ["Date of Joining", new Date(soldier.joining).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })],
                    ["Status", statusLabel[soldier.status]],
                    ["Medical", soldier.medical],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                      <span className="text-xs text-stone-400">{k}</span>
                      <span className="text-xs font-medium text-stone-700 text-right max-w-[60%] truncate">{v}</span>
                    </div>
                  ))}
                </div>
                {/* Emergency */}
                <div className="rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-stone-50 border-b border-stone-100 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-stone-500">Emergency Contact</div>
                  {[
                    ["Name", soldier.emergency.name],
                    ["Phone", soldier.emergency.phone],
                    ["Relation", soldier.emergency.relation],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                      <span className="text-xs text-stone-400">{k}</span>
                      <span className="text-xs font-medium text-stone-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EQUIPMENT */}
          {tab === "equipment" && (
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    {["#", "Item", "Type", "Issued", "Condition"].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {soldier.equipment.length === 0 ? (
                    <tr><td colSpan={5} className="py-8 text-center text-sm text-stone-400">No equipment records.</td></tr>
                  ) : soldier.equipment.map((eq, i) => {
                    const type = eq.includes("Rifle") || eq.includes("Goggles") ? "Weapon"
                      : eq.includes("Uniform") || eq.includes("Helmet") ? "Uniform" : "Gear"
                    return (
                      <tr key={i} className="hover:bg-stone-50">
                        <td className="px-4 py-3 font-mono text-xs text-stone-400">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-stone-800">📦 {eq}</td>
                        <td className="px-4 py-3"><Badge className="border border-sky-200 bg-sky-50 text-sky-700 text-xs">{type}</Badge></td>
                        <td className="px-4 py-3 text-xs text-stone-400">15 Jan 2024</td>
                        <td className="px-4 py-3">
                          <Badge className={`border text-xs ${i === 3 ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                            {i === 3 ? "Worn" : "Good"}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* EVENTS */}
          {tab === "events" && (
            <div className="space-y-3">
              {soldier.events.length === 0 ? (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-10 text-center text-sm text-stone-400">
                  No events or awards recorded yet.
                </div>
              ) : soldier.events.map((ev, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
                  <Trophy size={16} className="mt-0.5 shrink-0 text-amber-500" />
                  <div>
                    <div className="text-sm font-semibold text-stone-800">{ev}</div>
                    <div className="text-xs text-stone-400 mt-0.5">Achievement · Agniveer Service Record</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* close footer */}
        <div className="border-t border-stone-100 bg-stone-50 px-5 py-3 rounded-b-xl flex justify-end">
          <Button variant="outline" onClick={onClose} className="text-sm">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ══════════════════════════════════════════════════════════════
// BATTALION SOLDIERS VIEW (inline, replaces battalion grid)
// ══════════════════════════════════════════════════════════════
function BattalionSoldiersView({ battalion, onBack, onSoldierClick }: {
  battalion: Battalion
  onBack: () => void
  onSoldierClick: (s: Soldier) => void
}) {
  const [search, setSearch] = useState("")
  const soldiers = ALL_SOLDIERS.filter(s => s.battalion === battalion.code)
  const filtered = soldiers.filter(s =>
    !search ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.soldierId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-500">
        <button onClick={onBack} className="flex items-center gap-1 hover:text-stone-800 transition-colors font-medium">
          <ChevronLeft size={14} /> All Battalions
        </button>
        <ChevronRight size={12} className="text-stone-300" />
        <span className="font-semibold text-stone-800">{battalion.name}</span>
      </div>

      {/* Battalion header card */}
      <Card className={`border-l-4 border-stone-200 ${battalion.accentColor} bg-white shadow-sm`}>
        <CardContent className="px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">{battalion.name}</h2>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                <span className="font-mono text-xs font-semibold text-stone-400">{battalion.code}</span>
                <span className="flex items-center gap-0.5 text-xs text-stone-500"><MapPin size={10} />{battalion.location}</span>
                <span className="text-xs text-stone-500">Cmd: {battalion.commander}</span>
              </div>
            </div>
            <div className="flex gap-5">
              {[
                { label: "Total", value: soldiers.length, icon: <Users size={13} className="text-stone-400" /> },
                { label: "Active", value: soldiers.filter(s => s.status === "active").length, icon: <UserCheck size={13} className="text-emerald-500" /> },
                { label: "On Leave", value: soldiers.filter(s => s.status === "on_leave").length, icon: <UserMinus size={13} className="text-amber-500" /> },
                { label: "Score≥85", value: soldiers.filter(s => s.overall >= 85).length, icon: <Star size={13} className="text-[#4a5c2f]" /> },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center gap-0.5">
                  {stat.icon}
                  <span className="text-lg font-bold text-stone-800">{stat.value}</span>
                  <span className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="text-right shrink-0">
              <div className={`text-3xl font-black ${sc(battalion.score)}`}>{battalion.score}</div>
              <div className="text-xs text-stone-400">Avg. Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search + hint */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={13} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search name or soldier ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs border-stone-200 bg-white"
          />
        </div>
        <span className="text-xs text-stone-400">{filtered.length} of {soldiers.length} soldiers</span>
        <span className="ml-auto text-xs text-stone-400 hidden sm:block">👆 Click any row to view full profile</span>
      </div>

      {/* Soldiers table — clickable rows */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                {["Soldier ID", "Name", "Rank", "Physical", "Weapons", "Mental", "Combat", "Attend.", "Discip.", "Overall", "Grade", "Status"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-sm text-stone-400">
                    No soldiers match your search.
                  </td>
                </tr>
              ) : filtered.map(s => (
                <tr
                  key={s.id}
                  onClick={() => onSoldierClick(s)}
                  className={`cursor-pointer transition-colors hover:bg-[#f0f5e8] active:bg-[#e4eedd] ${s.overall >= 90 ? "bg-emerald-50/20" : s.overall < 70 ? "bg-rose-50/20" : ""
                    }`}
                >
                  <td className="px-3 py-3 font-mono text-xs text-stone-400 whitespace-nowrap">{s.soldierId}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="font-semibold text-[#1a2d4a] hover:underline">{s.name}</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-stone-500">{s.rank}</td>
                  <td className="px-3 py-3"><MiniBar value={s.physical} /></td>
                  <td className="px-3 py-3"><MiniBar value={s.weapons} /></td>
                  <td className="px-3 py-3"><MiniBar value={s.mental} /></td>
                  <td className="px-3 py-3"><MiniBar value={s.combat} /></td>
                  <td className="px-3 py-3"><MiniBar value={s.attendance} /></td>
                  <td className="px-3 py-3"><MiniBar value={s.discipline} /></td>
                  <td className="px-3 py-3">
                    <span className={`text-lg font-black ${sc(s.overall)}`}>{s.overall}</span>
                  </td>
                  <td className="px-3 py-3">
                    <Badge className={`border text-xs ${grade(s.overall).c}`}>{grade(s.overall).l}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge className={`border text-xs ${s.status === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : s.status === "on_leave" ? "border-amber-200 bg-amber-50 text-amber-700"
                          : "border-stone-200 bg-stone-50 text-stone-500"
                      }`}>
                      {s.status === "active" ? "Active" : s.status === "on_leave" ? "On Leave" : "Inactive"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2.5 text-xs text-stone-400">
          {filtered.length} soldier{filtered.length !== 1 ? "s" : ""} · Click any row to view complete profile
        </div>
      </Card>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// BATTALION CARD
// ══════════════════════════════════════════════════════════════
function BattalionCard({ bat, onEdit, onViewSoldiers }: {
  bat: Battalion
  onEdit: () => void
  onViewSoldiers: () => void
}) {
  return (
    <Card className={`border-l-4 border-stone-200 ${bat.accentColor} bg-white shadow-sm transition-all hover:shadow-md flex flex-col`}>
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold leading-tight text-stone-900">{bat.name}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-mono text-xs font-semibold text-stone-400">{bat.code}</span>
              <span className="text-xs text-stone-300">·</span>
              <span className="flex items-center gap-0.5 text-xs text-stone-500">
                <MapPin size={10} className="text-rose-400" /> {bat.location}
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
              <Shield size={10} /> Cmd: {bat.commander}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className={`text-3xl font-black ${sc(bat.score)}`}>{bat.score}</p>
            <Badge className="border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700">{bat.status}</Badge>
          </div>
        </div>

        {/* Soldier stats */}
        <div className="grid grid-cols-4 gap-2 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2.5">
          {[
            { label: "Total", value: bat.total, icon: <Users size={13} className="text-stone-400" /> },
            { label: "Active", value: bat.active, icon: <UserCheck size={13} className="text-emerald-500" /> },
            { label: "On Leave", value: bat.onLeave, icon: <UserMinus size={13} className="text-amber-500" /> },
            { label: "Score≥85", value: bat.scoreAbove85, icon: <Star size={13} className="text-[#4a5c2f]" /> },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              {s.icon}
              <span className="text-lg font-bold text-stone-800">{s.value}</span>
              <span className="text-center text-[9px] font-medium leading-tight tracking-wide text-stone-400 uppercase">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Score bars */}
        <div className="space-y-2.5">
          {[
            { label: "Physical", value: bat.physical },
            { label: "Weapons", value: bat.weapons },
            { label: "Mental", value: bat.mental },
          ].map(bar => (
            <div key={bar.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">{bar.label}</span>
                <span className={`text-xs font-bold ${sc(bar.value)}`}>{bar.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div className={`h-full rounded-full transition-all duration-700 ${bc(bar.value)}`} style={{ width: `${bar.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex gap-2 pt-1">
          <Button
            onClick={onViewSoldiers}
            className="h-9 flex-1 gap-1.5 bg-[#1a2d4a] text-xs text-white hover:bg-[#243d61]"
          >
            <Users size={13} /> View Soldiers <ChevronRight size={12} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
            onClick={onEdit}
          >
            <Pencil size={12} /> Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ══════════════════════════════════════════════════════════════
// EDIT BATTALION DIALOG
// ══════════════════════════════════════════════════════════════
function EditDialog({ bat, open, onClose, onSave }: {
  bat: Battalion | null; open: boolean; onClose: () => void; onSave: (b: Battalion) => void
}) {
  const [form, setForm] = useState<Battalion | null>(bat)
  React.useEffect(() => setForm(bat), [bat])
  if (!form) return null
  const set = (k: keyof Battalion, v: string | number) =>
    setForm(f => (f ? { ...f, [k]: v } : f))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-stone-800">
            <Pencil size={15} className="text-[#4a5c2f]" /> Edit — {form.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Battalion Name</Label>
            <Input value={form.name} onChange={e => set("name", e.target.value)} className="text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Code</Label>
            <Input value={form.code} onChange={e => set("code", e.target.value)} className="text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Location</Label>
            <Input value={form.location} onChange={e => set("location", e.target.value)} className="text-sm" />
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Commander</Label>
            <Input value={form.commander} onChange={e => set("commander", e.target.value)} className="text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Physical Score</Label>
            <Input type="number" value={form.physical} onChange={e => set("physical", +e.target.value)} className="text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Weapons Score</Label>
            <Input type="number" value={form.weapons} onChange={e => set("weapons", +e.target.value)} className="text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Mental Score</Label>
            <Input type="number" value={form.mental} onChange={e => set("mental", +e.target.value)} className="text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Total Soldiers</Label>
            <Input type="number" value={form.total} onChange={e => set("total", +e.target.value)} className="text-sm" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-sm">Cancel</Button>
          <Button
            className="bg-[#4a5c2f] text-sm text-white hover:bg-[#3a4a22]"
            onClick={() => {
              const avg = Math.round(((form.physical + form.weapons + form.mental) / 3) * 10) / 10
              onSave({ ...form, score: avg })
              onClose()
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ══════════════════════════════════════════════════════════════
// PAGE ROOT
// ══════════════════════════════════════════════════════════════
type View = "grid" | "soldiers"

export default function BattalionsPage() {
  const [battalions, setBattalions] = useState<Battalion[]>(BATTALIONS)
  const [search, setSearch] = useState("")
  const [editBat, setEditBat] = useState<Battalion | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // drill-down state
  const [view, setView] = useState<View>("grid")
  const [activeBattalion, setActiveBattalion] = useState<Battalion | null>(null)
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null)
  const [soldierModalOpen, setSoldierModalOpen] = useState(false)

  const filtered = battalions.filter(b =>
    !search ||
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.code.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  )

  const totalSoldiers = battalions.reduce((s, b) => s + b.total, 0)
  const avgScore = Math.round(battalions.reduce((s, b) => s + b.score, 0) / battalions.length * 10) / 10
  const totalActive = battalions.reduce((s, b) => s + b.active, 0)

  const handleViewSoldiers = (bat: Battalion) => {
    setActiveBattalion(bat)
    setView("soldiers")
  }
  const handleSoldierClick = (s: Soldier) => {
    setSelectedSoldier(s)
    setSoldierModalOpen(true)
  }
  const handleBack = () => {
    setView("grid")
    setActiveBattalion(null)
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">

      {/* Edit Battalion dialog */}
      <EditDialog
        bat={editBat}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={updated => setBattalions(prev => prev.map(b => b.id === updated.id ? updated : b))}
      />

      {/* Soldier detail modal */}
      {selectedSoldier && (
        <SoldierDetailModal
          soldier={selectedSoldier}
          onClose={() => { setSoldierModalOpen(false); setSelectedSoldier(null) }}
        />
      )}

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              <Building2 size={20} className="text-[#4a5c2f]" />
              {view === "soldiers" && activeBattalion ? activeBattalion.name : "All Battalions"}
            </h1>
            <p className="mt-0.5 text-xs text-stone-500">
              {view === "soldiers" && activeBattalion
                ? `${ALL_SOLDIERS.filter(s => s.battalion === activeBattalion.code).length} soldiers · Click any row for full profile`
                : "Click View Soldiers on any battalion to drill down"}
            </p>
          </div>

          {view === "soldiers" ? (
            <Button variant="outline" size="sm" onClick={handleBack} className="gap-1.5 text-xs">
              <ChevronLeft size={13} /> All Battalions
            </Button>
          ) : (
              <Button className="gap-2 bg-[#4a5c2f] text-sm text-white shadow-sm hover:bg-[#3a4a22]">
                <Plus size={15} /> Create Battalion
              </Button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-5 px-4 py-5 sm:px-6 lg:px-8">

        {/* ══════ GRID VIEW ══════ */}
        {view === "grid" && (<>
          {/* Summary strip */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Battalions", value: battalions.length, icon: <Building2 size={15} />, color: "text-stone-700" },
              { label: "Total Soldiers", value: totalSoldiers, icon: <Users size={15} />, color: "text-sky-600" },
              { label: "Active Duty", value: totalActive, icon: <UserCheck size={15} />, color: "text-emerald-600" },
              { label: "Avg. Score", value: avgScore, icon: <TrendingUp size={15} />, color: "text-amber-600" },
            ].map(s => (
              <Card key={s.label} className="border-stone-200 bg-white shadow-sm">
                <CardContent className="flex items-center gap-3 px-4 pt-4 pb-3">
                  <div className={s.color}>{s.icon}</div>
                  <div>
                    <p className="text-xs text-stone-400">{s.label}</p>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative w-full max-w-xs">
              <Search size={13} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400" />
              <Input
                placeholder="Search battalion, code, location…"
                className="h-8 border-stone-200 bg-white pl-8 text-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <p className="ml-auto text-xs text-stone-400">{filtered.length} of {battalions.length} battalions</p>
          </div>

          {/* Battalion cards */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-stone-400">No battalions match your search.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filtered.map(bat => (
                <BattalionCard
                  key={bat.id}
                  bat={bat}
                  onEdit={() => { setEditBat(bat); setDialogOpen(true) }}
                  onViewSoldiers={() => handleViewSoldiers(bat)}
                />
              ))}
            </div>
          )}
        </>)}

        {/* ══════ SOLDIERS VIEW ══════ */}
        {view === "soldiers" && activeBattalion && (
          <BattalionSoldiersView
            battalion={activeBattalion}
            onBack={handleBack}
            onSoldierClick={handleSoldierClick}
          />
        )}
      </div>
    </div>
  )
}