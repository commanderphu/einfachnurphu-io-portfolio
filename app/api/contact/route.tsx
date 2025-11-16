import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let message = "";

    // Multipart / FormData handling
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      name = String(form.get("name") || "");
      email = String(form.get("email") || "");
      message = String(form.get("message") || "");
    }

    const userAgent = req.headers.get("user-agent") ?? "—";

    // --- DISCORD EMBED ---
    const webhook = process.env.DISCORD_CONTACT_WEBHOOK!;
    const payload = {
      username: "Portfolio Contact",
      avatar_url: "https://einfachnurphu.io/logo.png",
      embeds: [
        {
          title: "📩 Neue Kontaktanfrage",
          color: 0xff9100,
          description: "Neue Nachricht über das Kontaktformular.",

          fields: [
            { name: "👤 Name", value: name || "—", inline: true },
            { name: "📧 E-Mail", value: email || "—", inline: true },
            { name: "💬 Nachricht", value: `\`\`\`\n${message}\n\`\`\`` },
            { name: "🌐 Gerät/Browser", value: userAgent },
          ],

          footer: {
            text: "einfachnurphu.io • Kontaktformular",
          },

          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // --- AUTO-RESPONSE EMAIL ---
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "📬 Danke für deine Nachricht!",
      html: `
        <div style="font-family: sans-serif; padding: 24px; line-height: 1.6;">
          <h2 style="color: #ff9100;">Vielen Dank, ${name}!</h2>

          <p>Ich habe deine Nachricht erhalten und melde mich so schnell wie möglich zurück.</p>

          <p><strong>Deine Nachricht:</strong></p>
          <blockquote style="border-left: 4px solid #ff9100; padding-left: 12px; color: #444;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>

          <p style="margin-top: 24px;">Viele Grüße,<br><strong>Joshua Phu</strong><br>einfachnurphu.io</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("❌ ERROR CONTACT ROUTE:", e);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
