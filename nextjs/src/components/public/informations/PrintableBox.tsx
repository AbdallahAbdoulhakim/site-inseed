import byteSize from "byte-size";
import Link from "next/link";
import {
  BsFilePdf,
  BsFiletypeXlsx,
  BsFiletypeDocx,
  BsFiletypeCsv,
  BsFileZip,
} from "react-icons/bs";

interface Props {
  description: string;
  type: string;
  fileUrl: string;
  fileSize: string | number;
  category: string;
}

export default function PrintableBox({
  description,
  type,
  fileUrl,
  fileSize,
}: Props) {
  return (
    <div className="flex flex-col  w-full md:w-[50%]">
      <div className="border border-primary-light p-2 rounded-t font-semibold text-sm text-center text-primary">
        {description}
      </div>
      <div className="border-b border-l border-r border-primary-light p-2 rounded-b flex flex-col">
        <Link className="flex items-center justify-center group" href={fileUrl}>
          <span className="text-slate-500 group-hover:text-slate-400 text-sm">
            (
            {`${type}, ${
              !isNaN(Number(fileSize))
                ? `${byteSize(Number(fileSize) * 1024)}`
                : ""
            }`}
            )
          </span>
          <div className="ml-5">
            {type === "PDF" ? (
              <BsFilePdf
                className="text-[#008374] group-hover:text-[#008374]/60"
                size={35}
              />
            ) : type === "XLSX" ? (
              <BsFiletypeXlsx
                className="text-[#008374] group-hover:text-[#008374]/60"
                size={35}
              />
            ) : type === "CSV" ? (
              <BsFiletypeCsv
                className="text-[#008374] group-hover:text-[#008374]/60"
                size={35}
              />
            ) : type === "DOCX" ? (
              <BsFiletypeDocx
                className="text-[#008374] group-hover:text-[#008374]/60"
                size={35}
              />
            ) : (
              <BsFileZip
                className="text-[#008374] group-hover:text-[#008374]/60"
                size={35}
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
