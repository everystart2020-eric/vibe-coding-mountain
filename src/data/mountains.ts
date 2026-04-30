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

### 터미널 열기

**Mac:**
1. **Spotlight** (Cmd + Space) 열기
2. "Terminal" 입력
3. Enter 키 누르기

**Windows:**
1. **시작 버튼** 우클릭 → "Windows Terminal" 선택 (또는 Win + X)
2. 없으면: 시작 메뉴에서 "PowerShell" 검색
3. Windows 11은 기본 설치, Windows 10은 Microsoft Store에서 "Windows Terminal" 설치

### 터미널 vs 파일 탐색기
파일 탐색기(Mac: Finder, Windows: 탐색기)로 클릭하는 것처럼, 터미널은 같은 일을 **타이핑**으로 합니다.
\`\`\`bash
# 파일 탐색기 대신 터미널에서
open .        # Mac: 현재 폴더를 Finder로 열기
explorer .    # Windows: 현재 폴더를 탐색기로 열기
\`\`\``,
        quiz: [
          {
            question: "터미널은 어떤 방식으로 컴퓨터와 대화하나요?",
            options: ["마우스 클릭", "텍스트 명령어 입력", "음성 인식", "터치스크린"],
            correct: 1,
            explanation: "터미널은 텍스트 명령어를 입력해서 컴퓨터와 대화합니다. 처음엔 어색하지만 곧 익숙해져요!"
          },
          {
            question: "Windows에서 터미널(PowerShell/Windows Terminal)을 빠르게 여는 방법은?",
            options: ["Ctrl + T", "시작 버튼 우클릭 → Windows Terminal (또는 Win+X)", "Alt + F4", "Ctrl + Alt + T"],
            correct: 1,
            explanation: "시작 버튼 우클릭 또는 Win+X 단축키로 메뉴를 열면 Windows Terminal을 빠르게 실행할 수 있어요. Mac은 Cmd+Space로 Spotlight 검색 후 Terminal을 입력하면 돼요."
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

### 터미널 업그레이드 — 더 예쁘게!

**Mac — iTerm2 설치:**
\`\`\`bash
# iTerm2 설치 (Homebrew 필요)
brew install --cask iterm2
\`\`\`
iTerm2 → Preferences → Profiles → Colors → Color Presets에서 **Solarized Dark** 추천!

**Windows — Windows Terminal (이미 예쁨!):**
- Windows Terminal은 기본으로 탭, 색상 테마 지원
- 설정(Ctrl+,) → 모양 → **One Half Dark** 테마 추천

### Oh My Zsh — 터미널의 등산복 (Mac/Linux)
\`\`\`bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
\`\`\`
설치하면 폴더 경로, Git 상태가 한눈에 보여요.

**Windows PowerShell 꾸미기 — Oh My Posh:**
\`\`\`powershell
# PowerShell에서 실행
winget install JanDeDobbeleer.OhMyPosh
\`\`\`

### 유용한 별명(alias) 만들기
\`\`\`bash
# Mac/Linux: ~/.zshrc 파일에 추가
alias ll='ls -la'
alias ..='cd ..'
alias home='cd ~'
\`\`\`
\`\`\`powershell
# Windows PowerShell: $PROFILE 파일에 추가
Set-Alias ll Get-ChildItem
function goHome { Set-Location ~ }
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

### Homebrew (Mac) — 등산 장비 상점
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

### winget (Windows 11/10) — 윈도우 등산 장비 상점
\`\`\`powershell
# winget은 Windows 10/11에 기본 내장!
# 설치 확인
winget --version

# 프로그램 설치
winget install OpenJS.NodeJS
winget install Git.Git

# 검색
winget search 프로그램이름
\`\`\`
💡 winget이 없으면 Microsoft Store에서 "앱 설치 관리자" 업데이트 후 재시도!

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
            question: "Mac에서 brew install git, Windows에서는 어떤 명령어로 Git을 설치하나요?",
            options: ["apt-get install git", "winget install Git.Git", "pip install git", "npm install git"],
            correct: 1,
            explanation: "Windows에서는 winget install Git.Git 으로 설치할 수 있어요. winget은 Windows 10/11에 기본 내장된 패키지 매니저입니다!"
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
open index.html       # Mac
start index.html      # Windows
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
      },
      {
        id: "env-vars",
        title: "환경변수 & PATH",
        description: "컴퓨터에 숨겨진 설정들 — .env 파일과 PATH의 비밀",
        prerequisites: ["기본 터미널 명령어를 안다"],
        content: `## 환경변수란?

**환경변수(Environment Variable)**는 프로그램이 동작할 때 참조하는 설정 값입니다.
마치 산장에 미리 세팅해 둔 물·가스·전기 같은 것!

### 자주 쓰는 환경변수 보기
\`\`\`bash
echo $HOME       # 홈 디렉토리 경로
echo $USER       # 현재 사용자 이름
echo $PATH       # 실행 파일 검색 경로
printenv         # 모든 환경변수 보기
\`\`\`

### PATH란?
터미널에서 \`node\`를 치면 컴퓨터가 \`node\` 실행파일을 어디서 찾을까요?
바로 **PATH**에 등록된 폴더들을 순서대로 뒤집니다.
\`\`\`bash
echo $PATH
# /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
# 콜론(:)으로 구분된 폴더 목록이에요
\`\`\`

### .env 파일 — 비밀 노트
API 키, 비밀번호 같은 민감한 정보는 코드에 직접 쓰지 않고
**.env 파일**에 따로 보관합니다.
\`\`\`bash
# .env 파일 내용
ANTHROPIC_API_KEY=sk-ant-xxxx
DATABASE_URL=postgresql://...
PORT=3000
\`\`\`

⚠️ **.env는 절대 GitHub에 올리면 안 돼요!** .gitignore에 추가 필수!

### 환경변수 임시 설정
\`\`\`bash
# Mac/Linux
export MY_NAME="홍길동"
echo $MY_NAME    # 홍길동
\`\`\`
\`\`\`powershell
# Windows PowerShell
$env:MY_NAME = "홍길동"
echo $env:MY_NAME    # 홍길동
\`\`\`
터미널을 닫으면 사라집니다. 영구 저장 방법:
- **Mac:** \`~/.zshrc\` 파일에 \`export MY_NAME="홍길동"\` 추가
- **Windows:** 시스템 속성 → 환경 변수 → 새로 만들기 (또는 PowerShell \`$PROFILE\` 파일에 추가)`,
        quiz: [
          {
            question: "API 키처럼 민감한 정보를 저장하는 올바른 방법은?",
            options: ["코드 파일 안에 직접 쓴다", ".env 파일에 저장하고 .gitignore에 추가", "README에 적어둔다", "이메일로 저장한다"],
            correct: 1,
            explanation: ".env 파일에 저장하고 반드시 .gitignore에 추가해서 GitHub에 올라가지 않도록 해야 해요!"
          },
          {
            question: "PATH 환경변수의 역할은?",
            options: ["현재 폴더 경로를 저장", "터미널 명령어 실행 파일을 찾는 폴더 목록", "홈 디렉토리 위치", "사용자 이름 저장"],
            correct: 1,
            explanation: "PATH는 터미널에서 명령어를 입력했을 때 실행 파일을 어느 폴더에서 찾을지 알려주는 목록이에요."
          },
          {
            question: "export(Mac) 또는 $env:(Windows)로 설정한 환경변수는?",
            options: ["재부팅해도 유지된다", "현재 터미널 세션에서만 유효하다", "다른 컴퓨터에도 공유된다", ".env 파일에 자동 저장된다"],
            correct: 1,
            explanation: "export/$env: 로 설정한 환경변수는 현재 터미널 세션에서만 살아있어요. Mac은 ~/.zshrc에, Windows는 시스템 환경변수 설정 또는 $PROFILE 파일에 추가해야 영구 저장됩니다."
          }
        ]
      },
      {
        id: "pipe-redirect",
        title: "파이프 & 리다이렉션",
        description: "명령어를 연결하는 마법 — |, >, >> 활용법",
        prerequisites: ["기본 터미널 명령어를 안다"],
        content: `## 명령어를 연결하는 마법

등산로가 여러 갈래 이어지듯, 터미널 명령어도 서로 연결할 수 있어요.

### 파이프 | — 출력을 다음 명령어로
\`\`\`bash
ls -la | grep ".js"        # ls 결과에서 .js 파일만 필터
cat file.txt | wc -l       # 파일의 줄 수 세기
history | grep "git"       # 명령어 기록에서 git 관련만 검색
\`\`\`
파이프(\`|\`)는 왼쪽 명령어의 출력을 오른쪽 명령어의 입력으로 넘겨줍니다.

### 리다이렉션 > — 출력을 파일로
\`\`\`bash
echo "안녕하세요" > hello.txt    # 파일 새로 만들기 (덮어씀)
ls -la > file-list.txt           # 파일 목록을 파일로 저장
echo "추가 내용" >> hello.txt    # 파일에 이어쓰기 (덮어쓰지 않음)
\`\`\`

### 자주 쓰는 필터 명령어
\`\`\`bash
grep "검색어" 파일명      # 특정 텍스트가 있는 줄 찾기
grep -r "검색어" .        # 현재 폴더 전체에서 검색
wc -l 파일명              # 줄 수 세기
sort 파일명               # 알파벳 순 정렬
head -10 파일명           # 앞 10줄만 보기
tail -10 파일명           # 뒤 10줄만 보기
tail -f 로그파일          # 실시간으로 로그 보기
\`\`\`

### 실전 예시
\`\`\`bash
# 에러 로그만 파일로 저장
npm run build 2> errors.txt

# 특정 포트 사용 중인 프로세스 찾기
lsof -i :3000 | grep LISTEN

# 로그에서 에러만 골라서 줄 수 세기
cat app.log | grep "ERROR" | wc -l
\`\`\``,
        quiz: [
          {
            question: "ls -la | grep '.ts' 명령어가 하는 일은?",
            options: ["TypeScript 파일을 삭제한다", "파일 목록 중 .ts 확장자 파일만 보여준다", ".ts 파일을 모두 실행한다", "TypeScript를 설치한다"],
            correct: 1,
            explanation: "파이프(|)로 ls 결과를 grep에 넘기면 .ts가 포함된 줄만 필터링해서 보여줍니다!"
          },
          {
            question: "> 와 >> 의 차이는?",
            options: [">는 이어쓰기, >>는 덮어쓰기", ">는 덮어쓰기, >>는 이어쓰기", "둘 다 같다", ">는 읽기, >>는 쓰기"],
            correct: 1,
            explanation: ">는 파일을 새로 만들거나 덮어씁니다. >>는 기존 파일 끝에 내용을 추가해요. 로그 기록할 땐 >>를 써야 기존 내용이 사라지지 않아요!"
          },
          {
            question: "실시간으로 로그 파일 업데이트를 보려면?",
            options: ["cat 파일명", "head 파일명", "tail -f 파일명", "grep 파일명"],
            correct: 2,
            explanation: "tail -f는 파일의 끝부분을 계속 감시하면서 새 내용이 추가되면 실시간으로 보여줍니다. 서버 로그 볼 때 필수!"
          }
        ]
      },
      {
        id: "shell-script",
        title: "🌿 자연을 느끼며 — 셸 스크립트로 자동화",
        description: "반복 작업을 한 번에! 나만의 명령어 만들기",
        prerequisites: ["환경변수와 파이프를 이해했다"],
        content: `## 🌿 터미널의 생태계를 느끼는 시간

관악산 정상에 올라 서울 전경을 내려다보듯,
이제 터미널의 전체 그림이 보이기 시작합니다.

---

## 셸 스크립트 — 나만의 등산 지도

**셸 스크립트**는 여러 터미널 명령어를 하나의 파일로 묶은 것입니다.
매번 5개 명령어를 치는 대신, 스크립트 하나로 끝!

### 첫 번째 셸 스크립트
\`\`\`bash
# setup.sh 파일 만들기
touch setup.sh

# 내용 작성
cat > setup.sh << 'EOF'
#!/bin/bash
echo "프로젝트 설정 시작..."
npm install
cp .env.example .env
echo "설정 완료! 🚀"
EOF

# 실행 권한 주기
chmod +x setup.sh

# 실행하기
./setup.sh
\`\`\`

### 자주 쓰는 셸 스크립트 패턴
\`\`\`bash
# 조건문
if [ -f ".env" ]; then
  echo ".env 파일이 있어요"
else
  echo ".env 파일이 없어요!"
fi

# 반복문
for file in *.ts; do
  echo "TypeScript 파일: $file"
done
\`\`\`

### package.json scripts — 프로젝트 전용 명령어
\`\`\`json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "deploy": "npm run build && vercel --prod"
  }
}
\`\`\`
\`npm run deploy\` 한 번으로 빌드부터 배포까지!

### 나만의 alias 모음
\`\`\`bash
# Mac/Linux: ~/.zshrc에 추가
alias gs='git status'
alias gc='git commit -m'
alias gp='git push'
alias dev='npm run dev'
alias deploy='git add . && git commit -m "update" && git push'
\`\`\`
\`\`\`powershell
# Windows PowerShell: $PROFILE 파일에 추가 (notepad $PROFILE 로 열기)
function gs { git status }
function gp { git push }
function dev { npm run dev }
\`\`\`

**터미널 마스터가 된 걸 축하해요! 🏔️**
이제 관악산을 완등했습니다. Git 기초산으로 이동할 준비가 됐어요.`,
        quiz: [
          {
            question: "셸 스크립트 파일에 실행 권한을 주는 명령어는?",
            options: ["chmod +x 파일명", "run 파일명", "execute 파일명", "sudo 파일명"],
            correct: 0,
            explanation: "chmod +x는 파일에 실행(execute) 권한을 추가합니다. 이후 ./파일명으로 실행할 수 있어요!"
          },
          {
            question: "package.json의 scripts 섹션을 쓰는 이유는?",
            options: ["파일 저장용", "프로젝트 전용 단축 명령어를 만들기 위해", "의존성 관리", "환경변수 저장"],
            correct: 1,
            explanation: "scripts에 등록하면 npm run 명령어로 긴 명령어를 짧게 실행할 수 있어요. 팀원 모두가 같은 명령어를 쓸 수 있다는 장점도 있습니다!"
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
brew install git          # Mac
winget install Git.Git    # Windows
\`\`\`
Windows에서 git이 없으면 git-scm.com에서 직접 다운로드도 가능해요.

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
      },
      {
        id: "git-config",
        title: "Git 설정 & 정체성",
        description: "commit에 내 이름을 새기는 법. 누가 이 코드를 썼는지 git이 기억합니다.",
        prerequisites: ["브랜치가 무엇인지 안다"],
        content: `## Git 설정 — 내 이름을 코드에 새기자

커밋할 때마다 "누가 만들었는지" 기록됩니다.
처음 한 번만 설정하면 되는 중요한 작업이에요.

### 기본 설정
\`\`\`bash
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"
\`\`\`

### 설정 확인
\`\`\`bash
git config --list
# user.name=홍길동
# user.email=hong@example.com
\`\`\`

### .gitignore — 올리면 안 되는 파일 제외
\`\`\`bash
# .gitignore 파일 만들기
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore
echo ".DS_Store" >> .gitignore
\`\`\`

**.env 파일은 절대로 GitHub에 올리면 안 됩니다!**
API 키, 비밀번호 같은 민감한 정보가 들어있거든요.

### 글로벌 .gitignore 설정
\`\`\`bash
git config --global core.excludesfile ~/.gitignore_global
\`\`\`

**산에서 자기 이름 새긴 표지판을 세우는 것처럼 — 내 커밋엔 항상 내 이름이!** 🪧`,
        quiz: [
          {
            question: "GitHub에 절대로 올리면 안 되는 파일은?",
            options: ["README.md", "package.json", ".env (API 키, 비밀번호)", "index.html"],
            correct: 2,
            explanation: ".env 파일에는 API 키와 비밀번호가 들어있어요. 반드시 .gitignore에 추가해서 GitHub에 올라가지 않도록 해야 합니다!"
          },
          {
            question: "git config --global user.name 명령어는 무엇을 설정하나요?",
            options: ["GitHub 계정 비밀번호", "커밋에 표시되는 작성자 이름", "브랜치 이름", "원격 저장소 주소"],
            correct: 1,
            explanation: "git config --global user.name으로 설정한 이름이 모든 커밋의 작성자로 기록됩니다. 한번만 설정하면 끝!"
          },
          {
            question: ".gitignore 파일의 역할은?",
            options: ["Git을 삭제한다", "특정 파일을 Git 추적에서 제외한다", "커밋을 취소한다", "브랜치를 합친다"],
            correct: 1,
            explanation: ".gitignore에 파일명이나 폴더명을 적으면 Git이 그 파일을 무시해요. node_modules, .env 같은 파일을 제외할 때 꼭 필요합니다!"
          }
        ]
      },
      {
        id: "git-history",
        title: "히스토리 탐색 & 되돌리기",
        description: "과거로 시간여행! git log로 히스토리를 보고 실수를 되돌려봐요.",
        prerequisites: ["git commit을 해봤다"],
        content: `## Git 히스토리 — 과거로 떠나는 시간여행 🕰️

### git log — 커밋 기록 보기
\`\`\`bash
git log                    # 전체 히스토리
git log --oneline          # 한 줄씩 요약
git log --oneline --graph  # 브랜치 그래프까지
git log -5                 # 최근 5개만
\`\`\`

### git diff — 변경사항 확인
\`\`\`bash
git diff                   # 수정했지만 아직 stage 안 한 것
git diff --staged          # stage한 변경사항
git diff HEAD~1            # 직전 커밋과 비교
\`\`\`

### 되돌리기 — 실수해도 괜찮아요!
\`\`\`bash
# 마지막 커밋 메시지 수정
git commit --amend -m "올바른 메시지"

# stage 취소 (파일 내용은 그대로)
git restore --staged 파일명

# 파일 수정 취소 (원래대로)
git restore 파일명

# 특정 커밋으로 돌아가기 (위험! 신중하게)
git reset --hard 커밋해시
\`\`\`

### 커밋 해시 확인
\`\`\`bash
git log --oneline
# abc1234 Add login feature
# def5678 Fix typo
# 여기서 abc1234가 커밋 해시예요
\`\`\`

**실수를 두려워 말아요 — git이 항상 되돌려줍니다!** ⏪`,
        quiz: [
          {
            question: "커밋 기록을 한 줄씩 간결하게 보려면?",
            options: ["git log --full", "git log --oneline", "git history", "git show --brief"],
            correct: 1,
            explanation: "git log --oneline은 각 커밋을 해시 + 메시지 한 줄로 보여줘서 전체 히스토리를 빠르게 파악할 수 있어요!"
          },
          {
            question: "아직 stage하지 않은 변경사항을 확인하는 명령어는?",
            options: ["git status --diff", "git diff", "git check", "git compare"],
            correct: 1,
            explanation: "git diff는 작업 디렉토리와 마지막 커밋 사이의 변경사항을 보여줍니다. git add 전에 뭘 바꿨는지 확인할 때 유용해요!"
          }
        ]
      },
      {
        id: "git-conflict",
        title: "⚡ 갈림길 — 충돌 해결하기",
        description: "두 등산객이 같은 바위를 동시에 잡았을 때! Merge 충돌을 해결하는 법.",
        prerequisites: ["브랜치와 merge를 알고 있다"],
        content: `## ⚡ Merge 충돌 — 겁먹지 말아요!

두 사람이 **같은 파일의 같은 줄**을 다르게 수정하면 충돌이 납니다.
산길에서 두 등산로가 만나는 지점처럼요.

### 충돌이 나면 이렇게 생겼어요
\`\`\`
<<<<<<< HEAD (내 브랜치)
const greeting = "안녕하세요"
=======
const greeting = "Hello"
>>>>>>> feature/english
\`\`\`

\`<<<<<<< HEAD\` 아래가 **내 버전**, \`=======\` 아래가 **상대방 버전**이에요.

### 해결 방법
1. 충돌난 파일을 열어서 직접 수정
2. 원하는 코드만 남기고 충돌 표시 삭제
3. 수정 후 다시 커밋

\`\`\`bash
# 충돌 해결 후
git add 충돌난파일.js
git commit -m "Resolve merge conflict"
\`\`\`

### VS Code에서 더 쉽게 해결하기
VS Code는 충돌 파일에서 버튼으로 선택할 수 있어요:
- **Accept Current Change** — 내 것 유지
- **Accept Incoming Change** — 상대방 것 선택
- **Accept Both Changes** — 둘 다 포함

### 충돌 예방법
\`\`\`bash
# 작업 전 항상 최신으로 pull
git pull origin main

# 브랜치를 자주 main과 동기화
git merge main
\`\`\`

**충돌은 실수가 아닙니다. 협업의 자연스러운 과정이에요!** 🤝`,
        quiz: [
          {
            question: "Merge 충돌이 발생하는 원인은?",
            options: [
              "인터넷 연결이 끊겼을 때",
              "두 브랜치에서 같은 파일의 같은 부분을 다르게 수정했을 때",
              "git push를 너무 자주 했을 때",
              "파일 이름에 한글이 있을 때"
            ],
            correct: 1,
            explanation: "두 브랜치가 같은 파일의 같은 줄을 서로 다르게 수정하면 Git이 어느 것을 선택해야 할지 모르기 때문에 충돌이 발생해요!"
          },
          {
            question: "충돌 해결 후 해야 할 일 순서는?",
            options: [
              "git reset → git push",
              "충돌 파일 수정 → git add → git commit",
              "git clone 다시 하기",
              "브랜치 삭제 → 다시 만들기"
            ],
            correct: 1,
            explanation: "충돌난 파일을 직접 수정해서 원하는 코드만 남긴 후, git add로 스테이지하고 git commit으로 마무리하면 됩니다!"
          },
          {
            question: "충돌을 예방하는 가장 좋은 습관은?",
            options: [
              "혼자서만 코딩하기",
              "작업 전 git pull로 최신 코드 받아오기",
              "브랜치를 절대 만들지 않기",
              "커밋을 많이 하지 않기"
            ],
            correct: 1,
            explanation: "작업 시작 전 git pull origin main으로 최신 코드를 받아오면 충돌 가능성이 크게 줄어요. 협업할 때 특히 중요한 습관입니다!"
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
\`\`\`
버전이 낮거나 없으면 설치:
\`\`\`bash
brew install node                   # Mac
winget install OpenJS.NodeJS        # Windows
\`\`\`
또는 nodejs.org에서 LTS 버전 직접 다운로드 (Mac/Windows 모두 가능)

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
# Mac/Linux — 환경변수 설정 (추천)
export ANTHROPIC_API_KEY=sk-ant-...
\`\`\`
\`\`\`powershell
# Windows PowerShell — 환경변수 설정 (추천)
$env:ANTHROPIC_API_KEY = "sk-ant-..."
\`\`\`
\`\`\`bash
# Mac/Windows 모두 — .env 파일 방식
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
      },
      {
        id: "claude-md",
        title: "CLAUDE.md로 AI 길들이기",
        description: "프로젝트만의 규칙을 CLAUDE.md에 기록하면 AI가 항상 기억합니다.",
        prerequisites: ["Claude Code 기본 사용법을 안다"],
        content: `## CLAUDE.md — AI 셰르파에게 지도 주기

CLAUDE.md는 Claude Code가 **항상 먼저 읽는 파일**입니다.
프로젝트 규칙, 기술 스택, 금지사항 등을 여기에 적어두면
매번 설명할 필요가 없어요.

### 기본 CLAUDE.md 구조
\`\`\`markdown
# 프로젝트 설명
이 프로젝트는 Next.js 블로그입니다.

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## 코딩 규칙
- 함수는 화살표 함수로 작성
- 타입은 반드시 명시
- 컴포넌트 파일명은 PascalCase

## 하면 안 되는 것
- console.log 남기지 않기
- any 타입 사용 금지
- 직접 DOM 조작 금지
\`\`\`

### CLAUDE.md가 있으면 달라지는 것
\`\`\`
Before: "TypeScript로 작성하고, Tailwind 써줘, App Router야"
After:  "로그인 컴포넌트 만들어줘" (Claude가 알아서 규칙 지킴!)
\`\`\`

### 자동으로 CLAUDE.md 만들기
\`\`\`
claude> 이 프로젝트의 기술 스택과 구조를 분석해서
       CLAUDE.md 초안을 만들어줘
\`\`\`

**한 번 잘 써두면 매번 설명 안 해도 됩니다. 셰르파에게 지도를!** 🗺️`,
        quiz: [
          {
            question: "CLAUDE.md 파일을 프로젝트에 두면 어떤 점이 좋은가요?",
            options: [
              "Claude Code가 더 빨리 응답한다",
              "매번 프로젝트 규칙을 설명하지 않아도 Claude가 자동으로 지킨다",
              "자동으로 코드가 배포된다",
              "GitHub에 자동 push된다"
            ],
            correct: 1,
            explanation: "CLAUDE.md는 Claude Code가 항상 먼저 읽는 파일입니다. 코딩 규칙, 기술 스택 등을 적어두면 매번 설명하지 않아도 돼요!"
          },
          {
            question: "CLAUDE.md에 적으면 가장 유용한 내용은?",
            options: [
              "오늘 날씨",
              "기술 스택, 코딩 규칙, 하면 안 되는 것들",
              "팀원 연락처",
              "회의록"
            ],
            correct: 1,
            explanation: "기술 스택(Next.js, TypeScript 등), 코딩 컨벤션, 금지사항 등을 적으면 Claude Code가 일관된 스타일로 코드를 작성해줍니다!"
          },
          {
            question: "프로젝트에 맞는 CLAUDE.md를 빠르게 만드는 방법은?",
            options: [
              "인터넷에서 복사붙여넣기",
              "Claude에게 '이 프로젝트 분석해서 CLAUDE.md 만들어줘'라고 요청",
              "직접 처음부터 작성",
              "필요 없다"
            ],
            correct: 1,
            explanation: "Claude Code에게 프로젝트 구조를 분석해달라고 하면 CLAUDE.md 초안을 자동으로 만들어줍니다. AI가 AI를 설정하는 셈이죠!"
          }
        ]
      },
      {
        id: "slash-commands",
        title: "슬래시 명령어 마스터",
        description: "/help, /clear, /review — Claude Code의 비밀 단축키들을 익혀봐요.",
        prerequisites: ["Claude Code를 기본적으로 사용할 수 있다"],
        content: `## 슬래시 명령어 — Claude Code 고수의 단축키

슬래시(/)로 시작하는 명령어들은 Claude Code의 **특수 기능**입니다.
대화 대신 빠르게 특정 작업을 실행할 수 있어요.

### 자주 쓰는 슬래시 명령어
\`\`\`
/help        — 사용 가능한 모든 명령어 목록
/clear       — 대화 기록 초기화 (새 작업 시작 시)
/review      — 현재 변경사항 코드 리뷰 요청
/compact     — 대화를 요약해서 컨텍스트 절약
/cost        — 현재 세션의 토큰/비용 확인
\`\`\`

### 언제 /clear를 써야 할까?
\`\`\`
✅ 완전히 다른 작업을 시작할 때
✅ 이전 대화가 새 작업에 혼란을 주고 있을 때
✅ 응답이 이상하거나 길어질 때

❌ 작업 중간에 (맥락이 사라짐)
\`\`\`

### /review 활용하기
\`\`\`bash
# 코드 수정 후
/review

# 결과: Claude가 보안, 성능, 가독성 관점에서
# 방금 수정한 코드를 분석해줌
\`\`\`

### 키보드 단축키
\`\`\`
Ctrl + C    — 현재 응답 중단
위/아래 화살표 — 이전 명령어 탐색
Ctrl + R    — 명령어 검색
\`\`\`

**슬래시 명령어를 익히면 Claude Code가 10배 편해집니다!** ⚡`,
        quiz: [
          {
            question: "완전히 다른 새 작업을 시작할 때 먼저 해야 할 일은?",
            options: [
              "터미널을 완전히 닫고 다시 열기",
              "/clear 로 이전 대화 기록 초기화",
              "claude 명령어를 다시 실행",
              "컴퓨터 재시작"
            ],
            correct: 1,
            explanation: "/clear 명령어로 대화 기록을 초기화하면 이전 작업의 맥락이 사라져서 새 작업에 집중할 수 있어요. 관련 없는 컨텍스트가 AI를 혼란스럽게 할 수 있거든요!"
          },
          {
            question: "코드 수정 후 보안/성능 관점에서 검토받으려면?",
            options: ["/debug", "/check", "/review", "/analyze"],
            correct: 2,
            explanation: "/review 명령어를 입력하면 Claude Code가 방금 수정한 코드를 보안, 성능, 가독성 등 여러 관점에서 분석해줍니다!"
          }
        ]
      },
      {
        id: "claude-tips",
        title: "🌿 휴식 타임 — Claude Code 꿀팁 모음",
        description: "설악산 봉정암에서 쉬어가며 고수들의 노하우를 배웁니다.",
        prerequisites: ["Claude Code를 어느 정도 써봤다"],
        content: `## 🌿 봉정암에서 쉬어가며 — Claude Code 꿀팁

설악산 중턱, 봉정암 마당에 앉아 막걸리 한 잔.
지금까지 배운 것을 정리하며 고수들의 팁을 들어봐요. 🍶

### 💡 꿀팁 1: 컨텍스트 먼저 주기
\`\`\`
❌ "버튼 색 바꿔줘"
✅ "Header 컴포넌트의 로그인 버튼 배경을 파란색(#3B82F6)으로 바꿔줘"
\`\`\`

### 💡 꿀팁 2: 단계별로 요청하기
\`\`\`
❌ "쇼핑몰 전체 만들어줘"
✅ 1. "상품 목록 컴포넌트 만들어줘"
   2. "장바구니 기능 추가해줘"
   3. "결제 페이지 연결해줘"
\`\`\`

### 💡 꿀팁 3: 이해한 뒤 수정 요청
\`\`\`
"이 코드가 어떻게 동작하는지 설명해줘"
→ 이해 완료
"그럼 여기서 에러 처리를 추가해줘"
\`\`\`

### 💡 꿀팁 4: 결과물 검토 요청
\`\`\`
"방금 만든 코드에서 보안상 문제될 부분 있어?"
"이 코드를 더 읽기 쉽게 리팩토링해줄 수 있어?"
\`\`\`

### 💡 꿀팁 5: 막혔을 때
\`\`\`
"지금 이 에러가 왜 나는지 단계별로 설명해줘"
"이 문제를 해결하는 방법이 여러 개라면 각각의 장단점을 알려줘"
\`\`\`

**봉정암의 고요함처럼 — 급하지 않게, 단계별로. 그게 바이브 코딩의 정수!** 🏔️`,
        quiz: [
          {
            question: "Claude Code에게 요청할 때 가장 효과적인 방법은?",
            options: [
              "모든 것을 한 번에 요청한다",
              "가능하면 작은 단위로 나눠서 단계별로 요청한다",
              "최대한 짧게 요청한다",
              "영어로만 요청한다"
            ],
            correct: 1,
            explanation: "큰 작업을 작은 단계로 나눠서 요청하면 Claude Code가 더 정확하게 도와줄 수 있어요. 한 번에 너무 많이 요청하면 실수도 많아집니다!"
          },
          {
            question: "코드를 이해하지 못한 채 수정 요청을 하면 어떤 문제가 생기나요?",
            options: [
              "Claude Code가 거부한다",
              "나중에 문제가 생겼을 때 어디가 잘못됐는지 파악하기 어렵다",
              "속도가 느려진다",
              "비용이 많이 든다"
            ],
            correct: 1,
            explanation: "이해 없이 코드를 수정하면 나중에 버그가 생겼을 때 어디서 뭘 바꿨는지 기억이 안 나요. 항상 '이 코드가 뭐하는 건지' 먼저 이해하고 수정하는 습관이 중요합니다!"
          },
          {
            question: "Claude Code에게 에러를 보여줄 때 가장 좋은 방법은?",
            options: [
              "에러 메시지만 붙여넣기",
              "에러 메시지 + 관련 코드 + 어떤 상황에서 발생했는지 함께 설명",
              "스크린샷 찍어서 설명",
              "새로 처음부터 만들어달라고 하기"
            ],
            correct: 1,
            explanation: "에러 메시지와 함께 관련 코드, 어떤 상황에서 발생했는지 알려주면 Claude가 훨씬 정확하게 도와줄 수 있어요!"
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
      },
      {
        id: "context-management",
        title: "컨텍스트 관리의 기술",
        description: "AI와 긴 대화를 이어갈 때 맥락을 유지하는 고급 기술을 익힙니다.",
        prerequisites: ["Claude Code로 여러 작업을 해봤다"],
        content: `## 컨텍스트 관리 — AI와의 대화를 스마트하게

Claude Code는 **대화 기록(컨텍스트)**을 기억합니다.
하지만 컨텍스트가 너무 길어지면 비용도 늘고, 응답도 느려져요.
산에서 짐을 너무 많이 들고 오르면 힘들어지는 것처럼요 🎒

### 컨텍스트 윈도우란?
\`\`\`
Claude가 한 번에 기억할 수 있는 대화의 양 = 컨텍스트 윈도우
→ 너무 길어지면 초반 내용을 잊을 수 있음
\`\`\`

### 효율적인 컨텍스트 관리 전략

**1. 작업별로 /clear 사용**
\`\`\`
✅ 로그인 기능 완성 → /clear → 결제 기능 시작
✅ 버그 수정 완료 → /clear → 새 기능 추가
\`\`\`

**2. /compact으로 압축하기**
\`\`\`
대화가 길어지면: /compact
→ 중요한 내용만 요약해서 컨텍스트 절약
\`\`\`

**3. 세션 시작 시 상황 요약**
\`\`\`
"지금 Next.js 프로젝트에서 사용자 인증을 구현 중이야.
 현재까지 로그인 UI는 완성했고,
 이제 API 연동이 필요한 상황이야."
\`\`\`

**4. CLAUDE.md 활용 (반복 설명 제거)**
\`\`\`
자주 설명하는 내용 → CLAUDE.md에 고정
→ 매 세션마다 다시 설명할 필요 없음
\`\`\`

### 비용 확인하기
\`\`\`bash
/cost
# 현재 세션의 토큰 사용량과 비용이 표시됩니다
\`\`\`

**가벼운 짐으로 빠르게 — 컨텍스트도 가볍게!** 🎒`,
        quiz: [
          {
            question: "Claude Code 대화가 너무 길어져서 응답이 느려질 때 가장 좋은 해결책은?",
            options: [
              "컴퓨터를 재시작한다",
              "/compact으로 대화를 압축하거나 /clear로 새로 시작한다",
              "더 빠른 인터넷을 사용한다",
              "Claude Code를 재설치한다"
            ],
            correct: 1,
            explanation: "/compact은 긴 대화를 요약해서 컨텍스트를 줄여줍니다. 완전히 새 작업이면 /clear가 더 효율적이에요!"
          },
          {
            question: "새 작업 세션을 시작할 때 가장 먼저 해야 할 것은?",
            options: [
              "바로 코딩 요청",
              "현재 상황과 목표를 간략히 설명하기",
              "이전 대화 전부 복사해서 붙여넣기",
              "에러 메시지 먼저 보내기"
            ],
            correct: 1,
            explanation: "새 세션에서는 '지금 어떤 프로젝트의 어떤 부분을 작업 중인지' 한두 문장으로 먼저 설명해주면 Claude가 맥락을 빠르게 파악합니다!"
          },
          {
            question: "/cost 명령어는 무엇을 알려주나요?",
            options: [
              "Claude Code 구독 가격",
              "현재 세션의 토큰 사용량과 비용",
              "다음 달 청구 예상액",
              "무료 사용 가능 횟수"
            ],
            correct: 1,
            explanation: "/cost를 입력하면 현재 대화 세션에서 얼마나 많은 토큰을 사용했는지, 비용이 얼마인지 확인할 수 있어요!"
          }
        ]
      },
      {
        id: "advanced-prompts",
        title: "고급 프롬프트 기법",
        description: "역할 지정, 예시 제공, 제약 조건 — 전문가처럼 AI를 활용하는 법.",
        prerequisites: ["기본 프롬프트 작성법을 안다"],
        content: `## 고급 프롬프트 기법 — AI 조련사 되기

기본 프롬프트를 넘어 **전문가 수준**으로 AI를 활용하는 기술을 배워봐요.

### 기법 1: 역할 지정 (Role Prompting)
\`\`\`
"너는 10년 경력의 시니어 React 개발자야.
 주니어 개발자가 이해할 수 있도록 이 코드를 리뷰해줘."

"너는 UX 디자이너야.
 이 버튼 배치가 사용성 관점에서 좋은지 분석해줘."
\`\`\`

### 기법 2: 예시 제공 (Few-shot)
\`\`\`
"이런 스타일로 함수를 작성해줘:

 // 예시
 const formatDate = (date: Date): string => {
   return date.toLocaleDateString('ko-KR')
 }

 이제 formatPrice 함수를 같은 스타일로 만들어줘."
\`\`\`

### 기법 3: 단계별 사고 유도
\`\`\`
"이 문제를 해결하기 전에:
 1. 문제를 분석해줘
 2. 가능한 해결방법 3가지 제안
 3. 각각의 장단점 설명
 4. 최선의 방법으로 구현
\`\`\`

### 기법 4: 제약 조건 명시
\`\`\`
"다음 조건으로 로그인 폼을 만들어줘:
 - 라이브러리 없이 순수 React만 사용
 - 상태는 useState만으로 관리
 - CSS는 Tailwind만 사용
 - 50줄 이하로 작성"
\`\`\`

### 기법 5: 검토 요청
\`\`\`
"방금 만든 코드를 보안 관점에서 검토해줘.
 특히 XSS, SQL 인젝션 취약점이 있는지 봐줘."
\`\`\`

**프롬프트는 기술입니다. 연습하면 할수록 실력이 늘어요!** 🎯`,
        quiz: [
          {
            question: "역할 지정(Role Prompting)의 장점은?",
            options: [
              "응답이 더 빠르다",
              "특정 전문 분야의 관점으로 더 깊이 있는 답변을 받을 수 있다",
              "비용이 절약된다",
              "한국어로 더 잘 답한다"
            ],
            correct: 1,
            explanation: "'너는 보안 전문가야'처럼 역할을 지정하면 Claude가 그 관점에 맞게 더 전문적이고 깊이 있는 분석을 해줍니다!"
          },
          {
            question: "프롬프트에 제약 조건을 명시하면 좋은 이유는?",
            options: [
              "Claude가 더 좋아한다",
              "원하지 않는 방향으로 코드가 작성되는 것을 방지한다",
              "더 빠른 응답을 받는다",
              "무관하다"
            ],
            correct: 1,
            explanation: "'라이브러리 없이', '50줄 이하로' 같은 제약을 미리 명시하면 불필요한 수정 과정 없이 원하는 결과를 바로 얻을 수 있어요!"
          }
        ]
      },
      {
        id: "ai-code-review",
        title: "📸 AI와 코드 리뷰하기",
        description: "지리산 정상에서 전경을 찍듯 — 완성된 코드를 AI와 함께 점검합니다.",
        prerequisites: ["Claude Code로 코드를 작성해봤다"],
        content: `## 📸 코드 리뷰 — 완성 후 한 번 더 돌아보기

지리산 천왕봉에서 사진을 찍기 전 옷매무새를 고치듯,
배포 전 코드를 한 번 더 점검하는 습관을 들여봐요.

### AI 코드 리뷰 프롬프트 모음

**보안 리뷰**
\`\`\`
"이 코드에서 보안 취약점을 찾아줘.
 특히 사용자 입력을 다루는 부분을 중심으로."
\`\`\`

**성능 리뷰**
\`\`\`
"이 컴포넌트가 불필요하게 리렌더링되는 부분이 있어?
 성능 최적화 방법을 제안해줘."
\`\`\`

**가독성 리뷰**
\`\`\`
"이 코드를 더 읽기 쉽고 유지보수하기 좋게 리팩토링해줘.
 함수 이름이나 변수명도 개선해줘."
\`\`\`

**테스트 작성**
\`\`\`
"이 함수에 대한 단위 테스트를 Jest로 작성해줘.
 엣지 케이스도 포함해서."
\`\`\`

### 좋은 코드의 기준 (AI에게 기억시키기)
\`\`\`
"앞으로 코드를 작성할 때 다음 기준을 지켜줘:
 1. 함수 하나는 하나의 일만
 2. 변수명은 의도가 명확하게
 3. 중복 코드 없애기
 4. 에러 처리 항상 포함"
\`\`\`

### 코드 리뷰 체크리스트
\`\`\`markdown
□ 보안: 사용자 입력 검증 됐나?
□ 성능: 불필요한 연산/렌더링 없나?
□ 가독성: 다른 사람이 이해할 수 있나?
□ 에러 처리: 예외 상황 처리 됐나?
□ 타입: TypeScript 타입 제대로 됐나?
\`\`\`

**좋은 코드는 한 번에 완성되지 않아요. 리뷰가 완성시킵니다!** 📸`,
        quiz: [
          {
            question: "코드 리뷰를 AI에게 요청할 때 가장 효과적인 방법은?",
            options: [
              "전체 코드를 붙여넣고 '좋아?'라고 묻기",
              "보안, 성능, 가독성 등 구체적인 관점을 지정해서 요청하기",
              "에러만 찾아달라고 하기",
              "리뷰 없이 바로 배포하기"
            ],
            correct: 1,
            explanation: "'보안 취약점만', '성능 최적화만' 처럼 구체적인 관점을 지정하면 더 깊이 있는 리뷰를 받을 수 있어요!"
          },
          {
            question: "배포 전 코드 리뷰에서 가장 먼저 확인해야 할 것은?",
            options: [
              "코드 줄 수",
              "보안 취약점 (사용자 입력 처리, API 키 노출 등)",
              "변수명 길이",
              "파일 크기"
            ],
            correct: 1,
            explanation: "배포 전에 보안 취약점을 먼저 확인해야 합니다. 사용자 입력이 제대로 검증되는지, API 키가 노출되지 않는지가 가장 중요해요!"
          },
          {
            question: "AI 코드 리뷰의 가장 큰 장점은?",
            options: [
              "100% 완벽한 코드를 보장한다",
              "사람 리뷰어를 완전히 대체한다",
              "빠르게 다양한 관점(보안, 성능, 가독성)에서 피드백을 받을 수 있다",
              "자동으로 코드를 수정해준다"
            ],
            correct: 2,
            explanation: "AI 코드 리뷰는 보안, 성능, 가독성 등 여러 관점을 즉시 빠르게 검토해줍니다. 사람 리뷰어를 대체하는 게 아니라 사전 점검 도구로 활용하는 게 좋아요!"
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
      },
      {
        id: "component-design",
        title: "컴포넌트 설계하기",
        description: "재사용 가능한 컴포넌트를 어떻게 설계하는지 Claude와 함께 배웁니다.",
        prerequisites: ["Next.js 기본 구조를 알고 있다"],
        content: `## 컴포넌트 설계 — 레고 블록처럼 쌓기

좋은 컴포넌트 설계는 레고 블록 같아요.
각 블록이 독립적이고, 조합해서 큰 것을 만들 수 있어야 합니다.

### 좋은 컴포넌트의 조건
\`\`\`
1. 단일 책임 — 한 가지 역할만
2. 재사용 가능 — 여러 곳에서 쓸 수 있게
3. 외부 의존 최소화 — props로만 소통
4. 테스트하기 쉬운 — 독립적으로 동작
\`\`\`

### Claude에게 컴포넌트 설계 물어보기
\`\`\`
"쇼핑몰 상품 카드 컴포넌트를 만들려고 해.
 어떤 props를 받아야 하고,
 어떻게 구조를 잡는 게 좋을까?"
\`\`\`

### 실제 설계 예시
\`\`\`tsx
// ❌ 나쁜 예 — 너무 많은 책임
function ProductCard() {
  const [cart, setCart] = useState([])
  // 상품 표시 + 장바구니 + 찜 + 리뷰 모두 처리
}

// ✅ 좋은 예 — 단일 책임
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div>
      <ProductImage src={product.image} />
      <ProductInfo name={product.name} price={product.price} />
      <AddToCartButton onClick={() => onAddToCart(product)} />
    </div>
  )
}
\`\`\`

### 컴포넌트 분리 기준
\`\`\`
"이 컴포넌트가 50줄이 넘었어.
 어떻게 나누면 좋을까? 제안해줘."
\`\`\`

### 폴더 구조 잡기
\`\`\`
"Next.js 14 쇼핑몰 프로젝트에서
 컴포넌트 폴더 구조를 어떻게 잡으면 좋을지
 추천해줘."
\`\`\`

**잘 설계된 컴포넌트는 나중에 수정이 쉬워요. 처음부터 잘 잡읍시다!** 🏗️`,
        quiz: [
          {
            question: "좋은 컴포넌트 설계의 핵심 원칙은?",
            options: [
              "가능한 한 모든 기능을 하나에 모으기",
              "단일 책임 — 컴포넌트 하나는 한 가지 역할만",
              "props 없이 자체적으로 모든 데이터 관리",
              "코드가 길수록 좋다"
            ],
            correct: 1,
            explanation: "컴포넌트 하나가 한 가지 역할만 담당하면 재사용하기 쉽고 유지보수도 간단해져요. 상품 카드, 버튼, 입력 필드처럼 각각 분리하는 게 좋습니다!"
          },
          {
            question: "컴포넌트를 분리해야 할 때를 Claude에게 물어보려면?",
            options: [
              "코드를 붙여넣고 '이거 어때?'",
              "'이 컴포넌트가 50줄이 넘었어. 어떻게 나누면 좋을까?'처럼 구체적으로",
              "물어보지 않고 직접 판단",
              "랜덤으로 나누기"
            ],
            correct: 1,
            explanation: "구체적인 기준(줄 수, 책임의 수)과 함께 질문하면 Claude가 실용적인 분리 방법을 제안해줍니다!"
          },
          {
            question: "컴포넌트 간의 데이터는 어떻게 전달하는 것이 가장 좋나요?",
            options: [
              "전역 변수 사용",
              "props를 통해 명시적으로 전달",
              "localStorage 활용",
              "직접 DOM 조작"
            ],
            correct: 1,
            explanation: "props를 통한 명시적 데이터 전달이 컴포넌트를 독립적으로 유지하고 테스트하기 쉽게 만듭니다. 데이터 흐름이 명확해져요!"
          }
        ]
      },
      {
        id: "api-routes",
        title: "API 라우트 만들기",
        description: "Next.js의 API Routes로 나만의 백엔드를 만드는 법을 배웁니다.",
        prerequisites: ["Next.js 기본 구조와 컴포넌트를 안다"],
        content: `## API Routes — 나만의 백엔드 만들기

Next.js에는 백엔드 API를 만들 수 있는 기능이 내장되어 있어요.
별도 서버 없이 하나의 프로젝트에서 프론트엔드 + 백엔드를!

### API Route 기본 구조
\`\`\`
app/
  api/
    users/
      route.ts    ← /api/users 엔드포인트
    products/
      route.ts    ← /api/products 엔드포인트
\`\`\`

### 간단한 API 만들기
\`\`\`typescript
// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: '안녕하세요!' })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ received: body })
}
\`\`\`

### Claude에게 API 만들어달라고 하기
\`\`\`
"사용자가 이름과 이메일을 입력하면
 데이터를 받아서 확인 메시지를 반환하는
 Next.js API Route를 만들어줘.

 - POST /api/contact
 - 요청: { name: string, email: string, message: string }
 - 응답: { success: boolean, message: string }"
\`\`\`

### 외부 API 연동
\`\`\`typescript
// app/api/weather/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')

  const res = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${process.env.WEATHER_API_KEY}\`
  )
  const data = await res.json()

  return NextResponse.json(data)
}
\`\`\`

**API 키는 절대 프론트엔드에 노출하지 마세요! API Route가 숨겨줍니다 🔐**`,
        quiz: [
          {
            question: "Next.js API Route를 사용하는 가장 큰 장점은?",
            options: [
              "자동으로 데이터베이스가 생성된다",
              "별도 서버 없이 하나의 프로젝트에서 프론트엔드와 백엔드를 함께 관리할 수 있다",
              "코드 작성이 불필요하다",
              "무제한 트래픽을 처리한다"
            ],
            correct: 1,
            explanation: "Next.js API Routes를 사용하면 Express 같은 별도 백엔드 서버 없이 하나의 프로젝트에서 API를 만들 수 있어요. 배포도 한 번에!"
          },
          {
            question: "외부 API 키를 안전하게 사용하려면?",
            options: [
              "프론트엔드 코드에 직접 작성",
              "API Route에서 환경변수(process.env)로 사용해서 클라이언트에 노출되지 않도록",
              "공개 깃허브에 올리기",
              "사용자에게 직접 물어보기"
            ],
            correct: 1,
            explanation: "API Route는 서버에서 실행되므로 process.env의 환경변수가 클라이언트에 노출되지 않아요. 외부 API 키는 항상 .env에 저장하고 API Route에서 사용하세요!"
          }
        ]
      },
      {
        id: "error-handling",
        title: "🌿 오류를 친구로 — 에러 핸들링",
        description: "한라산 백록담 직전 휴식. 에러 메시지를 읽는 법과 우아하게 처리하는 법.",
        prerequisites: ["API 라우트와 컴포넌트를 만들어봤다"],
        content: `## 🌿 백록담 직전 쉬어가기 — 에러는 나쁜 게 아니에요

한라산 백록담 직전, 숨 고르기 타임 🍶
에러 메시지는 컴퓨터가 "이렇게 하면 안 돼요!"라고 친절하게 알려주는 것입니다.

### 에러를 무서워하지 않는 법
\`\`\`
에러 = 버그 제보 = 어디가 잘못됐는지 힌트
\`\`\`

### Claude에게 에러 보여주는 법
\`\`\`
"이런 에러가 났어:
 TypeError: Cannot read properties of undefined (reading 'map')

 이 에러가 발생하는 코드:
 {users.map(user => <UserCard key={user.id} user={user} />)}

 왜 이 에러가 났고 어떻게 고치면 돼?"
\`\`\`

### 흔한 에러와 해결법

**1. undefined / null 에러**
\`\`\`typescript
// ❌ 에러남
users.map(user => ...)

// ✅ 안전하게
users?.map(user => ...) // Optional chaining
// 또는
(users || []).map(user => ...)
\`\`\`

**2. 비동기 에러**
\`\`\`typescript
// ✅ try-catch로 처리
try {
  const data = await fetch('/api/users')
  const json = await data.json()
} catch (error) {
  console.error('데이터 로딩 실패:', error)
  // 사용자에게 에러 메시지 표시
}
\`\`\`

**3. 타입 에러**
\`\`\`typescript
// Claude에게 요청
"이 TypeScript 타입 에러를 고쳐줘:
 Argument of type 'string | undefined' is not assignable to parameter of type 'string'"
\`\`\`

### 사용자 친화적 에러 처리
\`\`\`
"로딩 실패, 에러 화면을 만들어줘.
 - 에러 메시지 표시
 - '다시 시도' 버튼
 - 로딩 중 스피너도 포함"
\`\`\`

**에러를 만날 때마다 실력이 늡니다. 에러는 성장의 디딤돌!** 🌿`,
        quiz: [
          {
            question: "undefined 에러를 방지하는 가장 간단한 방법은?",
            options: [
              "에러 무시하기",
              "Optional chaining(?.)을 사용해서 안전하게 접근",
              "항상 try-catch 사용",
              "TypeScript 사용 중지"
            ],
            correct: 1,
            explanation: "users?.map() 처럼 Optional chaining(?.)을 사용하면 users가 undefined나 null이어도 에러 없이 undefined를 반환해요. 코드가 훨씬 안전해집니다!"
          },
          {
            question: "비동기 API 호출에서 에러를 제대로 처리하려면?",
            options: [
              "에러가 안 난다고 가정하고 그냥 사용",
              "try-catch 블록으로 에러를 잡아서 사용자에게 적절한 메시지 표시",
              "에러 나면 페이지 새로고침",
              "console.error만 있으면 충분"
            ],
            correct: 1,
            explanation: "try-catch로 에러를 잡고 사용자에게 '데이터를 불러올 수 없어요, 다시 시도해주세요' 같은 친절한 메시지를 보여주는 게 좋은 UX입니다!"
          },
          {
            question: "에러 메시지를 Claude에게 보여줄 때 가장 효과적인 방법은?",
            options: [
              "에러 메시지만 복사해서 보내기",
              "에러 메시지 + 발생한 코드 + 어떤 상황에서 발생했는지 함께 설명",
              "스크린샷만 보내기",
              "'에러났어'라고만 하기"
            ],
            correct: 1,
            explanation: "에러 메시지만 보내면 Claude가 정확한 원인을 파악하기 어려워요. 관련 코드와 상황 설명까지 함께 주면 훨씬 빠르고 정확하게 해결책을 찾아줍니다!"
          }
        ]
      }
    ]
  }
]
