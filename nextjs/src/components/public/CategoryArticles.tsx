"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import NewsArticleBox from "@/components/base/NewsArticleBox";
import ArticlesPagination from "@/components/public/ArticlesPagination";
import ArticleSearch from "@/components/public/ArticleSearch";
import { Tag } from "@/components/public/ArticlePage";
import { ImSad } from "react-icons/im";

interface ArticleBox {
  id: string;
  category: string;
  categorySlug: string;
  thumbnail: string;
  title: string;
  articleSlug: string;
  author: string;
  authorImg: string;
  publicationDate: string;
  delay: number;
}

interface CategoryArticlesProps {
  data: ArticleBox[];
  count: number;
  page: number;
  tagsList: Tag[];
}

export default function CategoryArticles({
  data,
  count,
  page = 1,
  tagsList,
}: CategoryArticlesProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const router = useRouter();

  const [search, setSearch] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setSearchParams = () => {
    if (!search) return;
    const params = new URLSearchParams(window.location.search);
    params.delete("page");
    params.set("search", search);
    router.push(`${window.location.pathname}?${params}`);
  };

  const removeSearchParams = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    router.push(`${window.location.pathname}`);

    setSearch(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const setTagsParams = (tag: string) => {
    if (!tag) return;

    const params = new URLSearchParams(window.location.search);
    params.delete("page");

    if (params.has("tags")) {
      params.append("tags", tag);
    } else {
      params.set("tags", tag);
    }
    router.push(`${window.location.pathname}?${params}`);
  };

  const removeTagsParams = (tag: string) => {
    if (!tag) return;

    const params = new URLSearchParams(window.location.search);
    params.delete("page");

    const prevValues = params.getAll("tags");

    const newValues = prevValues.filter((value) => value !== tag);

    params.delete("tags");

    if (newValues.length === 0) return;

    newValues.forEach((value) => {
      params.append("tags", value);
    });
  };

  return (
    <section
      data-aos="fade-up"
      data-aos-delay={100}
      className="flex flex-col items-center container mx-auto"
    >
      <ArticleSearch
        setSearch={setSearch}
        search={search}
        setSearchParams={setSearchParams}
        removeSearchParams={removeSearchParams}
        setTagsParams={setTagsParams}
        removeTagsParams={removeTagsParams}
        inputRef={inputRef}
        tagsList={tagsList}
      />
      {data.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-10">
          {data.map(
            ({
              id,
              category,
              categorySlug,
              thumbnail,
              title,
              articleSlug,
              author,
              authorImg,
              publicationDate,
              delay,
            }) => (
              <NewsArticleBox
                key={id}
                category={category}
                categorySlug={categorySlug}
                thumbnail={thumbnail}
                authorImg={authorImg}
                articleSlug={articleSlug}
                title={title}
                author={author}
                publicationDate={publicationDate}
                delay={delay}
              />
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <ImSad className="mx-auto h-16 w-16 text-primary" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Aucun résultat trouvé
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Nous n'avons trouvé aucun élément correspondant à votre recherche.
            Essayez d'ajuster vos termes de recherche.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={removeSearchParams}
              className="cursor-pointer inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:primary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            >
              Réinitialiser la recherche
            </button>
          </div>
        </div>
      )}

      <ArticlesPagination page={page} count={count} />
    </section>
  );
}
