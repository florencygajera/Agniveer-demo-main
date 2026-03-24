"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  LayoutDashboard, Upload, Dumbbell, Target, Brain, Swords,
  CalendarDays, ShieldCheck, Users, TrendingUp, Star,
  AlertTriangle, CheckCircle2, ChevronRight, FileSpreadsheet,
  Download, Plus, Search, LogOut, Activity, ArrowRight,
  X, Pencil,
} from "lucide-react"
import Link from "next/link"

// ── Types ─────────────────────────────────────────────────────────────────────
type Section = "dashboard" | "upload" | "sessions" | "scores"

type CatKey = "physical" | "weapons" | "mental" | "combat" | "attendance" | "discipline"

// ── Data ──────────────────────────────────────────────────────────────────────
const TRAINER = { name:"Cpt. Pradeep Kumar", id:"TRN-001", battalion:"1st Rajputana Rifles", code:"RR-1" }

const SOLDIERS = [
  { id:"AGN-2024-0101", name:"Rajveer Singh Chauhan", rank:"Sepoy",      physical:91, weapons:88, mental:78, combat:89, attendance:96, discipline:92, overall:89,   status:"active" },
  { id:"AGN-2024-0102", name:"Priya Sharma",          rank:"Sepoy",      physical:85, weapons:72, mental:94, combat:80, attendance:98, discipline:95, overall:87.3, status:"active" },
  { id:"AGN-2024-0103", name:"Arjun Mehra",           rank:"Lance Naik", physical:96, weapons:94, mental:88, combat:95, attendance:100,discipline:97, overall:95,   status:"active" },
  { id:"AGN-2024-0104", name:"Sunil Kumar",           rank:"Sepoy",      physical:68, weapons:72, mental:65, combat:70, attendance:82, discipline:75, overall:72,   status:"active" },
  { id:"AGN-2024-0105", name:"Kavita Rajput",         rank:"Sepoy",      physical:78, weapons:74, mental:82, combat:76, attendance:88, discipline:85, overall:80.5, status:"on_leave" },
  { id:"AGN-2024-0106", name:"Mahesh Choudhary",      rank:"Sepoy",      physical:82, weapons:91, mental:70, combat:84, attendance:91, discipline:88, overall:84.3, status:"active" },
]

const SESSIONS = [
  { date:"14 Mar 2025", type:"Physical", soldiers:6, avg:88, notes:"Morning PT & 5km timed run. Arjun set new record.",      status:"Complete" },
  { date:"12 Mar 2025", type:"Weapons",  soldiers:6, avg:83, notes:"INSAS range practice. Focus on accuracy drills.",        status:"Complete" },
  { date:"10 Mar 2025", type:"Mental",   soldiers:5, avg:79, notes:"Decision-making under stress. Kavita on leave.",         status:"Complete" },
  { date:"07 Mar 2025", type:"Combat",   soldiers:6, avg:84, notes:"Obstacle course + buddy drills.",                        status:"Complete" },
  { date:"05 Mar 2025", type:"Physical", soldiers:6, avg:87, notes:"Strength & endurance circuit.",                          status:"Complete" },
  { date:"17 Mar 2025", type:"Weapons",  soldiers:6, avg:0,  notes:"Scheduled range session — pistol handling.",             status:"Upcoming" },
  { date:"19 Mar 2025", type:"Combat",   soldiers:6, avg:0,  notes:"Night navigation & tactical exercise.",                  status:"Upcoming" },
]

