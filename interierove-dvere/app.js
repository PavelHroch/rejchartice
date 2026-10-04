const TYP_LABELS = {
  otocne: "otočné",
  shrnovaci: "shrnovací (skládací)",
  zasouvaci: "zasouvací (posuvné do pouzdra)",
};
const PROVEDENI_LABELS = { plne: "plné", prosklene: "prosklené" };

// filtry nad seznamem — "celkem" = bez filtru (výchozí). `count` přepisuje výchozí součet `pocet`
// (u Pravé/Levé se sčítají jen kusy dané strany, ne celé položky)
const FILTERS = [
  { key: "celkem", label: "Dveře celkem", match: () => true },
  { key: "s700", label: "700", match: (it) => it.sirka_kridla_mm === 700 },
  { key: "s800", label: "800", match: (it) => it.sirka_kridla_mm === 800 },
  { key: "plne", label: "Plné", match: (it) => it.provedeni === "plne" },
  { key: "prosklene", label: "Prosklené", match: (it) => it.provedeni === "prosklene" },
  { key: "otocne", label: "Otočné", match: (it) => it.typ === "otocne" },
  { key: "shrnovaci", label: "Shrnovací", match: (it) => it.typ === "shrnovaci" },
  { key: "zasouvaci", label: "Zasouvací", match: (it) => it.typ === "zasouvaci" },
  { key: "pravy", label: "Pravé", match: (it) => !!(it.strana && it.strana.pravy), count: (it) => it.strana.pravy },
  { key: "levy", label: "Levé", match: (it) => !!(it.strana && it.strana.levy), count: (it) => it.strana.levy },
  { key: "wc", label: "WC zámek", match: (it) => /^WC/.test(it.zamek || "") },
];

const PAD_LEFT = 34;
const PAD_TOP = 12;
const PAD_RIGHT = 8;
const PAD_BOTTOM = 34;
const SCALE = 0.078; // 2050 mm → 160 px, společné měřítko pro všechny nákresy (velikosti jdou porovnat)
const OBLOZKA_MM = 60; // pohledová šířka obložky zárubně

const C = {
  zarubne: "#b8996a",
  zarubneLine: "#7d6542",
  kridlo: "#d8c29d",
  kridloLine: "#8a7350",
  sklo: "#e4e9e9",
  skloLine: "#a9b3b3",
  kovani: "#b8913f",
  dim: "#6b6459",
};

function el(tag, attrs, children) {
  const ns = "http://www.w3.org/2000/svg";
  const node = document.createElementNS(ns, tag);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  (children || []).forEach((c) => node.appendChild(c));
  return node;
}

function text(x, y, str, cls, extra) {
  const t = el("text", Object.assign({ x, y, class: cls || "dim-text" }, extra || {}));
  t.textContent = str;
  return t;
}

// křídlo dveří (hinge = "L"/"P", null = posuvné bez pantů a kliky) — prosklené mají sklo (kůra) v horních 2/3, klika na straně proti pantům
function drawLeaf(svg, x, y, w, h, item, hinge) {
  svg.appendChild(el("rect", { x, y, width: w, height: h, fill: C.kridlo, stroke: C.kridloLine, "stroke-width": 1 }));
  if (item.provedeni === "prosklene") {
    const m = w * 0.18;
    svg.appendChild(el("rect", { x: x + m, y: y + h * 0.08, width: w - 2 * m, height: h * 0.55, fill: C.sklo, stroke: C.skloLine, "stroke-width": 1.5 }));
  }
  if (!hinge) return; // posuvné křídlo — bez pantů a kliky
  // klika ve výšce ~1050 mm od podlahy
  const handleY = y + h - 1050 * SCALE;
  const hx = hinge === "L" ? x + w - 5 : x + 5;
  svg.appendChild(el("rect", { x: hx - 1.5, y: handleY - 6, width: 3, height: 12, rx: 1, fill: C.kovani }));
  svg.appendChild(el("line", { x1: hx, y1: handleY - 3, x2: hinge === "L" ? hx - 9 : hx + 9, y2: handleY - 3, stroke: C.kovani, "stroke-width": 2.5, "stroke-linecap": "round" }));
  // panty
  const px = hinge === "L" ? x : x + w;
  [0.12, 0.85].forEach((f) => {
    svg.appendChild(el("rect", { x: px - 2, y: y + f * h - 5, width: 4, height: 10, fill: C.kovani }));
  });
}

