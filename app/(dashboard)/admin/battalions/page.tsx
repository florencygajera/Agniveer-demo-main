"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  MapPin,
  Users,
  Shield,
  Plus,
  Pencil,
  ChevronRight,
  UserCheck,
  UserMinus,
  Star,
  TrendingUp,
  Search,
  Building2,
  ChevronLeft,
  X,
  Trophy,
  Dumbbell,
  Target,
  Brain,
  Swords,
  CalendarDays,
  ShieldCheck,
  Phone,
  Mail,
  Droplets,
  Activity,
} from "lucide-react"
import { label } from "framer-motion/client"
import { PerformanceGraph } from "./PerformanceGraph"
import { SoldierOverview } from "./SoldierOverview"
import { usePathname } from "next/navigation"
import { BatalionDetailsDialog } from "./BattalionDerailsDialog"

// ══════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════
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
  accentColor: string
  accentBorder: string
}

interface Soldier {
  id: string
  soldierId: string
  name: string
  rank: string
  battalion: string // battalion code e.g. "RR-1"
  battalionName: string
  gender: string
  state: string
  city: string
  dob: string
  joining: string
  blood: string
  phone: string
  email: string
  status: "active" | "on_leave" | "inactive"
  medical: string
  physical: number
  weapons: number
  mental: number
  combat: number
  attendance: number
  discipline: number
  overall: number
  equipment: string[]
  events: string[]
  emergency: { name: string; phone: string; relation: string }
  training?: {
    physical: {
      title: string
      items: { label: string; value: string }[]
    }
    weapons: {
      title: string
      items: { label: string; value: string }[]
    }
    mental: {
      title: string
      items: { label: string; value: string }[]
    }
    combat: {
      title: string
      items: { label: string; value: string }[]
    }
  }
}

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════
const BATTALIONS: Battalion[] = [
  {
    id: "1",
    code: "RR-1",
    name: "1st Rajputana Rifles",
    location: "Jaipur, Rajasthan",
    commander: "Col. R.K. Verma",
    score: 84.7,
    status: "Good",
    total: 6,
    active: 5,
    onLeave: 1,
    scoreAbove85: 3,
    physical: 83,
    weapons: 82,
    mental: 80,
    accentColor: "border-l-[#4a5c2f]",
    accentBorder: "#4a5c2f",
  },
  {
    id: "2",
    code: "PARA-2",
    name: "2nd Parachute Regiment",
    location: "Agra, Uttar Pradesh",
    commander: "Col. S.P. Mehta",
    score: 84.4,
    status: "Good",
    total: 4,
    active: 4,
    onLeave: 0,
    scoreAbove85: 3,
    physical: 84,
    weapons: 79,
    mental: 82,
    accentColor: "border-l-violet-500",
    accentBorder: "#7c3aed",
  },
  {
    id: "3",
    code: "BEN-3",
    name: "3rd Bengal Regiment",
    location: "Kolkata, West Bengal",
    commander: "Col. D.K. Roy",
    score: 83.2,
    status: "Good",
    total: 4,
    active: 4,
    onLeave: 0,
    scoreAbove85: 2,
    physical: 82,
    weapons: 77,
    mental: 81,
    accentColor: "border-l-sky-500",
    accentBorder: "#0284c7",
  },
  {
    id: "4",
    code: "MAR-4",
    name: "4th Maratha Light Infantry",
    location: "Pune, Maharashtra",
    commander: "Col. V.B. Patil",
    score: 80.0,
    status: "Good",
    total: 4,
    active: 4,
    onLeave: 0,
    scoreAbove85: 1,
    physical: 79,
    weapons: 75,
    mental: 77,
    accentColor: "border-l-amber-500",
    accentBorder: "#f59e0b",
  },
]

