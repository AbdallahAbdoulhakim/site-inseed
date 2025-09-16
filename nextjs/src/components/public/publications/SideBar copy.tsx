import Critieria from "@/components/public/publications/Critieria";
import ClassificationBox from "@/components/public/publications/ClassificationBox";
import { Theme } from "@/components/public/publications/Publications";

interface Props {
  themes: Theme[];
  geos: Theme[];
  categories: Theme[];
  collections: Theme[];
}

export default function SideBar({
  themes,
  geos,
  categories,
  collections,
}: Props) {
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
