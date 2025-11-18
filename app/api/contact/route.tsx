import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let message = "";

    // -----------------------------
    // FORM DATA EINLESEN
    // -----------------------------
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      name = String(form.get("name") || "—");
      email = String(form.get("email") || "");
      message = String(form.get("message") || "—");
    }

    const userAgent = req.headers.get("user-agent") ?? "—";
    const webhook = process.env.DISCORD_CONTACT_WEBHOOK!;
    const emailFrom = process.env.EMAIL_FROM!;
    const emailTo = process.env.EMAIL_TO! || "joshua@phuonline.de";

    console.log("🔥 CONTACT ROUTE", { name, email, message });

    // -----------------------------
    // DISCORD SENDEN
    // -----------------------------
    const payload = {
      username: "Portfolio Contact",
      avatar_url: "https://einfachnurphu.io/logo.png",
      embeds: [
        {
          title: "📩 Neue Kontaktanfrage",
          color: 0xff9100,
          description: "Neue Nachricht über das Kontaktformular.",
          fields: [
            { name: "👤 Name", value: name, inline: true },
            { name: "📧 E-Mail", value: email || "—", inline: true },
            { name: "💬 Nachricht", value: `\`\`\`\n${message}\n\`\`\`` },
            { name: "🌐 Gerät/Browser", value: userAgent },
          ],
          footer: { text: "einfachnurphu.io • Kontaktformular" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // -----------------------------
    // AUTO-REPLY AN BESUCHER
    // -----------------------------

    const htmlEmail = `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                    max-width: 560px;
                    margin: 0 auto;
                    padding: 24px;
                    color: #e2e8f0;
                    background: #0b0e13;
                    border-radius: 16px;
                    border: 1px solid #1e293b;">

          <!-- Header -->
          <h2 style="color: #ff9100; margin: 0 0 16px 0; font-size: 24px;">
            Hey ${name},
          </h2>

          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: #cbd5e1;">
            danke dir für deine Nachricht!  
            Ich habe alles erhalten und melde mich so schnell wie möglich bei dir.
          </p>

          <!-- Message Box -->
          <div style="
            margin: 24px 0;
            padding: 16px;
            background: rgba(255,145,0,0.08);
            border-left: 4px solid #ff9100;
            border-radius: 6px;
            color: #e2e8f0;
            font-size: 15px;
            line-height: 1.6;
            white-space: pre-wrap;
          ">
            ${message.replace(/\n/g, "<br>")}
          </div>

          <!-- Footer -->
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin-top: 28px;">
            Viele Grüße,<br>
            <strong style="color: #ff9100;">Joshua Phu</strong><br>
            <span style="color: #64748b;">einfachnurphu.io</span>
          </p>

          <hr style="border: none; border-top: 1px solid #1e293b; margin: 24px 0;" />

          <!-- SOCIAL LINKS -->
          <div style="text-align: center; margin-top: 24px;">

            <a href="https://einfachnurphu.io" 
              style="color: #ff9100; margin-right: 14px; text-decoration: none; font-size: 14px;">
              🌐 Website
            </a>

            <a href="https://instagram.com/einfachnurphu"
              style="color: #ff9100; margin-right: 14px; text-decoration: none; font-size: 14px;">
              📸 Instagram
            </a>

            <a href="https://github.com/commanderphu"
              style="color: #ff9100; text-decoration: none; font-size: 14px;">
              💻 GitHub
            </a>
          </div>

          <p style="font-size: 12px; color: #475569; text-align: center; margin-top: 20px;">
            Dies ist eine automatische Bestätigung.  
            Du kannst einfach auf diese Nachricht antworten.
          </p>
        </div>
      `;


    if (email && email.includes("@")) {
      try {
        await resend.emails.send({
          from: emailFrom,
          to: email,
          subject: "📬 Danke für deine Nachricht!",
          html: htmlEmail,
        });

        console.log("📧 Auto-Reply gesendet");
      } catch (err) {
        console.error("❌ Auto-Reply Fehler:", err);
      }
    }

    // -----------------------------
    // KOPIE AN DICH SELBST
    // -----------------------------
    const htmlAdmin = `
      <div style="
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        max-width: 620px;
        margin: 0 auto;
        padding: 24px;
        background: #0b0e13;
        border-radius: 18px;
        border: 1px solid #1e293b;
        color: #e2e8f0;
      ">

        <!-- HEADER -->
        <h2 style="margin: 0; color: #ff9100; font-size: 26px; font-weight: 700;">
          📥 Neue Kontaktanfrage
        </h2>
        <p style="color: #94a3b8; margin: 6px 0 20px 0; font-size: 14px;">
          eingegangen über dein Kontaktformular.
        </p>

        <!-- USER DATA -->
        <div style="
          background: rgba(255,145,0,0.06);
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid #ff9100;
          margin-bottom: 24px;
        ">
          <p style="margin: 0; line-height: 1.7;">
            <strong style="color: #ff9100;">👤 Name:</strong> ${name}<br>
            <strong style="color: #ff9100;">📧 E-Mail:</strong> ${email}
          </p>
        </div>

        <!-- MESSAGE -->
        <h3 style="margin-bottom: 10px; color: #f1f5f9;">Nachricht:</h3>
        <div style="
          background: #11161d;
          padding: 16px;
          border-radius: 12px;
          font-size: 15px;
          white-space: pre-wrap;
          line-height: 1.6;
          border: 1px solid #1e293b;
          color: #e2e8f0;
        ">
          ${message.replace(/\n/g, "<br>")}
        </div>

        <!-- SYSTEM INFO -->
        <h3 style="margin-top: 28px; margin-bottom: 10px; color: #f1f5f9;">System-Informationen:</h3>
        <div style="
          background: #11161d;
          padding: 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.6;
          border: 1px solid #1e293b;
          color: #94a3b8;
        ">
          <strong style="color:#ff9100;">🌐 Browser:</strong><br>
          ${userAgent}<br><br>

          <strong style="color:#ff9100;">🕒 Eingangszeit:</strong><br>
          ${new Date().toLocaleString("de-DE")}
        </div>

        <hr style="border:none; border-top:1px solid #1e293b; margin:30px 0;" />

        <!-- FOOTER -->
        <p style="text-align:center; color:#64748b; font-size:13px; margin:0;">
          Diese Nachricht wurde automatisch über das Kontaktformular von
          <strong style="color:#ff9100;">einfachnurphu.io</strong> generiert.
        </p>
        <p style="text-align:center; color:#475569; font-size:12px; margin-top:6px;">
          © ${new Date().getFullYear()} einfachnurphu.io — All Rights Reserved
        </p>

      </div>
    `;

    try {
      await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        subject: `Neue Kontaktanfrage von ${name}`,
        html: htmlAdmin,
      });

      console.log("📨 Kopie an Betreiber gesendet");
    } catch (err) {
      console.error("❌ Betreiber-Mail Fehler:", err);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("❌ CONTACT ROUTE ERROR:", e);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
