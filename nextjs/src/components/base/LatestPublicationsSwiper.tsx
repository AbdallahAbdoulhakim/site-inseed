"use client";

import React from "react";

import { JSX } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  VscCalendar,
  VscArchive,
  VscOutput,
  VscRepo,
  VscGraphLine,
  VscBrowser,
} from "react-icons/vsc";

import { MdAccountBalance } from "react-icons/md";

import { FaMoneyBillTrendUp } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import LatestPublication from "@/components/base/LatestPublication";
import type { PublicationType } from "@/components/base/LatestPublication";

interface Slide {
  id: string;
  type: PublicationType;
  short: string;
  publicationSlug: string;
  publicationDate: string;
  delay: number;
}

interface SliderProps {
  data: Slide[];
}

const fetchIcon = (type: string): JSX.Element => {
  if (type === "Bulletin IHPC") {
    return <FaMoneyBillTrendUp className="w-[70px] h-[70px] text-primary" />;
  }

  if (type === "Informations Rapides") {
    return <VscGraphLine className="w-[70px] h-[70px] text-primary" />;
  }

  if (type === "Chiffres clés") {
    return <VscRepo className="w-[70px] h-[70px] text-primary" />;
  }

  if (type === "Série chronologiques") {
    return <VscOutput className="w-[70px] h-[70px] text-primary" />;
  }

  if (type === "Jeux de données") {
    return <VscArchive className="w-[70px] h-[70px] text-primary" />;
  }

  if (type === "Chiffres détaillés") {
    return <VscCalendar className="w-[70px] h-[70px] text-primary" />;
  }

  if (type === "Comptes Nationaux") {
    return <MdAccountBalance className="w-[70px] h-[70px] text-primary" />;
  }

  return <VscBrowser className="w-[70px] h-[70px] text-primary" />;
};

export default function LatestPublicationsSwiper({ data }: SliderProps) {
  return (
    <div className="w-full p-5">
      <ul className="h-fit w-full">
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
            ({ id, type, short, publicationSlug, publicationDate, delay }) => (
              <SwiperSlide key={id}>
                <LatestPublication
                  Icon={fetchIcon(type)}
                  short={short}
                  type={type}
                  publicationSlug={publicationSlug}
                  publicationDate={publicationDate}
                  delay={delay}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </ul>
    </div>
  );
}
