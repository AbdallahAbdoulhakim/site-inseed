import Image from "next/image";
import ArticleImagesSwiper from "@/components/public/ArticleImagesSwiper";
import { LuClock4 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { MdFolderOpen } from "react-icons/md";
import DisplayContent from "@/components/commons/DisplayContent";
import Link from "next/link";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import { BsTags } from "react-icons/bs";

interface Props {
  category: string;
  categorySlug: string;
  images: { id: string; url: string; name: string }[];
  title: string;
  content: string;
  tags: { name: string; slug: string }[];
  author: string;
  authorImg: string;
  authorDesc: string;
  authorTwitter: string;
  authorFacebook: string;
  authorInstagram: string;
  publicationDate: string;
}

export default function ArticleContent({
  category,
  categorySlug,
  images,
  title,
  content,
  tags,
  author,
  authorImg,
  authorDesc,
  authorTwitter,
  authorFacebook,
  authorInstagram,
  publicationDate,
}: Props) {
  const date = new Date(publicationDate);
  return (
    <div className="">
      <article
        className={`${
          images.length > 1 ? "m-0 p-0" : "p-7.5"
        }  shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-[10px]`}
      >
        {images.length > 1 ? (
          <ArticleImagesSwiper data={images} />
        ) : (
          <div className="relative h-[340px] md:h-[520px] xl:h-[728px] m-[-30px] mb-[20px] overflow-hidden rounded-[10px_10px_0_0]">
            <Image
              src={images[0].url}
              className="max-w-full h-auto"
              fill
              alt="Thumbnail"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className={`${images.length > 1 ? "p-7" : ""}`}>
          <h2 className="text-[28px] font-bold p-0 mt-[20px] text-default">
            {title}
          </h2>
          <div className="mt-5 text-[#6c757d]">
            <ul className="flex flex-wrap list-none items-center p-0 m-0">
              <li className="flex items-center">
                <IoPersonOutline className="text-base mr-2 leading-none text-primary" />
                <span className="text-[#6c757d] text-[14px] inline leading-[1px]">
                  {author}
                </span>
              </li>
              <li className="flex items-center pl-5">
                <LuClock4 className="text-base mr-2 leading-none text-primary" />
                <span>
                  <time dateTime={publicationDate}>
                    {date.toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
              </li>
            </ul>
            <DisplayContent
              className="mt-5 min-w-full overflow-auto text-justify [&_p]:text-justify"
              htmlContent={content}
            />
          </div>
        </div>
        <div
          className={`pt-2.5 border-t border-t-[#333333]/15 flex items-center ${
            images.length > 1 && "p-5"
          }`}
        >
          <MdFolderOpen className="text-[#555555] inline" />
          <ul className="list-none inline ml-2 pr-5  text-[14px]">
            <li className="">
              <Link
                href={`/news/${categorySlug}`}
                className="text-[#333333]/80 text-xs lg:text-base hover:text-primary transition-all duration-300"
              >
                {category}
              </Link>
            </li>
          </ul>
          {tags && (
            <>
              <BsTags className="text-[#555555] inline" />
              <ul className="list-none flex gap-1.5 p-0 text-[14px] ml-1.5">
                {tags.map((tag, index) => (
                  <li
                    key={index}
                    className="inline-block [&:not(:first-child)]:before:content-[','] [&:not(:first-child)]:before:pr-1.5 [&:not(:first-child)]:before:text-default"
                  >
                    <Link
                      className="text-[#333333]/80 text-xs lg:text-base hover:text-primary transition-all duration-300"
                      href={`/news?tag=${tag.slug}`}
                    >
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </article>
      <div className="p-5 mt-7.5 shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center rounded-[10px]">
        <Image
          src={authorImg}
          className="rounded-full mr-5 shrink-0 max-w-[120px]"
          alt={author}
          width={120}
          height={120}
        />
        <div>
          <h4 className="font-semibold text-[22px] mb-0 p-0 text-default">
            {author}
          </h4>
          <div className="mr-2.5 mb-2.5 ml-0 mt-0 flex">
            {authorTwitter && (
              <Link
                className="text-[#333333]/80 mr-[5px] hover:text-[#333333]"
                href={authorTwitter}
              >
                <FaXTwitter className="group-hover:text-primary/90" size={18} />
              </Link>
            )}
            {authorFacebook && (
              <Link
                className="text-[#333333]/80 mr-[5px] hover:text-[#333333]"
                href={authorFacebook}
              >
                <FaFacebook className="group-hover:text-primary/90" size={18} />
              </Link>
            )}
            {authorInstagram && (
              <Link
                className="text-[#333333]/80 mr-[5px] hover:text-[#333333]"
                href={authorInstagram}
              >
                <FaInstagram
                  className="group-hover:text-primary/90"
                  size={18}
                />
              </Link>
            )}
          </div>
          {authorDesc && <p className="text-[#6c757d]/80 mb-0">{authorDesc}</p>}
        </div>
      </div>
    </div>
  );
}
