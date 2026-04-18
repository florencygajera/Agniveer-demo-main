"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Search,
  Pencil,
  Eye,
  MapPin,
  Shield,
  TrendingUp,
  UserCheck,
  UserMinus,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Target,
  Brain,
  Swords,
  BarChart3,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
type Grade = "Excellent" | "Good" | "SAT" | "Fail"
type Status = "Active" | "On Leave" | "Injured"
type Gender = "Male" | "Female"

interface Agniveer {
  id: string
  name: string
  rank: string
  gender: Gender
  battalion: string
  state: string
  physical: number
  weapons: number
  mental: number
  combat: number
  overall: number
  grade: Grade
  status: Status
}

// ── Data ──────────────────────────────────────────────────────────────────────
const AgniveerS: Agniveer[] = [
  {
    id: "AGN-2024-0101",
    name: "Rajveer Singh Chauhan",
    rank: "Sepoy",
    gender: "Male",
    battalion: "RR-1",
    state: "Rajasthan",
    physical: 91,
    weapons: 88,
    mental: 78,
    combat: 89,
    overall: 89,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0102",
    name: "Priya Sharma",
    rank: "Sepoy",
    gender: "Female",
    battalion: "RR-1",
    state: "Rajasthan",
    physical: 85,
    weapons: 72,
    mental: 94,
    combat: 80,
    overall: 87.3,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0103",
    name: "Arjun Mehra",
    rank: "Lance Naik",
    gender: "Male",
    battalion: "RR-1",
    state: "Punjab",
    physical: 96,
    weapons: 94,
    mental: 88,
    combat: 95,
    overall: 95,
    grade: "Excellent",
    status: "Active",
  },
  {
    id: "AGN-2024-0104",
    name: "Sunil Kumar",
    rank: "Sepoy",
    gender: "Male",
    battalion: "RR-1",
    state: "Haryana",
    physical: 68,
    weapons: 72,
    mental: 65,
    combat: 70,
    overall: 72,
    grade: "SAT",
    status: "Active",
  },
  {
    id: "AGN-2024-0105",
    name: "Kavita Rajput",
    rank: "Sepoy",
    gender: "Female",
    battalion: "RR-1",
    state: "UP",
    physical: 78,
    weapons: 74,
    mental: 82,
    combat: 76,
    overall: 80.5,
    grade: "Good",
    status: "On Leave",
  },
  {
    id: "AGN-2024-0106",
    name: "Mahesh Choudhary",
    rank: "Sepoy",
    gender: "Male",
    battalion: "RR-1",
    state: "Rajasthan",
    physical: 82,
    weapons: 91,
    mental: 70,
    combat: 84,
    overall: 84.3,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0201",
    name: "Vikram Nair",
    rank: "Sepoy",
    gender: "Male",
    battalion: "PARA-2",
    state: "Kerala",
    physical: 94,
    weapons: 88,
    mental: 86,
    combat: 93,
    overall: 92,
    grade: "Excellent",
    status: "Active",
  },
  {
    id: "AGN-2024-0202",
    name: "Ananya Krishnan",
    rank: "Sepoy",
    gender: "Female",
    battalion: "PARA-2",
    state: "Tamil Nadu",
    physical: 80,
    weapons: 75,
    mental: 91,
    combat: 78,
    overall: 85.8,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0203",
    name: "Rohit Sharma",
    rank: "Sepoy",
    gender: "Male",
    battalion: "PARA-2",
    state: "MP",
    physical: 75,
    weapons: 69,
    mental: 72,
    combat: 71,
    overall: 73.3,
    grade: "SAT",
    status: "Active",
  },
  {
    id: "AGN-2024-0204",
    name: "Deepak Yadav",
    rank: "Sepoy",
    gender: "Male",
    battalion: "PARA-2",
    state: "Bihar",
    physical: 88,
    weapons: 82,
    mental: 79,
    combat: 86,
    overall: 86.3,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0301",
    name: "Sourav Das",
    rank: "Sepoy",
    gender: "Male",
    battalion: "BEN-3",
    state: "WB",
    physical: 86,
    weapons: 80,
    mental: 83,
    combat: 85,
    overall: 86,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0302",
    name: "Rekha Bose",
    rank: "Sepoy",
    gender: "Female",
    battalion: "BEN-3",
    state: "WB",
    physical: 79,
    weapons: 71,
    mental: 90,
    combat: 75,
    overall: 84.2,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0303",
    name: "Amit Ghosh",
    rank: "Sepoy",
    gender: "Male",
    battalion: "BEN-3",
    state: "WB",
    physical: 65,
    weapons: 68,
    mental: 70,
    combat: 66,
    overall: 71,
    grade: "SAT",
    status: "Active",
  },
  {
    id: "AGN-2024-0304",
    name: "Ranjit Singh",
    rank: "Lance Naik",
    gender: "Male",
    battalion: "BEN-3",
    state: "Punjab",
    physical: 90,
    weapons: 89,
    mental: 87,
    combat: 91,
    overall: 91.7,
    grade: "Excellent",
    status: "Active",
  },
  {
    id: "AGN-2024-0401",
    name: "Santosh More",
    rank: "Sepoy",
    gender: "Male",
    battalion: "MAR-4",
    state: "Maharashtra",
    physical: 62,
    weapons: 66,
    mental: 70,
    combat: 65,
    overall: 69,
    grade: "Fail",
    status: "Active",
  },
  {
    id: "AGN-2024-0402",
    name: "Vijay Deshmukh",
    rank: "Sepoy",
    gender: "Male",
    battalion: "MAR-4",
    state: "Maharashtra",
    physical: 87,
    weapons: 85,
    mental: 84,
    combat: 88,
    overall: 88.2,
    grade: "Good",
    status: "Active",
  },
  {
    id: "AGN-2024-0403",
    name: "Sunita Patil",
    rank: "Sepoy",
    gender: "Female",
    battalion: "MAR-4",
    state: "Maharashtra",
    physical: 76,
    weapons: 70,
    mental: 85,
    combat: 72,
    overall: 79.5,
    grade: "Good",
    status: "On Leave",
  },
  {
    id: "AGN-2024-0404",
    name: "Ganesh Jadhav",
    rank: "Sepoy",
    gender: "Male",
    battalion: "MAR-4",
    state: "Maharashtra",
    physical: 80,
    weapons: 78,
    mental: 75,
    combat: 79,
    overall: 80,
    grade: "Good",
    status: "Active",
  },
]

