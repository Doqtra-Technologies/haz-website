"use client";

import { useMemo, useState } from "react";

const restaurants = [
  { id: "355443", name: "HAZ Bishopsgate" },
  { id: "83689", name: "HAZ St Paul's" },
  { id: "289461", name: "HAZ Finsbury Square" },
  { id: "83686", name: "HAZ Plantation Place" },
  { id: "83707", name: "HAZ Premier Place" },
];

const times = Array.from({ length: 25 }, (_, index) => {
  const minutes = 11 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

const today = new Date();
const localDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

export function BookingWidget() {
  const [restaurantId, setRestaurantId] = useState("");
  const [selectedDate, setSelectedDate] = useState(localDateKey(today));
  const [month, setMonth] = useState(startOfMonth(today));
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2");

  const days = useMemo(() => {
    const firstWeekday = month.getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [
      ...Array.from({ length: firstWeekday }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [month]);

  const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === restaurantId);
  const bookingUrl = useMemo(() => {
    if (!restaurantId) return null;
    const url = new URL("https://www.opentable.co.uk/booking/restref/availability");
    url.searchParams.set("lang", "en-GB");
    url.searchParams.set("restRef", restaurantId);
    url.searchParams.set("covers", guests);
    url.searchParams.set("dateTime", `${selectedDate}T${time}:00`);
    url.searchParams.set("otSource", "Restaurant website");
    return url.toString();
  }, [restaurantId, guests, selectedDate, time]);

  const canGoToPreviousMonth =
    month.getFullYear() > today.getFullYear() ||
    (month.getFullYear() === today.getFullYear() && month.getMonth() > today.getMonth());

  return (
    <div className="grid overflow-hidden border border-white/15 bg-[#1a0b0b] lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.8fr)]">
      <div className="p-5 sm:p-8 lg:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ember">
          Choose your restaurant
        </p>

        <label
          htmlFor="booking-restaurant"
          className="mt-7 block text-[9px] font-semibold uppercase tracking-[0.25em] text-sand/75"
        >
          Location
        </label>
        <select
          id="booking-restaurant"
          value={restaurantId}
          onChange={(event) => setRestaurantId(event.target.value)}
          className="mt-2 h-11 w-full border border-white/15 bg-white/[0.06] px-3 text-sm text-white outline-none transition-colors focus:border-ember sm:max-w-xl"
        >
          <option value="" className="bg-[#1a0b0b]">
            Select a restaurant
          </option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id} className="bg-[#1a0b0b]">
              {restaurant.name}
            </option>
          ))}
        </select>

        <div className="mt-7 max-w-xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-sand/75">
            Date
          </p>
          <div className="mt-2 border border-white/15 bg-white/[0.04] p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                disabled={!canGoToPreviousMonth}
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                className="flex h-8 w-8 items-center justify-center text-sand/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
              >
                ‹
              </button>
              <p className="font-display text-sm text-sand-light">
                {month.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                className="flex h-8 w-8 items-center justify-center text-sand/70 transition-colors hover:text-white"
              >
                ›
              </button>
            </div>
            <div className="mt-2 grid grid-cols-7 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => (
                <span
                  key={weekday}
                  className="py-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-sand/45 sm:text-[9px]"
                >
                  {weekday}
                </span>
              ))}
              {days.map((day, index) => {
                if (day === null) return <span key={`empty-${index}`} />;
                const date = new Date(month.getFullYear(), month.getMonth(), day);
                const dateKey = localDateKey(date);
                const isPast = dateKey < localDateKey(today);
                const isSelected = selectedDate === dateKey;
                return (
                  <button
                    key={dateKey}
                    type="button"
                    disabled={isPast}
                    aria-label={date.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedDate(dateKey)}
                    className={`mx-auto my-0.5 flex h-8 w-8 items-center justify-center text-[10px] transition-colors sm:h-9 sm:w-9 sm:text-[11px] ${
                      isSelected
                        ? "bg-ember font-semibold text-white"
                        : isPast
                          ? "cursor-not-allowed text-white/20"
                          : "text-sand/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-7 grid max-w-xl grid-cols-2 gap-4">
          <label className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-sand/75">
            Time
            <select
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="mt-2 h-11 w-full border border-white/15 bg-white/[0.06] px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-ember"
            >
              {times.map((option) => (
                <option key={option} value={option} className="bg-[#1a0b0b]">
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-sand/75">
            Guests
            <select
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              className="mt-2 h-11 w-full border border-white/15 bg-white/[0.06] px-3 text-sm normal-case tracking-normal text-white outline-none focus:border-ember"
            >
              {Array.from({ length: 30 }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count} className="bg-[#1a0b0b]">
                  {count} {count === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </label>
        </div>

        {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex h-12 max-w-xl items-center justify-center bg-ember px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-ember-dark"
          >
            Find a table
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-7 h-12 w-full max-w-xl cursor-not-allowed bg-ember/45 px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70"
          >
            Select a location first
          </button>
        )}
      </div>

      <aside className="flex flex-col justify-between border-t border-white/15 bg-white/[0.025] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-9">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-ember">
            HAZ reservations
          </p>
          <h2 className="mt-4 font-display text-2xl text-sand-light sm:text-3xl">
            Your table, your time.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Choose from our five City of London restaurants and book directly with OpenTable.
          </p>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-[9px] uppercase tracking-[0.2em] text-sand/50">Your selection</p>
          <p className="mt-2 font-display text-lg text-white">
            {selectedRestaurant?.name ?? "Choose a restaurant"}
          </p>
          <p className="mt-1 text-xs text-white/55">
            {new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            · {time} · {guests} {guests === "1" ? "guest" : "guests"}
          </p>
        </div>
        {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex min-h-12 items-center justify-center gap-2 bg-ember px-4 py-3 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ember-dark"
          >
            Book your table
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <p className="mt-7 border border-white/15 px-4 py-3 text-center text-[9px] uppercase tracking-[0.15em] text-white/45">
            Select a restaurant to book
          </p>
        )}
      </aside>
    </div>
  );
}
