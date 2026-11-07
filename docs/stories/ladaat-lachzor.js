/* לדעת לחזור — a beach at night, told in two voices: him searching ("I") and
   her, in the second person ("you"). The only night page in the book: dark
   paper, her paragraphs set in from the side, and the one small flame of a
   lighter in amber. */
(() => {
  const { page, register } = window.KIT;
  const DARK = { "--paper": "#121315", "--ink": "#e6e4de", "--ink-soft": "#9c9a94", "--ink-faint": "#5d5c58", "--hair": "#2a2b2e" };
  const I = t => `<p>${t}</p>`, U = t => `<p class="ld-you">${t}</p>`;

  register({
    id: "ladaat-lachzor", title: "לדעת לחזור", p: 62, kind: "סיפור", accent: "#e0a24a",
    blurb: "חוף בלילה, שני קולות, ולהבה קטנה של מצית בקצה החוף.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><rect width="44" height="22" fill="#121315"/><circle cx="31" cy="12" r="2" fill="#e0a24a"/></svg>`,
    css: `
.ld .kp-text p { color: var(--ink); }
.ld .ld-you { color: var(--ink-soft); margin-right: 2.4em; }
.ld .ld-flame { color: var(--accent); }
.ld .solo { font-family: var(--f-display); font-size: 1.1em; }
.bar { background: linear-gradient(var(--paper) 60%, transparent) !important; }`,
    mount(root, ctx, onUnmount) {
      const html = document.documentElement;
      Object.entries(DARK).forEach(([k, v]) => html.style.setProperty(k, v));
      html.style.colorScheme = "dark";
      onUnmount(() => { Object.keys(DARK).forEach(k => html.style.removeProperty(k)); html.style.colorScheme = ""; });
      page(root, ctx, {
        p: 62, title: "לדעת לחזור", meta: "סיפור · שתי דקות קריאה", cls: "ld",
        body: [
          `<p class="solo">הרגלים נגעו בגלים.</p>`,
          U("החיים עצמם נזלו ממך טיפה אחרי שהשמש נעלמה מתחת לקו האופק."),
          I("החניה היתה כבר ריקה. סגרתי את הדלת, משאיר את הכפכפים והחולצה במושב לידי. רצתי הכי מהר שיכולתי, חולף על פני פנסים של טלפונים שמאירים את שביל העפר."),
          `<p class="solo">"נ ע מ ה!"</p>`,
          I("הים חיבק את הצעקה שלי והטביע אותה למעמקים."),
          I("אף אחת לא ענתה."),
          U("הלכת אחרי הצהריים, היה נדמה לך שאת שוב לבד. הרגשת את הבוקר הזה מכביד על רגלייך. אז איך החיים שלך? על מי את חושבת?"),
          U("הדלקת סיגריה אחרי סיגריה. שואפת את האשמה, נושפת את הספק. לאן את הולכת מכאן?"),
          I(`עמדתי בשקט סורק את החושך, המים והחול. <span class="ld-flame">להבה קטנה של מצית</span> בקצה של החוף היתה הסימן שחיכיתי לו. פתחתי את הטלפון, קורא שוב את שרשור ההודעות שהגיע אחרי הצעקות. משחזר את הסיטואציה בראש.`),
          U("שמעת אותי מגיע מאחוריך, הגוף שלך התכווץ. \"מה הוא עושה כאן?\" חשבת לעצמך."),
          I("הידיים שלי עטפו אותך."),
          `<p class="line">חיבקתי אותך חזק חזק.</p><p class="line">הנשימות שלנו הסתנכרנו לאט לאט.</p><p class="line">הסתובבת אלי והתנשקנו.</p><p>שכחנו כבר כמה חשוב להתגעגע לפעמים.</p>`
        ].join("")
      });
    }
  });
})();
