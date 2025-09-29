"use client";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

import DisplayContent from "@/components/commons/DisplayContent";

interface Props {
  content: string;
}

export default function InformationPage({ content }: Props) {
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
          className="min-w-full grid grid-cols-1 [&_strong]:text-primary [&_span]:text-[18px]! [&_p]:text-[18px]!"
          htmlContent={content}
        />
      )}
    </section>
  );
}
