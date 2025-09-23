"use client";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import { Publication } from "@/components/public/publications/Publications";
import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import { FiExternalLink } from "react-icons/fi";

interface Props {
  publication: Publication;
}

export default function PublicationBox({ publication }: Props) {
  const [collapsed, setCollapsed] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!publication.abstract) return;
    if (publication.abstract.length > 235) {
      return setShow(true);
    } else {
      return setShow(false);
    }
  }, []);

  return (
    <a
      className={`border-t border-r border-l last:border-b even:bg-[#f6f6f6]  py-4 px-3 cursor-pointer hover:bg-[#ebeff3]  border-[#e0e0e0] flex flex-col space-y-2 ${
        collapsed ? "h-[320px] lg:h-[260px]" : "h-fit"
      } overflow-clip duration-[300] transition-all`}
      href={
        publication.external
          ? publication.url
          : `/publications/publications-database/${publication.publicationSlug}`
      }
    >
      <div className="flex items-center">
        <div
          className={`${
            publication.type === "Bulletin IHPC"
              ? "bg-[#fe6d00]"
              : publication.type === "Jeux de données"
              ? "bg-[#50299f]"
              : ""
          } rounded-xs text-center px-[7px] my-2.5 mr-[6px] text-[11px] lg:text-[13px] text-white`}
        >
          {publication.type}
          {publication.type === "Bulletin IHPC"
            ? ` - N° ${publication.parutionNumber}`
            : ""}
        </div>
        <div className="text-xs text-primary grow">
          {new Date(publication.parutionDate).toLocaleDateString()}
        </div>

        {publication.external && (
          <div className="">
            <FiExternalLink color="#008374" size={20} />
          </div>
        )}
      </div>
      {publication.short && (
        <p className="text-[15px] font-[600] text-[#525457]">
          {publication.short}
        </p>
      )}

      {publication.title && (
        <p className="text-base text-[#525457]">{publication.title}</p>
      )}

      {publication.abstract && (
        <p
          className={`text-base text-justify font-[400] text-[#525457] ${
            collapsed ? "h-[70px] lg:h-[50px]" : "h-fit"
          }  overflow-clip`}
        >
          {publication.abstract}
        </p>
      )}

      {show && (
        <div className="mb-5 flex justify-end group">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation();
              setCollapsed((prev) => !prev);
            }}
            className="p-2 group-hover:border group-hover:border-primary cursor-pointer"
          >
            {collapsed ? (
              <PiCaretDown color="#008374" size={20} />
            ) : (
              <PiCaretUp color="#008374" size={20} />
            )}
          </button>
        </div>
      )}
    </a>
  );
}
