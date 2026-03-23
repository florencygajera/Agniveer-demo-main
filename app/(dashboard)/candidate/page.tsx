"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ClipboardList,
  Search,
  Ticket,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronLeft,
  User,
  GraduationCap,
  Ruler,
  FileText,
  Send,
  Download,
  Printer,
  ShieldHalf,
  MapPin,
  Calendar,
  AlertCircle,
  Info,
  BookOpen,
  Dumbbell,
  Upload,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// ── Types ─────────────────────────────────────────────────────────────────────

type Section = "application" | "status" | "admitcard"
type AppStep = 0 | 1 | 2 | 3 | 4

// ── Sidebar ───────────────────────────────────────────────────────────────────

const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  {
    id: "application",
    label: "My Application",
    icon: <ClipboardList size={15} />,
  },
  { id: "status", label: "Track Status", icon: <Search size={15} /> },
  { id: "admitcard", label: "Admit Card", icon: <Ticket size={15} /> },
]

function Sidebar({
  active,
  setActive,
}: {
  active: Section
  setActive: (s: Section) => void
}) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
      {/* User strip */}
      <div className="border-b border-stone-100 bg-stone-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a2d4a] text-sm font-bold text-white">
            A
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-stone-800">
              Aryan Kumar Sharma
            </div>
            <div className="font-mono text-[10px] text-orange-500">
              AGN-APP-2025-84721
            </div>
            <div className="text-[10px] text-stone-400">
              Candidate · Agnipath 2025
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Badge className="border border-amber-200 bg-amber-50 text-[10px] text-amber-700">
            <Clock size={9} className="mr-1" /> Under Review
          </Badge>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        <p className="px-2 pt-2 pb-1 text-[9px] font-bold tracking-widest text-stone-400 uppercase">
          Candidate Portal
        </p>
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              active === n.id
                ? "bg-[#1a2d4a] text-white shadow-sm"
                : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
            }`}
          >
            {n.icon}
            {n.label}
          </button>
        ))}
      </nav>

      {/* Theme Toggle & Logout */}
      <div className="space-y-1 border-t border-stone-100 p-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs text-stone-400">Theme</span>
          <ThemeToggle />
        </div>
        <Link href="/">
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700">
            <LogOut size={14} /> Logout
          </button>
        </Link>
      </div>
    </aside>
  )
}

// ── Mobile Nav ────────────────────────────────────────────────────────────────

function MobileNav({
  active,
  setActive,
}: {
  active: Section
  setActive: (s: Section) => void
}) {
  return (
    <div className="flex overflow-x-auto border-b border-stone-200 bg-white md:hidden">
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => setActive(n.id)}
          className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-3 text-xs font-semibold whitespace-nowrap transition-colors ${
            active === n.id
              ? "border-[#1a2d4a] text-[#1a2d4a]"
              : "border-transparent text-stone-400 hover:text-stone-700"
          }`}
        >
          {n.icon} {n.label}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — APPLICATION FORM
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Personal Info", icon: <User size={14} /> },
  { label: "Education", icon: <GraduationCap size={14} /> },
  { label: "Physical", icon: <Dumbbell size={14} /> },
  { label: "Documents", icon: <Upload size={14} /> },
  { label: "Submit", icon: <Send size={14} /> },
]

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
]

