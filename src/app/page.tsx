"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { mountains } from "@/data/mountains"

const STORAGE_KEY = "vibe-progress"

const DIFFICULTY_COLOR: Record<string, string> = {
  입문: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  초급: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  중급: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  고급: "bg-red-500/20 text-red-300 border border-red-500/30",
}

export default function HomePage() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setCompleted(new Set(raw ? JSON.parse(raw) : []))
    } catch {
      setCompleted(new Set())
    }
  }, [])

  const totalStages = mountains.reduce((acc, m) => acc + m.stages.length, 0)
  const doneStages = mountains.reduce(
    (acc, m) => acc + m.stages.filter((s) => completed.has(s.id)).length,
    0
  )
  const overallProgress = totalStages > 0 ? Math.round((doneStages / totalStages) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-4xl mb-5 shadow-xl">
            ⛰️
          </div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
            바이브 코딩 산악 학교
          </h1>
          <p className="text-indigo-300 text-lg leading-relaxed">
            산을 오르듯, 단계별로 배우는 AI 코딩 여정
          </p>
          <p className="text-indigo-400/70 text-sm mt-2">
            Claude Code로 터미널에서 AI와 함께 코딩하는 법을 배워보세요
          </p>
        </div>

        {/* 전체 진행률 */}
        {doneStages > 0 && (
          <div className="mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-bold text-sm">전체 등반 진행률</span>
              <span className="text-indigo-300 text-sm font-mono">{doneStages}/{totalStages} 단계</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-700 shadow-sm shadow-indigo-400/50"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-indigo-400 text-xs mt-2 text-right">{overallProgress}% 완료</p>
          </div>
        )}

        {/* 산 선택 안내 */}
        <div className="mb-6 text-center">
          <p className="text-white/50 text-xs tracking-widest uppercase font-medium mb-1">Mountain Selection</p>
          <h2 className="text-white/80 text-sm font-medium">
            🗺️ 어떤 산부터 오르시겠어요?
          </h2>
        </div>

        {/* 산 카드 목록 */}
        <div className="flex flex-col gap-3">
          {mountains.map((mountain, idx) => {
            const mountainDone = mountain.stages.filter((s) => completed.has(s.id)).length
            const mountainProgress = Math.round((mountainDone / mountain.stages.length) * 100)
            const isCompleted = mountainProgress === 100

            return (
              <Link key={mountain.id} href={`/mountain/${mountain.id}`}>
                <div className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer ${
                  isCompleted
                    ? "border-yellow-400/40"
                    : "border-white/15 hover:border-white/30"
                }`}>
                  {/* 산 배경 이미지 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${mountain.image})` }}
                  />
                  {/* 어두운 오버레이 */}
                  <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px] group-hover:bg-slate-900/65 transition-colors" />
                  {/* 그라디언트 글로우 */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${mountain.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                  <div className="relative p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center gap-1">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mountain.color} flex items-center justify-center text-2xl shadow-lg`}>
                          {isCompleted ? "🏆" : mountain.emoji}
                        </div>
                        <span className="text-white/30 text-xs font-mono">#{idx + 1}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className="text-white font-bold text-base">{mountain.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[mountain.difficulty]}`}>
                            {mountain.difficulty}
                          </span>
                          {isCompleted && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 font-medium">
                              완등 🏆
                            </span>
                          )}
                        </div>
                        <p className="text-indigo-300/60 text-xs italic mb-1">{mountain.subtitle}</p>
                        <p className="text-white/50 text-xs leading-relaxed mb-3">
                          {mountain.description}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${mountain.color} rounded-full transition-all duration-500`}
                              style={{ width: `${mountainProgress}%` }}
                            />
                          </div>
                          <span className="text-white/40 text-xs whitespace-nowrap font-mono">
                            {mountainDone}/{mountain.stages.length}
                          </span>
                          <div className="flex items-center gap-1 text-white/30 text-xs">
                            <span>⛰</span>
                            <span className="font-mono">{mountain.elevation.toLocaleString()}m</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-white/25 group-hover:text-white/60 transition-all text-lg flex-shrink-0 group-hover:translate-x-1 duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 종합 테스트 */}
        <div className="mt-8">
          <Link href="/final-test">
            <div className="group relative rounded-2xl border border-yellow-400/30 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer hover:border-yellow-400/50">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 group-hover:from-yellow-500/20 group-hover:to-orange-500/20 transition-all" />
              <div className="relative p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                  🏆
                </div>
                <div className="flex-1">
                  <h3 className="text-yellow-300 font-bold text-base mb-0.5">종합 등반 테스트</h3>
                  <p className="text-white/50 text-xs leading-relaxed">5개 산 전체 내용을 총정리 · 20문제 · 헷갈리는 부분 분석 · PDF 보고서 저장</p>
                </div>
                <div className="text-yellow-400/50 group-hover:text-yellow-400 transition-all text-lg flex-shrink-0 group-hover:translate-x-1 duration-300">
                  →
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center text-white/20 text-xs space-y-1">
          <p>Claude Code + Next.js로 만든 바이브 코딩 학습 플랫폼</p>
          <p>진행 상황은 브라우저에 자동 저장됩니다</p>
        </div>
      </div>
    </div>
  )
}
