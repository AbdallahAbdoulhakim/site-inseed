import CategoryArticles from "@/components/public/CategoryArticles";
import { truncateString } from "@/lib/miscellaneous";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";
import { ITEM_PER_PAGE } from "@/lib/settings";

export default async function NewsCategory({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { categoryId } = await params;

  const categories = client.collection("categories");
  const tags = client.collection("tags");

  const { data: category } = await categories.find({
    filters: {
      slug: categoryId,
    },
  });

  if (category.length < 1 || !category) notFound();

  const articles = client.collection("articles");

  const { page, search } = await searchParams;

  const queryPage = page ? parseInt(page) : 1;

  const { data: articlesList, meta } = await articles.find({
    filters: {
      category: {
        documentId: category[0].documentId,
      },
    },
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

  const { data: listTags } = await tags.find({
    fields: ["name", "slug"],
  });

  const tagsList = listTags.map((tag) => {
    return {
      id: tag.documentId,
      name: tag.name,
      slug: tag.slug,
    };
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
    <CategoryArticles
      data={data}
      page={queryPage}
      count={pagination?.total!}
      tagsList={tagsList}
    />
  );
}
