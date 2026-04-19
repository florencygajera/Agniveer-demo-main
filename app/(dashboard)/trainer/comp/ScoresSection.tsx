"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Eye, File, FileText, FileX2, Pencil, Search } from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────
const TRAINER = {
  battalion: "1st Rajputana Rifles",
}

const SOLDIERS = [
  {
    id: "AGN-2024-0101",
    name: "Rajveer Singh Chauhan",
    physical: 91,
    weapons: 88,
    mental: 78,
    combat: 89,
    attendance: 96,
    sports: 84,
    mapReading: 74,
    tactics: 81,
    overall: 83.6,
    status: "active",
  },
  {
    id: "AGN-2024-0102",
    name: "Naman Sharma",
    physical: 85,
    weapons: 72,
    mental: 94,
    combat: 80,
    attendance: 98,
    sports: 90,
    mapReading: 86,
    tactics: 88,
    overall: 85.4,
    status: "active",
  },
  {
    id: "AGN-2024-0103",
    name: "Arjun Mehra",
    physical: 96,
    weapons: 94,
    mental: 88,
    combat: 95,
    attendance: 100,
    sports: 98,
    mapReading: 92,
    tactics: 93,
    overall: 94.5,
    status: "active",
  },
  {
    id: "AGN-2024-0104",
    name: "Sunil Kumar",
    physical: 68,
    weapons: 72,
    mental: 65,
    combat: 70,
    attendance: 82,
    sports: 60,
    mapReading: 62,
    tactics: 64,
    overall: 67.9,
    status: "active",
  },
  {
    id: "AGN-2024-0105",
    name: "Dharmesh Rajput",
    physical: 78,
    weapons: 74,
    mental: 82,
    combat: 76,
    attendance: 88,
    sports: 77,
    mapReading: 85,
    tactics: 80,
    overall: 80.0,
    status: "on_leave",
  },
  {
    id: "AGN-2024-0106",
    name: "Mahesh Choudhary",
    physical: 82,
    weapons: 91,
    mental: 70,
    combat: 84,
    attendance: 91,
    sports: 79,
    mapReading: 80,
    tactics: 84,
    overall: 82.6,
    status: "active",
  },
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

// ── SOLDIER SCORES ────────────────────────────────────────────────────────────
export function ScoresSection({ onClick, onPage }: { onClick?: () => void; onPage?: () => void } = {}) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [editId, setEditId] = useState<string | null>(null)
  const [scores, setScores] = useState(SOLDIERS.map((s) => ({ ...s })))

  function grade(v: number) {
    if (v >= 90)
      return {
        l: "Excellent",
        c: "bg-emerald-100 text-emerald-700 border-emerald-200",
      }
    if (v >= 80)
      return { l: "Good", c: "bg-sky-100 text-sky-700 border-sky-200" }
    if (v >= 70)
      return { l: "SAT", c: "bg-amber-100 text-amber-700 border-amber-200" }
    return { l: "Failed", c: "bg-rose-100 text-rose-600 border-rose-200" }
  }

  const scoreFields = [
    { key: "physical", label: "Physical", tooltip: "Physical Fitness" },
    { key: "weapons", label: "Weapons", tooltip: "Weapons Proficiency" },
    { key: "mental", label: "Mental", tooltip: "Mental Aptitude" },
    { key: "combat", label: "Combat", tooltip: "Combat Skills" },
    { key: "attendance", label: "Attend.", tooltip: "Attendance" },
    { key: "sports", label: "Sport Pts.", tooltip: "Sport Points" },
    {
      key: "mapReading",
      label: "Map Reading Pts.",
      tooltip: "Map Reading Points",
    },
    { key: "tactics", label: "Tactics", tooltip: "Tactics Points" },
  ] as const

  const filtered = scores.filter((s) => {
    const q = search.toLowerCase()
    const matchQ =
      !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    const matchF =
      filter === "all" ||
      (filter === "good" && s.overall >= 85) ||
      (filter === "attn" && s.overall < 75)
    return matchQ && matchF
  })

  // Handle View Attendance button
  function handleAttendanceClick() {
    if (typeof onClick === "function") {
      onClick()
    }
    // else do nothing
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a2d4a]">
            Soldier Scores
          </h1>
          <p className="mt-0.5 text-sm font-medium text-stone-500">
            {TRAINER.battalion} &ndash; All Categories, Incl. Tactics
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={15}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-400"
            />
            <Input
              placeholder="Search by name or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 rounded-lg border-stone-200 bg-white pl-10 text-sm shadow-sm focus:border-[#1a2d4a] focus:ring-[#1a2d4a]/30"
            />
          </div>
          {[
            { v: "all", l: "All" },
            { v: "good", l: "Score ≥ 85" },
            { v: "attn", l: "Needs Attention" },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${filter === f.v
                ? "border-[#1a2d4a] bg-[#1a2d4a] text-white shadow"
                : "border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:bg-stone-50"
                }`}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden rounded-xl border-stone-200 bg-white/80 shadow-md">
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full text-[15px]">
            <thead>
              <tr className="border-b border-stone-100 bg-gradient-to-r from-stone-50 via-stone-100 to-stone-50">
                <th className="px-4 py-3 text-left text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase">
                  Agniveer
                </th>
                {scoreFields.map((field) => (
                  <th
                    key={field.key}
                    className="px-3 py-3 text-center text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase"
                    title={field.tooltip}
                  >
                    {field.label}
                  </th>
                ))}
                <th className="px-3 py-3 text-center text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase">
                  Overall
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase">
                  Grade
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase">
                  Actions
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase">
                  Medical Report
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold tracking-widest whitespace-nowrap text-stone-600 uppercase">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.map((s) => (
                <React.Fragment key={s.id}>
                  <tr className="transition-colors hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <div className="text-base font-semibold text-[#1a2d4a]">
                        {s.name}
                      </div>
                      <div className="font-mono text-[11px] text-stone-400">
                        {s.id}
                      </div>
                    </td>
                    {scoreFields.map(({ key }) => (
                      <td key={key} className="px-3 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-2 w-12 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                            <div
                              className={`h-full rounded-full transition-all ${bc(s[key] || 0)}`}
                              style={{ width: `${s[key] || 0}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-bold ${sc(s[key] || 0)}`}
                          >
                            {s[key] ?? 0}
                          </span>
                        </div>
                      </td>
                    ))}
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`text-lg font-extrabold ${sc(s.overall)}`}
                      >
                        {s.overall}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Badge
                        className={`rounded-full border px-2 py-1 text-xs ${grade(s.overall).c}`}
                      >
                        {grade(s.overall).l}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Badge
                        className={`rounded-full border px-2 py-1 text-xs ${s.status === "active"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                      >
                        {s.status === "active" ? "Active" : "On Leave"}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditId(editId === s.id ? null : s.id)}
                        className={`h-7 gap-1 rounded-lg border-stone-200 px-2 text-xs ${editId === s.id ? "border-amber-300 bg-amber-50 text-amber-700" : "text-stone-600"}`}
                      >
                        <Pencil size={11} />
                        {editId === s.id ? "Cancel" : "Edit"}
                      </Button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        // @ts-ignore
                        onClick={() => onPage && onPage("report")}
                        className={`h-7 gap-1 rounded-lg border-stone-200 px-2 text-xs ${editId === s.id ? "border-amber-300 bg-amber-50 text-amber-700" : "text-stone-600"}`}
                      >
                        <FileText size={11} /> Report
                      </Button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-full bg-sky-50 px-4 text-xs font-medium text-sky-900 hover:bg-sky-100"
                        onClick={handleAttendanceClick}
                        type="button"
                      >
                        <Eye /> View
                      </Button>
                    </td>
                  </tr>
                  {/* Inline score editor */}
                  {editId === s.id && (
                    <tr className="bg-gradient-to-r from-sky-50 via-stone-50 to-stone-50">
                      <td
                        colSpan={scoreFields.length + 6}
                        className="px-6 py-5"
                      >
                        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-stone-700">
                          <CheckCircle2 size={16} className="text-[#4a5c2f]" />
                          Edit Scores — {s.name}
                          <span className="ml-2 font-mono text-[11px] text-stone-400">
                            ({s.id})
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                          {scoreFields.map(({ key, label, tooltip }) => (
                            <div key={key} className="flex flex-col gap-1">
                              <label
                                className="text-xs font-semibold text-stone-500"
                                title={tooltip}
                              >
                                {label}
                              </label>
                              <Input
                                type="number"
                                min={0}
                                max={100}
                                value={s[key] ?? 0}
                                onChange={(e) =>
                                  setScores((prev) =>
                                    prev.map((x) => {
                                      if (x.id !== s.id) return x
                                      const newVal = +e.target.value
                                      const updated = {
                                        ...x,
                                        [key]: newVal,
                                      }
                                      // compute overall using all scoreFields
                                      const categories = scoreFields.map(
                                        (sf) => sf.key
                                      )
                                      const count = categories.length
                                      const sum = categories.reduce(
                                        (a, key2) =>
                                          a +
                                          (key2 === key
                                            ? newVal
                                            : (updated[key2] ?? 0)),
                                        0
                                      )
                                      updated.overall =
                                        Math.round((sum / count) * 10) / 10
                                      return updated
                                    })
                                  )
                                }
                                className="h-10 rounded-lg border-stone-200 text-center text-base shadow-sm focus:border-[#1a2d4a]"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                          <Button
                            size="sm"
                            className="h-9 rounded-lg bg-[#4a5c2f] px-5 text-sm font-semibold text-white shadow hover:bg-[#344228]"
                            onClick={() => setEditId(null)}
                          >
                            <CheckCircle2 size={13} className="mr-1" /> Save
                            Scores
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 rounded-lg border-stone-300 px-5 text-sm text-stone-700 shadow"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 border-t border-stone-100 bg-stone-50/50 px-4 py-3 text-sm text-stone-500">
          <span>
            <span className="font-bold text-[#1a2d4a]">{filtered.length}</span>{" "}
            of <span className="font-bold">{SOLDIERS.length}</span> soldiers
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">
            Click <span className="font-semibold text-[#4a5c2f]">Edit</span> to
            update scores, including Tactics
          </span>
        </div>
      </Card>
    </div>
  )
}
