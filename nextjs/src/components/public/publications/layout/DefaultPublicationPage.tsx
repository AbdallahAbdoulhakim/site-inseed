"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Graph from "@/components/public/publications/graphics/Graph";
import DefaultParagraph from "@/components/public/publications/layout/DefaultParagraph";
import DefaultPublicationSummary from "@/components/public/publications/layout/DefaultPublicationSummary";

interface Props {
  publication: {
    id: string;
    paragraphs: {
      id: number;
      documentId: string;
      title: string | null | undefined;
      link: string | null | undefined;
      content: string | null | undefined;
      hasTableWithSpan: boolean;
      norder: number;
      inSummary: boolean;
    }[];
    graphics: {
      id: number;
      documentId: string;
      dataurl: string | null | undefined;
      legend: string | null | undefined;
      xAxisLegend: string | null | undefined;
      yAxisLegend: string | null | undefined;
      title: string | null | undefined;
      subtitle: string | null | undefined;
      link: string | null | undefined;
      inSummary: boolean;
      startFrom: number | null | undefined;
      type:
        | "line"
        | "scatter"
        | "compound"
        | "vertical barchart"
        | "horizontal barchart"
        | undefined;
      norder: number;
      datafile: {
        id: number;
        documentId: string;
        name: string;
        url: string;
      };
    }[];
    table_graphs: {
      id: string;
      documentId: string;
      content: string | null | undefined;
      norder: number;
      link: string | null | undefined;
      inSummary: boolean;
      graphic: {
        id: number;
        documentId: string;
        dataurl: string | null | undefined;
        legend: string | null | undefined;
        xAxisLegend: string | null | undefined;
        yAxisLegend: string | null | undefined;
        title: string | null | undefined;
        subtitle: string | null | undefined;
        startFrom: number | null | undefined;
        type:
          | "line"
          | "scatter"
          | "compound"
          | "vertical barchart"
          | "horizontal barchart"
          | undefined;
        norder: number;
        datafile: {
          id: number;
          documentId: string;
          name: string;
          url: string;
        };
      };
    }[];
  };
}

interface Element {
  id: string;
  norder: number;
  type: string;
  inSummary: boolean;
  content: {
    graphic?: {
      id: number;
      documentId: string;
      dataurl: string | null | undefined;
      legend: string | null | undefined;
      title: string | null | undefined;
      subtitle: string | null | undefined;
      xAxisLegend: string | null | undefined;
      yAxisLegend: string | null | undefined;
      link: string | null | undefined;
      startFrom: number | null | undefined;
      type:
        | "line"
        | "scatter"
        | "compound"
        | "vertical barchart"
        | "horizontal barchart"
        | undefined;
      datafile: {
        id: number;
        documentId: string;
        name: string;
        url: string;
      };
    };
    paragraph?: {
      id: number;
      documentId: string;
      title: string | null | undefined;
      link: string | null | undefined;
      content: string | null | undefined;
      hasTableWithSpan: boolean;
    };
    table_graph?: {
      id: string;
      documentId: string;
      content: string | null | undefined;
      link: string | null | undefined;
      graphic: {
        id: number;
        documentId: string;
        dataurl: string | null | undefined;
        legend: string | null | undefined;
        title: string | null | undefined;
        subtitle: string | null | undefined;
        xAxisLegend: string | null | undefined;
        yAxisLegend: string | null | undefined;
        startFrom: number | null | undefined;
        type:
          | "line"
          | "scatter"
          | "compound"
          | "vertical barchart"
          | "horizontal barchart"
          | undefined;
        datafile: {
          id: number;
          documentId: string;
          name: string;
          url: string;
        };
      };
    };
  };
}

