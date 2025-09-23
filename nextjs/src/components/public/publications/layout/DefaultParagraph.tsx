"use client";

import AOS from "aos";

import DisplayContent from "@/components/commons/DisplayContent";
import { useEffect } from "react";

export default function DefaultParagraph({
  content,
  title,
  hasTableWithSpan,
  id,
}: {
  content: string;
  title: string | null | undefined;
  hasTableWithSpan: boolean;
  id: string;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={100}
      id={id}
      className="flex flex-col space-y-2"
    >
      {title && <h1 className="text-primary font-semibold text-xl">{title}</h1>}
      <DisplayContent
        className={`[&_p]:text-justify text-justify mt-5 min-w-full overflow-auto grow  [&_td]:text-center [&_tr:first-child]:bg-[#757575]
           ${
             hasTableWithSpan &&
             "[&_tr:nth-child(2)]:bg-[#757575] [&_tr:nth-child(2)]:text-white [&_tr:nth-child(2)_strong]:text-white!"
           }
           [&_tr:first-child]:text-white [&_tr:first-child_strong]:text-white [&_tr:first-child]:font-bold  [&_tr:first-child_strong]:font-bold  
           [&_tr]:odd:bg-white [&_tr]:even:bg-[#f1f1f1] [&_td]:border [&_td]:border-[#e0e0e0] [&_td]:align-middle`}
        htmlContent={content}
      />
    </div>
  );
}
