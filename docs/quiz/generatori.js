// Autovalutazione — domande generate del modulo «Algoritmi» / «Algorithms» (algorithms).
// Formato: QUIZ_SPEC.md. Ogni generatore riceve rng() in [0,1) e la lingua ("it" | "en") e restituisce
// { testo, opzioni[4], corretta, spiegazione, _v }. Il campo _v (dati dell'istanza e chiavi delle opzioni)
// serve solo al gemello di verifica in Python (quiz/verifica/): il motore lo ignora.
// I dati dell'istanza dipendono solo da rng, non dalla lingua. Nessuna dipendenza, niente Math.random.
window.QUIZ_GEN = window.QUIZ_GEN || {};
(function () {
  "use strict";
  var MOD = "algorithms";
  var EN = "https://fabiofurini.github.io/algorithms/";
  var IT = "https://fabiofurini.github.io/algoritmi/";
  function L(en, it) { return { en: EN + en, it: IT + it }; }

  // ---------------------------------------------------------------- aiuti
  function ri(rng, a, b) { return a + Math.floor(rng() * (b - a + 1)); }
  function pickOne(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  function shuffle(rng, a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function T(lingua, it, en) { return lingua === "it" ? it : en; }
  function arr(a) { return "$[" + a.join(", ") + "]$"; }
  function bits(v, k) { var s = ""; for (var i = k - 1; i >= 0; i--) s += (v >> i) & 1; return s; }
  function bitlen(x) { var c = 0; while (x > 0) { c++; x = Math.floor(x / 2); } return c; }   // floor(log2 x)+1, 0 per x=0
  function flog2(x) { return bitlen(x) - 1; }
  function clog2(x) { return bitlen(x - 1); }                                              // ceil(log2 x), x>=1
  function sameArr(a, b) { if (a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function sample(rng, lo, hi, n) {                                                         // n valori distinti in [lo,hi]
    var pool = []; for (var v = lo; v <= hi; v++) pool.push(v);
    return shuffle(rng, pool).slice(0, n);
  }
  function fib(n) { var a = 0, b = 1; for (var i = 0; i < n; i++) { var t = a + b; a = b; b = t; } return a; }
  // costruisce le 4 opzioni: corretta + i primi 3 distrattori con chiave diversa; null se non bastano
  function build(rng, giusta, cand) {
    var used = {}; used[giusta.k] = 1; var ds = [];
    for (var i = 0; i < cand.length && ds.length < 3; i++) {
      var c = cand[i];
      if (c && c.k !== undefined && !used[c.k] && c.t !== undefined) { used[c.k] = 1; ds.push(c); }
    }
    if (ds.length < 3) return null;
    var all = shuffle(rng, [giusta].concat(ds));
    var idx = 0; for (var j = 0; j < 4; j++) if (all[j] === giusta) idx = j;
    var testi = all.map(function (o) { return o.t; });
    var seen = {}; for (j = 0; j < 4; j++) { if (seen[testi[j]]) return null; seen[testi[j]] = 1; }
    return { opzioni: testi, corretta: idx, valori: all.map(function (o) { return o.k; }) };
  }
  function num(v) { return { k: String(v), t: "$" + v + "$" }; }
  function opA(a) { return { k: a.join(","), t: arr(a) }; }
  function fine(o, testo, spieg, dati) {
    return { testo: testo, opzioni: o.opzioni, corretta: o.corretta, spiegazione: spieg, _v: { dati: dati, valori: o.valori } };
  }
  function retry(f) {
    return function (rng, lingua) {
      for (var it = 0; it < 500; it++) { var r = f(rng, lingua); if (r) return r; }
      throw new Error("generatore senza istanza valida");
    };
  }
  function add(g) { g.genera = retry(g.genera); (QUIZ_GEN[MOD] = QUIZ_GEN[MOD] || []).push(g); }
  function pre(righe) { return "<pre>" + righe.join("\n") + "</pre>"; }

  // ---------------------------------------------------------------- algoritmi del corso (come nelle dispense)
  function insertionAfter(a, iMax) {          // InsertionSort, iterazioni i = 2..iMax (indici 1-based)
    a = a.slice(); var c = 0, s = 0;
    for (var i = 2; i <= Math.min(iMax, a.length); i++) {
      var key = a[i - 1], j = i - 1;
      while (j >= 1) { c++; if (a[j - 1] > key) { a[j] = a[j - 1]; s++; j--; } else break; }
      a[j] = key;
    }
    return { a: a, cmp: c, shift: s };
  }
  function selectionAfter(a, iMax) {          // SelectionSort, iterazioni i = 1..iMax
    a = a.slice(); var n = a.length, sw = 0;
    for (var i = 1; i <= Math.min(iMax, n - 1); i++) {
      var mi = i;
      for (var j = i + 1; j <= n; j++) if (a[j - 1] < a[mi - 1]) mi = j;
      if (mi !== i) { var t = a[i - 1]; a[i - 1] = a[mi - 1]; a[mi - 1] = t; sw++; }
    }
    return { a: a, swaps: sw };
  }
  function exchangeAfter(a, iMax, rev) {      // ExchangeSort, iterazioni i = 1..iMax (rev: confronto invertito)
    a = a.slice(); var n = a.length, sw = 0;
    for (var i = 1; i <= Math.min(iMax, n - 1); i++)
      for (var j = i + 1; j <= n; j++) {
        var cond = rev ? a[i - 1] < a[j - 1] : a[i - 1] > a[j - 1];
        if (cond) { var t = a[i - 1]; a[i - 1] = a[j - 1]; a[j - 1] = t; sw++; }
      }
    return { a: a, swaps: sw };
  }
  function inversions(a) { var c = 0; for (var i = 0; i < a.length; i++) for (var j = i + 1; j < a.length; j++) if (a[i] > a[j]) c++; return c; }
  function merge(L, R) {                       // Merge: risultato e numero di confronti L[i] <= R[j]
    var i = 0, j = 0, out = [], c = 0;
    while (i < L.length && j < R.length) { c++; if (L[i] <= R[j]) out.push(L[i++]); else out.push(R[j++]); }
    while (i < L.length) out.push(L[i++]);
    while (j < R.length) out.push(R[j++]);
    return { a: out, cmp: c };
  }
  function mergeSort(a) {                      // MergeSort(a,l,r) con m = floor((l+r)/2): confronti totali
    var tot = 0, last = 0;
    function ms(x) {
      if (x.length <= 1) return x;
      var m = Math.ceil(x.length / 2);         // a[l..m] ha ceil(k/2) elementi
      var l = ms(x.slice(0, m)), r = ms(x.slice(m));
      var mg = merge(l, r); tot += mg.cmp; last = mg.cmp; return mg.a;
    }
    var s = ms(a.slice());
    return { a: s, cmp: tot, last: last };
  }
  function binSearch(a, m, variante) {         // sequenza dei mid e valore restituito (indici 1-based)
    var left = 1, right = a.length, seq = [];
    for (var it = 0; it < 20 && left <= right; it++) {
      var mid = variante === "ceil" ? left + Math.ceil((right - left) / 2) : left + Math.floor((right - left) / 2);
      seq.push(mid);
      if (a[mid - 1] === m) return { seq: seq, ret: mid };
      var dx = a[mid - 1] < m; if (variante === "swap") dx = !dx;
      if (dx) left = mid + 1; else right = mid - 1;
    }
    return { seq: seq, ret: -1 };
  }
  function euclid(n, m) { var it = 0, rs = [n, m]; while (m !== 0) { var r = n % m; n = m; m = r; it++; rs.push(r); } return { g: n, it: it, rs: rs }; }
  function toBase(n, b) { var D = "0123456789ABCDEF", s = ""; if (n === 0) return "0"; while (n > 0) { s = D[n % b] + s; n = Math.floor(n / b); } return s; }

  // =================================================================== 1 Rappresentazione dei numeri
  add({
    id: "alg-g-bin2dec", livello: "facile", capitolo: "number-representation",
    link: L("basic-algorithms/01-number-representation/#box-3-defSeqDigits", "algoritmi-di-base/01-rappresentazione-numeri/#box-3-defSeqDigits"),
    genera: function (rng, lingua) {
      var k = ri(rng, 6, 8), v = ri(rng, 1 << (k - 1), (1 << k) - 1), s = bits(v, k);
      var rev = parseInt(s.split("").reverse().join(""), 2);
      var o = build(rng, num(v), [num(rev), num(2 * v), num(v ^ (1 << ri(rng, 1, k - 2))), num(v + 1), num(v - 1)]);
      if (!o) return null;
      var termini = []; for (var i = k - 1; i >= 0; i--) if (s[k - 1 - i] === "1") termini.push("2^{" + i + "}");
      return fine(o,
        T(lingua, "Quale numero naturale, in base dieci, rappresenta la sequenza di cifre $(" + s + ")_2$?",
          "Which natural number, in base ten, is represented by the sequence of digits $(" + s + ")_2$?"),
        T(lingua, "La cifra in posizione $i$ (contata da destra, da $0$) vale $d_i\\,2^i$: $" + termini.join("+") + "=" + v + "$. Leggere le cifre al contrario o contare le posizioni da $1$ (valore doppio) sono gli errori tipici.",
          "The digit in position $i$ (counted from the right, starting at $0$) contributes $d_i\\,2^i$: $" + termini.join("+") + "=" + v + "$. Reading the digits in reverse order or counting the positions from $1$ (twice the value) are the typical mistakes."),
        { s: s });
    }
  });

  add({
    id: "alg-g-twos", livello: "facile", capitolo: "number-representation",
    link: L("basic-algorithms/01-number-representation/#box-14-defTwosComplement", "algoritmi-di-base/01-rappresentazione-numeri/#box-14-defTwosComplement"),
    genera: function (rng, lingua) {
      var k = pickOne(rng, [6, 8]), P = 1 << k, H = 1 << (k - 1);
      if (rng() < 0.5) {                                   // codifica
        var a = ri(rng, 1, H), n = -a, giusta = bits(P + n, k);
        var c = [];
        if (a <= H - 1) c.push(bits(H + a, k));            // modulo e segno
        c.push(bits(P + n - 1, k));                        // solo inversione dei bit
        c.push(bits(a, k));                                // |n| in binario
        c.push(bits((P + n + 1) % P, k));
        var o = build(rng, { k: giusta, t: "$(" + giusta + ")_2$" }, c.map(function (x) { return { k: x, t: "$(" + x + ")_2$" }; }));
        if (!o) return null;
        return fine(o,
          T(lingua, "Qual è la rappresentazione in complemento a due con $k=" + k + "$ bit dell'intero $" + n + "$?",
            "Which is the two's complement representation with $k=" + k + "$ bits of the integer $" + n + "$?"),
          T(lingua, "Per $n<0$ si scrive in binario $2^k+n=" + P + "-" + a + "=" + (P + n) + "$ con $" + k + "$ bit (equivalentemente: si invertono i bit di $|n|$ e si somma $1$). Il solo bit di segno davanti a $|n|$ è la rappresentazione in modulo e segno.",
            "For $n<0$ we write $2^k+n=" + P + "-" + a + "=" + (P + n) + "$ in binary with $" + k + "$ bits (equivalently: invert the bits of $|n|$ and add $1$). Putting a sign bit in front of $|n|$ gives the sign-magnitude representation."),
          { variante: "codifica", k: k, n: n });
      }
      var r = ri(rng, H, P - 1), s = bits(r, k), val = r - P;
      var o2 = build(rng, num(val), [num(r), num(-(r - H)), num(-(P - 1 - r)), num(val - 1), num(val + 1)]);
      if (!o2) return null;
      return fine(o2,
        T(lingua, "La sequenza di $" + k + "$ bit $(" + s + ")_2$ è la rappresentazione in complemento a due di un intero. Quale?",
          "The sequence of $" + k + "$ bits $(" + s + ")_2$ is the two's complement representation of an integer. Which one?"),
        T(lingua, "Il bit più significativo è $1$: l'intero è negativo e vale $r-2^k=" + r + "-" + P + "=" + val + "$, dove $r=" + r + "$ è il valore naturale della sequenza.",
          "The most significant bit is $1$: the integer is negative and equals $r-2^k=" + r + "-" + P + "=" + val + "$, where $r=" + r + "$ is the natural value of the sequence."),
        { variante: "decodifica", k: k, s: s });
    }
  });

  add({
    id: "alg-g-minbits", livello: "facile", capitolo: "number-representation",
    link: L("basic-algorithms/01-number-representation/#box-22-corMinBitsFormula", "algoritmi-di-base/01-rappresentazione-numeri/#box-22-corMinBitsFormula"),
    genera: function (rng, lingua) {
      var a = ri(rng, 2, 300), n = rng() < 0.5 ? a : -a;
      var k = n > 0 ? flog2(n) + 2 : clog2(a) + 1;
      var c = [num(flog2(a) + 1), num(n > 0 ? clog2(n) + 1 : flog2(a) + 2), num(k + 1), num(k - 1), num(k + 2)];
      var o = build(rng, num(k), c);
      if (!o) return null;
      return fine(o,
        T(lingua, "Qual è il numero minimo di bit per rappresentare l'intero $" + n + "$ in complemento a due?",
          "What is the minimum number of bits needed to represent the integer $" + n + "$ in two's complement?"),
        T(lingua, "Serve il più piccolo $k$ con $-2^{k-1}\\le " + n + "\\le 2^{k-1}-1$: $k=" + k + "$ (" + (n > 0 ? "$\\lfloor\\log_2 n\\rfloor+2$" : "$\\lceil\\log_2|n|\\rceil+1$") + "). Il valore $\\lfloor\\log_2|n|\\rfloor+1$ dimentica il bit di segno.",
          "We need the smallest $k$ with $-2^{k-1}\\le " + n + "\\le 2^{k-1}-1$: $k=" + k + "$ (" + (n > 0 ? "$\\lfloor\\log_2 n\\rfloor+2$" : "$\\lceil\\log_2|n|\\rceil+1$") + "). The value $\\lfloor\\log_2|n|\\rfloor+1$ forgets the sign bit."),
        { n: n });
    }
  });

  add({
    id: "alg-g-twos-add", livello: "media", capitolo: "number-representation",
    link: L("basic-algorithms/01-number-representation/#box-24-obsAddition", "algoritmi-di-base/01-rappresentazione-numeri/#box-24-obsAddition"),
    genera: function (rng, lingua) {
      var k = 8, P = 256, H = 128;
      var vuoleOv = rng() < 0.5, n1, n2;
      if (vuoleOv) { var sg = rng() < 0.5 ? 1 : -1; n1 = sg * ri(rng, 40, 120); n2 = sg * ri(rng, 40, 120); }
      else { n1 = ri(rng, -120, 120); n2 = ri(rng, -120, 120); }
      var sum = n1 + n2, ov = sum < -H || sum > H - 1;
      var rb = ((n1 + P) % P + (n2 + P) % P) % P, r = rb >= H ? rb - P : rb;
      function op(v, f) {
        return { k: v + "|" + (f ? 1 : 0), t: T(lingua, "risultato $" + v + "$, " + (f ? "overflow" : "nessun overflow"), "result $" + v + "$, " + (f ? "overflow" : "no overflow")) };
      }
      var o = build(rng, op(r, ov), [op(sum, !ov), op(r, !ov), op(rb, ov), op(-r, ov), op(sum, ov)]);
      if (!o) return null;
      var s1 = bits((n1 + P) % P, k), s2 = bits((n2 + P) % P, k);
      return fine(o,
        T(lingua, "Con $8$ bit in complemento a due si sommano $(" + s1 + ")_2$ e $(" + s2 + ")_2$ come numeri naturali, tenendo gli $8$ bit meno significativi. Quale intero rappresenta il risultato, e c'è overflow?",
          "With $8$ bits in two's complement, $(" + s1 + ")_2$ and $(" + s2 + ")_2$ are added as natural numbers, keeping the $8$ least significant bits. Which integer does the result represent, and is there an overflow?"),
        T(lingua, "Gli addendi sono $" + n1 + "$ e $" + n2 + "$, la somma vera è $" + sum + "$; gli $8$ bit del risultato sono $(" + bits(rb, k) + ")_2$, cioè $" + r + "$. " + (ov ? "C'è overflow: addendi con lo stesso segno e risultato di segno opposto ($" + sum + "\\notin[-128,127]$)." : "Nessun overflow: $" + sum + "\\in[-128,127]$."),
          "The operands are $" + n1 + "$ and $" + n2 + "$, the true sum is $" + sum + "$; the $8$ bits of the result are $(" + bits(rb, k) + ")_2$, i.e., $" + r + "$. " + (ov ? "There is an overflow: operands with the same sign and a result with the opposite sign ($" + sum + "\\notin[-128,127]$)." : "No overflow: $" + sum + "\\in[-128,127]$.")),
        { n1: n1, n2: n2 });
    }
  });

  // =================================================================== 2 Pseudocodice
  add({
    id: "alg-g-trace-loop", livello: "facile", capitolo: "pseudo-code",
    link: L("basic-algorithms/02-pseudo-code/#242-loops", "algoritmi-di-base/02-pseudocodice/#242-cicli"),
    genera: function (rng, lingua) {
      var tipo = ri(rng, 1, 3), righe, giusta, cand, sp, dati;
      var kw = function (it, en) { return "<b>" + T(lingua, it, en) + "</b>"; };
      if (tipo === 1) {
        var n = ri(rng, 10, 25), d = ri(rng, 2, 5);
        var S = function (N) { var s = 0; for (var i = 1; i <= N; i++) if (i % d === 0) s += i; return s; };
        giusta = S(n);
        cand = [S(n - 1), S(n + 1), Math.floor(n / d), giusta + d, giusta - d];
        righe = ["s := 0", "i := 1", kw("while", "while") + " i ≤ " + n + " " + kw("do", "do"),
          "    " + kw("if", "if") + " i mod " + d + " = 0 " + kw("then", "then"), "        s ← s + i", "    " + kw("end", "end"), "    i ← i + 1", kw("end", "end")];
        sp = T(lingua, "Il ciclo somma i multipli di $" + d + "$ fra $1$ e $" + n + "$ (estremo incluso: la condizione è $i\\le " + n + "$): $s=" + giusta + "$.",
          "The loop adds the multiples of $" + d + "$ between $1$ and $" + n + "$ (included: the condition is $i\\le " + n + "$): $s=" + giusta + "$.");
        dati = { tipo: 1, n: n, d: d };
      } else if (tipo === 2) {
        var N = ri(rng, 20, 200);
        giusta = flog2(N);
        cand = [giusta + 1, giusta - 1, clog2(N) + 1, Math.floor(N / 2)];
        righe = ["x := " + N, "c := 0", kw("while", "while") + " x > 1 " + kw("do", "do"), "    x ← ⌊x / 2⌋", "    c ← c + 1", kw("end", "end")];
        sp = T(lingua, "Ogni iterazione dimezza $x$ (parte intera inferiore): $x$ arriva a $1$ dopo $\\lfloor\\log_2 " + N + "\\rfloor=" + giusta + "$ iterazioni, quindi $c=" + giusta + "$.",
          "Each iteration halves $x$ (rounding down): $x$ reaches $1$ after $\\lfloor\\log_2 " + N + "\\rfloor=" + giusta + "$ iterations, hence $c=" + giusta + "$.");
        dati = { tipo: 2, N: N };
      } else {
        var n3 = ri(rng, 12, 20), t = ri(rng, 15, 60);
        var run = function (cont, prima, brk) {
          var s = 0;
          for (var i = 1; i <= n3; i++) {
            if (cont && i % 3 === 0) continue;
            if (prima && brk && s + i > t) break;
            s += i;
            if (!prima && brk && s > t) break;
          }
          return s;
        };
        giusta = run(true, false, true);
        cand = [run(false, false, true), run(true, true, true), run(true, false, false), giusta + 3];
        righe = ["s := 0", kw("for", "for") + " i := 1 " + kw("to", "to") + " " + n3 + " " + kw("do", "do"),
          "    " + kw("if", "if") + " i mod 3 = 0 " + kw("then", "then"), "        " + kw("continue", "continue"), "    " + kw("end", "end"),
          "    s ← s + i", "    " + kw("if", "if") + " s > " + t + " " + kw("then", "then"), "        " + kw("break", "break"), "    " + kw("end", "end"), kw("end", "end")];
        sp = T(lingua, "Si sommano $1,2,4,5,7,\\dots$ (i multipli di $3$ sono saltati da continue) e il ciclo si interrompe con break appena $s>" + t + "$, dopo aver già sommato $i$: $s=" + giusta + "$.",
          "The loop adds $1,2,4,5,7,\\dots$ (continue skips the multiples of $3$) and stops with break as soon as $s>" + t + "$, after $i$ has been added: $s=" + giusta + "$.");
        dati = { tipo: 3, n: n3, t: t };
      }
      var o = build(rng, num(giusta), cand.map(num));
      if (!o) return null;
      return fine(o, T(lingua, "Qual è il valore della variabile $" + (tipo === 2 ? "c" : "s") + "$ al termine dello pseudocodice seguente?", "What is the value of the variable $" + (tipo === 2 ? "c" : "s") + "$ at the end of the following pseudo-code?") + "\n" + pre(righe), sp, dati);
    }
  });

  add({
    id: "alg-g-collatz", livello: "complessa", capitolo: "pseudo-code",
    link: L("basic-algorithms/02-pseudo-code/#242-loops", "algoritmi-di-base/02-pseudocodice/#242-cicli"),
    genera: function (rng, lingua) {
      var N = ri(rng, 6, 40), x = N, y = 0, k = 0, mx = N, seq = [N];
      while (x !== 1) { x = x % 2 === 0 ? x / 2 : 3 * x + 1; k++; if (x > y) y = x; if (x > mx) mx = x; seq.push(x); if (k > 40) return null; }
      if (k < 6 || k > 22) return null;
      function op(a, b) { return { k: a + "|" + b, t: "$k=" + a + "$, $y=" + b + "$" }; }
      var second = 0; for (var i = 1; i < seq.length; i++) if (seq[i] !== y && seq[i] > second) second = seq[i];
      // distrattori: un'iterazione in più o in meno, massimo che include il valore iniziale N, secondo valore più grande
      var o = build(rng, op(k, y), [op(k + 1, y), op(k, Math.max(y, N)), op(k - 1, y), op(k, second), op(k + 1, second)]);
      if (!o) return null;
      var kw = function (it, en) { return "<b>" + T(lingua, it, en) + "</b>"; };
      var righe = ["x := " + N, "y := 0", "k := 0", kw("while", "while") + " x ≠ 1 " + kw("do", "do"),
        "    " + kw("if", "if") + " x mod 2 = 0 " + kw("then", "then"), "        x ← x / 2", "    " + kw("else", "else"), "        x ← 3x + 1", "    " + kw("end", "end"),
        "    k ← k + 1", "    " + kw("if", "if") + " x > y " + kw("then", "then"), "        y ← x", "    " + kw("end", "end"), kw("end", "end")];
      return fine(o,
        T(lingua, "Quali sono i valori di $k$ e $y$ al termine dello pseudocodice seguente?", "What are the values of $k$ and $y$ at the end of the following pseudo-code?") + "\n" + pre(righe),
        T(lingua, "I valori di $x$ sono $" + seq.join(",\\ ") + "$: le iterazioni sono $k=" + k + "$ e il massimo dei valori assegnati a $x$ nel ciclo (il valore iniziale non conta, perché $y$ è aggiornato dopo la modifica di $x$) è $y=" + y + "$.",
          "The values of $x$ are $" + seq.join(",\\ ") + "$: there are $k=" + k + "$ iterations and the largest value assigned to $x$ in the loop (the initial value does not count, since $y$ is updated after $x$ changes) is $y=" + y + "$."),
        { N: N });
    }
  });

  // =================================================================== 3 Ordinamento
  function permDistinti(rng, n) { return sample(rng, 1, 9, n); }

  add({
    id: "alg-g-insertion-pass", livello: "facile", capitolo: "sorting",
    link: L("basic-algorithms/03-sorting/#32-insertion-sort", "algoritmi-di-base/03-ordinamento/#32-insertion-sort"),
    genera: function (rng, lingua) {
      var a = permDistinti(rng, 6), t = ri(rng, 3, 5);
      var g = insertionAfter(a, t).a;
      var o = build(rng, opA(g), [opA(insertionAfter(a, t - 1).a), opA(insertionAfter(a, t + 1).a), opA(selectionAfter(a, t - 1).a), opA(insertionAfter(a, 6).a)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "InsertionSort ordina $a[1..n]$ in ordine crescente: per $i=2,\\dots,n$ inserisce $\\mathit{key}=a[i]$ nel prefisso $a[1..i-1]$, spostando di un posto a destra le chiavi maggiori di $\\mathit{key}$. È eseguito su $a=" + arr(a).slice(1, -1) + "$. Che cosa contiene l'array al termine dell'iterazione con $i=" + t + "$?",
          "InsertionSort sorts $a[1..n]$ in increasing order: for $i=2,\\dots,n$ it inserts $\\mathit{key}=a[i]$ into the prefix $a[1..i-1]$, shifting one place to the right the keys larger than $\\mathit{key}$. It is executed on $a=" + arr(a).slice(1, -1) + "$. What does the array contain at the end of the iteration with $i=" + t + "$?"),
        T(lingua, "Dopo le iterazioni $i=2,\\dots," + t + "$ il sotto-array $a[1.." + t + "]$ contiene i primi $" + t + "$ elementi ordinati e il resto è invariato: " + arr(g) + ".",
          "After the iterations $i=2,\\dots," + t + "$ the sub-array $a[1.." + t + "]$ contains the first $" + t + "$ elements sorted, and the rest is unchanged: " + arr(g) + "."),
        { a: a, t: t });
    }
  });

  add({
    id: "alg-g-selection-pass", livello: "facile", capitolo: "sorting",
    link: L("basic-algorithms/03-sorting/#34-selection-sort", "algoritmi-di-base/03-ordinamento/#34-selection-sort"),
    genera: function (rng, lingua) {
      var a = permDistinti(rng, 6), t = ri(rng, 2, 3);
      var g = selectionAfter(a, t).a;
      var o = build(rng, opA(g), [opA(exchangeAfter(a, t).a), opA(insertionAfter(a, t + 1).a), opA(selectionAfter(a, t - 1).a), opA(selectionAfter(a, t + 1).a)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "SelectionSort ordina $a[1..n]$ in ordine crescente: per $i=1,\\dots,n-1$ trova la posizione del minimo di $a[i..n]$ e lo scambia con $a[i]$. È eseguito su $a=" + arr(a).slice(1, -1) + "$. Che cosa contiene l'array dopo le prime $" + t + "$ iterazioni ($i=1,\\dots," + t + "$)?",
          "SelectionSort sorts $a[1..n]$ in increasing order: for $i=1,\\dots,n-1$ it finds the position of the minimum of $a[i..n]$ and swaps it with $a[i]$. It is executed on $a=" + arr(a).slice(1, -1) + "$. What does the array contain after the first $" + t + "$ iterations ($i=1,\\dots," + t + "$)?"),
        T(lingua, "A ogni iterazione il minimo di $a[i..n]$ viene scambiato con $a[i]$ (un solo scambio per iterazione): " + arr(g) + ". Exchange Sort, invece, scambia ogni volta che trova un elemento minore di $a[i]$.",
          "In each iteration the minimum of $a[i..n]$ is swapped with $a[i]$ (one swap per iteration): " + arr(g) + ". Exchange Sort, instead, swaps every time it finds an element smaller than $a[i]$."),
        { a: a, t: t });
    }
  });

  add({
    id: "alg-g-exchange-pass", livello: "facile", capitolo: "sorting",
    link: L("basic-algorithms/03-sorting/#33-exchange-sort", "algoritmi-di-base/03-ordinamento/#33-exchange-sort"),
    genera: function (rng, lingua) {
      var a = permDistinti(rng, 6), t = ri(rng, 1, 2);
      var g = exchangeAfter(a, t).a;
      var o = build(rng, opA(g), [opA(selectionAfter(a, t).a), opA(exchangeAfter(a, t, true).a), opA(exchangeAfter(a, t + 1).a), opA(t > 1 ? exchangeAfter(a, t - 1).a : insertionAfter(a, 2).a)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "ExchangeSort ordina $a[1..n]$ in ordine crescente: per $i=1,\\dots,n-1$ e, dentro, per $j=i+1,\\dots,n$, scambia $a[i]$ e $a[j]$ se $a[i]>a[j]$. È eseguito su $a=" + arr(a).slice(1, -1) + "$. Che cosa contiene l'array al termine " + (t === 1 ? "della prima iterazione del ciclo esterno ($i=1$)" : "delle prime due iterazioni del ciclo esterno ($i=1,2$)") + "?",
          "ExchangeSort sorts $a[1..n]$ in increasing order: for $i=1,\\dots,n-1$ and, inside, for $j=i+1,\\dots,n$, it swaps $a[i]$ and $a[j]$ if $a[i]>a[j]$. It is executed on $a=" + arr(a).slice(1, -1) + "$. What does the array contain at the end of " + (t === 1 ? "the first iteration of the outer loop ($i=1$)" : "the first two iterations of the outer loop ($i=1,2$)") + "?"),
        T(lingua, "Per ogni $j>i$, se $a[i]>a[j]$ i due elementi vengono scambiati: alla fine dell'iterazione $a[i]$ è il minimo di $a[i..n]$, ma anche gli altri elementi si sono spostati: " + arr(g) + ".",
          "For every $j>i$, if $a[i]>a[j]$ the two elements are swapped: at the end of the iteration $a[i]$ is the minimum of $a[i..n]$, but the other elements have moved as well: " + arr(g) + "."),
        { a: a, t: t });
    }
  });

  add({
    id: "alg-g-insertion-counts", livello: "media", capitolo: "sorting",
    link: L("basic-algorithms/03-sorting/#box-10-obs-srt-iscount", "algoritmi-di-base/03-ordinamento/#box-10-obs-srt-iscount"),
    genera: function (rng, lingua) {
      var a = permDistinti(rng, 6), r = insertionAfter(a, 6), c = r.cmp, s = r.shift;
      if (s < 4) return null;
      function op(x, y) { return { k: x + "|" + y, t: T(lingua, "$" + x + "$ confronti, $" + y + "$ spostamenti", "$" + x + "$ comparisons, $" + y + "$ shifts") }; }
      var o = build(rng, op(c, s), [op(s, s), op(15, s), op(c - 1, s), op(c, s + 1), op(c, c)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "InsertionSort, per $i=2,\\dots,n$, pone $\\mathit{key}=a[i]$, $j=i-1$ e, finché $j\\ge 1$ e $a[j]>\\mathit{key}$, sposta $a[j]$ in $a[j+1]$ e decrementa $j$; poi scrive $\\mathit{key}$ in $a[j+1]$. Quanti confronti $a[j]>\\mathit{key}$ e quanti spostamenti esegue sull'array $" + arr(a).slice(1, -1) + "$?",
          "InsertionSort, for $i=2,\\dots,n$, sets $\\mathit{key}=a[i]$, $j=i-1$ and, while $j\\ge 1$ and $a[j]>\\mathit{key}$, shifts $a[j]$ into $a[j+1]$ and decrements $j$; then it writes $\\mathit{key}$ into $a[j+1]$. How many comparisons $a[j]>\\mathit{key}$ and how many shifts does it perform on the array $" + arr(a).slice(1, -1) + "$?"),
        T(lingua, "Gli spostamenti sono le coppie in ordine inverso: $" + s + "$. Ogni iterazione fa un confronto per spostamento, più un confronto falso che la ferma se non arriva a $j=0$: in tutto $" + c + "$ confronti.",
          "The shifts are the pairs in reverse order: $" + s + "$. Each iteration makes one comparison per shift, plus one false comparison that stops it unless it reaches $j=0$: $" + c + "$ comparisons in total."),
        { a: a });
    }
  });

  // record (chiave, lettera): ordinamenti completi per controllare la stabilità
  function selRec(r, nonStretto) {
    r = r.slice(); var n = r.length;
    for (var i = 0; i < n - 1; i++) {
      var mi = i;
      for (var j = i + 1; j < n; j++) if (nonStretto ? r[j][0] <= r[mi][0] : r[j][0] < r[mi][0]) mi = j;
      if (mi !== i) { var t = r[i]; r[i] = r[mi]; r[mi] = t; }
    }
    return r;
  }
  function excRec(r) {
    r = r.slice(); var n = r.length;
    for (var i = 0; i < n - 1; i++) for (var j = i + 1; j < n; j++) if (r[i][0] > r[j][0]) { var t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function insRec(r) {
    r = r.slice();
    for (var i = 1; i < r.length; i++) { var key = r[i], j = i - 1; while (j >= 0 && r[j][0] > key[0]) { r[j + 1] = r[j]; j--; } r[j + 1] = key; }
    return r;
  }
  function recTex(r) { return "$" + r.map(function (x) { return "(" + x[0] + "," + x[1] + ")"; }).join(",\\ ") + "$"; }
  function opR(r) { return { k: r.map(function (x) { return x[0] + x[1]; }).join(","), t: recTex(r) }; }

  add({
    id: "alg-g-selection-stability", livello: "complessa", capitolo: "sorting",
    link: L("basic-algorithms/03-sorting/#box-25-obs-srt-ssstable", "algoritmi-di-base/03-ordinamento/#box-25-obs-srt-ssstable"),
    genera: function (rng, lingua) {
      var lett = "ABCDEF", r = [];
      for (var i = 0; i < 6; i++) r.push([ri(rng, 1, 3), lett[i]]);
      var g = selRec(r, false), st = insRec(r);
      if (opR(g).k === opR(st).k) return null;
      var inv = st.slice().sort(function (x, y) { return x[0] !== y[0] ? x[0] - y[0] : (x[1] < y[1] ? 1 : -1); });  // gruppi a lettere invertite
      var o = build(rng, opR(g), [opR(st), opR(excRec(r)), opR(selRec(r, true)), opR(inv)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "SelectionSort ordina per chiave un array di record (chiave, lettera): per $i=1,\\dots,n-1$ cerca il minimo di $a[i..n]$ con il confronto stretto $a[j]<a[\\mathit{minIdx}]$ (a parità vince il primo trovato) e lo scambia con $a[i]$. Qual è l'array finale per " + recTex(r) + "?",
          "SelectionSort sorts by key an array of records (key, letter): for $i=1,\\dots,n-1$ it looks for the minimum of $a[i..n]$ with the strict comparison $a[j]<a[\\mathit{minIdx}]$ (on ties the first one found wins) and swaps it with $a[i]$. What is the final array for " + recTex(r) + "?"),
        T(lingua, "Seguendo le $5$ iterazioni (minimo di $a[i..n]$ con il confronto stretto $a[j]<a[\\mathit{minIdx}]$, poi uno scambio) si ottiene " + recTex(g) + ". Lo scambio può portare un record oltre un record con la stessa chiave: Selection Sort non è stabile, e l'ordine stabile (quello di Insertion Sort) è diverso.",
          "Following the $5$ iterations (minimum of $a[i..n]$ with the strict comparison $a[j]<a[\\mathit{minIdx}]$, then one swap) we obtain " + recTex(g) + ". A swap can move a record past a record with the same key: Selection Sort is not stable, and the stable order (the one of Insertion Sort) is different."),
        { r: r });
    }
  });

  // =================================================================== 4 Ricerca
  add({
    id: "alg-g-binsearch", livello: "facile", capitolo: "search",
    link: L("basic-algorithms/04-search/#43-binary-search", "algoritmi-di-base/04-ricerca/#43-ricerca-binaria"),
    genera: function (rng, lingua) {
      var n = ri(rng, 9, 15), a = [], v = ri(rng, 1, 5);
      for (var i = 0; i < n; i++) { a.push(v); v += ri(rng, 2, 6); }
      var m;
      if (rng() < 0.6) m = a[ri(rng, 0, n - 1)]; else { var p = ri(rng, 0, n - 2); m = a[p] + 1; if (m === a[p + 1]) return null; }
      var g = binSearch(a, m, ""), c1 = binSearch(a, m, "ceil"), c2 = binSearch(a, m, "swap");
      function op(r) { return { k: r.seq.join(",") + "|" + r.ret, t: T(lingua, "$mid$: $" + r.seq.join(",\\ ") + "$; restituisce $" + r.ret + "$", "$mid$: $" + r.seq.join(",\\ ") + "$; returns $" + r.ret + "$") }; }
      var corta = { seq: g.seq.slice(0, -1), ret: -1 };
      var c3 = corta.seq.length ? corta : { seq: g.seq.concat([g.seq[g.seq.length - 1] + 1]), ret: -1 };
      var o = build(rng, op(g), [op(c1), op(c2), op(c3), op({ seq: g.seq, ret: g.ret === -1 ? g.seq[g.seq.length - 1] : -1 })]);
      if (!o) return null;
      return fine(o,
        T(lingua, "BinarySearch cerca $m=" + m + "$ in $a=" + arr(a).slice(1, -1) + "$ (indici da $1$ a $" + n + "$): parte da $left=1$, $right=" + n + "$ e, finché $left\\le right$, esamina $mid=left+\\lfloor(right-left)/2\\rfloor$, restituisce $mid$ se $a[mid]=m$, altrimenti pone $left\\leftarrow mid+1$ se $a[mid]<m$ e $right\\leftarrow mid-1$ se $a[mid]>m$; alla fine restituisce $-1$. Quali indici $mid$ esamina, e che cosa restituisce?",
          "BinarySearch looks for $m=" + m + "$ in $a=" + arr(a).slice(1, -1) + "$ (indices $1$ to $" + n + "$): it starts from $left=1$, $right=" + n + "$ and, while $left\\le right$, examines $mid=left+\\lfloor(right-left)/2\\rfloor$, returns $mid$ if $a[mid]=m$, otherwise sets $left\\leftarrow mid+1$ if $a[mid]<m$ and $right\\leftarrow mid-1$ if $a[mid]>m$; at the end it returns $-1$. Which indices $mid$ does it examine, and what does it return?"),
        T(lingua, "Con $mid=left+\\lfloor(right-left)/2\\rfloor$, se $a[mid]<m$ si pone $left\\leftarrow mid+1$, altrimenti $right\\leftarrow mid-1$: indici $" + g.seq.join(",\\ ") + "$, valore restituito $" + g.ret + "$.",
          "With $mid=left+\\lfloor(right-left)/2\\rfloor$, if $a[mid]<m$ we set $left\\leftarrow mid+1$, otherwise $right\\leftarrow mid-1$: indices $" + g.seq.join(",\\ ") + "$, returned value $" + g.ret + "$."),
        { a: a, m: m });
    }
  });

  // =================================================================== 5 Algoritmi numerici
  add({
    id: "alg-g-change-base", livello: "facile", capitolo: "numerical-algorithms",
    link: L("basic-algorithms/05-numerical-algorithms/#512-the-algorithm", "algoritmi-di-base/05-algoritmi-numerici/#512-lalgoritmo"),
    genera: function (rng, lingua) {
      var b = pickOne(rng, [2, 8, 16]), n = b === 2 ? ri(rng, 40, 250) : (b === 8 ? ri(rng, 70, 500) : ri(rng, 200, 3000));
      var g = toBase(n, b), rev = g.split("").reverse().join("");
      function op(s) { return { k: s, t: "$(" + s + ")_{" + b + "}$" }; }
      var cand = [op(rev)];
      if (b === 16) { var ds = [], x = n; while (x > 0) { ds.unshift(x % 16); x = Math.floor(x / 16); } if (ds.some(function (d) { return d >= 10; })) cand.push(op(ds.join(""))); }
      cand.push(op(toBase(Math.floor(n / b), b)), op(toBase(n + b, b)), op(toBase(n - 1, b)));
      var o = build(rng, op(g), cand);
      if (!o) return null;
      var resti = [], y = n; while (y > 0) { resti.push(y % b); y = Math.floor(y / b); }
      return fine(o,
        T(lingua, "ChangeOfBase$(n,b)$ divide ripetutamente $n$ per la base $b$ finché il quoziente è $0$, e ogni resto è la cifra successiva a partire da quella meno significativa. Qual è la rappresentazione in base $" + b + "$ di $n=" + n + "$ (cifre dalla più significativa alla meno significativa" + (b === 16 ? ", con $A,\\dots,F$ per $10,\\dots,15$" : "") + ")?",
          "ChangeOfBase$(n,b)$ repeatedly divides $n$ by the base $b$ until the quotient is $0$, and each remainder is the next digit starting from the least significant one. Which is the representation in base $" + b + "$ of $n=" + n + "$ (digits from the most to the least significant" + (b === 16 ? ", with $A,\\dots,F$ for $10,\\dots,15$" : "") + ")?"),
        T(lingua, "I resti delle divisioni successive per $" + b + "$ sono $" + resti.join(",\\ ") + "$: sono le cifre $d_0,d_1,\\dots$, cioè dalla meno significativa. Lette al contrario danno $(" + g + ")_{" + b + "}$.",
          "The remainders of the successive divisions by $" + b + "$ are $" + resti.join(",\\ ") + "$: they are the digits $d_0,d_1,\\dots$, i.e., from the least significant one. Read in reverse order they give $(" + g + ")_{" + b + "}$."),
        { n: n, b: b });
    }
  });

  add({
    id: "alg-g-euclid", livello: "facile", capitolo: "numerical-algorithms",
    link: L("basic-algorithms/05-numerical-algorithms/#541-euclidean-algorithm", "algoritmi-di-base/05-algoritmi-numerici/#541-algoritmo-di-euclide"),
    genera: function (rng, lingua) {
      var g0 = ri(rng, 2, 12), p = ri(rng, 3, 25), q = ri(rng, 3, 25);
      var n = g0 * p, m = g0 * q; if (p === q || n > 300 || m > 300) return null;
      var r = euclid(n, m); if (r.it < 3) return null;
      var prev = r.rs[r.rs.length - 3];
      function op(gv, it) { return { k: gv + "|" + it, t: T(lingua, "restituisce $" + gv + "$ dopo $" + it + "$ iterazioni", "returns $" + gv + "$ after $" + it + "$ iterations") }; }
      var o = build(rng, op(r.g, r.it), [op(r.g, r.it + 1), op(r.g, r.it - 1), op(prev, r.it), op(prev, r.it - 1)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "EuclideanAlgorithm$(n,m)$ calcola $\\gcd(n,m)$: finché $m\\ne 0$, sostituisce $(n,m)$ con $(m,\\ n\\bmod m)$ (un'iterazione del ciclo while); poi restituisce $n$. Con $n=" + n + "$ e $m=" + m + "$, quale valore restituisce e dopo quante iterazioni?",
          "EuclideanAlgorithm$(n,m)$ computes $\\gcd(n,m)$: while $m\\ne 0$, it replaces $(n,m)$ with $(m,\\ n\\bmod m)$ (one iteration of the while loop); then it returns $n$. With $n=" + n + "$ and $m=" + m + "$, which value does it return and after how many iterations?"),
        T(lingua, "I valori di $m$ sono $" + r.rs.slice(1).join(",\\ ") + "$: ogni iterazione sostituisce $(n,m)$ con $(m,\\ n\\bmod m)$; dopo $" + r.it + "$ iterazioni $m=0$ e si restituisce $n=" + r.g + "=\\gcd(" + n + "," + m + ")$." + (n < m ? " Con $n<m$ la prima iterazione scambia solo i due numeri." : ""),
          "The values of $m$ are $" + r.rs.slice(1).join(",\\ ") + "$: each iteration replaces $(n,m)$ with $(m,\\ n\\bmod m)$; after $" + r.it + "$ iterations $m=0$ and the algorithm returns $n=" + r.g + "=\\gcd(" + n + "," + m + ")$." + (n < m ? " With $n<m$ the first iteration just swaps the two numbers." : "")),
        { n: n, m: m });
    }
  });

  add({
    id: "alg-g-sieve", livello: "media", capitolo: "numerical-algorithms",
    link: L("basic-algorithms/05-numerical-algorithms/#53-sieve-of-eratosthenes", "algoritmi-di-base/05-algoritmi-numerici/#53-crivello-di-eratostene"),
    genera: function (rng, lingua) {
      var n = ri(rng, 30, 60), s = Math.floor(Math.sqrt(n));
      while ((s + 1) * (s + 1) <= n) s++; while (s * s > n) s--;
      function conta(soloPrimi, daDoppio) {
        var pr = []; for (var i = 0; i <= n; i++) pr.push(1); pr[1] = 0; var c = 0;
        for (var p = 2; p <= s; p++) {
          if (!soloPrimi || pr[p] === 1) { for (var j = daDoppio ? 2 * p : p * p; j <= n; j += p) { pr[j] = 0; c++; } }
        }
        return c;
      }
      var g = conta(true, false), comp = 0;
      for (var x = 4; x <= n; x++) { var pp = false; for (var d = 2; d * d <= x; d++) if (x % d === 0) pp = true; if (pp) comp++; }
      var o = build(rng, num(g), [num(comp), num(conta(true, true)), num(conta(false, false)), num(g + 1), num(g - 1)]);
      if (!o) return null;
      var primi = []; for (var q = 2; q <= s; q++) { var ok = true; for (var e = 2; e < q; e++) if (q % e === 0) ok = false; if (ok) primi.push(q); }
      return fine(o,
        T(lingua, "SieveOfEratosthenes$(n)$ pone $prime[2..n]$ a $1$; poi per $p=2,\\dots,\\lfloor\\sqrt n\\rfloor$, se $prime[p]=1$, esegue $prime[j]\\leftarrow 0$ per $j=p^2,\\,p^2+p,\\,p^2+2p,\\dots\\le n$. Con $n=" + n + "$, quante volte viene eseguita l'assegnazione $prime[j]\\leftarrow 0$?",
          "SieveOfEratosthenes$(n)$ sets $prime[2..n]$ to $1$; then for $p=2,\\dots,\\lfloor\\sqrt n\\rfloor$, if $prime[p]=1$, it executes $prime[j]\\leftarrow 0$ for $j=p^2,\\,p^2+p,\\,p^2+2p,\\dots\\le n$. With $n=" + n + "$, how many times is the assignment $prime[j]\\leftarrow 0$ executed?"),
        T(lingua, "Il ciclo esterno arriva a $\\lfloor\\sqrt{" + n + "}\\rfloor=" + s + "$ e il ciclo interno parte solo per $p$ primo ($p=" + primi.join(",") + "$), con $j=p^2,p^2+p,\\dots\\le " + n + "$: in tutto $" + g + "$ assegnazioni. Un composto multiplo di più primi viene segnato più volte, quindi il conteggio non è il numero dei composti ($" + comp + "$).",
          "The outer loop goes up to $\\lfloor\\sqrt{" + n + "}\\rfloor=" + s + "$ and the inner loop runs only for $p$ prime ($p=" + primi.join(",") + "$), with $j=p^2,p^2+p,\\dots\\le " + n + "$: $" + g + "$ assignments in total. A composite that is a multiple of several primes is marked several times, so the count is not the number of composites ($" + comp + "$)."),
        { n: n });
    }
  });

  // =================================================================== 9 Notazione asintotica, 10 Crescita asintotica
  // chiave d'ordine: [autopotenza(2)/fattoriale(1)/0, base esponenziale (1 = nessuna), grado, potenza del log]
  var FUN = [
    ["\\log_2 n", [0, 1, 0, 1]], ["\\log_{10} n", [0, 1, 0, 1]], ["\\ln(n^3)", [0, 1, 0, 1]], ["\\log_2^2 n", [0, 1, 0, 2]],
    ["\\log_2^3 n", [0, 1, 0, 3]], ["\\sqrt{n}", [0, 1, 0.5, 0]], ["n^{1/3}", [0, 1, 1 / 3, 0]], ["n", [0, 1, 1, 0]], ["3n+\\log_2 n", [0, 1, 1, 0]],
    ["n\\log_2 n", [0, 1, 1, 1]], ["n\\log_2^2 n", [0, 1, 1, 2]], ["n^{1.5}", [0, 1, 1.5, 0]], ["n^2", [0, 1, 2, 0]], ["5n^2+3n", [0, 1, 2, 0]],
    ["(n+4)^2", [0, 1, 2, 0]], ["n^2\\log_2 n", [0, 1, 2, 1]], ["n^3", [0, 1, 3, 0]], ["2^n", [0, 2, 0, 0]], ["2^{n+3}", [0, 2, 0, 0]],
    ["n^2\\,2^n", [0, 2, 2, 0]], ["3^n", [0, 3, 0, 0]], ["4^n", [0, 4, 0, 0]], ["2^{2n}", [0, 4, 0, 0]], ["n!", [1, 1, 0, 0]], ["n^n", [2, 1, 0, 0]]
  ];
  function cmpKey(a, b) { for (var i = 0; i < 4; i++) { if (a[i] < b[i]) return -1; if (a[i] > b[i]) return 1; } return 0; }

  add({
    id: "alg-g-asym-compare", livello: "facile", capitolo: "asymptotic-notation",
    link: L("asymptotics/09-asymptotic-notation/#box-33-propLimitCriterion", "notazione-asintotica/09-notazione-asintotica/#box-33-propLimitCriterion"),
    genera: function (rng, lingua) {
      var tipo = ri(rng, 0, 2), f, g;
      for (var tries = 0; tries < 200; tries++) {
        f = pickOne(rng, FUN); g = pickOne(rng, FUN);
        var c = cmpKey(f[1], g[1]);
        if (f[0] !== g[0] && ((tipo === 0 && c === 0) || (tipo === 1 && c < 0) || (tipo === 2 && c > 0))) break;
        f = null;
      }
      if (!f) return null;
      var rel = cmpKey(f[1], g[1]);
      var stm = [["f", "o", "g"], ["f", "O", "g"], ["f", "Theta", "g"], ["f", "Omega", "g"], ["f", "omega", "g"],
        ["g", "o", "f"], ["g", "O", "f"], ["g", "Theta", "f"], ["g", "Omega", "f"], ["g", "omega", "f"]];
      function vero(s) {
        var r = s[0] === "f" ? rel : -rel;
        return { o: r < 0, O: r <= 0, Theta: r === 0, Omega: r >= 0, omega: r > 0 }[s[1]];
      }
      function tex(s) {
        var sym = { o: "o", O: "\\bigO", Theta: "\\Theta", Omega: "\\Omega", omega: "\\omega" }[s[1]];
        return { k: s.join(""), t: "$" + s[0] + "(n)=" + sym + "\\big(" + s[2] + "(n)\\big)$" };
      }
      var veri = shuffle(rng, stm.filter(vero)), falsi = shuffle(rng, stm.filter(function (s) { return !vero(s); }));
      var forti = veri.filter(function (s) { return s[1] === "o" || s[1] === "Theta" || s[1] === "omega"; });
      var giusta = (forti.length && rng() < 0.7) ? forti[0] : veri[0];
      var o = build(rng, tex(giusta), falsi.map(tex));
      if (!o) return null;
      var L0 = rel < 0 ? "0^+" : (rel > 0 ? "+\\infty" : "\\ell\\in\\R_{>0}");
      return fine(o,
        T(lingua, "Siano $f(n)=" + f[0] + "$ e $g(n)=" + g[0] + "$, funzioni della variabile naturale $n$. Quale relazione asintotica è vera?", "Let $f(n)=" + f[0] + "$ and $g(n)=" + g[0] + "$, functions of the natural variable $n$. Which asymptotic relation is true?"),
        T(lingua, "Si ha $\\lim_{n\\to+\\infty} f(n)/g(n)=" + L0 + "$; per il criterio del limite " + (rel < 0 ? "$f=o(g)$, quindi anche $f=\\bigO(g)$, $g=\\omega(f)$ e $g=\\Omega(f)$, ma non $\\Theta$ né $\\Omega$ di $f$ rispetto a $g$." : rel > 0 ? "$f=\\omega(g)$, quindi anche $f=\\Omega(g)$, $g=o(f)$ e $g=\\bigO(f)$." : "$f=\\Theta(g)$ (e $g=\\Theta(f)$), mentre $o$ e $\\omega$ sono false."),
          "We have $\\lim_{n\\to+\\infty} f(n)/g(n)=" + L0 + "$; by the limit criterion " + (rel < 0 ? "$f=o(g)$, hence also $f=\\bigO(g)$, $g=\\omega(f)$ and $g=\\Omega(f)$, but neither $\\Theta$ nor $\\Omega$ of $f$ with respect to $g$." : rel > 0 ? "$f=\\omega(g)$, hence also $f=\\Omega(g)$, $g=o(f)$ and $g=\\bigO(f)$." : "$f=\\Theta(g)$ (and $g=\\Theta(f)$), while $o$ and $\\omega$ are false.")),
        { f: f[0], g: g[0] });
    }
  });

  add({
    id: "alg-g-growth-order", livello: "facile", capitolo: "asymptotic-growth",
    link: L("asymptotics/10-asymptotic-growth/#sez-gr-sec-hierarchy", "notazione-asintotica/10-crescita-asintotica/#sez-gr-sec-hierarchy"),
    genera: function (rng, lingua) {
      var scelte = [];
      var pool = shuffle(rng, FUN);
      for (var i = 0; i < pool.length && scelte.length < 4; i++) {
        var ok = true;
        for (var j = 0; j < scelte.length; j++) if (cmpKey(scelte[j][1], pool[i][1]) === 0) ok = false;
        if (ok) scelte.push(pool[i]);
      }
      var ord = scelte.slice().sort(function (x, y) { return cmpKey(x[1], y[1]); });
      function op(lst) { return { k: lst.map(function (x) { return x[0]; }).join(";"), t: "$" + lst.map(function (x) { return x[0]; }).join(",\\quad ") + "$" }; }
      function sw(lst, p) { var c = lst.slice(); var t = c[p]; c[p] = c[p + 1]; c[p + 1] = t; return c; }
      var o = build(rng, op(ord), [op(sw(ord, 0)), op(sw(ord, 1)), op(sw(ord, 2))]);
      if (!o) return null;
      var mostra = shuffle(rng, scelte);
      return fine(o,
        T(lingua, "Ordinare per ordine di crescita, dalla più lenta alla più veloce (ognuna è $o$ della successiva), le funzioni $" + mostra.map(function (x) { return x[0]; }).join(",\\ ") + "$.",
          "Sort by order of growth, from the slowest to the fastest (each one is $o$ of the next), the functions $" + mostra.map(function (x) { return x[0]; }).join(",\\ ") + "$."),
        T(lingua, "Gerarchia: polilogaritmi $\\prec$ potenze $\\prec$ esponenziali $\\prec$ $n!$ $\\prec$ $n^n$; fra potenze conta l'esponente, fra esponenziali la base, e i fattori costanti o le traslazioni non cambiano l'ordine.",
          "Hierarchy: polylogarithms $\\prec$ powers $\\prec$ exponentials $\\prec$ $n!$ $\\prec$ $n^n$; among powers the exponent matters, among exponentials the base, and constant factors or shifts do not change the order."),
        { f: scelte.map(function (x) { return x[0]; }) });
    }
  });

  // =================================================================== 11 Dimensione dell'input
  add({
    id: "alg-g-input-size", livello: "facile", capitolo: "input-size",
    link: L("analysis/11-input-size/#115-input-instance-consisting-of-an-array-of-natural-numbers", "analisi/11-dimensione-input/#115-istanza-di-input-costituita-da-un-array-di-numeri-naturali"),
    genera: function (rng, lingua) {
      var n = ri(rng, 4, 6), a = []; for (var i = 0; i < n; i++) a.push(ri(rng, 1, 200));
      var I = 0, M = Math.max.apply(null, a), solo = 0; a.forEach(function (x) { I += bitlen(x); solo += flog2(x); });
      var o = build(rng, num(I), [num(n * bitlen(M)), num(solo), num(I + n), num(n * 8), num(I - 1)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "L'input è l'array $a=" + arr(a).slice(1, -1) + "$ (senza il numero $n$). Qual è la dimensione dell'input $|I|$, cioè il numero totale di bit per scriverlo in binario?",
          "The input is the array $a=" + arr(a).slice(1, -1) + "$ (without the number $n$). What is the input size $|I|$, i.e., the total number of bits needed to write it in binary?"),
        T(lingua, "Ogni componente richiede $\\lfloor\\log_2 a[i]\\rfloor+1$ bit: $" + a.map(bitlen).join("+") + "=" + I + "$. Il valore $n(\\lfloor\\log_2 M\\rfloor+1)=" + n * bitlen(M) + "$ è solo una limitazione superiore.",
          "Each entry requires $\\lfloor\\log_2 a[i]\\rfloor+1$ bits: $" + a.map(bitlen).join("+") + "=" + I + "$. The value $n(\\lfloor\\log_2 M\\rfloor+1)=" + n * bitlen(M) + "$ is only an upper bound."),
        { a: a });
    }
  });

  // =================================================================== 12 Tempo di esecuzione
  add({
    id: "alg-g-loop-count", livello: "facile", capitolo: "running-time",
    link: L("analysis/12-running-time/#1212-counting-the-steps-of-a-pseudo-code", "analisi/12-tempo-esecuzione/#1212-contare-i-passi-di-uno-pseudocodice"),
    genera: function (rng, lingua) {
      var tipo = ri(rng, 1, 5), n = ri(rng, 6, 20), g, cand, righe, riga = 3, sp;
      var kw = function (w) { return "<b>" + w + "</b>"; };
      var lg = flog2(n);
      if (tipo === 1) {
        g = n * (n + 1) / 2; cand = [n * (n - 1) / 2, n * n, g + n, (n + 1) * (n + 2) / 2];
        righe = ["1  x := 0", "2  " + kw("for") + " i := 1 " + kw("to") + " " + n + " " + kw("do"), "3      " + kw("for") + " j := i " + kw("to") + " " + n + " " + kw("do"), "4          x ← x + 1", "       " + kw("end"), "   " + kw("end")];
        riga = 4; sp = "\\sum_{i=1}^{" + n + "}(" + n + "-i+1)=\\frac{" + n + "\\cdot " + (n + 1) + "}{2}=" + g;
      } else if (tipo === 2) {
        g = n * (n - 1) / 2; cand = [n * (n + 1) / 2, n * n, (n - 1) * (n - 1), g - 1];
        righe = ["1  x := 0", "2  " + kw("for") + " i := 1 " + kw("to") + " " + n + " " + kw("do"), "3      " + kw("for") + " j := 1 " + kw("to") + " i − 1 " + kw("do"), "4          x ← x + 1", "       " + kw("end"), "   " + kw("end")];
        riga = 4; sp = "\\sum_{i=1}^{" + n + "}(i-1)=\\frac{" + n + "\\cdot " + (n - 1) + "}{2}=" + g;
      } else if (tipo === 3) {
        g = lg + 1; cand = [lg, lg + 2, clog2(n) + 1 === g ? clog2(n) : clog2(n) + 1, Math.floor(n / 2)];
        righe = ["1  x := 0", "2  i := 1", "3  " + kw("while") + " i ≤ " + n + " " + kw("do"), "4      x ← x + 1", "5      i ← 2 · i", "   " + kw("end")];
        riga = 4; sp = "i=1,2,4,\\dots,2^{" + lg + "}\\le " + n + "\\text{: }\\lfloor\\log_2 " + n + "\\rfloor+1=" + g;
      } else if (tipo === 4) {
        g = n * (lg + 1); cand = [n * lg, n * n, n * (lg + 2), (lg + 1) * (lg + 1)];
        righe = ["1  x := 0", "2  " + kw("for") + " i := 1 " + kw("to") + " " + n + " " + kw("do"), "3      j := 1", "4      " + kw("while") + " j ≤ " + n + " " + kw("do"), "5          x ← x + 1", "6          j ← 2 · j", "       " + kw("end"), "   " + kw("end")];
        riga = 5; sp = n + "\\cdot(\\lfloor\\log_2 " + n + "\\rfloor+1)=" + n + "\\cdot " + (lg + 1) + "=" + g;
      } else {
        g = n + 1; cand = [n, n + 2, n - 1, 2 * n];
        righe = ["1  s := 0", "2  i := 1", "3  " + kw("while") + " i ≤ " + n + " " + kw("do"), "4      s ← s + i", "5      i ← i + 1", "   " + kw("end")];
        riga = 3; sp = n + "+1=" + g;
      }
      var o = build(rng, num(g), cand.map(num));
      if (!o) return null;
      var dom = riga === 3 && tipo === 5
        ? T(lingua, "Quante volte viene valutata la condizione della riga $3$?", "How many times is the condition of line $3$ evaluated?")
        : T(lingua, "Quante volte viene eseguita la riga $" + riga + "$?", "How many times is line $" + riga + "$ executed?");
      return fine(o, dom + "\n" + pre(righe),
        T(lingua, "Si conta riga per riga: $" + sp + "$." + (tipo === 5 ? " La condizione di un while il cui corpo è eseguito $k$ volte è valutata $k+1$ volte." : ""),
          "Count line by line: $" + sp + "$." + (tipo === 5 ? " The condition of a while loop whose body is executed $k$ times is evaluated $k+1$ times." : "")),
        { tipo: tipo, n: n });
    }
  });

  add({
    id: "alg-g-findmax-steps", livello: "media", capitolo: "running-time",
    link: L("analysis/12-running-time/#1221-number-of-steps", "analisi/12-tempo-esecuzione/#1221-numero-di-passi"),
    genera: function (rng, lingua) {
      var n = ri(rng, 6, 9), a = []; for (var i = 0; i < n; i++) a.push(ri(rng, 1, 30));
      var t = 0, mx = a[0]; for (i = 1; i < n; i++) if (a[i] > mx) { mx = a[i]; t++; }
      var g = 3 * n + t + 1;
      var o = build(rng, num(g), [num(4 * n), num(3 * n + t), num(3 * n + t + 2), num(3 * n + 1), num(2 * n + t + 1)]);
      if (!o) return null;
      var kw = function (w) { return "<b>" + w + "</b>"; };
      var righe = ["1  max := a[1]", "2  i := 2", "3  " + kw("while") + " i ≤ n " + kw("do"), "4      " + kw("if") + " a[i] > max " + kw("then"), "5          max ← a[i]", "       " + kw("end"), "6      i ← i + 1", "   " + kw("end"), "7  " + kw("return") + " max"];
      return fine(o,
        T(lingua, "FindMaximum (pseudocodice qui sotto) è eseguito su $a=" + arr(a).slice(1, -1) + "$, con $n=" + n + "$. Contando un passo per ogni esecuzione di una riga numerata (compreso return), quanti passi esegue?",
          "FindMaximum (pseudo-code below) is executed on $a=" + arr(a).slice(1, -1) + "$, with $n=" + n + "$. Counting one step for each execution of a numbered line (return included), how many steps does it execute?") + "\n" + pre(righe),
        T(lingua, "Righe $1,2,7$: una volta ciascuna; condizione della riga $3$: $n=" + n + "$ volte; righe $4$ e $6$: $n-1=" + (n - 1) + "$ volte; riga $5$: $t=" + t + "$ volte (nuovi massimi). Totale $3n+t+1=" + g + "$; $4n$ è il caso peggiore $t=n-1$.",
          "Lines $1,2,7$: once each; condition of line $3$: $n=" + n + "$ times; lines $4$ and $6$: $n-1=" + (n - 1) + "$ times; line $5$: $t=" + t + "$ times (new maxima). Total $3n+t+1=" + g + "$; $4n$ is the worst case $t=n-1$."),
        { a: a });
    }
  });

  // =================================================================== 14 Ricorsione
  add({
    id: "alg-g-rec-calls", livello: "facile", capitolo: "recursion",
    link: L("recursion/14-recursion/#sez-sec-rec-tree", "ricorsione/14-ricorsione/#sez-sec-rec-tree"),
    genera: function (rng, lingua) {
      var tipo = ri(rng, 1, 4), g, cand, dom, sp, n;
      if (tipo === 1) {
        n = ri(rng, 5, 9); g = 2 * fib(n + 1) - 1; cand = [2 * fib(n) - 1, fib(n + 1), (1 << n) - 1, 2 * fib(n + 2) - 1, g + 1];
        dom = T(lingua, "Fib$(n)$ restituisce $n$ se $n\\le 1$, altrimenti Fib$(n-1)+$Fib$(n-2)$. Quante chiamate di Fib (compresa la prima) esegue Fib$(" + n + ")$?", "Fib$(n)$ returns $n$ if $n\\le 1$, otherwise Fib$(n-1)+$Fib$(n-2)$. How many calls of Fib (including the first one) does Fib$(" + n + ")$ execute?");
        sp = T(lingua, "$C(n)=C(n-1)+C(n-2)+1$ con $C(0)=C(1)=1$, cioè $C(n)=2F(n+1)-1=2\\cdot " + fib(n + 1) + "-1=" + g + "$.", "$C(n)=C(n-1)+C(n-2)+1$ with $C(0)=C(1)=1$, i.e., $C(n)=2F(n+1)-1=2\\cdot " + fib(n + 1) + "-1=" + g + "$.");
      } else if (tipo === 2) {
        n = ri(rng, 4, 10); g = (1 << n) - 1; cand = [1 << n, (1 << (n - 1)) - 1, n * n, 2 * n - 1, (1 << n) + 1];
        dom = T(lingua, "Hanoi$(n,from,to,aux)$ sposta una torre di $n$ dischi: se $n=1$ sposta il disco; altrimenti sposta $n-1$ dischi su $aux$ con una chiamata, sposta il disco $n$ su $to$ e riporta gli $n-1$ dischi su $to$ con un'altra chiamata. Quante mosse esegue con $n=" + n + "$?", "Hanoi$(n,from,to,aux)$ moves a tower of $n$ disks: if $n=1$ it moves the disk; otherwise it moves $n-1$ disks to $aux$ with one call, moves disk $n$ to $to$ and brings the $n-1$ disks onto $to$ with another call. How many moves does it execute with $n=" + n + "$?");
        sp = T(lingua, "$M(n)=2M(n-1)+1$ con $M(1)=1$, quindi $M(n)=2^n-1=" + g + "$.", "$M(n)=2M(n-1)+1$ with $M(1)=1$, hence $M(n)=2^n-1=" + g + "$.");
      } else if (tipo === 3) {
        n = ri(rng, 5, 100); g = flog2(n) + 2; cand = [flog2(n) + 1, clog2(n) + 2, n + 1, flog2(n) + 3];
        dom = T(lingua, "FastPower$(x,n)$ calcola $x^n$: se $n=0$ restituisce $1$; altrimenti pone $y:=$FastPower$(x,\\lfloor n/2\\rfloor)$ e restituisce $y\\cdot y$ ($n$ pari) o $x\\cdot y\\cdot y$ ($n$ dispari). Quante chiamate (compresa la prima) esegue FastPower$(x," + n + ")$?", "FastPower$(x,n)$ computes $x^n$: if $n=0$ it returns $1$; otherwise it sets $y:=$FastPower$(x,\\lfloor n/2\\rfloor)$ and returns $y\\cdot y$ ($n$ even) or $x\\cdot y\\cdot y$ ($n$ odd). How many calls (including the first one) does FastPower$(x," + n + ")$ execute?");
        sp = T(lingua, "Gli esponenti sono $" + n + ",\\lfloor " + n + "/2\\rfloor,\\dots,1,0$: tante chiamate quante le cifre binarie di $" + n + "$ più quella con esponente $0$, cioè $\\lfloor\\log_2 " + n + "\\rfloor+2=" + g + "$.", "The exponents are $" + n + ",\\lfloor " + n + "/2\\rfloor,\\dots,1,0$: as many calls as the binary digits of $" + n + "$ plus the one with exponent $0$, i.e., $\\lfloor\\log_2 " + n + "\\rfloor+2=" + g + "$.");
      } else {
        n = ri(rng, 4, 30); g = 2 * n + 2; cand = [2 * n, 2 * n + 1, n + 1, 3 * n + 2];
        dom = T(lingua, "Factorial$(n)$ esegue «<b>if</b> $n=0$ <b>then return</b> $1$» e altrimenti «<b>return</b> $n\\cdot$Factorial$(n-1)$». Contando un passo per il test, uno per ogni return eseguito e, in più, i passi della chiamata ricorsiva, quanti passi esegue Factorial$(" + n + ")$?", "Factorial$(n)$ executes «<b>if</b> $n=0$ <b>then return</b> $1$» and otherwise «<b>return</b> $n\\cdot$Factorial$(n-1)$». Counting one step for the test, one for each executed return and, in addition, the steps of the recursive call, how many steps does Factorial$(" + n + ")$ execute?");
        sp = T(lingua, "$S(0)=2$ e $S(n)=S(n-1)+2$, quindi $S(n)=2n+2=" + g + "$.", "$S(0)=2$ and $S(n)=S(n-1)+2$, hence $S(n)=2n+2=" + g + "$.");
      }
      var o = build(rng, num(g), cand.map(num));
      if (!o) return null;
      return fine(o, dom, sp, { tipo: tipo, n: n });
    }
  });

  add({
    id: "alg-g-rec-value", livello: "facile", capitolo: "recursion",
    link: L("recursion/14-recursion/#sez-sec-rec-tree", "ricorsione/14-ricorsione/#sez-sec-rec-tree"),
    genera: function (rng, lingua) {
      var al = ri(rng, 1, 3), be = ri(rng, 1, 3), u = ri(rng, 0, 2), v = ri(rng, 1, 3), n = ri(rng, 4, 6);
      var R = [u, v]; for (var i = 2; i <= n + 1; i++) R.push(al * R[i - 1] + be * R[i - 2]);
      var C = 2 * fib(n + 1) - 1;
      function op(x, y) { return { k: x + "|" + y, t: T(lingua, "valore $" + x + "$, $" + y + "$ chiamate", "value $" + x + "$, $" + y + "$ calls") }; }
      var o = build(rng, op(R[n], C), [op(R[n], n + 1), op(R[n - 1], C), op(R[n], C + 1), op(R[n + 1], 2 * fib(n + 2) - 1), op(R[n - 1], 2 * fib(n) - 1)]);
      if (!o) return null;
      var kw = function (w) { return "<b>" + w + "</b>"; };
      var righe = [kw("function") + " R(n)", "    " + kw("if") + " n = 0 " + kw("then") + " " + kw("return") + " " + u, "    " + kw("if") + " n = 1 " + kw("then") + " " + kw("return") + " " + v,
        "    " + kw("return") + " " + (al === 1 ? "" : al + " · ") + "R(n − 1) + " + (be === 1 ? "" : be + " · ") + "R(n − 2)", kw("end")];
      return fine(o,
        T(lingua, "Che cosa restituisce la chiamata R$(" + n + ")$ e quante chiamate di R esegue in tutto (compresa la prima)?", "What does the call R$(" + n + ")$ return, and how many calls of R does it execute in total (including the first one)?") + "\n" + pre(righe),
        T(lingua, "I valori $R(0),\\dots,R(" + n + ")$ sono $" + R.slice(0, n + 1).join(",\\ ") + "$. L'albero delle chiamate è quello di Fib: $C(n)=C(n-1)+C(n-2)+1$, $C(0)=C(1)=1$, quindi $" + C + "$ chiamate (non $n+1$: i sottoproblemi si ripetono).",
          "The values $R(0),\\dots,R(" + n + ")$ are $" + R.slice(0, n + 1).join(",\\ ") + "$. The tree of recursive calls is that of Fib: $C(n)=C(n-1)+C(n-2)+1$, $C(0)=C(1)=1$, hence $" + C + "$ calls (not $n+1$: the subproblems are repeated)."),
        { al: al, be: be, u: u, v: v, n: n });
    }
  });

  // =================================================================== 15 Equazioni di ricorrenza
  add({
    id: "alg-g-rec-expansion", livello: "media", capitolo: "recurrences",
    link: L("recursion/15-recurrences/#sez-sec-expansion", "ricorsione/15-ricorrenze/#sez-sec-expansion"),
    genera: function (rng, lingua) {
      var a = ri(rng, 1, 4), fi = ri(rng, 0, 2), k = ri(rng, 3, 5), n = 1 << k;
      if (fi === 2 && k === 5 && a === 4) return null;
      var f = function (m) { return fi === 0 ? 1 : (fi === 1 ? m : m * m); };
      var Tv = function (m) { return m === 1 ? 1 : a * Tv(m / 2) + f(m); };
      var g = Tv(n), ak = Math.pow(a, k);
      var o = build(rng, num(g), [num(g - ak), num(g + ak), num(g - Math.pow(a, k - 1) * f(2)), num(a * g), num(g + f(n))]);
      if (!o) return null;
      var ftex = ["1", "n", "n^2"][fi];
      var livelli = []; for (var j = 0; j < k; j++) livelli.push(Math.pow(a, j) * f(n >> j));
      return fine(o,
        T(lingua, "Sia $T(1)=1$ e $T(n)=" + (a === 1 ? "" : a) + "T(n/2)+" + ftex + "$ per $n\\ge 2$ potenza di $2$. Quanto vale $T(" + n + ")$?",
          "Let $T(1)=1$ and $T(n)=" + (a === 1 ? "" : a) + "T(n/2)+" + ftex + "$ for $n\\ge 2$ a power of $2$. What is $T(" + n + ")$?"),
        T(lingua, "Espandendo, $T(n)=a^{k}T(1)+\\sum_{j=0}^{k-1}a^j f(n/2^j)$ con $k=" + k + "$: $" + ak + "+" + livelli.join("+") + "=" + g + "$.",
          "Expanding, $T(n)=a^{k}T(1)+\\sum_{j=0}^{k-1}a^j f(n/2^j)$ with $k=" + k + "$: $" + ak + "+" + livelli.join("+") + "=" + g + "$."),
        { a: a, f: fi, n: n });
    }
  });

  // =================================================================== 16 Master theorem
  var MT_AB = [[1, 2, 0, "0"], [2, 2, 1, "1"], [4, 2, 2, "2"], [8, 2, 3, "3"], [3, 3, 1, "1"], [9, 3, 2, "2"], [2, 4, 0.5, "1/2"],
    [4, 4, 1, "1"], [16, 4, 2, "2"], [3, 2, Math.log(3) / Math.log(2), "\\log_2 3"], [7, 2, Math.log(7) / Math.log(2), "\\log_2 7"], [5, 4, Math.log(5) / Math.log(4), "\\log_4 5"]];
  function potTex(eTex, e, lg) {          // n^e log^lg n
    var s = e === 0 ? "" : (e === 1 ? "n" : (eTex === "1/2" ? "\\sqrt{n}" : "n^{" + eTex + "}"));
    var l = lg === 0 ? "" : (lg === 1 ? "\\log n" : "\\log^{" + lg + "} n");
    if (!s && !l) return "1";
    return s + (s && l ? "\\," : "") + l;
  }
  add({
    id: "alg-g-master", livello: "facile", capitolo: "master-theorem",
    link: L("recursion/16-master-theorem/#sez-sec-applying", "ricorsione/16-master-theorem/#sez-sec-applying"),
    genera: function (rng, lingua) {
      var ab = pickOne(rng, MT_AB), a = ab[0], b = ab[1], p = ab[2], pTex = ab[3];
      var ds = [[0, "0"], [0.5, "1/2"], [1, "1"], [2, "2"], [3, "3"]];
      var dd = pickOne(rng, ds), d = dd[0], dTex = dd[1], k = (Math.abs(d - p) < 1e-12 && rng() < 0.4) ? 1 : 0;
      var caso = Math.abs(d - p) < 1e-12 ? 2 : (d < p ? 1 : 3);
      function op(eT, e, lg) { return { k: e.toFixed(6) + "|" + lg, t: "$T(n)=\\Theta\\big(" + potTex(eT, e, lg) + "\\big)$" }; }
      var giusta = caso === 1 ? op(pTex, p, 0) : (caso === 2 ? op(pTex, p, k + 1) : op(dTex, d, k));
      var o = build(rng, giusta, [op(pTex, p, 0), op(pTex, p, k + 1), op(dTex, d, k), op(dTex, d, k + 1), op(pTex, p, 1), op(pTex, p, 2)]);
      if (!o) return null;
      var ftex = potTex(dTex, d, k);
      var nlog = potTex(pTex, p, 0);
      return fine(o,
        T(lingua, "Con il Master theorem, qual è l'ordine di crescita della soluzione di $T(n)=" + (a === 1 ? "" : a + "\\,") + "T(n/" + b + ")+" + ftex + "$?",
          "Using the Master Theorem, what is the order of growth of the solution of $T(n)=" + (a === 1 ? "" : a + "\\,") + "T(n/" + b + ")+" + ftex + "$?"),
        T(lingua, "Si confronta $f(n)=" + ftex + "$ con $n^{\\log_b a}=n^{\\log_{" + b + "} " + a + "}=" + nlog + "$: " + (caso === 1 ? "$f$ è polinomialmente più piccola (caso 1), quindi $T(n)=\\Theta(" + nlog + ")$." : caso === 2 ? "stesso ordine a meno di $\\log^{" + k + "} n$ (caso 2), quindi si aggiunge un fattore $\\log n$." : "$f$ è polinomialmente più grande e la condizione di regolarità vale (caso 3), quindi $T(n)=\\Theta(f(n))$."),
          "Compare $f(n)=" + ftex + "$ with $n^{\\log_b a}=n^{\\log_{" + b + "} " + a + "}=" + nlog + "$: " + (caso === 1 ? "$f$ is polynomially smaller (case 1), hence $T(n)=\\Theta(" + nlog + ")$." : caso === 2 ? "same order up to $\\log^{" + k + "} n$ (case 2), hence one more factor $\\log n$ appears." : "$f$ is polynomially larger and the regularity condition holds (case 3), hence $T(n)=\\Theta(f(n))$.")),
        { a: a, b: b, d: d, k: k });
    }
  });

  // =================================================================== 17 Algoritmi ricorsivi
  add({
    id: "alg-g-merge", livello: "facile", capitolo: "recursive-algorithms",
    link: L("recursion/17-recursive-algorithms/#172-merge-sort", "ricorsione/17-algoritmi-ricorsivi/#172-merge-sort"),
    genera: function (rng, lingua) {
      var n1 = ri(rng, 3, 4), n2 = ri(rng, 3, 4), v = sample(rng, 1, 20, n1 + n2);
      var Lf = v.slice(0, n1).sort(function (x, y) { return x - y; }), Rt = v.slice(n1).sort(function (x, y) { return x - y; });
      var c = merge(Lf, Rt).cmp;
      var o = build(rng, num(c), [num(n1 + n2 - 1), num(n1 + n2), num(c + 1), num(c - 1), num(Math.min(n1, n2))]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Merge$(a,l,m,r)$ copia le metà ordinate in $L=a[l..m]$ e $R=a[m+1..r]$; finché nessuna delle due è esaurita confronta $L[i]\\le R[j]$ e copia in $a$ il minore; poi copia il resto senza confronti. Con $L=" + arr(Lf).slice(1, -1) + "$ e $R=" + arr(Rt).slice(1, -1) + "$, quante volte esegue il confronto $L[i]\\le R[j]$?",
          "Merge$(a,l,m,r)$ copies the sorted halves into $L=a[l..m]$ and $R=a[m+1..r]$; while neither is exhausted it compares $L[i]\\le R[j]$ and copies the smaller into $a$; then it copies the rest with no comparison. With $L=" + arr(Lf).slice(1, -1) + "$ and $R=" + arr(Rt).slice(1, -1) + "$, how many times does it execute the comparison $L[i]\\le R[j]$?"),
        T(lingua, "Ogni iterazione del primo ciclo while fa un confronto e copia un elemento; il ciclo finisce quando una delle due metà è esaurita, e il resto dell'altra è copiato senza confronti: $" + c + "$ confronti ($n_1+n_2-1=" + (n1 + n2 - 1) + "$ è solo il massimo).",
          "Each iteration of the first while loop makes one comparison and copies one element; the loop ends when one of the two halves is exhausted, and the rest of the other is copied without comparisons: $" + c + "$ comparisons ($n_1+n_2-1=" + (n1 + n2 - 1) + "$ is only the maximum)."),
        { L: Lf, R: Rt });
    }
  });

  add({
    id: "alg-g-mergesort-total", livello: "complessa", capitolo: "recursive-algorithms",
    link: L("recursion/17-recursive-algorithms/#1724-number-of-steps", "ricorsione/17-algoritmi-ricorsivi/#1724-numero-di-passi"),
    genera: function (rng, lingua) {
      var a = sample(rng, 1, 20, 8), r = mergeSort(a);
      var o = build(rng, num(r.cmp), [num(17), num(24), num(r.last), num(r.cmp + 1), num(r.cmp - 1)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "MergeSort$(a,l,r)$, se $l<r$, ordina ricorsivamente $a[l..m]$ e $a[m+1..r]$ con $m=\\lfloor(l+r)/2\\rfloor$ e le fonde con Merge, che confronta $L[i]\\le R[j]$ finché una delle due metà non è esaurita. Per MergeSort$(a,1,8)$ su $a=" + arr(a).slice(1, -1) + "$, quanti confronti $L[i]\\le R[j]$ si eseguono in tutto?",
          "MergeSort$(a,l,r)$, if $l<r$, recursively sorts $a[l..m]$ and $a[m+1..r]$ with $m=\\lfloor(l+r)/2\\rfloor$ and merges them with Merge, which compares $L[i]\\le R[j]$ until one of the two halves is exhausted. For MergeSort$(a,1,8)$ on $a=" + arr(a).slice(1, -1) + "$, how many comparisons $L[i]\\le R[j]$ are executed in total?"),
        T(lingua, "Si eseguono $4$ fusioni di coppie, $2$ di quaterne e una finale, contando in ciascuna i confronti fino all'esaurimento di una metà: in tutto $" + r.cmp + "$ (la fusione finale ne fa $" + r.last + "$). $17$ è il massimo possibile ($4\\cdot1+2\\cdot3+7$).",
          "There are $4$ merges of pairs, $2$ of quadruples and a final one, each counting the comparisons until one half is exhausted: $" + r.cmp + "$ in total (the final merge makes $" + r.last + "$). $17$ is the maximum possible ($4\\cdot1+2\\cdot3+7$)."),
        { a: a });
    }
  });

  add({
    id: "alg-g-kadane", livello: "complessa", capitolo: "recursive-algorithms",
    link: L("recursion/17-recursive-algorithms/#1747-remark-an-iterative-linear-algorithm", "ricorsione/17-algoritmi-ricorsivi/#1747-osservazione-un-algoritmo-iterativo-lineare"),
    genera: function (rng, lingua) {
      var n = 8, a = []; for (var i = 0; i < n; i++) a.push(ri(rng, -9, 9));
      if (a.filter(function (x) { return x < 0; }).length < 3 || a.every(function (x) { return x <= 0; })) return null;
      var best = -1e9, cnt = 0, bl = 0, br = 0;
      for (var l = 0; l < n; l++) { var s = 0; for (var r = l; r < n; r++) { s += a[r]; if (s > best) { best = s; cnt = 1; bl = l; br = r; } else if (s === best) cnt++; } }
      if (cnt !== 1) return null;
      // Kadane come nelle dispense
      var kb = a[0], kbl = 1, kbr = 1, cur = a[0], cl = 1;
      for (i = 2; i <= n; i++) { if (cur < 0) { cur = a[i - 1]; cl = i; } else cur += a[i - 1]; if (cur > kb) { kb = cur; kbl = cl; kbr = i; } }
      if (kb !== best || kbl !== bl + 1 || kbr !== br + 1) return null;
      function op(x, y, z) { return { k: x + "|" + y + "|" + z, t: "$(bl,br,best)=(" + x + "," + y + "," + z + ")$" }; }
      var mi = 0; for (i = 1; i < n; i++) if (a[i] > a[mi]) mi = i;
      var pos = 0, fp = -1, lp = -1; for (i = 0; i < n; i++) if (a[i] > 0) { pos += a[i]; if (fp < 0) fp = i; lp = i; }
      var pr = -1e9, prr = 0, ps = 0; for (i = 0; i < n; i++) { ps += a[i]; if (ps > pr) { pr = ps; prr = i; } }
      var mid = 3, ls = -1e9, ml = 0, sm = 0; for (i = mid; i >= 0; i--) { sm += a[i]; if (sm > ls) { ls = sm; ml = i; } }
      var rs = -1e9, mr = 0; sm = 0; for (i = mid + 1; i < n; i++) { sm += a[i]; if (sm > rs) { rs = sm; mr = i; } }
      var o = build(rng, op(bl + 1, br + 1, best), [op(fp + 1, lp + 1, pos), op(ml + 1, mr + 1, ls + rs), op(1, prr + 1, pr), op(mi + 1, mi + 1, a[mi]), op(bl + 1, br + 1, best + 1)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Kadane$(a,n)$ risolve il problema del sotto-array di somma massima: restituisce la terna $(bl,br,best)$, dove $a[bl..br]$ è un sotto-array (di elementi consecutivi, non vuoto) di somma massima e $best$ è la sua somma (nelle istanze proposte il sotto-array di somma massima è unico). Che cosa restituisce Kadane$(a,8)$ su $a=" + arr(a).slice(1, -1) + "$?",
          "Kadane$(a,n)$ solves the maximum subarray problem: it returns the triple $(bl,br,best)$, where $a[bl..br]$ is a (non-empty, contiguous) subarray of maximum sum and $best$ is its sum (in the proposed instances the maximum-sum subarray is unique). What does Kadane$(a,8)$ return on $a=" + arr(a).slice(1, -1) + "$?"),
        T(lingua, "Kadane scorre l'array tenendo $cur$, la somma massima di un sotto-array che termina nella posizione precedente: in posizione $i$ riparte da $a[i]$ se $cur<0$, altrimenti estende con $a[i]$. Il massimo è $a[" + (bl + 1) + ".." + (br + 1) + "]$ con somma $" + best + "$. La somma dei soli positivi ($" + pos + "$) non corrisponde a un sotto-array contiguo.",
          "Kadane scans the array keeping $cur$, the maximum sum of a subarray ending at the previous position: at position $i$ it restarts from $a[i]$ if $cur<0$, otherwise it extends with $a[i]$. The maximum is $a[" + (bl + 1) + ".." + (br + 1) + "]$ with sum $" + best + "$. The sum of the positive entries only ($" + pos + "$) does not correspond to a contiguous subarray."),
        { a: a });
    }
  });

  // =================================================================== 18 Ricorsivo e iterativo
  add({
    id: "alg-g-fib-memo", livello: "facile", capitolo: "recursive-vs-iterative",
    link: L("recursion/18-recursive-vs-iterative/#sez-sec-overlap", "ricorsione/18-ricorsivo-iterativo/#sez-sec-overlap"),
    genera: function (rng, lingua) {
      var n = ri(rng, 5, 10), cr = 2 * fib(n + 1) - 1, cm = 2 * n - 1;
      function op(x, y) { return { k: x + "|" + y, t: T(lingua, "FibRec: $" + x + "$, FibMemo: $" + y + "$", "FibRec: $" + x + "$, FibMemo: $" + y + "$") }; }
      var o = build(rng, op(cr, cm), [op(cr, n + 1), op(fib(n), cm), op(cr, 2 * n + 1), op((1 << n) - 1, n), op(2 * fib(n) - 1, cm)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "FibRec$(k)$ restituisce $k$ se $k\\le 1$, altrimenti FibRec$(k-1)+$FibRec$(k-2)$. FibMemo$(k,memo)$ fa lo stesso, ma se $memo[k]$ è già definito lo restituisce senza altre chiamate, e altrimenti salva il risultato in $memo[k]$. Quante chiamate (compresa la prima) eseguono FibRec$(" + n + ")$ e FibMemo$(" + n + ",memo)$, con $memo$ tutta indefinita?",
          "FibRec$(k)$ returns $k$ if $k\\le 1$, otherwise FibRec$(k-1)+$FibRec$(k-2)$. FibMemo$(k,memo)$ does the same, but if $memo[k]$ is already defined it returns it with no further call, and otherwise it stores the result in $memo[k]$. How many calls (including the first one) do FibRec$(" + n + ")$ and FibMemo$(" + n + ",memo)$ execute, with $memo$ all undefined?"),
        T(lingua, "FibRec: $C(n)=2F(n+1)-1=" + cr + "$ (sottoproblemi sovrapposti). FibMemo: ogni valore è calcolato una volta, $M(n)=M(n-1)+2$ con $M(2)=3$, quindi $2n-1=" + cm + "$.",
          "FibRec: $C(n)=2F(n+1)-1=" + cr + "$ (overlapping subproblems). FibMemo: each value is computed once, $M(n)=M(n-1)+2$ with $M(2)=3$, hence $2n-1=" + cm + "$."),
        { n: n });
    }
  });

  // =================================================================== aggiunte (6 novembre 2026)
  function par(v) { return v < 0 ? "(" + v + ")" : String(v); }
  function segniOpposti(rng) {                 // dividendo e divisore di segno opposto, divisione non esatta
    var a = ri(rng, 7, 40), b = ri(rng, 2, 9);
    if (a % b === 0) return null;
    return rng() < 0.5 ? { x: -a, y: b } : { x: a, y: -b };
  }

  // ------------------------------------------------ 6 C++: operatori bit a bit
  add({
    id: "alg-g-cpp-bitwise", livello: "facile", capitolo: "cpp",
    link: L("languages/06-introduction-to-cpp/#610-bitwise-operators", "linguaggi/06-introduzione-cpp/#610-operatori-bit-a-bit"),
    genera: function (rng, lingua) {
      var op = pickOne(rng, ["&", "|", "^", "<<", ">>"]), sh = op === "<<" || op === ">>";
      var x = ri(rng, 5, 31), y = sh ? ri(rng, 1, 3) : ri(rng, 5, 31);
      if (!sh && x === y) return null;
      var val = { "&": x & y, "|": x | y, "^": x ^ y, "<<": x << y, ">>": x >> y }, g = val[op];
      var cand = sh ? [op === "<<" ? x >> y : x << y, x * y, x + y, op === "<<" ? x << (y + 1) : x >> (y + 1), Math.floor(x / y)]
        : ["&", "|", "^"].filter(function (s) { return s !== op; }).map(function (s) { return val[s]; }).concat([x + y, Math.abs(x - y)]);
      var o = build(rng, num(g), cand.map(num));
      if (!o) return null;
      var html = { "&": "&amp;", "|": "|", "^": "^", "<<": "&lt;&lt;", ">>": "&gt;&gt;" }[op];
      var sp;
      if (op === "<<") sp = T(lingua, "Lo scorrimento a sinistra di $" + y + "$ posizioni aggiunge $" + y + "$ zeri in coda, cioè moltiplica per $2^{" + y + "}$: $" + x + "\\cdot " + (1 << y) + "=" + g + "$.", "A left shift by $" + y + "$ positions appends $" + y + "$ zeros, i.e., multiplies by $2^{" + y + "}$: $" + x + "\\cdot " + (1 << y) + "=" + g + "$.");
      else if (op === ">>") sp = T(lingua, "Lo scorrimento a destra di $" + y + "$ posizioni toglie i $" + y + "$ bit meno significativi di $(" + bits(x, 5) + ")_2$, cioè calcola $\\lfloor " + x + "/" + (1 << y) + "\\rfloor=" + g + "$.", "A right shift by $" + y + "$ positions removes the $" + y + "$ least significant bits of $(" + bits(x, 5) + ")_2$, i.e., it computes $\\lfloor " + x + "/" + (1 << y) + "\\rfloor=" + g + "$.");
      else {
        var reg = { "&": T(lingua, "un bit vale $1$ solo se vale $1$ in entrambi", "a bit is $1$ only if it is $1$ in both"), "|": T(lingua, "un bit vale $1$ se vale $1$ in almeno uno dei due", "a bit is $1$ if it is $1$ in at least one of them"), "^": T(lingua, "un bit vale $1$ se vale $1$ in esattamente uno dei due", "a bit is $1$ if it is $1$ in exactly one of them") }[op];
        sp = T(lingua, "$" + x + "=(" + bits(x, 5) + ")_2$ e $" + y + "=(" + bits(y, 5) + ")_2$; con <code>" + html + "</code> " + reg + ": $(" + bits(g, 5) + ")_2=" + g + "$.", "$" + x + "=(" + bits(x, 5) + ")_2$ and $" + y + "=(" + bits(y, 5) + ")_2$; with <code>" + html + "</code> " + reg + ": $(" + bits(g, 5) + ")_2=" + g + "$.");
      }
      return fine(o,
        T(lingua, "In C++, con <code>int x = " + x + ", y = " + y + ";</code>, quanto vale l'espressione <code>x " + html + " y</code>?", "In C++, with <code>int x = " + x + ", y = " + y + ";</code>, what is the value of the expression <code>x " + html + " y</code>?"),
        sp, { x: x, y: y, op: op });
    }
  });

  // ------------------------------------------------ 7 Python: divisione intera e resto con segni opposti
  add({
    id: "alg-g-py-divmod", livello: "facile", capitolo: "python",
    link: L("languages/07-introduction-to-python/#sez-py-secarith", "linguaggi/07-introduzione-python/#sez-py-secarith"),
    genera: function (rng, lingua) {
      var s = segniOpposti(rng); if (!s) return null;
      var x = s.x, y = s.y, qf = Math.floor(x / y), rf = x - y * qf, qt = Math.trunc(x / y), rt = x - y * qt;
      function op(q, r) { return { k: q + "|" + r, t: T(lingua, "$" + q + "$ e $" + r + "$", "$" + q + "$ and $" + r + "$") }; }
      var o = build(rng, op(qf, rf), [op(qt, rt), op(qf, rt), op(qt, rf), op(qf, -rf), op(qt, -rt)]);
      if (!o) return null;
      var ex = "<code>" + x + " // " + y + "</code>", em = "<code>" + x + " % " + y + "</code>";
      return fine(o,
        T(lingua, "In Python 3, quanto valgono " + ex + " e " + em + " (nell'ordine)?", "In Python 3, what are " + ex + " and " + em + " (in this order)?"),
        T(lingua, "In Python <code>//</code> arrotonda il quoziente verso il basso: $\\lfloor " + x + "/" + par(y) + "\\rfloor=" + qf + "$; il resto è $" + x + "-" + par(y) + "\\cdot" + par(qf) + "=" + rf + "$ e ha il segno del divisore. C++ e Java troncano verso lo zero e darebbero $" + qt + "$ e $" + rt + "$.",
          "In Python <code>//</code> rounds the quotient down: $\\lfloor " + x + "/" + par(y) + "\\rfloor=" + qf + "$; the remainder is $" + x + "-" + par(y) + "\\cdot" + par(qf) + "=" + rf + "$ and has the sign of the divisor. C++ and Java truncate toward zero and would give $" + qt + "$ and $" + rt + "$."),
        { x: x, y: y });
    }
  });

  // ------------------------------------------------ 8 Java: divisione intera e resto con segni opposti
  add({
    id: "alg-g-java-divmod", livello: "facile", capitolo: "java",
    link: L("languages/08-introduction-to-java/#841-arithmetic-operators", "linguaggi/08-introduzione-java/#841-operatori-aritmetici"),
    genera: function (rng, lingua) {
      var s = segniOpposti(rng); if (!s) return null;
      var x = s.x, y = s.y, qf = Math.floor(x / y), rf = x - y * qf, qt = Math.trunc(x / y), rt = x - y * qt;
      function op(q, r) { return { k: q + "|" + r, t: "<code>" + q + " " + r + "</code>" }; }
      var o = build(rng, op(qt, rt), [op(qf, rf), op(qt, rf), op(qf, rt), op(qt, -rt), op(qf, -rf)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "In Java, con <code>int x = " + x + ", y = " + y + ";</code>, che cosa stampa <code>System.out.println(x / y + \" \" + x % y);</code>?",
          "In Java, with <code>int x = " + x + ", y = " + y + ";</code>, what does <code>System.out.println(x / y + \" \" + x % y);</code> print?"),
        T(lingua, "Fra due <code>int</code>, <code>/</code> tronca il quoziente verso lo zero: $" + qt + "$; il resto è $" + x + "-" + par(y) + "\\cdot" + par(qt) + "=" + rt + "$ e ha il segno del dividendo. $" + qf + "$ e $" + rf + "$ sono i risultati di <code>//</code> e <code>%</code> in Python, che arrotonda verso il basso.",
          "Between two <code>int</code> values, <code>/</code> truncates the quotient toward zero: $" + qt + "$; the remainder is $" + x + "-" + par(y) + "\\cdot" + par(qt) + "=" + rt + "$ and has the sign of the dividend. $" + qf + "$ and $" + rf + "$ are the results of <code>//</code> and <code>%</code> in Python, which rounds down."),
        { x: x, y: y });
    }
  });

  // ------------------------------------------------ 9 Notazione asintotica: costanti della definizione di Theta
  add({
    id: "alg-g-theta-constants", livello: "media", capitolo: "asymptotic-notation",
    link: L("asymptotics/09-asymptotic-notation/#912-examples-of-asymptotic-tight-bounds", "notazione-asintotica/09-notazione-asintotica/#912-esempi-di-limitazioni-asintotiche-strette"),
    genera: function (rng, lingua) {
      var a = ri(rng, 2, 6), b = ri(rng, 3, 9), v = ri(rng, 0, 2);
      var giusta = [[a, a + 1, b], [1, a + b, 1], [a, a + 2, Math.ceil(b / 2)]][v];
      var cand = [[a, a + 1, b - 1], [a, a, b], [a + 1, a + 2, 1], [a, a + 1, 1], [a + 1, 2 * a + b, b], [1, a + b - 1, 1]];
      function op(t) { return { k: t.join("|"), t: "$c_1=" + t[0] + "$, $c_2=" + t[1] + "$, $n_1=" + t[2] + "$" }; }
      var o = build(rng, op(giusta), shuffle(rng, cand).map(op));
      if (!o) return null;
      var c2a = giusta[1] - a;
      return fine(o,
        T(lingua, "Per dimostrare con la definizione che $f(n)=" + a + "n^2+" + b + "n=\\Theta(n^2)$ servono costanti $c_1,c_2>0$ e una soglia $n_1\\in\\N$ con $c_1n^2\\le f(n)\\le c_2n^2$ per ogni $n\\ge n_1$. Quale scelta funziona?",
          "To prove with the definition that $f(n)=" + a + "n^2+" + b + "n=\\Theta(n^2)$ we need constants $c_1,c_2>0$ and a threshold $n_1\\in\\N$ with $c_1n^2\\le f(n)\\le c_2n^2$ for all $n\\ge n_1$. Which choice works?"),
        T(lingua, "Il limite inferiore $c_1n^2\\le f(n)$ vale per ogni $n$ se e solo se $c_1\\le " + a + "$. Il superiore equivale a $" + b + "n\\le(c_2-" + a + ")n^2$, cioè $(c_2-" + a + ")\\,n\\ge " + b + "$: serve $c_2>" + a + "$ e $n_1\\ge " + b + "/(c_2-" + a + ")$. Con $c_2=" + giusta[1] + "$ si ha $" + c2a + "\\cdot " + giusta[2] + "\\ge " + b + "$; le altre scelte violano una delle condizioni.",
          "The lower bound $c_1n^2\\le f(n)$ holds for all $n$ if and only if $c_1\\le " + a + "$. The upper one is equivalent to $" + b + "n\\le(c_2-" + a + ")n^2$, i.e., $(c_2-" + a + ")\\,n\\ge " + b + "$: we need $c_2>" + a + "$ and $n_1\\ge " + b + "/(c_2-" + a + ")$. With $c_2=" + giusta[1] + "$ we have $" + c2a + "\\cdot " + giusta[2] + "\\ge " + b + "$; the other choices violate one of the conditions."),
        { a: a, b: b });
    }
  });

  // ------------------------------------------------ 13 Correttezza: valori all'inizio di un'iterazione (invariante)
  add({
    id: "alg-g-findmax-invariant", livello: "facile", capitolo: "correctness",
    link: L("analysis/13-correctness/#132-correctness-of-find-maximum", "analisi/13-correttezza/#132-correttezza-di-find-maximum"),
    genera: function (rng, lingua) {
      var n = 7, a = sample(rng, 1, 40, n), k = ri(rng, 2, 6);
      function mx(h) { var m = a[0]; for (var i = 1; i < h; i++) if (a[i] > m) m = a[i]; return m; }   // max di a[1..h]
      function op(i, m) { return { k: i + "|" + m, t: "$i=" + i + "$, $max=" + m + "$" }; }
      var o = build(rng, op(k + 1, mx(k)), [op(k + 1, mx(k + 1)), op(k, mx(k - 1)), op(k + 1, a[k - 1]), op(k, mx(k)), op(k + 1, a[k])]);
      if (!o) return null;
      var kw = function (w) { return "<b>" + w + "</b>"; };
      var righe = ["1  max := a[1]", "2  i := 2", "3  " + kw("while") + " i ≤ n " + kw("do"), "4      " + kw("if") + " a[i] > max " + kw("then"), "5          max ← a[i]", "       " + kw("end"), "6      i ← i + 1", "   " + kw("end"), "7  " + kw("return") + " max"];
      return fine(o,
        T(lingua, "FindMaximum (qui sotto) è eseguito su $a=" + arr(a).slice(1, -1) + "$, con $n=" + n + "$. Quanto valgono $i$ e $max$ quando la condizione della riga $3$ viene valutata per la $" + k + "$-esima volta?",
          "FindMaximum (below) is executed on $a=" + arr(a).slice(1, -1) + "$, with $n=" + n + "$. What are the values of $i$ and $max$ when the condition of line $3$ is evaluated for the $" + k + "$-th time?") + "\n" + pre(righe),
        T(lingua, "Alla prima valutazione $i=2$ e $max=a[1]$; ogni iterazione incrementa $i$. Alla valutazione numero $" + k + "$ si ha $i=" + (k + 1) + "$ e, per l'invariante $max=\\max\\{a[1],\\dots,a[i-1]\\}$, $max=\\max\\{a[1],\\dots,a[" + k + "]\\}=" + mx(k) + "$.",
          "At the first evaluation $i=2$ and $max=a[1]$; each iteration increments $i$. At evaluation number $" + k + "$ we have $i=" + (k + 1) + "$ and, by the invariant $max=\\max\\{a[1],\\dots,a[i-1]\\}$, $max=\\max\\{a[1],\\dots,a[" + k + "]\\}=" + mx(k) + "$."),
        { a: a, k: k });
    }
  });

  // ------------------------------------------------ 14 Ricorsione: chiamate e moltiplicazioni di FastPower
  add({
    id: "alg-g-fastpower-mults", livello: "media", capitolo: "recursion",
    link: L("recursion/14-recursion/#1472-number-of-steps", "ricorsione/14-ricorsione/#1472-numero-di-passi"),
    genera: function (rng, lingua) {
      var n = ri(rng, 5, 120), Lb = bitlen(n), pc = 0, x = n; while (x > 0) { pc += x % 2; x = Math.floor(x / 2); }
      var m = Lb + pc;
      function op(c, mm) { return { k: c + "|" + mm, t: T(lingua, "$" + c + "$ chiamate, $" + mm + "$ moltiplicazioni", "$" + c + "$ calls, $" + mm + "$ multiplications") }; }
      var o = build(rng, op(Lb + 1, m), [op(Lb, m), op(Lb + 1, 2 * Lb), op(Lb + 1, n - 1), op(Lb + 1, m - 1), op(Lb + 2, m), op(Lb + 1, Lb)]);
      if (!o) return null;
      var kw = function (w) { return "<b>" + w + "</b>"; };
      var righe = [kw("function") + " FastPower(x, n)", "    " + kw("if") + " n = 0 " + kw("then") + " " + kw("return") + " 1", "    y := FastPower(x, ⌊n/2⌋)", "    " + kw("if") + " n mod 2 = 0 " + kw("then") + " " + kw("return") + " y · y", "    " + kw("else") + " " + kw("return") + " x · y · y", kw("end")];
      var es = [], z = n; while (z > 0) { es.push(z); z = Math.floor(z / 2); } es.push(0);
      return fine(o,
        T(lingua, "Quante chiamate di FastPower (compresa la prima) e quante moltiplicazioni esegue in tutto FastPower$(x," + n + ")$? ($y\\cdot y$ conta una moltiplicazione, $x\\cdot y\\cdot y$ due.)",
          "How many calls of FastPower (including the first one) and how many multiplications in total does FastPower$(x," + n + ")$ execute? ($y\\cdot y$ counts one multiplication, $x\\cdot y\\cdot y$ two.)") + "\n" + pre(righe),
        T(lingua, "Gli esponenti delle chiamate sono $" + es.join(",") + "$: $" + (Lb + 1) + "$ chiamate. Ognuna delle $" + Lb + "$ con esponente positivo fa una moltiplicazione, più una seconda se l'esponente è dispari ($" + pc + "$ volte, gli $1$ in $(" + n.toString(2) + ")_2$): $" + Lb + "+" + pc + "=" + m + "$, contro le $" + (n - 1) + "$ del calcolo diretto.",
          "The exponents of the calls are $" + es.join(",") + "$: $" + (Lb + 1) + "$ calls. Each of the $" + Lb + "$ calls with positive exponent makes one multiplication, plus a second one if the exponent is odd ($" + pc + "$ times, the $1$s in $(" + n.toString(2) + ")_2$): $" + Lb + "+" + pc + "=" + m + "$, against the $" + (n - 1) + "$ of the direct computation."),
        { n: n });
    }
  });

  // ------------------------------------------------ 15 Ricorrenze: valore esatto con parti intere
  add({
    id: "alg-g-rec-floor", livello: "complessa", capitolo: "recurrences",
    link: L("recursion/15-recurrences/#sez-sec-expansion", "ricorsione/15-ricorrenze/#sez-sec-expansion"),
    genera: function (rng, lingua) {
      var n = ri(rng, 9, 23); if ((n & (n - 1)) === 0) return null;
      var memo = {};
      function Tv(m) { if (m === 1) return 1; if (memo[m]) return memo[m]; memo[m] = Tv(Math.floor(m / 2)) + Tv(Math.ceil(m / 2)) + m; return memo[m]; }
      function Tw(m) { return m === 1 ? 1 : 2 * Tw(Math.floor(m / 2)) + m; }
      var g = Tv(n), fl = flog2(n), cl = clog2(n);
      var o = build(rng, num(g), [num(n * fl + n), num(n * cl + n), num(Tw(n)), num(g + 1), num(g - 1)]);
      if (!o) return null;
      var dims = Object.keys(memo).map(Number).sort(function (p, q) { return p - q; });
      var elenco = dims.map(function (d) { return "T(" + d + ")=" + memo[d]; }).join(",\\ ");
      return fine(o,
        T(lingua, "Sia $T(1)=1$ e $T(n)=T(\\lfloor n/2\\rfloor)+T(\\lceil n/2\\rceil)+n$ per $n\\ge 2$ (la ricorrenza di MergeSort con costanti unitarie). Quanto vale $T(" + n + ")$?",
          "Let $T(1)=1$ and $T(n)=T(\\lfloor n/2\\rfloor)+T(\\lceil n/2\\rceil)+n$ for $n\\ge 2$ (the recurrence of MergeSort with unit constants). What is $T(" + n + ")$?"),
        T(lingua, "Si calcolano dal basso i valori che servono: $" + elenco + "$. La formula $n\\log_2 n+n$ vale solo per $n$ potenza di $2$, e sostituire $T(\\lceil n/2\\rceil)$ con $T(\\lfloor n/2\\rfloor)$ dà $" + Tw(n) + "$.",
          "We compute bottom-up the values that are needed: $" + elenco + "$. The formula $n\\log_2 n+n$ holds only for $n$ a power of $2$, and replacing $T(\\lceil n/2\\rceil)$ with $T(\\lfloor n/2\\rfloor)$ gives $" + Tw(n) + "$."),
        { n: n });
    }
  });

  // ------------------------------------------------ 18 Ricorsivo e iterativo: passate di MergeSortBottomUp
  function bottomUp(a, maxPass, soloComplete) {
    a = a.slice(); var n = a.length, w = 1, pass = 0;
    while (w < n && pass < maxPass) {
      for (var l = 1; l + w <= n; l += 2 * w) {
        var m = l + w - 1, r = Math.min(l + 2 * w - 1, n);
        if (soloComplete && r - l + 1 < 2 * w) continue;
        var mg = merge(a.slice(l - 1, m), a.slice(m, r)).a;
        for (var t = 0; t < mg.length; t++) a[l - 1 + t] = mg[t];
      }
      w *= 2; pass++;
    }
    return a;
  }
  add({
    id: "alg-g-bottomup-pass", livello: "complessa", capitolo: "recursive-vs-iterative",
    link: L("recursion/18-recursive-vs-iterative/#box-5-obsRviBottomUpMergeSort", "ricorsione/18-ricorsivo-iterativo/#box-5-obsRviBottomUpMergeSort"),
    genera: function (rng, lingua) {
      var n = 7, a = sample(rng, 1, 30, n);
      var p1 = bottomUp(a, 1, false), p2 = bottomUp(a, 2, false), p3 = bottomUp(a, 3, false), p2v = bottomUp(a, 2, true);
      if (sameArr(p2, p3) || sameArr(p2, p2v)) return null;
      var o = build(rng, opA(p2), [opA(p2v), opA(p1), opA(p3), opA(insertionAfter(a, 4).a)]);
      if (!o) return null;
      var kw = function (w) { return "<b>" + w + "</b>"; };
      var righe = ["width := 1", kw("while") + " width &lt; n " + kw("do"), "    l := 1", "    " + kw("while") + " l + width ≤ n " + kw("do"), "        m := l + width − 1", "        r := min(l + 2·width − 1, n)", "        Merge(a, l, m, r)", "        l ← l + 2·width", "    " + kw("end"), "    width ← 2·width", kw("end")];
      return fine(o,
        T(lingua, "MergeSortBottomUp$(a,n)$ (qui sotto; Merge$(a,l,m,r)$ fonde i sotto-array ordinati $a[l..m]$ e $a[m+1..r]$ in $a[l..r]$ ordinato) è eseguito su $a=" + arr(a).slice(1, -1) + "$, con $n=" + n + "$. Che cosa contiene $a$ al termine della passata con $width=2$?",
          "MergeSortBottomUp$(a,n)$ (below; Merge$(a,l,m,r)$ merges the sorted subarrays $a[l..m]$ and $a[m+1..r]$ into the sorted $a[l..r]$) is executed on $a=" + arr(a).slice(1, -1) + "$, with $n=" + n + "$. What does $a$ contain at the end of the pass with $width=2$?") + "\n" + pre(righe),
        T(lingua, "La passata con $width=1$ fonde le coppie $a[1..2]$, $a[3..4]$, $a[5..6]$ ($a[7]$ resta da solo): " + arr(p1) + ". La passata con $width=2$ fonde $a[1..2]$ con $a[3..4]$ e $a[5..6]$ con $a[7..7]$ (blocco incompleto, con $r=\\min(8,7)=7$): " + arr(p2) + ".",
          "The pass with $width=1$ merges the pairs $a[1..2]$, $a[3..4]$, $a[5..6]$ ($a[7]$ stays alone): " + arr(p1) + ". The pass with $width=2$ merges $a[1..2]$ with $a[3..4]$ and $a[5..6]$ with $a[7..7]$ (incomplete block, with $r=\\min(8,7)=7$): " + arr(p2) + "."),
        { a: a });
    }
  });
  // =================================================================== generatori aggiunti il 6/11/2026 (secondo generatore per capitolo)
  // ------------------------------------------------ 4 Ricerca: LinearSearch contro BinarySearch sullo stesso array
  add({
    id: "alg-g-search-compare", livello: "media", capitolo: "search",
    link: L("basic-algorithms/04-search/#431-number-of-iterations", "algoritmi-di-base/04-ricerca/#431-numero-di-iterazioni"),
    genera: function (rng, lingua) {
      var n = ri(rng, 9, 15), a = sample(rng, 1, 60, n).sort(function (x, y) { return x - y; });
      var p = ri(rng, 1, n), m = a[p - 1], bs = binSearch(a, m, "floor"), it = bs.seq.length;
      if (bs.ret !== p) return null;
      function op(c, k) { return { k: c + "|" + k, t: T(lingua, "LinearSearch $" + c + "$ confronti, BinarySearch $" + k + "$ iterazioni", "LinearSearch $" + c + "$ comparisons, BinarySearch $" + k + "$ iterations") }; }
      var o = build(rng, op(p, it), shuffle(rng, [op(p, it + 1), op(p - 1, it), op(n, it), op(p, flog2(n) + 1), op(p, it - 1), op(Math.ceil(p / 2), it)]));
      if (!o) return null;
      return fine(o,
        T(lingua, "Si cerca $m=" + m + "$ nell'array ordinato $a=" + arr(a).slice(1, -1) + "$ (indici da $1$ a $" + n + "$). LinearSearch confronta $a[i]=m$ per $i=1,2,\\dots$ fino al primo successo. BinarySearch parte da $left=1$, $right=" + n + "$ e a ogni iterazione esamina $mid=left+\\lfloor(right-left)/2\\rfloor$: si ferma se $a[mid]=m$, altrimenti pone $left\\leftarrow mid+1$ se $a[mid]<m$ e $right\\leftarrow mid-1$ se $a[mid]>m$. Quanti confronti esegue LinearSearch e quante iterazioni BinarySearch?",
          "We look for $m=" + m + "$ in the sorted array $a=" + arr(a).slice(1, -1) + "$ (indices from $1$ to $" + n + "$). LinearSearch compares $a[i]=m$ for $i=1,2,\\dots$ until the first success. BinarySearch starts from $left=1$, $right=" + n + "$ and at each iteration examines $mid=left+\\lfloor(right-left)/2\\rfloor$: it stops if $a[mid]=m$, otherwise it sets $left\\leftarrow mid+1$ if $a[mid]<m$ and $right\\leftarrow mid-1$ if $a[mid]>m$. How many comparisons does LinearSearch perform and how many iterations BinarySearch?"),
        T(lingua, "$m$ è in posizione $" + p + "$, quindi LinearSearch esegue $" + p + "$ confronti. BinarySearch esamina $mid=" + bs.seq.join(",\\ ") + "$: $" + it + "$ iterazioni, non più di $\\lfloor\\log_2 " + n + "\\rfloor+1=" + (flog2(n) + 1) + "$.",
          "$m$ is in position $" + p + "$, so LinearSearch performs $" + p + "$ comparisons. BinarySearch examines $mid=" + bs.seq.join(",\\ ") + "$: $" + it + "$ iterations, no more than $\\lfloor\\log_2 " + n + "\\rfloor+1=" + (flog2(n) + 1) + "$."),
        { a: a, m: m });
    }
  });

  // ------------------------------------------------ 6 C++: parametri per valore e per riferimento
  add({
    id: "alg-g-cpp-reference", livello: "media", capitolo: "cpp",
    link: L("languages/06-introduction-to-cpp/#box-26-cpp-exreference", "linguaggi/06-introduzione-cpp/#box-26-cpp-exreference"),
    genera: function (rng, lingua) {
      var X = ri(rng, 2, 9), Y = ri(rng, 2, 9), K = ri(rng, 1, 5), M = ri(rng, 2, 4), refA = rng() < 0.5;
      var A = X + K, B = Y * M, x = refA ? A : X, y = refA ? Y : B, z = A + B;
      function op(p, q, r) { return { k: p + "|" + q + "|" + r, t: "<code>" + p + " " + q + " " + r + "</code>" }; }
      var o = build(rng, op(x, y, z), shuffle(rng, [op(X, Y, z), op(A, B, z), op(refA ? X : A, refA ? B : Y, z), op(x, y, refA ? X + B : A + Y), op(x, y, X + Y)]));
      if (!o) return null;
      var pa = refA ? "int&amp; a" : "int a", pb = refA ? "int b" : "int&amp; b";
      var righe = ["int f(" + pa + ", " + pb + ")", "{", "    a = a + " + K + ";", "    b = b * " + M + ";", "    return a + b;", "}", "", "int main()", "{", "    int x = " + X + ", y = " + Y + ";", "    int z = f(x, y);", "    cout &lt;&lt; x &lt;&lt; \" \" &lt;&lt; y &lt;&lt; \" \" &lt;&lt; z;", "    return 0;", "}"];
      return fine(o,
        T(lingua, "In C++ un parametro dichiarato con <code>&amp;</code> (per esempio <code>int&amp; b</code>) è passato per riferimento, gli altri per valore. Che cosa stampa il programma?", "In C++ a parameter declared with <code>&amp;</code> (for instance <code>int&amp; b</code>) is passed by reference, the others by value. What does the program print?") + "\n" + pre(righe),
        T(lingua, "Dentro <code>f</code> si ha <code>a</code> $=" + X + "+" + K + "=" + A + "$ e <code>b</code> $=" + Y + "\\cdot " + M + "=" + B + "$, quindi <code>z</code> $=" + z + "$. Solo il parametro per riferimento (<code>" + (refA ? "a" : "b") + "</code>) modifica la variabile del chiamante: <code>x</code> $=" + x + "$, <code>y</code> $=" + y + "$.",
          "Inside <code>f</code> we have <code>a</code> $=" + X + "+" + K + "=" + A + "$ and <code>b</code> $=" + Y + "\\cdot " + M + "=" + B + "$, so <code>z</code> $=" + z + "$. Only the parameter passed by reference (<code>" + (refA ? "a" : "b") + "</code>) modifies the variable of the caller: <code>x</code> $=" + x + "$, <code>y</code> $=" + y + "$."),
        { X: X, Y: Y, K: K, M: M, refA: refA });
    }
  });

  // ------------------------------------------------ 7 Python: lista modificata e parametro riassegnato
  add({
    id: "alg-g-py-params", livello: "media", capitolo: "python",
    link: L("languages/07-introduction-to-python/#box-28-py-exparams", "linguaggi/07-introduzione-python/#box-28-py-exparams"),
    genera: function (rng, lingua) {
      var b = [ri(rng, 1, 9), ri(rng, 1, 9), ri(rng, 1, 9)], I = ri(rng, 0, 2), K = ri(rng, 2, 7);
      var nb = b.slice(); nb[I] += K;
      var nb2 = b.slice(); nb2[I] += 2 * K;
      function lst(v) { return "[" + v.join(", ") + "]"; }
      function op(v, k, r) { return { k: v.join(",") + "|" + k + "|" + r, t: "<code>" + lst(v) + " " + k + " " + r + "</code>" }; }
      var o = build(rng, op(nb, K, 2 * K), shuffle(rng, [op(b, K, 2 * K), op(nb, 2 * K, 2 * K), op(nb, K, K), op(nb2, K, 2 * K), op(b, 2 * K, 2 * K)]));
      if (!o) return null;
      var righe = ["def f(a, x):", "    a[" + I + "] = a[" + I + "] + x", "    x = x * 2", "    return x", "", "b = " + lst(b), "k = " + K, "r = f(b, k)", "print(b, k, r)"];
      return fine(o,
        T(lingua, "In Python un parametro riceve lo stesso oggetto passato dal chiamante. Che cosa stampa il programma?", "In Python a parameter receives the same object passed by the caller. What does the program print?") + "\n" + pre(righe),
        T(lingua, "<code>a[" + I + "] = …</code> modifica un elemento della lista del chiamante, che diventa <code>" + lst(nb) + "</code>; <code>x = x * 2</code> cambia solo il nome locale, quindi <code>k</code> resta $" + K + "$, mentre il valore restituito è $" + (2 * K) + "$.",
          "<code>a[" + I + "] = …</code> modifies an element of the caller's list, which becomes <code>" + lst(nb) + "</code>; <code>x = x * 2</code> changes only the local name, so <code>k</code> stays $" + K + "$, while the returned value is $" + (2 * K) + "$."),
        { b: b, I: I, K: K });
    }
  });

  // ------------------------------------------------ 8 Java: somma e concatenazione con +
  add({
    id: "alg-g-java-concat", livello: "media", capitolo: "java",
    link: L("languages/08-introduction-to-java/#box-5-java-exprint", "linguaggi/08-introduzione-java/#box-5-java-exprint"),
    genera: function (rng, lingua) {
      var x = ri(rng, 2, 9), y = ri(rng, 2, 9), v = ri(rng, 0, 2);
      if (x === y) return null;
      var S = function (k) { return String(k); }, expr, giusta, cand;
      if (v === 0) {
        expr = "x + y + \" \" + x + y";
        giusta = S(x + y) + " " + S(x) + S(y);
        cand = [S(x + y) + " " + S(x + y), S(x) + S(y) + " " + S(x) + S(y), S(x) + S(y) + " " + S(x + y), S(x + y) + S(x) + S(y)];
      } else if (v === 1) {
        expr = "\"\" + x + y + \" \" + (x + y)";
        giusta = S(x) + S(y) + " " + S(x + y);
        cand = [S(x + y) + " " + S(x + y), S(x) + S(y) + " " + S(x) + S(y), S(x + y) + " " + S(x) + S(y), S(x) + S(y) + S(x + y)];
      } else {
        expr = "x + \" \" + y * 2 + x";
        giusta = S(x) + " " + S(2 * y) + S(x);
        cand = [S(x) + " " + S(2 * y + x), S(x) + " " + S(y) + "2" + S(x), S(x) + " " + S(2 * (y + x)), S(x) + " " + S(y) + S(y) + S(x)];
      }
      function op(s) { return { k: s, t: "<code>" + s + "</code>" }; }
      var o = build(rng, op(giusta), shuffle(rng, cand.map(op)));
      if (!o) return null;
      return fine(o,
        T(lingua, "In Java, con <code>int x = " + x + ", y = " + y + ";</code>, che cosa stampa <code>System.out.println(" + expr + ");</code>?", "In Java, with <code>int x = " + x + ", y = " + y + ";</code>, what does <code>System.out.println(" + expr + ");</code> print?"),
        T(lingua, "L'operatore <code>+</code> si valuta da sinistra a destra: fra due <code>int</code> è una somma, ma appena uno dei due operandi è una <code>String</code> l'altro viene convertito in testo e concatenato. <code>*</code> e le parentesi si valutano prima. Si ottiene <code>" + giusta + "</code>.",
          "The operator <code>+</code> is evaluated from left to right: between two <code>int</code> values it is an addition, but as soon as one of the two operands is a <code>String</code> the other is converted into text and concatenated. <code>*</code> and the parentheses are evaluated first. The result is <code>" + giusta + "</code>."),
        { x: x, y: y, v: v });
    }
  });

  // ------------------------------------------------ 10 Crescita asintotica: traslazioni, scalature, cambi di base
  add({
    id: "alg-g-growth-transform", livello: "media", capitolo: "asymptotic-growth",
    link: L("asymptotics/10-asymptotic-growth/#sez-gr-sec-comparison", "notazione-asintotica/10-crescita-asintotica/#sez-gr-sec-comparison"),
    genera: function (rng, lingua) {
      var t = ri(rng, 0, 10), f, g, rel, c, k, b, q, sw = false;
      if (t === 0) { c = ri(rng, 1, 9); k = ri(rng, 2, 4); f = "(n+" + c + ")^{" + k + "}"; g = "n^{" + k + "}"; rel = "theta"; }
      else if (t === 1) { c = ri(rng, 2, 5); k = ri(rng, 2, 4); f = "(" + c + "n)^{" + k + "}"; g = "n^{" + k + "}"; rel = "theta"; }
      else if (t === 2) { b = pickOne(rng, [2, 3]); c = ri(rng, 1, 5); f = b + "^{n+" + c + "}"; g = b + "^{n}"; rel = "theta"; }
      else if (t === 3) { b = pickOne(rng, [2, 3]); c = ri(rng, 2, 3); f = b + "^{" + c + "n}"; g = b + "^{n}"; rel = "omega"; sw = rng() < 0.5; }
      else if (t === 4) { k = ri(rng, 2, 5); f = "\\log_2(n^{" + k + "})"; g = "\\log_2 n"; rel = "theta"; }
      else if (t === 5) { k = ri(rng, 2, 5); q = ri(rng, 2, 4); f = "\\log_2^{" + k + "} n"; g = "n^{1/" + q + "}"; rel = "o"; sw = rng() < 0.5; }
      else if (t === 6) { var bb = shuffle(rng, [2, 3, 5]); b = bb[0]; c = bb[1]; f = b + "^{n}"; g = c + "^{n}"; rel = b < c ? "o" : "omega"; }
      else if (t === 7) { k = ri(rng, 2, 6); b = pickOne(rng, [2, 3]); f = "n^{" + k + "}"; g = b + "^{n}"; rel = "o"; sw = rng() < 0.5; }
      else if (t === 8) { c = ri(rng, 1, 9); f = "\\log_2(n+" + c + ")"; g = "\\log_2 n"; rel = "theta"; }
      else if (t === 9) { q = ri(rng, 2, 4); f = "n\\log_2 n"; g = "n^{1+1/" + q + "}"; rel = "o"; sw = rng() < 0.5; }
      else { c = ri(rng, 2, 3); f = "2^{n/" + c + "}"; g = "2^{n}"; rel = "o"; sw = rng() < 0.5; }
      if (sw) { var tmp = f; f = g; g = tmp; rel = rel === "o" ? "omega" : "o"; }
      var testi = {
        theta: "$f(n)=\\Theta\\big(g(n)\\big)$", o: "$f(n)=o\\big(g(n)\\big)$", omega: "$f(n)=\\omega\\big(g(n)\\big)$",
        none: T(lingua, "Nessuna delle due è $\\bigO$ dell'altra", "Neither is $\\bigO$ of the other")
      };
      function op(r) { return { k: r, t: testi[r] }; }
      var o = build(rng, op(rel), shuffle(rng, ["theta", "o", "omega", "none"].map(op)));
      if (!o) return null;
      var motivo = {
        0: T(lingua, "una traslazione dell'argomento non cambia l'ordine di una potenza", "a shift of the argument does not change the order of a power"),
        1: T(lingua, "una scalatura dell'argomento moltiplica una potenza per una costante", "a scaling of the argument multiplies a power by a constant"),
        2: T(lingua, "una traslazione dell'esponente moltiplica l'esponenziale per una costante", "a shift of the exponent multiplies the exponential by a constant"),
        3: T(lingua, "una scalatura dell'esponente cambia la base: $b^{cn}=(b^c)^n$", "a scaling of the exponent changes the base: $b^{cn}=(b^c)^n$"),
        4: T(lingua, "$\\log_2(n^k)=k\\log_2 n$", "$\\log_2(n^k)=k\\log_2 n$"),
        5: T(lingua, "ogni polilogaritmo è $o$ di ogni potenza con esponente positivo", "every polylogarithm is $o$ of every power with positive exponent"),
        6: T(lingua, "fra esponenziali conta la base", "among exponentials the base matters"),
        7: T(lingua, "ogni potenza è $o$ di ogni esponenziale con base maggiore di $1$", "every power is $o$ of every exponential with base larger than $1$"),
        8: T(lingua, "una traslazione dell'argomento non cambia l'ordine del logaritmo", "a shift of the argument does not change the order of the logarithm"),
        9: T(lingua, "$\\frac{n\\log_2 n}{n^{1+1/q}}=\\frac{\\log_2 n}{n^{1/q}}\\to 0^+$", "$\\frac{n\\log_2 n}{n^{1+1/q}}=\\frac{\\log_2 n}{n^{1/q}}\\to 0^+$"),
        10: T(lingua, "il rapporto $2^{n/c}/2^n=2^{-n(1-1/c)}$ tende a $0^+$", "the ratio $2^{n/c}/2^n=2^{-n(1-1/c)}$ tends to $0^+$")
      }[t];
      return fine(o,
        T(lingua, "Siano $f(n)=" + f + "$ e $g(n)=" + g + "$, funzioni della variabile naturale $n$. Quale relazione asintotica è vera?", "Let $f(n)=" + f + "$ and $g(n)=" + g + "$, functions of the natural variable $n$. Which asymptotic relation is true?"),
        T(lingua, "Vale " + testi[rel] + ": " + motivo + ". Le notazioni $\\Theta$, $o$ e $\\omega$ si escludono a vicenda.", "It holds " + testi[rel] + ": " + motivo + ". The notations $\\Theta$, $o$ and $\\omega$ are mutually exclusive."),
        { t: t, c: c === undefined ? null : c, k: k === undefined ? null : k, b: b === undefined ? null : b, q: q === undefined ? null : q, sw: sw });
    }
  });

  // ------------------------------------------------ 11 Dimensione dell'input: array con zeri, con o senza il numero n
  add({
    id: "alg-g-input-zeros", livello: "media", capitolo: "input-size",
    link: L("analysis/11-input-size/#box-13-obsArrayLower", "analisi/11-dimensione-input/#box-13-obsArrayLower"),
    genera: function (rng, lingua) {
      var n = ri(rng, 5, 7), a = []; for (var i = 0; i < n; i++) a.push(rng() < 0.3 ? 0 : ri(rng, 1, 200));
      var zeri = a.filter(function (x) { return x === 0; }).length, incl = rng() < 0.5;
      if (zeri === 0 || zeri === n) return null;
      var bitsA = a.map(function (x) { return x === 0 ? 1 : bitlen(x); }), sA = bitsA.reduce(function (s, x) { return s + x; }, 0);
      var M = Math.max.apply(null, a), bn = bitlen(n), giusta = sA + (incl ? bn : 0);
      var o = build(rng, num(giusta), shuffle(rng, [num(sA - zeri + (incl ? bn : 0)), num(incl ? sA : sA + bn), num(n * bitlen(M) + (incl ? bn : 0)), num(giusta + 1), num(sA + n)]));
      if (!o) return null;
      return fine(o,
        T(lingua, "La dimensione dell'input $|I|$ è il numero totale di bit per scrivere l'istanza in binario: un naturale $x\\ge 1$ richiede $\\lfloor\\log_2 x\\rfloor+1$ bit, e lo zero un bit. L'input è l'array $a=" + arr(a).slice(1, -1) + "$" + (incl ? T(lingua, " insieme al numero $n=" + n + "$ delle sue componenti", " together with the number $n=" + n + "$ of its entries") : T(lingua, " (senza il numero $n$)", " (without the number $n$)")) + ". Quanto vale $|I|$?",
          "The input size $|I|$ is the total number of bits needed to write the instance in binary: a natural number $x\\ge 1$ needs $\\lfloor\\log_2 x\\rfloor+1$ bits, and zero one bit. The input is the array $a=" + arr(a).slice(1, -1) + "$" + (incl ? " together with the number $n=" + n + "$ of its entries" : " (without the number $n$)") + ". What is $|I|$?"),
        T(lingua, "Le componenti richiedono $" + bitsA.join("+") + "=" + sA + "$ bit (ogni zero conta un bit)" + (incl ? " e $n=" + n + "$ altri $" + bn + "$" : "") + ": $|I|=" + giusta + "$.",
          "The entries need $" + bitsA.join("+") + "=" + sA + "$ bits (each zero counts one bit)" + (incl ? " and $n=" + n + "$ needs $" + bn + "$ more" : "") + ": $|I|=" + giusta + "$."),
        { a: a, incl: incl });
    }
  });

  // ------------------------------------------------ 13 Correttezza: intervallo di ricerca di BinarySearch (invariante)
  add({
    id: "alg-g-binsearch-interval", livello: "media", capitolo: "correctness",
    link: L("analysis/13-correctness/#134-correctness-of-binary-search", "analisi/13-correttezza/#134-correttezza-di-binary-search"),
    genera: function (rng, lingua) {
      var n = ri(rng, 10, 14), a = sample(rng, 1, 70, n).sort(function (x, y) { return x - y; });
      var m = rng() < 0.5 ? a[ri(rng, 0, n - 1)] : ri(rng, 1, 70);
      var st = [], left = 1, right = n, mid;
      while (true) {
        st.push([left, right]);
        if (!(left <= right)) break;
        mid = left + Math.floor((right - left) / 2);
        if (a[mid - 1] === m) break;
        if (a[mid - 1] < m) left = mid + 1; else right = mid - 1;
      }
      if (st.length < 3) return null;
      var k = ri(rng, 2, st.length), g = st[k - 1], prev = st[k - 2], nxt = st[k] || [g[0], g[1] + 1];
      var pm = prev[0] + Math.floor((prev[1] - prev[0]) / 2);
      function op(l, r) { return { k: l + "|" + r, t: "$left=" + l + "$, $right=" + r + "$" }; }
      var o = build(rng, op(g[0], g[1]), shuffle(rng, [op(prev[0], prev[1]), op(nxt[0], nxt[1]), op(g[0] === prev[0] ? g[0] : pm, g[1] === prev[1] ? g[1] : pm), op(g[0], g[1] + 1), op(g[0] - 1, g[1])]));
      if (!o) return null;
      var kw = function (w) { return "<b>" + w + "</b>"; };
      var righe = ["1  left := 1", "2  right := n", "3  " + kw("while") + " left ≤ right " + kw("do"), "4      mid := left + ⌊(right − left) / 2⌋", "5      " + kw("if") + " a[mid] = m " + kw("then return") + " mid", "6      " + kw("if") + " a[mid] &lt; m " + kw("then") + " left ← mid + 1", "7      " + kw("else") + " right ← mid − 1", "   " + kw("end"), "8  " + kw("return") + " −1"];
      return fine(o,
        T(lingua, "BinarySearch (qui sotto) cerca $m=" + m + "$ in $a=" + arr(a).slice(1, -1) + "$, con $n=" + n + "$. Quanto valgono $left$ e $right$ quando la condizione della riga $3$ viene valutata per la $" + k + "$-esima volta?",
          "BinarySearch (below) looks for $m=" + m + "$ in $a=" + arr(a).slice(1, -1) + "$, with $n=" + n + "$. What are $left$ and $right$ when the condition of line $3$ is evaluated for the $" + k + "$-th time?") + "\n" + pre(righe),
        T(lingua, "Alle valutazioni successive l'intervallo è " + st.slice(0, k).map(function (s) { return "$[" + s[0] + "," + s[1] + "]$"; }).join(", ") + ". Ogni passo scarta solo una parte che non può contenere $m$ (invariante: se $m$ è nell'array, è in $a[left..right]$).",
          "At the successive evaluations the interval is " + st.slice(0, k).map(function (s) { return "$[" + s[0] + "," + s[1] + "]$"; }).join(", ") + ". Each step discards only a part that cannot contain $m$ (invariant: if $m$ is in the array, it is in $a[left..right]$)."),
        { a: a, m: m, k: k });
    }
  });

  // ------------------------------------------------ 16 Master theorem: f(n) con fattore polilogaritmico
  add({
    id: "alg-g-master-log", livello: "complessa", capitolo: "master-theorem",
    link: L("recursion/16-master-theorem/#box-1-theoMaster", "ricorsione/16-master-theorem/#box-1-theoMaster"),
    genera: function (rng, lingua) {
      var b = pickOne(rng, [2, 3, 4]), e = ri(rng, 1, 3), a = Math.pow(b, e);
      if (a > 64) return null;
      var d = e + ri(rng, -1, 1), k = ri(rng, 0, 2);
      if (d < 0) return null;
      function pot(p, qq) {
        var s = p === 0 ? "" : (p === 1 ? "n" : "n^{" + p + "}");
        var l = qq === 0 ? "" : (qq === 1 ? "\\log n" : "\\log^{" + qq + "} n");
        if (!s && !l) return "1";
        return s + (s && l ? "\\," : "") + l;
      }
      var gp, gq, caso;
      if (d < e) { gp = e; gq = 0; caso = 1; } else if (d === e) { gp = e; gq = k + 1; caso = 2; } else { gp = d; gq = k; caso = 3; }
      function op(p, qq) { return { k: p + "|" + qq, t: "$T(n)=\\Theta\\big(" + pot(p, qq) + "\\big)$" }; }
      var o = build(rng, op(gp, gq), shuffle(rng, [op(e, k), op(d, k + 1), op(e, k + 1), op(d, k), op(d, 0), op(e + 1, 0), op(e, 0), op(Math.max(d, e), k + 1)]));
      if (!o) return null;
      var spieg = {
        1: T(lingua, "$f$ è polinomialmente più piccola di $n^{" + e + "}$ (caso 1): $T(n)=\\Theta(" + pot(e, 0) + ")$.", "$f$ is polynomially smaller than $n^{" + e + "}$ (case 1): $T(n)=\\Theta(" + pot(e, 0) + ")$."),
        2: T(lingua, "$f(n)=\\Theta(n^{" + e + "}\\log^{" + k + "} n)$ (caso 2, con $k=" + k + "$): si aggiunge un fattore $\\log n$, $T(n)=\\Theta(" + pot(e, k + 1) + ")$.", "$f(n)=\\Theta(n^{" + e + "}\\log^{" + k + "} n)$ (case 2, with $k=" + k + "$): one factor $\\log n$ is added, $T(n)=\\Theta(" + pot(e, k + 1) + ")$."),
        3: T(lingua, "$f$ è polinomialmente più grande di $n^{" + e + "}$ e la condizione di regolarità vale ($a\\,f(n/b)\\le\\frac{" + a + "}{" + Math.pow(b, d) + "}f(n)$), quindi (caso 3) $T(n)=\\Theta(f(n))=\\Theta(" + pot(d, k) + ")$.", "$f$ is polynomially larger than $n^{" + e + "}$ and the regularity condition holds ($a\\,f(n/b)\\le\\frac{" + a + "}{" + Math.pow(b, d) + "}f(n)$), hence (case 3) $T(n)=\\Theta(f(n))=\\Theta(" + pot(d, k) + ")$.")
      }[caso];
      return fine(o,
        T(lingua, "Con il Master theorem, qual è l'ordine di crescita della soluzione di $T(n)=" + a + "\\,T(n/" + b + ")+" + pot(d, k) + "$ (logaritmi in base $2$)?", "With the Master Theorem, what is the order of growth of the solution of $T(n)=" + a + "\\,T(n/" + b + ")+" + pot(d, k) + "$ (logarithms in base $2$)?"),
        T(lingua, "Si confronta $f(n)=" + pot(d, k) + "$ con $n^{\\log_b a}=n^{\\log_{" + b + "} " + a + "}=" + pot(e, 0) + "$. ", "We compare $f(n)=" + pot(d, k) + "$ with $n^{\\log_b a}=n^{\\log_{" + b + "} " + a + "}=" + pot(e, 0) + "$. ") + spieg,
        { a: a, b: b, d: d, k: k });
    }
  });
  // =================================================================== copertura dettagliata (7 novembre 2026)
  add({
    id: "alg-g-dec2bin", livello: "facile", capitolo: "number-representation",
    link: L("basic-algorithms/01-number-representation/#box-3-defSeqDigits", "algoritmi-di-base/01-rappresentazione-numeri/#box-3-defSeqDigits"),
    genera: function (rng, lingua) {
      var n = ri(rng, 37, 250), s = n.toString(2), r = s.split("").reverse().join("");
      function op(x) { return { k: x, t: "$(" + x + ")_2$" }; }
      var o = build(rng, op(s), [op(r), op((n + 1).toString(2)), op((n - 1).toString(2)), op((2 * n).toString(2))]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Quale sequenza di cifre in base $2$ rappresenta il numero naturale $" + n + "$ (scritto in base dieci)?",
          "Which sequence of digits in base $2$ represents the natural number $" + n + "$ (written in base ten)?"),
        T(lingua, "Dividendo ripetutamente per $2$ i resti, letti dall'ultimo al primo, danno $(" + s + ")_2$; leggerli nell'ordine in cui escono dà la sequenza rovesciata $(" + r + ")_2$.",
          "Dividing repeatedly by $2$, the remainders read from the last to the first give $(" + s + ")_2$; reading them in the order they come out gives the reversed sequence $(" + r + ")_2$."),
        { n: n });
    }
  });

  add({
    id: "alg-g-signmag", livello: "facile", capitolo: "number-representation",
    link: L("basic-algorithms/01-number-representation/#box-11-defSignMagnitude", "algoritmi-di-base/01-rappresentazione-numeri/#box-11-defSignMagnitude"),
    genera: function (rng, lingua) {
      var k = 8, v = ri(rng, 3, 120), sm = "1" + bits(v, k - 1), tc = bits((1 << k) - v, k), oc = bits(((1 << k) - 1) - v, k), pos = bits(v, k);
      function op(x) { return { k: x, t: "$" + x + "$" }; }
      var o = build(rng, op(sm), [op(tc), op(oc), op(pos)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Nella rappresentazione in modulo e segno con $k=8$ bit il bit più significativo è il segno ($0$ per $n \\ge 0$, $1$ per $n<0$) e gli altri $7$ bit sono il modulo $|n|$ in binario. Come si rappresenta $n=-" + v + "$?",
          "In sign-magnitude representation with $k=8$ bits the most significant bit is the sign ($0$ for $n \\ge 0$, $1$ for $n<0$) and the other $7$ bits are the magnitude $|n|$ in binary. How is $n=-" + v + "$ represented?"),
        T(lingua, "Segno $1$ e modulo $" + v + "=(" + bits(v, 7) + ")_2$ su $7$ bit: $" + sm + "$. $" + tc + "$ è la rappresentazione in complemento a due ($2^8-" + v + "$), $" + pos + "$ quella di $+" + v + "$.",
          "Sign $1$ and magnitude $" + v + "=(" + bits(v, 7) + ")_2$ on $7$ bits: $" + sm + "$. $" + tc + "$ is the two's complement representation ($2^8-" + v + "$), $" + pos + "$ that of $+" + v + "$."),
        { v: v });
    }
  });

  add({
    id: "alg-g-divisors", livello: "facile", capitolo: "numerical-algorithms",
    link: L("basic-algorithms/05-numerical-algorithms/#box-5-ch6-defDivisor", "algoritmi-di-base/05-algoritmi-numerici/#box-5-ch6-defDivisor"),
    genera: function (rng, lingua) {
      var n = ri(rng, 12, 120), dv = []; for (var d = 1; d <= n; d++) if (n % d === 0) dv.push(d);
      if (dv.length < 4) return null;
      var o = build(rng, num(dv.length), [num(dv.length - 2), num(dv.length - 1), num(dv.length + 1), num(dv.filter(function (x) { return x * x <= n; }).length)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Un naturale $d \\ge 1$ è un divisore di $n$ se $n \\bmod d=0$ ($1$ e $n$ compresi). Quanti divisori ha $n=" + n + "$?",
          "A natural $d \\ge 1$ is a divisor of $n$ if $n \\bmod d=0$ ($1$ and $n$ included). How many divisors does $n=" + n + "$ have?"),
        T(lingua, "I divisori sono $" + dv.join(",") + "$: in tutto $" + dv.length + "$. Dimenticare $1$ e $n$ toglie due divisori; contare solo quelli fino a $\\sqrt{n}$ ne dimentica i compagni $n/d$.",
          "The divisors are $" + dv.join(",") + "$: $" + dv.length + "$ in total. Forgetting $1$ and $n$ removes two divisors; counting only those up to $\\sqrt{n}$ forgets their companions $n/d$."),
        { n: n });
    }
  });

  add({
    id: "alg-g-hanoi-moves", livello: "facile", capitolo: "recursion",
    link: L("recursion/14-recursion/#box-26-obsHanoiMoves", "ricorsione/14-ricorsione/#box-26-obsHanoiMoves"),
    genera: function (rng, lingua) {
      var n = ri(rng, 4, 12), M = Math.pow(2, n) - 1;
      var o = build(rng, num(M), [num(M + 1), num(Math.pow(2, n - 1) - 1), num(2 * n - 1), num(n * n)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Hanoi$(n,from,to,aux)$ con $n \\ge 2$ sposta ricorsivamente $n-1$ dischi da $from$ ad $aux$, poi il disco $n$ da $from$ a $to$ (una mossa), poi $n-1$ dischi da $aux$ a $to$; con $n=1$ fa una sola mossa. Quante mosse fa con $n=" + n + "$ dischi?",
          "Hanoi$(n,from,to,aux)$ with $n \\ge 2$ recursively moves $n-1$ disks from $from$ to $aux$, then disk $n$ from $from$ to $to$ (one move), then $n-1$ disks from $aux$ to $to$; with $n=1$ it makes a single move. How many moves does it make with $n=" + n + "$ disks?"),
        T(lingua, "$M(1)=1$ e $M(n)=2M(n-1)+1$, da cui $M(n)=2^n-1=" + M + "$. $2^n$ dimentica il $-1$.",
          "$M(1)=1$ and $M(n)=2M(n-1)+1$, hence $M(n)=2^n-1=" + M + "$. $2^n$ forgets the $-1$."),
        { n: n });
    }
  });

  add({
    id: "alg-g-recsum-depth", livello: "facile", capitolo: "recursive-algorithms",
    link: L("recursion/17-recursive-algorithms/#box-5-obsRecSumDepth", "ricorsione/17-algoritmi-ricorsivi/#box-5-obsRecSumDepth"),
    genera: function (rng, lingua) {
      var n = ri(rng, 5, 200), h = clog2(n);
      var o = build(rng, num(h + 1), [num(h), num(2 * n - 1), num(h + 2), num(n)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "RecursiveSum$(a,l,r)$ restituisce $a[l]$ se $l=r$; altrimenti, con $m=\\lfloor (l+r)/2\\rfloor$, restituisce RecursiveSum$(a,l,m)+$RecursiveSum$(a,m+1,r)$. Chiamata su un array di $n=" + n + "$ elementi, qual è la profondità della ricorsione, cioè il massimo numero di chiamate attive contemporaneamente (la chiamata iniziale compresa)?",
          "RecursiveSum$(a,l,r)$ returns $a[l]$ if $l=r$; otherwise, with $m=\\lfloor (l+r)/2\\rfloor$, it returns RecursiveSum$(a,l,m)+$RecursiveSum$(a,m+1,r)$. Called on an array of $n=" + n + "$ elements, what is the recursion depth, that is, the maximum number of calls active at the same time (the initial call included)?"),
        T(lingua, "L'albero delle chiamate ha altezza $\\lceil \\log_2 n\\rceil=" + h + "$ (la metà più grande ha $\\lceil k/2\\rceil$ elementi), quindi la profondità è $" + h + "+1=" + (h + 1) + "$. $2n-1=" + (2 * n - 1) + "$ è il numero totale di chiamate.",
          "The call tree has height $\\lceil \\log_2 n\\rceil=" + h + "$ (the larger half has $\\lceil k/2\\rceil$ elements), so the depth is $" + h + "+1=" + (h + 1) + "$. $2n-1=" + (2 * n - 1) + "$ is the total number of calls."),
        { n: n });
    }
  });

  add({
    id: "alg-g-fib-calls", livello: "facile", capitolo: "recursive-vs-iterative",
    link: L("recursion/18-recursive-vs-iterative/#box-9-obsRviFibCalls", "ricorsione/18-ricorsivo-iterativo/#box-9-obsRviFibCalls"),
    genera: function (rng, lingua) {
      var n = ri(rng, 4, 14), C = 2 * fib(n + 1) - 1;
      var o = build(rng, num(C), [num(fib(n + 1)), num(Math.pow(2, n) - 1), num(fib(n)), num(2 * fib(n) - 1), num(n + 1)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "FibRec$(n)$ restituisce $n$ se $n \\le 1$, altrimenti FibRec$(n-1)+$FibRec$(n-2)$. Quante chiamate (la chiamata iniziale compresa) esegue FibRec$(" + n + ")$?",
          "FibRec$(n)$ returns $n$ if $n \\le 1$, otherwise FibRec$(n-1)+$FibRec$(n-2)$. How many calls (the initial call included) does FibRec$(" + n + ")$ make?"),
        T(lingua, "Le chiamate soddisfano $C(0)=C(1)=1$ e $C(n)=1+C(n-1)+C(n-2)$, da cui $C(n)=2F(n+1)-1=2 \\cdot " + fib(n + 1) + "-1=" + C + "$: crescono come $\\varphi^n$, non come $2^n$.",
          "The calls satisfy $C(0)=C(1)=1$ and $C(n)=1+C(n-1)+C(n-2)$, hence $C(n)=2F(n+1)-1=2 \\cdot " + fib(n + 1) + "-1=" + C + "$: they grow as $\\varphi^n$, not as $2^n$."),
        { n: n });
    }
  });

  add({
    id: "alg-g-hanoi-move", livello: "complessa", capitolo: "recursion",
    link: L("recursion/14-recursion/#box-24-obsHanoiCorrect", "ricorsione/14-ricorsione/#box-24-obsHanoiCorrect"),
    genera: function (rng, lingua) {
      var n = ri(rng, 3, 5), mosse = [];
      (function h(k, f, t, a) { if (k === 0) return; h(k - 1, f, a, t); mosse.push([k, f, t]); h(k - 1, a, t, f); })(n, 1, 3, 2);
      var j = ri(rng, 2, mosse.length - 1), mv = mosse[j - 1];
      function op(m) { return { k: m.join("|"), t: T(lingua, "disco $" + m[0] + "$ dal piolo $" + m[1] + "$ al piolo $" + m[2] + "$", "disk $" + m[0] + "$ from peg $" + m[1] + "$ to peg $" + m[2] + "$") }; }
      var inv = [mv[0], mv[2], mv[1]], prima = mosse[j - 2], dopo = mosse[j];
      var o = build(rng, op(mv), [op(inv), op(prima), op(dopo), op([mv[0], mv[1], 6 - mv[1] - mv[2]])]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Hanoi$(k,from,to,aux)$: se $k=0$ non fa nulla; altrimenti esegue Hanoi$(k-1,from,aux,to)$, sposta il disco $k$ da $from$ a $to$, ed esegue Hanoi$(k-1,aux,to,from)$. Si chiama Hanoi$(" + n + ",1,3,2)$ (dischi $1,\\dots," + n + "$ dal più piccolo, tutti sul piolo $1$). Qual è la mossa numero $" + j + "$?",
          "Hanoi$(k,from,to,aux)$: if $k=0$ it does nothing; otherwise it runs Hanoi$(k-1,from,aux,to)$, moves disk $k$ from $from$ to $to$, and runs Hanoi$(k-1,aux,to,from)$. Hanoi$(" + n + ",1,3,2)$ is called (disks $1,\\dots," + n + "$ from the smallest, all on peg $1$). Which is move number $" + j + "$?"),
        T(lingua, "Le prime mosse sono " + mosse.slice(0, Math.min(mosse.length, j + 1)).map(function (m, i) { return "$" + (i + 1) + "$: $" + m[0] + "$ ($" + m[1] + "\\to" + m[2] + "$)"; }).join(", ") + ". Si segue l'albero delle chiamate in ordine: prima tutto il sotto-albero di sinistra, poi la mossa del nodo, poi il sotto-albero di destra.",
          "The first moves are " + mosse.slice(0, Math.min(mosse.length, j + 1)).map(function (m, i) { return "$" + (i + 1) + "$: $" + m[0] + "$ ($" + m[1] + "\\to" + m[2] + "$)"; }).join(", ") + ". The call tree is followed in order: first the whole left subtree, then the move of the node, then the right subtree."),
        { n: n, j: j });
    }
  });

  add({
    id: "alg-g-nested-loops", livello: "complessa", capitolo: "running-time",
    link: L("analysis/12-running-time/#sez-sec-rt-definition", "analisi/12-tempo-esecuzione/#sez-sec-rt-definition"),
    genera: function (rng, lingua) {
      var n = ri(rng, 4, 9), tipo = ri(rng, 0, 2), c = 0, i, j, k;
      for (i = 1; i <= n; i++) for (j = i; j <= n; j++) { if (tipo === 0) c++; else if (tipo === 1) { for (k = 1; k <= j; k++) c++; } else { for (k = i; k <= j; k++) c++; } }
      var testoIn = tipo === 0 ? "" : (tipo === 1 ? "for $k=1$ to $j$: " : "for $k=i$ to $j$: ");
      var c2 = n * n, c3 = n * (n + 1) / 2, c4 = tipo === 0 ? n * (n - 1) / 2 : n * n * n, c5 = tipo === 0 ? (n + 1) * (n + 1) : c3 * n;
      var o = build(rng, num(c), [num(c3 === c ? n * n * (n + 1) / 2 : c3), num(c2), num(c4), num(c5)]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Con $n=" + n + "$, quante volte si esegue l'istruzione $x:=x+1$ nel frammento «for $i=1$ to $n$: for $j=i$ to $n$: " + testoIn + "$x:=x+1$» (ogni for comprende entrambi gli estremi; se l'estremo iniziale supera quello finale il ciclo non si esegue)?",
          "With $n=" + n + "$, how many times is the statement $x:=x+1$ executed in the fragment «for $i=1$ to $n$: for $j=i$ to $n$: " + (tipo === 0 ? "" : (tipo === 1 ? "for $k=1$ to $j$: " : "for $k=i$ to $j$: ")) + "$x:=x+1$» (every for includes both bounds; if the initial bound exceeds the final one the loop is not executed)?"),
        T(lingua, "Si somma sulle coppie $i \\le j$: " + (tipo === 0 ? "$\\sum_{i=1}^{n}(n-i+1)=n(n+1)/2" : (tipo === 1 ? "$\\sum_{i=1}^{n}\\sum_{j=i}^{n} j" : "$\\sum_{i=1}^{n}\\sum_{j=i}^{n}(j-i+1)")) + "=" + c + "$. Contare $n$ iterazioni per ogni ciclo ignora che i cicli interni dipendono da $i$ e $j$.",
          "Sum over the pairs $i \\le j$: " + (tipo === 0 ? "$\\sum_{i=1}^{n}(n-i+1)=n(n+1)/2" : (tipo === 1 ? "$\\sum_{i=1}^{n}\\sum_{j=i}^{n} j" : "$\\sum_{i=1}^{n}\\sum_{j=i}^{n}(j-i+1)")) + "=" + c + "$. Counting $n$ iterations for every loop ignores that the inner loops depend on $i$ and $j$."),
        { n: n, tipo: tipo });
    }
  });

  add({
    id: "alg-g-bigo-n1", livello: "complessa", capitolo: "asymptotic-notation",
    link: L("asymptotics/09-asymptotic-notation/#box-3-defBigO", "notazione-asintotica/09-notazione-asintotica/#box-3-defBigO"),
    genera: function (rng, lingua) {
      var a = ri(rng, 2, 6), b = ri(rng, 5, 40), c = a + ri(rng, 1, 3), n1 = Math.ceil(b / (c - a));
      if (n1 < 3) return null;
      var o = build(rng, num(n1), [num(n1 - 1), num(n1 + 1), num(Math.ceil(b / c)), num(b), num(Math.floor(b / (c - a)))]);
      if (!o) return null;
      return fine(o,
        T(lingua, "Per dimostrare $f(n)=" + a + "n^2+" + b + "n=O(n^2)$ si sceglie la costante $c=" + c + "$. Qual è il più piccolo naturale $n_1$ tale che $f(n) \\le " + c + "\\,n^2$ per ogni $n \\ge n_1$?",
          "To prove $f(n)=" + a + "n^2+" + b + "n=O(n^2)$ the constant $c=" + c + "$ is chosen. What is the smallest natural $n_1$ such that $f(n) \\le " + c + "\\,n^2$ for every $n \\ge n_1$?"),
        T(lingua, "Per $n \\ge 1$: $" + a + "n^2+" + b + "n \\le " + c + "n^2 \\iff " + b + " \\le " + (c - a) + "n \\iff n \\ge " + b + "/" + (c - a) + "$, quindi $n_1=\\lceil " + b + "/" + (c - a) + "\\rceil=" + n1 + "$. Con $n_1-1$ la disuguaglianza non vale ancora.",
          "For $n \\ge 1$: $" + a + "n^2+" + b + "n \\le " + c + "n^2 \\iff " + b + " \\le " + (c - a) + "n \\iff n \\ge " + b + "/" + (c - a) + "$, so $n_1=\\lceil " + b + "/" + (c - a) + "\\rceil=" + n1 + "$. With $n_1-1$ the inequality does not hold yet."),
        { a: a, b: b, c: c });
    }
  });
})();
