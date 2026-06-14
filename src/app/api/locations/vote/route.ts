import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const { location_id, voter_name } = await req.json()

  if (!location_id || !voter_name?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
  }

  const trimmedName = voter_name.trim()

  const { data: existing } = await supabase
    .from("location_votes")
    .select("id")
    .eq("location_id", location_id)
    .eq("voter_name", trimmedName)
    .single()

  if (existing) {
    const { error } = await supabase.from("location_votes").delete().eq("id", existing.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true, action: "removed" })
  }

  const { error } = await supabase
    .from("location_votes")
    .insert({ location_id, voter_name: trimmedName })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, action: "added" })
}