// shrnovací dveře — svislé lamely, u prosklených s úzkým matným proužkem
function drawFolding(svg, x, y, w, h, item) {
  const n = 6;
  const lw = w / n;
  for (let i = 0; i < n; i++) {
    const lx = x + i * lw;
    svg.appendChild(el("rect", { x: lx, y, width: lw, height: h, fill: i % 2 ? C.kridlo : "#cfb78f", stroke: C.kridloLine, "stroke-width": 0.8 }));
    if (item.provedeni === "prosklene") {
      svg.appendChild(el("rect", { x: lx + lw * 0.25, y: y + h * 0.08, width: lw * 0.5, height: h * 0.55, fill: C.sklo, stroke: C.skloLine, "stroke-width": 0.8 }));
    }
  }
  // úchytka na poslední lamele
  svg.appendChild(el("rect", { x: x + w - lw / 2 - 1.5, y: y + h * 0.45, width: 3, height: 14, rx: 1.5, fill: C.kovani }));
}

// kóta šířky pod nákresem
function widthDim(svg, x0, x1, y, label) {
  svg.appendChild(el("line", { x1: x0, y1: y - 3, x2: x0, y2: y + 3, stroke: C.dim, "stroke-width": 1 }));
  svg.appendChild(el("line", { x1: x1, y1: y - 3, x2: x1, y2: y + 3, stroke: C.dim, "stroke-width": 1 }));
  svg.appendChild(el("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: C.dim, "stroke-width": 1 }));
  svg.appendChild(text((x0 + x1) / 2, y + 13, label, "dim-text dim-text-lg", { "text-anchor": "middle", "font-weight": "700" }));
}

function heightDim(svg, x, y0, y1, label) {
  svg.appendChild(el("line", { x1: x - 3, y1: y0, x2: x + 3, y2: y0, stroke: C.dim, "stroke-width": 1 }));
  svg.appendChild(el("line", { x1: x - 3, y1: y1, x2: x + 3, y2: y1, stroke: C.dim, "stroke-width": 1 }));
  svg.appendChild(el("line", { x1: x, y1: y0, x2: x, y2: y1, stroke: C.dim, "stroke-width": 1 }));
  svg.appendChild(
    text(0, 0, label, "dim-text dim-text-lg", {
      "text-anchor": "middle",
      "font-weight": "700",
      transform: `translate(${x - 9}, ${(y0 + y1) / 2}) rotate(-90)`,
    })
  );
}

// jeden nákres: pohled ze strany, kam se dveře otevírají (z té strany se určuje L/P),
// zárubeň (obložka) kolem křídla, kóty šířky a výšky křídla
function buildDrawing(item, hinge, caption) {
  const w = item.sirka_kridla_mm * SCALE;
  const h = item.vyska_kridla_mm * SCALE;
  const ob = OBLOZKA_MM * SCALE;
  const zasouvaci = item.typ === "zasouvaci";
  // u zasouvacích je vedle otvoru kapsa pouzdra ve zdi (stejně široká jako křídlo)
  const pocketW = zasouvaci ? w + 6 : 0;

  const leafX = PAD_LEFT + ob;
  const leafY = PAD_TOP + ob + (caption ? 14 : 0);
  const svgW = leafX + w + ob + pocketW + PAD_RIGHT;
  const svgH = leafY + h + PAD_BOTTOM;

  const svg = el("svg", { width: svgW, height: svgH, viewBox: `0 0 ${svgW} ${svgH}` });

  if (caption) svg.appendChild(text(leafX + w / 2, PAD_TOP + 6, caption, "dim-text dim-caption", { "text-anchor": "middle" }));

  if (zasouvaci) {
    // pouzdro ve zdi vpravo od otvoru (přerušovaně) + část křídla zasunutá v něm
    svg.appendChild(el("rect", { x: leafX + w + ob, y: leafY - ob, width: pocketW, height: h + ob, fill: "#efe9df", stroke: "#a9a294", "stroke-width": 1, "stroke-dasharray": "4 3" }));
    svg.appendChild(text(leafX + w + ob + pocketW / 2, leafY + h / 2 + 30, "pouzdro", "dim-text", { "text-anchor": "middle" }));
  }

  // obložka zárubně (nahoře a po stranách, dole ne — dveře stojí na podlaze)
  svg.appendChild(el("rect", { x: leafX - ob, y: leafY - ob, width: w + 2 * ob, height: h + ob, fill: C.zarubne, stroke: C.zarubneLine, "stroke-width": 1 }));
  // podlaha
  svg.appendChild(el("line", { x1: leafX - ob - 4, y1: leafY + h, x2: leafX + w + ob + pocketW + 4, y2: leafY + h, stroke: "#8a8378", "stroke-width": 1.5 }));

  if (item.typ === "shrnovaci") {
    drawFolding(svg, leafX, leafY, w, h, item);
  } else if (zasouvaci) {
    // křídlo pootevřené: v otvoru je vidět jen část, zbytek (v pouzdře) čárkovaně, šipka směru zasunutí
    const shift = w * 0.35;
    const clipId = `clip-${item.id}`;
    svg.appendChild(el("clipPath", { id: clipId }, [el("rect", { x: leafX, y: leafY, width: w, height: h })]));
    const g = el("g", { "clip-path": `url(#${clipId})` });
    drawLeaf(g, leafX + shift, leafY, w, h, item, null);
    svg.appendChild(g);
    svg.appendChild(el("rect", { x: leafX + w + ob, y: leafY + 1, width: shift - ob, height: h - 2, fill: "none", stroke: C.kridloLine, "stroke-width": 1, "stroke-dasharray": "3 2" }));
    // mušle místo kliky
    svg.appendChild(el("rect", { x: leafX + shift + 6, y: leafY + h - 1050 * SCALE - 7, width: 4, height: 14, rx: 2, fill: "none", stroke: C.kovani, "stroke-width": 1.5 }));
    const ay = leafY + h * 0.35;
    svg.appendChild(el("line", { x1: leafX + w * 0.45, y1: ay, x2: leafX + w + ob + pocketW * 0.6, y2: ay, stroke: "#c0392b", "stroke-width": 1.5 }));
    const ax = leafX + w + ob + pocketW * 0.6;
    svg.appendChild(el("polygon", { points: `${ax},${ay} ${ax - 7},${ay - 4} ${ax - 7},${ay + 4}`, fill: "#c0392b" }));
  } else {
    drawLeaf(svg, leafX, leafY, w, h, item, hinge);
  }

  widthDim(svg, leafX, leafX + w, leafY + h + 12, `${item.sirka_kridla_mm}`);
  heightDim(svg, PAD_LEFT - 12, leafY, leafY + h, `${item.vyska_kridla_mm}`);

  return svg;
}

// otočné dveře s oběma stranami → dva nákresy vedle sebe (pravé, levé)
function buildDrawings(item) {
  const wrap = document.createElement("div");
  wrap.className = "drawing";
  const s = item.strana || {};
  if (item.typ !== "otocne") {
    wrap.appendChild(buildDrawing(item, null, null));
  } else if (s.pravy && s.levy) {
    wrap.appendChild(buildDrawing(item, "P", "pravé"));
    wrap.appendChild(buildDrawing(item, "L", "levé"));
  } else {
    const hinge = s.levy ? "L" : "P";
    wrap.appendChild(buildDrawing(item, hinge, hinge === "L" ? "levé" : "pravé"));
  }
  return wrap;
}

function chip(txt, variant) {
  const span = document.createElement("span");
  span.className = variant ? `chip chip-${variant}` : "chip";
  span.textContent = txt;
  return span;
}

function col(className, children) {
  const div = document.createElement("div");
  div.className = className;
  (children || []).forEach((c) => c && div.appendChild(c));
  return div;
}

function line(text, cls) {
  const d = document.createElement("div");
  if (cls) d.className = cls;
  // nevyplněná hodnota ("-----", "Sklo - -----") — jen "-----" bez popisku, světlejší
  const empty = typeof text === "string" && text.endsWith("-----");
  d.textContent = empty ? "-----" : text;
  if (empty) d.classList.add("is-empty");
  return d;
}

function fieldBlock(label, value) {
  return col("field-block", [line(label, "col-label"), line(value, "col-value-sm")]);
}

function buildCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  // Sloupec 1 — název, nákres(y)
  const pos = line(`${item.displayId} — ${item.nazev}`, "pos");
  const colMain = col("col col-main", [pos, buildDrawings(item)]);

  // Sloupec 2 — počet kusů (celkem / pravé / levé), typ, provedení, poznámka
  const qtyLine = line(`Celkem - ${item.pocet} ks`, "qty-line");
  const sideParts = [];
  if (item.strana) {
    sideParts.push(`Pravé - ${item.strana.pravy || 0} ks`);
    sideParts.push(`Levé - ${item.strana.levy || 0} ks`);
  }
  const qtySideLine = sideParts.length ? line(sideParts.join(" / "), "qty-line-sub") : null;
  const typLine = line(`${TYP_LABELS[item.typ] || item.typ}, ${PROVEDENI_LABELS[item.provedeni] || item.provedeni}`, "opening");
  const kridloLine = line(`Křídlo ${item.sirka_kridla_mm} × ${item.vyska_kridla_mm} mm`, "loc");

  const chips = document.createElement("div");
  chips.className = "chips";
  if (!item.pocet) chips.appendChild(chip("počet neurčen", "red"));

  const note = item.poznamka ? line(item.poznamka, "note") : null;

  const colDesc = col("col col-desc", [
    qtyLine,
    qtySideLine,
    typLine,
    kridloLine,
    chips.children.length ? chips : null,
    note,
  ]);

  // Sloupec 3 — zárubeň, tloušťka zdi, stavební otvor, práh
  const otvor = item.stavebni_otvor;
  const colZarubne = col("col col-fields", [
    fieldBlock("Zárubeň", item.zarubne || "-----"),
    fieldBlock("Tl. zdi (obložky)", item.tl_zdi_mm ? `${item.tl_zdi_mm} mm` : "-----"),
    fieldBlock("Stavební otvor", otvor ? `${otvor.sirka_mm} × ${otvor.vyska_mm} mm` : "dle výrobce"),
    fieldBlock("Práh", item.prah ? "Ano" : "Bez prahu"),
  ]);

  // Sloupec 4 — provedení křídla, sklo, kování, zámek
  const colProvedeni = col("col col-fields", [
    fieldBlock("Křídlo", item.typ !== "otocne" ? "-----" : item.polodrazkove ? "Polodrážkové" : "Bezpolodrážkové"),
    fieldBlock("Sklo", item.sklo || "-----"),
    fieldBlock("Kování", item.klika || "-----"),
    fieldBlock("Zámek", item.zamek || "-----"),
  ]);

  card.append(colMain, colDesc, colZarubne, colProvedeni);

  FILTERS.forEach((f) => {
    if (f.key !== "celkem" && f.match(item)) card.dataset[f.key] = "1";
  });

  return card;
}

function applyFilter(activeKey) {
  document.querySelectorAll(".card").forEach((card) => {
    card.hidden = !(activeKey === "celkem" || card.dataset[activeKey] === "1");
  });
}

function buildFilters(items) {
  const wrap = document.createElement("div");
  wrap.className = "filters";
  const buttons = [];
  FILTERS.forEach((f) => {
    const count = items.filter(f.match).reduce((acc, it) => acc + ((f.count ? f.count(it) : it.pocet) || 0), 0);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = f.key === "celkem" ? "filter-btn active" : "filter-btn";
    btn.innerHTML = `${f.label}: <b>${count}</b>`;
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.toggle("active", b === btn));
      applyFilter(f.key);
    });
    wrap.appendChild(btn);
    buttons.push(btn);
  });
  return wrap;
}

