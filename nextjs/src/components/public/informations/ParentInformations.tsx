"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import InformationBox from "./InformationBox";

interface Props {
  children: {
    id: string;
    title: string;
    short: string;
    slug: string;
  }[];
}

export default function ParentInformations({ children }: Props) {
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {children.map((child) => (
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
