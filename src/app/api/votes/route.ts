import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  const [votesResult, slotsResult] = await Promise.all([
    supabase.from("votes").select("week, time_slot, name"),
    supabase.from("custom_slots").select("week, slot"),
  ])

  if (votesResult.error) {
    return NextResponse.json({ error: votesResult.error.message }, { status: 500 })
  }

  return NextResponse.json({
    votes: votesResult.data,
    customSlots: slotsResult.data ?? [],
  })
}

export async function POST(req: NextRequest) {
  const { name, week, time_slot } = await req.json()

  if (!name?.trim() || !week || !time_slot) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
  }

  const trimmedName = name.trim()

  const { data: existing } = await supabase
    .from("votes")
    .select("id")
    .eq("name", trimmedName)
    .eq("week", week)
    .single()

  if (existing) {
    const { error } = await supabase
      .from("votes")
      .update({ time_slot })
      .eq("id", existing.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  } else {
    const { error } = await supabase
      .from("votes")
      .insert({ name: trimmedName, week, time_slot })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}
