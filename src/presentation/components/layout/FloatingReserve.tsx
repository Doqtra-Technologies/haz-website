import Link from "next/link";

/** Sticky "Reserve now" button used on menu and what's-on pages. */
export function FloatingReserve({ tone = "ember" }: { tone?: "ember" | "gold" }) {
  const colour =
    tone === "gold" ? "bg-gold hover:bg-gold-dark text-ink" : "bg-ember hover:bg-ember-dark text-white";
  return (
    <Link
      href="/book"
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-lg transition-colors ${colour}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
      Reserve now
    </Link>
  );
}
