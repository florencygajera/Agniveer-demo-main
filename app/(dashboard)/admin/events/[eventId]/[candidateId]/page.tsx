import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AWARD_RECORDS,
  CANDIDATE_PROFILES,
  EVENT_RECORDS,
} from "@/lib/admin/events-awards-data"
import { CalendarDays, Medal, Timer, Trophy, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function EventParticipantDetailPage({
  params,
}: {
  params: { eventId: string; candidateId: string }
}) {
  const event = EVENT_RECORDS.find((item) => item.id === params.eventId)
  if (!event) notFound()

  const participant = event.participants.find(
    (item) => item.candidateId === params.candidateId
  )
  if (!participant) notFound()

  const profile = CANDIDATE_PROFILES.find(
    (item) => item.candidateId === participant.candidateId
  )

  const awardHistory = AWARD_RECORDS.flatMap((award) =>
    award.winners
      .filter((winner) => winner.candidateId === participant.candidateId)
      .map((winner) => ({
        awardId: award.id,
        awardTitle: award.title,
        awardedOn: winner.awardedOn,
        citation: winner.citation,
      }))
  )

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 text-sm text-stone-500">
          <Link href="/admin/events" className="text-[#1a2d4a] hover:underline">
            Events
          </Link>{" "}
          /{" "}
          <Link
            href={`/admin/events/${event.id}`}
            className="text-[#1a2d4a] hover:underline"
          >
            {event.title}
          </Link>{" "}
          / {participant.candidateId}
        </div>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-stone-900">
                  Participant Detail
                </CardTitle>
                <p className="mt-1 text-sm text-stone-600">
                  Complete event performance and person details.
                </p>
              </div>
              <Badge className="border border-stone-200 bg-stone-50 text-stone-700">
                {event.title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs text-stone-500">Position</p>
                <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-amber-700">
                  <Medal size={16} />#{participant.position}
                </p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs text-stone-500">Performance</p>
                <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-emerald-700">
                  <Timer size={16} />
                  {participant.performanceTime}
                </p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs text-stone-500">Event Date</p>
                <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-sky-700">
                  <CalendarDays size={16} />
                  {event.date}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 p-4">
              <p className="mb-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                Candidate Profile
              </p>
              <p className="text-sm text-stone-700">
                <span className="font-medium text-stone-900">Name:</span>{" "}
                {participant.candidateName}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Candidate ID:</span>{" "}
                {participant.candidateId}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Rank:</span>{" "}
                {participant.rank}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Battalion:</span>{" "}
                {participant.battalion}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">State:</span>{" "}
                {participant.state}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Role:</span>{" "}
                {participant.unitRole}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Performance Note:</span>{" "}
                {participant.performanceNote}
              </p>
              {profile && (
                <>
                  <p className="mt-1 text-sm text-stone-700">
                    <span className="font-medium text-stone-900">Joined On:</span>{" "}
                    {profile.joinedOn}
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    <span className="font-medium text-stone-900">
                      Specialization:
                    </span>{" "}
                    {profile.specialization}
                  </p>
                </>
              )}
            </div>

            <div className="rounded-lg border border-stone-200 p-4">
              <p className="mb-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                Award History
              </p>
              {awardHistory.length === 0 ? (
                <p className="text-sm text-stone-500">
                  No awards recorded for this candidate yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {awardHistory.map((award) => (
                    <div
                      key={`${award.awardId}-${award.awardedOn}`}
                      className="rounded-md border border-stone-200 bg-stone-50 p-3"
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                        <Trophy size={14} className="text-amber-600" />
                        {award.awardTitle}
                      </p>
                      <p className="mt-1 text-xs text-stone-600">
                        Awarded on {award.awardedOn}
                      </p>
                      <p className="mt-1 text-xs text-stone-600">{award.citation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/admin/awards`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#1a2d4a] hover:underline"
            >
              <User size={14} />
              Open awards module
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
