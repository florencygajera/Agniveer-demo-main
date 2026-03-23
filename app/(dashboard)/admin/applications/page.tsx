"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Search,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Star,
  AlertCircle,
  Pencil,
  MapPin,
  GraduationCap,
  Ruler,
  Weight,
  Briefcase,
  CalendarDays,
  UserCheck,
  StickyNote,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
type AppStatus =
  | "Under Review"
  | "Verified"
  | "Pending Docs"
  | "Selected"
  | "Rejected"
type FilterTab =
  | "All"
  | "Under Review"
  | "Verified"
  | "Pending Docs"
  | "Selected"
  | "Rejected"

interface Application {
  id: string
  name: string
  state: string
  education: string
  height: string
  weight: string
  trade: string
  appliedOn: string
  verifiedBy: string
  status: AppStatus
  notes: string
}

// ── Data ──────────────────────────────────────────────────────────────────────
const INITIAL_APPS: Application[] = [
  {
    id: "APP-2025-001",
    name: "Aryan Kumar Sharma",
    state: "Rajasthan",
    education: "12th Pass",
    height: "172 cm",
    weight: "65 kg",
    trade: "Agniveer GD",
    appliedOn: "12 Mar 2025",
    verifiedBy: "—",
    status: "Under Review",
    notes: "—",
  },
  {
    id: "APP-2025-002",
    name: "Priya Kumari Singh",
    state: "Bihar",
    education: "12th Pass",
    height: "162 cm",
    weight: "55 kg",
    trade: "Agniveer GD",
    appliedOn: "10 Mar 2025",
    verifiedBy: "Maj. Ankit Verma",
    status: "Verified",
    notes: "All documents verified.",
  },
  {
    id: "APP-2025-003",
    name: "Karan Deep Singh",
    state: "Punjab",
    education: "12th Pass",
    height: "175 cm",
    weight: "68 kg",
    trade: "Agniveer Tech",
    appliedOn: "09 Mar 2025",
    verifiedBy: "—",
    status: "Pending Docs",
    notes: "Awaiting education certificate.",
  },
  {
    id: "APP-2025-004",
    name: "Meena Devi",
    state: "HP",
    education: "10th Pass",
    height: "158 cm",
    weight: "50 kg",
    trade: "Agniveer GD",
    appliedOn: "08 Mar 2025",
    verifiedBy: "Maj. Ankit Verma",
    status: "Rejected",
    notes: "Education qualification not met.",
  },
  {
    id: "APP-2025-005",
    name: "Rohan Joshi",
    state: "Gujarat",
    education: "12th Pass",
    height: "170 cm",
    weight: "63 kg",
    trade: "Agniveer GD",
    appliedOn: "07 Mar 2025",
    verifiedBy: "Maj. Ankit Verma",
    status: "Selected",
    notes: "All checks passed. Eligible.",
  },
  {
    id: "APP-2025-006",
    name: "Sneha Gupta",
    state: "UP",
    education: "12th Pass",
    height: "160 cm",
    weight: "53 kg",
    trade: "Agniveer GD",
    appliedOn: "06 Mar 2025",
    verifiedBy: "—",
    status: "Under Review",
    notes: "—",
  },
  {
    id: "APP-2025-007",
    name: "Ajay Thakur",
    state: "HP",
    education: "ITI",
    height: "174 cm",
    weight: "70 kg",
    trade: "Agniveer Tech",
    appliedOn: "05 Mar 2025",
    verifiedBy: "—",
    status: "Under Review",
    notes: "—",
  },
]

// ── Status Config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  AppStatus,
  { pill: string; dot: string; icon: React.ReactNode }
> = {
  "Under Review": {
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
    icon: <Clock size={11} />,
  },
  Verified: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    icon: <CheckCircle2 size={11} />,
  },
  "Pending Docs": {
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    icon: <AlertCircle size={11} />,
  },
  Selected: {
    pill: "bg-[#eef3e6] text-[#4a5c2f] border-[#c5d9a0]",
    dot: "bg-[#4a5c2f]",
    icon: <Star size={11} />,
  },
  Rejected: {
    pill: "bg-rose-50 text-rose-600 border-rose-200",
    dot: "bg-rose-500",
    icon: <XCircle size={11} />,
  },
}

function StatusBadge({ status }: { status: AppStatus }) {
  const c = STATUS_CONFIG[status]
  return (
    <Badge
      className={`gap-1 border text-xs font-medium whitespace-nowrap hover:opacity-90 ${c.pill}`}
    >
      {c.icon} {status}
    </Badge>
  )
}

const FILTER_TABS: FilterTab[] = [
  "All",
  "Under Review",
  "Verified",
  "Pending Docs",
  "Selected",
  "Rejected",
]

