"use client"

import { useState } from "react"
import { USER_STORAGE_KEY } from "@/components/Onboarding"

type Props = {
  mountainName: string
  stageName: string
  stageContent: string
}

export default function AskAI({ mountainName, stageName, stageContent }: Props) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleAsk() {
    if (!question.trim()) return
    setLoading(true)
    setAnswer("")
    try {
      let userName = ""
      try {
        const raw = localStorage.getItem(USER_STORAGE_KEY)
        if (raw) userName = JSON.parse(raw)?.name ?? ""
      } catch { /* ignore */ }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, mountainName, stageName, stageContent, userName })
      })
      const data = await res.json()
      setAnswer(data.answer || "답변을 가져오지 못했어요. 다시 시도해주세요.")
    } catch {
      setAnswer("오류가 발생했어요. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-emerald-300 text-emerald-700 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition-all font-medium text-sm"
      >
        🤔 모르는 게 있나요? AI-Eric 강사에게 질문하기
      </button>
    )
  }

  return (
    <div className="mt-5 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
          🤖 AI-Eric 강사에게 질문하기
        </h3>
        <button
          onClick={() => { setOpen(false); setAnswer(""); setQuestion("") }}
          className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
        >
          닫기 ✕
        </button>
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleAsk()
          }
        }}
        placeholder="이해가 안 되는 부분을 편하게 질문해보세요! (Enter로 전송)"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all"
        rows={3}
      />

      <button
        onClick={handleAsk}
        disabled={loading || !question.trim()}
        className="mt-2 w-full py-2.5 rounded-xl bg-emerald-700 border border-emerald-700 text-white font-medium text-sm disabled:opacity-40 hover:bg-emerald-600 transition-colors"
      >
        {loading ? "답변 생성 중... ✨" : "질문하기 →"}
      </button>

      {answer && (
        <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          <span className="font-semibold text-emerald-700">AI-Eric 강사: </span>
          {answer}
        </div>
      )}
    </div>
  )
}
