import type { Config } from "tailwindcss";

/** Brand colours live as RGB channels in globals.css so opacity modifiers keep working. */
const brand = (name: string) => `rgb(var(--haz-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        haz: {
          espresso: brand("espresso"),
          oat: brand("oat"),
          porcelain: brand("porcelain"),
          terracotta: brand("terracotta"),
          coral: brand("coral"),
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
