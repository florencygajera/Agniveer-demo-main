"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, Calendar } from "lucide-react"

const TIMELINE = [
  {
    label: "Application Submitted",
    detail: "Registration ID assigned. Application receipt generated.",
    status: "done",
    date: "12 Mar 2025, 14:32 hrs",
  },
  {
    label: "Document Verification",
    detail:
      "Aadhaar, education certificates & photograph under review by recruitment office.",
    status: "current",
    date: "In Progress — Est. 3–5 working days",
  },
  {
    label: "Eligibility Screening",
    detail:
      "Age, education qualification and physical criteria checked against trade requirements.",
    status: "pending",
    date: "Pending",
  },
  {
    label: "Exam Registration",
    detail:
      "Hall ticket and examination centre allocated. Candidate notified via SMS.",
    status: "pending",
    date: "Expected: 25 Apr 2025",
  },
  {
    label: "Physical Fitness Test",
    detail:
      "Report to the allocated rally ground for physical fitness and medical examination.",
    status: "pending",
    date: "15 Apr 2025",
  },
  {
    label: "Written Examination",
    detail: "Objective-type written test at designated examination centre.",
    status: "pending",
    date: "02 May 2025",
  },
]

export default function StatusSection() {
  return (
    <div className="space-y-5 pb-8">
      <div className="border-b bg-white p-2 px-4">
        <h1 className="text-lg font-bold text-stone-900">Application Status</h1>
        <p className="text-xs text-stone-400">
          Track your recruitment journey in real time
        </p>
      </div>

      {/* Summary cards */}
      <div className="mx-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Registration ID",
            value: "AGN-2025-84721",
            accent: "text-orange-500",
            mono: true,
          },
          {
            label: "Current Stage",
            value: "2 of 6",
            accent: "text-[#1a2d4a]",
            mono: false,
          },
          {
            label: "Applied Force",
            value: "Indian Army",
            accent: "text-stone-700",
            mono: false,
          },
          {
            label: "Trade",
            value: "Agniveer GD",
            accent: "text-stone-700",
            mono: false,
          },
        ].map((c) => (
          <Card key={c.label} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="px-4 pt-3 pb-3">
              <div className="text-[10px] font-medium tracking-wide text-stone-400 uppercase">
                {c.label}
              </div>
              <div
                className={`mt-1 text-sm font-black ${c.accent} ${
                  c.mono ? "font-mono" : ""
                }`}
              >
                {c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active alert */}
      <div className="mx-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <Clock size={15} className="mt-0.5 shrink-0 text-amber-600" />
        <div className="text-sm text-amber-800">
          <strong>Document Verification in Progress.</strong> Our team is
          reviewing your submitted documents. You'll receive an SMS once
          verification is complete.
        </div>
      </div>

      {/* Timeline */}
      <Card className="mx-4 border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-800">
            <Calendar size={14} className="text-[#1a2d4a]" /> Recruitment
            Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="relative">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-4 pb-6 last:pb-0">
                {/* Dot + line */}
                <div className="flex shrink-0 flex-col items-center">
                  <div
                    className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                      item.status === "done"
                        ? "border-[#4a5c2f] bg-[#4a5c2f] text-white"
                        : item.status === "current"
                          ? "border-[#c8601a] bg-[#c8601a] text-white"
                          : "border-stone-200 bg-white text-stone-300"
                    }`}
                  >
                    {item.status === "done" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div
                      className={`mt-1 w-0.5 flex-1 ${
                        item.status === "done" ? "bg-[#4a5c2f]" : "bg-stone-200"
                      }`}
                      style={{ minHeight: "28px" }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 pb-2">
                  <div
                    className={`text-sm font-bold ${
                      item.status === "done"
                        ? "text-[#4a5c2f]"
                        : item.status === "current"
                          ? "text-[#c8601a]"
                          : "text-stone-400"
                    }`}
                  >
                    {item.label}
                    {item.status === "current" && (
                      <Badge className="ml-2 border border-amber-300 bg-amber-100 text-[10px] text-amber-700">
                        In Progress
                      </Badge>
                    )}
                    {item.status === "done" && (
                      <Badge className="ml-2 border border-emerald-300 bg-emerald-100 text-[10px] text-emerald-700">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-500">
                    {item.detail}
                  </div>
                  <div
                    className={`mt-1 text-[11px] font-semibold ${
                      item.status === "done"
                        ? "text-[#4a5c2f]"
                        : item.status === "current"
                          ? "text-amber-600"
                          : "text-stone-300"
                    }`}
                  >
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important dates */}
      <Card className="mx-4 border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-stone-800">
            Important Dates
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="pr-4 pb-2 text-left text-xs font-semibold text-stone-400 uppercase">
                    Event
                  </th>
                  <th className="pb-2 text-left text-xs font-semibold text-stone-400 uppercase">
                    Date
                  </th>
                  <th className="pb-2 text-left text-xs font-semibold text-stone-400 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {[
                  ["Application Deadline", "31 Mar 2025", "open"],
                  ["Admit Card Release", "25 Apr 2025", "upcoming"],
                  ["Physical Fitness Test", "15 Apr 2025", "upcoming"],
                  ["Written Examination", "02 May 2025", "upcoming"],
                  ["Results Declaration", "20 May 2025", "upcoming"],
                  ["Medical Examination", "Jun 2025", "upcoming"],
                ].map(([event, date, status]) => (
                  <tr key={event as string}>
                    <td className="py-2 pr-4 text-sm font-medium text-stone-700">
                      {event}
                    </td>
                    <td className="py-2 pr-4 text-sm text-stone-500">{date}</td>
                    <td className="py-2">
                      <Badge
                        className={`border text-[10px] ${
                          status === "open"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : status === "done"
                              ? "border-stone-200 bg-stone-100 text-stone-500"
                              : "border-sky-200 bg-sky-50 text-sky-700"
                        }`}
                      >
                        {status === "open"
                          ? "Open"
                          : status === "done"
                            ? "Closed"
                            : "Upcoming"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