// zobrazované číslo se počítá z pořadí (I1, I2, …), `id` v datech je jen interní klíč.
// položka s `rozdeleno: true` a další se `stejne_cislo_jako_predchozi: true` mají stejné číslo
// s písmenem (I1a, I1b, …) — stejně jako na stránce oken
function assignDisplayIds(items) {
  let n = 0;
  let letter = 0;
  items.forEach((it) => {
    if (it.stejne_cislo_jako_predchozi && n) {
      letter++;
      it.displayId = `I${n}${String.fromCharCode(97 + letter)}`;
      return;
    }
    n++;
    letter = 0;
    it.displayId = it.rozdeleno ? `I${n}a` : `I${n}`;
  });
}

function renderContact(investor) {
  const host = document.getElementById("contact");
  if (!investor) return;
  host.innerHTML =
    `<b>Kontakt na investora</b> — ${investor.jmeno} · ${investor.telefon} · ` +
    `${investor.email} · ${investor.adresa}`;
}

function renderMaterials(materialy) {
  const host = document.getElementById("materials");
  (materialy || []).forEach((m) => {
    const item = document.createElement("span");
    item.className = "material";
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = m.barva || "transparent";
    if (m.obrazek) swatch.style.backgroundImage = `url("${m.obrazek}")`;
    item.appendChild(swatch);
    item.appendChild(document.createTextNode(`${m.label}: ${m.hodnota}`));
    host.appendChild(item);
  });
}

