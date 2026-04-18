import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Metric =
  | "physical"
  | "weapons"
  | "mental"
  | "combat"
  | "attendance"
  | "discipline"
  | "overall"

// ✅ Generate Monthly Data
function generateMonthlyData(Agniveer: any) {
  const start = new Date(Agniveer.joining)
  const now = new Date()

  const months = []
  let current = new Date(start)

  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())

  const metrics: Metric[] = [
    "physical",
    "weapons",
    "mental",
    "combat",
    "attendance",
    "discipline",
    "overall",
  ]

  for (let i = 0; i <= totalMonths; i++) {
    const progress = i / (totalMonths || 1)

    const dataPoint: any = {
      month: current.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      }),
    }

    metrics.forEach((m) => {
      const finalValue = Agniveer[m]
      const startValue = finalValue * 0.6

      const value = startValue + (finalValue - startValue) * progress

      const noise = Math.random() * 4 - 2
      dataPoint[m] = Math.round(value + noise)
    })

    months.push(dataPoint)
    current.setMonth(current.getMonth() + 1)
  }

  return months
}

export function PerformanceGraph({ Agniveer }: { Agniveer: any }) {
  const [metric, setMetric] = useState<Metric>("physical")
  const [selectedMonth, setSelectedMonth] = useState<string>("all")

  const monthlyData = generateMonthlyData(Agniveer)
  const value = Agniveer[metric]

  const metrics: Metric[] = [
    "physical",
    "weapons",
    "mental",
    "combat",
    "attendance",
    "discipline",
    "overall",
  ]

  const months = monthlyData.map((d) => d.month)

  // ✅ Filter only selected month
  const filteredData =
    selectedMonth === "all"
      ? monthlyData
      : monthlyData.filter((d) => d.month === selectedMonth)

  return (
    <div className="rounded-xl border border-stone-200 p-4">
      <h3 className="mb-4 text-sm font-semibold text-stone-600">
        Performance Graph (Monthly)
      </h3>

      {/* 🔹 Metric Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {metrics.map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition ${
              metric === m
                ? "bg-[#4a5c2f] text-white"
                : "bg-stone-100 text-stone-500 hover:bg-stone-200"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* 🔹 Month Selector */}
      <div className="mb-4">
        {/* sadcn's Select */}
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px] rounded-md border px-3 py-1.5 text-xs">
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 🔹 Current Value */}
      <div className="mb-3 text-sm text-stone-500">
        Current {metric}:{" "}
        <span className="font-bold text-stone-800">{value}</span>/100
      </div>

      {/* 🔹 Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey={metric}
              stroke="#4a5c2f"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
