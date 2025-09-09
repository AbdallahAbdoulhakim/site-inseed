"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

interface TeamMemberProps {
  delay: number;
  name: string;
  description: string;
  img: string;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
}

export default function TeamMember({
  delay,
  name,
  description,
  img,
  twitter,
  facebook,
  linkedin,
  instagram,
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
      <div className="flex flex-col items-center justify-around">
        <div className="relative h-[276px] w-[276px]">
          <Image
            src={img}
            className="rounded-[10px] overflow-hidden object-cover max-w-full h-auto"
            alt=""
            fill
            quality={80}
            sizes="100vw"
          />
        </div>

        <h4 className="font-bold font-montserrat mt-4 mb-0.5 text-xl">
          {name}
        </h4>
        <span className="block text-[14px] text-[#6c757d]">{description}</span>
        <div className="mt-4 mb-2.5 flex items-center justify-around h-8 w-full">
          {twitter && (
            <Link
              className="text-[#a2a2a2] group hover:border-primary/90 transition-all rounded-[50%] w-[40px] h-[40px] flex items-center justify-center border border-[#bbbbbb]"
              href={twitter}
            >
              <FaXTwitter className="group-hover:text-primary/90" size={18} />
            </Link>
          )}
          {facebook && (
            <Link
              className="text-[#a2a2a2] group hover:border-primary/90 transition-all rounded-[50%] w-[40px] h-[40px] flex items-center justify-center border border-[#bbbbbb]"
              href={facebook}
            >
              <FaFacebook className="group-hover:text-primary/90" size={18} />
            </Link>
          )}
          {instagram && (
            <Link
              className="text-[#a2a2a2] group hover:border-primary/90 transition-all rounded-[50%] w-[40px] h-[40px] flex items-center justify-center border border-[#bbbbbb]"
              href={instagram}
            >
              <FaInstagram className="group-hover:text-primary/90" size={18} />
            </Link>
          )}
          {linkedin && (
            <Link
              className="text-[#a2a2a2] group hover:border-primary/90 transition-all rounded-[50%] w-[40px] h-[40px] flex items-center justify-center border border-[#bbbbbb]"
              href={linkedin}
            >
              <FaLinkedin className="group-hover:text-primary/90" size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
