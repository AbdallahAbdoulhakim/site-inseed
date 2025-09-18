import { IoClose } from "react-icons/io5";

interface Props {
  id: string;
  name: string;
  parentId: string | null;
  level: 1 | 2;
  type: "THÈMES" | "NIVEAU GÉOGRAPHIQUE" | "CATÉGORIES" | "COLLECTIONS";
}

import { useAppDispatch } from "@/lib/hooks";

import { toggleById } from "@/lib/features/publication/publicationFilterSlice";

export default function CriteriaBox({
  id,
  name,
  parentId,
  level,
  type,
}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="grid mb-1 last:mb-0 grid-cols-[7fr_1fr]">
      <div className="border-b border-t border-l border-primary leading-4 text-sm font-roboto-sans rounded-l-xl p-2 bg-primary/10">
        {name}
      </div>
      <button
        onClick={() => dispatch(toggleById({ id, level, parentId, type }))}
        className="border border-primary p-2 cursor-pointer bg-primary/50 hover:bg-third  active:ring active:ring-primary hover:text-primary/80"
      >
        <IoClose />
      </button>
    </div>
  );
}
