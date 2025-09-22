"use client";

import { Publication } from "@/components/public/publications/Publications";

import { ImSad } from "react-icons/im";

import { uncheckAll } from "@/lib/features/publication/publicationFilterSlice";

import { useAppDispatch } from "@/lib/hooks";
import PublicationBox from "./layout/PublicationBox";

interface Props {
  publicationsList: Publication[];
}

export default function Results({ publicationsList }: Props) {
  const dispatch = useAppDispatch();
  if (!publicationsList || publicationsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <ImSad className="mx-auto h-16 w-16 text-primary" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Aucun résultat trouvé
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Nous n'avons trouvé aucun élément correspondant à votre recherche.
          Essayez d'ajuster votre recherche.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              dispatch(uncheckAll({}));
            }}
            className="cursor-pointer inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:primary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Réinitialiser la recherche
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="mb-5">
        {publicationsList.map((publication) => (
          <PublicationBox
            key={publication.documentId}
            publication={publication}
          />
        ))}
      </div>
    </div>
  );
}
