const NAMES = {
  prizemi: "přízemí",
  patro: "patro",
  sklep: "sklep",
  levy: "levá strana",
  pravy: "pravá strana",
};

const OPENING_LABELS = {
  "FIX": "fixní zasklení",
  "S": "sklopné",
  "O-L": "otvíravé, levé",
  "O-P": "otvíravé, pravé",
  "OS-L": "otvíravé + sklopné, levé",
  "OS-P": "otvíravé + sklopné, pravé",
  "VD-L": "dveře, otvíravé levé",
  "VD-P": "dveře, otvíravé pravé",
  "HS": "posuvné (HS)",
  "PSK": "posuvně-sklopné (PSK)",
};

// popis typu otevírání bez strany (pro sloučený zápis "typ (1. levé · 2. pravé)")
const BASE_OPENING_LABELS = {
  FIX: "fixní zasklení",
  S: "sklopné",
  O: "otvíravé",
  OS: "otvíravé + sklopné",
  VD: "dveře, otvíravé",
  HS: "posuvné (HS)",
  PSK: "posuvně-sklopné (PSK)",
};
const HINGE_LABELS = { L: "levé", P: "pravé" };

// filtry nad sekcemi — "celkem" = bez filtru (výchozí), ostatní testují vlastnosti položky
const FILTERS = [
  { key: "celkem", label: "Okna a dveře celkem", match: () => true },
  { key: "okna", label: "Okna", match: (it) => it.__section === "okna" },
  { key: "sklepni", label: "Sklepní okna", match: (it) => it.__section === "okna_sklepni" },
  { key: "dvere", label: "Dveře", match: (it) => it.__section === "dvere" },
  { key: "sit_fix", label: "Síť fix", match: (it) => !!it.sit_fix },
  { key: "sit_otevirani", label: "Síť otevírací", match: (it) => !!it.sit_otevirani },
  { key: "zaluzie", label: "Venkovní žaluzie", match: (it) => !!it.venk_zaluzie },
  { key: "zaluzie_priprava", label: "Příprava žaluzie", match: (it) => !!it.venk_zaluzie_priprava },
  { key: "rolety", label: "Rolety", match: (it) => !!it.rolety },
  { key: "rolety_priprava", label: "Příprava rolety", match: (it) => !!it.rolety_priprava },
  { key: "standard_profil", label: "Standardní profil", match: (it) => !it.levnejsi_profil },
  { key: "levnejsi_profil", label: "Levnější profil", match: (it) => !!it.levnejsi_profil },
  { key: "bezpecnostni_sklo", label: "Bezpečnostní sklo", match: (it) => !!it.bezpecnostni_sklo },
  { key: "vnitrni_parapet", label: "Vnitřní parapet", match: (it) => it.vnitrni_parapet_mm != null },
  { key: "venkovni_parapet", label: "Venkovní parapet", match: (it) => it.venkovni_parapet !== false && it.parapet_mm != null && it.parapet_mm > 0 },
  { key: "purenit", label: "Purenit", match: (it) => it.purenit_cm != null },
  { key: "zamek", label: "Zámek", match: (it) => !!it.zamek },
  { key: "prizemi", label: "Přízemí", match: (it) => !!(it.mistnosti && it.mistnosti.prizemi) },
  { key: "patro", label: "Patro", match: (it) => !!(it.mistnosti && it.mistnosti.patro) },
  { key: "sklep", label: "Sklep", match: (it) => !!(it.mistnosti && it.mistnosti.sklep) },
];

function describeOpenings(deleni) {
  const secs = (deleni || []).filter((d) => d.otevirani);
  if (!secs.length) return null;
  if (secs.length === 1) return OPENING_LABELS[secs[0].otevirani] || secs[0].otevirani;

  const bases = secs.map((d) => d.otevirani.replace(/-L$|-P$/, ""));
  const allSame = bases.every((b) => b === bases[0]);
  if (allSame) {
    // strana (levé/pravé) je už uvedená o řádek výš u počtu kusů, tady stačí typ otevírání
    return BASE_OPENING_LABELS[bases[0]] || bases[0];
  }
  return secs.map((d, i) => `${i + 1}) ${OPENING_LABELS[d.otevirani] || d.otevirani}`).join("  ·  ");
}

