"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface Props {
  data: { id: string; url: string; name: string }[];
}

export default function ArticleImgesSwiper({ data }: Props) {
  return (
    <div className="relative h-[340px] md:h-[520px] xl:h-[728px] overflow-hidden top-0 left-0  rounded-[10px_10px_0_0] min-w-full">
      <Swiper
        pagination={{ type: "bullets", clickable: true }}
        autoplay={true}
        loop={true}
        modules={[Autoplay]}
        slidesPerView={1}
      >
        {data.map(({ id, url, name }) => (
          <SwiperSlide key={id}>
            <div className="h-[340px] md:h-[520px] xl:h-[728px] overflow-clip">
              <Image
                className="max-w-full h-auto"
                loading="lazy"
                src={url}
                alt={name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
