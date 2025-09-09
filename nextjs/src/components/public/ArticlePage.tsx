"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ArticleContent from "@/components/public/ArticleContent";
import ArticleSidebar from "@/components/public/ArticleSidebar";

interface ContentData {
  category: string;
  categorySlug: string;
  images: { id: string; url: string; name: string }[];
  title: string;
  content: string;
  articleSlug: string;
  author: string;
  authorImg: string;
  authorDesc: string;
  authorTwitter: string;
  authorFacebook: string;
  authorInstagram: string;
  publicationDate: string;
}

export interface CategoriesCount {
  id: string;
  name: string;
  articles: number;
  slug: string;
}

export interface LatestArticle {
  id: string;
  title: string;
  publicationDate: string;
  thumbnail: string;
}

interface ArticlePageProps {
  contentData: ContentData;
  categoriesCount: CategoriesCount[];
  articlesList: LatestArticle[];
}

export default function ArticlePage({
  contentData,
  categoriesCount,
  articlesList,
}: ArticlePageProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const {
    category,
    categorySlug,
    images,
    title,
    content,
    author,
    authorImg,
    authorDesc,
    authorTwitter,
    authorFacebook,
    authorInstagram,
    publicationDate,
  } = contentData;

  return (
    <section>
      <div
        className="container mx-auto px-5 lg:px-0 min-h-lvh my-10"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[840px_420px] gap-8">
          <ArticleContent
            category={category}
            categorySlug={categorySlug}
            images={images}
            title={title}
            content={content}
            author={author}
            authorImg={authorImg}
            authorDesc={authorDesc}
            authorTwitter={authorTwitter}
            authorFacebook={authorFacebook}
            authorInstagram={authorInstagram}
            publicationDate={publicationDate}
          />
          <ArticleSidebar
            categoriesCount={categoriesCount}
            articlesList={articlesList}
          />
        </div>
      </div>
    </section>
  );
}
