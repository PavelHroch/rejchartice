const DATA = {
  "meta": {
    "nazev_projektu": "Rodinný dům Rejchartice 58",
    "poznamka": "Okna/dveře/montáž musí splňovat podmínky NZÚ (až na výjimky * - levnější profil, v nezateplené části).",
    "investor": {
      "jmeno": "Pavel Hroch",
      "telefon": "+420 739 049 616",
      "email": "kontakt@pavelhroch.cz",
      "adresa": "Rejchartice 58, Šumperk 787 01"
    },
    "dekory": [
      { "nadpis": "Dekor rámů", "polozky": [
        { "nazev": "Woodec oat", "obrazek": "img/woodec-oat.jpg" }
      ] },
      { "nadpis": "Dekor foto", "polozky": [
        { "obrazek": "img/woodec-oat-foto.jpg", "foto": true }
      ] },
      { "nadpis": "Kliky okna", "polozky": [
        { "obrazek": "img/kliky-okna.jpg", "foto": true }
      ] },
      { "nadpis": "Kliky dveře", "polozky": [
        { "obrazek": "img/kliky-dvere.jpg", "foto": true }
      ] }
    ],
    "materialy": [
      { "label": "Barva rámu", "hodnota": "Woodec oat", "barva": "#c8ad85", "obrazek": "img/woodec-oat.jpg" },
      { "label": "Barva křídla", "hodnota": "Woodec oat", "barva": "#c8ad85", "obrazek": "img/woodec-oat.jpg" },
      { "label": "Těsnění", "hodnota": "Těsnění černé", "barva": "#1a1a1a" },
      { "label": "Barva rolety/žaluzie", "hodnota": "Bílá", "barva": "#ffffff" },
      { "label": "Parapet vnější", "hodnota": "Bílá", "barva": "#ffffff" },
      { "label": "Parapet vnitřní", "hodnota": "Bílá", "barva": "#ffffff" },
      { "label": "Barva rámu sítě", "hodnota": "Woodec oat", "barva": "#c8ad85", "obrazek": "img/woodec-oat.jpg" },
      { "label": "Kování (panty, kliky)", "hodnota": "zlaté / mosaz / bronz", "barva": "#c9a227" },
      { "label": "Skla", "hodnota": "čirá", "barva": "#dbe9ee" },
      { "label": "Sklo (vchodové dveře)", "hodnota": "kůra", "barva": "#dde3e3" }
    ]
  },
  "okna": [
    {
      "id": "O1a",
      "nazev": "Fix",
      "rozdeleno": true,
      "poznamka": "přidat rozšiřovací profil 100 mm nad oknem",
      "rozsirovaci_profil_mm": { "boky": 0, "nahore": 100 },
      "sirka_mm": 3000,
      "vyska_mm": 2200,
      "parapet_mm": 0,
      "preklad_mm": 2200,
      "plocha_m2": 6.60,
      "pocet": 1,
      "mistnosti": { "prizemi": 1 },
      "deleni": [
        { "sirka_mm": 3000, "otevirani": "FIX" }
      ],
      "bezpecnostni_sklo": true,
      "purenit_cm": 20,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O1b",
      "nazev": "Fix",
      "stejne_cislo_jako_predchozi": true,
      "sirka_mm": 3000,
      "vyska_mm": 2200,
      "parapet_mm": 0,
      "preklad_mm": 2200,
      "plocha_m2": 6.60,
      "pocet": 1,
      "mistnosti": { "prizemi": 1 },
      "deleni": [
        { "sirka_mm": 3000, "otevirani": "FIX" }
      ],
      "bezpecnostni_sklo": true,
      "purenit_cm": 20,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O2a",
      "nazev": "Balkonové dvojité V",
      "bezprahove": true,
      "rozdeleno": true,
      "venkovni_parapet": false,
      "sirka_mm": 1800,
      "vyska_mm": 2100,
      "parapet_mm": 0,
      "preklad_mm": 2100,
      "plocha_m2": 3.78,
      "pocet": 1,
      "mistnosti": { "prizemi": 1 },
      "strana_domu": { "levy": 1 },
      "deleni": [
        { "sirka_mm": 900, "otevirani": "OS-L" },
        { "sirka_mm": 900, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "zamek": "Ano - oboustranný",
      "purenit_cm": 20,
      "sit_otevirani": 1,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 1,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O2b",
      "nazev": "Balkonové dvojité V",
      "bezprahove": true,
      "stejne_cislo_jako_predchozi": true,
      "venkovni_parapet": false,
      "sirka_mm": 1800,
      "vyska_mm": 2100,
      "parapet_mm": 0,
      "preklad_mm": 2100,
      "plocha_m2": 3.78,
      "pocet": 1,
      "mistnosti": { "prizemi": 1 },
      "strana_domu": { "pravy": 1 },
      "deleni": [
        { "sirka_mm": 900, "otevirani": "OS-L" },
        { "sirka_mm": 900, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "purenit_cm": 20,
      "sit_otevirani": 1,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 1,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O3",
      "nazev": "Dvojité Vyšší",
      "sirka_mm": 1800,
      "vyska_mm": 1400,
      "parapet_mm": 800,
      "vnitrni_parapet_mm": 300,
      "preklad_mm": 2200,
      "plocha_m2": 2.52,
      "pocet": 2,
      "mistnosti": { "prizemi": 2 },
      "strana_domu": { "levy": 1, "pravy": 1 },
      "deleni": [
        { "sirka_mm": 900, "otevirani": "OS-L" },
        { "sirka_mm": 900, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "sit_fix": 1,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 2
    },
    {
      "id": "O4",
      "nazev": "Dvojité Menší Nižší",
      "poznamka": "kuchyň",
      "sirka_mm": 1500,
      "vyska_mm": 1200,
      "parapet_mm": 900,
      "vnitrni_parapet_mm": 300,
      "preklad_mm": 2100,
      "plocha_m2": 1.80,
      "pocet": 2,
      "mistnosti": { "prizemi": 2 },
      "strana_domu": { "levy": 1, "pravy": 1 },
      "deleni": [
        { "sirka_mm": 750, "otevirani": "OS-L" },
        { "sirka_mm": 750, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "bez_parapetu": true,
      "sit_fix": 2,
      "venk_zaluzie": 2,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O5",
      "nazev": "Dvojité Menší Vyšší - Přístavba",
      "sirka_mm": 1500,
      "vyska_mm": 1400,
      "parapet_mm": 800,
      "vnitrni_parapet_mm": 300,
      "preklad_mm": 2200,
      "plocha_m2": 2.10,
      "pocet": 1,
      "mistnosti": { "prizemi": 1 },
      "strana_domu": { "levy": 1 },
      "deleni": [
        { "sirka_mm": 750, "otevirani": "OS-L" },
        { "sirka_mm": 750, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "sit_fix": 1,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O6",
      "nazev": "Dvojité Nižší",
      "sirka_mm": 1800,
      "vyska_mm": 1300,
      "parapet_mm": 800,
      "vnitrni_parapet_mm": 300,
      "preklad_mm": 2100,
      "plocha_m2": 2.34,
      "pocet": 4,
      "mistnosti": { "patro": 4 },
      "strana_domu": { "levy": 2, "pravy": 2 },
      "deleni": [
        { "sirka_mm": 900, "otevirani": "OS-L" },
        { "sirka_mm": 900, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "sit_fix": 4,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 2,
      "rolety_priprava": 2
    },
    {
      "id": "O7",
      "nazev": "Dvojité Menší Nižší",
      "sirka_mm": 1500,
      "vyska_mm": 1300,
      "parapet_mm": 800,
      "vnitrni_parapet_mm": 300,
      "preklad_mm": 2100,
      "plocha_m2": 1.95,
      "pocet": 5,
      "mistnosti": { "patro": 5 },
      "strana_domu": { "levy": 2, "pravy": 3 },
      "deleni": [
        { "sirka_mm": 750, "otevirani": "OS-L" },
        { "sirka_mm": 750, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "sit_fix": 5,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 3,
      "rolety_priprava": 2
    },
    {
      "id": "O8",
      "nazev": "Dvojité Menší Koupelna",
      "sirka_mm": 1150,
      "vyska_mm": 1050,
      "parapet_mm": 800,
      "vnitrni_parapet_mm": 300,
      "preklad_mm": 1850,
      "plocha_m2": 1.2075,
      "pocet": 1,
      "mistnosti": { "patro": 1 },
      "strana_domu": { "levy": 1 },
      "deleni": [
        { "sirka_mm": 575, "otevirani": "OS-L" },
        { "sirka_mm": 575, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "bez_parapetu": true,
      "sit_fix": 1,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O9",
      "nazev": "Koupelnové",
      "sirka_mm": 750,
      "vyska_mm": 1300,
      "parapet_mm": 800,
      "vnitrni_parapet_mm": 300,
      "preklad_mm": 2100,
      "plocha_m2": 0.98,
      "pocet": 1,
      "mistnosti": { "patro": 1 },
      "strana_domu": { "levy": 1 },
      "deleni": [
        { "sirka_mm": 750, "otevirani": "OS-L" }
      ],
      "smer_otevirani": "dovnitr",
      "bez_parapetu": true,
      "sit_fix": 1,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O10",
      "nazev": "Balkonové dvojité M",
      "bezprahove": true,
      "venkovni_parapet": false,
      "sirka_mm": 1800,
      "vyska_mm": 2100,
      "parapet_mm": 0,
      "preklad_mm": 2100,
      "plocha_m2": 3.78,
      "pocet": 1,
      "mistnosti": { "patro": 1 },
      "strana_domu": { "levy": 1 },
      "deleni": [
        { "sirka_mm": 900, "otevirani": "OS-L" },
        { "sirka_mm": 900, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "sit_otevirani": 0,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "O11",
      "nazev": "Podkroví",
      "sirka_mm": 650,
      "vyska_mm": 950,
      "parapet_mm": null,
      "preklad_mm": null,
      "plocha_m2": 0.62,
      "pocet": 2,
      "mistnosti": { "patro": 2 },
      "strana_domu": { "pravy": 2 },
      "deleni": [
        { "sirka_mm": 650, "otevirani": "OS-P" }
      ],
      "smer_otevirani": "dovnitr",
      "sit_fix": 2,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    }
  ],
  "okna_sklepni": {
    "poznamka": "Další vedlejší sklepní okna, možno udělat v levnějším profilu - nevytápěná část domu",
    "polozky": [
      {
        "id": "S12",
        "nazev": "Vedlejší sklepní — dvojité",
        "bezprahove": true,
        "levnejsi_profil": true,
        "venkovni_parapet": false,
        "sirka_mm": 1600,
        "vyska_mm": 2050,
        "plocha_m2": 3.28,
        "pocet": 1,
        "mistnosti": { "sklep": 1 },
        "strana_domu": { "pravy": 1 },
        "deleni": [
          { "sirka_mm": 600, "otevirani": "OS-L" },
          { "sirka_mm": 1000, "otevirani": "OS-P" }
        ],
        "smer_otevirani": "dovnitr",
        "zamek": true,
        "venk_zaluzie": 0,
        "venk_zaluzie_priprava": 0,
        "rolety": 0,
        "rolety_priprava": 0
      },
      {
        "id": "S13",
        "nazev": "Vedlejší sklepní",
        "bezprahove": true,
        "levnejsi_profil": true,
        "venkovni_parapet": false,
        "sirka_mm": 1000,
        "vyska_mm": 2050,
        "plocha_m2": 2.05,
        "pocet": 1,
        "mistnosti": { "sklep": 1 },
        "strana_domu": { "levy": 1 },
        "deleni": [
          { "sirka_mm": 1000, "otevirani": "OS-L" }
        ],
        "smer_otevirani": "dovnitr",
        "zamek": "Ano - oboustranný",
        "venk_zaluzie": 0,
        "venk_zaluzie_priprava": 0,
        "rolety": 0,
        "rolety_priprava": 0
      },
      {
        "id": "S14",
        "nazev": "Vedlejší sklepní",
        "bezprahove": true,
        "levnejsi_profil": true,
        "venkovni_parapet": false,
        "sirka_mm": 1000,
        "vyska_mm": 1950,
        "plocha_m2": 1.95,
        "pocet": 2,
        "mistnosti": { "sklep": 2 },
        "strana_domu": { "levy": 2 },
        "deleni": [
          { "sirka_mm": 1000, "otevirani": "OS-L" }
        ],
        "smer_otevirani": "dovnitr",
        "zamek": "Ano - oboustranný",
        "venk_zaluzie": 0,
        "venk_zaluzie_priprava": 0,
        "rolety": 0,
        "rolety_priprava": 0
      },
      {
        "id": "S15",
        "nazev": "Sklepní",
        "levnejsi_profil": true,
        "venkovni_parapet": false,
        "sirka_mm": 800,
        "vyska_mm": 800,
        "parapet_mm": null,
        "preklad_mm": null,
        "plocha_m2": 0.64,
        "pocet": 1,
        "mistnosti": { "sklep": 1 },
        "strana_domu": { "levy": 1 },
        "deleni": [
          { "sirka_mm": 800, "otevirani": "OS-L" }
        ],
        "smer_otevirani": "dovnitr",
        "sit_fix": 1,
        "venk_zaluzie": 0,
        "venk_zaluzie_priprava": 0,
        "rolety": 0,
        "rolety_priprava": 0
      }
    ]
  },
  "dvere": [
    {
      "id": "D16",
      "nazev": "Vchodové hlavní přízemí",
      "poznamka": "do otvoru 130×240 cm — přidat rozšiřovací profil",
      "rozsirovaci_profil_mm": { "boky": 100, "nahore": 200 },
      "montaz_vnitrni_hrana": true,
      "bezprahove": true,
      "plny_panel": true,
      "sirka_mm": 1100,
      "vyska_mm": 2200,
      "plocha_m2": 2.42,
      "pocet": 1,
      "mistnosti": { "prizemi": 1 },
      "strana_domu": { "pravy": 1 },
      "deleni": [
        { "sirka_mm": 1100, "otevirani": "VD-P" }
      ],
      "smer_otevirani": "dovnitr",
      "zamek": true,
      "purenit_cm": 20,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "D17",
      "nazev": "Vchodové vedlejší přízemí",
      "bezprahove": true,
      "plny_panel": true,
      "sirka_mm": 1000,
      "vyska_mm": 2200,
      "plocha_m2": 2.20,
      "pocet": 2,
      "mistnosti": { "prizemi": 2 },
      "strana_domu": { "levy": 1, "pravy": 1 },
      "deleni": [
        { "sirka_mm": 1000, "otevirani": "VD-L" }
      ],
      "smer_otevirani": "dovnitr",
      "zamek": true,
      "purenit_cm": 20,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    },
    {
      "id": "D18",
      "nazev": "Vchodové vedlejší patro 3+1",
      "bezprahove": true,
      "plny_panel": true,
      "sirka_mm": 1000,
      "vyska_mm": 2100,
      "plocha_m2": 2.10,
      "pocet": 1,
      "mistnosti": { "patro": 1 },
      "strana_domu": { "pravy": 1 },
      "deleni": [
        { "sirka_mm": 1000, "otevirani": "VD-P" }
      ],
      "smer_otevirani": "dovnitr",
      "zamek": true,
      "purenit_cm": 20,
      "venk_zaluzie": 0,
      "venk_zaluzie_priprava": 0,
      "rolety": 0,
      "rolety_priprava": 0
    }
  ]
};
