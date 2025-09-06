import CategoryArticles from "@/components/public/CategoryArticles";
import { truncateString } from "@/lib/miscellaneous";
import client from "@/lib/strapi";
import { ITEM_PER_PAGE } from "@/lib/settings";

export default async function News({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const articles = client.collection("articles");

  const { page } = await searchParams;

  const queryPage = page ? parseInt(page) : 1;

  const { data: articlesList, meta } = await articles.find({
    sort: "publicationDate:desc",
    pagination: {
      page: queryPage,
      pageSize: ITEM_PER_PAGE,
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

  const { pagination } = meta;

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

  return (
    <CategoryArticles data={data} page={queryPage} count={pagination?.total!} />
  );
}
