"use client";

import BarChartGraphic from "@/components/public/publications/graphics/BarChartGraphic";

import AOS from "aos";
import Papa from "papaparse";

import { useEffect, useState } from "react";
import "aos/dist/aos.css";

interface Props {
  yAxisLegend: string | null | undefined;
  xAxisLegend: string | null | undefined;
  delay?: number;
  title: string | null | undefined;
  subtitle: string | null | undefined;
  legend: string | null | undefined;
  dataUrl: string;
  type:
    | "line"
    | "scatter"
    | "compound"
    | "vertical barchart"
    | "horizontal barchart"
    | undefined;
}

interface DataForm {
  [key: string]: string | number;
}

interface Data {
  [key: string]: string | number;
}

export default function Graph({
  delay = 100,
  title,
  subtitle,
  dataUrl,
  legend,
  xAxisLegend,
  yAxisLegend,
  type,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataForm[]>([]);
  const [columns, setColumns] = useState<string[] | undefined | null>([]);

  useEffect(() => {
    async function loadData() {
      Papa.parse<Data>(dataUrl, {
        download: true,
        header: true,
        complete: (results) => {
          const rows: Data[] = results.data;
          setData(rows);
          setColumns(results.meta.fields);
          setLoading(false);
        },
      });
    }

    loadData();
  }, []);

  if (!dataUrl) return <p className="text-red font-semibold">No Data!</p>;
  return (
    <div
      data-aos="fade-up"
      className="border border-slate-400  h-[500px] w-[350px] sm:w-[450px] md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1024px]"
      data-aos-delay={delay}
    >
      {loading ? (
        <span className="loader"></span>
      ) : type === "vertical barchart" ? (
        <BarChartGraphic
          data={data}
          columns={columns}
          xAxisLegend={xAxisLegend ?? ""}
          yAxisLegend={yAxisLegend ?? ""}
          type="vertical"
        />
      ) : type === "horizontal barchart" ? (
        <BarChartGraphic
          data={data}
          columns={columns}
          xAxisLegend={xAxisLegend ?? ""}
          yAxisLegend={yAxisLegend ?? ""}
          type="horizontal"
        />
      ) : (
        <div> No Graph!</div>
      )}
    </div>
  );
}
