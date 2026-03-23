"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Trophy,
  Medal,
  Search,
  TrendingUp,
  Users,
  Dumbbell,
  Target,
  Brain,
  Swords,
  CalendarDays,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Crown,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
interface Soldier {
  rank: number
  name: string
  battalion: string
  physical: number
  weapons: number
  mental: number
  combat: number
  attend: number
  discip: number
  overall: number
}

// ── Data ──────────────────────────────────────────────────────────────────────
const LEADERBOARD: Soldier[] = [
  {
    rank: 1,
    name: "Arjun Mehra",
    battalion: "RR-1",
    physical: 96,
    weapons: 94,
    mental: 88,
    combat: 95,
    attend: 100,
    discip: 97,
    overall: 95,
  },
  {
    rank: 2,
    name: "Vikram Nair",
    battalion: "PARA-2",
    physical: 94,
    weapons: 88,
    mental: 86,
    combat: 93,
    attend: 97,
    discip: 94,
    overall: 92,
  },
  {
    rank: 3,
    name: "Ranjit Singh",
    battalion: "BEN-3",
    physical: 90,
    weapons: 92,
    mental: 84,
    combat: 91,
    attend: 98,
    discip: 95,
    overall: 91.7,
  },
  {
    rank: 4,
    name: "Rajveer Singh Chauhan",
    battalion: "RR-1",
    physical: 91,
    weapons: 88,
    mental: 78,
    combat: 89,
    attend: 96,
    discip: 92,
    overall: 89,
  },
  {
    rank: 5,
    name: "Vijay Deshmukh",
    battalion: "MAR-4",
    physical: 88,
    weapons: 85,
    mental: 82,
    combat: 87,
    attend: 95,
    discip: 92,
    overall: 88.2,
  },
  {
    rank: 6,
    name: "Priya Sharma",
    battalion: "RR-1",
    physical: 85,
    weapons: 72,
    mental: 94,
    combat: 80,
    attend: 98,
    discip: 95,
    overall: 87.3,
  },
  {
    rank: 7,
    name: "Deepak Yadav",
    battalion: "PARA-2",
    physical: 88,
    weapons: 82,
    mental: 79,
    combat: 86,
    attend: 93,
    discip: 90,
    overall: 86.3,
  },
  {
    rank: 8,
    name: "Sourav Das",
    battalion: "BEN-3",
    physical: 86,
    weapons: 80,
    mental: 83,
    combat: 85,
    attend: 94,
    discip: 88,
    overall: 86,
  },
  {
    rank: 9,
    name: "Ananya Krishnan",
    battalion: "PARA-2",
    physical: 80,
    weapons: 75,
    mental: 91,
    combat: 78,
    attend: 95,
    discip: 96,
    overall: 85.8,
  },
  {
    rank: 10,
    name: "Mahesh Choudhary",
    battalion: "RR-1",
    physical: 82,
    weapons: 91,
    mental: 70,
    combat: 84,
    attend: 91,
    discip: 88,
    overall: 84.3,
  },
  {
    rank: 11,
    name: "Rekha Bose",
    battalion: "BEN-3",
    physical: 79,
    weapons: 71,
    mental: 90,
    combat: 75,
    attend: 96,
    discip: 94,
    overall: 84.2,
  },
  {
    rank: 12,
    name: "Suresh Patil",
    battalion: "MAR-4",
    physical: 83,
    weapons: 79,
    mental: 76,
    combat: 81,
    attend: 89,
    discip: 86,
    overall: 82.3,
  },
  {
    rank: 13,
    name: "Kavita Rajput",
    battalion: "RR-1",
    physical: 78,
    weapons: 74,
    mental: 82,
    combat: 76,
    attend: 92,
    discip: 88,
    overall: 80.5,
  },
  {
    rank: 14,
    name: "Ganesh Jadhav",
    battalion: "MAR-4",
    physical: 80,
    weapons: 78,
    mental: 75,
    combat: 79,
    attend: 88,
    discip: 85,
    overall: 80,
  },
  {
    rank: 15,
    name: "Rohit Sharma",
    battalion: "PARA-2",
    physical: 75,
    weapons: 69,
    mental: 72,
    combat: 71,
    attend: 87,
    discip: 83,
    overall: 73.3,
  },
  {
    rank: 16,
    name: "Sunita Patil",
    battalion: "MAR-4",
    physical: 76,
    weapons: 70,
    mental: 85,
    combat: 72,
    attend: 90,
    discip: 84,
    overall: 79.5,
  },
  {
    rank: 17,
    name: "Sunil Kumar",
    battalion: "RR-1",
    physical: 68,
    weapons: 72,
    mental: 65,
    combat: 70,
    attend: 85,
    discip: 80,
    overall: 72,
  },
  {
    rank: 18,
    name: "Amit Ghosh",
    battalion: "BEN-3",
    physical: 65,
    weapons: 68,
    mental: 70,
    combat: 66,
    attend: 82,
    discip: 78,
    overall: 71,
  },
]

