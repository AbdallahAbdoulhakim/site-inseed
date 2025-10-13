import DefaultPublicationPage from "@/components/public/publications/layout/DefaultPublicationPage";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const publications = client.collection("publications");

  const { slug } = await params;

  const { data: publicationsList } = await publications.find({
    populate: {
      paragraphs: {
        fields: [
          "title",
          "link",
          "content",
          "norder",
          "inSummary",
          "hasTableWithSpan",
        ],
      },
      graphics: {
        fields: [
          "dataurl",
          "type",
          "legend",
          "norder",
          "yAxisLegend",
          "xAxisLegend",
          "title",
          "subtitle",
          "link",
          "inSummary",
          "startFrom",
          "compoundLineKey",
        ],
        populate: {
          datafile: {
            fields: ["name", "url"],
          },
        },
      },
      table_graphs: {
        fields: ["content", "norder", "title", "link", "inSummary"],
        populate: {
          graphic: {
            fields: [
              "dataurl",
              "type",
              "legend",
              "norder",
              "yAxisLegend",
              "xAxisLegend",
              "title",
              "subtitle",
              "startFrom",
              "compoundLineKey",
            ],
            populate: {
              datafile: {
                fields: ["name", "url"],
              },
            },
          },
        },
      },
    },
    filters: {
      publicationSlug: {
        $eq: slug,
      },
    },
  });

  if (!publicationsList || publicationsList.length === 0) return notFound();

  const publication = {
    id: publicationsList[0].documentId,
    paragraphs: publicationsList[0].paragraphs,
    graphics: publicationsList[0].graphics,
    table_graphs: publicationsList[0].table_grarphs,
    hasSummary: publicationsList[0].hasSummary,
  };
  return <DefaultPublicationPage publication={publication} />;
}
