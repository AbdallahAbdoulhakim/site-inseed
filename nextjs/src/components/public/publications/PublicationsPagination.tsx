"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { useAppSelector } from "@/lib/hooks";

import { setPage } from "@/lib/features/publication/publicationFilterSlice";

import { useAppDispatch } from "@/lib/hooks";

import { selectPage } from "@/lib/features/publication/publicationFilterSlice";

type NumberOrEllipsis = number | "...";

export default function PublicationsPagination({ count }: { count: number }) {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => selectPage(state));

  if (count < ITEM_PER_PAGE) return;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", newPage.toString());
    dispatch(setPage({ page: newPage }));

    router.push(`${window.location.pathname}?${params}`, { scroll: false });
  };

  const hasPrev = ITEM_PER_PAGE * (currentPage - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (currentPage - 1) + ITEM_PER_PAGE < count;

  const pagesToShow: NumberOrEllipsis[] =
    Math.ceil(count / ITEM_PER_PAGE) < 8
      ? Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => index + 1
        )
      : currentPage < 7
      ? [1, 2, 3, 4, 5, 6, 7, "...", Math.ceil(count / ITEM_PER_PAGE)]
      : currentPage > Math.ceil(count / ITEM_PER_PAGE) - 7
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
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
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
          changePage(currentPage - 1);
        }}
        disabled={!hasPrev}
        className="cursor-pointer py-[7px] px-[16px] flex flex-row items-center justify-center mx-[5px] transition duration-300 rounded-[10px] border border-primary-light text-primary-light hover:bg-primary/70 hover:text-white  font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100"
      >
        <>
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </>
      </button>
      <div className="flex items-center gap-2 text-sm">
        {pagesToShow.map((elt, index) =>
          elt !== "..." ? (
            <button
              className={`px-2 rounded-sm  ${
                elt === currentPage
                  ? " text-slate-100 py-[7px] px-[16px] flex flex-row items-center justify-center mx-[5px] transition duration-300 rounded-[10px] bg-primary/90 hover:bg-primary/70 disabled active:scale-100 cursor-not-allowed"
                  : " border border-primary-light text-primary-light py-[7px] px-[16px] flex flex-row items-center justify-center cursor-pointer active:scale-95 mx-[5px] transition duration-300 rounded-[10px] hover:bg-primary hover:text-white"
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
          changePage(currentPage + 1);
        }}
        disabled={!hasNext}
        className="cursor-pointer py-[7px] px-[16px] flex flex-row items-center justify-center mx-[5px] transition duration-300 rounded-[10px] border border-primary-light text-primary-light hover:bg-primary/70 hover:text-white  font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100"
      >
        <>
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </>
      </button>
    </div>
  );
}
