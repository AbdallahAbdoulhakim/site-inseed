"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Example modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Example module styles
import "swiper/css/pagination"; // Example module styles

export default function Test() {
  return (
    <Swiper
      modules={[Navigation, Pagination]} // Pass imported modules
      navigation // Enable navigation arrows
      pagination={{ clickable: true }} // Enable pagination dots
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1 Content</SwiperSlide>
      <SwiperSlide>Slide 2 Content</SwiperSlide>
      <SwiperSlide>Slide 3 Content</SwiperSlide>
    </Swiper>
  );
}
