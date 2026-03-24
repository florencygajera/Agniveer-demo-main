"use client"

import { useState } from "react"

/* ===================== TRAINING TEMPLATES ===================== */

const TRAINING_DETAIL_TEMPLATES: Record<
  string,
  {
    title: string
    items: { id: string; label: string; value: string }[]
  }
> = {
  physical: {
    title: "Physical Training (PT)",
    items: [
      { id: "run", label: "5km Run", value: "Daily" },
      { id: "pushups", label: "Push-ups", value: "50/day" },
      { id: "pullups", label: "Pull-ups", value: "10/day" },
      { id: "situps", label: "Sit-ups", value: "50/day" },
    ],
  },
  weapons: {
    title: "Weapons Training",
    items: [
      { id: "insas", label: "INSAS Rifle", value: "Infantry rifle" },
      { id: "lmg", label: "LMG", value: "Machine gun" },
      { id: "grenade", label: "Grenade Throwing", value: "Deployment" },
      { id: "tactics", label: "Field Tactics", value: "Combat positioning" },
    ],
  },
  mental: {
    title: "Mental Resilience",
    items: [
      { id: "stress", label: "Stress Training", value: "Drills" },
      { id: "decision", label: "Decision Making", value: "Under pressure" },
      { id: "workshops", label: "Workshops", value: "Group tasks" },
      { id: "meditation", label: "Meditation", value: "Mindfulness" },
    ],
  },
  combat: {
    title: "Combat Drills",
    items: [
      { id: "obstacle", label: "Obstacle Course", value: "Timed" },
      { id: "buddy", label: "Buddy Drill", value: "2-person ops" },
      { id: "nightnav", label: "Night Navigation", value: "Low visibility" },
      { id: "cqb", label: "CQB", value: "Close combat" },
    ],
  },
}

/* ===================== MAPPING ===================== */

const trainingMap: Record<string, string> = {
  physical: "physical",
  weapons: "weapons",
  mental: "mental",
  combat: "combat",
}

/* ===================== HELPERS ===================== */

// Default: some items completed for demo
const DEFAULT_TRAINING_STATUS: Record<string, Record<string, boolean>> = {
  physical: { run: true, pushups: true, pullups: false, situps: false },
  weapons: { insas: true, lmg: false, grenade: false, tactics: false },
  mental: { stress: true, decision: false, workshops: false, meditation: true },
  combat: { obstacle: false, buddy: true, nightnav: false, cqb: false },
}

function getTrainingStatus(soldier: any, section: string) {
  if (soldier?.trainingStatus && soldier.trainingStatus[section]) {
    return soldier.trainingStatus[section]
  }
  // Use default for demo
  return DEFAULT_TRAINING_STATUS[section] || {}
}

function getItemsWithStatus(
  items: { id: string; label: string; value: string }[],
  status: Record<string, boolean>
) {
  // Add 'status' property: "completed" or "pending"
  return items.map((item) => ({
    ...item,
    status: status[item.id] === true ? "completed" : "pending",
  }))
}

/* ===================== COMPONENT ===================== */

export function SoldierOverview({
  soldier,
  SCORES,
  sc,
  bc,
}: {
  soldier: any
  SCORES: any[]
  sc: (v: number) => string
  bc: (v: number) => string
}) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  return (
    <>
      {/* ===================== SCORE CARDS ===================== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SCORES.map((s) => {
          const v = soldier[s.key]
          const sectionKey = trainingMap[s.key]
          const isTrainable = !!sectionKey

          const status = getTrainingStatus(soldier, sectionKey)
          const total = TRAINING_DETAIL_TEMPLATES[sectionKey]?.items.length || 0
          const done = Object.values(status).filter(Boolean).length

          return (
            <div
              key={s.key}
              onClick={
                isTrainable
                  ? () =>
                      setSelectedSection(
                        selectedSection === s.key ? null : s.key
                      )
                  : undefined
              }
              className={`rounded-xl border p-3 transition ${
                isTrainable
                  ? "cursor-pointer " +
                    (selectedSection === s.key
                      ? "border-[#4a5c2f] bg-[#f6f7f2]"
                      : "border-stone-100 bg-stone-50 hover:bg-stone-100")
                  : "opacity-60"
              }`}
            >
              <div className="mb-1 text-[10px] text-stone-400">{s.label}</div>

              <div className={`text-2xl font-black ${sc(v)}`}>{v}</div>

              <div className="mt-1.5 h-1.5 rounded-full bg-stone-200">
                <div
                  className={`h-full rounded-full ${bc(v)}`}
                  style={{ width: `${v}%` }}
                />
              </div>

              {isTrainable && (
                <div className="mt-1 text-[10px] text-stone-400">
                  {done}/{total} completed
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ===================== TRAINING DETAILS ===================== */}
      {selectedSection &&
        trainingMap[selectedSection] &&
        TRAINING_DETAIL_TEMPLATES[trainingMap[selectedSection]] && (
          <div className="mt-4 rounded-xl border bg-white p-4">
            {/* Header */}
            <div className="mb-3 flex justify-between">
              <div className="font-bold">
                {TRAINING_DETAIL_TEMPLATES[trainingMap[selectedSection]].title}
              </div>

              <div className="rounded bg-stone-100 px-2 py-0.5 text-xs">
                {
                  Object.values(
                    getTrainingStatus(soldier, trainingMap[selectedSection])
                  ).filter(Boolean).length
                }
                /
                {
                  TRAINING_DETAIL_TEMPLATES[trainingMap[selectedSection]].items
                    .length
                }{" "}
                Done
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {getItemsWithStatus(
                TRAINING_DETAIL_TEMPLATES[trainingMap[selectedSection]].items,
                getTrainingStatus(soldier, trainingMap[selectedSection])
              ).map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between rounded-md px-3 py-2 text-xs ${
                    item.status === "completed" ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <span>{item.label}</span>
                  <span>
                    {item.status === "completed" ? "✔ Completed" : "⏳ Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* ===================== STRENGTH / MONITOR ===================== */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Strength */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-3">
          <div className="mb-2 text-xs font-bold text-green-700">Strengths</div>
          {SCORES.filter((s) => soldier[s.key] >= 85).map((s) => (
            <div key={s.key} className="flex justify-between text-xs">
              <span>{s.label}</span>
              <span>{soldier[s.key]}</span>
            </div>
          ))}
        </div>

        {/* Monitor */}
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3">
          <div className="mb-2 text-xs font-bold text-yellow-700">Monitor</div>
          {SCORES.filter(
            (s) => soldier[s.key] >= 70 && soldier[s.key] < 85
          ).map((s) => (
            <div key={s.key} className="flex justify-between text-xs">
              <span>{s.label}</span>
              <span>{soldier[s.key]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
