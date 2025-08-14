"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";

interface TeamMemberProps {
  delay: number;
  name: string;
  description: string;
  img: string;
}

export default function TeamMember({
  delay,
  name,
  description,
  img,
}: TeamMemberProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div
      className="flex items-center justify-center w-full text-center bg-white rounded-[10px] py-2.5 overflow-hidden shadow-2xl"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="">
        <Image
          src={img}
          className="rounded-[10px] overflow-hidden"
          alt=""
          width={276}
          height={276}
        />
        <h4 className="font-bold font-montserrat mt-4 mb-0.5 text-xl">
          {name}
        </h4>
        <span className="block text-[14px] text-[#6c757d]">{description}</span>
        <div className="social">
          <a href="">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
