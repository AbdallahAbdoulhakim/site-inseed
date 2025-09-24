import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";

import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaHandshakeSimple,
} from "react-icons/fa6";

import { contact } from "@/lib/settings";

export default function Topbar() {
  return (
    <div className="transition-all topbar duration-500 text-base h-10 p-0 flex items-center">
      <div className="container mx-auto px-4 flex justify-center lg:justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-white space-x-2">
            <FaRegEnvelope className="text-xs sm:text-base" />
            <Link
              className="text-[10px] sm:text-base hover:underline"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </Link>
          </div>

          <div className="flex items-center text-white space-x-2">
            <CiMobile1 className="text-xs sm:text-base" />
            <Link
              className="text-[10px] sm:text-base"
              href={`tel:${contact.telephone.replace(/\s+/g, "")}`}
            >
              {contact.telephone}
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-3">
          {contact.socials.map((item) => (
            <div key={item.id}>
              <Link title={item.type} href={item.link}>
                {item.type === "Twitter-X" ? (
                  <FaXTwitter
                    className="text-background/60 hover:text-background"
                    size={20}
                  />
                ) : item.type === "Facebook" ? (
                  <FaFacebook
                    className="text-background/60 hover:text-background"
                    size={20}
                  />
                ) : item.type === "Instagram" ? (
                  <FaInstagram
                    className="text-background/60 hover:text-background"
                    size={20}
                  />
                ) : item.type === "LinkedIn" ? (
                  <FaLinkedin
                    className="text-background/60 hover:text-background"
                    size={20}
                  />
                ) : (
                  <FaHandshakeSimple
                    className="text-background/60 hover:text-background"
                    size={20}
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
