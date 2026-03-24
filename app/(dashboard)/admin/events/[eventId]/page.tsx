"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { EVENT_RECORDS, CANDIDATE_PROFILES, AWARD_RECORDS } from "@/lib/admin/events-awards-data"
import { Medal, Trophy, Users, CalendarDays, X } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string }
}) {
  const event = EVENT_RECORDS.find((item) => item.id === params.eventId)
  if (!event) notFound()

  const [selectedParticipant, setSelectedParticipant] = useState<typeof event.participants[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const orderedParticipants = [...event.participants].sort(
    (a, b) => a.position - b.position
  )

  const handleViewDetails = (participant: typeof event.participants[0]) => {
    setSelectedParticipant(participant)
    setModalOpen(true)
  }

  // Get profile for selected participant
  const profile = selectedParticipant ? CANDIDATE_PROFILES.find(p => p.candidateId === selectedParticipant.candidateId) : null
  
  // Get award history for selected participant
  const awardHistory = selectedParticipant ? AWARD_RECORDS.flatMap(award =>
    award.winners
      .filter(w => w.candidateId === selectedParticipant.candidateId)
      .map(w => ({
        awardId: award.id,
        awardTitle: award.title,
        awardedOn: w.awardedOn,
        citation: w.citation,
        awardedBy: w.awardedBy
      }))
  ) : []

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 text-sm text-stone-500">
          <Link href="/admin/events" className="text-[#1a2d4a] hover:underline">
            Events
          </Link>{" "}
          / {event.title}
        </div>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-stone-900">
                  {event.title}
                </CardTitle>
                <p className="mt-1 text-sm text-stone-500">
                  {event.date} | {event.startTime} | {event.location}
                </p>
              </div>
              <Badge className="border border-stone-200 bg-stone-50 text-stone-700">
                {event.category}
              </Badge>
            </div>
            <p className="text-sm text-stone-600">{event.description}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm">
                <p className="text-stone-500">Total Participants</p>
                <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-emerald-700">
                  <Users size={16} />
                  {event.participants.length}
                </p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm">
                <p className="text-stone-500">Winner</p>
                <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-amber-700">
                  <Trophy size={16} />
                  {orderedParticipants[0]?.candidateName} (
                  {orderedParticipants[0]?.performanceTime})
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {[
                      "Position",
                      "Candidate ID",
                      "Candidate Name",
                      "Rank",
                      "State",
                      "Battalion",
                      "Role",
                      "Performance Time/Score",
                      "Status",
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
                  {orderedParticipants.map((participant) => (
                    <tr key={participant.candidateId} className="bg-white">
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1 font-semibold text-stone-700">
                          <Medal size={14} className="text-amber-600" />#
                          {participant.position}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-stone-500">
                        {participant.candidateId}
                      </td>
                      <td className="px-3 py-2 font-medium text-stone-900">
                        {participant.candidateName}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {participant.rank}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {participant.state}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {participant.battalion}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {participant.unitRole}
                      </td>
                      <td className="px-3 py-2 text-stone-700">
                        {participant.performanceTime}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {participant.status}
                      </td>
                      <td className="px-3 py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(participant)}
                          className="text-sm font-medium text-[#1a2d4a] hover:underline h-auto p-0"
                        >
                          View details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Participant Detail Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 gap-0">
            {selectedParticipant && (
              <>
                <div className="bg-sky-600 px-5 py-4 text-white rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        <Medal size={20} /> Participant Details
                      </h2>
                      <p className="text-white/70 text-sm mt-1">{event.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-white">#{selectedParticipant.position}</div>
                      <div className="text-[10px] text-white/60">Position</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Performance Details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                      <p className="text-xs text-stone-500">Performance Time</p>
                      <p className="mt-1 text-lg font-semibold text-stone-900">{selectedParticipant.performanceTime}</p>
                    </div>
                    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                      <p className="text-xs text-stone-500">Status</p>
                      <p className="mt-1 text-lg font-semibold text-emerald-600">{selectedParticipant.status}</p>
                    </div>
                  </div>

                  {/* Person Details */}
                  <div className="rounded-lg border border-stone-200 p-4">
                    <p className="mb-3 text-xs font-semibold tracking-wide text-stone-500 uppercase">Person Details</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-stone-500">Name</p>
                        <p className="font-medium text-stone-900">{selectedParticipant.candidateName}</p>
                      </div>
                      <div>
                        <p className="text-stone-500">Candidate ID</p>
                        <p className="font-mono text-stone-700">{selectedParticipant.candidateId}</p>
                      </div>
                      <div>
                        <p className="text-stone-500">Rank</p>
                        <p className="font-medium text-stone-900">{selectedParticipant.rank}</p>
                      </div>
                      <div>
                        <p className="text-stone-500">Battalion</p>
                        <p className="font-medium text-stone-900">{selectedParticipant.battalion}</p>
                      </div>
                      <div>
                        <p className="text-stone-500">State</p>
                        <p className="font-medium text-stone-900">{selectedParticipant.state}</p>
                      </div>
                      <div>
                        <p className="text-stone-500">Role in Event</p>
                        <p className="font-medium text-stone-900">{selectedParticipant.unitRole}</p>
                      </div>
                    </div>
                    {profile && (
                      <div className="mt-3 pt-3 border-t border-stone-200">
                        <p className="text-xs text-stone-500">Specialization</p>
                        <p className="text-sm text-stone-700">{profile.specialization}</p>
                      </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      <p className="text-xs text-stone-500">Performance Note</p>
                      <p className="text-sm text-stone-700">{selectedParticipant.performanceNote}</p>
                    </div>
                  </div>

                  {/* Award History */}
                  {awardHistory.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <p className="mb-3 text-xs font-semibold tracking-wide text-amber-700 uppercase">Award History</p>
                      <div className="space-y-2">
                        {awardHistory.map((award, idx) => (
                          <div key={idx} className="rounded-md border border-amber-200 bg-white p-3">
                            <p className="flex items-center gap-1 text-sm font-semibold text-stone-900">
                              <Trophy size={14} className="text-amber-600" />
                              {award.awardTitle}
                            </p>
                            <p className="mt-1 text-xs text-stone-600">
                              Awarded: {award.awardedOn} | By: {award.awardedBy}
                            </p>
                            <p className="mt-1 text-xs text-stone-500">{award.citation}</p>
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
