import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#1a0b0b",
          900: "#c74a31",
          800: "#f13215",
          700: "#e2d3cb",
        },
        ember: { DEFAULT: "#c74a31", dark: "#1a0b0b" },
        gold: { DEFAULT: "#f13215", dark: "#c74a31" },
        sand: { DEFAULT: "#e2d3cb", light: "#f6eae2" },
        cream: "#f6eae2",
        ink: "#1a0b0b",
        brick: "#f13215",
      },
      fontFamily: {
        display: ["F37 Caslon", "var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
