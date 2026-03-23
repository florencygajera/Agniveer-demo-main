"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  Activity,
} from "lucide-react"

// ── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  label: string
  value: string | number
  sub: string
  icon: React.ReactNode
  accent: string
}

interface Battalion {
  name: string
  code: string
  soldiers: number
  location: string
  score: number
  status: "Good" | "Average" | "Poor"
}

interface TopPerformer {
  rank: number
  name: string
  battalion: string
  score: number
}

interface NeedsAttention {
  name: string
  battalion: string
  score: number
  weakness: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

const stats: Stat[] = [
  {
    label: "Total Agniveers",
    value: 18,
    sub: "Across all battalions",
    icon: <Users size={20} />,
    accent: "text-sky-600",
  },
  {
    label: "Active Duty",
    value: 17,
    sub: "1 on leave",
    icon: <Shield size={20} />,
    accent: "text-amber-500",
  },
  {
    label: "Avg. Performance",
    value: "83.2",
    sub: "Out of 100",
    icon: <TrendingUp size={20} />,
    accent: "text-emerald-600",
  },
  {
    label: "Active Battalions",
    value: 4,
    sub: "Operational units",
    icon: <Building2 size={20} />,
    accent: "text-violet-600",
  },
  {
    label: "Pending Applications",
    value: 3,
    sub: "Need review",
    icon: <FileText size={20} />,
    accent: "text-rose-500",
  },
]

const battalions: Battalion[] = [
  {
    name: "1st Rajputana Rifles",
    code: "RR-1",
    soldiers: 6,
    location: "Jaipur, Rajasthan",
    score: 84.7,
    status: "Good",
  },
  {
    name: "1st Parachute Regiment",
    code: "PARA-1",
    soldiers: 4,
    location: "Agra, Uttar Pradesh",
    score: 84.4,
    status: "Good",
  },
  {
    name: "2nd Bengal Regiment",
    code: "BEN-2",
    soldiers: 4,
    location: "Kolkata, West Bengal",
    score: 83.2,
    status: "Good",
  },
  {
    name: "4th Maratha Light Infantry",
    code: "MAR-4",
    soldiers: 4,
    location: "Pune, Maharashtra",
    score: 80.0,
    status: "Good",
  },
]

const topPerformers: TopPerformer[] = [
  { rank: 1, name: "Arjun Mehra", battalion: "RR-1", score: 95 },
  { rank: 2, name: "Vikram Nair", battalion: "PARA-1", score: 92 },
  { rank: 3, name: "Ranjit Singh", battalion: "BEN-2", score: 91.7 },
  { rank: 4, name: "Rajveer Singh Chauhan", battalion: "RR-1", score: 89 },
  { rank: 5, name: "Vijay Deshmukh", battalion: "MAR-4", score: 88.2 },
]

const needsAttention: NeedsAttention[] = [
  {
    name: "Santosh More",
    battalion: "MAR-4",
    score: 69,
    weakness: "Weapons Handling",
  },
  {
    name: "Amit Ghosh",
    battalion: "BEN-2",
    score: 71,
    weakness: "Weapons Handling",
  },
  {
    name: "Sunil Kumar",
    battalion: "RR-1",
    score: 72,
    weakness: "Physical Fitness",
  },
  {
    name: "Rohit Sharma",
    battalion: "PARA-1",
    score: 73.3,
    weakness: "Weapons Handling",
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function rankIcon(rank: number) {
  if (rank === 1) return <Trophy size={16} className="text-yellow-500" />
  if (rank === 2) return <Medal size={16} className="text-slate-400" />
  if (rank === 3) return <Medal size={16} className="text-amber-600" />
  return (
    <span className="text-xs font-semibold text-muted-foreground">#{rank}</span>
  )
}

function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-600"
  if (score >= 75) return "text-amber-500"
  return "text-rose-500"
}

function weaknessBadgeVariant(weakness: string) {
  if (weakness === "Weapons Handling") return "destructive"
  return "secondary"
}

function getProgressColor(score: number) {
  if (score >= 85) return "bg-emerald-500"
  if (score >= 75) return "bg-amber-500"
  return "bg-rose-500"
}

// ── Component ────────────────────────────────────────────────────────────────

export default function CommandOverviewPage() {
  const [hoveredBattalion, setHoveredBattalion] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">
              Command Overview
            </h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-stone-500">
              <Activity size={12} className="text-emerald-500" />
              Agnipath Scheme · Real-time Dashboard
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-300 bg-emerald-50 text-xs font-medium text-emerald-600"
          >
            Live
          </Badge>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="px-5 pt-5 pb-4">
                <div className={`mb-2 ${stat.accent}`}>{stat.icon}</div>
                <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
                  {stat.label}
                </p>
                <p className={`mt-1 text-3xl font-bold ${stat.accent}`}>
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-stone-400">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
          {/* Battalion Performance */}
          <Card className="border-stone-200 bg-white shadow-sm xl:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold text-stone-800">
                Battalion Performance
              </CardTitle>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                View All <ChevronRight size={12} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5">
              {battalions.map((bat) => (
                <div
                  key={bat.code}
                  onMouseEnter={() => setHoveredBattalion(bat.code)}
                  onMouseLeave={() => setHoveredBattalion(null)}
                  className={`cursor-default rounded-lg border p-4 transition-all ${
                    hoveredBattalion === bat.code
                      ? "border-stone-300 bg-stone-50 shadow-sm"
                      : "border-stone-100 bg-white"
                  }`}
                >
                  <div className="mb-2.5 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-stone-800">
                        {bat.name}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-400">
                        {bat.code} · {bat.soldiers} Soldiers · {bat.location}
                      </p>
                    </div>
                    <div className="ml-4 shrink-0 text-right">
                      <span
                        className={`text-lg font-bold ${scoreColor(bat.score)}`}
                      >
                        {bat.score}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-2 border-amber-300 bg-amber-50 text-xs text-amber-600"
                      >
                        {bat.status}
                      </Badge>
                    </div>
                  </div>
                  {/* Custom Progress with dynamic color */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getProgressColor(bat.score)}`}
                      style={{ width: `${bat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-4 xl:col-span-2">
            {/* Top Performers */}
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold text-stone-800">
                  Top 5 Performers
                </CardTitle>
                <span className="text-xs text-stone-400">This month</span>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-100">
                      <TableHead className="w-8 text-xs text-stone-400">
                        #
                      </TableHead>
                      <TableHead className="text-xs text-stone-400">
                        Soldier
                      </TableHead>
                      <TableHead className="text-xs text-stone-400">
                        Bat.
                      </TableHead>
                      <TableHead className="text-right text-xs text-stone-400">
                        Score
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformers.map((p) => (
                      <TableRow
                        key={p.name}
                        className="border-stone-50 hover:bg-stone-50"
                      >
                        <TableCell className="w-8 py-2.5">
                          <div className="flex items-center justify-center">
                            {rankIcon(p.rank)}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5 text-sm font-medium text-stone-700">
                          {p.name}
                        </TableCell>
                        <TableCell className="py-2.5 text-xs text-stone-400">
                          {p.battalion}
                        </TableCell>
                        <TableCell
                          className={`py-2.5 text-right text-sm font-bold ${scoreColor(p.score)}`}
                        >
                          {p.score}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Needs Attention */}
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-stone-800">
                  <AlertTriangle size={15} className="text-amber-500" />
                  Needs Attention
                </CardTitle>
                <span className="text-xs text-stone-400">Score &lt; 75</span>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-100">
                      <TableHead className="text-xs text-stone-400">
                        Soldier
                      </TableHead>
                      <TableHead className="text-xs text-stone-400">
                        Bat.
                      </TableHead>
                      <TableHead className="text-right text-xs text-stone-400">
                        Score
                      </TableHead>
                      <TableHead className="text-xs text-stone-400">
                        Weakness
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {needsAttention.map((s) => (
                      <TableRow
                        key={s.name}
                        className="border-stone-50 hover:bg-rose-50/30"
                      >
                        <TableCell className="py-2.5 text-sm font-medium text-stone-700">
                          {s.name}
                        </TableCell>
                        <TableCell className="py-2.5 text-xs text-stone-400">
                          {s.battalion}
                        </TableCell>
                        <TableCell className="py-2.5 text-right text-sm font-bold text-rose-500">
                          {s.score}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={
                              weaknessBadgeVariant(s.weakness) as
                                | "destructive"
                                | "secondary"
                            }
                            className="text-xs font-normal whitespace-nowrap"
                          >
                            {s.weakness}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