export default function DefaultPublicationPage({ publication }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const elements = [
    publication.paragraphs &&
      publication.paragraphs.map((elt) => ({
        id: elt.documentId,
        norder: elt.norder,
        inSummary: elt.inSummary,
        type: "paragraph",
        content: {
          paragraph: {
            id: elt.id,
            documentId: elt.documentId,
            title: elt.title,
            link: elt.link,
            content: elt.content,
            inSummary: elt.inSummary,
            hasTableWithSpan: elt.hasTableWithSpan,
          },
        },
      })),
    ,
    publication.graphics &&
      publication.graphics.map((elt) => ({
        id: elt.documentId,
        norder: elt.norder,
        inSummary: elt.inSummary,
        type: "graphic",
        content: {
          graphic: {
            id: elt.id,
            documentId: elt.documentId,
            dataurl: elt.dataurl,
            legend: elt.legend,
            title: elt.title,
            link: elt.link,
            subtitle: elt.subtitle,
            xAxisLegend: elt.xAxisLegend,
            yAxisLegend: elt.yAxisLegend,
            type: elt.type,
            startFrom: elt.startFrom,
            datafile: {
              id: elt.datafile.id,
              documentId: elt.datafile.documentId,
              name: elt.datafile.name,
              url: elt.datafile.url,
            },
          },
        },
      })),
    ,
    publication.table_graphs &&
      publication.table_graphs.map((elt) => ({
        id: elt.documentId,
        norder: elt.norder,
        inSummary: elt.inSummary,
        type: "table_graph",
        content: {
          id: elt.id,
          documentId: elt.documentId,
          content: elt.documentId,
          inSummary: elt.inSummary,
          link: elt.link,
          graphic: {
            id: elt.graphic.id,
            documentId: elt.graphic.documentId,
            norder: elt.graphic.norder,
            dataurl: elt.graphic.dataurl,
            legend: elt.graphic.legend,
            title: elt.graphic.title,
            subtitle: elt.graphic.subtitle,
            xAxisLegend: elt.graphic.xAxisLegend,
            yAxisLegend: elt.graphic.yAxisLegend,
            type: elt.graphic.type,
            startFrom: elt.graphic.startFrom,
            datafile: {
              id: elt.graphic.datafile.id,
              documentId: elt.graphic.datafile.documentId,
              name: elt.graphic.datafile.name,
              url: elt.graphic.datafile.url,
            },
          },
        },
      })),
  ]
    .filter((elt) => elt !== undefined && elt !== null)
    .flat()
    .sort((a, b) => a.norder - b.norder) as unknown as Element[];

  const summaryElements = elements
    .filter((elt) => elt.inSummary)
    .map((elt) => {
      if (elt.type === "graphic") {
        return {
          id: elt.id ?? "",
          link: elt.content.graphic?.link ?? "",
          title: elt.content.graphic?.title ?? "",
        };
      }
      if (elt.type === "paragraph") {
        return {
          id: elt.id ?? "",
          link: elt.content.paragraph?.link ?? "",
          title: elt.content.paragraph?.title ?? "",
        };
      }

      if (elt.type === "table_graph") {
        return {
          id: elt.id ?? "",
          link: elt.content.table_graph?.link ?? "",
          title: elt.content.table_graph?.graphic.title ?? "",
        };
      }
    }) as {
    id: string;
    link: string;
    title: string;
  }[];

  return (
    <section className="container mx-auto">
      <div
        className="px-5 min-h-lvh my-10 justify-center flex flex-col space-y-10"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <DefaultPublicationSummary elements={summaryElements} />
        {elements.map((elt) => {
          if (elt.type === "paragraph") {
            return (
              <DefaultParagraph
                key={elt.id}
                id={elt.content.paragraph?.link ?? elt.id}
                title={elt.content.paragraph?.title}
                content={elt.content.paragraph?.content ?? ""}
                hasTableWithSpan={
                  elt.content.paragraph?.hasTableWithSpan ?? false
                }
              />
            );
          }

          if (elt.type === "graphic") {
            return (
              <Graph
                key={elt.id}
                id={elt.content.graphic?.link ?? elt.id}
                legend={elt.content.graphic?.legend}
                xAxisLegend={elt.content.graphic?.xAxisLegend}
                yAxisLegend={elt.content.graphic?.yAxisLegend}
                title={elt.content.graphic?.title}
                subtitle={elt.content.graphic?.subtitle}
                type={elt.content.graphic?.type}
                startFrom={elt.content.graphic?.startFrom}
                dataUrl={
                  elt.content.graphic?.datafile.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${elt.content.graphic?.datafile?.url}`
                    : elt.content.graphic?.dataurl
                    ? elt.content.graphic.dataurl
                    : ""
                }
              />
            );
          }

          return <div key={elt.id}>No Suitable Container</div>;
        })}
      </div>
    </section>
  );
}
