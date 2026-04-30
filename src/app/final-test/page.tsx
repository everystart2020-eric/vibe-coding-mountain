"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Question = {
  mountain: string
  mountainId: string
  color: string
  emoji: string
  question: string
  options: string[]
  correct: number
  explanation: string
  keyPoint: string
}

const QUESTIONS: Question[] = [
  // ── 터미널 기초산 ──────────────────────────────────────────
  {
    mountain: "터미널 기초산",
    mountainId: "terminal",
    color: "from-green-400 to-emerald-600",
    emoji: "⌨️",
    question: "현재 작업 중인 디렉토리 경로를 확인하는 명령어는?",
    options: ["ls", "pwd", "cd ..", "cat"],
    correct: 1,
    explanation: "pwd(Print Working Directory)는 지금 내가 어디 있는지 절대 경로로 알려줍니다. 길을 잃었을 때 가장 먼저 치는 명령어예요!",
    keyPoint: "pwd = 현재 위치 / ls = 파일 목록 / cd = 이동 — 이 셋이 터미널의 기본기입니다.",
  },
  {
    mountain: "터미널 기초산",
    mountainId: "terminal",
    color: "from-green-400 to-emerald-600",
    emoji: "⌨️",
    question: "GitHub에 절대로 올리면 안 되는 파일은?",
    options: ["README.md", "package.json", ".env (API 키, 비밀번호)", "index.html"],
    correct: 2,
    explanation: ".env 파일에는 API 키와 비밀번호가 들어있어요. 반드시 .gitignore에 추가해야 합니다!",
    keyPoint: ".env 파일은 반드시 .gitignore에 추가! 실수로 올리면 API 키를 즉시 재발급해야 합니다.",
  },
  {
    mountain: "터미널 기초산",
    mountainId: "terminal",
    color: "from-green-400 to-emerald-600",
    emoji: "⌨️",
    question: "명령어 파이프(|)의 역할은?",
    options: ["파일을 복사한다", "앞 명령어의 출력을 다음 명령어의 입력으로 연결한다", "두 파일을 합친다", "프로세스를 종료한다"],
    correct: 1,
    explanation: "파이프(|)는 명령어들을 연결하는 통로입니다. ls -la | grep '.ts' 처럼 앞 결과를 다음 명령어로 바로 넘겨줘요.",
    keyPoint: "파이프(|) = 명령어 연결. cat 파일 | grep 키워드 처럼 결과를 바로 다음 명령어로 넘길 수 있어요.",
  },
  {
    mountain: "터미널 기초산",
    mountainId: "terminal",
    color: "from-green-400 to-emerald-600",
    emoji: "⌨️",
    question: "패키지 매니저 npm의 역할은?",
    options: ["코드를 컴파일한다", "외부 라이브러리를 설치하고 관리한다", "서버를 시작한다", "파일을 압축한다"],
    correct: 1,
    explanation: "npm(Node Package Manager)은 React, Next.js 같은 외부 패키지를 설치하고 관리합니다. npm install로 시작해요!",
    keyPoint: "npm install = 패키지 설치 / npm run dev = 개발 서버 실행. node_modules는 .gitignore에 꼭 추가!",
  },

  // ── Git 기초산 ──────────────────────────────────────────
  {
    mountain: "Git 기초산",
    mountainId: "git",
    color: "from-orange-400 to-amber-600",
    emoji: "🌿",
    question: "git commit -m 'message'의 역할은?",
    options: ["파일을 서버에 업로드", "현재 변경사항을 스냅샷으로 저장", "원격 저장소에서 코드를 가져옴", "새 브랜치를 만듦"],
    correct: 1,
    explanation: "커밋은 현재 상태의 스냅샷을 저장합니다. 게임의 세이브 포인트처럼, 언제든 이 시점으로 돌아올 수 있어요!",
    keyPoint: "git add → git commit → git push 순서를 기억! add=선택, commit=저장, push=업로드",
  },
  {
    mountain: "Git 기초산",
    mountainId: "git",
    color: "from-orange-400 to-amber-600",
    emoji: "🌿",
    question: "브랜치를 만들면서 바로 이동하는 명령어는?",
    options: ["git branch new", "git checkout -b 브랜치명", "git new branch", "git create"],
    correct: 1,
    explanation: "git checkout -b 브랜치명 으로 브랜치를 만들면서 바로 이동할 수 있어요!",
    keyPoint: "브랜치 = 안전한 실험 공간. main에서 바로 작업하지 말고 feature 브랜치에서 개발하는 습관을!",
  },
  {
    mountain: "Git 기초산",
    mountainId: "git",
    color: "from-orange-400 to-amber-600",
    emoji: "🌿",
    question: "Merge 충돌(Conflict)이 발생하는 원인은?",
    options: ["인터넷이 끊겼을 때", "두 브랜치에서 같은 파일의 같은 줄을 다르게 수정했을 때", "파일이 너무 클 때", "커밋 메시지가 없을 때"],
    correct: 1,
    explanation: "같은 파일의 같은 줄을 서로 다르게 수정하면 Git이 어느 것을 선택해야 할지 몰라 충돌이 납니다.",
    keyPoint: "충돌 해결 = 파일 직접 수정 → git add → git commit. 작업 전 git pull 습관으로 충돌을 예방하세요!",
  },
  {
    mountain: "Git 기초산",
    mountainId: "git",
    color: "from-orange-400 to-amber-600",
    emoji: "🌿",
    question: "커밋 기록을 한 줄씩 간결하게 보는 명령어는?",
    options: ["git log --full", "git log --oneline", "git history", "git show --brief"],
    correct: 1,
    explanation: "git log --oneline은 각 커밋을 해시 + 메시지 한 줄로 보여줘서 전체 히스토리를 빠르게 파악할 수 있어요!",
    keyPoint: "git log --oneline으로 히스토리 확인, git restore 파일명으로 수정 취소, git reset --hard로 커밋 되돌리기(신중하게!)",
  },

  // ── Claude Code 설치산 ──────────────────────────────────────────
  {
    mountain: "Claude Code 설치산",
    mountainId: "claude-code-setup",
    color: "from-purple-400 to-violet-600",
    emoji: "🤖",
    question: "Claude Code를 터미널에서 실행하는 명령어는?",
    options: ["claude-code", "claude", "ai-code", "run claude"],
    correct: 1,
    explanation: "설치 후 터미널에서 claude 명령어를 입력하면 Claude Code가 실행됩니다!",
    keyPoint: "claude 명령어로 실행 → 프로젝트 폴더에서 실행해야 코드 파일을 인식합니다.",
  },
  {
    mountain: "Claude Code 설치산",
    mountainId: "claude-code-setup",
    color: "from-purple-400 to-violet-600",
    emoji: "🤖",
    question: "CLAUDE.md 파일을 프로젝트에 두면 어떤 점이 좋은가요?",
    options: ["Claude Code가 더 빨리 응답한다", "매번 프로젝트 규칙을 설명하지 않아도 Claude가 자동으로 지킨다", "자동으로 코드가 배포된다", "GitHub에 자동 push된다"],
    correct: 1,
    explanation: "CLAUDE.md는 Claude Code가 항상 먼저 읽는 파일입니다. 기술 스택, 코딩 규칙을 적어두면 매번 설명 불필요!",
    keyPoint: "CLAUDE.md에는 기술 스택, 코딩 규칙, 금지사항을 적어두세요. 한 번 작성하면 매번 설명이 필요 없어요!",
  },
  {
    mountain: "Claude Code 설치산",
    mountainId: "claude-code-setup",
    color: "from-purple-400 to-violet-600",
    emoji: "🤖",
    question: "완전히 다른 새 작업을 시작할 때 먼저 해야 할 일은?",
    options: ["터미널을 완전히 닫고 다시 열기", "/clear로 이전 대화 기록 초기화", "claude를 다시 설치", "컴퓨터 재시작"],
    correct: 1,
    explanation: "/clear로 이전 대화를 초기화하면 새 작업에 집중할 수 있어요. 관련 없는 컨텍스트가 AI를 혼란스럽게 할 수 있습니다!",
    keyPoint: "새 작업 시작 = /clear. 코드 리뷰 요청 = /review. 대화 압축 = /compact. 슬래시 명령어를 익혀두세요!",
  },
  {
    mountain: "Claude Code 설치산",
    mountainId: "claude-code-setup",
    color: "from-purple-400 to-violet-600",
    emoji: "🤖",
    question: "Claude Code에게 요청할 때 가장 효과적인 방법은?",
    options: ["모든 것을 한 번에 요청한다", "가능하면 작은 단위로 나눠서 단계별로 요청한다", "최대한 짧게만 요청한다", "영어로만 요청한다"],
    correct: 1,
    explanation: "큰 작업을 작은 단계로 나눠서 요청하면 Claude Code가 더 정확하게 도와줄 수 있어요!",
    keyPoint: "단계별 요청이 핵심! '쇼핑몰 전체 만들어줘' 보다 '상품 목록 컴포넌트 만들어줘' 처럼 작게 쪼개서 요청하세요.",
  },

  // ── 바이브 코딩산 ──────────────────────────────────────────
  {
    mountain: "바이브 코딩산",
    mountainId: "vibe-coding",
    color: "from-pink-400 to-rose-600",
    emoji: "🎵",
    question: "다음 중 '좋은 프롬프트'의 예시는?",
    options: [
      "사이트 만들어줘",
      "할 일 목록 웹앱을 만들어줘. Next.js, Tailwind 사용하고 추가/삭제/완료 기능, localStorage 저장 필요",
      "코드 짜줘",
      "뭔가 멋진 거 만들어줘",
    ],
    correct: 1,
    explanation: "목적 + 기술 스택 + 핵심 기능 + 제약 조건을 포함한 구체적인 프롬프트가 훨씬 좋은 결과를 만들어요!",
    keyPoint: "좋은 프롬프트 = 목적 + 기술 스택 + 핵심 기능 + 제약 조건. 구체적일수록 원하는 결과에 가까워집니다.",
  },
  {
    mountain: "바이브 코딩산",
    mountainId: "vibe-coding",
    color: "from-pink-400 to-rose-600",
    emoji: "🎵",
    question: "Claude Code 대화가 너무 길어져서 응답이 느려질 때 가장 좋은 해결책은?",
    options: ["컴퓨터를 재시작한다", "/compact으로 대화를 압축하거나 /clear로 새로 시작한다", "더 빠른 인터넷을 사용한다", "Claude Code를 재설치한다"],
    correct: 1,
    explanation: "/compact은 긴 대화를 요약해서 컨텍스트를 줄여줍니다. 완전히 다른 작업이면 /clear가 더 효율적이에요!",
    keyPoint: "컨텍스트 관리: 작업별 /clear 사용, 긴 대화는 /compact으로 압축. 자주 설명하는 내용은 CLAUDE.md에 고정!",
  },
  {
    mountain: "바이브 코딩산",
    mountainId: "vibe-coding",
    color: "from-pink-400 to-rose-600",
    emoji: "🎵",
    question: "역할 지정(Role Prompting)의 장점은?",
    options: ["응답이 더 빠르다", "특정 전문 분야 관점으로 더 깊이 있는 답변을 받을 수 있다", "비용이 절약된다", "한국어로 더 잘 답한다"],
    correct: 1,
    explanation: "'너는 보안 전문가야'처럼 역할을 지정하면 Claude가 그 관점에서 더 전문적으로 분석해줍니다!",
    keyPoint: "역할 지정 = '너는 시니어 React 개발자야.' / 제약 조건 = '라이브러리 없이, 50줄 이하로'. 프롬프트 기술을 연습하세요!",
  },
  {
    mountain: "바이브 코딩산",
    mountainId: "vibe-coding",
    color: "from-pink-400 to-rose-600",
    emoji: "🎵",
    question: "AI 코드 리뷰를 요청할 때 가장 효과적인 방법은?",
    options: ["전체 코드 붙여넣고 '좋아?'라고 묻기", "보안, 성능, 가독성 등 구체적인 관점을 지정해서 요청하기", "에러만 찾아달라고 하기", "리뷰 없이 바로 배포"],
    correct: 1,
    explanation: "'보안 취약점만', '성능 최적화만' 처럼 구체적 관점을 지정하면 더 깊이 있는 리뷰를 받을 수 있어요!",
    keyPoint: "배포 전 코드 리뷰 체크리스트: 보안(사용자 입력 검증) → 성능(불필요한 렌더링) → 가독성 → 에러 처리",
  },

  // ── 첫 프로젝트산 ──────────────────────────────────────────
  {
    mountain: "첫 프로젝트산",
    mountainId: "first-project",
    color: "from-blue-400 to-cyan-600",
    emoji: "🚀",
    question: "좋은 첫 프로젝트의 조건이 아닌 것은?",
    options: ["작고 명확한 범위", "내가 실제로 쓰고 싶은 것", "1-3일 안에 완성 가능", "최첨단 기술을 모두 활용"],
    correct: 3,
    explanation: "첫 프로젝트는 작고 명확하게! 최첨단 기술을 모두 쓰는 것보다 완성하는 경험이 훨씬 중요합니다.",
    keyPoint: "첫 프로젝트 = 작게 + 완성! Todo 앱, 날씨 앱, 포트폴리오처럼 1-3일 안에 끝낼 수 있는 것부터 시작하세요.",
  },
  {
    mountain: "첫 프로젝트산",
    mountainId: "first-project",
    color: "from-blue-400 to-cyan-600",
    emoji: "🚀",
    question: "좋은 컴포넌트 설계의 핵심 원칙은?",
    options: ["가능한 한 모든 기능을 하나에 모으기", "단일 책임 — 컴포넌트 하나는 한 가지 역할만", "props 없이 자체적으로 모든 데이터 관리", "코드가 길수록 좋다"],
    correct: 1,
    explanation: "컴포넌트 하나가 한 가지 역할만 담당하면 재사용하기 쉽고 유지보수도 간단해져요!",
    keyPoint: "컴포넌트 설계: 단일 책임 + props로 데이터 전달 + 50줄 넘으면 분리 고려. 레고 블록처럼 조합 가능하게!",
  },
  {
    mountain: "첫 프로젝트산",
    mountainId: "first-project",
    color: "from-blue-400 to-cyan-600",
    emoji: "🚀",
    question: "외부 API 키를 안전하게 사용하려면?",
    options: ["프론트엔드 코드에 직접 작성", "API Route에서 환경변수(process.env)로 사용", "공개 깃허브에 올리기", "사용자에게 직접 물어보기"],
    correct: 1,
    explanation: "API Route는 서버에서 실행되므로 process.env의 환경변수가 클라이언트에 노출되지 않아요!",
    keyPoint: "API 키 = .env 저장 → process.env로 서버에서만 사용 → 절대 프론트엔드 코드에 직접 쓰지 않기!",
  },
  {
    mountain: "첫 프로젝트산",
    mountainId: "first-project",
    color: "from-blue-400 to-cyan-600",
    emoji: "🚀",
    question: "비동기 API 호출에서 에러를 제대로 처리하려면?",
    options: ["에러가 안 난다고 가정하고 사용", "try-catch 블록으로 에러를 잡아서 사용자에게 적절한 메시지 표시", "에러 나면 페이지 새로고침", "console.error만 있으면 충분"],
    correct: 1,
    explanation: "try-catch로 에러를 잡고 사용자에게 친절한 메시지를 보여주는 게 좋은 UX입니다!",
    keyPoint: "에러 처리 = try-catch + 사용자 친화적 메시지 + 재시도 버튼. undefined 에러는 Optional chaining(?.)으로 예방!",
  },
]

