/* אינסומניה של אבל — in the book this is a title and an empty page. Here too:
   the title, and the page left empty. At its foot, small, the reader's own
   time, still awake. */
(() => {
  const { register } = window.KIT;

  register({
    id: "insomnia", title: "אינסומניה של אבל", p: 60, kind: "עמוד ריק", accent: "#8b8b95",
    blurb: "כותרת, ועמוד ריק.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><rect x="12" y="1" width="20" height="20" fill="none" stroke="currentColor" stroke-width=".8"/></svg>`,
    css: `
.in { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; }
.in .story-head { padding-block: 16vh 0; width: 100%; }
.in-time { align-self: end; justify-self: center; font-family: var(--f-mono); font-weight: 300; font-size: 12px; color: var(--ink-faint); direction: ltr; letter-spacing: .08em; padding-bottom: 6vh; }
.in .story-end { padding-block: 0 10vh; width: 100%; }`,
    mount(root, ctx, onUnmount) {
      root.innerHTML = `
<div class="in">
  <header class="story-head"><span class="eyebrow">ענדתי אושר · עמוד 60</span><h1>אינסומניה של אבל</h1></header>
  <div class="in-time" aria-hidden="true"></div>
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
</div>`;
      const t = root.querySelector(".in-time");
      const tick = () => { const d = new Date(); t.textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`; };
      tick();
      const id = setInterval(tick, 15000);
      onUnmount(() => clearInterval(id));
    }
  });
})();
