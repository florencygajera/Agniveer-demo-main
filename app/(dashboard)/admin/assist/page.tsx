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
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${
          isUser ? "bg-stone-700" : "bg-[#4a5c2f]"
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] space-y-1 sm:max-w-[65%] ${isUser ? "items-end" : "items-start"} flex flex-col`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-tr-sm bg-[#4a5c2f] text-white"
              : "rounded-tl-sm border border-stone-100 bg-white text-stone-800"
          }`}
        >
          {msg.content.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < msg.content.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {/* Actions row (assistant only) */}
        {!isUser && (
          <div className="flex items-center gap-1 px-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={copy}
              className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
              title="Copy"
            >
              <Copy size={12} />
            </button>
            <button className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-emerald-600">
              <ThumbsUp size={12} />
            </button>
            <button className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-rose-500">
              <ThumbsDown size={12} />
            </button>
            {copied && (
              <span className="ml-1 text-[10px] font-medium text-emerald-600">
                Copied!
              </span>
            )}
          </div>
        )}

        <span className="px-1 text-[10px] text-stone-400">
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
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4a5c2f] shadow-sm">
        <Bot size={14} className="text-white" />
      </div>
      <div className="rounded-2xl rounded-tl-sm border border-stone-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400"
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
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  function sendMessage(text: string) {
    const content = text.trim()
    if (!content || typing) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)

    setTimeout(
      () => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getResponse(content),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, reply])
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
    <div className="flex min-h-screen flex-col bg-[#f4f3ef] font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4a5c2f] shadow-sm">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base leading-tight font-bold text-stone-900">
                AgniAssist
              </h1>
              <p className="flex items-center gap-1.5 text-xs text-stone-400">
                <Zap size={10} className="text-amber-500" />
                Powered by RAG · Offline military knowledge base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="gap-1 border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-600 hover:bg-emerald-50">
              <Wifi size={10} />
              Online
            </Badge>
            <button
              onClick={reset}
              className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
              title="Reset conversation"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Chat Area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-5 px-4 py-6 sm:px-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-stone-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl space-y-3 px-4 py-3 sm:px-6">
          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={typing}
                className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600 transition-all hover:border-[#4a5c2f] hover:bg-[#4a5c2f] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {s}
                <ChevronRight size={10} className="opacity-60" />
              </button>
            ))}
          </div>

          {/* Input row */}
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about training, stipend, medical standards, SOS..."
                rows={1}
                disabled={typing}
                className="max-h-[140px] min-h-[44px] resize-none rounded-xl border-stone-200 bg-stone-50 py-3 pr-4 text-sm placeholder:text-stone-400 focus:border-[#4a5c2f] focus:ring-1 focus:ring-[#4a5c2f] disabled:opacity-50"
                style={{
                  overflow: input.split("\n").length > 3 ? "auto" : "hidden",
                }}
              />
            </div>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="h-11 w-11 shrink-0 rounded-xl bg-[#4a5c2f] p-0 text-white shadow-sm hover:bg-[#3a4a22] disabled:opacity-40"
            >
              {typing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-stone-400">
            Backend: AgniAssist RAG Service (Port 8012) · Knowledge base:
            Agnipath training manuals
          </p>
        </div>
      </div>
    </div>
  )
}
