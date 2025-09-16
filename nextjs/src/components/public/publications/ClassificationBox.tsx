"use client";
interface Data {
  id: string;
  norder: number;
  slug: string;
  name: string;
  publications: number;
  children: Data[];
}
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { FaCaretDown } from "react-icons/fa6";

interface Props {
  type: string;
  data: Data[];
}

export default function ClassificationBox({ type, data }: Props) {
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
                <Collapsible key={element.id} className="w-full">
                  <div className="grid grid-cols-[1fr_10fr] items-baseline">
                    <CollapsibleTrigger className="w-full cursor-pointer">
                      <FaCaretDown size={16} className="text-primary" />
                    </CollapsibleTrigger>
                    <li className="flex items-center leading-4 mb-3 border-t py-2">
                      <Checkbox id={element.id} />
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
                        <Checkbox id={child.id} />
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
                  <Checkbox id={element.id} />
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
