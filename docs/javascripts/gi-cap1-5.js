/* Grafici interattivi dei capitoli 1-5 di «Algoritmi / Algorithms» (JSXGraph).
 *
 * Ricette per il motore interattivi.js (formato documentato nel commento in
 * testa al motore); ognuna si registra in window.GI_RICETTE:
 *   rappresentazione  un intero n su k bit: complemento a due, modulo e segno,
 *                     esadecimale e IEEE 754 a singola precisione; i bit dei
 *                     primi due si cliccano e cambiano n (cap. 1)
 *   ordinamento       Insertion Sort, Exchange Sort e Selection Sort passo per
 *                     passo, con confronti, spostamenti/scambi e la riga di
 *                     pseudocodice in esecuzione (cap. 3)
 *   ricerca           ricerca lineare e ricerca binaria sullo stesso array
 *                     ordinato, passo per passo (left, right, mid) (cap. 4)
 *   euclide-crivello  algoritmo di Euclide (tassellatura del rettangolo n x m
 *                     con quadrati) e crivello di Eratostene (cap. 5)
 *
 * Notazione e pseudocodice come nelle dispense (NOTES_EN / NOTES_IT): array
 * a[1..n] con indici da 1, InsertionSort / ExchangeSort / SelectionSort,
 * LinearSearch / BinarySearch con left, right, mid, EuclideanAlgorithm(n, m),
 * SieveOfEratosthenes(n) con l'array prime[1..n].
 *
 * I grafici «passo per passo» hanno il cursore k (il passo) e, sotto i
 * cursori, i pulsanti ◀ / ▶ (un passo) ed «Esegui» (avanza da solo fino alla
 * fine). Il disegno si rifà solo quando cambia lo stato (firma in st.dati):
 * gli oggetti JSXGraph sono curve e testi, che si tolgono e si ricreano.
 * Colori sobri e coerenti con le dispense: nella ricerca intervallo blu,
 * elemento confrontato rosso, scartati grigi; nel crivello p corrente rosso,
 * elemento appena cancellato blu. Nessuna etichetta sopra linee o barre:
 * i valori stanno nelle letture e nella legenda.
 */
