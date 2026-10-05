const DATA = {
  "meta": {
    "nazev_projektu": "Rodinný dům Rejchartice 58 — interiérové dveře",
    "investor": {
      "jmeno": "Pavel Hroch",
      "telefon": "+420 739 049 616",
      "email": "kontakt@pavelhroch.cz",
      "adresa": "Rejchartice 58, Šumperk 787 01"
    },
    "nahled_domu": { "nazev": "Pohledy domu", "obrazek": "../okna-dvere/img/pohledy-domu.jpg" },
    "dekory": [
      { "nadpis": "Dekor křídel a zárubní", "polozky": [
        { "nazev": "CPL Dub divoký 3D V", "obrazek": "img/dub-divoky-3d.jpg" }
      ] },
      { "nadpis": "Sklo", "polozky": [
        { "nazev": "Kůra čirá", "obrazek": "img/sklo-kura.jpg", "foto": true }
      ] },
      { "nadpis": "Kování", "polozky": [
        { "nazev": "ve zlaté / bronz barvě", "obrazek": "img/klika-interier.jpg?v=2", "foto": true }
      ] }
    ],
    "materialy": [
      { "label": "Dekor křídla", "hodnota": "CPL Dub divoký 3D V", "barva": "#b8925e", "obrazek": "img/dub-divoky-3d.jpg" },
      { "label": "Dekor zárubně", "hodnota": "CPL Dub divoký 3D V", "barva": "#b8925e", "obrazek": "img/dub-divoky-3d.jpg" },
      { "label": "Kování (panty, kliky)", "hodnota": "zlatá / bronz", "barva": "#c9a227" },
      { "label": "Sklo (prosklené dveře)", "hodnota": "kůra čirá", "barva": "#e4e9e9", "obrazek": "img/sklo-kura.jpg" }
    ]
  },
  "dvere": [
    {
      "id": "I1a",
      "nazev": "700 plné",
      "rozdeleno": true,
      "typ": "otocne",
      "provedeni": "plne",
      "sirka_kridla_mm": 700,
      "vyska_kridla_mm": 1970,
      "pocet": 1,
      "strana": { "pravy": 1, "levy": 0 },
      "zarubne": "obložková",
      "tl_zdi_mm": 300,
      "stavebni_otvor": { "sirka_mm": 800, "vyska_mm": 2020 },
      "polodrazkove": true,
      "klika": "klika s rozetou",
      "zamek": "WC (koupelnový)",
      "prah": false
    },
    {
      "id": "I1b",
      "nazev": "700 plné",
      "stejne_cislo_jako_predchozi": true,
      "typ": "otocne",
      "provedeni": "plne",
      "sirka_kridla_mm": 700,
      "vyska_kridla_mm": 1970,
      "pocet": 3,
      "strana": { "pravy": 1, "levy": 2 },
      "zarubne": "obložková",
      "tl_zdi_mm": 300,
      "stavebni_otvor": { "sirka_mm": 800, "vyska_mm": 2020 },
      "polodrazkove": true,
      "klika": "klika s rozetou",
      "zamek": "obyčejný klíč (BB)",
      "prah": false
    },
    {
      "id": "I2",
      "nazev": "700 prosklené",
      "typ": "otocne",
      "provedeni": "prosklene",
      "sirka_kridla_mm": 700,
      "vyska_kridla_mm": 1970,
      "pocet": 4,
      "strana": { "pravy": 3, "levy": 1 },
      "zarubne": "obložková",
      "tl_zdi_mm": 300,
      "stavebni_otvor": { "sirka_mm": 800, "vyska_mm": 2020 },
      "polodrazkove": true,
      "sklo": "kůra čirá, 2/3 výšky",
      "klika": "klika s rozetou",
      "zamek": "WC (koupelnový)",
      "prah": false
    },
    {
      "id": "I3",
      "nazev": "700 prosklené zasouvací",
      "typ": "zasouvaci",
      "provedeni": "prosklene",
      "sirka_kridla_mm": 700,
      "vyska_kridla_mm": 1970,
      "pocet": 1,
      "zarubne": "stavební pouzdro + obložka",
      "tl_zdi_mm": 300,
      "stavebni_otvor": null,
      "polodrazkove": false,
      "sklo": "kůra čirá, 2/3 výšky",
      "klika": "mušle",
      "zamek": null,
      "prah": false,
      "poznamka": "posuvné do stavebního pouzdra ve zdi — stavební otvor podle typu pouzdra"
    },
    {
      "id": "I4",
      "nazev": "800 plné",
      "typ": "otocne",
      "provedeni": "plne",
      "sirka_kridla_mm": 800,
      "vyska_kridla_mm": 1970,
      "pocet": 9,
      "strana": { "pravy": 7, "levy": 2 },
      "zarubne": "obložková",
      "tl_zdi_mm": 300,
      "stavebni_otvor": { "sirka_mm": 900, "vyska_mm": 2020 },
      "polodrazkove": true,
      "klika": "klika s rozetou",
      "zamek": "obyčejný klíč (BB)",
      "prah": false
    },
    {
      "id": "I5",
      "nazev": "800 prosklené",
      "typ": "otocne",
      "provedeni": "prosklene",
      "sirka_kridla_mm": 800,
      "vyska_kridla_mm": 1970,
      "pocet": 2,
      "strana": { "pravy": 1, "levy": 1 },
      "zarubne": "obložková",
      "tl_zdi_mm": 300,
      "stavebni_otvor": { "sirka_mm": 900, "vyska_mm": 2020 },
      "polodrazkove": true,
      "sklo": "kůra čirá, 2/3 výšky",
      "klika": "klika s rozetou",
      "zamek": "obyčejný klíč (BB)",
      "prah": false
    },
    {
      "id": "I6",
      "nazev": "800 prosklené zasouvací",
      "typ": "zasouvaci",
      "provedeni": "prosklene",
      "sirka_kridla_mm": 800,
      "vyska_kridla_mm": 1970,
      "pocet": 2,
      "zarubne": "stavební pouzdro + obložka",
      "tl_zdi_mm": 300,
      "stavebni_otvor": null,
      "polodrazkove": false,
      "sklo": "kůra čirá, 2/3 výšky",
      "klika": "mušle",
      "zamek": null,
      "prah": false,
      "poznamka": "posuvné do stavebního pouzdra ve zdi — stavební otvor podle typu pouzdra"
    }
  ]
};
