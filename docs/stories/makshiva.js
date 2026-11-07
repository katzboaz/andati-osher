/* מקשיבה אבל לא שומעת — she keeps the dark "in a small, small room in the
   lower left corner of the chest". A plain page; that small dark square stays
   in the lower left corner of the screen for as long as you read. */
(() => {
  const { page, ps, register } = window.KIT;

  register({
    id: "makshiva", title: "מקשיבה אבל לא שומעת", p: 41, kind: "סיפור קצר", accent: "#4f4f55",
    blurb: "ארבעה ימים בלי שינה, וחושך קטן שמוחזק בפינה השמאלית התחתונה של בית החזה.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><rect x="1" y="1" width="42" height="20" fill="none" stroke="currentColor" stroke-width=".8"/><rect x="4" y="13" width="5" height="5" fill="currentColor"/></svg>`,
    css: `
.mk-room { position: fixed; left: max(22px, env(safe-area-inset-left, 0px)); bottom: max(22px, env(safe-area-inset-bottom, 0px)); width: 9px; height: 9px; background: var(--ink); z-index: 30; pointer-events: none; }`,
    mount(root, ctx) {
      page(root, ctx, {
        p: 41, title: "מקשיבה אבל לא שומעת", meta: "סיפור קצר · שתי דקות קריאה",
        body: ps([
          "\"ארבעה ימים לא ישנתי\" הוא אמר לי. \"ארבעה ימים\".",
          "ואני מקשיבה אבל לא שומעת.",
          "למדתי להדחיק, להתעלם, לבלוע את הסערה שמתחוללת בתוכי. לא נותנת לחרדה אפילו חריץ קטן לברוח. מחזיקה את החושך הזה בחדר קטן קטן בפינה השמאלית התחתונה של בית החזה והחושך הזה לוחץ.",
          "הוא לא נראה עייף, רק קצת מלוכלך ועם זיפים ארוכים יותר. הוא אפילו לא מציץ לחדר של הילדים לראות אותם ישנים. זה הזמן האפור שלו. השעה הזו בין החיים שבחוץ לחיים שבבית.",
          "אני תוהה לעצמי איפה הוא מחזיק את הכל. איך הוא מכיל את כל החיים שבחוץ בפנים. לא נותן להם להרעיד את הבית.",
          "\"עוד לא נתתי לכלבים לאכול\" ממלמלת אליו. הוא אוסף את שאריות ארוחת הערב וזורק את השקית אל הפח בחוץ. בטח צריך עוד נשימה של אוויר נקי. מאכיל את הכלבים ונכנס למקלחת.",
          "מנסה להירדם על צד שמאל עם הכרית בין הידיים. עושה את עצמי ישנה, נושמת עמוק ובשקט. יד כבדה עוטפת את בית החזה שלי.",
          "הוא שוב חזר קצת אחר, מפלחת אותי ההבנה. לפחות הוא חזר."
        ]),
        after: `<div class="mk-room" aria-hidden="true"></div>`
      });
    }
  });
})();
