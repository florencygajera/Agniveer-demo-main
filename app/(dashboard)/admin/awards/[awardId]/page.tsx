"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AWARD_RECORDS, CANDIDATE_PROFILES, EVENT_RECORDS } from "@/lib/admin/events-awards-data"
import { Award, CalendarDays, Trophy, X } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function AwardDetailPage({
  params,
}: {
  params: { awardId: string }
}) {
  const award = AWARD_RECORDS.find((item) => item.id === params.awardId)
  if (!award) notFound()

  const [selectedWinner, setSelectedWinner] = useState<typeof award.winners[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleViewWinner = (winner: typeof award.winners[0]) => {
    setSelectedWinner(winner)
    setModalOpen(true)
  }

  // Get profile for selected winner
  const profile = selectedWinner ? CANDIDATE_PROFILES.find(p => p.candidateId === selectedWinner.candidateId) : null
  
  // Get related event
  const relatedEvent = selectedWinner?.relatedEventId 
    ? EVENT_RECORDS.find(e => e.id === selectedWinner.relatedEventId)
    : null
  
  // Get all awards for this candidate
  const allAwardsForCandidate = selectedWinner ? AWARD_RECORDS.flatMap(awardItem =>
    awardItem.winners
      .filter(w => w.candidateId === selectedWinner.candidateId)
      .map(w => ({
        awardId: awardItem.id,
        awardTitle: awardItem.title,
        awardedOn: w.awardedOn,
        awardedBy: w.awardedBy,
        citation: w.citation,
      }))
  ).sort((a, b) => b.awardedOn.localeCompare(a.awardedOn)) : []

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 text-sm text-stone-500">
          <Link href="/admin/awards" className="text-[#1a2d4a] hover:underline">
            Awards
          </Link>{" "}
          / {award.title}
        </div>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-stone-900">
                  {award.title}
                </CardTitle>
                <p className="mt-1 text-sm text-stone-600">{award.description}</p>
              </div>
              <Badge className="border border-stone-200 bg-stone-50 text-stone-700">
                {award.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {[
                      "Candidate ID",
                      "Candidate Name",
                      "Battalion",
                      "Awarded On",
                      "Awarded By",
                      "Description/Citation",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left text-xs font-semibold tracking-wide text-stone-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {award.winners.map((winner) => (
                    <tr key={`${winner.candidateId}-${winner.awardedOn}`}>
                      <td className="px-3 py-2 font-mono text-xs text-stone-500">
                        {winner.candidateId}
                      </td>
                      <td className="px-3 py-2 font-medium text-stone-900">
                        {winner.candidateName}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {winner.battalion}
                      </td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1 text-stone-700">
                          <CalendarDays size={14} />
                          {winner.awardedOn}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-stone-700">
                        {winner.awardedBy}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {winner.citation}
                      </td>
                      <td className="px-3 py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewWinner(winner)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#1a2d4a] hover:underline h-auto p-0"
                        >
                          <Award size={14} />
                          View winner details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Winner Detail Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">
            {selectedWinner && (
              <>
                <div className="bg-violet-600 px-5 py-4 text-white rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        <Award size={20} /> Winner Details
                      </h2>
                      <p className="text-white/70 text-sm mt-1">{award.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-white">{selectedWinner.candidateName}</div>
                      <div className="text-[10px] text-white/60">{selectedWinner.candidateId}</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Award Information */}
                  <div className="rounded-lg border border-violet-200 bg-violet-50 p-4">
                    <p className="mb-3 text-xs font-semibold tracking-wide text-violet-700 uppercase">Award Information</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-stone-500">Awarded On</p>
                        <p className="font-medium text-stone-900 flex items-center gap-1">
                          <CalendarDays size={14} /> {selectedWinner.awardedOn}
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500">Awarded By</p>
                        <p className="font-medium text-stone-900">{selectedWinner.awardedBy}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-violet-200">
                      <p className="text-stone-500 text-xs">Citation</p>
                      <p className="text-sm text-stone-700 italic">"{selectedWinner.citation}"</p>
                    </div>
                    {relatedEvent && (
                      <div className="mt-3 pt-3 border-t border-violet-200">
                        <p className="text-stone-500 text-xs">Related Event</p>
                        <p className="text-sm font-medium text-stone-900">{relatedEvent.title}</p>
                        <p className="text-xs text-stone-500">{relatedEvent.date} | {relatedEvent.location}</p>
                      </div>
                    )}
                  </div>

                  {/* Person Details */}
                  <div className="rounded-lg border border-stone-200 p-4">
                    <p className="mb-3 text-xs font-semibold tracking-wide text-stone-500 uppercase">Person Details</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-stone-500">Battalion</p>
                        <p className="font-medium text-stone-900">{selectedWinner.battalion}</p>
                      </div>
                      {profile && (
                        <>
                          <div>
                            <p className="text-stone-500">Rank</p>
                            <p className="font-medium text-stone-900">{profile.rank}</p>
                          </div>
                          <div>
                            <p className="text-stone-500">State</p>
                            <p className="font-medium text-stone-900">{profile.state}</p>
                          </div>
                          <div>
                            <p className="text-stone-500">Joined On</p>
                            <p className="font-medium text-stone-900">{profile.joinedOn}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-stone-500">Specialization</p>
                            <p className="font-medium text-stone-900">{profile.specialization}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Full Award History */}
                  {allAwardsForCandidate.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <p className="mb-3 text-xs font-semibold tracking-wide text-amber-700 uppercase">Full Award History</p>
                      <div className="space-y-2">
                        {allAwardsForCandidate.map((awardItem, idx) => (
                          <div key={idx} className="rounded-md border border-amber-200 bg-white p-3">
                            <p className="flex items-center gap-1 text-sm font-semibold text-stone-900">
                              <Trophy size={14} className="text-amber-600" />
                              {awardItem.awardTitle}
                            </p>
                            <p className="mt-1 text-xs text-stone-600">
                              Awarded: {awardItem.awardedOn} | By: {awardItem.awardedBy}
                            </p>
                            <p className="mt-1 text-xs text-stone-500">{awardItem.citation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button onClick={() => setModalOpen(false)} className="w-full">
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
