"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Users, Search, FileText, CheckCircle2, Clock, XCircle, Star,
  AlertCircle, Pencil, MapPin, GraduationCap, Ruler, Weight,
  Briefcase, CalendarDays, UserCheck, StickyNote, Download,
  ChevronDown, ChevronUp, Plus, Trash2, Eye, X, Save,
  Shield, Activity, Phone, Mail, Droplets, ChevronRight,
  TriangleAlert, RefreshCw,
} from "lucide-react"

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════
type AppStatus = "Under Review" | "Verified" | "Pending Docs" | "Selected" | "Rejected"
type FilterTab = "All" | AppStatus

interface Application {
  id: string
  name: string
  dob: string
  state: string
  education: string
  height: string
  weight: string
  trade: string
  appliedOn: string
  verifiedBy: string
  status: AppStatus
  notes: string
  phone: string
  email: string
  gender: string
  category: string
  force: string
  chest: string
  medical: string
  aadhaar: string
}

interface Agniveer {
  id: string
  AgniveerId: string
  name: string
  rank: string
  battalion: string
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
}

// ═══════════════════════════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════════════════════════
const INIT_APPS: Application[] = [
  { id: "APP-2025-001", name: "Aryan Kumar Sharma", dob: "2003-05-14", state: "Rajasthan", education: "12th Pass", height: "172", weight: "65", trade: "Agniveer GD", appliedOn: "12 Mar 2025", verifiedBy: "—", status: "Under Review", notes: "—", phone: "9898989891", email: "aryan@email.com", gender: "Male", category: "General", force: "Army", chest: "79", medical: "None", aadhaar: "XXXX-XXXX-1234" },
  { id: "APP-2025-002", name: "Priya Kumari Singh", dob: "2002-11-22", state: "Bihar", education: "12th Pass", height: "162", weight: "55", trade: "Agniveer GD", appliedOn: "10 Mar 2025", verifiedBy: "Maj. Ankit Verma", status: "Verified", notes: "All documents verified. Eligible.", phone: "9898989892", email: "priya@email.com", gender: "Female", category: "OBC", force: "Army", chest: "75", medical: "None", aadhaar: "XXXX-XXXX-2345" },
  { id: "APP-2025-003", name: "Karan Deep Singh", dob: "2004-02-08", state: "Punjab", education: "12th Pass", height: "175", weight: "68", trade: "Agniveer Tech", appliedOn: "09 Mar 2025", verifiedBy: "—", status: "Pending Docs", notes: "Awaiting education certificate.", phone: "9898989893", email: "karan@email.com", gender: "Male", category: "General", force: "Army", chest: "80", medical: "None", aadhaar: "XXXX-XXXX-3456" },
  { id: "APP-2025-004", name: "Meena Devi", dob: "2003-07-30", state: "HP", education: "10th Pass", height: "158", weight: "50", trade: "Agniveer GD", appliedOn: "08 Mar 2025", verifiedBy: "Maj. Ankit Verma", status: "Rejected", notes: "Education qualification not meeting minimum criteria for applied trade.", phone: "9898989894", email: "meena@email.com", gender: "Female", category: "SC", force: "Army", chest: "72", medical: "None", aadhaar: "XXXX-XXXX-4567" },
  { id: "APP-2025-005", name: "Rohan Joshi", dob: "2004-01-15", state: "Gujarat", education: "12th Pass", height: "170", weight: "63", trade: "Agniveer GD", appliedOn: "07 Mar 2025", verifiedBy: "Maj. Ankit Verma", status: "Selected", notes: "All checks passed. Eligible for training.", phone: "9898989895", email: "rohan@email.com", gender: "Male", category: "General", force: "Army", chest: "78", medical: "None", aadhaar: "XXXX-XXXX-5678" },
  { id: "APP-2025-006", name: "Sneha Gupta", dob: "2002-09-03", state: "UP", education: "12th Pass", height: "160", weight: "53", trade: "Agniveer GD", appliedOn: "06 Mar 2025", verifiedBy: "—", status: "Under Review", notes: "—", phone: "9898989896", email: "sneha@email.com", gender: "Female", category: "General", force: "Army", chest: "73", medical: "None", aadhaar: "XXXX-XXXX-6789" },
  { id: "APP-2025-007", name: "Ajay Thakur", dob: "2003-12-20", state: "HP", education: "ITI", height: "174", weight: "70", trade: "Agniveer Tech", appliedOn: "05 Mar 2025", verifiedBy: "—", status: "Under Review", notes: "—", phone: "9898989897", email: "ajay@email.com", gender: "Male", category: "OBC", force: "Army", chest: "81", medical: "None", aadhaar: "XXXX-XXXX-7890" },
  { id: "APP-2025-008", name: "Ritu Verma", dob: "2003-03-11", state: "MP", education: "12th Pass", height: "163", weight: "54", trade: "Agniveer Clerk", appliedOn: "04 Mar 2025", verifiedBy: "—", status: "Pending Docs", notes: "Missing domicile certificate.", phone: "9898989898", email: "ritu@email.com", gender: "Female", category: "General", force: "Army", chest: "74", medical: "None", aadhaar: "XXXX-XXXX-8901" },
]

