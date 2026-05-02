import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const { week, slot } = await req.json()

  if (!week || !slot?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
  }

  const { error } = await supabase
    .from("custom_slots")
    .insert({ week, slot: slot.trim() })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
