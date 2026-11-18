import type { Metadata } from "next";
import { BookingWidget } from "@/presentation/components/book/BookingWidget";
import { Container } from "@/presentation/components/ui/Container";

export const metadata: Metadata = { title: "Book a Table" };

export default function BookPage() {
  return (
    <section className="bg-haz-espresso pb-20 pt-32">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.3em] text-haz-porcelain">Reserve a table</p>
        <h1 className="mt-4 font-heading text-5xl font-light uppercase tracking-wide text-haz-porcelain sm:text-6xl">
          Book your <span className="italic normal-case">table</span>
        </h1>
        <div className="mt-5 h-px w-14 bg-haz-porcelain/70" />
        <p className="mt-6 max-w-xl font-heading text-lg text-white/80">
          Same-day tables and group bookings across all HAZ restaurants.
        </p>
        <div className="mt-10 sm:mt-12">
          <BookingWidget />
        </div>
        <p className="mt-6 text-xs text-white/50">
          For information relating to allergens, please see our disclaimer on the menus page.
        </p>
      </Container>
    </section>
  );
}
