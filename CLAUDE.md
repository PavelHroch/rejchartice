# Rejchartice

Pracovní prostor pro pomůcky/nástroje k rekonstrukci nemovitosti Rejchartice 58.
Každý nástroj má vlastní podsložku (statická HTML stránka + JSON data, bez buildu).

## Struktura repozitáře

- `CLAUDE.md` — tento soubor, index nástrojů a log změn.
- `okna-dvere/` — vizualizace poptávky na okna a dveře z datového souboru.
  - `index.html` — stránka, načítá `data.js` a vykresluje položky jako SVG nákresy (styl podobný nabídkám výrobců, např. Sulko). Dá se otevřít přímo dvojklikem, bez serveru.
  - `data.js` — soupis oken a dveří jako `const DATA = {...}` (`okna-dvere/data.js`) — rozměry, dělení křídel, typ otevírání, doplňky. Uprav tento soubor, žádný jiný kód se měnit nemusí. (Formát je čistý JSON, jen obalený `const DATA = ... ;` kvůli `<script>` načtení bez CORS problémů.)
  - `style.css` — vzhled stránky.
  - `app.js` — vykreslovací logika (SVG nákresy, dimenze, souhrny).

## Datový model (`okna-dvere/data.js`)

- `meta` — název projektu, obecné poznámky, barvy (rám/křídlo, vnitřní parapety, kliky).
- `okna[]` — okna. `okna_sklepni` — objekt `{ poznamka, polozky[] }`: vedlejší sklepní dveře
  a sklepní okno, vlastní sekce na stránce mezi Okna a Dveře (`poznamka` je text pod
  nadpisem sekce, ne jednotlivá položka). `dvere[]` — vchodové dveře.
  Klíčová pole položky:
  - `sirka_mm`, `vyska_mm`, `parapet_mm`, `preklad_mm` — rozměry otvoru v mm.
  - `pocet` — kolik kusů této položky.
  - `deleni[]` — svislé dělení na křídla, každé se `sirka_mm` a kódem `otevirani`:
    `FIX` (pevné), `O-L`/`O-P` (otvíravé, levé/pravé), `OS-L`/`OS-P` (otvíravé+sklopné),
    `S` (jen sklopné), `VD-L`/`VD-P` (vchodové dveře), `HS`/`PSK` (posuvné).
  - `smer_otevirani`: `"dovnitr"`/`"ven"` — vykreslí se jako řádek "OTEVÍRAVÉ DOVNITŘ/VEN"
    (červeně zvýrazněné, když je "ven").
  - `bezprahove` (bool) → blok "Prah" = "Bez prahu". `zamek` (bool) → blok "Zámek" = "Ano".
  - doplňky: `bezpecnostni_sklo`, `sit_fix`, `sit_otevirani`, `venk_zaluzie`, `rolety`, `rolety_priprava`,
    `venk_zaluzie_priprava`, `purenit_cm`, `levnejsi_profil`, `poznamka`.
  - `mistnosti` a `strana_domu` — pomocné rozpady počtu (sklep/přízemí/patro, levá/pravá
    strana); `mistnosti` se vypíše jen jako název (bez počtu, dům má jedno patro/přízemí/sklep),
    `strana_domu` se vypíše jako počet u řádku "Pravé/Levé" pod "Celkem".
  - `plny_panel: true` — vchodové dveře D1–D3: nákres je plný panel (2/3 plech + 1/3
    prosklený pruh u pantů) místo obyčejného skla, viz `drawSolidDoorLeaf()` v `app.js`.

Zobrazované ID (`O1…`, `S12…`, `D17…`) se NEČTOU z dat — počítají se za běhu v `app.js`
(`assignDisplayIds()`) jako jedna souvislá řada napříč sekcemi (Okna → Okna sklepní →
Dveře), jen písmenný prefix se mění podle sekce. Interní `id` v datech slouží jen jako klíč.

Směr otevírání (`-L`/`-P`) u zdvojených oken byl v datech odhadnutý jako výchozí (symetricky
jedno křídlo levé, druhé pravé) — u položek, kde to podklad neurčoval, je to jen odhad k ověření/opravě v `data.js`.

## Poznámka k provozu

Stránka se dá otevřít přímo dvojklikem na `okna-dvere/index.html` — žádný server není
potřeba. Data nejsou v `data.json` (to `fetch()`-em v Chrome/Edge přes `file://` spadalo
na CORS chybě), ale v `data.js` jako `const DATA = {...}` — načte se běžným `<script>`
tagem, který CORS omezení nepodléhá.

## Log změn

