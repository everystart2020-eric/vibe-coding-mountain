import Link from "next/link"

const WEEKS = [
  {
    week: 1,
    date: "5월 9일 (토)",
    times: ["오전 11:00", "오후 1:00"],
    confirmed: true,
  },
  {
    week: 2,
    date: "5월 17일 (일) 또는 평일 저녁",
    times: ["미정"],
    confirmed: false,
  },
  {
    week: 3,
    date: "5월 23일 (토)",
    times: ["오전 11:00", "오후 1:00"],
    confirmed: true,
  },
  {
    week: 4,
    date: "5월 30일 (토)",
    times: ["오전 11:00", "오후 1:00"],
    confirmed: true,
  },
]

const VENUE = {
  name: "링키영어 본사카페 1층",
  address: "",
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          ← 홈으로
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-4xl mb-5 shadow-xl">
            📅
          </div>
          <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
            오프라인 일정
          </h1>
          <p className="text-indigo-300 text-base">
            바이브 코딩 산악학교 · 2025년 5월
          </p>
        </div>

        {/* 장소 카드 */}
        <div className="mb-8 rounded-2xl bg-white/8 border border-white/15 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
            📍
          </div>
          <div>
            <p className="text-white/40 text-xs mb-0.5 uppercase tracking-widest">장소</p>
            <p className="text-white font-bold text-base">{VENUE.name}</p>
            {VENUE.address && (
              <p className="text-white/50 text-sm mt-0.5">{VENUE.address}</p>
            )}
          </div>
        </div>

        {/* 주차별 일정 */}
        <div className="flex flex-col gap-3 mb-10">
          {WEEKS.map((w) => (
            <div
              key={w.week}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-sm">{w.week}주</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="text-white font-semibold text-base">{w.date}</p>
                    {!w.confirmed && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/25">
                        미확정
                      </span>
                    )}
                  </div>

                  {w.times[0] === "미정" ? (
                    <p className="text-white/40 text-sm">시간 추후 공지</p>
                  ) : (
                    <div className="flex flex-wrap gap-2 items-center">
                      {w.times.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/25 font-medium"
                        >
                          🕐 {t}
                        </span>
                      ))}
                      <span className="text-white/30 text-xs">중 택 1 확정 예정</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 안내 */}
        <div className="rounded-2xl bg-indigo-500/10 border border-indigo-400/20 p-5 mb-8">
          <h3 className="text-indigo-300 font-semibold text-sm mb-3">📌 참가 안내</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>· 각 주차 시간은 신청자 수렴 후 최종 확정됩니다</li>
            <li>· 노트북을 지참해주세요</li>
            <li>· 사전 온라인 학습 후 오프라인 실습을 진행합니다</li>
          </ul>
        </div>

        <div className="text-center text-white/20 text-xs">
          <p>문의는 강사에게 직접 연락해주세요</p>
        </div>
      </div>
    </div>
  )
}
