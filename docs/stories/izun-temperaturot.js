/* איזון טמפרטורות — four couplets, one at a time. The only change is the
   temperature of the paper: warm while they burn, colder with every couplet. */
(() => {
  const { steps, register } = window.KIT;
  const C = [
    ["באותו הבוקר רוחנו להטה,", "הצלפנו האחד בשניה בחוזקה."],
    ["התרוקנו, רוקנו להבות של טינה.", "הלכנו לישון בקצוות המיטה."],
    ["כשיצאת להפשיר, הטמפרטורה צנחה,", "הבנה חדה את גופי פילחה."],
    ["לא אצליח להתחמם מגופך יותר לעולם.", "הכי קל להתחבק כשקר."]
  ];
  // title, four couplets, end
  const PAPER = ["#ffffff", "#fcf1e8", "#fbf6f1", "#eff4f7", "#e8eff4", "#f6f8fa"];

  register({
    id: "izun-temperaturot", title: "איזון טמפרטורות", p: 8, kind: "שיר", accent: "#7f9fb3",
    blurb: "ארבעה בתים, אחד אחרי השני. הנייר מתקרר עם כל בית.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><rect x="2" y="5" width="18" height="12" fill="#f6e0cf"/><rect x="24" y="5" width="18" height="12" fill="#dbe6ee"/></svg>`,
    css: `.iz.ks { transition: background-color 2.4s ease; }`,
    mount(root, ctx, onUnmount) {
      // the paper token itself changes, so the top bar cools with the page
      const html = document.documentElement;
      onUnmount(() => html.style.removeProperty("--paper"));
      return steps(root, ctx, {
        p: 8, title: "איזון טמפרטורות", meta: "שיר · ארבעה בתים", cls: "iz",
        frames: C.map(c => ({ html: c.map(l => `<span>${l}</span>`).join("") })),
        onFrame(n) { html.style.setProperty("--paper", PAPER[n]); }
      });
    }
  });
})();
