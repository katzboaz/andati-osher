/* עצמאות — two stanzas, the siren and the hope. A single hairline is the
   ground; the last line, the burying, sits under it. */
(() => {
  const { page, st, register } = window.KIT;

  register({
    id: "atzmaut", title: "עצמאות", p: 51, kind: "שיר", accent: "#6d87a8",
    blurb: "כשכולם מרכינים את הראש בצפירה, הוא עומד על רגל אחת.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M2 12H42" stroke="currentColor" stroke-width="1"/><path d="M14 16h16" stroke="currentColor" stroke-width=".6" opacity=".5"/></svg>`,
    css: `
.az-ground { height: 1px; background: var(--ink); width: min(100%, 26rem); margin: .4em 0 .9em; }
.az-under { color: var(--ink-soft); }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 51, title: "עצמאות", meta: "שיר", cls: "poem az",
        body: [
          st("לפעמים,", "כשכולם מרכינים את הראש בצפירה,", "אני עומד על רגל אחת.", "מתנדנד בין אוויר לנשימה.", "נותן לרוח לנשוב לי בין האצבעות לאחיזה."),
          `<p class="st" style="margin-bottom:0"><span>לפעמים,</span><span>כשכולם מרימים את הראש לתקווה,</span><span>אני מוריד את הרגל השניה</span></p>`,
          `<div class="az-ground" aria-hidden="true"></div>`,
          `<p class="st az-under"><span>וטומן אותך שוב עמוק באדמה.</span></p>`
        ].join("")
      });
    }
  });
})();
