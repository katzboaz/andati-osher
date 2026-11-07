/* 593 — "five hundred and ninety-three days I stood and counted her".
   Beside the poem, the count itself: 593 small dots, set right to left like
   the days in the text. Nothing moves. */
(() => {
  const { page, st, register } = window.KIT;
  const COLS = 25, GAP = 9, N = 593;
  const rows = Math.ceil(N / COLS);
  const dots = Array.from({ length: N }, (_, i) => {
    const r = Math.floor(i / COLS), c = i % COLS;
    // right to left, top to bottom
    return `<circle cx="${(COLS - 1 - c) * GAP + 4}" cy="${r * GAP + 4}" r="1.5"${i === N - 1 ? ` class="last"` : ""}/>`;
  }).join("");
  const GRID = `<svg class="n5-grid" viewBox="0 0 ${COLS * GAP} ${rows * GAP}">${dots}</svg><div class="n5-n">593</div>`;

  register({
    id: "n593", title: "593", p: 9, kind: "שיר", accent: "#5f84b5",
    blurb: "חמש מאות תשעים ושלושה ימים, וארבע פעמים אותה שורה: היא סיפור אהבה.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22">${Array.from({ length: 18 }, (_, i) => `<circle cx="${40 - (i % 9) * 4.4}" cy="${7 + Math.floor(i / 9) * 8}" r="1.2" fill="currentColor"/>`).join("")}</svg>`,
    css: `
.n5-grid { width: min(100%, 280px); display: block; }
.n5-grid circle { fill: var(--ink-faint); }
.n5-grid circle.last { fill: var(--accent); }
.n5-n { font-family: var(--f-mono); font-weight: 300; font-size: 12px; color: var(--ink-faint); margin-top: 14px; direction: ltr; text-align: right; width: min(100%, 280px); }
@media (max-width: 860px) { .n5-grid, .n5-n { width: 200px; } }`,
    mount(root, ctx) {
      const R = `<span class="ref">היא סיפור אהבה.</span>`;
      const ref = (...l) => `<p class="st">${R}${l.map(x => `<span>${x}</span>`).join("")}</p>`;
      page(root, ctx, {
        p: 9, title: "593", meta: "שיר · דקה קריאה", cls: "poem n5", aside: GRID,
        body: [
          st("חמש מאות תשעים ושלושה ימים עמדתי וספרתי אותה.", "נאה, אלומה.", "עלומה."),
          ref("קטן כזה, של כמה שורות.", "לפעמים קצרות, לפעמים ארוכות."),
          st("קול רחוק שבקושי נשמע מהדהד לי בראש.", "אינו מרפה.", "מרפא."),
          ref("ארוך כזה של כמה פסקאות.", "לא מנוקדות, ללא תחיליות."),
          st("עננה כחולה נגעה בה לפני שנים.", "המים של חייה זורמים.", "חמים."),
          ref("בהיר כזה, כמו מקלדת ללא אותיות.", "עם כסת אדומה ונוצה לידה."),
          st("הימים נוסעים, היא מגיעה מרחוק", "מגיעה למקומות,", "תהומות."),
          ref("מוזר כזה, על זוגיות מאוחרת,", "שמאמינה כי אפשר גם אחרת.")
        ].join("")
      });
    }
  });
})();
