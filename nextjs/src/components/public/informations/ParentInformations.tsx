"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import InformationBox from "@/components/public/informations/InformationBox";
import DisplayContent from "@/components/commons/DisplayContent";

interface Props {
  content: string;
  childs: {
    id: string;
    title: string;
    short: string;
    slug: string;
  }[];
}

export default function ParentInformations({ childs, content }: Props) {
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
      className="container flex flex-col items-center justify-center mx-auto px-5 xl:px-0 my-10"
    >
      {content && (
        <div className="flex flex-col items-center justify-center">
          <DisplayContent
            className="mt-5 min-w-full overflow-auto text-justify [&_p]:text-justify"
            htmlContent={content}
          />
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {childs.map((child) => (
          <InformationBox
            key={child.id}
            title={child.title}
            slug={child.slug}
            short={child.short}
          />
        ))}
      </div>
    </section>
  );
}
