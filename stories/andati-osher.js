/* ענדתי אושר — the title poem. "Collecting the shards of a personality that
   crashed into a thousand pieces", and every morning, putting happiness on.
   Under the poem, a ring made of fragments, each a little out of line. */
(() => {
  const { page, st, register } = window.KIT;
  let seed = 3;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const N = 15, R = 46, C = 60;
  const arcs = Array.from({ length: N }, (_, i) => {
    const a0 = i / N * Math.PI * 2 + .05, a1 = (i + 1) / N * Math.PI * 2 - .05;
    const r = R + (rnd() - .5) * 2.6, dx = (rnd() - .5) * 1.6, dy = (rnd() - .5) * 1.6;
    const p = a => `${(C + dx + Math.cos(a) * r).toFixed(2)} ${(C + dy + Math.sin(a) * r).toFixed(2)}`;
    return `<path d="M${p(a0)} A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${p(a1)}"/>`;
  }).join("");
  const RING = `<svg class="ao-ring" viewBox="0 0 120 120" aria-hidden="true">${arcs}</svg>`;

  register({
    id: "andati-osher", title: "ענדתי אושר", p: 77, kind: "שיר", accent: "#c48b90",
    blurb: "השיר שנתן לספר את שמו: לאסוף שברים, לשטוף מחשבות בכיור, ולענוד אושר.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M22 3a8 8 0 016 3M30 9a8 8 0 01-1 7M27 18a8 8 0 01-8 1M16 17a8 8 0 01-2-7M15 7a8 8 0 015-4"/></svg>`,
    css: `
.ao-ring { display: block; width: 92px; margin: 2vh 0 0; }
.ao-ring path { fill: none; stroke: var(--ink); stroke-width: 1.3; stroke-linecap: round; }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 77, title: "ענדתי אושר", meta: "שיר", cls: "poem ao",
        body: [
          st("אוספת את שברי האישיות", "שהתרסקה לאלפי חתיכות.", "מעמיקה את הקמטים", "בעוד קצת אכזבות."),
          st("המציאות מתערבבת", "ביום אחד ארוך.", "הלילה אינו נגמר", "רק מתחלפות לי השמשות."),
          st("קמה כל בוקר,", "שוטפת את המחשבות", "בכיור.", "עונדת לי אושר", "מתחילה עוד יום.")
        ].join("") + RING
      });
    }
  });
})();
