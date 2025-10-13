"use client";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

import DisplayContent from "@/components/commons/DisplayContent";
import PrintableBox from "./PrintableBox";

interface Props {
  content: string;
  listOfFiles: {
    id: string;
    title: string;
    description: string;
    type: string;
    category: string;
    fileName: string;
    fileUrl: string;
    fileSize: string | number;
  }[];
}

export default function InformationPage({ content, listOfFiles }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-delay={100}
      className="container mx-auto my-10 p-5  flex flex-col items-center justify-center w-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-[10px]"
    >
      {content && (
        <DisplayContent
          className="min-w-full text-justify grid grid-cols-1 [&_strong]:text-primary [&_span]:text-[18px]! [&_p]:text-[18px]! [&_p]:mt-[-5px] [&_ul]:mt-[-5px] [&_li]:text-[18px]"
          htmlContent={content}
        />
      )}

      {listOfFiles.length > 0 && (
        <div className="flex flex-col mt-5 w-full space-y-5 p-5 justify-center items-center">
          {listOfFiles.map((elt) => (
            <PrintableBox
              description={elt.description}
              fileSize={elt.fileSize}
              fileUrl={elt.fileUrl}
              category={elt.category}
              type={elt.type}
              key={elt.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