(function () {
  "use strict";
  const GI = window.GI;
  const T = GI.T;

  // ------------------------------------------------------------ colori e utilità
  const scuro = () => (document.body && document.body.getAttribute("data-md-color-scheme")) === "slate";
  const COL = (st) => ({
    a: st.colore("a"), b: st.colore("b"), c: st.colore("c"), d: st.colore("d"), e: st.colore("e"),
    rosso: st.colore("ammissibile"), blu: st.colore("ottimo"), viola: st.colore("locale"),
    grigio: st.colore("orig"), muted: st.colore("muted"), line: st.colore("line"), target: st.colore("target"),
    testo: scuro() ? "#E9ECEF" : "#212529",
  });
  const tinta = (c, html) => `<strong style="color:${c}">${html}</strong>`;
  const fondo = (c, html) => `<span style="background:color-mix(in srgb, ${c} 28%, transparent);border-radius:3px;padding:0 .2em">${html}</span>`;
  const OPZ = { pan: { enabled: false }, zoom: { enabled: false, wheel: false } };

  // il campo <input> di un cursore (aria-label = nome del cursore)
  const inputDi = (st, nome) => st.el.querySelector(`.gi-ctrl input[aria-label="${nome}"]`);
  const ctrlDi = (st, nome) => { const i = inputDi(st, nome); return i ? i.closest(".gi-ctrl") : null; };
  // cambia l'intervallo di un cursore e ci riporta dentro il valore
  const intervallo = (st, nome, min, max) => {
    const i = inputDi(st, nome);
    if (!i) return;
    if (+i.min !== min) i.min = min;
    if (+i.max !== max) i.max = max;
    const v = Math.round(+i.value);
    if (v < min) i.value = min;
    else if (v > max) i.value = max;
  };
  const intero = (st, k) => Math.round(st.p()[k]);
  // stessa unità sui due assi: allarga il riquadro [x0, x1] x [y0, y1] fino alle proporzioni della board
  const adatta = (board, x0, y1, x1, y0) => {
    const W = board.canvasWidth || 400, H = board.canvasHeight || 300;
    const u = Math.min(W / (x1 - x0), H / (y1 - y0)), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    board.setBoundingBox([cx - W / u / 2, cy + H / u / 2, cx + W / u / 2, cy - H / u / 2], false);
  };

  // ridisegna gli oggetti del grafico solo se la firma dello stato è cambiata
  function ridisegna(board, st, firma, costruisci) {
    const D = st.dati;
    if (D._board === board && D._firma === firma) return;
    if (D._board !== board) D._ogg = [];
    D._board = board; D._firma = firma;
    board.suspendUpdate();
    for (const o of D._ogg || []) { try { board.removeObject(o); } catch (e) { /* già tolto */ } }
    const ogg = [];
    const crea = (tipo, par, attr) => { const o = board.create(tipo, par, attr); ogg.push(o); return o; };
    try { costruisci(crea); } finally { D._ogg = ogg; board.unsuspendUpdate(); }
  }
  // rettangolo (curva chiusa: un solo oggetto, senza punti da togliere)
  const rett = (crea, x0, y0, x1, y1, attr) =>
    crea("curve", [[x0, x1, x1, x0, x0], [y0, y0, y1, y1, y0]],
      Object.assign({ fixed: true, highlight: false, strokeWidth: 1, fillColor: "none", fillOpacity: 0 }, attr));
  const linea = (crea, x0, y0, x1, y1, attr) =>
    crea("curve", [[x0, x1], [y0, y1]], Object.assign({ fixed: true, highlight: false, strokeWidth: 1 }, attr));
  const scritta = (crea, x, y, s, attr) =>
    crea("text", [x, y, String(s)], Object.assign({
      fixed: true, highlight: false, display: "internal", anchorX: "middle", anchorY: "middle", fontSize: 12,
    }, attr));

  // pseudocodice: righe [rientro, html]; cur = indice (o lista di indici) delle righe in esecuzione
  const codice = (righe, cur, C) => {
    const attive = new Set([].concat(cur == null ? [] : cur));
    return `<div style="font-family:'JetBrains Mono',monospace;font-size:.86em;line-height:1.5;margin:.35em 0">` +
      righe.map(([r, t], i) => `<div style="display:flex;border-radius:4px;${attive.has(i)
        ? `background:color-mix(in srgb, ${C.a} 24%, transparent);font-weight:700` : ""}">` +
        `<span style="flex:0 0 1.9em;text-align:right;padding-right:.6em;color:${C.muted};font-weight:400">${i + 1}</span>` +
        `<span style="padding-left:${1.1 * r}em">${t}</span></div>`).join("") + `</div>`;
  };
  // indicatori sotto le barre: un ▲ per posizione e sotto i nomi (uno per riga)
  const indicatori = (crea, voci, y, dy, fs, colore) => {
    const pos = new Map();
    for (const [x, nome] of voci) if (x != null) { if (!pos.has(x)) pos.set(x, []); pos.get(x).push(nome); }
    for (const [x, nomi] of pos) {
      scritta(crea, x, y, "▲", { fontSize: fs * 0.8, strokeColor: colore });
      nomi.forEach((nm, i) => scritta(crea, x, y - dy * (i + 1), nm, { fontSize: fs * 0.9, strokeColor: colore, cssStyle: "font-style:italic" }));
    }
  };
  const tab = (intest, righe, corrente, C) =>
    `<table class="gi-tabella"><tr>${intest.map((t) => `<th>${t}</th>`).join("")}</tr>` +
    righe.map((r, i) => `<tr${i === corrente ? ` style="background:color-mix(in srgb, ${C.a} 18%, transparent);font-weight:700"` : ""}>` +
      r.map((c) => `<td>${c}</td>`).join("") + `</tr>`).join("") + `</table>`;
  const v = (nome) => `<i>${nome}</i>`; // variabile dello pseudocodice

  // pulsanti dei grafici passo per passo: ◀, ▶, Esegui (+ eventuali altri)
  function ferma(st) {
    if (st.dati.timer) clearInterval(st.dati.timer);
    st.dati.timer = null;
    if (st.dati.play) st.dati.play.textContent = T("Esegui ⏵", "Run ⏵");
  }
  function comandi(st, altri = []) {
    if (st.dati.comandi && st.el.contains(st.dati.comandi)) return;
    const ctrls = st.el.querySelectorAll(".gi-ctrl");
    const ultimo = ctrls[ctrls.length - 1];
    if (!ultimo) return;
    const box = GI.h("div", { style: "display:flex;flex-wrap:wrap;gap:.35em;margin:.3em 0 .4em" });
    const bt = (testo, titolo, fz, primario) => {
      const b = GI.h("button", { class: "gi-btn" + (primario ? " primario" : ""), title: titolo, "aria-label": titolo, style: "margin:0" }, testo);
      b.onclick = fz;
      box.append(b);
      return b;
    };
    const vai = (d) => {
      const i = inputDi(st, "k");
      if (!i) return false;
      const nuovo = Math.max(+i.min, Math.min(+i.max, Math.round(+i.value) + d));
      if (nuovo === Math.round(+i.value)) return false;
      st.imposta("k", nuovo);
      return true;
    };
    bt("◀", T("un passo indietro", "one step back"), () => { ferma(st); vai(-1); });
    bt("▶", T("un passo avanti", "one step forward"), () => { ferma(st); vai(1); });
    st.dati.play = bt(T("Esegui ⏵", "Run ⏵"), T("esegui l'algoritmo fino alla fine", "run the algorithm to the end"), () => {
      if (st.dati.timer) { ferma(st); return; }
      const i = inputDi(st, "k");
      if (i && +i.value >= +i.max) st.imposta("k", 0);
      st.dati.play.textContent = T("Pausa ⏸", "Pause ⏸");
      st.dati.timer = setInterval(() => {
        if (!document.body.contains(st.el) || !vai(1)) ferma(st);
      }, st.dati.ritmo || 450);
    }, true);
    for (const [testo, titolo, fz] of altri) bt(testo, titolo, () => { ferma(st); fz(); });
    ultimo.after(box);
    st.dati.comandi = box;
  }
  // il cursore k va da 0 a K (numero di passi della traccia corrente)
  const passoK = (st, K) => { intervallo(st, "k", 0, K); return Math.max(0, Math.min(K, intero(st, "k"))); };

  const casuale = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const mescola = (A) => { for (let i = A.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [A[i], A[j]] = [A[j], A[i]]; } return A; };
  const distinti = (n, lo, hi) => mescola(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);

  window.GI_RICETTE = window.GI_RICETTE || {};

  // ================================================================
  // 1. Rappresentazione dei numeri (cap. 1)
  // ================================================================
  const tc = (n, k) => ((n % 2 ** k) + 2 ** k) % 2 ** k;            // complemento a due: 2^k + n se n < 0
  const bitsDi = (u, k) => Array.from({ length: k }, (_, i) => Math.floor(u / 2 ** (k - 1 - i)) % 2); // MSB per primo
  const esa = (u, cifre) => u.toString(16).toUpperCase().padStart(cifre, "0");
  const esaTex = (u, cifre) => `(\\mathrm{${esa(u, cifre)}})_{16}`;
  const float32 = (x) => { const f = new Float32Array([x]); return new Uint32Array(f.buffer)[0]; };
  const bin = (u) => u.toString(2);
  // geometria del riquadro: celle grandi per i k bit, piccole per i 32 bit
  const CW = 2.2, FW = 1;
  const RIGHE = {
    tc: { y0: 16.0, y1: 18.1, pesi: 18.75, titolo: 20.2, graffa: 15.55, hex: 14.7 },
    sm: { y0: 10.6, y1: 12.7, titolo: 13.6, sotto: 10.0 },
    fl: { y0: 5.6, y1: 7.2, titolo: 8.4, sotto: 4.95, graffa: 4.3, hex: 3.5 },
  };
  const xFloat = (i) => (i === 0 ? 0 : i <= 8 ? 1.5 + (i - 1) * FW : 10 + (i - 9) * FW); // bit 31-i

  window.GI_RICETTE["rappresentazione"] = {
    titolo: T("Rappresentazione dei numeri", "Representation of numbers"),
    sottotitolo: T("lo stesso intero in binario, complemento a due, modulo e segno, IEEE 754",
      "the same integer in binary, two's complement, sign-magnitude, IEEE 754"),
    parametri: [
      { k: "n", min: -128, max: 127, step: 1, val: -13, colore: "a", cifre: 0,
        descr: T("il numero intero; oppure clicca i bit delle prime due righe", "the integer; or click the bits of the first two rows") },
      { k: "k", min: 3, max: 10, step: 1, val: 8, colore: "b", cifre: 0,
        descr: T("numero di bit: \\(n\\) resta nell'intervallo del complemento a due \\([-2^{k-1},\\ 2^{k-1}-1]\\)",
          "number of bits: \\(n\\) stays in the two's complement interval \\([-2^{k-1}, 2^{k-1}-1]\\)") },
    ],
    vista: [-0.8, 21.2, 33.8, 4.0],
    rapporto: "2 / 1",
    assi: false,
    opzioniBoard: OPZ,
    legenda: (st) => {
      const C = COL(st);
      return [
        [C.blu, T("bit a 1 (complemento a due)", "bit 1 (two's complement)"), "pieno"],
        [C.viola, T("bit a 1 (modulo e segno)", "bit 1 (sign-magnitude)"), "pieno"],
        [C.d, T("segno \\(s\\)", "sign \\(s\\)"), "pieno"],
        [C.b, T("esponente \\(E\\)", "exponent \\(E\\)"), "pieno"],
        [C.c, T("parte frazionaria \\(f\\)", "fraction \\(f\\)"), "pieno"],
      ];
    },
    monta(board, st) {
      st.dati._ogg = [];
      board.containerObj.style.cursor = "pointer";
      board.on("down", (e) => {
        const [x, y] = board.getUsrCoordsOfMouse(e);
        const k = intero(st, "k"), n = intero(st, "n");
        const i = Math.floor(x / CW);
        if (i < 0 || i >= k) return;
        if (y >= RIGHE.tc.y0 && y <= RIGHE.tc.y1) {
          const u = tc(n, k) ^ (1 << (k - 1 - i));
          st.dati.menoZero = false;
          st.imposta("n", u >= 2 ** (k - 1) ? u - 2 ** k : u);
        } else if (y >= RIGHE.sm.y0 && y <= RIGHE.sm.y1) {
          if (n === -(2 ** (k - 1))) return; // non rappresentabile in modulo e segno
          if (i === 0) {
            if (n === 0) { st.dati.menoZero = !st.dati.menoZero; st.aggiorna(); } else st.imposta("n", -n);
          } else {
            const mag = Math.abs(n) ^ (1 << (k - 1 - i)), neg = n < 0 || (n === 0 && st.dati.menoZero);
            st.dati.menoZero = neg && mag === 0;
            st.imposta("n", neg ? -mag : mag);
          }
        }
      });
    },
    aggiorna(board, st) {
      const k = intero(st, "k");
      intervallo(st, "n", -(2 ** (k - 1)), 2 ** (k - 1) - 1);
      const n = intero(st, "n");
      if (n !== 0) st.dati.menoZero = false;
      const mz = !!st.dati.menoZero;
      const C = COL(st);
      ridisegna(board, st, [n, k, mz, scuro()].join("|"), (crea) => {
        const px = board.unitX;
        const fsBig = Math.max(9, Math.min(18, CW * px * 0.5)), fsSm = Math.max(7, Math.min(12, FW * px * 0.62));
        const fsTit = Math.max(9, Math.min(13, px * 0.75));
        const tit = (y, s) => scritta(crea, 0, y, s, { anchorX: "left", fontSize: fsTit, strokeColor: C.muted, cssStyle: "font-weight:600" });
        const cella = (x, y0, w, y1, bit, col, fs, attivo = true) => {
          rett(crea, x + 0.06, y0, x + w - 0.06, y1, {
            strokeColor: attivo ? (bit ? col : C.grigio) : C.line, strokeWidth: bit ? 1.6 : 1,
            fillColor: bit && attivo ? col : "none", fillOpacity: bit && attivo ? 0.22 : 0, dash: attivo ? 0 : 2,
          });
          if (attivo) scritta(crea, x + w / 2, (y0 + y1) / 2, bit, { fontSize: fs, strokeColor: C.testo });
        };
        const graffa = (x0, x1, y, col) => {
          linea(crea, x0 + 0.1, y, x1 - 0.1, y, { strokeColor: col, strokeWidth: 1.4 });
          linea(crea, x0 + 0.1, y, x0 + 0.1, y + 0.3, { strokeColor: col, strokeWidth: 1.4 });
          linea(crea, x1 - 0.1, y, x1 - 0.1, y + 0.3, { strokeColor: col, strokeWidth: 1.4 });
        };
        // complemento a due
        const R = RIGHE.tc, u = tc(n, k), B = bitsDi(u, k);
        tit(R.titolo, T(`complemento a due su k = ${k} bit (clicca un bit)`, `two's complement on k = ${k} bits (click a bit)`));
        B.forEach((b, i) => {
          cella(i * CW, R.y0, CW, R.y1, b, C.blu, fsBig);
          const peso = i === 0 ? -(2 ** (k - 1)) : 2 ** (k - 1 - i);
          scritta(crea, i * CW + CW / 2, R.pesi, String(peso).replace("-", "−"), { fontSize: Math.max(7, Math.min(11, fsBig * 0.62)), strokeColor: C.muted });
        });
        // gruppi di 4 bit da destra: una cifra esadecimale ciascuno
        const gruppi = Math.ceil(k / 4), H = esa(u, gruppi);
        for (let g = 0; g < gruppi; g++) {
          const fine = k - 4 * g, inizio = Math.max(0, fine - 4);
          graffa(inizio * CW, fine * CW, R.graffa, C.muted);
          scritta(crea, (inizio + fine) * CW / 2, R.hex, H[gruppi - 1 - g], { fontSize: fsBig * 0.8, strokeColor: C.muted });
        }
        // modulo e segno
        const S = RIGHE.sm, ok = n > -(2 ** (k - 1));
        tit(S.titolo, ok ? T("modulo e segno (clicca un bit)", "sign-magnitude (click a bit)")
          : T(`modulo e segno: n = ${n} non è rappresentabile`, `sign-magnitude: n = ${n} cannot be represented`));
        const BS = ok ? [n < 0 || mz ? 1 : 0, ...bitsDi(Math.abs(n), k - 1)] : Array(k).fill(0);
        BS.forEach((b, i) => cella(i * CW, S.y0, CW, S.y1, b, C.viola, fsBig, ok));
        graffa(0, CW, S.sotto, C.muted);
        graffa(CW, k * CW, S.sotto, C.muted);
        // IEEE 754 singola precisione
        const F = RIGHE.fl, w = float32(n), BF = bitsDi(w, 32);
        tit(F.titolo, T("IEEE 754 a singola precisione: 1 + 8 + 23 bit", "IEEE 754 single precision: 1 + 8 + 23 bits"));
        BF.forEach((b, i) => cella(xFloat(i), F.y0, FW, F.y1, b, i === 0 ? C.d : i <= 8 ? C.b : C.c, fsSm));
        graffa(0, FW, F.sotto, C.d);
        graffa(1.5, 9.5, F.sotto, C.b);
        graffa(10, 33, F.sotto, C.c);
      });
    },
    formula(p, st) {
      const k = intero(st, "k"), n = intero(st, "n"), u = tc(n, k);
      // HTML con più formule: su uno schermo stretto la riga va a capo invece di uscire dal riquadro
      return `\\(n = ${n} \\;\\longrightarrow\\; (${bitsDi(u, k).join("")})_2 = ${esaTex(u, Math.ceil(k / 4))}\\) ` +
        T(`<span style="white-space:nowrap">(complemento a due, \\(k = ${k}\\))</span>`, `<span style="white-space:nowrap">(two's complement, \\(k = ${k}\\))</span>`);
    },
    letture(p, st) {
      const k = intero(st, "k"), n = intero(st, "n"), C = COL(st), u = tc(n, k), B = bitsDi(u, k);
      let r = "";
      r += n >= 0 ? T(`<strong>Binario</strong>: \\(${n} = (${bin(n)})_2\\), cioè \\(${bin(n).length}\\) cifre.<br>`, `<strong>Binary</strong>: \\(${n} = (${bin(n)})_2\\), i.e., \\(${bin(n).length}\\) digits.<br>`)
        : T(`<strong>Binario</strong> del modulo: \\(|n| = ${-n} = (${bin(-n)})_2\\).<br>`, `<strong>Binary</strong> of the magnitude: \\(|n| = ${-n} = (${bin(-n)})_2\\).<br>`);
      const somma = B.map((b, i) => (b ? (i === 0 ? `-2^{${k - 1}}` : `2^{${k - 1 - i}}`) : null)).filter(Boolean);
      r += tinta(C.blu, T("Complemento a due", "Two's complement")) + ": " +
        (n < 0 ? T(`\\(n < 0\\): si scrive \\(2^k + n = ${2 ** k} - ${-n} = ${u}\\) in binario. `, `\\(n < 0\\): write \\(2^k + n = ${2 ** k} - ${-n} = ${u}\\) in binary. `)
          : T("\\(n \\ge 0\\): il binario su \\(k\\) bit. ", "\\(n \\ge 0\\): the binary representation on \\(k\\) bits. ")) +
        T(`Valore: \\(${somma.length ? somma.join(" + ").replace(/\+ -/g, "- ") : "0"} = ${n}\\) (il bit più significativo pesa \\(-2^{k-1}\\)). `,
          `Value: \\(${somma.length ? somma.join(" + ").replace(/\+ -/g, "- ") : "0"} = ${n}\\) (the most significant bit weighs \\(-2^{k-1}\\)). `) +
        T(`Intervallo: \\([-2^{${k - 1}},\\ 2^{${k - 1}}-1] = [${-(2 ** (k - 1))},\\ ${2 ** (k - 1) - 1}]\\).<br>`,
          `Interval: \\([-2^{${k - 1}}, 2^{${k - 1}}-1] = [${-(2 ** (k - 1))}, ${2 ** (k - 1) - 1}]\\).<br>`);
      r += T(`<strong>Esadecimale</strong>: ogni gruppo di 4 bit (da destra) è una cifra: \\(${esaTex(u, Math.ceil(k / 4))}\\).<br>`,
        `<strong>Hexadecimal</strong>: each group of 4 bits (from the right) is one digit: \\(${esaTex(u, Math.ceil(k / 4))}\\).<br>`);
      const lim = 2 ** (k - 1) - 1;
      if (n === -(2 ** (k - 1))) {
        r += tinta(C.viola, T("Modulo e segno", "Sign-magnitude")) + T(`: \\(|n| = ${-n} > 2^{k-1}-1 = ${lim}\\), non rappresentabile (intervallo \\([${-lim},\\ ${lim}]\\)).<br>`,
          `: \\(|n| = ${-n} > 2^{k-1}-1 = ${lim}\\), not representable (interval \\([${-lim}, ${lim}]\\)).<br>`);
      } else {
        const s = n < 0 || st.dati.menoZero ? 1 : 0;
        r += tinta(C.viola, T("Modulo e segno", "Sign-magnitude")) + T(`: segno \\(${s}\\), modulo \\(${Math.abs(n)}\\) su \\(k-1 = ${k - 1}\\) bit. Intervallo \\([${-lim},\\ ${lim}]\\)`,
          `: sign \\(${s}\\), magnitude \\(${Math.abs(n)}\\) on \\(k-1 = ${k - 1}\\) bits. Interval \\([${-lim}, ${lim}]\\)`) +
          (n === 0 ? T(`; lo zero ha due rappresentazioni, \\(+0\\) e \\(-0\\) (clicca il bit di segno).<br>`, `; zero has two representations, \\(+0\\) and \\(-0\\) (click the sign bit).<br>`) : ".<br>");
      }
      const w = float32(n), s = w >>> 31, E = (w >>> 23) & 255, f = bitsDi(w & 0x7fffff, 23).join("").replace(/0+$/, "");
      r += `<strong>IEEE 754</strong>: `;
      if (n === 0) r += T("lo zero ha \\(E = 0\\) e \\(f = 0\\) (valore riservato).", "zero has \\(E = 0\\) and \\(f = 0\\) (reserved value).");
      else {
        r += T(`${tinta(C.d, "\\(s = " + s + "\\)")}, ${tinta(C.b, `\\(E = (${bin(E).padStart(8, "0")})_2 = ${E}\\)`)}, quindi \\(e = E - 127 = ${E - 127}\\); `,
          `${tinta(C.d, "\\(s = " + s + "\\)")}, ${tinta(C.b, `\\(E = (${bin(E).padStart(8, "0")})_2 = ${E}\\)`)}, hence \\(e = E - 127 = ${E - 127}\\); `) +
          `\\(x = (-1)^{${s}} \\cdot (1.${f || "0"})_2 \\cdot 2^{${E - 127}} = ${n}\\), ` +
          T(`cioè \\(${esaTex(w, 8)}\\).`, `i.e., \\(${esaTex(w, 8)}\\).`);
      }
      return r;
    },
    domanda: T("Con \\(k = 4\\), clicca i bit fino a ottenere \\(1000\\) in complemento a due: che numero è? Perché in modulo e segno non c'è? Porta poi \\(n\\) da \\(-1\\) a \\(0\\) e guarda come cambiano i bit dell'esponente nella riga IEEE 754.",
      "With \\(k = 4\\), click the bits until you get \\(1000\\) in two's complement: which number is it? Why is it missing in sign-magnitude? Then move \\(n\\) from \\(-1\\) to \\(0\\) and watch the exponent bits in the IEEE 754 row."),
  };

  // ================================================================
  // 2. Ordinamento passo per passo (cap. 3)
  // ================================================================
  const PSEUDO = {
    insertion: () => [
      [0, `<b>function</b> InsertionSort(${v("a")}, ${v("n")})`],
      [1, `${v("i")} := 2`],
      [1, `<b>while</b> ${v("i")} ≤ ${v("n")}`],
      [2, `${v("key")} := ${v("a")}[${v("i")}]`],
      [2, `${v("j")} := ${v("i")} − 1`],
      [2, `<b>while</b> ${v("j")} ≥ 1 <b>and</b> ${v("a")}[${v("j")}] &gt; ${v("key")}`],
      [3, `${v("a")}[${v("j")}+1] ← ${v("a")}[${v("j")}]`],
      [3, `${v("j")} ← ${v("j")} − 1`],
      [2, `${v("a")}[${v("j")}+1] ← ${v("key")}`],
      [2, `${v("i")} ← ${v("i")} + 1`],
    ],
    exchange: () => [
      [0, `<b>function</b> ExchangeSort(${v("a")}, ${v("n")})`],
      [1, `${v("i")} := 1`],
      [1, `<b>while</b> ${v("i")} ≤ ${v("n")} − 1`],
      [2, `${v("j")} := ${v("i")} + 1`],
      [2, `<b>while</b> ${v("j")} ≤ ${v("n")}`],
      [3, `<b>if</b> ${v("a")}[${v("i")}] &gt; ${v("a")}[${v("j")}]`],
      [4, `${v("tmp")} := ${v("a")}[${v("i")}]`],
      [4, `${v("a")}[${v("i")}] ← ${v("a")}[${v("j")}]`],
      [4, `${v("a")}[${v("j")}] ← ${v("tmp")}`],
      [3, `${v("j")} ← ${v("j")} + 1`],
      [2, `${v("i")} ← ${v("i")} + 1`],
    ],
    selection: () => [
      [0, `<b>function</b> SelectionSort(${v("a")}, ${v("n")})`],
      [1, `${v("i")} := 1`],
      [1, `<b>while</b> ${v("i")} ≤ ${v("n")} − 1`],
      [2, `${v("minIdx")} := ${v("i")}`],
      [2, `${v("j")} := ${v("i")} + 1`],
      [2, `<b>while</b> ${v("j")} ≤ ${v("n")}`],
      [3, `<b>if</b> ${v("a")}[${v("j")}] &lt; ${v("a")}[${v("minIdx")}]`],
      [4, `${v("minIdx")} ← ${v("j")}`],
      [3, `${v("j")} ← ${v("j")} + 1`],
      [2, `<b>if</b> ${v("minIdx")} ≠ ${v("i")}`],
      [3, `${v("tmp")} := ${v("a")}[${v("i")}]`],
      [3, `${v("a")}[${v("i")}] ← ${v("a")}[${v("minIdx")}]`],
      [3, `${v("a")}[${v("minIdx")}] ← ${v("tmp")}`],
      [2, `${v("i")} ← ${v("i")} + 1`],
    ],
  };

  // traccia dell'esecuzione: un evento per ogni passo significativo
  // {riga, a (copia, indici 0..n-1 per a[1..n]), i, j, key, min, cmp, mv, C, M, nota, fatti}
  function tracciaOrdinamento(alg, A0) {
    const a = A0.slice(), n = a.length, E = [];
    let C = 0, M = 0;
    const ev = (o) => E.push(Object.assign({ a: a.slice(), C, M, cmp: [], mv: [] }, o));
    ev({ riga: 0, nota: T("Array iniziale.", "Initial array.") });
    if (alg === "insertion") {
      for (let i = 2; i <= n; i++) {
        const key = a[i - 1];
        ev({ riga: [3, 4], i, j: i - 1, key, ord: i - 1, nota: T(`Si prende \\(\\mathit{key} = a[${i}] = ${key}\\): va inserito in \\(a[1..${i - 1}]\\), già ordinato.`, `Take \\(\\mathit{key} = a[${i}] = ${key}\\): it must be inserted into \\(a[1..${i - 1}]\\), already sorted.`) });
        let j = i - 1;
        for (;;) {
          if (j < 1) { ev({ riga: 5, i, j, key, ord: i - 1, nota: T("\\(j = 0\\): il ciclo interno si ferma senza confronto.", "\\(j = 0\\): the inner loop stops with no comparison.") }); break; }
          C++;
          const vero = a[j - 1] > key;
          ev({ riga: 5, i, j, key, ord: i - 1, cmp: [j], nota: T(`Confronto \\(a[${j}] = ${a[j - 1]} > \\mathit{key} = ${key}\\)? ${vero ? "Sì" : "No: il ciclo interno si ferma"}.`, `Comparison \\(a[${j}] = ${a[j - 1]} > \\mathit{key} = ${key}\\)? ${vero ? "Yes" : "No: the inner loop stops"}.`) });
          if (!vero) break;
          a[j] = a[j - 1]; M++;
          ev({ riga: [6, 7], i, j: j - 1, key, ord: i - 1, mv: [j + 1], nota: T(`Spostamento: \\(a[${j + 1}] \\leftarrow a[${j}] = ${a[j]}\\), poi \\(j \\leftarrow ${j - 1}\\).`, `Shift: \\(a[${j + 1}] \\leftarrow a[${j}] = ${a[j]}\\), then \\(j \\leftarrow ${j - 1}\\).`) });
          j--;
        }
        a[j] = key;
        ev({ riga: [8, 9], i, j, ord: i, ins: [j + 1], nota: T(`Inserimento: \\(a[${j + 1}] \\leftarrow \\mathit{key} = ${key}\\); ora \\(a[1..${i}]\\) è ordinato.`, `Insertion: \\(a[${j + 1}] \\leftarrow \\mathit{key} = ${key}\\); now \\(a[1..${i}]\\) is sorted.`) });
      }
    } else if (alg === "exchange") {
      for (let i = 1; i <= n - 1; i++) {
        for (let j = i + 1; j <= n; j++) {
          C++;
          const vero = a[i - 1] > a[j - 1];
          ev({ riga: 5, i, j, fin: i - 1, cmp: [i, j], nota: T(`Confronto \\(a[${i}] = ${a[i - 1]} > a[${j}] = ${a[j - 1]}\\)? ${vero ? "Sì: scambio" : "No"}.`, `Comparison \\(a[${i}] = ${a[i - 1]} > a[${j}] = ${a[j - 1]}\\)? ${vero ? "Yes: swap" : "No"}.`) });
          if (vero) {
            [a[i - 1], a[j - 1]] = [a[j - 1], a[i - 1]]; M++;
            ev({ riga: [6, 7, 8], i, j, fin: i - 1, mv: [i, j], nota: T(`Scambio di \\(a[${i}]\\) e \\(a[${j}]\\): ora \\(a[${i}] = ${a[i - 1]}\\).`, `Swap \\(a[${i}]\\) and \\(a[${j}]\\): now \\(a[${i}] = ${a[i - 1]}\\).`) });
          }
        }
        ev({ riga: 10, i, fin: i, nota: T(`Fine dell'iterazione \\(i = ${i}\\): \\(a[${i}] = ${a[i - 1]}\\) è il minimo di \\(a[${i}..${n}]\\), al suo posto definitivo.`, `End of iteration \\(i = ${i}\\): \\(a[${i}] = ${a[i - 1]}\\) is the minimum of \\(a[${i}..${n}]\\), in its final position.`) });
      }
    } else {
      for (let i = 1; i <= n - 1; i++) {
        let min = i;
        ev({ riga: [3, 4], i, min, fin: i - 1, nota: T(`\\(\\mathit{minIdx} := ${i}\\): si cerca il minimo di \\(a[${i}..${n}]\\).`, `\\(\\mathit{minIdx} := ${i}\\): search for the minimum of \\(a[${i}..${n}]\\).`) });
        for (let j = i + 1; j <= n; j++) {
          C++;
          const vero = a[j - 1] < a[min - 1];
          ev({ riga: 6, i, j, min, fin: i - 1, cmp: [j, min], nota: T(`Confronto \\(a[${j}] = ${a[j - 1]} < a[\\mathit{minIdx}] = a[${min}] = ${a[min - 1]}\\)? ${vero ? "Sì" : "No"}.`, `Comparison \\(a[${j}] = ${a[j - 1]} < a[\\mathit{minIdx}] = a[${min}] = ${a[min - 1]}\\)? ${vero ? "Yes" : "No"}.`) });
          if (vero) { min = j; ev({ riga: 7, i, j, min, fin: i - 1, nota: T(`Nuovo minimo: \\(\\mathit{minIdx} \\leftarrow ${j}\\).`, `New minimum: \\(\\mathit{minIdx} \\leftarrow ${j}\\).`) }); }
        }
        if (min !== i) {
          [a[i - 1], a[min - 1]] = [a[min - 1], a[i - 1]]; M++;
          ev({ riga: [9, 10, 11, 12], i, min, fin: i, mv: [i, min], nota: T(`\\(\\mathit{minIdx} = ${min} \\ne i\\): scambio di \\(a[${i}]\\) e \\(a[${min}]\\); \\(a[${i}] = ${a[i - 1]}\\) è al suo posto.`, `\\(\\mathit{minIdx} = ${min} \\ne i\\): swap \\(a[${i}]\\) and \\(a[${min}]\\); \\(a[${i}] = ${a[i - 1]}\\) is in place.`) });
        } else {
          ev({ riga: 9, i, min, fin: i, nota: T(`\\(\\mathit{minIdx} = i = ${i}\\): nessuno scambio, \\(a[${i}] = ${a[i - 1]}\\) è già al suo posto.`, `\\(\\mathit{minIdx} = i = ${i}\\): no swap, \\(a[${i}] = ${a[i - 1]}\\) is already in place.`) });
        }
      }
    }
    ev({ riga: 2, fine: true, ord: n, fin: n, nota: T("Il ciclo esterno termina: l'array è ordinato.", "The outer loop ends: the array is sorted.") });
    return E;
  }
  const ALG = {
    insertion: { tex: "I", etichetta: "Insertion Sort", mossa: T("spostamenti", "shifts") },
    exchange: { tex: "E", etichetta: "Exchange Sort", mossa: T("scambi", "swaps") },
    selection: { tex: "S", etichetta: "Selection Sort", mossa: T("scambi", "swaps") },
  };
  const ARRAY0 = [12, 11, 13, 5, 6, 3, 9, 1, 8, 4];
  const ordStato = (st) => {
    const D = st.dati;
    if (!D.arr) D.arr = ARRAY0.slice();
    const firma = st.chiave() + ":" + D.arr.join(",");
    if (D.trFirma !== firma) { D.tr = tracciaOrdinamento(st.chiave(), D.arr); D.trFirma = firma; }
    const k = passoK(st, D.tr.length - 1);
    return { E: D.tr[k], k, K: D.tr.length - 1, n: D.arr.length };
  };

  window.GI_RICETTE["ordinamento"] = {
    titolo: T("Ordinamento passo per passo", "Sorting step by step"),
    sottotitolo: T("confronti e spostamenti dei tre algoritmi del capitolo", "comparisons and moves of the three algorithms of the chapter"),
    funzioni: ALG,
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [
      { k: "k", min: 0, max: 60, step: 1, val: 0, colore: "a", cifre: 0,
        descr: T("passo dell'esecuzione: usa ◀ ▶ per un passo alla volta, «Esegui» per vederla tutta",
          "execution step: use ◀ ▶ for one step at a time, «Run» to watch all of it") },
    ],
    vista: [-0.9, 15, 13, -6],
    assi: false,
    opzioniBoard: OPZ,
    legenda: (st) => {
      const C = COL(st), ins = st.chiave() === "insertion";
      return [
        [C.grigio, T("chiavi", "keys"), "pieno"],
        [C.a, T("confronto", "comparison"), "pieno"],
        [C.d, ins ? T("spostamento / inserimento", "shift / insertion") : T("scambio", "swap"), "pieno"],
        [C.b, ins ? "\\(\\mathit{key}\\)" : st.chiave() === "selection" ? "\\(a[\\mathit{minIdx}]\\)" : T("—", "—"), "pieno"],
        [C.blu, ins ? T("\\(a[1..i-1]\\) ordinato", "\\(a[1..i-1]\\) sorted") : T("al posto definitivo", "in final position"), "pieno"],
      ].filter((x) => x[1] !== "—");
    },
    monta(board, st) {
      st.dati._ogg = [];
      if (st.dati.ultima !== st.chiave()) { const i = inputDi(st, "k"); if (i) i.value = 0; st.dati.ultima = st.chiave(); ferma(st); }
      const nuovo = (A) => { st.dati.arr = A; const i = inputDi(st, "k"); if (i) i.value = 0; st.aggiorna(); };
      comandi(st, [
        [T("Nuovo array", "New array"), T("array casuale di 8-12 chiavi", "random array of 8-12 keys"), () => nuovo(distinti(casuale(8, 12), 1, 20))],
        [T("Crescente", "Increasing"), T("array già ordinato (caso migliore)", "already sorted array (best case)"), () => nuovo(st.dati.arr.slice().sort((x, y) => x - y))],
        [T("Decrescente", "Decreasing"), T("array in ordine decrescente", "array in decreasing order"), () => nuovo(st.dati.arr.slice().sort((x, y) => y - x))],
      ]);
    },
    aggiorna(board, st) {
      const { E, k, n } = ordStato(st), C = COL(st), alg = st.chiave();
      ridisegna(board, st, [alg, st.dati.trFirma, k, scuro()].join("|"), (crea) => {
        const H = Math.max(...E.a, 1);
        board.setBoundingBox([-0.9, 1.08 * H, n + (alg === "insertion" ? 2.5 : 1.0), -0.34 * H], false);
        const fs = Math.max(8, Math.min(13, board.unitX * 0.42));
        linea(crea, 0.4, 0, n + 0.6, 0, { strokeColor: C.grigio, strokeWidth: 1.2 });
        const cmp = new Set(E.cmp), mv = new Set([...(E.mv || []), ...(E.ins || [])]);
        for (let p = 1; p <= n; p++) {
          let col = C.grigio, op = 0.45;
          if (E.fine || (E.fin != null && p <= E.fin) || (E.ord != null && p <= E.ord && !E.fine)) { col = C.blu; op = 0.4; }
          if (alg === "selection" && E.min === p && !E.fine) { col = C.b; op = 0.55; }
          if (cmp.has(p)) { col = C.a; op = 0.7; }
          if (mv.has(p)) { col = C.d; op = 0.7; }
          rett(crea, p - 0.36, 0, p + 0.36, E.a[p - 1], { strokeColor: col, fillColor: col, fillOpacity: op, strokeWidth: 1.5 });
          scritta(crea, p, -0.07 * H, p, { fontSize: fs * 0.85, strokeColor: C.muted });
        }
        // la chiave da inserire, fuori dall'array (Insertion Sort)
        if (alg === "insertion" && E.key != null) {
          const x = n + 1.6, c = E.cmp.length ? C.a : C.b;
          linea(crea, n + 0.95, 0, n + 0.95, H, { strokeColor: C.line, strokeWidth: 1, dash: 2 });
          rett(crea, x - 0.36, 0, x + 0.36, E.key, { strokeColor: c, fillColor: c, fillOpacity: 0.6, strokeWidth: 1.5 });
          scritta(crea, x, -0.07 * H, "key", { fontSize: fs * 0.85, strokeColor: C.muted, cssStyle: "font-style:italic" });
        }
        // indici i, j, minIdx sotto le barre
        if (!E.fine) indicatori(crea, [[E.i, "i"], [E.j, "j"], ...(alg === "selection" ? [[E.min, "minIdx"]] : [])], -0.15 * H, 0.075 * H, fs, C.testo);
      });
    },
    formula(p, st) {
      const { E, k, K } = ordStato(st);
      return T(`\\text{passo } ${k}/${K}:\\quad \\text{confronti } ${E.C},\\quad \\text{${ALG[st.chiave()].mossa} } ${E.M}`,
        `\\text{step } ${k}/${K}:\\quad \\text{comparisons } ${E.C},\\quad \\text{${ALG[st.chiave()].mossa} } ${E.M}`);
    },
    letture(p, st) {
      const { E, n } = ordStato(st), C = COL(st), alg = st.chiave();
      const cmp = new Set(E.cmp), mv = new Set([...(E.mv || []), ...(E.ins || [])]);
      const arr = E.a.map((x, i) => (mv.has(i + 1) ? fondo(C.d, x) : cmp.has(i + 1) ? fondo(C.a, x) : x)).join(", ");
      let r = `${E.nota}<br>\\(a\\) = [${arr}]`;
      const vars = [];
      if (E.i != null && !E.fine) vars.push(`\\(i = ${E.i}\\)`);
      if (E.j != null && !E.fine) vars.push(`\\(j = ${E.j}\\)`);
      if (E.key != null) vars.push(`\\(\\mathit{key} = ${E.key}\\)`);
      if (alg === "selection" && E.min != null && !E.fine) vars.push(`\\(\\mathit{minIdx} = ${E.min}\\)`);
      if (vars.length) r += "; " + vars.join(", ");
      r += codice(PSEUDO[alg](), E.riga, C);
      const tot = (n * (n - 1)) / 2;
      r += T(`Confronti fra chiavi: \\(${E.C}\\); ${ALG[alg].mossa}: \\(${E.M}\\).`, `Key comparisons: \\(${E.C}\\); ${ALG[alg].mossa}: \\(${E.M}\\).`);
      if (E.fine) {
        r += alg === "insertion"
          ? T(` Con \\(n = ${n}\\): fra \\(n - 1 = ${n - 1}\\) (array ordinato) e \\(\\frac{n(n-1)}{2} = ${tot}\\) (decrescente).`, ` With \\(n = ${n}\\): between \\(n - 1 = ${n - 1}\\) (sorted array) and \\(\\frac{n(n-1)}{2} = ${tot}\\) (decreasing).`)
          : alg === "exchange"
            ? T(` I confronti sono sempre \\(\\frac{n(n-1)}{2} = ${tot}\\); gli scambi fra \\(0\\) e \\(${tot}\\).`, ` The comparisons are always \\(\\frac{n(n-1)}{2} = ${tot}\\); the swaps between \\(0\\) and \\(${tot}\\).`)
            : T(` I confronti sono sempre \\(\\frac{n(n-1)}{2} = ${tot}\\); gli scambi al più \\(n - 1 = ${n - 1}\\).`, ` The comparisons are always \\(\\frac{n(n-1)}{2} = ${tot}\\); the swaps at most \\(n - 1 = ${n - 1}\\).`);
      }
      return r;
    },
    domanda: T("Esegui i tre algoritmi sullo stesso array e confronta i contatori finali. Poi premi «Crescente» e «Decrescente»: quale algoritmo cambia il numero di confronti? Quale fa al più \\(n-1\\) scambi?",
      "Run the three algorithms on the same array and compare the final counters. Then press «Increasing» and «Decreasing»: which algorithm changes its number of comparisons? Which one performs at most \\(n-1\\) swaps?"),
  };

  // ================================================================
  // 3. Ricerca lineare e binaria (cap. 4)
  // ================================================================
  const ARRAY_R = [3, 9, 11, 12, 16, 19, 23, 27, 31, 38, 42, 47, 51, 56, 60];
  function tracciaRicerca(a, m) {
    const n = a.length;
    let L = 0, trovL = -1;
    for (let i = 1; i <= n; i++) { L++; if (a[i - 1] === m) { trovL = i; break; } }
    const B = [];
    let left = 1, right = n, trovB = -1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2), x = a[mid - 1];
      const az = x === m ? "trovato" : x < m ? "destra" : "sinistra";
      B.push({ left, right, mid, x, az });
      if (az === "trovato") { trovB = mid; break; }
      if (az === "destra") left = mid + 1; else right = mid - 1;
    }
    return { L, trovL, B, trovB, fineB: { left, right }, K: Math.max(L, B.length) + (trovL < 0 ? 1 : 0) };
  }
  const ricStato = (st) => {
    const D = st.dati;
    if (!D.arr) D.arr = ARRAY_R.slice();
    const H = D.arr[D.arr.length - 1];
    intervallo(st, "m", 0, H + 3);
    const m = intero(st, "m");
    const firma = D.arr.join(",") + ":" + m;
    if (D.trFirma !== firma) { D.tr = tracciaRicerca(D.arr, m); D.trFirma = firma; }
    const k = passoK(st, D.tr.K);
    return { a: D.arr, n: D.arr.length, m, k, R: D.tr, H };
  };

  window.GI_RICETTE["ricerca"] = {
    titolo: T("Ricerca lineare e ricerca binaria", "Linear search and binary search"),
    sottotitolo: T("lo stesso array ordinato, gli stessi passi", "the same sorted array, the same steps"),
    parametri: [
      { k: "m", min: 0, max: 63, step: 1, val: 38, colore: "e", cifre: 0, descr: T("il valore cercato", "the target value") },
      { k: "k", min: 0, max: 15, step: 1, val: 0, colore: "a", cifre: 0,
        descr: T("passo: al passo \\(k\\) ciascun metodo ha fatto \\(k\\) confronti (se non ha già finito)",
          "step: at step \\(k\\) each method has made \\(k\\) comparisons (unless it has already finished)") },
    ],
    vista: [-0.6, 160, 16, -25],
    assi: false,
    opzioniBoard: OPZ,
    legenda: (st) => {
      const C = COL(st);
      return [
        [C.blu, T("ancora da esaminare", "still to examine"), "pieno"],
        [C.rosso, T("confrontato con \\(m\\)", "compared with \\(m\\)"), "pieno"],
        [C.grigio, T("scartato", "discarded"), "pieno"],
        [C.c, T("trovato", "found"), "pieno"],
        [C.e, T("valore cercato \\(m\\)", "target value \\(m\\)"), "dashed"],
      ];
    },
    monta(board, st) {
      st.dati._ogg = [];
      comandi(st, [
        [T("Nuovo array", "New array"), T("nuovo array ordinato casuale", "new random sorted array"), () => {
          const n = casuale(12, 16);
          st.dati.arr = distinti(n, 1, 64).sort((x, y) => x - y);
          const im = inputDi(st, "m"), ik = inputDi(st, "k");
          if (im) im.value = st.dati.arr[casuale(0, n - 1)];
          if (ik) ik.value = 0;
          st.aggiorna();
        }],
      ]);
    },
    aggiorna(board, st) {
      const { a, n, m, k, R, H } = ricStato(st), C = COL(st);
      ridisegna(board, st, [st.dati.trFirma, k, scuro()].join("|"), (crea) => {
        const Y0 = 1.62 * H; // base del pannello della ricerca lineare
        board.setBoundingBox([-0.6, Y0 + 1.16 * H, n + 1.6, -0.4 * H], false);
        const fs = Math.max(8, Math.min(13, board.unitX * 0.4)), fsT = Math.max(9, Math.min(13, board.unitX * 0.5));
        const pannello = (y0, titolo, colore) => {
          linea(crea, 0.4, y0, n + 0.6, y0, { strokeColor: C.grigio, strokeWidth: 1.2 });
          linea(crea, 0.4, y0 + m, n + 0.6, y0 + m, { strokeColor: C.e, strokeWidth: 2, dash: 2 });
          scritta(crea, 0.4, y0 + 1.1 * H, titolo, { anchorX: "left", fontSize: fsT, strokeColor: C.muted, cssStyle: "font-weight:600" });
          for (let p = 1; p <= n; p++) {
            const c = colore(p);
            rett(crea, p - 0.34, y0, p + 0.34, y0 + a[p - 1], { strokeColor: c, fillColor: c, fillOpacity: 0.5, strokeWidth: 1.4 });
            scritta(crea, p, y0 - 0.06 * H, p, { fontSize: fs * 0.85, strokeColor: C.muted });
          }
        };
        // ricerca lineare
        const kl = Math.min(k, R.L), finitaL = k > R.L || (k === R.L && R.trovL > 0);
        pannello(Y0, T("LinearSearch", "LinearSearch"), (p) => {
          if (R.trovL === p && k >= R.L) return C.c;
          if (p < kl || (finitaL && R.trovL < 0)) return C.grigio;
          if (p === kl) return C.rosso;
          return C.blu;
        });
        if (kl >= 1 && !(finitaL && R.trovL < 0)) indicatori(crea, [[kl, "i"]], Y0 - 0.13 * H, 0.07 * H, fs, C.testo);
        // ricerca binaria
        const nb = R.B.length, it = k === 0 ? null : k <= nb ? R.B[k - 1] : null;
        const finitaB = k >= nb && (R.trovB > 0 || k > nb);
        const lr = it ? it : k === 0 ? { left: 1, right: n } : R.fineB;
        pannello(0, T("BinarySearch", "BinarySearch"), (p) => {
          if (R.trovB === p && k >= nb) return C.c;
          if (it && p === it.mid) return C.rosso;
          if (finitaB && R.trovB < 0) return C.grigio;
          return p >= lr.left && p <= lr.right ? C.blu : C.grigio;
        });
        indicatori(crea, [[it ? it.mid : null, "mid"], [lr.left, "left"], [lr.right, "right"]], -0.13 * H, 0.07 * H, fs, C.testo);
      });
    },
    formula(p, st) {
      const { k, R } = ricStato(st);
      return T(`\\text{confronti: lineare } ${Math.min(k, R.L)},\\quad \\text{binaria } ${Math.min(k, R.B.length)}`,
        `\\text{comparisons: linear } ${Math.min(k, R.L)},\\quad \\text{binary } ${Math.min(k, R.B.length)}`);
    },
    letture(p, st) {
      const { a, n, m, k, R } = ricStato(st), C = COL(st);
      let r = `\\(a\\) = [${a.join(", ")}], \\(n = ${n}\\), \\(m = ${m}\\).<br>`;
      // lineare
      r += `<strong>LinearSearch</strong>: `;
      if (k === 0) r += T("\\(i := 1\\).", "\\(i := 1\\).");
      else if (k <= R.L) {
        const i = k, x = a[i - 1];
        r += x === m ? T(`\\(a[${i}] = ${x} = m\\): ${tinta(C.c, `restituisce \\(${i}\\)`)} dopo \\(${i}\\) confronti.`, `\\(a[${i}] = ${x} = m\\): ${tinta(C.c, `returns \\(${i}\\)`)} after \\(${i}\\) comparisons.`)
          : T(`\\(a[${i}] = ${x} \\ne m\\), \\(i \\leftarrow ${i + 1}\\).`, `\\(a[${i}] = ${x} \\ne m\\), \\(i \\leftarrow ${i + 1}\\).`);
      } else if (R.trovL > 0) r += T(`trovato in \\(${R.trovL}\\) con \\(${R.L}\\) confronti.`, `found at \\(${R.trovL}\\) with \\(${R.L}\\) comparisons.`);
      else r += T(`\\(i = ${n + 1} > n\\): restituisce \\(-1\\) dopo \\(n = ${n}\\) confronti.`, `\\(i = ${n + 1} > n\\): returns \\(-1\\) after \\(n = ${n}\\) comparisons.`);
      // binaria: tabella delle iterazioni come nelle dispense
      r += `<br><strong>BinarySearch</strong>: `;
      const az = (q) => q.az === "trovato" ? T(`\\(a[\\mathit{mid}] = m\\): restituisce \\(${q.mid}\\)`, `\\(a[\\mathit{mid}] = m\\): returns \\(${q.mid}\\)`)
        : q.az === "destra" ? `\\(${q.x} < ${m} \\Rightarrow \\mathit{left} \\leftarrow ${q.mid + 1}\\)` : `\\(${q.x} > ${m} \\Rightarrow \\mathit{right} \\leftarrow ${q.mid - 1}\\)`;
      const vis = R.B.slice(0, Math.min(k, R.B.length));
      if (!vis.length) r += T(`\\(\\mathit{left} := 1\\), \\(\\mathit{right} := ${n}\\).`, `\\(\\mathit{left} := 1\\), \\(\\mathit{right} := ${n}\\).`);
      else {
        r += tab([T("iter.", "iter."), "<i>left</i>", "<i>right</i>", "<i>mid</i>", "<i>a</i>[<i>mid</i>]", T("azione", "action")],
          vis.map((q, i) => [i + 1, q.left, q.right, q.mid, q.x, az(q)]), vis.length - 1, C);
        if (k > R.B.length && R.trovB < 0) r += T(`\\(\\mathit{left} = ${R.fineB.left} > \\mathit{right} = ${R.fineB.right}\\): restituisce \\(-1\\).`, `\\(\\mathit{left} = ${R.fineB.left} > \\mathit{right} = ${R.fineB.right}\\): returns \\(-1\\).`);
      }
      const lim = Math.floor(Math.log2(n)) + 1;
      if (k >= R.K) {
        r += T(`<br>Totale: lineare \\(${R.L}\\) confronti (al più \\(n = ${n}\\)), binaria \\(${R.B.length}\\) (al più \\(\\lfloor \\log_2 n \\rfloor + 1 = ${lim}\\)).`,
          `<br>Total: linear \\(${R.L}\\) comparisons (at most \\(n = ${n}\\)), binary \\(${R.B.length}\\) (at most \\(\\lfloor \\log_2 n \\rfloor + 1 = ${lim}\\)).`);
      }
      return r;
    },
    domanda: T("Scegli un \\(m\\) che non è nell'array e premi «Esegui»: quanti confronti fa ciascun metodo? Prova poi \\(m\\) uguale al primo e all'ultimo elemento: quando conviene la ricerca lineare?",
      "Pick an \\(m\\) that is not in the array and press «Run»: how many comparisons does each method make? Then try \\(m\\) equal to the first and to the last element: when is linear search better?"),
  };

  // ================================================================
  // 4. Euclide e crivello di Eratostene (cap. 5)
  // ================================================================
  const MCD = T("\\operatorname{MCD}", "\\gcd");
  function tracciaEuclide(n, m) {
    const S = [];
    let x = n, y = m;
    while (y !== 0) { const q = Math.floor(x / y), r = x % y; S.push({ n: x, m: y, q, r }); x = y; y = r; }
    return { S, g: x };
  }
  // quadrati della tassellatura: rettangolo [0,n]x[0,m]; a ogni passo n sta lungo un asse,
  // si tolgono q quadrati di lato m e resta un rettangolo m x r (assi scambiati)
  function quadrati(n, m) {
    const { S, g } = tracciaEuclide(n, m), Q = [];
    let x = 0, y = 0, lungoX = true;
    S.forEach((s, idx) => {
      for (let t = 0; t < s.q; t++) {
        Q.push({ passo: idx + 1, x0: lungoX ? x + t * s.m : x, y0: lungoX ? y : y + t * s.m, l: s.m });
      }
      if (lungoX) x += s.q * s.m; else y += s.q * s.m;
      lungoX = !lungoX;
    });
    return { S, g, Q };
  }
  function tracciaCrivello(n) {
    const prime = new Uint8Array(n + 1).fill(1);
    prime[0] = 0; prime[1] = 0;
    const E = [], rad = Math.floor(Math.sqrt(n));
    let marcati = 0;
    const ev = (o) => E.push(Object.assign({ pr: prime.slice(), marcati }, o));
    ev({ riga: [1, 2, 3], nota: T("Tutti gli elementi valgono \\(1\\), tranne \\(\\mathit{prime}[1] = 0\\).", "All the entries are \\(1\\), except \\(\\mathit{prime}[1] = 0\\).") });
    for (let p = 2; p <= rad; p++) {
      if (!prime[p]) { ev({ riga: 6, p, salta: true, nota: T(`\\(\\mathit{prime}[${p}] = 0\\): \\(${p}\\) non è primo, si passa oltre.`, `\\(\\mathit{prime}[${p}] = 0\\): \\(${p}\\) is not prime, skip it.`) }); continue; }
      ev({ riga: [6, 7], p, j: p * p, nota: T(`\\(\\mathit{prime}[${p}] = 1\\): \\(${p}\\) è primo; si cancellano i suoi multipli da \\(j = p^2 = ${p * p}\\).`, `\\(\\mathit{prime}[${p}] = 1\\): \\(${p}\\) is prime; cross out its multiples from \\(j = p^2 = ${p * p}\\).`) });
      for (let j = p * p; j <= n; j += p) {
        const gia = !prime[j];
        prime[j] = 0; marcati++;
        ev({ riga: [9, 10], p, j, nuovo: j, gia, nota: T(`\\(\\mathit{prime}[${j}] \\leftarrow 0\\)${gia ? " (era già \\(0\\))" : ""}; \\(j \\leftarrow ${j + p}\\).`, `\\(\\mathit{prime}[${j}] \\leftarrow 0\\)${gia ? " (it was already \\(0\\))" : ""}; \\(j \\leftarrow ${j + p}\\).`) });
      }
    }
    ev({ riga: 12, fine: true, nota: T(`\\(p = ${rad + 1} > \\lfloor\\sqrt{${n}}\\rfloor = ${rad}\\): il ciclo esterno termina.`, `\\(p = ${rad + 1} > \\lfloor\\sqrt{${n}}\\rfloor = ${rad}\\): the outer loop ends.`) });
    return { E, rad };
  }
  const PSEUDO_EUCLIDE = () => [
    [0, `<b>function</b> EuclideanAlgorithm(${v("n")}, ${v("m")})`],
    [1, `<b>while</b> ${v("m")} ≠ 0`],
    [2, `${v("r")} := ${v("n")} <b>mod</b> ${v("m")}`],
    [2, `${v("n")} ← ${v("m")}`],
    [2, `${v("m")} ← ${v("r")}`],
    [1, `<b>return</b> ${v("n")}`],
  ];
  const PSEUDO_CRIVELLO = () => [
    [0, `<b>function</b> SieveOfEratosthenes(${v("n")})`],
    [1, `${v("prime")} := new array[1..${v("n")}]`],
    [1, `${v("prime")} ← 1`],
    [1, `${v("prime")}[1] ← 0`],
    [1, `${v("p")} := 2`],
    [1, `<b>while</b> ${v("p")} ≤ ⌊√${v("n")}⌋`],
    [2, `<b>if</b> ${v("prime")}[${v("p")}] = 1`],
    [3, `${v("j")} := ${v("p")}²`],
    [3, `<b>while</b> ${v("j")} ≤ ${v("n")}`],
    [4, `${v("prime")}[${v("j")}] ← 0`],
    [4, `${v("j")} ← ${v("j")} + ${v("p")}`],
    [2, `${v("p")} ← ${v("p")} + 1`],
    [1, `<b>return</b> ${v("prime")}`],
  ];
  const DESCR_N = {
    mcd: T("il primo numero \\(n \\ge 1\\)", "the first number \\(n \\ge 1\\)"),
    crivello: T("si cercano i primi \\(\\le n\\)", "find the primes \\(\\le n\\)"),
  };
  const ecStato = (st) => {
    const D = st.dati, ch = st.chiave(), n = intero(st, "n"), m = intero(st, "m");
    const firma = ch === "mcd" ? `mcd:${n}:${m}` : `cr:${n}`;
    if (D.trFirma !== firma) { D.tr = ch === "mcd" ? quadrati(n, m) : tracciaCrivello(n); D.trFirma = firma; }
    const K = ch === "mcd" ? D.tr.S.length : D.tr.E.length - 1;
    return { ch, n, m, T: D.tr, K, k: passoK(st, K) };
  };

  window.GI_RICETTE["euclide-crivello"] = {
    titolo: T("Algoritmi numerici passo per passo", "Numerical algorithms step by step"),
    sottotitolo: T("l'algoritmo di Euclide e il crivello di Eratostene", "the Euclidean algorithm and the sieve of Eratosthenes"),
    funzioni: {
      mcd: { tex: "E", etichetta: T("MCD (Euclide)", "GCD (Euclid)") },
      crivello: { tex: "C", etichetta: T("Crivello di Eratostene", "Sieve of Eratosthenes") },
    },
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [
      { k: "n", min: 1, max: 150, step: 1, val: 48, colore: "a", cifre: 0, descr: DESCR_N.mcd },
      { k: "m", min: 1, max: 150, step: 1, val: 18, colore: "b", cifre: 0, descr: T("il secondo numero \\(m \\ge 1\\)", "the second number \\(m \\ge 1\\)") },
      { k: "k", min: 0, max: 10, step: 1, val: 0, colore: "c", cifre: 0, descr: T("passo dell'esecuzione", "execution step") },
    ],
    vista: [-2, 52, 52, -2],
    stessaScala: true,
    assi: false,
    opzioniBoard: OPZ,
    legenda: (st) => {
      const C = COL(st);
      return st.chiave() === "mcd"
        ? [
          [C.a, T("quadrati di lato \\(m\\), un colore per passo", "squares of side \\(m\\), one colour per step"), "pieno"],
          [C.grigio, T("rettangolo ancora da coprire", "rectangle still to cover"), "dashed"],
          [C.blu, T("quadrati di lato \\(" + MCD + "(n, m)\\)", "squares of side \\(" + MCD + "(n, m)\\)"), "pieno"],
        ]
        : [
          [C.rosso, T("\\(p\\) corrente", "current \\(p\\)"), "pieno"],
          [C.blu, T("appena cancellato", "just crossed out"), "pieno"],
          [C.grigio, T("cancellato \\((\\mathit{prime} = 0)\\)", "crossed out \\((\\mathit{prime} = 0)\\)"), "pieno"],
          [C.c, T("primo (ormai certo)", "prime (already certain)"), "pieno"],
        ];
    },
    monta(board, st) {
      st.dati._ogg = [];
      const ch = st.chiave();
      if (st.dati.ultima !== ch) {
        st.dati.ultima = ch;
        ferma(st);
        const in_ = inputDi(st, "n"), im = inputDi(st, "m"), ik = inputDi(st, "k");
        if (in_) { in_.min = ch === "mcd" ? 1 : 2; in_.value = ch === "mcd" ? 48 : 50; }
        if (im) im.value = 18;
        if (ik) ik.value = 0;
        const cm = ctrlDi(st, "m");
        if (cm) cm.hidden = ch !== "mcd";
        const cn = ctrlDi(st, "n"), sm = cn && cn.querySelector("small");
        if (sm) { sm.innerHTML = GI.mj(DESCR_N[ch]); GI.typeset(sm); }
        st.dati.ritmo = ch === "mcd" ? 900 : 260;
      }
      comandi(st);
    },
    aggiorna(board, st) {
      const S = ecStato(st), C = COL(st);
      ridisegna(board, st, [S.ch, st.dati.trFirma, S.k, scuro()].join("|"), (crea) => {
        if (S.ch === "mcd") disegnaEuclide(crea, board, S, C);
        else disegnaCrivello(crea, board, S, C);
      });
    },
    formula(p, st) {
      const S = ecStato(st);
      if (S.ch === "mcd") {
        let coppie = [[S.n, S.m], ...S.T.S.map((s) => [s.m, s.r])].slice(0, S.k + 1).map(([x, y]) => `${MCD}(${x}, ${y})`);
        if (coppie.length > 4) coppie = [coppie[0], "\\cdots", ...coppie.slice(-2)];
        return coppie.join(" = ") + (S.k === S.K ? ` = ${S.T.g}` : "");
      }
      const E = S.T.E[S.k];
      return `n = ${S.n},\\quad \\lfloor\\sqrt{n}\\rfloor = ${S.T.rad}` + (E.p ? `,\\quad p = ${E.p}` : "") + (E.nuovo ? `,\\quad j = ${E.j}` : "");
    },
    letture(p, st) {
      const S = ecStato(st), C = COL(st);
      if (S.ch === "mcd") {
        const righe = S.T.S.map((s, i) => [i + 1, s.n, s.m, `\\(${s.n} \\bmod ${s.m} = ${s.r}\\)`, `\\(${s.n} = ${s.q} \\cdot ${s.m} + ${s.r}\\)`]);
        righe.push([S.K + 1, S.T.g, 0, T("— (fine del ciclo)", "— (loop ends)"), ""]);
        let r = tab([T("passo", "step"), "<i>n</i>", "<i>m</i>", "<i>r</i> = <i>n</i> mod <i>m</i>", T("divisione", "division")],
          righe.slice(0, S.k + 1), S.k, C);
        r += codice(PSEUDO_EUCLIDE(), S.k === 0 ? 1 : S.k === S.K ? 5 : [2, 3, 4], C);
        if (S.k === 0) r += T("Il rettangolo \\(n \\times m\\): a ogni passo si tolgono più quadrati di lato \\(m\\) possibile; resta un rettangolo \\(m \\times r\\).",
          "The \\(n \\times m\\) rectangle: at each step remove as many squares of side \\(m\\) as possible; an \\(m \\times r\\) rectangle remains.");
        else if (S.k < S.K) {
          const s = S.T.S[S.k - 1];
          if (s.q === 0) r += T(`Passo ${S.k}: \\(n = ${s.n} < m = ${s.m}\\), quindi \\(n \\bmod m = n\\): nessun quadrato, i due numeri si scambiano (\\(${MCD}(${s.n}, ${s.m}) = ${MCD}(${s.m}, ${s.n})\\)).`,
            `Step ${S.k}: \\(n = ${s.n} < m = ${s.m}\\), hence \\(n \\bmod m = n\\): no square, the two numbers are swapped (\\(${MCD}(${s.n}, ${s.m}) = ${MCD}(${s.m}, ${s.n})\\)).`);
          else r += T(`Passo ${S.k}: ${s.q} ${s.q === 1 ? "quadrato" : "quadrati"} di lato \\(${s.m}\\); resta il rettangolo \\(${s.m} \\times ${s.r}\\), e \\(${MCD}(${s.n}, ${s.m}) = ${MCD}(${s.m}, ${s.r})\\).`,
            `Step ${S.k}: ${s.q} ${s.q === 1 ? "square" : "squares"} of side \\(${s.m}\\); the \\(${s.m} \\times ${s.r}\\) rectangle remains, and \\(${MCD}(${s.n}, ${s.m}) = ${MCD}(${s.m}, ${s.r})\\).`);
        } else {
          r += T(`${tinta(C.blu, `\\(${MCD}(${S.n}, ${S.m}) = ${S.T.g}\\)`)}: il resto è \\(0\\), i quadrati dell'ultimo passo coprono esattamente il rettangolo rimasto, e quadrati di lato \\(${S.T.g}\\) tassellano tutto il rettangolo \\(${S.n} \\times ${S.m}\\). Divisioni: \\(${S.K}\\).`,
            `${tinta(C.blu, `\\(${MCD}(${S.n}, ${S.m}) = ${S.T.g}\\)`)}: the remainder is \\(0\\), the squares of the last step exactly cover the remaining rectangle, and squares of side \\(${S.T.g}\\) tile the whole \\(${S.n} \\times ${S.m}\\) rectangle. Divisions: \\(${S.K}\\).`);
        }
        return r;
      }
      const E = S.T.E[S.k];
      let r = E.nota + codice(PSEUDO_CRIVELLO(), E.riga, C);
      r += T(`Assegnazioni \\(\\mathit{prime}[j] \\leftarrow 0\\) fatte: \\(${E.marcati}\\).`, `Assignments \\(\\mathit{prime}[j] \\leftarrow 0\\) performed: \\(${E.marcati}\\).`);
      if (E.fine) {
        const P = [];
        for (let i = 2; i <= S.n; i++) if (E.pr[i]) P.push(i);
        r += T(`<br>${tinta(C.c, `I primi \\(\\le ${S.n}\\) sono \\(${P.length}\\)`)}: ${P.join(", ")}.`, `<br>${tinta(C.c, `There are \\(${P.length}\\) primes \\(\\le ${S.n}\\)`)}: ${P.join(", ")}.`);
      }
      return r;
    },
    domanda: T("MCD: confronta \\(n = 89\\), \\(m = 55\\) (due numeri di Fibonacci) con \\(n = 96\\), \\(m = 36\\): quale richiede più divisioni? Crivello: con \\(n = 100\\), perché il ciclo esterno si ferma a \\(p = 10\\) e la cancellazione dei multipli di \\(7\\) parte da \\(49\\)?",
      "GCD: compare \\(n = 89\\), \\(m = 55\\) (two Fibonacci numbers) with \\(n = 96\\), \\(m = 36\\): which needs more divisions? Sieve: with \\(n = 100\\), why does the outer loop stop at \\(p = 10\\), and why does crossing out the multiples of \\(7\\) start from \\(49\\)?"),
  };

  function disegnaEuclide(crea, board, S, C) {
    const { n, m, k, K } = S, { Q, g } = S.T;
    const L = Math.max(n, m), pad = 0.04 * L;
    adatta(board, -pad, m + pad, n + pad, -pad);
    const tinte = [C.a, C.b, C.c, C.d, C.e];
    // reticolo di lato MCD alla fine (se non è troppo fitto)
    if (k === K && n / g <= 40 && m / g <= 40 && g > 0) {
      for (let x = g; x < n; x += g) linea(crea, x, 0, x, m, { strokeColor: C.blu, strokeWidth: 0.6, strokeOpacity: 0.45 });
      for (let y = g; y < m; y += g) linea(crea, 0, y, n, y, { strokeColor: C.blu, strokeWidth: 0.6, strokeOpacity: 0.45 });
    }
    for (const q of Q) {
      if (q.passo > k) continue;
      const ultimo = q.passo === K && k === K, attuale = q.passo === k;
      const c = ultimo ? C.blu : tinte[(q.passo - 1) % tinte.length];
      rett(crea, q.x0, q.y0, q.x0 + q.l, q.y0 + q.l, {
        strokeColor: c, fillColor: c, fillOpacity: attuale ? 0.42 : 0.18, strokeWidth: attuale ? 2.2 : 1.2,
      });
    }
    // rettangolo ancora da coprire
    if (k < K) {
      let x = 0, y = 0, lungoX = true;
      S.T.S.slice(0, k).forEach((s) => { if (lungoX) x += s.q * s.m; else y += s.q * s.m; lungoX = !lungoX; });
      rett(crea, x, y, n, m, { strokeColor: C.grigio, strokeWidth: 2, dash: 2 });
    }
    rett(crea, 0, 0, n, m, { strokeColor: C.muted, strokeWidth: 1.6 });
  }

  function disegnaCrivello(crea, board, S, C) {
    const { n, k } = S, E = S.T.E[k], R = Math.ceil(n / 10);
    adatta(board, -0.2, 0.2, 10.2, -R - 0.2);
    const fs = Math.max(8, Math.min(15, board.unitX * 0.36));
    const certo = (i) => E.pr[i] && (E.fine || (E.p && i < E.p * E.p) || (!E.p && i < 4));
    for (let i = 1; i <= n; i++) {
      const c = (i - 1) % 10, r = Math.floor((i - 1) / 10), x0 = c + 0.05, y1 = -r - 0.05;
      let col = null, op = 0, tx = C.testo;
      if (!E.pr[i]) { col = C.grigio; op = 0.32; tx = C.muted; }
      if (certo(i)) { col = C.c; op = 0.3; }
      if (E.p === i && !E.fine) { col = C.rosso; op = 0.4; tx = C.testo; }
      if (E.nuovo === i) { col = C.blu; op = 0.5; tx = C.testo; }
      rett(crea, x0, y1 - 0.9, x0 + 0.9, y1, {
        strokeColor: col || C.line, fillColor: col || "none", fillOpacity: op, strokeWidth: col ? 1.4 : 1,
      });
      scritta(crea, x0 + 0.45, y1 - 0.45, i, { fontSize: fs, strokeColor: tx });
    }
  }
})();
