/* אלגנטית — two paragraphs and the night between them, which the text never
   tells. The page leaves that night as empty space. A short line of red
   lipstick under the title; after the night, the same line, redone. */
(() => {
  const { page, ps, register } = window.KIT;
  const LINE = cls => `<svg class="el-red ${cls}" viewBox="0 0 120 8" aria-hidden="true"><path d="M2 5 C30 2 70 3 118 4"/></svg>`;

  register({
    id: "elegantit", title: "אלגנטית", p: 61, kind: "סיפור קצר", accent: "#b23a3a",
    blurb: "נערה בת 16 שמתאמנת על אלגנטיות מול המראה, והבוקר שאחרי אותו לילה.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M4 13C14 10 28 11 40 12" fill="none" stroke="#b23a3a" stroke-width="2" stroke-linecap="round"/></svg>`,
    css: `
.el-red { display: block; width: 110px; height: 8px; margin: 0 0 6vh; }
.el-red path { fill: none; stroke: var(--accent); stroke-width: 2.2; stroke-linecap: round; }
.el-red.again { margin: 0 0 1.4em; transform: rotate(-1.6deg) translateX(-6px); }
.el-red.again path { stroke-width: 2.6; }
.el-night { height: 55vh; }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 61, title: "אלגנטית", meta: "סיפור קצר · שתי דקות קריאה",
        body: LINE("") + ps([
          "תמיד דמיינתי את עצמי אלגנטית, מתלבשת מחויט לעבודה, נועלת עקבים גבוהים עם אודם אדום ותיק ג'יימס בונד כזה, מעור חום עם אבזמים גדולים. אלגנטיות היתה המילה שהכי אהבתי, הייתי מתאמנת על המשמעות שלה בלילות מול המראה. איך להיכנס לאוטו כמו ליידי, איך לצאת ממנו כמו כוכבת. איך לנגב את הפה עם טישו, להתעטש למרפק ואפילו סיגלתי לעצמי איזו קידה קטנה כזו, אלגנטית, כשאני אומרת להתראות. אמא תמיד הייתה צוחקת עלי. \"את רק בת 16, תשמרי את הגינונים האלו לאחר כך\", ואני צחקקתי עם פה סגור, מנצלת כל הזדמנות להתאמן."
        ]) + `<div class="el-night" aria-hidden="true"></div>` + LINE("again") + ps([
          "קמתי עם הנגאובר נוראי אחרי אותו לילה. שטפתי את הפנים, סירקתי את השיער עם שביל בצד, תיקנתי את האודם. אלגנטי זה לא היה, הרהרתי בעודי מדביקה את הנפש שלי מחדש.",
          "מקווה שאמא לא תצחק כשאספר לה."
        ])
      });
    }
  });
})();
