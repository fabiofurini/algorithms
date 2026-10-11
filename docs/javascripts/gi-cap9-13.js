/* Grafici interattivi dei capitoli 9 e 13 di «Algoritmi / Algorithms» (JSXGraph).
 *
 * Ricette per il motore interattivi.js (formato documentato nel commento in
 * testa al motore); ognuna si registra in window.GI_RICETTE:
 *   crescita     ordini di crescita: log2 n, n, n log2 n, n^2, n^3, 2^n
 *                (pulsanti per accenderle), cursore n, scala lineare o
 *                logaritmica, valori e tempo stimato a 10^9 operazioni al
 *                secondo (cap. 9, «Asymptotic growth»)
 *   invariante   FindMaximum passo per passo: a ogni valutazione della
 *                condizione del ciclo si verifica l'invariante
 *                max = max{a[1], …, a[i-1]}; inizializzazione, mantenimento,
 *                terminazione; due versioni sbagliate mostrano che cosa
 *                succede quando l'invariante o la condizione d'uscita non
 *                vanno (cap. 13, «Correctness»)
 *
 * Notazione come nelle note EN (09_ASYMPTOTIC_GROWTH, 13_CORRECTNESS): array con
 * indici da 1, pseudocodice di FindMaximum con le righe numerate come nelle
 * note. Nessuna etichetta di testo sul grafico: valori e spiegazioni stanno
 * nelle letture e nella legenda.
 */
