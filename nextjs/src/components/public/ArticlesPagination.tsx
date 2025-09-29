"use client";

import { NEWS_ITEM_PER_PAGE } from "@/lib/settings";
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

  if (count < NEWS_ITEM_PER_PAGE) return;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`, { scroll: false });
  };

  const hasPrev = NEWS_ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = NEWS_ITEM_PER_PAGE * (page - 1) + NEWS_ITEM_PER_PAGE < count;

  const pagesToShow: NumberOrEllipsis[] =
    Math.ceil(count / NEWS_ITEM_PER_PAGE) < 6
      ? Array.from(
          { length: Math.ceil(count / NEWS_ITEM_PER_PAGE) },
          (_, index) => index + 1
        )
      : page < 4
      ? [1, 2, 3, 4, "...", Math.ceil(count / NEWS_ITEM_PER_PAGE)]
      : page > Math.ceil(count / NEWS_ITEM_PER_PAGE) - 3
      ? [
          1,
          "...",
          Math.ceil(count / NEWS_ITEM_PER_PAGE) - 3,
          Math.ceil(count / NEWS_ITEM_PER_PAGE) - 2,
          Math.ceil(count / NEWS_ITEM_PER_PAGE) - 1,
          Math.ceil(count / NEWS_ITEM_PER_PAGE),
        ]
      : [
          1,
          "...",
          page - 1,
          page,
          page + 1,
          "...",
          Math.ceil(count / NEWS_ITEM_PER_PAGE),
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
        className="cursor-pointer text-[11px] lg:text-base py-[7px] px-[10px] flex flex-row items-center justify-center lg:mx-[5px] transition duration-300 rounded-[10px] border border-primary-light text-primary-light hover:bg-primary/70 hover:text-white  font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100"
      >
        <>
          <ChevronLeft className="lg:h-4 lg:w-4 w-2 h-2" />
          <span className="hidden lg:block">Previous</span>
        </>
      </button>
      <div className="flex items-center gap-1 lg:gap-2 text-sm">
        {pagesToShow.map((elt, index) =>
          elt !== "..." ? (
            <button
              className={`rounded-sm text-[11px] lg:text-base py-[3px] px-[8px] lg:py-[7px] lg:px-[16px] lg:mx-[5px]  ${
                elt === page
                  ? " text-slate-100 flex flex-row items-center justify-center  transition duration-300 rounded-[10px] bg-primary/90 hover:bg-primary/70 disabled active:scale-100 cursor-not-allowed"
                  : " border border-primary-light text-primary-light flex flex-row items-center justify-center cursor-pointer active:scale-95 transition duration-300 rounded-[10px] hover:bg-primary hover:text-white"
              }`}
              key={index}
              onClick={() => changePage(elt)}
            >
              {elt}
            </button>
          ) : (
            <MoreHorizontal key={index} className="lg:h-4 lg:w-4 w-2 h-2" />
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
        className="cursor-pointer text-[11px] lg:text-base py-[7px] px-[10px] flex flex-row items-center justify-center mx-[5px] transition duration-300 rounded-[10px] border border-primary-light text-primary-light hover:bg-primary/70 hover:text-white  font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100"
      >
        <>
          <span className="hidden lg:block">Next</span>
          <ChevronRight className="lg:h-4 lg:w-4 w-2 h-2" />
        </>
      </button>
    </div>
  );
}
