"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { mountains, Stage } from "@/data/mountains"
import QuizSection from "@/components/QuizSection"
import AskAI from "@/components/AskAI"

const STORAGE_KEY = "vibe-progress"

function loadProgress(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function saveProgress(completed: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
}

type View = "list" | "content" | "quiz"

export default function MountainPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const mountain = mountains.find((m) => m.id === id)

  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [activeStage, setActiveStage] = useState<Stage | null>(null)
  const [view, setView] = useState<View>("list")

  useEffect(() => {
    setCompleted(loadProgress())
  }, [])

  if (!mountain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <p className="text-white/60 mb-4">산을 찾을 수 없어요.</p>
          <button onClick={() => router.push("/")} className="text-indigo-300 underline hover:text-indigo-200">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  function openStage(stage: Stage) {
    setActiveStage(stage)
    setView("content")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleQuizComplete() {
    if (!activeStage) return
    const next = new Set(completed)
    next.add(activeStage.id)
    setCompleted(next)
    saveProgress(next)

    const stageIdx = mountain!.stages.findIndex((s) => s.id === activeStage.id)
    const nextStage = mountain!.stages[stageIdx + 1]
    if (nextStage) {
      setActiveStage(nextStage)
      setView("content")
    } else {
      setView("list")
      setActiveStage(null)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const doneCount = mountain.stages.filter((s) => completed.has(s.id)).length
  const progress = Math.round((doneCount / mountain.stages.length) * 100)

  if (view === "list" || !activeStage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
        </div>

        {/* 헤더 */}
        <div className={`relative bg-gradient-to-br ${mountain.color} opacity-90`}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
          <div className="relative max-w-2xl mx-auto px-4 py-10">
            <button
              onClick={() => router.push("/")}
              className="mb-6 text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              ← 산 목록으로
            </button>
            <div className="text-5xl mb-3">{mountain.emoji}</div>
            <h1 className="text-3xl font-black text-white mb-1">{mountain.name}</h1>
            <p className="text-white/50 text-sm italic mb-2">{mountain.subtitle}</p>
            <p className="text-white/80 mb-6 leading-relaxed text-sm">{mountain.description}</p>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex justify-between text-sm mb-2 text-white/80">
                <span>등반 진행률</span>
                <span className="font-mono">{doneCount}/{mountain.stages.length} 단계 완료</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 단계 목록 */}
        <div className="relative max-w-2xl mx-auto px-4 py-8">
          <h2 className="text-white/60 text-xs tracking-widest uppercase font-medium mb-5">📍 등반 경로</h2>
          <div className="flex flex-col gap-3">
            {mountain.stages.map((stage, idx) => {
              const isDone = completed.has(stage.id)
              const prevDone = idx === 0 || completed.has(mountain.stages[idx - 1].id)
              const isLocked = !prevDone && !isDone

              return (
                <div key={stage.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border-2 transition-all ${
                      isDone
                        ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                        : isLocked
                        ? "bg-white/5 border-white/15 text-white/25"
                        : "bg-indigo-500/20 border-indigo-400/60 text-indigo-300"
                    }`}>
                      {isDone ? "✓" : isLocked ? "🔒" : idx + 1}
                    </div>
                    {idx < mountain.stages.length - 1 && (
                      <div className={`w-px flex-1 mt-1 ${isDone ? "bg-emerald-400/30" : "bg-white/10"}`} />
                    )}
                  </div>

                  <div
                    className={`flex-1 mb-2 rounded-xl border p-4 transition-all duration-200 ${
                      isDone
                        ? "border-emerald-500/25 bg-emerald-500/10 backdrop-blur-sm"
                        : isLocked
                        ? "border-white/8 bg-white/3 opacity-50"
                        : "border-white/15 bg-white/8 backdrop-blur-md hover:bg-white/12 hover:border-white/25 cursor-pointer hover:shadow-lg"
                    }`}
                    onClick={() => !isLocked && openStage(stage)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`font-bold text-sm ${isLocked ? "text-white/25" : isDone ? "text-emerald-300" : "text-white"}`}>
                          {stage.title}
                        </h3>
                        <p className={`text-xs mt-0.5 ${isLocked ? "text-white/20" : "text-white/50"}`}>
                          {stage.description}
                        </p>
                      </div>
                      {!isLocked && (
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 font-medium ${
                          isDone
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        }`}>
                          {isDone ? "완료 ✓" : "시작 →"}
                        </span>
                      )}
                    </div>

                    {stage.prerequisites.length > 0 && isLocked && (
                      <div className="mt-2">
                        <p className="text-xs text-white/25 font-medium">필요 조건:</p>
                        <ul className="mt-1 flex flex-col gap-0.5">
                          {stage.prerequisites.map((p, i) => (
                            <li key={i} className="text-xs text-white/20 flex items-center gap-1">
                              <span>•</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {progress === 100 && (
            <div className="mt-8 rounded-2xl overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${mountain.color}`} />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
              <div className="relative p-6 text-white text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-xl font-black mb-1">{mountain.name} 정복!</h3>
                <p className="text-white/80 text-sm">이제 다음 산에 도전해보세요!</p>
                <button
                  onClick={() => router.push("/")}
                  className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all"
                >
                  다른 산 보러 가기 →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
      </div>

      {/* 헤더 */}
      <div className={`relative bg-gradient-to-br ${mountain.color}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
        <div className="relative max-w-2xl mx-auto px-4 py-6">
          <button
            onClick={() => { setView("list"); setActiveStage(null) }}
            className="mb-4 text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            ← {mountain.name}으로
          </button>
          <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
            <span>{mountain.emoji}</span>
            <span>{mountain.name}</span>
          </div>
          <h1 className="text-2xl font-black text-white">{activeStage.title}</h1>
          <p className="text-white/70 text-sm mt-1">{activeStage.description}</p>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative max-w-2xl mx-auto px-4 py-6">
        {activeStage.prerequisites.length > 0 && (
          <div className="mb-5 rounded-xl bg-blue-500/10 backdrop-blur-md border border-blue-400/20 p-4">
            <p className="text-sm font-bold text-blue-300 mb-2">📚 이 단계를 위한 기초 지식</p>
            <ul className="flex flex-col gap-1">
              {activeStage.prerequisites.map((p, i) => (
                <li key={i} className="text-sm text-blue-200/70 flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === "content" && (
          <>
            <div
              className="text-white/80 leading-relaxed max-w-none bg-white/8 backdrop-blur-md rounded-2xl border border-white/15 p-6 shadow-xl"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(activeStage.content) }}
            />
            <AskAI
              mountainName={mountain.name}
              stageName={activeStage.title}
              stageContent={activeStage.content}
            />
            <button
              onClick={() => setView("quiz")}
              className={`mt-5 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${mountain.color} hover:opacity-90 transition-opacity shadow-lg relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <span className="relative">이해했어요! 퀴즈 풀기 →</span>
            </button>
          </>
        )}

        {view === "quiz" && (
          <>
            <QuizSection quiz={activeStage.quiz} onComplete={handleQuizComplete} />
            <AskAI
              mountainName={mountain.name}
              stageName={activeStage.title}
              stageContent={activeStage.content}
            />
          </>
        )}
      </div>
    </div>
  )
}

function renderMarkdown(md: string): string {
  return md
    .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre class='bg-black/40 text-emerald-300 rounded-xl p-4 text-xs overflow-x-auto my-3 font-mono leading-relaxed border border-white/10'><code>$2</code></pre>")
    .replace(/^### (.+)$/gm, "<h3 class='text-base font-bold mt-4 mb-2 text-white/90'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-lg font-bold mt-6 mb-3 text-white'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-xl font-black mt-6 mb-3 text-white'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-bold text-white'>$1</strong>")
    .replace(/`([^`\n]+)`/g, "<code class='bg-white/10 px-1.5 py-0.5 rounded text-pink-300 text-xs font-mono border border-white/10'>$1</code>")
    .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc text-white/70 my-0.5'>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li class='ml-4 list-decimal text-white/70 my-0.5'>$2</li>")
    .replace(/\n\n/g, "<p class='my-2'/>")
    .replace(/\n/g, "<br/>")
}
