/* אהבה רגעית — an elevator seen from the back wall, facing the doors.
   Each paragraph is a step; a step's data-* attributes change the scene, and
   every key carries forward until a later step changes it. `fx` lasts one step. */
(() => {
  const CSS = `
.ar { --her: #c9959a; --her-line: #a8737a; --ember: #d9a25a; }
.ar-scrolly { display: grid; grid-template-columns: minmax(0, 34rem) minmax(0, 1fr); gap: 6vw;
  max-width: 1240px; margin: 0 auto; padding-left: var(--gut-l); padding-right: var(--gut-r); }
.ar-steps { padding-block: 10vh 30vh; }
.ar-step { padding-block: 26vh; margin: 0; opacity: .28; transition: opacity .6s ease; }
.ar-step:first-child { padding-top: 6vh; }
.ar-step.on, .ar-step.seen { opacity: 1; }
.ar-step.seen:not(.on) { opacity: .5; }
.ar-step p { margin: 0 0 1em; }
.ar-step p:last-child { margin-bottom: 0; }
.ar-step .short { font-family: var(--f-display); font-weight: 300; font-size: 30px; line-height: 1.4; }
.ar-step .q { padding-inline-start: 0; }
.ar-trail { transition: opacity 2.4s ease 1s, filter 2.4s ease 1s; }
.ar-step.on .ar-trail, .ar-step.seen .ar-trail { opacity: .16; filter: blur(1.4px); }

.ar-stage { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px; z-index: 5; }
.ar-stage svg.scene { width: 100%; max-width: 460px; height: auto; max-height: 72svh; overflow: visible; }

/* HUD: the floor indicator, the one loud element */
.ar-hud { display: flex; align-items: center; gap: 18px; font-family: var(--f-mono); color: var(--ink); direction: ltr; }
.ar-floor { font-weight: 300; font-size: 64px; line-height: 1; min-width: 2.2ch; text-align: center; font-variant-numeric: tabular-nums; transition: color .6s; }
.ar-dir { width: 14px; height: 28px; display: grid; }
.ar-dir path { fill: none; stroke: var(--ink-faint); stroke-width: 1; transition: stroke .3s; }
.ar-hud[data-dir="up"] .ar-dir .u, .ar-hud[data-dir="down"] .ar-dir .d { stroke: var(--ink); }
.ar-meta { display: grid; gap: 4px; font-size: 12px; color: var(--ink-soft); min-width: 7ch; }
.ar-meta span { min-height: 1.3em; transition: opacity .6s; }
.ar-sig { display: inline-flex; align-items: flex-end; gap: 2px; height: 11px; }
.ar-sig i { width: 2px; background: var(--ink-faint); }
.ar-sig i:nth-child(1) { height: 3px } .ar-sig i:nth-child(2) { height: 6px } .ar-sig i:nth-child(3) { height: 9px } .ar-sig i:nth-child(4) { height: 11px }
.ar-sig-wrap { display: inline-flex; align-items: center; gap: 6px; opacity: 0; }
.ar[data-signal="none"] .ar-sig-wrap { opacity: 1; }
.ar[data-scene="hospital"] .ar-floor { color: var(--ink-faint); }

/* scene lines */
.ar .ln { fill: none; stroke: var(--ink); stroke-width: 1; vector-effect: non-scaling-stroke; }
.ar .ln-soft { fill: none; stroke: var(--ink-faint); stroke-width: .8; vector-effect: non-scaling-stroke; }
.ar .fill-paper { fill: var(--paper); }
.ar .cabin { transition: opacity 1.8s ease; }
.ar .hall { fill: var(--mist); }
.ar .doorL, .ar .doorR { transition: transform 1.1s cubic-bezier(.6,0,.25,1); }
.ar[data-doors="open"] .doorL { transform: translateX(-68px); }
.ar[data-doors="open"] .doorR { transform: translateX(68px); }
.ar[data-doors="stuck"] .doorL { animation: ar-jitL .5s ease-in-out 4; }
.ar[data-doors="stuck"] .doorR { animation: ar-jitR .5s ease-in-out 4; }
@keyframes ar-jitL { 50% { transform: translateX(-1.6px); } }
@keyframes ar-jitR { 50% { transform: translateX(1.6px); } }
.ar .led { font-family: var(--f-mono); font-size: 9px; fill: var(--ink); text-anchor: middle; }
.ar .btn { fill: var(--paper); stroke: var(--ink-faint); stroke-width: .7; transition: fill .5s, stroke .5s; }
.ar[data-lit~="m3"] .btn.m3 { fill: var(--her); stroke: var(--her-line); }
.ar[data-lit~="m4"] .btn.m4 { fill: var(--ink); stroke: var(--ink); }
.ar .panel { transition: stroke .5s; }
.ar.fx-buttons .panel { stroke: var(--ink); }

/* light */
.ar .lamp { fill: var(--paper); stroke: var(--ink-faint); stroke-width: .8; transition: fill .4s; }
.ar[data-light="on"] .lamp { fill: #fbfaf2; }
.ar .elamp { fill: var(--ember); opacity: 0; }
.ar[data-light="emergency"] .elamp, .ar[data-light="dim"] .elamp { animation: ar-blink 2.6s steps(1) infinite; }
@keyframes ar-blink { 0%{opacity:1} 8%{opacity:.15} 11%{opacity:1} 60%{opacity:.85} 63%{opacity:.2} 66%{opacity:1} }
.ar .wash { fill: var(--ember); opacity: 0; transition: opacity 1.2s; }
.ar[data-light="emergency"] .wash { opacity: .07; animation: ar-wash 2.6s steps(1) infinite; }
.ar[data-light="dim"] .wash { opacity: .1; animation: ar-wash 2.6s steps(1) infinite; }
@keyframes ar-wash { 0%{opacity:.09} 8%{opacity:.02} 11%{opacity:.09} 60%{opacity:.07} 63%{opacity:.02} 66%{opacity:.09} }
.ar .dark { fill: var(--ink); opacity: 0; transition: opacity 2s; }
.ar[data-light="dim"] .dark { opacity: .14; }

/* mirror: it only ever holds one reflection */
.ar .mirror { fill: #f7f7f5; stroke: var(--ink-faint); stroke-width: .8; transition: stroke .8s, fill .8s; }
.ar.fx-mirror .mirror { stroke: var(--ink); fill: #f1f1ee; }
.ar .refl { opacity: .32; transition: opacity .8s; }
.ar.fx-mirror .refl { opacity: .55; }

/* figures: feet at (0,0), placed by CSS transform */
.ar .fig { transition: transform 1.6s cubic-bezier(.5,0,.2,1), opacity 1.2s ease; }
.ar .him-b { fill: var(--paper); stroke: var(--ink); stroke-width: 1.1; vector-effect: non-scaling-stroke; }
.ar .her-b { fill: #f6ebec; stroke: var(--her-line); stroke-width: 1; vector-effect: non-scaling-stroke; }
.ar .shadow { fill: var(--ink); opacity: .07; }
.ar .pose { transition: opacity .9s ease; }
.ar .him { transform: translate(150px, 474px); }
.ar[data-pose="sit"] .him { transform: translate(128px, 478px); }
.ar .him .p-sit, .ar[data-pose="sit"] .him .p-stand { opacity: 0; }
.ar[data-pose="sit"] .him .p-sit { opacity: 1; }
.ar .refl .p-sit, .ar[data-pose="sit"] .refl .p-stand { opacity: 0; }
.ar[data-pose="sit"] .refl .p-sit { opacity: 1; }

.ar .her { opacity: 0; transform: translate(200px, 402px) scale(.58); }
.ar[data-her="enter"] .her { opacity: .95; transform: translate(206px, 404px) scale(.6); }
.ar[data-her="in"] .her, .ar[data-her="turn"] .her { opacity: .95; transform: translate(252px, 458px) scale(.9); }
.ar[data-her="sit"] .her { opacity: .95; transform: translate(272px, 466px) scale(.9); }
.ar[data-her="lie"] .her { opacity: .95; transform: translate(268px, 482px) scale(.9); }
.ar[data-her="gone"] .her { opacity: 0; transform: translate(268px, 482px) scale(.9); transition: opacity .9s ease .2s; }
.ar .her .pose { opacity: 0; }
.ar[data-her="enter"] .her .p-stand, .ar[data-her="in"] .her .p-stand, .ar[data-her="turn"] .her .p-turn,
.ar[data-her="sit"] .her .p-sit, .ar[data-her="lie"] .her .p-lie, .ar[data-her="gone"] .her .p-lie { opacity: 1; }

.ar .phone { opacity: 0; transition: opacity .5s; fill: #fbfaf2; stroke: var(--ink); stroke-width: .8; }
.ar.fx-phone .phone { opacity: 1; }

/* vapor */
.ar .vapor circle { fill: var(--ink-faint); opacity: 0; }
.ar[data-smoke="on"] .vapor circle { animation: ar-vapor 5.5s ease-out infinite; }
@keyframes ar-vapor { 0% { opacity: 0; transform: translate(0,0) scale(.6); } 20% { opacity: .35; } 100% { opacity: 0; transform: translate(var(--dx), -150px) scale(3.2); } }

/* shake */
.ar.fx-shake .cabin-in { animation: ar-shake .9s ease-in-out 2; }
@keyframes ar-shake { 20% { transform: translate(1.5px, -1px); } 40% { transform: translate(-1.5px, 1px); } 60% { transform: translate(1px, 1px); } 80% { transform: translate(-1px, -.5px); } }

/* hospital */
.ar .ward { opacity: 0; transition: opacity 1.8s ease .4s; }
.ar[data-scene="hospital"] .ward { opacity: 1; }
.ar[data-scene="hospital"] .cabin { opacity: .08; }
.ar[data-scene="hospital"] .him { opacity: 0; }
.ar .petal { fill: var(--her); }

/* the air: a vignette that closes in on the whole page */
.ar-air { position: fixed; inset: 0; pointer-events: none; z-index: 30; opacity: 0; transition: opacity 2.2s ease;
  background: radial-gradient(ellipse 70% 65% at 50% 50%, rgba(255,255,255,0) 40%, rgba(84,72,58,.32) 100%); }
.ar-flash { position: fixed; inset: 0; pointer-events: none; z-index: 31; background: #fff; opacity: 0; }
.ar-flash.go { animation: ar-flash 1.8s ease-out; }
@keyframes ar-flash { 0% { opacity: 0 } 12% { opacity: 1 } 100% { opacity: 0 } }

.ar-replay { margin-top: 48px; font-family: var(--f-ui); font-size: 13px; letter-spacing: .08em; color: var(--ink);
  background: none; border: 0; border-bottom: 1px solid var(--ink); padding: 0 0 3px; cursor: pointer; }
.ar-replay:hover { border-bottom-color: var(--her-line); }
.ar-replay[disabled] { color: var(--ink-faint); border-color: var(--hair); cursor: default; }

@media (max-width: 860px) {
  .ar-scrolly { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .ar-stage { order: -1; height: 50svh; justify-content: flex-end; gap: 6px; padding-bottom: 10px;
    background: var(--paper); box-shadow: 0 14px 18px -14px rgba(255,255,255,1); }
  .ar-stage svg.scene { max-height: 36svh; width: auto; }
  .ar-floor { font-size: 40px; }
  .ar-hud { gap: 12px; }
  .ar-steps { padding-block: 4vh 30vh; }
  .ar-step { padding-block: 16vh; }
  .ar-step .short { font-size: 26px; }
}
`;

  /* Figure shapes, seen from behind, feet at the origin. */
  const HIM_STAND = `<ellipse class="shadow" cx="0" cy="0" rx="36" ry="5"/>
    <circle class="him-b" cx="0" cy="-213" r="17"/>
    <path class="him-b" d="M-31,-176 C-31,-187 -23,-192 -13,-192 L13,-192 C23,-192 31,-187 31,-176 L23,-2 L-23,-2 Z"/>`;
  const HIM_SIT = `<ellipse class="shadow" cx="0" cy="0" rx="44" ry="5"/>
    <circle class="him-b" cx="0" cy="-122" r="17"/>
    <path class="him-b" d="M-30,-88 C-30,-98 -22,-102 -12,-102 L12,-102 C22,-102 30,-98 30,-88 L40,-2 L-40,-2 Z"/>`;
  const HER_STAND = `<circle class="her-b" cx="0" cy="-219" r="7"/>
    <circle class="her-b" cx="0" cy="-200" r="15.5"/>
    <path class="her-b" d="M-24,-166 C-24,-176 -18,-180 -10,-180 L10,-180 C18,-180 24,-176 24,-166 L31,-2 L-31,-2 Z"/>`;
  const HER_TURN = `<circle class="her-b" cx="5" cy="-218" r="7"/>
    <circle class="her-b" cx="-3" cy="-200" r="15.5"/>
    <path class="her-b" d="M-21,-166 C-21,-176 -16,-180 -9,-180 L10,-180 C18,-180 23,-176 23,-166 L29,-2 L-29,-2 Z"/>`;
  const HER_SIT = `<circle class="her-b" cx="0" cy="-130" r="7"/>
    <circle class="her-b" cx="0" cy="-111" r="15.5"/>
    <path class="her-b" d="M-24,-80 C-24,-90 -18,-94 -10,-94 L10,-94 C18,-94 24,-90 24,-80 L38,-2 L-38,-2 Z"/>`;
  const HER_LIE = `<circle class="her-b" cx="-108" cy="-16" r="15.5"/>
    <path class="her-b" d="M-86,-30 L84,-24 C92,-24 96,-18 96,-13 C96,-7 92,-2 84,-2 L-86,-2 C-93,-2 -95,-8 -95,-16 C-95,-24 -93,-30 -86,-30 Z"/>`;

  const SVG = `
<svg class="scene" viewBox="0 0 400 540" role="img" aria-label="ציור קווי של תא מעלית, מבט מהקיר האחורי אל הדלתות">
  <defs>
    <clipPath id="ar-door-clip"><rect x="130" y="122" width="140" height="278"/></clipPath>
    <clipPath id="ar-mirror-clip"><polygon points="38,128 96,150 96,356 38,398"/></clipPath>
    <filter id="ar-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>
  <g class="cabin"><g class="cabin-in">
    <!-- walls in one-point perspective -->
    <rect class="fill-paper" x="20" y="20" width="360" height="500"/>
    <polygon class="ln-soft" points="20,20 380,20 290,90 110,90"/>
    <polygon class="ln-soft" points="20,520 380,520 290,400 110,400"/>
    <line class="ln-soft" x1="20" y1="20" x2="110" y2="90"/><line class="ln-soft" x1="380" y1="20" x2="290" y2="90"/>
    <line class="ln-soft" x1="20" y1="520" x2="110" y2="400"/><line class="ln-soft" x1="380" y1="520" x2="290" y2="400"/>
    <rect class="ln" x="110" y="90" width="180" height="310"/>
    <!-- floor seams -->
    <line class="ln-soft" x1="65" y1="460" x2="335" y2="460" opacity=".5"/>
    <!-- ceiling lamp -->
    <path class="lamp" d="M165,46 L235,46 L229,58 L171,58 Z"/>
    <circle class="elamp" cx="200" cy="72" r="3"/>
    <!-- doorway and hallway -->
    <g clip-path="url(#ar-door-clip)">
      <rect class="hall" x="130" y="122" width="140" height="278"/>
      <line class="ln-soft" x1="130" y1="352" x2="270" y2="352"/>
      <text class="led" x="200" y="200" font-size="13" fill="#b3b2ab" id="ar-hall-no"></text>
      <g class="doorL"><rect class="fill-paper" x="130" y="122" width="70" height="278"/><rect class="ln" x="130" y="122" width="70" height="278"/></g>
      <g class="doorR"><rect class="fill-paper" x="200" y="122" width="70" height="278"/><rect class="ln" x="200" y="122" width="70" height="278"/></g>
    </g>
    <rect class="ln" x="130" y="122" width="140" height="278"/>
    <!-- small floor display above the doors -->
    <rect class="ln-soft" x="182" y="100" width="36" height="15"/>
    <text class="led" x="200" y="111" id="ar-led">0</text>
    <!-- call panel on the right wall -->
    <polygon class="panel ln-soft" points="300,196 318,188 318,318 300,322"/>
    <ellipse class="btn" cx="309" cy="214" rx="3.2" ry="3.6"/>
    <ellipse class="btn" cx="309" cy="232" rx="3.2" ry="3.6"/>
    <ellipse class="btn" cx="309" cy="250" rx="3.2" ry="3.6"/>
    <ellipse class="btn" cx="309" cy="268" rx="3.2" ry="3.6"/>
    <ellipse class="btn m3" cx="309" cy="286" rx="3.2" ry="3.6"/>
    <ellipse class="btn m4" cx="309" cy="304" rx="3.2" ry="3.6"/>
    <!-- mirror on the left wall -->
    <polygon class="mirror" points="38,128 96,150 96,356 38,398"/>
    <g clip-path="url(#ar-mirror-clip)">
      <line class="ln-soft" x1="44" y1="190" x2="90" y2="150" opacity=".5"/>
      <line class="ln-soft" x1="44" y1="214" x2="90" y2="174" opacity=".35"/>
      <g class="refl" transform="translate(70 392) scale(.52 .6) skewY(-14)">
        <g class="pose p-stand">${HIM_STAND}</g><g class="pose p-sit">${HIM_SIT}</g>
      </g>
    </g>
    <!-- light washes -->
    <rect class="wash" x="20" y="20" width="360" height="500"/>
    <rect class="dark" x="20" y="20" width="360" height="500"/>
    <!-- people -->
    <g class="fig her">
      <g class="pose p-stand">${HER_STAND}</g><g class="pose p-turn">${HER_TURN}</g>
      <g class="pose p-sit">${HER_SIT}</g><g class="pose p-lie">${HER_LIE}</g>
    </g>
    <g class="fig him">
      <g class="pose p-stand">${HIM_STAND}</g><g class="pose p-sit">${HIM_SIT}</g>
      <rect class="phone" x="22" y="-118" width="9" height="15" rx="1.5"/>
    </g>
    <g class="vapor" filter="url(#ar-blur)">
      <circle cx="196" cy="378" r="7" style="--dx:-14px;animation-delay:0s"/>
      <circle cx="206" cy="384" r="6" style="--dx:10px;animation-delay:1.1s"/>
      <circle cx="200" cy="380" r="8" style="--dx:-4px;animation-delay:2.3s"/>
      <circle cx="210" cy="376" r="5" style="--dx:18px;animation-delay:3.4s"/>
      <circle cx="192" cy="382" r="6" style="--dx:-20px;animation-delay:4.4s"/>
    </g>
  </g></g>
  <!-- the morning after -->
  <g class="ward">
    <line class="ln" x1="88" y1="420" x2="312" y2="420"/>
    <line class="ln" x1="100" y1="420" x2="100" y2="470"/><line class="ln" x1="300" y1="420" x2="300" y2="470"/>
    <line class="ln" x1="100" y1="380" x2="100" y2="420"/>
    <g transform="translate(205 418) scale(.92)"><circle class="him-b" cx="-108" cy="-16" r="16"/>
      <path class="him-b" d="M-86,-31 L86,-25 C93,-25 97,-19 97,-13 C97,-7 93,-2 86,-2 L-86,-2 C-93,-2 -96,-8 -96,-16 C-96,-25 -93,-31 -86,-31 Z"/></g>
    <line class="ln-soft" x1="336" y1="250" x2="336" y2="470"/>
    <line class="ln-soft" x1="322" y1="470" x2="350" y2="470"/>
    <rect class="ln-soft" x="326" y="258" width="20" height="30" rx="4"/>
    <path class="ln-soft" d="M336,288 C336,330 300,350 280,392"/>
  </g>
  <g id="ar-petals"></g>
</svg>`;

  const STEPS = `
<div class="ar-step" data-floor="0" data-doors="open" data-her="none" data-pose="stand" data-light="on" data-air="0" data-clock="" data-signal="" data-lit="" data-smoke="off" data-scene="cabin" data-dir="none">
  <p class="short">הדלתות נסגרו.</p>
</div>
<div class="ar-step" data-doors="closed" data-dir="up" data-floor="5" data-speed="650">
  <p class="short">המעלית התחילה לעלות.</p>
</div>
<div class="ar-step" data-floor="6" data-doors="open" data-her="enter" data-dir="none">
  <p>הסתכלתי על המספרים מנסה להזכר היכן חניתי. בקומה שש נפתחו הדלתות והיא נכנסה.</p>
</div>
<div class="ar-step" data-doors="closed" data-her="in" data-fx="buttons">
  <p>אני זוכר את המבט המופתע שלה, נכנסת למעלית ואין אף קומה לחוצה. אולי המבט לא היה מופתע, אולי הוא היה מבט של פחד.</p>
</div>
<div class="ar-step" data-lit="m3 m4" data-fx="buttons">
  <p>היא לחצה על קומה מינוס שלוש אז מיד לחצתי על קומה מינוס ארבע.</p>
</div>
<div class="ar-step" data-fx="mirror">
  <p>הסתכלתי עליה דרך המראה בצד. למה אף פעם אין לי את האומץ אפילו להגיד שלום, או לשאול לשלומה.</p>
</div>
<div class="ar-step" data-floor="-2" data-dir="down" data-speed="900" data-fx="shake">
  <p>המעלית הישנה רעדה והתחילה לרדת. הספירה לאחור של הקומות הכבידה עלי.</p>
</div>
<div class="ar-step" data-fx="scent">
  <p>ריח הפריחה מהשיער שלה הטריף לי את כל החושים. יכולתי להרגיש אותו זורם מהאף, אל תוך מחזור הדם שלי ואל קצות האצבעות.</p>
</div>
<div class="ar-step" data-floor="-3" data-dir="none">
  <p class="short">הגענו לקומה מינוס שלוש.</p>
</div>
<div class="ar-step" data-doors="stuck">
  <p>שוב היא תלך ואני אבלה את שארית השבוע מצטער על הדקה הזו שעברה ולא תחזור. כמה מחשבות רצו לי בראש באותו רגע. האם לצאת אחריה? האם להגיד לה איך קוראים לי? אולי לבקש ממנה עזרה?</p>
  <p>כל כך הרבה כיוונים, שלא הפנמתי בכלל שהיא לוחצת בטירוף על כפתור פתיחת הדלתות כי הן לא נפתחו.</p>
</div>
<div class="ar-step" data-doors="closed" data-clock="23:05" data-signal="none" data-fx="phone">
  <p>פתאום הבנתי שאנחנו במצוקה, ואני עומד ולא עושה כלום. "היי, נראה לי שהמעלית נתקעה". איזה משפט טיפשי, חשבתי לעצמי... הרי היא בטח כבר יודעת את זה. היא אפילו לא הסתובבה ורק המשיכה ללחוץ על הכפתור.</p>
  <p>"אני אתקשר למכבי האש", מלמלתי והוצאתי את הטלפון. לא היתה קליטה.</p>
</div>
<div class="ar-step" data-clock="23:08" data-fx="phone">
  <p>"היי, קוראים לי נתי. תוכלי אולי לבדוק אם יש לך קליטה?"</p>
  <p>"היי, אני ענת. נגמרה לי הבטרייה לפני איזה חצי שעה ושכחתי את המטען באוטו. בגלל זה ירדתי למטה, אני גרה כאן"</p>
</div>
<div class="ar-step" data-her="turn" data-clock="23:10">
  <p>"גם אני גר כאן, בדירה 14. כבר נפגשנו במעלית לפני כמה חודשים".</p>
  <p>חייכתי בעדינות. היא הסתובבה לכיווני</p>
  <p>"מה נעשה?"</p>
</div>
<div class="ar-step" data-clock="23:13">
  <p>אף פעם לא הייתי ה"גבר" הזה, שיודע לשלוף את הלדרמן מהתיק או זה שמנסה לפתוח את הדלתות עם השיניים. התלבטתי אם להפוך לכזה, או להמשיך להיות אני.</p>
</div>
<div class="ar-step" data-light="emergency" data-clock="23:15">
  <p>"זה נראה כמו קצר בחשמל" מלמלתי בביטחון.</p>
  <p>"שום דבר לא מגיב".</p>
  <p>תאורת החירום הבהבה.</p>
</div>
<div class="ar-step" data-pose="sit" data-her="sit" data-smoke="on" data-air=".3" data-clock="23:24">
  <p>"סיגריה?" שאלה אותי ענת בזמן שהיא שולפת סיגריה אלקטרונית מהכיס. ישבנו על הרצפה, מעשנים בתורות עד שסיימנו את הטבק.</p>
</div>
<div class="ar-step" data-smoke="off" data-air=".45" data-clock="23:45">
  <p>"כמה זמן אנחנו כבר פה?" שאלה אותי.</p>
  <p>"40 דקות, כבר רבע לשתיים עשרה".</p>
</div>
<div class="ar-step" data-air=".6" data-clock="23:52">
  <p>"דווקא נחמד לי" היא אמרה,</p>
  <p>"חוץ מזה שנהיה קצת מחניק <span class="ar-trail">וממש רציתי כבר ללכת לישון"</span> לא שמעתי את הסוף של המשפט שלה.</p>
</div>
<div class="ar-step" data-her="lie" data-air=".8" data-clock="00:20">
  <p>"נהיה לי חם ממש, וקשה לי לנשום" היא מלמלה, שוכבת על הרצפה ואני מנגב לה את הזיעה מהמצח עם החולצה שלי.</p>
</div>
<div class="ar-step" data-light="dim" data-air="1" data-clock="01:10">
  <p>"אל תדברי ענתי, אנחנו צריכים את האוויר עד שיבואו לחלץ אותנו".</p>
</div>
<div class="ar-step" data-scene="hospital" data-light="off" data-air="0" data-clock="06:00" data-signal="" data-pose="stand" data-floor="" data-fx="flash">
  <p>חזרתי להכרה בשש בבוקר בבית חולים. "איפה ענת? זו שהיתה איתי במעלית" שאלתי את יוני שישב על הכורסה לידי.</p>
</div>
<div class="ar-step" data-her="gone" data-fx="dissolve">
  <p>"איזו ענת? מכבי האש חילצו אותך לבד מהמעלית".</p>
  <button class="ar-replay" type="button" id="ar-replay">לרדת שוב במעלית</button>
</div>`;

  const KEYS = ["floor", "doors", "her", "pose", "light", "air", "clock", "signal", "lit", "smoke", "scene", "dir"];
  const FMT = f => f === "" || f == null ? "" : (+f < 0 ? "−" + Math.abs(+f) : String(+f));

  let cleanup = [];

  function mount(root, ctx) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    root.innerHTML = `
<div class="ar" id="ar">
  <header class="story-head">
    <span class="eyebrow">ענדתי אושר · עמוד 12</span>
    <h1>אהבה רגעית</h1>
    <div class="meta">סיפור · ארבע דקות קריאה · לגלול לאט</div>
  </header>
  <section class="ar-scrolly">
    <div class="ar-steps">${STEPS}</div>
    <div class="ar-stage" aria-hidden="true">
      <div class="ar-hud" data-dir="none">
        <svg class="ar-dir" viewBox="0 0 14 28"><path class="u" d="M1 10 L7 3 L13 10"/><path class="d" d="M1 18 L7 25 L13 18"/></svg>
        <div class="ar-floor" id="ar-floor">0</div>
        <div class="ar-meta"><span id="ar-clock"></span><span class="ar-sig-wrap"><span class="ar-sig"><i></i><i></i><i></i><i></i></span>אין קליטה</span></div>
      </div>
      ${SVG}
    </div>
  </section>
  <footer class="story-end">
    <div class="mark"></div>
    ${ctx.endNav}
  </footer>
  <div class="ar-air" id="ar-air"></div>
  <div class="ar-flash" id="ar-flash"></div>
</div>`;

    const ar = root.querySelector("#ar");
    const hud = ar.querySelector(".ar-hud");
    const floorEl = ar.querySelector("#ar-floor");
    const led = ar.querySelector("#ar-led");
    const hallNo = ar.querySelector("#ar-hall-no");
    const clock = ar.querySelector("#ar-clock");
    const air = ar.querySelector("#ar-air");
    const flash = ar.querySelector("#ar-flash");
    const petals = ar.querySelector("#ar-petals");
    const steps = [...ar.querySelectorAll(".ar-step")];
    const replayBtn = ar.querySelector("#ar-replay");

    /* ---- floor counter ---- */
    let shown = 0, timer = null;
    function paintFloor(f) {
      floorEl.textContent = FMT(f);
      led.textContent = FMT(f);
    }
    function goFloor(target, speed) {
      clearInterval(timer);
      if (target === "" || target == null) { shown = null; paintFloor(""); return; }
      target = +target;
      if (shown == null || reduced || speed === 0) { shown = target; paintFloor(shown); return; }
      if (shown === target) return paintFloor(shown);
      timer = setInterval(() => {
        shown += target > shown ? 1 : -1;
        paintFloor(shown);
        if (shown === target) clearInterval(timer);
      }, speed);
    }

    /* ---- petals ---- */
    const NS = "http://www.w3.org/2000/svg";
    let live = [], raf = 0, scentOn = false, last = 0, since = 0;
    function herHead() {
      const h = ar.dataset.her;
      if (h === "lie" || h === "gone") return [170, 466];
      if (h === "sit") return [272, 366];
      return [252, 278];
    }
    /* velocities in units per second, life in seconds */
    function spawn(x, y, vx, vy, life) {
      const e = document.createElementNS(NS, "ellipse");
      e.setAttribute("class", "petal");
      e.setAttribute("rx", 2.8); e.setAttribute("ry", 1.4);
      petals.appendChild(e);
      live.push({ e, x, y, vx, vy, life, age: 0, rot: Math.random() * 180, vr: (Math.random() - .5) * 160, ph: Math.random() * 6 });
    }
    function tick(t) {
      raf = 0;
      const dt = Math.min(.1, last ? (t - last) / 1000 : 0); last = t;
      since += dt;
      if (scentOn && since > .26) {
        since = 0;
        const [x, y] = herHead();
        spawn(x + (Math.random() - .5) * 14, y + (Math.random() - .5) * 10, -30 - Math.random() * 20, -3 + Math.random() * 14, 5);
      }
      live = live.filter(p => {
        p.age += dt;
        p.x += (p.vx + Math.sin(p.age * 3 + p.ph) * 14) * dt;
        p.y += (p.vy + Math.cos(p.age * 2.6 + p.ph) * 8) * dt;
        p.rot += p.vr * dt;
        const k = p.age / p.life;
        const o = k < .15 ? k / .15 : 1 - Math.max(0, (k - .55) / .45);
        p.e.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rot.toFixed(0)})`);
        p.e.setAttribute("opacity", (Math.max(0, o) * .85).toFixed(2));
        if (k >= 1) { p.e.remove(); return false; }
        return true;
      });
      if (scentOn || live.length) raf = requestAnimationFrame(tick); else last = 0;
    }
    function kick() { if (!raf && !reduced) raf = requestAnimationFrame(tick); }
    function setScent(on) { scentOn = on; if (on) kick(); }
    function clearPetals() { live.forEach(p => p.e.remove()); live = []; }
    function dissolve() {
      if (reduced) return;
      for (let i = 0; i < 46; i++) {
        const x = 162 + Math.random() * 196, y = 452 + Math.random() * 28;
        spawn(x, y, (Math.random() - .5) * 50, -24 - Math.random() * 50, 2.6 + Math.random() * 2.6);
      }
      kick();
    }

    /* ---- state ---- */
    let active = -1;
    function stateAt(i) {
      const s = {};
      for (let j = 0; j <= i; j++) for (const k of KEYS) if (steps[j].dataset[k] !== undefined) s[k] = steps[j].dataset[k];
      return s;
    }
    function apply(i, back) {
      const s = stateAt(i);
      for (const k of KEYS) if (k !== "floor" && k !== "air" && k !== "clock") ar.dataset[k] = s[k] ?? "";
      hud.dataset.dir = s.dir || "none";
      const own = steps[i].dataset;
      const speed = back ? 90 : (own.floor !== undefined ? +(own.speed || 400) : 0);
      goFloor(s.floor, speed);
      hallNo.textContent = s.floor === "6" && s.doors === "open" ? "6" : "";
      clock.textContent = s.clock || "";
      air.style.opacity = s.air || 0;
      ar.className = "ar " + (own.fx || "").split(" ").filter(Boolean).map(f => "fx-" + f).join(" ");
      if (back) clearPetals();
      setScent((own.fx || "").includes("scent"));
      if (!back && own.fx === "flash" && !reduced) { flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go"); }
      if (!back && (own.fx || "").includes("dissolve")) dissolve();
      steps.forEach((el, j) => { el.classList.toggle("on", j === i); el.classList.toggle("seen", j < i); });
    }
    function pick() {
      const stage = ar.querySelector(".ar-stage");
      const narrow = innerWidth <= 860;
      const line = narrow ? stage.offsetHeight + (innerHeight - stage.offsetHeight) * .45 : innerHeight * .55;
      let i = 0;
      for (let j = 0; j < steps.length; j++) if (steps[j].getBoundingClientRect().top < line) i = j;
      if (i !== active) { const back = i < active; active = i; if (!replaying) apply(i, back); }
    }
    let ticking = false;
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; pick(); }); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    /* ---- replay: the ride again, as the firefighters found it ---- */
    let replaying = false, rtimers = [];
    replayBtn.addEventListener("click", () => {
      if (replaying) return;
      replaying = true; replayBtn.disabled = true;
      const set = (o) => { Object.assign(ar.dataset, o); if ("dir" in o) hud.dataset.dir = o.dir; };
      const at = (ms, fn) => rtimers.push(setTimeout(fn, ms));
      clock.textContent = "";
      set({ scene: "cabin", her: "none", pose: "stand", light: "on", smoke: "off", lit: "m4", signal: "", doors: "open", dir: "none" });
      shown = 6; paintFloor(6); hallNo.textContent = "6";
      at(1400, () => { set({ doors: "closed" }); hallNo.textContent = ""; });
      at(2600, () => { ar.className = "ar fx-mirror fx-shake"; set({ dir: "down" }); goFloor(-3, 700); });
      at(2600 + 9 * 700 + 600, () => { set({ dir: "none" }); });
      at(2600 + 9 * 700 + 2600, () => {
        replaying = false; replayBtn.disabled = false; ar.className = "ar";
        active = -1; pick();
      });
    });

    // first frame
    apply(0, true); active = 0; pick();
    cleanup = [
      () => removeEventListener("scroll", onScroll),
      () => removeEventListener("resize", onScroll),
      () => clearInterval(timer),
      () => rtimers.forEach(clearTimeout),
      () => cancelAnimationFrame(raf),
      () => style.remove()
    ];
  }

  window.BOOK.register({
    id: "ahava-regit",
    title: "אהבה רגעית",
    page: 12,
    kind: "סיפור",
    blurb: "מעלית ישנה, קומה מינוס שלוש, ארבעים דקות ותאורת חירום. סיפור שנקרא בגלילה.",
    glyph: `<svg viewBox="0 0 44 44" width="44" height="44"><path d="M14 8 L22 16 L30 8" fill="none" stroke="currentColor" stroke-width="1"/><text x="22" y="40" text-anchor="middle" direction="ltr" unicode-bidi="embed" font-family="IBM Plex Mono, monospace" font-weight="300" font-size="20" fill="currentColor">−3</text></svg>`,
    accent: "#c48b90",
    mount,
    unmount() { cleanup.forEach(f => f()); cleanup = []; }
  });
})();
