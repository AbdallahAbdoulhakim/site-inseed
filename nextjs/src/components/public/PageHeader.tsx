"use client";
import Breadcrumb from "@/components/public/Breadcrumb";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchSubMenuByUrl } from "@/actions/menu";
import DotLoading from "@/components/base/DotLoading";
import Link from "next/link";
import { BsFilePdf } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import byteSize from "byte-size";

export default function PageHeader() {
  const [loading, setLoading] = useState(true);

  const [heading, setHeading] = useState<{
    title?: string;
    subtitle?: string;
    short?: string;
    parutionDate?: string;
    parutionNumber?: string;
    printableUrl?: string;
    printableSize?: string;
    dataUrl?: string;
    dataSize?: string;
    type?: string;
    breadcrumb: {
      id: string;
      label: string;
      description: string;
      url: string;
    }[];
  }>();

  const pathname = usePathname();

  useEffect(() => {
    async function loadData() {
      const breadCrumbresponse = await fetchSubMenuByUrl(pathname);

      if (!breadCrumbresponse) return;

      const {
        breadcrumb,
        title,
        subtitle,
        short,
        parutionDate,
        parutionNumber,
        printableUrl,
        printableSize,
        dataUrl,
        dataSize,
        type,
      } = breadCrumbresponse;

      setHeading({
        breadcrumb,
        title: title,
        subtitle: subtitle,
        short: short,
        parutionDate,
        parutionNumber,
        printableUrl,
        printableSize,
        dataSize,
        dataUrl,
        type,
      });

      setLoading(false);
    }

    loadData();
  }, [pathname]);

  return (
    <div
      className={
        loading
          ? "flex flex-col items-center justify-center"
          : heading
          ? "flex flex-col"
          : "hidden"
      }
    >
      {loading ? (
        <DotLoading className="mt-5" />
      ) : (
        <>
          <div className="py-15 flex items-center min-h-[20vh] relative bg-primary">
            <div className="container mx-auto relative flex flex-col items-center justify-center">
              {heading && heading.type === "Informations Rapides" ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                  <div className="py-5 px-2 flex flex-col space-y-5">
                    {heading.title && (
                      <h1
                        className={`${
                          heading.title.length > 80
                            ? "text-xl lg:text-3xl"
                            : "text-2xl lg:text-5xl"
                        } font-[600] text-white font-poppins`}
                      >
                        {heading.title}
                      </h1>
                    )}
                    {heading.subtitle && (
                      <h2 className="font-semibold text-[18px] text-white font-poppins">
                        {heading.subtitle}
                      </h2>
                    )}
                    {heading.short && (
                      <p className="text-white text-sm md:text-[15px]">
                        {heading.short}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-3 p-3">
                    <h2 className="text-white/80 uppercase font-bold">
                      {heading.type}
                    </h2>
                    {heading.parutionNumber && (
                      <p className="text-white text-[13px]">
                        N° {heading.parutionNumber}
                      </p>
                    )}
                    {heading.parutionDate && (
                      <p className="text-white text-[13px]">
                        Paru le :{" "}
                        {new Date(heading.parutionDate).toLocaleDateString()}
                      </p>
                    )}

                    {heading.printableUrl && (
                      <div className="bg-white border border-primary hover:bg-white/80 rounded flex p-5 flex-col group cursor-pointer">
                        <Link
                          className="flex justify-end"
                          href={heading.printableUrl}
                        >
                          <div className="flex flex-col justify-end items-end">
                            <p className="text-primary text-[13px] uppercase group-hover:underline">
                              Version Imprimable
                            </p>
                            <p className="text-neutral-500 text-[13px] group-hover:underline">
                              {`(pdf ${
                                !isNaN(Number(heading.printableSize))
                                  ? `, ${byteSize(
                                      Number(heading.printableSize) * 1024
                                    )}`
                                  : ""
                              })`}
                            </p>
                          </div>
                          <div className="ml-5">
                            <BsFilePdf color="#008374" size={35} />
                          </div>
                        </Link>
                      </div>
                    )}
                    {heading.dataUrl && (
                      <div className="bg-white border border-primary hover:bg-white/80 rounded flex p-5 flex-col group cursor-pointer">
                        <Link
                          className="flex justify-end"
                          href={heading.dataUrl}
                        >
                          <div className="flex  flex-col justify-end items-end">
                            <p className="text-primary text-[13px] uppercase group-hover:underline">
                              Données
                            </p>
                            <p className="text-neutral-500 text-[13px] group-hover:underline">
                              {`(xlsx ${
                                !isNaN(Number(heading.dataSize))
                                  ? `, ${byteSize(
                                      Number(heading.dataSize) * 1024
                                    )}`
                                  : ""
                              })`}
                            </p>
                          </div>
                          <div className="ml-5">
                            <BsFiletypeXlsx color="#008374" size={35} />
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <div className="px-5 md:px-0  text-center">
                    {heading?.title && (
                      <h2
                        className={`${
                          heading.title.length > 80
                            ? "text-xl lg:text-3xl"
                            : "text-2xl lg:text-5xl"
                        } font-[600] text-white font-poppins`}
                      >
                        {heading.title}
                      </h2>
                    )}

                    {heading?.subtitle && (
                      <p className="text-white text-center">
                        {heading.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {heading && heading.breadcrumb.length > 0 && (
            <Breadcrumb breadcrumb={heading.breadcrumb} />
          )}
        </>
      )}
    </div>
  );
}
