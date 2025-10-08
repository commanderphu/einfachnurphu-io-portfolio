import { NextResponse } from "next/server"
import { generateRss } from "@/lib/rss"
export const runtime = 'edge'


export async function GET() {
  const xml = await generateRss()
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } })
}