const PAD_LEFT = 34;
const PAD_TOP = 16;
const PAD_RIGHT = 12;
const PAD_BOTTOM_1 = 40; // single dimension row
const PAD_BOTTOM_2 = 54; // two dimension rows (section + total)
const MAX_W = 200;
const MAX_H = 160;
const INSET = 6;

// barva rámu/křídla v nákresech = barva dekoru z `meta.materialy` ("Barva rámu"),
// obrys o něco tmavší, ať je rám na světlém pozadí čitelný
const FRAME_COLOR =
  ((typeof DATA !== "undefined" && (DATA.meta.materialy || []).find((m) => m.label === "Barva rámu")) || {}).barva || "#c8ad85";
const FRAME_EDGE = darken(FRAME_COLOR, 0.45);

function darken(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (shift) => Math.round(((n >> shift) & 255) * (1 - amount));
  return "#" + [16, 8, 0].map((sh) => ch(sh).toString(16).padStart(2, "0")).join("");
}

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

// vchodové dveře (`plny_panel`) — vzor ROTAVA: plné křídlo, nahoře jedno svislé matné sklo,
// pod ním menší obdélníková kazeta, svislé madlo na straně proti pantům a značky pantů
function drawSolidDoorLeaf(svg, x, y, w, h, otevirani) {
  const hinge = otevirani && otevirani.endsWith("-L") ? "L" : "P";

  svg.appendChild(el("rect", { x, y, width: w, height: h, fill: FRAME_COLOR, stroke: FRAME_EDGE, "stroke-width": 1 }));

  // sklo a kazeta mají stejnou šířku, mírně posunuté od strany madla
  const innerW = w * 0.56;
  const innerX = hinge === "P" ? x + w * 0.24 : x + w - w * 0.24 - innerW;

  const glassY = y + h * 0.13;
  const glassH = h * 0.4;
  svg.appendChild(el("rect", { x: innerX, y: glassY, width: innerW, height: glassH, fill: "#dde3e3", stroke: "#a9b3b3", "stroke-width": 1.5 }));

  const panelY = y + h * 0.62;
  const panelH = h * 0.15;
  svg.appendChild(el("rect", { x: innerX, y: panelY, width: innerW, height: panelH, fill: "none", stroke: FRAME_EDGE, "stroke-width": 1.5 }));

  // svislé madlo (tyč) na straně proti pantům, kolem poloviny výšky
  const barX = hinge === "P" ? x + 4 : x + w - 7;
  svg.appendChild(el("rect", { x: barX, y: y + h * 0.4, width: 3, height: h * 0.2, rx: 1.5, fill: "#b8913f" }));

  // panty na straně závěsu
  const hingeX = hinge === "L" ? x : x + w;
  [0.15, 0.5, 0.85].forEach((f) => {
    svg.appendChild(el("rect", { x: hingeX - 2, y: y + f * h - 6, width: 4, height: 12, fill: "#8a8f95" }));
  });
}