- 2026-09-08 — Založen projekt, vytvořen `okna-dvere/` nástroj. Data přepsána z reálného
  soupisu pro Rejchartice 58 (soubor „Nové Rejchartice - Výpočty.pdf"). Vzhled nákresů
  (dělení křídel, kótování, symboly otevírání) inspirován cenovou nabídkou SULKO.
  Ověřeno lokálním serverem, vizuál odpovídá očekávání. Otevřené otázky: směr otevírání
  u zdvojených oken je odhad (symetricky L/P), poslední dveře (D8, balkonové sklepní)
  nemají v podkladu rozměr ani jasně započtený počet — je potřeba doplnit v `data.json`.
- 2026-09-08 — Přepracováno rozvržení karet: jedna položka na řádek, rozdělená do 4 sloupců
  (nákres + počet ks + rozměr / popis, tagy, poznámky, výška překladu / parapet / žaluzie
  a příprava). Layout je v `app.js` (`buildCard`) a `style.css` (`.card`, `.col-*`).
  Do sloupce Parapet doplněn i Purenit (mm, z `purenit_cm` × 10; jinak "-----").
  Do sloupce 4 přidán pod Žaluzie stejný blok pro Sítě (síť fix / síť otevírací).
- 2026-09-08 — Výška překladu se už nepíše jako text, ale kreslí se přímo do nákresu
  jako druhá (vnější) kóta vlevo od okna, včetně vizuálního "gapu" pod rámem představujícího
  zónu parapetu (jen když `preklad_mm` > `vyska_mm`). Sloupce Parapet/Purenit a Žaluzie/Sítě
  přepsány z chipů na obyčejný text (label + hodnota, "-----" když chybí) přes nový helper
  `fieldBlock()` v `app.js`, s větší mezerou mezi dvojicemi bloků (`.col-parapet`,
  `.col-zaluzie` v `style.css`).
- 2026-09-08 — Kóta výšky překladu přepracována z délkové (dlouhá čára po celé výšce)
  na výškovou značku (malý trojúhelník + vodorovný text nad rámem) — méně místa, čitelnější.
- 2026-09-08 — Parapet a purenit se teď kreslí přímo do nákresu jako délková kóta (pruh
  pod rámem + značky na kótovací čáře vlevo + popisek "parapet/purenit X mm" napříč pruhem).
  Parapet se zobrazí, když je `parapet_mm` > 0 (i u položek s `bez_parapetu: true` — ta
  fyzická výška otvoru pod oknem tam stále je). Purenit (z `purenit_cm` × 10) se kreslí jako
  tenký pruh pod parapetem (u oken) nebo přímo pod rámem (u dveří bez parapetu).
- 2026-09-08 — Další kolo úprav: kóty šířky/výšky okna zvýrazněny (`.dim-text-lg`, tmavší
  a větší); kóta parapetu vrácena vlevo jako otočený text stejně jako výška okna (jen
  purenit zůstal jako popisek napříč pruhem). Počet kusů přesunut do sloupce 2 nahoru,
  formát "Celkem X ks / Pravé Y ks / Levé Z ks" (`qty-line`, ze `strana_domu`). Popis
  otevírání sloučen, když obě křídla mají stejný typ: "typ (1. levé · 2. pravé)" —
  `describeOpenings()` v `app.js`. Sítě a žaluzie se teď píšou pod sebe (Fixní/Otevírací,
  Komplet/Příprava) přes `fieldBlockLines()`. Do legendy doplněno vysvětlení Komplet/Příprava
  žaluzie (motorové venkovní žaluzie, podomítkový kastlík s vodícími lištami, ne nástavbová
  montáž — Komplet = kompletní žaluzie s možností napojit Sonoff/Shelly, Příprava = jen kastlík).
- 2026-09-08 — Sloupec Parapet rozdělen na tři hodnoty: Výška (z `parapet_mm`), Vnitřní
  (nové pole `vnitrni_parapet_mm`, zatím vždy "-----", není v datech), Venkovní (natvrdo
  "200 mm" u všech položek — dočasné, dokud nebudou reálná data). Spojený popis otevírání
  už nemá závorku ("typ — 1. levé · 2. pravé"). Zvětšeny fonty ve všech textových sloupcích
  karty (kóty v samotném SVG nákresu beze změny). Řádek "šířka × výška mm · m²" pod nákresem
  zrušen (rozměr je vykótovaný v obrázku); plocha (m²) se přesunula na konec 2. sloupce.
- 2026-09-08 — Popis otevírání u shodných křídel zkrácen na jen typ ("otvíravé + sklopné"),
  bez opakování stran L/P (ty jsou už na řádku Celkem/Pravé/Levé výš). V nákresu se u kóty
  parapetu (vlevo, otočený text) už nepíše slovo "parapet", jen hodnota v mm.
- 2026-09-08 — Řádek s počtem kusů rozdělen na dva: "Celkem - X ks" a pod tím
  "Pravé - Y ks / Levé - Z ks" (`qty-line` + `qty-line-sub` v `style.css`).
- 2026-09-08 — Pod legendu doplněna červená poznámka "Žádná okna nemají středový dělící
  sloupek!" (`.legend-warning` v `style.css`, blok v `index.html`).
- 2026-09-08 — Francouzská okna (O7/O8) přejmenována na "Balkonové dvojité V/M" a jejich
  otevírání změněno z vlastního typu `BD-L/BD-P` na stejné `OS-L/OS-P` jako běžná okna
  (uživatel upozornil, že byla zakreslená špatně — mají stejné kování jako okna). Kód `BD`
  odstraněn z `OPENING_LABELS`/`BASE_OPENING_LABELS` v `app.js` (nepoužívaný).
  Přidáno pole `smer_otevirani` ("dovnitr"/"ven") ke všem položkám a řádek
  "OTEVÍRAVÉ DOVNITŘ/VEN" pod počet kusů ve 2. sloupci (`.smer` v CSS) — u oken defaultně
  "dovnitř" (odpovídá originálnímu podkladu SULKO "Dovnitř otevíravé"), u sklepních/
  vedlejších dveří D4–D8 "ven" — jde o odhad k ověření.
  Do 3. sloupce přidány bloky **Prah** (z nového pole `bezprahove`, "Bez prahu"/"-----")
  a **Zámek** (z `zamek`, "Ano"/"-----") pod Parapet/Purenit. Text "bezprahové" a "se
  zámkem"/"otevíravé ven" byl odstraněn z `poznamka` u dveří a O7/O8 — ta pole ho teď
  nesou strukturovaně, poznámka obsahuje jen zbylé unikátní informace.
  Kvůli agresivnímu cachování statických souborů v prohlížeči (fetch `data.json` i
  `app.js`/`style.css` se jinak neaktualizovaly po úpravě) má `data.json` fetch
  `cache: "no-store"` a `index.html` verzuje `app.js`/`style.css` query parametrem
  `?v=N` — při další úpravě JS/CSS je nutné to `N` zvýšit, jinak testovací prohlížeč
  (i uživatelův) může zobrazovat starou verzi.
- 2026-09-08 — Odstraněny diagonální čáry symbolů otevírání z nákresu (funkce
  `openingSymbol()` v `app.js` zrušena) — typ otevírání je čitelný jen z textu/poznámky
  u karty. Panely jsou teď jen prosté prosklení bez šipek. Z legendy zmizela první
  řádka vysvětlující tyto symboly (otvíravé/sklopné/otvíravé+sklopné/fixní, L/P), protože
  už nemá k čemu se vztahovat; zůstala poznámka o žaluziích a upozornění na dělící sloupek.
- 2026-09-08 — Oprava: stránka nešla spustit dvojklikem (uživatel psal "nějak to nejede").
  Příčina: `fetch("data.json")` v Chrome/Edge přes `file://` spadá na CORS chybě bez
  lokálního serveru. Data přesunuta z `data.json` do `data.js` (`const DATA = {...}`,
  načtené obyčejným `<script>` tagem, který CORS nepodléhá) — `data.json` smazán,
  `app.js` už nic nefetchuje. Ověřeno otevřením přímo přes `file://…/index.html` bez
  serveru — funguje.
- 2026-09-09 — Vedlejší sklepní dveře (dřív D4–D7) a sklepní okno (dřív O11) přesunuty
  do nové sekce **Okna sklepní** mezi Okna a Dveře (`data.js`: `okna_sklepni.polozky[]`,
  id přejmenována na S-prefix, staré O12/Fix teď O11). Bývalá položka D8 (bez rozměru,
  jen poznámka) přestala být kartou — text je teď `okna_sklepni.poznamka`, vykreslený
  jako řádek pod nadpisem sekce (`buildGroup()` bere 3. parametr, `.group-note` v CSS).
  Zobrazované ID (O1…O11, S12…S16, D17…D19) se od teď počítají za běhu v `app.js`
  (`assignDisplayIds()`) jako jedna souvislá číselná řada přes všechny sekce, jen
  písmeno se mění podle sekce — `id` v datech je teď jen interní klíč.
  V hlavičce přibyl na první místo souhrn "Okna a dveře celkem" (černý zvýrazněný chip,
  `.stat-total`), počítá okna + sklepní okna + dveře dohromady.
  U "Umístění" se teď píše jen název místnosti/podlaží bez počtu (dům má jedno patro/
  přízemí/sklep) — počet je už u řádku Celkem/Pravé/Levé.
  Poznámky "V = přízemí"/"M = patro" u balkonových dveří odstraněny (nadbytečné).
  Chipy "bezpečnostní sklo" a "* levnější profil" mají barevné pozadí (`.chip-red`,
  `.chip-blue`) pro lepší čitelnost; řádek "OTEVÍRAVÉ VEN" je červený (`.smer-ven`),
  "OTEVÍRAVÉ DOVNITŘ" beze změny.
  Vchodové dveře D17–D19 (dřív D1–D3, `plny_panel: true`) mají vlastní nákres —
  plný panel s klikou a značkami pantů místo skla (`drawSolidDoorLeaf()` v `app.js`);
  zkoušel se i dekorativní zigzag pruh a symbol otvírání v proskleném pruhu, ale uživatel
  je nechtěl, takže zůstal jen čistý plný panel + prosklený pruh 2:1.
- 2026-09-09 — D17 (dveře do předimenzovaného otvoru 130×240 cm) má nové pole
  `rozsirovaci_profil_mm: {boky, nahore}` — v nákresu se kolem dveří (jen po stranách a
  nahoře, dole ne — dveře stojí na podlaze) kreslí červený přerušovaný rámeček
  navíc (`buildDrawing()`, posouvá `padLeft`/`frameY`/`svgW` o `extraSide`/`extraTop`).
  Text "montáž na vnitřní hranu zdi" přesunut z `poznamka` do vlastního červeného chipu
  (nové pole `montaz_vnitrni_hrana`), poznámka teď obsahuje jen "do otvoru 130×240 cm —
  přidat rozšiřovací profil". (Pozn.: pole se původně jmenovalo `distancni_ramecek_mm` —
  "distanční rámeček" je ale rozpěrka MEZI skly v izolačním dvojskle, ne tohle; správný
  termín pro profil rozšiřující rám do většího stavebního otvoru je "rozšiřovací profil",
  přejmenováno po ověření webem.)
