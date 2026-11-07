/* הערת שוליים — the afterword, set as what it calls itself: a footnote.
   Small type under a short rule, and the one word at the end. */
(() => {
  const { page, register } = window.KIT;

  register({
    id: "hearat-shulayim", title: "הערת שוליים", p: 78, kind: "אחרית דבר", accent: "#c48b90",
    blurb: "כמה מילים על המילים, ומילה אחת שהיא רק בשבילה.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M24 8H42" stroke="currentColor" stroke-width=".8"/><path d="M28 13H42M32 17H42" stroke="currentColor" stroke-width=".6" opacity=".6"/></svg>`,
    css: `
.hs .kp-text { max-width: 30rem; font-family: var(--f-ui); font-weight: 300; font-size: 15px; line-height: 1.9; color: var(--ink-soft); }
.hs .kp-text::before { content: ""; display: block; width: 33%; height: 1px; background: var(--ink-faint); margin-bottom: 1.6em; }
.hs .hs-mark { font-family: var(--f-mono); font-size: 11px; vertical-align: super; margin-left: 4px; color: var(--accent); }
.hs .thanks { margin-top: 2.6em; font-family: var(--f-display); font-weight: 300; font-size: 34px; color: var(--ink); }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 78, title: "הערת שוליים", meta: "אחרית דבר", cls: "hs",
        body: `<p><span class="hs-mark">*</span>המילים הכתובות כאן הינן מסע אישי של התבגרות והתפתחות.</p>
          <p>הן נכתבו מתוך רגעים אישיים שמעורבבים במציאות מדומה. הן לא נכתבו כדי לרצות, או כדי שהקורא.ת יאהב, ישנא, יחבק או יזדהה. הן נכתבו בשבילי, חלקן ברגעים של דמעות ומשבר, חלקן ברגעים של אושר ושמחה. רובן נכתבו לצד אהבתי והשראתי, האישה שתמיד שם לצידי, ועל זה רק רציתי להוסיף מילה אחת שהיא רק בשבילה.</p>
          <p class="thanks">תודה.</p>`
      });
    }
  });
})();
