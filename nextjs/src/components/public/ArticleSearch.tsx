"use client";
import { useRouter } from "next/navigation";
import { IoMdSearch } from "react-icons/io";
import { FaFilter, FaCaretDown } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState, useEffect } from "react";
import { Tag } from "@/components/public/ArticlePage";

interface Props {
  tagsList: Tag[];
}

export default function ArticleSearch({ tagsList }: Props) {
  return (
    <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4 shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-[10px] mt-5 w-full">
      <div className="w-full md:w-1/2">
        <form className="flex items-center">
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
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-white" variant="default">
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
                <li key={tag.slug} className="flex items-center">
                  <input
                    id={tag.slug}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-primary border-primary rounded"
                  />
                  <label
                    htmlFor={tag.slug}
                    className="ml-2 text-sm font-medium text-[#333333]/90"
                  >
                    {tag.name}
                  </label>
                </li>
              ))}
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
