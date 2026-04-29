"use client"

import { useState } from "react"

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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, mountainName, stageName, stageContent })
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
        className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-indigo-400/30 text-indigo-300/70 hover:text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-all font-medium text-sm backdrop-blur-sm"
      >
        🤔 모르는 게 있나요? AI 강사에게 질문하기
      </button>
    )
  }

  return (
    <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 backdrop-blur-md p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-indigo-200 flex items-center gap-2 text-sm">
          🤖 AI 강사에게 질문하기
        </h3>
        <button
          onClick={() => { setOpen(false); setAnswer(""); setQuestion("") }}
          className="text-white/30 hover:text-white/60 text-xs transition-colors"
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
        className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400/50 focus:border-indigo-400/40 transition-all"
        rows={3}
      />

      <button
        onClick={handleAsk}
        disabled={loading || !question.trim()}
        className="mt-2 w-full py-2.5 rounded-xl bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 font-medium text-sm disabled:opacity-40 hover:bg-indigo-500/40 transition-all"
      >
        {loading ? "답변 생성 중... ✨" : "질문하기 →"}
      </button>

      {answer && (
        <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
          <span className="font-semibold text-indigo-300">AI 강사: </span>
          {answer}
        </div>
      )}
    </div>
  )
}