function StepIndicator({ step }: { step: AppStep }) {
  return (
    <div className="mb-6 flex items-center overflow-x-auto pb-2">
      {STEPS.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex shrink-0 flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                i < step
                  ? "border-[#4a5c2f] bg-[#4a5c2f] text-white"
                  : i === step
                    ? "border-[#c8601a] bg-[#c8601a] text-white"
                    : "border-stone-300 bg-white text-stone-400"
              }`}
            >
              {i < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <div
              className={`mt-1 text-center text-[10px] font-medium whitespace-nowrap ${
                i === step
                  ? "text-[#c8601a]"
                  : i < step
                    ? "text-[#4a5c2f]"
                    : "text-stone-400"
              }`}
            >
              {s.label}
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`mx-1 mt-[-14px] h-0.5 min-w-[16px] flex-1 transition-all ${i < step ? "bg-[#4a5c2f]" : "bg-stone-200"}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
}

function F({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-semibold text-stone-600">
        {label} {required && <span className="text-rose-500">*</span>}
      </Label>
      {children}
    </div>
  )
}

// Step 0 — Personal Info
function StepPersonal({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-stone-800">
          Step 1 — Personal Information
        </h2>
        <p className="mt-0.5 text-xs text-stone-400">
          Enter details exactly as on your Aadhaar card
        </p>
      </div>

      <FieldRow>
        <F label="Full Name (as in Aadhaar)" required>
          <Input
            placeholder="e.g. Aryan Kumar Sharma"
            className="text-sm"
            defaultValue="Aryan Kumar Sharma"
          />
        </F>
        <F label="Date of Birth" required>
          <Input type="date" className="text-sm" defaultValue="2003-05-14" />
        </F>
        <F label="Gender" required>
          <Select defaultValue="male">
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </F>
        <F label="Category" required>
          <Select defaultValue="general">
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="obc">OBC</SelectItem>
              <SelectItem value="sc">SC</SelectItem>
              <SelectItem value="st">ST</SelectItem>
              <SelectItem value="ews">EWS</SelectItem>
            </SelectContent>
          </Select>
        </F>
        <F label="Mobile Number" required>
          <Input
            placeholder="10-digit number"
            className="text-sm"
            defaultValue="9898989891"
          />
        </F>
        <F label="Email Address" required>
          <Input
            type="email"
            placeholder="your@email.com"
            className="text-sm"
            defaultValue="aryan@email.com"
          />
        </F>
        <F label="Aadhaar Number" required>
          <Input placeholder="12-digit Aadhaar" className="text-sm" />
        </F>
        <F label="State of Domicile" required>
          <Select defaultValue="Rajasthan">
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </F>
        <F label="District" required>
          <Input
            placeholder="e.g. Jaipur"
            className="text-sm"
            defaultValue="Jaipur"
          />
        </F>
        <F label="Pin Code" required>
          <Input placeholder="6-digit pin" className="text-sm" />
        </F>
      </FieldRow>

      <F label="Full Address">
        <Textarea
          rows={2}
          placeholder="House No., Street, Locality..."
          className="resize-none text-sm"
        />
      </F>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="gap-2 bg-[#1a2d4a] text-white hover:bg-[#243d61]"
        >
          Save & Next <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}

// Step 1 — Education
function StepEducation({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-stone-800">
          Step 2 — Educational Qualifications
        </h2>
        <p className="mt-0.5 text-xs text-stone-400">
          Minimum Class 10 required · Class 12 preferred for GD / Tech trades
        </p>
      </div>

      <FieldRow>
        <F label="Highest Qualification" required>
          <Select defaultValue="12th">
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10th">Class 10 (Matriculation)</SelectItem>
              <SelectItem value="12th">Class 12 / HSC</SelectItem>
              <SelectItem value="iti">ITI Certificate</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </F>
        <F label="Board / University" required>
          <Input
            placeholder="e.g. RBSE, CBSE"
            className="text-sm"
            defaultValue="RBSE"
          />
        </F>
        <F label="Year of Passing" required>
          <Input
            placeholder="e.g. 2021"
            className="text-sm"
            defaultValue="2021"
          />
        </F>
        <F label="Percentage / CGPA" required>
          <Input
            placeholder="e.g. 72.5%"
            className="text-sm"
            defaultValue="72.5"
          />
        </F>
        <F label="Roll Number (Board)">
          <Input placeholder="As on marksheet" className="text-sm" />
        </F>
        <F label="School / College Name" required>
          <Input placeholder="Full institution name" className="text-sm" />
        </F>
      </FieldRow>

      <F label="Applied Trade" required>
        <Select defaultValue="gd">
          <SelectTrigger className="text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gd">Agniveer GD (General Duty)</SelectItem>
            <SelectItem value="tech">Agniveer Technical</SelectItem>
            <SelectItem value="tradesman">Agniveer Tradesman</SelectItem>
            <SelectItem value="clerk">Agniveer Clerk / SKT</SelectItem>
          </SelectContent>
        </Select>
      </F>

      <div className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
        <Info size={14} className="shrink-0" />
        <span>
          Agniveer GD requires Class 10 (45%) · Technical requires Class 12 with
          Physics, Chemistry, Maths
        </span>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2 text-sm">
          <ChevronLeft size={14} /> Previous
        </Button>
        <Button
          onClick={onNext}
          className="gap-2 bg-[#1a2d4a] text-white hover:bg-[#243d61]"
        >
          Save & Next <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}

// Step 2 — Physical
function StepPhysical({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-stone-800">
          Step 3 — Physical Measurements
        </h2>
        <p className="mt-0.5 text-xs text-stone-400">
          Measurements must meet minimum eligibility standards
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Min. Height", value: "170 cm", note: "Males" },
          { label: "Min. Weight", value: "50 kg", note: "Proportionate" },
          { label: "Chest Normal", value: "77 cm", note: "Minimum" },
          { label: "Chest Expanded", value: "82 cm", note: "Minimum" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-[#c5d9a0] bg-[#f0f5e8] p-3 text-center"
          >
            <div className="text-[10px] font-semibold tracking-wide text-[#4a5c2f] uppercase">
              {c.label}
            </div>
            <div className="mt-0.5 text-xl font-black text-[#344228]">
              {c.value}
            </div>
            <div className="text-[10px] text-stone-400">{c.note}</div>
          </div>
        ))}
      </div>

      <FieldRow>
        <F label="Height (cm)" required>
          <Input
            type="number"
            placeholder="e.g. 172"
            className="text-sm"
            defaultValue="172"
          />
        </F>
        <F label="Weight (kg)" required>
          <Input
            type="number"
            placeholder="e.g. 65"
            className="text-sm"
            defaultValue="65"
          />
        </F>
        <F label="Chest — Normal (cm)" required>
          <Input type="number" placeholder="e.g. 77" className="text-sm" />
        </F>
        <F label="Chest — Expanded (cm)" required>
          <Input type="number" placeholder="e.g. 82" className="text-sm" />
        </F>
      </FieldRow>

      <F label="Medical Conditions / Disabilities" required>
        <Select defaultValue="none">
          <SelectTrigger className="text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">
              None — I declare I am medically fit
            </SelectItem>
            <SelectItem value="yes">
              Yes — I have a condition to declare
            </SelectItem>
          </SelectContent>
        </Select>
      </F>

      <F label="Blood Group" required>
        <Select defaultValue="B+">
          <SelectTrigger className="text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <SelectItem key={bg} value={bg}>
                {bg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </F>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2 text-sm">
          <ChevronLeft size={14} /> Previous
        </Button>
        <Button
          onClick={onNext}
          className="gap-2 bg-[#1a2d4a] text-white hover:bg-[#243d61]"
        >
          Save & Next <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}

// Step 3 — Documents
const DOCS = [
  { label: "Aadhaar Card", required: true, accepted: ".pdf, .jpg, .png" },
  { label: "Class 10 Marksheet", required: true, accepted: ".pdf, .jpg" },
  { label: "Class 12 / ITI Marksheet", required: true, accepted: ".pdf, .jpg" },
  { label: "Domicile Certificate", required: true, accepted: ".pdf, .jpg" },
  {
    label: "Caste Certificate (if applicable)",
    required: false,
    accepted: ".pdf, .jpg",
  },
  { label: "Medical Fitness Certificate", required: true, accepted: ".pdf" },
  { label: "Passport-size Photograph", required: true, accepted: ".jpg, .png" },
  {
    label: "Signature (on white paper)",
    required: true,
    accepted: ".jpg, .png",
  },
]

function StepDocuments({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({
    "Aadhaar Card": true,
    "Class 10 Marksheet": true,
    "Passport-size Photograph": true,
  })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-stone-800">
          Step 4 — Document Upload
        </h2>
        <p className="mt-0.5 text-xs text-stone-400">
          Max 2 MB per file · Clear, legible scans only
        </p>
      </div>

      <div className="space-y-2">
        {DOCS.map((doc) => (
          <div
            key={doc.label}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-all ${
              uploaded[doc.label]
                ? "border-emerald-200 bg-emerald-50"
                : "border-stone-200 bg-white"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              {uploaded[doc.label] ? (
                <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
              ) : (
                <Upload size={16} className="shrink-0 text-stone-400" />
              )}
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-stone-800">
                  {doc.label}
                  {doc.required && (
                    <span className="ml-1 text-rose-500">*</span>
                  )}
                </div>
                <div className="text-[10px] text-stone-400">
                  {doc.accepted} · Max 2 MB
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant={uploaded[doc.label] ? "outline" : "default"}
              className={`ml-3 h-7 shrink-0 text-xs ${uploaded[doc.label] ? "border-emerald-300 text-emerald-700" : "bg-[#1a2d4a] text-white hover:bg-[#243d61]"}`}
              onClick={() =>
                setUploaded((u) => ({ ...u, [doc.label]: !u[doc.label] }))
              }
            >
              {uploaded[doc.label] ? "Uploaded ✓" : "Upload"}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
        <AlertCircle size={14} className="shrink-0" />
        <span>
          Documents must be self-attested. Originals will be verified at the
          recruitment rally.
        </span>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2 text-sm">
          <ChevronLeft size={14} /> Previous
        </Button>
        <Button
          onClick={onNext}
          className="gap-2 bg-[#1a2d4a] text-white hover:bg-[#243d61]"
        >
          Review & Submit <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}

// Step 4 — Submit / Review
function StepSubmit({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-200 bg-emerald-100">
          <CheckCircle2 size={40} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-stone-800">
            Application Submitted!
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Your application is under review. You'll be notified via SMS &
            email.
          </p>
        </div>
        <div className="space-y-1 rounded-lg border border-sky-200 bg-sky-50 px-6 py-4 text-sm text-sky-700">
          <div>
            Registration ID:{" "}
            <strong className="font-mono">AGN-APP-2025-84721</strong>
          </div>
          <div>
            Submitted on: <strong>12 March 2025</strong>
          </div>
          <div>
            Status:{" "}
            <span className="font-semibold text-amber-600">Under Review</span>
          </div>
        </div>
        <p className="text-xs text-stone-400">
          Check your application status in the "Track Status" tab
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-stone-800">
          Step 5 — Review & Submit
        </h2>
        <p className="mt-0.5 text-xs text-stone-400">
          Please verify all details before final submission
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-3">
        {[
          {
            section: "Personal Information",
            items: [
              ["Name", "Aryan Kumar Sharma"],
              ["DOB", "14 May 2003"],
              ["Gender", "Male"],
              ["Category", "General"],
              ["State", "Rajasthan"],
              ["Mobile", "9898989891"],
            ],
          },
          {
            section: "Educational Qualifications",
            items: [
              ["Qualification", "Class 12 Pass"],
              ["Board", "RBSE"],
              ["Year", "2021"],
              ["Percentage", "72.5%"],
              ["Trade Applied", "Agniveer GD"],
            ],
          },
          {
            section: "Physical Measurements",
            items: [
              ["Height", "172 cm"],
              ["Weight", "65 kg"],
              ["Blood Group", "B+"],
            ],
          },
          {
            section: "Documents",
            items: [
              ["Aadhaar Card", "✓ Uploaded"],
              ["Class 10 Marksheet", "✓ Uploaded"],
              ["Photograph", "✓ Uploaded"],
              ["Other docs", "Partial"],
            ],
          },
        ].map((sec) => (
          <div
            key={sec.section}
            className="overflow-hidden rounded-lg border border-stone-200"
          >
            <div className="border-b border-stone-100 bg-stone-50 px-4 py-2 text-xs font-bold tracking-wide text-stone-500 uppercase">
              {sec.section}
            </div>
            <div className="divide-y divide-stone-50">
              {sec.items.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between px-4 py-2"
                >
                  <span className="text-xs text-stone-400">{k}</span>
                  <span
                    className={`text-xs font-semibold ${v.includes("✓") ? "text-emerald-600" : "text-stone-700"}`}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Declaration */}
      <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-xs leading-relaxed text-stone-600">
        <strong className="text-stone-800">Declaration:</strong> I hereby
        declare that all information furnished in this application is true,
        complete and correct. I understand that any false statement shall make
        me liable to rejection and legal action under applicable law.
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2 text-sm">
          <ChevronLeft size={14} /> Back
        </Button>
        <Button
          onClick={() => setSubmitted(true)}
          className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Send size={14} /> Submit Application
        </Button>
      </div>
    </div>
  )
}

function ApplicationSection() {
  const [step, setStep] = useState<AppStep>(0)
  const next = () => setStep((s) => Math.min(s + 1, 4) as AppStep)
  const back = () => setStep((s) => Math.max(s - 1, 0) as AppStep)

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-lg font-bold text-stone-900">
          Application Form — Agnipath 2025
        </h1>
        <p className="text-xs text-stone-400">
          Complete all sections before submission · Last date: 31 March 2025
        </p>
      </div>

      <StepIndicator step={step} />

      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-5 sm:p-6">
          {step === 0 && <StepPersonal onNext={next} />}
          {step === 1 && <StepEducation onNext={next} onBack={back} />}
          {step === 2 && <StepPhysical onNext={next} onBack={back} />}
          {step === 3 && <StepDocuments onNext={next} onBack={back} />}
          {step === 4 && <StepSubmit onBack={back} />}
        </CardContent>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — TRACK STATUS
// ─────────────────────────────────────────────────────────────────────────────

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

function StatusSection() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-stone-900">Application Status</h1>
        <p className="text-xs text-stone-400">
          Track your recruitment journey in real time
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                className={`mt-1 text-sm font-black ${c.accent} ${c.mono ? "font-mono" : ""}`}
              >
                {c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active alert */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <Clock size={15} className="mt-0.5 shrink-0 text-amber-600" />
        <div className="text-sm text-amber-800">
          <strong>Document Verification in Progress.</strong> Our team is
          reviewing your submitted documents. You'll receive an SMS once
          verification is complete.
        </div>
      </div>

      {/* Timeline */}
      <Card className="border-stone-200 bg-white shadow-sm">
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
                      className={`mt-1 w-0.5 flex-1 ${item.status === "done" ? "bg-[#4a5c2f]" : "bg-stone-200"}`}
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
      <Card className="border-stone-200 bg-white shadow-sm">
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — ADMIT CARD
// ─────────────────────────────────────────────────────────────────────────────

function AdmitCardSection() {
  const [downloaded, setDownloaded] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-stone-900">
          Admit Card / Hall Ticket
        </h1>
        <p className="text-xs text-stone-400">
          Your examination hall ticket for Agnipath 2025
        </p>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <AlertCircle size={15} className="mt-0.5 shrink-0" />
        <div>
          <strong>
            Admit card becomes downloadable after document verification.
          </strong>{" "}
          A preview is shown below. Download will be enabled once your documents
          are approved.
        </div>
      </div>

      {/* Hall Ticket Card */}
      <div className="overflow-hidden rounded-xl border-2 border-[#1a2d4a] shadow-lg">
        {/* Top stripe */}
        <div className="h-2 bg-gradient-to-r from-[#c8601a] via-[#ffffff] to-[#046a38]" />

        {/* Header */}
        <div className="flex items-center gap-4 bg-[#1a2d4a] px-5 py-4 text-white">
          <ShieldHalf size={36} className="shrink-0 text-amber-300" />
          <div>
            <div className="text-base leading-tight font-bold">
              Agniveer Hall Ticket — Agnipath Recruitment 2025
            </div>
            <div className="mt-0.5 text-[11px] tracking-wider text-white/60 uppercase">
              Indian Army · Ministry of Defence · Govt. of India
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-5 py-5">
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[auto_1fr_1fr]">
            {/* Photo */}
            <div className="flex justify-center sm:justify-start">
              <div className="flex h-24 w-20 items-center justify-center rounded border-2 border-dashed border-stone-300 bg-stone-50 text-4xl">
                👤
              </div>
            </div>

            {/* Left fields */}
            <div className="space-y-2.5">
              {[
                ["Candidate Name", "ARYAN KUMAR SHARMA"],
                ["Date of Birth", "14 May 2003"],
                ["Category / Trade", "General · Agniveer GD"],
                ["State of Domicile", "Rajasthan"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase">
                    {label}
                  </div>
                  <div className="text-sm font-bold text-stone-800">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Right fields */}
            <div className="space-y-2.5">
              {[
                ["Registration No.", "AGN-APP-2025-84721"],
                ["Admit Card No.", "AC-2025-84721-KV"],
                ["Applied Force", "Indian Army"],
                ["Gender", "Male"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase">
                    {label}
                  </div>
                  <div
                    className={`text-sm font-bold text-stone-800 ${label === "Registration No." || label === "Admit Card No." ? "font-mono text-orange-600" : ""}`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam details */}
          <div className="mt-5 grid grid-cols-2 gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 sm:grid-cols-3">
            {[
              ["Exam Date", "02 May 2025 (Friday)"],
              ["Reporting Time", "08:30 hrs (Sharp)"],
              ["Duration", "60 Minutes · 100 Marks"],
              ["Exam Centre", "Kendriya Vidyalaya No. 1, Jaipur"],
              ["Centre Code", "KV-JAI-001"],
              ["Passing Marks", "40 out of 100"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase">
                  {label}
                </div>
                <div
                  className={`text-sm font-semibold ${label === "Exam Date" ? "text-[#c8601a]" : "text-stone-700"}`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-4 space-y-1 rounded-lg border-l-4 border-[#b8941a] bg-amber-50 px-4 py-3 text-xs leading-relaxed text-stone-700">
            <div className="font-bold text-stone-800">
              Important Instructions:
            </div>
            <div>
              • Carry original Aadhaar card + 1 additional photo ID at all times
            </div>
            <div>
              • No electronic devices, mobile phones or smart watches allowed
              inside
            </div>
            <div>• Report minimum 30 minutes before the reporting time</div>
            <div>• Dress code: Formal / Neat civilian attire</div>
            <div>
              • Hall ticket must be produced at all stages of the examination
              process
            </div>
          </div>
        </div>

        {/* Bottom stripe */}
        <div className="h-2 bg-gradient-to-r from-[#046a38] via-[#ffffff] to-[#c8601a]" />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={() => setDownloaded(true)}
          className="gap-2 bg-[#1a2d4a] text-white hover:bg-[#243d61]"
        >
          <Download size={14} />
          {downloaded ? "Downloaded ✓" : "Download PDF"}
        </Button>
        <Button variant="outline" className="gap-2 text-stone-600">
          <Printer size={14} /> Print
        </Button>
      </div>

      {downloaded && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 size={14} />
          Admit card downloaded. Keep a printed copy for the examination day.
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function CandidatePage() {
  const [section, setSection] = useState<Section>("application")

  return (
    <div className="flex min-h-screen bg-[#f4f3ef] font-sans">
      <Sidebar active={section} setActive={setSection} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-base font-bold text-stone-900">
                {section === "application"
                  ? "My Application"
                  : section === "status"
                    ? "Track Status"
                    : "Admit Card"}
              </h1>
              <p className="text-xs text-stone-400">
                Agnipath Scheme 2025 · Candidate Portal
              </p>
            </div>
            <Badge className="shrink-0 border border-amber-200 bg-amber-50 text-xs text-amber-700">
              Under Review
            </Badge>
          </div>
          {/* Mobile nav tabs */}
          <MobileNav active={section} setActive={setSection} />
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {section === "application" && <ApplicationSection />}
          {section === "status" && <StatusSection />}
          {section === "admitcard" && <AdmitCardSection />}
        </main>
      </div>
    </div>
  )
}
