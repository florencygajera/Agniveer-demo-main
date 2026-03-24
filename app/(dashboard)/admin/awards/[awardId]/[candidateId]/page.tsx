import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AWARD_RECORDS, EVENT_RECORDS } from "@/lib/admin/events-awards-data"
import { CalendarDays, ClipboardList, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function AwardWinnerDetailPage({
  params,
}: {
  params: { awardId: string; candidateId: string }
}) {
  const award = AWARD_RECORDS.find((item) => item.id === params.awardId)
  if (!award) notFound()

  const winner = award.winners.find(
    (item) => item.candidateId === params.candidateId
  )
  if (!winner) notFound()

  const relatedEvent = winner.relatedEventId
    ? EVENT_RECORDS.find((event) => event.id === winner.relatedEventId)
    : undefined

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 text-sm text-stone-500">
          <Link href="/admin/awards" className="text-[#1a2d4a] hover:underline">
            Awards
          </Link>{" "}
          /{" "}
          <Link
            href={`/admin/awards/${award.id}`}
            className="text-[#1a2d4a] hover:underline"
          >
            {award.title}
          </Link>{" "}
          / {winner.candidateId}
        </div>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-stone-900">
                  Award Winner Detail
                </CardTitle>
                <p className="mt-1 text-sm text-stone-600">
                  Full details of when and why this candidate received the award.
                </p>
              </div>
              <Badge className="border border-stone-200 bg-stone-50 text-stone-700">
                {award.title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs text-stone-500">Candidate</p>
                <p className="mt-1 flex items-center gap-2 text-base font-semibold text-stone-900">
                  <User size={15} />
                  {winner.candidateName}
                </p>
                <p className="mt-1 font-mono text-xs text-stone-500">
                  {winner.candidateId}
                </p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs text-stone-500">Awarded On</p>
                <p className="mt-1 flex items-center gap-2 text-base font-semibold text-stone-900">
                  <CalendarDays size={15} />
                  {winner.awardedOn}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Battalion: {winner.battalion}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 p-4">
              <p className="mb-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                Award Information
              </p>
              <p className="text-sm text-stone-700">
                <span className="font-medium text-stone-900">Award:</span>{" "}
                {award.title}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Awarded By:</span>{" "}
                {winner.awardedBy}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Citation:</span>{" "}
                {winner.citation}
              </p>
              {relatedEvent && (
                <p className="mt-1 text-sm text-stone-700">
                  <span className="font-medium text-stone-900">
                    Related Event:
                  </span>{" "}
                  <Link
                    href={`/admin/events/${relatedEvent.id}`}
                    className="inline-flex items-center gap-1 text-[#1a2d4a] hover:underline"
                  >
                    <ClipboardList size={14} />
                    {relatedEvent.title}
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
