import { truncateString } from "@/lib/miscellaneous";
import Link from "next/link";

interface BreadcrumbProps {
  breadcrumb: {
    id: string;
    label: string;
    description: string;
    url: string;
  }[];
}
export default function Breadcrumb({ breadcrumb }: BreadcrumbProps) {
  const overallStrLen = breadcrumb
    .map((bread) => bread.label)
    .reduce((acc, curr) => acc + curr.length, 0);

  return (
    <nav className="bg-[#f6f6f6] py-4">
      <div className="container mx-2 md:mx-auto px-5">
        <ol className="flex flex-row flex-wrap list-none m-0 p-0  font-semibold text-default text-xs! lg:text-base!">
          <li>
            <Link
              className="transition duration-300 text-primary hover:underline uppercase"
              href="/"
            >
              ACCUEIL
            </Link>
          </li>
          {breadcrumb.map((bread, index) => {
            const isLast = index === breadcrumb.length - 1;
            return (
              <li
                key={index}
                className="[&:not(:first-child)]:pl-[10px] [&:not(:last-child)]:pl-[10px]
            [&:not(:last-child)]:before:content-['>']  [&:not(:first-child)]:before:content-['>']
             [&:not(:first-child)]:before:pr-[10px] [&:not(:last-child)]:before:pr-[10px]
             [&:not(:first-child)]:before:text-secondary [&:not(:last-child)]:before:text-secondary uppercase"
              >
                {isLast ? (
                  truncateString(
                    bread.label,
                    118 - overallStrLen + bread.label.length
                  )
                ) : (
                  <Link
                    className="transition duration-300 text-primary hover:underline uppercase"
                    href={bread.url}
                  >
                    {bread.label}
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