const BATTALIONS = ["All", "RR-1", "PARA-2", "BEN-3", "MAR-4"]

// ── Helpers ───────────────────────────────────────────────────────────────────
function scoreColor(s: number) {
  if (s >= 90) return "text-emerald-600"
  if (s >= 80) return "text-[#4a5c2f]"
  if (s >= 70) return "text-amber-600"
  return "text-rose-500"
}

function RankDisplay({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-md">
        <Trophy size={16} className="text-white" />
      </div>
    )
  if (rank === 2)
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400 shadow-md">
        <Medal size={16} className="text-white" />
      </div>
    )
  if (rank === 3)
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-md">
        <Medal size={16} className="text-white" />
      </div>
    )
  return (
    <div className="flex h-9 w-9 items-center justify-center">
      <span className="text-sm font-bold text-stone-400">#{rank}</span>
    </div>
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
      className={`font-mono text-xs font-semibold ${map[code] ?? "border-stone-200 bg-stone-50 text-stone-500"}`}
    >
      {code}
    </Badge>
  )
}

function ScoreCell({ value }: { value: number }) {
  const color = scoreColor(value)
  const bgBar =
    value >= 90
      ? "bg-emerald-500"
      : value >= 80
        ? "bg-[#4a5c2f]"
        : value >= 70
          ? "bg-amber-500"
          : "bg-rose-500"
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`text-sm font-bold tabular-nums ${color}`}>{value}</span>
      <div className="h-1 w-8 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full ${bgBar}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

// ── Row Highlight ─────────────────────────────────────────────────────────────
function rowBg(rank: number) {
  if (rank === 1)
    return "bg-gradient-to-r from-amber-50/80 to-transparent border-l-2 border-l-amber-400"
  if (rank === 2)
    return "bg-gradient-to-r from-slate-50/80 to-transparent border-l-2 border-l-slate-400"
  if (rank === 3)
    return "bg-gradient-to-r from-orange-50/80 to-transparent border-l-2 border-l-amber-700"
  return "hover:bg-stone-50 border-l-2 border-l-transparent"
}

