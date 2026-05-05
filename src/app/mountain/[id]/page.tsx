"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { mountains, Stage } from "@/data/mountains"
import QuizSection from "@/components/QuizSection"
import AskAI from "@/components/AskAI"
import AIPracticeSection from "@/components/AIPracticeSection"
import { aiPractices } from "@/data/aiPractices"

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

type View = "list" | "content" | "quiz" | "practice"

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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center bg-white border border-gray-200 shadow-sm rounded-2xl p-8">
          <p className="text-gray-500 mb-4">산을 찾을 수 없어요.</p>
          <button onClick={() => router.push("/")} className="text-emerald-700 underline hover:text-emerald-600">
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
    const practice = aiPractices[`${mountain!.id}-${activeStage.id}`]
    if (practice) {
      setView("practice")
    } else {
      advanceStage()
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function advanceStage() {
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
      <div className="min-h-screen bg-stone-50 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-70" />
        </div>

        {/* 헤더 — 배경 사진 위에 다크 오버레이 유지 */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${mountain.image})` }}
          />
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className={`absolute inset-0 bg-gradient-to-br ${mountain.color} opacity-30`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
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
          <h2 className="text-gray-400 text-xs tracking-widest uppercase font-medium mb-5">📍 등반 경로</h2>
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
                        ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                        : isLocked
                        ? "bg-gray-100 border-gray-200 text-gray-300"
                        : "bg-emerald-50 border-emerald-400 text-emerald-700"
                    }`}>
                      {isDone ? "✓" : isLocked ? "🔒" : idx + 1}
                    </div>
                    {idx < mountain.stages.length - 1 && (
                      <div className={`w-px flex-1 mt-1 ${isDone ? "bg-emerald-300" : "bg-gray-200"}`} />
                    )}
                  </div>

                  <div
                    className={`flex-1 mb-2 rounded-xl border p-4 transition-all duration-200 ${
                      isDone
                        ? "border-emerald-200 bg-emerald-50"
                        : isLocked
                        ? "border-gray-100 bg-gray-50 opacity-50"
                        : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer hover:shadow-md"
                    }`}
                    onClick={() => !isLocked && openStage(stage)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`font-bold text-sm ${isLocked ? "text-gray-300" : isDone ? "text-emerald-700" : "text-gray-800"}`}>
                          {stage.title}
                        </h3>
                        <p className={`text-xs mt-0.5 ${isLocked ? "text-gray-300" : "text-gray-500"}`}>
                          {stage.description}
                        </p>
                      </div>
                      {!isLocked && (
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 font-medium ${
                          isDone
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {isDone ? "완료 ✓" : "시작 →"}
                        </span>
                      )}
                    </div>

                    {stage.prerequisites.length > 0 && isLocked && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-400 font-medium">필요 조건:</p>
                        <ul className="mt-1 flex flex-col gap-0.5">
                          {stage.prerequisites.map((p, i) => (
                            <li key={i} className="text-xs text-gray-400 flex items-center gap-1">
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
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-70" />
      </div>

      {/* 헤더 — 배경 사진 위에 다크 오버레이 유지 */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mountain.image})` }}
        />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div className={`absolute inset-0 bg-gradient-to-br ${mountain.color} opacity-25`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/70" />
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
          <div className="mb-5 rounded-xl bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm font-bold text-blue-700 mb-2">📚 이 단계를 위한 기초 지식</p>
            <ul className="flex flex-col gap-1">
              {activeStage.prerequisites.map((p, i) => (
                <li key={i} className="text-sm text-blue-700/80 flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === "content" && (
          <>
            <div
              className="text-gray-700 leading-relaxed max-w-none bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(activeStage.content) }}
            />
            <AskAI
              mountainName={mountain.name}
              stageName={activeStage.title}
              stageContent={activeStage.content}
            />
            <button
              onClick={() => setView("quiz")}
              className="mt-5 w-full py-4 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors shadow-sm"
            >
              이해했어요! 퀴즈 풀기 →
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

        {view === "practice" && (() => {
          const practice = aiPractices[`${mountain.id}-${activeStage.id}`]
          if (!practice) return null
          return (
            <AIPracticeSection
              mountainId={mountain.id}
              stageId={activeStage.id}
              practice={practice}
              onComplete={advanceStage}
            />
          )
        })()}
      </div>
    </div>
  )
}

function renderMarkdown(md: string): string {
  return md
    .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre class='bg-gray-100 text-emerald-700 rounded-xl p-4 text-xs overflow-x-auto my-3 font-mono leading-relaxed border border-gray-200'><code>$2</code></pre>")
    .replace(/^### (.+)$/gm, "<h3 class='text-base font-bold mt-4 mb-2 text-gray-700'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-lg font-bold mt-6 mb-3 text-gray-900'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-xl font-black mt-6 mb-3 text-gray-900'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-bold text-gray-900'>$1</strong>")
    .replace(/`([^`\n]+)`/g, "<code class='bg-gray-100 px-1.5 py-0.5 rounded text-pink-600 text-xs font-mono border border-gray-200'>$1</code>")
    .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc text-gray-600 my-0.5'>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li class='ml-4 list-decimal text-gray-600 my-0.5'>$2</li>")
    .replace(/\n\n/g, "<p class='my-2'/>")
    .replace(/\n/g, "<br/>")
}