function buildDrawing(item) {
  const sirka = item.sirka_mm;
  const vyska = item.vyska_mm;

  if (!sirka || !vyska) {
    const svg = el("svg", { width: 180, height: 140, viewBox: "0 0 180 140" });
    svg.appendChild(
      el("rect", { x: 10, y: 10, width: 160, height: 120, fill: "none", stroke: "#c9c2b4", "stroke-width": 2, "stroke-dasharray": "6 4" })
    );
    svg.appendChild(text(90, 75, "rozměr neuveden", "dim-text", { "text-anchor": "middle" }));
    return svg;
  }

  const deleni = (item.deleni || []).filter((d) => d.sirka_mm);
  const hasMultiDim = deleni.length > 1;
  const padBottom = hasMultiDim ? PAD_BOTTOM_2 : PAD_BOTTOM_1;

  const hasPreklad = item.preklad_mm != null;
  const scale = Math.min(MAX_W / sirka, MAX_H / vyska);
  const w = sirka * scale;
  const h = vyska * scale;

  // rozšiřovací profil (menší dveře/okno v předimenzovaném otvoru) — extra místo kolem
  const profil = item.rozsirovaci_profil_mm;
  const extraSide = profil ? profil.boky * scale : 0;
  // (min. 10 px, aby byl tenký profil v nákresu vůbec vidět)
  const extraTop = profil && profil.nahore ? Math.max(profil.nahore * scale, 10) : 0;

  const padLeft = PAD_LEFT + extraSide;
  const frameY = PAD_TOP + (hasPreklad ? 16 : 0) + extraTop;

  // segmenty pod rámem — parapet (pokud existuje otvor pod oknem) a purenit (tepelná podložka)
  const segments = [];
  let bottomCursor = frameY + h;
  if (item.parapet_mm != null && item.parapet_mm > 0) {
    const segH = item.parapet_mm * scale;
    segments.push({ type: "parapet", y0: bottomCursor, y1: bottomCursor + segH, mm: item.parapet_mm });
    bottomCursor += segH;
  }
  if (item.purenit_cm) {
    const purenitMm = item.purenit_cm * 10;
    const segH = Math.max(purenitMm * scale, 8);
    segments.push({ type: "purenit", y0: bottomCursor, y1: bottomCursor + segH, mm: purenitMm });
    bottomCursor += segH;
  }
  const floorY = bottomCursor;

  const svgW = w + padLeft + PAD_RIGHT + extraSide;
  const svgH = floorY + padBottom;

  const svg = el("svg", { width: svgW, height: svgH, viewBox: `0 0 ${svgW} ${svgH}` });

  // vyplň segmentů (parapet = zdivo pod oknem, purenit = tepelná podložka)
  segments.forEach((seg) => {
    svg.appendChild(
      el("rect", {
        x: padLeft, y: seg.y0, width: w, height: seg.y1 - seg.y0,
        fill: seg.type === "purenit" ? "#f0ded0" : "#efe9df",
        stroke: seg.type === "purenit" ? "#c99f7f" : "#c9c2b4",
        "stroke-width": 1,
        "stroke-dasharray": seg.type === "purenit" ? "none" : "4 3",
      })
    );
  });

  // rám — plocha v barvě dekoru, sklo se kreslí přes ni (mezera INSET = viditelný profil)
  svg.appendChild(
    el("rect", {
      x: padLeft, y: frameY, width: w, height: h,
      fill: FRAME_COLOR, stroke: FRAME_EDGE, "stroke-width": 1.5,
    })
  );

  // rozšiřovací profil — po stranách a nahoře (dole ne, dveře/okno stojí na podlaze)
  if (profil && extraSide) {
    svg.appendChild(
      el("rect", {
        x: padLeft - extraSide, y: frameY - extraTop, width: w + extraSide * 2, height: h + extraTop,
        fill: "none", stroke: "#c0392b", "stroke-width": 2, "stroke-dasharray": "6 4",
      })
    );
  } else if (profil && extraTop) {
    // jen nahoře (bez boků) — pruh nad rámem + popisek
    svg.appendChild(
      el("rect", {
        x: padLeft, y: frameY - extraTop, width: w, height: extraTop - 2.5,
        fill: "#f6d5d1", stroke: "#c0392b", "stroke-width": 1.5, "stroke-dasharray": "5 3",
      })
    );
    svg.appendChild(
      text(padLeft + w, frameY - extraTop - 4, `rozšiř. profil ${profil.nahore} mm`, "dim-text",
        { "text-anchor": "end", fill: "#c0392b", "font-weight": "700" })
    );
  }

  let xCursor = padLeft;
  const sections = deleni.length ? deleni : [{ sirka_mm: sirka, otevirani: null }];
  const boundaries = [];

  sections.forEach((sec, i) => {
    const secW = (sec.sirka_mm || sirka / sections.length) * scale;
    const gx = xCursor + INSET;
    const gy = frameY + INSET;
    const gw = secW - (i === 0 ? INSET : INSET / 2) - (i === sections.length - 1 ? INSET : INSET / 2);
    const gh = h - INSET * 2;

    if (item.plny_panel) {
      drawSolidDoorLeaf(svg, gx, gy, gw, gh, sec.otevirani);
    } else {
      svg.appendChild(el("rect", { x: gx, y: gy, width: gw, height: gh, fill: "#dbe9ee", stroke: "#7fa8b8", "stroke-width": 1 }));
    }

    if (sections.length > 1) {
      svg.appendChild(text(xCursor + secW / 2, frameY + 11, String(i + 1), "dim-text", { "text-anchor": "middle" }));
    }

    if (i > 0) {
      svg.appendChild(el("line", { x1: xCursor, y1: frameY, x2: xCursor, y2: frameY + h, stroke: FRAME_EDGE, "stroke-width": 1 }));
    }

    boundaries.push({ x0: xCursor, x1: xCursor + secW, mm: sec.sirka_mm });
    xCursor += secW;
  });

  // per-section width dimension
  if (hasMultiDim) {
    const dimY1 = floorY + 8;
    boundaries.forEach((b) => {
      svg.appendChild(el("line", { x1: b.x0, y1: dimY1 - 3, x2: b.x0, y2: dimY1 + 3, stroke: "#a9a294", "stroke-width": 1 }));
      svg.appendChild(el("line", { x1: b.x1, y1: dimY1 - 3, x2: b.x1, y2: dimY1 + 3, stroke: "#a9a294", "stroke-width": 1 }));
      svg.appendChild(el("line", { x1: b.x0, y1: dimY1, x2: b.x1, y2: dimY1, stroke: "#a9a294", "stroke-width": 1 }));
      svg.appendChild(text((b.x0 + b.x1) / 2, dimY1 + 12, `${b.mm}`, "dim-text", { "text-anchor": "middle" }));
    });
  }

  // total width dimension
  const dimY2 = floorY + (hasMultiDim ? 28 : 14);
  svg.appendChild(el("line", { x1: padLeft, y1: dimY2 - 3, x2: padLeft, y2: dimY2 + 3, stroke: "#6b6459", "stroke-width": 1 }));
  svg.appendChild(el("line", { x1: padLeft + w, y1: dimY2 - 3, x2: padLeft + w, y2: dimY2 + 3, stroke: "#6b6459", "stroke-width": 1 }));
  svg.appendChild(el("line", { x1: padLeft, y1: dimY2, x2: padLeft + w, y2: dimY2, stroke: "#6b6459", "stroke-width": 1 }));
  svg.appendChild(text(padLeft + w / 2, dimY2 + 13, `${sirka} mm`, "dim-text dim-text-lg", { "text-anchor": "middle", "font-weight": "700" }));

  // height dimension (okno/dveře samotné) + navazující kóty parapetu a purenitu (řetězec kót)
  const dimX = padLeft - extraSide - 10;

  const vTicks = (y0, y1) => {
    svg.appendChild(el("line", { x1: dimX - 3, y1: y0, x2: dimX + 3, y2: y0, stroke: "#6b6459", "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: dimX - 3, y1: y1, x2: dimX + 3, y2: y1, stroke: "#6b6459", "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: dimX, y1: y0, x2: dimX, y2: y1, stroke: "#6b6459", "stroke-width": 1 }));
  };

  vTicks(frameY, frameY + h);
  svg.appendChild(
    text(0, 0, `${vyska} mm`, "dim-text dim-text-lg", {
      "text-anchor": "middle",
      "font-weight": "700",
      transform: `translate(${dimX - 9}, ${frameY + h / 2}) rotate(-90)`,
    })
  );

  // parapet: kóta vlevo stejně jako výška okna (otočený text). purenit: nízký pruh, popisek napříč.
  segments.forEach((seg) => {
    vTicks(seg.y0, seg.y1);
    if (seg.type === "parapet") {
      svg.appendChild(
        text(0, 0, `${seg.mm} mm`, "dim-text", {
          "text-anchor": "middle",
          "font-weight": "600",
          transform: `translate(${dimX - 8}, ${(seg.y0 + seg.y1) / 2}) rotate(-90)`,
        })
      );
    } else {
      svg.appendChild(
        text(padLeft + w / 2, (seg.y0 + seg.y1) / 2 + 3, `${seg.type} ${seg.mm} mm`, "dim-text", {
          "text-anchor": "middle",
          "font-weight": "600",
        })
      );
    }
  });

  // výška překladu — výšková kóta (spot mark), ne délková: jen bod nad horní hranou rámu
  if (hasPreklad) {
    const markX = padLeft;
    const markY = frameY - (profil && !extraSide ? extraTop : 0);
    svg.appendChild(
      el("polygon", {
        points: `${markX},${markY} ${markX - 5},${markY - 9} ${markX + 5},${markY - 9}`,
        fill: "#8a8378",
      })
    );
    svg.appendChild(el("line", { x1: markX, y1: markY - 9, x2: markX + 6, y2: markY - 9, stroke: "#8a8378", "stroke-width": 1 }));
    svg.appendChild(
      text(markX + 9, markY - 6, `překlad ${item.preklad_mm} mm`, "dim-text", { "text-anchor": "start" })
    );
  }

  return svg;
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
  // nevyplněná hodnota ("-----", "Komplet - -----") — jen "-----" bez popisku, světlejší
  const empty = typeof text === "string" && text.endsWith("-----");
  d.textContent = empty ? "-----" : text;
  if (empty) d.classList.add("is-empty");
  return d;
}

function fieldBlock(label, value) {
  return col("field-block", [line(label, "col-label"), line(value, "col-value")]);
}

function fieldBlockLines(label, values) {
  // když není vyplněný žádný řádek, stačí jedno "-----"
  if (values.every((v) => String(v).endsWith("-----"))) values = ["-----"];
  return col("field-block", [line(label, "col-label"), ...values.map((v) => line(v, "col-value-sm"))]);
}

// blok s počty (žaluzie/rolety/sítě) — když jsou všechny 0, jen jeden řádek "-----"
function countBlock(label, rows) {
  if (!rows.some(([, v]) => v)) return fieldBlockLines(label, ["-----"]);
  return fieldBlockLines(label, rows.map(([l, v]) => countLine(l, v)));
}

function countLine(label, value) {
  return value ? `${label} - ${value} ks` : `${label} - -----`;
}

function buildCard(item, sectionKey) {
  const card = document.createElement("div");
  card.className = "card";

  // Sloupec 1 — název, nákres (rozměr je vykótovaný přímo v nákresu)
  const pos = line(`${item.displayId || item.id} — ${item.nazev}`, "pos");
  const drawing = col("drawing", [buildDrawing(item)]);
  const colMain = col("col col-main", [pos, drawing]);

  // Sloupec 2 — počet kusů, popis otevírání, tagy, poznámky, umístění
  const qtyLine = line(`Celkem - ${item.pocet} ks`, "qty-line");
  const sideParts = [];
  if (item.strana_domu) {
    if (item.strana_domu.pravy) sideParts.push(`Pravé - ${item.strana_domu.pravy} ks`);
    if (item.strana_domu.levy) sideParts.push(`Levé - ${item.strana_domu.levy} ks`);
  }
  const qtySideLine = sideParts.length ? line(sideParts.join(" / "), "qty-line-sub") : null;

  let openingText = describeOpenings(item.deleni);
  // strana (levé/pravé) je zbytečná, pokud je stejně vidět na řádku Pravé/Levé výš
  if (openingText && item.strana_domu) openingText = openingText.replace(/,?\s*(levé|pravé)$/i, "");
  const openingLine = openingText ? line(openingText, "opening") : null;

  const smerVen = item.smer_otevirani === "ven";
  const smerLine = item.smer_otevirani
    ? line(`Otevíravé ${smerVen ? "ven" : "dovnitř"}`.toUpperCase(), smerVen ? "smer smer-ven" : "smer")
    : null;

  const locBits = [];
  // u umístění se počet nepíše, jen název místnosti/podlaží (počet je už u "Celkem"/"Pravé"/"Levé" výš)
  if (item.mistnosti) Object.keys(item.mistnosti).forEach((k) => locBits.push(NAMES[k] || k));
  const locLine = locBits.length ? line("Umístění: " + locBits.join(", "), "loc") : null;

  const chips = document.createElement("div");
  chips.className = "chips";
  if (item.bezpecnostni_sklo) chips.appendChild(chip("bezpečnostní sklo", "red"));
  if (item.montaz_vnitrni_hrana) chips.appendChild(chip("montáž na vnitřní hranu zdi", "red"));
  if (item.levnejsi_profil) chips.appendChild(chip("* levnější profil", "blue"));

  const note = item.poznamka ? line(item.poznamka, "note") : null;
  const plochaLine = item.plocha_m2 ? line(`${item.plocha_m2} m²`, "plocha") : null;

  const colDesc = col("col col-desc", [
    qtyLine,
    qtySideLine,
    smerLine,
    openingLine,
    chips.children.length ? chips : null,
    note,
    locLine,
    plochaLine,
  ]);

  // Sloupec 3 — parapet (výška / vnitřní / venkovní), purenit, zámek
  const parapetVyskaValue = item.parapet_mm ? `${item.parapet_mm} mm` : "-----";
  const parapetVnitrniValue = item.vnitrni_parapet_mm ? `${item.vnitrni_parapet_mm} mm` : "-----";
  const parapetVenkovniValue = item.venkovni_parapet === false ? "-----" : "200 mm"; // TODO: zatím jednotně, dokud nebudou reálná data
  const prahValue = item.bezprahove ? "Nízký Al" : "-----";
  const purenitValue = item.purenit_cm ? `${item.purenit_cm * 10} mm` : "-----";
  const zamekValue = typeof item.zamek === "string" ? item.zamek : item.zamek ? "Ano" : "-----";
  const colParapet = col("col col-parapet", [
    fieldBlockLines("Parapet", [
      `Výška - ${parapetVyskaValue}`,
      `Vnitřní - ${parapetVnitrniValue}`,
      `Venkovní - ${parapetVenkovniValue}`,
    ]),
    fieldBlock("Prah", prahValue),
    fieldBlock("Purenit", purenitValue),
    fieldBlock("Zámek", zamekValue),
  ]);

  // Sloupec 4 — žaluzie a rolety (komplet/příprava) a sítě (fixní/otevírací), každé pod sebou
  const colZaluzie = col("col col-zaluzie", [
    countBlock("Žaluzie", [["Komplet", item.venk_zaluzie], ["Příprava", item.venk_zaluzie_priprava]]),
    countBlock("Rolety", [["Komplet", item.rolety], ["Příprava", item.rolety_priprava]]),
    countBlock("Sítě", [["Fixní", item.sit_fix], ["Otevírací", item.sit_otevirani]]),
  ]);

  card.appendChild(colMain);
  card.appendChild(colDesc);
  card.appendChild(colParapet);
  card.appendChild(colZaluzie);

  // příznaky pro filtr nad sekcemi — "celkem" se netaguje, platí vždy
  const taggedItem = Object.assign({ __section: sectionKey }, item);
  FILTERS.forEach((f) => {
    if (f.key !== "celkem" && f.match(taggedItem)) card.dataset[f.key] = "1";
  });

  return card;
}

function buildGroup(title, items, sectionKey, poznamka) {
  const section = document.createElement("section");
  section.className = "group";
  const h2 = document.createElement("h2");
  h2.textContent = title;
  section.appendChild(h2);
  if (poznamka) {
    const note = document.createElement("p");
    note.className = "group-note";
    note.textContent = poznamka;
    section.appendChild(note);
  }
  const grid = document.createElement("div");
  grid.className = "grid";
  items.forEach((item) => grid.appendChild(buildCard(item, sectionKey)));
  section.appendChild(grid);
  return section;
}

function sum(items, field) {
  return items.reduce((acc, it) => acc + (it[field] || 0), 0);
}

function applyFilter(activeKey) {
  document.querySelectorAll(".card").forEach((card) => {
    card.hidden = !(activeKey === "celkem" || card.dataset[activeKey] === "1");
  });
  document.querySelectorAll("section.group").forEach((sec) => {
    const anyVisible = [...sec.querySelectorAll(".card")].some((c) => !c.hidden);
    sec.hidden = !anyVisible;
  });
}

function buildFilters(vsePocitatelne) {
  const wrap = document.createElement("div");
  wrap.className = "filters";

  const buttons = [];
  FILTERS.forEach((f) => {
    const count = sum(vsePocitatelne.filter(f.match), "pocet");
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

// číslování je jedna souvislá řada napříč sekcemi, jen písmenný prefix se mění podle sekce
// číslování je jedna souvislá řada napříč sekcemi (jen prefix se mění podle sekce), ale
// položka s `rozdeleno: true` a následující položky se `stejne_cislo_jako_predchozi: true`
// dostanou stejné číslo s písmenem navíc (O7a, O7b, ...), aniž by se posunulo číslování dál
function assignDisplayIds(data) {
  let n = 1;
  let baseN = null;
  let letterCode = null;

  function tag(it, prefix) {
    if (it.stejne_cislo_jako_predchozi && baseN != null) {
      it.displayId = `${prefix}${baseN}${String.fromCharCode(letterCode)}`;
      letterCode++;
      return;
    }
    baseN = n;
    n++;
    if (it.rozdeleno) {
      it.displayId = `${prefix}${baseN}a`;
      letterCode = "b".charCodeAt(0);
    } else {
      it.displayId = `${prefix}${baseN}`;
    }
  }

  (data.okna || []).forEach((it) => tag(it, "O"));
  const sklepni = (data.okna_sklepni && data.okna_sklepni.polozky) || [];
  sklepni.forEach((it) => tag(it, "S"));
  (data.dvere || []).forEach((it) => tag(it, "D"));
}

function renderContact(investor) {
  const el = document.getElementById("contact");
  if (!investor) return;
  el.innerHTML =
    `<b>Kontakt na investora</b> — ${investor.jmeno} · ${investor.telefon} · ` +
    `${investor.email} · ${investor.adresa}`;
}

function renderMaterials(materialy) {
  const el = document.getElementById("materials");
  (materialy || []).forEach((m) => {
    const item = document.createElement("span");
    item.className = "material";
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = m.barva || "transparent";
    if (m.obrazek) swatch.style.backgroundImage = `url("${m.obrazek}")`;
    item.appendChild(swatch);
    item.appendChild(document.createTextNode(`${m.label}: ${m.hodnota}`));
    el.appendChild(item);
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
  // zavře křížek, Esc nebo klik mimo obrázek
  box.addEventListener("click", (e) => { if (e.target !== img) hide(); });
  document.addEventListener("keydown", onKey);
  document.body.style.overflow = "hidden";
  document.body.appendChild(box);
}

// dekory — skupiny vedle sebe (nadpis nad náhledy), pod obrázkem jen název (pokud je)
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
      // klik otevře obrázek přes celou obrazovku (lightbox), křížkem/Esc zpět
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
  document.getElementById("nzu-note").textContent = data.meta.poznamka;
  renderContact(data.meta.investor);
  renderDecor(data.meta.dekory);
  renderMaterials(data.meta.materialy);

  assignDisplayIds(data);

  const okna = data.okna || [];
  const sklepniPolozky = (data.okna_sklepni && data.okna_sklepni.polozky) || [];
  const dvere = data.dvere || [];
  const vsePocitatelne = [
    ...okna.map((it) => Object.assign({ __section: "okna" }, it)),
    ...sklepniPolozky.map((it) => Object.assign({ __section: "okna_sklepni" }, it)),
    ...dvere.map((it) => Object.assign({ __section: "dvere" }, it)),
  ];

  const main = document.getElementById("main");
  main.appendChild(buildFilters(vsePocitatelne));
  if (okna.length) main.appendChild(buildGroup("Okna", okna, "okna"));
  if (sklepniPolozky.length) {
    main.appendChild(buildGroup("Okna sklepní", sklepniPolozky, "okna_sklepni", data.okna_sklepni.poznamka));
  }
  if (dvere.length) main.appendChild(buildGroup("Dveře", dvere, "dvere"));
}

try {
  init();
} catch (err) {
  document.getElementById("main").innerHTML =
    `<p style="color:#b5651d">Nepodařilo se vykreslit data: ${err.message}. Zkontroluj data.js.</p>`;
  console.error(err);
}
