"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"

const NAME_KEY = "vote-name"

const WEEKS = [
  { week: 1, date: "5월 9일 (토)", slots: ["오전 11:00", "오후 1:00"] },
  { week: 2, date: "5월 17일 (일) 또는 평일 저녁", slots: ["오전 11:00", "오후 1:00", "평일 저녁"] },
  { week: 3, date: "5월 23일 (토)", slots: ["오전 11:00", "오후 1:00"] },
  { week: 4, date: "5월 30일 (토)", slots: ["오전 11:00", "오후 1:00"] },
]

type VoteRecord = { week: number; time_slot: string; name: string }
type VoteCounts = Record<number, Record<string, string[]>>

function buildCounts(votes: VoteRecord[]): VoteCounts {
  const counts: VoteCounts = {}
  for (const v of votes) {
    if (!counts[v.week]) counts[v.week] = {}
    if (!counts[v.week][v.time_slot]) counts[v.week][v.time_slot] = []
    counts[v.week][v.time_slot].push(v.name)
  }
  return counts
}

export default function SchedulePage() {
  const [name, setName] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [nameSaved, setNameSaved] = useState(false)
  const [counts, setCounts] = useState<VoteCounts>({})
  const [myVotes, setMyVotes] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState<number | null>(null)

  const fetchVotes = useCallback(async (currentName: string) => {
    setLoading(true)
    const res = await fetch("/api/votes")
    const data = await res.json()
    const votes: VoteRecord[] = data.votes ?? []
    setCounts(buildCounts(votes))
    const mine: Record<number, string> = {}
    for (const v of votes) {
      if (v.name === currentName) mine[v.week] = v.time_slot
    }
    setMyVotes(mine)
    setLoading(false)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(NAME_KEY)
    if (saved) {
      setName(saved)
      setNameSaved(true)
      fetchVotes(saved)
    }
  }, [fetchVotes])

  function saveName() {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    localStorage.setItem(NAME_KEY, trimmed)
    setName(trimmed)
    setNameSaved(true)
    fetchVotes(trimmed)
  }

  async function vote(week: number, slot: string) {
    if (!name || submitting !== null) return
    setSubmitting(week)
    await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, week, time_slot: slot }),
    })
    await fetchVotes(name)
    setSubmitting(null)
  }

  function resetName() {
    localStorage.removeItem(NAME_KEY)
    setName("")
    setNameInput("")
    setNameSaved(false)
    setMyVotes({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          ← 홈으로
        </Link>

        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-4xl mb-5 shadow-xl">
            📅
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">오프라인 일정 투표</h1>
          <p className="text-indigo-300 text-sm">바이브 코딩 산악학교 · 2025년 5월</p>
        </div>

        {/* 장소 */}
        <div className="mb-6 rounded-2xl bg-white/8 border border-white/15 p-4 flex items-center gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest">장소</p>
            <p className="text-white font-bold">링키영어 본사카페 1층</p>
          </div>
        </div>

        {/* 이름 입력 */}
        {!nameSaved ? (
          <div className="mb-8 rounded-2xl bg-white/8 border border-white/15 p-5">
            <p className="text-white font-semibold mb-1">참가자 이름 입력</p>
            <p className="text-white/40 text-xs mb-4">이름을 입력하면 원하는 시간대에 투표할 수 있습니다</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                placeholder="이름 입력"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-400/60"
              />
              <button
                onClick={saveName}
                disabled={!nameInput.trim()}
                className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl bg-indigo-500/15 border border-indigo-400/25 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-indigo-300 text-lg">👤</span>
              <span className="text-white font-semibold">{name}</span>
              <span className="text-white/40 text-sm">으로 투표 중</span>
            </div>
            <button onClick={resetName} className="text-white/30 hover:text-white/60 text-xs transition-colors">
              변경
            </button>
          </div>
        )}

        {/* 주차별 투표 */}
        <div className="flex flex-col gap-4 mb-8">
          {WEEKS.map((w) => {
            const mySlot = myVotes[w.week]
            const weekCounts = counts[w.week] ?? {}
            const totalVotes = Object.values(weekCounts).reduce((a, names) => a + names.length, 0)

            return (
              <div key={w.week} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-sm">{w.week}주</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{w.date}</p>
                    {totalVotes > 0 && (
                      <p className="text-white/30 text-xs">{totalVotes}명 투표</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {w.slots.map((slot) => {
                    const voters = weekCounts[slot] ?? []
                    const count = voters.length
                    const isMyVote = mySlot === slot
                    const maxVotes = Math.max(...w.slots.map((s) => (weekCounts[s] ?? []).length), 1)
                    const barWidth = count > 0 ? Math.round((count / maxVotes) * 100) : 0

                    return (
                      <button
                        key={slot}
                        onClick={() => nameSaved && vote(w.week, slot)}
                        disabled={!nameSaved || submitting === w.week}
                        className={`relative w-full text-left rounded-xl border p-3 transition-all duration-200 overflow-hidden ${
                          isMyVote
                            ? "border-indigo-400/60 bg-indigo-500/20"
                            : nameSaved
                            ? "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                            : "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {/* 투표 바 */}
                        {count > 0 && (
                          <div
                            className="absolute inset-y-0 left-0 bg-indigo-500/10 transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        )}
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {isMyVote && <span className="text-indigo-400 text-sm">✓</span>}
                            <span className={`text-sm font-medium ${isMyVote ? "text-indigo-300" : "text-white/70"}`}>
                              {slot}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {count > 0 && (
                              <span className="text-white/40 text-xs">
                                {voters.join(", ")} ({count}명)
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {loading && (
          <div className="text-center text-white/30 text-sm mb-6">불러오는 중...</div>
        )}

        <div className="rounded-2xl bg-indigo-500/10 border border-indigo-400/20 p-5 mb-8">
          <h3 className="text-indigo-300 font-semibold text-sm mb-3">📌 참가 안내</h3>
          <ul className="space-y-1.5 text-white/60 text-sm">
            <li>· 이미 투표한 경우 다시 선택하면 변경됩니다</li>
            <li>· 노트북을 지참해주세요</li>
            <li>· 사전 온라인 학습 후 오프라인 실습을 진행합니다</li>
          </ul>
        </div>

        <div className="text-center text-white/20 text-xs">
          <p>문의는 강사에게 직접 연락해주세요</p>
        </div>
      </div>
    </div>
  )
}
