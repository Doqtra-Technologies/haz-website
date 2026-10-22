import { ButtonLink } from "@/presentation/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-navy-900 px-5 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="mt-4 font-display text-5xl font-light text-white">Page not found</h1>
      <p className="mt-4 text-white/70">The page you are looking for doesn&apos;t exist.</p>
      <ButtonLink href="/" className="mt-8">Back to home</ButtonLink>
    </section>
  );
}
