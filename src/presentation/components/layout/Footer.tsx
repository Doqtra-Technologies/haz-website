import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "../forms/NewsletterForm";
import { LogoImage } from "./Logo";

const label = "text-[10px] uppercase tracking-[0.25em] text-white";
const link = "text-sm text-white underline-offset-4 hover:underline";

export function Footer() {
  return (
    <footer className="bg-haz-terracotta text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Haz home" className="inline-block pt-14">
          <LogoImage variant="lockup" className="h-24" />
        </Link>
        <div className="grid gap-12 py-14 md:grid-cols-3 md:gap-0">
          <div className="md:border-r md:border-white/25 md:pr-10">
            <h2 className={label}>About us</h2>
            <ul className="mt-6 space-y-3">
              <li><Link href="/about" className={link}>Our Story</Link></li>
              <li><Link href="/locations" className={link}>Locations</Link></li>
            </ul>
          </div>
          <div className="md:border-r md:border-white/25 md:px-10">
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

        <div className="grid gap-8 border-t border-white/25 py-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className={label}>Join the Haz community</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white">
              Enter your email address to receive updates, exclusive offers, new
              launches, and latest news from Haz.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="border-t border-white/25 py-6 text-sm text-white">
          <span className={label}>Email</span>{" "}
          <a href={`mailto:${siteConfig.email}`} className="ml-2 underline-offset-4 hover:underline">
            {siteConfig.email}
          </a>
        </div>

        <p className="border-t border-white/25 py-6 text-xs text-white">
          © {new Date().getFullYear()} Haz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
