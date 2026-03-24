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
// ── Mobile Nav ────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — ADMIT CARD
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function CandidatePage() {
  const [section, setSection] = useState<Section>("application")

  return (
    <div className="flex min-h-screen bg-[#f4f3ef] font-sans">
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
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {section === "application" && <ApplicationSection />}
        </main>
      </div>
    </div>
  )
}
