/* זיכרון — the passage from Memorial Day to Independence Day, "between half
   mast and the top". Beside the poem, a flagpole with its flag at half mast. */
(() => {
  const { page, st, register } = window.KIT;
  const POLE = `<svg class="zk-pole" viewBox="0 0 80 300"><path d="M20 296 V6" stroke="var(--ink)" stroke-width="1" fill="none"/><circle cx="20" cy="5" r="2.4" fill="var(--ink)"/>
    <path d="M10 296 H30" stroke="var(--ink)" stroke-width="1"/>
    <g transform="translate(20 140)"><rect width="50" height="34" fill="none" stroke="var(--accent)" stroke-width="1"/><path d="M0 6 H50 M0 28 H50" stroke="var(--accent)" stroke-width="2.2"/></g></svg>`;

  register({
    id: "zikaron", title: "זיכרון", p: 76, kind: "שיר", accent: "#3f64a6",
    blurb: "המעבר הגס בין חצי התורן לראשו.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M12 21V1" stroke="currentColor" stroke-width="1"/><rect x="12" y="9" width="14" height="9" fill="none" stroke="#3f64a6" stroke-width="1"/></svg>`,
    css: `.zk-pole { width: 80px; height: auto; display: block; }
@media (max-width: 860px) { .zk-pole { width: 54px; } }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 76, title: "זיכרון", meta: "שיר", cls: "poem zk", aside: POLE,
        body: [
          st("את המעבר הגס הזה", "בין חצי התורן לראשו", "אנחנו משמנים בדם של חברים."),
          st("עם הקו החד הזה", "של המניה דיפרסיה הלאומית", "אנחנו חותכים נפשות ואומרים אמן."),
          st("על הגבול הדק הזה", "בין דמע לאושר", "אנחנו מגדלים ילדים במקום אלו שלקחו לנו.")
        ].join("")
      });
    }
  });
})();
