"use client"

import { useState, useEffect, useCallback } from "react"
import type { AIPractice } from "@/data/aiPractices"

type Props = {
  mountainId: string
  stageId: string
  practice: AIPractice
  onComplete: () => void
}

type PracticeEntry = { name: string; text: string; created_at: string }

const NAME_KEY = "vote-name"
const LOCAL_KEY = (m: string, s: string) => `ai-practice-${m}-${s}`

export default function AIPracticeSection({ mountainId, stageId, practice, onComplete }: Props) {
  const [name, setName] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [text, setText] = useState("")
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [entries, setEntries] = useState<PracticeEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiFeedback, setAiFeedback] = useState<string | null>(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)

  const fetchEntries = useCallback(async (currentName: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/practices?mountainId=${mountainId}&stageId=${stageId}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "불러오기 실패")
      const list: PracticeEntry[] = data.practices ?? []
      setEntries(list)
      const mine = list.find((e) => e.name === currentName)
      if (mine) {
        setText(mine.text)
        setSaved(true)
      } else {
        const local = localStorage.getItem(LOCAL_KEY(mountainId, stageId))
        if (local) {
          try { setText(JSON.parse(local).text ?? "") } catch { /* ignore */ }
        }
      }
    } catch {
      const local = localStorage.getItem(LOCAL_KEY(mountainId, stageId))
      if (local) {
        try { setText(JSON.parse(local).text ?? ""); setSaved(true) } catch { /* ignore */ }
      }
    } finally {
      setLoading(false)
    }
  }, [mountainId, stageId])

  useEffect(() => {
    const stored = localStorage.getItem(NAME_KEY)
    if (stored) {
      setName(stored)
      fetchEntries(stored)
    }
  }, [fetchEntries])

  function saveName() {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    localStorage.setItem(NAME_KEY, trimmed)
    setName(trimmed)
    fetchEntries(trimmed)
  }

  async function handleSave() {
    if (!text.trim()) return
    setError(null)
    localStorage.setItem(LOCAL_KEY(mountainId, stageId), JSON.stringify({ text, savedAt: new Date().toISOString() }))

    if (!name) { setSaved(true); return }

    setSaving(true)
    try {
      const res = await fetch("/api/practices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mountainId, stageId, text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "저장 실패")
      setSaved(true)
      await fetchEntries(name)
      fetchAIFeedback(text)
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장 중 오류가 발생했습니다")
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  async function fetchAIFeedback(userText: string) {
    setFeedbackLoading(true)
    setAiFeedback(null)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `학생이 AI 실습 후 다음과 같이 기록했습니다:\n\n"${userText}"\n\n실습 과제: ${practice.task}\n\n이 기록을 읽고, 잘 파악한 점을 칭찬하고 한 가지 더 생각해볼 점을 짧게 알려주세요. 2-3문장으로 간결하게.`,
          mountainName: mountainId,
          stageName: stageId,
          stageContent: practice.task,
        }),
      })
      const data = await res.json()
      if (res.ok) setAiFeedback(data.answer ?? null)
    } catch {
      // feedback is optional — silently ignore
    } finally {
      setFeedbackLoading(false)
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(practice.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const others = entries.filter((e) => e.name !== name)

  return (
    <div className="space-y-6">
      {/* 단계 배지 */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 w-fit">
        <span className="text-emerald-700 text-xs font-bold">2단계</span>
        <span className="text-emerald-600 text-xs">AI 실습</span>
      </div>

      {/* 실습 과제 */}
      <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">실습 과제</p>
        <p className="text-gray-800 text-sm leading-relaxed">{practice.task}</p>
      </div>

      {/* 추천 프롬프트 */}
      <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-blue-700 text-xs uppercase tracking-widest">추천 프롬프트</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 border border-blue-200 text-blue-700 text-xs transition-all"
          >
            {copied ? "✓ 복사됨" : "복사하기"}
          </button>
        </div>
        <p className="text-blue-800 text-sm leading-relaxed font-mono">{practice.prompt}</p>
      </div>

      {/* 이름 없으면 입력 요청 */}
      {!name && (
        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-gray-700 text-sm font-semibold mb-1">이름을 입력해주세요</p>
          <p className="text-gray-400 text-xs mb-3">기록이 다른 참가자들과 공유됩니다</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              placeholder="이름 입력"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400"
            />
            <button
              onClick={saveName}
              disabled={!nameInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-30 text-white text-sm font-semibold transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 내 기록 입력 */}
      <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">내 생각 기록</p>
        <p className="text-gray-500 text-xs mb-3">{practice.reflection}</p>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setSaved(false) }}
          placeholder="Claude의 답변에서 배운 것, 느낀 것, 궁금한 점을 자유롭게 적어보세요..."
          rows={5}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
        />
        {error && <p className="text-red-500 text-xs mt-2">⚠️ {error}</p>}

        {feedbackLoading && (
          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4">
            <p className="text-blue-600 text-xs animate-pulse">AI가 피드백을 작성하는 중...</p>
          </div>
        )}

        {aiFeedback && !feedbackLoading && (
          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4">
            <p className="text-blue-700 text-xs font-semibold mb-2">AI 피드백</p>
            <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-wrap">{aiFeedback}</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="text-gray-400 text-xs">
            {saved ? "✓ 저장됨" : text.trim() ? "저장되지 않음" : ""}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!text.trim() || saving}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 text-sm transition-colors border border-gray-200"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={onComplete}
              disabled={!saved && !text.trim()}
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              완료 →
            </button>
          </div>
        </div>
      </div>

      {/* 다른 참가자 기록 */}
      {!loading && others.length > 0 && (
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">
            다른 참가자 기록 ({others.length}명)
          </p>
          <div className="flex flex-col gap-3">
            {others.map((e) => (
              <div key={e.name} className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
                <p className="text-emerald-700 text-xs font-semibold mb-1">{e.name}</p>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <p className="text-gray-400 text-xs text-center">불러오는 중...</p>
      )}
    </div>
  )
}
