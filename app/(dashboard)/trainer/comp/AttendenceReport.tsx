"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

// ✅ THEME COLORS (FIXED)
const COLORS = [
  "var(--chart-2)", // Present
  "var(--destructive)", // Absent
  "var(--chart-1)", // Leave
]

const monthlyAttendance = [
  { month: "Jan", rate: 92 },
  { month: "Feb", rate: 88 },
  { month: "Mar", rate: 96 },
  { month: "Apr", rate: 91 },
  { month: "May", rate: 94 },
]

const weeklyData = [
  { week: "W1", present: 6 },
  { week: "W2", present: 5 },
  { week: "W3", present: 7 },
  { week: "W4", present: 6 },
]

const pieData = [
  { name: "Present", value: 82 },
  { name: "Absent", value: 8 },
  { name: "Leave", value: 10 },
]

const days = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["present", "present", "present", "absent", "leave"]
  return {
    day: i + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }
})

export default function AttendanceReportPage() {
  return (
    <div className="min-h-screen bg-[var(--muted)] p-6 text-[var(--foreground)]">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Attendance Report</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Soldier Attendance Overview - April 2026
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        {[
          { label: "Present", value: 24, color: "var(--primary)" },
          { label: "Absent", value: 3, color: "var(--destructive)" },
          { label: "Leave", value: 3, color: "var(--chart-1)" },
          { label: "Attendance %", value: "92%", color: "var(--primary)" },
        ].map((item, i) => (
          <Card
            key={i}
            className="rounded-2xl border"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <CardContent className="p-6">
              <p className="text-sm text-[var(--muted-foreground)]">
                {item.label}
              </p>
              <h2
                className="mt-2 text-3xl font-bold"
                style={{ color: item.color }}
              >
                {item.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        {/* CALENDAR */}
        <Card className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <CardContent className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-[var(--primary)]">
              Attendance Calendar
            </h2>

            <div className="grid grid-cols-7 gap-3">
              {days.map((d) => {
                let bg = "var(--muted)"
                let color = "var(--foreground)"

                if (d.status === "present") {
                  bg = "color-mix(in oklab, var(--primary) 25%, transparent)"
                  color = "var(--primary)"
                }
                if (d.status === "absent") {
                  bg =
                    "color-mix(in oklab, var(--destructive) 25%, transparent)"
                  color = "var(--destructive)"
                }
                if (d.status === "leave") {
                  bg = "color-mix(in oklab, var(--chart-1) 25%, transparent)"
                  color = "var(--chart-1)"
                }

                return (
                  <div
                    key={d.day}
                    className="flex h-12 items-center justify-center rounded-lg text-sm font-semibold"
                    style={{ background: bg, color }}
                  >
                    {d.day}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex gap-6 text-sm">
              <span style={{ color: "var(--primary)" }}>● Present</span>
              <span style={{ color: "var(--destructive)" }}>● Absent</span>
              <span style={{ color: "var(--chart-1)" }}>● Leave</span>
            </div>
          </CardContent>
        </Card>

        {/* PIE */}
        <Card className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <CardContent className="h-[420px] p-6">
            <h2 className="mb-6 text-lg font-semibold text-[var(--primary)]">
              Attendance Distribution
            </h2>

            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={120}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LINE */}
        <Card className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <CardContent className="h-[350px] p-6">
            <h2 className="mb-6 text-lg font-semibold text-[var(--primary)]">
              Monthly Trend
            </h2>

            <ResponsiveContainer>
              <LineChart data={monthlyAttendance}>
                <CartesianGrid stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="month" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--chart-3)"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* BAR */}
        <Card className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <CardContent className="h-[350px] p-6">
            <h2 className="mb-6 text-lg font-semibold text-[var(--primary)]">
              Weekly Attendance
            </h2>

            <ResponsiveContainer>
              <BarChart data={weeklyData}>
                <CartesianGrid stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="week" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />

                <Bar
                  dataKey="present"
                  fill="var(--chart-4)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
