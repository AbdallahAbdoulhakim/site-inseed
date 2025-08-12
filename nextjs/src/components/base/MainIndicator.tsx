"use client";

import { JSX, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type IndicatorProps = {
  delay: number;
  Icon: JSX.Element;
  value: string | number;
  label: string;
  description: string;
};

export default function MainIndicator({
  delay,
  Icon,
  value,
  label,
  description,
}: IndicatorProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div data-aos="fade-up" data-aos-delay={delay}>
      <div className="h-[360px] w-full py-[30px] flex flex-col justify-center items-center relative rounded-xl overflow-hidden bg-primary-light group hover:bg-primary-light-hover shadow-xl transition-all ease-in-out cursor-pointer space-y-5">
        <div className="mb-5 text-6xl text-background/60 pt-2.5 inline-block transition-all ease-in-out">
          {Icon}
        </div>
        <h4 className="text-[30px] font-bold mb-5 font-montserrat text-background">
          <a href="">{value}</a>
        </h4>
        <h5 className="text-xl font-bold mb-5 font-montserrat text-background">
          {label}
        </h5>
        <h5 className="text-xs hidden group-hover:block font-semibold mb-5 font-montserrat text-background">
          {description}
        </h5>
      </div>
    </div>
  );
}
