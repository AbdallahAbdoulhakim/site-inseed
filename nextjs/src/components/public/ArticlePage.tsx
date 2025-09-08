"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";
import ArticleImagesSwiper from "@/components/public/ArticleImagesSwiper";
import { LuClock4 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

interface ArticleData {
  category: string;
  categorySlug: string;
  images: { id: string; url: string; name: string }[];
  title: string;
  content: string;
  articleSlug: string;
  author: string;
  authorImg: string;
  publicationDate: string;
}

interface ArticlePageProps {
  data: ArticleData;
}

export default function ArticlePage({ data }: ArticlePageProps) {
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
    articleSlug,
    author,
    authorImg,
    publicationDate,
  } = data;

  const date = new Date(publicationDate);

  const markdownText = `
# Hello, Markdown!
This is a **bold** text and this is *italic*.
- Item 1
- Item 2
  `;

  return (
    <section id="blog" className="blog">
      <div
        className="container mx-auto px-5 lg:px-0 min-h-lvh my-10"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[840px_420px] gap-8">
          <div className="">
            <article
              className={`${
                images.length > 1 ? "m-0 p-0" : "p-7.5"
              }  shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-[10px]`}
            >
              {images.length > 1 ? (
                <ArticleImagesSwiper data={images} />
              ) : (
                <div className="relative h-[340px] md:h-[520px] xl:h-[728px] m-[-30px] mb-[20px] overflow-hidden rounded-[10px_10px_0_0]">
                  <Image
                    src={images[0].url}
                    className="max-w-full h-auto"
                    fill
                    alt="Thumbnail"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className={images.length > 1 ? "p-7" : ""}>
                <h2 className="text-[28px] font-bold p-0 mt-[20px] text-default">
                  {title}
                </h2>
                <div className="mt-5 text-[#6c757d]">
                  <ul className="flex flex-wrap list-none items-center p-0 m-0">
                    <li className="flex items-center">
                      <IoPersonOutline className="text-base mr-2 leading-none text-primary" />
                      <span className="text-[#6c757d] text-[14px] inline leading-[1px]">
                        {author}
                      </span>
                    </li>
                    <li className="flex items-center pl-5">
                      <LuClock4 className="text-base mr-2 leading-none text-primary" />
                      <span>
                        <time dateTime={publicationDate}>
                          {date.toLocaleDateString()}
                        </time>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-5">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </div>
            </article>
          </div>
          <div className="border border-primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil illum
            veniam, corporis culpa quas doloribus reprehenderit rem explicabo,
            facilis error cupiditate repudiandae facere iste animi. Aliquid
            laudantium necessitatibus consequuntur maiores.
          </div>
        </div>
      </div>
    </section>
  );
}