const MOUNTAIN_ORDER = ["terminal", "git", "claude-code-setup", "vibe-coding", "first-project"]

type View = "intro" | "test" | "result"

export default function FinalTestPage() {
  const router = useRouter()
  const [view, setView] = useState<View>("intro")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [selected, setSelected] = useState<number | null>(null)

  const total = QUESTIONS.length
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length
  const pct = Math.round((score / total) * 100)

  const grade =
    pct >= 90
      ? { label: "정상 정복! 🏆", color: "text-yellow-300", bg: "bg-yellow-400/20 border-yellow-400/30" }
      : pct >= 70
      ? { label: "8부 능선 도달 🌄", color: "text-emerald-300", bg: "bg-emerald-400/20 border-emerald-400/30" }
      : pct >= 50
      ? { label: "중간 베이스캠프 ⛺", color: "text-blue-300", bg: "bg-blue-400/20 border-blue-400/30" }
      : { label: "재도전 권장 💪", color: "text-orange-300", bg: "bg-orange-400/20 border-orange-400/30" }

  const mountainStats = MOUNTAIN_ORDER.map((mid) => {
    const qs = QUESTIONS.filter((q) => q.mountainId === mid)
    const correct = qs.filter((q) => {
      const idx = QUESTIONS.indexOf(q)
      return answers[idx] === q.correct
    }).length
    return { id: mid, name: qs[0]?.mountain ?? mid, emoji: qs[0]?.emoji, color: qs[0]?.color, correct, total: qs.length }
  })

  function handleNext() {
    if (selected === null) return
    const next = [...answers]
    next[current] = selected
    setAnswers(next)
    setSelected(null)
    if (current + 1 >= total) {
      setView("result")
    } else {
      setCurrent(current + 1)
    }
  }

  function handleReset() {
    setView("intro")
    setCurrent(0)
    setAnswers(Array(QUESTIONS.length).fill(null))
    setSelected(null)
  }

  // ── 인트로 화면 ───────────────────────────────────────────
  if (view === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📋</div>
            <h1 className="text-3xl font-black text-white mb-2">바이브 코딩 종합 테스트</h1>
            <p className="text-indigo-300 text-sm leading-relaxed">
              5개 산, 20문제로 배운 내용을 점검합니다.<br />
              정답은 마지막에 한번에 확인할 수 있어요.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-8">
            {mountainStats.map((m) => (
              <div key={m.id} className="text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-lg mx-auto mb-1`}>
                  {m.emoji}
                </div>
                <p className="text-white/40 text-xs">{m.total}문항</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-sm text-white/60 space-y-1">
            <p>📌 문항 수: 총 {total}문제 (산별 4문제)</p>
            <p>⏱️ 예상 소요 시간: 10~15분</p>
            <p>📝 정답은 모든 문제 풀고 난 후 한번에 확인</p>
            <p>📄 완료 후 PDF 보고서 저장 가능</p>
          </div>

          <button
            onClick={() => setView("test")}
            className="w-full py-4 rounded-xl font-black text-white text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity shadow-lg"
          >
            테스트 시작하기 →
          </button>
          <button
            onClick={() => router.push("/")}
            className="mt-3 w-full py-3 rounded-xl text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  // ── 테스트 화면 ───────────────────────────────────────────
  if (view === "test") {
    const q = QUESTIONS[current]
    const progressPct = Math.round((current / total) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-4">
        <div className="max-w-lg mx-auto pt-6">
          <div className="mb-6">
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span>{current + 1} / {total} 문제</span>
              <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${q.color} text-white text-xs`}>
                {q.emoji} {q.mountain}
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="bg-white/8 backdrop-blur-md rounded-2xl border border-white/15 p-6 mb-4">
            <p className="text-white font-bold text-base leading-relaxed">{q.question}</p>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                      : "border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  <span className="text-white/40 mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              )
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={selected === null}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 disabled:opacity-30 hover:opacity-90 transition-opacity"
          >
            {current + 1 >= total ? "결과 보기 →" : "다음 문제 →"}
          </button>
        </div>
      </div>
    )
  }

  // ── 결과 화면 ─────────────────────────────────────────────
  return (
    <>
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { background: #0f172a !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .result-wrap { padding: 16px !important; }
          .result-card { break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 result-wrap">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* 헤더 + 점수 */}
          <div className="text-center mb-6 result-card bg-white/8 backdrop-blur-md rounded-2xl border border-white/15 p-6">
            <div className="text-4xl mb-2">📋</div>
            <h1 className="text-2xl font-black text-white mb-1">바이브 코딩 산악 학교</h1>
            <p className="text-white/40 text-xs mb-1">종합 학습 테스트 결과 보고서</p>
            <p className="text-white/25 text-xs mb-5">
              {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <div className="inline-block bg-white/10 border border-white/20 rounded-2xl px-10 py-4 mb-4">
              <p className="text-5xl font-black text-white">
                {score}<span className="text-2xl text-white/40">/{total}</span>
              </p>
              <p className="text-white/50 text-sm mt-1">{pct}점</p>
            </div>

            <div className={`inline-flex px-5 py-2 rounded-full border text-sm font-bold ${grade.bg} ${grade.color}`}>
              {grade.label}
            </div>
          </div>

          {/* 산별 결과 */}
          <div className="mb-5 result-card bg-white/8 backdrop-blur-md rounded-2xl border border-white/15 p-5">
            <h2 className="text-white font-bold text-sm mb-4">📊 산별 결과</h2>
            <div className="flex flex-col gap-3">
              {mountainStats.map((m) => {
                const mpct = Math.round((m.correct / m.total) * 100)
                return (
                  <div key={m.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white/80 text-sm">{m.emoji} {m.name}</span>
                      <span className={`text-xs font-mono font-bold ${mpct === 100 ? "text-emerald-300" : mpct >= 75 ? "text-blue-300" : "text-orange-300"}`}>
                        {m.correct}/{m.total} ({mpct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${m.color} rounded-full`}
                        style={{ width: `${mpct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 전체 문제 정답 확인 */}
          <div className="mb-5 result-card bg-white/8 backdrop-blur-md rounded-2xl border border-white/15 p-5">
            <h2 className="text-white font-bold text-sm mb-4">📝 전체 문제 정답 확인</h2>
            <div className="flex flex-col gap-3">
              {QUESTIONS.map((q, i) => {
                const myAnswer = answers[i]
                const isCorrect = myAnswer === q.correct
                return (
                  <div
                    key={i}
                    className={`result-card rounded-xl p-4 border ${
                      isCorrect
                        ? "bg-emerald-500/10 border-emerald-400/20"
                        : "bg-red-500/10 border-red-400/20"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`text-xs font-bold flex-shrink-0 mt-0.5 ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                        {isCorrect ? "✓" : "✗"} Q{i + 1}.
                      </span>
                      <p className="text-white/90 text-sm font-medium leading-relaxed">{q.question}</p>
                    </div>

                    <div className="flex flex-col gap-1 ml-6 mb-2">
                      {q.options.map((opt, j) => {
                        const isMyPick = myAnswer === j
                        const isRightAnswer = j === q.correct
                        let style = "text-white/30"
                        if (isRightAnswer) style = "text-emerald-300 font-semibold"
                        else if (isMyPick && !isCorrect) style = "text-red-300 line-through"
                        return (
                          <p key={j} className={`text-xs ${style}`}>
                            <span className="font-mono mr-1">{String.fromCharCode(65 + j)}.</span>
                            {opt}
                            {isRightAnswer && <span className="ml-1 text-emerald-400">← 정답</span>}
                            {isMyPick && !isCorrect && <span className="ml-1 text-red-400">← 내 답</span>}
                          </p>
                        )
                      })}
                    </div>

                    {!isCorrect && (
                      <p className="ml-6 text-white/55 text-xs leading-relaxed border-t border-white/10 pt-2">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 핵심 포인트 */}
          <div className="mb-6 result-card bg-indigo-500/10 backdrop-blur-md rounded-2xl border border-indigo-400/20 p-5">
            <h2 className="text-indigo-200 font-bold text-sm mb-4">⭐ 꼭 기억해야 할 핵심 포인트</h2>
            <div className="flex flex-col gap-3">
              {mountainStats.map((m) => {
                const qs = QUESTIONS.filter((q) => q.mountainId === m.id)
                const uniqueKeyPoints = [...new Set(qs.map((q) => q.keyPoint))]
                return (
                  <div key={m.id} className="result-card bg-white/5 rounded-xl p-3 border border-white/10">
                    <p className="text-white/70 text-xs font-bold mb-2">{m.emoji} {m.name}</p>
                    <ul className="flex flex-col gap-1.5">
                      {uniqueKeyPoints.map((kp, i) => (
                        <li key={i} className="text-xs text-white/60 flex gap-2">
                          <span className="text-indigo-400 flex-shrink-0 mt-0.5">•</span>
                          <span className="leading-relaxed">{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 버튼 */}
          <div className="no-print flex flex-col gap-3">
            <button
              onClick={() => window.print()}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity shadow-lg text-base"
            >
              📄 PDF로 저장하기
            </button>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl font-medium text-white/60 border border-white/15 hover:text-white/80 hover:border-white/25 transition-all text-sm"
            >
              🔄 다시 테스트하기
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 rounded-xl text-white/40 hover:text-white/60 text-sm transition-colors"
            >
              ← 홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
