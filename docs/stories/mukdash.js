/* מוקדש — the dedication. A plain page; the only drawing is the crosswalk
   where the morning ends and begins, set between the story and its coda. */
(() => {
  const { page, ps, register } = window.KIT;
  const ZEBRA = `<svg class="mk-zebra" viewBox="0 0 240 64" aria-hidden="true">${
    Array.from({ length: 7 }, (_, i) => `<rect x="${8 + i * 33}" y="8" width="18" height="48"/>`).join("")}</svg>`;

  register({
    id: "mukdash", title: "מוקדש", p: 6, kind: "הקדשה", accent: "#8f9bbd",
    blurb: "בוקר אחד בארץ הפלאות, חד קרן בת 12 או 13 שבוכה על נדנדה, ומשפט אחד שנשאר.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22">${Array.from({ length: 5 }, (_, i) => `<rect x="${3 + i * 8.4}" y="5" width="4.4" height="12" fill="currentColor"/>`).join("")}</svg>`,
    css: `
.mk-zebra { display: block; width: 150px; margin: 9vh 0; }
.mk-zebra rect { fill: none; stroke: var(--ink); stroke-width: .8; }
.mk .coda { color: var(--ink-soft); font-size: .95em; max-width: 26rem; }
.mk .wish { font-family: var(--f-display); font-size: 1.12em; }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 6, title: "מוקדש", meta: "הקדשה · שתי דקות קריאה", cls: "mk",
        body: ps([
          "היום בבוקר חציתי את ארץ הפלאות בדרכי לעבודה. איחלתי בוקר טוב לאיילי חג המולד, חיבקתי לשלום את הפיראטית ונתתי שושנה לנסיך הקטן.",
          "ואז, ממש לפני שנכנסתי לאוטו, ראיתי חד קרן יפה כזו, בת 12 או 13 יושבת על נדנדת עץ ובוכה. לחד קרן הזו, עם הקשת בענן שהיא ציירה לעצמה על הלחי, ועכשיו היא מרוחה, היה יום קצת אחר.",
          "סגרתי את הדלת וניגשתי לחד קרן. התיישבתי לידה. התנדנדנו כמה רגעים שקטים קדימה ואחורה. היא משכה קצת באף והמבטים שלנו נפגשו בשלולית הקטנה שעל הרצפה.",
          { c: "said", t: "\"איך קוראים לך, חד קרן?\"" },
          { c: "said", t: "\"דנה\" היא אמרה." },
          { c: "said", t: "\"ולמה את בוכה?\"" },
          { c: "said", t: "\"שכחתי את הכנפיים בבית. אני לא יכולה להיות חד קרן בלי כנפיים\"." },
          { c: "said", t: "טיפה נוספת נפלה לשלולית." },
          { c: "said", t: "\"דנה, את לא צריכה כנפיים\"" },
          { c: "said wish", t: "\"אנחנו לא רוצים אותך בשמיים, אנחנו רוצים אותך כאן איתנו, על האדמה\"." },
          "היא חייכה והמשיכה לדרכה."
        ]) + ZEBRA + `<p class="coda">הרבה שנים לקח לי ללמוד להתמודד עם ארץ הפלאות הזו, שמסתיימת ומתחילה עם דנה במעבר חצייה. תמיד היא צפה אצלי בהמון געגועים ובדמעות של פורים.</p>`
      });
    }
  });
})();
