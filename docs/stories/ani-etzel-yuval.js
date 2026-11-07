/* אני אצל יובל — nine chapters scattered through the book on purpose.
   A long read, so no scrolling here: the text is set in fixed pages and turned like a book
   (arrows, swipe, a tap on the page edge, or the wheel). Each chapter is its own stop in
   the book; its last page is a crossroads: keep reading the book, or jump straight to the
   next chapter. After the last chapter the whole thing can be read again in one sitting,
   in time order (by chapter number) or in book order.
   The thread at the top maps the chapters across pages 11–37. Read chapters get two blue
   ticks, the read receipt the story itself turns on. */
(() => {
  const ACCENT = "#4a8fc1";
  const CH = [
    { id: "yuval-1", n: "פרק 1", num: "1", p: 11, key: 1, voice: "יובל", paras: [
      `"חכי! אל תשלחי!" צעקתי מהצד השני של החדר. זה היה מאוחר מידי. "תמחקי! תמחקי!" רצתי לקראתה לתפוס את הטלפון. שני <b class="yv-blue">הסימנים הכחולים</b> שצמודים להודעת התמונה הבהירו לי שאין דרך חזרה.`,
      `זה בחוץ. שנה הצלחתי להסתיר את זה. "את מבינה מה עשית?! זהו, זה נגמר!"`,
      `עמדתי מולה. אור הירח האיר את <b class="yv-blue">הסימנים הכחולים</b> שהשארתי על פניה הדומעות.`] },
    { id: "yuval-2", n: "פרק 2", num: "2", p: 16, key: 2, voice: "יובל", paras: [
      `היא ניגבה את פניה. "זה נגמר!" היא אמרה והדליקה את מנורת השולחן הלבנה.`,
      `לא ידעתי איך להגיב. הטלפון שלה רטט ללא הפסקה ביד שלי. התמונה הישנה, יושבת על הכתפיים הרחבות של אבא שלה הופיעה על הטלפון. ניתקתי בגסות. הידיים שלי נוטפות זיעה, הגוף שלי קפוא. תמיד ידעתי לנווט את התקפי הזעם שלי היטב. והיא ידעה להכיל אותם. ולהסתיר. עם הרבה מייקאפ ופודרה. הרגשתי שהיא שומרת עלי. מבינה. ופתאום זה נשבר. נגמר. הטלפון רטט שוב, הגשתי לה אותו בכניעה. "אבא, בוא לקחת אותי" היא לחשה. "אני אצל יובל". יכולתי לשמוע אותו צועק מהצד השני. ואותה שותקת.`,
      `"אני מצטערת", מלמלתי. "מגיעה לך מישהי יותר טובה ממני".`] },
    { id: "yuval-m1", n: "פרק מינוס 1", num: "−1", p: 23, key: -1, voice: "אלמה", paras: [
      `גדלתי עם יובל. היא נכנסה אלינו הביתה כשהייתי בת 5 והיא היתה בת 9. יפה כזו, ג'ינג'ית עם שיער ארוך אסוף ברישול. אבא שלי חיבק את אמא של יובל ברגע שהיא נכנסה בדלת. חיבוק חזק, מלא באושר ותקווה למישהי טובה יותר בשבילנו. זו היתה תקופה נפלאה, אבא היה מאושר שוב, ולי היתה פתאום אחות גדולה. כזו שתמיד שומרת עלי ושאפשר לקחת לה את החולצות. כשהתבגרנו, קצת התרחקנו. נדמה לי שזה התחיל בגיל 15, כשיובל הכירה לי את אופיר, החבר הראשון שלה. לא הצלחתי להבין למה היא צריכה חבר. הרי יש לנו אחת את השניה. במבט לאחור, ברור לי שהקנאה תמיד שכנה שם, בשקט. מוכנה לפרוץ החוצה. אמא של יובל היתה גם אמא שלי. לפעמים פחות, לפעמים יותר אבל תמיד ידעתי שעדיף משהו מאשר שום דבר.`,
      `ואז אבא עזב.`,
      `בטריקת דלת כזו שהדהדה את הקירות של הבית במשך שבוע. נשארנו ארבעתנו. אמא, יובל, אופיר ואני. פעם ראשונה בחמש עשרה שנה שהייתי לא רק בלי אמא, אלא גם בלי אבא. נקודה כזו בחיים, שמשנה את מסלולם. ומשנה אותך. לתמיד.`] },
    { id: "yuval-0", n: "פרק 0", num: "0", p: 30, key: 0, voice: "אלמה", paras: [
      `חיינו התנהלו ברביעיה. מירב, שכבר לא קראתי לה אמא יותר, יובל ואופיר, ואני – שנקלעתי למציאות ההזויה הזו. במשך שבע שנים ניסיתי לרדוף אחרי אבא, להבין מה קרה. בגרויות בלי אמא ואבא. צבא, טיול של אחרי. יובל, אחותי הגדולה, תמיד הייתה שם בשבילי וגם בשביל אופיר. ואחרי הטיול של אחרי.. קצת הלכתי לאיבוד. ניסיתי לחזור להיות עם יובל, אבל היא ואופיר היו אחד. אז ניגנתי המון, ושרתי מעט. ביליתי שעות על הספסל מול הגלים וניסיתי להבין לאן ואיך. יום אחד, ממש לפני השקיעה, כשרוח חמה של קיץ עושה לי נעים בחצי הראש המגולח הבנתי מה אני ויובל צריכות לעשות. איך נחזיר את הכל חזרה.`,
      `רצתי הביתה, שוכחת את הכפכפים שלי מכוסים בחול מתחת לספסל.`] },
    { id: "yuval-1b", n: "פרק 1 (שוב)", num: "1", again: true, p: 31, key: 1.5, voice: "אלמה", paras: [
      `אני שולחת! נבחתי על יובל. אני לא יכולה כבר להחזיק את זה בבטן. הידיים שלי רעדו, הבנתי היטב מה יקרה אם אשלח את התמונה הזו. אבל הראש שלי התפוצץ. תמיד הייתי הרגועה בין שתינו. "אלמה האדישה", יובל היתה קוראת לי. והנה כאן, אני בסערת רגשות שלא חוויתי מעולם. השנה האחרונה עוברת לי שוב בהילוך מהיר.`,
      `"חכי! אל תשלחי!" יובל צעקה אלי מהצד השני של החדר. "שלחתי", גמגמתי. מנסה עוד להבין איך הגענו אתמול למצב שיובל שוב מורידה לי סטירה. יובל קפצה מעל המיטה, חוטפת לי את הטלפון מהיד. "את מבינה מה עשית?! זהו, זה נגמר!" היא צעקה עלי, ומיד התחלתי לבכות. פעם יכולתי להכיל את התקפי הזעם שלה. זה לא היה קשה מדי, כי אופיר ספג את כל האש. אבל אופיר איננו.`,
      `בכיתי בשקט, אף פעם לא ידעתי לבכות בקול. מלא דמעות שיורדות לי מהחיים ומטפטפות לתוך החולצה.`] },
    { id: "yuval-2b", n: "פרק 2 (שוב)", num: "2", again: true, p: 32, key: 2.5, voice: "אלמה", paras: [
      `הטלפון רטט אצל יובל ביד. לא ראיתי מי זה. "תני לי את הטלפון" ביקשתי. היא ניתקה בהפגנתיות והשקט התפזר בחזרה בחדר. שוב טלפון, לא יכולתי להאמין שאבא באמת מתקשר.`,
      `<span class="yv-said">"אבא, בוא לקחת אותי, אני אצל יובל"</span>`,
      `לא הצלחתי להבין למה הוא צועק עלי.`] },
    { id: "yuval-3", n: "פרק 3", num: "3", p: 36, key: 3, voice: "אבא", paras: [
      `אני זוכר שיובל נכנסה עם מירב הביתה. אני זוכר את החיבוק שנתתי לה ואת המבטים של יובל ואלמה אחת אל השניה. כמה דיברנו על הרגע הזה, שנצטרך להפוך אותן לאחיות. מירב היתה הרוח שלי, מי שהרימה אותי מתוך הבור העמוק שהייתי בו במשך כמה שנים טובות. היא הצליחה להבין שאחרי הפרידה שלי מדניאל, נשארו בי זרעים שניתן יהיה לגדל מחדש. ארבע שנים של לגדל את אלמה לבד גבו ממני מחיר נפשי כבד. לא התגעגעתי לדניאל, אבל לא יכולתי לסלוח לה על איך שברחה עם הבן שלנו. התגעגעתי אליו נורא. לא הצלחתי לגדל את אלמה כמו שרציתי, כל תזוזה, כל חיבוק, דמיינתי אותו במקומה.`,
      `יובל ואלמה הפכו לאחיות, חברות. גדלו ביחד, החליפו בגדים וחלקו חוויות של התבגרות. עד היום הזה שאופיר נכנס בדלת. ישבנו לארוחת ערב, אני, יובל ואופיר. אלמה ניגנה במרפסת למעלה. שאלתי אותו מהיכן הוא, מה הוא לומד ואיך קוראים להורים שלו. "ההורים שלי גרושים, אני חי עם אמא שלי. דניאל".`,
      `נחנקתי.`] },
    { id: "yuval-31", n: "פרק 3.1", num: "3.1", p: 37, key: 3.1, voice: "אבא", paras: [
      `חמש עשרה שנה, והנה הוא יושב כאן מולי ואלמה לא יודעת שיש לה אח. "תסלחו לי". קמתי מהשולחן והלכתי לחדר שינה אל מירב. רבנו באותו ערב כמו שלא רבנו מעולם. לא ידעתי איך להתמודד עם זה שהסתרתי מאלמה שיש לה אח. הבנתי שאני יכול לפרק כאן שתי משפחות, אז עשיתי מה שאני יודע הכי טוב. טרקתי את הדלת. החלטתי להפגש עם דניאל.`] },
    { id: "yuval-4", n: "פרק 4 ואחרון", num: "4", p: 37, key: 4, voice: "אבא", paras: [
      `במקום לפגוש את דניאל, פגשתי שוב את הבור העמוק שלי. שוכב לי באיזה דירה מעופשת בדרום העיר. בקבוקים ריקים וסיגריות ממלאים לי את המיטה. בוחר להתעלם מהטלפונים של אלמה ומפחד לצאת חזרה לעולם האמיתי. קורא כל הודעה שהיא שולחת, אבל לא מגיב לעולם. אחרי שנתיים, ההודעות והטלפונים נעשו נדירים יותר. היא ידעה שאני קורא את ההודעות, הפידבק היחיד ממני היו שני <b class="yv-blue"><span class="yv-ticks">✓✓</span> הכחולים</b> ליד ההודעה שלה. האמנתי שהם מסמנים לה שאני חי.`,
      `כשאתה בבור כזה עמוק, שקוע בתוך החושך, מאוד קשה לצאת החוצה. כל קרן אור מסנוורת בכאב, הראש מרגיש בנוח רק כשאתה שוכב ועוצם עיניים. דיפרסיה.`,
      `צלצול של הודעה. תמונה מאלמה. הסתובבתי הצידה ופתחתי את הטלפון. התמונה של אופיר, שוכב על הרצפה של השירותים כשעשרות קופסאות ריקות של כדורים מפוזרות סביבו הסירה לי את כל ההגנות ברגע.`,
      `התקשרתי לאלמה.`] }
  ];
  const BYTIME = [...CH].sort((a, b) => a.key - b.key);
  const P0 = 11, P1 = 37;
  const B = window.BOOK;
  const READ_KEY = "andati:yuval:read";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const css = `
html.yv-lock, html.yv-lock body { overflow: hidden; height: 100%; overscroll-behavior: none; }
.yv {
  position: fixed; inset: 0; background: var(--paper);
  display: grid; grid-template-rows: calc(56px + env(safe-area-inset-top, 0px)) auto minmax(0, 1fr) calc(68px + env(safe-area-inset-bottom, 0px));
  padding-left: var(--gut-l); padding-right: var(--gut-r);
  -webkit-user-select: text; user-select: text; touch-action: pan-y;
}
.yv-thread { position: relative; width: min(760px, 100%); height: 46px; margin: 0 auto; grid-row: 2; }
.yv-thread .line { position: absolute; inset: 15px 0 auto; height: 1px; background: var(--hair); }
.yv-dot { position: absolute; top: 13px; width: 5px; height: 5px; margin-right: -2.5px; border-radius: 50%; background: var(--hair); transition: right .9s cubic-bezier(.6,.05,.25,1), opacity .6s; }
.yv-mark {
  position: absolute; top: 0; width: 30px; margin-right: -15px; height: 46px; padding: 0; border: 0; background: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 3px; color: var(--ink-faint);
  transition: right .9s cubic-bezier(.6,.05,.25,1), color .3s;
}
.yv-mark svg { width: 20px; height: 14px; margin-top: 8px; background: var(--paper); overflow: visible; }
.yv-mark svg path { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.yv-mark .t2 { opacity: 0; transition: opacity .4s; }
.yv-mark.read { color: var(--accent); }
.yv-mark.read .t2 { opacity: 1; }
.yv-mark .lb { font-family: var(--f-mono); font-weight: 300; font-size: 10px; line-height: 1; direction: ltr; color: var(--ink-faint); opacity: 0; transition: opacity .3s; white-space: nowrap; }
.yv-mark:hover .lb, .yv-mark.cur .lb, .yv.time .yv-mark .lb { opacity: 1; }
.yv-mark.cur .lb { color: var(--ink); }
.yv-mark.cur::after { content: ""; position: absolute; top: 40px; width: 14px; height: 1px; background: var(--ink); }
.yv.time .yv-dot { opacity: 0; }

.yv-stage { grid-row: 3; position: relative; display: flex; justify-content: center; min-height: 0; padding-top: 3vh; cursor: default; }
.yv-window { height: 100%; overflow: hidden; position: relative; }
.yv-flow {
  height: 100%; column-fill: auto; orphans: 2; widows: 2;
  font-family: var(--f-body); font-size: 20.5px; line-height: 1.9; color: var(--ink);
  transition: transform .6s cubic-bezier(.6,.05,.25,1);
}
.yv-flow p { margin: 0 0 .8em; text-wrap: pretty; }
.yv-flow .brk { break-before: column; -webkit-column-break-before: always; }
.yv-blue { font-weight: inherit; color: var(--accent); }
.yv-ticks { font-family: var(--f-ui); letter-spacing: -.28em; padding-left: .32em; }
.yv-said { display: block; text-align: center; font-family: var(--f-display); font-size: 1.08em; padding: .5em 0; }

.yv-head { break-inside: avoid; padding-bottom: 1.6em; }
.yv-num { display: block; direction: ltr; text-align: right; font-family: var(--f-mono); font-weight: 300; font-size: 112px; line-height: .9; color: var(--hair); margin-bottom: 18px; letter-spacing: -.04em; }
.yv-num.again { text-shadow: -18px 12px 0 #f3f3f0; }
.yv-head .eyebrow { display: block; }
.yv-head h2 { font-family: var(--f-display); font-weight: 400; font-size: 34px; line-height: 1.2; margin: 6px 0 0; }

.yv-cover { break-inside: avoid; padding-top: 4vh; }
.yv-cover h1 { font-family: var(--f-display); font-weight: 300; font-size: clamp(44px, 7vw, 76px); line-height: 1.02; margin: 14px 0 18px; }
.yv-cover p { color: var(--ink-soft); font-size: 18px; margin: 0 0 1.6em; }
.yv-seg { display: inline-flex; border: 1px solid var(--hair); border-radius: 999px; padding: 3px; font-family: var(--f-ui); font-size: 13px; }
.yv-seg button { border: 0; background: none; padding: 7px 16px; border-radius: 999px; color: var(--ink-soft); cursor: pointer; font: inherit; transition: background .3s, color .3s; }
.yv-seg button[aria-pressed="true"] { background: var(--ink); color: var(--paper); }
.yv-legend { margin-top: 2.2em; display: grid; gap: 4px; font-family: var(--f-ui); font-weight: 300; font-size: 13px; color: var(--ink-soft); line-height: 1.7; }
.yv-start { display: inline-block; margin-top: 2.4em; font-family: var(--f-ui); font-size: 13px; letter-spacing: .08em; border: 0; background: none; padding: 0 0 3px; border-bottom: 1px solid var(--ink); color: var(--ink); cursor: pointer; }

.yv-end { break-inside: avoid; padding-top: 4vh; display: grid; gap: 30px; font-family: var(--f-ui); }
.yv-end .mark { width: 40px; height: 1px; background: var(--ink); }
.yv-opt { display: block; text-decoration: none; color: var(--ink); padding: 18px 0 20px; border-top: 1px solid var(--hair); }
.yv-opt .eyebrow { display: block; }
.yv-opt strong { display: block; font-family: var(--f-display); font-weight: 400; font-size: 28px; line-height: 1.25; margin: 6px 0 4px; }
.yv-opt .m { font-weight: 300; font-size: 13px; color: var(--ink-soft); }
a.yv-opt:hover strong { color: var(--accent); }
.yv-opt.soon strong { color: var(--ink-faint); }
.yv-opt.main { border-top-color: var(--ink); }
.yv-back { font-size: 13px; letter-spacing: .08em; color: var(--ink-soft); text-decoration: none; justify-self: start; border-bottom: 1px solid var(--hair); padding-bottom: 3px; }

.yv-side { position: absolute; top: 0; bottom: 0; width: max(48px, calc((100% - var(--pw)) / 2)); border: 0; background: none; padding: 0; cursor: pointer; color: var(--ink-faint); display: flex; align-items: center; justify-content: center; transition: color .3s; }
.yv-side:hover { color: var(--ink); }
.yv-side[disabled] { opacity: 0; pointer-events: none; }
.yv-side.prev { right: 0; } .yv-side.next { left: 0; }
.yv-side svg { width: 14px; height: 28px; }
.yv-side path, .yv-foot path { fill: none; stroke: currentColor; stroke-width: 1.2; }

.yv-foot { grid-row: 4; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; width: min(760px, 100%); margin: 0 auto; padding-bottom: env(safe-area-inset-bottom, 0px); font-family: var(--f-ui); font-weight: 300; font-size: 12px; color: var(--ink-soft); }
.yv-where { justify-self: start; letter-spacing: .04em; }
.yv-ctrl { display: flex; align-items: center; gap: 14px; }
.yv-ctrl button { border: 0; background: none; padding: 10px; cursor: pointer; color: var(--ink-soft); }
.yv-ctrl button[disabled] { color: var(--hair); cursor: default; }
.yv-ctrl svg { width: 8px; height: 14px; display: block; }
.yv-count { font-family: var(--f-mono); font-size: 12px; direction: ltr; min-width: 4.5em; text-align: center; }
.yv-hint { justify-self: end; color: var(--ink-faint); transition: opacity .8s; }
.yv-hint.gone { opacity: 0; }
.yv-bar { position: absolute; inset: auto 0 0; height: 1px; background: var(--hair); }
.yv-bar i { position: absolute; inset: 0 0 0 auto; background: var(--ink); transform-origin: right; transition: width .6s; }

@media (max-width: 860px) {
  .yv { grid-template-rows: calc(52px + env(safe-area-inset-top, 0px)) auto minmax(0, 1fr) calc(58px + env(safe-area-inset-bottom, 0px)); }
  .yv-flow { font-size: 18.5px; line-height: 1.82; }
  .yv-num { font-size: 72px; margin-bottom: 10px; }
  .yv-num.again { text-shadow: -12px 8px 0 #f3f3f0; }
  .yv-head { padding-bottom: 1.1em; }
  .yv-head h2 { font-size: 28px; }
  .yv-side { display: none; }
  .yv-where { display: none; }
  .yv-foot { grid-template-columns: auto 1fr auto; gap: 8px; }
  .yv-ctrl { grid-column: 1; }
  .yv-hint { grid-column: 3; }
  .yv-opt strong { font-size: 24px; }
  .yv-stage { padding-top: 2vh; }
}
@media (max-height: 640px) and (min-width: 861px) {
  .yv-num { font-size: 72px; }
}`;

  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
  const loadRead = () => { try { return new Set(JSON.parse(localStorage.getItem(READ_KEY) || "[]")); } catch (e) { return new Set(); } };
  const saveRead = s => { try { localStorage.setItem(READ_KEY, JSON.stringify([...s])); } catch (e) {} };
  const tocIdx = id => B.toc.findIndex(e => e.id === id);
  const ticks = `<svg viewBox="0 0 20 14" aria-hidden="true"><path class="t1" d="M1.5 7.5l3.6 3.6L12 3.2"/><path class="t2" d="M8.4 10.6l.5.5L16.4 3.2"/></svg>`;
  const chev = dir => `<svg viewBox="0 0 8 14" aria-hidden="true"><path d="${dir === "next" ? "M7 1L1 7l6 6" : "M1 1l6 6-6 6"}"/></svg>`;
  const sideChev = dir => `<svg viewBox="0 0 14 28" aria-hidden="true"><path d="${dir === "next" ? "M13 1L1 14l12 13" : "M1 1l12 13L1 27"}"/></svg>`;

  function head(c, withVoice, first) {
    return `<header class="yv-head${first ? "" : " brk"}" data-ch="${c.id}">
      <span class="yv-num${c.again ? " again" : ""}" aria-hidden="true">${c.num}</span>
      <span class="eyebrow">אני אצל יובל · עמוד ${c.p}${withVoice ? " · " + c.voice : ""}</span>
      <h2>${c.n}</h2>
    </header>${c.paras.map(t => `<p>${t}</p>`).join("")}`;
  }

  function nextInBook(c) {
    const e = B.toc[tocIdx(c.id) + 1];
    return e ? { e, open: !!(e.id && B.stories[e.id]) } : null;
  }

  function chapterEnd(c) {
    const i = CH.indexOf(c), nb = nextInBook(c), ny = CH[i + 1];
    const between = ny ? tocIdx(ny.id) - tocIdx(c.id) - 1 : 0;
    const bookOpt = nb && `<${nb.open ? `a href="#${nb.e.id}"` : "div"} class="yv-opt${nb.open ? "" : " soon"}">
        <span class="eyebrow">להמשיך בספר</span>
        <strong>${esc(nb.e.t + (nb.e.s ? " · " + nb.e.s : ""))}</strong>
        <span class="m">עמוד ${nb.e.p}${nb.open ? "" : " · בקרוב"}</span></${nb.open ? "a" : "div"}>`;
    let jump = "";
    if (ny && between > 0) {
      jump = `<a href="#${ny.id}" class="yv-opt main">
        <span class="eyebrow">לקפוץ לפרק הבא של יובל</span>
        <strong>${ny.n}</strong>
        <span class="m">עמוד ${ny.p} · מדלג על ${between === 1 ? "קטע אחד" : between + " קטעים"}</span></a>`;
    } else if (!ny) {
      jump = `<a href="#yuval-all" class="yv-opt main">
        <span class="eyebrow">עכשיו, הכל ברצף</span>
        <strong>לקרוא את תשעת הפרקים לפי סדר הזמן</strong>
        <span class="m">מפרק מינוס 1 ועד פרק 4</span></a>`;
    }
    return `<section class="yv-end brk"><div class="mark"></div>
      <span class="eyebrow">סוף ${c.n}${ny && !between ? " · הפרק הבא של יובל הוא גם הקטע הבא בספר" : ""}</span>
      <div>${jump}${bookOpt || ""}</div>
      <a class="yv-back" href="#toc">חזרה לתוכן</a><i class="yv-s"></i></section>`;
  }

  function wholeFlow(order) {
    const list = order === "time" ? BYTIME : CH;
    const last = B.toc[tocIdx("yuval-4") + 1];
    const lastOpen = last && last.id && B.stories[last.id];
    return `<section class="yv-cover">
        <span class="eyebrow">כל הפרקים ברצף</span>
        <h1>אני אצל יובל</h1>
        <p>תשעה פרקים שפוזרו בין עמודים ${P0} ו־${P1}. שלושה קולות, ערב אחד.</p>
        <div class="yv-seg" role="group" aria-label="סדר הקריאה">
          <button type="button" data-order="time" aria-pressed="${order === "time"}">לפי סדר הזמן</button>
          <button type="button" data-order="book" aria-pressed="${order === "book"}">לפי סדר הספר</button>
        </div>
        <div class="yv-legend">${order === "time"
          ? "<span>מפרק מינוס 1 ועד פרק 4. כל פרק ״שוב״ בא מיד אחרי הרגע שהוא חוזר אליו.</span>"
          : "<span>באותו סדר שבו הם מופיעים בספר, בלי הקטעים שביניהם.</span>"}
          <span>ליד כל פרק כתוב מי מספרת או מספר אותו.</span></div>
        <button type="button" class="yv-start">להתחיל</button>
      </section>
      ${list.map(c => head(c, true, false)).join("")}
      <section class="yv-end brk"><div class="mark"></div>
        <span class="eyebrow">סוף · אני אצל יובל</span>
        <div>${last ? `<${lastOpen ? `a href="#${last.id}"` : "div"} class="yv-opt main${lastOpen ? "" : " soon"}">
          <span class="eyebrow">להמשיך בספר</span><strong>${esc(last.t)}</strong>
          <span class="m">עמוד ${last.p}${lastOpen ? "" : " · בקרוב"}</span></${lastOpen ? "a" : "div"}>` : ""}</div>
        <a class="yv-back" href="#toc">חזרה לתוכן</a><i class="yv-s"></i></section>`;
  }

  let active = null;

  function mount(root, opts) {
    if (!document.getElementById("yv-css")) {
      const st = document.createElement("style"); st.id = "yv-css"; st.textContent = css;
      document.head.appendChild(st);
    }
    document.documentElement.classList.add("yv-lock");
    const whole = opts.mode === "whole";
    let order = opts.order || "book";
    const read = loadRead();

    root.innerHTML = `<section class="yv${whole && order === "time" ? " time" : ""}" aria-roledescription="ספר">
      <div class="yv-thread" role="navigation" aria-label="פרקי אני אצל יובל"><div class="line"></div></div>
      <div class="yv-stage">
        <button type="button" class="yv-side prev" aria-label="לעמוד הקודם">${sideChev("prev")}</button>
        <div class="yv-window"><div class="yv-flow"></div></div>
        <button type="button" class="yv-side next" aria-label="לעמוד הבא">${sideChev("next")}</button>
      </div>
      <footer class="yv-foot">
        <span class="yv-where"></span>
        <span class="yv-ctrl">
          <button type="button" class="pv" aria-label="לעמוד הקודם">${chev("prev")}</button>
          <span class="yv-count" aria-live="polite"></span>
          <button type="button" class="nx" aria-label="לעמוד הבא">${chev("next")}</button>
        </span>
        <span class="yv-hint"></span>
        <span class="yv-bar"><i></i></span>
      </footer>
    </section>`;
    const yv = root.querySelector(".yv"), thread = root.querySelector(".yv-thread"),
      stage = root.querySelector(".yv-stage"), win = root.querySelector(".yv-window"), flow = root.querySelector(".yv-flow"),
      count = root.querySelector(".yv-count"), where = root.querySelector(".yv-where"), hint = root.querySelector(".yv-hint"),
      barI = root.querySelector(".yv-bar i"), shellBar = document.getElementById("progress");
    const touch = matchMedia("(pointer: coarse)").matches;
    hint.textContent = touch ? "החליקו או הקישו בשולי העמוד" : "חיצים, גלגלת או לחיצה בשוליים";

    /* thread: other pieces as faint dots, chapters as tick marks */
    const others = B.toc.filter(e => e.p > P0 && e.p < P1 && !/^yuval/.test(e.id || ""));
    const pos = p => 3 + (p - P0) / (P1 - P0) * 94;
    const dots = others.map(e => {
      const d = document.createElement("span");
      d.className = "yv-dot"; d.style.right = pos(e.p) + "%"; d.title = `${e.t}${e.s ? " · " + e.s : ""} · ${e.p}`;
      thread.appendChild(d); return d;
    });
    const marks = CH.map(c => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "yv-mark"; b.dataset.id = c.id;
      b.setAttribute("aria-label", `${c.n}, עמוד ${c.p}`);
      b.innerHTML = `${ticks}<span class="lb"></span>`;
      thread.appendChild(b); return b;
    });
    function placeMarks() {
      const time = whole && order === "time";
      // book positions follow page numbers; neighbours (30–32, 36–37) are nudged apart just enough to stay legible
      const minGap = 22 / Math.max(thread.clientWidth, 1) * 100;
      const at = [];
      CH.forEach((c, i) => at.push(i ? Math.max(pos(c.p), at[i - 1] + minGap) : pos(c.p)));
      for (let i = at.length - 1; i >= 0; i--) at[i] = Math.min(at[i], i === at.length - 1 ? 97 : at[i + 1] - minGap);
      CH.forEach((c, i) => {
        const m = marks[i];
        m.style.right = (time ? 3 + BYTIME.indexOf(c) * (94 / 8) : at[i]) + "%";
        m.querySelector(".lb").textContent = time ? c.num + (c.again ? "′" : "") : c.p;
        m.classList.toggle("read", read.has(c.id));
      });
      yv.classList.toggle("time", time);
    }
    placeMarks();

    /* pagination */
    let pw = 0, pg = 0, total = 1, page = 0, starts = [], ranges = [];
    function fill() {
      flow.innerHTML = whole ? wholeFlow(order) : head(opts.ch, false, true) + chapterEnd(opts.ch);
    }
    function layout(keepId) {
      const sw = stage.clientWidth, narrow = innerWidth <= 860;
      pw = Math.floor(Math.min(narrow ? 560 : 600, sw - (narrow ? 8 : 160)));
      pg = 120;
      yv.style.setProperty("--pw", pw + "px");
      win.style.width = pw + "px";
      Object.assign(flow.style, { width: pw + "px", columnWidth: pw + "px", columnGap: pg + "px", transition: "none", transform: "none" });
      const R = flow.getBoundingClientRect().right, step = pw + pg;
      const pageAt = (r) => Math.max(0, Math.round((R - r.right) / step));
      const heads = [...flow.querySelectorAll(".yv-head")];
      starts = heads.map(h => ({ id: h.dataset.ch, page: pageAt(h.getClientRects()[0]) }));
      const s = flow.querySelector(".yv-s").getClientRects();
      total = pageAt(s[s.length - 1]) + 1;
      const endPage = pageAt(flow.querySelector(".yv-end").getClientRects()[0]);
      ranges = starts.map((st, i) => ({ id: st.id, from: st.page, to: (starts[i + 1] ? starts[i + 1].page : endPage) - 1 }));
      flow.offsetWidth; // commit the reset before re-enabling the slide
      flow.style.transition = "";
      const k = keepId && starts.find(x => x.id === keepId);
      go(k ? k.page : Math.min(page, total - 1), false);
    }
    const chapterAt = n => ranges.find(r => n >= r.from && n <= r.to);
    let turned = false;
    function go(n, animate = true) {
      n = Math.max(0, Math.min(total - 1, n));
      if (n !== page && animate) { turned = true; hint.classList.add("gone"); }
      page = n;
      if (!animate || reduced) { flow.style.transition = "none"; }
      flow.style.transform = `translateX(${n * (pw + pg)}px)`;
      if (!animate || reduced) { flow.offsetWidth; flow.style.transition = ""; }
      count.textContent = `${n + 1} / ${total}`;
      const pct = total > 1 ? n / (total - 1) : 1;
      barI.style.width = pct * 100 + "%";
      if (shellBar) shellBar.style.transform = `scaleX(${pct})`;
      root.querySelectorAll(".yv-side.prev, .yv-ctrl .pv").forEach(b => b.disabled = n === 0);
      root.querySelectorAll(".yv-side.next, .yv-ctrl .nx").forEach(b => b.disabled = n === total - 1);
      const r = chapterAt(n), curId = whole ? (r && r.id) : opts.ch.id;
      marks.forEach(m => m.classList.toggle("cur", m.dataset.id === curId));
      const cur = CH.find(c => c.id === curId);
      where.textContent = cur ? `אני אצל יובל · ${cur.n}` : "אני אצל יובל";
      // a chapter counts as read once its last page has been reached
      const done = whole ? (r && n === r.to ? r.id : null) : (n >= total - 2 ? opts.ch.id : null);
      if (done && !read.has(done)) { read.add(done); saveRead(read); placeMarks(); }
    }
    const next = () => go(page + 1), prev = () => go(page - 1);

    /* input */
    const onKey = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowLeft", "PageDown", " "].includes(e.key) || (e.key === "ArrowDown")) { e.preventDefault(); next(); }
      else if (["ArrowRight", "PageUp", "ArrowUp"].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(total - 1); }
    };
    let wheelAcc = 0, wheelLock = 0;
    const onWheel = e => {
      e.preventDefault();
      const now = performance.now();
      if (now < wheelLock) return;
      wheelAcc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : -e.deltaX;
      if (Math.abs(wheelAcc) > 40) { wheelAcc > 0 ? next() : prev(); wheelAcc = 0; wheelLock = now + 700; }
    };
    let tx = null, ty = 0;
    const onTouchStart = e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; };
    const onTouchEnd = e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      tx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { dx > 0 ? next() : prev(); swiped = performance.now(); }
    };
    let swiped = 0;
    stage.addEventListener("click", e => {
      if (e.target.closest("a, button") || performance.now() - swiped < 400) return;
      if (String(getSelection() || "").length) return;
      const r = win.getBoundingClientRect(), x = e.clientX;
      const edge = Math.max(44, r.width * .28);
      if (x < r.left + edge) next(); else if (x > r.right - edge) prev();
    });
    stage.querySelector(".yv-side.next").onclick = next;
    stage.querySelector(".yv-side.prev").onclick = prev;
    root.querySelector(".yv-ctrl .nx").onclick = next;
    root.querySelector(".yv-ctrl .pv").onclick = prev;
    // keep keyboard focus and the page in step; never let the clipped window scroll itself
    win.addEventListener("scroll", () => { win.scrollLeft = 0; win.scrollTop = 0; });
    flow.addEventListener("focusin", e => {
      const r = e.target.getClientRects()[0]; if (!r) return;
      const R = win.getBoundingClientRect().right;
      const delta = Math.round((R - r.right) / (pw + pg));
      if (delta) go(page + delta);
    });
    flow.addEventListener("click", e => {
      const o = e.target.closest("[data-order]");
      if (o && o.dataset.order !== order) setOrder(o.dataset.order);
      if (e.target.closest(".yv-start")) go(1);
    });
    marks.forEach(m => m.addEventListener("click", () => {
      if (!whole) { if (m.dataset.id !== opts.ch.id) location.hash = m.dataset.id; return; }
      const s = starts.find(x => x.id === m.dataset.id); if (s) go(s.page);
    }));
    function setOrder(o) {
      const r = chapterAt(page), keep = r && r.id;
      order = o;
      history.replaceState(null, "", o === "time" ? "#yuval-all" : "#yuval-book");
      fill(); placeMarks(); layout(keep);
    }

    let rz = 0;
    const onResize = () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { const r = chapterAt(page); placeMarks(); layout(whole && r ? r.id : null); }); };
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });

    fill(); layout();
    if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(() => { if (active) layout(); });

    active = () => {
      removeEventListener("keydown", onKey);
      removeEventListener("resize", onResize);
      document.documentElement.classList.remove("yv-lock");
      if (shellBar) shellBar.style.transform = "scaleX(0)";
      active = null;
    };
  }
  const unmount = () => { if (active) active(); };

  const glyph = `<svg viewBox="0 0 40 26" width="44" aria-hidden="true" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14l6.5 6.5L22 6" stroke="#1c1c1a"/><path d="M15.5 19.8l.7.7L28.7 6" stroke="${ACCENT}"/></svg>`;
  const blurb = "תשעה פרקים קצרים שמפוזרים בספר, ולא לפי הסדר. אפשר לקרוא אותם במקום שלהם, לקפוץ מפרק לפרק, ובסוף לקרוא את הכל ברצף, לפי סדר הזמן.";
  CH.forEach(c => B.register({
    id: c.id, series: "yuval", title: "אני אצל יובל", kind: "סיפור בפרקים",
    eyebrow: `סיפור בפרקים · ${CH.length} פרקים · עמודים ${P0}–${P1}`,
    blurb, glyph, accent: ACCENT,
    mount: root => mount(root, { mode: "chapter", ch: c }), unmount
  }));
  [["yuval-all", "time"], ["yuval-book", "book"]].forEach(([id, order]) => B.register({
    id, series: "yuval", title: "אני אצל יובל", kind: "סיפור בפרקים", accent: ACCENT,
    mount: root => mount(root, { mode: "whole", order }), unmount
  }));
})();
