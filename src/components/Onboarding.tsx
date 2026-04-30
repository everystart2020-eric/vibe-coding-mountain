"use client"

import { useState } from "react"

export type UserProfile = {
  name: string
  age: number
}

export const USER_STORAGE_KEY = "vibe-user"

type Step = "intro" | "form" | "welcome"

function getWelcomeMessage(name: string, age: number): { title: string; body: string; emoji: string } {
  if (age <= 19) {
    return {
      emoji: "🚀",
      title: `${name}님, 정말 대단해요!`,
      body: `이 나이에 코딩을 시작하다니 엄청난 선택을 하셨어요! 지금 배우는 것들이 미래에 엄청난 무기가 될 거예요. AI와 함께라면 상상하는 모든 것을 만들 수 있어요. 함께 정상에 올라가봐요!`,
    }
  }
  if (age <= 29) {
    return {
      emoji: "✨",
      title: `${name}님, 최고의 타이밍이에요!`,
      body: `20대에 바이브 코딩을 배우는 건 정말 현명한 선택이에요! AI 시대에 가장 앞서 나가는 스킬을 갖추게 될 거예요. 원하는 것은 뭐든 만들 수 있는 슈퍼파워를 얻게 될 거예요!`,
    }
  }
  if (age <= 39) {
    return {
      emoji: "💪",
      title: `${name}님, 최강의 조합이에요!`,
      body: `지금까지 쌓아온 경험과 AI를 결합하면 정말 무적이에요! 바이브 코딩은 복잡한 코딩 없이도 아이디어를 현실로 만들어줘요. 업무 효율도 올라가고 새로운 가능성도 열릴 거예요!`,
    }
  }
  if (age <= 49) {
    return {
      emoji: "🌟",
      title: `${name}님, 도전 정신이 멋있어요!`,
      body: `나이는 숫자일 뿐이에요! AI 코딩은 오히려 경험이 많을수록 더 잘 활용할 수 있어요. 새로운 분야에 도전하는 ${name}님이 정말 대단하고 멋있어 보여요!`,
    }
  }
  return {
    emoji: "🏔️",
    title: `${name}님, 용기가 정말 대단해요!`,
    body: `새로운 것을 배우려는 열정이 정말 감동적이에요! AI가 기술적인 부분을 모두 도와주니까 아이디어만 있으면 돼요. 산을 오르듯 한 걸음씩, 함께 해낼 수 있어요!`,
  }
}

export default function Onboarding({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [step, setStep] = useState<Step>("intro")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  const ageNum = parseInt(age, 10)
  const isFormValid = name.trim().length > 0 && !isNaN(ageNum) && ageNum >= 1 && ageNum <= 120
  const welcome = step === "welcome" && isFormValid ? getWelcomeMessage(name.trim(), ageNum) : null

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid) return
    setStep("welcome")
  }

  function handleComplete() {
    const profile: UserProfile = { name: name.trim(), age: ageNum }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile))
    onComplete(profile)
  }

  // ── 인트로 ───────────────────────────────────────────────
  if (step === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-5xl mb-6 shadow-2xl">
            ⛰️
          </div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
            바이브 코딩<br />산악 학교
          </h1>
          <p className="text-indigo-300 text-base leading-relaxed mb-8">
            산을 오르듯, 단계별로 배우는<br />AI 코딩 여정에 오신 것을 환영해요!
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🗺️</span>
              <div>
                <p className="text-white/80 text-sm font-semibold">5개의 산을 정복하세요</p>
                <p className="text-white/40 text-xs mt-0.5">터미널 · Git · Claude Code · 바이브 코딩 · 첫 프로젝트</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🤖</span>
              <div>
                <p className="text-white/80 text-sm font-semibold">AI-Eric 강사가 항상 함께해요</p>
                <p className="text-white/40 text-xs mt-0.5">모르는 게 있으면 언제든 질문하세요</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📋</span>
              <div>
                <p className="text-white/80 text-sm font-semibold">종합 테스트로 마무리</p>
                <p className="text-white/40 text-xs mt-0.5">20문제 + PDF 보고서 저장까지</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("form")}
            className="w-full py-4 rounded-xl font-black text-white text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity shadow-lg"
          >
            시작하기 →
          </button>
        </div>
      </div>
    )
  }

  // ── 폼 ───────────────────────────────────────────────────
  if (step === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">👋</div>
            <h2 className="text-2xl font-black text-white mb-2">자기소개를 해주세요!</h2>
            <p className="text-indigo-300/70 text-sm">이름과 나이를 알면 더 친근하게 도와드릴 수 있어요</p>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-white/60 text-xs mb-2 font-medium tracking-wide">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예) 홍길동"
                className="w-full rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/25 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/40 transition-all"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-2 font-medium tracking-wide">나이</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="예) 28"
                min={1}
                max={120}
                className="w-full rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/25 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/40 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="mt-2 w-full py-4 rounded-xl font-black text-white text-lg bg-gradient-to-r from-indigo-500 to-purple-500 disabled:opacity-30 hover:opacity-90 transition-opacity shadow-lg"
            >
              다음 →
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── 환영 ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-7xl mb-6">{welcome!.emoji}</div>
        <h2 className="text-3xl font-black text-white mb-4 leading-tight">{welcome!.title}</h2>
        <div className="bg-indigo-500/15 border border-indigo-400/25 rounded-2xl p-5 mb-6">
          <p className="text-indigo-100 text-base leading-relaxed">{welcome!.body}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 text-sm text-white/50">
          산악 학교의 모든 강사진이&nbsp;
          <span className="text-white/80 font-semibold">{name.trim()}님</span>의 등반을 응원합니다! 🎉
        </div>
        <button
          onClick={handleComplete}
          className="w-full py-4 rounded-xl font-black text-white text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity shadow-lg"
        >
          등반 시작! ⛰️
        </button>
      </div>
    </div>
  )
}
