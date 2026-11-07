/* ארבעים ושתים — an artist watching his life's work burn, one stanza at a
   time. Beside it, forty-two small canvases. With "colors crumbling to black
   ash" they turn to ash; on the last stanza, when it turns out he planned it,
   the ones he set aside come back. */
(() => {
  const { steps, register } = window.KIT;
  const S = [
    ["עמדתי מרחוק וצפיתי בלהבות הענק מחריבות את מפעל חיי.", "השמים בהקו בצבעי לבן ושחור ואדום.", "העיניים שלי הצטמצמו לכדי חריץ צר, מנסה למנוע מהעשן לצרוב לי את הנשמה.", "לנתק את חוט השדרה של הנשימה."],
    ["עשרות ציורים, רעיונות ואהבה אחת נעלמו ברגע.", "צבעים חזקים מתפוררים לאפר שחור.", "גיהנום.", "לצפות בתקופת חיים מתאדה בטמפרטורה גבוהה.", "חיתוך חבל הטבור.", "פרידה במקום חיבור."],
    ["ארבעים ושתיים זה גיל שעדיין אפשר להתחיל מחדש?", "להתחיל לייצר, ליצור ולשחזר?", "למצוא את הכוחות לבנות בית חדש?", "ואהבה?"],
    ["לאורך חיי אגרתי חוויות, אצרתי רגעים.", "הוצאתי אותם החוצה בפרצים גדולים.", "הבשלתי לאורך השנים.", "על אש קטנה, גחלים לוחשות.", "גיצים שעפו בשמי חיי החשוכים,", "נתפסו על הבד במריחה. לכלוכים."],
    ["תכננתי כל פרט בשנה האחרונה.", "אילו יצירות אמכור ומה ישאר בשבילי.", "מה אפרסם בתהליך ומה אנצור בליבי.", "מתי אזעיק את מכבי האש והמשטרה", "והיכן אחביא את מפתח חדר המיתות, כשהיא ישנה."]
  ];
  const PAL = ["#c9a27a", "#8fa6b2", "#b97a6a", "#d4c08a", "#7f9a83", "#a88fb0", "#c98f6b", "#6f8aa3"];
  let seed = 4;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const KEPT = new Set([3, 8, 13, 19, 24, 30, 35, 40]);
  const cells = Array.from({ length: 42 }, (_, i) => {
    const r = Math.floor(i / 6), c = i % 6;
    const w = 40 + rnd() * 10, h = 30 + rnd() * 16;
    const x = 372 - c * 62 - w + (rnd() - .5) * 6, y = 8 + r * 58 + (rnd() - .5) * 6;
    const ash = Math.round(208 + rnd() * 22);
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" style="--c:${PAL[i % PAL.length]};--a:rgb(${ash},${ash - 2},${ash - 6})"${KEPT.has(i) ? ` class="kept"` : ""}/>`;
  }).join("");
  const ART = `<svg viewBox="0 0 380 414">${cells}</svg>`;

  register({
    id: "arbaim-ushtaim", title: "ארבעים ושתים", p: 28, kind: "שיר", accent: "#b97a6a",
    blurb: "ארבעים ושניים ציורים שהופכים לאפר, וההבנה מאוחר מדי שזה היה מתוכנן.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><rect x="2" y="4" width="11" height="8" fill="#c9a27a"/><rect x="16" y="4" width="11" height="8" fill="#d9d7d1"/><rect x="30" y="4" width="11" height="8" fill="#d9d7d1"/><rect x="9" y="14" width="11" height="6" fill="#d9d7d1"/><rect x="23" y="14" width="11" height="6" fill="#8fa6b2"/></svg>`,
    css: `
.ft .ks-art rect { fill: var(--c); transition: fill 2.6s ease; }
.ft[data-f="2"] .ks-art rect, .ft[data-f="3"] .ks-art rect, .ft[data-f="4"] .ks-art rect, .ft[data-f="5"] .ks-art rect:not(.kept), .ft[data-f="6"] .ks-art rect:not(.kept) { fill: var(--a); }
.ft[data-f="2"] .ks-art rect { transition-duration: 4s; }
.ft .ks-frame { font-size: clamp(20px, 1.9vw, 25px); }
@media (max-width: 860px) { .ft .ks-frame { font-size: 18px; line-height: 1.6; } }`,
    mount(root, ctx) {
      return steps(root, ctx, {
        p: 28, title: "ארבעים ושתים", meta: "שיר · חמישה בתים", cls: "ft", art: ART,
        frames: S.map(s => ({ html: s.map(l => `<span>${l}</span>`).join("") }))
      });
    }
  });
})();
