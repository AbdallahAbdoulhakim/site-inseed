import Link from "next/link";

interface Props {
  elements: {
    id: string;
    link: string;
    title: string;
  }[];
}

export default function DefaultPublicationSummary({ elements }: Props) {
  if (!elements) return;
  return (
    <div className="font-bold border border-primary px-15 py-5 bg-[#f6f6f6] rounded-2xl">
      <h1 className="text-xl mb-2">Sommaire</h1>
      <ul className="space-y-2 ml-5 font-semibold text-">
        {elements.map((elt) => (
          <li key={elt.id}>
            <Link
              className="text-primary hover:text-primary-light-hover text-[14px]"
              href={`#${elt.link}`}
            >
              {elt.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
