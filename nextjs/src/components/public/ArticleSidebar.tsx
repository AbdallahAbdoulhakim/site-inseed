"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  CategoriesCount,
  LatestArticle,
  Tag,
} from "@/components/public/ArticlePage";

import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

interface Props {
  categoriesCount: CategoriesCount[];
  articlesList: LatestArticle[];
  tagsList: Tag[];
}

export default function ArticleSidebar({
  categoriesCount,
  articlesList,
  tagsList,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState<string | null>(null);

  const setSearchParams = (search: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", search);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="p-[30px]  shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-[10px] h-fit">
      <div className="sidebar-item search-form">
        <h3 className="text-xl font-bold p-0 m-0 text-default">Rechercher</h3>
        <form
          className="mt-3 bg-white border border-[#333333]/30 py-[5px] px-[10px] relative rounded-[50px]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!search) return;
            setSearchParams(search);
          }}
        >
          <input
            className="focus:outline-none border-0 p-1 rounded-[50px] w-[calc(100%-60px)]"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <button
            className="absolute top-0 right-0 bottom-0 border-0 text-base px-[25px] cursor-pointer -mr-[1px] bg-primary text-white transition-all duration-300 rounded-[50px] leading-0 hover:bg-[#008374]/80"
            type="submit"
          >
            <IoMdSearch className="leading-0" size={18} />
          </button>
        </form>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold p-0 m-0 text-default">Catégories</h3>
        <ul className="mt-3 list-none p-0">
          {categoriesCount.map((cat) => (
            <li className="[&:not(:first-child)]:pt-2.5" key={cat.id}>
              <Link
                className="text-default transition-all duration-300 hover:text-primary"
                href={`/news/${cat.slug}`}
              >
                {cat.name}
              </Link>
              <span className="pl-[5px] text-[#333333]/40 text-[14px]">
                ({cat.articles})
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-bold p-0 m-0 text-default">
          Articles Récents
        </h3>

        <div className="mt-3">
          {articlesList.map((article) => (
            <div
              key={article.id}
              className="post-item [&:not(:first-child)]:mt-[30px]"
            >
              <Image
                width={80}
                height={80}
                className="float-left"
                src={article.thumbnail}
                alt={article.title}
              />
              <div>
                <h4 className="text-[15px] ml-[95px] font-bold">
                  <Link
                    className="text-default transition-all duration-300 hover:text-primary"
                    href={`/news/${article.categorySlug}/${article.slug}`}
                  >
                    {article.title}
                  </Link>
                </h4>
                <time
                  className="block ml-[95px] italic text-[14px] text-[#333333]/40"
                  dateTime={article.publicationDate}
                >
                  {new Date(article.publicationDate).toLocaleDateString(
                    "fr-FR",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 -mb-[10px]">
        <h3 className="text-xl font-bold p-0 m-0 text-default">Étiquettes</h3>
        <ul className="mt-3 list-none p-0">
          {tagsList.map((tag) => (
            <li className="inline-block" key={tag.id}>
              <Link
                className="text-[#555555] text-[14px] py-[6px] px-[20px] my-0 mr-[6px] mb-[8px] border border-[#d5d5d5] inline-block transition-all duration-300 rounded-[50px] hover:text-white hover:border-primary hover:bg-primary"
                href={`/news?tag=${tag.slug}`}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
