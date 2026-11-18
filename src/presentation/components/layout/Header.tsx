"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/config/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-haz-espresso/95 backdrop-blur" : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-haz-coral ${
                  active ? "text-haz-coral" : "text-white/90"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/book"
            className="border border-haz-coral px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-haz-coral transition-colors hover:bg-haz-coral hover:text-haz-espresso"
          >
            Reserve
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="flex h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto bg-haz-espresso px-5 pb-10 pt-6 lg:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-white/10 py-4 font-heading text-2xl text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="mt-6 border border-haz-coral py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-haz-coral"
          >
            Reserve a table
          </Link>
        </nav>
      )}
    </header>
  );
}