// ── Category meta (labels, icons, recommendations) ────────────────────────────
const CAT_META: Record<CatKey, {
  label: string
  icon: React.ReactNode
  threshold: { low: number; mid: number }
  tips: { low: string; mid: string; high: string }
  drills: string[]
}> = {
  physical: {
    label:"Physical Fitness", icon:<Dumbbell size={14}/>,
    threshold:{ low:70, mid:85 },
    tips:{
      low:"Critical — daily 5 km timed run, strength circuit 3×/week, target +8 pts in 4 weeks.",
      mid:"On track — add sprint intervals twice weekly and monitor run times.",
      high:"Excellent — lead PT sessions and mentor lower-scoring peers.",
    },
    drills:["5 km timed run","Push-up / Pull-up circuit","Obstacle course","Endurance interval sprints"],
  },
  weapons: {
    label:"Weapons Handling", icon:<Target size={14}/>,
    threshold:{ low:70, mid:85 },
    tips:{
      low:"Critical — daily dry-fire drills, increase live range sessions to 3×/week, focus on trigger control.",
      mid:"Developing — add moving-target practice and improve reload speed drills.",
      high:"Excellent — consider advanced marksmanship certification.",
    },
    drills:["INSAS Rifle live range","Dry-fire accuracy drills","Moving target practice","Reload-speed timed drill"],
  },
  mental: {
    label:"Mental Resilience", icon:<Brain size={14}/>,
    threshold:{ low:70, mid:85 },
    tips:{
      low:"Critical — weekly counselling, 20 min daily meditation, stress-inoculation training.",
      mid:"Progressing — group problem-solving workshops, peer resilience sessions.",
      high:"Excellent — assist trainer in resilience sessions for weaker soldiers.",
    },
    drills:["Stress inoculation scenario","Group tactical decision-making","Meditation & mindfulness","Peer resilience session"],
  },
  combat: {
    label:"Combat Drills", icon:<Swords size={14}/>,
    threshold:{ low:70, mid:85 },
    tips:{
      low:"Critical — extra obstacle course 3×/week, buddy-training exercises mandatory.",
      mid:"Solid — add complex scenario drills and improve decision speed under pressure.",
      high:"Excellent — ready for advanced tactical training and leadership drills.",
    },
    drills:["Obstacle course timed run","Buddy-pair tactical drill","Night navigation exercise","CQB reaction drills"],
  },
  attendance: {
    label:"Attendance", icon:<CalendarDays size={14}/>,
    threshold:{ low:88, mid:95 },
    tips:{
      low:"Critical — mandatory counselling, investigate health issues, escalate if persistent.",
      mid:"Minor gaps — ensure all absences documented and justified promptly.",
      high:"Perfect — exemplary discipline and reliability.",
    },
    drills:["Attendance review meeting","Health & welfare check","Commander's interview","Leave reconciliation audit"],
  },
  discipline: {
    label:"Discipline", icon:<ShieldCheck size={14}/>,
    threshold:{ low:75, mid:88 },
    tips:{
      low:"Critical — conduct formal counselling, review Military Discipline Code with soldier.",
      mid:"Good conduct — focus on punctuality and uniform standards.",
      high:"Exemplary — recommend for leadership or senior buddy-trainer role.",
    },
    drills:["Formal counselling session","Military Discipline Code review","Punctuality awareness drill","Leadership mentoring programme"],
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function sc(v: number) {
  if(v>=90)return"text-emerald-600"; if(v>=80)return"text-[#4a5c2f]"; if(v>=70)return"text-amber-600"; return"text-rose-500"
}
function bc(v: number) {
  if(v>=90)return"bg-emerald-500"; if(v>=80)return"bg-[#4a5c2f]"; if(v>=70)return"bg-amber-500"; return"bg-rose-500"
}
function grade(v: number) {
  if(v>=90)return{l:"Outstanding",c:"bg-emerald-100 text-emerald-700 border-emerald-200"}
  if(v>=80)return{l:"Good",       c:"bg-sky-100 text-sky-700 border-sky-200"}
  if(v>=70)return{l:"Average",    c:"bg-amber-100 text-amber-700 border-amber-200"}
  return{l:"Needs Improvement",   c:"bg-rose-100 text-rose-600 border-rose-200"}
}
function avg(arr: number[]) {
  return Math.round(arr.reduce((a,b)=>a+b,0)/arr.length*10)/10
}

// ── NEEDS ATTENTION DETAIL MODAL ──────────────────────────────────────────────
function NeedsAttentionModal({ soldier, onClose }: {
  soldier: typeof SOLDIERS[0] | null
  onClose: () => void
}) {
  if (!soldier) return null

  const cats: CatKey[] = ["physical","weapons","mental","combat","attendance","discipline"]

  // Find all weak areas (below each category's mid threshold)
  const critical = cats.filter(k => soldier[k] < CAT_META[k].threshold.low)
  const monitor  = cats.filter(k => soldier[k] >= CAT_META[k].threshold.low && soldier[k] < CAT_META[k].threshold.mid)
  const strong   = cats.filter(k => soldier[k] >= CAT_META[k].threshold.mid)

  const overallGrade = grade(soldier.overall)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">

        {/* Header */}
        <div className="bg-[#1a2d4a] px-5 py-4 rounded-t-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-2xl">👤</div>
              <div>
                <div className="text-[10px] text-white/50 mb-0.5">Attention Detail — {TRAINER.battalion}</div>
                <h2 className="text-lg font-bold text-white leading-tight">{soldier.name}</h2>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="font-mono text-[10px] text-orange-300 bg-white/10 px-2 py-0.5 rounded">{soldier.id}</span>
                  <span className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded">{soldier.rank}</span>
                  <Badge className={`border text-[10px] ${overallGrade.c}`}>{overallGrade.l}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-4xl font-black ${sc(soldier.overall)}`}>{soldier.overall}</div>
              <div className="text-[10px] text-white/50 mt-0.5">Overall Score</div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">

          {/* All 6 scores at a glance */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {cats.map(k => {
              const v = soldier[k]
              const meta = CAT_META[k]
              const isCritical = v < meta.threshold.low
              const isMonitor  = v >= meta.threshold.low && v < meta.threshold.mid
              return (
                <div key={k} className={`rounded-xl border p-3 ${isCritical?"border-rose-200 bg-rose-50":isMonitor?"border-amber-200 bg-amber-50":"border-emerald-200 bg-emerald-50"}`}>
                  <div className={`flex items-center gap-1 text-[10px] font-semibold mb-1.5 ${isCritical?"text-rose-600":isMonitor?"text-amber-600":"text-emerald-600"}`}>
                    {meta.icon} {meta.label}
                  </div>
                  <div className={`text-2xl font-black ${sc(v)}`}>{v}</div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/60">
                    <div className={`h-full rounded-full ${bc(v)}`} style={{width:`${v}%`}}/>
                  </div>
                  <div className={`mt-1 text-[9px] font-bold uppercase tracking-wide ${isCritical?"text-rose-500":isMonitor?"text-amber-500":"text-emerald-600"}`}>
                    {isCritical?"🔴 Critical":isMonitor?"🟡 Monitor":"🟢 Good"}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Critical areas — detailed */}
          {critical.length > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 overflow-hidden">
              <div className="flex items-center gap-2 bg-rose-100 border-b border-rose-200 px-4 py-2.5">
                <AlertTriangle size={14} className="text-rose-600"/>
                <span className="text-sm font-bold text-rose-700">🔴 Critical — Immediate Action Required ({critical.length})</span>
              </div>
              <div className="divide-y divide-rose-100">
                {critical.map(k => {
                  const v = soldier[k]
                  const meta = CAT_META[k]
                  return (
                    <div key={k} className="px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-rose-700">{meta.icon}{meta.label}</div>
                        <span className={`text-xl font-black ${sc(v)}`}>{v}<span className="text-xs text-stone-400 font-normal">/100</span></span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-rose-200 mb-2">
                        <div className="h-full rounded-full bg-rose-500 transition-all" style={{width:`${v}%`}}/>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight size={12} className="mt-0.5 shrink-0 text-rose-500"/>
                        <p className="text-xs text-rose-700">{meta.tips.low}</p>
                      </div>
                      <div className="mt-2.5">
                        <div className="text-[10px] font-bold uppercase tracking-wide text-rose-500 mb-1.5">Recommended Drills</div>
                        <div className="flex flex-wrap gap-1">
                          {meta.drills.map(d=>(
                            <span key={d} className="rounded-md border border-rose-200 bg-white px-2 py-0.5 text-[10px] font-medium text-rose-600">{d}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 text-[10px] text-rose-400">Target: +{Math.min(15, 100-v)} pts · Review in: 4 weeks</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Monitor areas */}
          {monitor.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 overflow-hidden">
              <div className="flex items-center gap-2 bg-amber-100 border-b border-amber-200 px-4 py-2.5">
                <AlertTriangle size={14} className="text-amber-600"/>
                <span className="text-sm font-bold text-amber-700">🟡 Monitor — Needs Improvement ({monitor.length})</span>
              </div>
              <div className="divide-y divide-amber-100">
                {monitor.map(k => {
                  const v = soldier[k]
                  const meta = CAT_META[k]
                  return (
                    <div key={k} className="px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-amber-700">{meta.icon}{meta.label}</div>
                        <span className={`text-xl font-black ${sc(v)}`}>{v}<span className="text-xs text-stone-400 font-normal">/100</span></span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-amber-200 mb-2">
                        <div className="h-full rounded-full bg-amber-500 transition-all" style={{width:`${v}%`}}/>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight size={12} className="mt-0.5 shrink-0 text-amber-500"/>
                        <p className="text-xs text-amber-700">{meta.tips.mid}</p>
                      </div>
                      <div className="mt-2 text-[10px] text-amber-400">Target: {meta.threshold.mid} · Review in: 6 weeks</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Strong areas */}
          {strong.length > 0 && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 overflow-hidden">
              <div className="flex items-center gap-2 bg-emerald-100 border-b border-emerald-200 px-4 py-2.5">
                <CheckCircle2 size={14} className="text-emerald-600"/>
                <span className="text-sm font-bold text-emerald-700">🟢 Strengths — Performing Well ({strong.length})</span>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-2">
                {strong.map(k => {
                  const v = soldier[k]
                  const meta = CAT_META[k]
                  return (
                    <div key={k} className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-1.5">
                      <span className="text-emerald-500">{meta.icon}</span>
                      <span className="text-xs font-semibold text-stone-700">{meta.label}</span>
                      <span className={`text-sm font-black ${sc(v)}`}>{v}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Trainer Action Plan */}
          <div className="rounded-xl border border-[#1a2d4a]/20 bg-[#1a2d4a]/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} className="text-[#1a2d4a]"/>
              <span className="text-sm font-bold text-[#1a2d4a]">Trainer Action Plan</span>
            </div>
            <div className="space-y-1.5 text-xs text-stone-600">
              {critical.length > 0 && <div className="flex gap-2"><span className="text-rose-500 shrink-0">1.</span><span>Schedule <strong>3× weekly targeted sessions</strong> for {critical.map(k=>CAT_META[k].label).join(", ")}.</span></div>}
              {monitor.length > 0 && <div className="flex gap-2"><span className="text-amber-500 shrink-0">{critical.length+1}.</span><span>Assign <strong>buddy trainer</strong> (Arjun Mehra) for {monitor.map(k=>CAT_META[k].label).join(", ")} drills.</span></div>}
              {critical.length > 0 && <div className="flex gap-2"><span className="text-sky-500 shrink-0">{critical.length+monitor.length+1}.</span><span>Conduct <strong>welfare check & counselling</strong> within 48 hours if attendance is flagged.</span></div>}
              <div className="flex gap-2"><span className="text-[#4a5c2f] shrink-0">✓</span><span>Review progress in <strong>4 weeks</strong> and update scores in the Soldier Scores tab.</span></div>
            </div>
          </div>

        </div>

        <div className="border-t border-stone-100 bg-stone-50 px-5 py-3 rounded-b-xl flex justify-end">
          <Button variant="outline" onClick={onClose} className="text-sm">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── CATEGORY DRILL-DOWN MODAL ─────────────────────────────────────────────────
function CategoryDrillModal({ catKey, onClose }: {
  catKey: CatKey | null
  onClose: () => void
}) {
  if (!catKey) return null
  const meta  = CAT_META[catKey]
  const batAvg = avg(SOLDIERS.map(s=>s[catKey]))
  const sorted = [...SOLDIERS].sort((a,b)=>b[catKey]-a[catKey])

  const critical = SOLDIERS.filter(s=>s[catKey]<meta.threshold.low)
  const monitor  = SOLDIERS.filter(s=>s[catKey]>=meta.threshold.low && s[catKey]<meta.threshold.mid)
  const good     = SOLDIERS.filter(s=>s[catKey]>=meta.threshold.mid)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">

        {/* Header */}
        <div className="bg-[#1a2d4a] px-5 py-4 rounded-t-xl flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] text-white/50 mb-0.5">Category Drill-Down · {TRAINER.battalion}</div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-white/70">{meta.icon}</span>{meta.label}
            </h2>
            <div className="flex gap-3 mt-2 text-xs text-white/60">
              <span>Battalion Average: <strong className={`${sc(batAvg)} font-black`}>{batAvg}</strong></span>
              <span>·</span>
              <span>{critical.length} critical · {monitor.length} monitor · {good.length} good</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-4xl font-black ${sc(batAvg)}`}>{batAvg}</div>
            <div className="text-[10px] text-white/50 mt-0.5">Battalion Avg</div>
            <Badge className={`mt-1 border text-[10px] ${grade(batAvg).c}`}>{grade(batAvg).l}</Badge>
          </div>
        </div>

        <div className="p-5 space-y-5">

          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label:"🔴 Critical",  count:critical.length, bg:"bg-rose-50 border-rose-200",   text:"text-rose-700",   sub:`Below ${meta.threshold.low}` },
              { label:"🟡 Monitor",   count:monitor.length,  bg:"bg-amber-50 border-amber-200",  text:"text-amber-700",  sub:`${meta.threshold.low}–${meta.threshold.mid-1}` },
              { label:"🟢 Good",      count:good.length,     bg:"bg-emerald-50 border-emerald-200",text:"text-emerald-700",sub:`${meta.threshold.mid}+` },
            ].map(s=>(
              <div key={s.label} className={`rounded-xl border ${s.bg} p-3 text-center`}>
                <div className={`text-2xl font-black ${s.text}`}>{s.count}</div>
                <div className={`text-xs font-bold ${s.text} mt-0.5`}>{s.label}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* All soldiers ranked for this category */}
          <div className="overflow-hidden rounded-xl border border-stone-200">
            <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 flex items-center justify-between">
              <span className="text-sm font-bold text-stone-700">All Soldiers — {meta.label} Ranking</span>
              <span className="text-xs text-stone-400">Sorted highest to lowest</span>
            </div>
            <div className="divide-y divide-stone-50">
              {sorted.map((s, i) => {
                const v     = s[catKey]
                const isCrit = v < meta.threshold.low
                const isMon  = v >= meta.threshold.low && v < meta.threshold.mid
                const tip    = isCrit ? meta.tips.low : isMon ? meta.tips.mid : meta.tips.high
                return (
                  <div key={s.id} className={`px-4 py-3 ${isCrit?"bg-rose-50/40":isMon?"bg-amber-50/20":""}`}>
                    <div className="flex items-center gap-3 mb-2">
                      {/* Rank number */}
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${i===0?"bg-amber-500":i===1?"bg-stone-400":i===2?"bg-amber-700":isCrit?"bg-rose-400":"bg-stone-200 text-stone-500"}`}>
                        {i+1}
                      </div>
                      {/* Name + rank */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-stone-800">{s.name}</span>
                          <span className="text-[10px] text-stone-400 font-mono">{s.id}</span>
                          <Badge className={`border text-[10px] ${s.status==="active"?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-amber-200 bg-amber-50 text-amber-700"}`}>
                            {s.status==="active"?"Active":"On Leave"}
                          </Badge>
                        </div>
                        <div className="text-xs text-stone-400 mt-0.5">{s.rank}</div>
                      </div>
                      {/* Score */}
                      <div className="shrink-0 text-right">
                        <div className={`text-xl font-black ${sc(v)}`}>{v}</div>
                        <Badge className={`border text-[9px] ${grade(v).c}`}>{grade(v).l}</Badge>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 overflow-hidden rounded-full bg-stone-100 mb-2">
                      <div className={`h-full rounded-full transition-all ${bc(v)}`} style={{width:`${v}%`}}/>
                    </div>
                    {/* Recommendation */}
                    <div className={`flex items-start gap-1.5 text-[11px] ${isCrit?"text-rose-600":isMon?"text-amber-600":"text-emerald-700"}`}>
                      <ArrowRight size={11} className="mt-0.5 shrink-0"/>
                      <span>{tip}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recommended drills for this category */}
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#1a2d4a]">{meta.icon}</span>
              <span className="text-sm font-bold text-stone-800">Recommended Training Drills — {meta.label}</span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {meta.drills.map((d,i) => (
                <div key={d} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-[10px] font-bold text-white">{i+1}</span>
                  <span className="text-xs font-medium text-stone-700">{d}</span>
                </div>
              ))}
            </div>
            {critical.length > 0 && (
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                <AlertTriangle size={12} className="mt-0.5 shrink-0"/>
                <span><strong>Priority:</strong> Focus these drills on {critical.map(s=>s.name.split(" ")[0]).join(", ")} who are in the critical zone. Schedule 3× weekly minimum.</span>
              </div>
            )}
          </div>

          {/* Battalion benchmark */}
          <div className="rounded-xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-stone-500">
              Score Distribution — {meta.label}
            </div>
            <div className="p-4 space-y-3">
              {[
                { label:"Outstanding (90+)", count:SOLDIERS.filter(s=>s[catKey]>=90).length, color:"bg-emerald-500", text:"text-emerald-600" },
                { label:"Good (80–89)",       count:SOLDIERS.filter(s=>s[catKey]>=80&&s[catKey]<90).length, color:"bg-[#4a5c2f]", text:"text-[#4a5c2f]" },
                { label:"Average (70–79)",    count:SOLDIERS.filter(s=>s[catKey]>=70&&s[catKey]<80).length, color:"bg-amber-500",  text:"text-amber-600" },
                { label:"Needs Work (<70)",   count:SOLDIERS.filter(s=>s[catKey]<70).length,  color:"bg-rose-500",  text:"text-rose-500" },
              ].map(d=>(
                <div key={d.label} className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${d.color} shrink-0`}/>
                  <span className="flex-1 text-xs text-stone-600">{d.label}</span>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-stone-100">
                    <div className={`h-full ${d.color}`} style={{width:`${SOLDIERS.length?d.count/SOLDIERS.length*100:0}%`}}/>
                  </div>
                  <span className={`text-sm font-black w-4 text-right ${d.text}`}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-stone-100 bg-stone-50 px-5 py-3 rounded-b-xl flex justify-end">
          <Button variant="outline" onClick={onClose} className="text-sm">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── NAV ───────────────────────────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id:"dashboard", label:"Dashboard",      icon:<LayoutDashboard size={14}/> },
  { id:"scores",    label:"Soldier Scores", icon:<TrendingUp size={14}/> },
  { id:"sessions",  label:"Sessions",       icon:<CalendarDays size={14}/> },
  { id:"upload",    label:"Upload Data",    icon:<Upload size={14}/> },
]

function Sidebar({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
      <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-white text-sm font-bold">P</div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-stone-800">{TRAINER.name}</div>
            <div className="font-mono text-[10px] text-orange-500">{TRAINER.id}</div>
            <div className="text-[10px] text-stone-400">Trainer · {TRAINER.code}</div>
          </div>
        </div>
        <div className="mt-2"><Badge className="border border-sky-200 bg-sky-50 text-[10px] text-sky-700">Trainer · Active</Badge></div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        <p className="px-2 pt-2 pb-1 text-[9px] font-bold uppercase tracking-widest text-stone-400">Trainer Portal</p>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${active===n.id?"bg-[#1a2d4a] text-white shadow-sm":"text-stone-500 hover:bg-stone-100 hover:text-stone-800"}`}>
            {n.icon}{n.label}
          </button>
        ))}
      </nav>
      <div className="border-t border-stone-100 p-2">
        <Link href="/"><button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"><LogOut size={14}/> Logout</button></Link>
      </div>
    </aside>
  )
}

function MobileNav({ active, setActive }: { active: Section; setActive: (s: Section) => void }) {
  return (
    <div className="flex border-b border-stone-200 bg-white md:hidden overflow-x-auto">
      {NAV.map(n => (
        <button key={n.id} onClick={() => setActive(n.id)}
          className={`flex shrink-0 flex-col items-center gap-0.5 border-b-2 px-4 py-2.5 text-[10px] font-semibold whitespace-nowrap transition-colors ${active===n.id?"border-[#1a2d4a] text-[#1a2d4a]":"border-transparent text-stone-400"}`}>
          {n.icon}{n.label}
        </button>
      ))}
    </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardSection({ setActive }: { setActive: (s: Section) => void }) {
  const [attnSoldier, setAttnSoldier] = useState<typeof SOLDIERS[0]|null>(null)
  const [catModal, setCatModal]       = useState<CatKey|null>(null)

  const avgScore   = avg(SOLDIERS.map(s=>s.overall))
  const above85    = SOLDIERS.filter(s=>s.overall>=85).length
  const needsAttn  = SOLDIERS.filter(s=>s.overall<75)
  const passRate   = Math.round(SOLDIERS.filter(s=>s.overall>=70).length/SOLDIERS.length*100)

  const catAvgs: Record<CatKey,number> = {
    physical:   avg(SOLDIERS.map(s=>s.physical)),
    weapons:    avg(SOLDIERS.map(s=>s.weapons)),
    mental:     avg(SOLDIERS.map(s=>s.mental)),
    combat:     avg(SOLDIERS.map(s=>s.combat)),
    attendance: avg(SOLDIERS.map(s=>s.attendance)),
    discipline: avg(SOLDIERS.map(s=>s.discipline)),
  }

  const catRows: { key: CatKey; label: string; icon: React.ReactNode }[] = [
    { key:"physical",   label:"Physical Fitness",  icon:<Dumbbell size={12}/> },
    { key:"weapons",    label:"Weapons Handling",  icon:<Target size={12}/> },
    { key:"mental",     label:"Mental Resilience", icon:<Brain size={12}/> },
    { key:"combat",     label:"Combat Drills",     icon:<Swords size={12}/> },
    { key:"attendance", label:"Attendance",        icon:<CalendarDays size={12}/> },
    { key:"discipline", label:"Discipline",        icon:<ShieldCheck size={12}/> },
  ]

  return (
    <>
      {/* Needs Attention detail modal */}
      {attnSoldier && <NeedsAttentionModal soldier={attnSoldier} onClose={()=>setAttnSoldier(null)}/>}
      {/* Category drill-down modal */}
      {catModal && <CategoryDrillModal catKey={catModal} onClose={()=>setCatModal(null)}/>}

      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-stone-900">Trainer Dashboard</h1>
          <p className="text-xs text-stone-400 mt-0.5">{TRAINER.battalion} · 14 March 2025</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label:"Total Soldiers", value:SOLDIERS.length, accent:"text-[#1a2d4a]",   border:"border-t-[#1a2d4a]" },
            { label:"Avg. Score",     value:avgScore,         accent:"text-[#4a5c2f]",   border:"border-t-[#4a5c2f]" },
            { label:"Above 85",       value:above85,          accent:"text-emerald-600", border:"border-t-emerald-500" },
            { label:"Pass Rate",      value:`${passRate}%`,   accent:"text-sky-600",     border:"border-t-sky-500" },
          ].map(c=>(
            <Card key={c.label} className={`border border-stone-200 border-t-4 ${c.border} bg-white shadow-sm`}>
              <CardContent className="px-4 pt-3 pb-3">
                <div className="text-[10px] text-stone-400 uppercase tracking-wide">{c.label}</div>
                <div className={`mt-1 text-2xl font-black ${c.accent}`}>{c.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Battalion Category Averages — each row is clickable */}
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-semibold text-stone-800">
                <span>Battalion Category Averages</span>
                <span className="text-[10px] font-normal text-stone-400">Click any row for details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-1">
              {catRows.map(row => {
                const v = catAvgs[row.key]
                const isCrit = v < CAT_META[row.key].threshold.low
                const isMon  = v >= CAT_META[row.key].threshold.low && v < CAT_META[row.key].threshold.mid
                return (
                  <button
                    key={row.key}
                    onClick={() => setCatModal(row.key)}
                    className="group w-full rounded-lg px-2 py-2 hover:bg-stone-50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 group-hover:text-stone-800 transition-colors">
                        {row.icon}{row.label}
                        {isCrit && <span className="text-[9px] font-bold text-rose-500 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-full">Critical</span>}
                        {isMon  && <span className="text-[9px] font-bold text-amber-500 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">Monitor</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-black ${sc(v)}`}>{v}</span>
                        <ChevronRight size={12} className="text-stone-300 group-hover:text-stone-500 group-hover:translate-x-0.5 transition-all"/>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                      <div className={`h-full rounded-full transition-all duration-700 ${bc(v)}`} style={{width:`${v}%`}}/>
                    </div>
                  </button>
                )
              })}
            </CardContent>
          </Card>

          {/* Right column */}
          <div className="space-y-3">

            {/* Needs Attention — each soldier row is clickable */}
            {needsAttn.length > 0 && (
              <Card className="border border-amber-200 bg-amber-50 shadow-sm">
                <CardHeader className="pb-1.5">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <AlertTriangle size={14}/> Needs Attention ({needsAttn.length})
                    <span className="ml-auto text-[10px] font-normal text-amber-500">Click for detail</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2">
                  {needsAttn.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setAttnSoldier(s)}
                      className="group w-full flex items-center justify-between rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-left transition-all hover:border-rose-300 hover:bg-rose-50 hover:shadow-sm"
                    >
                      <div>
                        <div className="text-sm font-semibold text-stone-800 group-hover:text-rose-700 transition-colors">{s.name}</div>
                        <div className="text-xs text-stone-400">{s.rank} · Score <strong className="text-rose-500">{s.overall}</strong></div>
                        {/* Mini weak-area chips */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(["physical","weapons","mental","combat","attendance","discipline"] as CatKey[])
                            .filter(k=>s[k]<CAT_META[k].threshold.low)
                            .map(k=>(
                              <span key={k} className="text-[9px] font-semibold bg-rose-100 text-rose-600 border border-rose-200 px-1.5 py-0.5 rounded-full">
                                {CAT_META[k].label.split(" ")[0]} {s[k]}
                              </span>
                            ))
                          }
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <Badge className="border border-rose-200 bg-rose-100 text-rose-600 text-xs">Critical</Badge>
                        <ChevronRight size={13} className="text-stone-300 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all"/>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Top Performers */}
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader className="pb-1.5">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                  <Star size={14} className="text-amber-500"/> Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {[...SOLDIERS].sort((a,b)=>b.overall-a.overall).slice(0,3).map((s,i)=>(
                  <div key={s.id} className="flex items-center gap-3">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white ${i===0?"bg-amber-500":i===1?"bg-stone-400":"bg-amber-700"}`}>{i+1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-stone-800 truncate">{s.name}</div>
                      <div className="text-xs text-stone-400">{s.rank}</div>
                    </div>
                    <span className={`text-sm font-black ${sc(s.overall)}`}>{s.overall}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label:"View Scores",  section:"scores"   as Section, icon:<TrendingUp size={13}/> },
                { label:"Log Session",  section:"sessions" as Section, icon:<CalendarDays size={13}/> },
                { label:"Upload Data",  section:"upload"   as Section, icon:<Upload size={13}/> },
                { label:"Add Session",  section:"sessions" as Section, icon:<Plus size={13}/> },
              ].map(q=>(
                <button key={q.label} onClick={()=>setActive(q.section)}
                  className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs font-medium text-stone-600 shadow-sm hover:border-stone-300 hover:shadow-md transition-all">
                  <span className="text-[#4a5c2f]">{q.icon}</span>{q.label}<ChevronRight size={11} className="ml-auto text-stone-300"/>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

// ── SCORES SECTION ────────────────────────────────────────────────────────────
function ScoresSection() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [editId, setEditId] = useState<string|null>(null)
  const [scores, setScores] = useState(SOLDIERS.map(s=>({...s})))

  const filtered = scores.filter(s=>{
    const q=search.toLowerCase()
    const matchQ=!q||s.name.toLowerCase().includes(q)||s.id.toLowerCase().includes(q)
    const matchF=filter==="all"||(filter==="good"&&s.overall>=85)||(filter==="attn"&&s.overall<75)
    return matchQ&&matchF
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-stone-900">Soldier Scores</h1>
        <p className="text-xs text-stone-400 mt-0.5">{TRAINER.battalion} · All Categories</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"/>
          <Input placeholder="Search name or ID..." value={search} onChange={e=>setSearch(e.target.value)} className="h-8 pl-8 text-xs border-stone-200 bg-white"/>
        </div>
        {[{v:"all",l:"All"},{v:"good",l:"Score ≥ 85"},{v:"attn",l:"Needs Attention"}].map(f=>(
          <button key={f.v} onClick={()=>setFilter(f.v)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${filter===f.v?"border-[#1a2d4a] bg-[#1a2d4a] text-white":"border-stone-200 bg-white text-stone-500 hover:border-stone-300"}`}>{f.l}</button>
        ))}
        <span className="text-xs text-stone-400 ml-auto">{filtered.length} soldiers</span>
      </div>
      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                {["Name","Rank","Physical","Weapons","Mental","Combat","Attend.","Discip.","Overall","Grade","Status","Actions"].map(h=>(
                  <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.map(s=>(
                <React.Fragment key={s.id}>
                  <tr className="hover:bg-stone-50">
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-stone-800 text-sm">{s.name}</div>
                      <div className="font-mono text-[10px] text-stone-400">{s.id}</div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-stone-500">{s.rank}</td>
                    {(["physical","weapons","mental","combat","attendance","discipline"] as CatKey[]).map(k=>(
                      <td key={k} className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-10 overflow-hidden rounded-full bg-stone-100">
                            <div className={`h-full rounded-full ${bc(s[k])}`} style={{width:`${s[k]}%`}}/>
                          </div>
                          <span className={`text-xs font-bold ${sc(s[k])}`}>{s[k]}</span>
                        </div>
                      </td>
                    ))}
                    <td className="px-3 py-2.5"><span className={`text-base font-black ${sc(s.overall)}`}>{s.overall}</span></td>
                    <td className="px-3 py-2.5"><Badge className={`border text-xs ${grade(s.overall).c}`}>{grade(s.overall).l}</Badge></td>
                    <td className="px-3 py-2.5">
                      <Badge className={`border text-xs ${s.status==="active"?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-amber-200 bg-amber-50 text-amber-700"}`}>
                        {s.status==="active"?"Active":"On Leave"}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <Button size="sm" variant="outline" onClick={()=>setEditId(editId===s.id?null:s.id)}
                        className="h-6 gap-1 px-2 text-[10px] border-stone-200 text-stone-600">
                        <Pencil size={10}/>{editId===s.id?"Cancel":"Edit"}
                      </Button>
                    </td>
                  </tr>
                  {editId===s.id&&(
                    <tr className="bg-sky-50">
                      <td colSpan={12} className="px-4 py-4">
                        <div className="text-xs font-bold text-stone-600 mb-3">Edit Scores — {s.name}</div>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                          {(["physical","weapons","mental","combat","attendance","discipline"] as CatKey[]).map(k=>(
                            <div key={k} className="flex flex-col gap-1">
                              <label className="text-[10px] font-semibold text-stone-500 capitalize">{k}</label>
                              <Input type="number" min={0} max={100} value={s[k]}
                                onChange={e=>setScores(prev=>prev.map(x=>
                                  x.id===s.id?{...x,[k]:+e.target.value,
                                    overall:Math.round((["physical","weapons","mental","combat","attendance","discipline"]
                                      .reduce((a,key2)=>a+(key2===k?+e.target.value:x[key2 as keyof typeof x]as number),0)
                                    )/6*10)/10
                                  }:x
                                ))}
                                className="h-8 text-sm text-center"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="bg-[#4a5c2f] text-white hover:bg-[#344228] text-xs h-7" onClick={()=>setEditId(null)}>
                            <CheckCircle2 size={11} className="mr-1"/> Save Scores
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-7" onClick={()=>setEditId(null)}>Cancel</Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2 text-xs text-stone-400">
          {filtered.length} of {SOLDIERS.length} soldiers · Click Edit to update scores
        </div>
      </Card>
    </div>
  )
}

// ── SESSIONS SECTION ──────────────────────────────────────────────────────────
function SessionsSection() {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ date:"", type:"Physical", soldiers:"6", notes:"" })
  const [sessions, setSessions] = useState(SESSIONS)
  const [saved, setSaved] = useState(false)

  const handleAdd = () => {
    if(!form.date||!form.type)return
    setSessions(prev=>[{date:form.date,type:form.type,soldiers:+form.soldiers,avg:0,notes:form.notes,status:"Upcoming"},...prev])
    setForm({date:"",type:"Physical",soldiers:"6",notes:""})
    setShowAdd(false); setSaved(true); setTimeout(()=>setSaved(false),3000)
  }

  const typeColor: Record<string,string> = {
    Physical:"border-sky-200 bg-sky-50 text-sky-700",
    Weapons:"border-rose-200 bg-rose-50 text-rose-700",
    Mental:"border-violet-200 bg-violet-50 text-violet-700",
    Combat:"border-amber-200 bg-amber-50 text-amber-700",
    Mixed:"border-stone-200 bg-stone-50 text-stone-600",
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-stone-900">Training Sessions</h1>
          <p className="text-xs text-stone-400 mt-0.5">Log and manage all training activities</p>
        </div>
        <Button onClick={()=>setShowAdd(!showAdd)} className="gap-1.5 bg-[#1a2d4a] text-white hover:bg-[#243d61] shrink-0 text-xs">
          <Plus size={13}/> {showAdd?"Cancel":"Add Session"}
        </Button>
      </div>

      {saved&&<div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700"><CheckCircle2 size={14}/> Session added successfully.</div>}

      {showAdd&&(
        <Card className="border border-sky-200 bg-sky-50 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-sky-800">Log New Training Session</CardTitle></CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-semibold text-stone-600">Date *</Label><Input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} className="h-8 text-sm bg-white"/></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-semibold text-stone-600">Session Type *</Label><Select value={form.type} onValueChange={v=>setForm(f=>({...f,type:v}))}><SelectTrigger className="h-8 text-sm bg-white"><SelectValue/></SelectTrigger><SelectContent>{["Physical","Weapons","Mental","Combat","Mixed"].map(t=><SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-semibold text-stone-600">Soldiers Present</Label><Input type="number" min={1} max={10} value={form.soldiers} onChange={e=>setForm(f=>({...f,soldiers:e.target.value}))} className="h-8 text-sm bg-white"/></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-semibold text-stone-600">Notes</Label><Input placeholder="Brief session notes..." value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} className="h-8 text-sm bg-white"/></div>
            </div>
            <Button onClick={handleAdd} className="bg-[#4a5c2f] text-white hover:bg-[#344228] gap-1.5 text-xs h-8"><CheckCircle2 size={12}/> Save Session</Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-stone-100 bg-stone-50">{["Date","Session Type","Soldiers","Avg. Score","Notes","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-stone-50">
              {sessions.map((s,i)=>(
                <tr key={i} className={`hover:bg-stone-50 ${s.status==="Upcoming"?"bg-sky-50/30":""}`}>
                  <td className="px-4 py-3 font-mono text-xs text-stone-500 whitespace-nowrap">{s.date}</td>
                  <td className="px-4 py-3"><Badge className={`border text-xs ${typeColor[s.type]??typeColor.Mixed}`}>{s.type}</Badge></td>
                  <td className="px-4 py-3 text-sm font-semibold text-stone-700">{s.soldiers}</td>
                  <td className="px-4 py-3">{s.avg>0?<span className={`text-sm font-black ${sc(s.avg)}`}>{s.avg}</span>:<span className="text-xs text-stone-300">—</span>}</td>
                  <td className="px-4 py-3 text-xs text-stone-500 max-w-[200px]"><span className="line-clamp-2">{s.notes||"—"}</span></td>
                  <td className="px-4 py-3"><Badge className={`border text-xs ${s.status==="Complete"?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-sky-200 bg-sky-50 text-sky-700"}`}>{s.status==="Complete"?<><CheckCircle2 size={10} className="inline mr-1"/>Complete</>:s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2 text-xs text-stone-400">
          {sessions.filter(s=>s.status==="Complete").length} completed · {sessions.filter(s=>s.status==="Upcoming").length} upcoming
        </div>
      </Card>
    </div>
  )
}

// ── UPLOAD SECTION ────────────────────────────────────────────────────────────
function UploadSection() {
  const [dragging, setDragging] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false); setProcessing(true)
    setTimeout(()=>{ setProcessing(false); setUploaded(true) },2000)
  }
  return (
    <div className="space-y-5">
      <div><h1 className="text-xl font-bold text-stone-900">Upload Training Data</h1><p className="text-xs text-stone-400 mt-0.5">Bulk upload scores and training records via Excel or CSV</p></div>
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800"><FileSpreadsheet size={14} className="text-emerald-600"/> Bulk Upload</CardTitle></CardHeader>
        <CardContent className="px-4 pb-5">
          <div onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-all ${dragging?"border-[#4a5c2f] bg-[#f0f5e8]":uploaded?"border-emerald-400 bg-emerald-50":processing?"border-amber-300 bg-amber-50":"border-stone-200 bg-stone-50 hover:border-stone-300"}`}>
            {processing?(<><div className="text-3xl mb-3">⏳</div><div className="text-sm font-semibold text-amber-700">Processing file…</div><div className="text-xs text-stone-400 mt-1">Validating columns and importing scores</div></>)
            :uploaded?(<><CheckCircle2 size={40} className="text-emerald-500 mb-3"/><div className="text-sm font-bold text-emerald-700">Upload Successful!</div><div className="text-xs text-stone-400 mt-1">6 records processed · 0 errors</div><Button size="sm" variant="outline" onClick={()=>setUploaded(false)} className="mt-3 text-xs border-stone-200 text-stone-600">Upload Another</Button></>)
            :(<><FileSpreadsheet size={40} className="text-[#4a5c2f] mb-3"/><div className="text-sm font-semibold text-stone-700">Drag & drop your Excel file here</div><div className="text-xs text-stone-400 mt-1">.xlsx, .xls, .csv · Max 10 MB</div><Button size="sm" className="mt-4 bg-[#1a2d4a] text-white hover:bg-[#243d61] text-xs"><Upload size={12} className="mr-1"/> Browse File</Button></>)}
          </div>
        </CardContent>
      </Card>
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-stone-800">Required Column Format</CardTitle></CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          <div className="rounded-lg bg-stone-900 px-4 py-3 font-mono text-xs text-emerald-400 overflow-x-auto">soldier_id · training_date · training_type · running_min · pushups · pullups · shooting_pct · overall_score · remarks</div>
          <div className="text-xs text-stone-500 space-y-1">
            <div>• <strong>soldier_id</strong>: Must match existing Soldier ID (e.g. AGN-2024-0101)</div>
            <div>• <strong>training_type</strong>: Physical / Weapons / Mental / Combat</div>
            <div>• <strong>overall_score</strong>: 0–100 (calculated field, or leave blank to auto-compute)</div>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs border-stone-200 text-stone-600"><Download size={12}/> Download Template (.xlsx)</Button>
        </CardContent>
      </Card>
      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-stone-800">Upload History</CardTitle></CardHeader>
        <CardContent className="px-0 pb-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-stone-100 bg-stone-50">{["File Name","Uploaded On","Records","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-stone-50">
              {[{file:"training_mar14_2025.xlsx",date:"14 Mar 2025, 09:30",records:6,status:"Success"},{file:"training_mar05_2025.xlsx",date:"05 Mar 2025, 10:15",records:6,status:"Success"},{file:"training_feb28_2025.xlsx",date:"28 Feb 2025, 09:00",records:5,status:"Partial"}].map((r,i)=>(
                <tr key={i} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-mono text-xs text-stone-600">📄 {r.file}</td>
                  <td className="px-4 py-3 text-xs text-stone-400">{r.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-stone-700">{r.records}</td>
                  <td className="px-4 py-3"><Badge className={`border text-xs ${r.status==="Success"?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-amber-200 bg-amber-50 text-amber-700"}`}>{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

// ── PAGE ROOT ─────────────────────────────────────────────────────────────────
export default function TrainerPage() {
  const [section, setSection] = useState<Section>("dashboard")
  const titles: Record<Section,string> = { dashboard:"Dashboard", scores:"Soldier Scores", sessions:"Training Sessions", upload:"Upload Data" }
  return (
    <div className="flex min-h-screen bg-[#f4f3ef] font-sans">
      <Sidebar active={section} setActive={setSection}/>
      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-base font-bold text-stone-900">{titles[section]}</h1>
              <p className="text-xs text-stone-400">{TRAINER.battalion} · Trainer Portal</p>
            </div>
            <Badge className="border border-sky-200 bg-sky-50 text-xs text-sky-700 shrink-0">Trainer · Active</Badge>
          </div>
          <MobileNav active={section} setActive={setSection}/>
        </header>
        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 max-w-5xl w-full mx-auto">
          {section==="dashboard" && <DashboardSection setActive={setSection}/>}
          {section==="scores"    && <ScoresSection/>}
          {section==="sessions"  && <SessionsSection/>}
          {section==="upload"    && <UploadSection/>}
        </main>
      </div>
    </div>
  )
}