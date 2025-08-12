import prisma from "@/lib/prisma";

type MenuItem = {
  label: string;
  description?: string;
  display_order: number;
  url: string;
};

type MenuItemType = {
  menuItem: MenuItem;
  children?: { menuItem: MenuItem; children?: MenuItemType[] }[];
};

const menus: MenuItemType[] = [
  {
    menuItem: {
      label: "L'INSEED",
      description: "Connaître l'INSEED",
      display_order: 1,
      url: "/inseed",
    },
    children: [
      {
        menuItem: {
          label: "CONNAÎTRE L’INSEED",
          display_order: 8,
          url: "/inseed/know-inseed",
        },
        children: [],
      },
      {
        menuItem: {
          label: "UN PEU D’HISTOIRE",
          display_order: 7,
          url: "/inseed/story",
        },
        children: [],
      },
      {
        menuItem: {
          label: "MOT DU DIRECTEUR GÉNÉRAL",
          display_order: 6,
          url: "/inseed/word-from-general-manager",
        },
        children: [],
      },
      {
        menuItem: {
          label: "LES ACTIVITÉS DE L’INSEED",
          display_order: 1,
          url: "/inseed/activities",
        },
        children: [
          {
            menuItem: {
              label: "ETABLIR LES DIAGNOSTICS CONJONCTURELS",
              display_order: 1,
              url: "/inseed/activities/establishing-economic-diagnoses",
            },
          },
          {
            menuItem: {
              label: "CONNAITRE LE SYSTÈME PRODUCTIF",
              display_order: 2,
              url: "/inseed/activities/know-the-productive-system",
            },
          },
          {
            menuItem: {
              label: "OBSERVER L’ÉVOLUTION DE LA SOCIÉTÉ",
              display_order: 3,
              url: "/inseed/activities/observing-the-evolution-of-society",
            },
          },
          {
            menuItem: {
              label: "REALISER LE RECENSEMENT DE LA POPULATION",
              display_order: 4,
              url: "/inseed/activities/conduct-the-population-census",
            },
          },
          {
            menuItem: {
              label: "DÉCRIRE ET ANALYSER LES RÉGIONS ET LES TERRITOIRES",
              display_order: 5,
              url: "/inseed/activities/describe-and-analyze-regions-and-territories",
            },
          },
          {
            menuItem: {
              label: "GÉRER DES GRANDS RÉPERTOIRES",
              display_order: 6,
              url: "/inseed/activities/manage-large-directories",
            },
          },
          {
            menuItem: {
              label: "DIFFUSER SES STATISTIQUES ET SES ETUDES",
              display_order: 7,
              url: "/inseed/activities/disseminate-your-statistics-and-studies",
            },
          },
          {
            menuItem: {
              label: "PERFECTIONNER SES MÉTHODES ET EVALUER LA QUALITÉ",
              display_order: 8,
              url: "/inseed/activities/improve-your-methods-and-evaluate-quality",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "ORGANISATION ET FONCTIONNEMENT",
          display_order: 5,
          url: "/inseed/organization-and-operation",
        },
        children: [],
      },
      {
        menuItem: {
          label: "PLANNIFICATION STRATÉGIQUE",
          display_order: 4,
          url: "/inseed/strategic-planning",
        },
        children: [
          {
            menuItem: {
              label: "PLAN D’ACTIONS",
              display_order: 1,
              url: "/inseed/strategic-planning/action-plan",
            },
          },
          {
            menuItem: {
              label: "RAPPORT D’ACTIVITÉS",
              display_order: 2,
              url: "/inseed/strategic-planning/activity-report",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "LA STATISTIQUE PUBLIQUE",
          display_order: 2,
          url: "/inseed/public-statistics",
        },
        children: [
          {
            menuItem: {
              label: "CADRE JURIDIQUE ET INSTITUTIONNEL",
              display_order: 1,
              url: "/inseed/public-statistics/legal-and-institutional-framework",
            },
          },
          {
            menuItem: {
              label: "LE SERVICE STATISTIQUE PUBLIC",
              display_order: 2,
              url: "/inseed/public-statistics/the-public-statistical-service",
            },
          },
          {
            menuItem: {
              label: "SECRET STATISTIQUE ET PROTECTION DES DONNÉES",
              display_order: 3,
              url: "/inseed/public-statistics/statistical-secrecy-and-data-protection",
            },
          },
          {
            menuItem: {
              label: "ACCÈS AUX DONNÉES PUBLIQUES",
              display_order: 4,
              url: "/inseed/public-statistics/access-to-public-data",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "L’INSEED DANS LE SYSTÈME STATISTIQUE AFRICAIN",
          display_order: 3,
          url: "/inseed/inseed-in-the-african-statistical-system",
        },
        children: [
          {
            menuItem: {
              label: "TEXTES DE RÉFÉRENCE",
              display_order: 1,
              url: "/inseed/inseed-in-the-african-statistical-system/reference-texts",
            },
          },
          {
            menuItem: {
              label: "LE PROJET DE LA CHARTE AFRICAINE DE LA STATISTIQUE",
              display_order: 2,
              url: "/inseed/inseed-in-the-african-statistical-system/the-draft-african-charter-on-statistics",
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
          url: "/themes/economic-statistics",
        },
        children: [
          {
            menuItem: {
              label: "COMPTES NATIONAUX",
              display_order: 1,
              url: "/themes/economic-statistics/national-accounts",
            },
          },
          {
            menuItem: {
              label: "STATISTIQUES CONJONCTURELLES",
              display_order: 2,
              url: "/themes/economic-statistics/conjunctural-statistics",
            },
          },
          {
            menuItem: {
              label: "COMMERCES EXTÉRIEURS",
              display_order: 3,
              url: "/themes/economic-statistics/foreign-trade",
            },
          },
          {
            menuItem: {
              label: "STATISTIQUES D’ENTREPRISES",
              display_order: 4,
              url: "/themes/economic-statistics/business-statistics",
            },
          },
          {
            menuItem: {
              label: "SYNTHÈSE ÉCONOMIQUE",
              display_order: 5,
              url: "/themes/economic-statistics/economic-summary",
            },
          },
          {
            menuItem: {
              label: "CROISSANCE ÉCONOMIQUE",
              display_order: 6,
              url: "/themes/economic-statistics/economic-growth",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "STATISTIQUES DÉMOGRAPHIQUES",
          display_order: 2,
          url: "/themes/demographic-statistics",
        },
        children: [
          {
            menuItem: {
              label: "POPULATION",
              display_order: 1,
              url: "/themes/demographic-statistics/population",
            },
          },
          {
            menuItem: {
              label: "NATALITÉ",
              display_order: 2,
              url: "/themes/demographic-statistics/birth-rate",
            },
          },
          {
            menuItem: {
              label: "FÉCONDITÉ",
              display_order: 3,
              url: "/themes/demographic-statistics/fertility",
            },
          },
          {
            menuItem: {
              label: "MORTALITÉ",
              display_order: 4,
              url: "/themes/demographic-statistics/mortality",
            },
          },
          {
            menuItem: {
              label: "MIGRATION ET URBANISATION",
              display_order: 5,
              url: "/themes/demographic-statistics/migration-and-urbanization",
            },
          },
          {
            menuItem: {
              label: "SCOLARISATION, ALPHABÉTISATION ET NIVEAU D’INSTRUCTION",
              display_order: 6,
              url: "/themes/demographic-statistics/schooling-literacy-and-educational-level",
            },
          },
          {
            menuItem: {
              label: "SANTÉ MATRIMONIALE ET NUPTIALITÉ",
              display_order: 7,
              url: "/themes/demographic-statistics/marital-health-and-marriage",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "STATISTIQUES SOCIALES",
          display_order: 3,
          url: "/themes/social-statistics",
        },
        children: [
          {
            menuItem: {
              label: "INDICATEURS GÉNÉRAUX",
              display_order: 1,
              url: "/themes/demographic-statistics/general-indicators",
            },
          },
          {
            menuItem: {
              label: "PAUVRETÉ ET CONDITION DE VIE",
              display_order: 2,
              url: "/themes/demographic-statistics/poverty-and-living-conditions",
            },
          },
          {
            menuItem: {
              label: "EMPLOI ET TRAVAIL",
              display_order: 3,
              url: "/themes/demographic-statistics/employment-and-labor",
            },
          },
          {
            menuItem: {
              label: "ÉDUCATION",
              display_order: 4,
              url: "/themes/demographic-statistics/education",
            },
          },
          {
            menuItem: {
              label: "HABITAT ET CADRE DE VIE",
              display_order: 5,
              url: "/themes/demographic-statistics/housing-and-living-environment",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "ANNUAIRES STATISTIQUES",
          display_order: 4,
          url: "/themes/statistical-directories",
        },
        children: [
          {
            menuItem: {
              label: "ANNUAIRE STATISTIQUE NATIONAL",
              display_order: 1,
              url: "/themes/statistical-directories/national-statistical-directory",
            },
          },
          {
            menuItem: {
              label: "ANNUAIRE STATISTIQUE SANITAIRE",
              display_order: 2,
              url: "/themes/statistical-directories/health-statistical-directory",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "DÉFINITIONS, MÉTHODES ET QUALITÉ",
          display_order: 5,
          url: "/themes/definitions-methods-and-quality",
        },
      },
    ],
  },
  {
    menuItem: {
      label: "SYSTÈME STATISTIQUE",
      description:
        "Fonctionnement et spécifités du système statistique national",
      display_order: 5,
      url: "/nss",
    },
    children: [
      {
        menuItem: {
          label: "GÉNÉRALITÉS SUR LES COMORES",
          display_order: 1,
          url: "/nss/general-information-about-the-comoros",
        },
      },
      {
        menuItem: {
          label: "TEXTES RÉGLEMENTAIRES",
          display_order: 2,
          url: "/nss/regulatory-texts",
        },
      },
      {
        menuItem: {
          label: "DIAGNOSTIC DU SYSTÈME STATISTIQUE",
          display_order: 3,
          url: "/nss/statistical-system-diagnosis",
        },
      },
      {
        menuItem: {
          label: "DOCUMENTS ET RAPPORTS",
          display_order: 4,
          url: "/nss/documents-and-reports",
        },
      },
    ],
  },
  {
    menuItem: {
      label: "PUBLICATIONS",
      description: "Toutes les publications de l'INSEED",
      display_order: 3,
      url: "/publications",
    },
    children: [
      {
        menuItem: {
          label: "BASE DE DONNÉES DES PUBLICATIONS",
          display_order: 1,
          url: "/publications/publications-database",
        },
        children: [
          {
            menuItem: {
              label: "BULLETIN DE CONJONCTURE",
              display_order: 1,
              url: "/publications/publications-database/economic-bulletin",
            },
          },
          {
            menuItem: {
              label: "BULLETIN MENSUEL DE L’INDICE DE PRIX A LA CONSOMMATION",
              display_order: 2,
              url: "/publications/publications-database/monthly-consumer-price-index-report",
            },
          },
          {
            menuItem: {
              label: "COMPTES NATIONAUX ET ÉTUDES ÉCONOMIQUES",
              display_order: 3,
              url: "/publications/publications-database/national-accounts-and-economic-studies",
            },
          },
          {
            menuItem: {
              label: "NOTES DE CONJONCTURE",
              display_order: 4,
              url: "/publications/publications-database/memo-on-the-economy",
            },
          },
          {
            menuItem: {
              label: "STATISTIQUE DU COMMERCE EXTÉRIEUR",
              display_order: 5,
              url: "/publications/publications-database/foreign-trade-statistics",
            },
          },
          {
            menuItem: {
              label: "PHOTOÈQUE",
              display_order: 6,
              url: "/publications/publications-database/photo-library",
            },
          },
          {
            menuItem: {
              label: "VIDÉOTHÈQUE",
              display_order: 7,
              url: "/publications/publications-database/video-library",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "ÉTUDES ET PROJETS",
          display_order: 2,
          url: "/publications/studies-and-projects",
        },
        children: [
          {
            menuItem: {
              label: "MÉTHODOLOGIE",
              display_order: 1,
              url: "/publications/studies-and-projects/methodology",
            },
          },
          {
            menuItem: {
              label: "ANALYSES",
              display_order: 2,
              url: "/publications/studies-and-projects/analyses",
            },
          },
          {
            menuItem: {
              label: "PROJET STATCAP-KM",
              display_order: 3,
              url: "/publications/studies-and-projects/statcap-km",
            },
          },
        ],
      },
      {
        menuItem: {
          label: "ENQUÊTES ET RECENSEMENTS",
          display_order: 3,
          url: "/publications/surveys-and-censuses",
        },
        children: [
          {
            menuItem: {
              label: "EHCVM – 2024",
              display_order: 1,
              url: "/publications/surveys-and-censuses/ehcvm-2024",
            },
          },
          {
            menuItem: {
              label: "MICS – 2022",
              display_order: 2,
              url: "/publications/surveys-and-censuses/mics-2022",
            },
          },
          {
            menuItem: {
              label: "EEIC – 2021",
              display_order: 3,
              url: "/publications/surveys-and-censuses/eeic-2021",
            },
          },
          {
            menuItem: {
              label: "EHCVM – 2020",
              display_order: 4,
              url: "/publications/surveys-and-censuses/ehcvm-2020",
            },
          },
          {
            menuItem: {
              label: "RGPH – 2017",
              display_order: 5,
              url: "/publications/surveys-and-censuses/rgph-2017",
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
