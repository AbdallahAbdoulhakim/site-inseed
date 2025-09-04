import CategoryArticles from "@/components/public/CategoryArticles";
import { truncateString } from "@/lib/miscellaneous";
import client from "@/lib/strapi";

export default async function NewsCategory() {
  const articles = client.collection("articles");

  const { data: articlesList } = await articles.find({
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
