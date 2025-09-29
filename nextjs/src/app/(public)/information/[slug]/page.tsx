import ParentInformations from "@/components/public/informations/ParentInformations";
import InformationPage from "@/components/public/informations/InformationPage";
import client from "@/lib/strapi";
import { notFound } from "next/navigation";

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
      printables: {
        fields: ["name", "url"],
      },
    },
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  if (!informationsList || informationsList.length === 0) return notFound();

  const information = {
    id: informationsList[0].documentId,
    title: informationsList[0].title,
    short: informationsList[0].short,
    slug: informationsList[0].slug,
    norder: informationsList[0].norder,
    content: informationsList[0].content,
    printables: informationsList[0].printables,
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
        <InformationPage content={information.content} />
      )}
    </section>
  );
}
