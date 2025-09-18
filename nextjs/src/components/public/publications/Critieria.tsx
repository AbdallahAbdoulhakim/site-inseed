import { MdDelete } from "react-icons/md";
import CriteriaBox from "@/components/public/publications/CriteriaBox";

import {
  selectCategories,
  selectCollections,
  selectGeos,
  selectThemes,
  uncheckAll,
} from "@/lib/features/publication/publicationFilterSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

interface ArrType {
  id: string;
  norder: number;
  slug: string;
  level: 1 | 2;
  parentId: string | null;
  name: string;
  open: boolean;
  publications: number;
  checked: boolean;
  type: "THÈMES" | "NIVEAU GÉOGRAPHIQUE" | "CATÉGORIES" | "COLLECTIONS";
  children: ArrType[];
}

export default function Critieria() {
  const dispatch = useAppDispatch();
  const themes = useAppSelector((state) => selectThemes(state));
  const categories = useAppSelector((state) => selectCategories(state));
  const collections = useAppSelector((state) => selectCollections(state));
  const geos = useAppSelector((state) => selectGeos(state));

  const getCheckedItem = () => {
    let arr: ArrType[] = [];

    themes.forEach((theme) => {
      if (!theme.children || theme.children.length === 0) {
        if (theme.checked) {
          arr.push({ ...theme, type: "THÈMES" } as ArrType);
        }
      } else {
        theme.children.forEach((child) => {
          if (child.checked) {
            arr.push({ ...child, type: "THÈMES" } as ArrType);
          }
        });
      }
    });

    geos.forEach((geo) => {
      if (!geo.children || geo.children.length === 0) {
        if (geo.checked) {
          arr.push({ ...geo, type: "NIVEAU GÉOGRAPHIQUE" } as ArrType);
        }
      } else {
        geo.children.forEach((child) => {
          if (child.checked) {
            arr.push({
              ...child,
              type: "NIVEAU GÉOGRAPHIQUE",
            } as ArrType);
          }
        });
      }
    });

    categories.forEach((cat) => {
      if (!cat.children || cat.children.length === 0) {
        if (cat.checked) {
          arr.push({ ...cat, type: "CATÉGORIES" } as ArrType);
        }
      } else {
        cat.children.forEach((child) => {
          if (child.checked) {
            arr.push({ ...child, type: "CATÉGORIES" } as ArrType);
          }
        });
      }
    });

    collections.forEach((coll) => {
      if (!coll.children || coll.children.length === 0) {
        if (coll.checked) {
          arr.push({ ...coll, type: "COLLECTIONS" } as ArrType);
        }
      } else {
        coll.children.forEach((child) => {
          if (child.checked) {
            arr.push({ ...child, type: "COLLECTIONS" } as ArrType);
          }
        });
      }
    });

    return arr;
  };

  return (
    <div>
      <div className="bg-primary-light-hover p-4 rounded-t flex justify-around items-center">
        <h1 className="text-white uppercase font-bold font-roboto-sans">
          Mes critères
        </h1>
        <button
          onClick={() => {
            dispatch(uncheckAll({}));
          }}
          className="cursor-pointer group"
        >
          <MdDelete
            size={28}
            className="md:hidden text-third group-hover:text-third/80 active:scale-95"
          />
          <span className="hidden active:scale-95 font-semibold text-base text-default rounded md:block md:p-2 bg-third group-hover:bg-third/90 group-hover:text-default/80">
            Supprimer tous
          </span>
        </button>
      </div>
      <div className="p-5 bg-[#f6f6f6]">
        {getCheckedItem().map((elt) => (
          <CriteriaBox
            key={elt.id}
            name={elt.name}
            id={elt.id}
            parentId={elt.parentId}
            level={elt.level}
            type={elt.type}
          />
        ))}
      </div>
    </div>
  );
}