const INIT_Agniveer: Agniveer[] = [
  { id: "1", AgniveerId: "AGN-2024-0101", name: "Rajveer Singh Chauhan", rank: "Sepoy", battalion: "RR-1", state: "Rajasthan", city: "Jodhpur", dob: "2003-04-12", joining: "2024-01-15", blood: "B+", phone: "9876501001", email: "rajveer@army.in", status: "active", medical: "Fit", physical: 91, weapons: 88, mental: 78, combat: 89, attendance: 96, discipline: 92, overall: 89 },
  { id: "2", AgniveerId: "AGN-2024-0102", name: "Priya Sharma", rank: "Sepoy", battalion: "RR-1", state: "Rajasthan", city: "Jaipur", dob: "2002-08-22", joining: "2024-01-15", blood: "A+", phone: "9876501003", email: "priya.sharma@army.in", status: "active", medical: "Fit", physical: 85, weapons: 72, mental: 94, combat: 80, attendance: 98, discipline: 95, overall: 87.3 },
  { id: "3", AgniveerId: "AGN-2024-0103", name: "Arjun Mehra", rank: "Lance Naik", battalion: "RR-1", state: "Punjab", city: "Amritsar", dob: "2001-11-05", joining: "2024-01-15", blood: "O+", phone: "9876501005", email: "arjun.mehra@army.in", status: "active", medical: "Fit", physical: 96, weapons: 94, mental: 88, combat: 95, attendance: 100, discipline: 97, overall: 95 },
  { id: "4", AgniveerId: "AGN-2024-0104", name: "Sunil Kumar", rank: "Sepoy", battalion: "RR-1", state: "Haryana", city: "Rohtak", dob: "2003-02-18", joining: "2024-01-15", blood: "AB+", phone: "9876501007", email: "sunil.k@army.in", status: "active", medical: "Fit (Ankle - Recovered)", physical: 68, weapons: 72, mental: 65, combat: 70, attendance: 82, discipline: 75, overall: 72 },
  { id: "5", AgniveerId: "AGN-2024-0105", name: "Kavita Rajput", rank: "Sepoy", battalion: "RR-1", state: "UP", city: "Lucknow", dob: "2002-06-30", joining: "2024-01-15", blood: "B-", phone: "9876501009", email: "kavita.r@army.in", status: "on_leave", medical: "Fit", physical: 78, weapons: 74, mental: 82, combat: 76, attendance: 88, discipline: 85, overall: 80.5 },
  { id: "6", AgniveerId: "AGN-2024-0201", name: "Vikram Nair", rank: "Sepoy", battalion: "PARA-2", state: "Kerala", city: "Thiruvananthapuram", dob: "2002-03-25", joining: "2024-02-01", blood: "A+", phone: "9876502001", email: "vikram.n@army.in", status: "active", medical: "Fit", physical: 94, weapons: 88, mental: 86, combat: 93, attendance: 97, discipline: 94, overall: 92 },
  { id: "7", AgniveerId: "AGN-2024-0202", name: "Ananya Krishnan", rank: "Sepoy", battalion: "PARA-2", state: "Tamil Nadu", city: "Chennai", dob: "2003-07-11", joining: "2024-02-01", blood: "B+", phone: "9876502003", email: "ananya.k@army.in", status: "active", medical: "Fit", physical: 80, weapons: 75, mental: 91, combat: 78, attendance: 95, discipline: 96, overall: 85.8 },
  { id: "8", AgniveerId: "AGN-2024-0203", name: "Rohit Sharma", rank: "Sepoy", battalion: "PARA-2", state: "MP", city: "Bhopal", dob: "2002-12-01", joining: "2024-02-01", blood: "O+", phone: "9876502005", email: "rohit.s@army.in", status: "active", medical: "Under Observation (Knee)", physical: 75, weapons: 69, mental: 72, combat: 71, attendance: 79, discipline: 74, overall: 73.3 },
  { id: "9", AgniveerId: "AGN-2024-0301", name: "Sourav Das", rank: "Sepoy", battalion: "BEN-3", state: "WB", city: "Kolkata", dob: "2002-01-14", joining: "2024-02-15", blood: "B+", phone: "9876503001", email: "sourav.d@army.in", status: "active", medical: "Fit", physical: 86, weapons: 80, mental: 83, combat: 85, attendance: 94, discipline: 88, overall: 86 },
  { id: "10", AgniveerId: "AGN-2024-0302", name: "Rekha Bose", rank: "Sepoy", battalion: "BEN-3", state: "WB", city: "Howrah", dob: "2003-04-20", joining: "2024-02-15", blood: "O+", phone: "9876503003", email: "rekha.b@army.in", status: "active", medical: "Fit", physical: 79, weapons: 71, mental: 90, combat: 75, attendance: 96, discipline: 94, overall: 84.2 },
  { id: "11", AgniveerId: "AGN-2024-0303", name: "Amit Ghosh", rank: "Sepoy", battalion: "BEN-3", state: "WB", city: "Durgapur", dob: "2002-09-02", joining: "2024-02-15", blood: "A+", phone: "9876503005", email: "amit.g@army.in", status: "active", medical: "Fit", physical: 72, weapons: 65, mental: 68, combat: 69, attendance: 80, discipline: 72, overall: 71 },
  { id: "12", AgniveerId: "AGN-2024-0304", name: "Ranjit Singh", rank: "Lance Naik", battalion: "BEN-3", state: "Punjab", city: "Ludhiana", dob: "2001-07-25", joining: "2024-02-15", blood: "B+", phone: "9876503007", email: "ranjit.s@army.in", status: "active", medical: "Fit", physical: 90, weapons: 92, mental: 84, combat: 91, attendance: 98, discipline: 95, overall: 91.7 },
  { id: "13", AgniveerId: "AGN-2024-0401", name: "Suresh Patil", rank: "Sepoy", battalion: "MAR-4", state: "Maharashtra", city: "Pune", dob: "2002-06-18", joining: "2024-03-01", blood: "O+", phone: "9876504001", email: "suresh.p@army.in", status: "active", medical: "Fit", physical: 83, weapons: 79, mental: 76, combat: 81, attendance: 89, discipline: 86, overall: 82.3 },
  { id: "14", AgniveerId: "AGN-2024-0402", name: "Rohini Jadhav", rank: "Sepoy", battalion: "MAR-4", state: "Maharashtra", city: "Nashik", dob: "2003-11-09", joining: "2024-03-01", blood: "A+", phone: "9876504003", email: "rohini.j@army.in", status: "active", medical: "Fit", physical: 76, weapons: 68, mental: 86, combat: 72, attendance: 91, discipline: 90, overall: 79.5 },
  { id: "15", AgniveerId: "AGN-2024-0403", name: "Santosh More", rank: "Sepoy", battalion: "MAR-4", state: "Maharashtra", city: "Aurangabad", dob: "2002-03-14", joining: "2024-03-01", blood: "B-", phone: "9876504005", email: "santosh.m@army.in", status: "active", medical: "Under Observation (Back)", physical: 70, weapons: 66, mental: 62, combat: 68, attendance: 78, discipline: 70, overall: 69 },
  { id: "16", AgniveerId: "AGN-2024-0404", name: "Vijay Deshmukh", rank: "Sepoy", battalion: "MAR-4", state: "Maharashtra", city: "Nagpur", dob: "2001-08-30", joining: "2024-03-01", blood: "A-", phone: "9876504007", email: "vijay.d@army.in", status: "active", medical: "Fit", physical: 88, weapons: 85, mental: 82, combat: 87, attendance: 95, discipline: 92, overall: 88.2 },
]

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
const STATUS_CONFIG: Record<AppStatus, { pill: string; icon: React.ReactNode }> = {
  "Under Review": { pill: "bg-sky-50 text-sky-700 border-sky-200", icon: <Clock size={11} /> },
  "Verified": { pill: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle2 size={11} /> },
  "Pending Docs": { pill: "bg-amber-50 text-amber-700 border-amber-200", icon: <AlertCircle size={11} /> },
  "Selected": { pill: "bg-[#eef3e6] text-[#4a5c2f] border-[#c5d9a0]", icon: <Star size={11} /> },
  "Rejected": { pill: "bg-rose-50 text-rose-600 border-rose-200", icon: <XCircle size={11} /> },
}
function StatusBadge({ status }: { status: AppStatus }) {
  const c = STATUS_CONFIG[status]
  return <Badge className={`gap-1 border text-xs font-medium whitespace-nowrap ${c.pill}`}>{c.icon}{status}</Badge>
}

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
  if (v >= 90) return { l: "Outstanding", c: "bg-emerald-100 text-emerald-700 border-emerald-200" }
  if (v >= 80) return { l: "Good", c: "bg-sky-100 text-sky-700 border-sky-200" }
  if (v >= 70) return { l: "Average", c: "bg-amber-100 text-amber-700 border-amber-200" }
  return { l: "Needs Improvement", c: "bg-rose-100 text-rose-600 border-rose-200" }
}

