// Usage: node scripts/verify-live.mjs [baseUrl]
// Checks a deployed site (production by default) for the current client round:
// page HTML must / must not contain given strings, and key assets must return 200.
// Exits 1 if any check fails. Update PAGES and ASSET_DIRS for future rounds.
import { readdirSync } from "node:fs";

const BASE = (process.argv[2] || process.env.SITE_URL || "https://haz-website-red.vercel.app").replace(/\/$/, "");
// Size of the pre-rebrand src/app/icon.png, so a stale icon is caught.
const OLD_ICON_BYTES = 12166;

const OLD_FINSBURY = ["haz-location-finsbury-", "haz-group-finsbury-"];
const PAGES = [
  ["/", ["/brand/haz-logo-light.svg", "--font-heading", "--font-body"], ["/logo.png", "haz-wordmark.png", ...OLD_FINSBURY]],
  ["/locations", ["locations/finsbury-square/cover-01"], OLD_FINSBURY],
  [
    "/locations/finsbury-square",
    ["finsburysquare@hazrestaurant.co.uk", ...[1, 2, 3, 4, 5].map((n) => `interior-0${n}`)],
    ["kenan@", ...OLD_FINSBURY],
  ],
  ["/locations/st-pauls", ["stpauls@hazrestaurant.co.uk"], ["kenan@", "armonas@"]],
  ["/locations/bishopsgate", ["bishopsgate@hazrestaurant.co.uk"], ["kenan@", "rozerin@"]],
  ["/locations/plantation-place", ["plantationplace@hazrestaurant.co.uk"], ["kenan@", "anil@"]],
  ["/locations/premier-place", ["premierplace@hazrestaurant.co.uk"], ["kenan@", "md.israfil@"]],
  ["/group-dining", ["locations/finsbury-square/cover-01"], OLD_FINSBURY],
  [
    "/group-dining/finsbury-square",
    ["locations/finsbury-square/cover-01", "locations/finsbury-square/interior-0", "finsburysquare@hazrestaurant.co.uk"],
    OLD_FINSBURY,
  ],
];
const ASSET_DIRS = ["brand", "images/locations/finsbury-square"];
const ICONS = ["/favicon.ico", "/icon.png", "/apple-icon.png"];

const bust = (path) => `${BASE}${path}${path.includes("?") ? "&" : "?"}v=${Date.now()}`;
const results = [];
const record = (ok, name, detail = "") => results.push({ ok, name, detail });

// next/image URL-encodes src paths and HTML escapes "&", so match against a decoded copy too.
function decoded(html) {
  const text = html.replace(/&amp;/g, "&");
  try {
    return decodeURIComponent(text);
  } catch {
    return text.replace(/%2F/gi, "/");
  }
}

async function get(path) {
  const res = await fetch(bust(path), { headers: { "cache-control": "no-cache" }, redirect: "follow" });
  return res;
}

const cssSeen = new Map();
for (const [path, must, mustNot] of PAGES) {
  const res = await get(path);
  const html = await res.text();
  // Inline the page's stylesheets so font variables (defined in CSS) can be matched too.
  for (const href of html.matchAll(/<link[^>]+href="([^"]+\.css[^"]*)"/g)) {
    if (!cssSeen.has(href[1])) cssSeen.set(href[1], await (await fetch(new URL(href[1], BASE))).text());
  }
  const haystack = `${html}\n${decoded(html)}\n${[...cssSeen.values()].join("\n")}`;
  const missing = must.filter((s) => !haystack.includes(s));
  const found = mustNot.filter((s) => haystack.includes(s));
  const ok = res.status === 200 && missing.length === 0 && found.length === 0;
  const detail = [
    res.status !== 200 && `HTTP ${res.status}`,
    missing.length && `missing: ${missing.join(", ")}`,
    found.length && `still has: ${found.join(", ")}`,
  ]
    .filter(Boolean)
    .join("; ");
  record(ok, `page ${path}`, detail);
}

for (const path of ICONS) {
  const res = await get(path);
  const size = (await res.arrayBuffer()).byteLength;
  record(res.status === 200 && size !== OLD_ICON_BYTES, `icon ${path}`, `HTTP ${res.status}, ${size} bytes`);
}

for (const dir of ASSET_DIRS) {
  for (const file of readdirSync(new URL(`../public/${dir}`, import.meta.url))) {
    const res = await get(`/${dir}/${file}`);
    record(res.status === 200, `asset /${dir}/${file}`, `HTTP ${res.status}`);
  }
}

const fonts = new Set();
for (const css of cssSeen.values()) {
  for (const m of css.matchAll(/url\(([^)]+\.(?:woff2?|otf|ttf))\)/g)) fonts.add(m[1].replace(/["']/g, ""));
}
if (fonts.size === 0) record(false, "fonts referenced in CSS", "no font files found in page CSS");
for (const font of fonts) {
  const res = await fetch(new URL(font, BASE));
  record(res.status === 200, `font ${font}`, `HTTP ${res.status}`);
}

console.log(`verify-live: ${BASE}\n`);
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
