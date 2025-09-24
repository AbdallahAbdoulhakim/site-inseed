"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/base/Navbar";
import MobileNavbar from "@/components/base/MobileNavbar";
import { MenuItem } from "@/components/base/Header";

import { useEffect, useRef } from "react";

export default function HeaderContainer({ menu }: { menu: MenuItem[] }) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const headerOffset = headerRef.current.offsetTop;
    const nextElement = headerRef.current.nextElementSibling;

    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        headerRef.current?.classList.add(
          "fixed",
          "top-0",
          "left-0",
          "h-[70px]",
          "shadow-[0_2px_20px__rgb(0,0,0,0.1)]"
        );
        if (nextElement) nextElement.classList.add("mt-[70px]");
      } else {
        headerRef.current?.classList.remove(
          "fixed",
          "top-0",
          "left-0",
          "h-[70px]",
          "shadow-[0_2px_20px__rgb(0,0,0,0.1)]"
        );
        if (nextElement) nextElement.classList.remove("mt-[70px]");
      }
    };

    window.addEventListener("load", headerFixed);
    window.addEventListener("scroll", headerFixed);

    return () => {
      window.removeEventListener("load", headerFixed);
      window.removeEventListener("scroll", headerFixed);
    };
  }, []);
  return (
    <header
      ref={headerRef}
      className="w-full mx-auto bg-primary text-default z-10 transition-all duration-500"
    >
      <div className="container mx-auto px-4 relative flex items-center justify-between min-h-15 pt-[10px]">
        {/* BRANDING */}
        <Link href="/" className="leading-none flex items-center">
          <Image
            className="max-h-10 w-auto mr-2 hidden lg:block"
            width={40}
            height={40}
            src="/logo_inseed_alt.png"
            alt=""
          />
          <h1 className="text-4xl m-0 font-semibold text-background font-montserrat block xl:hidden 2xl:block">
            INSEED
          </h1>
          <span className="text-secondary ml-0.5 text-5xl">.</span>
        </Link>

        <Navbar menu={menu} />
        <MobileNavbar menu={menu} />
      </div>
    </header>
  );
}
