import client from "@/lib/strapi";

import Publications from "@/components/public/publications/Publications";

import { ITEM_PER_PAGE } from "@/lib/settings";

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

  const queryPage = page ? parseInt(page) : 1;

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

  const { data: publicationsList, meta } = await publications.find({
    fields: [
      "short",
      "abstract",
      "title",
      "type",
      "parutionDate",
      "parutionNumber",
      "publicationSlug",
    ],
    sort: "parutionDate:desc",
    pagination: {
      page: queryPage,
      pageSize: ITEM_PER_PAGE,
    },
    populate: {
      publication_categories: {
        fields: ["norder"],
      },
      publication_collections: {
        fields: ["norder"],
      },
      publication_themes: {
        fields: ["norder"],
      },
      publication_geos: {
        fields: ["norder"],
      },
    },
    filters: filters(),
  });

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

  const listOfPublications = publicationsList.map((publication) => ({
    id: publication.id,
    documentId: publication.documentId,
    title: publication.title,
    short: publication.short,
    abstract: publication?.abstract,
    type: publication.type,
    parutionDate: publication?.parutionDate,
    parutionNumber: publication?.parutionNumber,
    publicationSlug: publication.publicationSlug,
  }));

  const count = meta.pagination?.total ?? 0;

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
      publicationsList={listOfPublications}
      resultsCount={count}
      page={queryPage}
    />
  );
}
