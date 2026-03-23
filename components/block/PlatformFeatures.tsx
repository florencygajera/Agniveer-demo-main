import {
  Activity,
  FileText,
  Headset,
  HeartPlus,
  Hourglass,
  IdCard,
  Landmark,
} from "lucide-react"
import { ReactElement } from "react"
import W from "../custom/W"
import { cn } from "@/lib/utils"

export default function PlatformFeatures() {
  return (
    <W className="mt-18">
      <div className="flex flex-col gap-8">
        <div className="mb-2">
          <p className="text-sm font-medium tracking-widest text-orange-500 uppercase">
            Platform Features
          </p>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            What You Can Do
          </h2>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </W>
  )
}

type FeatureTypes = {
  title: string
  description: string
  icon: ReactElement
}

function FeatureCard({
  feature,
  className,
}: {
  feature: FeatureTypes
  className?: string
}) {
  return (
    <div
      className={cn(
        // Card visual improvement
        "group relative flex min-h-[245px] flex-col gap-4 overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-50/40 via-white/70 to-white/90 p-6 shadow-xl",
        className
      )}
    >
      {/* Decorative shimmer or accent circle */}
      <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-amber-100 opacity-70 blur-2xl transition-transform group-hover:scale-110"></div>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            // Vibrant icon background
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-4 border-amber-100/40 bg-gradient-to-br from-amber-400/80 via-amber-300 to-amber-200 text-white shadow-lg drop-shadow-md"
          )}
        >
          {feature.icon}
        </span>
        <h3 className="text-lg font-bold tracking-tight text-amber-800 drop-shadow-sm sm:text-xl">
          {feature.title}
        </h3>
      </div>
      <p className="ml-1 text-sm leading-relaxed font-medium text-gray-700/90 md:text-base">
        {feature.description}
      </p>
    </div>
  )
}

const FEATURES: FeatureTypes[] = [
  {
    title: "Online Application",
    description:
      "Apply online and upload your documents securely. Track your application, get instant updates, and stay notified at every step.",
    icon: <FileText size={28} strokeWidth={2.2} className="text-amber-900" />,
  },
  {
    title: "Admit Card",
    description:
      "Download your hall ticket once verified. Get key exam details and timely alerts so you never miss important info.",
    icon: <IdCard size={28} strokeWidth={2.2} className="text-amber-900" />,
  },
  {
    title: "Training Tracking",
    description:
      "Track your training progress with dashboards. Receive feedback and see milestones for all aspects of your preparation.",
    icon: <Hourglass size={28} strokeWidth={2.2} className="text-amber-900" />,
  },
  {
    title: "Performance Analytics",
    description:
      "Access detailed analytics for your scores, rankings, and strengths. Get tailored reports and actionable insights to improve.",
    icon: <Activity size={28} strokeWidth={2.2} className="text-amber-900" />,
  },
  {
    title: "Medical Records",
    description:
      "Keep your health records safe and accessible only to doctors. Review history, appointments, and medical status easily.",
    icon: <HeartPlus size={28} strokeWidth={2.2} className="text-amber-900" />,
  },
  {
    title: "Stipend Portal",
    description:
      "View and download pay slips, check deductions, and track your Seva Nidhi fund growth with transparent records.",
    icon: <Landmark size={28} strokeWidth={2.2} className="text-amber-900" />,
  },
  // Uncomment this to add "Support & Helpdesk" visually similar
  // {
  //   title: "Support & Helpdesk",
  //   description:
  //     "Get instant help for any query. Access FAQs, submit requests, and track support directly through the helpdesk.",
  //   icon: <Headset size={28} strokeWidth={2.2} className="text-amber-900" />,
  // },
]
