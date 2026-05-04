import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mountainId = searchParams.get("mountainId")
  const stageId = searchParams.get("stageId")

  if (!mountainId || !stageId) {
    return NextResponse.json({ error: "mountainId, stageId 필요" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("ai_practices")
    .select("name, text, created_at")
    .eq("mountain_id", mountainId)
    .eq("stage_id", stageId)
    .order("created_at", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ practices: data })
}

export async function POST(req: NextRequest) {
  const { name, mountainId, stageId, text } = await req.json()

  if (!name?.trim() || !mountainId || !stageId || !text?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
  }

  const trimmedName = name.trim()

  const { data: existing } = await supabase
    .from("ai_practices")
    .select("id")
    .eq("mountain_id", mountainId)
    .eq("stage_id", stageId)
    .eq("name", trimmedName)
    .single()

  if (existing) {
    const { error } = await supabase
      .from("ai_practices")
      .update({ text: text.trim() })
      .eq("id", existing.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    const { error } = await supabase
      .from("ai_practices")
      .insert({ mountain_id: mountainId, stage_id: stageId, name: trimmedName, text: text.trim() })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
