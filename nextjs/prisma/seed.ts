import prisma from "@/lib/prisma";

type MenuItem = {
  type?: "MAIN" | "FOOTER";
  label: string;
  description?: string;
  display_order: number;
  url: string;
};

type MenuItemType = {
  menuItem: MenuItem;
  children?: { menuItem: MenuItem; children?: MenuItemType[] }[];
};

const footer : MenuItemType[] = [
  {
    menuItem:{
      label:"Liens utiles",
      display_order:1,
      type:"FOOTER",
      url:""
    },
    children:[
      {
        menuItem: {
          label:"L’INSEED",
          display_order:1,
          type:"FOOTER", 
          url:"/information"}, 
          children:[]
      },
      {
        menuItem: {
         label:"ACTUALITÉS",
         display_order:2,
         type:"FOOTER", 
         url:"/news"}, 
         children:[]
      },
      {
        menuItem: {
         label:"THÉMATIQUES",
         display_order:3,
         type:"FOOTER", 
         url:"/themes"}, 
         children:[]
      },
      {
        menuItem: {
         label:"SYSTÈME STATISTIQUE NATIONAL",
         display_order:4,
         type:"FOOTER", 
         url:"/ssn"}, 
         children:[]
      }
    ]
  },
  {
    menuItem:{
      label:"Nos Publications",
      display_order:1,
      type:"FOOTER",
      url:""
    },
    children:[
      {
        menuItem: {
          label:"BULLETIN DE CONJONCTURE",
          display_order:1,
          type:"FOOTER", 
          url:"/publications/economic-bulletin"}, 
          children:[]
      },
      {
        menuItem: {
         label:"COMPTES NATIONAUX ET ÉTUDES ÉCONOMIQUES",
         display_order:2,
         type:"FOOTER", 
         url:"/publications/national-accounts-and-economic-studies"}, 
         children:[]
      },
      {
        menuItem: {
         label:"NOTES DE CONJONCTURE",
         display_order:3,
         type:"FOOTER", 
         url:"/publications/memo-on-the-economy"}, 
         children:[]
      },
      {
        menuItem: {
         label:"STATISTIQUE DU COMMERCE EXTÉRIEUR",
         display_order:4,
         type:"FOOTER", 
         url:"/publications/foreign-trade-statistics"}, 
         children:[]
      }
    ]
  }
];

