"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Graph from "../graphics/Graph";

interface Props {
  publication: {
    id: any;
    paragraphs: {
      id: number;
      documentId: string;
      title: string | null | undefined;
      link: string | null | undefined;
      content: string | null | undefined;
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
      graphic: {
        id: number;
        documentId: string;
        dataurl: string | null | undefined;
        legend: string | null | undefined;
        title: string | null | undefined;
        subtitle: string | null | undefined;
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

export default function DefaultPublicationPage({ publication }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const graphic =
    publication.graphics && publication.graphics.length > 0
      ? publication.graphics[0]
      : null;

  console.log(graphic);

  return (
    <section className="container mx-auto border border-slate-800">
      <div
        className="xl:px-0 min-h-lvh my-10 items-center justify-center flex flex-col"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <Graph
          legend={graphic?.legend}
          xAxisLegend={graphic?.xAxisLegend}
          yAxisLegend={graphic?.yAxisLegend}
          title={graphic?.title}
          subtitle={graphic?.subtitle}
          type={graphic?.type}
          dataUrl={
            graphic?.datafile.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${graphic?.datafile?.url}`
              : graphic?.dataurl
              ? graphic.dataurl
              : ""
          }
        />
      </div>
    </section>
  );
}
