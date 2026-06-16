import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabase
    .from("confirmed_slots")
    .select("week, slot, confirmed_by")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ confirmed: data ?? [] })
}

export async function POST(req: NextRequest) {
  const { week, slot, confirmed_by } = await req.json()

  if (!week || !slot) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
  }

  const { error } = await supabase
    .from("confirmed_slots")
    .upsert({ week, slot, confirmed_by: confirmed_by ?? null }, { onConflict: "week" })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { week } = await req.json()

  if (!week) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
  }

  const { error } = await supabase
    .from("confirmed_slots")
    .delete()
    .eq("week", week)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
