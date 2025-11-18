"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;   // <-- SAFE COPY
    const formData = new FormData(form);

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setStatus("error");
        return;
      }

      form.reset();   // <-- JETZT IST form DEFINIERT
      setStatus("success");
    } catch (err) {
      console.error("DEBUG-CATCH", err);
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Kontakt</h1>

      {status === "success" && (
        <div className="rounded-xl bg-green-500/20 border border-green-400/30 p-4 text-green-200">
          ✔️ Nachricht erfolgreich gesendet!
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl bg-red-500/20 border border-red-400/30 p-4 text-red-200">
          ❌ Da ging etwas schief. Versuch es später nochmal.
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-white/60">Name</label>
          <input name="name" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-white/60">E-Mail</label>
          <input type="email" name="email" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-white/60">Nachricht</label>
          <textarea name="message" rows={5} required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" />
        </div>

        <div className="sm:col-span-2">
          <button
            disabled={status === "loading"}
            className="rounded-2xl bg-[var(--accent,#ff9100)] px-5 py-3 font-medium text-black hover:brightness-110 disabled:opacity-60"
          >
            {status === "loading" ? "Wird gesendet…" : "Abschicken"}
          </button>
        </div>
      </form>
    </section>
  );
}
