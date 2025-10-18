"use client";

import AOS from "aos";
import Papa from "papaparse";

import { useEffect, useState, useCallback } from "react";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";

import "aos/dist/aos.css";

import BarChartGraphic from "@/components/public/publications/graphics/BarChartGraphic";
import LineChartGraphic from "@/components/public/publications/graphics/LineChartGraphic";
import StackedBarComposedGraphic from "@/components/public/publications/graphics/StackedBarComposedGraphic";
import ExportCSV from "@/components/commons/ExportCSV";

interface Props {
  yAxisLegend?: string | null | undefined;
  xAxisLegend?: string | null | undefined;
  delay?: number;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  legend?: string | null | undefined;
  startFrom?: number | null | undefined;
  compoundLineKey?: string | null | undefined;
  dataUrl: string;
  type:
    | "line"
    | "scatter"
    | "compound"
    | "vertical barchart"
    | "horizontal barchart"
    | "compound stacked barchart"
    | undefined;
  id: string;
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
  startFrom,
  compoundLineKey,
  type,
  id,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [columns, setColumns] = useState<string[] | undefined | null>([]);

  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownloadPng = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, `chart-${id}.png`);
    }
  }, [getPng]);

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (!dataUrl) return <p className="text-red font-semibold">No Data!</p>;
  return (
    <div
      id={id}
      data-aos="fade-up"
      className="flex flex-col border border-primary rounded-2xl pt-5 pb-25 xl:pb-20 relative"
      data-aos-delay={delay}
    >
      <div className="flex flex-col">
        {title && (
          <h1 className="text-primary font-bold text-base xl:text-2xl self-center text-center">
            {title}
          </h1>
        )}
      </div>
      <div className="h-[500px] w-[350px] sm:w-[450px] md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1024px] self-center">
        {loading ? (
          <span className="loader"></span>
        ) : type === "vertical barchart" ? (
          <BarChartGraphic
            data={data}
            columns={columns}
            xAxisLegend={xAxisLegend ?? ""}
            yAxisLegend={yAxisLegend ?? ""}
            type="vertical"
            ref={ref}
          />
        ) : type === "horizontal barchart" ? (
          <BarChartGraphic
            data={data}
            columns={columns}
            xAxisLegend={xAxisLegend ?? ""}
            yAxisLegend={yAxisLegend ?? ""}
            type="horizontal"
            ref={ref}
          />
        ) : type === "line" ? (
          <LineChartGraphic
            data={data}
            columns={columns}
            xAxisLegend={xAxisLegend ?? ""}
            yAxisLegend={yAxisLegend ?? ""}
            startFrom={startFrom ?? 0}
            ref={ref}
          />
        ) : type === "compound stacked barchart" ? (
          <StackedBarComposedGraphic
            data={data}
            columns={columns}
            compoundLineKey={compoundLineKey}
            ref={ref}
          />
        ) : (
          <div> No Graph!</div>
        )}
        {legend && (
          <div className="text-center text-[10px] xl:text-sm text-primary">
            {legend}
          </div>
        )}

        <div className="absolute right-0 bottom-0 group flex justify-end w-full mt-5 p-4  border-primary-light bg-primary/20 rounded-b-2xl border-t xl:border-t-0 xl:bg-inherit xl:hover:border-t xl:hover:border-primary-light xl:hover:bg-primary/20 xl:hover:rounded-b-2xl">
          <div className="flex xl:hidden xl:group-hover:flex space-x-2">
            <button
              onClick={handleDownloadPng}
              className="border border-primary py-1 px-2 text-sm rounded-2xl bg-primary hover:bg-primary/80 text-slate-50 cursor-pointer active:scale-95"
            >
              {isLoading ? "En cours..." : "Télécharger PNG"}
            </button>
            <ExportCSV
              data={data}
              fileName={`chart_data_${id}`}
              message="Télécharger CSV"
              className="border border-primary py-1 px-2 text-sm rounded-2xl bg-primary hover:bg-primary/80 text-slate-50 cursor-pointer active:scale-95"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
