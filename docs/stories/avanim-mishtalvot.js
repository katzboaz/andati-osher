/* אבנים משתלבות — one quiet idea. The sidewalk, seen from above, in hairline
   interlocking pavers. A water stain sits on it from the start; for one step
   it is the shape of someone lying there, then it is only water again, with
   a slow drip from the pizzeria's air conditioner. */
(() => {
  const CSS = `
.av { --water: #7d929c; }
.av-scrolly { display: grid; grid-template-columns: minmax(0, 34rem) minmax(0, 1fr); gap: 6vw;
  max-width: 1240px; margin: 0 auto; padding-left: var(--gut-l); padding-right: var(--gut-r); }
.av-steps { padding-block: 10vh 30vh; }
.av-step { padding-block: 22vh; margin: 0; opacity: .28; transition: opacity .6s ease; }
.av-step:first-child { padding-top: 6vh; }
.av-step.on { opacity: 1; }
.av-step.seen:not(.on) { opacity: .5; }
.av-step p { margin: 0; }
.av-step .short { font-family: var(--f-display); font-weight: 300; font-size: 30px; line-height: 1.4; }
.av-stage { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; justify-content: center; z-index: 5; }
.av-stage svg { width: 100%; max-width: 520px; height: auto; max-height: 82svh; }

.av .joint { fill: none; stroke: rgba(28,28,26,.2); stroke-width: .7; stroke-linejoin: round; }
.av .wet { fill: var(--water); }
.av .stain { opacity: .36; }
.av .fig { opacity: 0; transition: opacity 1.4s ease; }
.av.lay .fig { opacity: .32; transition-duration: 2.2s; }
.av .drop { fill: none; stroke: var(--water); stroke-width: 1; vector-effect: non-scaling-stroke;
  transform-origin: 0 0; opacity: 0; }
.av.drip .drop { animation: av-drop 6s ease-out infinite; animation-delay: 1.2s; }
@keyframes av-drop {
  0% { transform: scale(1); opacity: 0; }
  2% { opacity: .7; }
  30% { transform: scale(22); opacity: 0; }
  100% { transform: scale(22); opacity: 0; }
}

@media (max-width: 860px) {
  .av-scrolly { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .av-stage { order: -1; height: 46svh; align-items: flex-end; padding-bottom: 8px;
    background: var(--paper); box-shadow: 0 14px 18px -14px rgba(255,255,255,1); }
  .av-stage svg { max-height: 42svh; width: auto; }
  .av-steps { padding-block: 4vh 30vh; }
  .av-step { padding-block: 16vh; }
  .av-step .short { font-size: 26px; }
}
@media (prefers-reduced-motion: reduce) {
  .av.drip .drop { animation: none; }
}
`;

  // as printed: one sentence to a line; the two stanza breaks fall after steps 4 and 7
  const STEPS = [
    { l: ["נפלתי אתמול על המדרכה.", "בנס לא שברתי את הרגל."] },
    { l: ["הרמתי את עצמי לאט, הקרסול נקוע בוודאות, יד ימין מדממת קצת מהשפשוף באבנים המשתלבות.", "קרע קטן במכנסים וכפכף הווייאנס שסיים את דרכו."] },
    { l: ["\"סאמק\", סיננתי לעצמי כשניסיתי ללכת כמה צעדים עם רגל אחת יחפה וחבולה."] },
    { l: ["עצרתי.", "הסתובבתי אחורה להסתכל במה בעצם נתקלתי."] },
    { lay: true, l: ["לרגע היה נדמה לי ששכבת שם על הרצפה."] },
    { drip: true, l: ["שפשפתי את העיניים, ונעלמת.", "איפה ששכבת נשאר רק כתם של מים שנזל מצינור הניקוז של המזגן הרועש של הפיצריה."] },
    { drip: true, l: ["אוף.", "חזרת לבקר ופיספסתי אותך."] },
    { drip: true, l: ["הדקה הקצרה הזו, של ערבוב המציאות, תפסה אותי לא מוכן."] },
    { short: true, l: ["אוף. כמה שאני מתגעגע אליך."] }
  ];

  /* the paver joints: wavy long edges, straight short ones, rows offset by half */
  const zig = y => `M0 ${y} L4 ${y + 3} L12 ${y - 3} L20 ${y + 3} L28 ${y - 3} L36 ${y + 3} L44 ${y - 3} L48 ${y}`;
  const JOINTS = `${zig(0)} ${zig(24)} ${zig(48)} M0 0 V24 M48 0 V24 M24 24 V48`;

  const SVG = `
<svg viewBox="0 0 400 400" role="presentation">
  <defs>
    <pattern id="av-pave" width="48" height="48" patternUnits="userSpaceOnUse" x="8" y="4">
      <path class="joint" d="${JOINTS}"/>
    </pattern>
    <radialGradient id="av-fade" cx="50%" cy="50%" r="50%">
      <stop offset="55%" stop-color="#fff"/><stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <mask id="av-edge"><rect width="400" height="400" fill="url(#av-fade)"/></mask>
    <filter id="av-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="av-softer" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  <g mask="url(#av-edge)">
    <rect width="400" height="400" fill="url(#av-pave)"/>
    <g class="fig" filter="url(#av-soft)">
      <g transform="translate(112 132) rotate(24)">
        <circle class="wet" cx="0" cy="0" r="19"/>
        <ellipse class="wet" cx="92" cy="2" rx="68" ry="27"/>
        <ellipse class="wet" cx="176" cy="-8" rx="44" ry="11" transform="rotate(-5 176 -8)"/>
        <ellipse class="wet" cx="176" cy="13" rx="44" ry="11" transform="rotate(4 176 13)"/>
      </g>
    </g>
    <path class="wet stain" filter="url(#av-softer)"
      d="M192 196 C206 184 232 186 240 198 C250 210 244 224 228 228 C214 232 206 240 192 236 C176 232 172 214 180 206 C184 202 186 200 192 196 Z"/>
    <g transform="translate(212 212)"><circle class="drop" r="1"/></g>
  </g>
</svg>`;

  let cleanup = [];

  function mount(root, ctx) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const steps = STEPS.map(s => `<div class="av-step${s.short ? " short-step" : ""}">${s.l.map(l => `<p${s.short ? ` class="short"` : ""}>${l}</p>`).join("")}</div>`).join("");
    root.innerHTML = `
<div class="av" id="av">
  <header class="story-head">
    <span class="eyebrow">ענדתי אושר · עמוד 22</span>
    <h1>אבנים משתלבות</h1>
    <div class="meta">סיפור קצר · דקה קריאה</div>
  </header>
  <section class="av-scrolly">
    <div class="av-steps">${steps}</div>
    <div class="av-stage" aria-hidden="true">${SVG}</div>
  </section>
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
</div>`;

    const av = root.querySelector("#av");
    const els = [...av.querySelectorAll(".av-step")];
    const stage = av.querySelector(".av-stage");

    let active = -1;
    function apply(i) {
      av.classList.toggle("lay", !!STEPS[i].lay);
      av.classList.toggle("drip", !!STEPS[i].drip);
      els.forEach((el, j) => { el.classList.toggle("on", j === i); el.classList.toggle("seen", j < i); });
    }
    function pick() {
      const narrow = innerWidth <= 860;
      const line = narrow ? stage.offsetHeight + (innerHeight - stage.offsetHeight) * .45 : innerHeight * .55;
      let i = 0;
      for (let j = 0; j < els.length; j++) if (els[j].getBoundingClientRect().top < line) i = j;
      if (i !== active) { active = i; apply(i); }
    }
    let ticking = false;
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; pick(); }); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    pick();
    cleanup = [
      () => removeEventListener("scroll", onScroll),
      () => removeEventListener("resize", onScroll),
      () => style.remove()
    ];
  }

  window.BOOK.register({
    id: "avanim-mishtalvot",
    title: "אבנים משתלבות",
    page: 22,
    kind: "סיפור קצר",
    blurb: "נפילה על המדרכה, וכתם מים שלרגע נראה כמו מישהי ששוכבת שם.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M2 6 L6 8 L14 4 L22 8 L30 4 L38 8 L42 6 M2 16 L6 18 L14 14 L22 18 L30 14 L38 18 L42 16 M22 6 V16" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
    accent: "#7d929c",
    mount,
    unmount() { cleanup.forEach(f => f()); cleanup = []; }
  });
})();
