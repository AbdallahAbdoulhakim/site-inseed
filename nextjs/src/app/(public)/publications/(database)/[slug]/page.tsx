import ChronologicalSerie from "@/components/public/publications/layout/ChronologicalSerie";
import DefaultPublicationPage from "@/components/public/publications/layout/DefaultPublicationPage";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";

import { Metadata } from "next";
import { fetchMetaData } from "@/actions/metaData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleId: string }>;
}): Promise<Metadata> {
  const { articleId } = await params;

  const metaData = await fetchMetaData(articleId, "publications");

  return {
    title: metaData ? metaData.title : "Publication",
    description: metaData ? metaData.description : "Page de Publication",
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const publications = client.collection("publications");

  const { slug } = await params;

  const { data: publicationsList } = await publications.find({
    populate: {
      data: {
        fields: ["name", "url"],
      },
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
          datafile: {
            fields: ["name", "url"],
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
    type: publicationsList[0].type,
    paragraphs: publicationsList[0].paragraphs,
    graphics: publicationsList[0].graphics,
    table_graphs: publicationsList[0].table_graphs,
    hasSummary: publicationsList[0].hasSummary,
  };

  return publication.type === "Séries chronologiques" ? (
    <ChronologicalSerie publication={publication} />
  ) : (
    <DefaultPublicationPage publication={publication} />
  );
}
