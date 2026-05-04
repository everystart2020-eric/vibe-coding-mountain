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
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장 중 오류가 발생했습니다")
      setSaved(true)
    } finally {
      setSaving(false)
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
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 w-fit">
        <span className="text-emerald-400 text-xs font-bold">2단계</span>
        <span className="text-emerald-300 text-xs">AI 실습</span>
      </div>

      {/* 실습 과제 */}
      <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">실습 과제</p>
        <p className="text-white/90 text-sm leading-relaxed">{practice.task}</p>
      </div>

      {/* 추천 프롬프트 */}
      <div className="rounded-2xl bg-indigo-500/10 border border-indigo-400/20 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-indigo-300 text-xs uppercase tracking-widest">추천 프롬프트</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/35 border border-indigo-400/30 text-indigo-300 text-xs transition-all"
          >
            {copied ? "✓ 복사됨" : "복사하기"}
          </button>
        </div>
        <p className="text-white/70 text-sm leading-relaxed font-mono">{practice.prompt}</p>
      </div>

      {/* 이름 없으면 입력 요청 */}
      {!name && (
        <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
          <p className="text-white/70 text-sm font-semibold mb-1">이름을 입력해주세요</p>
          <p className="text-white/40 text-xs mb-3">기록이 다른 참가자들과 공유됩니다</p>
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
              className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 text-white text-sm font-semibold transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 내 기록 입력 */}
      <div className="rounded-2xl bg-white/5 border border-white/15 p-5">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">내 생각 기록</p>
        <p className="text-white/50 text-xs mb-3">{practice.reflection}</p>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setSaved(false) }}
          placeholder="Claude의 답변에서 배운 것, 느낀 것, 궁금한 점을 자유롭게 적어보세요..."
          rows={5}
          className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white/80 placeholder-white/25 text-sm focus:outline-none focus:border-indigo-400/50 resize-none leading-relaxed"
        />
        {error && <p className="text-red-400 text-xs mt-2">⚠️ {error}</p>}
        <div className="flex items-center justify-between mt-3">
          <span className="text-white/25 text-xs">
            {saved ? "✓ 저장됨" : text.trim() ? "저장되지 않음" : ""}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!text.trim() || saving}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-white/70 text-sm transition-colors"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={onComplete}
              disabled={!saved && !text.trim()}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              완료 →
            </button>
          </div>
        </div>
      </div>

      {/* 다른 참가자 기록 */}
      {!loading && others.length > 0 && (
        <div className="rounded-2xl bg-white/3 border border-white/10 p-5">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
            다른 참가자 기록 ({others.length}명)
          </p>
          <div className="flex flex-col gap-3">
            {others.map((e) => (
              <div key={e.name} className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-indigo-300 text-xs font-semibold mb-1">{e.name}</p>
                <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <p className="text-white/30 text-xs text-center">불러오는 중...</p>
      )}
    </div>
  )
}
