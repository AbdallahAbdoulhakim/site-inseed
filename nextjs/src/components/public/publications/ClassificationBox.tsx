"use client";

interface Data {
  id: string;
  norder: number;
  slug: string;
  name: string;
  publications: number;
  children: Data[];
}

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

import {
  toggleById,
  toggleOpenState,
  selectCategories,
  selectCollections,
  selectGeos,
  selectThemes,
} from "@/lib/features/publication/publicationFilterSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

interface Props {
  type: "THÈMES" | "NIVEAU GÉOGRAPHIQUE" | "CATÉGORIES" | "COLLECTIONS";
  data: Data[];
}

export default function ClassificationBox({ type, data }: Props) {
  const dispatch = useAppDispatch();

  const getCheckValueByIdAndLevel = (
    id: string,
    level: 1 | 2,
    parentId: string | null,
    type: "THÈMES" | "NIVEAU GÉOGRAPHIQUE" | "CATÉGORIES" | "COLLECTIONS"
  ) => {
    if (type === "THÈMES") {
      const themes = useAppSelector((state) => selectThemes(state));

      if (level === 1) {
        return themes.find((elt) => elt.id === id)?.checked;
      }

      if (level === 2) {
        return themes
          .find((elt) => elt.id === parentId)
          ?.children.find((child) => child.id === id)?.checked;
      }
    }
    if (type === "CATÉGORIES") {
      const categories = useAppSelector((state) => selectCategories(state));

      if (level === 1) {
        return categories.find((elt) => elt.id === id)?.checked;
      }

      if (level === 2) {
        return categories
          .find((elt) => elt.id === parentId)
          ?.children.find((child) => child.id === id)?.checked;
      }
    }
    if (type === "COLLECTIONS") {
      const collections = useAppSelector((state) => selectCollections(state));

      if (level === 1) {
        return collections.find((elt) => elt.id === id)?.checked;
      }

      if (level === 2) {
        return collections
          .find((elt) => elt.id === parentId)
          ?.children.find((child) => child.id === id)?.checked;
      }
    }
    if (type === "NIVEAU GÉOGRAPHIQUE") {
      const geos = useAppSelector((state) => selectGeos(state));

      if (level === 1) {
        return geos.find((elt) => elt.id === id)?.checked;
      }

      if (level === 2) {
        return geos
          .find((elt) => elt.id === parentId)
          ?.children.find((child) => child.id === id)?.checked;
      }
    }
  };

  const getOpenState = (
    id: string,
    type: "THÈMES" | "NIVEAU GÉOGRAPHIQUE" | "CATÉGORIES" | "COLLECTIONS"
  ) => {
    if (type === "THÈMES") {
      const themes = useAppSelector((state) => selectThemes(state));
      return themes.find((elt) => elt.id === id)?.open;
    }
    if (type === "CATÉGORIES") {
      const categories = useAppSelector((state) => selectCategories(state));
      return categories.find((elt) => elt.id === id)?.open;
    }
    if (type === "COLLECTIONS") {
      const collections = useAppSelector((state) => selectCollections(state));
      return collections.find((elt) => elt.id === id)?.open;
    }
    if (type === "NIVEAU GÉOGRAPHIQUE") {
      const geos = useAppSelector((state) => selectGeos(state));
      return geos.find((elt) => elt.id === id)?.open;
    }
  };

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full">
        <div className="p-5 bg-primary text-white font-bold grid grid-cols-[9fr_1fr]  content-start gap-2 cursor-pointer rounded-t w-full">
          <span className="text-start">{type}</span>
          <FaCaretDown size={16} className="" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-[#f6f6f6] p-2 rounded-b">
          <ul className="font-roboto-sans">
            {data.map((element) =>
              element.children.length > 0 ? (
                <Collapsible
                  open={getOpenState(element.id, type)}
                  onOpenChange={() =>
                    dispatch(toggleOpenState({ id: element.id, type }))
                  }
                  key={element.id}
                  className="w-full"
                >
                  <div className="grid grid-cols-[1fr_10fr] items-baseline">
                    <CollapsibleTrigger className="w-full cursor-pointer">
                      {getOpenState(element.id, type) ? (
                        <FaCaretUp size={16} className="text-primary" />
                      ) : (
                        <FaCaretDown size={16} className="text-primary" />
                      )}
                    </CollapsibleTrigger>
                    <li className="flex items-center leading-4 mb-3 border-t py-2">
                      <input
                        type="checkbox"
                        className="peer accent-primary cursor-pointer"
                        checked={
                          getCheckValueByIdAndLevel(
                            element.id,
                            1,
                            null,
                            type
                          ) || false
                        }
                        id={element.id}
                        onChange={() =>
                          dispatch(
                            toggleById({
                              id: element.id,
                              level: 1,
                              parentId: null,
                              type,
                            })
                          )
                        }
                      />
                      <label
                        className="ml-2 text-tertiary cursor-pointer text-sm font-bold"
                        htmlFor={element.id}
                      >
                        {element.name}
                      </label>
                    </li>
                  </div>

                  <CollapsibleContent className="ml-15 mb-2">
                    {element.children.map((child) => (
                      <li
                        key={child.id}
                        className="flex items-center leading-4 mb-3 border-t py-2"
                      >
                        <input
                          type="checkbox"
                          className="peer accent-primary cursor-pointer"
                          checked={
                            getCheckValueByIdAndLevel(
                              child.id,
                              2,
                              element.id,
                              type
                            ) || false
                          }
                          id={child.id}
                          onChange={() =>
                            dispatch(
                              toggleById({
                                id: child.id,
                                level: 2,
                                parentId: element.id,
                                type,
                              })
                            )
                          }
                        />
                        <label
                          className="ml-2 text-tertiary cursor-pointer text-sm font-bold"
                          htmlFor={child.id}
                        >
                          {child.name}
                        </label>
                      </li>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <li
                  key={element.id}
                  className="flex items-center leading-4 mb-3 border-t py-2"
                >
                  <input
                    type="checkbox"
                    className="peer accent-primary cursor-pointer"
                    checked={
                      getCheckValueByIdAndLevel(element.id, 1, null, type) ||
                      false
                    }
                    id={element.id}
                    onChange={() =>
                      dispatch(
                        toggleById({
                          id: element.id,
                          level: 1,
                          parentId: null,
                          type,
                        })
                      )
                    }
                  />
                  <label
                    className="ml-2 text-tertiary cursor-pointer text-sm font-bold"
                    htmlFor={element.id}
                  >
                    {element.name}
                  </label>
                </li>
              )
            )}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
