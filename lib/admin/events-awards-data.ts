export type EventParticipation = {
  candidateId: string
  candidateName: string
  battalion: string
  position: number
  performanceTime: string
  status: "Completed" | "Disqualified"
}

export type EventRecord = {
  id: string
  title: string
  category: string
  date: string
  startTime: string
  location: string
  description: string
  participants: EventParticipation[]
}

export type AwardWinner = {
  candidateId: string
  candidateName: string
  battalion: string
  awardedOn: string
  awardedBy: string
  citation: string
  relatedEventId?: string
}

export type AwardRecord = {
  id: string
  title: string
  category: string
  description: string
  winners: AwardWinner[]
}

export const EVENT_RECORDS: EventRecord[] = [
  {
    id: "national-obstacle-trial-2025",
    title: "National Obstacle Trial 2025",
    category: "Physical",
    date: "2025-03-10",
    startTime: "08:30 IST",
    location: "Jaipur Training Ground",
    description:
      "Obstacle endurance and speed challenge for all battalion qualifiers.",
    participants: [
      {
        candidateId: "AGN-2024-0103",
        candidateName: "Arjun Mehra",
        battalion: "RR-1",
        position: 1,
        performanceTime: "03:18",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0201",
        candidateName: "Vikram Nair",
        battalion: "PARA-2",
        position: 2,
        performanceTime: "03:26",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0304",
        candidateName: "Ranjit Singh",
        battalion: "BEN-3",
        position: 3,
        performanceTime: "03:34",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0402",
        candidateName: "Vijay Deshmukh",
        battalion: "MAR-4",
        position: 4,
        performanceTime: "03:41",
        status: "Completed",
      },
    ],
  },
  {
    id: "precision-shooting-cup-2025",
    title: "Precision Shooting Cup 2025",
    category: "Weapons",
    date: "2025-05-18",
    startTime: "10:00 IST",
    location: "Central Marksmanship Range, Agra",
    description:
      "Long-range and rapid fire accuracy assessment across battalions.",
    participants: [
      {
        candidateId: "AGN-2024-0304",
        candidateName: "Ranjit Singh",
        battalion: "BEN-3",
        position: 1,
        performanceTime: "98/100",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0106",
        candidateName: "Mahesh Choudhary",
        battalion: "RR-1",
        position: 2,
        performanceTime: "95/100",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0204",
        candidateName: "Deepak Yadav",
        battalion: "PARA-2",
        position: 3,
        performanceTime: "93/100",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0401",
        candidateName: "Suresh Patil",
        battalion: "MAR-4",
        position: 4,
        performanceTime: "89/100",
        status: "Completed",
      },
    ],
  },
  {
    id: "combat-drill-finals-2025",
    title: "Combat Drill Finals 2025",
    category: "Combat",
    date: "2025-08-02",
    startTime: "15:00 IST",
    location: "Field Simulation Arena, Pune",
    description:
      "Section-level tactical drill final judged on response time and execution.",
    participants: [
      {
        candidateId: "AGN-2024-0201",
        candidateName: "Vikram Nair",
        battalion: "PARA-2",
        position: 1,
        performanceTime: "12:42",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0101",
        candidateName: "Rajveer Singh Chauhan",
        battalion: "RR-1",
        position: 2,
        performanceTime: "12:58",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0301",
        candidateName: "Sourav Das",
        battalion: "BEN-3",
        position: 3,
        performanceTime: "13:09",
        status: "Completed",
      },
      {
        candidateId: "AGN-2024-0404",
        candidateName: "Vijay Deshmukh",
        battalion: "MAR-4",
        position: 4,
        performanceTime: "13:20",
        status: "Completed",
      },
    ],
  },
]

export const AWARD_RECORDS: AwardRecord[] = [
  {
    id: "best-obstacle-runner",
    title: "Best Obstacle Runner",
    category: "Physical Excellence",
    description:
      "Given to the fastest candidate in obstacle endurance trials.",
    winners: [
      {
        candidateId: "AGN-2024-0103",
        candidateName: "Arjun Mehra",
        battalion: "RR-1",
        awardedOn: "2025-03-10",
        awardedBy: "Brig. N. Kulkarni",
        citation: "Fastest course completion with zero penalties.",
        relatedEventId: "national-obstacle-trial-2025",
      },
      {
        candidateId: "AGN-2024-0201",
        candidateName: "Vikram Nair",
        battalion: "PARA-2",
        awardedOn: "2024-12-14",
        awardedBy: "Maj. Ankit Verma",
        citation: "Best obstacle score in winter command meet.",
      },
    ],
  },
  {
    id: "marksman-of-the-quarter",
    title: "Marksman of the Quarter",
    category: "Weapons Mastery",
    description:
      "Awarded for highest aggregate shooting accuracy in the quarter.",
    winners: [
      {
        candidateId: "AGN-2024-0304",
        candidateName: "Ranjit Singh",
        battalion: "BEN-3",
        awardedOn: "2025-05-18",
        awardedBy: "Col. S. Rathore",
        citation: "Top score in precision and rapid fire segments.",
        relatedEventId: "precision-shooting-cup-2025",
      },
      {
        candidateId: "AGN-2024-0106",
        candidateName: "Mahesh Choudhary",
        battalion: "RR-1",
        awardedOn: "2025-02-01",
        awardedBy: "Maj. Ankit Verma",
        citation: "Consistent top-3 shooting performance all quarter.",
      },
    ],
  },
  {
    id: "battle-readiness-star",
    title: "Battle Readiness Star",
    category: "Combat Leadership",
    description:
      "Recognizes exceptional composure and tactical execution in combat drills.",
    winners: [
      {
        candidateId: "AGN-2024-0201",
        candidateName: "Vikram Nair",
        battalion: "PARA-2",
        awardedOn: "2025-08-02",
        awardedBy: "Lt. Gen. P. Rawat",
        citation: "Highest tactical efficiency rating in finals.",
        relatedEventId: "combat-drill-finals-2025",
      },
      {
        candidateId: "AGN-2024-0101",
        candidateName: "Rajveer Singh Chauhan",
        battalion: "RR-1",
        awardedOn: "2025-08-02",
        awardedBy: "Lt. Gen. P. Rawat",
        citation: "Second highest tactical score with strong team command.",
        relatedEventId: "combat-drill-finals-2025",
      },
    ],
  },
]
