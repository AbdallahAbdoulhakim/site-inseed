import ArticlePage from "@/components/public/ArticlePage";
import { truncateString } from "@/lib/miscellaneous";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

export default async function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { search } = await searchParams;

  const { articleId } = await params;

  const articles = client.collection("articles");

  const categories = client.collection("categories");

  const tags = client.collection("tags");

  const { data: response } = await articles.find({
    filters: {
      slug: articleId,
    },
    populate: {
      thumbnail: {
        fields: ["name", "url"],
      },
      images: {
        fields: ["name", "url"],
      },
      category: {
        fields: ["name", "slug"],
      },
      author: {
        fields: ["name", "description", "facebook", "instagram", "twitter"],
        populate: {
          image: {
            fields: ["name", "url"],
          },
        },
      },
      tags: {
        fields: ["name", "slug"],
      },
    },
  });

  const { data: listCategories } = await categories.find({
    populate: {
      articles: {
        fields: ["title"],
      },
    },
  });

  const { data: listTags } = await tags.find({
    fields: ["name", "slug"],
  });

  const { data: latestArticles } = await articles.find({
    sort: "publicationDate:desc",
    pagination: {
      pageSize: 5,
    },
    fields: ["title", "publicationDate", "slug"],
    populate: {
      thumbnail: {
        fields: ["name", "url"],
      },
      category: {
        fields: ["slug"],
      },
    },
  });

  let searchResults = null;

  if (search) {
    const searchResponse = await articles.find({
      sort: "publicationDate:desc",
      filters: {
        title: { $containsi: search },
      },
      pagination: {
        pageSize: 10,
      },
      fields: ["title", "publicationDate", "slug"],
      populate: {
        thumbnail: {
          fields: ["name", "url"],
        },
        category: {
          fields: ["slug"],
        },
      },
    });
    searchResults = searchResponse.data;
  }

  if (response.length < 1 || !response) notFound();

  const article = response[0];

  const imgUrls: { name: string; url: string; id: string }[] = [];

  imgUrls.push({
    id: article?.thumbnail ? article.thumbnail.documentId : uuid(),
    url: article.thumbnail?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.thumbnail.url}`
      : "/416x312.svg",
    name: article?.thumbnail ? article.thumbnail.name : article.title,
  });

  if (article?.images?.length > 1) {
    article.images.forEach(
      (img: { documentId: string; url: string; name: string }) => {
        imgUrls.push({
          id: img.documentId,
          url: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${img.url}`,
          name: img.name,
        });
      }
    );
  }

  const contentData = {
    id: article.id,
    category: article.category?.name,
    categorySlug: article.category?.slug,
    images: imgUrls,
    title: article.title,
    content: article.content,
    tags: article.tags
      ? article.tags.map((tag: { [key: string]: string; name: string }) => {
          return { name: tag.name, slug: tag.slug };
        })
      : [],
    articleSlug: `/news/${article?.category.slug || "default"}/${article.slug}`,
    author: article.author?.name,
    authorImg: article.author?.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.author.image.url}`
      : "/default_avatar.png",
    authorDesc: article.author?.description,
    authorFacebook: article.author?.facebook,
    authorInstagram: article.author?.instagram,
    authorTwitter: article.author?.twitter,
    publicationDate: article.publicationDate
      ? article.publicationDate
      : article.createdAt,
  };

  const categoriesCount: {
    id: string;
    name: string;
    articles: number;
    slug: string;
  }[] = listCategories.map((cat) => {
    return {
      id: cat.documentId,
      name: cat.name,
      articles: cat.articles ? cat.articles.length : 0,
      slug: cat.slug,
    };
  });

  const articlesList =
    search === undefined
      ? latestArticles.map((article) => {
          return {
            id: article.documentId,
            publicationDate: article.publicationDate,
            thumbnail: article.thumbnail?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.thumbnail.url}`
              : "/416x312.svg",
            title: truncateString(article.title, 110),
            slug: article.slug,
            categorySlug: article.category.slug,
          };
        })
      : !searchResults || searchResults.length == 0
      ? []
      : searchResults?.map((article) => {
          return {
            id: article.documentId,
            publicationDate: article.publicationDate,
            thumbnail: article.thumbnail?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.thumbnail.url}`
              : "/416x312.svg",
            title: truncateString(article.title, 110),
            slug: article.slug,
            categorySlug: article.category.slug,
          };
        });

  const tagsList = listTags.map((tag) => {
    return {
      id: tag.documentId,
      name: tag.name,
      slug: tag.slug,
    };
  });

  return (
    <ArticlePage
      contentData={contentData}
      categoriesCount={categoriesCount}
      articlesList={articlesList}
      tagsList={tagsList}
    />
  );
}
