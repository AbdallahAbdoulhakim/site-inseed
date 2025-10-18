"use client";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

import {
  PublicationProps,
  PublicationElement,
} from "@/components/public/publications/layout/DefaultPublicationPage";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ChronlogicalTable from "@/components/public/publications/layout/ChronlogicalTable";
import Graph from "../graphics/Graph";

export default function ChronologicalSerie({ publication }: PublicationProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const elements: PublicationElement[] = [
    publication.table_graphs &&
      publication.table_graphs.map((elt) => ({
        id: elt.documentId,
        norder: elt.norder,
        inSummary: elt.inSummary,
        type: "table_graph",
        link: elt.link,
        title: elt.title,
        content: {
          table_graph: {
            id: elt.id,
            documentId: elt.documentId,
            content: elt.content,
            link: elt.link,
            title: elt.title,
            datafile: {
              id: elt.datafile.id,
              documentId: elt.datafile.documentId,
              name: elt.datafile.name,
              url: elt.datafile.url,
            },
          },
        },
      })),
  ]
    .filter((elt) => elt !== undefined && elt !== null)
    .flat()
    .sort((a, b) => a.norder - b.norder);

  const tableGraph = elements[0];

  return (
    <section className="container mx-auto">
      <div
        className="p-5 m-10 flex flex-col space-y-10 border items-center justify-center  border-primary rounded-2xl"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="border border-primary">
            <TabsTrigger value="table">Tableau</TabsTrigger>
            <TabsTrigger value="graphic">Graphique</TabsTrigger>
          </TabsList>
          <TabsContent
            className="w-full flex flex-col items-center"
            value="table"
          >
            <ChronlogicalTable
              dataUrl={
                tableGraph.content.table_graph?.datafile.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${tableGraph.content.table_graph?.datafile.url}`
                  : ""
              }
            />
          </TabsContent>
          <TabsContent value="graphic">
            <Graph
              id={tableGraph.content.table_graph?.link ?? tableGraph.id}
              legend={""}
              xAxisLegend={""}
              yAxisLegend={""}
              title={tableGraph.content.table_graph?.title}
              subtitle={""}
              type={"line"}
              startFrom={undefined}
              compoundLineKey={undefined}
              dataUrl={
                tableGraph.content.table_graph?.datafile.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${tableGraph.content.table_graph?.datafile.url}`
                  : ""
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
