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
import { EVENT_RECORDS } from "@/lib/admin/events-awards-data"
import { CalendarDays, ChevronRight, Medal, Trophy, Users } from "lucide-react"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENT_RECORDS[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const totalEvents = EVENT_RECORDS.length
  const totalParticipants = EVENT_RECORDS.reduce(
    (sum, event) => sum + event.participants.length,
    0
  )

  return (
    <div className="min-h-screen bg-[#f4f3ef] font-sans">
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Events
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            All occurred events, participants, winners, positions, and timing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <CalendarDays className="text-sky-600" size={16} />
              <div>
                <p className="text-xs text-stone-500">Total Events</p>
                <p className="text-2xl font-bold text-sky-600">{totalEvents}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <Users className="text-emerald-600" size={16} />
              <div>
                <p className="text-xs text-stone-500">Total Participations</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {totalParticipants}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <Trophy className="text-amber-600" size={16} />
              <div>
                <p className="text-xs text-stone-500">Podium Records</p>
                <p className="text-2xl font-bold text-amber-600">
                  {totalEvents * 3}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {EVENT_RECORDS.map((event) => {
            const winner = event.participants.find((p) => p.position === 1)
            return (
              <Card
                key={event.id}
                className="border-stone-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base text-stone-900">
                        {event.title}
                      </CardTitle>
                      <p className="mt-1 text-xs text-stone-500">
                        {event.date} | {event.startTime} | {event.location}
                      </p>
                    </div>
                    <Badge className="border border-stone-200 bg-stone-50 text-stone-700">
                      {event.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-stone-600">
                      <Users size={14} />
                      {event.participants.length} participants
                    </span>
                    {winner && (
                      <span className="flex items-center gap-1 text-amber-700">
                        <Medal size={14} />
                        Winner: {winner.candidateName} ({winner.performanceTime})
                      </span>
                    )}
                    <div className="ml-auto flex items-center gap-3">
                      <Dialog open={modalOpen && selectedEvent?.id === event.id} onOpenChange={(open) => {
                        if (open) {
                          setSelectedEvent(event)
                          setModalOpen(true)
                        } else {
                          setModalOpen(false)
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-xs font-medium text-[#1a2d4a] hover:underline">
                            View details <ChevronRight size={14} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                          {selectedEvent && (
                            <>
                              <DialogHeader>
                                <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                                <p className="text-sm text-stone-500">{selectedEvent.category}</p>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
                                  <span className="flex items-center gap-1">
                                    <CalendarDays size={14} /> {selectedEvent.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users size={14} /> {selectedEvent.participants.length} participants
                                  </span>
                                  <span className="text-sm text-stone-500">{selectedEvent.location}</span>
                                </div>
                                {selectedEvent.description && (
                                  <p className="text-sm text-stone-600">{selectedEvent.description}</p>
                                )}
                                <div className="rounded-lg border border-stone-200 p-4">
                                  <h4 className="font-semibold mb-2">Participants & Results</h4>
                                  <div className="space-y-3">
                                    {selectedEvent.participants.map((p, idx) => (
                                      <div key={idx} className="flex justify-between items-center text-sm border-b border-stone-100 pb-2 last:border-0">
                                        <div>
                                          <span className="font-medium">{p.candidateName}</span>
                                          <span className="text-stone-500 ml-2">({p.candidateId})</span>
                                          <span className="text-stone-400 ml-2 text-xs">| {p.battalion}</span>
                                        </div>
                                        <div className="text-right">
                                          <span className={`font-semibold ${p.position === 1 ? 'text-amber-600' : p.position === 2 ? 'text-stone-400' : p.position === 3 ? 'text-amber-700' : 'text-stone-600'}`}>
                                            {p.position === 1 ? '🥇' : p.position === 2 ? '🥈' : p.position === 3 ? '🥉' : `${p.position}.`} {p.performanceTime}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
