import ParentInformations from "@/components/public/informations/ParentInformations";
import InformationPage from "@/components/public/informations/InformationPage";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";

import { Metadata } from "next";
import { fetchMetaData } from "@/actions/metaData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const metaData = await fetchMetaData(slug, "informations");

  return {
    title: metaData ? metaData.title : "Information",
    description: metaData ? metaData.description : "Page d'",
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const informations = client.collection("informations");

  const { slug } = await params;

  const { data: informationsList } = await informations.find({
    populate: {
      children: {
        fields: ["title", "short", "slug", "norder"],
        sort: "norder:asc",
      },
      information_documents: {
        fields: ["title", "description", "type", "category", "position"],
        populate: {
          file: {
            fields: ["name", "url", "size"],
          },
        },
      },
    },
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  if (!informationsList || informationsList.length === 0) return notFound();

  const documents =
    informationsList[0].information_documents &&
    informationsList[0].information_documents.length > 0
      ? informationsList[0].information_documents
          .filter((elt: { position: string }) => elt.position === "list")
          .map(
            (elt: {
              id: string;
              documentId: string;
              title: string;
              description: string;
              type: string;
              category: string;
              file: {
                name: string;
                url: string;
                size: string | number;
              };
            }) => ({
              id: elt.documentId,
              title: elt.title,
              description: elt.description,
              type: elt.type,
              category: elt.category,
              fileName: elt.file.name,
              fileUrl: elt.file.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${elt.file.url}`
                : "#",
              fileSize: elt.file.size,
            })
          )
      : [];

  const information = {
    id: informationsList[0].documentId,
    title: informationsList[0].title,
    short: informationsList[0].short,
    slug: informationsList[0].slug,
    norder: informationsList[0].norder,
    content: informationsList[0].content,
    children:
      informationsList[0].children && informationsList[0].children.length > 0
        ? informationsList[0].children.map(
            (child: {
              title: string;
              documentId: string;
              short: string;
              slug: string;
              norder: number;
            }) => ({
              id: child.documentId,
              title: child.title,
              short: child.short,
              slug: child.slug,
              norder: child.norder,
            })
          )
        : [],
  };

  return (
    <section className="">
      {information.children.length > 0 ? (
        <ParentInformations
          children={information.children}
          content={information.content}
        />
      ) : (
        <InformationPage
          content={information.content}
          listOfFiles={documents}
        />
      )}
    </section>
  );
}
