import { MenuItem } from "@/components/base/Header";

import Link from "next/link";

interface BreadcrumbProps {
  menuElt: MenuItem | null | undefined;
  pathParts: string[];
}
export default function Breadcrumb({ menuElt, pathParts }: BreadcrumbProps) {
  let currentPath = "";
  return (
    <nav className="bg-[#f6f6f6] py-4">
      <div className="container mx-auto">
        <ol className="flex flex-row flex-wrap list-none m-0 p-0  font-semibold text-default text-xs! lg:text-base!">
          <li>
            <Link
              className="transition duration-300 text-primary hover:underline"
              href="/"
            >
              ACCUEIL
            </Link>
          </li>
          {pathParts.map((part, index) => {
            currentPath += `/${part}`;
            const isFirst = index === 0;

            const isLast = index === pathParts.length - 1;
            const label = isFirst
              ? menuElt?.label
              : menuElt?.children.find((elt) => elt.url === currentPath)?.label;

            const url = isFirst
              ? menuElt?.url
              : menuElt?.children.find((elt) => elt.url === currentPath)?.url;

            return (
              <li
                key={index}
                className="[&:not(:first-child)]:pl-[10px] [&:not(:last-child)]:pl-[10px]
            [&:not(:last-child)]:before:content-['/']  [&:not(:first-child)]:before:content-['/']
             [&:not(:first-child)]:before:pr-[10px] [&:not(:last-child)]:before:pr-[10px]
             [&:not(:first-child)]:before:text-secondary [&:not(:last-child)]:before:text-secondary normal-case"
              >
                {isLast ? (
                  label
                ) : (
                  <Link
                    className="transition duration-300 text-primary hover:underline"
                    href={url!}
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
