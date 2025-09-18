"use client";

import SideBar from "@/components/public/publications/SideBar";
import Results from "@/components/public/publications/Results";
import ResultsSnapshot from "@/components/public/publications/ResultsSnapshot";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";

import {
  reset,
  selectCategoriesTags,
  selectCollectionsTags,
  selectGeosTags,
  selectThemesTags,
} from "@/lib/features/publication/publicationFilterSlice";

import { useAppSelector, useAppStore } from "@/lib/hooks";
import { useRouter } from "next/navigation";

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
  initialThemeTags: string | undefined;
  initialGeoTags: string | undefined;
  initialCategoryTags: string | undefined;
  initialCollectionTags: string | undefined;
}

interface InitCheck {
  themes: { level1: number[]; level2: number[] };
  collections: { level1: number[]; level2: number[] };
  categories: { level1: number[]; level2: number[] };
  geos: { level1: number[]; level2: number[] };
}

export default function Publications({
  themes,
  geos,
  categories,
  collections,
  initialCategoryTags,
  initialCollectionTags,
  initialGeoTags,
  initialThemeTags,
}: Props) {
  const router = useRouter();

  const setTagsParams = (
    tags: number[],
    type: "THÈMES" | "NIVEAU GÉOGRAPHIQUE" | "CATÉGORIES" | "COLLECTIONS"
  ) => {
    const params = new URLSearchParams(window.location.search);

    const tagPrefix =
      type === "THÈMES"
        ? "theme"
        : type === "CATÉGORIES"
        ? "category"
        : type === "COLLECTIONS"
        ? "collection"
        : type === "NIVEAU GÉOGRAPHIQUE"
        ? "geo"
        : "";

    if (!tagPrefix) return;

    if (!tags || tags.length === 0) {
      params.delete("page");
      params.delete("theme");
      params.delete("category");
      params.delete("collection");
      params.delete("geo");
      router.push(`${window.location.pathname}`, { scroll: false });
      return;
    }

    params.delete("page");
    params.delete(tagPrefix);

    params.set(tagPrefix, tags.join(" "));

    router.push(`${window.location.pathname}?${params}`, { scroll: false });
  };

  const getInitCheckedArr = () => {
    const themesTags = !initialThemeTags
      ? []
      : initialThemeTags.split(" ").map((elt) => +elt);

    const collectionsTags = !initialCollectionTags
      ? []
      : initialCollectionTags.split(" ").map((elt) => +elt);

    const geosTags = !initialGeoTags
      ? []
      : initialGeoTags.split(" ").map((elt) => +elt);

    const categoriesTags = !initialCategoryTags
      ? []
      : initialCategoryTags.split(" ").map((elt) => +elt);

    let result: InitCheck = {
      themes: { level1: [], level2: [] },
      collections: { level1: [], level2: [] },
      categories: { level1: [], level2: [] },
      geos: { level1: [], level2: [] },
    };

    result.themes.level1 = themesTags.filter((elt) => elt % 10 === 0);
    result.themes.level2 = themesTags.filter((elt) => elt % 10 !== 0);

    result.categories.level1 = categoriesTags.filter((elt) => elt % 10 === 0);
    result.categories.level2 = categoriesTags.filter((elt) => elt % 10 !== 0);

    result.collections.level1 = collectionsTags.filter((elt) => elt % 10 === 0);
    result.collections.level2 = collectionsTags.filter((elt) => elt % 10 !== 0);

    result.geos.level1 = geosTags.filter((elt) => elt % 10 === 0);
    result.geos.level2 = geosTags.filter((elt) => elt % 10 !== 0);

    return result;
  };

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
        categories: categories.map((elt) => {
          const children = elt.children.map((child) => ({
            ...child,
            checked: getInitCheckedArr().categories.level2.includes(
              child.norder
            ),
          }));
          return {
            ...elt,
            children: children,
            checked: getInitCheckedArr().categories.level1.includes(elt.norder),
          };
        }),
        themes: themes.map((elt) => {
          const children = elt.children.map((child) => ({
            ...child,
            checked: getInitCheckedArr().themes.level2.includes(child.norder),
          }));
          return {
            ...elt,
            children: children,
            checked: getInitCheckedArr().themes.level1.includes(elt.norder),
          };
        }),
        geos: geos.map((elt) => {
          const children = elt.children.map((child) => ({
            ...child,
            checked: getInitCheckedArr().geos.level2.includes(child.norder),
          }));
          return {
            ...elt,
            children: children,
            checked: getInitCheckedArr().geos.level1.includes(elt.norder),
          };
        }),
        collections: collections.map((elt) => {
          const children = elt.children.map((child) => ({
            ...child,
            checked: getInitCheckedArr().collections.level2.includes(
              child.norder
            ),
          }));
          return {
            ...elt,
            children: children,
            checked: getInitCheckedArr().collections.level1.includes(
              elt.norder
            ),
          };
        }),
      })
    );
    initialized.current = true;
  }

  const themesTags = useAppSelector((state) => selectThemesTags(state));
  const categoriesTags = useAppSelector((state) => selectCategoriesTags(state));
  const geosTags = useAppSelector((state) => selectGeosTags(state));
  const collectionsTags = useAppSelector((state) =>
    selectCollectionsTags(state)
  );

  useEffect(() => {
    setTagsParams(themesTags, "THÈMES");
  }, [themesTags]);

  useEffect(() => {
    setTagsParams(categoriesTags, "CATÉGORIES");
  }, [categoriesTags]);

  useEffect(() => {
    setTagsParams(geosTags, "NIVEAU GÉOGRAPHIQUE");
  }, [geosTags]);

  useEffect(() => {
    setTagsParams(collectionsTags, "COLLECTIONS");
  }, [collectionsTags]);

  return (
    <div
      className="container mx-2 px-5 md:mx-auto my-5 min-h-screen grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] gap-3 "
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
