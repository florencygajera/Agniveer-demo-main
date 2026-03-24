"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Users,
  Shield,
  TrendingUp,
  Building2,
  FileText,
  AlertTriangle,
  Trophy,
  Medal,
  ChevronRight,
  ChevronLeft,
  Activity,
  MapPin,
  UserCheck,
  UserMinus,
  Star,
  Search,
  Dumbbell,
  Target,
  Brain,
  Swords,
  CalendarDays,
  ShieldCheck,
  Home,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Grade = "Outstanding" | "Good" | "Average" | "Needs Improvement"
type SoldierStatus = "active" | "on_leave" | "inactive"

interface Soldier {
  id: string; name: string; rank: string; gender: string
  battalion: string; battalionName: string
  state: string; city: string; dob: string; joining: string
  blood: string; phone: string; email: string
  status: SoldierStatus; medical: string
  physical: number; weapons: number; mental: number; combat: number
  attendance: number; discipline: number; overall: number; grade: Grade
  equipment: string[]; events: string[]
  emergency: { name: string; phone: string; relation: string }
}

interface Battalion {
  id: string; code: string; name: string; location: string; commander: string
  score: number; total: number; active: number; onLeave: number; scoreAbove85: number
  physical: number; weapons: number; mental: number
  accentColor: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const BATTALIONS: Battalion[] = [
  { id: "RR-1", code: "RR-1", name: "1st Rajputana Rifles", location: "Jaipur, Rajasthan", commander: "Col. R.K. Verma", score: 84.7, total: 6, active: 5, onLeave: 1, scoreAbove85: 3, physical: 83, weapons: 82, mental: 80, accentColor: "border-l-[#4a5c2f]" },
  { id: "PARA-2", code: "PARA-2", name: "2nd Parachute Regiment", location: "Agra, Uttar Pradesh", commander: "Col. S.P. Mehta", score: 84.4, total: 4, active: 4, onLeave: 0, scoreAbove85: 3, physical: 84, weapons: 79, mental: 82, accentColor: "border-l-violet-500" },
  { id: "BEN-3", code: "BEN-3", name: "3rd Bengal Regiment", location: "Kolkata, West Bengal", commander: "Col. D.K. Roy", score: 83.2, total: 4, active: 4, onLeave: 0, scoreAbove85: 2, physical: 82, weapons: 77, mental: 81, accentColor: "border-l-sky-500" },
  { id: "MAR-4", code: "MAR-4", name: "4th Maratha Light Infantry", location: "Pune, Maharashtra", commander: "Col. V.B. Patil", score: 80.0, total: 4, active: 4, onLeave: 0, scoreAbove85: 1, physical: 79, weapons: 75, mental: 77, accentColor: "border-l-amber-500" },
]

const SOLDIERS: Soldier[] = [
  { id: "AGN-2024-0101", name: "Rajveer Singh Chauhan", rank: "Sepoy", gender: "Male", battalion: "RR-1", battalionName: "1st Rajputana Rifles", state: "Rajasthan", city: "Jodhpur", dob: "2003-04-12", joining: "2024-01-15", blood: "B+", phone: "9876501001", email: "rajveer@army.in", status: "active", medical: "Fit", physical: 91, weapons: 88, mental: 78, combat: 89, attendance: 96, discipline: 92, overall: 89, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack", "Ballistic Helmet"], events: ["Won 200m Sprint — Batch Rally 2024", "Best Shooter Award — March 2025"], emergency: { name: "Ratan Singh", phone: "9876501002", relation: "Father" } },
  { id: "AGN-2024-0102", name: "Priya Sharma", rank: "Sepoy", gender: "Female", battalion: "RR-1", battalionName: "1st Rajputana Rifles", state: "Rajasthan", city: "Jaipur", dob: "2002-08-22", joining: "2024-01-15", blood: "A+", phone: "9876501003", email: "priya.sharma@army.in", status: "active", medical: "Fit", physical: 85, weapons: 72, mental: 94, combat: 80, attendance: 98, discipline: 95, overall: 87.3, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Top Mental Resilience — Batch 2024", "Academic Excellence Award"], emergency: { name: "Meena Sharma", phone: "9876501004", relation: "Mother" } },
  { id: "AGN-2024-0103", name: "Arjun Mehra", rank: "Lance Naik", gender: "Male", battalion: "RR-1", battalionName: "1st Rajputana Rifles", state: "Punjab", city: "Amritsar", dob: "2001-11-05", joining: "2024-01-15", blood: "O+", phone: "9876501005", email: "arjun.mehra@army.in", status: "active", medical: "Fit", physical: 96, weapons: 94, mental: 88, combat: 95, attendance: 100, discipline: 97, overall: 95, grade: "Outstanding", equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack", "Ballistic Helmet", "Night Vision Goggles"], events: ["Battalion Champion — Physical 2024", "All India #1 — March 2025"], emergency: { name: "Gurpreet Mehra", phone: "9876501006", relation: "Father" } },
  { id: "AGN-2024-0104", name: "Sunil Kumar", rank: "Sepoy", gender: "Male", battalion: "RR-1", battalionName: "1st Rajputana Rifles", state: "Haryana", city: "Rohtak", dob: "2003-02-18", joining: "2024-01-15", blood: "AB+", phone: "9876501007", email: "sunil.k@army.in", status: "active", medical: "Fit (Ankle — Recovered)", physical: 68, weapons: 72, mental: 65, combat: 70, attendance: 82, discipline: 75, overall: 72, grade: "Average", equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Ram Kumar", phone: "9876501008", relation: "Father" } },
  { id: "AGN-2024-0105", name: "Kavita Rajput", rank: "Sepoy", gender: "Female", battalion: "RR-1", battalionName: "1st Rajputana Rifles", state: "UP", city: "Lucknow", dob: "2002-06-30", joining: "2024-01-15", blood: "B-", phone: "9876501009", email: "kavita.r@army.in", status: "on_leave", medical: "Fit", physical: 78, weapons: 74, mental: 82, combat: 76, attendance: 88, discipline: 85, overall: 80.5, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Best Female Recruit — Batch 2024"], emergency: { name: "Sunita Rajput", phone: "9876501010", relation: "Mother" } },
  { id: "AGN-2024-0106", name: "Mahesh Choudhary", rank: "Sepoy", gender: "Male", battalion: "RR-1", battalionName: "1st Rajputana Rifles", state: "Rajasthan", city: "Bikaner", dob: "2003-09-14", joining: "2024-01-15", blood: "O-", phone: "9876501011", email: "mahesh.c@army.in", status: "active", medical: "Fit", physical: 82, weapons: 91, mental: 70, combat: 84, attendance: 91, discipline: 88, overall: 84.3, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"], events: ["Best Shooter — Jan 2025"], emergency: { name: "Ramesh Choudhary", phone: "9876501012", relation: "Father" } },
  { id: "AGN-2024-0201", name: "Vikram Nair", rank: "Sepoy", gender: "Male", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", state: "Kerala", city: "Thiruvananthapuram", dob: "2002-03-25", joining: "2024-02-01", blood: "A+", phone: "9876502001", email: "vikram.n@army.in", status: "active", medical: "Fit", physical: 94, weapons: 88, mental: 86, combat: 93, attendance: 97, discipline: 94, overall: 92, grade: "Outstanding", equipment: ["INSAS Rifle", "Para Suit", "Combat Uniform", "Tactical Backpack"], events: ["Jump Certified — Mar 2024", "Best Para Recruit — 2024"], emergency: { name: "Suresh Nair", phone: "9876502002", relation: "Father" } },
  { id: "AGN-2024-0202", name: "Ananya Krishnan", rank: "Sepoy", gender: "Female", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", state: "Tamil Nadu", city: "Chennai", dob: "2003-07-11", joining: "2024-02-01", blood: "B+", phone: "9876502003", email: "ananya.k@army.in", status: "active", medical: "Fit", physical: 80, weapons: 75, mental: 91, combat: 78, attendance: 95, discipline: 96, overall: 85.8, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Top Academic Score — 2024"], emergency: { name: "Kavitha Krishnan", phone: "9876502004", relation: "Mother" } },
  { id: "AGN-2024-0203", name: "Rohit Sharma", rank: "Sepoy", gender: "Male", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", state: "MP", city: "Bhopal", dob: "2002-12-01", joining: "2024-02-01", blood: "O+", phone: "9876502005", email: "rohit.s@army.in", status: "active", medical: "Under Observation (Knee)", physical: 75, weapons: 69, mental: 72, combat: 71, attendance: 79, discipline: 74, overall: 73.3, grade: "Average", equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Mahesh Sharma", phone: "9876502006", relation: "Father" } },
  { id: "AGN-2024-0204", name: "Deepak Yadav", rank: "Sepoy", gender: "Male", battalion: "PARA-2", battalionName: "2nd Parachute Regiment", state: "Bihar", city: "Patna", dob: "2003-05-19", joining: "2024-02-01", blood: "A-", phone: "9876502007", email: "deepak.y@army.in", status: "active", medical: "Fit", physical: 88, weapons: 82, mental: 79, combat: 86, attendance: 93, discipline: 90, overall: 86.3, grade: "Good", equipment: ["INSAS Rifle", "Para Suit", "Combat Uniform"], events: ["Jump Certified — Apr 2024"], emergency: { name: "Sanjay Yadav", phone: "9876502008", relation: "Father" } },
  { id: "AGN-2024-0301", name: "Sourav Das", rank: "Sepoy", gender: "Male", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", state: "WB", city: "Kolkata", dob: "2002-01-14", joining: "2024-02-15", blood: "B+", phone: "9876503001", email: "sourav.d@army.in", status: "active", medical: "Fit", physical: 86, weapons: 80, mental: 83, combat: 85, attendance: 94, discipline: 88, overall: 86, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"], events: ["Best Combat Drill — Mar 2025"], emergency: { name: "Tapan Das", phone: "9876503002", relation: "Father" } },
  { id: "AGN-2024-0302", name: "Rekha Bose", rank: "Sepoy", gender: "Female", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", state: "WB", city: "Howrah", dob: "2003-04-20", joining: "2024-02-15", blood: "O+", phone: "9876503003", email: "rekha.b@army.in", status: "active", medical: "Fit", physical: 79, weapons: 71, mental: 90, combat: 75, attendance: 96, discipline: 94, overall: 84.2, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Best Academic — 2024"], emergency: { name: "Mina Bose", phone: "9876503004", relation: "Mother" } },
  { id: "AGN-2024-0303", name: "Amit Ghosh", rank: "Sepoy", gender: "Male", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", state: "WB", city: "Durgapur", dob: "2002-09-02", joining: "2024-02-15", blood: "A+", phone: "9876503005", email: "amit.g@army.in", status: "active", medical: "Fit", physical: 72, weapons: 65, mental: 68, combat: 69, attendance: 80, discipline: 72, overall: 71, grade: "Average", equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Suresh Ghosh", phone: "9876503006", relation: "Father" } },
  { id: "AGN-2024-0304", name: "Ranjit Singh", rank: "Lance Naik", gender: "Male", battalion: "BEN-3", battalionName: "3rd Bengal Regiment", state: "Punjab", city: "Ludhiana", dob: "2001-07-25", joining: "2024-02-15", blood: "B+", phone: "9876503007", email: "ranjit.s@army.in", status: "active", medical: "Fit", physical: 90, weapons: 92, mental: 84, combat: 91, attendance: 98, discipline: 95, overall: 91.7, grade: "Outstanding", equipment: ["INSAS Rifle", "Combat Uniform", "Ballistic Helmet"], events: ["Best Shooter — Feb 2025"], emergency: { name: "Gurjant Singh", phone: "9876503008", relation: "Father" } },
  { id: "AGN-2024-0401", name: "Suresh Patil", rank: "Sepoy", gender: "Male", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", state: "Maharashtra", city: "Pune", dob: "2002-06-18", joining: "2024-03-01", blood: "O+", phone: "9876504001", email: "suresh.p@army.in", status: "active", medical: "Fit", physical: 83, weapons: 79, mental: 76, combat: 81, attendance: 89, discipline: 86, overall: 82.3, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"], events: ["Sprint Champion — 2024"], emergency: { name: "Ganesh Patil", phone: "9876504002", relation: "Father" } },
  { id: "AGN-2024-0402", name: "Rohini Jadhav", rank: "Sepoy", gender: "Female", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", state: "Maharashtra", city: "Nashik", dob: "2003-11-09", joining: "2024-03-01", blood: "A+", phone: "9876504003", email: "rohini.j@army.in", status: "active", medical: "Fit", physical: 76, weapons: 68, mental: 86, combat: 72, attendance: 91, discipline: 90, overall: 79.5, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform"], events: ["Best Mental Resilience — 2024"], emergency: { name: "Sunita Jadhav", phone: "9876504004", relation: "Mother" } },
  { id: "AGN-2024-0403", name: "Santosh More", rank: "Sepoy", gender: "Male", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", state: "Maharashtra", city: "Aurangabad", dob: "2002-03-14", joining: "2024-03-01", blood: "B-", phone: "9876504005", email: "santosh.m@army.in", status: "active", medical: "Under Observation (Back)", physical: 70, weapons: 66, mental: 62, combat: 68, attendance: 78, discipline: 70, overall: 69, grade: "Needs Improvement", equipment: ["INSAS Rifle", "Combat Uniform"], events: [], emergency: { name: "Bhimrao More", phone: "9876504006", relation: "Father" } },
  { id: "AGN-2024-0404", name: "Vijay Deshmukh", rank: "Sepoy", gender: "Male", battalion: "MAR-4", battalionName: "4th Maratha Light Infantry", state: "Maharashtra", city: "Nagpur", dob: "2001-08-30", joining: "2024-03-01", blood: "A-", phone: "9876504007", email: "vijay.d@army.in", status: "active", medical: "Fit", physical: 88, weapons: 85, mental: 82, combat: 87, attendance: 95, discipline: 92, overall: 88.2, grade: "Good", equipment: ["INSAS Rifle", "Combat Uniform", "Ballistic Helmet"], events: ["Best All-Rounder — 2024"], emergency: { name: "Prakash Deshmukh", phone: "9876504008", relation: "Father" } },
]

const SUMMARY_STATS = [
  { label: "Total Agniveers", value: 18, sub: "Across all battalions", icon: <Users size={20} />, accent: "text-sky-600" },
  { label: "Active Duty", value: 17, sub: "1 on leave", icon: <Shield size={20} />, accent: "text-amber-500" },
  { label: "Avg. Performance", value: "83.2", sub: "Out of 100", icon: <TrendingUp size={20} />, accent: "text-emerald-600" },
  { label: "Active Battalions", value: 4, sub: "Operational units", icon: <Building2 size={20} />, accent: "text-violet-600" },
  { label: "Pending Applications", value: 3, sub: "Need review", icon: <FileText size={20} />, accent: "text-rose-500" },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreColor(s: number) {
  if (s >= 90) return "text-emerald-600"
  if (s >= 80) return "text-[#4a5c2f]"
  if (s >= 70) return "text-amber-600"
  return "text-rose-500"
}

function barColor(s: number) {
  if (s >= 90) return "bg-emerald-500"
  if (s >= 80) return "bg-[#4a5c2f]"
  if (s >= 70) return "bg-amber-500"
  return "bg-rose-500"
}

function GradeBadge({ grade }: { grade: Grade }) {
  const map: Record<Grade, string> = {
    Outstanding: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Good: "bg-sky-100 text-sky-700 border-sky-200",
    Average: "bg-amber-100 text-amber-700 border-amber-200",
    "Needs Improvement": "bg-rose-100 text-rose-600 border-rose-200",
  }
  return <Badge className={`border text-xs font-semibold ${map[grade]}`}>{grade}</Badge>
}

function StatusBadge({ status }: { status: SoldierStatus }) {
  const map = { active: "bg-emerald-50 text-emerald-700 border-emerald-200", on_leave: "bg-amber-50 text-amber-700 border-amber-200", inactive: "bg-stone-50 text-stone-500 border-stone-200" }
  const labels = { active: "Active", on_leave: "On Leave", inactive: "Inactive" }
  return <Badge className={`border text-xs font-medium ${map[status]}`}>{labels[status]}</Badge>
}

function MiniBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-stone-100">
        <div className={`h-full rounded-full ${barColor(value)}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-semibold tabular-nums ${scoreColor(value)}`}>{value}</span>
    </div>
  )
}

// ── Soldier Detail Modal ──────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════
// Needs Attention Modal - Shows why soldier needs attention and how to improve
// ═══════════════════════════════════════════════════════════════

function getWeakAreas(soldier: Soldier) {
  const areas = []
  if (soldier.physical < 70) areas.push({ key: "physical", label: "Physical Fitness", value: soldier.physical, threshold: 70 })
  if (soldier.weapons < 70) areas.push({ key: "weapons", label: "Weapons Handling", value: soldier.weapons, threshold: 70 })
  if (soldier.mental < 70) areas.push({ key: "mental", label: "Mental Resilience", value: soldier.mental, threshold: 70 })
  if (soldier.combat < 70) areas.push({ key: "combat", label: "Combat Drills", value: soldier.combat, threshold: 70 })
  if (soldier.attendance < 85) areas.push({ key: "attendance", label: "Attendance", value: soldier.attendance, threshold: 85 })
  if (soldier.discipline < 70) areas.push({ key: "discipline", label: "Discipline", value: soldier.discipline, threshold: 70 })
  return areas
}

function getRecommendations(soldier: Soldier, weakAreas: ReturnType<typeof getWeakAreas>) {
  const recs: { area: string; tip: string; icon: React.ReactNode }[] = []
  
  weakAreas.forEach(area => {
    if (area.key === "physical") {
      recs.push({ 
        area: "Physical Fitness", 
        tip: "Daily 5km timed run, strength circuit 3×/week. Target +8 pts in 4 weeks. Add sprint intervals twice weekly.",
        icon: <Dumbbell size={14} />
      })
    }
    if (area.key === "weapons") {
      recs.push({ 
        area: "Weapons Handling", 
        tip: "Daily dry-fire drills, increase live range sessions to 3×/week. Focus on trigger control and reload speed.",
        icon: <Target size={14} />
      })
    }
    if (area.key === "mental") {
      recs.push({ 
        area: "Mental Resilience", 
        tip: "Weekly counselling, 20 min daily meditation. Group problem-solving workshops recommended.",
        icon: <Brain size={14} />
      })
    }
    if (area.key === "combat") {
      recs.push({ 
        area: "Combat Drills", 
        tip: "Extra obstacle course 3×/week. Buddy-training exercises mandatory. Night navigation practice.",
        icon: <Swords size={14} />
      })
    }
    if (area.key === "attendance") {
      recs.push({ 
        area: "Attendance", 
        tip: "Mandatory counselling, investigate health issues. Ensure all absences documented and justified promptly.",
        icon: <CalendarDays size={14} />
      })
    }
    if (area.key === "discipline") {
      recs.push({ 
        area: "Discipline", 
        tip: "One-on-one counselling sessions. Review conduct expectations. Assign senior mentor for guidance.",
        icon: <ShieldCheck size={14} />
      })
    }
  })
  
  // Add general recommendations if overall is low
  if (soldier.overall < 70) {
    recs.push({
      area: "General",
      tip: "Assign senior Lance Naik as buddy trainer. Schedule weekly progress reviews. Consider reduced physical load initially.",
      icon: <Star size={14} />
    })
  }
  
  return recs
}

function NeedsAttentionModal({ soldier, open, onClose }: {
  soldier: Soldier | null; open: boolean; onClose: () => void
}) {
  if (!soldier) return null
  
  const weakAreas = getWeakAreas(soldier)
  const recommendations = getRecommendations(soldier, weakAreas)
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">
        
        {/* Header */}
        <div className="bg-rose-600 px-5 py-4 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <AlertTriangle size={20} /> Needs Attention
              </h2>
              <p className="text-white/70 text-sm mt-1">{soldier.name} · {soldier.battalionName}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white">{soldier.overall}</div>
              <div className="text-[10px] text-white/60">Overall Score</div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-5">
          
          {/* Why Needs Attention */}
          <div>
            <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Why Attention Needed
            </h3>
            <div className="space-y-2">
              {weakAreas.map(area => (
                <div key={area.key} className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50 p-3">
                  <div className="flex items-center gap-2">
                    {area.key === "physical" && <Dumbbell size={14} className="text-rose-600" />}
                    {area.key === "weapons" && <Target size={14} className="text-rose-600" />}
                    {area.key === "mental" && <Brain size={14} className="text-rose-600" />}
                    {area.key === "combat" && <Swords size={14} className="text-rose-600" />}
                    {area.key === "attendance" && <CalendarDays size={14} className="text-rose-600" />}
                    {area.key === "discipline" && <ShieldCheck size={14} className="text-rose-600" />}
                    <span className="text-sm font-medium text-stone-700">{area.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-rose-600">{area.value}</span>
                    <span className="text-xs text-stone-400">/ {area.threshold}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommendations */}
          <div>
            <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Recommended Actions
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <div className="mt-0.5 text-emerald-600 shrink-0">{rec.icon}</div>
                  <div>
                    <div className="text-xs font-bold text-emerald-700">{rec.area}</div>
                    <div className="text-xs text-stone-600 mt-0.5">{rec.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1 bg-rose-600 hover:bg-rose-700 text-xs" onClick={onClose}>
              Acknowledge
            </Button>
            <Button variant="outline" className="flex-1 text-xs" onClick={onClose}>
              Schedule Review
            </Button>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ═══════════════════════════════════════════════════════════════
// Soldier Detail Modal
// ═══════════════════════════════════════════════════════════════

function SoldierDetailModal({ soldier, open, onClose }: {
  soldier: Soldier | null; open: boolean; onClose: () => void
}) {
  const [tab, setTab] = useState<"overview" | "scores" | "personal" | "equipment" | "events">("overview")

  React.useEffect(() => { if (open) setTab("overview") }, [open])

  if (!soldier) return null

  const globalRank = [...SOLDIERS].sort((a, b) => b.overall - a.overall).findIndex(s => s.id === soldier.id) + 1
  const batSoldiers = SOLDIERS.filter(s => s.battalion === soldier.battalion)
  const batRank = [...batSoldiers].sort((a, b) => b.overall - a.overall).findIndex(s => s.id === soldier.id) + 1

  const scores = [
    { label: "Physical Fitness", key: "physical", value: soldier.physical, icon: <Dumbbell size={12} /> },
    { label: "Weapons Handling", key: "weapons", value: soldier.weapons, icon: <Target size={12} /> },
    { label: "Mental Resilience", key: "mental", value: soldier.mental, icon: <Brain size={12} /> },
    { label: "Combat Drills", key: "combat", value: soldier.combat, icon: <Swords size={12} /> },
    { label: "Attendance", key: "attendance", value: soldier.attendance, icon: <CalendarDays size={12} /> },
    { label: "Discipline", key: "discipline", value: soldier.discipline, icon: <ShieldCheck size={12} /> },
  ]

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "scores", label: "All Scores" },
    { id: "personal", label: "Personal" },
    { id: "equipment", label: "Equipment" },
    { id: "events", label: "Events" },
  ] as const

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl p-0 gap-0">

        {/* ── Header strip ── */}
        <div className="bg-[#1a2d4a] px-5 py-4 text-white rounded-t-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-2xl">👤</div>
              <div>
                <h2 className="text-lg font-bold leading-tight">{soldier.name}</h2>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px]">{soldier.id}</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px]">{soldier.rank}</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px]">{soldier.battalionName}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-3 text-[11px] text-white/60">
                  <span>📍 {soldier.city}, {soldier.state}</span>
                  <span>🩸 {soldier.blood}</span>
                  <span>🏥 {soldier.medical}</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-4xl font-black ${soldier.overall >= 90 ? "text-emerald-400" : soldier.overall >= 80 ? "text-amber-300" : "text-orange-400"}`}>
                {soldier.overall}
              </div>
              <div className="text-[10px] text-white/50 mt-0.5">Overall Score</div>
              <div className="text-[11px] text-white/70 mt-0.5">Global #{globalRank} · Bat #{batRank}</div>
            </div>
          </div>
          <div className="mt-2.5 flex gap-2">
            <StatusBadge status={soldier.status} />
            <GradeBadge grade={soldier.grade} />
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`border-b-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${tab === t.id ? "border-[#4a5c2f] text-[#4a5c2f]" : "border-transparent text-stone-400 hover:text-stone-700"
                }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="p-5 space-y-4">

          {/* OVERVIEW */}
          {tab === "overview" && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {scores.map(sc => (
                  <div key={sc.key} className="rounded-lg border border-stone-100 bg-stone-50 p-3">
                    <div className="flex items-center gap-1 text-[10px] text-stone-400 mb-1.5">{sc.icon}{sc.label}</div>
                    <div className={`text-2xl font-black ${scoreColor(sc.value)}`}>{sc.value}</div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-200">
                      <div className={`h-full rounded-full ${barColor(sc.value)}`} style={{ width: `${sc.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {scores.filter(s => s.value >= 85).length > 0 && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <div className="text-xs font-bold text-emerald-700 mb-1.5">✅ Strengths</div>
                    {scores.filter(s => s.value >= 85).map(s => <div key={s.key} className="text-xs text-emerald-700 py-0.5">{s.label} — <strong>{s.value}</strong></div>)}
                  </div>
                )}
                {scores.filter(s => s.value >= 70 && s.value < 85).length > 0 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <div className="text-xs font-bold text-amber-700 mb-1.5">⚠️ Monitor</div>
                    {scores.filter(s => s.value >= 70 && s.value < 85).map(s => <div key={s.key} className="text-xs text-amber-700 py-0.5">{s.label} — <strong>{s.value}</strong></div>)}
                  </div>
                )}
                {scores.filter(s => s.value < 70).length > 0 && (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
                    <div className="text-xs font-bold text-rose-700 mb-1.5">🔧 Needs Work</div>
                    {scores.filter(s => s.value < 70).map(s => <div key={s.key} className="text-xs text-rose-700 py-0.5">{s.label} — <strong>{s.value}</strong></div>)}
                  </div>
                )}
              </div>
            </>
          )}

          {/* SCORES */}
          {tab === "scores" && (
            <div className="overflow-hidden rounded-lg border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    {["Category", "Score", "Grade", "Progress"].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {scores.map(sc => (
                    <tr key={sc.key} className="hover:bg-stone-50">
                      <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-sm font-medium text-stone-700">{sc.icon}{sc.label}</div></td>
                      <td className="px-4 py-3"><span className={`text-lg font-black ${scoreColor(sc.value)}`}>{sc.value}</span><span className="text-stone-400 text-xs">/100</span></td>
                      <td className="px-4 py-3"><GradeBadge grade={sc.value >= 90 ? "Outstanding" : sc.value >= 80 ? "Good" : sc.value >= 70 ? "Average" : "Needs Improvement"} /></td>
                      <td className="px-4 py-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-stone-100">
                          <div className={`h-full rounded-full ${barColor(sc.value)}`} style={{ width: `${sc.value}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50 font-semibold border-t-2 border-stone-200">
                    <td className="px-4 py-3 text-sm font-bold text-stone-800">Overall Score</td>
                    <td className="px-4 py-3"><span className={`text-xl font-black ${scoreColor(soldier.overall)}`}>{soldier.overall}</span></td>
                    <td className="px-4 py-3"><GradeBadge grade={soldier.grade} /></td>
                    <td className="px-4 py-3 text-xs text-stone-400">Global #{globalRank} · Bat #{batRank}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* PERSONAL */}
          {tab === "personal" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-stone-200 overflow-hidden">
                <div className="border-b border-stone-100 px-4 py-2 font-semibold text-sm text-stone-800 bg-stone-50">Personal Information</div>
                {[["Full Name", soldier.name], ["Date of Birth", new Date(soldier.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })], ["Gender", soldier.gender], ["Blood Group", soldier.blood], ["State", soldier.state], ["City", soldier.city], ["Phone", soldier.phone], ["Email", soldier.email]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                    <span className="text-xs text-stone-400">{k}</span>
                    <span className="text-xs font-medium text-stone-700 text-right max-w-[60%] truncate">{v}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-stone-200 overflow-hidden">
                  <div className="border-b border-stone-100 px-4 py-2 font-semibold text-sm text-stone-800 bg-stone-50">Service Details</div>
                  {[["Soldier ID", soldier.id], ["Rank", soldier.rank], ["Battalion", soldier.battalionName], ["Date of Joining", new Date(soldier.joining).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })], ["Status", soldier.status === "active" ? "Active" : soldier.status === "on_leave" ? "On Leave" : "Inactive"], ["Medical Fitness", soldier.medical]].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                      <span className="text-xs text-stone-400">{k}</span>
                      <span className="text-xs font-medium text-stone-700 text-right max-w-[60%] truncate">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-stone-200 overflow-hidden">
                  <div className="border-b border-stone-100 px-4 py-2 font-semibold text-sm text-stone-800 bg-stone-50">Emergency Contact</div>
                  {[["Name", soldier.emergency.name], ["Phone", soldier.emergency.phone], ["Relation", soldier.emergency.relation]].map(([k, v]) => (
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
            <div className="overflow-hidden rounded-lg border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    {["#", "Item", "Type", "Issued", "Condition"].map(h => <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {soldier.equipment.map((eq, i) => {
                    const type = eq.includes("Rifle") || eq.includes("Goggles") ? "Weapon" : eq.includes("Uniform") || eq.includes("Helmet") ? "Uniform" : "Gear"
                    return (
                      <tr key={i} className="hover:bg-stone-50">
                        <td className="px-4 py-2.5 text-xs text-stone-400 font-mono">{i + 1}</td>
                        <td className="px-4 py-2.5 text-sm font-medium text-stone-700">📦 {eq}</td>
                        <td className="px-4 py-2.5"><Badge className="border border-sky-200 bg-sky-50 text-sky-700 text-xs">{type}</Badge></td>
                        <td className="px-4 py-2.5 text-xs text-stone-400">15 Jan 2024</td>
                        <td className="px-4 py-2.5"><Badge className={`border text-xs ${i === 3 ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>{i === 3 ? "Worn" : "Good"}</Badge></td>
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
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-400">No events or awards recorded yet.</div>
              ) : (
                soldier.events.map((ev, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <Trophy size={16} className="mt-0.5 shrink-0 text-amber-600" />
                    <div>
                      <div className="text-sm font-semibold text-stone-800">{ev}</div>
                      <div className="text-xs text-stone-400 mt-0.5">Achievement · Agniveer Record</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Battalion Soldiers View ────────────────────────────────────────────────────

function BattalionSoldiersView({ battalion, soldiers, onBack, onSoldierClick }: {
  battalion: Battalion; soldiers: Soldier[]; onBack: () => void; onSoldierClick: (s: Soldier) => void
}) {
  const [search, setSearch] = useState("")
  const filtered = soldiers.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-500">
        <button onClick={onBack} className="flex items-center gap-1 hover:text-stone-800 transition-colors">
          <ChevronLeft size={14} /> Dashboard
        </button>
        <ChevronRight size={12} />
        <span className="font-medium text-stone-800">{battalion.name}</span>
      </div>

      {/* Battalion summary card */}
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
                  <span className="text-base font-bold text-stone-800">{stat.value}</span>
                  <span className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase text-center">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="text-right shrink-0">
              <div className={`text-3xl font-black ${scoreColor(battalion.score)}`}>{battalion.score}</div>
              <div className="text-xs text-stone-400">Avg. Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search + hint */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search size={13} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400" />
          <Input placeholder="Search name or ID..." value={search} onChange={e => setSearch(e.target.value)} className="h-8 pl-8 text-xs border-stone-200 bg-white" />
        </div>
        <span className="text-xs text-stone-400">{filtered.length} of {soldiers.length} soldiers</span>
        <span className="text-xs text-stone-400 ml-auto">👆 Click a row to view full profile</span>
      </div>

      {/* Soldiers table */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                {["Soldier ID", "Name", "Rank", "Physical", "Weapons", "Mental", "Combat", "Attend.", "Discip.", "Overall", "Grade", "Status"].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={12} className="py-12 text-center text-sm text-stone-400">No soldiers found.</td></tr>
              ) : (
                filtered.map(s => (
                  <tr key={s.id} onClick={() => onSoldierClick(s)} className="cursor-pointer transition-colors hover:bg-[#f0f5e8] active:bg-[#e4eedd]">
                    <td className="px-3 py-2.5 font-mono text-xs text-stone-400 whitespace-nowrap">{s.id}</td>
                    <td className="px-3 py-2.5 font-semibold text-[#1a2d4a] whitespace-nowrap hover:underline">{s.name}</td>
                    <td className="px-3 py-2.5 text-xs text-stone-500">{s.rank}</td>
                    <td className="px-3 py-2.5"><MiniBar value={s.physical} /></td>
                    <td className="px-3 py-2.5"><MiniBar value={s.weapons} /></td>
                    <td className="px-3 py-2.5"><MiniBar value={s.mental} /></td>
                    <td className="px-3 py-2.5"><MiniBar value={s.combat} /></td>
                    <td className="px-3 py-2.5"><MiniBar value={s.attendance} /></td>
                    <td className="px-3 py-2.5"><MiniBar value={s.discipline} /></td>
                    <td className="px-3 py-2.5"><span className={`text-lg font-black ${scoreColor(s.overall)}`}>{s.overall}</span></td>
                    <td className="px-3 py-2.5"><GradeBadge grade={s.grade} /></td>
                    <td className="px-3 py-2.5"><StatusBadge status={s.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2 text-xs text-stone-400">
          {filtered.length} soldier{filtered.length !== 1 ? "s" : ""} · Click any row to view complete profile
        </div>
      </Card>
    </div>
  )
}

// ── Dashboard Overview ─────────────────────────────────────────────────────────

function DashboardView({ onBattalionClick }: { onBattalionClick: (b: Battalion) => void }) {
  const [needsAttnSoldier, setNeedsAttnSoldier] = useState<Soldier | null>(null)
  const [needsAttnModalOpen, setNeedsAttnModalOpen] = useState(false)

  const handleNeedsAttnClick = (s: Soldier) => {
    setNeedsAttnSoldier(s)
    setNeedsAttnModalOpen(true)
  }

  const topPerformers = [...SOLDIERS].sort((a, b) => b.overall - a.overall).slice(0, 5)
  const needsAttention = SOLDIERS.filter(s => s.overall < 75).sort((a, b) => a.overall - b.overall)

  return (
    <div className="space-y-6">

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {SUMMARY_STATS.map(stat => (
          <Card key={stat.label} className="border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="px-5 pt-5 pb-4">
              <div className={`mb-2 ${stat.accent}`}>{stat.icon}</div>
              <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">{stat.label}</p>
              <p className={`mt-1 text-3xl font-bold ${stat.accent}`}>{stat.value}</p>
              <p className="mt-1 text-xs text-stone-400">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Battalions — click to drill down */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-800">Battalion Performance</h2>
            <p className="text-xs text-stone-400 mt-0.5">Click any battalion card to view its soldiers ↓</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {BATTALIONS.map(bat => (
            <button
              key={bat.id}
              onClick={() => onBattalionClick(bat)}
              className={`group text-left w-full rounded-xl border border-stone-200 border-l-4 ${bat.accentColor} bg-white shadow-sm transition-all hover:shadow-md hover:border-stone-300 p-4`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-stone-900 group-hover:text-[#1a2d4a] transition-colors leading-tight">{bat.name}</div>
                  <div className="mt-0.5 font-mono text-[10px] font-semibold text-stone-400">{bat.code}</div>
                  <div className="flex items-center gap-0.5 mt-0.5 text-[10px] text-stone-400"><MapPin size={8} />{bat.location}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Cmd: {bat.commander}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className={`text-2xl font-black ${scoreColor(bat.score)}`}>{bat.score}</div>
                  <div className="text-[10px] text-stone-400">avg score</div>
                </div>
              </div>

              {/* Soldier counts */}
              <div className="grid grid-cols-4 gap-1 rounded-lg bg-stone-50 border border-stone-100 py-2 px-2 mb-3">
                {[{ label: "Total", value: bat.total }, { label: "Active", value: bat.active }, { label: "Leave", value: bat.onLeave }, { label: "≥85", value: bat.scoreAbove85 }].map(s => (
                  <div key={s.label} className="flex flex-col items-center">
                    <span className="text-sm font-bold text-stone-800">{s.value}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wide">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Score bars */}
              <div className="space-y-1.5">
                {[["Physical", bat.physical], ["Weapons", bat.weapons], ["Mental", bat.mental]].map(([l, v]) => (
                  <div key={l as string} className="flex items-center gap-2">
                    <span className="w-12 text-[10px] text-stone-400 shrink-0">{l}</span>
                    <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-stone-100">
                      <div className={`h-full rounded-full ${barColor(v as number)}`} style={{ width: `${v}%` }} />
                    </div>
                    <span className={`text-[10px] font-bold w-6 text-right ${scoreColor(v as number)}`}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-stone-400 group-hover:text-[#4a5c2f] transition-colors">
                <Users size={11} /> View {bat.total} soldiers <ChevronRight size={11} className="ml-auto group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top performers + Needs attention */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-stone-800">Top 5 Performers</CardTitle>
            <span className="text-xs text-stone-400">All Battalions</span>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="divide-y divide-stone-50">
              {topPerformers.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 py-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                    {i === 0 ? <Trophy size={14} className="text-yellow-500" /> : i === 1 ? <Medal size={14} className="text-slate-400" /> : i === 2 ? <Medal size={14} className="text-amber-600" /> : <span className="text-xs font-bold text-stone-400">#{i + 1}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-stone-800 truncate">{s.name}</div>
                    <div className="text-xs text-stone-400">{s.battalion} · {s.battalionName}</div>
                  </div>
                  <GradeBadge grade={s.grade} />
                  <span className={`text-sm font-black shrink-0 ${scoreColor(s.overall)}`}>{s.overall}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-stone-800">
              <AlertTriangle size={14} className="text-amber-500" /> Needs Attention
            </CardTitle>
            <span className="text-xs text-stone-400">Score &lt; 75</span>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {needsAttention.length === 0 ? (
              <div className="py-6 text-center text-sm text-stone-400">All soldiers performing well! 🎉</div>
            ) : (
              <div className="divide-y divide-stone-50">
                  {needsAttention.map(s => (
                  <div 
                    key={s.id} 
                    className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-stone-50 rounded-lg transition-colors -mx-2 px-2"
                    onClick={() => handleNeedsAttnClick(s)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-stone-800 truncate">{s.name}</div>
                      <div className="text-xs text-stone-400">{s.battalion} · {s.battalionName}</div>
                    </div>
                    <Badge className={`border text-xs shrink-0 ${s.overall < 70 ? "border-rose-300 bg-rose-100 text-rose-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>
                      {s.overall < 70 ? "Critical" : "Monitor"}
                    </Badge>
                    <span className={`text-sm font-black shrink-0 ${scoreColor(s.overall)}`}>{s.overall}</span>
                    <ChevronRight size={14} className="text-stone-300" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Needs Attention Modal */}
      <NeedsAttentionModal 
        soldier={needsAttnSoldier} 
        open={needsAttnModalOpen} 
        onClose={() => setNeedsAttnModalOpen(false)} 
      />
    </div>
  )
}

// ── Page Root ─────────────────────────────────────────────────────────────────

export default function CommandOverviewPage() {
  const [view, setView] = useState<"dashboard" | "battalion">("dashboard")
  const [selectedBattalion, setSelectedBattalion] = useState<Battalion | null>(null)
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null)
  const [soldierModalOpen, setSoldierModalOpen] = useState(false)

  const handleBattalionClick = (bat: Battalion) => {
    setSelectedBattalion(bat)
    setView("battalion")
  }

  const handleSoldierClick = (s: Soldier) => {
    setSelectedSoldier(s)
    setSoldierModalOpen(true)
  }

  const battalionSoldiers = selectedBattalion
    ? SOLDIERS.filter(s => s.battalion === selectedBattalion.id)
    : []

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">

      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              {view === "battalion" && selectedBattalion ? selectedBattalion.name : "Command Overview"}
            </h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-stone-500">
              <Activity size={12} className="text-emerald-500" />
              {view === "battalion" && selectedBattalion
                ? `${battalionSoldiers.length} soldiers · click any row for full profile`
                : "Agnipath Scheme · Real-time Dashboard"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {view === "battalion" && (
              <Button variant="outline" size="sm" onClick={() => setView("dashboard")} className="gap-1.5 text-xs">
                <Home size={13} /> Dashboard
              </Button>
            )}
            <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-xs font-medium text-emerald-600">
              <Activity size={9} className="mr-1" /> Live
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        {view === "dashboard" && <DashboardView onBattalionClick={handleBattalionClick} />}
        {view === "battalion" && selectedBattalion && (
          <BattalionSoldiersView
            battalion={selectedBattalion}
            soldiers={battalionSoldiers}
            onBack={() => setView("dashboard")}
            onSoldierClick={handleSoldierClick}
          />
        )}
      </div>

      {/* Soldier detail modal */}
      <SoldierDetailModal
        soldier={selectedSoldier}
        open={soldierModalOpen}
        onClose={() => setSoldierModalOpen(false)}
      />
    </div>
  )
}