const STATES = ["Andhra Pradesh", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "HP", "Jharkhand", "Karnataka", "Kerala", "MP", "Maharashtra", "Manipur", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "UP", "Uttarakhand", "WB", "J&K", "Ladakh", "Chandigarh", "Puducherry"]
const TRADES = ["Agniveer GD", "Agniveer Tech", "Agniveer Clerk", "Agniveer Tradesman"]
const FORCES = ["Army", "Navy", "Air Force", "Coast Guard"]
const RANKS = ["Sepoy", "Lance Naik", "Naik", "Havildar"]
const BATS = ["RR-1", "PARA-2", "BEN-3", "MAR-4"]

// ═══════════════════════════════════════════════════════════════
// SECTION TOGGLE
// ═══════════════════════════════════════════════════════════════
type Section = "applications" | "Agniveer"

// ═══════════════════════════════════════════════════════════════
// APPLICATION DETAIL MODAL (Read)
// ═══════════════════════════════════════════════════════════════
function AppDetailModal({ app, onClose, onEdit, onDelete }: {
  app: Application; onClose: () => void
  onEdit: () => void; onDelete: () => void
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">
        <div className="bg-[#1a2d4a] px-5 py-4 rounded-t-xl flex items-start justify-between gap-4">
          <div>
            <div className="text-white/60 text-xs mb-1">Application Detail</div>
            <h2 className="text-lg font-bold text-white">{app.name}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="font-mono text-[11px] text-orange-300 bg-white/10 px-2 py-0.5 rounded">{app.id}</span>
              <StatusBadge status={app.status} />
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white mt-1"><X size={18} /></button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Personal */}
            <div className="rounded-lg border border-stone-200 overflow-hidden">
              <div className="bg-stone-50 border-b border-stone-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-stone-500">Personal Details</div>
              {[
                ["Full Name", app.name], ["Date of Birth", app.dob], ["Gender", app.gender],
                ["Category", app.category], ["State", app.state], ["Phone", app.phone], ["Email", app.email],
                ["Aadhaar", app.aadhaar],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                  <span className="text-xs text-stone-400">{k}</span>
                  <span className="text-xs font-medium text-stone-700 text-right max-w-[55%] truncate">{v}</span>
                </div>
              ))}
            </div>
            {/* Service */}
            <div className="rounded-lg border border-stone-200 overflow-hidden">
              <div className="bg-stone-50 border-b border-stone-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-stone-500">Service Details</div>
              {[
                ["Force", app.force], ["Trade", app.trade], ["Education", app.education],
                ["Height", `${app.height} cm`], ["Weight", `${app.weight} kg`], ["Chest", `${app.chest} cm`],
                ["Medical", app.medical], ["Applied On", app.appliedOn],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                  <span className="text-xs text-stone-400">{k}</span>
                  <span className="text-xs font-medium text-stone-700">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review info */}
          <div className="rounded-lg border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-stone-500">Review Status</div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400 w-24">Status</span>
                <StatusBadge status={app.status} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400 w-24">Verified By</span>
                <span className="text-xs font-medium text-stone-700">{app.verifiedBy}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs text-stone-400 w-24 mt-0.5">Notes</span>
                <span className="text-xs text-stone-600 flex-1">{app.notes === "—" ? "No notes added." : app.notes}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="-mx-0 -mb-0 flex flex-row gap-2 rounded-b-xl border-t bg-stone-50 p-4">
          <Button variant="outline" onClick={onClose} className="text-sm">Close</Button>
          <Button variant="outline" onClick={onEdit} className="gap-1.5 text-sm border-[#1a2d4a] text-[#1a2d4a] hover:bg-[#1a2d4a] hover:text-white">
            <Pencil size={13} /> Edit
          </Button>
          <Button onClick={onDelete} className="gap-1.5 bg-rose-600 text-white hover:bg-rose-700 text-sm">
            <Trash2 size={13} /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ═══════════════════════════════════════════════════════════════
// APPLICATION FORM MODAL (Create / Edit)
// ═══════════════════════════════════════════════════════════════
const BLANK_APP: Omit<Application, "id"> = {
  name: "", dob: "", state: "Rajasthan", education: "12th Pass", height: "", weight: "",
  trade: "Agniveer GD", appliedOn: "", verifiedBy: "—", status: "Under Review",
  notes: "—", phone: "", email: "", gender: "Male", category: "General", force: "Army",
  chest: "", medical: "None", aadhaar: "",
}

function AppFormModal({ initial, mode, onSave, onClose, adminName }: {
  initial?: Application
  mode: "create" | "edit"
  onSave: (a: Application) => void
  onClose: () => void
  adminName: string
}) {
  const [form, setForm] = useState<Omit<Application, "id">>(
    initial ? { ...initial } : { ...BLANK_APP, appliedOn: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) }
  )
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.name || !form.phone) return
    const saved: Application = {
      id: initial?.id ?? `APP-${Date.now()}`,
      ...form,
      verifiedBy: form.status === "Verified" || form.status === "Selected" || form.status === "Rejected"
        ? (form.verifiedBy === "—" ? adminName : form.verifiedBy)
        : form.verifiedBy,
    }
    onSave(saved)
  }

  const F = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-semibold text-stone-600">{label}{req && <span className="text-rose-500 ml-0.5">*</span>}</Label>
      {children}
    </div>
  )

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">
        <DialogHeader className="px-5 pt-5 pb-0">
          <DialogTitle className="flex items-center gap-2 text-base text-stone-800">
            {mode === "create" ? <Plus size={15} className="text-[#4a5c2f]" /> : <Pencil size={15} className="text-[#1a2d4a]" />}
            {mode === "create" ? "Add New Application" : `Edit Application — ${initial?.id}`}
          </DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-5">
          {/* Personal */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-3">Personal Information</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><F label="Full Name" req><Input value={form.name} onChange={e => set("name", e.target.value)} className="text-sm h-8" /></F></div>
              <F label="Date of Birth" req><Input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} className="text-sm h-8" /></F>
              <F label="Gender"><Select value={form.gender} onValueChange={v => set("gender", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{["Male", "Female", "Other"].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select></F>
              <F label="Category"><Select value={form.category} onValueChange={v => set("category", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{["General", "OBC", "SC", "ST", "EWS"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></F>
              <F label="State" req><Select value={form.state} onValueChange={v => set("state", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></F>
              <F label="Phone" req><Input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="10-digit" className="text-sm h-8" /></F>
              <F label="Email"><Input type="email" value={form.email} onChange={e => set("email", e.target.value)} className="text-sm h-8" /></F>
              <F label="Aadhaar No."><Input value={form.aadhaar} onChange={e => set("aadhaar", e.target.value)} placeholder="XXXX-XXXX-XXXX" className="text-sm h-8 font-mono" /></F>
            </div>
          </div>

          {/* Service */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-3">Service & Physical</div>
            <div className="grid grid-cols-2 gap-3">
              <F label="Force"><Select value={form.force} onValueChange={v => set("force", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{FORCES.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></F>
              <F label="Trade" req><Select value={form.trade} onValueChange={v => set("trade", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{TRADES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></F>
              <F label="Education"><Select value={form.education} onValueChange={v => set("education", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{["10th Pass", "12th Pass", "ITI", "Diploma", "Graduate"].map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent></Select></F>
              <F label="Medical Condition"><Select value={form.medical} onValueChange={v => set("medical", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{["None", "Minor - Declared", "Under Observation"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select></F>
              <F label="Height (cm)"><Input type="number" value={form.height} onChange={e => set("height", e.target.value)} className="text-sm h-8" /></F>
              <F label="Weight (kg)"><Input type="number" value={form.weight} onChange={e => set("weight", e.target.value)} className="text-sm h-8" /></F>
              <F label="Chest (cm)"><Input type="number" value={form.chest} onChange={e => set("chest", e.target.value)} className="text-sm h-8" /></F>
              <F label="Applied On"><Input type="date" value={form.appliedOn.includes("-") ? form.appliedOn : ""} onChange={e => set("appliedOn", e.target.value)} className="text-sm h-8" /></F>
            </div>
          </div>

          {/* Review */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-3">Review</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <F label="Application Status">
                  <Select value={form.status} onValueChange={v => set("status", v as AppStatus)}>
                    <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>{(Object.keys(STATUS_CONFIG) as AppStatus[]).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
              </div>
              <div className="col-span-2">
                <F label="Reviewer Notes">
                  <Textarea rows={3} value={form.notes === "—" ? "" : form.notes}
                    onChange={e => set("notes", e.target.value || "—")}
                    placeholder="Add notes, rejection reason, or comments..."
                    className="text-sm resize-none" />
                </F>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 border-t bg-stone-50 p-4 -mx-0 -mb-0 rounded-b-xl">
          <Button variant="outline" onClick={onClose} className="text-sm">Cancel</Button>
          <Button onClick={handleSave} className="gap-1.5 bg-[#4a5c2f] text-white hover:bg-[#344228] text-sm">
            <Save size={13} />{mode === "create" ? "Create Application" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ═══════════════════════════════════════════════════════════════
// DELETE CONFIRM MODAL
// ═══════════════════════════════════════════════════════════════
function DeleteConfirm({ name, id, onConfirm, onClose }: {
  name: string; id: string; onConfirm: () => void; onClose: () => void
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm gap-0 p-0">
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
              <TriangleAlert size={18} className="text-rose-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-800">Confirm Delete</div>
              <div className="text-xs text-stone-400 mt-0.5">This action cannot be undone</div>
            </div>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            Delete <strong>{name}</strong> <span className="font-mono text-xs">({id})</span>?
          </div>
        </div>
        <DialogFooter className="flex flex-row gap-2 border-t bg-stone-50 p-4 -mx-0 -mb-0 rounded-b-xl">
          <Button variant="outline" onClick={onClose} className="text-sm flex-1">Cancel</Button>
          <Button onClick={onConfirm} className="gap-1.5 bg-rose-600 text-white hover:bg-rose-700 text-sm flex-1">
            <Trash2 size={13} /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ═══════════════════════════════════════════════════════════════
// Agniveer FORM MODAL (Create / Edit)
// ═══════════════════════════════════════════════════════════════
const BLANK_Agniveer: Omit<Agniveer, "id"> = {
  AgniveerId: "", name: "", rank: "Sepoy", battalion: "RR-1", state: "", city: "",
  dob: "", joining: "", blood: "O+", phone: "", email: "",
  status: "active", medical: "Fit",
  physical: 75, weapons: 75, mental: 75, combat: 75, attendance: 90, discipline: 85, overall: 79.2,
}

function AgniveerFormModal({ initial, mode, onSave, onClose }: {
  initial?: Agniveer; mode: "create" | "edit"
  onSave: (s: Agniveer) => void; onClose: () => void
}) {
  const [form, setForm] = useState<Omit<Agniveer, "id">>(
    initial ? { ...initial } : { ...BLANK_Agniveer }
  )
  const set = (k: keyof typeof form, v: string | number) => setForm(f => ({ ...f, [k]: v }))
  const calcOverall = (f: typeof form) =>
    Math.round((f.physical + f.weapons + f.mental + f.combat + f.attendance + f.discipline) / 6 * 10) / 10

  const F = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-semibold text-stone-600">{label}{req && <span className="text-rose-500 ml-0.5">*</span>}</Label>
      {children}
    </div>
  )

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">
        <DialogHeader className="px-5 pt-5 pb-0">
          <DialogTitle className="flex items-center gap-2 text-base text-stone-800">
            {mode === "create" ? <Plus size={15} className="text-[#4a5c2f]" /> : <Pencil size={15} className="text-[#1a2d4a]" />}
            {mode === "create" ? "Enrol New Agniveer" : `Edit Agniveer — ${initial?.AgniveerId}`}
          </DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-5">
          {/* Identity */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-3">Identity</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><F label="Full Name" req><Input value={form.name} onChange={e => set("name", e.target.value)} className="text-sm h-8" /></F></div>
              <F label="Agniveer ID" req><Input value={form.AgniveerId} onChange={e => set("AgniveerId", e.target.value)} placeholder="AGN-2024-XXXX" className="text-sm h-8 font-mono" /></F>
              <F label="Rank"><Select value={form.rank} onValueChange={v => set("rank", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{RANKS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></F>
              <F label="Battalion"><Select value={form.battalion} onValueChange={v => set("battalion", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{BATS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></F>
              <F label="Status"><Select value={form.status} onValueChange={v => set("status", v as Agniveer["status"])}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{["active", "on_leave", "inactive"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></F>
              <F label="Date of Birth"><Input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} className="text-sm h-8" /></F>
              <F label="Date of Joining"><Input type="date" value={form.joining} onChange={e => set("joining", e.target.value)} className="text-sm h-8" /></F>
              <F label="State"><Input value={form.state} onChange={e => set("state", e.target.value)} className="text-sm h-8" /></F>
              <F label="City"><Input value={form.city} onChange={e => set("city", e.target.value)} className="text-sm h-8" /></F>
              <F label="Blood Group"><Select value={form.blood} onValueChange={v => set("blood", v)}><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger><SelectContent>{["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></F>
              <F label="Medical Status"><Input value={form.medical} onChange={e => set("medical", e.target.value)} className="text-sm h-8" /></F>
              <F label="Phone"><Input value={form.phone} onChange={e => set("phone", e.target.value)} className="text-sm h-8" /></F>
              <F label="Email"><Input value={form.email} onChange={e => set("email", e.target.value)} className="text-sm h-8" /></F>
            </div>
          </div>

          {/* Scores */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-3">Performance Scores (0–100)</div>
            <div className="grid grid-cols-3 gap-3">
              {(["physical", "weapons", "mental", "combat", "attendance", "discipline"] as const).map(k => (
                <F key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                  <Input type="number" min={0} max={100} value={form[k]}
                    onChange={e => {
                      const updated = { ...form, [k]: +e.target.value }
                      setForm({ ...updated, overall: calcOverall(updated) })
                    }}
                    className="text-sm h-8" />
                </F>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5">
              <span className="text-xs text-stone-500">Calculated Overall:</span>
              <span className={`text-xl font-black ${sc(form.overall)}`}>{form.overall}</span>
              <Badge className={`border text-xs ${grade(form.overall).c}`}>{grade(form.overall).l}</Badge>
              <button type="button" onClick={() => setForm(f => ({ ...f, overall: calcOverall(f) }))}
                className="ml-auto flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700">
                <RefreshCw size={11} /> Recalculate
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 border-t bg-stone-50 p-4 -mx-0 -mb-0 rounded-b-xl">
          <Button variant="outline" onClick={onClose} className="text-sm">Cancel</Button>
          <Button onClick={() => onSave({ id: initial?.id ?? String(Date.now()), ...form })}
            className="gap-1.5 bg-[#4a5c2f] text-white hover:bg-[#344228] text-sm">
            <Save size={13} />{mode === "create" ? "Enrol Agniveer" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ═══════════════════════════════════════════════════════════════
// Agniveer DETAIL MODAL (Read)
// ═══════════════════════════════════════════════════════════════
function AgniveerDetailModal({ Agniveer, onClose, onEdit, onDelete }: {
  Agniveer: Agniveer; onClose: () => void; onEdit: () => void; onDelete: () => void
}) {
  const scores = [
    { label: "Physical", key: "physical" as const, icon: <Activity size={12} /> },
    { label: "Weapons", key: "weapons" as const, icon: <Shield size={12} /> },
    { label: "Mental", key: "mental" as const, icon: <Activity size={12} /> },
    { label: "Combat", key: "combat" as const, icon: <Shield size={12} /> },
    { label: "Attendance", key: "attendance" as const, icon: <CalendarDays size={12} /> },
    { label: "Discipline", key: "discipline" as const, icon: <CheckCircle2 size={12} /> },
  ]
  const globalRank = [...INIT_Agniveer].sort((a, b) => b.overall - a.overall).findIndex(s => s.id === Agniveer.id) + 1

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">
        <div className="bg-[#1a2d4a] px-5 py-4 rounded-t-xl flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-2xl">👤</div>
            <div>
              <h2 className="text-lg font-bold text-white">{Agniveer.name}</h2>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <span className="font-mono text-[10px] text-orange-300 bg-white/10 px-1.5 py-0.5 rounded">{Agniveer.AgniveerId}</span>
                <span className="text-[10px] text-white/70 bg-white/10 px-1.5 py-0.5 rounded">{Agniveer.rank}</span>
                <span className="text-[10px] text-white/70 bg-white/10 px-1.5 py-0.5 rounded">{Agniveer.battalion}</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-3xl font-black ${Agniveer.overall >= 90 ? "text-emerald-400" : Agniveer.overall >= 80 ? "text-amber-300" : "text-orange-400"}`}>{Agniveer.overall}</div>
            <div className="text-[10px] text-white/50">Overall · Global #{globalRank}</div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {scores.map(s => (
              <div key={s.key} className="rounded-lg border border-stone-100 bg-stone-50 p-3">
                <div className="flex items-center gap-1 text-[10px] text-stone-400 mb-1">{s.icon}{s.label}</div>
                <div className={`text-xl font-black ${sc(Agniveer[s.key])}`}>{Agniveer[s.key]}</div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-200">
                  <div className={`h-full rounded-full ${bc(Agniveer[s.key])}`} style={{ width: `${Agniveer[s.key]}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-stone-200 overflow-hidden">
              <div className="bg-stone-50 border-b border-stone-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-stone-500">Personal</div>
              {[["DOB", Agniveer.dob], ["State", Agniveer.state], ["City", Agniveer.city], ["Blood", Agniveer.blood], ["Phone", Agniveer.phone], ["Email", Agniveer.email]].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                  <span className="text-xs text-stone-400">{k}</span>
                  <span className="text-xs font-medium text-stone-700 truncate max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-stone-200 overflow-hidden">
              <div className="bg-stone-50 border-b border-stone-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-stone-500">Service</div>
              {[["Rank", Agniveer.rank], ["Battalion", Agniveer.battalion], ["Joined", Agniveer.joining], ["Medical", Agniveer.medical], ["Status", Agniveer.status]].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2 border-b border-stone-50 last:border-0">
                  <span className="text-xs text-stone-400">{k}</span>
                  <span className="text-xs font-medium text-stone-700">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 border-t bg-stone-50 p-4 -mx-0 -mb-0 rounded-b-xl">
          <Button variant="outline" onClick={onClose} className="text-sm">Close</Button>
          <Button variant="outline" onClick={onEdit} className="gap-1.5 text-sm border-[#1a2d4a] text-[#1a2d4a] hover:bg-[#1a2d4a] hover:text-white"><Pencil size={13} /> Edit</Button>
          <Button onClick={onDelete} className="gap-1.5 bg-rose-600 text-white hover:bg-rose-700 text-sm"><Trash2 size={13} /> Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ═══════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════
function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-xl border px-4 py-3 shadow-lg text-sm font-medium ${type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-700"
      }`}>
      {type === "success" ? <CheckCircle2 size={15} /> : <TriangleAlert size={15} />}
      {msg}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE ROOT
// ═══════════════════════════════════════════════════════════════
export default function RecruitmentPage() {
  const adminName = "Maj. Ankit Verma"

  // ── Applications state ──
  const [apps, setApps] = useState<Application[]>(INIT_APPS)
  const [activeTab, setActiveTab] = useState<FilterTab>("All")
  const [appSearch, setAppSearch] = useState("")
  const [viewApp, setViewApp] = useState<Application | null>(null)
  const [editApp, setEditApp] = useState<Application | null>(null)
  const [createApp, setCreateApp] = useState(false)
  const [deleteApp, setDeleteApp] = useState<Application | null>(null)
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set())

  // ── Agniveer state ──
  const [Agniveer, setAgniveer] = useState<Agniveer[]>(INIT_Agniveer)
  const [solSearch, setSolSearch] = useState("")
  const [solFilter, setSolFilter] = useState("all")
  const [viewSol, setViewSol] = useState<Agniveer | null>(null)
  const [editSol, setEditSol] = useState<Agniveer | null>(null)
  const [createSol, setCreateSol] = useState(false)
  const [deleteSol, setDeleteSol] = useState<Agniveer | null>(null)

  // ── Section ──
  const [section, setSection] = useState<Section>("applications")

  // ── Toast ──
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null)
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000)
  }

  // ── CRUD: Applications ──
  const saveApp = (updated: Application) => {
    const exists = apps.find(a => a.id === updated.id)
    if (exists) {
      setApps(prev => prev.map(a => a.id === updated.id ? updated : a))
      showToast("Application updated successfully.")
    } else {
      setApps(prev => [updated, ...prev])
      showToast("Application created successfully.")
    }
    setEditApp(null); setCreateApp(false); setViewApp(null)
  }
  const confirmDeleteApp = () => {
    if (!deleteApp) return
    setApps(prev => prev.filter(a => a.id !== deleteApp.id))
    showToast(`Deleted: ${deleteApp.name}`)
    setDeleteApp(null); setViewApp(null)
  }
  const bulkDelete = () => {
    setApps(prev => prev.filter(a => !selectedApps.has(a.id)))
    showToast(`${selectedApps.size} application(s) deleted.`)
    setSelectedApps(new Set())
  }
  const bulkStatus = (status: AppStatus) => {
    setApps(prev => prev.map(a => selectedApps.has(a.id) ? { ...a, status, verifiedBy: adminName } : a))
    showToast(`${selectedApps.size} application(s) marked as ${status}.`)
    setSelectedApps(new Set())
  }
  const toggleSelect = (id: string) => setSelectedApps(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next
  })
  const toggleAll = (ids: string[]) => {
    if (ids.every(id => selectedApps.has(id))) setSelectedApps(new Set())
    else setSelectedApps(new Set(ids))
  }

  // ── CRUD: Agniveer ──
  const saveAgniveer = (updated: Agniveer) => {
    const exists = Agniveer.find(s => s.id === updated.id)
    if (exists) {
      setAgniveer(prev => prev.map(s => s.id === updated.id ? updated : s))
      showToast("Agniveer record updated.")
    } else {
      setAgniveer(prev => [updated, ...prev])
      showToast("Agniveer enrolled successfully.")
    }
    setEditSol(null); setCreateSol(false); setViewSol(null)
  }
  const confirmDeleteSol = () => {
    if (!deleteSol) return
    setAgniveer(prev => prev.filter(s => s.id !== deleteSol.id))
    showToast(`Deleted: ${deleteSol.name}`)
    setDeleteSol(null); setViewSol(null)
  }

  // ── Filtered views ──
  const FILTER_TABS: FilterTab[] = ["All", "Under Review", "Verified", "Pending Docs", "Selected", "Rejected"]
  const countFor = (tab: FilterTab) => tab === "All" ? apps.length : apps.filter(a => a.status === tab).length
  const filteredApps = apps.filter(a => {
    const matchTab = activeTab === "All" || a.status === activeTab
    const q = appSearch.toLowerCase()
    const matchQ = !q || [a.name, a.id, a.state, a.trade].some(v => v.toLowerCase().includes(q))
    return matchTab && matchQ
  })

  const filteredSols = Agniveer.filter(s => {
    const q = solSearch.toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.AgniveerId.toLowerCase().includes(q) || s.battalion.toLowerCase().includes(q)
    const matchF = solFilter === "all" || (solFilter === "active" && s.status === "active") || (solFilter === "leave" && s.status === "on_leave") || (solFilter === "good" && s.overall >= 85) || (solFilter === "attn" && s.overall < 75)
    return matchQ && matchF
  })

  const TAB_ACTIVE: Record<FilterTab, string> = {
    "All": "bg-stone-800 text-white", "Under Review": "bg-sky-600 text-white",
    "Verified": "bg-emerald-600 text-white", "Pending Docs": "bg-amber-500 text-white",
    "Selected": "bg-[#4a5c2f] text-white", "Rejected": "bg-rose-600 text-white",
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      {/* Modals */}
      {viewApp && <AppDetailModal app={viewApp} onClose={() => setViewApp(null)} onEdit={() => { setEditApp(viewApp); setViewApp(null) }} onDelete={() => setDeleteApp(viewApp)} />}
      {(editApp || createApp) && <AppFormModal initial={editApp ?? undefined} mode={editApp ? "edit" : "create"} onSave={saveApp} onClose={() => { setEditApp(null); setCreateApp(false) }} adminName={adminName} />}
      {deleteApp && <DeleteConfirm name={deleteApp.name} id={deleteApp.id} onConfirm={confirmDeleteApp} onClose={() => setDeleteApp(null)} />}

      {viewSol && <AgniveerDetailModal Agniveer={viewSol} onClose={() => setViewSol(null)} onEdit={() => { setEditSol(viewSol); setViewSol(null) }} onDelete={() => setDeleteSol(viewSol)} />}
      {(editSol || createSol) && <AgniveerFormModal initial={editSol ?? undefined} mode={editSol ? "edit" : "create"} onSave={saveAgniveer} onClose={() => { setEditSol(null); setCreateSol(false) }} />}
      {deleteSol && <DeleteConfirm name={deleteSol.name} id={deleteSol.AgniveerId} onConfirm={confirmDeleteSol} onClose={() => setDeleteSol(null)} />}

      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              <FileText size={20} className="text-[#4a5c2f]" />
              Recruitment & Agniveer
            </h1>
            <p className="mt-0.5 text-xs text-stone-500">Full CRUD — Create, Read, Update, Delete applications and Agniveer records</p>
          </div>
          {/* Section toggle */}
          <div className="flex items-center gap-1 rounded-lg bg-stone-100 p-1">
            <button onClick={() => setSection("applications")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${section === "applications" ? "bg-white text-stone-800 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}>
              <FileText size={12} /> Applications ({apps.length})
            </button>
            <button onClick={() => setSection("Agniveer")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${section === "Agniveer" ? "bg-white text-stone-800 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}>
              <Users size={12} /> Agniveer ({Agniveer.length})
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-4 px-4 py-5 sm:px-6 lg:px-8">

        {/* ═══════════ APPLICATIONS ═══════════ */}
        {section === "applications" && (<>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "Total", value: apps.length, color: "text-stone-700", icon: <Users size={14} /> },
              { label: "Under Review", value: apps.filter(a => a.status === "Under Review").length, color: "text-sky-600", icon: <Clock size={14} /> },
              { label: "Verified", value: apps.filter(a => a.status === "Verified").length, color: "text-emerald-600", icon: <CheckCircle2 size={14} /> },
              { label: "Selected", value: apps.filter(a => a.status === "Selected").length, color: "text-[#4a5c2f]", icon: <Star size={14} /> },
              { label: "Rejected", value: apps.filter(a => a.status === "Rejected").length, color: "text-rose-500", icon: <XCircle size={14} /> },
            ].map(s => (
              <Card key={s.label} className="border-stone-200 bg-white shadow-sm">
                <CardContent className="flex items-center gap-3 px-4 pt-3.5 pb-3">
                  <div className={s.color}>{s.icon}</div>
                  <div><p className="text-xs text-stone-400">{s.label}</p><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters + Search + Add */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {FILTER_TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === tab ? TAB_ACTIVE[tab] : "border-stone-200 bg-white text-stone-500 hover:border-stone-300"
                    }`}>
                  {tab} ({countFor(tab)})
                </button>
              ))}
            </div>
            <div className="flex shrink-0 gap-2">
              <div className="relative">
                <Search size={13} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400" />
                <Input placeholder="Search name, ID, state…" value={appSearch} onChange={e => setAppSearch(e.target.value)}
                  className="h-8 w-48 border-stone-200 bg-white pl-8 text-xs" />
              </div>
              <Button onClick={() => setCreateApp(true)} className="h-8 gap-1.5 bg-[#4a5c2f] text-xs text-white hover:bg-[#344228] shrink-0">
                <Plus size={13} /> Add Application
              </Button>
            </div>
          </div>

          {/* Bulk action bar */}
          {selectedApps.size > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5">
              <span className="text-xs font-semibold text-sky-700">{selectedApps.size} selected</span>
              <div className="flex flex-wrap gap-1.5 ml-2">
                {(["Verified", "Selected", "Rejected", "Pending Docs"] as AppStatus[]).map(s => (
                  <button key={s} onClick={() => bulkStatus(s)}
                    className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-all ${STATUS_CONFIG[s].pill}`}>
                    Mark {s}
                  </button>
                ))}
                <button onClick={bulkDelete} className="rounded-md border border-rose-200 bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-rose-600">
                  Delete All
                </button>
              </div>
              <button onClick={() => setSelectedApps(new Set())} className="ml-auto text-sky-500 hover:text-sky-700"><X size={14} /></button>
            </div>
          )}

          {/* Applications table */}
          <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    <th className="px-3 py-2.5 w-8">
                      <input type="checkbox"
                        checked={filteredApps.length > 0 && filteredApps.every(a => selectedApps.has(a.id))}
                        onChange={() => toggleAll(filteredApps.map(a => a.id))}
                        className="rounded border-stone-300" />
                    </th>
                    {["App. ID", "Name", "State", "Education", "Height", "Weight", "Trade", "Applied", "Verified By", "Status", "Notes", "Actions"].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {filteredApps.length === 0 ? (
                    <tr><td colSpan={13} className="py-12 text-center text-sm text-stone-400">No applications match your filter.</td></tr>
                  ) : filteredApps.map(app => (
                    <tr key={app.id} className={`transition-colors ${selectedApps.has(app.id) ? "bg-sky-50"
                        : app.status === "Rejected" ? "bg-rose-50/20 hover:bg-rose-50/40"
                          : app.status === "Selected" ? "bg-emerald-50/20 hover:bg-emerald-50/40"
                            : "hover:bg-stone-50"
                      }`}>
                      <td className="px-3 py-2.5">
                        <input type="checkbox" checked={selectedApps.has(app.id)} onChange={() => toggleSelect(app.id)}
                          className="rounded border-stone-300" />
                      </td>
                      <td className="px-3 py-2.5 font-mono text-xs text-stone-400 whitespace-nowrap">{app.id}</td>
                      <td className="px-3 py-2.5 font-semibold text-stone-800 whitespace-nowrap">{app.name}</td>
                      <td className="px-3 py-2.5 text-stone-600 text-xs">{app.state}</td>
                      <td className="px-3 py-2.5 text-xs text-stone-600 whitespace-nowrap">{app.education}</td>
                      <td className="px-3 py-2.5 text-xs text-stone-600">{app.height} cm</td>
                      <td className="px-3 py-2.5 text-xs text-stone-600">{app.weight} kg</td>
                      <td className="px-3 py-2.5 text-xs text-stone-600 whitespace-nowrap">{app.trade}</td>
                      <td className="px-3 py-2.5 text-xs text-stone-400 whitespace-nowrap">{app.appliedOn}</td>
                      <td className="px-3 py-2.5 text-xs text-stone-500 whitespace-nowrap">
                        {app.verifiedBy === "—" ? <span className="text-stone-300">—</span> : app.verifiedBy}
                      </td>
                      <td className="px-3 py-2.5"><StatusBadge status={app.status} /></td>
                      <td className="px-3 py-2.5 max-w-[120px]">
                        <span className="line-clamp-1 text-xs text-stone-400">
                          {app.notes === "—" ? <span className="text-stone-300">—</span> : app.notes}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setViewApp(app)} title="View"
                            className="flex h-6 w-6 items-center justify-center rounded border border-stone-200 bg-white text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors">
                            <Eye size={11} />
                          </button>
                          <button onClick={() => setEditApp(app)} title="Edit"
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1a2d4a]/20 bg-white text-[#1a2d4a] hover:bg-[#1a2d4a] hover:text-white transition-colors">
                            <Pencil size={11} />
                          </button>
                          <button onClick={() => setDeleteApp(app)} title="Delete"
                            className="flex h-6 w-6 items-center justify-center rounded border border-rose-200 bg-white text-rose-500 hover:bg-rose-600 hover:text-white transition-colors">
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-stone-100 px-4 py-2.5 bg-stone-50/50">
              <p className="text-xs text-stone-400">{filteredApps.length} of {apps.length} applications</p>
              <p className="text-xs text-stone-400">👁 View · ✏️ Edit · 🗑 Delete · ☑ Select for bulk actions</p>
            </div>
          </Card>
        </>)}

        {/* ═══════════ Agniveer ═══════════ */}
        {section === "Agniveer" && (<>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total Agniveer", value: Agniveer.length, color: "text-[#1a2d4a]" },
              { label: "Active", value: Agniveer.filter(s => s.status === "active").length, color: "text-emerald-600" },
              { label: "On Leave", value: Agniveer.filter(s => s.status === "on_leave").length, color: "text-amber-600" },
              { label: "Avg. Score", value: Math.round(Agniveer.reduce((a, s) => a + s.overall, 0) / Agniveer.length * 10) / 10, color: "text-[#4a5c2f]" },
            ].map(s => (
              <Card key={s.label} className="border-stone-200 bg-white shadow-sm">
                <CardContent className="px-4 pt-3.5 pb-3">
                  <p className="text-xs text-stone-400">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search + Filters + Add */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={13} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-400" />
              <Input placeholder="Search name, ID, battalion…" value={solSearch} onChange={e => setSolSearch(e.target.value)}
                className="h-8 pl-8 text-xs border-stone-200 bg-white" />
            </div>
            {[{ v: "all", l: "All" }, { v: "active", l: "Active" }, { v: "leave", l: "On Leave" }, { v: "good", l: "Score ≥ 85" }, { v: "attn", l: "Needs Attention" }].map(f => (
              <button key={f.v} onClick={() => setSolFilter(f.v)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${solFilter === f.v ? "border-[#1a2d4a] bg-[#1a2d4a] text-white" : "border-stone-200 bg-white text-stone-500 hover:border-stone-300"
                  }`}>{f.l}</button>
            ))}
            <span className="text-xs text-stone-400">{filteredSols.length} Agniveer</span>
            <Button onClick={() => setCreateSol(true)} className="h-8 gap-1.5 bg-[#4a5c2f] text-xs text-white hover:bg-[#344228] ml-auto shrink-0">
              <Plus size={13} /> Enrol Agniveer
            </Button>
          </div>

          {/* Agniveer table */}
          <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {["Agniveer ID", "Name", "Rank", "Battalion", "Physical", "Weapons", "Mental", "Combat", "Attend.", "Discip.", "Overall", "Grade", "Status", "Actions"].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {filteredSols.length === 0 ? (
                    <tr><td colSpan={14} className="py-12 text-center text-sm text-stone-400">No Agniveer match your filter.</td></tr>
                  ) : filteredSols.map(s => (
                    <tr key={s.id} className={`transition-colors hover:bg-[#f0f5e8] ${s.overall >= 90 ? "bg-emerald-50/20" : s.overall < 70 ? "bg-rose-50/20" : ""}`}>
                      <td className="px-3 py-2.5 font-mono text-xs text-stone-400 whitespace-nowrap">{s.AgniveerId}</td>
                      <td className="px-3 py-2.5 font-semibold text-stone-800 whitespace-nowrap">{s.name}</td>
                      <td className="px-3 py-2.5 text-xs text-stone-500">{s.rank}</td>
                      <td className="px-3 py-2.5">
                        <Badge className="border border-stone-200 bg-stone-50 font-mono text-[10px] text-stone-600">{s.battalion}</Badge>
                      </td>
                      {(["physical", "weapons", "mental", "combat", "attendance", "discipline"] as const).map(k => (
                        <td key={k} className="px-3 py-2.5">
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-10 overflow-hidden rounded-full bg-stone-100">
                              <div className={`h-full rounded-full ${bc(s[k])}`} style={{ width: `${s[k]}%` }} />
                            </div>
                            <span className={`text-xs font-bold ${sc(s[k])}`}>{s[k]}</span>
                          </div>
                        </td>
                      ))}
                      <td className="px-3 py-2.5"><span className={`text-base font-black ${sc(s.overall)}`}>{s.overall}</span></td>
                      <td className="px-3 py-2.5"><Badge className={`border text-xs ${grade(s.overall).c}`}>{grade(s.overall).l}</Badge></td>
                      <td className="px-3 py-2.5">
                        <Badge className={`border text-xs ${s.status === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : s.status === "on_leave" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-stone-200 bg-stone-50 text-stone-500"}`}>
                          {s.status === "active" ? "Active" : s.status === "on_leave" ? "On Leave" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setViewSol(s)} title="View"
                            className="flex h-6 w-6 items-center justify-center rounded border border-stone-200 bg-white text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors">
                            <Eye size={11} />
                          </button>
                          <button onClick={() => setEditSol(s)} title="Edit"
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1a2d4a]/20 bg-white text-[#1a2d4a] hover:bg-[#1a2d4a] hover:text-white transition-colors">
                            <Pencil size={11} />
                          </button>
                          <button onClick={() => setDeleteSol(s)} title="Delete"
                            className="flex h-6 w-6 items-center justify-center rounded border border-rose-200 bg-white text-rose-500 hover:bg-rose-600 hover:text-white transition-colors">
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-stone-100 px-4 py-2.5 bg-stone-50/50">
              <p className="text-xs text-stone-400">{filteredSols.length} of {Agniveer.length} Agniveer</p>
              <p className="text-xs text-stone-400">👁 View · ✏️ Edit · 🗑 Delete</p>
            </div>
          </Card>
        </>)}

      </div>
    </div>
  )
}