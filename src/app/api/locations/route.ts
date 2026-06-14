import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  const [suggestionsResult, votesResult] = await Promise.all([
    supabase.from("location_suggestions").select("id, name, address, suggested_by").order("created_at"),
    supabase.from("location_votes").select("location_id, voter_name"),
  ])

  if (suggestionsResult.error) {
    return NextResponse.json({ error: suggestionsResult.error.message }, { status: 500 })
  }

  const votes = votesResult.data ?? []
  const suggestions = (suggestionsResult.data ?? []).map((s) => ({
    ...s,
    voters: votes.filter((v) => v.location_id === s.id).map((v) => v.voter_name),
  }))

  return NextResponse.json({ suggestions })
}

export async function POST(req: NextRequest) {
  const { name, address, suggested_by } = await req.json()

  if (!name?.trim() || !suggested_by?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("location_suggestions")
    .insert({ name: name.trim(), address: address?.trim() ?? null, suggested_by: suggested_by.trim() })
    .select("id")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data.id })
}
