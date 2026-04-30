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
  subtitle: string
  emoji: string
  difficulty: "입문" | "초급" | "중급" | "고급"
  description: string
  color: string
  bgColor: string
  elevation: number
  image: string
  stages: Stage[]
}

export const mountains: Mountain[] = [
  {
    id: "terminal",
    name: "터미널 기초산",
    subtitle: "관악산 — 등산복 입기 전에 신발 끈부터",
    emoji: "⌨️",
    difficulty: "입문",
    description: "명령줄을 두려워하지 마세요! 터미널은 개발자의 가장 강력한 도구입니다.",
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-green-50",
    elevation: 632,
    image: "https://images.unsplash.com/photo-1552190067-05168724cf89?w=1200&q=80",
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
3. Enter 키 누르기

### 터미널 vs Finder
Finder로 파일을 클릭해서 여는 것처럼, 터미널은 같은 일을 **타이핑**으로 합니다.
\`\`\`bash
# Finder에서 클릭하는 대신
open .    # 현재 폴더를 Finder로 열기
\`\`\``,
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

### mkdir & touch — 만들기
\`\`\`bash
mkdir my-project      # 폴더 만들기
touch index.html      # 빈 파일 만들기
\`\`\`

### rm — 삭제 (⚠️ 조심!)
\`\`\`bash
rm 파일이름           # 파일 삭제
rm -rf 폴더이름       # 폴더 통째로 삭제 (복구 불가!)
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
        id: "terminal-rest-makgeolli",
        title: "🍶 막걸리 타임 — 터미널 꾸미기",
        description: "잠깐 쉬어가요! 땀도 닦고 터미널을 내 취향대로 꾸며봅시다.",
        prerequisites: ["기본 터미널 명령어를 안다"],
        content: `## 🍶 첫 번째 쉬는 타임

관악산 정상 근처 막걸리 집에 들어왔습니다. 파전 한 장에 막걸리 한 사발.

지금까지 열심히 올라왔으니 잠깐 숨 고르기!

---

## 터미널, 이왕이면 예쁘게

등산화도 내 발에 맞게 길들이듯, 터미널도 내 취향대로 세팅하면 훨씬 즐거워요.

### 터미널 테마 바꾸기 (Mac iTerm2)
\`\`\`bash
# iTerm2 설치 (Homebrew 필요)
brew install --cask iterm2
\`\`\`
iTerm2 → Preferences → Profiles → Colors → Color Presets에서 **Solarized Dark** 추천!

### Oh My Zsh — 터미널의 등산복
\`\`\`bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
\`\`\`
설치하면 폴더 경로, Git 상태가 한눈에 보여요.

### 유용한 별명(alias) 만들기
\`\`\`bash
# ~/.zshrc 파일에 추가
alias ll='ls -la'
alias ..='cd ..'
alias home='cd ~'
\`\`\`

### 꿀팁 3가지
- **Tab**: 명령어/파일명 자동완성
- **화살표 위/아래**: 이전 명령어 불러오기
- **Ctrl + L**: 화면 깨끗하게 지우기 (clear와 동일)

막걸리 한 잔 마셨으니 다시 올라갑시다! 🏔️`,
        quiz: [
          {
            question: "터미널에서 명령어를 자동완성하는 키는?",
            options: ["Enter", "Tab", "Space", "Ctrl+C"],
            correct: 1,
            explanation: "Tab 키를 누르면 파일명이나 명령어를 자동으로 완성해줍니다. 오타를 줄이는 핵심 습관이에요!"
          },
          {
            question: "이전에 입력했던 명령어를 다시 불러오려면?",
            options: ["Ctrl+Z", "화살표 위 키", "Ctrl+C", "Tab"],
            correct: 1,
            explanation: "키보드 위 화살표를 누르면 이전 명령어가 나타나요. 긴 명령어 반복 입력할 때 아주 유용!"
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

### Homebrew (Mac 전용) — 등산 장비 상점
\`\`\`bash
# Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 설치 확인
brew --version

# 프로그램 설치
brew install node
brew install git

# 설치된 목록 보기
brew list
\`\`\`

### npm (Node.js 패키지 매니저) — 개발자 장비 창고
\`\`\`bash
npm install 패키지이름          # 현재 프로젝트에 설치
npm install -g 패키지이름       # 전역 설치 (어디서든 사용)
npm uninstall 패키지이름        # 삭제
npm list                        # 설치된 패키지 목록
\`\`\`

### 자주 쓰는 전역 패키지들
\`\`\`bash
npm install -g @anthropic-ai/claude-code   # AI 코딩
npm install -g vercel                       # 배포
npm install -g typescript                   # 타입스크립트
\`\`\``,
        quiz: [
          {
            question: "Homebrew는 무엇인가요?",
            options: ["커피 브랜드", "Mac용 패키지 매니저", "코드 에디터", "터미널 앱"],
            correct: 1,
            explanation: "Homebrew는 Mac에서 프로그램을 터미널로 쉽게 설치할 수 있는 패키지 매니저입니다!"
          },
          {
            question: "npm install -g 의 -g 플래그는 무엇을 의미하나요?",
            options: ["그래픽 모드", "전역(global) 설치", "Git 연동", "GPU 사용"],
            correct: 1,
            explanation: "-g는 global의 약자로, 컴퓨터 어디서든 사용할 수 있도록 전역 설치합니다."
          }
        ]
      },
      {
        id: "terminal-practice",
        title: "💪 실습 — 나만의 프로젝트 폴더 만들기",
        description: "배운 것을 직접 해봐요! 실제로 폴더를 만들고 파일을 생성해봅니다.",
        prerequisites: ["기본 명령어를 알고 패키지 매니저를 설치했다"],
        content: `## 💪 직접 해보는 시간!

아는 것과 해보는 것은 다릅니다. 지금 바로 터미널을 열고 따라해봐요.

### 미션: 나만의 개발 폴더 구조 만들기

\`\`\`bash
# 1. 홈 폴더로 이동
cd ~

# 2. 개발 폴더 만들기
mkdir Developer
cd Developer

# 3. 첫 프로젝트 폴더 만들기
mkdir my-first-project
cd my-first-project

# 4. 파일 만들기
touch index.html
touch style.css
touch README.md

# 5. 잘 만들어졌는지 확인
ls -la
\`\`\`

### index.html에 내용 넣기
\`\`\`bash
echo "<!DOCTYPE html><html><body><h1>안녕하세요!</h1></body></html>" > index.html
cat index.html   # 내용 확인
\`\`\`

### 브라우저로 열어보기
\`\`\`bash
open index.html
\`\`\`

**🎉 축하해요!** 터미널로 첫 HTML 파일을 만들고 열었어요!

이제 터미널이 조금 친근하게 느껴지시나요? 🏔️`,
        quiz: [
          {
            question: "파일 내용을 터미널에서 확인하는 명령어는?",
            options: ["read", "open", "cat", "show"],
            correct: 2,
            explanation: "cat 명령어로 파일 내용을 터미널에서 바로 확인할 수 있어요!"
          },
          {
            question: "echo \"내용\" > 파일명 은 무엇을 하나요?",
            options: ["파일을 삭제한다", "파일 내용을 출력한다", "파일에 내용을 쓴다", "파일을 복사한다"],
            correct: 2,
            explanation: "> 는 리다이렉션 연산자로, echo의 출력을 파일에 저장합니다."
          }
        ]
      },
      {
        id: "terminal-scenery",
        title: "🌄 경치 감상 — 파일 시스템의 풍경",
        description: "잠깐 멈춰서 전체 지형을 내려다볼 시간. 컴퓨터 내부 구조를 이해해봐요.",
        prerequisites: ["기본 명령어 실습을 완료했다"],
        content: `## 🌄 정상에서 내려다보는 풍경

등산하다 보면 가끔 멈춰서 지나온 길을 내려다보게 됩니다.
코딩도 마찬가지예요. 잠깐 멈추고 **전체 구조**를 이해해봐요.

---

## 컴퓨터의 지도 — 파일 시스템

\`\`\`
/ (루트, 산 정상)
├── Users/
│   └── yourname/     ← 여기가 홈(~)
│       ├── Desktop/
│       ├── Documents/
│       └── Developer/ ← 우리가 만든 폴더
├── Applications/
└── System/
\`\`\`

### 핵심 경로 외우기
\`\`\`bash
~           # 홈 디렉토리 (/Users/yourname)
.           # 현재 디렉토리
..          # 상위 디렉토리
/           # 루트 디렉토리 (최상위)
\`\`\`

### 절대 경로 vs 상대 경로
\`\`\`bash
# 절대 경로 — 지도에서 GPS 좌표처럼
/Users/yourname/Developer/my-project

# 상대 경로 — "거기서 오른쪽으로 두 블록"처럼
cd ./my-project
cd ../../Documents
\`\`\`

### 숨김 파일 보기
점(.)으로 시작하는 파일은 숨김 파일입니다.
\`\`\`bash
ls -la      # 숨김 파일 포함 모두 보기
# .env, .gitignore 같은 설정 파일들이 여기 있어요
\`\`\`

이제 터미널에서 길을 잃지 않겠죠? 🗺️`,
        quiz: [
          {
            question: "터미널에서 ~ (물결표)는 무엇을 의미하나요?",
            options: ["루트 디렉토리", "홈 디렉토리", "현재 디렉토리", "상위 디렉토리"],
            correct: 1,
            explanation: "~는 현재 사용자의 홈 디렉토리를 가리킵니다. /Users/yourname과 동일해요!"
          },
          {
            question: "숨김 파일을 포함해서 파일 목록을 보려면?",
            options: ["ls", "ls -l", "ls -la", "ls --hidden"],
            correct: 2,
            explanation: "ls -la 는 숨김파일(-a)을 포함해서 자세한 정보(-l)를 보여줍니다."
          }
        ]
      }
    ]
  },
  {
    id: "git",
    name: "Git 기초산",
    subtitle: "북한산 — 언제든 되돌아올 수 있어야 진짜 등산",
    emoji: "🌿",
    difficulty: "초급",
    description: "코드의 역사를 기록하고 실수를 되돌릴 수 있는 버전 관리를 배웁니다.",
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    elevation: 836,
    image: "https://images.unsplash.com/photo-1637070891585-02d98d6e96b1?w=1200&q=80",
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

등산으로 비유하면, Git은 **등산 로그 앱**입니다.
어느 지점에서 쉬었는지, 어느 경로로 왔는지 기록해두면 나중에 그 지점으로 돌아갈 수 있어요.

### Git 설치 확인
\`\`\`bash
git --version
# git version 2.xx.x 가 나오면 설치된 것!
\`\`\`

없으면 설치:
\`\`\`bash
brew install git
\`\`\`

### 핵심 개념 3가지
- **Repository (레포)**: 코드가 저장되는 폴더 (= 등산 로그북)
- **Commit**: 변경사항을 저장하는 것 (= 중간 체크포인트 기록)
- **Branch**: 독립적인 작업 공간 (= 다른 등산 루트)`,
        quiz: [
          {
            question: "Git은 무엇인가요?",
            options: ["텍스트 에디터", "버전 관리 시스템", "프로그래밍 언어", "운영 체제"],
            correct: 1,
            explanation: "Git은 코드의 변경 이력을 관리하는 버전 관리 시스템입니다!"
          },
          {
            question: "Git에서 'Commit'이란?",
            options: ["코드를 삭제하는 것", "변경사항을 저장하는 체크포인트", "인터넷에 업로드하는 것", "새 파일을 만드는 것"],
            correct: 1,
            explanation: "커밋은 현재 상태를 스냅샷으로 저장하는 것입니다. 언제든 이 시점으로 돌아올 수 있어요!"
          }
        ]
      },
      {
        id: "git-basics",
        title: "Git 기본 명령어",
        description: "init, add, commit — Git의 핵심 3단계",
        prerequisites: ["Git이 무엇인지 안다"],
        content: `## Git 3단계 워크플로우

### 1단계: init — 등산 로그북 시작
\`\`\`bash
git init
# Initialized empty Git repository
\`\`\`

### 2단계: add — 기록할 것들 선택
\`\`\`bash
git add 파일이름      # 특정 파일만
git add .            # 모든 변경 파일
\`\`\`

### 3단계: commit — 체크포인트 저장
\`\`\`bash
git commit -m "무엇을 했는지 설명"
\`\`\`

### 상태 확인
\`\`\`bash
git status           # 현재 상태 보기
git log              # 커밋 기록 보기
git log --oneline    # 한 줄 요약으로 보기
\`\`\`

### 좋은 커밋 메시지 쓰는 법
\`\`\`bash
# ❌ 나쁜 예
git commit -m "수정"
git commit -m "asdf"

# ✅ 좋은 예
git commit -m "로그인 버튼 클릭 시 에러 수정"
git commit -m "메인 페이지 UI 추가"
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
          },
          {
            question: "커밋 기록을 한 줄 요약으로 보는 명령어는?",
            options: ["git log", "git log --oneline", "git history", "git list"],
            correct: 1,
            explanation: "git log --oneline 은 각 커밋을 한 줄로 요약해서 보여줘서 전체 히스토리를 파악하기 좋아요!"
          }
        ]
      },
      {
        id: "git-pajeon-break",
        title: "🥘 파전 타임 — .gitignore 마스터",
        description: "배낭에 뭘 넣고 뭘 빼야 할지 알아야죠. 올려서는 안 될 파일들을 배웁니다.",
        prerequisites: ["Git 기본 명령어를 안다"],
        content: `## 🥘 파전 먹으러 막걸리 집에!

북한산 올라가다 보면 파전 냄새에 발이 멈추죠.
코딩도 중간에 이런 꿀팁 타임이 있어야 합니다.

---

## .gitignore — 배낭에 넣지 말 것들

등산 갈 때 여권은 안 챙기죠? 코드도 마찬가지.
올려서는 안 되는 파일들이 있어요.

### .gitignore 파일 만들기
\`\`\`bash
touch .gitignore
\`\`\`

### 꼭 제외해야 할 것들
\`\`\`gitignore
# API 키, 비밀번호 (절대 올리면 안 됨!)
.env
.env.local
.env.production

# 자동 생성되는 폴더 (용량만 차지)
node_modules/
.next/
dist/
build/

# 시스템 파일
.DS_Store
Thumbs.db

# IDE 설정
.vscode/
.idea/
\`\`\`

### .gitignore 잘 만들어주는 사이트
[gitignore.io](https://www.toptal.com/developers/gitignore) 에서 사용 기술을 입력하면 자동 생성!

\`\`\`bash
# 예: Node.js 프로젝트용 .gitignore 자동 생성
curl -sL https://www.toptal.com/developers/gitignore/api/node > .gitignore
\`\`\`

### 이미 올라간 파일 제거하기
\`\`\`bash
git rm --cached 파일이름    # Git 추적 중지 (파일은 유지)
\`\`\`

파전 한 장 다 먹었으니 다시 출발! 🥾`,
        quiz: [
          {
            question: ".gitignore는 무엇을 하는 파일인가요?",
            options: ["Git을 삭제하는 파일", "Git에서 추적하지 않을 파일을 지정", "커밋 메시지 템플릿", "Git 설정 파일"],
            correct: 1,
            explanation: ".gitignore에 적힌 파일/폴더는 Git이 무시합니다. API 키나 node_modules 같은 것들을 여기에 넣어요!"
          },
          {
            question: "절대 Git에 올려서는 안 되는 파일은?",
            options: ["README.md", "index.html", ".env (API 키 포함)", "package.json"],
            correct: 2,
            explanation: ".env 파일에는 API 키, 비밀번호 같은 민감 정보가 있어요. 절대 GitHub에 올리면 안 됩니다!"
          }
        ]
      },
      {
        id: "github",
        title: "GitHub 연동",
        description: "내 코드를 인터넷에 올려봐요!",
        prerequisites: [".gitignore를 만들었다"],
        content: `## GitHub — 클라우드 코드 저장소

GitHub은 Git 저장소를 인터넷에 올려두는 서비스입니다.
마치 등산 로그를 클라우드에 백업해두는 것처럼요!

### 기본 원격 연결
\`\`\`bash
git remote add origin https://github.com/아이디/레포이름.git
git branch -M main
git push -u origin main
\`\`\`

### 일상적인 작업 흐름
\`\`\`bash
# 아침: 최신 코드 가져오기
git pull

# 작업 후: 저장하고 올리기
git add .
git commit -m "오늘 작업 내용"
git push
\`\`\`

### 자주 쓰는 명령어
\`\`\`bash
git remote -v           # 연결된 원격 저장소 확인
git push origin main    # main 브랜치 올리기
git clone URL           # 남의 코드 복사해오기
\`\`\``,
        quiz: [
          {
            question: "git push는 무엇을 하나요?",
            options: ["코드를 다운로드", "로컬 커밋을 원격에 업로드", "새 브랜치 생성", "파일 삭제"],
            correct: 1,
            explanation: "git push는 내 컴퓨터의 커밋을 GitHub 같은 원격 저장소에 업로드합니다."
          },
          {
            question: "다른 사람의 GitHub 프로젝트를 내 컴퓨터로 복사하려면?",
            options: ["git copy", "git download", "git clone", "git pull"],
            correct: 2,
            explanation: "git clone URL 명령어로 원격 저장소를 내 컴퓨터에 복사할 수 있어요!"
          }
        ]
      },
      {
        id: "git-branch-photo",
        title: "📸 사진 찍기 — 브랜치로 안전하게",
        description: "같은 산을 다른 루트로! 브랜치를 사용해 안전하게 실험해봐요.",
        prerequisites: ["GitHub 연동을 완료했다"],
        content: `## 📸 등산 사진 찍는 것처럼 — 브랜치

등산 중 멋진 경치를 발견하면 사진을 찍잖아요.
원본 풍경은 그대로 두고, 사진으로 순간을 포착하는 것처럼
**브랜치**는 메인 코드는 건드리지 않고 안전하게 실험하는 공간입니다.

### 브랜치 기본
\`\`\`bash
git branch                    # 현재 브랜치 목록
git branch feature/login      # 새 브랜치 만들기
git checkout feature/login    # 그 브랜치로 이동
git checkout -b feature/login # 만들면서 바로 이동 (단축)
\`\`\`

### 브랜치 합치기 (Merge)
\`\`\`bash
git checkout main             # 메인으로 돌아오기
git merge feature/login       # feature/login을 메인에 합치기
\`\`\`

### 실전 브랜치 전략
\`\`\`bash
# 새 기능 개발할 때
git checkout -b feature/새기능이름

# 버그 고칠 때
git checkout -b fix/버그이름

# 작업 완료 후
git checkout main
git merge feature/새기능이름
git branch -d feature/새기능이름  # 완료된 브랜치 삭제
\`\`\`

브랜치를 잘 쓰면 메인 코드가 항상 안전해요! 📸`,
        quiz: [
          {
            question: "브랜치를 만들면서 바로 이동하는 명령어는?",
            options: ["git branch new", "git checkout -b 브랜치명", "git new branch", "git switch --create"],
            correct: 1,
            explanation: "git checkout -b 브랜치명 으로 브랜치를 만들면서 바로 이동할 수 있어요!"
          },
          {
            question: "브랜치를 사용하는 주된 이유는?",
            options: ["코드를 삭제하기 위해", "메인 코드를 건드리지 않고 안전하게 개발", "파일을 압축하기 위해", "인터넷 속도 향상"],
            correct: 1,
            explanation: "브랜치는 메인(main) 브랜치에 영향 없이 새 기능을 개발하거나 버그를 수정할 수 있게 해줍니다!"
          }
        ]
      }
    ]
  },
  {
    id: "claude-code-setup",
    name: "Claude Code 설치산",
    subtitle: "설악산 — AI라는 셰르파를 처음 만나는 곳",
    emoji: "🤖",
    difficulty: "초급",
    description: "AI 코딩 어시스턴트 Claude Code를 설치하고 첫 대화를 나눠봅니다.",
    color: "from-purple-400 to-violet-600",
    bgColor: "bg-purple-50",
    elevation: 1708,
    image: "https://images.unsplash.com/photo-1700061291361-b8aa1f40abb8?w=1200&q=80",
    stages: [
      {
        id: "what-is-claude-code",
        title: "Claude Code란?",
        description: "터미널에서 AI와 함께 코딩하는 혁명적인 도구",
        prerequisites: ["터미널 기본 명령어를 안다", "npm을 알고 있다"],
        content: `## Claude Code — AI 페어 프로그래머

Claude Code는 **터미널에서 실행되는 AI 코딩 어시스턴트**입니다.

설악산에서 셰르파를 고용하는 것처럼,
Claude Code는 코딩 여정 내내 옆에서 도와주는 AI 파트너예요.

### 무엇이 가능한가요?
- 💬 코드에 대해 질문하고 답변 받기
- ✍️ 코드 작성/수정/삭제 요청
- 🐛 버그 찾기
- 🏗️ 프로젝트 구조 설계
- 🚀 전체 프로젝트 만들기

### 바이브 코딩이란?
**바이브 코딩 = AI에게 원하는 것을 말로 설명하면 AI가 코드를 작성해주는 방식**

\`\`\`
개발자: "사용자 목록을 카드 형태로 보여주는 React 컴포넌트 만들어줘"
Claude: [코드 작성, 파일 생성, 설명까지 해줌]
\`\`\`

### Claude Code vs ChatGPT 차이
| | ChatGPT | Claude Code |
|---|---|---|
| 코드 직접 실행 | ❌ | ✅ |
| 파일 읽기/쓰기 | ❌ | ✅ |
| 프로젝트 전체 파악 | ❌ | ✅ |`,
        quiz: [
          {
            question: "Claude Code는 어디서 실행되나요?",
            options: ["웹 브라우저", "터미널(CLI)", "데스크탑 앱", "모바일 앱"],
            correct: 1,
            explanation: "Claude Code는 터미널(CLI)에서 실행됩니다!"
          },
          {
            question: "Claude Code가 ChatGPT와 다른 핵심 차이는?",
            options: ["더 똑똑하다", "무료다", "파일을 직접 읽고 쓸 수 있다", "한국어를 잘한다"],
            correct: 2,
            explanation: "Claude Code는 실제 프로젝트 파일을 읽고, 쓰고, 실행할 수 있어요. 단순 대화가 아닌 실제 개발이 가능합니다!"
          }
        ]
      },
      {
        id: "install-claude-code",
        title: "Claude Code 설치",
        description: "npm으로 Claude Code를 설치해봅시다.",
        prerequisites: ["Node.js와 npm이 설치되어 있다"],
        content: `## Claude Code 설치하기

### 1. Node.js 버전 확인 (v18 이상 필요)
\`\`\`bash
node --version
# v18.0.0 이상이어야 해요

# 버전이 낮으면 업데이트
brew install node
\`\`\`

### 2. Claude Code 설치
\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

### 3. 설치 확인
\`\`\`bash
claude --version
\`\`\`

### 4. 첫 실행 및 API 키 설정
\`\`\`bash
mkdir my-project
cd my-project
claude
\`\`\`
처음 실행하면 API 키를 요청합니다.
[console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key

### API 키 입력 방법
\`\`\`bash
# 방법 1: 환경변수 설정 (추천)
export ANTHROPIC_API_KEY=sk-ant-...

# 방법 2: .env 파일
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
\`\`\``,
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
          },
          {
            question: "Claude Code 실행에 필요한 것은?",
            options: ["인터넷만 있으면 됨", "Anthropic API 키", "유료 구독", "특별한 컴퓨터"],
            correct: 1,
            explanation: "Claude Code는 Anthropic API 키가 필요합니다. console.anthropic.com에서 발급받을 수 있어요!"
          }
        ]
      },
      {
        id: "claude-code-nature",
        title: "🌿 자연을 느끼며 — Claude Code 생태계",
        description: "설악산의 단풍처럼 아름다운 Claude Code 명령어들을 감상해봐요.",
        prerequisites: ["Claude Code를 설치했다"],
        content: `## 🌿 설악산 단풍 감상하듯 — Claude Code 생태계

설악산 단풍은 그냥 보면 그냥 나무지만,
알고 보면 수십 년의 시간이 담긴 생태계예요.

Claude Code도 마찬가지. 겉으로는 채팅창 같지만 안을 들여다보면 놀라운 기능들이 있어요.

---

## 슬래시 명령어 (/ Commands)

\`\`\`bash
# Claude Code 실행 후
/help          # 전체 도움말
/clear         # 대화 초기화
/exit          # 종료
/compact       # 대화 요약 (토큰 절약)
\`\`\`

## CLAUDE.md — Claude Code의 기억

프로젝트 루트에 CLAUDE.md 파일을 만들면
Claude가 이 내용을 항상 기억합니다.

\`\`\`markdown
# 프로젝트 설명
이 프로젝트는 Next.js + TypeScript로 만든 블로그입니다.

# 코딩 규칙
- 한국어로 주석 작성
- 함수명은 camelCase
- 탭 대신 스페이스 2칸

# 금지 사항
- console.log 남기지 않기
- any 타입 사용 금지
\`\`\`

## 파일 직접 지정하기
\`\`\`bash
claude "이 파일 리뷰해줘" --file src/index.ts
\`\`\`

## 대화 없이 바로 실행
\`\`\`bash
claude -p "package.json 분석해줘"
\`\`\`

아는 만큼 보이는 게 자연이고, Claude Code예요 🍁`,
        quiz: [
          {
            question: "CLAUDE.md 파일의 역할은?",
            options: ["Claude Code 설치 방법", "Claude가 항상 참고하는 프로젝트 설명서", "API 키 저장소", "에러 로그"],
            correct: 1,
            explanation: "CLAUDE.md는 Claude Code가 프로젝트를 이해하는 데 도움이 되는 가이드라인 파일이에요!"
          },
          {
            question: "Claude Code에서 대화를 초기화하는 슬래시 명령어는?",
            options: ["/reset", "/new", "/clear", "/start"],
            correct: 2,
            explanation: "/clear 명령어로 대화 기록을 초기화할 수 있어요. 새로운 작업을 시작할 때 유용합니다!"
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

### 대화 예시 1 — 파일 만들기
\`\`\`
You: "Hello, World!"를 출력하는 Python 파일 만들어줘
Claude: 물론이죠! hello.py 파일을 만들겠습니다.
[파일 자동 생성]
\`\`\`

### 대화 예시 2 — 코드 설명 요청
\`\`\`
You: 이 코드가 뭘 하는지 한국어로 설명해줘
Claude: 이 코드는... [상세 설명]
\`\`\`

### 대화 예시 3 — 버그 수정
\`\`\`
You: 이 에러 메시지가 왜 나오는지 알려줘
Claude: 이 에러는... [원인 + 해결책]
\`\`\`

### 유용한 단축키
- **Ctrl+C**: 현재 작업 중단
- **/** 입력: 슬래시 명령어 목록
- **Shift+Tab**: 자동 승인 모드 (위험하니 처음엔 비추)

### 핵심 팁
자연어로 편하게 말하면 됩니다. 구체적으로 설명할수록 더 좋아요!`,
        quiz: [
          {
            question: "Claude Code에서 작업을 중단하려면?",
            options: ["Ctrl+Z", "Ctrl+C", "Ctrl+X", "Ctrl+Q"],
            correct: 1,
            explanation: "Ctrl+C로 현재 작업을 중단할 수 있습니다!"
          },
          {
            question: "Claude Code에게 요청할 때 좋은 방법은?",
            options: ["최대한 짧게 한 단어로", "자연어로 구체적으로 설명", "코드만 붙여넣기", "영어로만 질문"],
            correct: 1,
            explanation: "Claude Code는 한국어 자연어를 잘 이해합니다. 구체적으로 설명할수록 더 정확한 결과가 나와요!"
          }
        ]
      },
      {
        id: "claude-code-practice",
        title: "💪 실습 — Claude Code로 실제 파일 만들기",
        description: "직접 Claude Code와 대화해서 파일을 만들고 수정해봐요.",
        prerequisites: ["첫 대화하기를 완료했다"],
        content: `## 💪 직접 Claude Code 써보기!

말로만 배우면 소용없죠. 지금 바로 실습해봐요!

### 미션 1: 간단한 HTML 페이지
터미널을 열고 Claude Code를 실행한 뒤:
\`\`\`
"내 이름과 좋아하는 것 3가지를 보여주는 HTML 파일 만들어줘.
 배경은 파란색, 글씨는 흰색으로 해줘"
\`\`\`

### 미션 2: 코드 수정 요청
\`\`\`
"방금 만든 파일에서 배경색을 보라색으로 바꾸고
 내 이름을 더 크게 표시해줘"
\`\`\`

### 미션 3: 코드 설명 듣기
\`\`\`
"이 HTML 파일에서 style 태그 안에 있는 코드가
 각각 무슨 역할인지 한 줄씩 설명해줘"
\`\`\`

### 미션 4: 버그 만들고 고치기
\`\`\`
"HTML 파일에 일부러 문법 오류를 만들어줘.
 그리고 내가 찾아볼게"
\`\`\`
못 찾겠으면:
\`\`\`
"어디에 오류가 있는지 힌트 줘"
\`\`\`

**🎉 셰르파(Claude Code)와 함께라면 설악산도 거뜬합니다!**`,
        quiz: [
          {
            question: "Claude Code에게 수정을 요청할 때 가장 좋은 방법은?",
            options: ["코드를 직접 수정한다", "무엇을 어떻게 바꾸고 싶은지 자연어로 설명", "새 파일을 만들라고 한다", "에러 메시지만 붙여넣는다"],
            correct: 1,
            explanation: "Claude Code는 자연어 지시를 이해합니다. '배경색을 파란색으로 바꿔줘'처럼 원하는 것을 그냥 말하면 돼요!"
          }
        ]
      }
    ]
  },
  {
    id: "vibe-coding",
    name: "바이브 코딩산",
    subtitle: "지리산 — 말만 잘해도 코드가 써진다",
    emoji: "🎵",
    difficulty: "중급",
    description: "AI와 함께하는 바이브 코딩의 모든 것. 프롬프트 작성부터 실전까지!",
    color: "from-pink-400 to-rose-600",
    bgColor: "bg-pink-50",
    elevation: 1915,
    image: "https://images.unsplash.com/photo-1740329289233-acf55a0fa187?w=1200&q=80",
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

### 좋은 프롬프트의 4가지 요소
1. **목적** — 무엇을 만들고 싶은지
2. **기술 스택** — 어떤 언어/프레임워크
3. **핵심 기능** — 필수 기능 목록
4. **제약 조건** — 하면 안 되는 것들

### 프롬프트 패턴 모음
\`\`\`
# 만들기
"[기술]로 [기능]을 하는 [결과물]을 만들어줘"

# 수정하기
"[파일명]에서 [현재 상태]를 [원하는 상태]로 바꿔줘"

# 설명 요청
"[코드/개념]이 어떻게 동작하는지 초보자에게 설명하듯 알려줘"

# 버그 수정
"이 에러가 왜 나는지 알려주고 고쳐줘: [에러 메시지]"
\`\`\``,
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
          },
          {
            question: "'사이트 만들어줘'가 나쁜 프롬프트인 이유는?",
            options: ["너무 길어서", "한국어라서", "구체적인 정보가 없어서", "명령어가 아니라서"],
            correct: 2,
            explanation: "AI는 구체적인 정보가 없으면 추측해서 작업합니다. 원하는 것과 다른 결과가 나올 수 있어요!"
          }
        ]
      },
      {
        id: "vibe-rest-makgeolli",
        title: "🍶 막걸리 타임 — 반복 작업 자동화",
        description: "지리산 산장에서 쉬며 반복 작업을 AI에게 맡기는 법을 배워요.",
        prerequisites: ["좋은 프롬프트 쓰기를 배웠다"],
        content: `## 🍶 지리산 산장 막걸리 타임

천왕봉 오르다 산장에서 막걸리 한 잔.
"이 일을 매번 내가 해야 하나?" 생각이 드는 순간이죠.

---

## AI에게 반복 작업 맡기기

### 지겨운 작업 TOP 5 (다 Claude가 합니다)

**1. 비슷한 컴포넌트 여러 개 만들기**
\`\`\`
"UserCard, ProductCard, OrderCard 컴포넌트를 같은 스타일로 만들어줘.
 각각 이미지, 제목, 설명, 버튼이 있어야 해"
\`\`\`

**2. 타입 정의 자동 생성**
\`\`\`
"이 API 응답 JSON을 보고 TypeScript 타입을 만들어줘:
 { id: 1, name: '홍길동', email: 'test@test.com' }"
\`\`\`

**3. 테스트 코드 작성**
\`\`\`
"이 함수에 대한 Jest 단위 테스트를 작성해줘.
 정상 케이스 3개, 에러 케이스 2개 포함해줘"
\`\`\`

**4. 주석 & 문서화**
\`\`\`
"이 파일 전체에 한국어 주석을 추가해줘.
 함수마다 무슨 역할인지, 파라미터가 뭔지 설명해줘"
\`\`\`

**5. 코드 리팩토링**
\`\`\`
"이 코드를 더 읽기 좋게 리팩토링해줘.
 함수를 분리하고 변수명을 명확하게 해줘"
\`\`\`

막걸리 마시는 동안 Claude가 코드 짜주는 세상 🍶`,
        quiz: [
          {
            question: "바이브 코딩으로 가장 효율적으로 할 수 있는 작업은?",
            options: [
              "알고리즘 문제 풀기",
              "반복적이고 패턴이 있는 코드 작성",
              "수학 공식 계산",
              "디자인 작업"
            ],
            correct: 1,
            explanation: "비슷한 컴포넌트 여러 개, 타입 정의, 테스트 코드 같은 반복 패턴 작업을 Claude에게 맡기면 시간을 크게 절약할 수 있어요!"
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

### 2. 큰 그림 먼저 (설계)
\`\`\`
"할 일 관리 앱을 만들려고 해.
 Next.js + TypeScript + Tailwind로 시작하고 싶어.
 프로젝트 구조랑 필요한 파일들을 먼저 계획해줘"
\`\`\`

### 3. 기능별로 나눠서 요청
\`\`\`
"먼저 기본 UI 레이아웃만 만들어줘"
"이제 할 일 추가 기능 구현해줘"
"localStorage에 저장하는 기능 추가해줘"
"마지막으로 완료/삭제 기능 추가해줘"
\`\`\`

### 4. 자주 저장하기
\`\`\`bash
git add . && git commit -m "기본 UI 완성"
git add . && git commit -m "할 일 추가 기능"
\`\`\`

### 황금 팁
- 막히면: "이게 왜 안 되는지 설명해줘"
- 이해하기: "이 코드가 무슨 역할인지 설명해줘"
- 대안 탐색: "다른 방법은 없어?"
- 코드 리뷰: "이 코드에서 개선할 점이 있어?"`,
        quiz: [
          {
            question: "바이브 코딩에서 좋은 습관은?",
            options: [
              "모든 기능을 한 번에 요청하기",
              "코드를 이해하려 하지 않기",
              "기능별로 나눠서 요청하고 자주 커밋하기",
              "가능한 한 적게 커밋하기"
            ],
            correct: 2,
            explanation: "기능을 작게 나눠서 요청하고 자주 커밋하면 문제를 빠르게 발견하고 되돌리기도 쉬워요!"
          },
          {
            question: "코드가 왜 안 되는지 모를 때 Claude에게 어떻게 물어보면 좋을까요?",
            options: [
              "\"고쳐줘\"",
              "\"이게 왜 안 되는지 설명해줘\"",
              "\"전부 다시 짜줘\"",
              "아무 말도 안 한다"
            ],
            correct: 1,
            explanation: "\"왜 안 되는지 설명해줘\"라고 하면 Claude가 원인을 분석하고 이해할 수 있게 설명해줍니다. 그냥 고쳐달라고만 하면 같은 실수를 반복하게 돼요!"
          }
        ]
      },
      {
        id: "debugging-with-ai",
        title: "🔍 버그 사냥 — AI와 함께 디버깅",
        description: "에러를 만났을 때 AI를 활용해 빠르게 해결하는 방법을 배워요.",
        prerequisites: ["바이브 코딩 워크플로우를 안다"],
        content: `## 🔍 에러는 적이 아니라 스승

지리산 길을 걷다가 길을 잃어도 당황하지 마세요.
지도(Claude)가 있으니까요!

### 에러 해결 3단계

**1단계: 에러 메시지 그대로 붙여넣기**
\`\`\`
Claude에게:
"이 에러가 뭔지 설명해주고 어떻게 고쳐야 하는지 알려줘:

TypeError: Cannot read properties of undefined (reading 'map')
  at HomePage (app/page.tsx:23)"
\`\`\`

**2단계: 에러 난 파일도 같이 보여주기**
\`\`\`
"에러 난 부분이 있는 파일을 봐줘"
→ Claude가 파일을 직접 읽고 분석해줌
\`\`\`

**3단계: 왜 이런 에러가 났는지 이해하기**
\`\`\`
"이 에러가 왜 발생했는지 초보자도 이해하게 설명해줘"
\`\`\`

### 자주 만나는 에러들
\`\`\`
# undefined 에러
"Cannot read property 'X' of undefined"
→ 데이터가 아직 안 왔는데 접근했을 때

# 타입 에러 (TypeScript)
"Type 'string' is not assignable to type 'number'"
→ 타입이 맞지 않을 때

# 모듈 에러
"Module not found: Can't resolve './components/Button'"
→ 파일 경로가 틀렸을 때
\`\`\`

### 예방이 최선
\`\`\`
"이 코드에서 에러가 발생할 수 있는 부분을 미리 찾아줘"
\`\`\``,
        quiz: [
          {
            question: "Claude에게 에러를 가져갈 때 가장 좋은 방법은?",
            options: [
              "에러 메시지만 붙여넣기",
              "에러 메시지 + 관련 코드 + 어떤 상황인지 설명",
              "스크린샷 첨부",
              "\"에러 났어\" 한 마디만"
            ],
            correct: 1,
            explanation: "에러 메시지와 함께 관련 코드, 어떤 상황에서 발생했는지 알려주면 Claude가 훨씬 정확하게 도와줄 수 있어요!"
          }
        ]
      },
      {
        id: "vibe-practice",
        title: "💪 실습 — 미니 앱 바이브 코딩",
        description: "처음부터 끝까지 Claude와 함께 간단한 앱을 만들어봐요.",
        prerequisites: ["디버깅 방법을 알고 있다"],
        content: `## 💪 나만의 미니 앱 만들기!

지금까지 배운 모든 것을 활용해봐요.

### 미션: 랜덤 명언 앱 만들기

**Claude에게 이렇게 요청해봐요:**

**Step 1 — 프로젝트 시작**
\`\`\`
"Next.js + Tailwind로 랜덤 명언을 보여주는 앱을 만들려고 해.
 버튼 클릭하면 새 명언이 나오고, 명언 10개는 파일에 저장해줘.
 UI는 심플하고 예쁘게 해줘. 먼저 프로젝트 구조를 짜줘"
\`\`\`

**Step 2 — 기능 추가**
\`\`\`
"좋아요 버튼 추가해줘. 누른 명언은 하트가 빨간색이 되고
 localStorage에 저장돼서 새로고침해도 유지돼야 해"
\`\`\`

**Step 3 — 스타일 개선**
\`\`\`
"명언이 바뀔 때 fade-in 애니메이션 추가해줘"
\`\`\`

**Step 4 — 배포 준비**
\`\`\`
git add .
git commit -m "feat: 랜덤 명언 앱 완성"
git push
\`\`\`

**🏆 완성! 지리산 천왕봉에 오른 기분이죠?**

이제 이 경험을 바탕으로 더 큰 프로젝트에 도전해봐요!`,
        quiz: [
          {
            question: "바이브 코딩으로 앱을 만들 때 첫 번째로 할 일은?",
            options: [
              "코드부터 작성",
              "디자인 먼저",
              "Claude에게 전체 구조와 계획을 먼저 물어보기",
              "패키지 설치"
            ],
            correct: 2,
            explanation: "먼저 Claude에게 어떤 구조로 만들지 계획을 짜달라고 하면, 전체 방향을 잡고 체계적으로 개발할 수 있어요!"
          }
        ]
      }
    ]
  },
  {
    id: "first-project",
    name: "첫 프로젝트산",
    subtitle: "한라산 — 여기까지 왔으면 못 만들 게 없다",
    emoji: "🚀",
    difficulty: "중급",
    description: "처음부터 끝까지 실제 앱을 만들고 배포해봅니다!",
    color: "from-blue-400 to-cyan-600",
    bgColor: "bg-blue-50",
    elevation: 1950,
    image: "https://images.unsplash.com/photo-1637052298263-a18c4e2605ff?w=1200&q=80",
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
- ✅ 1-3일 안에 완성 가능

### 추천 첫 프로젝트
1. **Todo 앱** — 할 일 추가/삭제/완료
2. **날씨 앱** — 현재 날씨 보여주기
3. **포트폴리오** — 나를 소개하는 페이지
4. **링크 모음** — 자주 쓰는 링크 저장
5. **단어장** — 외국어 단어 학습

### Claude에게 기획 도움 받기
\`\`\`
"Todo 앱을 만들고 싶어.
 필요한 기능 목록, 기술 스택, 예상 파일 구조를 추천해줘.
 초보자도 2일 안에 완성할 수 있는 범위로"
\`\`\`

### PRD (Product Requirements Document) 만들기
\`\`\`
"내 프로젝트 요구사항을 정리한 PRD를 마크다운으로 만들어줘.
 목적, 타겟 사용자, 핵심 기능, 기술 스택을 포함해줘"
\`\`\``,
        quiz: [
          {
            question: "좋은 첫 프로젝트의 조건이 아닌 것은?",
            options: ["작고 명확한 범위", "내가 실제로 쓰고 싶은 것", "1-3일 안에 완성 가능", "최대한 많은 기능 포함"],
            correct: 3,
            explanation: "첫 프로젝트는 범위를 작게 잡아야 완성할 수 있어요. 기능이 많을수록 중도 포기 확률이 높아집니다!"
          },
          {
            question: "PRD란 무엇인가요?",
            options: ["프로그래밍 언어", "제품 요구사항 문서", "Git 명령어", "배포 도구"],
            correct: 1,
            explanation: "PRD (Product Requirements Document)는 무엇을 왜 만들지 정의하는 문서예요. Claude에게 만들어달라고 할 수 있어요!"
          }
        ]
      },
      {
        id: "project-makgeolli",
        title: "🍶 정상 막걸리 — 코드 품질 점검",
        description: "한라산 정상 근처에서 잠깐 쉬며 내 코드를 돌아봐요.",
        prerequisites: ["프로젝트 기획을 마쳤다"],
        content: `## 🍶 한라산 백록담 앞 막걸리

정상이 코앞인데 잠깐 쉬어가는 여유.
완성 직전에 코드 품질을 한 번 점검해봐요.

---

## Claude에게 코드 리뷰 받기

### 전체 파일 리뷰
\`\`\`
"이 프로젝트 전체를 리뷰해줘.
 개선할 점, 버그 가능성, 보안 문제를 알려줘"
\`\`\`

### 특정 부분 리뷰
\`\`\`
"이 함수가 너무 길고 복잡한 것 같아.
 더 읽기 좋게 리팩토링해줘"
\`\`\`

### 성능 점검
\`\`\`
"이 컴포넌트가 불필요하게 많이 렌더링될 것 같아.
 최적화 방법 알려줘"
\`\`\`

### 보안 점검
\`\`\`
"사용자 입력을 받는 부분에서 보안 문제는 없는지 확인해줘"
\`\`\`

### 좋은 코드 체크리스트
- [ ] 변수/함수명이 명확한가?
- [ ] 중복 코드가 없는가?
- [ ] 에러 처리가 되어 있는가?
- [ ] 콘솔 로그가 남아있지 않은가?
- [ ] .env에 API 키가 있는가? (gitignore 확인!)

막걸리 한 잔 마시고 마지막 올라가봅시다! 🏔️`,
        quiz: [
          {
            question: "코드 리뷰에서 가장 먼저 확인해야 할 것은?",
            options: ["코드가 예쁜가", "API 키가 .env에 있고 gitignore에 포함되어 있는가", "주석이 많은가", "파일 이름이 영어인가"],
            correct: 1,
            explanation: "API 키가 코드에 직접 들어가거나 GitHub에 올라가면 큰 보안 사고가 발생할 수 있어요. 배포 전 반드시 확인하세요!"
          }
        ]
      },
      {
        id: "photo-spot",
        title: "📸 인증샷 — 나만의 포트폴리오",
        description: "완성된 프로젝트를 예쁘게 소개하는 README를 만들어봐요.",
        prerequisites: ["코드 리뷰를 마쳤다"],
        content: `## 📸 등산 인증샷처럼 — README 만들기

정상에 올랐으면 인증샷은 필수!
좋은 프로젝트엔 좋은 README가 있어요.

### Claude에게 README 만들기
\`\`\`
"이 프로젝트의 README.md를 만들어줘.
 프로젝트 설명, 기능 목록, 설치 방법, 사용 방법, 기술 스택을 포함해줘.
 이모지도 넣어서 읽기 좋게 해줘"
\`\`\`

### 좋은 README 구성
\`\`\`markdown
# 프로젝트 이름 🚀

> 한 줄 소개

## ✨ 기능
- 기능 1
- 기능 2

## 🛠 기술 스택
- Next.js
- Tailwind CSS

## 🚀 시작하기
\`\`\`bash
npm install
npm run dev
\`\`\`

## 📸 스크린샷
[이미지]

## 👤 만든 사람
홍길동
\`\`\`

### 스크린샷 찍기
\`\`\`bash
# Mac 스크린샷: Cmd + Shift + 4
# 찍은 후 프로젝트에 images/ 폴더 만들어 저장
mkdir images
\`\`\`

README가 좋으면 GitHub 방문자가 5배 늘어요! 📸`,
        quiz: [
          {
            question: "README.md에 꼭 포함해야 할 내용이 아닌 것은?",
            options: ["프로젝트 설명", "설치 방법", "개발자의 주민등록번호", "기술 스택"],
            correct: 2,
            explanation: "README에는 프로젝트 설명, 설치 방법, 기술 스택 등을 포함하면 됩니다. 개인정보는 절대 올리면 안 돼요!"
          }
        ]
      },
      {
        id: "build-and-deploy",
        title: "빌드 & 배포",
        description: "만든 앱을 인터넷에 올려봅니다.",
        prerequisites: ["README를 완성했다"],
        content: `## Vercel로 배포하기

드디어 세상에 내놓을 시간!

### 배포 전 체크리스트
\`\`\`bash
# 1. 빌드 오류 없는지 확인
npm run build

# 2. 환경변수 확인
cat .env.local
# .gitignore에 포함됐는지 확인

# 3. 최종 커밋
git add .
git commit -m "feat: 배포 준비 완료"
git push
\`\`\`

### Vercel 배포 (GitHub 연동)
1. vercel.com 접속 → GitHub 로그인
2. "Add New → Project"
3. GitHub 저장소 선택 → Import
4. **Environment Variables**에 .env 내용 입력
5. Deploy 클릭!

### Vercel CLI로 배포
\`\`\`bash
npm install -g vercel
vercel login
vercel --prod
\`\`\`

### 배포 후 해야 할 일
\`\`\`
1. 실제 URL로 접속해서 모든 기능 테스트
2. 모바일에서도 확인
3. 친구/가족에게 URL 공유! 🎉
4. GitHub README에 배포 URL 추가
\`\`\`

GitHub push할 때마다 **자동 재배포**됩니다.`,
        quiz: [
          {
            question: "배포 전 반드시 해야 할 것은?",
            options: [
              "모든 주석 삭제",
              "npm run build로 빌드 오류 확인 + API 키 환경변수 확인",
              "코드를 모두 영어로 변경",
              "파일 용량 줄이기"
            ],
            correct: 1,
            explanation: "배포 전 반드시 빌드 오류가 없는지 확인하고, API 키 같은 민감 정보가 환경변수로 처리됐는지 확인해야 해요!"
          }
        ]
      },
      {
        id: "summit-celebration",
        title: "🏔️ 정상 등정 — 다음 산을 바라보며",
        description: "한라산 정상에서 지나온 길을 돌아보고 앞으로의 여정을 계획해요.",
        prerequisites: ["앱을 성공적으로 배포했다"],
        content: `## 🏔️ 백록담에서 바라보는 풍경

드디어 정상입니다. 여기까지 오느라 수고했어요!

---

## 지나온 길 돌아보기

### 당신이 해낸 것들
- ✅ 터미널을 두려워하지 않게 됐다
- ✅ Git으로 코드 버전을 관리할 수 있다
- ✅ Claude Code를 자유롭게 사용한다
- ✅ AI와 함께 앱을 만들 수 있다
- ✅ 인터넷에 배포할 수 있다

---

## 앞으로 오를 산들

### 다음 단계 추천
\`\`\`
1. 데이터베이스 산 (Supabase, Firebase)
   → 데이터를 영구 저장하는 법

2. 인증 산 (NextAuth, Clerk)
   → 로그인/회원가입 구현

3. API 연동 산
   → 날씨, 지도, 결제 API 활용

4. AI 기능 산
   → 내 앱에 AI 기능 추가
\`\`\`

### Claude에게 다음 방향 물어보기
\`\`\`
"나는 지금까지 Next.js로 기본 앱을 만들 수 있어.
 다음으로 배워야 할 것들을 로드맵으로 정리해줘.
 6개월 안에 취업할 수 있는 수준이 목표야"
\`\`\`

---

## 바이브 코딩의 핵심 철학

> 모든 것을 알 필요는 없어요.
> **무엇을 만들고 싶은지**만 알면, Claude가 나머지를 채워줍니다.

**계속 만들고, 계속 배우세요. 🚀**`,
        quiz: [
          {
            question: "바이브 코딩의 핵심 철학은?",
            options: [
              "모든 코드를 외워야 한다",
              "무엇을 만들지 알면 Claude가 나머지를 도와준다",
              "혼자서 모든 것을 해결해야 한다",
              "비싼 도구를 써야 잘할 수 있다"
            ],
            correct: 1,
            explanation: "바이브 코딩은 '무엇을 만들고 싶은가'에 집중합니다. 세부 구현은 Claude와 함께하면 돼요!"
          },
          {
            question: "첫 프로젝트를 완성하고 나서 가장 중요한 것은?",
            options: [
              "쉬기",
              "계속 다음 프로젝트를 만들며 배우기",
              "코드 전부 삭제하기",
              "다른 사람 코드 복사하기"
            ],
            correct: 1,
            explanation: "개발 실력은 계속 만들어봐야 늘어요. 작은 프로젝트라도 꾸준히 만드는 것이 가장 빠른 성장 방법입니다!"
          }
        ]
      }
    ]
  }
]
