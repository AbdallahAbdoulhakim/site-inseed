import client from "@/lib/strapi";

import Publications from "@/components/public/publications/Publications";

import { splitNumbersFromString } from "@/lib/miscellaneous";

export default async function PublicationsDatabase({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const publicationThemes = client.collection("publication-themes");
  const publicationGeos = client.collection("publication-geos");
  const publicationCategories = client.collection("publication-categories");
  const publicationCollections = client.collection("publication-collections");

  const publications = client.collection("publications");

  const { page, theme, geo, category, collection } = await searchParams;

  const themeTagsArr = splitNumbersFromString(theme) ?? [];
  const geoTagsArr = splitNumbersFromString(geo) ?? [];
  const categoryTagsArr = splitNumbersFromString(category) ?? [];
  const collectionTagsArr = splitNumbersFromString(collection) ?? [];

  const filters = () => {
    if (
      themeTagsArr.length === 0 &&
      geoTagsArr.length === 0 &&
      categoryTagsArr.length === 0 &&
      collectionTagsArr.length === 0
    )
      return {};

    let result: { $and: any[] } = { $and: [] };

    if (themeTagsArr.length > 0) {
      result.$and.push({
        publication_themes: {
          norder: { $in: themeTagsArr },
        },
      });
    }

    if (geoTagsArr.length > 0) {
      result.$and.push({
        publication_geos: {
          norder: { $in: geoTagsArr },
        },
      });
    }

    if (categoryTagsArr.length > 0) {
      result.$and.push({
        publication_categories: {
          norder: { $in: categoryTagsArr },
        },
      });
    }

    if (collectionTagsArr.length > 0) {
      result.$and.push({
        publication_collections: {
          norder: { $in: collectionTagsArr },
        },
      });
    }

    return result;
  };

  const { data: publicationsList } = await publications.find({
    populate: {
      paragraphs: {
        fields: ["title", "link", "content", "norder", "inSummary"],
        populate: {
          table_graph: {
            fields: ["content", "norder"],
            populate: {
              graphic: {
                fields: ["dataurl", "type", "legend", "norder"],
                populate: {
                  datafile: {
                    fields: ["name", "url"],
                  },
                },
              },
            },
          },
        },
      },
      graphics: {
        fields: ["dataurl", "type", "legend", "norder"],
        populate: {
          datafile: {
            fields: ["name", "url"],
          },
        },
      },
      publication_categories: {
        fields: ["name", "slug", "norder"],
      },
      publication_collections: {
        fields: ["name", "slug", "norder"],
      },
      publication_themes: {
        fields: ["name", "slug", "norder"],
      },
      publication_geos: {
        fields: ["name", "slug", "norder"],
      },
    },
    filters: filters(),
  });

  console.log(publicationsList);

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
      initialThemeTags={theme}
      initialGeoTags={geo}
      initialCategoryTags={category}
      initialCollectionTags={collection}
    />
  );
}
