import SideBar from "@/components/public/publications/SideBar";
import Results from "@/components/public/publications/Results";
import ResultsSnapshot from "@/components/public/publications/ResultsSnapshot";

export interface Theme {
  id: string;
  norder: number;
  slug: string;
  name: string;
  publications: number;
  children: Theme[];
}

interface Props {
  themes: Theme[];
  geos: Theme[];
  categories: Theme[];
  collections: Theme[];
}

export default function Publications({
  themes,
  geos,
  categories,
  collections,
}: Props) {
  return (
    <div className="container mx-2  md:mx-auto  my-5 min-h-screen grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] gap-3">
      <SideBar
        themes={themes}
        geos={geos}
        categories={categories}
        collections={collections}
      />
      <div className="flex flex-col space-y-2">
        <ResultsSnapshot />
        <Results />
      </div>
    </div>
  );
}
