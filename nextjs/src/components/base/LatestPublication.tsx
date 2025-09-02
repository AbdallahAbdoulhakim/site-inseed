"use client";

import Link from "next/link";
import { JSX } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

interface LatestPublicationProps {
  type:
    | "Informations Rapides"
    | "Chiffres clés"
    | "Série chronologiques"
    | "Jeux de données"
    | "Chiffres détaillés";
  Icon: JSX.Element;
  title: string;
  publicationSlug: string;
  publicationDate: string;
  delay: number;
}

export default function LatestPublication({
  type,
  title,
  Icon,
  publicationSlug,
  publicationDate,
  delay,
}: LatestPublicationProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const date = new Date(publicationDate);
  return (
    <article
      className="shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-primary/90 hover:bg-primary/10 cursor-pointer font-montserrat! bg-background p-5 h-[220px]  rounded-[10px] overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex flex-col h-full justify-center">
        <div className="flex flex-row space-x-3 items-center">
          <div className="w-[100px] h-[100px] p-2">{Icon}</div>
          <div className="flex flex-col grow">
            <p className="text-xs text-primary/80">
              {date.toLocaleDateString("fr-FR")}
            </p>
            <p className="text-xs text-primary/80 uppercase">{type}</p>
            <p className="text-xs md:text-sm lg:text-base font-semibold text-primary hover:text-primary/60 mt-[10px]">
              <Link href={publicationSlug}>{title}</Link>
            </p>

            {/* <h2 className="text-[22px] font-bold p-0 mb-[20px]">
            <Link
              className="text-default hover:text-primary"
              href={articleSlug}
            >
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
          </div> */}
          </div>
        </div>
      </div>
    </article>
  );
}
