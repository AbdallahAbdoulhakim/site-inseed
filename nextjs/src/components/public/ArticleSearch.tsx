"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { IoMdSearch } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaFilter, FaCaretDown } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tag } from "@/components/public/ArticlePage";
import { Dispatch, RefObject, SetStateAction } from "react";
import { useRouter } from "next/navigation";

interface Props {
  tagsList: Tag[];
  search: string | null;
  setSearchParams: () => void;
  removeSearchParams: () => void;
  setSearch: Dispatch<SetStateAction<string | null>>;
  inputRef: RefObject<HTMLInputElement | null>;
  tagsCheck: {
    slug: string;
    checked: boolean;
  }[];
  setTagsCheck: Dispatch<
    SetStateAction<
      {
        slug: string;
        checked: boolean;
      }[]
    >
  >;
}

export default function ArticleSearch({
  tagsList,
  search,
  setSearch,
  setSearchParams,
  removeSearchParams,
  inputRef,
  tagsCheck,
  setTagsCheck,
}: Props) {
  const router = useRouter();

  const setTagsParams = (tags: string[]) => {
    const params = new URLSearchParams(window.location.search);
    if (!tags || tags.length === 0) {
      params.delete("page");
      params.delete("tags");
      router.push(`${window.location.pathname}?${params}`, { scroll: false });
      return;
    }

    params.delete("page");
    params.delete("tags");

    tags.forEach((tag) => {
      params.append("tags", tag);
    });

    router.push(`${window.location.pathname}?${params}`);
  };

  const getTagsParams = () => {
    const params = new URLSearchParams(window.location.search);
    return params.getAll("tags");
  };

  useEffect(() => {
    tagsList.forEach((tag) => {
      setTagsCheck((prev) => {
        const alreadyThere = prev.find((curr) => tag.slug === curr.slug);

        if (alreadyThere) return prev;

        const tagsInUrl = getTagsParams();
        const tagInUrl = tagsInUrl
          ? !!tagsInUrl.find((curr) => curr === tag.slug)
          : false;

        return [...prev, { slug: tag.slug, checked: tagInUrl }];
      });
    });
  }, [tagsList]);

  useEffect(() => {
    const checkedTags = tagsCheck
      .filter((tag) => tag.checked)
      .map((tag) => tag.slug);

    setTagsParams(checkedTags);
  }, [tagsCheck]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, slug: string) => {
    setTagsCheck((prev) => {
      const tagIndex = prev.findIndex((curr) => curr.slug === slug);
      const tag = prev.find((curr) => curr.slug === slug);

      return [
        ...prev.slice(0, tagIndex),
        { slug: slug, checked: !tag?.checked || false },
        ...prev.slice(tagIndex + 1),
      ];
    });
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4 shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-[10px] mt-5 w-full">
      <div className="w-full md:w-1/2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!search) {
              removeSearchParams();
              return;
            }
            setSearchParams();
          }}
          className="flex items-center"
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoMdSearch className="w-5 h-5 text-primary" />
            </div>
            <input
              type="text"
              id="simple-search"
              className="block w-full pl-10 text-sm focus:outline-none bg-white border border-[#333333]/30 p-1 rounded-[50px]"
              placeholder="Rechercher"
              onChange={(e) => setSearch(e.target.value)}
              ref={inputRef}
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-white cursor-pointer" variant="default">
              <FaFilter className="w-4 h-4 text-white" />
              Filtrer
              <FaCaretDown className="-mr-1 ml-1.5 w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border border-[#333333]/30">
            <h6 className="my-3 px-3 text-sm font-semibold text-primary">
              Étiquettes
            </h6>
            <ul className="space-y-2 text-sm mb-3 px-3">
              {tagsList.map((tag) => (
                <li key={tag.slug} className="flex items-center group">
                  <div className="inline-flex items-center">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary"
                        id={`check-${tag.slug}`}
                        checked={
                          tagsCheck.find((curr) => curr.slug === tag.slug)
                            ?.checked || false
                        }
                        onChange={(e) => handleChange(e, tag.slug)}
                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <FaCheck className="h-3.5 w-3.5" />
                      </span>
                    </label>
                    <div className="pl-2"> {tag.name}</div>
                  </div>
                </li>
              ))}
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
