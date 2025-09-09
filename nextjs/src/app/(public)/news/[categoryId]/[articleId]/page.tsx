import ArticlePage from "@/components/public/ArticlePage";
import { truncateString } from "@/lib/miscellaneous";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

export default async function NewsArticle({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  const articles = client.collection("articles");

  const categories = client.collection("categories");

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
    },
  });

  const { data: listCategories } = await categories.find({
    populate: {
      articles: {
        fields: ["title"],
      },
    },
  });

  const { data: latestArticles } = await articles.find({
    sort: "publicationDate:desc",
    pagination: {
      pageSize: 5,
    },
    fields: ["title", "publicationDate"],
    populate: {
      thumbnail: {
        fields: ["name", "url"],
      },
    },
  });

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

  const articlesList = latestArticles.map((article) => {
    return {
      id: article.documentId,
      publicationDate: article.publicationDate,
      thumbnail: article.thumbnail?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.thumbnail.url}`
        : "/416x312.svg",
      title: truncateString(article.title, 110),
    };
  });

  return (
    <ArticlePage
      contentData={contentData}
      categoriesCount={categoriesCount}
      articlesList={articlesList}
    />
  );
}
