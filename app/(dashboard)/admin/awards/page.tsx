import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AWARD_RECORDS } from "@/lib/admin/events-awards-data"
import { Award, ChevronRight, Users } from "lucide-react"
import Link from "next/link"

export default function AwardsPage() {
  const totalAwards = AWARD_RECORDS.length
  const totalAwardWins = AWARD_RECORDS.reduce(
    (sum, award) => sum + award.winners.length,
    0
  )

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
            <Link key={award.id} href={`/admin/awards/${award.id}`}>
              <Card className="border-stone-200 bg-white shadow-sm transition-all hover:shadow-md">
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
                      View winners <ChevronRight size={14} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
