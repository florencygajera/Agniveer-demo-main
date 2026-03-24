"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, UserCheck, UserMinus, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

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
}

/* 🔥 Fake monthly data generator */
function generateData(value: number) {
  return [
    { month: "Jan", val: value - 10 },
    { month: "Feb", val: value - 6 },
    { month: "Mar", val: value - 4 },
    { month: "Apr", val: value - 2 },
    { month: "May", val: value },
  ]
}

export function BatalionDetailsDialog({
  bat,
  children,
}: {
  bat: Battalion
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<"physical" | "weapons" | "mental">("physical")

  const value = bat[tab]
  const chartData = generateData(value)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span onClick={() => setOpen(true)}>{children}</span>

      <DialogContent className="sm:max-w-2xl">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-stone-800">
            <Users size={16} className="text-[#4a5c2f]" />
            Battalion Overview
          </DialogTitle>
        </DialogHeader>

        {/* MAIN CARD */}
        <Card className="border-stone-200">
          <CardContent className="space-y-4 p-4">
            {/* TITLE */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{bat.name}</h2>
                <Badge>{bat.code}</Badge>
              </div>
              <p className="text-xs text-stone-500">{bat.location}</p>
              <p className="text-xs text-stone-500">
                Commander:{" "}
                <span className="font-semibold text-stone-800">
                  {bat.commander}
                </span>
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <Users size={14} className="mx-auto text-emerald-600" />
                <p className="text-xs text-stone-400">Total</p>
                <p className="font-bold">{bat.total}</p>
              </div>
              <div>
                <UserCheck size={14} className="mx-auto text-sky-600" />
                <p className="text-xs text-stone-400">Active</p>
                <p className="font-bold">{bat.active}</p>
              </div>
              <div>
                <UserMinus size={14} className="mx-auto text-amber-600" />
                <p className="text-xs text-stone-400">Leave</p>
                <p className="font-bold">{bat.onLeave}</p>
              </div>
              <div>
                <Star size={14} className="mx-auto text-[#4a5c2f]" />
                <p className="text-xs text-stone-400">Top</p>
                <p className="font-bold">{bat.scoreAbove85}</p>
              </div>
            </div>

            {/* OVERALL SCORE BAR */}
            <div>
              <div className="flex justify-between text-xs">
                <span>Status</span>
                <span className="font-bold">{bat.status}</span>
              </div>
              <div className="mt-1 h-2 rounded bg-stone-200">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${bat.score}%`,
                    background:
                      bat.status === "Good"
                        ? "#22c55e"
                        : bat.status === "Average"
                          ? "#f59e42"
                          : "#ef4444",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🔥 TAB SELECTOR */}
        <div className="mt-4 flex gap-2">
          {["physical", "weapons", "mental"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`rounded px-3 py-1 text-xs capitalize ${
                tab === t
                  ? "bg-[#4a5c2f] text-white"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 🔥 VALUE DISPLAY */}
        <div className="text-sm text-stone-500">
          {tab} Score: <span className="font-bold text-stone-900">{value}</span>
        </div>

        {/* 🔥 CHART */}
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="val"
                stroke="#4a5c2f"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  )
}
