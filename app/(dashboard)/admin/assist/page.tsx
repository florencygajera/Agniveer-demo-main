"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Send,
  User,
  Zap,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Wifi,
  Loader2,
  Shield,
  Flame,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "assistant" | "user"

interface Message {
  id: string
  role: Role
  content: string
  timestamp: Date
}

// ── Suggested Prompts ─────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "Physical training standards",
  "Stipend & Seva Nidhi",
  "Daily schedule",
  "SOS protocol",
  "Medical requirements",
  "Rank & promotion",
]

// ── Canned Responses (demo) ───────────────────────────────────────────────────

const CANNED: Record<string, string> = {
  "Physical training standards":
    "Agnipath physical training standards require a minimum 1.6 km run in under 5 minutes 30 seconds, 10 push-ups, 10 sit-ups, and a chin-up hold for 10 seconds. Battalion-specific criteria may vary. Would you like details for a specific regiment?",
  "Stipend & Seva Nidhi":
    "Agniveers receive a monthly stipend starting at ₹30,000 in Year 1, rising to ₹40,000 in Year 4. 30% is deposited into the Seva Nidhi corpus, matched equally by the Government. At the end of 4 years, the total Seva Nidhi payout is approximately ₹11.71 lakh (tax-exempt).",
  "Daily schedule":
    "A typical Agniveer daily schedule:\n• 05:30 — Reveille & PT\n• 07:00 — Breakfast\n• 08:00 — Technical / Trade training\n• 13:00 — Lunch & rest\n• 14:30 — Tactical drills or weapons training\n• 17:30 — Games & recreation\n• 19:00 — Dinner\n• 22:00 — Lights out",
  "SOS protocol":
    "In an SOS situation: (1) Activate the alert via the Command Dashboard. (2) All units report to designated stations immediately. (3) Unit commanders acknowledge within 5 minutes. (4) Drill coordinators mark completion in the portal. For live emergencies, contact the duty officer directly at the battalion command line.",
  "Medical requirements":
    "Medical eligibility for Agnipath includes: general health fitness, vision 6/6 in one eye and 6/9 in the other (correctable), no colour blindness, no flat feet, BMI between 18–25, and no history of major surgery. Full medical screening is conducted at the recruitment rally.",
  "Rank & promotion":
    "Agniveers serve for 4 years. Top performers (up to 25%) may be retained in regular cadre based on merit. Retained soldiers are eligible for promotion to Naik after 2 years of regular service, subject to performance and vacancies.",
}

function getResponse(input: string): string {
  const key = Object.keys(CANNED).find((k) =>
    input.toLowerCase().includes(k.toLowerCase())
  )
  return key
    ? CANNED[key]
    : "That's a great question! I'm currently limited to my offline military knowledge base. Please try asking about training standards, stipend, daily schedule, SOS protocol, medical requirements, or rank & promotion — or contact your battalion commander for other queries."
}

// ── Message Bubble ─────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const [copied, setCopied] = useState(false)
  const isUser = msg.role === "user"

  function copy() {
    navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={`group flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow ${
          isUser
            ? "bg-gradient-to-br from-slate-700 to-slate-900"
            : "bg-gradient-to-br from-orange-500 to-amber-600"
        }`}
      >
        {isUser ? <User size={15} /> : <Bot size={15} />}
      </div>

      {/* Bubble */}
      <div
        className={`flex max-w-[78%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-orange-500 to-amber-500 text-white"
              : "rounded-tl-sm border border-orange-100 bg-white text-slate-800"
          }`}
        >
          {msg.content.split("\n").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {/* Actions (assistant only) */}
        {!isUser && (
          <div className="flex items-center gap-1 px-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={copy}
              className="rounded p-1 text-slate-400 transition hover:bg-orange-50 hover:text-orange-600"
              title="Copy"
            >
              <Copy size={12} />
            </button>
            <button className="rounded p-1 text-slate-400 transition hover:bg-green-50 hover:text-green-600">
              <ThumbsUp size={12} />
            </button>
            <button className="rounded p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500">
              <ThumbsDown size={12} />
            </button>
            {copied && (
              <span className="ml-1 text-[10px] font-semibold text-orange-500">
                Copied!
              </span>
            )}
          </div>
        )}

        <span className="px-1 text-[10px] text-slate-400">
          {msg.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  )
}

// ── Typing Indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow">
        <Bot size={15} className="text-white" />
      </div>
      <div className="rounded-2xl rounded-tl-sm border border-orange-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

const INITIAL: Message = {
  id: "0",
  role: "assistant",
  content:
    "Namaste 🙏 I am AgniAssist, your AI assistant for the Agnipath Portal. I can answer questions about training, stipend, medical standards, schedules, SOS protocols, and more. How can I help you today?",
  timestamp: new Date(),
}

export default function AgniAssistPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  function sendMessage(text: string) {
    const content = text.trim()
    if (!content || typing) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      },
    ])
    setInput("")
    setTyping(true)

    setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: getResponse(content),
            timestamp: new Date(),
          },
        ])
        setTyping(false)
      },
      1200 + Math.random() * 600
    )
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function reset() {
    setMessages([INITIAL])
    setInput("")
    setTyping(false)
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-white">
      <div className="shrink-0 border-b border-orange-100 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-200">
              <Flame size={20} className="text-white" />
              <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
            <div>
              <h1 className="text-base leading-none font-bold tracking-tight text-slate-900">
                AgniAssist
              </h1>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                <Zap size={10} className="text-orange-500" />
                RAG · Offline military knowledge base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="gap-1 border border-green-200 bg-green-50 text-[11px] font-medium text-green-700 hover:bg-green-50">
              <Wifi size={10} />
              Online
            </Badge>
            <button
              onClick={reset}
              title="Reset conversation"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-orange-50 hover:text-orange-600"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pb-120">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-5 pb-2 sm:px-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} className="h-1" />
        </div>
      </div>

      <div className="fixed bottom-0 w-full shrink-0 border-t border-orange-100 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto max-w-2xl space-y-2.5">
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={typing}
                className="flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-medium text-orange-700 transition hover:border-orange-400 hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Shield size={9} className="opacity-70" />
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about training, stipend, medical standards, SOS..."
              rows={1}
              disabled={typing}
              className="max-h-[120px] min-h-[42px] flex-1 resize-none rounded-xl border border-orange-200 bg-orange-50/60 py-2.5 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:border-orange-400 focus-visible:ring-2 focus-visible:ring-orange-200 disabled:opacity-50"
              style={{
                overflow: input.split("\n").length > 3 ? "auto" : "hidden",
              }}
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="h-[42px] w-[42px] shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 p-0 text-white shadow-md shadow-orange-200 transition hover:from-orange-600 hover:to-amber-600 disabled:opacity-40"
            >
              {typing ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Send size={17} />
              )}
            </Button>
          </div>
          <p className="text-center text-[10px] text-slate-400">
            AgniAssist RAG Service · Port 8012 · Agnipath training knowledge
            base
          </p>
        </div>
      </div>
    </div>
  )
}
