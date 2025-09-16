"use client";

import SideBar from "@/components/public/publications/SideBar";
import Results from "@/components/public/publications/Results";
import ResultsSnapshot from "@/components/public/publications/ResultsSnapshot";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";

import { reset } from "@/lib/features/publicationFilter/publicationFilterSlice";

import { useAppStore } from "@/lib/hooks";

export interface Theme {
  id: string;
  norder: number;
  slug: string;
  name: string;
  publications: number;
  children: Theme[];
}

interface Props {
  themes: Theme[];
  geos: Theme[];
  categories: Theme[];
  collections: Theme[];
}

export default function Publications({
  themes,
  geos,
  categories,
  collections,
}: Props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const store = useAppStore();
  const initialized = useRef(false);

  if (!initialized.current) {
    store.dispatch(
      reset({
        categories: categories,
        themes: themes,
        geos: geos,
        collections: collections,
      })
    );
    initialized.current = true;
  }

  return (
    <div
      className="container mx-2 md:mx-auto my-5 min-h-screen grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] gap-3 "
      data-aos="fade-up"
      data-aos-delay={100}
    >
      <SideBar />
      <div className="flex flex-col space-y-2">
        <ResultsSnapshot />
        <Results />
      </div>
    </div>
  );
}
