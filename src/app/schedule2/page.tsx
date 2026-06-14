"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"

const NAME_KEY = "vote-name"

type LocationSuggestion = {
  id: string
  name: string
  address: string | null
  suggested_by: string
  voters: string[]
}

const WEEKS = [
  { week: 11, date: "7월 11일 (토)", label: "1회 · 기본 AI 활용 교육", slots: ["오전 11:00", "오후 2:00"] },
  { week: 12, date: "7월 18일 (토)", label: "2회", slots: ["오전 11:00", "오후 2:00"] },
  { week: 13, date: "7월 25일 (토)", label: "3회", slots: ["오전 11:00", "오후 2:00"] },
  { week: 14, date: "8월 8일 (토)", label: "4회", slots: ["오전 11:00", "오후 2:00"] },
  { week: 15, date: "8월 15일 (토)", label: "5회", slots: ["오전 11:00", "오후 2:00"] },
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

export default function Schedule2Page() {
  const [name, setName] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [nameSaved, setNameSaved] = useState(false)
  const [counts, setCounts] = useState<VoteCounts>({})
  const [myVotes, setMyVotes] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [customSlots, setCustomSlots] = useState<Record<number, string[]>>({})
  const [addingSlot, setAddingSlot] = useState<number | null>(null)
  const [newSlotInput, setNewSlotInput] = useState("")
  const [locations, setLocations] = useState<LocationSuggestion[]>([])
  const [showLocationForm, setShowLocationForm] = useState(false)
  const [locationName, setLocationName] = useState("")
  const [locationAddress, setLocationAddress] = useState("")
  const [locationSubmitting, setLocationSubmitting] = useState(false)
  const [votingLocation, setVotingLocation] = useState<string | null>(null)

  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch("/api/locations")
      const data = await res.json()
      if (res.ok) setLocations(data.suggestions ?? [])
    } catch {}
  }, [])

  const fetchVotes = useCallback(async (currentName: string) => {
    setLoading(true)
    try {
      const res = await fetch("/api/votes")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "투표 불러오기 실패")
      const votes: VoteRecord[] = (data.votes ?? []).filter((v: VoteRecord) => v.week >= 11)
      setCounts(buildCounts(votes))
      const mine: Record<number, string> = {}
      for (const v of votes) {
        if (v.name === currentName) mine[v.week] = v.time_slot
      }
      setMyVotes(mine)
      const slotMap: Record<number, string[]> = {}
      for (const s of (data.customSlots ?? []).filter((s: { week: number }) => s.week >= 11)) {
        if (!slotMap[s.week]) slotMap[s.week] = []
        slotMap[s.week].push(s.slot)
      }
      setCustomSlots(slotMap)
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLocations()
    const saved = localStorage.getItem(NAME_KEY)
    if (saved) {
      setName(saved)
      setNameSaved(true)
      fetchVotes(saved)
    }
  }, [fetchVotes, fetchLocations])

  function saveName() {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    localStorage.setItem(NAME_KEY, trimmed)
    setName(trimmed)
    setNameSaved(true)
    fetchVotes(trimmed)
  }

  async function addSlot(week: number) {
    const slot = newSlotInput.trim()
    if (!slot) return
    try {
      const res = await fetch("/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ week, slot }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "시간 추가 실패")
      setNewSlotInput("")
      setAddingSlot(null)
      await fetchVotes(name)
    } catch (e) {
      setError(e instanceof Error ? e.message : "시간 추가 중 오류가 발생했습니다")
    }
  }

  async function vote(week: number, slot: string) {
    if (!name || submitting !== null) return
    setError(null)
    setSubmitting(week)
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, week, time_slot: slot }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "투표 저장 실패")
      await fetchVotes(name)
    } catch (e) {
      setError(e instanceof Error ? e.message : "투표 중 오류가 발생했습니다")
    } finally {
      setSubmitting(null)
    }
  }

  async function suggestLocation() {
    if (!locationName.trim() || !name) return
    setLocationSubmitting(true)
    try {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: locationName, address: locationAddress, suggested_by: name }),
      })
      if (res.ok) {
        setLocationName("")
        setLocationAddress("")
        setShowLocationForm(false)
        await fetchLocations()
      }
    } finally {
      setLocationSubmitting(false)
    }
  }

  async function voteLocation(locationId: string) {
    if (!name || votingLocation) return
    setVotingLocation(locationId)
    try {
      const res = await fetch("/api/locations/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location_id: locationId, voter_name: name }),
      })
      if (res.ok) await fetchLocations()
    } finally {
      setVotingLocation(null)
    }
  }

  function resetName() {
    localStorage.removeItem(NAME_KEY)
    setName("")
    setNameInput("")
    setNameSaved(false)
    setMyVotes({})
  }

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-8 transition-colors">
          ← 홈으로
        </Link>

        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-lg text-4xl mb-5">
            📅
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">오프라인 일정 투표</h1>
          <p className="text-gray-500 text-sm">바이브 코딩 산악학교 2기 · 2025년 7–8월</p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-semibold">
            🎉 2기 · 격주 토요일 4회
          </div>
        </div>

        {/* 장소 */}
        <div className="mb-6 rounded-2xl bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest">장소</p>
            <p className="text-gray-800 font-bold">추후 공지 예정</p>
            <p className="text-gray-400 text-xs mt-0.5">조용히 함께할 수 있는 공간으로 확정 후 안내드립니다</p>
          </div>
        </div>

        {/* 1기 바로가기 */}
        <div className="mb-6">
          <Link href="/schedule" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm hover:bg-emerald-100 transition-colors">
            <span>📋</span>
            <span>1기 일정 보기 (5월)</span>
            <span className="ml-auto text-emerald-400">→</span>
          </Link>
        </div>

        {/* 이름 입력 */}
        {!nameSaved ? (
          <div className="mb-8 rounded-2xl bg-white border border-gray-200 p-5">
            <p className="text-gray-800 font-semibold mb-1">참가자 이름 입력</p>
            <p className="text-gray-400 text-xs mb-4">이름을 입력하면 원하는 시간대에 투표할 수 있습니다</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                placeholder="이름 입력"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-400"
              />
              <button
                onClick={saveName}
                disabled={!nameInput.trim()}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl bg-violet-50 border border-violet-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-violet-600 text-lg">👤</span>
              <span className="text-gray-800 font-semibold">{name}</span>
              <span className="text-gray-500 text-sm">으로 투표 중</span>
            </div>
            <button onClick={resetName} className="text-gray-400 hover:text-gray-600 text-xs transition-colors">
              변경
            </button>
          </div>
        )}

        {/* 주차별 투표 */}
        <div className="flex flex-col gap-4 mb-8">
          {WEEKS.map((w, idx) => {
            const mySlot = myVotes[w.week]
            const weekCounts = counts[w.week] ?? {}
            const totalVotes = Object.values(weekCounts).reduce((a, names) => a + names.length, 0)
            const allSlots = [...w.slots, ...(customSlots[w.week] ?? [])]
            const maxVotes = Math.max(...allSlots.map((s) => (weekCounts[s] ?? []).length), 1)

            return (
              <div key={w.week} className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-sm">{idx + 1}회</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">{w.date}</p>
                    <p className="text-gray-400 text-xs">{w.label}{totalVotes > 0 ? ` · ${totalVotes}명 투표` : ""}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {allSlots.map((slot) => {
                    const voters = weekCounts[slot] ?? []
                    const count = voters.length
                    const isMyVote = mySlot === slot
                    const barWidth = count > 0 ? Math.round((count / maxVotes) * 100) : 0

                    return (
                      <button
                        key={slot}
                        onClick={() => nameSaved && vote(w.week, slot)}
                        disabled={!nameSaved || submitting === w.week}
                        className={`relative w-full text-left rounded-xl border p-3 transition-all duration-200 overflow-hidden ${
                          isMyVote
                            ? "border-violet-500 bg-violet-50"
                            : nameSaved
                            ? "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/50"
                            : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {count > 0 && (
                          <div
                            className="absolute inset-y-0 left-0 bg-violet-100 transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        )}
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {isMyVote && <span className="text-violet-600 text-sm">✓</span>}
                            <span className={`text-sm font-medium ${isMyVote ? "text-violet-700" : "text-gray-600"}`}>
                              {slot}
                            </span>
                          </div>
                          {count > 0 && (
                            <span className="text-gray-400 text-xs">
                              {voters.join(", ")} ({count}명)
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {addingSlot === w.week ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newSlotInput}
                      onChange={(e) => setNewSlotInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSlot(w.week)}
                      placeholder="예: 오후 4:00"
                      autoFocus
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-400"
                    />
                    <button
                      onClick={() => addSlot(w.week)}
                      disabled={!newSlotInput.trim()}
                      className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-white text-sm font-semibold transition-colors"
                    >
                      추가
                    </button>
                    <button
                      onClick={() => { setAddingSlot(null); setNewSlotInput("") }}
                      className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm transition-colors"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingSlot(w.week)}
                    className="mt-2 w-full text-center text-gray-400 hover:text-gray-600 text-xs py-1.5 rounded-xl border border-dashed border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    + 시간 추가
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {loading && (
          <div className="text-center text-gray-400 text-sm mb-6">불러오는 중...</div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-red-600 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* 장소 추천 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 font-bold text-base">📍 장소 추천</h2>
            {nameSaved && (
              <button
                onClick={() => setShowLocationForm((v) => !v)}
                className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
              >
                + 추천하기
              </button>
            )}
          </div>

          {showLocationForm && (
            <div className="mb-3 rounded-2xl bg-white border border-gray-200 p-4 flex flex-col gap-2">
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="장소명 (예: 스터디카페 강남점)"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-400"
              />
              <input
                type="text"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                placeholder="주소 또는 메모 (선택)"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-400"
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={suggestLocation}
                  disabled={!locationName.trim() || locationSubmitting}
                  className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-white text-sm font-semibold transition-colors"
                >
                  {locationSubmitting ? "등록 중..." : "등록"}
                </button>
                <button
                  onClick={() => { setShowLocationForm(false); setLocationName(""); setLocationAddress("") }}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          {locations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 p-6 text-center text-gray-400 text-sm">
              아직 추천된 장소가 없어요.<br />
              {nameSaved ? "첫 번째로 추천해보세요!" : "이름을 입력하면 장소를 추천할 수 있어요."}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {[...locations].sort((a, b) => b.voters.length - a.voters.length).map((loc) => {
                const myVote = loc.voters.includes(name)
                return (
                  <div key={loc.id} className={`rounded-2xl border bg-white p-4 flex items-center gap-3 transition-all ${myVote ? "border-violet-300" : "border-gray-200"}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-semibold text-sm truncate">{loc.name}</p>
                      {loc.address && <p className="text-gray-400 text-xs mt-0.5 truncate">{loc.address}</p>}
                      <p className="text-gray-400 text-xs mt-0.5">추천: {loc.suggested_by}</p>
                    </div>
                    <button
                      onClick={() => voteLocation(loc.id)}
                      disabled={!nameSaved || votingLocation === loc.id}
                      className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border transition-all ${
                        myVote
                          ? "bg-violet-100 border-violet-400 text-violet-700"
                          : nameSaved
                          ? "bg-gray-50 border-gray-200 text-gray-500 hover:border-violet-300 hover:bg-violet-50"
                          : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <span className="text-base">{myVote ? "👍" : "👍"}</span>
                      <span className="text-xs font-bold">{loc.voters.length}</span>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-violet-50 border border-violet-200 p-5 mb-8">
          <h3 className="text-violet-700 font-semibold text-sm mb-3">📌 참가 안내</h3>
          <ul className="space-y-1.5 text-gray-600 text-sm">
            <li>· 총 5회 진행 (7월 11일 ~ 8월 15일)</li>
            <li>· 이미 투표한 경우 다시 선택하면 변경됩니다</li>
            <li>· 노트북을 지참해주세요</li>
            <li>· 장소는 확정 후 별도 안내드립니다</li>
          </ul>
        </div>

        <div className="text-center text-gray-400 text-xs">
          <p>문의는 강사에게 직접 연락해주세요</p>
        </div>
      </div>
    </div>
  )
}
