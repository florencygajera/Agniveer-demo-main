"use client"

import React, { useState } from "react"
import {
  AlertCircle,
  ShieldHalf,
  Download,
  Printer,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdmitCardSection() {
  const [downloaded, setDownloaded] = useState(false)

  return (
    <div className="space-y-5 pb-10">
      <div className="border-b bg-background p-2 px-4">
        <h1 className="text-lg font-bold text-stone-900">
          Admit Card / Hall Ticket
        </h1>
        <p className="text-xs text-stone-400">
          Your examination hall ticket for Agnipath 2025
        </p>
      </div>

      {/* Notice */}
      <div className="mx-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-2 px-4 py-3 text-sm text-amber-800">
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
      <div className="mx-4 overflow-hidden rounded-xl border-2 border-[#1a2d4a] shadow-lg">
        {/* Top stripe */}
        <div className="h-2 bg-linear-to-r from-[#c8601a] via-[#ffffff] to-[#046a38]" />

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
        <div className="h-2 bg-linear-to-r from-[#046a38] via-[#ffffff] to-[#c8601a]" />
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
