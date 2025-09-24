"use client";

import { useState, useEffect } from "react";

import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <>
          <button
            onClick={scrollToTop}
            className="fixed cursor-pointer right-[15px] bottom-[15px] w-[44px] h-[44px] transition-all duration-400 rounded-[50px] z-[99999] flex items-center justify-center bg-secondary hover:bg-secondary/80 hover:text-white"
          >
            <FaArrowUp className="text-white leading-0 text-2xl" size={15} />
          </button>
        </>
      )}
    </>
  );
}
