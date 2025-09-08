import ArticlePage from "@/components/public/ArticlePage";
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
        fields: ["name"],
        populate: {
          image: {
            fields: ["name", "url"],
          },
        },
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

  const data = {
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
    publicationDate: article.publicationDate
      ? article.publicationDate
      : article.createdAt,
  };

  return <ArticlePage data={data} />;
}
