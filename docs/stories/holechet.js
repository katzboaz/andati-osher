/* הולכת — three lines. A mattress seen from above, a seam down the middle;
   the poem lies on this side, the other side is empty. */
(() => {
  const { register } = window.KIT;

  register({
    id: "holechet", title: "הולכת", p: 46, kind: "שיר", accent: "#9a8f86",
    blurb: "שלוש שורות על הצד השני של המזרון.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><rect x="2" y="2" width="40" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1"/><path d="M22 4v14" stroke="currentColor" stroke-width=".6"/></svg>`,
    css: `
.hl { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; padding-left: var(--gut-l); padding-right: var(--gut-r); }
.hl .story-head { padding-block: 16vh 0; width: 100%; }
.hl-bed { width: min(820px, 100%); margin: 6vh auto; aspect-ratio: 16 / 10; border: 1px solid var(--ink-faint); border-radius: 14px;
  display: grid; grid-template-columns: 1fr 1fr; position: relative; }
.hl-bed::after { content: ""; position: absolute; top: 8%; bottom: 8%; left: 50%; width: 1px; background: var(--hair); }
.hl-side { display: flex; flex-direction: column; justify-content: center; padding: 0 9%; font-family: var(--f-display); font-weight: 300; font-size: clamp(22px, 2.4vw, 30px); line-height: 1.65; }
.hl-side span { display: block; }
.hl .story-end { padding-block: 4vh 12vh; width: 100%; }
@media (max-width: 760px) {
  .hl-bed { aspect-ratio: auto; height: 62svh; grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
  .hl-bed::after { top: 50%; bottom: auto; left: 8%; right: 8%; width: auto; height: 1px; }
  .hl-side { font-size: 22px; }
}`,
    mount(root, ctx) {
      root.innerHTML = `
<div class="hl">
  <header class="story-head"><span class="eyebrow">ענדתי אושר · עמוד 46</span><h1>הולכת</h1><div class="meta">שיר · שלוש שורות</div></header>
  <div class="hl-bed">
    <div class="hl-side"><span>כמה קשה לגרום לה לחזור</span><span>מהצד השני של</span><span>המזרון.</span></div>
    <div class="hl-side" aria-hidden="true"></div>
  </div>
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
</div>`;
    }
  });
})();
