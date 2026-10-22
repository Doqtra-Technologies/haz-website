import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "../forms/NewsletterForm";

const label = "text-[10px] uppercase tracking-[0.25em] text-white/40";
const link = "text-sm text-white/80 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 py-14 md:grid-cols-3 md:gap-0">
          <div className="md:border-r md:border-white/10 md:pr-10">
            <h2 className={label}>About us</h2>
            <ul className="mt-6 space-y-3">
              <li><Link href="/about" className={link}>Our Story</Link></li>
              <li><Link href="/locations" className={link}>Locations</Link></li>
            </ul>
          </div>
          <div className="md:border-r md:border-white/10 md:px-10">
            <h2 className={label}>Follow us</h2>
            <ul className="mt-6 space-y-3">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:pl-10">
            <h2 className={label}>Explore</h2>
            <ul className="mt-6 space-y-3">
              <li><Link href="/menu" className={link}>Menu</Link></li>
              <li><Link href="/group-dining" className={link}>Group Dining</Link></li>
              <li><Link href="/whats-on" className={link}>What&apos;s On</Link></li>
              <li><Link href="/blog" className={link}>Blog</Link></li>
              <li><Link href="/book" className={link}>Book a Table</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/10 py-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className={label}>Join the Haz community</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              Enter your email address to receive updates, exclusive offers, new
              launches, and latest news from Haz.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <p className="border-t border-white/10 py-6 text-xs text-white/40">
          © {new Date().getFullYear()} Haz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
