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
  MapPin,
  Users,
  Shield,
  Plus,
  Pencil,
  ChevronRight,
  UserCheck,
  UserMinus,
  Star,
  TrendingUp,
  Search,
  Building2,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
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
}

// ── Data ──────────────────────────────────────────────────────────────────────
const INITIAL: Battalion[] = [
  {
    id: "1",
    code: "RR-1",
    name: "1st Rajputana Rifles",
    location: "Jaipur, Rajasthan",
    commander: "Col. R.K. Verma",
    score: 84.7,
    status: "Good",
    total: 6,
    active: 5,
    onLeave: 1,
    scoreAbove85: 3,
    physical: 83,
    weapons: 82,
    mental: 80,
    accentColor: "border-l-[#4a5c2f]",
  },
  {
    id: "2",
    code: "PARA-2",
    name: "2nd Parachute Regiment",
    location: "Agra, Uttar Pradesh",
    commander: "Col. S.P. Mehta",
    score: 84.4,
    status: "Good",
    total: 4,
    active: 4,
    onLeave: 0,
    scoreAbove85: 3,
    physical: 84,
    weapons: 79,
    mental: 82,
    accentColor: "border-l-violet-500",
  },
  {
    id: "3",
    code: "BEN-3",
    name: "3rd Bengal Regiment",
    location: "Kolkata, West Bengal",
    commander: "Col. D.K. Roy",
    score: 83.2,
    status: "Good",
    total: 4,
    active: 4,
    onLeave: 0,
    scoreAbove85: 2,
    physical: 82,
    weapons: 77,
    mental: 81,
    accentColor: "border-l-sky-500",
  },
  {
    id: "4",
    code: "MAR-4",
    name: "4th Maratha Light Infantry",
    location: "Pune, Maharashtra",
    commander: "Col. V.B. Patil",
    score: 80.0,
    status: "Good",
    total: 4,
    active: 4,
    onLeave: 0,
    scoreAbove85: 1,
    physical: 79,
    weapons: 75,
    mental: 77,
    accentColor: "border-l-amber-500",
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function scoreColor(s: number) {
  if (s >= 85) return "text-emerald-600"
  if (s >= 75) return "text-amber-600"
  return "text-rose-500"
}

function barColor(s: number) {
  if (s >= 85) return "bg-emerald-500"
  if (s >= 75) return "bg-amber-500"
  return "bg-rose-500"
}

function statusBadge(status: string) {
  return (
    <Badge className="border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
      {status}
    </Badge>
  )
}

// ── Edit Dialog ───────────────────────────────────────────────────────────────
function EditDialog({
  bat,
  open,
  onClose,
  onSave,
}: {
  bat: Battalion | null
  open: boolean
  onClose: () => void
  onSave: (b: Battalion) => void
}) {
  const [form, setForm] = useState<Battalion | null>(bat)
  React.useEffect(() => setForm(bat), [bat])
  if (!form) return null
  const set = (k: keyof Battalion, v: string | number) =>
    setForm((f) => (f ? { ...f, [k]: v } : f))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-stone-800">
            <Pencil size={15} className="text-[#4a5c2f]" />
            Edit — {form.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Battalion Name</Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Code</Label>
            <Input
              value={form.code}
              onChange={(e) => set("code", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Location</Label>
            <Input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Commander</Label>
            <Input
              value={form.commander}
              onChange={(e) => set("commander", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Physical Score</Label>
            <Input
              type="number"
              value={form.physical}
              onChange={(e) => set("physical", +e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Weapons Score</Label>
            <Input
              type="number"
              value={form.weapons}
              onChange={(e) => set("weapons", +e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Mental Score</Label>
            <Input
              type="number"
              value={form.mental}
              onChange={(e) => set("mental", +e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Total Soldiers</Label>
            <Input
              type="number"
              value={form.total}
              onChange={(e) => set("total", +e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-sm">
            Cancel
          </Button>
          <Button
            className="bg-[#4a5c2f] text-sm text-white hover:bg-[#3a4a22]"
            onClick={() => {
              const avg =
                Math.round(
                  ((form.physical + form.weapons + form.mental) / 3) * 10
                ) / 10
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

// ── Battalion Card ────────────────────────────────────────────────────────────
function BattalionCard({
  bat,
  onEdit,
}: {
  bat: Battalion
    onEdit: () => void
}) {
  const avgScore = bat.score

  return (
    <Card
      className={`border-l-4 border-stone-200 bg-white shadow-sm transition-all hover:shadow-md ${bat.accentColor} flex flex-col`}
    >
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base leading-tight font-bold text-stone-900">
              {bat.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-mono text-xs font-semibold text-stone-400">
                {bat.code}
              </span>
              <span className="text-xs text-stone-300">·</span>
              <span className="flex items-center gap-0.5 text-xs text-stone-500">
                <MapPin size={10} className="text-rose-400" /> {bat.location}
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
              <Shield size={10} className="text-stone-400" />
              Cmd: {bat.commander}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className={`text-3xl font-black ${scoreColor(avgScore)}`}>
              {avgScore}
            </p>
            {statusBadge(bat.status)}
          </div>
        </div>

        {/* Soldier stats */}
        <div className="grid grid-cols-4 gap-2 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2.5">
          {[
            {
              label: "Total",
              value: bat.total,
              icon: <Users size={13} className="text-stone-400" />,
            },
            {
              label: "Active",
              value: bat.active,
              icon: <UserCheck size={13} className="text-emerald-500" />,
            },
            {
              label: "On Leave",
              value: bat.onLeave,
              icon: <UserMinus size={13} className="text-amber-500" />,
            },
            {
              label: "Score ≥85",
              value: bat.scoreAbove85,
              icon: <Star size={13} className="text-[#4a5c2f]" />,
            },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              {s.icon}
              <span className="text-lg leading-tight font-bold text-stone-800">
                {s.value}
              </span>
              <span className="text-center text-[9px] leading-tight font-medium tracking-wide text-stone-400 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Score bars */}
        <div className="space-y-2.5">
          {[
            { label: "Physical", value: bat.physical },
            { label: "Weapons", value: bat.weapons },
            { label: "Mental", value: bat.mental },
          ].map((bar) => (
            <div key={bar.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">
                  {bar.label}
                </span>
                <span className={`text-xs font-bold ${scoreColor(bar.value)}`}>
                  {bar.value}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barColor(bar.value)}`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-auto flex gap-2 pt-1">
          <Button className="h-9 flex-1 gap-1.5 bg-stone-800 text-xs text-white hover:bg-stone-900">
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BattalionsPage() {
  const [battalions, setBattalions] = useState<Battalion[]>(INITIAL)
  const [search, setSearch] = useState("")
  const [editBat, setEditBat] = useState<Battalion | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = battalions.filter(
    (b) =>
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.code.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  )

  const totalSoldiers = battalions.reduce((s, b) => s + b.total, 0)
  const avgScore =
    Math.round(
      (battalions.reduce((s, b) => s + b.score, 0) / battalions.length) * 10
    ) / 10
  const totalActive = battalions.reduce((s, b) => s + b.active, 0)

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              <Building2 size={20} className="text-[#4a5c2f]" />
              All Battalions
            </h1>
            <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
              Click any battalion to drill down into its soldiers
            </p>
          </div>
          <Button className="gap-2 bg-[#4a5c2f] text-sm text-white shadow-sm hover:bg-[#3a4a22]">
            <Plus size={15} /> Create Battalion
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        {/* ── Summary Strip ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Battalions",
              value: battalions.length,
              icon: <Building2 size={15} />,
              color: "text-stone-700",
            },
            {
              label: "Total Soldiers",
              value: totalSoldiers,
              icon: <Users size={15} />,
              color: "text-sky-600",
            },
            {
              label: "Active Duty",
              value: totalActive,
              icon: <UserCheck size={15} />,
              color: "text-emerald-600",
            },
            {
              label: "Avg. Score",
              value: avgScore,
              icon: <TrendingUp size={15} />,
              color: "text-amber-600",
            },
          ].map((s) => (
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

        {/* ── Search ── */}
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search
              size={13}
              className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"
            />
            <Input
              placeholder="Search battalion, code, location..."
              className="h-8 border-stone-200 bg-white pl-8 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <p className="ml-auto text-xs text-stone-400">
            {filtered.length} of {battalions.length} battalions
          </p>
        </div>

        {/* ── Cards Grid ── */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-stone-400">
            No battalions match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((bat) => (
                <BattalionCard
                  key={bat.id}
                  bat={bat}
                onEdit={() => {
                  setEditBat(bat)
                  setDialogOpen(true)
                }}
              />
            ))}
          </div>
        )}
      </div>

      <EditDialog
        bat={editBat}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(updated) =>
          setBattalions((prev) =>
            prev.map((b) => (b.id === updated.id ? updated : b))
          )
        }
      />
    </div>
  )
}
