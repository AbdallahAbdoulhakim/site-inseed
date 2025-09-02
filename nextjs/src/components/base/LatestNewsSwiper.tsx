"use client";

import React from "react";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import LatestArticle from "@/components/base/LatestArticle";

interface Slide {
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

interface SliderProps {
  data: Slide[];
}

export default function LatestNewsSwiper({ data }: SliderProps) {
  return (
    <div className="w-full p-5">
      <div className="h-fit w-full">
        <Swiper
          pagination={{ type: "bullets", clickable: true }}
          autoplay={true}
          loop={true}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
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
              <SwiperSlide key={id}>
                <LatestArticle
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
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
