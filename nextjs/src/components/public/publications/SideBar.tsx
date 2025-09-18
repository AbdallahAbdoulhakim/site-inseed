import Critieria from "@/components/public/publications/Critieria";
import ClassificationBox from "@/components/public/publications/ClassificationBox";

import {
  selectCategories,
  selectGeos,
  selectThemes,
  selectCollections,
} from "@/lib/features/publication/publicationFilterSlice";

import { useAppSelector } from "@/lib/hooks";

export default function SideBar() {
  const themes = useAppSelector((state) => selectThemes(state));
  const geos = useAppSelector((state) => selectGeos(state));
  const categories = useAppSelector((state) => selectCategories(state));
  const collections = useAppSelector((state) => selectCollections(state));

  return (
    <div className="flex flex-col space-y-2">
      <Critieria />
      <div className="font-bold font-montserrat mt-7">
        Affiner votre recherche
      </div>
      <ClassificationBox data={themes} type="THÈMES" />
      <ClassificationBox data={geos} type="NIVEAU GÉOGRAPHIQUE" />
      <ClassificationBox data={categories} type="CATÉGORIES" />
      <ClassificationBox data={collections} type="COLLECTIONS" />
    </div>
  );
}
