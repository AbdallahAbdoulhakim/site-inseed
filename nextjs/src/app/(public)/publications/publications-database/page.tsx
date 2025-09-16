import client from "@/lib/strapi";

import Publications from "@/components/public/publications/Publications";

export default async function PublicationsDatabase({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const publicationThemes = client.collection("publication-themes");
  const publicationGeos = client.collection("publication-geos");
  const publicationCategories = client.collection("publication-categories");
  const publicationCollections = client.collection("publication-collections");

  const { page, search, theme, geo, category, collection } = await searchParams;

  const { data: themesList } = await publicationThemes.find({
    filters: {
      parent: { $null: true },
    },
    fields: ["name", "slug", "norder"],
    populate: {
      children: {
        fields: ["name", "slug", "norder"],
        populate: {
          publications: {
            fields: ["documentId"],
          },
        },
      },
      publications: {
        fields: ["documentId"],
      },
    },
  });

  const { data: geoList } = await publicationGeos.find({
    filters: {
      parent: { $null: true },
    },
    fields: ["name", "slug", "norder"],
    populate: {
      children: {
        fields: ["name", "slug", "norder"],
        populate: {
          publications: {
            fields: ["documentId"],
          },
        },
      },
      publications: {
        fields: ["documentId"],
      },
    },
  });

  const { data: categoriesList } = await publicationCategories.find({
    filters: {
      parent: { $null: true },
    },
    fields: ["name", "slug", "norder"],
    populate: {
      children: {
        fields: ["name", "slug", "norder"],
        populate: {
          publications: {
            fields: ["documentId"],
          },
        },
      },
      publications: {
        fields: ["documentId"],
      },
    },
  });

  const { data: collectionList } = await publicationCollections.find({
    filters: {
      parent: { $null: true },
    },
    fields: ["name", "slug", "norder"],
    populate: {
      children: {
        fields: ["name", "slug", "norder"],
        populate: {
          publications: {
            fields: ["documentId"],
          },
        },
      },
      publications: {
        fields: ["documentId"],
      },
    },
  });

  const themes = themesList.map((theme) => {
    return {
      id: theme.documentId,
      name: theme.name,
      slug: theme.slug,
      norder: theme.norder,
      publications: theme?.publications ? theme.publications.length : 0,
      children: theme?.children
        ? theme.children.map(
            (child: {
              id: string;
              name: string;
              slug: string;
              norder: number;
              publications: { documentId: string }[];
            }) => {
              return {
                id: child.id,
                name: child.name,
                slug: child.slug,
                norder: child.norder,
                publications: child?.publications
                  ? child.publications.length
                  : 0,
              };
            }
          )
        : [],
    };
  });

  const geos = geoList.map((theme) => {
    return {
      id: theme.documentId,
      name: theme.name,
      slug: theme.slug,
      norder: theme.norder,
      publications: theme?.publications ? theme.publications.length : 0,
      children: theme?.children
        ? theme.children.map(
            (child: {
              id: string;
              name: string;
              slug: string;
              norder: number;
              publications: { documentId: string }[];
            }) => {
              return {
                id: child.id,
                name: child.name,
                slug: child.slug,
                norder: child.norder,
                publications: child?.publications
                  ? child.publications.length
                  : 0,
              };
            }
          )
        : [],
    };
  });

  const categories = categoriesList.map((theme) => {
    return {
      id: theme.documentId,
      name: theme.name,
      slug: theme.slug,
      norder: theme.norder,
      publications: theme?.publications ? theme.publications.length : 0,
      children: theme?.children
        ? theme.children.map(
            (child: {
              id: string;
              name: string;
              slug: string;
              norder: number;
              publications: { documentId: string }[];
            }) => {
              return {
                id: child.id,
                name: child.name,
                slug: child.slug,
                norder: child.norder,
                publications: child?.publications
                  ? child.publications.length
                  : 0,
              };
            }
          )
        : [],
    };
  });

  const collections = collectionList.map((theme) => {
    return {
      id: theme.documentId,
      name: theme.name,
      slug: theme.slug,
      norder: theme.norder,
      publications: theme?.publications ? theme.publications.length : 0,
      children: theme?.children
        ? theme.children.map(
            (child: {
              id: string;
              name: string;
              slug: string;
              norder: number;
              publications: { documentId: string }[];
            }) => {
              return {
                id: child.id,
                name: child.name,
                slug: child.slug,
                norder: child.norder,
                publications: child?.publications
                  ? child.publications.length
                  : 0,
              };
            }
          )
        : [],
    };
  });

  return (
    <Publications
      themes={themes}
      geos={geos}
      categories={categories}
      collections={collections}
    />
  );
}
