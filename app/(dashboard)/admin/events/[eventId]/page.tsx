import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EVENT_RECORDS } from "@/lib/admin/events-awards-data"
import { Medal, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string }
}) {
  const event = EVENT_RECORDS.find((item) => item.id === params.eventId)
  if (!event) notFound()

  const orderedParticipants = [...event.participants].sort(
    (a, b) => a.position - b.position
  )

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
                      "Battalion",
                      "Performance Time/Score",
                      "Status",
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
                        {participant.battalion}
                      </td>
                      <td className="px-3 py-2 text-stone-700">
                        {participant.performanceTime}
                      </td>
                      <td className="px-3 py-2 text-stone-600">
                        {participant.status}
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
