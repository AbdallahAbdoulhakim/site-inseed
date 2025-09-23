"use client";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/lib/hooks";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Critieria from "@/components/public/publications/Critieria";
import ClassificationBox from "@/components/public/publications/ClassificationBox";

import { FaFilter } from "react-icons/fa6";

import {
  selectCategories,
  selectGeos,
  selectThemes,
  selectCollections,
} from "@/lib/features/publication/publicationFilterSlice";

export default function MobileSideBar() {
  const themes = useAppSelector((state) => selectThemes(state));
  const geos = useAppSelector((state) => selectGeos(state));
  const categories = useAppSelector((state) => selectCategories(state));
  const collections = useAppSelector((state) => selectCollections(state));

  return (
    <div className="block md:hidden">
      <div className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer hover:bg-primary group"
              size="icon"
            >
              <FaFilter
                className="text-primary group-hover:text-white"
                size={20}
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="overflow-y-auto bg-primary/90 border-none"
          >
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 p-2">
              <Critieria layout="mobile" />
              <div className="font-bold font-montserrat mt-7 text-white">
                Affiner votre recherche
              </div>
              <ClassificationBox layout="mobile" data={themes} type="THÈMES" />
              <ClassificationBox
                layout="mobile"
                data={geos}
                type="NIVEAU GÉOGRAPHIQUE"
              />
              <ClassificationBox
                layout="mobile"
                data={categories}
                type="CATÉGORIES"
              />
              <ClassificationBox
                layout="mobile"
                data={collections}
                type="COLLECTIONS"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
