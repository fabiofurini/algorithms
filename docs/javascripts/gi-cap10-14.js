/* Grafici interattivi dei capitoli 10-14 di «Algoritmi / Algorithms» (JSXGraph).
 *
 * Ricette per il motore interattivi.js (formato documentato nel commento in
 * testa al motore); ognuna si registra in window.GI_RICETTE:
 *   albero-ricorsione  albero delle chiamate ricorsive di Fact(n), Fib(n) e
 *                      MergeSort su n elementi, con numero di chiamate,
 *                      profondità, chiamate ripetute di Fib e la pila delle
 *                      chiamate attive passo per passo (cap. 10-11)
 *   master             T(n) = a T(n/b) + n^d: caso del Master theorem
 *                      (d contro log_b a), soluzione Theta e costo di ogni
 *                      livello dell'albero della ricorsione (cap. 12)
 *   merge-sort         MergeSort(a, 1, n) passo per passo: chiamate attive,
 *                      copie L e R, confronti di Merge (cap. 13)
 *
 * Notazione come nelle note (NOTES_EN): pseudocodice con indici da 1,
 * Fact(k), Fib(k), MS(l, r) = MergeSort(a, l, r), Merge(a, l, m, r) con
 * m = floor((l + r) / 2), L[1..n1], R[1..n2], indici i, j, k; F(n) numeri di
 * Fibonacci con F(0) = 0, F(1) = 1; C(n) = 2F(n+1) - 1 chiamate di Fib(n).
 *
 * I nodi degli alberi e le celle degli array sono testi HTML di JSXGraph
 * (riquadri opachi: gli archi passano sotto, nessuna scritta sopra le linee);
 * i numeri da leggere stanno nelle letture. Colori: variabili CSS del motore
 * (--gi-*), quindi giusti anche nel tema scuro. Arancio (colore del cursore
 * t / k) = chiamate attive, cioè la pila; verde = parti già ordinate;
 * rosso/blu = metà sinistra/destra (L/R), come nelle figure delle note.
 */