const BATTALIONS = ["All Battalions", "RR-1", "PARA-2", "BEN-3", "MAR-4"]
const GRADES: (Grade | "All Grades")[] = [
  "All Grades",
  "Excellent",
  "Good",
  "SAT",
  "Fail",
]
const STATUSES: (Status | "All")[] = ["All", "Active", "On Leave", "Injured"]

// ── Helpers ───────────────────────────────────────────────────────────────────
function scoreColor(s: number) {
  if (s >= 90) return "text-emerald-600 font-bold"
  if (s >= 80) return "text-[#4a5c2f] font-semibold"
  if (s >= 70) return "text-amber-600 font-semibold"
  return "text-rose-500 font-semibold"
}

function GradeBadge({ grade }: { grade: Grade }) {
  const map: Record<Grade, string> = {
    Excellent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Good: "bg-sky-100 text-sky-700 border-sky-200",
    SAT: "bg-amber-100 text-amber-700 border-amber-200",
    Fail: "bg-rose-100 text-rose-600 border-rose-200",
  }
  return (
    <Badge
      className={`border text-xs font-semibold hover:opacity-90 ${map[grade]}`}
    >
      {grade}
    </Badge>
  )
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "On Leave": "bg-amber-50 text-amber-700 border-amber-200",
    Injured: "bg-rose-50 text-rose-600 border-rose-200",
  }
  return (
    <Badge
      className={`border text-xs font-medium hover:opacity-90 ${map[status]}`}
    >
      {status}
    </Badge>
  )
}

