/* הבטחות — New Year's Eve, told by the clock. One timestamp at a time; under
   the text, the night as a single line from 22:30 to 7:42, with each moment
   placed where it falls. The long empty stretch is the night itself. */
(() => {
  const { steps, register } = window.KIT;
  const T = [
    ["22:30", 0, ["הצחוק של הילדים שרואים טלוויזיה בסלון מזדחל לתוך השקט, האוויר זז קלות, והריח של הים מנסה להתגבר על עשן הסיגריה. מנסה לרוקן לי את המחשבות לתוך החושך שבחוץ.", "ערב ראש השנה. כל הרחוב מריח מהתחלות חדשות ומקמינים ששורפים זכרונות ישנים."]],
    ["22:32", 2, ["הודעה מאשתי קופצת על המסך של הטלפון \"בוא למיטה, אני מפחדת שהחושך יבלע אותך\".", "היא תמיד שם, מחכה לי. לא מבין איך היא יכולה לסבול. אותי. אותנו."]],
    ["23:45", 75, ["הקופסה ריקה. איך תמיד חסרה לי הסיגריה האחרונה."]],
    ["23:56", 86, ["חם לי בגב כשהיא מחבקת אותי מאחורה. נצמדת אלי חזק חזק, כאילו מנסה להתחבא מהשדים של הלילה. אבל השדים שחורים מתמיד. אני רוצה לחבק אותה חזרה, אבל אני לא יכול."]],
    ["00:01", 91, ["שנה חדשה."]],
    ["6:23", 473, ["מכבה את השעון המעורר לפני שהוא יצלצל. מתלבש בחושך ומסובב את המנעול של הדלת בשקט. מגניב מבט אל הסלון ההפוך, כריות על הרצפה, שאריות שוקו בכוסות."]],
    ["7:40", 550, ["מסובב את המפתח אצלה בדירה הקטנה שבחיפה."]],
    ["7:42", 552, ["מפר הבטחה של שנה חדשה."]]
  ];
  // positions along the night, right to left, with a little room between close moments
  const pos = (() => {
    const out = T.map(t => t[1] / 552 * 100);
    for (let i = 1; i < out.length; i++) out[i] = Math.max(out[i], out[i - 1] + 2.6);
    const k = 100 / out[out.length - 1];
    return out.map(x => x * k);
  })();

  register({
    id: "havtachot", title: "הבטחות", p: 72, kind: "סיפור קצר", accent: "#5a6f8f",
    blurb: "ערב ראש השנה, משעה 22:30 עד 7:42 בבוקר, והבטחה אחת שמופרת.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M2 11H42" stroke="currentColor" stroke-width=".8"/>${[42, 40, 36, 35, 34, 10, 4, 2].map(x => `<circle cx="${x}" cy="11" r="1.4" fill="currentColor"/>`).join("")}</svg>`,
    css: `
.hv-time { font-family: var(--f-ui); font-weight: 300; font-variant-numeric: tabular-nums; font-size: clamp(36px, 4vw, 52px); color: var(--ink-faint); direction: ltr; text-align: right; margin-bottom: 3vh; letter-spacing: -.02em; }
.hv .ks-frame.prose p { margin-bottom: .6em; }
.hv-night { position: absolute; left: var(--gut-l); right: var(--gut-r); bottom: calc(76px + env(safe-area-inset-bottom, 0px)); height: 30px; max-width: 760px; margin: 0 auto; pointer-events: none; opacity: 0; transition: opacity .8s; }
.hv:not([data-f="0"]) .hv-night { opacity: 1; }
.hv-night .ln { position: absolute; top: 14px; left: 0; right: 0; height: 1px; background: var(--hair); }
.hv-night .lit { position: absolute; top: 14px; right: 0; height: 1px; background: var(--ink-soft); transition: width .9s ease; }
.hv-night i { position: absolute; top: 12px; width: 5px; height: 5px; margin-right: -2.5px; border-radius: 50%; background: var(--hair); transition: background .4s; }
.hv-night i.past { background: var(--ink-soft); }
.hv-night i.cur { background: var(--ink); }
@media (max-width: 860px) { .hv-night { bottom: calc(66px + env(safe-area-inset-bottom, 0px)); } }`,
    mount(root, ctx) {
      const inst = steps(root, ctx, {
        p: 72, title: "הבטחות", meta: "סיפור קצר · שמונה שעות, דקה קריאה", cls: "hv",
        frames: T.map(([t, , ps]) => ({ cls: "prose", html: `<div class="hv-time">${t}</div>${ps.map(x => `<p>${x}</p>`).join("")}` })),
        onFrame(n, el) {
          const k = n - 1;
          el.querySelectorAll(".hv-night i").forEach((d, i) => { d.classList.toggle("cur", i === k); d.classList.toggle("past", i < k); });
          const lit = el.querySelector(".hv-night .lit");
          if (lit) lit.style.width = (k < 0 ? 0 : pos[Math.min(k, T.length - 1)]) + "%";
        }
      });
      const night = document.createElement("div");
      night.className = "hv-night";
      night.setAttribute("aria-hidden", "true");
      night.innerHTML = `<div class="ln"></div><div class="lit"></div>${pos.map(p => `<i style="right:${p}%"></i>`).join("")}`;
      inst.el.appendChild(night);
      return inst;
    }
  });
})();