(function () {
  "use strict";
  const GI = window.GI;
  const T = GI.T, num = GI.num, numTxt = GI.numTxt;

  // ------------------------------------------------------------ utilità
  const V = (k) => `var(--gi-${k})`;
  const mix = (k, p, base = "var(--gi-board)") => `color-mix(in srgb, ${V(k)} ${p}%, ${base})`;
  const tinta = (k, html) => `<strong style="color:${V(k)}">${html}</strong>`;
  const tt = (s) => `\\texttt{${s}}`;
  const cursore = (st, i) => st.el.querySelectorAll(".gi-ctrl input[type=range]")[i];
  const intervallo = (inp, lo, hi) => {
    if (!inp) return;
    inp.min = lo; inp.max = hi;
    if (+inp.value > hi) inp.value = hi;
    if (+inp.value < lo) inp.value = lo;
  };

  /** riquadro HTML (nodo o cella): w, h in px; stile come oggetto */
  // op < 1 sbiadisce i colori verso lo sfondo della board, ma il riquadro resta
  // opaco (gli archi che passano sotto non si vedono attraverso)
  const sbiadito = (c, op) => `color-mix(in srgb, ${c === "inherit" ? "var(--gi-muted)" : c} ${Math.round(op * 100)}%, var(--gi-board))`;
  const riquadro = (testo, o) => {
    if (o.op != null && o.op < 1) {
      o = Object.assign({}, o, { colore: sbiadito(o.colore, o.op), bordo: sbiadito(o.bordo, o.op), sfondo: sbiadito(o.sfondo, o.op), op: 1 });
    }
    return `<div style="box-sizing:border-box;${o.w ? `width:${o.w}px;` : "padding:0 .4em;"}height:${o.h}px;line-height:${o.h - 2 * (o.bw || 1.5)}px;` +
    `text-align:center;white-space:nowrap;overflow:hidden;font-size:${o.fs}px;font-weight:${o.fw || 600};` +
    `font-family:'Source Sans 3','Source Sans Pro',sans-serif;border-radius:${o.r ?? 7}px;` +
    `border:${o.bw || 1.5}px ${o.tratto || "solid"} ${o.bordo};background:${o.sfondo};color:${o.colore};` +
    `${o.ombra ? `box-shadow:0 0 0 3px ${o.ombra};` : ""}">${testo}</div>`;
  };

  /** testo HTML di JSXGraph centrato in (x(), y()); html() lo ricalcola a ogni aggiornamento */
  const testo = (board, x, y, html, visibile) =>
    board.create("text", [x, y, () => (visibile && !visibile() ? "" : html())], {
      anchorX: "middle", anchorY: "middle", fixed: true, highlight: false, display: "html",
      parse: false, useMathJax: false, visible: visibile || true, layer: 9,
    });

  // ------------------------------------------------------------ alberi delle chiamate
  // nodi in ordine anticipato (= ordine di inizio delle chiamate): {id, padre, prof, figli, etich, ...}
  const fib = (k) => { let a = 0, b = 1; for (let i = 0; i < k; i++) [a, b] = [b, a + b]; return a; };
  const fatt = (k) => { let f = 1; for (let i = 2; i <= k; i++) f *= i; return f; };
  const cacheAlberi = {};
  function albero(tipo, n) {
    const ch = tipo + n;
    if (cacheAlberi[ch]) return cacheAlberi[ch];
    const nodi = [];
    const nuovo = (padre, campi) => {
      const nd = Object.assign({ id: nodi.length, padre, prof: padre < 0 ? 0 : nodi[padre].prof + 1, figli: [] }, campi);
      nodi.push(nd);
      if (padre >= 0) nodi[padre].figli.push(nd.id);
      return nd.id;
    };
    if (tipo === "fatt") {
      const giu = (k, padre) => { const id = nuovo(padre, { k, etich: [`Fact(${k})`, `${k}`] }); if (k > 0) giu(k - 1, id); };
      giu(n, -1);
    } else if (tipo === "fib") {
      const visti = new Set();
      const giu = (k, padre) => {
        const id = nuovo(padre, { k, etich: [`Fib(${k})`, `${k}`], ripetuta: visti.has(k) });
        visti.add(k);
        if (k >= 2) { giu(k - 1, id); giu(k - 2, id); }
      };
      giu(n, -1);
    } else {
      const giu = (l, r, padre) => {
        const id = nuovo(padre, { l, r, etich: l === r ? [`MS(${l},${l})`, `${l}`] : [`MS(${l},${r})`, `${l}..${r}`, `${l}–`] });
        if (l < r) { const m = Math.floor((l + r) / 2); nodi[id].m = m; giu(l, m, id); giu(m + 1, r, id); }
      };
      giu(1, n, -1);
    }
    const D = Math.max(...nodi.map((v) => v.prof)) + 1;
    return (cacheAlberi[ch] = { tipo, n, nodi, N: nodi.length, D });
  }

  /** posizioni: foglie equidistanti in [x0, x1], nodi interni al centro dei figli;
   *  livelli equidistanti fra yTop e yBot (al più hMax di distanza) */
  function disponi(A, x0, x1, yTop, yBot, hMax = 1.4) {
    if (A.lay && A.lay.chiave === [x0, x1, yTop, yBot].join()) return A.lay;
    const foglie = A.nodi.filter((v) => !v.figli.length).length;
    const dy = A.D > 1 ? Math.min(hMax, (yTop - yBot) / (A.D - 1)) : 0;
    const pos = Array(A.N);
    let f = 0;
    const visita = (id) => {
      const v = A.nodi[id];
      v.figli.forEach(visita);
      const x = v.figli.length ? (pos[v.figli[0]][0] + pos[v.figli[v.figli.length - 1]][0]) / 2 : x0 + ((x1 - x0) * (f++ + 0.5)) / foglie;
      pos[id] = [x, yTop - v.prof * dy];
    };
    visita(0);
    // spazio orizzontale libero di ogni nodo (distanza dal vicino di livello)
    const gap = Array(A.N).fill(x1 - x0);
    for (let p = 0; p < A.D; p++) {
      const liv = A.nodi.filter((v) => v.prof === p).map((v) => v.id).sort((u, w) => pos[u][0] - pos[w][0]);
      for (let i = 0; i + 1 < liv.length; i++) {
        const d = pos[liv[i + 1]][0] - pos[liv[i]][0];
        gap[liv[i]] = Math.min(gap[liv[i]], d); gap[liv[i + 1]] = Math.min(gap[liv[i + 1]], d);
      }
    }
    return (A.lay = { chiave: [x0, x1, yTop, yBot].join(), pos, gap, dy: dy || yTop - yBot });
  }

  /** la scritta più lunga (e il corpo più grande) che entra in wpx × hpx */
  function scegli(etich, wpx, hpx) {
    for (const fs of [14, 12.5, 11]) {
      for (const e of etich) {
        const w = e.length * fs * 0.58 + 12;
        if (w <= wpx && fs * 1.55 + 4 <= hpx) return { e, fs, w: Math.max(w, fs * 1.9) };
      }
    }
    const e = etich[etich.length - 1], fs = Math.max(8, Math.min(11, (wpx - 6) / (e.length * 0.6), (hpx - 4) / 1.55));
    return { e, fs, w: Math.max(e.length * fs * 0.6 + 6, fs * 1.6) };
  }

  /** archi (sotto i nodi): tutti grigi, quelli della pila in arancio sopra */
  function archi(board, A, lay, attivo, colGrigio, colAttivo) {
    const tratti = (solo) => () => {
      const P = [], a = A(), L = lay();
      for (const v of a.nodi) {
        if (v.padre < 0 || (solo && !solo(v))) continue;
        P.push(L.pos[v.padre], L.pos[v.id], [NaN, NaN]);
      }
      return P;
    };
    GI.spezzata(board, tratti(null), { strokeColor: colGrigio, strokeWidth: 1.4, fixed: true });
    GI.spezzata(board, tratti((v) => attivo(v.id)), { strokeColor: colAttivo, strokeWidth: 3.2, fixed: true });
  }

  /** stato di ogni nodo all'istante t (t-esima chiamata iniziata; t = 0: albero intero) */
  function statoNodi(A, t) {
    const s = Array(A.N).fill("fatto");
    if (t <= 0) return { s, cor: -1, pila: [] };
    const cor = Math.min(t, A.N) - 1, pila = [];
    for (let v = cor; v >= 0; v = A.nodi[v].padre) pila.unshift(v);
    for (let i = 0; i < A.N; i++) s[i] = i > cor ? "futuro" : "fatto";
    for (const v of pila) s[v] = "attivo";
    return { s, cor, pila };
  }

  window.GI_RICETTE = window.GI_RICETTE || {};

  // ================================================================
  // 1. Albero delle chiamate ricorsive (cap. 10-11)
  // ================================================================
  const RANGHI = { fatt: [0, 8], fib: [0, 7], ms: [1, 16] };
  const nomeDi = (v, A) => (A.tipo === "fatt" ? tt(`Fact(${v.k})`) : A.tipo === "fib" ? tt(`Fib(${v.k})`) : tt(`MS(${v.l},${v.r})`));
  const ricorsione = (st) => {
    const A = albero(st.chiave(), Math.round(st.p().n));
    const t = Math.max(0, Math.min(A.N, Math.round(st.p().t || 0)));
    return { A, t, S: statoNodi(A, t) };
  };
  const preparaRicorsione = (st) => {
    const [lo, hi] = RANGHI[st.chiave()];
    intervallo(cursore(st, 0), lo, hi);
    const A = albero(st.chiave(), Math.round(+cursore(st, 0).value));
    intervallo(cursore(st, 1), 0, A.N);
  };
  const BOX_R = [0.35, 9.65, -0.5, -6.7];

  window.GI_RICETTE["albero-ricorsione"] = {
    titolo: T("L'albero delle chiamate ricorsive", "The tree of recursive calls"),
    sottotitolo: T("i nodi sono le chiamate: il loro numero conta i passi, la profondità la memoria della pila",
      "nodes are calls: their number counts the steps, the depth the memory of the stack"),
    funzioni: {
      fatt: { tex: "Fact", etichetta: T("fattoriale", "factorial") },
      fib: { tex: "Fib", etichetta: "Fibonacci" },
      ms: { tex: "MS", etichetta: "Merge Sort" },
    },
    iniziale: "fib",
    etichettaFunzioni: T("Algoritmo ricorsivo", "Recursive algorithm"),
    parametri: [
      { k: "n", nome: "n", min: 0, max: 7, step: 1, val: 5, colore: "b", cifre: 0,
        descr: T("dimensione dell'istanza: \\(\\texttt{Fact}(n)\\), \\(\\texttt{Fib}(n)\\), oppure \\(\\texttt{MergeSort}(a, 1, n)\\)",
          "size of the instance: \\(\\texttt{Fact}(n)\\), \\(\\texttt{Fib}(n)\\), or \\(\\texttt{MergeSort}(a, 1, n)\\)") },
      { k: "t", nome: "t", min: 0, max: 15, step: 1, val: 0, colore: "a", cifre: 0,
        descr: T("\\(t = 0\\): l'albero intero; \\(t \\ge 1\\): è appena iniziata la \\(t\\)-esima chiamata (visita in profondità); premi ▶",
          "\\(t = 0\\): the whole tree; \\(t \\ge 1\\): the \\(t\\)-th call has just started (depth-first order); press ▶") },
    ],
    vista: [0, 0.3, 10, -7.2],
    assi: false,
    legenda: (st) => [
      ["ottimo", T("chiamata", "call"), "pieno"],
      ...(st.chiave() === "fib" ? [["d", T("chiamata ripetuta (valore già calcolato)", "repeated call (value already computed)"), "pieno"]] : []),
      ["a", T("chiamate attive (pila), \\(t \\ge 1\\)", "active calls (stack), \\(t \\ge 1\\)"), ""],
      ["orig", T("chiamata non ancora iniziata", "call not started yet"), "dotted"],
    ],
    monta(board, st) {
      preparaRicorsione(st);
      const A = () => ricorsione(st).A;
      const lay = () => disponi(A(), ...BOX_R);
      archi(board, A, lay, (id) => ricorsione(st).S.s[id] === "attivo", st.colore("orig"), st.colore("a"));
      const MAX = 41;
      for (let i = 0; i < MAX; i++) {
        const vis = () => i < A().N;
        const P = () => (vis() ? lay().pos[i] : [0, 0]);
        testo(board, () => P()[0], () => P()[1], () => {
          const { A: a, S } = ricorsione(st), v = a.nodi[i], L = lay();
          const wpx = L.gap[i] * board.unitX - 4, hpx = Math.min(30, L.dy * board.unitY - 4);
          const { e, fs, w } = scegli(v.etich, wpx, hpx);
          const k = v.ripetuta ? "d" : "ottimo", s = S.s[i];
          return riquadro(e, {
            w: Math.min(w, wpx), h: Math.min(hpx, fs * 1.55 + 6), fs, colore: s === "attivo" ? V("a") : V(k),
            bordo: s === "attivo" ? V("a") : V(k), bw: s === "attivo" ? 2.5 : 1.5,
            sfondo: s === "attivo" ? mix("a", 18) : mix(k, 14), op: s === "futuro" ? 0.35 : 1,
            tratto: s === "futuro" ? "dotted" : "solid", fw: s === "attivo" ? 700 : 600,
            ombra: i === S.cor ? mix("a", 35, "transparent") : "",
          });
        }, vis);
      }
    },
    aggiorna(board, st) { preparaRicorsione(st); },
    formula(p, st) {
      const { A } = ricorsione(st), n = A.n;
      const chi = A.tipo === "fatt" ? `${tt("Fact")}(${n}) = ${n}! = ${fatt(n)}`
        : A.tipo === "fib" ? `${tt("Fib")}(${n}) = F(${n}) = ${fib(n)}` : `${tt("MergeSort")}(a, 1, ${n})`;
      return `\\(${chi}:\\)&ensp;\\(${st.col("b", A.N)}\\ \\text{${T("chiamate", "calls")}},\\quad \\text{${T("profondità", "depth")}}\\ ${A.D}\\)`;
    },
    letture(p, st) {
      const { A, t, S } = ricorsione(st), n = A.n;
      let r = "";
      if (A.tipo === "fatt") {
        r += T(`Ogni chiamata \\(${tt("Fact")}(k)\\) con \\(k \\ge 1\\) fa <em>una</em> chiamata, su \\(k-1\\): l'albero è un cammino. `,
          `Each call \\(${tt("Fact")}(k)\\) with \\(k \\ge 1\\) makes <em>one</em> call, on \\(k-1\\): the tree is a path. `);
        r += T(`Chiamate: \\(n + 1 = ${A.N}\\); profondità: \\(n + 1 = ${A.D}\\), quindi pila di \\(\\Theta(n)\\) frame.`,
          `Calls: \\(n + 1 = ${A.N}\\); depth: \\(n + 1 = ${A.D}\\), hence a stack of \\(\\Theta(n)\\) frames.`);
      } else if (A.tipo === "fib") {
        const rip = A.nodi.filter((v) => v.ripetuta).length;
        r += T(`Chiamate: \\(C(${n}) = 2F(${n + 1}) - 1 = ${A.N}\\), ma solo \\(${n + 1}\\) valori diversi \\(F(0), \\dots, F(${n})\\): `,
          `Calls: \\(C(${n}) = 2F(${n + 1}) - 1 = ${A.N}\\), but only \\(${n + 1}\\) distinct values \\(F(0), \\dots, F(${n})\\): `);
        r += T(`${tinta("d", `${rip} chiamate ripetute`)} ricalcolano un valore già calcolato. Profondità \\(${A.D}\\).<br>`,
          `${tinta("d", `${rip} repeated calls`)} recompute a value already computed. Depth \\(${A.D}\\).<br>`);
        if (n >= 2) {
          const ks = [...Array(n + 1).keys()].reverse();
          r += GI.tabella([[T("chiamate", "calls"), ...ks.map((k) => A.nodi.filter((v) => v.k === k).length)]],
            ["\\(k\\)", ...ks.map((k) => `\\(${k}\\)`)]);
          r += T(`\\(${tt("Fib")}(k)\\) viene chiamata \\(F(n-k+1)\\) volte (\\(${tt("Fib")}(0)\\): \\(F(n-1)\\)): il numero di chiamate cresce in modo esponenziale.<br>`,
            `\\(${tt("Fib")}(k)\\) is called \\(F(n-k+1)\\) times (\\(${tt("Fib")}(0)\\): \\(F(n-1)\\)): the number of calls grows exponentially.<br>`);
        }
      } else {
        const h = Math.ceil(Math.log2(n) - 1e-12);
        r += T(`Ogni chiamata su più di un elemento si divide in due metà: \\(n = ${n}\\) foglie, \\(2n - 1 = ${A.N}\\) chiamate, profondità \\(\\lceil \\log_2 n \\rceil + 1 = ${h + 1}\\), quindi pila di \\(\\Theta(\\log n)\\) frame.`,
          `Every call on more than one element splits into two halves: \\(n = ${n}\\) leaves, \\(2n - 1 = ${A.N}\\) calls, depth \\(\\lceil \\log_2 n \\rceil + 1 = ${h + 1}\\), hence a stack of \\(\\Theta(\\log n)\\) frames.`);
      }
      if (t >= 1) {
        const v = A.nodi[S.cor];
        const pila = S.pila.map((u) => `\\(${nomeDi(A.nodi[u], A)}\\)`).join(" → ");
        r += (A.tipo === "fib" ? "" : "<br>") + T(`<strong>t = ${t}</strong>: inizia ${tinta("a", "\\(" + nomeDi(v, A) + "\\)")}`, `<strong>t = ${t}</strong>: ${tinta("a", "\\(" + nomeDi(v, A) + "\\)")} starts`);
        if (A.tipo === "fatt") r += T(` (restituirà \\(${v.k}! = ${fatt(v.k)}\\))`, ` (it will return \\(${v.k}! = ${fatt(v.k)}\\))`);
        if (A.tipo === "fib") r += T(` (restituirà \\(F(${v.k}) = ${fib(v.k)}\\)${v.ripetuta ? ", <em>già calcolato</em>" : ""})`, ` (it will return \\(F(${v.k}) = ${fib(v.k)}\\)${v.ripetuta ? ", <em>already computed</em>" : ""})`);
        r += T(`. Pila (\\(${S.pila.length}\\) frame): ${pila}.`, `. Stack (\\(${S.pila.length}\\) frame${S.pila.length > 1 ? "s" : ""}): ${pila}.`);
      }
      return r;
    },
    domanda: T("Con Fibonacci porta \\(n\\) da \\(4\\) a \\(7\\): quanto cresce il numero di chiamate, e quanto la profondità? Poi premi ▶ su \\(t\\): la pila arancio è sempre un cammino dalla radice; quanti frame contiene al massimo? Confronta con Merge Sort su \\(n = 16\\).",
      "With Fibonacci move \\(n\\) from \\(4\\) to \\(7\\): how fast does the number of calls grow, and the depth? Then press ▶ on \\(t\\): the orange stack is always a path from the root; how many frames does it hold at most? Compare with Merge Sort on \\(n = 16\\)."),
  };

  // ================================================================
  // 2. Master theorem con f(n) = n^d (cap. 12)
  // ================================================================
  const LIV = 6; // livelli interni j = 0..LIV-1, foglie al livello LIV: n = b^LIV
  const EPS = 1e-9;
  const esperto = (p) => {
    const a = Math.round(p.a), b = p.b, d = p.d;
    const lg = Math.log(a) / Math.log(b), q = a / Math.pow(b, d);
    const caso = Math.abs(d - lg) < EPS ? 2 : d < lg ? 1 : 3;
    const n = Math.pow(b, LIV);
    const costi = [...Array(LIV + 1).keys()].map((j) => Math.pow(a, j) * Math.pow(n / Math.pow(b, j), d));
    return { a, b, d, lg, q, caso, n, costi, esp: caso === 1 ? lg : d, log: caso === 2 };
  };
  // esponente «esatto» con al più due decimali (log_4 2 = 0,5; log_4 8 = 1,5)
  const esatto = (x) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
  const potenzaN = (e, texE) => (Math.abs(e) < EPS ? "1" : Math.abs(e - 1) < EPS ? "n" : `n^{${texE}}`);
  const thetaTex = (E) => {
    if (E.caso === 1) {
      if (esatto(E.lg)) return `\\Theta\\big(${potenzaN(E.lg, num(E.lg, 2))}\\big)`;
      return `\\Theta\\big(n^{\\log_{${num(E.b, 1)}} ${E.a}}\\big) \\approx \\Theta\\big(n^{${num(E.lg, 2)}}\\big)`;
    }
    const pd = potenzaN(E.d, num(E.d, 2));
    if (E.caso === 2) return `\\Theta\\big(${pd === "1" ? "" : pd + "\\,"}\\log n\\big)`;
    return `\\Theta\\big(${pd}\\big)`;
  };
  const stessaTheta = (E, F) => Math.abs(E.esp - F.esp) < 1e-6 && E.log === F.log;
  const BERSAGLI = [[4, 2, 1], [2, 2, 1], [8, 2, 2], [1, 2, 0], [3, 3, 2], [2, 4, 0.5], [4, 2, 2], [2, 2, 0], [9, 3, 1], [1, 3, 1], [7, 2, 2], [3, 2, 0]];

  window.GI_RICETTE["master"] = {
    titolo: T("Il Master theorem", "The Master Theorem"),
    sottotitolo: T("\\(T(n) = a\\,T(n/b) + n^d\\): il costo dei livelli è una progressione geometrica di ragione \\(a/b^d\\)",
      "\\(T(n) = a\\,T(n/b) + n^d\\): the level costs form a geometric progression with ratio \\(a/b^d\\)"),
    parametri: [
      { k: "a", nome: "a", min: 1, max: 9, step: 1, val: 2, colore: "a", cifre: 0,
        descr: T("numero di sottoproblemi (nodi figli di ogni chiamata)", "number of subproblems (children of each call)") },
      { k: "b", nome: "b", min: 1.5, max: 4, step: 0.5, val: 2, colore: "b", cifre: 1,
        descr: T("fattore di riduzione della dimensione: i figli hanno dimensione \\(n/b\\)", "size reduction factor: children have size \\(n/b\\)") },
      { k: "d", nome: "d", min: 0, max: 3, step: 0.25, val: 1, colore: "c", cifre: 2,
        descr: T("esponente del lavoro non ricorsivo \\(f(n) = n^d\\)", "exponent of the non-recursive work \\(f(n) = n^d\\)") },
    ],
    vista: [-5, 0.85, 4.6, -6.75],
    rapporto: "9.6 / 7.6",
    assi: false,
    legenda: [
      ["ottimo", T("costo di un livello interno \\(a^j (n/b^j)^d\\)", "cost of an internal level \\(a^j (n/b^j)^d\\)"), "pieno"],
      ["locale", T("costo delle foglie \\(a^{\\log_b n} = n^{\\log_b a}\\)", "cost of the leaves \\(a^{\\log_b n} = n^{\\log_b a}\\)"), "pieno"],
    ],
    monta(board, st) {
      const E = () => esperto(st.p());
      const X0 = 0.8, MEZZA = 3.6, SP = 0.31;
      const larg = (j) => { const c = E().costi, M = Math.max(...c); return Math.max(0.025, (MEZZA * c[j]) / M); };
      for (let j = 0; j <= LIV; j++) {
        const k = j === LIV ? "locale" : "ottimo", c = st.colore(k);
        GI.spezzata(board, () => {
          const w = larg(j);
          return [[X0 - w, -j - SP], [X0 + w, -j - SP], [X0 + w, -j + SP], [X0 - w, -j + SP], [X0 - w, -j - SP]];
        }, { strokeColor: c, strokeWidth: 1.5, fillColor: c, fillOpacity: 0.3, fixed: true });
        board.create("text", [-4.75, -j, `<span style="font-size:13px">${j}</span>`], {
          anchorX: "left", anchorY: "middle", fixed: true, highlight: false, display: "html",
        });
      }
      board.create("text", [-4.75, 0.55, `<span style="font-size:13px"><em>j</em></span>`], {
        anchorX: "left", anchorY: "middle", fixed: true, highlight: false, display: "html",
      });
    },
    formula(p, st) {
      const E = esperto(p);
      return `\\(T(n) = ${st.col("a", E.a)}\\,T\\!\\left(\\frac{n}{${st.col("b", num(E.b, 1))}}\\right) + n^{${st.col("d", num(E.d, 2))}}\\quad\\Longrightarrow\\)&ensp;\\(T(n) = ${thetaTex(E)}\\)`;
    },
    letture(p, st) {
      const E = esperto(p);
      const lgTex = esatto(E.lg) ? num(E.lg, 2) : `\\approx ${num(E.lg, 3)}`;
      const rel = E.caso === 1 ? "<" : E.caso === 2 ? "=" : ">";
      let r = `\\(\\log_b a = \\log_{${num(E.b, 1)}} ${E.a} ${esatto(E.lg) ? "= " : ""}${lgTex}\\), \\(d = ${num(E.d, 2)}\\): \\(d ${rel} \\log_b a\\), `;
      r += tinta("ammissibile", T(`caso ${E.caso}`, `case ${E.caso}`)) + ". ";
      r += T(`Ragione \\(a/b^d = ${num(E.q, 3)}\\): `, `Ratio \\(a/b^d = ${num(E.q, 3)}\\): `);
      r += E.caso === 1 ? T("i costi dei livelli <strong>crescono</strong> verso le foglie, che dominano: \\(T(n) = \\Theta(n^{\\log_b a})\\).",
        "the level costs <strong>increase</strong> towards the leaves, which dominate: \\(T(n) = \\Theta(n^{\\log_b a})\\).")
        : E.caso === 2 ? T("tutti i livelli costano \\(n^d\\); ci sono circa \\(\\log_b n\\) livelli: \\(T(n) = \\Theta(n^d \\log n)\\).",
          "all levels cost \\(n^d\\); there are about \\(\\log_b n\\) levels: \\(T(n) = \\Theta(n^d \\log n)\\).")
          : T("i costi dei livelli <strong>decrescono</strong>, domina la radice: \\(T(n) = \\Theta(f(n)) = \\Theta(n^d)\\) (la condizione di regolarità vale con \\(c = a/b^d < 1\\)).",
            "the level costs <strong>decrease</strong>, the root dominates: \\(T(n) = \\Theta(f(n)) = \\Theta(n^d)\\) (the regularity condition holds with \\(c = a/b^d < 1\\)).");
      r += `<br>\\(T(n) = ${thetaTex(E)}\\).<br>`;
      const intN = Math.abs(E.n - Math.round(E.n)) < 1e-9 ? "=" : "\\approx";
      r += T(`Livelli dell'albero per \\(n = b^{${LIV}} ${intN} ${num(E.n, 2)}\\) (le barre sono proporzionali al costo):`,
        `Tree levels for \\(n = b^{${LIV}} ${intN} ${num(E.n, 2)}\\) (bars proportional to the cost):`);
      const fmt = (x) => {
        if (x < 1e6) return numTxt(x, x < 10 ? 2 : x < 1000 ? 1 : 0);
        const e = Math.floor(Math.log10(x));
        return `\\(${num(x / Math.pow(10, e), 2)} \\cdot 10^{${e}}\\)`;
      };
      const righe = E.costi.map((c, j) => [j === LIV ? `${j}*` : j, fmt(Math.pow(E.a, j)), fmt(E.n / Math.pow(E.b, j)), fmt(c)]);
      r += GI.tabella(righe, ["\\(j\\)", T("nodi \\(a^j\\)", "nodes \\(a^j\\)"), T("dimensione \\(n/b^j\\)", "size \\(n/b^j\\)"), T("costo", "cost")]);
      r += T("* livello delle foglie (costo \\(\\Theta(1)\\) ciascuna).", "* level of the leaves (cost \\(\\Theta(1)\\) each).");
      if (st.modo() === "sfida" && st.bersaglio()) {
        const B = esperto(st.bersaglio());
        r += `<br><strong>${T("Bersaglio", "Target")}</strong>: \\(T(n) = ${thetaTex(B).replace(/\\approx.*$/, "")}\\)` +
          (stessaTheta(E, B) ? T(" &mdash; raggiunto!", " &mdash; reached!") : "");
      }
      return r;
    },
    domanda: T("Con \\(a = 2\\), \\(b = 2\\) muovi \\(d\\) da \\(0\\) a \\(2\\): quando le barre formano un rettangolo? Poi tieni \\(d = 1\\) e porta \\(a\\) a \\(4\\): da quale livello è dominato il costo? Trova tre terne \\((a, b, d)\\) diverse nel caso 2.",
      "With \\(a = 2\\), \\(b = 2\\) move \\(d\\) from \\(0\\) to \\(2\\): when do the bars form a rectangle? Then keep \\(d = 1\\) and raise \\(a\\) to \\(4\\): which level dominates the cost? Find three different triples \\((a, b, d)\\) in case 2."),
    sfida: {
      testo: T("Scegli \\(a\\), \\(b\\), \\(d\\) in modo che la soluzione \\(T(n)\\) sia quella del <strong style=\"color:var(--gi-target)\">bersaglio</strong> (nelle letture).",
        "Choose \\(a\\), \\(b\\), \\(d\\) so that the solution \\(T(n)\\) is the <strong style=\"color:var(--gi-target)\">target</strong> one (in the readings)."),
      genera(chiave, st) {
        const E0 = esperto(st.p()), validi = BERSAGLI.filter(([a, b, d]) => !stessaTheta(esperto({ a, b, d }), E0));
        const [a, b, d] = validi[Math.floor(Math.random() * validi.length)];
        return { a, b, d };
      },
      vinta: (p, B) => stessaTheta(esperto(p), esperto(B)),
      vicinanza(p, B) {
        const E = esperto(p), F = esperto(B);
        if (stessaTheta(E, F)) return 1;
        return Math.max(0, 0.85 - 0.3 * Math.abs(E.esp - F.esp) - (E.log !== F.log ? 0.1 : 0));
      },
      aiuto(p, B) {
        const F = esperto(B);
        return F.log ? T("Serve il caso 2: \\(d = \\log_b a\\), cioè \\(a = b^d\\). L'esponente di \\(n\\) è \\(d\\).", "You need case 2: \\(d = \\log_b a\\), i.e. \\(a = b^d\\). The exponent of \\(n\\) is \\(d\\).")
          : T("Senza logaritmo: o le foglie dominano (\\(d < \\log_b a\\), esponente \\(\\log_b a\\)) o la radice (\\(d > \\log_b a\\), esponente \\(d\\)).",
            "No logarithm: either the leaves dominate (\\(d < \\log_b a\\), exponent \\(\\log_b a\\)) or the root does (\\(d > \\log_b a\\), exponent \\(d\\)).");
      },
    },
  };

  // ================================================================
  // 3. Merge Sort passo per passo (cap. 13)
  // ================================================================
  const ARRAY_MS = {
    note: [9, 12, 3, 16, 19, 11, 12],
    casuale: [5, 2, 4, 7, 1, 3, 2, 6],
    decr: [8, 7, 6, 5, 4, 3, 2, 1],
    cresc: [1, 2, 3, 4, 5, 6, 7, 8],
  };
  const cacheMS = {};
  function simulaMS(chiave) {
    if (cacheMS[chiave]) return cacheMS[chiave];
    const a = ARRAY_MS[chiave].slice(), n = a.length;
    const A = albero("ms", n);
    const stato = Array(A.N).fill("futuro"), passi = [];
    let tot = 0;
    const pila = [];
    const push = (e) => passi.push(Object.assign({ a: a.slice(), stato: stato.slice(), pila: pila.slice(), tot }, e));
    const merge = (id) => {
      const { l, m, r } = A.nodi[id], L = a.slice(l - 1, m), R = a.slice(m, r), n1 = L.length, n2 = R.length;
      let i = 1, j = 1, k = l, conf = 0;
      const M = () => ({ l, m, r, L, R, n1, n2, i, j, k, conf });
      push({ tipo: "copia", nodo: id, M: M() });
      while (i <= n1 && j <= n2) {
        conf++; tot++;
        const daL = L[i - 1] <= R[j - 1];
        a[k - 1] = daL ? L[i - 1] : R[j - 1];
        push({ tipo: "confronto", nodo: id, M: Object.assign(M(), { da: daL ? "L" : "R" }) });
        if (daL) i++; else j++;
        k++;
      }
      while (i <= n1) { a[k - 1] = L[i - 1]; push({ tipo: "resto", nodo: id, M: Object.assign(M(), { da: "L" }) }); i++; k++; }
      while (j <= n2) { a[k - 1] = R[j - 1]; push({ tipo: "resto", nodo: id, M: Object.assign(M(), { da: "R" }) }); j++; k++; }
    };
    const ms = (id) => {
      const v = A.nodi[id];
      stato[id] = "attivo"; pila.push(id);
      if (v.l === v.r) push({ tipo: "base", nodo: id });
      else {
        push({ tipo: "dividi", nodo: id });
        ms(v.figli[0]); ms(v.figli[1]);
        merge(id);
      }
      stato[id] = "fatto"; pila.pop();
    };
    ms(0);
    push({ tipo: "fine", nodo: -1 });
    return (cacheMS[chiave] = { A, n, a0: ARRAY_MS[chiave], passi, K: passi.length - 1 });
  }
  const passoMS = (st) => {
    const S = simulaMS(st.chiave()), k = Math.max(0, Math.min(S.K, Math.round(st.p().k || 0)));
    return { S, k, e: S.passi[k] };
  };
  const preparaMS = (st) => {
    const S = simulaMS(st.chiave()), inp = cursore(st, 0);
    if (!inp) return;
    intervallo(inp, 0, S.K);
    if (st.dati.ultima !== st.chiave()) inp.value = 0;
    st.dati.ultima = st.chiave();
  };
  const listaTex = (v) => `[${v.join(",\\,")}]`;
  // geometria: x in [0, 12.6], y in [0, 10.5]
  const MS_X0 = 1.15, MS_X1 = 12.35, Y_IND = 10.05, Y_A = 9.3, Y_L = 7.85, Y_R = 6.85, ALB = [MS_X0, MS_X1, 5.55, 0.5];

  window.GI_RICETTE["merge-sort"] = {
    titolo: T("Merge Sort passo per passo", "Merge Sort step by step"),
    sottotitolo: T("dividi fino a un elemento, poi fondi le metà ordinate con Merge",
      "divide down to one element, then merge the sorted halves with Merge"),
    funzioni: {
      note: { tex: "a", etichetta: T("esempio delle note", "example of the notes") },
      casuale: { tex: "a", etichetta: T("casuale", "random") },
      decr: { tex: "a", etichetta: T("decrescente", "decreasing") },
      cresc: { tex: "a", etichetta: T("già ordinato", "already sorted") },
    },
    iniziale: "note",
    etichettaFunzioni: T("Array iniziale", "Initial array"),
    parametri: [
      { k: "k", nome: "k", min: 0, max: 40, step: 1, val: 0, colore: "a", cifre: 0,
        descr: T("passo dell'esecuzione: chiamate, copie in \\(L\\) e \\(R\\), un elemento di \\(a\\) scritto da Merge; premi ▶",
          "execution step: calls, copies into \\(L\\) and \\(R\\), one element of \\(a\\) written by Merge; press ▶") },
    ],
    vista: [0, 10.5, 12.6, 0],
    rapporto: "6 / 5",
    assi: false,
    legenda: [
      ["a", T("chiamate attive (pila) e sotto-array corrente", "active calls (stack) and current sub-array"), ""],
      ["ammissibile", T("metà sinistra, \\(L\\)", "left half, \\(L\\)"), "pieno"],
      ["ottimo", T("metà destra, \\(R\\)", "right half, \\(R\\)"), "pieno"],
      ["c", T("già fuso / chiamata conclusa", "already merged / call completed"), "pieno"],
    ],
    monta(board, st) {
      preparaMS(st);
      const S = () => passoMS(st).S, E = () => passoMS(st).e;
      const w = () => Math.min(1.4, (MS_X1 - MS_X0) / S().n);
      const xc = (pos) => (MS_X0 + MS_X1) / 2 + (pos - 0.5 - S().n / 2) * w();
      const hpx = () => Math.min(34, 0.78 * board.unitY);
      const wpx = () => w() * board.unitX - 5;
      const fsC = () => Math.max(10, Math.min(16, hpx() * 0.48));
      // etichette delle righe (nel margine sinistro)
      const riga = (y, html, vis) => board.create("text", [0.55, y, () => (vis && !vis() ? "" : `<span style="font-size:14px;font-style:italic;font-weight:600">${html}</span>`)],
        { anchorX: "middle", anchorY: "middle", fixed: true, highlight: false, display: "html", visible: vis || true });
      const inMerge = () => !!E().M;
      riga(Y_A, "a"); riga(Y_L, "L", inMerge); riga(Y_R, "R", inMerge);
      // indici 1..n sopra a
      for (let p = 1; p <= 9; p++) {
        testo(board, () => xc(p), () => Y_IND, () => `<span style="font-size:12px">${p}</span>`, () => p <= S().n);
      }
      // celle di a
      for (let p = 1; p <= 9; p++) {
        testo(board, () => xc(p), () => Y_A, () => {
          const e = E(), nodo = e.nodo >= 0 ? S().A.nodi[e.nodo] : null;
          let k = "orig", bordo = V("orig"), sfondo = "var(--gi-board)", bw = 1.5, op = 1, ombra = "";
          if (e.tipo === "fine") { k = "c"; bordo = V("c"); sfondo = mix("c", 20); }
          else if (nodo) {
            const { l, r } = nodo, m = nodo.m;
            if (p < l || p > r) op = 0.4;
            else if (e.M) {
              if (p < e.M.k || (p === e.M.k && e.tipo !== "copia")) { k = "c"; bordo = V("c"); sfondo = mix("c", 20); }
              else { k = p <= m ? "ammissibile" : "ottimo"; bordo = mix(k, 50, "transparent"); }
              if (p === e.M.k && e.tipo !== "copia") { bordo = V("a"); bw = 2.5; ombra = mix("a", 35, "transparent"); }
            } else if (e.tipo === "dividi") { k = p <= m ? "ammissibile" : "ottimo"; bordo = V(k); sfondo = mix(k, 14); bw = 2; }
            else { bordo = V("a"); bw = 2.5; sfondo = mix("a", 14); k = "a"; }
          }
          return riquadro(e.a[p - 1], { w: wpx(), h: hpx(), fs: fsC(), colore: k === "orig" ? "inherit" : V(k), bordo, sfondo, bw, op, ombra });
        }, () => p <= S().n);
      }
      // celle di L e R (solo durante Merge), allineate sotto le posizioni che copiano
      for (const [lato, Y, k] of [["L", Y_L, "ammissibile"], ["R", Y_R, "ottimo"]]) {
        for (let q = 1; q <= 5; q++) {
          const vis = () => { const M = E().M; return !!M && q <= (lato === "L" ? M.n1 : M.n2); };
          const pos = () => { const M = E().M; return M ? (lato === "L" ? M.l + q - 1 : M.m + q) : 1; };
          testo(board, () => xc(pos()), () => Y, () => {
            const e = E(), M = e.M, idx = lato === "L" ? M.i : M.j;
            const preso = q < idx || (q === idx && M.da === lato && e.tipo !== "copia");
            const confrontato = e.tipo === "confronto" && q === idx;
            const scelto = q === idx && M.da === lato && e.tipo !== "copia";
            return riquadro((lato === "L" ? M.L : M.R)[q - 1], {
              w: wpx(), h: hpx() * 0.92, fs: fsC() * 0.95, colore: V(k), bordo: confrontato || scelto ? V("a") : V(k),
              bw: confrontato || scelto ? 2.5 : 1.5, sfondo: mix(k, 14), op: preso && !scelto ? 0.3 : 1,
              tratto: confrontato && !scelto ? "dashed" : "solid",
            });
          }, vis);
        }
      }
      // albero delle chiamate MS(l, r)
      const A = () => S().A, lay = () => disponi(A(), ...ALB, 1.75);
      archi(board, A, lay, (id) => E().stato[id] === "attivo", st.colore("orig"), st.colore("a"));
      for (let i = 0; i < 17; i++) {
        const vis = () => i < A().N;
        const P = () => (vis() ? lay().pos[i] : [0, 0]);
        testo(board, () => P()[0], () => P()[1], () => {
          const e = E(), v = A().nodi[i], L = lay(), s = e.stato[i];
          const { e: et, fs, w: ww } = scegli(v.etich, L.gap[i] * board.unitX - 4, Math.min(30, L.dy * board.unitY - 4));
          const k = s === "attivo" ? "a" : s === "fatto" ? "c" : "orig";
          return riquadro(et, {
            w: Math.min(ww, L.gap[i] * board.unitX - 4), h: fs * 1.55 + 6, fs, colore: s === "futuro" ? "inherit" : V(k), bordo: V(k),
            bw: s === "attivo" ? 2.5 : 1.5, sfondo: s === "futuro" ? "var(--gi-board)" : mix(k, 16), op: s === "futuro" ? 0.45 : 1,
            tratto: s === "futuro" ? "dotted" : "solid", ombra: i === e.nodo ? mix("a", 35, "transparent") : "",
          });
        }, vis);
      }
    },
    aggiorna(board, st) { preparaMS(st); },
    formula(p, st) {
      const { S, k, e } = passoMS(st), v = e.nodo >= 0 ? S.A.nodi[e.nodo] : null;
      const chi = e.tipo === "fine" ? T("\\text{fine}", "\\text{end}")
        : e.M ? `${tt("Merge")}(a, ${e.M.l}, ${e.M.m}, ${e.M.r})` : `${tt("MergeSort")}(a, ${v.l}, ${v.r})`;
      return `${st.col("a", `k = ${k}`)}\\ /\\ ${S.K}:\\quad ${chi}`;
    },
    letture(p, st) {
      const { S, e } = passoMS(st), A = S.A, v = e.nodo >= 0 ? A.nodi[e.nodo] : null, M = e.M;
      let r = "";
      if (e.tipo === "dividi") {
        r += T(`\\(${tt("MergeSort")}(a, ${v.l}, ${v.r})\\): \\(l < r\\), quindi \\(m = \\lfloor (${v.l} + ${v.r})/2 \\rfloor = ${v.m}\\). Si divide in ${tinta("ammissibile", `\\(a[${v.l}..${v.m}]\\)`)} e ${tinta("ottimo", `\\(a[${v.m + 1}..${v.r}]\\)`)} e si ordina prima la metà sinistra.`,
          `\\(${tt("MergeSort")}(a, ${v.l}, ${v.r})\\): \\(l < r\\), so \\(m = \\lfloor (${v.l} + ${v.r})/2 \\rfloor = ${v.m}\\). Split into ${tinta("ammissibile", `\\(a[${v.l}..${v.m}]\\)`)} and ${tinta("ottimo", `\\(a[${v.m + 1}..${v.r}]\\)`)}; the left half is sorted first.`);
      } else if (e.tipo === "base") {
        r += T(`\\(${tt("MergeSort")}(a, ${v.l}, ${v.r})\\): \\(l = r\\), un solo elemento \\(a[${v.l}] = ${e.a[v.l - 1]}\\), già ordinato: la chiamata ritorna subito.`,
          `\\(${tt("MergeSort")}(a, ${v.l}, ${v.r})\\): \\(l = r\\), a single element \\(a[${v.l}] = ${e.a[v.l - 1]}\\), already sorted: the call returns at once.`);
      } else if (e.tipo === "copia") {
        r += T(`\\(${tt("Merge")}(a, ${M.l}, ${M.m}, ${M.r})\\): le due metà sono ordinate. Si copiano in ${tinta("ammissibile", `\\(L = ${listaTex(M.L)}\\)`)} (\\(n_1 = ${M.n1}\\)) e ${tinta("ottimo", `\\(R = ${listaTex(M.R)}\\)`)} (\\(n_2 = ${M.n2}\\)); \\(i = j = 1\\), \\(k = ${M.l}\\).`,
          `\\(${tt("Merge")}(a, ${M.l}, ${M.m}, ${M.r})\\): both halves are sorted. They are copied into ${tinta("ammissibile", `\\(L = ${listaTex(M.L)}\\)`)} (\\(n_1 = ${M.n1}\\)) and ${tinta("ottimo", `\\(R = ${listaTex(M.R)}\\)`)} (\\(n_2 = ${M.n2}\\)); \\(i = j = 1\\), \\(k = ${M.l}\\).`);
      } else if (e.tipo === "confronto") {
        const x = M.L[M.i - 1], y = M.R[M.j - 1], daL = M.da === "L";
        r += T(`Confronto ${tinta("ammissibile", `\\(L[${M.i}] = ${x}\\)`)} e ${tinta("ottimo", `\\(R[${M.j}] = ${y}\\)`)}: \\(${x} ${daL ? "\\le" : ">"} ${y}\\), quindi ${tinta("a", `\\(a[${M.k}] \\leftarrow ${daL ? `L[${M.i}]` : `R[${M.j}]`} = ${daL ? x : y}\\)`)}${daL && x === y ? " (a parità vince \\(L\\): Merge Sort è stabile)" : ""}.`,
          `Compare ${tinta("ammissibile", `\\(L[${M.i}] = ${x}\\)`)} and ${tinta("ottimo", `\\(R[${M.j}] = ${y}\\)`)}: \\(${x} ${daL ? "\\le" : ">"} ${y}\\), so ${tinta("a", `\\(a[${M.k}] \\leftarrow ${daL ? `L[${M.i}]` : `R[${M.j}]`} = ${daL ? x : y}\\)`)}${daL && x === y ? " (on ties \\(L\\) wins: Merge Sort is stable)" : ""}.`);
      } else if (e.tipo === "resto") {
        const daL = M.da === "L", idx = daL ? M.i : M.j, val = (daL ? M.L : M.R)[idx - 1];
        r += T(`${daL ? "\\(R\\)" : "\\(L\\)"} è esaurito: si copia il resto di ${daL ? "\\(L\\)" : "\\(R\\)"} senza confronti, ${tinta("a", `\\(a[${M.k}] \\leftarrow ${daL ? "L" : "R"}[${idx}] = ${val}\\)`)}.`,
          `${daL ? "\\(R\\)" : "\\(L\\)"} is exhausted: the rest of ${daL ? "\\(L\\)" : "\\(R\\)"} is copied without comparisons, ${tinta("a", `\\(a[${M.k}] \\leftarrow ${daL ? "L" : "R"}[${idx}] = ${val}\\)`)}.`);
      } else {
        const n = S.n;
        r += T(`${tinta("c", "Array ordinato")}: \\(a = ${listaTex(e.a)}\\), con \\(${e.tot}\\) confronti in tutto (\\(n \\log_2 n \\approx ${num(n * Math.log2(n), 1)}\\)).`,
          `${tinta("c", "Sorted array")}: \\(a = ${listaTex(e.a)}\\), with \\(${e.tot}\\) comparisons in all (\\(n \\log_2 n \\approx ${num(n * Math.log2(n), 1)}\\)).`);
      }
      if (M) {
        const n = M.r - M.l + 1;
        r += T(`<br>Confronti in questa fusione: \\(${M.conf}\\) (fra \\(\\min\\{n_1, n_2\\} = ${Math.min(M.n1, M.n2)}\\) e \\(n - 1 = ${n - 1}\\)); in tutto: \\(${e.tot}\\).`,
          `<br>Comparisons in this merge: \\(${M.conf}\\) (between \\(\\min\\{n_1, n_2\\} = ${Math.min(M.n1, M.n2)}\\) and \\(n - 1 = ${n - 1}\\)); in all: \\(${e.tot}\\).`);
      } else if (e.tipo !== "fine") r += T(`<br>Confronti finora: \\(${e.tot}\\).`, `<br>Comparisons so far: \\(${e.tot}\\).`);
      if (e.pila.length) {
        const pila = e.pila.map((u) => `\\(${tt(`MS(${A.nodi[u].l},${A.nodi[u].r})`)}\\)`).join(" → ");
        r += T(`<br>${tinta("a", "Pila")} (\\(${e.pila.length}\\) frame): ${pila}.`, `<br>${tinta("a", "Stack")} (\\(${e.pila.length}\\) frame${e.pila.length > 1 ? "s" : ""}): ${pila}.`);
      }
      return r;
    },
    domanda: T("Premi ▶ sull'esempio delle note e fermati sull'ultima chiamata di Merge: quanti confronti fa? Poi confronta il numero totale di confronti sull'array già ordinato e su quello decrescente: perché sono uguali, e diversi da quello casuale?",
      "Press ▶ on the example of the notes and stop at the last call of Merge: how many comparisons does it make? Then compare the total number of comparisons on the already sorted and on the decreasing array: why are they equal, and different from the random one?"),
  };
})();
