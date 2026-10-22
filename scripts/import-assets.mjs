// Usage: npm run import-assets -- "<path to unzipped HAZ folder>"
// Copies Haz logo + photography into public/ using the filenames the site expects.
import { readdirSync, statSync, copyFileSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";

const root = process.argv[2];
if (root) console.log("Scanning", root);
if (!root) { console.error('Pass the unzipped HAZ folder path.'); process.exit(1); }

const all = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p) : all.push(p);
  }
})(root);

mkdirSync("public/images", { recursive: true });
const find = (re) => all.find((p) => re.test(p.replace(/\\/g, "/")));
const jobs = [
  [/Haz_Wordmark-0?1\.png$/i, "public/logo.png"],
  [/Nic Crilly-Hargrave-14[^/]*\.jpg$/i, "public/images/photo-14.jpg"],
  [/Nic Crilly-Hargrave-20[^/]*\.jpg$/i, "public/images/photo-20.jpg"],
  [/Nic Crilly-Hargrave-19[^/]*\.jpg$/i, "public/images/photo-19.jpg"],
  [/Nic Crilly-Hargrave-28[^/]*\.jpg$/i, "public/images/photo-28.jpg"],
  [/Nic Crilly-Hargrave-29[^/]*\.jpg$/i, "public/images/photo-29.jpg"],
  [/Nic Crilly-Hargrave-46[^/]*\.jpg$/i, "public/images/photo-46.jpg"],
  [/(^|\/)plantation-place\.jpg$/i, "public/images/plantation-place.jpg"],
  [/haz-plantation-place \(1\)\.jpg$/i, "public/images/haz-plantation-place.jpg"],
  [/general-dining-area\.jpg$/i, "public/images/general-dining-area.jpg"],
];
mkdirSync("public/fonts", { recursive: true });
for (const [re, dest] of jobs) {
  const src = find(re);
  if (src) { copyFileSync(src, dest); console.log("ok  ", basename(src), "->", dest); }
  else console.warn("MISSING", re);
}

console.log(`\nScanned ${all.length} files. If most lines say MISSING, the path is wrong or files were not downloaded.`);
