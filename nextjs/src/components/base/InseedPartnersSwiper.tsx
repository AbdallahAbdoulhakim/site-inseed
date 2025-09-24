"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

interface PartnerSlider {
  id: string;
  name: string;
  url: string;
  image: string;
}

interface Props {
  data: PartnerSlider[];
}

export default function InseedPartnersSwiper({ data }: Props) {
  return (
    <div className="w-full p-5">
      <div className="h-fit w-full">
        <Swiper
          pagination={{ type: "bullets", clickable: true }}
          autoplay={true}
          loop={true}
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={35}
          centeredSlides={true}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {data.map(({ id, name, url, image }) => (
            <SwiperSlide key={id}>
              <Link className="" href={url}>
                <div className="w-[60px] h-[100px] lg:w-[86px]  xl:w-[115px]  xl:h-[135px] flex flex-col items-center justify-center">
                  <Image
                    className="w-[60px] h-auto"
                    loading="lazy"
                    src={image}
                    alt={name}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="100vw"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
