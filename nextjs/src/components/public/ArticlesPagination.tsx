"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type NumberOrEllipsis = number | "...";

export default function Pagination({
  page,
  count,
}: {
  page: number;
  count: number;
}) {
  const router = useRouter();

  if (count < ITEM_PER_PAGE) return;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`, { scroll: false });
  };

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const pagesToShow: NumberOrEllipsis[] =
    Math.ceil(count / ITEM_PER_PAGE) < 8
      ? Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => index + 1
        )
      : page < 7
      ? [1, 2, 3, 4, 5, 6, 7, "...", Math.ceil(count / ITEM_PER_PAGE)]
      : page > Math.ceil(count / ITEM_PER_PAGE) - 7
      ? [
          1,
          "...",
          Math.ceil(count / ITEM_PER_PAGE) - 6,
          Math.ceil(count / ITEM_PER_PAGE) - 5,
          Math.ceil(count / ITEM_PER_PAGE) - 4,
          Math.ceil(count / ITEM_PER_PAGE) - 3,
          Math.ceil(count / ITEM_PER_PAGE) - 2,
          Math.ceil(count / ITEM_PER_PAGE) - 1,
          Math.ceil(count / ITEM_PER_PAGE),
        ]
      : [
          1,
          "...",
          page - 2,
          page - 1,
          page,
          page + 1,
          page + 2,
          "...",
          Math.ceil(count / ITEM_PER_PAGE),
        ];

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => {
          if (!hasPrev) {
            return;
          }
          changePage(page - 1);
        }}
        disabled={!hasPrev}
        className="cursor-pointer py-[4px] px-[8px] md:py-[7px] md:px-[16px] flex flex-row items-center justify-center mx-[5px] transition duration-300 rounded-[10px] border border-primary-light text-primary-light hover:bg-primary/70 hover:text-white  font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100"
      >
        <>
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden md:block">Previous</span>
        </>
      </button>
      <div className="flex items-center gap-2 text-sm">
        {pagesToShow.map((elt, index) =>
          elt !== "..." ? (
            <button
              className={`px-2 rounded-sm  ${
                elt === page
                  ? " text-slate-100 py-[4px] px-[8px] md:py-[7px] md:px-[16px] flex flex-row items-center justify-center mx-[5px] transition duration-300 rounded-[10px] bg-primary/90 hover:bg-primary/70 disabled active:scale-100 cursor-not-allowed"
                  : " border border-primary-light text-primary-light py-[4px] px-[8px] md:py-[7px] md:px-[16px] flex flex-row items-center justify-center cursor-pointer active:scale-95 mx-[5px] transition duration-300 rounded-[10px] hover:bg-primary hover:text-white"
              }`}
              key={index}
              onClick={() => changePage(elt)}
            >
              {elt}
            </button>
          ) : (
            <MoreHorizontal key={index} className="h-4 w-4" />
          )
        )}
      </div>
      <button
        onClick={() => {
          if (!hasNext) {
            return;
          }
          changePage(page + 1);
        }}
        disabled={!hasNext}
        className="cursor-pointer py-[4px] px-[8px] md:py-[7px] md:px-[16px] flex flex-row items-center justify-center mx-[5px] transition duration-300 rounded-[10px] border border-primary-light text-primary-light hover:bg-primary/70 hover:text-white  font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100"
      >
        <>
          <span className="hidden md:block">Next</span>
          <ChevronRight className="h-4 w-4" />
        </>
      </button>
    </div>
  );
}
