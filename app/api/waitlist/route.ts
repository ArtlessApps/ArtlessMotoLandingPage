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
    const res = await fetch(scriptUrl.trim(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
    })

    const text = await res.text()
    const trimmed = text.trim()

    // Wrong URL often returns Google's HTML sign-in / error page with status 200
    if (trimmed.startsWith("<!") || trimmed.startsWith("<html")) {
      return NextResponse.json(
        {
          error:
            "Waitlist URL returned HTML, not JSON. Fix APPS_SCRIPT_URL: open Apps Script → Deploy → Manage deployments → copy the Web app URL (must end in /exec). Do not use /dev (test-only; returns login HTML) or the script editor URL. Update Vercel env and redeploy.",
        },
        { status: 502 }
      )
    }

    let parsed: { success?: boolean; error?: string } = {}
    try {
      parsed = JSON.parse(text) as { success?: boolean; error?: string }
    } catch {
      if (!res.ok) {
        return NextResponse.json(
          {
            error: `Waitlist service error (${res.status}). Response was not JSON—check APPS_SCRIPT_URL in Vercel matches your latest Web app deployment.`,
          },
          { status: 502 }
        )
      }
      return NextResponse.json(
        {
          error:
            "Invalid response from waitlist service. Redeploy the Apps Script Web app and update APPS_SCRIPT_URL.",
        },
        { status: 502 }
      )
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            parsed.error ||
            `Waitlist service returned HTTP ${res.status}. In Apps Script: Deploy → Web app → set "Who has access" to Anyone (or redeploy a new version).`,
        },
        { status: 502 }
      )
    }

    if (parsed.success === false) {
      return NextResponse.json(
        {
          error:
            parsed.error ||
            "Could not save your email. Check the Sheet ID in the Apps Script project and that the sheet exists.",
        },
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
