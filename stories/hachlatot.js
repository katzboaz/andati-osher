/* החלטות — a man at a bar after leaving. Beside the text, his glass: nearly
   empty at the start, a fresh one when he orders, a third of a Stella, half
   drunk. The beer level is the only thing that changes. */
(() => {
  const { steps, register } = window.KIT;
  const F = [
    { lvl: .07, p: ["ישבתי בבר בקצה הרחוב, משחק בתחתית של כוס הבירה. מהרהר אם אני מצטער על ההחלטה שלקחתי.", "לפני שעה הנחתי את העצב על השידה שליד המיטה שלה. ידעתי שהיא תמצא אותו כשתחזור הביתה.", "השארתי את המזגן דולק, כמו שהיא אוהבת. שהטמפרטורות ינזלו ממנה ברגע שהיא תפתח את הדלת."] },
    { lvl: .07, p: ["תמיד היא היתה יותר חמה ממני. לא משנה כמה הייתי מנסה לקרר אותה. לאורך השנים התרגלתי לכל הכוויות שהיא גרמה לי. חלקן לא החלימו מעולם. את האחרונה שעל יד ימין קיבלתי בשבוע שעבר באמצע הלילה כשהיא נכנסה מתנדנדת אחרי יציאה עם חברות. היא נכנסה למיטה, מריחה מעשן של ווג מנטה. מסובבת אלי את הגב, נותנת לי מכה קטנה עם המרפק, \"חבק אותי!\" ואני מחבק ושם לב שהיא בלי החזייה שיצאה איתה מהבית. כוויה."] },
    { lvl: 0, p: ["\"עוד סטלה בבקשה\".", "מביט לצד השני של הרחוב.", "אמנם היא הזהירה מראש שהיא רק עוברת כאן לרגע, אבל לא הנחתי שתתן לאותו רגע כל כך הרבה זמן. תוהה לעצמי אם באמת רק נתקלה בי או שאכן הייתי אבן דרך."] },
    { lvl: .92, p: ["\"בבקשה. שליש סטלה\".", "אף פעם לא הייתי איש של חצי. אני שותה את הבירה לאט, שונא שהיא מתחממת לי.", "את כל הרגעים שלנו הפכת לשלך. התרגלתי לזה יחסית מהר, נתתי לך להנות מהם. את כל היציאות שלנו שכחת אבל אני זכרתי. הכל. כל פרט ופרט מהן, איך סחבתי אותך הביתה יחפה, שיכורה ומעורפלת. מאושרת."] },
    { lvl: .46, p: ["שתיתי חצי כוס.", "\"בבקשה, שליש סטלה\". מופתע, הרמתי את הראש למלצרית.", "רואה אותה מולי, מגישה לי את העצב עם תוספת של אושר בצלחת קטנה ליד הבירה.", "\"זה לא מה שהזמנתי\" אמרתי לה.", "\"אבל זה מה שאתה אוהב\" היא ענתה עם חצי חיוך.", "\"חשבון בבקשה\"."] }
  ];
  // a pint glass: wider at the top; the beer is a rect clipped to the inside
  const TOP = 40, BOT = 250;
  const ART = `<svg viewBox="0 0 200 280">
    <defs><clipPath id="hc-in"><path d="M48 ${TOP + 2} L152 ${TOP + 2} L141 ${BOT - 2} L59 ${BOT - 2} Z"/></clipPath></defs>
    <g clip-path="url(#hc-in)"><rect class="hc-beer" x="40" y="${TOP}" width="120" height="${BOT - TOP}"/><rect class="hc-foam" x="40" y="${TOP}" width="120" height="7"/></g>
    <path d="M46 ${TOP} L154 ${TOP} L142 ${BOT} L58 ${BOT} Z" fill="none" stroke="var(--ink)" stroke-width="1"/>
  </svg>`;

  register({
    id: "hachlatot", title: "החלטות", p: 74, kind: "סיפור קצר", accent: "#c8a04a",
    blurb: "בר בקצה הרחוב, כוס בירה שמתרוקנת, ושליש סטלה שלא הזמין.",
    glyph: `<svg viewBox="0 0 44 22" width="44" height="22"><path d="M15 2H29L27 20H17Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16.3 11H27.7L27 20H17Z" fill="#c8a04a"/></svg>`,
    css: `
.hc .hc-beer { fill: var(--accent); opacity: .78; transform-box: view-box; transition: transform 1.6s cubic-bezier(.5,.1,.25,1); }
.hc .hc-foam { fill: #f2ead8; transform-box: view-box; transition: transform 1.6s cubic-bezier(.5,.1,.25,1), opacity .6s; }
.hc .ks-art svg { max-width: 260px; }`,
    mount(root, ctx) {
      const H = BOT - TOP;
      const set = (el, lvl) => {
        const y = (1 - lvl) * H;
        el.querySelector(".hc-beer").style.transform = `translateY(${y}px)`;
        const foam = el.querySelector(".hc-foam");
        foam.style.transform = `translateY(${Math.min(y, H - 1)}px)`;
        foam.style.opacity = lvl > .2 ? 1 : 0;
      };
      return steps(root, ctx, {
        p: 74, title: "החלטות", meta: "סיפור קצר · שתי דקות קריאה", cls: "hc", art: ART,
        frames: F.map(f => ({ cls: "prose", html: f.p.map(x => `<p>${x}</p>`).join("") })),
        onFrame(n, el) { set(el, n === 0 ? .07 : n > F.length ? 0 : F[n - 1].lvl); }
      });
    }
  });
})();
