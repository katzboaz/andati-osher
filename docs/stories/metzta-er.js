/* מצטער — Memorial Day. Centered, nothing else on the page but a small stone
   at the end, the kind left on a grave. */
(() => {
  const { page, st, register } = window.KIT;
  const STONE = `<svg class="mz-stone" viewBox="0 0 60 30" aria-hidden="true"><path d="M9 25C5 25 4 20 8 16C13 10 22 7 32 7C43 7 53 12 54 19C55 24 50 26 44 26C34 26 20 25 9 25Z"/></svg>`;

  register({
    id: "metzta-er", title: "מצטער", p: 35, kind: "שיר", accent: "#8a8a84",
    blurb: "חברים שידעו להמריא ומעולם לא נחתו. שיר ליום הזיכרון.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M10 18C7 18 7 14 10 12C14 9 19 8 24 8C31 8 36 11 36 15C36 18 33 18 30 18Z" fill="currentColor" opacity=".55"/></svg>`,
    css: `
.mz-stone { display: block; width: 46px; margin: 6vh auto 0; }
.mz-stone path { fill: #d8d6d0; stroke: var(--ink-faint); stroke-width: .8; }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 35, title: "מצטער", meta: "שיר", cls: "poem center mz",
        body: [
          st("יש לי חברים,", "לוחמים.", "שידעו להמריא אבל מעולם לא נחתו."),
          st("היו לי אחים,", "יותר מידי כאלו.", "היום אני מרגיש כמו בן יחיד."),
          st("הפסקתי ללכת לבתי קברות מזמן,", "כי לא ידעתי במי לבחור.", "איך אפשר?"),
          st("אני נושא את כולם איתי,", "כל השנה.", "היום זה היום שאני קובר אותם בחזרה.")
        ].join("") + STONE
      });
    }
  });
})();
