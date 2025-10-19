"use client";

import AOS from "aos";
import Papa from "papaparse";

import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import KeyIndictorGraph from "./KeyIndictorGraph";
import Link from "next/link";

interface Data {
  [key: string]: string | number;
}

interface Props {
  yAxisLegend: string;
  xAxisLegend: string;
  delay: number;
  title: string;
  subtitle: string;
  legend: string;
  dataUrl: string;
  publication: string;
}

interface DataForm {
  [key: string]: string | number;
}

export default function KeyIndicator({
  delay,
  title,
  subtitle,
  dataUrl,
  legend,
  xAxisLegend,
  yAxisLegend,
  publication,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataForm[]>([]);
  const [columns, setColumns] = useState<string[] | undefined | null>([]);

  useEffect(() => {
    AOS.init({
      duration: delay,
      once: true,
    });
  }, [delay]);

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
  }, [dataUrl]);

  return (
    <article
      className="font-montserrat! bg-background p-5 min-h-[520px] rounded-[10px] overflow-hidden border border-primary/90 flex flex-col items-center justify-center hover:bg-primary/10 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.1)]"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="self-start flex flex-col grow items-center justify-center w-full h-full">
          {title && (
            <Link
              href={publication ? `/publications/${publication}` : ""}
              className="text-lg font-semibold text-primary hover:text-primary/60 mb-1]"
            >
              {title}
            </Link>
          )}
          <p className="text-xs text-[#6f6f6f] hover:text-[#6f6f6f]/60 mb-2 whitespace-pre-wrap">
            {subtitle}
          </p>

          <KeyIndictorGraph
            data={data}
            columns={columns}
            xAxisLegend={xAxisLegend}
            yAxisLegend={yAxisLegend}
          />

          {legend && (
            <p className="text-xs text-[#6f6f6f] hover:text-[#6f6f6f]/60  whitespace-pre-wrap">
              {legend}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
