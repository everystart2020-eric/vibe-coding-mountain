import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { message, mountainName, stageName, stageContent } = body

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 })
  }

  const systemPrompt = `당신은 "바이브 코딩 산악 학교"의 친절한 강사입니다.
현재 학생은 "${mountainName}" 과정의 "${stageName}" 단계를 공부하고 있습니다.

현재 학습 중인 내용:
${stageContent}

역할:
- 초보자가 이해할 수 있는 쉬운 언어로 설명하세요
- 실용적인 예시를 들어주세요
- 격려하고 긍정적인 톤을 유지하세요
- 한국어로 답변하세요
- 답변은 간결하게 (3-5 문장 이내)
- 코드 예시가 필요하면 코드 블록을 사용하세요`

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: message }]
  })

  const text = response.content[0].type === "text" ? response.content[0].text : ""

  return NextResponse.json({ answer: text })
}