const menus: MenuItemType[] = [
  {
    menuItem: {
      label: "L'INSEED",
      description: "Connaître l'INSEED",
      display_order: 1,
      url: "/information",
    },
    children: [
        {
          menuItem: {
            label: "CONNAÎTRE L’INSEED",
            display_order: 4,
            url: "/information/know-inseed",
          },
          children: [
            {
            menuItem: {
              label: "UN PEU D’HISTOIRE",
              display_order: 1,
              url: "/information/history",
            },
            children: [],
          },
          {
            menuItem: {
              label: "MOT DU DIRECTEUR GÉNÉRAL",
              display_order: 2,
              url: "/information/word-from-general-director",
            },
            children: [],
          },
           {
          menuItem: {
            label: "ORGANISATION ET FONCTIONNEMENT",
            display_order: 3,
            url: "/information/organization-and-operation",
          },
        children: [],
      },
      ],
      },
      {
        menuItem: {
          label: "LES ACTIVITÉS DE L’INSEED",
          display_order: 1,
          url: "/information/activities",
        },
        children: [
          {
            menuItem: {
              label: "SUIVRE L’ÉCONOMIE COMORIENNE",
              display_order: 1,
              url: "/information/monitor-the-comorian-economy",
            },
          },
          {
            menuItem: {
              label: "CONNAÎTRE LES ENTREPRISES",
              display_order: 2,
              url: "/information/know-the-companies",
            },
          },
          {
            menuItem: {
              label: "OBSERVER L’ÉVOLUTION DE LA SOCIÉTÉ",
              display_order: 3,
              url: "/information/observing-the-evolution-of-society",
            },
          },
          {
            menuItem: {
              label: "REALISER LE RECENSEMENT DE LA POPULATION",
              display_order: 4,
              url: "/information/conduct-the-population-census",
            },
          },
          {
            menuItem: {
              label: "DÉCRIRE ET ANALYSER LES RÉGIONS ET LES TERRITOIRES",
              display_order: 5,
              url: "/information/describe-and-analyze-regions-and-territories",
            },
          },
          {
            menuItem: {
              label: "GÉRER DES GRANDS RÉPERTOIRES",
              display_order: 6,
              url: "/information/manage-large-directories",
            },
          },
          {
            menuItem: {
              label: "DIFFUSER SES STATISTIQUES ET SES ETUDES",
              display_order: 7,
              url: "/information/disseminate-statistics-and-studies",
            },
          },
          {
            menuItem: {
              label: "PERFECTIONNER SES MÉTHODES ET EVALUER LA QUALITÉ",
              display_order: 8,
              url: "/information/improve-methods-and-evaluate-quality",
            },
          },
          {
            menuItem: {
              label: "CONTRIBUER À LA STATISTIQUE RÉGIONALE, AFRICAINE ET INTERNATIONALE",
              display_order: 9,
              url: "/information/contribute-to-international-statistics",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "PLANNIFICATION STRATÉGIQUE",
          display_order: 3,
          url: "/information/strategic-planning",
        },
        children: [
          {
            menuItem: {
              label: "PLAN D’ACTIONS",
              display_order: 1,
              url: "/information/action-plan",
            },
          },
          {
            menuItem: {
              label: "RAPPORT D’ACTIVITÉS",
              display_order: 2,
              url: "/information/activity-report",
            },
          },
          {
          menuItem: {
            label: "DIAGNOSTIC DU SYSTÈME STATISTIQUE",
            display_order: 3,
            url: "/information/statistical-system-diagnosis",
          },
        },
        ],
      },
      {
        menuItem: {
          label: "LA STATISTIQUE PUBLIQUE",
          display_order: 2,
          url: "/information/public-statistics",
        },
        children: [
          {
            menuItem: {
              label: "CADRE JURIDIQUE ET INSTITUTIONNEL",
              display_order: 1,
              url: "/information/legal-and-institutional-framework",
            },
          },
          {
            menuItem: {
              label: "LE SYSTÈME STATISTIQUE NATIONAL",
              display_order: 2,
              url: "/information/ssn",
            },
          },
          {
            menuItem: {
              label: "SECRET STATISTIQUE ET PROTECTION DES DONNÉES",
              display_order: 3,
              url: "/information/statistical-secrecy-and-data-protection",
            },
          },
          {
            menuItem: {
              label: "ACCÈS AUX DONNÉES PUBLIQUES",
              display_order: 4,
              url: "/information/access-to-public-data",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "L’INSEED DANS LE SYSTÈME STATISTIQUE AFRICAIN",
          display_order: 3,
          url: "/information/inseed-in-the-african-statistical-system",
        },
        children: [
          {
            menuItem: {
              label: "TEXTES DE RÉFÉRENCE",
              display_order: 1,
              url: "/information/reference-texts",
            },
          },
          {
            menuItem: {
              label: "LE PROJET DE LA CHARTE AFRICAINE DE LA STATISTIQUE",
              display_order: 2,
              url: "/information/the-draft-african-charter-on-statistics",
            },
          },
        ],
      },
    ],
  },
  {
    menuItem: {
      label: "ACTUALITÉS",
      description: "Ne manquez rien des informations de l'INSEED",
      display_order: 4,
      url: "/news",
    },
    children: [
      {
        menuItem: {
          label: "NEWS",
          display_order: 1,
          url: "/news/news",
        },
      },
      {
        menuItem: {
          label: "AGENDA ET ÉVÈNEMENTS",
          display_order: 2,
          url: "/news/agenda-and-events",
        },
      },
      {
        menuItem: {
          label: "SÉMINAIRES ET ATELIERS",
          display_order: 3,
          url: "/news/seminars-and-workshops",
        },
      },
      {
        menuItem: {
          label: "VOYAGES D’ÉTUDES ET MISSIONS",
          display_order: 4,
          url: "/news/study-trips-and-missions",
        },
      },
      {
        menuItem: {
          label: "ANNONCES ET COMMUNIQUÉS",
          display_order: 5,
          url: "/news/announcements-and-press-releases",
        },
      },
    ],
  },
  {
    menuItem: {
      label: "THEMATIQUES",
      description: "Toutes les thématiques des publications de l'INSEED",
      display_order: 2,
      url: "/themes",
    },
    children: [
      {
        menuItem: {
          label: "STATISTIQUES ÉCONOMIQUES",
          display_order: 1,
          url: "/publications?theme=100+101+102+103+104+105+106",
        },
        children: [
          {
            menuItem: {
              label: "COMPTES NATIONAUX",
              display_order: 1,
              url: "/publications?theme=103",
            },
          },
          {
            menuItem: {
              label: "STATISTIQUES CONJONCTURELLES",
              display_order: 2,
              url: "/publications?theme=102",
            },
          },
          {
            menuItem: {
              label: "COMMERCES EXTÉRIEURS",
              display_order: 3,
              url: "/publications?theme=106",
            },
          },
          {
            menuItem: {
              label: "STATISTIQUES D’ENTREPRISES",
              display_order: 4,
              url: "/publications?theme=600+601+602+603",
            },
          },
          {
            menuItem: {
              label: "SYNTHÈSE ÉCONOMIQUE",
              display_order: 5,
              url: "/publications?theme=101+103+104",
            },
          },
          // {
          //   menuItem: {
          //     label: "CROISSANCE ÉCONOMIQUE",
          //     display_order: 6,
          //     url: "/themes/economic-statistics/economic-growth",
          //   },
          // },
        ],
      },
      {
        menuItem: {
          label: "STATISTIQUES DÉMOGRAPHIQUES",
          display_order: 2,
          url: "/publications?theme=200+201+202+203+205+204+206",
        },
        children: [
          {
            menuItem: {
              label: "POPULATION",
              display_order: 1,
              url: "/publications?theme=201",
            },
          },
          {
            menuItem: {
              label: "NAISSANCES – FÉCONDITÉ",
              display_order: 2,
              url: "/publications?theme=202",
            },
          },
          {
            menuItem: {
              label: "DÉCÈS – MORTALITÉ – ESPÉRANCE DE VIE",
              display_order: 3,
              url: "/publications?theme=203",
            },
          },
          {
            menuItem: {
              label: "MIGRATION – URBANISATION",
              display_order: 4,
              url: "/publications?theme=204",
            },
          },
          {
            menuItem: {
              label: "SANTÉ MATRIMONIALE – NUPTIALITÉ",
              display_order: 5,
              url: "/publications?theme=205",
            },
          },
          {
            menuItem: {
              label: "SCOLARISATION, ALPHABÉTISATION ET NIVEAU D’INSTRUCTION",
              display_order: 6,
              url: "/publications?theme=206",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "STATISTIQUES SOCIALES",
          display_order: 3,
          url: "/publications?theme=400+401+402+403+405+406+407+408+500+501+502+503",
        },
        children: [
          {
            menuItem: {
              label: "REVENUS – POUVOIR D'ACHAT – CONSOMMATION",
              display_order: 1,
              url: "/publications?theme=300+301+302+303+304+305",
            },
          },
          {
            menuItem: {
              label: "PAUVRETÉ ET CONDITION DE VIE",
              display_order: 2,
              url: "/publications?theme=400+401+402+403+405+406+407+408",
            },
          },
          {
            menuItem: {
              label: "EMPLOI ET TRAVAIL",
              display_order: 3,
              url: "/publications?theme=500+501+502+503",
            },
          },
          {
            menuItem: {
              label: "ÉDUCATION",
              display_order: 4,
              url: "/publications?theme=402+206",
            },
          },
          {
            menuItem: {
              label: "HABITAT ET CADRE DE VIE",
              display_order: 5,
              url: "/publications?theme=304+305+403+406+408",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "ANNUAIRES STATISTIQUES",
          display_order: 4,
          url: "/information/statistical-yearbooks",
        },
        children: [
          {
            menuItem: {
              label: "ANNUAIRE STATISTIQUE NATIONAL",
              display_order: 1,
              url: "/information/national-statistical-yearbook",
            },
          },
          {
            menuItem: {
              label: "ANNUAIRE STATISTIQUE SANITAIRE",
              display_order: 2,
              url: "/information/health-data-book",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "DÉFINITIONS ET MÉTHODES",
          display_order: 5,
          url: "/information/definitions-and-methods",
        },
         children: [
          {
            menuItem: {
              label: "DÉFINITIONS",
              display_order: 1,
              url: "/information/definitions",
            },
          },
          {
            menuItem: {
              label: "SOURCES STATISTIQUES ET INDICATEURS",
              display_order: 2,
              url: "/information/statistical-sources-and-indicators",
            },
          },
          {
            menuItem: {
              label: "NOMENCLATURES",
              display_order: 3,
              url: "/information/nomenclatures",
            },
          },
          {
            menuItem: {
              label: "MODÈLES, MÉTHODES ET OUTILS STATISTIQUES",
              display_order: 4,
              url: "/information/statistical-models-methods-and-tools",
            },
          },
        ],
      },
    ],
  },
  // {
  //   menuItem: {
  //     label: "SYSTÈME STATISTIQUE",
  //     description:
  //       "Fonctionnement et spécifités du système statistique national",
  //     display_order: 5,
  //     url: "/nss",
  //   },
  //   children: [
  //     {
  //       menuItem: {
  //         label: "GÉNÉRALITÉS SUR LES COMORES",
  //         display_order: 1,
  //         url: "/nss/general-information-about-the-comoros",
  //       },
  //     },
  //     {
  //       menuItem: {
  //         label: "TEXTES RÉGLEMENTAIRES",
  //         display_order: 2,
  //         url: "/nss/regulatory-texts",
  //       },
  //     },
  //     {
  //       menuItem: {
  //         label: "DIAGNOSTIC DU SYSTÈME STATISTIQUE",
  //         display_order: 3,
  //         url: "/nss/statistical-system-diagnosis",
  //       },
  //     },
  //     {
  //       menuItem: {
  //         label: "DOCUMENTS ET RAPPORTS",
  //         display_order: 4,
  //         url: "/nss/documents-and-reports",
  //       },
  //     },
  //   ],
  // },
  {
    menuItem: {
      label: "PUBLICATIONS",
      description: "Toutes les publications de l'INSEED",
      display_order: 3,
      url: "",
    },
    children: [
      {
        menuItem: {
          label: "BASE DE DONNÉES DES PUBLICATIONS",
          description:"Retrouvez ci-dessous les recherches les plus fréquentes",
          display_order: 1,
          url: "/publications",
        },
        children: [
          {
            menuItem: {
              label: "NOTES ET POINTS DE CONJONCTURE",
              display_order: 1,
              url: "/publications?collection=80",
            },
          },
          {
            menuItem: {
              label: "BULLETIN MENSUEL DE L’INDICE DE PRIX A LA CONSOMMATION",
              display_order: 2,
              url: "/publications?theme=105",
            },
          },
          {
            menuItem: {
              label: "ÉCONOMIE ET STATISTIQUE",
              display_order: 3,
              url: "/publications?collection=60",
            },
          },
          {
            menuItem: {
              label: "SÉRIES CHRONOLOGIQUES",
              display_order: 4,
              url: "/publications?category=14",
            },
          },
          // {
          //   menuItem: {
          //     label: "STATISTIQUE DU COMMERCE EXTÉRIEUR",
          //     display_order: 5,
          //     url: "/publications/foreign-trade-statistics",
          //   },
          // },
          {
            menuItem: {
              label: "PHOTOÈQUE",
              display_order: 6,
              url: "/publications/photo-library",
            },
          },
          {
            menuItem: {
              label: "VIDÉOTHÈQUE",
              display_order: 7,
              url: "/publications/video-library",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "ÉTUDES ET PROJETS",
          display_order: 2,
          url: "/information/studies-and-projects",
        },
        children: [
          {
            menuItem: {
              label: "MÉTHODOLOGIE",
              display_order: 1,
              url: "/information/methodology",
            },
          },
          {
            menuItem: {
              label: "RAPPORTS D'ANALYSES",
              display_order: 2,
              url: "/publications?collection=50",
            },
          },
          {
            menuItem: {
              label: "PROJET STATCAP-KM",
              display_order: 3,
              url: "/information/statcap-km",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "ENQUÊTES ET RECENSEMENTS",
          display_order: 3,
          url: "/publications?collection=40",
        },
        children: [
          // {
          //   menuItem: {
          //     label: "EHCVM – 2024",
          //     display_order: 1,
          //     url: "/publications/surveys-and-censuses/ehcvm-2024",
          //   },
          // },
          {
            menuItem: {
              label: "MICS – 2022",
              display_order: 2,
              url: "https://www.nada.inseed-comores.org/index.php/catalog/16",
            },
          },
          {
            menuItem: {
              label: "EEIC – 2021",
              display_order: 3,
              url: "https://www.nada.inseed-comores.org/index.php/catalog/12",
            },
          },
          {
            menuItem: {
              label: "EHCVM – 2020",
              display_order: 4,
              url: "https://www.nada.inseed-comores.org/index.php/catalog/13",
            },
          },
          {
            menuItem: {
              label: "RGPH – 2017",
              display_order: 5,
              url: "https://www.nada.inseed-comores.org/index.php/catalog/17",
            },
          },
          {
            menuItem: {
              label: "EDS-MICS – 2012",
              display_order: 6,
              url: "/publications/surveys-and-censuses/eds-mics-2012",
            },
          },
        ],
      },
    ],
  },
  {
    menuItem: {
      label: "PORTAILS",
      description: "Tous les portails de données",
      display_order: 6,
      url: "/portails",
    },
    children: [
      {
        menuItem: {
          label: "COMOROS DATA PORTAL",
          display_order: 1,
          url: "https://comoros.opendataforafrica.org/",
        },
      },
      {
        menuItem: {
          label: "OPENDATA COMORES",
          display_order: 2,
          url: "https://opendata-comores.org/",
        },
      },
      {
        menuItem: {
          label: "ARCHIVE NATIONAL DONNÉES",
          display_order: 3,
          url: "https://www.nada.inseed-comores.org/",
        },
      },
    ],
  },
  {
    menuItem: {
      label: "CONTACT",
      description: "Liste des contacts",
      display_order: 7,
      url: "/contact",
    },
  },
];

async function createMenusElement(
  menuElement: MenuItemType,
  parentId: string | null
) {
  // create menu

  const newMenu = await prisma.menuItem.create({
    data: {
      label: menuElement.menuItem.label,
      ...(menuElement.menuItem.description
        ? { description: menuElement.menuItem.description }
        : {}),
      url: menuElement.menuItem.url,
      display_order: menuElement.menuItem.display_order,
      ...(parentId ? { parentId: parentId } : {}),
      ...(menuElement.menuItem.type
        ? { type: menuElement.menuItem.type }
        : {}),
    },
  });

  if (!menuElement.children) return;

  menuElement.children.forEach((child) =>
    createMenusElement(child, newMenu.id)
  );
}

async function main() {
  menus.forEach((menu) => {
    createMenusElement(menu, null);
  });

  footer.forEach((menu) => {
    createMenusElement(menu, null);
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });



