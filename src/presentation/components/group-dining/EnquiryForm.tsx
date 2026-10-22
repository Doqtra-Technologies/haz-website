"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "done" | "error";

const BOOKING_OPTIONS = [
  "Group booking",
  "Semi-private dining",
  "Private dining",
  "Full restaurant hire",
];
const EVENT_TYPES = ["On-Premise", "Off-Premise"];

export function EnquiryForm({ locationSlug }: { locationSlug: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [count, setCount] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setErrors({});
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locationSlug }),
      });
      const json = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
      if (json.ok) {
        setStatus("done");
        form.reset();
        setCount(0);
      } else {
        setErrors(json.errors ?? {});
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const err = (name: string) =>
    errors[name] ? <span className="mt-1 block text-xs text-ember">{errors[name]}</span> : null;

  const label = "mb-1.5 block text-[11px] text-white/70";
  const group = "text-[10px] font-semibold uppercase tracking-[0.25em] text-white";

  if (status === "done") {
    return (
      <div className="bg-navy-700/40 p-10 text-center">
        <h3 className="font-display text-3xl text-white">Thank you</h3>
        <p className="mt-3 text-sm text-white/70">
          We&apos;ve received your enquiry and a member of the team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <fieldset className="space-y-4">
        <legend className={group}>Booking details</legend>
        <div>
          <label className={label} htmlFor="bookingOption">Booking option</label>
          <select id="bookingOption" name="bookingOption" defaultValue="" className="field">
            <option value="" disabled>Booking option</option>
            {BOOKING_OPTIONS.map((o) => (
              <option key={o} value={o} className="text-ink">{o}</option>
            ))}
          </select>
          {err("bookingOption")}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="date">Date</label>
            <input id="date" name="date" type="date" className="field" />
            {err("date")}
          </div>
          <div>
            <label className={label} htmlFor="guests">Number of people</label>
            <input id="guests" name="guests" type="number" min={1} placeholder="Number of people" className="field" />
            {err("guests")}
          </div>
          <div>
            <label className={label} htmlFor="startTime">Start time</label>
            <input id="startTime" name="startTime" type="time" defaultValue="12:00" className="field" />
          </div>
          <div>
            <label className={label} htmlFor="eventType">Type of event</label>
            <select id="eventType" name="eventType" defaultValue="On-Premise" className="field">
              {EVENT_TYPES.map((o) => (
                <option key={o} value={o} className="text-ink">{o}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className={group}>Personal details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input name="firstName" placeholder="First name" aria-label="First name" className="field" />
            {err("firstName")}
          </div>
          <div>
            <input name="lastName" placeholder="Last name" aria-label="Last name" className="field" />
            {err("lastName")}
          </div>
          <div>
            <input name="mobile" type="tel" placeholder="Mobile number" aria-label="Mobile number" className="field" />
            {err("mobile")}
          </div>
          <div>
            <input name="email" type="email" placeholder="Email address" aria-label="Email address" className="field" />
            {err("email")}
          </div>
        </div>
        <div>
          <textarea
            name="message"
            rows={4}
            maxLength={300}
            placeholder="Message (300 characters max)"
            aria-label="Message"
            onChange={(e) => setCount(e.target.value.length)}
            className="field resize-none"
          />
          <span className="mt-1 block text-right text-[11px] text-white/40">{count}/300</span>
          {err("message")}
        </div>
      </fieldset>

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-ember px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-ember-dark disabled:opacity-50"
        >
          {status === "loading" ? "Sending…" : "Send enquiry"}
        </button>
        {status === "error" && Object.keys(errors).length === 0 && (
          <p className="mt-3 text-sm text-ember">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}
