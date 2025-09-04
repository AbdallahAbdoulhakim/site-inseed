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

  return <div>News Category Page {categoryId}</div>;
}
