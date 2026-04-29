export type Quiz = {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export type Stage = {
  id: string
  title: string
  description: string
  prerequisites: string[]
  content: string
  quiz: Quiz[]
}

export type Mountain = {
  id: string
  name: string
  emoji: string
  difficulty: "입문" | "초급" | "중급" | "고급"
  description: string
  color: string
  bgColor: string
  elevation: number
  stages: Stage[]
}

export const mountains: Mountain[] = [
  {
    id: "terminal",
    name: "터미널 기초산",
    emoji: "⌨️",
    difficulty: "입문",
    description: "명령줄을 두려워하지 마세요! 터미널은 개발자의 가장 강력한 도구입니다.",
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-green-50",
    elevation: 500,
    stages: [
      {
        id: "what-is-terminal",
        title: "터미널이란?",
        description: "터미널(Terminal)은 텍스트 명령어로 컴퓨터와 대화하는 프로그램입니다.",
        prerequisites: [],
        content: `## 터미널이란 무엇인가요?

터미널은 **텍스트 기반 인터페이스**로 컴퓨터와 대화하는 방법입니다.

마우스 클릭 대신, 명령어를 **타이핑**해서 컴퓨터에게 지시를 내립니다.

### 왜 터미널을 배워야 하나요?
- 🚀 **빠르다** — 마우스보다 훨씬 빠르게 작업 가능
- 💪 **강력하다** — GUI로 할 수 없는 것도 가능
- 🤖 **AI 코딩 필수** — Claude Code는 터미널에서 실행됩니다

### Mac에서 터미널 열기
1. **Spotlight** (Cmd + Space) 열기
2. "Terminal" 입력
3. Enter 키 누르기`,
        quiz: [
          {
            question: "터미널은 어떤 방식으로 컴퓨터와 대화하나요?",
            options: ["마우스 클릭", "텍스트 명령어 입력", "음성 인식", "터치스크린"],
            correct: 1,
            explanation: "터미널은 텍스트 명령어를 입력해서 컴퓨터와 대화합니다. 처음엔 어색하지만 곧 익숙해져요!"
          },
          {
            question: "Mac에서 터미널을 빠르게 여는 단축키는?",
            options: ["Ctrl + T", "Cmd + Space (Spotlight 검색)", "Alt + F4", "Cmd + Tab"],
            correct: 1,
            explanation: "Cmd + Space로 Spotlight를 열고 'Terminal'을 검색하면 빠르게 열 수 있어요."
          }
        ]
      },
      {
        id: "basic-commands",
        title: "기본 명령어",
        description: "ls, cd, pwd — 터미널의 ABC를 배워봅시다.",
        prerequisites: ["터미널이 무엇인지 알고 있다"],
        content: `## 꼭 알아야 할 기본 명령어

### pwd — 현재 위치 확인
\`\`\`bash
pwd
# 결과: /Users/yourname
\`\`\`
"Print Working Directory" — 지금 내가 어디 있는지 알려줍니다.

### ls — 파일 목록 보기
\`\`\`bash
ls
ls -la  # 숨김 파일 포함 자세히 보기
\`\`\`

### cd — 폴더 이동
\`\`\`bash
cd Documents          # Documents 폴더로 이동
cd ..                 # 상위 폴더로 이동
cd ~                  # 홈 폴더로 이동
\`\`\`

### mkdir — 폴더 만들기
\`\`\`bash
mkdir my-project
\`\`\``,
        quiz: [
          {
            question: "현재 터미널이 어느 위치에 있는지 확인하려면?",
            options: ["ls", "pwd", "cd", "mkdir"],
            correct: 1,
            explanation: "pwd (Print Working Directory)로 현재 위치를 확인할 수 있어요!"
          },
          {
            question: "상위 폴더로 이동하려면?",
            options: ["cd up", "cd back", "cd ..", "cd ~"],
            correct: 2,
            explanation: "cd .. 은 부모 디렉토리로 이동한다는 의미입니다."
          },
          {
            question: "현재 폴더의 파일 목록을 보려면?",
            options: ["show", "list", "ls", "dir"],
            correct: 2,
            explanation: "ls (List)로 현재 폴더의 파일과 폴더 목록을 볼 수 있어요."
          }
        ]
      },
      {
        id: "package-manager",
        title: "패키지 매니저",
        description: "npm, brew — 도구를 설치하는 방법을 배웁니다.",
        prerequisites: ["기본 터미널 명령어를 안다"],
        content: `## 패키지 매니저란?

**패키지 매니저**는 프로그램을 쉽게 설치/삭제하는 도구입니다.
앱스토어의 터미널 버전이라고 생각하세요!

### Homebrew (Mac 전용)
\`\`\`bash
# Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 프로그램 설치
brew install node
\`\`\`

### npm (Node.js 패키지 매니저)
\`\`\`bash
npm install 패키지이름
npm install -g 패키지이름   # 전역 설치
\`\`\``,
        quiz: [
          {
            question: "Homebrew는 무엇인가요?",
            options: ["커피 브랜드", "Mac용 패키지 매니저", "코드 에디터", "터미널 앱"],
            correct: 1,
            explanation: "Homebrew는 Mac에서 프로그램을 터미널로 쉽게 설치할 수 있는 패키지 매니저입니다!"
          }
        ]
      }
    ]
  },
  {
    id: "git",
    name: "Git 기초산",
    emoji: "🌿",
    difficulty: "초급",
    description: "코드의 역사를 기록하고 실수를 되돌릴 수 있는 버전 관리를 배웁니다.",
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    elevation: 1200,
    stages: [
      {
        id: "what-is-git",
        title: "Git이란?",
        description: "코드의 타임머신! 언제든 과거로 돌아갈 수 있어요.",
        prerequisites: ["터미널 기본 명령어를 안다"],
        content: `## Git — 코드의 타임머신

Git은 **버전 관리 시스템**입니다.

### 왜 필요한가요?
- 😱 "어제 잘 됐는데 왜 갑자기 안 돼?" → Git으로 어제 버전으로!
- 🤝 여러 사람이 동시에 작업 가능
- 🔒 실수해도 안전 — 언제든 복구 가능

### Git 설치 확인
\`\`\`bash
git --version
\`\`\`

### 핵심 개념
- **Repository (레포)**: 코드가 저장되는 폴더
- **Commit**: 변경사항을 저장하는 것
- **Branch**: 독립적인 작업 공간`,
        quiz: [
          {
            question: "Git은 무엇인가요?",
            options: ["텍스트 에디터", "버전 관리 시스템", "프로그래밍 언어", "운영 체제"],
            correct: 1,
            explanation: "Git은 코드의 변경 이력을 관리하는 버전 관리 시스템입니다!"
          }
        ]
      },
      {
        id: "git-basics",
        title: "Git 기본 명령어",
        description: "init, add, commit — Git의 핵심 3단계",
        prerequisites: ["Git이 무엇인지 안다"],
        content: `## Git 3단계 워크플로우

### 1단계: init
\`\`\`bash
git init
\`\`\`

### 2단계: add
\`\`\`bash
git add .         # 모든 변경 파일 선택
\`\`\`

### 3단계: commit
\`\`\`bash
git commit -m "무엇을 했는지 설명"
\`\`\`

### 상태 확인
\`\`\`bash
git status
git log
\`\`\``,
        quiz: [
          {
            question: "git add . 은 무엇을 하나요?",
            options: ["새 폴더 만들기", "모든 변경 파일을 스테이징", "커밋하기", "브랜치 만들기"],
            correct: 1,
            explanation: "git add .은 현재 디렉토리의 모든 변경된 파일을 스테이징 영역에 추가합니다."
          },
          {
            question: "변경사항을 저장(커밋)하는 명령어는?",
            options: ["git save", "git store", "git commit -m '메시지'", "git push"],
            correct: 2,
            explanation: "git commit -m '메시지' 로 변경사항을 저장합니다."
          }
        ]
      },
      {
        id: "github",
        title: "GitHub 연동",
        description: "내 코드를 인터넷에 올려봐요!",
        prerequisites: ["Git 기본 명령어를 안다"],
        content: `## GitHub — 클라우드 코드 저장소

\`\`\`bash
git remote add origin https://github.com/아이디/레포이름.git
git branch -M main
git push -u origin main
\`\`\`

### 일상적인 작업
\`\`\`bash
git pull          # 원격에서 최신 코드 가져오기
git push          # 내 코드 원격에 올리기
\`\`\``,
        quiz: [
          {
            question: "git push는 무엇을 하나요?",
            options: ["코드를 다운로드", "로컬 커밋을 원격에 업로드", "새 브랜치 생성", "파일 삭제"],
            correct: 1,
            explanation: "git push는 내 컴퓨터의 커밋을 GitHub 같은 원격 저장소에 업로드합니다."
          }
        ]
      }
    ]
  },
  {
    id: "claude-code-setup",
    name: "Claude Code 설치산",
    emoji: "🤖",
    difficulty: "초급",
    description: "AI 코딩 어시스턴트 Claude Code를 설치하고 첫 대화를 나눠봅니다.",
    color: "from-purple-400 to-violet-600",
    bgColor: "bg-purple-50",
    elevation: 1800,
    stages: [
      {
        id: "what-is-claude-code",
        title: "Claude Code란?",
        description: "터미널에서 AI와 함께 코딩하는 혁명적인 도구",
        prerequisites: ["터미널 기본 명령어를 안다", "npm을 알고 있다"],
        content: `## Claude Code — AI 페어 프로그래머

Claude Code는 **터미널에서 실행되는 AI 코딩 어시스턴트**입니다.

### 무엇이 가능한가요?
- 💬 코드에 대해 질문하고 답변 받기
- ✍️ 코드 작성/수정/삭제 요청
- 🐛 버그 찾기
- 🚀 전체 프로젝트 만들기

### 바이브 코딩이란?
**바이브 코딩 = AI에게 원하는 것을 말로 설명하면 AI가 코드를 작성해주는 방식**`,
        quiz: [
          {
            question: "Claude Code는 어디서 실행되나요?",
            options: ["웹 브라우저", "터미널(CLI)", "데스크탑 앱", "모바일 앱"],
            correct: 1,
            explanation: "Claude Code는 터미널(CLI)에서 실행됩니다!"
          }
        ]
      },
      {
        id: "install-claude-code",
        title: "Claude Code 설치",
        description: "npm으로 Claude Code를 설치해봅시다.",
        prerequisites: ["Node.js와 npm이 설치되어 있다"],
        content: `## Claude Code 설치하기

### 1. Node.js 확인
\`\`\`bash
node --version    # v18 이상 필요
\`\`\`

### 2. 설치
\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

### 3. 첫 실행
\`\`\`bash
mkdir my-project
cd my-project
claude
\`\`\`
처음 실행 시 API 키 입력 안내가 나옵니다.`,
        quiz: [
          {
            question: "Claude Code를 설치하는 명령어는?",
            options: [
              "brew install claude",
              "npm install -g @anthropic-ai/claude-code",
              "pip install claude-code",
              "apt-get install claude"
            ],
            correct: 1,
            explanation: "npm install -g @anthropic-ai/claude-code 로 설치합니다. -g 플래그는 전역 설치를 의미해요!"
          }
        ]
      },
      {
        id: "first-conversation",
        title: "첫 대화하기",
        description: "Claude Code와 첫 대화를 나눠봅니다.",
        prerequisites: ["Claude Code가 설치되어 있다"],
        content: `## Claude Code와 첫 대화

\`\`\`bash
mkdir hello-claude
cd hello-claude
claude
\`\`\`

### 대화 예시
\`\`\`
You: "Hello, World!"를 출력하는 Python 파일 만들어줘
Claude: 물론이죠! hello.py 파일을 만들겠습니다.
\`\`\`

### 유용한 단축키
- **Ctrl+C**: 현재 작업 중단
- **/** 입력: 슬래시 명령어 목록

### 핵심 팁
자연어로 편하게 말하면 됩니다. 구체적으로 설명할수록 더 좋아요!`,
        quiz: [
          {
            question: "Claude Code에서 작업을 중단하려면?",
            options: ["Ctrl+Z", "Ctrl+C", "Ctrl+X", "Ctrl+Q"],
            correct: 1,
            explanation: "Ctrl+C로 현재 작업을 중단할 수 있습니다!"
          }
        ]
      }
    ]
  },
  {
    id: "vibe-coding",
    name: "바이브 코딩산",
    emoji: "🎵",
    difficulty: "중급",
    description: "AI와 함께하는 바이브 코딩의 모든 것. 프롬프트 작성부터 실전까지!",
    color: "from-pink-400 to-rose-600",
    bgColor: "bg-pink-50",
    elevation: 2500,
    stages: [
      {
        id: "prompt-basics",
        title: "좋은 프롬프트 쓰기",
        description: "AI에게 명확하게 설명하는 기술을 배웁니다.",
        prerequisites: ["Claude Code를 설치하고 사용해봤다"],
        content: `## 좋은 프롬프트의 비밀

### ❌ 나쁜 프롬프트
> "사이트 만들어줘"

### ✅ 좋은 프롬프트
> "할 일 목록 웹앱을 만들어줘. Next.js와 Tailwind CSS를 사용하고, 할 일 추가/삭제/완료 기능이 필요해. 데이터는 localStorage에 저장해줘."

### 좋은 프롬프트의 요소
1. **목적** — 무엇을 만들고 싶은지
2. **기술 스택** — 어떤 언어/프레임워크
3. **핵심 기능** — 필수 기능 목록
4. **제약 조건** — 하면 안 되는 것들`,
        quiz: [
          {
            question: "좋은 프롬프트에 포함되어야 할 핵심 요소는?",
            options: [
              "최대한 짧게 쓰기",
              "목적, 기술 스택, 핵심 기능, 제약 조건",
              "영어로만 쓰기",
              "코드를 직접 포함하기"
            ],
            correct: 1,
            explanation: "좋은 프롬프트는 무엇을(목적), 어떻게(기술 스택), 어떤 기능, 무엇은 하지 말아야(제약)를 포함합니다."
          }
        ]
      },
      {
        id: "workflow",
        title: "바이브 코딩 워크플로우",
        description: "효율적인 바이브 코딩 흐름을 익힙니다.",
        prerequisites: ["기본 프롬프트 작성을 안다"],
        content: `## 바이브 코딩 황금 워크플로우

### 1. 프로젝트 시작
\`\`\`bash
mkdir my-app && cd my-app
git init
claude
\`\`\`

### 2. 큰 그림 먼저
\`\`\`
"이 프로젝트의 구조를 잡아줘"
"어떤 파일들이 필요한지 계획해줘"
\`\`\`

### 3. 기능별로 나눠서 요청
\`\`\`
"먼저 기본 UI만 만들어줘"
"이제 API 연결 추가해줘"
"마지막으로 스타일링 예쁘게 해줘"
\`\`\`

### 황금 팁
- 막히면: "이게 왜 안 되는지 설명해줘"
- 이해하기: "이 코드가 무슨 역할인지 설명해줘"
- 대안: "다른 방법은 없어?"`,
        quiz: [
          {
            question: "바이브 코딩에서 좋은 습관은?",
            options: [
              "모든 기능을 한 번에 요청하기",
              "코드를 이해하려 하지 않기",
              "기능별로 나눠서 요청하고 자주 테스트하기",
              "가능한 한 적게 커밋하기"
            ],
            correct: 2,
            explanation: "기능을 작게 나눠서 요청하고 자주 테스트하면 문제를 빠르게 발견할 수 있어요!"
          }
        ]
      }
    ]
  },
  {
    id: "first-project",
    name: "첫 프로젝트산",
    emoji: "🚀",
    difficulty: "중급",
    description: "처음부터 끝까지 실제 앱을 만들고 배포해봅니다!",
    color: "from-blue-400 to-cyan-600",
    bgColor: "bg-blue-50",
    elevation: 3000,
    stages: [
      {
        id: "project-planning",
        title: "프로젝트 기획",
        description: "만들고 싶은 것을 명확하게 정의합니다.",
        prerequisites: ["바이브 코딩 워크플로우를 안다"],
        content: `## 첫 프로젝트 기획하기

### 좋은 첫 프로젝트 조건
- ✅ 작고 명확한 범위
- ✅ 내가 실제로 쓰고 싶은 것
- ✅ 1-2일 안에 완성 가능

### 추천 첫 프로젝트
1. **Todo 앱** — 할 일 추가/삭제/완료
2. **날씨 앱** — 현재 날씨 보여주기
3. **포트폴리오** — 나를 소개하는 페이지
4. **계산기** — 사칙연산

Claude에게 이렇게 요청해봐요:
\`\`\`
"Todo 앱을 만들고 싶어. 필요한 기능 목록과 기술 스택을 추천해줘"
\`\`\``,
        quiz: [
          {
            question: "좋은 첫 프로젝트의 조건이 아닌 것은?",
            options: ["작고 명확한 범위", "내가 실제로 쓰고 싶은 것", "1-2일 안에 완성 가능", "최대한 많은 기능 포함"],
            correct: 3,
            explanation: "첫 프로젝트는 범위를 작게 잡아야 완성할 수 있어요!"
          }
        ]
      },
      {
        id: "build-and-deploy",
        title: "빌드 & 배포",
        description: "만든 앱을 인터넷에 올려봅니다.",
        prerequisites: ["프로젝트를 완성했다"],
        content: `## Vercel로 배포하기

### Vercel CLI
\`\`\`bash
npm install -g vercel
vercel login
vercel --prod
\`\`\`

### GitHub 연동 (추천)
1. GitHub에 코드 push
2. vercel.com 접속
3. "New Project" → GitHub 레포 선택
4. "Deploy" 클릭 → 완료!

GitHub push할 때마다 **자동 재배포**됩니다.`,
        quiz: [
          {
            question: "Vercel로 배포할 때 가장 편한 방법은?",
            options: [
              "FTP로 파일 업로드",
              "직접 서버 설정",
              "GitHub 연동 후 자동 배포",
              "이메일로 파일 전송"
            ],
            correct: 2,
            explanation: "GitHub 연동을 하면 코드를 push할 때마다 자동으로 재배포됩니다!"
          }
        ]
      }
    ]
  }
]
