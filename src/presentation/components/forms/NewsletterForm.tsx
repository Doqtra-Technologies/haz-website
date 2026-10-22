"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "done" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-end border-b border-white/30 focus-within:border-white">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email"
          aria-label="Email address"
          className="w-full bg-transparent py-3 text-2xl font-light text-white placeholder:text-white/30 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
          className="pb-3 pl-4 text-white/70 hover:text-white disabled:opacity-40"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <p role="status" className="mt-2 min-h-5 text-xs text-white/60">
        {status === "done" && "Thank you for subscribing."}
        {status === "error" && "Something went wrong. Please check your email and try again."}
      </p>
    </form>
  );
}