const ALL_SOLDIERS: Soldier[] = [
  {
    id: "1",
    soldierId: "AGN-2024-0101",
    name: "Rajveer Singh Chauhan",
    rank: "Sepoy",
    battalion: "RR-1",
    battalionName: "1st Rajputana Rifles",
    gender: "Male",
    state: "Rajasthan",
    city: "Jodhpur",
    dob: "2003-04-12",
    joining: "2024-01-15",
    blood: "B+",
    phone: "9876501001",
    email: "rajveer@army.in",
    status: "active",
    medical: "Fit",
    physical: 91,
    weapons: 88,
    mental: 78,
    combat: 89,
    attendance: 96,
    discipline: 92,
    overall: 89,
    equipment: [
      "INSAS Rifle",
      "Combat Uniform",
      "Tactical Backpack",
      "Ballistic Helmet",
    ],
    events: [
      "Won 200m Sprint — Batch Rally 2024",
      "Best Shooter Award — March 2025",
    ],
    emergency: { name: "Ratan Singh", phone: "9876501002", relation: "Father" },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "5km Run", value: "Daily" },
          { label: "Push-ups", value: "50/day" },
          { label: "Pull-ups", value: "10/day" },
          { label: "Sit-ups", value: "50/day" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Standard infantry rifle" },
          { label: "LMG", value: "Light Machine Gun" },
          { label: "Grenade Throwing", value: "Deployment training" },
          { label: "Field Tactics", value: "Combat positioning" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Stress Training", value: "Inoculation drills" },
          { label: "Decision Making", value: "Under pressure" },
          { label: "Workshops", value: "Group problem-solving" },
          { label: "Meditation", value: "Mindfulness practice" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Obstacle Course", value: "Timed drills" },
          { label: "Buddy Drill", value: "2-person tactics" },
          { label: "Night Navigation", value: "Low visibility ops" },
          { label: "CQB", value: "Close combat" },
        ],
      },
    },
  },
  {
    id: "2",
    soldierId: "AGN-2024-0102",
    name: "Priya Sharma",
    rank: "Sepoy",
    battalion: "RR-1",
    battalionName: "1st Rajputana Rifles",
    gender: "Female",
    state: "Rajasthan",
    city: "Jaipur",
    dob: "2002-08-22",
    joining: "2024-01-15",
    blood: "A+",
    phone: "9876501003",
    email: "priya.sharma@army.in",
    status: "active",
    medical: "Fit",
    physical: 85,
    weapons: 72,
    mental: 94,
    combat: 80,
    attendance: 98,
    discipline: 95,
    overall: 87.3,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: ["Top Mental Resilience — Batch 2024", "Academic Excellence Award"],
    emergency: {
      name: "Meena Sharma",
      phone: "9876501004",
      relation: "Mother",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "5km Run", value: "Alternate days" },
          { label: "Push-ups", value: "40/day" },
          { label: "Squats", value: "60/day" },
          { label: "Yoga", value: "Twice a week" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Standard infantry rifle" },
          { label: "Pistol Training", value: "Basic proficiency" },
          { label: "Grenade Throwing", value: "Basic drills" },
          { label: "Weapon Disassembly", value: "Weekly" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Decision Making", value: "Quick reaction drills" },
          { label: "Meditation", value: "Mindfulness, daily" },
          { label: "Peer Leadership", value: "Small group" },
          { label: "Workshops", value: "Problem-solving tasks" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Cover & Move", value: "Squad exercises" },
          { label: "First Aid", value: "Basic battlefield care" },
          { label: "Room Clearing", value: "Entry techniques" },
          { label: "CQB", value: "Close quarters" },
        ],
      },
    },
  },
  {
    id: "3",
    soldierId: "AGN-2024-0103",
    name: "Arjun Mehra",
    rank: "Lance Naik",
    battalion: "RR-1",
    battalionName: "1st Rajputana Rifles",
    gender: "Male",
    state: "Punjab",
    city: "Amritsar",
    dob: "2001-11-05",
    joining: "2024-01-15",
    blood: "O+",
    phone: "9876501005",
    email: "arjun.mehra@army.in",
    status: "active",
    medical: "Fit",
    physical: 96,
    weapons: 94,
    mental: 88,
    combat: 95,
    attendance: 100,
    discipline: 97,
    overall: 95,
    equipment: [
      "INSAS Rifle",
      "Combat Uniform",
      "Tactical Backpack",
      "Ballistic Helmet",
      "Night Vision Goggles",
    ],
    events: ["Battalion Champion — Physical 2024", "All India #1 — March 2025"],
    emergency: {
      name: "Gurpreet Mehra",
      phone: "9876501006",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "8km Run", value: "Daily" },
          { label: "Push-ups", value: "70/day" },
          { label: "Pull-ups", value: "20/day" },
          { label: "Burpees", value: "40/day" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Advanced marksmanship" },
          { label: "Sniper Range", value: "Weekly" },
          { label: "LMG Operation", value: "Machine gun crew" },
          { label: "Field Tactics", value: "Senior leadership drills" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Leadership Tasks", value: "Squad command" },
          { label: "Stress Inoculation", value: "Live ops drills" },
          { label: "Strategy Games", value: "Group scenarios" },
          { label: "Meditation", value: "Morning ritual" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Urban Combat", value: "Simulated buildings" },
          { label: "Obstacle Course", value: "Elite track" },
          { label: "Night Operations", value: "Vision goggle drills" },
          { label: "CQB", value: "Close quarters" },
        ],
      },
    },
  },
  {
    id: "4",
    soldierId: "AGN-2024-0104",
    name: "Sunil Kumar",
    rank: "Sepoy",
    battalion: "RR-1",
    battalionName: "1st Rajputana Rifles",
    gender: "Male",
    state: "Haryana",
    city: "Rohtak",
    dob: "2003-02-18",
    joining: "2024-01-15",
    blood: "AB+",
    phone: "9876501007",
    email: "sunil.k@army.in",
    status: "active",
    medical: "Fit (Ankle — Recovered)",
    physical: 68,
    weapons: 72,
    mental: 65,
    combat: 70,
    attendance: 82,
    discipline: 75,
    overall: 72,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: [],
    emergency: { name: "Ram Kumar", phone: "9876501008", relation: "Father" },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "5km Run", value: "Every other day" },
          { label: "Rehab Drills", value: "Ankle strengthening" },
          { label: "Stretching", value: "Daily" },
          { label: "Push-ups", value: "20/day" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Basic maintenance" },
          { label: "LMG", value: "Supervised" },
          { label: "Grenade Throwing", value: "Basic" },
          { label: "Weapon Handling", value: "Introductory" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Focus Training", value: "Short sessions" },
          { label: "Motivational Talks", value: "Weekly" },
          { label: "Peer Support", value: "Group" },
          { label: "Mindfulness", value: "Morning" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Light Drills", value: "Health-restricted" },
          { label: "Buddy Drill", value: "With partner" },
          { label: "Simulated Contact", value: "Moderate" },
          { label: "Fieldcraft", value: "Basic" },
        ],
      },
    },
  },
  {
    id: "5",
    soldierId: "AGN-2024-0105",
    name: "Kavita Rajput",
    rank: "Sepoy",
    battalion: "RR-1",
    battalionName: "1st Rajputana Rifles",
    gender: "Female",
    state: "UP",
    city: "Lucknow",
    dob: "2002-06-30",
    joining: "2024-01-15",
    blood: "B-",
    phone: "9876501009",
    email: "kavita.r@army.in",
    status: "on_leave",
    medical: "Fit",
    physical: 78,
    weapons: 74,
    mental: 82,
    combat: 76,
    attendance: 88,
    discipline: 85,
    overall: 80.5,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: ["Best Female Recruit — Batch 2024"],
    emergency: {
      name: "Sunita Rajput",
      phone: "9876501010",
      relation: "Mother",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Jogging", value: "Weekly" },
          { label: "Push-ups", value: "30/day" },
          { label: "Bodyweight Drills", value: "In-camp" },
          { label: "Dynamic Stretching", value: "Daily" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Standard drills" },
          { label: "Grenade Throw", value: "Monthly" },
          { label: "Field Tactics", value: "Basic" },
          { label: "Maintenance", value: "Basic cleaning" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Wellness Workshops", value: "Once per fortnight" },
          { label: "Meditation", value: "Mindfulness" },
          { label: "Peer Discussion", value: "Team" },
          { label: "Routine Setting", value: "Every Sunday" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Defense Drills", value: "Routine" },
          { label: "Partner Drill", value: "Pair rotation" },
          { label: "CBRN basics", value: "Chemical/Biological Response" },
          { label: "CQB", value: "Close combat" },
        ],
      },
    },
  },
  {
    id: "6",
    soldierId: "AGN-2024-0106",
    name: "Mahesh Choudhary",
    rank: "Sepoy",
    battalion: "RR-1",
    battalionName: "1st Rajputana Rifles",
    gender: "Male",
    state: "Rajasthan",
    city: "Bikaner",
    dob: "2003-09-14",
    joining: "2024-01-15",
    blood: "O-",
    phone: "9876501011",
    email: "mahesh.c@army.in",
    status: "active",
    medical: "Fit",
    physical: 82,
    weapons: 91,
    mental: 70,
    combat: 84,
    attendance: 91,
    discipline: 88,
    overall: 84.3,
    equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"],
    events: ["Best Shooter — Jan 2025"],
    emergency: {
      name: "Ramesh Choudhary",
      phone: "9876501012",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "6km Run", value: "Five times/week" },
          { label: "Push-ups", value: "45/day" },
          { label: "Plank Hold", value: "1 min x 3" },
          { label: "Squats", value: "55/day" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Sharpshooting" },
          { label: "LMG", value: "Firing range" },
          { label: "Grenade Drill", value: "Accuracy" },
          { label: "Weapon Cleaning", value: "Every weekend" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Self-motivation", value: "Reading" },
          { label: "Meditation", value: "Morning routine" },
          { label: "Peer Mentoring", value: "Small group" },
          { label: "Resilience Drill", value: "Sim event" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Ambush Drills", value: "Weekly" },
          { label: "Night Ops", value: "Low light" },
          { label: "Team Extraction", value: "Day ops" },
          { label: "CQB", value: "Room drills" },
        ],
      },
    },
  },
  {
    id: "7",
    soldierId: "AGN-2024-0201",
    name: "Vikram Nair",
    rank: "Sepoy",
    battalion: "PARA-2",
    battalionName: "2nd Parachute Regiment",
    gender: "Male",
    state: "Kerala",
    city: "Thiruvananthapuram",
    dob: "2002-03-25",
    joining: "2024-02-01",
    blood: "A+",
    phone: "9876502001",
    email: "vikram.n@army.in",
    status: "active",
    medical: "Fit",
    physical: 94,
    weapons: 88,
    mental: 86,
    combat: 93,
    attendance: 97,
    discipline: 94,
    overall: 92,
    equipment: [
      "INSAS Rifle",
      "Para Suit",
      "Combat Uniform",
      "Tactical Backpack",
    ],
    events: ["Jump Certified — Mar 2024", "Best Para Recruit — 2024"],
    emergency: { name: "Suresh Nair", phone: "9876502002", relation: "Father" },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Parachute Drills", value: "Simulator weekly" },
          { label: "Push-ups", value: "60/day" },
          { label: "Weighted Runs", value: "Backpack 5km" },
          { label: "Static Hold", value: "Twice a week" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Expert marksman" },
          { label: "Grenade Drill", value: "Jump scenario" },
          { label: "Para Pistol", value: "Monthly training" },
          { label: "LMG", value: "Support fire team" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Paratrooper Mindset", value: "Coach-led" },
          { label: "Fear Control", value: "Jump confidence" },
          { label: "Group Debrief", value: "Post jump" },
          { label: "Meditation", value: "Routine" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Airborne Insertion", value: "Simulations" },
          { label: "Rapid Extraction", value: "Timed" },
          { label: "CQB", value: "Quick assault" },
          { label: "Team Formations", value: "In drop zone" },
        ],
      },
    },
  },
  {
    id: "8",
    soldierId: "AGN-2024-0202",
    name: "Ananya Krishnan",
    rank: "Sepoy",
    battalion: "PARA-2",
    battalionName: "2nd Parachute Regiment",
    gender: "Female",
    state: "Tamil Nadu",
    city: "Chennai",
    dob: "2003-07-11",
    joining: "2024-02-01",
    blood: "B+",
    phone: "9876502003",
    email: "ananya.k@army.in",
    status: "active",
    medical: "Fit",
    physical: 80,
    weapons: 75,
    mental: 91,
    combat: 78,
    attendance: 95,
    discipline: 96,
    overall: 85.8,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: ["Top Academic Score — 2024"],
    emergency: {
      name: "Kavitha Krishnan",
      phone: "9876502004",
      relation: "Mother",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Circuit Training", value: "Weekly rotation" },
          { label: "Stairs Run", value: "Twice a week" },
          { label: "Plank", value: "90s daily" },
          { label: "High Knees", value: "15 mins" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Practice rounds" },
          { label: "SMG", value: "Intro course" },
          { label: "Grenade Drill", value: "Weekly" },
          { label: "Weapon Assembly", value: "Timed drills" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Mind Coaching", value: "Group training" },
          { label: "Meditation", value: "Evening" },
          { label: "Personal Journaling", value: "Daily" },
          { label: "Workshops", value: "Group reflection" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Team Assault", value: "Simulated room entry" },
          { label: "Night Navigation", value: "Camp terrain" },
          { label: "CBRN Basics", value: "Intro drills" },
          { label: "Escape & Evasion", value: "Scenario-based" },
        ],
      },
    },
  },
  {
    id: "9",
    soldierId: "AGN-2024-0203",
    name: "Rohit Sharma",
    rank: "Sepoy",
    battalion: "PARA-2",
    battalionName: "2nd Parachute Regiment",
    gender: "Male",
    state: "MP",
    city: "Bhopal",
    dob: "2002-12-01",
    joining: "2024-02-01",
    blood: "O+",
    phone: "9876502005",
    email: "rohit.s@army.in",
    status: "active",
    medical: "Under Observation (Knee)",
    physical: 75,
    weapons: 69,
    mental: 72,
    combat: 71,
    attendance: 79,
    discipline: 74,
    overall: 73.3,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: [],
    emergency: {
      name: "Mahesh Sharma",
      phone: "9876502006",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Rehab Exercise", value: "Knee recovery" },
          { label: "Walking Drills", value: "Daily" },
          { label: "Stretching", value: "Twice daily" },
          { label: "Light Cardio", value: "Cycle" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "Weapon Handling", value: "Safety drills" },
          { label: "INSAS Rifle", value: "Intro" },
          { label: "Field Tactics", value: "Basic" },
          { label: "Maintenance", value: "Weekly" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Motivation Workshop", value: "Group" },
          { label: "Meditation", value: "Evening" },
          { label: "Peer Support", value: "Mentoring" },
          { label: "Confidence Drills", value: "Weekly" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Observation Post", value: "Guard duty drills" },
          { label: "Simple Ambush", value: "Team role" },
          { label: "Fieldcraft", value: "Terrain walks" },
          { label: "First Aid", value: "Bandaging" },
        ],
      },
    },
  },
  {
    id: "10",
    soldierId: "AGN-2024-0204",
    name: "Deepak Yadav",
    rank: "Sepoy",
    battalion: "PARA-2",
    battalionName: "2nd Parachute Regiment",
    gender: "Male",
    state: "Bihar",
    city: "Patna",
    dob: "2003-05-19",
    joining: "2024-02-01",
    blood: "A-",
    phone: "9876502007",
    email: "deepak.y@army.in",
    status: "active",
    medical: "Fit",
    physical: 88,
    weapons: 82,
    mental: 79,
    combat: 86,
    attendance: 93,
    discipline: 90,
    overall: 86.3,
    equipment: ["INSAS Rifle", "Para Suit", "Combat Uniform"],
    events: ["Jump Certified — Apr 2024"],
    emergency: {
      name: "Sanjay Yadav",
      phone: "9876502008",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Endurance Run", value: "6km every other day" },
          { label: "Push-ups", value: "55/day" },
          { label: "Sit-ups", value: "60/day" },
          { label: "Backpack March", value: "Weekly" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Squad exercise" },
          { label: "LMG", value: "Light support" },
          { label: "Grenade Drill", value: "Timing focus" },
          { label: "Weapon Assembly", value: "Timed contest" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Job Rotation", value: "Duty swap" },
          { label: "Meditation", value: "Night routine" },
          { label: "Peer Teaching", value: "Group review" },
          { label: "Endurance Training", value: "Challenge course" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Line Assault Drill", value: "Live-fire demo" },
          { label: "Night Navigation", value: "Compulsory" },
          { label: "Team Evacuation", value: "Casualty drill" },
          { label: "CQB", value: "Day scenario" },
        ],
      },
    },
  },
  {
    id: "11",
    soldierId: "AGN-2024-0301",
    name: "Sourav Das",
    rank: "Sepoy",
    battalion: "BEN-3",
    battalionName: "3rd Bengal Regiment",
    gender: "Male",
    state: "WB",
    city: "Kolkata",
    dob: "2002-01-14",
    joining: "2024-02-15",
    blood: "B+",
    phone: "9876503001",
    email: "sourav.d@army.in",
    status: "active",
    medical: "Fit",
    physical: 86,
    weapons: 80,
    mental: 83,
    combat: 85,
    attendance: 94,
    discipline: 88,
    overall: 86,
    equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"],
    events: ["Best Combat Drill — Mar 2025"],
    emergency: { name: "Tapan Das", phone: "9876503002", relation: "Father" },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Interval Runs", value: "3x/week" },
          { label: "Push-ups", value: "40/day" },
          { label: "Medicine Ball Toss", value: "Twice a week" },
          { label: "Sit-ups", value: "45/day" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Live-fire drills" },
          { label: "Shotgun", value: "Weekend" },
          { label: "Grenade Drill", value: "Monthly test" },
          { label: "Field Tactics", value: "Rural combat" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Stress Management", value: "Routine" },
          { label: "Team Workshops", value: "Monthly" },
          { label: "Decision Games", value: "Friday" },
          { label: "Meditation", value: "Morning" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Patrol Exercise", value: "5km daily" },
          { label: "Night Nav", value: "Weekly" },
          { label: "Basic CQB", value: "Urban sim" },
          { label: "Trap Setting", value: "Twice/month" },
        ],
      },
    },
  },
  {
    id: "12",
    soldierId: "AGN-2024-0302",
    name: "Rekha Bose",
    rank: "Sepoy",
    battalion: "BEN-3",
    battalionName: "3rd Bengal Regiment",
    gender: "Female",
    state: "WB",
    city: "Howrah",
    dob: "2003-04-20",
    joining: "2024-02-15",
    blood: "O+",
    phone: "9876503003",
    email: "rekha.b@army.in",
    status: "active",
    medical: "Fit",
    physical: 79,
    weapons: 71,
    mental: 90,
    combat: 75,
    attendance: 96,
    discipline: 94,
    overall: 84.2,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: ["Best Academic — 2024"],
    emergency: { name: "Mina Bose", phone: "9876503004", relation: "Mother" },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Yoga", value: "Mornings" },
          { label: "Strength Drills", value: "3x/week" },
          { label: "Push-ups", value: "25/day" },
          { label: "Skipping", value: "Daily" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Firing basics" },
          { label: "Grenade Practice", value: "Weekly" },
          { label: "Weapon Cleaning", value: "Twice/week" },
          { label: "Field Tactics", value: "Mock drills" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Concentration Game", value: "Friday" },
          { label: "Meditation", value: "Guided" },
          { label: "Social Skills", value: "Peer activities" },
          { label: "Self Reflection", value: "Sunday" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Line Formations", value: "Weekly" },
          { label: "Guard Duty", value: "Night shifts" },
          { label: "CQB", value: "Day drills" },
          { label: "Escape Drill", value: "Twice a month" },
        ],
      },
    },
  },
  {
    id: "13",
    soldierId: "AGN-2024-0303",
    name: "Amit Ghosh",
    rank: "Sepoy",
    battalion: "BEN-3",
    battalionName: "3rd Bengal Regiment",
    gender: "Male",
    state: "WB",
    city: "Durgapur",
    dob: "2002-09-02",
    joining: "2024-02-15",
    blood: "A+",
    phone: "9876503005",
    email: "amit.g@army.in",
    status: "active",
    medical: "Fit",
    physical: 72,
    weapons: 65,
    mental: 68,
    combat: 69,
    attendance: 80,
    discipline: 72,
    overall: 71,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: [],
    emergency: {
      name: "Suresh Ghosh",
      phone: "9876503006",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Basic Exercise", value: "Stretch + run" },
          { label: "Push-ups", value: "15/day" },
          { label: "Strength Bands", value: "Light" },
          { label: "Jogging", value: "Alternate days" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Safety handling" },
          { label: "Field Tactics", value: "Intro" },
          { label: "Weapon Cleaning", value: "As needed" },
          { label: "Grenade Demo", value: "Observation" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Motivation", value: "Talks" },
          { label: "Meditation", value: "Morning" },
          { label: "Peer Activities", value: "Weekly spell" },
          { label: "Group Encouragement", value: "Squad check-ins" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Sentry Duty", value: "Night rotation" },
          { label: "Patrols", value: "Paired" },
          { label: "Fieldcraft", value: "Camp" },
          { label: "Evac Drill", value: "Team" },
        ],
      },
    },
  },
  {
    id: "14",
    soldierId: "AGN-2024-0304",
    name: "Ranjit Singh",
    rank: "Lance Naik",
    battalion: "BEN-3",
    battalionName: "3rd Bengal Regiment",
    gender: "Male",
    state: "Punjab",
    city: "Ludhiana",
    dob: "2001-07-25",
    joining: "2024-02-15",
    blood: "B+",
    phone: "9876503007",
    email: "ranjit.s@army.in",
    status: "active",
    medical: "Fit",
    physical: 90,
    weapons: 92,
    mental: 84,
    combat: 91,
    attendance: 98,
    discipline: 95,
    overall: 91.7,
    equipment: ["INSAS Rifle", "Combat Uniform", "Ballistic Helmet"],
    events: ["Best Shooter — Feb 2025"],
    emergency: {
      name: "Gurjant Singh",
      phone: "9876503008",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Long Distance Run", value: "8km thrice/week" },
          { label: "Push-ups", value: "80/day" },
          { label: "Obstacle Sprint", value: "Twice/week" },
          { label: "Hill Sprints", value: "Weekly" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Sniper drills" },
          { label: "LMG", value: "Co-team" },
          { label: "Fieldcraft", value: "Rural" },
          { label: "Weapon Maintenance", value: "Daily" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Leadership Module", value: "Squad command" },
          { label: "Meditation", value: "Morning" },
          { label: "Strategic Debrief", value: "Weekly" },
          { label: "Stress Testing", value: "Live scenario" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "CQB", value: "Urban scenario" },
          { label: "Team Movement", value: "Leader focus" },
          { label: "Night Patrol", value: "Weekly" },
          { label: "Evacuation", value: "Rapid" },
        ],
      },
    },
  },
  {
    id: "15",
    soldierId: "AGN-2024-0401",
    name: "Suresh Patil",
    rank: "Sepoy",
    battalion: "MAR-4",
    battalionName: "4th Maratha Light Infantry",
    gender: "Male",
    state: "Maharashtra",
    city: "Pune",
    dob: "2002-06-18",
    joining: "2024-03-01",
    blood: "O+",
    phone: "9876504001",
    email: "suresh.p@army.in",
    status: "active",
    medical: "Fit",
    physical: 83,
    weapons: 79,
    mental: 76,
    combat: 81,
    attendance: 89,
    discipline: 86,
    overall: 82.3,
    equipment: ["INSAS Rifle", "Combat Uniform", "Tactical Backpack"],
    events: ["Sprint Champion — 2024"],
    emergency: {
      name: "Ganesh Patil",
      phone: "9876504002",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Sprint Intervals", value: "4x400m" },
          { label: "Push-ups", value: "35/day" },
          { label: "Skipping", value: "Daily" },
          { label: "Wheelbarrow Walk", value: "Pair training" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Drill routine" },
          { label: "Practice Grenade", value: "Safety" },
          { label: "LMG", value: "Field use" },
          { label: "Bayonet Drill", value: "Weekly" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Peer Workshops", value: "Friday" },
          { label: "Meditation", value: "Morning" },
          { label: "Motivation Drill", value: "Weekly" },
          { label: "Time Management", value: "Group exercise" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Sprint Evacuation", value: "Timed" },
          { label: "Patrol Drill", value: "Camp section" },
          { label: "Field Medicine", value: "Basic" },
          { label: "CQB", value: "Close combat" },
        ],
      },
    },
  },
  {
    id: "16",
    soldierId: "AGN-2024-0402",
    name: "Rohini Jadhav",
    rank: "Sepoy",
    battalion: "MAR-4",
    battalionName: "4th Maratha Light Infantry",
    gender: "Female",
    state: "Maharashtra",
    city: "Nashik",
    dob: "2003-11-09",
    joining: "2024-03-01",
    blood: "A+",
    phone: "9876504003",
    email: "rohini.j@army.in",
    status: "active",
    medical: "Fit",
    physical: 76,
    weapons: 68,
    mental: 86,
    combat: 72,
    attendance: 91,
    discipline: 90,
    overall: 79.5,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: ["Best Mental Resilience — 2024"],
    emergency: {
      name: "Sunita Jadhav",
      phone: "9876504004",
      relation: "Mother",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Jump Rope", value: "Team warmup" },
          { label: "Plank", value: "60s" },
          { label: "Squats", value: "35/day" },
          { label: "Stretch Session", value: "Twice a week" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Dry fire" },
          { label: "Field Tactics", value: "Section drills" },
          { label: "Weapon Cleaning", value: "Monday" },
          { label: "Grenade Intro", value: "Demo" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Meditation", value: "Routine" },
          { label: "Peer Games", value: "Group" },
          { label: "Wellness Workshop", value: "Biweekly" },
          { label: "Rapid Decision", value: "Practice" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Buddy Climb", value: "Obstacle" },
          { label: "Patrol", value: "Short rotation" },
          { label: "Cover Drill", value: "3x/week" },
          { label: "First Aid", value: "Quick response" },
        ],
      },
    },
  },
  {
    id: "17",
    soldierId: "AGN-2024-0403",
    name: "Santosh More",
    rank: "Sepoy",
    battalion: "MAR-4",
    battalionName: "4th Maratha Light Infantry",
    gender: "Male",
    state: "Maharashtra",
    city: "Aurangabad",
    dob: "2002-03-14",
    joining: "2024-03-01",
    blood: "B-",
    phone: "9876504005",
    email: "santosh.m@army.in",
    status: "active",
    medical: "Under Observation (Back)",
    physical: 70,
    weapons: 66,
    mental: 62,
    combat: 68,
    attendance: 78,
    discipline: 70,
    overall: 69,
    equipment: ["INSAS Rifle", "Combat Uniform"],
    events: [],
    emergency: {
      name: "Bhimrao More",
      phone: "9876504006",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Therapy Drill", value: "Back health" },
          { label: "Walking", value: "Twice a day" },
          { label: "Stretching", value: "Gentle" },
          { label: "Light Core", value: "Daily" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Safety review" },
          { label: "Light Drill", value: "Occasional" },
          { label: "Maintenance", value: "With peer" },
          { label: "Grenade Demo", value: "Watch only" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Self-Esteem", value: "Talks" },
          { label: "Meditation", value: "Evening" },
          { label: "Team Support", value: "Weekly" },
          { label: "Goal Setting", value: "Personal" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Static Position", value: "Safety" },
          { label: "Radio Usage", value: "Basic" },
          { label: "Basic Patrol", value: "Short" },
          { label: "First Aid", value: "Intro" },
        ],
      },
    },
  },
  {
    id: "18",
    soldierId: "AGN-2024-0404",
    name: "Vijay Deshmukh",
    rank: "Sepoy",
    battalion: "MAR-4",
    battalionName: "4th Maratha Light Infantry",
    gender: "Male",
    state: "Maharashtra",
    city: "Nagpur",
    dob: "2001-08-30",
    joining: "2024-03-01",
    blood: "A-",
    phone: "9876504007",
    email: "vijay.d@army.in",
    status: "active",
    medical: "Fit",
    physical: 88,
    weapons: 85,
    mental: 82,
    combat: 87,
    attendance: 95,
    discipline: 92,
    overall: 88.2,
    equipment: ["INSAS Rifle", "Combat Uniform", "Ballistic Helmet"],
    events: ["Best All-Rounder — 2024"],
    emergency: {
      name: "Prakash Deshmukh",
      phone: "9876504008",
      relation: "Father",
    },
    training: {
      physical: {
        title: "Physical Training (PT)",
        items: [
          { label: "Distance Run", value: "10km every week" },
          { label: "Pull-ups", value: "18/day" },
          { label: "Stamina Drills", value: "With squad" },
          { label: "Flexibility", value: "Routine" },
        ],
      },
      weapons: {
        title: "Weapons Training",
        items: [
          { label: "INSAS Rifle", value: "Advanced marksmanship" },
          { label: "Bayonet Practice", value: "Monthly" },
          { label: "LMG", value: "Heavy support" },
          { label: "Grenade Drill", value: "Live demo" },
        ],
      },
      mental: {
        title: "Mental Resilience",
        items: [
          { label: "Tactical Decision", value: "Squad rotation" },
          { label: "Meditation", value: "Nightly" },
          { label: "Group Leadership", value: "Practical" },
          { label: "Endurance Sim", value: "Weekend" },
        ],
      },
      combat: {
        title: "Combat Drills",
        items: [
          { label: "Full Field Op", value: "Sim" },
          { label: "Obstacle Challenge", value: "Weekday" },
          { label: "Medical Evac", value: "Squad rotate" },
          { label: "CQB", value: "Urban drills" },
        ],
      },
    },
  },
]

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════
function sc(v: number) {
  if (v >= 90) return "text-emerald-600"
  if (v >= 80) return "text-[#4a5c2f]"
  if (v >= 70) return "text-amber-600"
  return "text-rose-500"
}
function bc(v: number) {
  if (v >= 90) return "bg-emerald-500"
  if (v >= 80) return "bg-[#4a5c2f]"
  if (v >= 70) return "bg-amber-500"
  return "bg-rose-500"
}
function grade(v: number) {
  if (v >= 90)
    return {
      l: "Outstanding",
      c: "bg-emerald-100 text-emerald-700 border-emerald-200",
    }
  if (v >= 80) return { l: "Good", c: "bg-sky-100 text-sky-700 border-sky-200" }
  if (v >= 70)
    return { l: "Average", c: "bg-amber-100 text-amber-700 border-amber-200" }
  return {
    l: "Needs Improvement",
    c: "bg-rose-100 text-rose-600 border-rose-200",
  }
}
function MiniBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full ${bc(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`text-xs font-semibold tabular-nums ${sc(value)}`}>
        {value}
      </span>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// SOLDIER DETAIL MODAL — full tabbed profile
// ══════════════════════════════════════════════════════════════
function SoldierDetailModal({
  soldier,
  onClose,
}: {
  soldier: Soldier
  onClose: () => void
}) {
  const [tab, setTab] = useState<
    | "overview"
    | "scores"
    | "personal"
    | "equipment"
    | "events"
    | "performance-graph"
  >("overview")

  React.useEffect(() => setTab("overview"), [soldier.id])

  const allSorted = [...ALL_SOLDIERS].sort((a, b) => b.overall - a.overall)
  const globalRank = allSorted.findIndex((s) => s.id === soldier.id) + 1
  const batSoldiers = ALL_SOLDIERS.filter(
    (s) => s.battalion === soldier.battalion
  )
  const batRank =
    [...batSoldiers]
      .sort((a, b) => b.overall - a.overall)
      .findIndex((s) => s.id === soldier.id) + 1

  const SCORES = [
    {
      key: "physical",
      label: "Physical Fitness",
      icon: <Dumbbell size={12} />,
    },
    { key: "weapons", label: "Weapons Handling", icon: <Target size={12} /> },
    { key: "mental", label: "Mental Resilience", icon: <Brain size={12} /> },
    { key: "combat", label: "Combat Drills", icon: <Swords size={12} /> },
    {
      key: "attendance",
      label: "Attendance",
      icon: <CalendarDays size={12} />,
    },
    { key: "discipline", label: "Discipline", icon: <ShieldCheck size={12} /> },
  ]

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "scores", label: "All Scores" },
    { id: "personal", label: "Personal" },
    { id: "equipment", label: "Equipment" },
    { id: "events", label: "Events" },
    { id: "performance-graph", label: "Performance Graph" },
  ] as const

  const statusMap = {
    active: "border-emerald-200 bg-emerald-50 text-emerald-700",
    on_leave: "border-amber-200 bg-amber-50 text-amber-700",
    inactive: "border-stone-200 bg-stone-50 text-stone-500",
  }
  const statusLabel = {
    active: "Active",
    on_leave: "On Leave",
    inactive: "Inactive",
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl"
      >
        {/* ── dark header ── */}
        <div className="rounded-t-xl bg-[#1a2d4a] px-5 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl">
                👤
              </div>
              <div>
                <h2 className="text-xl leading-tight font-bold text-white">
                  {soldier.name}
                </h2>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-orange-300">
                    {soldier.soldierId}
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                    {soldier.rank}
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                    {soldier.battalionName}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/60">
                  <span>
                    📍 {soldier.city}, {soldier.state}
                  </span>
                  <span>🩸 {soldier.blood}</span>
                  <span>🏥 {soldier.medical}</span>
                  <span>👤 {soldier.gender}</span>
                </div>
              </div>
            </div>
            {/* overall score pill */}
            <div className="shrink-0 text-center">
              <div
                className={`text-5xl leading-none font-black ${
                  soldier.overall >= 90
                    ? "text-emerald-400"
                    : soldier.overall >= 80
                      ? "text-amber-300"
                      : "text-orange-400"
                }`}
              >
                {soldier.overall}
              </div>
              <div className="mt-1 text-[10px] text-white/50">
                Overall Score
              </div>
              <div className="mt-0.5 text-xs text-white/70">
                Global{" "}
                <span className="font-bold text-white">#{globalRank}</span> ·
                Bat <span className="font-bold text-white">#{batRank}</span>
              </div>
            </div>
          </div>
          {/* status + grade badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              className={`border text-xs font-medium ${statusMap[soldier.status]}`}
            >
              {statusLabel[soldier.status]}
            </Badge>
            <Badge
              className={`border text-xs font-semibold ${grade(soldier.overall).c}`}
            >
              {grade(soldier.overall).l}
            </Badge>
          </div>
        </div>

        {/* ── tab bar ── */}
        <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-50">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t?.id)}
              className={`border-b-2 px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                tab === t.id
                  ? "border-[#4a5c2f] text-[#4a5c2f]"
                  : "border-transparent text-stone-400 hover:text-stone-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── tab content ── */}
        <div className="space-y-4 p-5">
          {/* OVERVIEW */}
          {tab === "overview" && (
            <SoldierOverview
              soldier={soldier}
              SCORES={SCORES}
              sc={sc}
              bc={bc}
            />
          )}

          {/* ALL SCORES */}
          {tab === "scores" && (
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    {["Category", "Score", "Grade", "Progress"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-stone-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {SCORES.map((s) => {
                    const v = soldier[s.key as keyof Soldier] as number
                    const g = grade(v)
                    return (
                      <tr key={s.key} className="hover:bg-stone-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                            {s.icon}
                            {s.label}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-lg font-black ${sc(v)}`}>
                            {v}
                          </span>
                          <span className="text-xs text-stone-400">/100</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`border text-xs ${g.c}`}>
                            {g.l}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-2 w-32 overflow-hidden rounded-full bg-stone-100">
                            <div
                              className={`h-full rounded-full ${bc(v)}`}
                              style={{ width: `${v}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="border-t-2 border-stone-200 bg-stone-50">
                    <td className="px-4 py-3 text-sm font-bold text-stone-800">
                      Overall Score
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xl font-black ${sc(soldier.overall)}`}
                      >
                        {soldier.overall}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`border text-xs ${grade(soldier.overall).c}`}
                      >
                        {grade(soldier.overall).l}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-400">
                      Global #{globalRank} · Bat #{batRank}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* PERSONAL */}
          {tab === "personal" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Personal info */}
              <div className="overflow-hidden rounded-xl border border-stone-200">
                <div className="border-b border-stone-100 bg-stone-50 px-4 py-2.5 text-xs font-bold tracking-wide text-stone-500 uppercase">
                  Personal Information
                </div>
                {[
                  ["Full Name", soldier.name],
                  [
                    "Date of Birth",
                    new Date(soldier.dob).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                  ],
                  ["Gender", soldier.gender],
                  ["Blood Group", soldier.blood],
                  ["State", soldier.state],
                  ["City", soldier.city],
                  ["Phone", soldier.phone],
                  ["Email", soldier.email],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-stone-50 px-4 py-2 last:border-0"
                  >
                    <span className="text-xs text-stone-400">{k}</span>
                    <span className="max-w-[60%] truncate text-right text-xs font-medium text-stone-700">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {/* Service */}
                <div className="overflow-hidden rounded-xl border border-stone-200">
                  <div className="border-b border-stone-100 bg-stone-50 px-4 py-2.5 text-xs font-bold tracking-wide text-stone-500 uppercase">
                    Service Details
                  </div>
                  {[
                    ["Soldier ID", soldier.soldierId],
                    ["Rank", soldier.rank],
                    ["Battalion", soldier.battalionName],
                    [
                      "Date of Joining",
                      new Date(soldier.joining).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                    ],
                    ["Status", statusLabel[soldier.status]],
                    ["Medical", soldier.medical],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-stone-50 px-4 py-2 last:border-0"
                    >
                      <span className="text-xs text-stone-400">{k}</span>
                      <span className="max-w-[60%] truncate text-right text-xs font-medium text-stone-700">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Emergency */}
                <div className="overflow-hidden rounded-xl border border-stone-200">
                  <div className="border-b border-stone-100 bg-stone-50 px-4 py-2.5 text-xs font-bold tracking-wide text-stone-500 uppercase">
                    Emergency Contact
                  </div>
                  {[
                    ["Name", soldier.emergency.name],
                    ["Phone", soldier.emergency.phone],
                    ["Relation", soldier.emergency.relation],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-stone-50 px-4 py-2 last:border-0"
                    >
                      <span className="text-xs text-stone-400">{k}</span>
                      <span className="text-xs font-medium text-stone-700">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EQUIPMENT */}
          {tab === "equipment" && (
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    {["#", "Item", "Type", "Issued", "Condition"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-stone-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {soldier.equipment.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-sm text-stone-400"
                      >
                        No equipment records.
                      </td>
                    </tr>
                  ) : (
                    soldier.equipment.map((eq, i) => {
                      const type =
                        eq.includes("Rifle") || eq.includes("Goggles")
                          ? "Weapon"
                          : eq.includes("Uniform") || eq.includes("Helmet")
                            ? "Uniform"
                            : "Gear"
                      return (
                        <tr key={i} className="hover:bg-stone-50">
                          <td className="px-4 py-3 font-mono text-xs text-stone-400">
                            {i + 1}
                          </td>
                          <td className="px-4 py-3 font-medium text-stone-800">
                            📦 {eq}
                          </td>
                          <td className="px-4 py-3">
                            <Badge className="border border-sky-200 bg-sky-50 text-xs text-sky-700">
                              {type}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-xs text-stone-400">
                            15 Jan 2024
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={`border text-xs ${i === 3 ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
                            >
                              {i === 3 ? "Worn" : "Good"}
                            </Badge>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* EVENTS */}
          {tab === "events" && (
            <div className="space-y-3">
              {soldier.events.length === 0 ? (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-10 text-center text-sm text-stone-400">
                  No events or awards recorded yet.
                </div>
              ) : (
                soldier.events.map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5"
                  >
                    <Trophy
                      size={16}
                      className="mt-0.5 shrink-0 text-amber-500"
                    />
                    <div>
                      <div className="text-sm font-semibold text-stone-800">
                        {ev}
                      </div>
                      <div className="mt-0.5 text-xs text-stone-400">
                        Achievement · Agniveer Service Record
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Performance Graph */}
          {/* Performance Graph */}
          {tab === "performance-graph" && (
            <PerformanceGraph soldier={soldier} />
          )}
        </div>

        {/* close footer */}
        <div className="flex justify-end rounded-b-xl border-t border-stone-100 bg-stone-50 px-5 py-3">
          <Button variant="outline" onClick={onClose} className="text-sm">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ══════════════════════════════════════════════════════════════
// BATTALION SOLDIERS VIEW (inline, replaces battalion grid)
// ══════════════════════════════════════════════════════════════
function BattalionSoldiersView({
  battalion,
  onBack,
  onSoldierClick,
}: {
  battalion: Battalion
  onBack: () => void
  onSoldierClick: (s: Soldier) => void
}) {
  const [search, setSearch] = useState("")
  const soldiers = ALL_SOLDIERS.filter((s) => s.battalion === battalion.code)
  const filtered = soldiers.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.soldierId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-500">
        <button
          onClick={onBack}
          className="flex items-center gap-1 font-medium transition-colors hover:text-stone-800"
        >
          <ChevronLeft size={14} /> All Battalions
        </button>
        <ChevronRight size={12} className="text-stone-300" />
        <span className="font-semibold text-stone-800">{battalion.name}</span>
      </div>

      {/* Battalion header card */}
      <Card
        className={`border-l-4 border-stone-200 ${battalion.accentColor} bg-white shadow-sm`}
      >
        <CardContent className="px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                {battalion.name}
              </h2>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                <span className="font-mono text-xs font-semibold text-stone-400">
                  {battalion.code}
                </span>
                <span className="flex items-center gap-0.5 text-xs text-stone-500">
                  <MapPin size={10} />
                  {battalion.location}
                </span>
                <span className="text-xs text-stone-500">
                  Cmd: {battalion.commander}
                </span>
              </div>
            </div>
            <div className="flex gap-5">
              {[
                {
                  label: "Total",
                  value: soldiers.length,
                  icon: <Users size={13} className="text-stone-400" />,
                },
                {
                  label: "Active",
                  value: soldiers.filter((s) => s.status === "active").length,
                  icon: <UserCheck size={13} className="text-emerald-500" />,
                },
                {
                  label: "On Leave",
                  value: soldiers.filter((s) => s.status === "on_leave").length,
                  icon: <UserMinus size={13} className="text-amber-500" />,
                },
                {
                  label: "Score≥85",
                  value: soldiers.filter((s) => s.overall >= 85).length,
                  icon: <Star size={13} className="text-[#4a5c2f]" />,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-0.5"
                >
                  {stat.icon}
                  <span className="text-lg font-bold text-stone-800">
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="shrink-0 text-right">
              <div className={`text-3xl font-black ${sc(battalion.score)}`}>
                {battalion.score}
              </div>
              <div className="text-xs text-stone-400">Avg. Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search + hint */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs min-w-[200px] flex-1">
          <Search
            size={13}
            className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"
          />
          <Input
            placeholder="Search name or soldier ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 border-stone-200 bg-white pl-8 text-xs"
          />
        </div>
        <span className="text-xs text-stone-400">
          {filtered.length} of {soldiers.length} soldiers
        </span>
        <span className="ml-auto hidden text-xs text-stone-400 sm:block">
          👆 Click any row to view full profile
        </span>
      </div>

      {/* Soldiers table — clickable rows */}
      <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                {[
                  "Soldier ID",
                  "Name",
                  "Rank",
                  "Physical",
                  "Weapons",
                  "Mental",
                  "Combat",
                  "Attend.",
                  "Discip.",
                  "Overall",
                  "Grade",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-stone-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="py-12 text-center text-sm text-stone-400"
                  >
                    No soldiers match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => onSoldierClick(s)}
                    className={`cursor-pointer transition-colors hover:bg-[#f0f5e8] active:bg-[#e4eedd] ${
                      s.overall >= 90
                        ? "bg-emerald-50/20"
                        : s.overall < 70
                          ? "bg-rose-50/20"
                          : ""
                    }`}
                  >
                    <td className="px-3 py-3 font-mono text-xs whitespace-nowrap text-stone-400">
                      {s.soldierId}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-semibold text-[#1a2d4a] hover:underline">
                        {s.name}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-stone-500">
                      {s.rank}
                    </td>
                    <td className="px-3 py-3">
                      <MiniBar value={s.physical} />
                    </td>
                    <td className="px-3 py-3">
                      <MiniBar value={s.weapons} />
                    </td>
                    <td className="px-3 py-3">
                      <MiniBar value={s.mental} />
                    </td>
                    <td className="px-3 py-3">
                      <MiniBar value={s.combat} />
                    </td>
                    <td className="px-3 py-3">
                      <MiniBar value={s.attendance} />
                    </td>
                    <td className="px-3 py-3">
                      <MiniBar value={s.discipline} />
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-lg font-black ${sc(s.overall)}`}>
                        {s.overall}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge className={`border text-xs ${grade(s.overall).c}`}>
                        {grade(s.overall).l}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        className={`border text-xs ${
                          s.status === "active"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : s.status === "on_leave"
                              ? "border-amber-200 bg-amber-50 text-amber-700"
                              : "border-stone-200 bg-stone-50 text-stone-500"
                        }`}
                      >
                        {s.status === "active"
                          ? "Active"
                          : s.status === "on_leave"
                            ? "On Leave"
                            : "Inactive"}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-2.5 text-xs text-stone-400">
          {filtered.length} soldier{filtered.length !== 1 ? "s" : ""} · Click
          any row to view complete profile
        </div>
      </Card>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// BATTALION CARD
// ══════════════════════════════════════════════════════════════
function BattalionCard({
  bat,
  onEdit,
  onViewSoldiers,
}: {
  bat: Battalion
  onEdit: () => void
  onViewSoldiers: () => void
}) {
  return (
    <Card
      className={`border-l-4 border-stone-200 ${bat.accentColor} flex flex-col bg-white shadow-sm transition-all hover:shadow-md`}
    >
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base leading-tight font-bold text-stone-900">
              {bat.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-mono text-xs font-semibold text-stone-400">
                {bat.code}
              </span>
              <span className="text-xs text-stone-300">·</span>
              <span className="flex items-center gap-0.5 text-xs text-stone-500">
                <MapPin size={10} className="text-rose-400" /> {bat.location}
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
              <Shield size={10} /> Cmd: {bat.commander}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className={`text-3xl font-black ${sc(bat.score)}`}>
              {bat.score}
            </p>
            <Badge className="border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700">
              {bat.status}
            </Badge>
          </div>
        </div>

        {/* Soldier stats */}
        <div className="grid grid-cols-4 gap-2 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2.5">
          {[
            {
              label: "Total",
              value: bat.total,
              icon: <Users size={13} className="text-stone-400" />,
            },
            {
              label: "Active",
              value: bat.active,
              icon: <UserCheck size={13} className="text-emerald-500" />,
            },
            {
              label: "On Leave",
              value: bat.onLeave,
              icon: <UserMinus size={13} className="text-amber-500" />,
            },
            {
              label: "Score≥85",
              value: bat.scoreAbove85,
              icon: <Star size={13} className="text-[#4a5c2f]" />,
            },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              {s.icon}
              <span className="text-lg font-bold text-stone-800">
                {s.value}
              </span>
              <span className="text-center text-[9px] leading-tight font-medium tracking-wide text-stone-400 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Score bars */}
        <div className="space-y-2.5">
          {[
            { label: "Physical", value: bat.physical },
            { label: "Weapons", value: bat.weapons },
            { label: "Mental", value: bat.mental },
          ].map((bar) => (
            <div key={bar.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">
                  {bar.label}
                </span>
                <span className={`text-xs font-bold ${sc(bar.value)}`}>
                  {bar.value}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${bc(bar.value)}`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex gap-2 pt-1">
          <Button
            onClick={onViewSoldiers}
            className="h-9 flex-1 gap-1.5 bg-[#1a2d4a] text-xs text-white hover:bg-[#243d61]"
          >
            <Users size={13} /> View Soldiers <ChevronRight size={12} />
          </Button>
          {/* ddt */}
          <BatalionDetailsDialog bat={bat}>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
            >
              <Users size={12} /> Details
            </Button>
          </BatalionDetailsDialog>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 border-stone-200 text-xs text-stone-600 hover:bg-stone-50"
            onClick={onEdit}
          >
            <Pencil size={12} /> Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ══════════════════════════════════════════════════════════════
// EDIT BATTALION DIALOG
// ══════════════════════════════════════════════════════════════
function EditDialog({
  bat,
  open,
  onClose,
  onSave,
}: {
  bat: Battalion | null
  open: boolean
  onClose: () => void
  onSave: (b: Battalion) => void
}) {
  const [form, setForm] = useState<Battalion | null>(bat)
  React.useEffect(() => setForm(bat), [bat])
  if (!form) return null
  const set = (k: keyof Battalion, v: string | number) =>
    setForm((f) => (f ? { ...f, [k]: v } : f))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-stone-800">
            <Pencil size={15} className="text-[#4a5c2f]" /> Edit — {form.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Battalion Name</Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Code</Label>
            <Input
              value={form.code}
              onChange={(e) => set("code", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Location</Label>
            <Input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-stone-500">Commander</Label>
            <Input
              value={form.commander}
              onChange={(e) => set("commander", e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Physical Score</Label>
            <Input
              type="number"
              value={form.physical}
              onChange={(e) => set("physical", +e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Weapons Score</Label>
            <Input
              type="number"
              value={form.weapons}
              onChange={(e) => set("weapons", +e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Mental Score</Label>
            <Input
              type="number"
              value={form.mental}
              onChange={(e) => set("mental", +e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-stone-500">Total Soldiers</Label>
            <Input
              type="number"
              value={form.total}
              onChange={(e) => set("total", +e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-sm">
            Cancel
          </Button>
          <Button
            className="bg-[#4a5c2f] text-sm text-white hover:bg-[#3a4a22]"
            onClick={() => {
              const avg =
                Math.round(
                  ((form.physical + form.weapons + form.mental) / 3) * 10
                ) / 10
              onSave({ ...form, score: avg })
              onClose()
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ══════════════════════════════════════════════════════════════
// PAGE ROOT
// ══════════════════════════════════════════════════════════════
type View = "grid" | "soldiers"

export default function BattalionsPage() {
  const [battalions, setBattalions] = useState<Battalion[]>(BATTALIONS)
  const [search, setSearch] = useState("")
  const [editBat, setEditBat] = useState<Battalion | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [view, setView] = useState<View>("grid")
  const [activeBattalion, setActiveBattalion] = useState<Battalion | null>(null)
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null)
  const [soldierModalOpen, setSoldierModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const batCode = params.get("bat")
      if (batCode) {
        const found = BATTALIONS.find((b) => b.id === batCode)

        if (found) {
          handleViewSoldiers(found)
        }
      }
    }
  }, [])

  const filtered = battalions.filter(
    (b) =>
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.code.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  )

  const totalSoldiers = battalions.reduce((s, b) => s + b.total, 0)
  const avgScore =
    Math.round(
      (battalions.reduce((s, b) => s + b.score, 0) / battalions.length) * 10
    ) / 10
  const totalActive = battalions.reduce((s, b) => s + b.active, 0)

  const handleViewSoldiers = (bat: Battalion) => {
    setActiveBattalion(bat)
    setView("soldiers")
  }
  const handleSoldierClick = (s: Soldier) => {
    setSelectedSoldier(s)
    setSoldierModalOpen(true)
  }
  const handleBack = () => {
    setView("grid")
    setActiveBattalion(null)
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* Edit Battalion dialog */}
      <EditDialog
        bat={editBat}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(updated) =>
          setBattalions((prev) =>
            prev.map((b) => (b.id === updated.id ? updated : b))
          )
        }
      />

      {/* Soldier detail modal */}
      {selectedSoldier && (
        <SoldierDetailModal
          soldier={selectedSoldier}
          onClose={() => {
            setSoldierModalOpen(false)
            setSelectedSoldier(null)
          }}
        />
      )}

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              <Building2 size={20} className="text-[#4a5c2f]" />
              {view === "soldiers" && activeBattalion
                ? activeBattalion.name
                : "All Battalions"}
            </h1>
            <p className="mt-0.5 text-xs text-stone-500">
              {view === "soldiers" && activeBattalion
                ? `${ALL_SOLDIERS.filter((s) => s.battalion === activeBattalion.code).length} soldiers · Click any row for full profile`
                : "Click View Soldiers on any battalion to drill down"}
            </p>
          </div>

          {view === "soldiers" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="gap-1.5 text-xs"
            >
              <ChevronLeft size={13} /> All Battalions
            </Button>
          ) : (
            <Button className="gap-2 bg-[#4a5c2f] text-sm text-white shadow-sm hover:bg-[#3a4a22]">
              <Plus size={15} /> Create Battalion
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        {/* ══════ GRID VIEW ══════ */}
        {view === "grid" && (
          <>
            {/* Summary strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Battalions",
                  value: battalions.length,
                  icon: <Building2 size={15} />,
                  color: "text-stone-700",
                },
                {
                  label: "Total Soldiers",
                  value: totalSoldiers,
                  icon: <Users size={15} />,
                  color: "text-sky-600",
                },
                {
                  label: "Active Duty",
                  value: totalActive,
                  icon: <UserCheck size={15} />,
                  color: "text-emerald-600",
                },
                {
                  label: "Avg. Score",
                  value: avgScore,
                  icon: <TrendingUp size={15} />,
                  color: "text-amber-600",
                },
              ].map((s) => (
                <Card
                  key={s.label}
                  className="border-stone-200 bg-white shadow-sm"
                >
                  <CardContent className="flex items-center gap-3 px-4 pt-4 pb-3">
                    <div className={s.color}>{s.icon}</div>
                    <div>
                      <p className="text-xs text-stone-400">{s.label}</p>
                      <p className={`text-2xl font-bold ${s.color}`}>
                        {s.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3">
              <div className="relative w-full max-w-xs">
                <Search
                  size={13}
                  className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400"
                />
                <Input
                  placeholder="Search battalion, code, location…"
                  className="h-8 border-stone-200 bg-white pl-8 text-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <p className="ml-auto text-xs text-stone-400">
                {filtered.length} of {battalions.length} battalions
              </p>
            </div>

            {/* Battalion cards */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-sm text-stone-400">
                No battalions match your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filtered.map((bat) => (
                  <BattalionCard
                    key={bat.id}
                    bat={bat}
                    onEdit={() => {
                      setEditBat(bat)
                      setDialogOpen(true)
                    }}
                    onViewSoldiers={() => handleViewSoldiers(bat)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ══════ SOLDIERS VIEW ══════ */}
        {view === "soldiers" && activeBattalion && (
          <BattalionSoldiersView
            battalion={activeBattalion}
            onBack={handleBack}
            onSoldierClick={handleSoldierClick}
          />
        )}
      </div>
    </div>
  )
}
