import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { JSX } from "react";

const contact: {
  email: string;
  telephone: string;
  socials: { id: number; type: string; link: string; icon: JSX.Element }[];
} = {
  email: "secretariat@inseed-comores.org",
  telephone: "+269 733 14 20",
  socials: [
    {
      id: 1,
      type: "Twitter-X",
      link: "https://x.com/",
      icon: (
        <FaXTwitter
          className="text-background/60 hover:text-background"
          size={20}
        />
      ),
    },
    {
      id: 2,
      type: "Facebook",
      link: "https://facebook.com/",
      icon: (
        <FaFacebook
          className="text-background/60 hover:text-background"
          size={20}
        />
      ),
    },
    {
      id: 3,
      type: "Instagram",
      link: "https://instagram.com/",
      icon: (
        <FaInstagram
          className="text-background/60 hover:text-background"
          size={20}
        />
      ),
    },
    {
      id: 4,
      type: "LinkedIn",
      link: "https://linkedin.com/",
      icon: (
        <FaLinkedin
          className="text-background/60 hover:text-background"
          size={20}
        />
      ),
    },
  ],
};

export default function Topbar() {
  return (
    <div className="transition-all topbar duration-500 text-base h-10 p-0 flex items-center">
      <div className="container mx-auto px-4 flex justify-center lg:justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-white space-x-2">
            <FaRegEnvelope className="" />
            <Link className="hover:underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </Link>
          </div>

          <div className="flex items-center text-white space-x-2">
            <CiMobile1 className="" />
            <Link href={`tel:${contact.telephone.replace(/\s+/g, "")}`}>
              {contact.telephone}
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-3">
          {contact.socials.map((item) => (
            <div key={item.id}>
              <Link title={item.type} href={item.link}>
                {item.icon}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