// ── Mobile Card ───────────────────────────────────────────────────────────────
function MobileRankCard({ s }: { s: Soldier }) {
  const [expanded, setExpanded] = useState(false)
  const isMedal = s.rank <= 3

  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-sm ${
        s.rank === 1
          ? "border-amber-300 bg-gradient-to-br from-amber-50 to-white"
          : s.rank === 2
            ? "border-slate-300 bg-gradient-to-br from-slate-50 to-white"
            : s.rank === 3
              ? "border-amber-700/30 bg-gradient-to-br from-orange-50 to-white"
              : "border-stone-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3 p-3.5">
        <RankDisplay rank={s.rank} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`text-sm font-bold ${isMedal ? "text-stone-900" : "text-stone-800"}`}
            >
              {s.name}
            </p>
            <BattalionChip code={s.battalion} />
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <span className={`text-lg font-black ${scoreColor(s.overall)}`}>
              {s.overall}
            </span>
            <span className="text-xs text-stone-400">overall score</span>
          </div>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="shrink-0 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100"
        >
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>
      {expanded && (
        <div className="grid grid-cols-3 gap-3 border-t border-stone-100 bg-stone-50/60 px-4 py-3">
          {[
            {
              label: "Physical",
              value: s.physical,
              icon: <Dumbbell size={10} />,
            },
            { label: "Weapons", value: s.weapons, icon: <Target size={10} /> },
            { label: "Mental", value: s.mental, icon: <Brain size={10} /> },
            { label: "Combat", value: s.combat, icon: <Swords size={10} /> },
            {
              label: "Attend.",
              value: s.attend,
              icon: <CalendarDays size={10} />,
            },
            {
              label: "Discip.",
              value: s.discip,
              icon: <ShieldCheck size={10} />,
            },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-0.5 text-[10px] text-stone-400">
                {f.icon}
                {f.label}
              </span>
              <span className={`text-sm font-bold ${scoreColor(f.value)}`}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PerformanceRankingsPage() {
  const [search, setSearch] = useState("")
  const [battalion, setBattalion] = useState("All")

  const filtered = LEADERBOARD.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.battalion.toLowerCase().includes(q)
    const matchBat = battalion === "All" || s.battalion === battalion
    return matchSearch && matchBat
  })

  const top3 = LEADERBOARD.slice(0, 3)
  const avgOverall =
    Math.round(
      (LEADERBOARD.reduce((a, s) => a + s.overall, 0) / LEADERBOARD.length) * 10
    ) / 10

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              <Crown size={20} className="text-amber-500" />
              Performance Rankings
            </h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-500 sm:text-sm">
              <CalendarDays size={11} className="text-stone-400" />
              All-India Agniveer Rankings — March 2025
            </p>
          </div>
          <Badge className="gap-1 border border-amber-200 bg-amber-50 text-xs font-medium text-amber-700">
            <Trophy size={10} /> {LEADERBOARD.length} soldiers ranked
          </Badge>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        {/* ── Podium (Top 3) ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* 2nd */}
          <Card className="order-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white shadow-sm sm:order-1">
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg">
                <Medal size={22} className="text-white" />
              </div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                2nd Place
              </p>
              <p className="text-sm font-bold text-stone-800">{top3[1].name}</p>
              <BattalionChip code={top3[1].battalion} />
              <p className="text-3xl font-black text-slate-500">
                {top3[1].overall}
              </p>
            </CardContent>
          </Card>
          {/* 1st */}
          <Card className="order-1 border-amber-400 bg-gradient-to-br from-amber-50 to-white shadow-md ring-1 ring-amber-300 sm:order-2">
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-lg">
                <Trophy size={26} className="text-white" />
              </div>
              <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
                🏆 Champion
              </p>
              <p className="text-base font-black text-stone-900">
                {top3[0].name}
              </p>
              <BattalionChip code={top3[0].battalion} />
              <p className="text-4xl font-black text-amber-600">
                {top3[0].overall}
              </p>
            </CardContent>
          </Card>
          {/* 3rd */}
          <Card className="order-3 border-amber-700/30 bg-gradient-to-br from-orange-50 to-white shadow-sm">
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg">
                <Medal size={22} className="text-white" />
              </div>
              <p className="text-xs font-semibold tracking-widest text-amber-700 uppercase">
                3rd Place
              </p>
              <p className="text-sm font-bold text-stone-800">{top3[2].name}</p>
              <BattalionChip code={top3[2].battalion} />
              <p className="text-3xl font-black text-amber-700">
                {top3[2].overall}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── Summary Strip ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Ranked",
              value: LEADERBOARD.length,
              icon: <Users size={14} />,
              color: "text-stone-700",
            },
            {
              label: "Avg. Score",
              value: avgOverall,
              icon: <TrendingUp size={14} />,
              color: "text-[#4a5c2f]",
            },
            {
              label: "Score ≥ 90",
              value: LEADERBOARD.filter((s) => s.overall >= 90).length,
              icon: <Trophy size={14} />,
              color: "text-amber-600",
            },
            {
              label: "Battalions",
              value: 4,
              icon: <ShieldCheck size={14} />,
              color: "text-sky-600",
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

        {/* ── Filters ── */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[180px] flex-1">
            <Search
              size={13}
              className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"
            />
            <Input
              placeholder="Search soldier or battalion..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 border-stone-200 bg-white pl-8 text-xs"
            />
          </div>
          <Select value={battalion} onValueChange={setBattalion}>
            <SelectTrigger className="h-8 w-36 border-stone-200 bg-white text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BATTALIONS.map((b) => (
                <SelectItem key={b} value={b} className="text-xs">
                  {b === "All" ? "All Battalions" : b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="ml-auto text-xs text-stone-400">
            {filtered.length} of {LEADERBOARD.length} soldiers
          </p>
        </div>

        {/* ── Desktop Table ── */}
        <Card className="hidden overflow-hidden border-stone-200 bg-white shadow-sm lg:block">
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Trophy size={14} className="text-amber-500" /> All-India
              Leaderboard
            </h2>
            <span className="text-xs text-stone-400">
              {LEADERBOARD.length} soldiers ranked
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {[
                    { label: "Rank" },
                    { label: "Name" },
                    { label: "Battalion" },
                    { label: "Physical", icon: <Dumbbell size={11} /> },
                    { label: "Weapons", icon: <Target size={11} /> },
                    { label: "Mental", icon: <Brain size={11} /> },
                    { label: "Combat", icon: <Swords size={11} /> },
                    { label: "Attend.", icon: <CalendarDays size={11} /> },
                    { label: "Discip.", icon: <ShieldCheck size={11} /> },
                    { label: "Overall" },
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
                      colSpan={10}
                      className="py-12 text-center text-sm text-stone-400"
                    >
                      No results found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr
                      key={s.rank}
                      className={`transition-colors ${rowBg(s.rank)}`}
                    >
                      <td className="px-4 py-3">
                        <RankDisplay rank={s.rank} />
                      </td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap text-stone-900">
                        {s.name}
                      </td>
                      <td className="px-4 py-3">
                        <BattalionChip code={s.battalion} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreCell value={s.physical} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreCell value={s.weapons} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreCell value={s.mental} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreCell value={s.combat} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreCell value={s.attend} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreCell value={s.discip} />
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xl font-black ${scoreColor(s.overall)}`}
                        >
                          {s.overall}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Mobile Cards ── */}
        <div className="space-y-2.5 lg:hidden">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-stone-400">
              No results found.
            </div>
          ) : (
            filtered.map((s) => <MobileRankCard key={s.rank} s={s} />)
          )}
          <p className="pt-1 text-center text-xs text-stone-400">
            {filtered.length} of {LEADERBOARD.length} soldiers
          </p>
        </div>
      </div>
    </div>
  )
}
