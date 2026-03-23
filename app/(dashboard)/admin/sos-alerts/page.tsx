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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Bell,
  BellRing,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Siren,
  User,
  CalendarClock,
  ShieldAlert,
  X,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type AlertType = "Drill" | "Test" | "Emergency"
type AlertStatus = "Active" | "Resolved"

interface SosAlert {
  id: string
  type: AlertType
  target: string
  message: string
  triggered: string
  by: string
  status: AlertStatus
  resolvedAt?: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const initialAlerts: SosAlert[] = [
  {
    id: "SOS-0037",
    type: "Drill",
    target: "1st Rajputana Rifles",
    message:
      "Emergency response drill — all units report to designated stations immediately.",
    triggered: "14:32 hrs, 14 Mar 2025",
    by: "Maj. Ankit Verma",
    status: "Active",
    resolvedAt: undefined,
  },
  {
    id: "SOS-0036",
    type: "Test",
    target: "All Battalions",
    message: "System test alert. No action required.",
    triggered: "09:00 hrs, 10 Mar 2025",
    by: "Maj. Ankit Verma",
    status: "Resolved",
    resolvedAt: "09:45 hrs, 10 Mar 2025",
  },
  {
    id: "SOS-0035",
    type: "Drill",
    target: "1st Parachute Regiment",
    message: "Fire drill. Evacuate to parade ground immediately.",
    triggered: "16:00 hrs, 05 Mar 2025",
    by: "Col. S.P. Mehta",
    status: "Resolved",
    resolvedAt: "16:30 hrs, 05 Mar 2025",
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function typeBadge(type: AlertType) {
  const map: Record<AlertType, string> = {
    Drill: "border-amber-300 text-amber-700 bg-amber-50",
    Test: "border-sky-300 text-sky-700 bg-sky-50",
    Emergency: "border-rose-400 text-rose-700 bg-rose-50",
  }
  return (
    <Badge variant="outline" className={`text-xs font-medium ${map[type]}`}>
      {type}
    </Badge>
  )
}

function statusBadge(status: AlertStatus) {
  if (status === "Active")
    return (
      <Badge className="border border-rose-300 bg-rose-100 text-xs font-semibold text-rose-600 hover:bg-rose-100">
        Active
      </Badge>
    )
  return (
    <Badge className="border border-emerald-300 bg-emerald-100 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">
      Resolved
    </Badge>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SosAlertPage() {
  const [alerts, setAlerts] = useState<SosAlert[]>(initialAlerts)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newAlert, setNewAlert] = useState({
    type: "",
    target: "",
    message: "",
  })

  const activeAlert = alerts.find((a) => a.status === "Active")

  function markResolved(id: string) {
    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} hrs, ${now.getDate().toString().padStart(2, "0")} Mar ${now.getFullYear()}`
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Resolved", resolvedAt: timeStr } : a
      )
    )
  }

  function triggerAlert() {
    if (!newAlert.type || !newAlert.target || !newAlert.message) return
    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} hrs, ${now.getDate().toString().padStart(2, "0")} Mar ${now.getFullYear()}`
    const nextId = `SOS-${(parseInt(alerts[0].id.split("-")[1]) + 1).toString().padStart(4, "0")}`
    const alert: SosAlert = {
      id: nextId,
      type: newAlert.type as AlertType,
      target: newAlert.target,
      message: newAlert.message,
      triggered: timeStr,
      by: "Maj. Ankit Verma",
      status: "Active",
    }
    setAlerts((prev) => [alert, ...prev])
    setNewAlert({ type: "", target: "", message: "" })
    setDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-stone-900">
              <ShieldAlert size={22} className="text-rose-500" />
              SOS Alert Management
            </h1>
            <p className="mt-0.5 text-sm text-stone-500">
              Emergency broadcast and response system
            </p>
          </div>

          {/* Trigger New Alert Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-rose-600 text-white shadow-md hover:bg-rose-700">
                <Siren size={15} />
                Trigger New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-rose-600">
                  <BellRing size={18} />
                  Trigger New SOS Alert
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-stone-600">
                    Alert Type
                  </Label>
                  <Select
                    value={newAlert.type}
                    onValueChange={(v) =>
                      setNewAlert((p) => ({ ...p, type: v }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Drill">Drill</SelectItem>
                      <SelectItem value="Test">Test</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-stone-600">
                    Target Battalion
                  </Label>
                  <Input
                    placeholder="e.g. All Battalions"
                    value={newAlert.target}
                    onChange={(e) =>
                      setNewAlert((p) => ({ ...p, target: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-stone-600">
                    Alert Message
                  </Label>
                  <Textarea
                    placeholder="Enter broadcast message..."
                    rows={3}
                    value={newAlert.message}
                    onChange={(e) =>
                      setNewAlert((p) => ({ ...p, message: e.target.value }))
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-rose-600 text-white hover:bg-rose-700"
                  onClick={triggerAlert}
                >
                  <Siren size={14} className="mr-1.5" />
                  Trigger Alert
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Alerts",
              value: alerts.length,
              icon: <Bell size={16} />,
              color: "text-stone-600",
            },
            {
              label: "Active",
              value: alerts.filter((a) => a.status === "Active").length,
              icon: <AlertTriangle size={16} />,
              color: "text-rose-500",
            },
            {
              label: "Resolved",
              value: alerts.filter((a) => a.status === "Resolved").length,
              icon: <CheckCircle2 size={16} />,
              color: "text-emerald-600",
            },
            {
              label: "Drills",
              value: alerts.filter((a) => a.type === "Drill").length,
              icon: <ShieldAlert size={16} />,
              color: "text-amber-500",
            },
          ].map((s) => (
            <Card key={s.label} className="border-stone-200 bg-white shadow-sm">
              <CardContent className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className={s.color}>{s.icon}</div>
                <div>
                  <p className="text-xs text-stone-400">{s.label}</p>
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {activeAlert && (
          <div className="relative flex flex-col gap-4 rounded-lg border border-l-4 border-rose-200 border-rose-500 bg-rose-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 animate-pulse">
                <BellRing size={20} className="text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-rose-700">
                  {activeAlert.id} — {activeAlert.type} Alert ·{" "}
                  {activeAlert.target}
                </p>
                <p className="mt-0.5 text-sm text-rose-600">
                  {activeAlert.message}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-rose-400">
                  <Clock size={11} />
                  Triggered: {activeAlert.triggered} · By: {activeAlert.by}
                </p>
              </div>
            </div>
            <Button
              onClick={() => markResolved(activeAlert.id)}
              className="shrink-0 gap-2 bg-emerald-700 text-white hover:bg-emerald-800"
              size="sm"
            >
              <CheckCircle2 size={14} />
              Mark Resolved
            </Button>
          </div>
        )}

        {/* ── Alert History Table ── */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-stone-800">
              <Bell size={16} className="text-stone-500" />
              Alert History
            </CardTitle>
            <span className="text-xs text-stone-400">
              {alerts.length} total alerts
            </span>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-stone-100 bg-stone-50">
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Alert ID
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Target
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Message
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      <span className="flex items-center gap-1">
                        <CalendarClock size={11} /> Triggered
                      </span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      <span className="flex items-center gap-1">
                        <User size={11} /> By
                      </span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Resolved At
                    </TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow
                      key={alert.id}
                      className={`border-stone-100 transition-colors ${
                        alert.status === "Active"
                          ? "bg-rose-50/40 hover:bg-rose-50"
                          : "hover:bg-stone-50"
                      }`}
                    >
                      <TableCell className="py-3 font-mono text-sm font-semibold text-stone-700">
                        {alert.id}
                      </TableCell>
                      <TableCell className="py-3">
                        {typeBadge(alert.type)}
                      </TableCell>
                      <TableCell className="min-w-[140px] py-3 text-sm text-stone-700">
                        {alert.target}
                      </TableCell>
                      <TableCell className="max-w-[240px] py-3 text-sm text-stone-500">
                        <span className="line-clamp-2">{alert.message}</span>
                      </TableCell>
                      <TableCell className="py-3 text-xs whitespace-nowrap text-stone-500">
                        {alert.triggered}
                      </TableCell>
                      <TableCell className="py-3 text-sm whitespace-nowrap text-stone-600">
                        {alert.by}
                      </TableCell>
                      <TableCell className="py-3">
                        {statusBadge(alert.status)}
                      </TableCell>
                      <TableCell className="py-3 text-xs whitespace-nowrap text-stone-400">
                        {alert.resolvedAt ?? (
                          <span className="text-stone-300">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3">
                        {alert.status === "Active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 border-emerald-300 text-xs text-emerald-700 hover:bg-emerald-50"
                            onClick={() => markResolved(alert.id)}
                          >
                            <CheckCircle2 size={12} className="mr-1" />
                            Resolve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* ── Summary Stats ── */}
      </div>
    </div>
  )
}
