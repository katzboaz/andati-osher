/* משבר — printed in two columns side by side: what he has, and the kid he
   still is. Both stay on the page, row for row as printed. Touching a column
   brings it forward and lets the other recede; touching it again shows both.
   Then the coda, in one column. */
(() => {
  const { register } = window.KIT;
  // [has, still-the-kid] per printed row; "" leaves that side blank
  const ROWS = [
    ["יש לי משרד", ""], ["מול הים והנוף", ""], ["מכונה שטוחנת פולים", ""],
    ["לאספרסו ארוך", "אבל אני עדיין הילד"], ["וג'יפ חדש", "שלא הסתדר בכיתה"], ["בחניון מחכה", "ונכשל במבחנים"],
    ["אוזניות לבנות", "ורב עם מורים"], ["ושיניים צחורות", "שברח לגלים"], ["", "מבלי לספר"],
    ["יש לי אישה", "וישן על ספסל"], ["וארבעה ילדים", "במקום אצל חבר"], ["וחדר כושר", ""],
    ["ובריכה", "ורק כשהבנתי"], ["עם מים חמים", "בגיל ארבעים"], ["וכרטיסי טיסה ליפן", "שמרגישים שלמים"],
    ["ואחד גם לסין", "רק כשמגשימים"], ["ומחלקת עסקים", "את הרצונות האמיתיים"], ["לכל החברים", "מבלי לשים זין"],
    ["", "על אם יפתחו עין"], ["", "ועל מה יגידו"], ["", "ומה יחשבו"]
  ];
  const CODA = ["אז עשיתי את מה שבאמת", "רציתי", "ולמדתי לשיר", "לנגן", "ולאהוב", "והרגשתי מוכשר", "ושלם", "ומאושר."];

  register({
    id: "mashber", title: "משבר", p: 49, kind: "שיר", accent: "#5c7f95",
    blurb: "שני טורים זה לצד זה: מה שיש לו, והילד שהוא עדיין.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M26 4h14M26 8h12M26 12h14M26 16h10M4 8h14M4 12h12M4 16h14M4 20h10" stroke="currentColor" stroke-width="1"/></svg>`,
    css: `
.ms .story-head { padding-block: 20vh 6vh; }
.ms-body { padding-left: var(--gut-l); padding-right: var(--gut-r); max-width: 1080px; margin: 0 auto; }
.ms-hint { font-family: var(--f-ui); font-weight: 300; font-size: 12px; color: var(--ink-faint); margin-bottom: 5vh; }
.ms-cols { display: grid; grid-template-columns: minmax(0, 15rem) minmax(0, 15rem); column-gap: clamp(28px, 6vw, 90px);
  font-family: var(--f-display); font-weight: 300; font-size: clamp(19px, 1.9vw, 24px); line-height: 1.75; }
.ms-col { display: grid; cursor: pointer; transition: opacity .7s ease; -webkit-tap-highlight-color: transparent; }
.ms-col span { display: block; min-height: 1.75em; white-space: nowrap; }
.ms-cols.f-has .ms-col.kid, .ms-cols.f-kid .ms-col.has { opacity: .16; }
.ms-coda { margin-top: 12vh; font-family: var(--f-display); font-weight: 300; font-size: clamp(22px, 2.1vw, 27px); line-height: 1.7; }
.ms-coda span { display: block; }
@media (max-width: 560px) { .ms-cols { column-gap: 18px; font-size: 16.5px; } .ms-col span { white-space: normal; } }`,
    mount(root, ctx) {
      const col = (k, cls) => `<div class="ms-col ${cls}" role="button" tabindex="0">${ROWS.map(r => `<span>${r[k]}</span>`).join("")}</div>`;
      root.innerHTML = `
<div class="ms">
  <header class="story-head"><span class="eyebrow">ענדתי אושר · עמוד 49</span><h1>משבר</h1><div class="meta">שיר · שני טורים</div></header>
  <div class="ms-body">
    <div class="ms-hint">אפשר לקרוא כל טור לבד, או את שניהם יחד. לחיצה על טור מבליטה אותו.</div>
    <div class="ms-cols">${col(0, "has")}${col(1, "kid")}</div>
    <div class="ms-coda">${CODA.map(l => `<span>${l}</span>`).join("")}</div>
  </div>
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
</div>`;
      const cols = root.querySelector(".ms-cols");
      root.querySelectorAll(".ms-col").forEach(c => {
        const k = c.classList.contains("has") ? "f-has" : "f-kid";
        const toggle = () => {
          const on = cols.classList.contains(k);
          cols.classList.remove("f-has", "f-kid");
          if (!on) cols.classList.add(k);
        };
        c.onclick = toggle;
        c.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };
      });
    }
  });
})();
