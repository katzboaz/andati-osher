/* Shared reading modes for the rest of the book. Each piece keeps its own file
   and its one quiet motif; this only lays the text out:
   - page:   an ordinary page that scrolls, for prose and short poems
   - paged:  a book reader for the longer prose, turned page by page (no scrolling)
   - steps:  one beat at a time, advanced by a tap, an arrow or a swipe
   Paged and steps share the input handling with the Yuval reader's conventions:
   left arrow / swipe right / space = forward (the book reads right to left). */
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CHEV_NEXT = `<svg viewBox="0 0 8 14"><path d="M7 1L1 7l6 6"/></svg>`;
  const CHEV_PREV = `<svg viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg>`;

  const CSS = `
html.kt-lock, html.kt-lock body { overflow: hidden; height: 100%; overscroll-behavior: none; }

/* ---------- page ---------- */
.kp-body { padding-left: var(--gut-l); padding-right: var(--gut-r); max-width: 1080px; margin: 0 auto; }
.kp-text { max-width: 34rem; }
.kp-text p { margin: 0 0 1.1em; text-wrap: pretty; }
.kp-text .line { margin-bottom: .2em; }
.kp-text .said { margin-bottom: .45em; }
.kp-text .gap { margin-top: 2.2em; }
.kp.poem .kp-text { font-family: var(--f-display); font-weight: 300; font-size: clamp(22px, 2.1vw, 27px); line-height: 1.7; }
.kp.poem .st { margin: 0 0 1.6em; }
.kp.poem .st span { display: block; }
.kp.center .kp-text { margin: 0 auto; text-align: center; }
.kp.center .story-head { text-align: center; }
.kp .story-head { padding-block: 20vh 8vh; }
.kp-body.has-aside { display: grid; grid-template-columns: minmax(0, 34rem) minmax(0, 1fr); gap: 6vw; }
.kp-aside > div { position: sticky; top: 18vh; }
@media (max-width: 860px) {
  .kp-body.has-aside { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .kp-aside { order: -1; margin-bottom: 8vh; }
  .kp-aside > div { position: static; }
}

/* ---------- shared fixed shell for paged + steps ---------- */
.kt, .ks {
  position: fixed; inset: 0; background: var(--paper); z-index: 1;
  display: grid; grid-template-rows: calc(56px + env(safe-area-inset-top, 0px)) minmax(0, 1fr) calc(64px + env(safe-area-inset-bottom, 0px));
  padding-left: var(--gut-l); padding-right: var(--gut-r);
  touch-action: pan-y;
}
.kt-foot, .ks-foot { grid-row: 3; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; width: min(760px, 100%); margin: 0 auto;
  padding-bottom: env(safe-area-inset-bottom, 0px); font-family: var(--f-ui); font-weight: 300; font-size: 12px; color: var(--ink-soft); }
.k-where { justify-self: start; letter-spacing: .04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.k-ctrl { display: flex; align-items: center; gap: 14px; }
.k-ctrl button { border: 0; background: none; padding: 10px; cursor: pointer; color: var(--ink-soft); }
.k-ctrl button[disabled] { color: var(--hair); cursor: default; }
.k-ctrl svg, .kt-side svg { width: 8px; height: 14px; display: block; }
.k-ctrl path, .kt-side path { fill: none; stroke: currentColor; stroke-width: 1.2; }
.k-count { font-family: var(--f-mono); font-size: 12px; direction: ltr; min-width: 4.5em; text-align: center; }
.k-hint { justify-self: end; color: var(--ink-faint); transition: opacity .8s; white-space: nowrap; }
.k-hint.gone { opacity: 0; }

/* ---------- paged ---------- */
.kt-stage { grid-row: 2; position: relative; display: flex; justify-content: center; min-height: 0; padding-top: 3vh; }
.kt-window { height: 100%; overflow: hidden; position: relative; }
.kt-flow { height: 100%; column-fill: auto; orphans: 2; widows: 2;
  font-family: var(--f-body); font-size: 20.5px; line-height: 1.9; color: var(--ink);
  transition: transform .6s cubic-bezier(.6,.05,.25,1); }
.kt-flow p { margin: 0 0 .8em; text-wrap: pretty; }
.kt-flow .line { margin: 0 0 .15em; }
.kt-flow .solo { text-align: center; font-family: var(--f-display); font-size: 1.06em; padding: .6em 0; margin: 0; }
.kt-flow .brk { break-before: column; -webkit-column-break-before: always; }
.kt-title { break-inside: avoid; break-after: column; -webkit-column-break-after: always; padding-top: 6vh; }
.kt-title h1 { font-family: var(--f-display); font-weight: 300; font-size: clamp(44px, 7vw, 76px); line-height: 1.02; margin: 14px 0 18px; }
.kt-title .meta { font-family: var(--f-ui); font-weight: 300; font-size: 13px; color: var(--ink-soft); letter-spacing: .06em; }
.kt-title .kt-art { margin-top: 7vh; }
.kt-part { break-inside: avoid; break-after: avoid; padding-bottom: 1.2em; }
.kt-part .eyebrow { display: block; }
.kt-part h2 { font-family: var(--f-display); font-weight: 400; font-size: 32px; line-height: 1.2; margin: 6px 0 0; }
.kt-end { break-before: column; -webkit-column-break-before: always; break-inside: avoid; padding-top: 8vh; display: grid; gap: 40px; font-family: var(--f-ui); }
.kt-end .mark { width: 40px; height: 1px; background: var(--ink); }
.kt-end nav { display: flex; flex-wrap: wrap; gap: 28px; font-size: 13px; letter-spacing: .08em; }
.kt-end nav a { text-decoration: none; border-bottom: 1px solid var(--hair); padding-bottom: 3px; }
.kt-end .soon { color: var(--ink-faint); }
.kt-side { position: absolute; top: 0; bottom: 0; width: max(48px, calc((100% - var(--pw)) / 2)); border: 0; background: none; padding: 0; cursor: pointer;
  color: var(--ink-faint); display: flex; align-items: center; justify-content: center; transition: color .3s; }
.kt-side:hover { color: var(--ink); }
.kt-side[disabled] { opacity: 0; pointer-events: none; }
.kt-side.prev { right: 0; } .kt-side.next { left: 0; }

/* ---------- steps ---------- */
.ks-stage { grid-row: 2; position: relative; min-height: 0; display: grid; max-width: 1180px; width: 100%; margin: 0 auto; cursor: pointer;
  -webkit-user-select: none; user-select: none; }
.ks.has-art .ks-stage { grid-template-columns: minmax(0, 30rem) minmax(0, 1fr); gap: 6vw; }
.ks-text { position: relative; min-height: 0; }
.ks:not(.has-art) .ks-text { width: min(34rem, 100%); margin: 0 auto; }
.ks-frame { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; opacity: 0; visibility: hidden;
  transition: opacity .8s ease, visibility 0s linear .8s; font-family: var(--f-display); font-weight: 300; font-size: clamp(23px, 2.2vw, 29px); line-height: 1.65; }
.ks-frame.on { opacity: 1; visibility: visible; transition: opacity .9s ease .15s, visibility 0s; }
.ks-frame span { display: block; }
.ks-frame p { margin: 0 0 .9em; }
.ks-frame.prose { font-family: var(--f-body); font-weight: 400; font-size: 20px; line-height: 1.85; }
.ks-frame.title h1 { font-family: var(--f-display); font-weight: 300; font-size: clamp(48px, 7.5vw, 92px); line-height: 1; margin: 14px 0 20px; }
.ks-frame.title .meta { font-family: var(--f-ui); font-weight: 300; font-size: 13px; color: var(--ink-soft); letter-spacing: .06em; }
.ks-frame.end { font-family: var(--f-ui); font-size: 13px; gap: 40px; cursor: default; }
.ks-frame.end .mark { width: 40px; height: 1px; background: var(--ink); }
.ks-frame.end nav { display: flex; flex-wrap: wrap; gap: 28px; letter-spacing: .08em; }
.ks-frame.end nav a { text-decoration: none; border-bottom: 1px solid var(--hair); padding-bottom: 3px; }
.ks-frame.end .soon { color: var(--ink-faint); }
.ks-art { position: relative; min-height: 0; display: flex; align-items: center; justify-content: center; }
.ks-art svg { width: 100%; height: 100%; max-height: 72svh; }
.ks-dots { display: flex; gap: 7px; align-items: center; direction: rtl; }
.ks-dots i { width: 4px; height: 4px; border-radius: 50%; background: var(--hair); transition: background .4s; }
.ks-dots i.on { background: var(--ink); }

@media (max-width: 860px) {
  .kt, .ks { grid-template-rows: calc(52px + env(safe-area-inset-top, 0px)) minmax(0, 1fr) calc(58px + env(safe-area-inset-bottom, 0px)); }
  .kt-flow { font-size: 18.5px; line-height: 1.82; }
  .kt-side, .k-where { display: none; }
  .kt-foot, .ks-foot { grid-template-columns: auto 1fr auto; gap: 8px; }
  .k-ctrl { grid-column: 1; }
  .k-hint { grid-column: 3; }
  .kt-stage { padding-top: 2vh; }
  .ks.has-art .ks-stage { grid-template-columns: minmax(0, 1fr); grid-template-rows: 34svh minmax(0, 1fr); gap: 2vh; }
  .ks.has-art .ks-art { grid-row: 1; }
  .ks.has-art .ks-text { grid-row: 2; }
  .ks-art svg { max-height: 32svh; }
  .ks-frame { font-size: 21px; }
  .ks-frame.prose { font-size: 17.5px; line-height: 1.75; }
  .ks.has-art .ks-frame { justify-content: flex-start; padding-top: 1vh; }
}
`;
  let styled = false;
  function style() {
    if (styled) return;
    styled = true;
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  const shellBar = () => document.getElementById("progress");
  const headHTML = o => `<span class="eyebrow">ענדתי אושר · עמוד ${o.p}</span><h1>${o.title}</h1><div class="meta">${o.meta || ""}</div>`;

  /* keys, wheel, swipe — shared by paged and steps */
  function bindTurns(stage, { next, prev, first, last }) {
    const onKey = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowLeft", "PageDown", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowRight", "PageUp", "ArrowUp"].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); first(); }
      else if (e.key === "End") { e.preventDefault(); last(); }
    };
    let acc = 0, lock = 0;
    const onWheel = e => {
      e.preventDefault();
      const now = performance.now();
      if (now < lock) return;
      acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : -e.deltaX;
      if (Math.abs(acc) > 40) { acc > 0 ? next() : prev(); acc = 0; lock = now + 700; }
    };
    let tx = null, ty = 0;
    const state = { swiped: 0 };
    const onStart = e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; };
    const onEnd = e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      tx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { dx > 0 ? next() : prev(); state.swiped = performance.now(); }
    };
    addEventListener("keydown", onKey);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onStart, { passive: true });
    stage.addEventListener("touchend", onEnd, { passive: true });
    state.off = () => removeEventListener("keydown", onKey);
    return state;
  }

  /* ---------- page ---------- */
  function page(root, ctx, o) {
    style();
    root.innerHTML = `
<div class="kp ${o.cls || ""}">
  <header class="story-head">${headHTML(o)}</header>
  ${o.before || ""}
  <div class="kp-body${o.aside ? " has-aside" : ""}"><div class="kp-text">${o.body}</div>${o.aside ? `<aside class="kp-aside" aria-hidden="true"><div>${o.aside}</div></aside>` : ""}</div>
  ${o.after || ""}
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
</div>`;
    return root.firstElementChild;
  }

  /* ---------- paged ---------- */
  function paged(root, ctx, o) {
    style();
    document.documentElement.classList.add("kt-lock");
    root.innerHTML = `
<div class="kt ${o.cls || ""}">
  <div class="kt-stage">
    <button class="kt-side prev" aria-label="העמוד הקודם">${CHEV_PREV}</button>
    <div class="kt-window"><div class="kt-flow">
      <div class="kt-title">${headHTML(o)}${o.art ? `<div class="kt-art" aria-hidden="true">${o.art}</div>` : ""}</div>
      ${o.body}
      <div class="kt-end"><div class="mark"></div>${ctx.endNav}</div><span class="kt-s"></span>
    </div></div>
    <button class="kt-side next" aria-label="העמוד הבא">${CHEV_NEXT}</button>
  </div>
  <div class="kt-foot">
    <span class="k-where"></span>
    <div class="k-ctrl"><button class="pv" aria-label="העמוד הקודם">${CHEV_PREV}</button><span class="k-count"></span><button class="nx" aria-label="העמוד הבא">${CHEV_NEXT}</button></div>
    <span class="k-hint">לדפדף בחצים או בהחלקה</span>
  </div>
</div>`;
    const kt = root.firstElementChild;
    const stage = kt.querySelector(".kt-stage"), win = kt.querySelector(".kt-window"), flow = kt.querySelector(".kt-flow");
    const count = kt.querySelector(".k-count"), where = kt.querySelector(".k-where"), hint = kt.querySelector(".k-hint");
    let pw = 0, pg = 120, total = 1, pageN = 0, parts = [];
    function layout() {
      const sw = stage.clientWidth, narrow = innerWidth <= 860;
      pw = Math.floor(Math.min(narrow ? 560 : 600, sw - (narrow ? 8 : 160)));
      kt.style.setProperty("--pw", pw + "px");
      win.style.width = pw + "px";
      Object.assign(flow.style, { width: pw + "px", columnWidth: pw + "px", columnGap: pg + "px", transition: "none", transform: "none" });
      const R = flow.getBoundingClientRect().right, step = pw + pg;
      const at = r => Math.max(0, Math.round((R - r.right) / step));
      const s = flow.querySelector(".kt-s").getClientRects();
      total = at(s[s.length - 1]) + 1;
      parts = [...flow.querySelectorAll("[data-part]")].map(h => ({ name: h.dataset.part, page: at(h.getClientRects()[0]) }));
      flow.offsetWidth;
      flow.style.transition = "";
      go(Math.min(pageN, total - 1), false);
    }
    function go(n, animate = true) {
      n = Math.max(0, Math.min(total - 1, n));
      if (n !== pageN && animate) hint.classList.add("gone");
      pageN = n;
      if (!animate || reduced) flow.style.transition = "none";
      flow.style.transform = `translateX(${n * (pw + pg)}px)`;
      if (!animate || reduced) { flow.offsetWidth; flow.style.transition = ""; }
      count.textContent = `${n + 1} / ${total}`;
      const bar = shellBar(); if (bar) bar.style.transform = `scaleX(${total > 1 ? n / (total - 1) : 1})`;
      kt.querySelectorAll(".kt-side.prev, .k-ctrl .pv").forEach(b => b.disabled = n === 0);
      kt.querySelectorAll(".kt-side.next, .k-ctrl .nx").forEach(b => b.disabled = n === total - 1);
      const part = [...parts].reverse().find(p => n >= p.page);
      where.textContent = part ? `${o.title} · ${part.name}` : o.title;
      if (o.onPage) o.onPage(n, total, kt);
    }
    const next = () => go(pageN + 1), prev = () => go(pageN - 1);
    const turns = bindTurns(stage, { next, prev, first: () => go(0), last: () => go(total - 1) });
    stage.addEventListener("click", e => {
      if (e.target.closest("a, button") || performance.now() - turns.swiped < 400) return;
      if (String(getSelection() || "").length) return;
      const r = win.getBoundingClientRect(), x = e.clientX, edge = Math.max(44, r.width * .28);
      if (x < r.left + edge) next(); else if (x > r.right - edge) prev();
    });
    kt.querySelector(".kt-side.next").onclick = next;
    kt.querySelector(".kt-side.prev").onclick = prev;
    kt.querySelector(".k-ctrl .nx").onclick = next;
    kt.querySelector(".k-ctrl .pv").onclick = prev;
    win.addEventListener("scroll", () => { win.scrollLeft = 0; win.scrollTop = 0; });
    let rz = 0;
    const onResize = () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(layout); };
    addEventListener("resize", onResize);
    layout();
    let alive = true;
    if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(() => { if (alive) layout(); });
    return {
      el: kt,
      destroy() {
        alive = false;
        turns.off();
        removeEventListener("resize", onResize);
        document.documentElement.classList.remove("kt-lock");
        const bar = shellBar(); if (bar) bar.style.transform = "scaleX(0)";
      }
    };
  }

  /* ---------- steps ---------- */
  function steps(root, ctx, o) {
    style();
    document.documentElement.classList.add("kt-lock");
    const frames = [
      `<div class="ks-frame title">${headHTML(o)}</div>`,
      ...o.frames.map(f => `<div class="ks-frame ${f.cls || ""}">${f.html}</div>`),
      `<div class="ks-frame end"><div class="mark"></div>${ctx.endNav}</div>`
    ];
    root.innerHTML = `
<div class="ks ${o.art ? "has-art" : ""} ${o.cls || ""}" data-f="0">
  <div class="ks-stage">
    <div class="ks-text">${frames.join("")}</div>
    ${o.art ? `<div class="ks-art" aria-hidden="true">${o.art}</div>` : ""}
  </div>
  <div class="ks-foot">
    <span class="k-where">${o.where ? "" : o.title}</span>
    <div class="k-ctrl"><button class="pv" aria-label="הקודם">${CHEV_PREV}</button><span class="ks-dots">${frames.map(() => "<i></i>").join("")}</span><button class="nx" aria-label="הבא">${CHEV_NEXT}</button></div>
    <span class="k-hint">${o.hint || "להמשיך: לחיצה, חץ או רווח"}</span>
  </div>
</div>`;
    const ks = root.firstElementChild;
    const stage = ks.querySelector(".ks-stage");
    const els = [...ks.querySelectorAll(".ks-frame")], dots = [...ks.querySelectorAll(".ks-dots i")];
    const hint = ks.querySelector(".k-hint");
    let f = -1;
    function go(n) {
      n = Math.max(0, Math.min(els.length - 1, n));
      if (n === f) return;
      if (f >= 0) hint.classList.add("gone");
      f = n;
      ks.dataset.f = n;
      els.forEach((e, i) => e.classList.toggle("on", i === n));
      dots.forEach((d, i) => d.classList.toggle("on", i <= n));
      ks.querySelector(".k-ctrl .pv").disabled = n === 0;
      ks.querySelector(".k-ctrl .nx").disabled = n === els.length - 1;
      const bar = shellBar(); if (bar) bar.style.transform = `scaleX(${n / (els.length - 1)})`;
      if (o.onFrame) o.onFrame(n, ks);
    }
    const next = () => go(f + 1), prev = () => go(f - 1);
    const turns = bindTurns(stage, { next, prev, first: () => go(0), last: () => go(els.length - 1) });
    stage.addEventListener("click", e => {
      if (e.target.closest("a, button") || performance.now() - turns.swiped < 400) return;
      const r = stage.getBoundingClientRect();
      // the right edge steps back (the book reads right to left), anywhere else steps on
      if (e.clientX > r.right - r.width * .18) prev(); else next();
    });
    ks.querySelector(".k-ctrl .nx").onclick = next;
    ks.querySelector(".k-ctrl .pv").onclick = prev;
    go(0);
    return {
      el: ks, go,
      destroy() {
        turns.off();
        document.documentElement.classList.remove("kt-lock");
        const bar = shellBar(); if (bar) bar.style.transform = "scaleX(0)";
      }
    };
  }

  /* small text helpers used by the stories */
  const st = (...lines) => `<p class="st">${lines.map(l => `<span>${l}</span>`).join("")}</p>`;
  const ps = arr => arr.map(x => typeof x === "string" ? `<p>${x}</p>` : `<p class="${x.c}">${x.t}</p>`).join("");
  // a story module that only needs mount/unmount around one of the modes
  function register(def) {
    let inst = null, extra = [];
    window.BOOK.register({
      id: def.id, title: def.title, page: def.p, kind: def.kind, blurb: def.blurb, glyph: def.glyph, accent: def.accent,
      mount(root, ctx) {
        extra = [];
        if (def.css) { const s = document.createElement("style"); s.textContent = def.css; document.head.appendChild(s); extra.push(() => s.remove()); }
        inst = def.mount(root, ctx, f => extra.push(f)) || null;
      },
      unmount() { if (inst && inst.destroy) inst.destroy(); inst = null; extra.forEach(f => f()); extra = []; }
    });
  }

  window.KIT = { page, paged, steps, st, ps, register, reduced };
})();
