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
import { Input } from "@/components/ui/input"
import {
  Lock,
  ShieldCheck,
  ShieldX,
  Search,
  Download,
  AlertOctagon,
  CheckCircle2,
  Clock,
  User,
  Monitor,
  FileText,
  Activity,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type LogStatus = "success" | "failed"
type FilterType = "All" | "Success" | "Failed"

interface AuditLog {
  id: number
  timestamp: string
  action: string
  user: string
  resource: string
  ip: string
  status: LogStatus
}

// ── Data ──────────────────────────────────────────────────────────────────────

const logs: AuditLog[] = [
  {
    id: 1,
    timestamp: "14 Mar 2025 14:32",
    action: "sos_alert_triggered",
    user: "Maj. Ankit Verma",
    resource: "SOS-0037",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: 2,
    timestamp: "14 Mar 2025 13:18",
    action: "application_status_updated",
    user: "Maj. Ankit Verma",
    resource: "APP-2025-002",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: 3,
    timestamp: "14 Mar 2025 11:45",
    action: "Agniveer_profile_updated",
    user: "Maj. Ankit Verma",
    resource: "AGN-2024-0103",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: 4,
    timestamp: "14 Mar 2025 10:02",
    action: "battalion_details_updated",
    user: "Maj. Ankit Verma",
    resource: "RR-1",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: 5,
    timestamp: "14 Mar 2025 09:30",
    action: "training_record_uploaded",
    user: "Cpt. Pradeep Kumar",
    resource: "RR-1 Batch",
    ip: "192.168.1.11",
    status: "success",
  },
  {
    id: 6,
    timestamp: "13 Mar 2025 18:15",
    action: "medical_record_added",
    user: "Dr. Sunita Rao",
    resource: "AGN-2024-0104",
    ip: "192.168.1.12",
    status: "success",
  },
  {
    id: 7,
    timestamp: "13 Mar 2025 16:40",
    action: "login",
    user: "Cpt. Pradeep Kumar",
    resource: "—",
    ip: "192.168.1.11",
    status: "success",
  },
  {
    id: 8,
    timestamp: "13 Mar 2025 15:55",
    action: "failed_login_attempt",
    user: "Unknown",
    resource: "—",
    ip: "203.84.17.42",
    status: "failed",
  },
  {
    id: 9,
    timestamp: "13 Mar 2025 14:20",
    action: "sos_alert_resolved",
    user: "Maj. Ankit Verma",
    resource: "SOS-0036",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: 10,
    timestamp: "13 Mar 2025 11:00",
    action: "report_generated",
    user: "Maj. Ankit Verma",
    resource: "Battalion RR-1",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: 11,
    timestamp: "12 Mar 2025 17:30",
    action: "application_verified",
    user: "Maj. Ankit Verma",
    resource: "APP-2025-005",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: 12,
    timestamp: "12 Mar 2025 10:15",
    action: "login",
    user: "Dr. Sunita Rao",
    resource: "—",
    ip: "192.168.1.12",
    status: "success",
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const ACTION_META: Record<string, { color: string; icon: React.ReactNode }> = {
  sos_alert_triggered: {
    color: "text-rose-600",
    icon: <AlertOctagon size={13} />,
  },
  sos_alert_resolved: {
    color: "text-amber-600",
    icon: <CheckCircle2 size={13} />,
  },
  failed_login_attempt: { color: "text-rose-500", icon: <ShieldX size={13} /> },
  login: { color: "text-sky-600", icon: <User size={13} /> },
  application_status_updated: {
    color: "text-violet-600",
    icon: <FileText size={13} />,
  },
  application_verified: {
    color: "text-violet-600",
    icon: <FileText size={13} />,
  },
  Agniveer_profile_updated: {
    color: "text-emerald-600",
    icon: <User size={13} />,
  },
  battalion_details_updated: {
    color: "text-emerald-600",
    icon: <Monitor size={13} />,
  },
  training_record_uploaded: {
    color: "text-emerald-600",
    icon: <Activity size={13} />,
  },
  medical_record_added: {
    color: "text-emerald-600",
    icon: <FileText size={13} />,
  },
  report_generated: { color: "text-stone-500", icon: <FileText size={13} /> },
}

function getActionMeta(action: string) {
  return (
    ACTION_META[action] ?? {
      color: "text-stone-500",
      icon: <Activity size={13} />,
    }
  )
}

function StatusBadge({ status }: { status: LogStatus }) {
  if (status === "failed")
    return (
      <Badge className="gap-1 border border-rose-200 bg-rose-100 text-xs font-semibold text-rose-600 hover:bg-rose-100">
        <ShieldX size={11} /> failed
      </Badge>
    )
  return (
    <Badge className="gap-1 border border-emerald-200 bg-emerald-100 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">
      <CheckCircle2 size={11} /> success
    </Badge>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SecurityAuditLogPage() {
  const [filter, setFilter] = useState<FilterType>("All")
  const [search, setSearch] = useState("")

  const filtered = logs.filter((log) => {
    const matchStatus =
      filter === "All" ||
      (filter === "Success" && log.status === "success") ||
      (filter === "Failed" && log.status === "failed")
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      log.action.includes(q) ||
      log.user.toLowerCase().includes(q) ||
      log.resource.toLowerCase().includes(q) ||
      log.ip.includes(q)
    return matchStatus && matchSearch
  })

  const successCount = logs.filter((l) => l.status === "success").length
  const failedCount = logs.filter((l) => l.status === "failed").length

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-stone-900">
              <Lock size={20} className="text-stone-500" />
              Security Audit Log
            </h1>
            <p className="mt-0.5 text-sm text-stone-500">
              All system actions · Powered by common.core.audit · RBAC enforced
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 rounded-lg bg-stone-100 p-1">
            {(["All", "Success", "Failed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  filter === f
                    ? f === "Failed"
                      ? "bg-rose-600 text-white shadow-sm"
                      : f === "Success"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-stone-800 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {f}
                {f === "All"
                  ? ` (${logs.length})`
                  : f === "Success"
                    ? ` (${successCount})`
                    : ` (${failedCount})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Events",
              value: logs.length,
              icon: <Activity size={16} />,
              color: "text-stone-600",
            },
            {
              label: "Successful",
              value: successCount,
              icon: <ShieldCheck size={16} />,
              color: "text-emerald-600",
            },
            {
              label: "Failed",
              value: failedCount,
              icon: <ShieldX size={16} />,
              color: "text-rose-500",
            },
            {
              label: "Unique Users",
              value: new Set(logs.map((l) => l.user)).size,
              icon: <User size={16} />,
              color: "text-sky-600",
            },
          ].map((s) => (
            <Card key={s.label} className="border-stone-200 bg-white shadow-sm">
              <CardContent className="flex items-center gap-3 px-5 pt-4 pb-3">
                <div className={s.color}>{s.icon}</div>
                <div>
                  <p className="text-xs text-stone-400">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Audit Table ── */}
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold text-stone-800">
                Audit Trail
              </CardTitle>
              <Badge
                variant="outline"
                className="border-stone-200 text-xs text-stone-400"
              >
                {filtered.length} events
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"
                />
                <Input
                  placeholder="Search action, user, IP..."
                  className="h-8 w-56 border-stone-200 bg-stone-50 pl-8 text-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs text-stone-600"
              >
                <Download size={13} />
                Export
              </Button>
            </div>
          </CardHeader>

          <CardContent className="px-4 pb-4">
            <div className="overflow-x-auto rounded-md border border-stone-100">
              <Table>
                <TableHeader>
                  <TableRow className="border-stone-100 bg-stone-50">
                    <TableHead className="w-40 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> Timestamp
                      </span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Action
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      <span className="flex items-center gap-1">
                        <User size={11} /> User
                      </span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Resource
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      <span className="flex items-center gap-1">
                        <Monitor size={11} /> IP Address
                      </span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-10 text-center text-sm text-stone-400"
                      >
                        No logs match your filter.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((log) => {
                      const meta = getActionMeta(log.action)
                      const isFailed = log.status === "failed"
                      return (
                        <TableRow
                          key={log.id}
                          className={`border-stone-100 transition-colors ${
                            isFailed
                              ? "bg-rose-50/40 hover:bg-rose-50"
                              : "hover:bg-stone-50"
                          }`}
                        >
                          <TableCell className="py-3 font-mono text-xs whitespace-nowrap text-stone-400">
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="py-3">
                            <span
                              className={`flex items-center gap-1.5 font-mono text-xs font-semibold ${meta.color}`}
                            >
                              {meta.icon}
                              {log.action}
                            </span>
                          </TableCell>
                          <TableCell className="py-3 text-sm whitespace-nowrap text-stone-700">
                            {log.user}
                          </TableCell>
                          <TableCell className="py-3 font-mono text-xs text-stone-500">
                            {log.resource === "—" ? (
                              <span className="text-stone-300">—</span>
                            ) : (
                              log.resource
                            )}
                          </TableCell>
                          <TableCell className="py-3 font-mono text-xs text-stone-500">
                            {log.ip}
                          </TableCell>
                          <TableCell className="py-3">
                            <StatusBadge status={log.status} />
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
