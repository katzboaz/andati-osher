// The whole book as plain text, for the ebook reader (stories/reader.js).
// Every piece is mounted once in headless Chrome, exactly as the site shows it, and its
// words are read back as simple blocks (paragraphs, stanzas, part headings), leaving out
// the drawings and controls. The result is written to stories/book-text.js and committed;
// run this again (node tools/booktext.mjs) whenever a piece's text changes.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// runs inside the page, after the shell has loaded
const extract = async () => {
  const B = window.BOOK, root = document.getElementById("story-root");
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const SKIP = ".story-head, .story-end, .kt-title, .kt-end, .ks-frame.title, .ks-frame.end, .kt-foot, .ks-foot, .yv-thread, .yv-foot, .yv-head, .yv-end, nav, button, svg, style, script, [aria-hidden='true'], .ms-hint, .n5-n, .in-time, .ar-hud, .ar-meta, .ae-seg";
  const KEEP = ["line", "solo", "said", "thanks"];
  const norm = s => s.replace(/\s+/g, " ").trim();
  const isBlockSpan = k => k.tagName === "SPAN" && getComputedStyle(k).display === "block";
  function walk(nodes, out) {
    for (const c of nodes) {
      if (c.matches(SKIP)) continue;
      const kids = [...c.children].filter(k => !k.matches(SKIP));
      const direct = [...c.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim());
      if (c.matches(".kt-part")) { out.push({ t: "h", x: norm(c.querySelector("h2").textContent) }); continue; }
      if (c.matches(".hv-time")) { out.push({ t: "time", x: norm(c.textContent) }); continue; }
      if (c.matches(".ms-cols")) {
        const [a, b] = [...c.querySelectorAll(".ms-col")].map(col => [...col.children].map(s => norm(s.textContent)));
        out.push({ t: "cols", a, b }); continue;
      }
      if (c.matches(".ae-v.hers")) out.push({ t: "gap" });
      if (!direct && kids.length && kids.every(isBlockSpan)) {
        if (c.matches(".gap")) out.push({ t: "gap" });
        out.push({ t: "st", l: kids.map(k => norm(k.textContent)) }); continue;
      }
      if (c.tagName === "P" || direct) {
        const x = norm(c.textContent);
        if (x) out.push(Object.assign({ t: "p", x }, KEEP.find(k => c.classList.contains(k)) ? { c: KEEP.find(k => c.classList.contains(k)) } : {}));
        continue;
      }
      walk(kids, out);
    }
  }
  const sections = [];
  for (const e of B.toc) {
    const s = e.id && B.stories[e.id];
    if (!s) continue;
    location.hash = e.id;
    await sleep(200);
    const blocks = [];
    walk([...root.children], blocks);
    sections.push({ id: e.id, t: e.t, s: e.s || "", p: e.p, kind: s.kind || "", blocks });
  }
  location.hash = "";
  await sleep(50);
  document.body.innerHTML = "";
  const pre = document.createElement("pre");
  pre.id = "out"; pre.textContent = JSON.stringify(sections);
  document.body.appendChild(pre);
};

const shell = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const page = path.join(ROOT, `_extract-${process.pid}.html`);
fs.writeFileSync(page, `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=1280"></head><body>${shell}
<script>addEventListener("load", () => (${extract.toString()})());</script></body></html>`);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "andati-text-"));
let dom;
try {
  ({ stdout: dom } = await run(CHROME, ["--headless=new", "--disable-gpu", "--window-size=1280,900", "--virtual-time-budget=30000",
    `--user-data-dir=${profile}`, "--dump-dom", "file://" + page], { maxBuffer: 64 * 1024 * 1024 }));
} finally {
  fs.rmSync(page, { force: true });
  fs.rmSync(profile, { recursive: true, force: true });
}
const m = dom.match(/<pre id="out">([\s\S]*?)<\/pre>/);
if (!m) throw new Error("extraction did not finish");
const json = m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const sections = JSON.parse(json);
const out = `/* The whole book as plain text, read back from the pieces by tools/booktext.mjs. Generated; do not edit by hand. */
window.BOOK_TEXT = [
${sections.map(s => "  " + JSON.stringify(s)).join(",\n")}
];
`;
fs.writeFileSync(path.join(ROOT, "stories", "book-text.js"), out);
const words = sections.reduce((n, s) => n + JSON.stringify(s.blocks).split(/\s+/).length, 0);
console.log(`book-text: ${sections.length} sections, ~${words} words, ${sections.filter(s => !s.blocks.length).map(s => s.id).join(" ") || "none"} empty`);
