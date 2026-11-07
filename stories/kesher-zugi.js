/* קשר זוגי — a poem that turns on itself: "I didn't hear, I didn't think,
   I slammed the door" comes back as "she heard, she thought, she slammed the
   door". The words that come back are marked with the same thin line; between
   the two halves, a single knot. */
(() => {
  const { page, st, register } = window.KIT;
  const M = t => `<span class="kz-m">${t}</span>`;
  const KNOT = `<svg class="kz-knot" viewBox="0 0 240 40" aria-hidden="true"><path d="M0 20 H96 C104 20 108 8 118 8 C130 8 132 32 122 32 C112 32 110 8 124 8 C134 8 136 20 144 20 H240"/></svg>`;

  register({
    id: "kesher-zugi", title: "קשר זוגי", p: 33, kind: "שיר", accent: "#6f6f9a",
    blurb: "\"לא שמעתי, לא חשבתי\", ואז אותן מילים בדיוק, מהצד השני.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M0 11H16C18 11 19 5 22 5C26 5 26 17 23 17C20 17 19 5 24 5C27 5 27 11 29 11H44" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
    css: `
.kz-m { display: inline !important; background-image: linear-gradient(var(--accent), var(--accent)); background-size: 100% 1px; background-repeat: no-repeat; background-position: 0 92%; padding-bottom: 2px; }
.kz-knot { display: block; width: 180px; margin: 4vh 0 7vh; }
.kz-knot path { fill: none; stroke: var(--ink-soft); stroke-width: 1; }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 33, title: "קשר זוגי", meta: "שיר · דקה קריאה", cls: "poem kz",
        body: [
          st("קשרתי את נעמי חזק.", "ממש חזק.", `"${M("אתה מכאיב לי")}", היא צעקה`, "ואני הסתובבתי", M("לא שמעתי"), M("לא חשבתי"), `יצאתי ו${M("טרקתי את הדלת")} של הבית.`),
          st("פס הזיעה הכתים את החולצה", "החלפתי באוטו למכופתרת שהיתה תלויה על משענת הראש.", "קצת בושם ודאודורנט ואני כמו חדש.", "הנשימה מאיטה לקצב הרגיל."),
          st("קניתי פרחים בדרך חזרה וגם איזה בקבוק יין.", "היא לא תשכח את הערב הזה חשבתי לעצמי בעודי חונה בכחול לבן צמוד לבית."),
          st("פתחתי את הדלת עם המרפק.", `"היי ממי" צעקתי מהכניסה, "איך עבר עלייך היום?"`, "נעמי ישבה על הכסא במטבח, הראש היה קצת שמוט קדימה.", `"למה את לא עונה לי?" התחלתי להתעצבן.`, "היא ישבה שם, מביטה בי ושותקת."),
          KNOT,
          st("השוטר קפץ עלי מאחורה.", `"${M("אתה מכאיב לי!")}" צעקתי.`, "נעמי הסתובבה.", M("היא שמעה."), M("היא חשבה."), `ו${M("טרקה את הדלת")} אחרי.`)
        ].join("")
      });
    }
  });
})();