(function () {
  "use strict";
  const GI = window.GI;
  const T = GI.T, num = GI.num;

  const tinta = (c, html) => `<strong style="color:${c}">${html}</strong>`;
  const colTex = (c, tex) => `{\\color{${c}}{${tex}}}`;
  const scuro = () => (document.body && document.body.getAttribute("data-md-color-scheme")) === "slate";

  // colonna destra del grafico (dove stanno pulsanti e cursori)
  const colonnaDestra = (st) => {
    const c = st.el.querySelector(".gi-corpo");
    return c ? c.children[1] : null;
  };

  // numeri grandi: mantissa · 10^e (TeX) oppure valore con due decimali
  const sci = (x, cifre = 2) => {
    if (!isFinite(x)) return "\\infty";
    if (Math.abs(x) < 1e6) return num(x, Math.abs(x) < 100 && !Number.isInteger(x) ? cifre : 0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1\\,");
    const e = Math.floor(Math.log10(Math.abs(x)));
    let m = x / Math.pow(10, e), ee = e;
    const p = Math.pow(10, cifre);
    if (Math.round(m * p) / p >= 10) { m /= 10; ee++; }
    return Math.round(m * p) / p === 1 ? `10^{${ee}}` : `${num(m, cifre)} \\cdot 10^{${ee}}`;
  };
  // esponente in caratteri Unicode (le etichette degli assi sono testo SVG)
  const apice = (e) => String(e).split("").map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"["0123456789".indexOf(c)] || (c === "-" ? "⁻" : c)).join("");
  // lo stesso numero come testo (etichette degli assi)
  const sciHtml = (x) => {
    if (Math.abs(x) < 1e5) return GI.numTxt(x, 2);
    const e = Math.floor(Math.log10(Math.abs(x) * 1.0000001));
    const m = x / Math.pow(10, e);
    const ms = Math.abs(m - 1) < 1e-6 ? "" : GI.numTxt(m, 1) + "·";
    return `${ms}10${apice(e)}`;
  };

  // ================================================================
  // 1. Ordini di crescita (cap. 9)
  // ================================================================
  const FUNZ = [
    { k: "log", tex: "\\log_2 n", f: (n) => Math.log2(n), col: "c", da: 1 },
    { k: "n", tex: "n", f: (n) => n, col: "b", da: 0 },
    { k: "nlog", tex: "n \\log_2 n", f: (n) => n * Math.log2(n), col: "ottimo", da: 1 },
    { k: "n2", tex: "n^2", f: (n) => n * n, col: "e", da: 0 },
    { k: "n3", tex: "n^3", f: (n) => n * n * n, col: "a", da: 0 },
    { k: "exp", tex: "2^n", f: (n) => Math.pow(2, n), col: "locale", da: 0 },
  ];
  const OPS = 1e9; // operazioni al secondo
  const ANNO = 365.25 * 86400, UNIVERSO = 1.38e10; // età dell'universo in anni

  // tempo in secondi -> TeX con l'unità più leggibile
  const tempo = (s) => {
    const u = (v, it, en) => `${sci(v, v < 10 ? 2 : v < 100 ? 1 : 0)}\\ \\text{${T(it, en)}}`;
    if (s < 1e-6) return u(s * 1e9, "ns", "ns");
    if (s < 1e-3) return u(s * 1e6, "µs", "µs");
    if (s < 1) return u(s * 1e3, "ms", "ms");
    if (s < 60) return u(s, "s", "s");
    if (s < 3600) return u(s / 60, "min", "min");
    if (s < 86400) return u(s / 3600, "ore", "hours");
    if (s < ANNO) return u(s / 86400, "giorni", "days");
    return u(s / ANNO, "anni", "years");
  };

  const attive = (st) => {
    if (!st.dati.attive) st.dati.attive = { log: true, n: true, nlog: true, n2: true, n3: false, exp: true };
    return st.dati.attive;
  };
  const logScala = (st) => st.chiave() === "log";
  const finestra = (st) => {
    const n = st.p().n, X = Math.max(6, n * 1.25);
    const on = FUNZ.filter((F) => attive(st)[F.k]);
    if (logScala(st)) {
      let top = 1;
      for (const F of on) top = Math.max(top, Math.log10(Math.max(F.f(X), 1e-9)));
      top = top * 1.08 + 0.3;
      return [-0.13 * X, top, X, -0.09 * top - 0.3];
    }
    let top = 1;
    for (const F of on) top = Math.max(top, F.f(n));
    top *= 1.25;
    return [-0.13 * X, top, X, -0.09 * top];
  };

  // pulsanti a interruttore per accendere le funzioni (si creano una volta sola)
  const pulsantiFunzioni = (st) => {
    const dx = colonnaDestra(st);
    if (!dx || dx.querySelector(".gi-chips.gi-crescita")) return;
    const A = attive(st);
    const tit = GI.h("div", {}, `<strong>${T("Funzioni", "Functions")}</strong>`);
    const chips = GI.h("div", { class: "gi-chips gi-crescita" });
    for (const F of FUNZ) {
      const b = GI.h("button", { class: "gi-chip", "aria-pressed": String(!!A[F.k]) }, `\\(${F.tex}\\)`);
      b.style.borderColor = `var(--gi-${F.col})`;
      b.onclick = () => {
        A[F.k] = !A[F.k];
        if (!FUNZ.some((G) => A[G.k])) A[F.k] = true; // almeno una accesa
        b.setAttribute("aria-pressed", String(!!A[F.k]));
        st.dati.legendaVecchia = true;
        st.aggiorna();
      };
      chips.append(b);
    }
    const primo = dx.querySelector(".gi-ctrl");
    dx.insertBefore(tit, primo);
    dx.insertBefore(chips, primo);
    GI.typeset(tit); GI.typeset(chips);
  };

  window.GI_RICETTE = window.GI_RICETTE || {};

  window.GI_RICETTE["crescita"] = {
    titolo: T("Ordini di crescita", "Orders of growth"),
    sottotitolo: T("quanti passi, e quanto tempo, al crescere di \\(n\\)", "how many steps, and how much time, as \\(n\\) grows"),
    funzioni: {
      lin: { tex: "", etichetta: T("lineare", "linear") },
      log: { tex: "", etichetta: T("logaritmica", "logarithmic") },
    },
    iniziale: "lin",
    etichettaFunzioni: T("Scala dell'asse verticale", "Scale of the vertical axis"),
    parametri: [
      { k: "n", nome: "n", min: 1, max: 100, step: 1, val: 10, colore: "var(--gi-muted)", cifre: 0,
        descr: T("dimensione dell'input; la finestra va da \\(0\\) a circa \\(1{,}25\\,n\\)",
          "input size; the window goes from \\(0\\) to about \\(1.25\\,n\\)") },
    ],
    vista: (k, st) => finestra(st),
    rapporto: "4 / 3",
    legenda: (st) => FUNZ.filter((F) => attive(st)[F.k]).map((F) => [F.col, `\\(${F.tex}\\)`, ""])
      .concat([["orig", T("valore attuale di \\(n\\)", "current value of \\(n\\)"), "dashed"]]),
    monta(board, st) {
      pulsantiFunzioni(st);
      const LOG = logScala(st);
      const y = (F, x) => {
        const v = F.f(x);
        return LOG ? (v > 0 ? Math.log10(v) : NaN) : v;
      };
      // etichette dell'asse verticale: 10^k in scala logaritmica, notazione compatta in quella lineare
      try {
        const ty = board.defaultAxes.y.defaultTicks;
        ty.generateLabelText = function (tick, zero, value) {
          const v = value != null ? +value : tick.usrCoords[2];
          if (LOG && Math.abs(v) < 1e-12) return "1";
          if (Math.abs(v) < 1e-12) return "";
          if (LOG) return Math.abs(v - Math.round(v)) < 1e-9 ? "10" + apice(Math.round(v)) : "";
          return sciHtml(v);
        };
        const tx = board.defaultAxes.x.defaultTicks;
        tx.setAttribute({ minorTicks: 0 });
        tx.generateLabelText = function (tick, zero, value) {
          const v = value != null ? +value : tick.usrCoords[1];
          return v > 0 ? GI.numTxt(v, 2) : "";
        };
        ty.setAttribute({ minorTicks: 0 });
      } catch (e) { /* assi senza tacche */ }
      for (const F of FUNZ) {
        const c = st.colore(F.col);
        board.create("functiongraph", [(x) => y(F, x), LOG ? (F.k === "log" || F.k === "nlog" ? 2 : 1) : F.da, () => board.getBoundingBox()[2]], {
          strokeColor: c, strokeWidth: 2.6, highlight: false, visible: () => !!attive(st)[F.k],
        });
        board.create("point", [() => st.p().n, () => y(F, st.p().n)], {
          name: "", fixed: true, size: 3.5, fillColor: c, strokeColor: c, showInfobox: false, highlight: false,
          withLabel: false, visible: () => !!attive(st)[F.k] && isFinite(y(F, st.p().n)),
        });
      }
      board.create("line", [[() => st.p().n, 0], [() => st.p().n, 1]], {
        strokeColor: st.colore("orig"), strokeWidth: 1.4, dash: 2, fixed: true, highlight: false, withLabel: false,
      });
    },
    aggiorna(board, st) {
      board.setBoundingBox(finestra(st), false);
      if (st.dati.legendaVecchia) {
        // la legenda dipende dalle funzioni accese: si riscrive ricreando la board
        st.dati.legendaVecchia = false;
        const leg = st.el.querySelector(".gi-legenda");
        if (leg) {
          leg.innerHTML = GI.mj(FUNZ.filter((F) => attive(st)[F.k]).map((F) =>
            `<span><i style="border-color:var(--gi-${F.col});border-top-style:solid"></i>\\(${F.tex}\\)</span>`).join("") +
            `<span><i style="border-color:var(--gi-orig);border-top-style:dashed"></i>${T("valore attuale di \\(n\\)", "current value of \\(n\\)")}</span>`);
          GI.typeset(leg);
        }
      }
    },
    formula(p, st) {
      return logScala(st)
        ? `n = ${p.n}:\\quad \\text{${T("asse verticale in scala logaritmica", "vertical axis on a logarithmic scale")}}`
        : `n = ${p.n}:\\quad \\text{${T("asse verticale in scala lineare", "vertical axis on a linear scale")}}`;
    },
    letture(p, st) {
      const n = p.n, A = attive(st);
      const righe = FUNZ.map((F) => {
        const v = F.f(n), s = v / OPS, c = st.colore(F.col);
        const nome = A[F.k] ? `\\(${colTex(c, F.tex)}\\)` : `<span style="opacity:.55">\\(${F.tex}\\)</span>`;
        return [nome, `\\(${sci(v)}\\)`, `\\(${tempo(s)}\\)`];
      });
      let r = T(`Passi e tempo stimato per \\(n = ${n}\\), a \\(10^9\\) operazioni al secondo:`,
        `Steps and estimated time for \\(n = ${n}\\), at \\(10^9\\) operations per second:`);
      r += GI.tabella(righe, ["\\(f(n)\\)", T("passi", "steps"), T("tempo", "time")]);
      const anni = Math.pow(2, n) / OPS / ANNO;
      if (anni > UNIVERSO) {
        r += T(`Con \\(2^n\\) servirebbero circa \\(${sci(anni / UNIVERSO, 1)}\\) volte l'età dell'universo <span style="white-space:nowrap">(\\(1{,}38 \\cdot 10^{10}\\) anni)</span>.`,
          `With \\(2^n\\) it would take about \\(${sci(anni / UNIVERSO, 1)}\\) times the age of the universe <span style="white-space:nowrap">(\\(1.38 \\cdot 10^{10}\\) years)</span>.`);
      } else if (anni > 1) {
        r += T("Con \\(2^n\\) il tempo si misura già in anni: ogni \\(+1\\) su \\(n\\) lo raddoppia.",
          "With \\(2^n\\) the time is already measured in years: each \\(+1\\) on \\(n\\) doubles it.");
      } else {
        // da quale n la più grande delle funzioni polinomiali accese supera 2^n per sempre
        r += T("Per \\(n \\ge 10\\) vale \\(n^3 < 2^n\\): da lì in poi l'esponenziale stacca ogni polinomio della tabella.",
          "For \\(n \\ge 10\\) we have \\(n^3 < 2^n\\): from there on the exponential leaves every polynomial of the table behind.");
      }
      return r;
    },
    domanda: T("In scala lineare porta \\(n\\) da \\(5\\) a \\(30\\): quale curva schiaccia tutte le altre contro l'asse? Passa alla scala logaritmica: le potenze \\(n^k\\) diventano curve che si appiattiscono, \\(2^n\\) una retta. Per quale \\(n\\) il tempo di \\(2^n\\) supera un giorno? E quello di \\(n^3\\)?",
      "On the linear scale move \\(n\\) from \\(5\\) to \\(30\\): which curve squashes all the others against the axis? Switch to the logarithmic scale: the powers \\(n^k\\) become curves that flatten out, \\(2^n\\) a straight line. For which \\(n\\) does the time of \\(2^n\\) exceed one day? And that of \\(n^3\\)?"),
  };

  // ================================================================
  // 2. L'invariante di ciclo di FindMaximum (cap. 13)
  // ================================================================
  // varianti: confronto (">" corretto, "<" sbagliato) e condizione del ciclo ("le": i <= n, "lt": i < n)
  const ESEMPI = {
    note: { a: [9, 12, 3, 16, 19, 11, 12], cmp: ">", cond: "le",
      etichetta: T("esempio delle note", "example of the notes") },
    cresc: { a: [2, 5, 7, 10, 13, 15, 18], cmp: ">", cond: "le", etichetta: T("crescente", "increasing") },
    decr: { a: [18, 15, 13, 10, 7, 5, 2], cmp: ">", cond: "le", etichetta: T("decrescente", "decreasing") },
    errCmp: { a: [9, 12, 3, 16, 19, 11, 12], cmp: "<", cond: "le",
      etichetta: T("errore: \\(a[i] < \\mathit{max}\\)", "bug: \\(a[i] < \\mathit{max}\\)") },
    errCond: { a: [9, 12, 3, 16, 11, 7, 21], cmp: ">", cond: "lt",
      etichetta: T("errore: \\(i < n\\)", "bug: \\(i < n\\)") },
  };
  const MAXV = "\\mathit{max}";
  const lista = (v) => `[${v.join(",\\,")}]`;

  // esecuzione: uno stato per ogni valutazione della condizione del ciclo (riga 3)
  const cacheEsec = {};
  const esegui = (k) => {
    if (cacheEsec[k]) return cacheEsec[k];
    const E = ESEMPI[k], a = E.a, n = a.length, stati = [];
    let mx = a[0], i = 2;
    for (let it = 0; it < 100; it++) {
      const vero = Math.max(...a.slice(0, i - 1));
      const cond = E.cond === "le" ? i <= n : i < n;
      const s = { i, mx, vero, inv: mx === vero, cond };
      stati.push(s);
      if (!cond) break;
      const ai = a[i - 1];
      s.ai = ai;
      s.prende = E.cmp === ">" ? ai > mx : ai < mx;
      if (s.prende) mx = ai;
      i++;
    }
    const R = { E, a, n, stati, K: stati.length - 1, giusto: Math.max(...a) };
    return (cacheEsec[k] = R);
  };
  const statoCorrente = (st) => {
    const R = esegui(st.chiave()), k = Math.max(0, Math.min(R.K, Math.round(st.p().k || 0)));
    return { R, k, s: R.stati[k] };
  };
  const preparaK = (st) => {
    const k = st.chiave(), R = esegui(k), inp = st.el.querySelector(".gi-ctrl input[type=range]");
    if (!inp) return;
    inp.max = R.K;
    if (st.dati.ultima !== k) inp.value = 0;
    st.dati.ultima = k;
  };

  // colori del grafico delle barre
  const COLI = (st) => ({
    esaminato: st.colore("b"), corrente: st.colore("a"), futuro: st.colore("orig"),
    max: st.colore("ottimo"), vero: st.colore("ammissibile"),
    ok: scuro() ? "#69DB7C" : "#2F9E44", ko: st.colore("ammissibile"),
  });

  // pseudocodice di FindMaximum (righe numerate come nelle note), riga attiva evidenziata
  const pseudo = (E, attiva, C) => {
    const cond = E.cond === "le" ? "i \\le n" : "i < n";
    const cmp = E.cmp === ">" ? "a[i] > " + MAXV : "a[i] < " + MAXV;
    const errCond = E.cond !== "le", errCmp = E.cmp !== ">";
    const kw = (s) => `<strong>${s}</strong>`;
    const righe = [
      [1, `\\(${MAXV} := a[1]\\)`, 0],
      [2, "\\(i := 2\\)", 0],
      [3, `${kw("while")} \\(${errCond ? colTex(C.ko, cond) : cond}\\) ${kw("do")}`, 0],
      [4, `${kw("if")} \\(${errCmp ? colTex(C.ko, cmp) : cmp}\\) ${kw("then")}`, 1],
      [5, `\\(${MAXV} \\leftarrow a[i]\\)`, 2],
      [6, "\\(i \\leftarrow i + 1\\)", 1],
      [7, `${kw("return")} \\(${MAXV}\\)`, 0],
    ];
    return `<div style="font-size:.92em;line-height:1.45;margin:.2em 0 .5em">` + righe.map(([r, t, ind]) => {
      const on = attiva.includes(r);
      return `<div style="padding:0 .4em;border-radius:5px;${on ? `background:color-mix(in srgb, ${C.corrente} 18%, transparent)` : ""}">` +
        `<span style="display:inline-block;width:1.4em;color:var(--gi-muted)">${r}</span>` +
        `<span style="padding-left:${ind * 1.2}em">${t}</span></div>`;
    }).join("") + "</div>";
  };

  window.GI_RICETTE["invariante"] = {
    titolo: T("L'invariante di ciclo di FindMaximum", "The loop invariant of FindMaximum"),
    sottotitolo: T("vero prima del ciclo, vero dopo ogni iterazione, utile all'uscita",
      "true before the loop, true after each iteration, useful at the exit"),
    funzioni: Object.fromEntries(Object.entries(ESEMPI).map(([k, v]) => [k, { tex: "", etichetta: v.etichetta }])),
    iniziale: "note",
    etichettaFunzioni: T("Array e versione dell'algoritmo", "Array and version of the algorithm"),
    parametri: [
      { k: "k", nome: "k", min: 0, max: 6, step: 1, val: 0, colore: "a", cifre: 0,
        descr: T("valutazione numero \\(k\\) della condizione alla riga 3 (\\(k = 0\\): prima del ciclo); premi ▶ per eseguire il ciclo",
          "evaluation number \\(k\\) of the condition at line 3 (\\(k = 0\\): before the loop); press ▶ to run the loop") },
    ],
    vista: (chiave) => {
      const a = ESEMPI[chiave].a, M = Math.max(...a);
      return [-0.6, M * 1.18, a.length + 0.8, -M * 0.1];
    },
    legenda: (st) => {
      const C = COLI(st);
      return [
        [C.esaminato, T("\\(a[1..i-1]\\), già esaminati", "\\(a[1..i-1]\\), already examined"), "pieno"],
        [C.corrente, T("\\(a[i]\\), il prossimo confronto", "\\(a[i]\\), the next comparison"), "pieno"],
        [C.futuro, T("non ancora esaminati", "not yet examined"), "pieno"],
        [C.max, T("valore di \\(\\mathit{max}\\)", "value of \\(\\mathit{max}\\)"), ""],
        [C.vero, T("\\(\\max\\{a[1],\\dots,a[i-1]\\}\\), se diverso", "\\(\\max\\{a[1],\\dots,a[i-1]\\}\\), if different"), "dashed"],
      ];
    },
    monta(board, st) {
      preparaK(st);
      const R = esegui(st.chiave()), C = COLI(st);
      const cur = () => statoCorrente(st).s;
      try {
        const tx = board.defaultAxes.x.defaultTicks;
        tx.setAttribute({ ticksDistance: 1, insertTicks: false, minorTicks: 0, drawZero: false });
        tx.generateLabelText = function (tick, zero, value) {
          const v = value != null ? +value : tick.usrCoords[1];
          return v >= 1 && v <= R.n && Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : "";
        };
        board.defaultAxes.y.defaultTicks.setAttribute({ minorTicks: 0 });
      } catch (e) { /* assi senza tacche */ }
      const w = 0.34;
      R.a.forEach((v, j0) => {
        const j = j0 + 1, P = [[j - w, 0], [j + w, 0], [j + w, v], [j - w, v], [j - w, 0]];
        const stato = () => { const s = cur(); return j < s.i ? "esaminato" : j === s.i && s.cond ? "corrente" : "futuro"; };
        for (const nome of ["esaminato", "corrente", "futuro"]) {
          GI.spezzata(board, () => P, {
            strokeColor: C[nome], fillColor: C[nome], fillOpacity: nome === "futuro" ? 0.18 : 0.45, strokeWidth: 1.5,
            fixed: true, visible: () => stato() === nome,
          });
        }
      });
      // max sopra la parte esaminata (e, tratteggiata, oltre)
      board.create("segment", [[0.45, () => cur().mx], [() => cur().i - 0.5, () => cur().mx]], {
        strokeColor: C.max, strokeWidth: 3, fixed: true, highlight: false, withLabel: false,
      });
      board.create("segment", [[() => cur().i - 0.5, () => cur().mx], [R.n + 0.6, () => cur().mx]], {
        strokeColor: C.max, strokeWidth: 1.2, dash: 2, fixed: true, highlight: false, withLabel: false,
        visible: () => cur().i - 0.5 < R.n + 0.6,
      });
      // il vero massimo del prefisso, quando l'invariante è falso
      board.create("segment", [[0.45, () => cur().vero], [() => cur().i - 0.5, () => cur().vero]], {
        strokeColor: C.vero, strokeWidth: 2.4, dash: 2, fixed: true, highlight: false, withLabel: false,
        visible: () => !cur().inv,
      });
      // separatore fra parte esaminata e resto
      board.create("segment", [[() => cur().i - 0.5, 0], [() => cur().i - 0.5, () => board.getBoundingBox()[1]]], {
        strokeColor: st.colore("muted"), strokeWidth: 1, dash: 1, fixed: true, highlight: false, withLabel: false,
      });
    },
    formula(p, st) {
      const { k, s, R } = statoCorrente(st), C = COLI(st);
      const ok = s.inv ? colTex(C.ok, T("\\text{vero}", "\\text{true}")) : colTex(C.ko, T("\\text{falso}", "\\text{false}"));
      const pre = s.i - 1 === 1 ? "a[1]" : s.i - 1 === 2 ? "a[1], a[2]" : `a[1],\\dots,a[${s.i - 1}]`;
      return `\\(k = ${k},\\ i = ${s.i},\\ ${MAXV} = ${s.mx}:\\)&ensp;\\(${MAXV} \\overset{?}{=} \\max\\{${pre}\\}\\colon\\ ${ok}\\)`;
    },
    letture(p, st) {
      const { R, k, s } = statoCorrente(st), C = COLI(st), E = R.E;
      const fin = !s.cond;
      let r = pseudo(E, fin ? [3, 7] : [3], C);
      r += T(`\\(a = ${lista(R.a)}\\), \\(n = ${R.n}\\).<br>`, `\\(a = ${lista(R.a)}\\), \\(n = ${R.n}\\).<br>`);
      const pref = R.a.slice(0, s.i - 1);
      const esito = s.inv ? tinta(C.ok, T("vero", "true")) : tinta(C.ko, T("falso", "false"));
      r += T(`<strong>Invariante</strong> (riga 3, valutazione \\(${k}\\)): \\(${MAXV} = ${s.mx}\\), \\(\\max\\{${pref.join(",\\,")}\\} = ${s.vero}\\): ${esito}.<br>`,
        `<strong>Invariant</strong> (line 3, evaluation \\(${k}\\)): \\(${MAXV} = ${s.mx}\\), \\(\\max\\{${pref.join(",\\,")}\\} = ${s.vero}\\): ${esito}.<br>`);
      // fase della dimostrazione
      if (k === 0) {
        r += T(`<strong>Inizializzazione.</strong> Le righe 1-2 pongono \\(${MAXV} = a[1] = ${R.a[0]}\\) e \\(i = 2\\): il sotto-array \\(a[1..1]\\) ha il solo elemento \\(a[1]\\), quindi l'invariante vale.`,
          `<strong>Initialization.</strong> Lines 1-2 set \\(${MAXV} = a[1] = ${R.a[0]}\\) and \\(i = 2\\): the sub-array \\(a[1..1]\\) has the single element \\(a[1]\\), so the invariant holds.`);
      } else {
        const q = R.stati[k - 1], cmp = E.cmp === ">" ? ">" : "<", ncmp = E.cmp === ">" ? "\\le" : "\\ge";
        const conf = q.prende
          ? T(`\\(a[${q.i}] = ${q.ai} ${cmp} ${q.mx}\\): la riga 5 pone \\(${MAXV} \\leftarrow ${q.ai}\\)`,
            `\\(a[${q.i}] = ${q.ai} ${cmp} ${q.mx}\\): line 5 sets \\(${MAXV} \\leftarrow ${q.ai}\\)`)
          : T(`\\(a[${q.i}] = ${q.ai} ${ncmp} ${q.mx}\\): \\(${MAXV}\\) non cambia`,
            `\\(a[${q.i}] = ${q.ai} ${ncmp} ${q.mx}\\): \\(${MAXV}\\) does not change`);
        r += T(`<strong>Mantenimento.</strong> Iterazione con \\(i = ${q.i}\\): ${conf}; la riga 6 porta \\(i\\) a \\(${s.i}\\). `,
          `<strong>Maintenance.</strong> Iteration with \\(i = ${q.i}\\): ${conf}; line 6 brings \\(i\\) to \\(${s.i}\\). `);
        if (q.inv && !s.inv) {
          r += T(`L'invariante era vero e ora è ${tinta(C.ko, "falso")}: con il confronto \\(<\\) il corpo del ciclo non lo mantiene, e la dimostrazione si ferma qui.`,
            `The invariant was true and now it is ${tinta(C.ko, "false")}: with the comparison \\(<\\) the body of the loop does not maintain it, and the proof stops here.`);
        } else if (s.inv) {
          r += T("Da vero prima dell'iterazione, l'invariante è vero anche dopo.", "True before the iteration, the invariant is true after it as well.");
        } else {
          r += T("L'invariante resta falso.", "The invariant stays false.");
        }
      }
      r += "<br>";
      // funzione che decresce e terminazione
      const resto = E.cond === "le" ? R.n - s.i + 1 : R.n - s.i;
      const nomeResto = E.cond === "le" ? "n - i + 1" : "n - i";
      if (!fin) {
        r += T(`La condizione \\(${E.cond === "le" ? "i \\le n" : "i < n"}\\) è vera; \\(${nomeResto} = ${resto}\\) decresce di \\(1\\) a ogni iterazione.`,
          `The condition \\(${E.cond === "le" ? "i \\le n" : "i < n"}\\) is true; \\(${nomeResto} = ${resto}\\) decreases by \\(1\\) at each iteration.`);
      } else {
        const giusto = s.mx === R.giusto;
        r += T(`<strong>Terminazione.</strong> \\(${nomeResto} = 0\\): la condizione è falsa con \\(i = ${s.i}\\), dopo \\(${k}\\) iterazioni. `,
          `<strong>Termination.</strong> \\(${nomeResto} = 0\\): the condition is false with \\(i = ${s.i}\\), after \\(${k}\\) iterations. `);
        if (E.cond === "le" && s.inv) {
          r += T(`Con \\(i = n + 1\\) l'invariante dà \\(${MAXV} = \\max\\{a[1],\\dots,a[n]\\} = ${s.mx}\\): la riga 7 restituisce ${tinta(C.ok, "il massimo")}. L'algoritmo è corretto.`,
            `With \\(i = n + 1\\) the invariant gives \\(${MAXV} = \\max\\{a[1],\\dots,a[n]\\} = ${s.mx}\\): line 7 returns ${tinta(C.ok, "the maximum")}. The algorithm is correct.`);
        } else if (E.cond !== "le") {
          r += T(`L'invariante è vero, ma con \\(i = n\\) dice solo \\(${MAXV} = \\max\\{a[1],\\dots,a[n-1]\\} = ${s.mx}\\): \\(a[n] = ${R.a[R.n - 1]}\\) non è mai stato esaminato, e la riga 7 restituisce ${tinta(C.ko, s.mx)} invece di \\(${R.giusto}\\). Invariante giusto, condizione d'uscita sbagliata.`,
            `The invariant is true, but with \\(i = n\\) it only says \\(${MAXV} = \\max\\{a[1],\\dots,a[n-1]\\} = ${s.mx}\\): \\(a[n] = ${R.a[R.n - 1]}\\) was never examined, and line 7 returns ${tinta(C.ko, s.mx)} instead of \\(${R.giusto}\\). Right invariant, wrong exit condition.`);
        } else {
          r += T(`L'invariante è falso, quindi non garantisce nulla: la riga 7 restituisce \\(${s.mx}\\)${giusto ? "" : `, mentre il massimo è \\(${R.giusto}\\)`}.`,
            `The invariant is false, so it guarantees nothing: line 7 returns \\(${s.mx}\\)${giusto ? "" : `, while the maximum is \\(${R.giusto}\\)`}.`);
        }
      }
      // storia: la tabella delle note fino alla valutazione k
      const righe = R.stati.slice(0, k + 1).map((q) => [
        `\\(${q.i}\\)`, `\\(${q.mx}\\)`, `\\(${q.vero}\\)`,
        q.inv ? tinta(C.ok, "✓") : tinta(C.ko, "✗"),
      ]);
      r += GI.tabella(righe, ["\\(i\\)", `\\(${MAXV}\\)`, "\\(\\max\\{a[1..i-1]\\}\\)", T("inv.", "inv.")]);
      return r;
    },
    domanda: T("Con l'esempio delle note premi ▶: in quali iterazioni \\(\\mathit{max}\\) cambia? Prova l'array decrescente: quante volte si esegue la riga 5? Poi le due versioni sbagliate: con \\(a[i] < \\mathit{max}\\) quale delle tre proprietà fallisce? E con \\(i < n\\), dove l'invariante è sempre vero, perché il risultato è sbagliato?",
      "With the example of the notes press ▶: in which iterations does \\(\\mathit{max}\\) change? Try the decreasing array: how many times is line 5 executed? Then the two wrong versions: with \\(a[i] < \\mathit{max}\\) which of the three properties fails? And with \\(i < n\\), where the invariant is always true, why is the result wrong?"),
  };
})();