const TAB_ACTIVE: Record<FilterTab, string> = {
  All: "bg-stone-800 text-white border-stone-800",
  "Under Review": "bg-sky-600 text-white border-sky-600",
  Verified: "bg-emerald-600 text-white border-emerald-600",
  "Pending Docs": "bg-amber-500 text-white border-amber-500",
  Selected: "bg-[#4a5c2f] text-white border-[#4a5c2f]",
  Rejected: "bg-rose-600 text-white border-rose-600",
}

// ── Edit Dialog ───────────────────────────────────────────────────────────────
function EditDialog({
  app,
  open,
  onClose,
  onSave,
}: {
  app: Application | null
  open: boolean
  onClose: () => void
  onSave: (a: Application) => void
}) {
  const [form, setForm] = useState<Application | null>(app)
  React.useEffect(() => setForm(app), [app])
  if (!form) return null
  const set = (k: keyof Application, v: string) =>
    setForm((f) => (f ? { ...f, [k]: v } : f))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base text-stone-800">
            <Pencil size={15} className="text-[#4a5c2f]" />
            Review / Edit — <span className="font-mono text-sm">{form.id}</span>
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
            <Label className="text-xs text-stone-500">State</Label>
            <Input
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Education</Label>
            <Input
              value={form.education}
              onChange={(e) => set("education", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Height</Label>
            <Input
              value={form.height}
              onChange={(e) => set("height", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Weight</Label>
            <Input
              value={form.weight}
              onChange={(e) => set("weight", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Trade</Label>
            <Select value={form.trade} onValueChange={(v) => set("trade", v)}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Agniveer GD", "Agniveer Tech", "Agniveer Clerk"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => set("status", v as AppStatus)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(STATUS_CONFIG) as AppStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Notes</Label>
            <Textarea
              rows={3}
              value={form.notes === "—" ? "" : form.notes}
              onChange={(e) => set("notes", e.target.value || "—")}
              className="resize-none text-sm"
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
              onSave(form)
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
function MobileCard({ app, onEdit }: { app: Application; onEdit: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const rowBg =
    app.status === "Rejected"
      ? "border-rose-200 bg-rose-50/40"
      : app.status === "Selected"
        ? "border-emerald-200 bg-emerald-50/30"
        : "border-stone-200 bg-white"

  return (
    <div className={`overflow-hidden rounded-xl border shadow-sm ${rowBg}`}>
      {/* Main row */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] text-stone-400">
              {app.id}
            </span>
            <StatusBadge status={app.status} />
          </div>
          <p className="mt-1 truncate text-sm font-semibold text-stone-800">
            {app.name}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="flex items-center gap-1 text-xs text-stone-500">
              <MapPin size={10} />
              {app.state}
            </span>
            <span className="flex items-center gap-1 text-xs text-stone-500">
              <Briefcase size={10} />
              {app.trade}
            </span>
            <span className="flex items-center gap-1 text-xs text-stone-500">
              <CalendarDays size={10} />
              {app.appliedOn}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            size="sm"
            className="h-7 gap-1 bg-[#4a5c2f] text-xs text-white hover:bg-[#3a4a22]"
            onClick={onEdit}
          >
            <Pencil size={10} /> Edit
          </Button>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-stone-100 bg-stone-50/60 px-4 py-3">
          {[
            {
              icon: <GraduationCap size={11} />,
              label: "Education",
              value: app.education,
            },
            { icon: <Ruler size={11} />, label: "Height", value: app.height },
            { icon: <Weight size={11} />, label: "Weight", value: app.weight },
            {
              icon: <UserCheck size={11} />,
              label: "Verified By",
              value: app.verifiedBy,
            },
          ].map((f) => (
            <div key={f.label}>
              <p className="flex items-center gap-1 text-[10px] text-stone-400">
                {f.icon}
                {f.label}
              </p>
              <p className="text-xs font-medium text-stone-700">{f.value}</p>
            </div>
          ))}
          {app.notes !== "—" && (
            <div className="col-span-2">
              <p className="flex items-center gap-1 text-[10px] text-stone-400">
                <StickyNote size={11} />
                Notes
              </p>
              <p className="text-xs text-stone-600">{app.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RecruitmentPage() {
  const [apps, setApps] = useState<Application[]>(INITIAL_APPS)
  const [activeTab, setActiveTab] = useState<FilterTab>("All")
  const [search, setSearch] = useState("")
  const [editApp, setEditApp] = useState<Application | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const countFor = (tab: FilterTab) =>
    tab === "All" ? apps.length : apps.filter((a) => a.status === tab).length

  const filtered = apps.filter((a) => {
    const matchTab = activeTab === "All" || a.status === activeTab
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      [a.name, a.id, a.state, a.trade].some((v) => v.toLowerCase().includes(q))
    return matchTab && matchSearch
  })

  const openEdit = (app: Application) => {
    setEditApp(app)
    setDialogOpen(true)
  }
  const saveEdit = (updated: Application) =>
    setApps((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))

  const counts = {
    total: apps.length,
    underReview: apps.filter((a) => a.status === "Under Review").length,
    verified: apps.filter((a) => a.status === "Verified").length,
    selected: apps.filter((a) => a.status === "Selected").length,
    rejected: apps.filter((a) => a.status === "Rejected").length,
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              <FileText size={20} className="text-[#4a5c2f]" />
              Recruitment Applications
            </h1>
            <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
              Agnipath Batch 2025 · Review, verify, and update applications
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs text-stone-600"
          >
            <Download size={13} /> Export
          </Button>
        </div>
      </div>

      <div className="mx-auto space-y-4 px-4 py-5 sm:px-6 lg:px-8">
        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            {
              label: "Total",
              value: counts.total,
              color: "text-stone-700",
              icon: <Users size={15} />,
            },
            {
              label: "Under Review",
              value: counts.underReview,
              color: "text-sky-600",
              icon: <Clock size={15} />,
            },
            {
              label: "Verified",
              value: counts.verified,
              color: "text-emerald-600",
              icon: <CheckCircle2 size={15} />,
            },
            {
              label: "Selected",
              value: counts.selected,
              color: "text-[#4a5c2f]",
              icon: <Star size={15} />,
            },
            {
              label: "Rejected",
              value: counts.rejected,
              color: "text-rose-500",
              icon: <XCircle size={15} />,
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

        {/* ── Filters + Search ── */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {/* Scrollable filter tabs */}
          <div className="scrollbar-hide flex flex-1 gap-1.5 overflow-x-auto pb-1">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? TAB_ACTIVE[tab]
                    : "border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                {tab} ({countFor(tab)})
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-full shrink-0 sm:w-auto">
            <Search
              size={13}
              className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"
            />
            <Input
              placeholder="Search name, ID, state..."
              className="h-8 w-full border-stone-200 bg-white pl-8 text-xs sm:w-52"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Desktop Table ── */}
        <Card className="hidden border-stone-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {[
                    { label: "App. ID", icon: <FileText size={11} /> },
                    { label: "Name", icon: <Users size={11} /> },
                    { label: "State", icon: <MapPin size={11} /> },
                    { label: "Education", icon: <GraduationCap size={11} /> },
                    { label: "Height", icon: <Ruler size={11} /> },
                    { label: "Weight", icon: <Weight size={11} /> },
                    { label: "Trade", icon: <Briefcase size={11} /> },
                    { label: "Applied On", icon: <CalendarDays size={11} /> },
                    { label: "Verified By", icon: <UserCheck size={11} /> },
                    { label: "Status", icon: null },
                    { label: "Notes", icon: <StickyNote size={11} /> },
                    { label: "Action", icon: null },
                  ].map((h) => (
                    <th
                      key={h.label}
                      className="px-4 py-3 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-stone-500 uppercase"
                    >
                      <span className="flex items-center gap-1">
                        {h.icon}
                        {h.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="py-12 text-center text-sm text-stone-400"
                    >
                      No applications match your filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((app) => (
                    <tr
                      key={app.id}
                      className={`transition-colors ${
                        app.status === "Rejected"
                          ? "bg-rose-50/30 hover:bg-rose-50/60"
                          : app.status === "Selected"
                            ? "bg-emerald-50/20 hover:bg-emerald-50/50"
                            : "hover:bg-stone-50"
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-stone-400">
                        {app.id}
                      </td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap text-stone-800">
                        {app.name}
                      </td>
                      <td className="px-4 py-3 text-stone-600">{app.state}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                        {app.education}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                        {app.height}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                        {app.weight}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                        {app.trade}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap text-stone-400">
                        {app.appliedOn}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap text-stone-500">
                        {app.verifiedBy === "—" ? (
                          <span className="text-stone-300">—</span>
                        ) : (
                          app.verifiedBy
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="max-w-[140px] px-4 py-3 text-xs text-stone-400">
                        <span className="line-clamp-1">
                          {app.notes === "—" ? (
                            <span className="text-stone-300">—</span>
                          ) : (
                            app.notes
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          onClick={() => openEdit(app)}
                          className="h-7 gap-1 bg-[#4a5c2f] text-xs whitespace-nowrap text-white hover:bg-[#3a4a22]"
                        >
                          <Pencil size={10} /> Review / Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-stone-100 px-4 py-3">
            <p className="text-xs text-stone-400">
              {filtered.length} of {apps.length} applications
            </p>
          </div>
        </Card>

        {/* ── Mobile / Tablet Cards ── */}
        <div className="space-y-3 lg:hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-stone-400">
              No applications match your filter.
            </div>
          ) : (
            filtered.map((app) => (
              <MobileCard key={app.id} app={app} onEdit={() => openEdit(app)} />
            ))
          )}
          <p className="text-center text-xs text-stone-400">
            {filtered.length} of {apps.length} applications
          </p>
        </div>
      </div>

      <EditDialog
        app={editApp}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={saveEdit}
      />
    </div>
  )
}
