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
      <ul className="h-fit w-full">
        <Swiper
          pagination={{ type: "bullets", clickable: true }}
          autoplay={true}
          loop={true}
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={35}
          breakpoints={{
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
              <Link href={url}>
                <div className=" w-[60px] h-[70px] lg:w-[86px] lg:h-[100px] xl:w-[115px]  xl:h-[135px]">
                  <Image src={image} alt={name} fill />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </div>
  );
}
