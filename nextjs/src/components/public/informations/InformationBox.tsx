import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

interface Props {
  title: string;
  short: string;
  slug: string;
}

export default function InformationBox({ title, short, slug }: Props) {
  return (
    <Link
      href={`/information/${slug}`}
      className="flex flex-col border border-[#e0e0e0] font-montserrat cursor-pointer group"
    >
      <div className="min-h-[150px] lg:min-h-[120px] p-2 lg:p-5 grid grid-cols-[6fr_1fr] gap-2 items-center font-semibold text-xl text-white bg-primary group-hover:bg-third">
        <span>{title}</span>
        <MdArrowForwardIos size={15} className="group-hover:text-primary" />
      </div>
      <div className="p-5 group-hover:bg-[#e0e0e0] font-montserrat min-h-[150px] lg:min-h-[130px]">
        {short}
      </div>
    </Link>
  );
}
