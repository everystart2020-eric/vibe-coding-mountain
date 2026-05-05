"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { mountains } from "@/data/mountains"
import Onboarding, { UserProfile, USER_STORAGE_KEY } from "@/components/Onboarding"

const STORAGE_KEY = "vibe-progress"

const DIFFICULTY_COLOR: Record<string, string> = {
  입문: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  초급: "bg-blue-100 text-blue-700 border border-blue-200",
  중급: "bg-orange-100 text-orange-700 border border-orange-200",
  고급: "bg-red-100 text-red-700 border border-red-200",
}

export default function HomePage() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [user, setUser] = useState<UserProfile | null | undefined>(undefined)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setCompleted(new Set(raw ? JSON.parse(raw) : []))
    } catch {
      setCompleted(new Set())
    }
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY)
      setUser(raw ? JSON.parse(raw) : null)
    } catch {
      setUser(null)
    }
  }, [])

  if (user === undefined) return null
  if (user === null) return <Onboarding onComplete={(profile) => setUser(profile)} />

  const totalStages = mountains.reduce((acc, m) => acc + m.stages.length, 0)
  const doneStages = mountains.reduce(
    (acc, m) => acc + m.stages.filter((s) => completed.has(s.id)).length,
    0
  )
  const overallProgress = totalStages > 0 ? Math.round((doneStages / totalStages) * 100) : 0

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-lg text-4xl mb-5">
            ⛰️
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
            바이브 코딩 산악 학교
          </h1>
          <p className="text-emerald-700 text-lg leading-relaxed">
            산을 오르듯, 단계별로 배우는 AI 코딩 여정
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Claude Code로 터미널에서 AI와 함께 코딩하는 법을 배워보세요
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600">
            <span>👤</span>
            <span className="font-semibold text-gray-800">{user.name}</span>
            <span className="text-gray-300">·</span>
            <span>{user.age}세</span>
            <button
              onClick={() => { localStorage.removeItem(USER_STORAGE_KEY); setUser(null) }}
              className="ml-1 text-gray-300 hover:text-gray-500 text-xs transition-colors"
              title="프로필 초기화"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 전체 진행률 */}
        {doneStages > 0 && (
          <div className="mb-8 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-800 font-bold text-sm">전체 등반 진행률</span>
              <span className="text-emerald-700 text-sm font-mono">{doneStages}/{totalStages} 단계</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-emerald-600 text-xs mt-2 text-right">{overallProgress}% 완료</p>
          </div>
        )}

        {/* 산 선택 안내 */}
        <div className="mb-6 text-center">
          <p className="text-gray-400 text-xs tracking-widest uppercase font-medium mb-1">Mountain Selection</p>
          <h2 className="text-gray-600 text-sm font-medium">
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
              <div key={mountain.id}>
                {idx === 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                      <span className="text-lg">🤖</span>
                      <span className="text-emerald-700 text-xs font-semibold tracking-wide">Claude Code 과정</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
                {mountain.id === "lovable" && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200">
                      <span className="text-lg">💜</span>
                      <span className="text-violet-700 text-xs font-semibold tracking-wide">Lovable 과정</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-medium">NEW</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
                <Link href={`/mountain/${mountain.id}`}>
                <div className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer ${
                  isCompleted
                    ? "border-yellow-300"
                    : "border-gray-300 hover:border-gray-400"
                }`}>
                  {/* 산 배경 이미지 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${mountain.image})` }}
                  />
                  {/* 어두운 오버레이 */}
                  <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors" />
                  {/* 그라디언트 글로우 */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${mountain.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                  <div className="relative p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center gap-1">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mountain.color} flex items-center justify-center text-2xl shadow-lg`}>
                          {isCompleted ? "🏆" : mountain.emoji}
                        </div>
                        <span className="text-white/40 text-xs font-mono">#{idx + 1}</span>
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
                        <p className="text-white/60 text-xs italic mb-1">{mountain.subtitle}</p>
                        <p className="text-white/60 text-xs leading-relaxed mb-3">
                          {mountain.description}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${mountain.color} rounded-full transition-all duration-500`}
                              style={{ width: `${mountainProgress}%` }}
                            />
                          </div>
                          <span className="text-white/50 text-xs whitespace-nowrap font-mono">
                            {mountainDone}/{mountain.stages.length}
                          </span>
                          <div className="flex items-center gap-1 text-white/40 text-xs">
                            <span>⛰</span>
                            <span className="font-mono">{mountain.elevation.toLocaleString()}m</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-white/30 group-hover:text-white/70 transition-all text-lg flex-shrink-0 group-hover:translate-x-1 duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              </div>
            )
          })}
        </div>

        {/* 종합 테스트 */}
        <div className="mt-8">
          <Link href="/final-test">
            <div className="group rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer">
              <div className="p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                  🏆
                </div>
                <div className="flex-1">
                  <h3 className="text-amber-800 font-bold text-base mb-0.5">종합 등반 테스트</h3>
                  <p className="text-amber-700/70 text-xs leading-relaxed">5개 산 전체 내용을 총정리 · 20문제 · 헷갈리는 부분 분석 · PDF 보고서 저장</p>
                </div>
                <div className="text-amber-500 group-hover:text-amber-600 transition-all text-lg flex-shrink-0 group-hover:translate-x-1 duration-300">
                  →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 오프라인 일정 */}
        <div className="mt-4">
          <Link href="/schedule">
            <div className="group rounded-2xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer">
              <div className="p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                  📅
                </div>
                <div className="flex-1">
                  <h3 className="text-emerald-800 font-bold text-base mb-0.5">오프라인 일정 확인</h3>
                  <p className="text-emerald-700/70 text-xs leading-relaxed">5월 매주 토요일 · 링키영어 본사카페 1층 · 시간 선택 가능</p>
                </div>
                <div className="text-emerald-500 group-hover:text-emerald-600 transition-all text-lg flex-shrink-0 group-hover:translate-x-1 duration-300">
                  →
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center text-gray-400 text-xs space-y-1">
          <p>Claude Code + Next.js로 만든 바이브 코딩 학습 플랫폼</p>
          <p>진행 상황은 브라우저에 자동 저장됩니다</p>
        </div>
      </div>
    </div>
  )
}
