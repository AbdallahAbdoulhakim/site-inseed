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
  tags: { name: string; slug: string }[];
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
  slug: string;
  categorySlug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface ArticlePageProps {
  contentData: ContentData;
  categoriesCount: CategoriesCount[];
  articlesList: LatestArticle[];
  tagsList: Tag[];
}

export default function ArticlePage({
  contentData,
  categoriesCount,
  articlesList,
  tagsList,
}: ArticlePageProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const {
    category,
    categorySlug,
    images,
    title,
    content,
    tags,
    author,
    authorImg,
    authorDesc,
    authorTwitter,
    authorFacebook,
    authorInstagram,
    publicationDate,
  } = contentData;

  return (
    <section className="container mx-auto">
      <div
        className="xl:px-0 min-h-lvh my-10 items-center justify-center flex flex-col"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <div className="justify-center grid grid-cols-1 lg:grid-cols-[840px_420px] gap-8">
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
            tags={tags}
          />
          <ArticleSidebar
            categoriesCount={categoriesCount}
            articlesList={articlesList}
            tagsList={tagsList}
          />
        </div>
      </div>
    </section>
  );
}