- 2026-09-09 — Sklepní okno (S16, dřív O11 "Sklepní") nemá žádný parapet — `parapet_mm`
  nastaveno na `null` (dřív 800 s `bez_parapetu: true`), takže se v nákresu ani ve
  sloupci Parapet nekreslí žádná hodnota/pruh, jen "-----".
- 2026-09-09 — Vedlejší sklepní dveře (S12–S15, dřív s kódem `VD-`) mají teď stejné
  otevírání jako okna — `OS-L`/`OS-P` místo `VD-L`/`VD-P` — popis je "otvíravé + sklopné"
  místo "dveře, otvíravé" (vchodové dveře D17–D19 zůstaly `VD-`, beze změny).
- 2026-09-09 — Souhrnné počty přesunuty z hlavičky do klikacích **filtrů** nad sekci Okna
  (`.filters`/`.filter-btn` v `style.css`, `buildFilters()`/`applyFilter()`/`FILTERS` pole
  v `app.js`). Filtr je jednovýběrový (jako záložky) — výchozí aktivní je "Okna a dveře
  celkem" (bez filtrování, zobrazí vše). Kromě původních počtů (Okna/Sklepní okna/Dveře
  celkem, Síť fix/otevírací, Venkovní žaluzie, Příprava žaluzie) přibyly nové filtry:
  Standardní profil (`!levnejsi_profil`), Levnější profil, Bezpečnostní sklo, Vnitřní
  parapet (`vnitrni_parapet_mm` — zatím u žádné položky není vyplněné, takže ukáže 0),
  Venkovní parapet (`parapet_mm > 0` — odhad, zatím nemáme samostatné pole pro "má
  venkovní parapet"), Purenit, Zámek, Přízemí, Patro, Sklep (z `mistnosti`).
  Každá karta má při vykreslení na sobě `data-<klíč>="1"` pro filtry, které splňuje
  (`buildCard()` bere teď i `sectionKey`); klik na filtr skryje nevyhovující karty a
  prázdné sekce (`section.hidden`).
- 2026-09-09 — Oprava: filtry jako Purenit/Bezpečnostní sklo se v UI tvářily aktivní,
  ale karty se neskrývaly. Příčina: `.card { display: grid }` má stejnou specificitu
  jako prohlížečovo výchozí `[hidden] { display: none }` a jako pravidlo načtené později
  v našem CSS ho přebíjelo, takže atribut `hidden` na kartě neměl žádný viditelný efekt.
  Oprava: explicitní `.card[hidden] { display: none; }` ve `style.css`. Ověřeno kliknutím
  na Purenit i Bezpečnostní sklo — teď se správně zobrazí jen odpovídající karty.
- 2026-09-09 — Zkratky filtrů "Okna celkem"/"Sklepní okna celkem"/"Dveře celkem" zkráceny
  na "Okna"/"Sklepní okna"/"Dveře" (slovo "celkem" zůstalo jen u úplného součtu úplně vlevo).
- 2026-09-09 — Do hlavičky doplněn kontakt na investora (`data.meta.investor`, vykreslený
  `renderContact()`) a přehled materiálů/barev s barevnými čtverečky (`data.meta.materialy[]`,
  `renderMaterials()`, `.materials`/`.material`/`.swatch` v CSS) — barva rámu/křídla/
  parapetů "Antracitgrau glatt" sdílí stejný hex `#33383d` jako rám v SVG nákresu. Staré
  `meta.barvy` (nepoužívané jinde v kódu) nahrazeno tímto podrobnějším polem. Poznámka o
  NZÚ (`data.meta.poznamka`) přesunuta z hlavičky pod materiály, hned nad legendu žaluzií.
- 2026-09-09 — O7 rozdělen na O7a (levé, se zámkem) a O7b (pravé, bez zámku) — dvě
  samostatné položky v `okna[]` místo jedné s `pocet: 2`. Aby číslování nepokračovalo
  O7/O8/O9→O8/O9/O10 (posun všech dalších čísel), přibyla obecná podpora "rozdělené
  položky" v `assignDisplayIds()`: pole `rozdeleno: true` na první položce dvojice a
  `stejne_cislo_jako_predchozi: true` na další (další) — dostanou stejné číslo s
  písmenem (O7a, O7b, ...), číslování ostatních položek se nezmění.
  Popis otevírání u jednokřídlových položek se stranou (`strana_domu`) teď taky nepíše
  ", levé"/", pravé" na konci (bylo by duplicitní s řádkem Pravé/Levé) — u položek BEZ
  `strana_domu` (např. S13/OS2) strana zůstává, jinde by se ztratila úplně.
  O10 (Podkroví) změněno z `S` (jen sklopné) na `OS-L` (otvíravé + sklopné).
  Vchodové dveře D17–D19 mají matné sklo v proskleném pruhu (jiná barva výplně
  `#dde3e3` v `drawSolidDoorLeaf()`, odlišná od čirého okenního skla) + nová položka v
  `data.meta.materialy` "Sklo (vchodové dveře): matné".
- 2026-09-14 — S13 (interní `id` OS2, "Vedlejší sklepní") dostal `strana_domu: { levy: 1 }`
  — dřív ho nemělo, takže se strana ", levé" nedala odstranit z popisu otevírání (odečítá
  se jen když `strana_domu` existuje, viz zápis z 2026-09-09) a zůstávala natvrdo v textu.
  Teď je "otvíravé + sklopné" a strana je na řádku "Levé - 1 ks" zvlášť, stejně jako
  u ostatních položek.
- 2026-09-14 — O10 (Podkroví) rozměr upraven na 650 × 950 mm (dřív 600 × 900), plocha
  přepočtena na 0.62 m².
- 2026-09-14 — O10 (Podkroví) počet zvýšen na 3 ks, všechny "pravé" (`strana_domu: { pravy: 3 }`,
  dřív 2 ks půl na půl levé/pravé) — hrana křídla `OS-L`→`OS-P`, `sit_fix` a `mistnosti.patro`
  odpovídajícím způsobem na 3.
- 2026-09-14 — Balkonové dveře (O7a, O7b, O8) nemají venkovní parapet — nové pole
  `venkovni_parapet: false` (jinak natvrdo "200 mm" u všech, viz TODO z 9.9.), sloupec
  Parapet u nich teď píše "Venkovní - -----"; filtr "Venkovní parapet" v `FILTERS`
  (`app.js`) tohle pole taky respektuje.
  Přepočítány žaluzie (Komplet/Příprava) a sítě (Fixní/Otevírací) u O1–O5, O7a, O7b, O8,
  O9 podle nového zadání (`venk_zaluzie`, `venk_zaluzie_priprava`, `sit_fix`, `sit_otevirani`
  v `data.js`) — všechny teď mají `sit_fix` místo `sit_otevirani` kromě O7a/O7b/O8/O9,
  kde zůstal `sit_otevirani` a přidalo se `venk_zaluzie_priprava`.
  S16 (interní `id` OS5, "Sklepní" okno) změněno z `S` (jen sklopné) na `OS-L`
  (otvíravé + sklopné) — bez `strana_domu`, takže ", levé" zůstává v popisu (stejné
  pravidlo jako u S13 před opravou z 14.9.).
- 2026-09-15 — Zrušeny S14 a S15 (interní `id` OS3/OS4, "Vedlejší sklepní") — číslování
  ostatních položek se posunulo samo (je to běhový výpočet přes celý dům, ne uložené ID,
  viz zápis z 9.9.), bývalé S16 je teď S14. S13 (OS2) přepsáno na 3 ks, všechny levé,
  šířka 900 mm (dřív 1 ks, 850 mm) — plocha přepočtena na 1.89 m². S13 a O7a mají "Zámek"
  jako text "Ano - oboustranný" místo pouhého `true`/"Ano" — pole `zamek` teď může být i
  string, `zamekValue` v `app.js` ho vypíše přímo místo natvrdo "Ano".
- 2026-09-15 — S13 (OS2) rozdělen na S13 (1 ks, výška 2050 mm) a novou položku S14
  (OS2b, 2 ks, výška 1950 mm, jinak identická — 900 mm šířka, otevírání, zámek "Ano -
  oboustranný"). Jde o dvě normální po sobě jdoucí položky v `data.js` (ne "rozdělené"
  O7a/O7b se sdíleným číslem) — vložením nové položky do pole se běhové číslování
  automaticky posunulo, bývalé S14 ("Sklepní" okno) je teď S15, vchodové dveře D16–D18.
- 2026-09-15 — S12 výška 2050 mm (dřív 2100), S13+S14 šířka 1000 mm (dřív 900) — plochy
  přepočteny (S12 3.28 m², S13 2.05 m², S14 1.95 m²). S12–S14 (`smer_otevirani`)
  změněno z "ven" na "dovnitr".
  S15 (OS5, "Sklepní" okno) dostal `strana_domu: { levy: 1 }` (stejný důvod jako u S13
  dřív — bez toho pole se strana ", levé" nedala odstranit z popisu otevírání).
  Oprava bugu: u vchodových dveří (VD-L/VD-P popisky typu "dveře, otvíravé pravé") se
  strana i po přidání `strana_domu` neodstranila, protože regex v `describeOpenings`
  volání čekal čárku před "levé"/"pravé" (`", levé"`), ale u dveří je tam jen mezera
  (`"otvíravé pravé"` bez čárky) — opraveno na `/,?\s*(levé|pravé)$/i` (čárka teď
  nepovinná), ověřeno na D16–D18.
- 2026-09-15 — Text v bloku Prah změněn z "Bez prahu" na "Nízký Al prah" (`prahValue`
  v `app.js`) — pole `bezprahove` v datech beze změny, jen jinak popsané.
- 2026-09-15 — Sklepní okna/dveře (S12–S15, celá sekce Okna sklepní) nebudou mít žádný
  parapet — dřív jim chybělo `parapet_mm` (takže "Výška" už ukazovala "-----"), ale
  "Venkovní" defaultně padá na natvrdo "200 mm" (viz `parapetVenkovniValue` v `app.js`,
  zápis z 9.9.), pokud položka nemá `venkovni_parapet: false`. Doplněno `venkovni_parapet:
  false` ke všem čtyřem položkám v `okna_sklepni.polozky` (OS1, OS2, OS2b, OS5) — teď
  všechny tři řádky Parapet (Výška/Vnitřní/Venkovní) ukazují "-----". Ověřeno na S12.
- 2026-10-02 — Projekt zveřejněn na GitHub Pages: repo `PavelHroch/rejchartice` (veřejné,
  větev `main`, kořen `/`), adresa https://pavelhroch.github.io/rejchartice/ — kořenový
  `index.html` jen přesměruje na `okna-dvere/`. Úpravy se nasadí `git push` (Pages se
  přegeneruje samo za ~1 min). Remote je přes HTTPS (SSH push hlásil "Host key
  verification failed"). Uživatel vědomě souhlasil se zveřejněním kontaktu investora.
  Obě stránky mají `<meta name="robots" content="noindex, nofollow">` — `robots.txt` v
  podsložce projektu by vyhledávače ignorovaly (čtou ho jen z kořene domény).
- 2026-10-02 — O11 (Fix, dřív 2 ks) rozdělen na O11a a O11b (po 1 ks, stejné číslo přes
  `rozdeleno`/`stejne_cislo_jako_predchozi`, jako O7a/O7b). O11a má poznámku "přidat
  rozšiřovací profil 100 mm nad oknem" a `rozsirovaci_profil_mm: { boky: 0, nahore: 100 }`.
  `buildDrawing()` v `app.js` teď u profilu bez boků kreslí jen červený čárkovaný pruh nad
  rámem (min. 10 px vysoký) s popiskem "rozšiř. profil X mm" a značka překladu se posune
  nad tento pruh; D16 (boky + nahoře) se kreslí beze změny. Lokální náhled:
  `.claude/launch.json` (`python3 -m http.server 8058`).
- 2026-10-02 — Barva rámu/křídla/parapetů/rámu sítě změněna z "Antracitgrau glatt" na
  "Woodec oat" (`data.meta.materialy`, čtvereček `#c8ad85` — přibližný odstín, ne oficiální
  hex). Rám v SVG nákresech zůstal tmavý `#33383d` kvůli čitelnosti (už neodpovídá barvě).
- 2026-10-02 — Nad přehled materiálů přidán náhled dekoru rámů (`data.meta.dekor: { nazev,
  obrazek }`, `renderDecor()` v `app.js`, `.decor` v CSS) — fotka textury Woodec oat
  v `okna-dvere/img/woodec-oat.jpg` (zmenšeno na 640 px). Materiály s polem `obrazek`
  mají místo plné barvy čtvereček s texturou.
- 2026-10-02 — S12 (OS1) křídla rozdělena nesymetricky 1000 + 600 mm (dřív 800 + 800),
  širší je levé křídlo (1. v pořadí).
- 2026-10-02 — S12 (OS1) zrcadlově otočeno: pravé (`strana_domu: { pravy: 1 }`, dřív levé),
  křídla 600 + 1000 mm (širší je teď pravé křídlo).
- 2026-10-02 — Dekor předělán na seznam `data.meta.dekory[]` (`{ nazev, obrazek }`, obrázky
  v `okna-dvere/img/`): nadpis "Dekor rámů" je nad náhledy, pod každým obrázkem jen název.
  Další dekor = přidat položku do pole + obrázek do `img/`.
- 2026-10-02 — Do 4. sloupce karty přidán blok **Rolety** (Komplet/Příprava) mezi Žaluzie
  a Sítě — nová pole `rolety` a `rolety_priprava` (počet ks), zatím nevyplněná nikde, takže
  všude "-----". Přidány i filtry "Rolety" a "Příprava rolety" (zatím 0).
- 2026-10-02 — `data.meta.dekory` je teď seznam skupin `{ nadpis, polozky[] }` vykreslených
  vedle sebe: "Dekor rámů" (textura Woodec oat) a nová "Dekor foto" (fotka vzorku rámu,
  `img/woodec-oat-foto.jpg`, položka s `foto: true` = vyšší náhled bez popisku). Klik na
  obrázek ho otevře v plné velikosti.
- 2026-10-02 — Do `data.meta.dekory` přidána skupina "Kliky okna" (fotka kliky,
  `img/kliky-okna.jpg`).
- 2026-10-02 — Přidána skupina "Kliky dveře" (`img/kliky-dvere.jpg`, Vekra Stuttgart Q
  bronz). Obrázky v hlavičce se po kliknutí otevřou přes celou obrazovku (`openLightbox()`
  v `app.js`, `.lightbox` v CSS) — zavírá se křížkem vpravo nahoře, klávesou Esc nebo
  kliknutím mimo obrázek. Všechny obrázky v `img/` přeexportovány na 1400 px (kvůli ostrosti
  na celé obrazovce).
- 2026-10-02 — Nákres vchodových dveří D16–D18 (`drawSolidDoorLeaf()` v `app.js`) předělán
  podle fotky vzoru: nahoře dvě svislá matná skla vedle sebe (~46 % výšky křídla), dole plná
  kazeta s ozdobným dvojitým čtvercem uprostřed, klika (bronzový štítek) na straně proti
  pantům ve spodní části prosklení. Dřívější rozdělení 2/3 plech + 1/3 prosklený pruh zrušeno.
- 2026-10-02 — Pole `rolety` a `rolety_priprava` doplněna ke všem 20 položkám v `data.js`
  (hodnota 0 = "-----"), hned pod `pocet`, aby se daly ručně upravit.
- 2026-10-02 — V `data.js` má teď každá položka všechny čtyři řádky `venk_zaluzie`,
  `venk_zaluzie_priprava`, `rolety`, `rolety_priprava` pohromadě (rolety hned pod žaluziemi),
  i když je hodnota 0 — kvůli snadné ruční úpravě.
- 2026-10-02 — Prohozeno pořadí v `okna[]`: Fix (interní `O11a`/`O11b`) je teď hned za O1 a
  zobrazuje se jako O2a/O2b, "Dvojité Nižší" (interní `O2`) je na konci jako O11. Interní `id`
  zůstala beze změny (zobrazovaná čísla se počítají z pořadí).
- 2026-10-02 — Prohozeno pořadí O3 ↔ O4: "Dvojité Menší Nižší" (interní `O4`) je teď O3,
  "Dvojité Menší Vyšší - Přístavba" (interní `O3`) je O4.
- 2026-10-02 — Prohozeno pořadí O10 ↔ O11: "Dvojité Nižší" (interní `O2`) je teď O10,
  "Podkroví" (interní `O10`) je poslední jako O11.
- 2026-10-02 — "Koupelnové" (interní `O9`) přesunuto před balkonové O7a/O7b — je teď O7,
  balkonové se posunuly na O8a/O8b a O9 (Balkonové dvojité M).
- 2026-10-02 — "Dvojité Nižší" (interní `O2`) přesunuto před O5 — je teď O5, ostatní se
  posunuly o jedno dál až po O10 (Balkonové dvojité M); Podkroví zůstává O11.
- 2026-10-02 — Prohozeno O1 ↔ O2: Fix (interní `O11a`/`O11b`) je teď O1a/O1b, "Dvojité
  Vyšší" (interní `O1`) je O2.
- 2026-10-02 — Balkonové dvojité V (interní `O7a`/`O7b`, byly O9a/O9b) přesunuty na O2a/O2b,
  ostatní okna posunuta o jedno dál (Dvojité Vyšší je O3 … Balkonové dvojité M O10,
  Podkroví O11).
- 2026-10-02 — Interní `id` v `data.js` přepsána, aby odpovídala zobrazovaným číslům
  (O1a, O1b, O2a, O2b, O3…O11, S12…S15, D16…D18). Pozor: zobrazované číslo se dál počítá
  z pořadí (`assignDisplayIds()`), takže po dalším přesunu položek se `id` v datech zase
  rozejde se stránkou — je potřeba je přepsat znovu. Starší zápisy v logu používají stará
  interní id (např. `OS1`, `O11a`, `D1`).
- 2026-10-02 — O3–O9 mají vnitřní parapet 300 mm (`vnitrni_parapet_mm: 300`, hned pod
  `parapet_mm`) — sloupec Parapet teď u nich píše "Vnitřní - 300 mm" a filtr Vnitřní parapet
  ukazuje 16 (počítá kusy, ne položky).
- 2026-10-02 — Do `data.meta.materialy` přidána "Barva rolety: Bílá" (před parapety).
- 2026-10-02 — Bloky Žaluzie / Rolety / Sítě: když položka nemá ani jednu variantu (obě
  hodnoty 0), píše se pod nadpisem jen jeden řádek "-----" místo "Komplet - -----" /
  "Příprava - -----" (`countBlock()` v `app.js`).
- 2026-10-02 — Nevyplněné hodnoty v kartách (text končící "-----", např. "Výška - -----",
  "Komplet - -----") se vykreslují světlejší šedou a ne tučně (`line()` přidá třídu
  `is-empty`, styl `.col-value.is-empty` / `.col-value-sm.is-empty` v CSS).
- 2026-10-02 — Nevyplněné řádky se navíc píšou bez popisku — místo "Komplet - -----" /
  "Výška - -----" jen "-----" (v `line()` v `app.js`).
- 2026-10-02 — Pod nadpisy bloků v kartách (Parapet, Prah, Žaluzie, Rolety, Sítě…) přidána
  mezera `margin-bottom: 5px` (`.col-label` ve `style.css`).
- 2026-10-02 — Blok Parapet: výška 0 mm se bere jako žádný parapet ("-----"), a když nejsou
  vyplněné žádné řádky bloku (Výška/Vnitřní/Venkovní), píše se jen jedno "-----" — obecně
  ve `fieldBlockLines()`, platí pro všechny víceřádkové bloky.
- 2026-10-02 — Nákres vchodových dveří D16–D18 změněn na vzor **ROTAVA** (z katalogu):
  plné křídlo, nahoře jedno svislé matné sklo (~40 % výšky, ~56 % šířky), pod ním menší
  obdélníková kazeta stejné šířky, svislé tyčové madlo na straně proti pantům
  (`drawSolidDoorLeaf()` v `app.js`). Nahrazuje předchozí vzor se dvěma skly a ozdobným čtvercem.
- 2026-10-02 — Do legendy nahoře (`index.html`) přidána poznámka "Bezpečnostní sklo = např.
  bezpečnostní fólie na vnitřní straně skla".
