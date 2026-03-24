"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AWARD_RECORDS } from "@/lib/admin/events-awards-data"
import { Award, CalendarDays, ChevronRight, Users } from "lucide-react"

export default function AwardsPage() {
  const totalAwards = AWARD_RECORDS.length
  const totalAwardWins = AWARD_RECORDS.reduce(
    (sum, award) => sum + award.winners.length,
    0
  )

  const [selectedAward, setSelectedAward] = useState<typeof AWARD_RECORDS[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Awards
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            All available awards and winners for each award.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <Award className="text-violet-600" size={16} />
              <div>
                <p className="text-xs text-stone-500">Total Awards</p>
                <p className="text-2xl font-bold text-violet-600">
                  {totalAwards}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <Users className="text-emerald-600" size={16} />
              <div>
                <p className="text-xs text-stone-500">Total Award Winners</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {totalAwardWins}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {AWARD_RECORDS.map((award) => (
            <Dialog key={award.id} open={modalOpen && selectedAward?.id === award.id} onOpenChange={(open) => {
              if (open) {
                setSelectedAward(award)
                setModalOpen(true)
              } else {
                setModalOpen(false)
              }
            }}>
              <DialogTrigger asChild>
                <Card className="border-stone-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base text-stone-900">
                          {award.title}
                        </CardTitle>
                        <p className="mt-1 text-xs text-stone-500">
                          {award.description}
                        </p>
                      </div>
                      <Badge className="border border-stone-200 bg-stone-50 text-stone-700">
                        {award.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3 text-sm text-stone-600">
                      <span>{award.winners.length} winner records</span>
                      <span className="ml-auto flex items-center gap-1 text-xs font-medium text-[#1a2d4a]">
                        View awards <ChevronRight size={14} />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                {selectedAward && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-xl">{selectedAward.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-stone-600">{selectedAward.description}</p>
                      <div className="rounded-lg border border-stone-200 p-4">
                        <h4 className="font-semibold mb-2">Winners</h4>
                        <div className="space-y-2">
                          {selectedAward.winners.map((winner, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span>{winner.candidateName} ({winner.candidateId})</span>
                              <span className="text-stone-500">{winner.awardedOn}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  )
}
