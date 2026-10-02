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
    "materialy": [
      { "label": "Barva rámu", "hodnota": "Antracitgrau glatt", "barva": "#33383d" },
      { "label": "Barva křídla", "hodnota": "Antracitgrau glatt", "barva": "#33383d" },
      { "label": "Těsnění", "hodnota": "Těsnění černé", "barva": "#1a1a1a" },
      { "label": "Parapet vnější", "hodnota": "Antracitgrau glatt", "barva": "#33383d" },
      { "label": "Parapet vnitřní", "hodnota": "Antracitgrau glatt", "barva": "#33383d" },
      { "label": "Barva sítě", "hodnota": "Černá síťovina", "barva": "#1a1a1a" },
      { "label": "Barva rámu sítě", "hodnota": "Antracitgrau glatt", "barva": "#33383d" },
      { "label": "Kování (kliky)", "hodnota": "zlaté / mosaz", "barva": "#c9a227" },
      { "label": "Skla", "hodnota": "čirá", "barva": "#dbe9ee" },
      { "label": "Sklo (vchodové dveře)", "hodnota": "matné", "barva": "#dde3e3" }
    ]
  },
  "okna": [
    {
      "id": "O1",
      "nazev": "Dvojité Vyšší",
      "sirka_mm": 1800,
      "vyska_mm": 1400,
      "parapet_mm": 800,
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
      "sit_fix": 2,
      "venk_zaluzie": 2
    },
    {
      "id": "O2",
      "nazev": "Dvojité Nižší",
      "sirka_mm": 1800,
      "vyska_mm": 1300,
      "parapet_mm": 800,
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
      "venk_zaluzie": 2,
      "venk_zaluzie_priprava": 2
    },
    {
      "id": "O3",
      "nazev": "Dvojité Menší Vyšší",
      "sirka_mm": 1500,
      "vyska_mm": 1400,
      "parapet_mm": 800,
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
      "sit_fix": 1
    },
    {
      "id": "O4",
      "nazev": "Dvojité Menší Nižší",
      "poznamka": "kuchyň",
      "sirka_mm": 1500,
      "vyska_mm": 1200,
      "parapet_mm": 900,
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
      "venk_zaluzie": 2
    },
    {
      "id": "O5",
      "nazev": "Dvojité Menší Nižší",
      "sirka_mm": 1500,
      "vyska_mm": 1300,
      "parapet_mm": 800,
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
      "venk_zaluzie": 3,
      "venk_zaluzie_priprava": 2
    },
    {
      "id": "O6",
      "nazev": "Dvojité Menší Koupelna",
      "sirka_mm": 1150,
      "vyska_mm": 1050,
      "parapet_mm": 800,
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
      "venk_zaluzie": 1
    },
    {
      "id": "O7a",
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
      "venk_zaluzie_priprava": 1
    },
    {
      "id": "O7b",
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
      "venk_zaluzie_priprava": 1
    },
    {
      "id": "O8",
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
      "sit_otevirani": 1,
      "venk_zaluzie_priprava": 1
    },
    {
      "id": "O9",
      "nazev": "Koupelnové",
      "sirka_mm": 750,
      "vyska_mm": 1300,
      "parapet_mm": 800,
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
      "venk_zaluzie_priprava": 1
    },
    {
      "id": "O10",
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
      "sit_fix": 2
    },
    {
      "id": "O11",
      "nazev": "Fix",
      "sirka_mm": 3000,
      "vyska_mm": 2200,
      "parapet_mm": 0,
      "preklad_mm": 2200,
      "plocha_m2": 6.60,
      "pocet": 2,
      "mistnosti": { "prizemi": 2 },
      "deleni": [
        { "sirka_mm": 3000, "otevirani": "FIX" }
      ],
      "bezpecnostni_sklo": true,
      "purenit_cm": 20,
      "venk_zaluzie_priprava": 0
    }
  ],
  "okna_sklepni": {
    "poznamka": "Další vedlejší sklepní okna, možno udělat v levnějším profilu - nevytápěná část domu",
    "polozky": [
      {
        "id": "OS1",
        "nazev": "Vedlejší sklepní — dvojité / garážové",
        "bezprahove": true,
        "levnejsi_profil": true,
        "venkovni_parapet": false,
        "sirka_mm": 1600,
        "vyska_mm": 2050,
        "plocha_m2": 3.28,
        "pocet": 1,
        "mistnosti": { "sklep": 1 },
        "strana_domu": { "levy": 1 },
        "deleni": [
          { "sirka_mm": 800, "otevirani": "OS-L" },
          { "sirka_mm": 800, "otevirani": "OS-P" }
        ],
        "smer_otevirani": "dovnitr",
        "zamek": true
      },
      {
        "id": "OS2",
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
        "zamek": "Ano - oboustranný"
      },
      {
        "id": "OS2b",
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
        "zamek": "Ano - oboustranný"
      },
      {
        "id": "OS5",
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
        "sit_fix": 1
      }
    ]
  },
  "dvere": [
    {
      "id": "D1",
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
      "purenit_cm": 20
    },
    {
      "id": "D2",
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
      "purenit_cm": 20
    },
    {
      "id": "D3",
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
      "purenit_cm": 20
    }
  ]
};
