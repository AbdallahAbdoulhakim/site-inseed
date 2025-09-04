import CategoryArticles from "@/components/public/CategoryArticles";
import { truncateString } from "@/lib/miscellaneous";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";

export default async function NewsCategory({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  const categories = client.collection("categories");

  const { data: category } = await categories.find({
    filters: {
      slug: categoryId,
    },
  });

  if (category.length < 1 || !category) notFound();

  const articles = client.collection("articles");

  const { data: articlesList } = await articles.find({
    filters: {
      category: {
        documentId: category[0].documentId,
      },
    },
    sort: "publicationDate:desc",
    pagination: {
      limit: 10,
    },
    populate: {
      thumbnail: {
        fields: ["name", "url"],
      },
      category: {
        fields: ["name", "slug"],
      },
      author: {
        fields: ["name"],
        populate: {
          image: {
            fields: ["name", "url"],
          },
        },
      },
    },
  });

  if (!articlesList.length) return;

  const data = articlesList.map((article, index) => {
    return {
      id: article.id,
      category: article.category?.name,
      categorySlug: article.category?.slug,
      thumbnail: article.thumbnail?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.thumbnail.url}`
        : "/416x312.svg",
      title: truncateString(article.title, 110),
      articleSlug: `/news/${article?.category.slug || "default"}/${
        article.slug
      }`,
      author: article.author?.name,
      authorImg: article.author?.image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.author.image.url}`
        : "/default_avatar.png",
      publicationDate: article.publicationDate
        ? article.publicationDate
        : article.createdAt,
      delay: (index + 1) * 100,
    };
  });

  return <CategoryArticles data={data} />;
}
