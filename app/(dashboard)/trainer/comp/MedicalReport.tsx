// ── MEDICAL REPORT DIALOG ─────────────────────────────────────────────────────
function MedicalReportDialog({ report, open, onOpenChange }: {
  report: typeof INIT_RECORDS[0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" 
    !max-w-none
    w-[95vw]
    sm:w-[90vw]
    md:w-[82vw]
    lg:w-[72vw]
    xl:w-[64vw]
    2xl:w-[58vw]
    h-auto
    p-0
    overflow-hidden
    rounded-2xl
    border-stone-200
    shadow-2xl
    bg-white
  ">
        {/* Header */}
        <DialogHeader className="px-8 py-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                style={{ backgroundColor: "#fff0eb" }}
              >
                <FileText size={20} style={{ color: ACTIVE_BG }} />
              </div>
              <div>
                <DialogTitle className="text-xl font-black text-stone-900 tracking-tight">
                  Medical Report
                </DialogTitle>
                <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5">
                  {report.id} &nbsp;·&nbsp; {report.date}
                </p>
              </div>
            </div>
            <Badge
              className={`border font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 shrink-0 mt-1 ${statusStyle(report.status)
                }`}
            >
              {report.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[80vh] px-8 py-6 space-y-7">
          {/* Patient Info */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">
              Patient Information
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoField label="Agniveer Name" value={report.soldierName} />
              <InfoField label="Service ID" value={report.soldierId} mono />
              <InfoField label="Height" value={safeVal(report.height)} />
              <InfoField
                label="Weight"
                value={report.weight && report.weight !== "—"
                  ? `${report.weight} kg`
                  : "—"}
              />
            </div>
          </section>

          {/* Vitals */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">
              Vitals & Assessment
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoField
                label="Blood Pressure"
                value={safeVal(report.bp)}
                mono
              />
              <InfoField
                label="Heart Rate"
                value={report.hr && report.hr !== "—"
                  ? `${report.hr} bpm`
                  : "—"}
                mono
              />
              <InfoField
                label="Eye Sight"
                value={safeVal(report.eyeSight)}
                mono
              />
              <InfoField
                label="LASIK Status"
                value={safeVal(report.lasikReport)}
              />
            </div>
          </section>

          {/* Hospitalization */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">
              Hospitalization & Treatment
            </p>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-stone-200 bg-stone-50 border-b border-stone-200">
                {[
                  {
                    label: "Hospital Location",
                    value: safeVal(report.hospitalLocation),
                  },
                  { label: "Admit Date", value: safeVal(report.admitDate) },
                  {
                    label: "Discharge Date",
                    value: safeVal(report.dischargeDate),
                  },
                ].map((fi) => (
                  <div key={fi.label} className="px-5 py-4">
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-1.5">
                      {fi.label}
                    </div>
                    <div className="text-sm font-semibold text-stone-800">
                      {fi.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white space-y-5">
                <div>
                  <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">
                    Diagnosis
                  </div>
                  <div className="text-sm font-semibold text-rose-900 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3">
                    {report.diagnosis}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">
                      Treatment Given
                    </div>
                    <div className="text-sm text-stone-700 leading-relaxed">
                      {safeVal(report.treatment)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">
                      Prescriptions
                    </div>
                    <div className="text-sm text-stone-700 leading-relaxed">
                      {safeVal(report.prescriptions)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">
              Clinical Notes
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 text-sm text-stone-700 leading-relaxed whitespace-pre-wrap min-h-[60px]">
              {report.notes || "No additional notes recorded."}
            </div>
          </section>

          {/* Follow-up + Doctor */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-100 pt-6">
            <div className="border border-stone-200 rounded-xl px-5 py-4 bg-white">
              <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">
                Scheduled Follow-up
              </div>
              <div className="text-sm font-bold text-stone-800">
                {safeVal(report.followup)}
              </div>
            </div>
            <div className="border border-stone-200 rounded-xl px-5 py-4 bg-white flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: SIDEBAR_BG }}
              >
                <Stethoscope size={16} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-1">
                  Attending Physician
                </div>
                <div className="text-sm font-black text-stone-900">
                  {doctorDisplayName(report.doctor)}
                </div>
                <div className="text-[11px] font-semibold text-stone-400">
                  {report.doctorDesignation || "Medical Officer"}
                </div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}