"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

export default function HeroLogo() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div className="order-1 lg:order-2 h-[35vh] flex items-center justify-center">
      <Image
        width={224}
        height={186}
        src="/logo-inseed.svg"
        className="h-full w-auto"
        alt=""
        data-aos="zoom-out"
        data-aos-delay={100}
      />
    </div>
  );
}
