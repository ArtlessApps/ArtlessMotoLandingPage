import { NextResponse } from "next/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const scriptUrl = process.env.APPS_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json(
      { error: "Waitlist is not configured." },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const raw =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email)
      : ""

  const email = raw.trim()
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 })
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const text = await res.text()
    let parsed: { success?: boolean; error?: string } = {}
    try {
      parsed = JSON.parse(text) as { success?: boolean; error?: string }
    } catch {
      /* Apps Script may return plain text on failure */
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: parsed.error || "Could not join waitlist." },
        { status: 502 }
      )
    }

    if (parsed.success === false) {
      return NextResponse.json(
        { error: parsed.error || "Could not join waitlist." },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Could not reach waitlist service." },
      { status: 502 }
    )
  }
}
