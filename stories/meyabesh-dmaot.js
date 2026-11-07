/* מייבש דמעות — abstract. Ink blots spread on paper while she is dressed in
   dark colors; when the black dress comes off they dry into tide-lines, pink
   blooms in, and the poem ends on an equals sign. Everything is driven by one
   scroll position `t` (0 = first couplet, 8 = last). */
(() => {
  const CSS = `
.md { --rose: #cf8f99; }
.md-scrolly { position: relative; }
.md-art { position: sticky; top: 0; height: 100vh; height: 100svh; z-index: 0; }
.md-art canvas { width: 100%; height: 100%; display: block; }
.md-poem { position: relative; z-index: 1; margin-top: -100vh; margin-top: -100svh;
  padding-left: var(--gut-l); padding-right: var(--gut-r); padding-block: 40vh 50vh; }
.md-poem .col { max-width: 1240px; margin: 0 auto; }
.md-c { width: min(26rem, 40%); min-height: 62vh; display: flex; flex-direction: column; justify-content: center; margin: 0;
  font-family: var(--f-display); font-weight: 300; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.6; text-wrap: balance;
  opacity: .22; transition: opacity .8s ease, color .8s ease; }
.md-c.on { opacity: 1; }
.md-c.seen:not(.on) { opacity: .45; }
.md-c.gap { margin-bottom: 18vh; }
.md-c span { display: block; }
.md-pink { color: var(--rose); }
.md-quiet { color: var(--ink-soft); font-size: .86em; }
.md-c.last span:last-child { margin-top: .2em; }
@media (max-width: 760px) {
  .md-c { width: 100%; min-height: 58vh;
    text-shadow: 0 0 14px #fff, 0 0 4px #fff, 0 0 2px #fff; }
  .md-poem { padding-block: 60vh 40vh; }
}
`;

  const POEM = [
    ["היא לא רוצה להתחפש למה שאינה,", "לאשה חזקה עם הבעה קשוחה."],
    ["היא לא רוצה לנעול עקבים וחליפות,", "לעטות מסכה של פנים זועפות."],
    ["היא לא רוצה לעטוף רגשות", "בצבעים כהים ומייבש דמעות."],
    ["היא רוצה לפשוט את השמלה השחורה,", "שמכריחים אותה ללבוש לעבודה."],
    ["להתחיל להתחפש לעצמה.", "לדעת שהיא יכולה."],
    ["להסתובב בביטחון בחברה", `גם עם <span class="md-pink" style="display:inline">השמלה הורודה</span>.`],
    [`<span class="md-quiet" style="display:inline">לדבר בשקט, מבלי להתפרץ</span>`, "בלי הצורך לצעוק חזק ולשחק."],
    ["לחייך כשבא,", "להביע דעה."],
    ["היא לא רוצה להתחפש למה שאינה", "רוצה להיות שווה."]
  ];
  const GAP_AFTER = [1, 3, 5]; // stanza breaks as printed

  /* ---- seeded helpers ---- */
  function rng(seed) { let s = seed >>> 0 || 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  function gauss(r) { return (r() + r() + r() + r() - 2) / 2; }
  const ease = x => x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3);
  const win = (t, a, b) => ease((t - a) / (b - a));

  /* polygon deformation: every edge gets a displaced midpoint */
  function deform(pts, depth, amt, r) {
    for (let d = 0; d < depth; d++) {
      const out = [];
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i], b = pts[(i + 1) % pts.length];
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        out.push(a, [(a[0] + b[0]) / 2 + gauss(r) * len * amt, (a[1] + b[1]) / 2 + gauss(r) * len * amt]);
      }
      pts = out;
    }
    return pts;
  }
  function circle(rad, n, r) {
    const pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const k = rad * (.85 + r() * .3); pts.push([Math.cos(a) * k, Math.sin(a) * k]); }
    return pts;
  }
  function path(c, pts) { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); }

  /* Pre-render one blot: a wet stain and its dried tide-line. */
  function makeBlot(rad, rgb, seed, layers, alpha, dpr) {
    const r = rng(seed);
    const size = Math.ceil(rad * 2.8);
    const mk = () => { const cv = document.createElement("canvas"); cv.width = cv.height = Math.ceil(size * dpr); const c = cv.getContext("2d"); c.scale(dpr, dpr); c.translate(size / 2, size / 2); return [cv, c]; };
    const base = deform(circle(rad, 10, r), 3, .42, r);
    const [wet, cw] = mk();
    cw.fillStyle = `rgba(${rgb},${alpha})`;
    // many faint, differently-deformed layers give the soft watercolor edge
    for (let i = 0; i < layers; i++) {
      const k = .9 + r() * .16;
      path(cw, deform(base.map(p => [p[0] * k, p[1] * k]), 4, .3, r)); cw.fill();
    }
    const [dry, cd] = mk();
    cd.fillStyle = `rgba(${rgb},.025)`;
    path(cd, base); cd.fill();
    cd.lineJoin = "round";
    for (let i = 0; i < 6; i++) {
      cd.strokeStyle = `rgba(${rgb},${.05 + r() * .06})`;
      cd.lineWidth = .6 + r() * 1.8;
      path(cd, deform(base, 1, .06, r)); cd.stroke();
    }
    return { wet, dry, size };
  }

  let cleanup = [];

  function mount(root, ctx) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const lines = POEM.map((c, i) => `<p class="md-c${GAP_AFTER.includes(i) ? " gap" : ""}${i === POEM.length - 1 ? " last" : ""}">${c.map(l => `<span>${l}</span>`).join("")}</p>`).join("");
    root.innerHTML = `
<div class="md" id="md">
  <header class="story-head">
    <span class="eyebrow">ענדתי אושר · עמוד 15</span>
    <h1>מייבש דמעות</h1>
    <div class="meta">שיר · דקה וחצי קריאה</div>
  </header>
  <section class="md-scrolly">
    <div class="md-art" aria-hidden="true"><canvas id="md-canvas"></canvas></div>
    <div class="md-poem"><div class="col">${lines}</div></div>
  </section>
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
</div>`;

    const md = root.querySelector("#md");
    const cv = md.querySelector("#md-canvas");
    const cs = [...md.querySelectorAll(".md-c")];
    const c = cv.getContext("2d");
    let W = 0, H = 0, dpr = 1, area, S, inks = [], blooms = [], eqSeed = 11;

    const INK = "30,32,42", ROSE = "207,143,153";

    function build() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr; cv.height = H * dpr;
      const narrow = W <= 760;
      // in RTL the poem sits on the right; the stains live on the left
      area = narrow ? { x: 0, y: H * .06, w: W, h: H * .52 } : { x: W * .04, y: 0, w: W * .56, h: H };
      S = Math.min(area.w, area.h);
      const P = (fx, fy) => [area.x + area.w * fx, area.y + area.h * fy];
      const r = rng(5);
      inks = [
        // the dark dress: one stain, then a second, with the first couplets
        { at: P(.44, .32), rad: .15, a: .1, b: 1.4 },
        { at: P(.63, .46), rad: .07, a: 1.0, b: 2.0 }
      ];
      // tears, a falling line under the stain with "ומייבש דמעות"
      for (let i = 0; i < 6; i++) {
        const a = 2.1 + i * .14;
        inks.push({ at: P(.45 + (r() - .5) * .05, .52 + i * .045), rad: .026 - i * .0028, a, b: a + .3, drop: true });
      }
      inks.forEach((k, i) => Object.assign(k, makeBlot(k.rad * S, INK, 100 + i, k.drop ? 36 : 60, k.drop ? .028 : .013, dpr)));
      blooms = [
        { at: P(.53, .36), rad: .17, a: 4.0, b: 5.5 },
        { at: P(.36, .46), rad: .07, a: 4.6, b: 5.8 }
      ];
      blooms.forEach((k, i) => Object.assign(k, makeBlot(k.rad * S, ROSE, 300 + i, 50, .012, dpr)));
    }

    /* the closing equals sign, drawn as two brush strokes */
    function stroke(x1, x2, y, prog, seed) {
      if (prog <= 0) return;
      const r = rng(seed);
      for (let b = 0; b < 40; b++) {
        const off = gauss(r) * S * .012, wob = r() * 6, alpha = .05 + r() * .12;
        c.beginPath();
        const n = 90;
        for (let i = 0; i <= n * prog; i++) {
          const t = i / n;
          const taper = Math.sin(Math.min(1, t * 1.04) * Math.PI) ** .3;
          // RTL: the stroke travels right to left
          const x = x2 - (x2 - x1) * t;
          const yy = y + off * taper + Math.sin(t * 5 + wob) * S * .002 - Math.sin(t * Math.PI) * S * .006;
          i ? c.lineTo(x, yy) : c.moveTo(x, yy);
        }
        c.strokeStyle = `rgba(28,28,26,${alpha})`;
        c.lineWidth = .6 + r() * 1.5;
        c.stroke();
      }
    }

    function draw(k, img, g, a, slide) {
      if (a <= .002) return;
      const s = (.35 + .65 * g) * k.size;
      c.globalAlpha = a;
      c.drawImage(img, k.at[0] - s / 2, k.at[1] - s / 2 - slide, s, s);
    }

    let t = -1;
    function render() {
      raf = 0;
      if (!W) return;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, W, H);
      const dry = win(t, 3.0, 4.1);         // the black dress comes off
      const fade = 1 - .6 * win(t, 6.0, 7.2); // and the tide-lines settle
      for (const k of inks) {
        const g = win(t, k.a, k.b);
        if (!g) continue;
        const slide = k.drop ? (1 - g) * S * .08 : 0;
        draw(k, k.wet, g, g * (1 - dry), slide);
        draw(k, k.dry, g, g * dry * fade, 0);
      }
      for (const k of blooms) { const g = win(t, k.a, k.b); draw(k, k.wet, g, g, 0); }
      c.globalAlpha = 1;
      const cx = area.x + area.w * .5, cy = area.y + area.h * .86, half = S * .16, gap = S * .04;
      stroke(cx - half, cx + half, cy - gap, win(t, 7.4, 8.0), eqSeed);
      stroke(cx - half, cx + half, cy + gap, win(t, 7.8, 8.4), eqSeed + 1);
    }

    function measure() {
      // t = where the reading line falls between couplet centers
      const line = innerHeight * (innerWidth <= 760 ? .7 : .5);
      const mids = cs.map(e => { const b = e.getBoundingClientRect(); return (b.top + b.bottom) / 2; });
      let nt;
      if (line <= mids[0]) nt = (line - mids[0]) / (mids[1] - mids[0]);
      else if (line >= mids[mids.length - 1]) nt = mids.length - 1 + (line - mids[mids.length - 1]) / (mids[1] - mids[0]);
      else for (let i = 0; i < mids.length - 1; i++) if (line < mids[i + 1]) { nt = i + (line - mids[i]) / (mids[i + 1] - mids[i]); break; }
      nt = Math.max(-1, Math.min(9, nt));
      const on = Math.round(nt);
      cs.forEach((e, i) => { e.classList.toggle("on", i === on); e.classList.toggle("seen", i < on); });
      if (Math.abs(nt - t) > .001) { t = nt; if (!raf) raf = requestAnimationFrame(render); }
    }

    let raf = 0, ticking = false;
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; measure(); }); } };
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { build(); t = -2; measure(); }, 150); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    const go = () => { build(); measure(); render(); };
    document.fonts && document.fonts.ready ? document.fonts.ready.then(go) : go();
    go();

    cleanup = [
      () => removeEventListener("scroll", onScroll),
      () => removeEventListener("resize", onResize),
      () => cancelAnimationFrame(raf),
      () => clearTimeout(rz),
      () => style.remove()
    ];
  }

  window.BOOK.register({
    id: "meyabesh-dmaot",
    title: "מייבש דמעות",
    page: 15,
    kind: "שיר",
    blurb: "דיו כהה נספג בנייר ומתייבש לסימני מים. שיר על שמלה שחורה, שמלה ורודה, ולהיות שווה.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M2 6 H42 M2 16 H42" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>`,
    accent: "#cf8f99",
    mount,
    unmount() { cleanup.forEach(f => f()); cleanup = []; }
  });
})();