function BattalionChip({ code }: { code: string }) {
  const map: Record<string, string> = {
    "RR-1": "bg-[#eef3e6] text-[#4a5c2f] border-[#c5d9a0]",
    "PARA-2": "bg-violet-50 text-violet-700 border-violet-200",
    "BEN-3": "bg-sky-50 text-sky-700 border-sky-200",
    "MAR-4": "bg-amber-50 text-amber-700 border-amber-200",
  }
  return (
    <Badge
      variant="outline"
      className={`font-mono text-xs font-semibold ${map[code] ?? "border-stone-200 bg-stone-50 text-stone-600"}`}
    >
      {code}
    </Badge>
  )
}

// ── Score Mini Bar ────────────────────────────────────────────────────────────
function MiniBar({ value }: { value: number }) {
  const color =
    value >= 90
      ? "bg-emerald-500"
      : value >= 80
        ? "bg-[#4a5c2f]"
        : value >= 70
          ? "bg-amber-500"
          : "bg-rose-500"
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`text-xs tabular-nums ${scoreColor(value)}`}>
        {value}
      </span>
    </div>
  )
}

// ── Edit Dialog ───────────────────────────────────────────────────────────────
function EditDialog({
  Agniveer,
  open,
  onClose,
  onSave,
}: {
  Agniveer: Agniveer | null
  open: boolean
  onClose: () => void
  onSave: (s: Agniveer) => void
}) {
  const [form, setForm] = useState<Agniveer | null>(Agniveer)
  React.useEffect(() => setForm(Agniveer), [Agniveer])
  if (!form) return null
  const set = (k: keyof Agniveer, v: string | number) =>
    setForm((f) => (f ? { ...f, [k]: v } : f))
  const calcOverall = (f: Agniveer) =>
    Math.round(((f.physical + f.weapons + f.mental + f.combat) / 4) * 10) / 10

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base text-stone-800">
            <Pencil size={14} className="text-[#4a5c2f]" />
            Edit —{" "}
            <span className="font-mono text-sm text-stone-500">{form.id}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Rank</Label>
            <Select value={form.rank} onValueChange={(v) => set("rank", v)}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Sepoy", "Lance Naik", "Naik", "Havildar"].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => set("status", v as Status)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["Active", "On Leave", "Injured"] as Status[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {[
            {
              key: "physical",
              label: "Physical",
              icon: <Dumbbell size={11} />,
            },
            { key: "weapons", label: "Weapons", icon: <Target size={11} /> },
            { key: "mental", label: "Mental", icon: <Brain size={11} /> },
            { key: "combat", label: "Combat", icon: <Swords size={11} /> },
          ].map((f) => (
            <div key={f.key} className="space-y-1">
              <Label className="flex items-center gap-1 text-xs text-stone-500">
                {f.icon}
                {f.label}
              </Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={form[f.key as keyof Agniveer] as number}
                onChange={(e) => set(f.key as keyof Agniveer, +e.target.value)}
                className="text-sm"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-sm">
            Cancel
          </Button>
          <Button
            className="bg-[#4a5c2f] text-sm text-white hover:bg-[#3a4a22]"
            onClick={() => {
              const overall = calcOverall(form)
              const grade: Grade =
                overall >= 90
                  ? "Excellent"
                  : overall >= 80
                    ? "Good"
                    : overall >= 70
                      ? "SAT"
                      : "Fail"
              onSave({ ...form, overall, grade })
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

// ── Mobile Card ───────────────────────────────────────────────────────────────
function MobileCard({ s, onEdit }: { s: Agniveer; onEdit: () => void }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white shadow-sm ${s.grade === "Excellent" ? "border-emerald-200" : s.grade === "SAT" ? "border-amber-200" : "border-stone-200"}`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] text-stone-400">{s.id}</span>
            <BattalionChip code={s.battalion} />
            <GradeBadge grade={s.grade} />
          </div>
          <p className="text-sm font-semibold text-stone-900">{s.name}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="flex items-center gap-0.5 text-xs text-stone-400">
              <MapPin size={9} />
              {s.state}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={s.status} />
            <span className={`text-sm font-black ${scoreColor(s.overall)}`}>
              {s.overall}
            </span>
            <span className="text-xs text-stone-400">overall</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <Button
            size="sm"
            className="h-7 gap-1 bg-[#4a5c2f] text-xs text-white hover:bg-[#3a4a22]"
            onClick={onEdit}
          >
            <Pencil size={10} /> Edit
          </Button>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="self-end rounded-lg p-1.5 text-stone-400 hover:bg-stone-100"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="grid grid-cols-2 gap-3 border-t border-stone-100 bg-stone-50/60 px-4 py-3">
          {[
            {
              label: "Physical",
              value: s.physical,
              icon: <Dumbbell size={11} />,
            },
            { label: "Weapons", value: s.weapons, icon: <Target size={11} /> },
            { label: "Mental", value: s.mental, icon: <Brain size={11} /> },
            { label: "Combat", value: s.combat, icon: <Swords size={11} /> },
          ].map((f) => (
            <div key={f.label}>
              <p className="mb-1 flex items-center gap-1 text-[10px] text-stone-400">
                {f.icon}
                {f.label}
              </p>
              <MiniBar value={f.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AllAgniveersPage() {
  const [Agniveers, setAgniveers] = useState<Agniveer[]>(AgniveerS)
  const [search, setSearch] = useState("")
  const [battalion, setBattalion] = useState("All Battalions")
  const [grade, setGrade] = useState<Grade | "All Grades">("All Grades")
  const [status, setStatus] = useState<Status | "All">("All")
  const [editAgniveer, setEditAgniveer] = useState<Agniveer | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = Agniveers.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.battalion.toLowerCase().includes(q) ||
      s.state.toLowerCase().includes(q)
    const matchBat = battalion === "All Battalions" || s.battalion === battalion
    const matchGrade = grade === "All Grades" || s.grade === grade
    const matchStatus = status === "All" || s.status === status
    return matchSearch && matchBat && matchGrade && matchStatus
  })

  const counts = {
    total: Agniveers.length,
    active: Agniveers.filter((s) => s.status === "Active").length,
    onLeave: Agniveers.filter((s) => s.status === "On Leave").length,
    outstanding: Agniveers.filter((s) => s.grade === "Excellent").length,
    avgOverall:
      Math.round(
        (Agniveers.reduce((a, s) => a + s.overall, 0) / Agniveers.length) * 10
      ) / 10,
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                <Users size={20} className="text-[#4a5c2f]" /> All Agniveers
              </h1>
              <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
                {Agniveers.length} Agniveers · 4 Battalions · Click any row for
                full profile
              </p>
            </div>
            <Badge className="gap-1 border border-[#c5d9a0] bg-[#eef3e6] text-xs text-[#4a5c2f]">
              <BarChart3 size={10} /> {filtered.length} shown
            </Badge>
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-2 pb-3">
            <div className="relative min-w-[180px] flex-1">
              <Search
                size={13}
                className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"
              />
              <Input
                placeholder="Search name, ID, battalion..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full border-stone-200 bg-white pl-8 text-xs"
              />
            </div>
            <Select value={battalion} onValueChange={setBattalion}>
              <SelectTrigger className="h-8 w-36 border-stone-200 bg-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BATTALIONS.map((b) => (
                  <SelectItem key={b} value={b} className="text-xs">
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={grade}
              onValueChange={(v) => setGrade(v as Grade | "All Grades")}
            >
              <SelectTrigger className="h-8 w-36 border-stone-200 bg-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map((g) => (
                  <SelectItem key={g} value={g} className="text-xs">
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as Status | "All")}
            >
              <SelectTrigger className="h-8 w-28 border-stone-200 bg-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className="text-xs">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-4 px-4 py-5 sm:px-6 lg:px-8">
        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            {
              label: "Total Agniveers",
              value: counts.total,
              icon: <Users size={14} />,
              color: "text-stone-700",
            },
            {
              label: "Active",
              value: counts.active,
              icon: <UserCheck size={14} />,
              color: "text-emerald-600",
            },
            {
              label: "On Leave",
              value: counts.onLeave,
              icon: <UserMinus size={14} />,
              color: "text-amber-600",
            },
            {
              label: "Excellent",
              value: counts.outstanding,
              icon: <Shield size={14} />,
              color: "text-violet-600",
            },
            {
              label: "Avg. Score",
              value: counts.avgOverall,
              icon: <TrendingUp size={14} />,
              color: "text-[#4a5c2f]",
            },
          ].map((s) => (
            <Card key={s.label} className="border-stone-200 bg-white shadow-sm">
              <CardContent className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className={s.color}>{s.icon}</div>
                <div>
                  <p className="text-xs leading-tight text-stone-400">
                    {s.label}
                  </p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Desktop Table ── */}
        <Card className="hidden overflow-hidden border-stone-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {[
                    "Agniveer ID",
                    "Name",
                    "Gender",
                    "Battalion",
                    "State",
                    "Physical",
                    "Weapons",
                    "Mental",
                    "Combat",
                    "Overall",
                    "Grade",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-3 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-stone-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={13}
                      className="py-12 text-center text-sm text-stone-400"
                    >
                      No Agniveers match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr
                      key={s.id}
                      className={`transition-colors hover:bg-stone-50 ${s.grade === "Excellent" ? "bg-emerald-50/20" : s.grade === "SAT" ? "bg-amber-50/20" : ""}`}
                    >
                      <td className="px-3 py-2.5 font-mono text-xs whitespace-nowrap text-stone-400">
                        {s.id}
                      </td>
                      <td className="px-3 py-2.5 font-semibold whitespace-nowrap text-stone-900">
                        {s.name}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-stone-400">
                        {s.gender}
                      </td>
                      <td className="px-3 py-2.5">
                        <BattalionChip code={s.battalion} />
                      </td>
                      <td className="px-3 py-2.5 text-xs text-stone-500">
                        {s.state}
                      </td>
                      <td className="px-3 py-2.5">
                        <MiniBar value={s.physical} />
                      </td>
                      <td className="px-3 py-2.5">
                        <MiniBar value={s.weapons} />
                      </td>
                      <td className="px-3 py-2.5">
                        <MiniBar value={s.mental} />
                      </td>
                      <td className="px-3 py-2.5">
                        <MiniBar value={s.combat} />
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`text-sm font-black ${scoreColor(s.overall)}`}
                        >
                          {s.overall}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <GradeBadge grade={s.grade} />
                      </td>
                      <td className="px-3 py-2.5">
                        <StatusBadge status={s.status} />
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
                          >
                            <Eye size={11} /> View
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 gap-1 bg-[#4a5c2f] text-xs text-white hover:bg-[#3a4a22]"
                            onClick={() => {
                              setEditAgniveer(s)
                              setDialogOpen(true)
                            }}
                          >
                            <Pencil size={11} /> Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-stone-100 px-4 py-2.5">
            <p className="text-xs text-stone-400">
              {filtered.length} of {Agniveers.length} Agniveers
            </p>
          </div>
        </Card>

        {/* ── Mobile Cards ── */}
        <div className="space-y-3 lg:hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-stone-400">
              No Agniveers match your filters.
            </div>
          ) : (
            filtered.map((s) => (
              <MobileCard
                key={s.id}
                s={s}
                onEdit={() => {
                  setEditAgniveer(s)
                  setDialogOpen(true)
                }}
              />
            ))
          )}
          <p className="text-center text-xs text-stone-400">
            {filtered.length} of {Agniveers.length} Agniveers
          </p>
        </div>
      </div>

      <EditDialog
        Agniveer={editAgniveer}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(updated) =>
          setAgniveers((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
          )
        }
      />
    </div>
  )
}
