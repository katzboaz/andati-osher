/* מרי-אן — abstract, and kept quiet. A thin ring is the song: reading the
   poem fills its three hundred and forty seconds. Inside, two points turn
   slowly around each other; they stop when the world stops, become one, stand
   apart as they did when they met, and close in again at the end. Scroll
   gives `t` (0 = first stanza, 6 = last); the slow turn runs on the clock. */
(() => {
  const CSS = `
.ma { --violet: #6f5aa8; }
.ma-scrolly { position: relative; }
.ma-art { position: sticky; top: 0; height: 100vh; height: 100svh; z-index: 0; }
.ma-art canvas { width: 100%; height: 100%; display: block; }
.ma-poem { position: relative; z-index: 1; margin-top: -100vh; margin-top: -100svh;
  padding-left: var(--gut-l); padding-right: var(--gut-r); padding-block: 40vh 50vh; }
.ma-poem .col { max-width: 1240px; margin: 0 auto; }
.ma-s { width: min(26rem, 40%); min-height: 72vh; display: flex; flex-direction: column; justify-content: center; margin: 0;
  font-family: var(--f-display); font-weight: 300; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.6; text-wrap: balance;
  opacity: .22; transition: opacity .8s ease; }
.ma-s.on { opacity: 1; }
.ma-s.seen:not(.on) { opacity: .45; }
.ma-s span { display: block; }
.ma-s.ref span:not(:last-child) { color: var(--ink-soft); }
.ma-s.turn { margin-bottom: 16vh; }
@media (max-width: 760px) {
  .ma-s { width: 100%; min-height: 62vh;
    text-shadow: 0 0 14px #fff, 0 0 4px #fff, 0 0 2px #fff; }
  .ma-poem { padding-block: 60vh 40vh; }
}
`;

  // the refrain comes back three times; only its last line changes
  const POEM = [
    { ref: true, l: ["רקדתי היום", "עם אשתי בסלון,", "הילדים עדיין לא הלכו לישון."] },
    { l: ["התחבקנו.", "הגברנו צלילים,", "ניסינו להימנע", "מלשמוע את עצמנו חושבים."] },
    { l: ["שלוש מאות שניות וארבעים", "נכחנו רק כאן.", "שנינו.", "עם לאונרד ומרי-אן."] },
    { ref: true, turn: true, l: ["רקדתי היום", "עם אשתי בסלון,", "הילדים כבר הלכו לישון."] },
    { l: ["העולם עצר לרגע,", "היינו האחד בשניה.", "שחררנו. התרנו לעצמנו", "להתאהב בתקופה."] },
    { l: ["נפגשנו,", "כשהיינו כמעט צעירים", "בשדות חוף הים", "הפתוחים."] },
    { ref: true, l: ["רקדתי היום", "עם אשתי בסלון,", "לרגע התאהבנו שוב ממבט ראשון."] }
  ];
  const SONG = 340; // seconds

  const ease = x => x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3);
  const smooth = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);
  const win = (t, a, b) => ease((t - a) / (b - a));
  const bump = (t, a, b, c, d) => win(t, a, b) * (1 - win(t, c, d));
  const lerp = (a, b, k) => a + (b - a) * k;
  // piecewise curve through [t, value] keys
  function keys(K, x) {
    if (x <= K[0][0]) return K[0][1];
    for (let i = 1; i < K.length; i++) if (x <= K[i][0]) {
      const a = K[i - 1], b = K[i];
      return lerp(a[1], b[1], smooth((x - a[0]) / (b[0] - a[0])));
    }
    return K[K.length - 1][1];
  }
  // distance between the two of them, as a fraction of the ring's radius:
  // close in the hug, one in "האחד בשניה", far apart on the shore, then one again
  const APART = [[-1, .3], [0, .3], [1, .14], [3, .16], [3.8, .12], [4.2, 0], [4.6, .04], [4.7, .04], [4.95, .9], [5.4, .9], [5.95, 0]];

  let cleanup = [];

  function mount(root, ctx) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const html = POEM.map(s => `<p class="ma-s${s.ref ? " ref" : ""}${s.turn ? " turn" : ""}">${s.l.map(l => `<span>${l}</span>`).join("")}</p>`).join("");
    root.innerHTML = `
<div class="ma" id="ma">
  <header class="story-head">
    <span class="eyebrow">ענדתי אושר · עמוד 20</span>
    <h1>מרי-אן</h1>
    <div class="meta">שיר · דקה קריאה</div>
  </header>
  <section class="ma-scrolly">
    <div class="ma-art" aria-hidden="true"><canvas id="ma-canvas"></canvas></div>
    <div class="ma-poem"><div class="col">${html}</div></div>
  </section>
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
</div>`;

    const ma = root.querySelector("#ma");
    const cv = ma.querySelector("#ma-canvas");
    const ss = [...ma.querySelectorAll(".ma-s")];
    const c = cv.getContext("2d");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const INK = "28,28,26", VI = "111,90,168";
    let W = 0, H = 0, dpr = 1, R, C;

    function build() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr; cv.height = H * dpr;
      const narrow = W <= 760;
      // in RTL the poem sits on the right; the ring is on the left
      const area = narrow ? { x: 0, y: H * .04, w: W, h: H * .52 } : { x: W * .04, y: 0, w: W * .56, h: H };
      R = Math.min(area.w, area.h) * (narrow ? .3 : .27);
      C = [area.x + area.w / 2, area.y + area.h * (narrow ? .5 : .47)];
    }

    let tgt = -1, ts = -1, phase = 0, last = 0, raf = 0;

    function dot(x, y) {
      c.fillStyle = `rgba(${INK},.9)`;
      c.beginPath(); c.arc(x, y, 3.4, 0, Math.PI * 2); c.fill();
    }

    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!W) return;
      const dt = Math.min(.05, last ? (now - last) / 1000 : 0);
      last = now;
      ts += (tgt - ts) * Math.min(1, dt * 3);
      // "the world stopped for a moment": the turn stops, then goes on
      const run = still ? 0 : 1 - bump(ts, 3.75, 4.05, 4.4, 4.7);
      phase += dt * run * Math.PI * 2 / 16;

      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, W, H);

      const prog = Math.max(0, Math.min(1, (ts + .6) / 6.6));
      c.lineCap = "round";
      c.strokeStyle = `rgba(${INK},.1)`; c.lineWidth = 1;
      c.beginPath(); c.arc(C[0], C[1], R, 0, Math.PI * 2); c.stroke();
      if (prog > 0) {
        c.strokeStyle = `rgba(${VI},.7)`; c.lineWidth = 1.4;
        c.beginPath(); c.arc(C[0], C[1], R, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2); c.stroke();
      }

      const half = keys(APART, ts) * R / 2;
      const ox = Math.cos(phase) * half, oy = Math.sin(phase) * half * .8;
      dot(C[0] + ox, C[1] + oy);
      dot(C[0] - ox, C[1] - oy);

      const sec = Math.round(prog * SONG);
      c.font = `400 12px "IBM Plex Mono", ui-monospace, monospace`;
      c.textBaseline = "middle"; c.direction = "ltr";
      c.textAlign = "right";
      c.fillStyle = `rgba(${INK},.4)`; c.fillText(`${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`, C[0] - 6, C[1] + R + 44);
      c.textAlign = "left";
      c.fillStyle = `rgba(${INK},.2)`; c.fillText("/ 5:40", C[0] + 2, C[1] + R + 44);
    }

    function measure() {
      // t = where the reading line falls between stanza centers
      const line = innerHeight * (innerWidth <= 760 ? .7 : .5);
      const mids = ss.map(e => { const b = e.getBoundingClientRect(); return (b.top + b.bottom) / 2; });
      let nt;
      if (line <= mids[0]) nt = (line - mids[0]) / (mids[1] - mids[0]);
      else if (line >= mids[mids.length - 1]) nt = mids.length - 1 + (line - mids[mids.length - 1]) / (mids[1] - mids[0]);
      else for (let i = 0; i < mids.length - 1; i++) if (line < mids[i + 1]) { nt = i + (line - mids[i]) / (mids[i + 1] - mids[i]); break; }
      tgt = Math.max(-1, Math.min(7.5, nt));
      const on = Math.round(tgt);
      ss.forEach((e, i) => { e.classList.toggle("on", i === on); e.classList.toggle("seen", i < on); });
    }

    let ticking = false;
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; measure(); }); } };
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { build(); measure(); }, 150); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    build(); measure(); ts = tgt;
    document.fonts && document.fonts.ready && document.fonts.ready.then(() => { build(); measure(); });
    raf = requestAnimationFrame(frame);

    cleanup = [
      () => removeEventListener("scroll", onScroll),
      () => removeEventListener("resize", onResize),
      () => cancelAnimationFrame(raf),
      () => clearTimeout(rz),
      () => style.remove()
    ];
  }

  window.BOOK.register({
    id: "meri-an",
    title: "מרי-אן",
    page: 20,
    kind: "שיר",
    blurb: "שלוש מאות וארבעים שניות של ריקוד בסלון. שתי נקודות בתוך מעגל אחד.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><circle cx="22" cy="11" r="9" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="19" cy="11" r="1.8" fill="currentColor"/><circle cx="25" cy="11" r="1.8" fill="currentColor"/></svg>`,
    accent: "#6f5aa8",
    mount,
    unmount() { cleanup.forEach(f => f()); cleanup = []; }
  });
})();
