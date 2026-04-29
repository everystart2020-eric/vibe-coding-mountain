"use client"

import { useState } from "react"
import { Quiz } from "@/data/mountains"

type Props = {
  quiz: Quiz[]
  onComplete: () => void
}

export default function QuizSection({ quiz, onComplete }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = quiz[current]
  const isCorrect = selected === q.correct

  function handleSelect(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    setShowExplanation(true)
    if (idx === q.correct) setScore((s) => s + 1)
  }

  function handleNext() {
    if (current + 1 >= quiz.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setShowExplanation(false)
    }
  }

  if (done) {
    const perfect = score === quiz.length
    return (
      <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 backdrop-blur-md p-6 text-center shadow-xl">
        <div className="text-4xl mb-3">{perfect ? "🎉" : "👏"}</div>
        <h3 className="text-xl font-bold text-emerald-300 mb-1">
          {perfect ? "완벽해요!" : "잘했어요!"}
        </h3>
        <p className="text-emerald-200/60 mb-5 text-sm">
          {quiz.length}문제 중 {score}문제 맞혔어요
        </p>
        <button
          onClick={onComplete}
          className="px-6 py-3 rounded-xl bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 font-bold hover:bg-emerald-500/35 transition-all text-sm"
        >
          다음 단계로 이동 →
        </button>
      </div>
    )
  }

  return (
    <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/8 backdrop-blur-md p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-amber-300 text-sm">🧠 이해도 확인 퀴즈</h3>
        <span className="text-xs text-amber-300/60 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-400/20">
          {current + 1} / {quiz.length}
        </span>
      </div>

      {/* 진행바 */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
          style={{ width: `${((current) / quiz.length) * 100}%` }}
        />
      </div>

      <p className="font-semibold text-white/85 mb-4 text-sm leading-relaxed">{q.question}</p>

      <div className="flex flex-col gap-2">
        {q.options.map((opt, idx) => {
          let cls = "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all "
          if (selected === null) {
            cls += "border-white/15 bg-white/5 text-white/70 hover:border-amber-400/40 hover:bg-amber-500/10 hover:text-white/90"
          } else if (idx === q.correct) {
            cls += "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
          } else if (idx === selected) {
            cls += "border-red-400/40 bg-red-500/15 text-red-200"
          } else {
            cls += "border-white/8 bg-white/3 text-white/30"
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
              {idx === q.correct && selected !== null && "✅ "}
              {idx === selected && idx !== q.correct && "❌ "}
              {opt}
            </button>
          )
        })}
      </div>

      {showExplanation && (
        <div className={`mt-4 rounded-xl p-4 text-sm border ${
          isCorrect
            ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200/80"
            : "bg-orange-500/10 border-orange-400/20 text-orange-200/80"
        }`}>
          <span className="font-semibold">{isCorrect ? "정답! 🎉 " : "아쉽지만 괜찮아요! 💪 "}</span>
          {q.explanation}
        </div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          className="mt-3 w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-400/25 text-amber-200 font-bold hover:bg-amber-500/30 transition-all text-sm"
        >
          {current + 1 >= quiz.length ? "결과 보기 →" : "다음 문제 →"}
        </button>
      )}
    </div>
  )
}