function openLightbox(src, caption) {
  const box = document.createElement("div");
  box.className = "lightbox";
  const img = document.createElement("img");
  img.src = src;
  img.alt = caption || "";
  const close = document.createElement("button");
  close.className = "lightbox-close";
  close.type = "button";
  close.setAttribute("aria-label", "Zavřít");
  close.textContent = "×";
  box.append(img, close);
  if (caption) {
    const cap = document.createElement("div");
    cap.className = "lightbox-caption";
    cap.textContent = caption;
    box.appendChild(cap);
  }
  const onKey = (e) => { if (e.key === "Escape") hide(); };
  function hide() {
    box.remove();
    document.removeEventListener("keydown", onKey);
    document.body.style.overflow = "";
  }
  box.addEventListener("click", (e) => { if (e.target !== img) hide(); });
  document.addEventListener("keydown", onKey);
  document.body.style.overflow = "hidden";
  document.body.appendChild(box);
}

function renderDecor(skupiny) {
  const host = document.getElementById("decor");
  if (!skupiny || !skupiny.length) { host.hidden = true; return; }
  skupiny.forEach((g) => {
    const group = document.createElement("div");
    group.className = "decor-group";
    const title = document.createElement("div");
    title.className = "decor-label";
    title.textContent = g.nadpis;
    const list = document.createElement("div");
    list.className = "decor-list";
    (g.polozky || []).forEach((d) => {
      const fig = document.createElement("figure");
      fig.className = "decor-item" + (d.foto ? " decor-photo" : "");
      const img = document.createElement("img");
      img.src = d.obrazek;
      img.alt = d.nazev ? `Dekor ${d.nazev}` : g.nadpis;
      img.addEventListener("click", () => openLightbox(d.obrazek, d.nazev || g.nadpis));
      fig.appendChild(img);
      if (d.nazev) {
        const cap = document.createElement("figcaption");
        cap.textContent = d.nazev;
        fig.appendChild(cap);
      }
      list.appendChild(fig);
    });
    group.append(title, list);
    host.appendChild(group);
  });
}

function init() {
  const data = DATA;
  document.getElementById("project-title").textContent = data.meta.nazev_projektu;
  renderContact(data.meta.investor);
  renderDecor(data.meta.dekory);
  renderMaterials(data.meta.materialy);

  const dvere = data.dvere || [];
  assignDisplayIds(dvere);

  const main = document.getElementById("main");
  main.appendChild(buildFilters(dvere));
  const grid = document.createElement("div");
  grid.className = "grid";
  dvere.forEach((it) => grid.appendChild(buildCard(it)));
  main.appendChild(grid);
}

try {
  init();
} catch (err) {
  document.getElementById("main").innerHTML =
    `<p style="color:#b5651d">Nepodařilo se vykreslit data: ${err.message}. Zkontroluj data.js.</p>`;
  console.error(err);
}
