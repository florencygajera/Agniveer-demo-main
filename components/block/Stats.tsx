import W from "../custom/W"

export default function Stats() {
  return (
    <W>
      <div className="flex flex-wrap items-stretch justify-center gap-8 py-8">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex min-w-[150px] flex-col items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-[#232727CC] to-[#141616CC] px-8 py-7 shadow-xl backdrop-blur-sm"
          >
            <span className="font-[Tilt_Warp] text-3xl text-amber-400 drop-shadow-sm md:text-4xl">
              {s.count}
            </span>
            <span className="mt-1 text-center text-base text-white/80 md:text-lg">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </W>
  )
}

const STATS: {
  count: string
  label: string
}[] = [
  {
    count: "46,000+",
    label: "Applications",
  },
  {
    count: "8,400+",
    label: "Active Agniveers",
  },
  {
    count: "4",
    label: "Force Types",
  },
  {
    count: "124",
    label: "Training Centres",
  },
  {
    count: "91%",
    label: "Pass Rate 2024",
  },
]
