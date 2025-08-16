"use client";

import Link from "next/link";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

interface LatestArticleProps {
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

export default function latestArticle({
  category,
  categorySlug,
  thumbnail,
  title,
  articleSlug,
  author,
  authorImg,
  publicationDate,
  delay,
}: LatestArticleProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const date = new Date(publicationDate);
  return (
    <article
      className="shadow-xl font-montserrat! bg-background p-[30px] h-full rounded-[10px] overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="max-h-[240px] w-auto m-[-30px] mb-[15px] overflow-hidden">
        <img src={thumbnail} alt="" className="max-w-full h-auto" />
      </div>

      <p className="text-base text-[#6f6f6f] mb-[10px]">
        <Link href={categorySlug}>{category}</Link>
      </p>

      <h2 className="text-[22px] font-bold p-0 mb-[20px]">
        <Link className="text-default hover:text-primary" href={articleSlug}>
          {title}
        </Link>
      </h2>

      <div className="flex items-center">
        <img
          src={authorImg}
          alt={author}
          className="max-w-full h-auto w-[50px] rounded-[50%] mr-[15px] shrink-0"
        />
        <div className="post-meta">
          <p className="font-semibold mb-[5px]">{author}</p>
          <p className="text-[14px] text-[#3c3c3c] mb-0">
            <time dateTime={date.toISOString()}>
              {date.toLocaleDateString()}
            </time>
          </p>
        </div>
      </div>
    </article>
  );
}
