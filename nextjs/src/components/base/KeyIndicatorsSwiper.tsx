"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

interface IndicatorSlider {
  id: string;
}

interface Props {
  data: IndicatorSlider[];
}

export default function KeyIndicatorsSwiper({ data }: Props) {
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
          {data.map(({ id }) => (
            <SwiperSlide key={id}>
              <div className=" w-[60px] h-[70px] lg:w-[86px] lg:h-[100px] xl:w-[115px]  xl:h-[135px]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae non rerum earum atque sapiente possimus? Placeat
                eligendi adipisci laudantium provident architecto. Eius
                dignissimos similique minus modi aliquam ab voluptatibus nisi?
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </div>
  );
}
