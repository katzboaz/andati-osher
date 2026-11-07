/* עמוק במגירה — the story opens and closes on the same moment: Lian at the window,
   holding something, and him shouting from the street. In between, the black box travels:
   a dresser, a crate of clothes, a doorstep, the last drawer. What is inside is only shown
   at the very end, the one red thing in the piece.
   Same mechanics as אהבה רגעית: each paragraph is a step, its data-* keys carry forward
   until a later step changes them, and `fx` lasts one step. */
(() => {
  const CSS = `
.em { --pen: #3f6fae; --heart: #b8443c; --ember: #d9894a; --glow: #fbf5e4; }
.em-scrolly { display: grid; grid-template-columns: minmax(0, 34rem) minmax(0, 1fr); gap: 6vw;
  max-width: 1240px; margin: 0 auto; padding-left: var(--gut-l); padding-right: var(--gut-r); }
.em-steps { padding-block: 10vh 30vh; }
.em-step { padding-block: 24vh; margin: 0; opacity: .28; transition: opacity .6s ease; }
.em-step:first-child { padding-top: 6vh; }
.em-step.on, .em-step.seen { opacity: 1; }
.em-step.seen:not(.on) { opacity: .5; }
.em-step p { margin: 0 0 1em; }
.em-step p:last-child { margin-bottom: 0; }
.em-step .short { font-family: var(--f-display); font-weight: 300; font-size: 30px; line-height: 1.4; }
.em-stage { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; justify-content: center; z-index: 5; }
.em-stage svg { width: 100%; max-width: 440px; height: auto; max-height: 78svh; overflow: visible; }

.em .ln { fill: none; stroke: var(--ink); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
.em .ln-soft { fill: none; stroke: var(--ink-faint); stroke-width: .8; vector-effect: non-scaling-stroke; stroke-linecap: round; }
.em .paper { fill: var(--paper); }
.em .blk { fill: #141413; }

/* every scene is a layer; only the current one is shown */
.em .sc { opacity: 0; transition: opacity .9s ease; }
.em[data-scene="street"] .sc-street, .em[data-scene="heart"] .sc-street,
.em[data-scene="squeeze"] .sc-squeeze, .em[data-scene="words"] .sc-words,
.em[data-scene="pen"] .sc-pen, .em[data-scene="rain"] .sc-umbrella, .em[data-scene="home"] .sc-home { opacity: 1; }
.em:is([data-scene="box"], [data-scene="deep"], [data-scene="drawer"], [data-scene="closet"]) .sc-chest { opacity: 1; }
.em[data-scene="years"] .sc-chest { opacity: .3; }
.em[data-scene="years"] .sc-years { opacity: 1; }
.em[data-scene="crate"] .sc-crate, .em[data-scene="door"] .sc-door { opacity: 1; }
.em .sc-front { transition: none; }
.em[data-scene="drawer"] .sc-front { opacity: 1; }

/* the black box, carried between scenes */
.em .box { opacity: 0; transform: translate(200px, 250px) scale(1); transition: transform 1.4s cubic-bezier(.6,.05,.25,1), opacity .9s ease; }
.em .box .rim { fill: #141413; transition: fill 1.2s; }
.em .box .things { transition: opacity .8s, transform .8s; }
.em .box .void { opacity: 0; transition: opacity 1.4s; }
.em[data-scene="box"] .box { opacity: 1; }
.em[data-scene="deep"] .box { opacity: 1; transform: translate(200px, 250px) scale(1.12); }
.em[data-scene="deep"] .box .rim { fill: #000; }
.em[data-scene="deep"] .box .things { opacity: 0; transform: translateY(18px); }
.em[data-scene="deep"] .box .void { opacity: .55; }
.em[data-scene="crate"] .box { opacity: 1; transform: translate(200px, 436px) scale(.78); }
.em[data-scene="door"] .box { opacity: 1; transform: translate(296px, 450px) scale(.62); }
.em:is([data-scene="crate"], [data-scene="door"], [data-scene="drawer"]) .box .things { opacity: 0; }
.em[data-scene="drawer"] .box { opacity: 0; animation: em-stow 3.4s cubic-bezier(.5,0,.3,1) both; }
@keyframes em-stow {
  0% { opacity: 1; transform: translate(296px, 450px) scale(.62); }
  34% { opacity: 1; transform: translate(200px, 404px) scale(.45); }
  62% { opacity: 1; transform: translate(200px, 450px) scale(.45); }
  70%, 100% { opacity: 0; transform: translate(200px, 450px) scale(.45); }
}
.em .drawer4 { transform-box: fill-box; transform-origin: 50% 100%; }
.em .inside { opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; transform: scaleY(0); }
.em[data-scene="drawer"] .drawer4 { animation: em-pull 3.4s cubic-bezier(.5,0,.3,1) both; }
.em[data-scene="drawer"] .inside { animation: em-open 3.4s cubic-bezier(.5,0,.3,1) both; }
@keyframes em-pull { 0%, 100% { transform: none; } 18%, 70% { transform: translateY(10px) scale(1.05); } 88% { transform: none; } }
@keyframes em-open { 0%, 100% { opacity: 0; transform: scaleY(0); } 18%, 70% { opacity: 1; transform: scaleY(1); } 88% { opacity: 0; transform: scaleY(0); } }
/* the closet she wants to tidy: drawers sit askew, then he shuts them */
.em .dr { transition: transform .5s cubic-bezier(.3,1.4,.5,1); }
.em[data-scene="closet"] .dr { animation: em-askew 3.2s ease both; }
.em[data-scene="closet"] .dr.d2 { animation-name: em-askew2; }
@keyframes em-askew { 0%, 55% { transform: translate(-5px, 3px) rotate(-1.2deg); } 62%, 100% { transform: none; } }
@keyframes em-askew2 { 0%, 55% { transform: translate(6px, 4px) rotate(1deg); } 62%, 100% { transform: none; } }

/* the years after: one mark for each, the last one hers */
.em .yr { opacity: 0; transform-box: fill-box; transform-origin: center; transform: scale(.3); transition: opacity .5s, transform .5s; }
.em[data-scene="years"] .yr { opacity: 1; transform: none; }
${[0, 1, 2, 3, 4, 5].map(i => `.em[data-scene="years"] .yr.y${i} { transition-delay: ${.3 + i * .45}s; }`).join("\n")}
.em .yr.y5 { fill: var(--pen); }

/* pressure: two jaws close and hold, never quite shut */
.em .jaw { transition: transform 1.6s cubic-bezier(.7,0,.2,1); }
.em .jaw.l { transform: translateX(-190px); } .em .jaw.r { transform: translateX(190px); }
.em[data-scene="squeeze"] .jaw.l { transform: translateX(0); animation: em-pressL 2.8s ease-in-out 1.6s infinite; }
.em[data-scene="squeeze"] .jaw.r { transform: translateX(0); animation: em-pressR 2.8s ease-in-out 1.6s infinite; }
@keyframes em-pressL { 50% { transform: translateX(6px); } }
@keyframes em-pressR { 50% { transform: translateX(-6px); } }

/* words: three or four tries at the same sentence, until it lands */
.em .try { transition: transform 1.2s cubic-bezier(.6,.05,.25,1), opacity 1s, stroke .8s; }
.em .try.t1 { transform: translate(150px, 190px) rotate(-9deg) scaleX(.9); }
.em .try.t2 { transform: translate(262px, 236px) rotate(7deg) scaleX(.62); }
.em .try.t3 { transform: translate(176px, 300px) rotate(4deg) scaleX(1.12); }
.em .try.t4 { transform: translate(236px, 350px) rotate(-5deg) scaleX(.8); }
.em[data-words="land"] .try { transform: translate(200px, 270px); }
.em[data-words="land"] .try:not(.t4) { opacity: .0; }
.em[data-words="land"] .try.t2 { transition-delay: .35s; } .em[data-words="land"] .try.t3 { transition-delay: .7s; }
.em[data-words="land"] .try.t4 { transition-delay: 1.05s; }

/* the blue pen, and what grows on it */
.em .ink { fill: none; stroke: var(--pen); stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; transition: stroke-dashoffset 3.6s cubic-bezier(.4,0,.3,1), opacity 1.2s; }
.em .bloom { opacity: 0; transform: scale(.2); transform-box: fill-box; transform-origin: center; transition: opacity .8s, transform 1.1s cubic-bezier(.3,1.3,.5,1); }
.em .bloom circle.pt { fill: #fff; stroke: #d9b9be; stroke-width: .7; vector-effect: non-scaling-stroke; }
.em .bloom circle.c { fill: #d7b46a; }
.em[data-pen="bloom"] .bloom, .em[data-pen="night"] .bloom { opacity: 1; transform: none; }
.em[data-pen="night"] .bloom { opacity: .55; }
.em[data-pen="night"] .ink { opacity: .45; }
.em-night { position: fixed; inset: 0; pointer-events: none; z-index: 30; opacity: 0; transition: opacity 1.8s ease; background: radial-gradient(ellipse 75% 70% at 50% 50%, rgba(40,42,56,.05) 30%, rgba(40,42,56,.16) 100%); }
.em[data-pen="night"][data-scene="pen"] .em-night { opacity: 1; }

/* rain, and the umbrella turned inside out */
.em .rain { opacity: 0; transition: opacity 1.2s; }
.em[data-rain="on"] .rain { opacity: 1; }
.em .rain g { animation: em-rain 1.1s linear infinite; }
.em .rain g + g { animation-duration: 1.6s; opacity: .6; }
@keyframes em-rain { from { transform: translate(0, 0); } to { transform: translate(-60px, 104px); } }
.em .brolly { transform-box: fill-box; transform-origin: 50% 30%; transition: transform .5s cubic-bezier(.3,1.5,.5,1) .9s; }
.em[data-scene="rain"] .brolly { transform: scaleY(-1) rotate(8deg); }

/* home: a television on a channel nobody watches */
.em .tvglow { animation: em-tv 2.2s steps(1) infinite; }
@keyframes em-tv { 0% { opacity: .1 } 20% { opacity: .24 } 35% { opacity: .14 } 60% { opacity: .3 } 80% { opacity: .18 } }

/* the street */
.em .lit .pane { fill: var(--paper); transition: fill 1s; }
.em[data-lit="on"] .lit .pane { fill: var(--glow); }
.em .curtain { transition: transform 1.4s ease; }
.em[data-curtain="moved"] .curtain { transform: translateX(-14px); }
.em .her { opacity: 0; transition: opacity 1s; }
.em[data-lit="on"] .her { opacity: 1; }
.em .held { transition: transform 1s ease, opacity .8s; }
.em .held .thing { fill: #5c5b55; transition: fill 1.2s, opacity .8s; }
.em .held .heart { fill: var(--heart); opacity: 0; transition: opacity 1.6s ease .6s; }
.em .held .halo { fill: var(--heart); opacity: 0; transition: opacity 2s ease .8s; }
.em[data-hands="none"] .held { opacity: 0; }
.em[data-hands="up"] .held { transform: translateY(-6px); }
.em[data-hands="box"] .held .thing { animation: em-putback 2.4s ease both; }
@keyframes em-putback { 0% { transform: translateY(-6px); } 70%, 100% { transform: translateY(12px); opacity: 0; } }
.em .sill-box { opacity: 0; transition: opacity .6s; }
.em[data-hands="box"] .sill-box { opacity: 1; }
.em[data-hands="heart"] .held .thing { opacity: 0; }
.em[data-hands="heart"] .held .heart { opacity: 1; animation: em-beat 2.4s ease-in-out 2s infinite; transform-box: fill-box; transform-origin: center; }
.em[data-hands="heart"] .held .halo { opacity: .14; }
@keyframes em-beat { 0%, 60%, 100% { transform: scale(1); } 15% { transform: scale(1.12); } 30% { transform: scale(1.04); } }
.em .glare { opacity: .15; transition: opacity 1.2s; }
.em[data-glare="on"] .glare { opacity: .9; }
.em .ember { opacity: 0; transition: opacity .8s; }
.em[data-ember="on"] .ember { opacity: 1; }
.em[data-ember="on"] .ember .smoke { animation: em-smoke 4s ease-out infinite; }
@keyframes em-smoke { 0% { opacity: 0; transform: translateY(0); } 30% { opacity: .7; } 100% { opacity: 0; transform: translateY(-18px); } }
.em .cars { opacity: 0; transition: opacity .6s; }
.em[data-cars="on"] .cars { opacity: 1; }
.em .cars .streak { animation: em-car 2.4s linear infinite; }
.em .cars .streak:nth-child(2) { animation-duration: 3.1s; animation-delay: -1.2s; }
.em .cars .streak:nth-child(3) { animation-duration: 2.7s; animation-delay: -.5s; }
@keyframes em-car { from { transform: translateX(260px); } to { transform: translateX(-300px); } }
.em .honk path { opacity: 0; }
.em[data-cars="on"] .honk path { animation: em-honk 1.3s ease-out infinite; }
.em[data-cars="on"] .honk path + path { animation-delay: .18s; }
@keyframes em-honk { 0% { opacity: 0; } 20% { opacity: .9; } 100% { opacity: 0; } }
.em.fx-run .sc-street { animation: em-run 1.8s ease-in-out both; }
@keyframes em-run { 0% { transform: none; filter: none; } 30% { transform: translateX(18px); filter: blur(2px); } 100% { transform: translateX(-30px); filter: blur(4px); opacity: .2; } }
.em.fx-run[data-scene="street"] .sc-street { animation-delay: .6s; }

@media (max-width: 860px) {
  .em-scrolly { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .em-stage { order: -1; height: 50svh; align-items: flex-end; padding-bottom: 10px;
    background: var(--paper); box-shadow: 0 14px 18px -14px rgba(255,255,255,1); }
  .em-stage svg { max-height: 44svh; width: auto; }
  .em-steps { padding-block: 4vh 30vh; }
  .em-step { padding-block: 16vh; }
  .em-step .short { font-size: 26px; }
}
@media (prefers-reduced-motion: reduce) {
  .em .rain g, .em .cars .streak, .em .tvglow, .em .jaw { animation: none !important; }
}`;

  /* a cursive line for Lian's pen: loops that drift right to left, like Hebrew handwriting */
  function penPath() {
    const pts = [];
    for (let i = 0; i <= 420; i++) {
      const t = i / 420, a = t * Math.PI * 2 * 8.5;
      const x = 340 - 280 * t + 19 * Math.cos(a) + 3 * Math.sin(a * .37);
      const y = 262 + 24 * Math.sin(a) * (0.55 + 0.45 * Math.sin(t * 9.1 + 1)) + 9 * Math.sin(t * 5);
      pts.push([x, y]);
    }
    return { d: "M" + pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L"), pts };
  }
  const PEN = penPath();
  const BLOOMS = [.08, .2, .33, .47, .58, .71, .86].map((t, i) => {
    const [x, y] = PEN.pts[Math.round(t * 420)];
    const r = 4.6 + (i % 3) * 1.2, rot = i * 37;
    const petals = [0, 1, 2, 3, 4].map(k => {
      const a = (rot + k * 72) * Math.PI / 180;
      return `<circle class="pt" cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y - 12 + Math.sin(a) * r).toFixed(1)}" r="${(r * .72).toFixed(1)}"/>`;
    }).join("");
    return `<g class="bloom" style="transition-delay:${(i * .28).toFixed(2)}s">${petals}<circle class="c" cx="${x.toFixed(1)}" cy="${(y - 12).toFixed(1)}" r="1.8"/></g>`;
  }).join("");

  // one band of drops, repeated along the fall vector so the loop has no seam
  const RAIN = n => {
    let s = "", seed = n * 97 + 13;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const band = [];
    for (let i = 0; i < 9; i++) band.push([-40 + rnd() * 800, rnd() * 104, 9 + rnd() * 12]);
    for (let k = -1; k <= 5; k++) for (const [bx, by, l] of band) {
      const x = bx - 60 * k, y = by + 104 * k;
      s += `<line class="ln-soft" x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - l * .5).toFixed(0)}" y2="${(y + l * .87).toFixed(0)}"/>`;
    }
    return s;
  };

  const WINDOWS = [[100, 64], [200, 64], [300, 64], [100, 176], [300, 176], [100, 330], [200, 330], [300, 330]]
    .map(([x, y]) => `<rect class="ln-soft" x="${x - 34}" y="${y}" width="68" height="${y === 176 ? 104 : 80}"/>`).join("");

  const SVG = `
<svg viewBox="0 0 400 520" role="img" aria-label="רישום קווי: חלון מואר בגשם, קופסה שחורה, מגירה">
  <defs>
    <clipPath id="em-win"><rect x="166" y="176" width="68" height="104"/></clipPath>
    <clipPath id="em-stage"><rect x="0" y="0" width="400" height="520"/></clipPath>
    <radialGradient id="em-glare"><stop offset="0" stop-color="#fffbea" stop-opacity="1"/><stop offset=".35" stop-color="#fbf3d8" stop-opacity=".7"/><stop offset="1" stop-color="#fbf3d8" stop-opacity="0"/></radialGradient>
    <radialGradient id="em-void"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <filter id="em-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>

  <!-- street, seen from under the awning across the road -->
  <g class="sc sc-street">
    <line class="ln" x1="52" y1="24" x2="52" y2="462"/><line class="ln" x1="348" y1="24" x2="348" y2="462"/>
    <line class="ln-soft" x1="52" y1="154" x2="348" y2="154"/><line class="ln-soft" x1="52" y1="306" x2="348" y2="306"/>
    ${WINDOWS}
    <g class="lit">
      <rect class="pane" x="166" y="176" width="68" height="104"/>
      <g clip-path="url(#em-win)">
        <g class="her">
          <circle cx="200" cy="222" r="12" fill="#3a3936"/>
          <path d="M174,280 L176,252 C177,242 186,238 194,238 L206,238 C214,238 223,242 224,252 L226,280 Z" fill="#3a3936"/>
        </g>
        <path class="curtain" d="M166,176 L186,176 C180,206 190,236 182,280 L166,280 Z" fill="#fff" stroke="#d9d7cf" stroke-width=".8" vector-effect="non-scaling-stroke"/>
      </g>
      <g class="held">
        <circle class="halo" cx="200" cy="256" r="22" filter="url(#em-soft)"/>
        <circle class="thing" cx="200" cy="258" r="4.6"/>
        <path class="heart" d="M200,265 C190,257.5 188.5,249.5 194.5,247 C197.7,246 199.4,247.9 200,250 C200.6,247.9 202.3,246 205.5,247 C211.5,249.5 210,257.5 200,265 Z"/>
        <ellipse cx="193.5" cy="261" rx="4.2" ry="3" fill="#4a4945"/><ellipse cx="206.5" cy="261" rx="4.2" ry="3" fill="#4a4945"/>
      </g>
      <rect class="sill-box blk" x="191" y="266" width="18" height="12"/>
      <rect class="ln" x="166" y="176" width="68" height="104"/>
      <line class="ln" x1="160" y1="281" x2="240" y2="281"/>
    </g>
    <line class="ln" x1="0" y1="462" x2="400" y2="462"/>
    <!-- street lamp -->
    <line class="ln" x1="370" y1="462" x2="370" y2="312"/><path class="ln" d="M370,312 C370,302 362,298 350,298"/>
    <path class="ln" d="M344,298 L356,298 L353,304 L347,304 Z"/>
    <circle class="glare" cx="350" cy="306" r="120" fill="url(#em-glare)"/>
    <!-- traffic behind him -->
    <g class="cars" clip-path="url(#em-stage)">
      <line class="streak" x1="120" y1="490" x2="200" y2="490" stroke="#c9c6bb" stroke-width="2" stroke-linecap="round"/>
      <line class="streak" x1="150" y1="502" x2="260" y2="502" stroke="#d9a25a" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
      <line class="streak" x1="60" y1="512" x2="120" y2="512" stroke="#c9c6bb" stroke-width="1.6" stroke-linecap="round"/>
    </g>
    <g class="honk" transform="translate(30 488)"><path class="ln" d="M6,-10 C12,-4 12,4 6,10"/><path class="ln" d="M13,-16 C22,-6 22,6 13,16"/></g>
    <!-- his cigarette -->
    <g class="ember"><circle cx="330" cy="500" r="2.4" fill="var(--ember)"/><circle cx="330" cy="500" r="7" fill="var(--ember)" opacity=".25" filter="url(#em-soft)"/>
      <path class="smoke ln-soft" d="M330,494 C326,486 334,480 330,472"/></g>
  </g>

  <!-- pressure -->
  <g class="sc sc-squeeze">
    <circle class="ln-soft" cx="200" cy="270" r="96"/>
    <path class="jaw l blk" d="M-10,150 L156,150 C168,150 172,160 172,172 L172,368 C172,380 168,390 156,390 L-10,390 Z"/>
    <path class="jaw r blk" d="M410,150 L244,150 C232,150 228,160 228,172 L228,368 C228,380 232,390 244,390 L410,390 Z"/>
  </g>

  <!-- words -->
  <g class="sc sc-words">
    ${[1, 2, 3, 4].map(i => `<line class="try t${i} ln" x1="-80" y1="0" x2="80" y2="0"/>`).join("")}
  </g>

  <!-- the chest of drawers -->
  <g class="sc sc-chest">
    <line class="ln" x1="112" y1="250" x2="288" y2="250"/>
    <rect class="ln" x="124" y="250" width="152" height="202"/>
    <g class="dr d1"><rect class="ln paper" x="132" y="258" width="136" height="42"/><circle class="ln" cx="200" cy="279" r="2.5"/></g>
    <g class="dr d2"><rect class="ln paper" x="132" y="306" width="136" height="42"/><circle class="ln" cx="200" cy="327" r="2.5"/></g>
    <g class="dr d3"><rect class="ln paper" x="132" y="354" width="136" height="42"/><circle class="ln" cx="200" cy="375" r="2.5"/></g>
    <polygon class="inside" points="136,412 264,412 270,398 130,398" fill="#efeee9"/>
    <g class="dr d2 drawer4"><rect class="ln paper" x="132" y="402" width="136" height="42"/><circle class="ln" cx="200" cy="423" r="2.5"/></g>
    <line class="ln" x1="132" y1="452" x2="132" y2="462"/><line class="ln" x1="268" y1="452" x2="268" y2="462"/>
  </g>
  <g class="sc sc-years">
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="yr y${i}" cx="${312 - i * 44}" cy="176" r="${i === 5 ? 5 : 3.2}" fill="#1c1c1a"/>`).join("")}
    <line class="ln-soft" x1="88" y1="176" x2="332" y2="176" style="opacity:.6"/>
  </g>

  <!-- crate of her clothes -->
  <g class="sc sc-crate">
    <path class="ln" d="M122,402 L278,402 L278,482 L122,482 Z"/>
    <path class="ln" d="M122,402 L96,382 M278,402 L304,382"/>
    <path class="ln-soft" d="M140,404 C160,392 176,398 190,392 M214,394 C232,388 250,398 262,392"/>
  </g>
  <!-- a doorstep, the morning after -->
  <g class="sc sc-door">
    <rect class="ln" x="150" y="186" width="100" height="264"/>
    <rect class="ln-soft" x="160" y="196" width="80" height="254"/>
    <circle class="ln" cx="228" cy="326" r="3"/>
    <line class="ln" x1="80" y1="450" x2="340" y2="450"/>
  </g>

  <!-- the box itself (front face only; the open top holds the everyday things) -->
  <g class="box">
    <ellipse class="void" cx="0" cy="4" rx="70" ry="10" fill="url(#em-void)"/>
    <g class="things">
      <path class="ln" d="M-20,-50 L-24,-68 M-14,-50 L-8,-64"/>
      <circle class="ln" cx="10" cy="-62" r="4.5"/><path class="ln" d="M13,-58 L20,-50 M17,-54 L20,-56"/>
      <path class="ln-soft" d="M-4,-50 L-2,-70 L14,-70"/>
    </g>
    <rect class="rim" x="-34" y="-50" width="68" height="50"/>
  </g>

  <!-- the bottom drawer's front again, over the box, so the box goes in behind it -->
  <g class="sc sc-front"><g class="drawer4"><rect class="ln paper" x="132" y="402" width="136" height="42"/><circle class="ln" cx="200" cy="423" r="2.5"/></g></g>

  <!-- Lian's pen -->
  <g class="sc sc-pen">
    <path class="ink" d="${PEN.d}"/>
    ${BLOOMS}
  </g>

  <!-- the umbrella that flipped -->
  <g class="sc sc-umbrella">
    <g class="brolly">
      <path class="ln" d="M140,250 C150,206 250,206 260,250 C250,244 236,244 226,250 C216,244 184,244 174,250 C164,244 150,244 140,250 Z"/>
      <path class="ln" d="M200,214 L200,330 C200,342 186,342 186,332"/>
    </g>
  </g>
  <!-- home -->
  <g class="sc sc-home">
    <rect class="ln" x="118" y="196" width="164" height="110" rx="3"/>
    <rect class="tvglow" x="126" y="204" width="148" height="94" fill="#8a9199"/>
    <path class="ln" d="M184,306 L178,324 M216,306 L222,324 M160,324 L240,324"/>
    <line class="ln" x1="70" y1="400" x2="330" y2="400"/>
    <ellipse class="ln" cx="236" cy="392" rx="32" ry="6"/>
    <path class="ln-soft" d="M218,390 C222,384 228,392 232,386 C236,380 242,392 248,386 C252,382 254,388 256,387"/>
  </g>

  <g class="rain" clip-path="url(#em-stage)"><g>${RAIN(1)}</g><g>${RAIN(2)}</g></g>
</svg>`;

  const STEPS = `
<div class="em-step" data-scene="street" data-rain="on" data-lit="on" data-hands="box" data-cars="off" data-ember="off" data-glare="off" data-curtain="moved" data-words="" data-pen="">
  <p>"שימי אותו חזרה בקופסה עכשיו!" צעקתי עליה מלמטה. ליאן חפנה אותו בשתי הידיים ושמה אותו בקופסה השחורה.</p>
</div>
<div class="em-step" data-cars="on">
  <p>מאחוריי שיירת המכוניות לא הפסיקה לצפצף.</p>
</div>
<div class="em-step" data-fx="run">
  <p class="short">רצתי בבהלה.</p>
</div>
<div class="em-step" data-scene="squeeze" data-rain="off" data-cars="off">
  <p>הראש שלי התפוצץ. הרגשתי כאילו מישהו לוחץ לי את המוח בצבת ענקי. לחיצה חזקה כזו שלא נותנת לי להשתחרר אבל לא מספיק חזקה כדי למעוך אותי למוות.</p>
</div>
<div class="em-step">
  <p>פעם אחרונה שחוויתי לחץ כזה בראש היה כשלקחתי ריטלין לפני מבחני הלשכה.</p>
</div>
<div class="em-step" data-scene="words" data-words="scatter">
  <p>ליאן, שעבדה איתי כמתמחה במשרד, תמיד צחקה על חוסר היכולת שלי להתנסח. "איך תהיה עורך דין אם אתה לא יכול לחבר שלושה משפטים לטענה לוגית?" היתה עוקצת.</p>
</div>
<div class="em-step" data-words="land">
  <p>לקח זמן להסביר לה שהמחשבות שלי רצות יותר מהר ממה שהפה שלי מסוגל לבטא. אז לוקח לו לפעמים שלושה או ארבעה משפטים עד שהוא מדייק את עצמו.</p>
</div>
<div class="em-step" data-scene="box">
  <p>את הקופסה השחורה קיבלתי במתנה מיעלי, החברה הראשונה שלי. קופסא כזו שעומדת תמיד על השידה, פתוחה ומלאה בחשבונות, מפתחות ושאריות של עפרונות.</p>
</div>
<div class="em-step" data-scene="deep">
  <p class="short">קופסא רגילה, אבל מאוד מאוד שחורה.</p>
</div>
<div class="em-step" data-scene="crate">
  <p>כשיעלי עזבה, דחפתי את הקופסא לארגז הבגדים שלה. הרגשתי שהיא שייכת לה אחרי כל הזמן שבילינו ביחד.</p>
</div>
<div class="em-step" data-scene="door">
  <p>בוקר אחרי, מצאתי את הקופסא מחוץ לדלת.</p>
</div>
<div class="em-step" data-scene="drawer">
  <p>הרמתי ודחפתי אותה עמוק עמוק במגירה האחרונה. ידעתי שיהיה לי קשה לחזור להתפקס אם אחשוב על מה שנמצא בתוכה. לאורך השנים הדחקתי את הקופסא ואת מה שהשארתי סגור בתוכה.</p>
</div>
<div class="em-step" data-scene="years">
  <p>המשכתי בחיי. חברות, בנות זוג, סטוצים, תקופת רווקות ארוכה, לימודים ואז ליאן.</p>
</div>
<div class="em-step" data-scene="pen" data-pen="write">
  <p>ליאן תמיד ישבה שם בלימודים, בשורה העליונה, כותבת וכותבת את כל החומר בעט פיילוט כחולה. אף פעם לא התייחסתי אליה יותר מידי, אבל תמיד יכולתי להריח את ריח הפריחה משאריות השמפו שלה בשיעורי הבוקר.</p>
</div>
<div class="em-step" data-pen="bloom">
  <p>בשנה האחרונה כבר עברנו לגור ביחד, חיים אחד בתוך השניה, נושם אותה ופורח כל בוקר.</p>
</div>
<div class="em-step" data-pen="night">
  <p>"אני אוהבת אותך", היתה לוחשת לי באוזן כל לילה לפני השינה, ואני הייתי מקשיב, מסתובב, עושה את עצמי ישן ונרדם.</p>
</div>
<div class="em-step" data-scene="closet">
  <p>"הארון שלך מבולגן כמו המילים שאתה מוציא, תן לי לסדר אותו". ליאן היתה מציעה לי כל שבוע ואני הייתי אוסר עליה לגעת לי בבגדים ובמילים.</p>
</div>
<div class="em-step" data-scene="rain" data-rain="on">
  <p>זה היה יום חורפי, הגשם ירד באלכסון, והמטרייה שלי התהפכה ברגע שיצאתי מהמשרד.</p>
</div>
<div class="em-step" data-scene="home" data-rain="off">
  <p>נכנסתי הביתה, הטלוויזיה פעלה על איזה ערוץ לא רלוונטי ושאריות של פסטה קרה עמדו על השולחן.</p>
</div>
<div class="em-step">
  <p>"ליאן!" קראתי לה, "חזרתי, באה לסיגריה למטה?" הריטואל הקבוע שלנו אחרי ימים ארוכים בבית המשפט. "תרד", היא ענתה לי מחדר השינה. "תכף אצטרף". לקחתי את המרלבורו לייט וירדתי לרחוב.</p>
</div>
<div class="em-step" data-scene="street" data-rain="on" data-lit="on" data-hands="none" data-curtain="" data-ember="on">
  <p>הדלקתי את הסיגריה מתחת לגגון שבצד השני של הרחוב, הסתכלתי למעלה על הצללית של ליאן בחלון של החדר שינה שלנו.</p>
</div>
<div class="em-step" data-curtain="moved">
  <p class="short">הווילון זז.</p>
</div>
<div class="em-step" data-hands="up" data-glare="on">
  <p>"תגיד", ליאן מסתכלת עלי למטה מהחלון "מה זה?" האור ממנורת הרחוב סינוור אותי, אבל יכולתי לראות שהיא מחזיקה משהו ביד.</p>
</div>
<div class="em-step" data-ember="off" data-glare="off">
  <p>ירדתי לכביש כדי לראות יותר טוב, הגשם כיבה לי את הסיגריה.</p>
</div>
<div class="em-step" data-hands="box">
  <p>"שימי אותו חזרה בקופסא עכשיו!" צעקתי עליה מלמטה. ליאן חפנה אותו בשתי הידיים ושמה אותו בקופסא השחורה.</p>
</div>
<div class="em-step" data-cars="on" data-fx="run">
  <p>מאחורי שיירת המכוניות לא הפסיקה לצפצף. רצתי מהמקום בבהלה.</p>
</div>
<div class="em-step" data-scene="heart" data-hands="heart" data-cars="off" data-rain="off">
  <p class="short">התמונה של ליאן בחלון, מחזיקה את הלב שלי בשתי הידיים, לא יוצאת לי מהראש.</p>
</div>`;

  const KEYS = ["scene", "rain", "lit", "hands", "cars", "ember", "glare", "curtain", "words", "pen"];
  let cleanup = [];

  function mount(root, ctx) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    root.innerHTML = `
<div class="em" id="em">
  <header class="story-head">
    <span class="eyebrow">ענדתי אושר · עמוד 17</span>
    <h1>עמוק במגירה</h1>
    <div class="meta">סיפור · חמש דקות קריאה · לגלול לאט</div>
  </header>
  <section class="em-scrolly">
    <div class="em-steps">${STEPS}</div>
    <div class="em-stage" aria-hidden="true">${SVG}</div>
  </section>
  <footer class="story-end"><div class="mark"></div>${ctx.endNav}</footer>
  <div class="em-night"></div>
</div>`;

    const em = root.querySelector("#em");
    const steps = [...em.querySelectorAll(".em-step")];
    const ink = em.querySelector(".ink");
    const len = Math.ceil(ink.getTotalLength());
    ink.style.strokeDasharray = len;
    ink.style.strokeDashoffset = len;

    let active = -1;
    function stateAt(i) {
      const s = {};
      for (let j = 0; j <= i; j++) for (const k of KEYS) if (steps[j].dataset[k] !== undefined) s[k] = steps[j].dataset[k];
      return s;
    }
    function apply(i) {
      const s = stateAt(i);
      for (const k of KEYS) em.dataset[k] = s[k] ?? "";
      em.className = "em " + (steps[i].dataset.fx || "").split(" ").filter(Boolean).map(f => "fx-" + f).join(" ");
      ink.style.strokeDashoffset = s.pen ? 0 : len;
      steps.forEach((el, j) => { el.classList.toggle("on", j === i); el.classList.toggle("seen", j < i); });
    }
    function pick() {
      const stage = em.querySelector(".em-stage");
      const narrow = innerWidth <= 860;
      const line = narrow ? stage.offsetHeight + (innerHeight - stage.offsetHeight) * .45 : innerHeight * .55;
      let i = 0;
      for (let j = 0; j < steps.length; j++) if (steps[j].getBoundingClientRect().top < line) i = j;
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
    id: "amok-bamegira",
    title: "עמוק במגירה",
    page: 17,
    kind: "סיפור",
    blurb: "קופסה רגילה, אבל מאוד מאוד שחורה. מה שנשאר סגור בה שנים, ומי שפתחה אותה בלי לשאול.",
    glyph: `<svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true"><rect x="9" y="16" width="26" height="20" fill="#141413"/><line x1="4" y1="40" x2="40" y2="40" stroke="currentColor" stroke-width="1"/></svg>`,
    accent: "#b8443c",
    mount,
    unmount() { cleanup.forEach(f => f()); cleanup = []; }
  });
})();
