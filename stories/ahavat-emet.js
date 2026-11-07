/* אהבת אמת — the same evening told twice, his version and then hers, line
   for line. One page; a switch at the top turns it from one side to the other,
   and the lines stay where they are so the difference shows. */
(() => {
  const { page, st, register } = window.KIT;
  const HIS = [
    ["הצעתי לאישתי נישואין,", "בפעם השניה.", "היא קיבלה עוד יהלום", "לענוד על אצבעה."],
    ["ירדתי על הברך", "הילדה מחאה כפיים.", "היא אמרה שוב \"כן\"", "והתנשקנו פעמיים."],
    ["היה ערב נהדר,", "אמבטיה מלאה בקצף.", "זרם הרבה יין", "ונטפליקס ברצף."]
  ];
  const HERS = [
    ["הוא הציע לי נישואין", "בפעם השניה.", "הביא לי עוד טבעת", "לא ממש יפה."],
    ["כרע הוא על ברכיו", "הילדה היתה שמחה.", "אמרתי לו \"ברור\"", "וזייפתי נשיקה."],
    ["קיוויתי שהאמבטיה תעזור", "אך בסוף לקחתי אקמול.", "שתיתי כדי לשכוח", "את המכות של אתמול."]
  ];

  register({
    id: "ahavat-emet", title: "אהבת אמת", p: 39, kind: "שיר", accent: "#a5677a",
    blurb: "הצעת נישואין שניה, מסופרת פעמיים: פעם בקול שלו ופעם בקול שלה.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><rect x="2" y="4" width="18" height="14" fill="none" stroke="currentColor" stroke-width="1"/><rect x="24" y="4" width="18" height="14" fill="currentColor" opacity=".5"/></svg>`,
    css: `
.ae-seg { display: inline-flex; border: 1px solid var(--hair); border-radius: 999px; padding: 3px; font-family: var(--f-ui); font-size: 13px; margin-bottom: 7vh; }
.ae-seg button { border: 0; background: none; padding: 7px 18px; border-radius: 999px; color: var(--ink-soft); cursor: pointer; font: inherit; transition: background .3s, color .3s; }
.ae-seg button[aria-pressed="true"] { background: var(--ink); color: var(--paper); }
.ae-both { display: grid; }
.ae-v { grid-area: 1 / 1; transition: opacity .9s ease, visibility 0s linear .9s; }
.ae-v[hidden] { display: block; opacity: 0; visibility: hidden; }
.ae-v:not([hidden]) { transition: opacity .9s ease .1s, visibility 0s; }
.ae-v.hers { color: var(--ink); }
.ae-turn { font-family: var(--f-ui); font-size: 13px; letter-spacing: .08em; border: 0; background: none; padding: 0 0 3px; border-bottom: 1px solid var(--ink); color: var(--ink); cursor: pointer; margin-top: 2vh; }`,
    mount(root, ctx) {
      const v = (arr, cls, hidden) => `<div class="ae-v ${cls}"${hidden ? " hidden" : ""}>${arr.map(s => st(...s)).join("")}</div>`;
      const el = page(root, ctx, {
        p: 39, title: "אהבת אמת", meta: "שיר · שני צדדים", cls: "poem ae",
        body: `<div class="ae-seg" role="group" aria-label="מי מספר"><button aria-pressed="true" data-v="his">הוא</button><button aria-pressed="false" data-v="hers">היא</button></div>
          <div class="ae-both">${v(HIS, "his", false)}${v(HERS, "hers", true)}</div>
          <button class="ae-turn">ועכשיו, הצד שלה</button>`
      });
      const btns = [...el.querySelectorAll(".ae-seg button")], turn = el.querySelector(".ae-turn");
      const show = w => {
        btns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === w)));
        el.querySelector(".ae-v.his").hidden = w !== "his";
        el.querySelector(".ae-v.hers").hidden = w !== "hers";
        turn.textContent = w === "his" ? "ועכשיו, הצד שלה" : "שוב, הצד שלו";
      };
      btns.forEach(b => b.onclick = () => show(b.dataset.v));
      turn.onclick = () => show(el.querySelector(".ae-v.his").hidden ? "his" : "hers");
    }
  });
})();
