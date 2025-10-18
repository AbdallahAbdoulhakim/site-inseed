"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import KeyIndicator from "@/components/base/KeyIndicator";

interface IndicatorSlider {
  id: string;
  title: string;
  subtitle: string;
  legend: string;
  yAxisLegend: string;
  xAxisLegend: string;
  dataUrl: string;
  delay: number;
  publication: string;
}

interface Props {
  data: IndicatorSlider[];
}

export default function KeyIndicatorsSwiper({ data }: Props) {
  return (
    <div className="w-full p-5">
      <div className="h-full w-full">
        <Swiper
          autoplay={true}
          loop={true}
          modules={[Autoplay, Navigation]}
          navigation={true}
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
              title,
              subtitle,
              legend,
              xAxisLegend,
              yAxisLegend,
              dataUrl,
              delay,
              publication,
            }) => (
              <SwiperSlide key={id}>
                <KeyIndicator
                  title={title}
                  subtitle={subtitle}
                  legend={legend}
                  delay={delay}
                  yAxisLegend={yAxisLegend}
                  xAxisLegend={xAxisLegend}
                  dataUrl={dataUrl}
                  publication={publication}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
