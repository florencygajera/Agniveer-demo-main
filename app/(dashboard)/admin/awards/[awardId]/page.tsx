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
import { AWARD_RECORDS, CANDIDATE_PROFILES } from "@/lib/admin/events-awards-data"
import { Award, CalendarDays } from "lucide-react"
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
                        <Dialog open={modalOpen && selectedWinner?.candidateId === winner.candidateId} onOpenChange={(open) => {
                          if (open) {
                            setSelectedWinner(winner)
                            setModalOpen(true)
                          } else {
                            setModalOpen(false)
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="inline-flex items-center gap-1 text-sm font-medium text-[#1a2d4a] hover:underline h-auto p-0">
                              <Award size={14} />
                              View winner details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                            {selectedWinner && (
                              <>
                                <DialogHeader>
                                  <DialogTitle className="text-xl">Winner: {selectedWinner.candidateName}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-center gap-4 text-sm text-stone-600">
                                    <span className="flex items-center gap-1">
                                      <CalendarDays size={14} /> {selectedWinner.awardedOn}
                                    </span>
                                    <span>Awarded by: {selectedWinner.awardedBy}</span>
                                  </div>
                                  <div className="rounded-lg border border-stone-200 p-4">
                                    <h4 className="font-semibold mb-2">Citation</h4>
                                    <p className="text-sm italic">"{selectedWinner.citation}"</p>
                                  </div>
                                  <div className="rounded-lg border border-stone-200 p-4">
                                    <h4 className="font-semibold mb-2">Details</h4>
                                    <p className="text-sm">Candidate ID: {selectedWinner.candidateId}</p>
                                    <p className="text-sm">Battalion: {selectedWinner.battalion}</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
