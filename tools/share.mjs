// Share pages and preview images for the built site (run by build.sh after docs/ exists).
// Link previews come from crawlers that never run the page's script and ignore the #hash,
// so each piece gets a real address, BASE/<id>/, holding its own title, description and
// image, which then forwards the reader to BASE/#<id>. The images are drawn in headless
// Chrome from a small card template and kept in og/ (committed), redrawn only when a card changes.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import os from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DOCS = path.join(ROOT, "docs"), OG = path.join(ROOT, "og");
const BASE = "https://katzboaz.github.io/andati-osher/";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BOOK = "ענדתי אושר", AUTHOR = "בועז כץ";
const BOOK_BLURB = "סיפורים קצרים ושירים מאת בועז כץ, כאתר קריאה: כל קטע בעמוד משלו.";

/* ---- what the site knows: the contents and every registered piece ---- */
const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const toc = vm.runInNewContext("(" + index.match(/toc: (\[[\s\S]*?\n  \]),/)[1] + ")");
const ctx = { matchMedia: () => ({ matches: false }), console };
ctx.window = ctx;
ctx.BOOK = { toc, stories: {}, register(s) { this.stories[s.id] = s; } };
vm.createContext(ctx);
const scripts = [...index.matchAll(/<script src="(stories\/[^"]+)"><\/script>/g)].map(m => m[1]);
for (const f of scripts) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
const S = ctx.BOOK.stories;

const pieces = toc.filter(e => e.id && S[e.id]).map(e => ({
  id: e.id, title: e.t, sub: e.s || "", page: e.p,
  kind: S[e.id].kind || "", blurb: S[e.id].blurb || BOOK_BLURB, glyph: S[e.id].glyph || "", accent: S[e.id].accent || "#c48b90"
}));
// the hidden page of אני אצל יובל can be shared too, once someone has found it
const yv = S["yuval"];
if (yv) pieces.push({ id: "yuval", title: "אני אצל יובל", sub: "כל הפרקים ברצף", page: 0, kind: "סיפור בפרקים",
  blurb: "תשעת הפרקים של אני אצל יובל ברצף, לפי סדר הספר או לפי סדר הזמן.", glyph: S["yuval-1"].glyph, accent: yv.accent });
const home = { id: "home", title: BOOK, sub: AUTHOR, page: 0, kind: "ספר", blurb: BOOK_BLURB, glyph: S["andati-osher"].glyph, accent: "#c48b90" };

/* ---- cards ---- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const titleSize = t => t.length > 16 ? 84 : t.length > 10 ? 100 : 124;
const card = p => `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400&family=IBM+Plex+Sans+Hebrew:wght@300;400&display=block">
<style>
html, body { margin: 0; width: 1200px; height: 630px; background: #fff; color: #1c1c1a; overflow: hidden; }
.c { position: absolute; inset: 0 88px 0; display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 72px; align-items: center; padding-bottom: 40px; }
.eb { font-family: "IBM Plex Sans Hebrew"; font-weight: 300; font-size: 24px; letter-spacing: .05em; color: #74736c; }
h1 { font-family: "Frank Ruhl Libre"; font-weight: 300; font-size: ${titleSize(p.title)}px; line-height: 1.02; margin: 18px 0 22px; text-wrap: balance; }
.sub { font-family: "IBM Plex Sans Hebrew"; font-weight: 300; font-size: 30px; color: #74736c; }
.g { display: flex; align-items: center; justify-content: center; color: #1c1c1a; }
.g svg { width: 220px; height: auto; overflow: visible; }
.f { position: absolute; left: 88px; right: 88px; bottom: 54px; border-top: 1px solid #e4e3de; padding-top: 22px; display: flex; justify-content: space-between; align-items: center;
  font-family: "IBM Plex Sans Hebrew"; font-weight: 300; font-size: 22px; letter-spacing: .05em; color: #74736c; }
.f i { display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: ${p.accent}; margin-left: 14px; vertical-align: middle; }
</style></head><body>
<div class="c"><div><div class="eb">${esc(p.kind)}</div><h1>${esc(p.title)}</h1>${p.sub ? `<div class="sub">${esc(p.sub)}</div>` : ""}</div>
<div class="g">${p.glyph}</div></div>
<div class="f"><span><i></i>${p.id === "home" ? "סיפורים ושירים" : `${BOOK} · ${AUTHOR}`}</span><span>${p.page ? "עמוד " + p.page : ""}</span></div>
</body></html>`;

fs.mkdirSync(OG, { recursive: true });
const hashFile = path.join(OG, "hashes.json");
const hashes = fs.existsSync(hashFile) ? JSON.parse(fs.readFileSync(hashFile, "utf8")) : {};
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "andati-og-"));
const all = [home, ...pieces];
const todo = all.filter(p => {
  const h = crypto.createHash("sha1").update(card(p)).digest("hex").slice(0, 12);
  p.hash = h;
  return hashes[p.id] !== h || !fs.existsSync(path.join(OG, p.id + ".png"));
});
async function draw(p) {
  const src = path.join(tmp, p.id + ".html");
  fs.writeFileSync(src, card(p));
  await run(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1200,630",
    "--virtual-time-budget=6000", `--user-data-dir=${path.join(tmp, "profile-" + p.id)}`, `--screenshot=${path.join(OG, p.id + ".png")}`, "file://" + src]);
  hashes[p.id] = p.hash;
}
for (let i = 0; i < todo.length; i += 4) await Promise.all(todo.slice(i, i + 4).map(draw));
fs.writeFileSync(hashFile, JSON.stringify(hashes, null, 1) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });

/* ---- meta tags, the share pages, and the home page's head ---- */
const meta = (p, url) => {
  const title = p.id === "home" ? `${BOOK} · ${AUTHOR}` : `${p.title}${p.sub ? " · " + p.sub : ""} · ${BOOK}`;
  const img = `${BASE}og/${p.id}.png?v=${p.hash}`;
  return { title, tags: `<title>${esc(title)}</title>
<meta name="description" content="${esc(p.blurb)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${p.id === "home" ? "website" : "article"}">
<meta property="og:site_name" content="${BOOK}">
<meta property="og:locale" content="he_IL">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(p.blurb)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(p.blurb)}">
<meta name="twitter:image" content="${img}">` };
};
fs.mkdirSync(path.join(DOCS, "og"), { recursive: true });
for (const p of all) fs.copyFileSync(path.join(OG, p.id + ".png"), path.join(DOCS, "og", p.id + ".png"));
for (const p of pieces) {
  const m = meta(p, `${BASE}${p.id}/`);
  fs.mkdirSync(path.join(DOCS, p.id), { recursive: true });
  fs.writeFileSync(path.join(DOCS, p.id, "index.html"), `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${m.tags}
<script>location.replace("../#${p.id}");</script>
</head><body><p><a href="../#${p.id}">${esc(m.title)}</a></p></body></html>
`);
}
const docIndex = path.join(DOCS, "index.html");
const head = '<head><meta charset="utf-8">';
fs.writeFileSync(docIndex, fs.readFileSync(docIndex, "utf8").replace(head, head + "\n" + meta(home, BASE).tags + "\n"));
console.log(`share: ${pieces.length} pages, ${todo.length} image(s) drawn`);
