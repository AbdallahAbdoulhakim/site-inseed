"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NewsArticleBox from "@/components/base/NewsArticleBox";
import ArticlesPagination from "@/components/public/ArticlesPagination";

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
}

export default function CategoryArticles({
  data,
  count,
  page = 1,
}: CategoryArticlesProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <section className="flex flex-col items-center">
      <div
        className="container mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-15"
        data-aos="fade-up"
        data-aos-delay={100}
      >
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
      <ArticlesPagination page={page} count={count} />
    </section>
  );
}
