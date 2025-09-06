import Link from "next/link";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaHandshakeSimple,
} from "react-icons/fa6";

import { fetchMenu } from "@/actions/menu";
import { contact } from "@/lib/settings";

export default async function Footer() {
  const menu = await fetchMenu("FOOTER");
  return (
    <footer
      id="footer"
      className="text-[14px] py-[10px] bg-primary px-[50px] text-white flex flex-col justify-center items-center pb-10"
    >
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap  justify-center">
          <div className="lg:w-5/12 w-full">
            <Link href="/" className="flex items-center mb-[25px]">
              <span className="text-3xl font-bold tracking-[1px] font-montserrat">
                Inseed
              </span>
            </Link>
            <p className="text-[14px] font-montserrat">
              L’Institut National de la Statistique et des Études Économiques et
              Démographiques collecte, produit, analyse et diffuse des
              informations sur l’économie et la société comoriennes.
            </p>
            <div className="flex my-4">
              {contact.socials.map((elt) => (
                <Link
                  className="flex items-center justify-center w-[40px] h-[40px] mr-[10px] text-base text-white/70 border border-white/20 rounded-[50%] hover:text-white hover:border-white transition duration-300"
                  key={elt.id}
                  title={elt.type}
                  href={elt.link}
                >
                  {elt.type === "Twitter-X" ? (
                    <FaXTwitter
                      className="text-background/60 hover:text-background"
                      size={20}
                    />
                  ) : elt.type === "Facebook" ? (
                    <FaFacebook
                      className="text-background/60 hover:text-background"
                      size={20}
                    />
                  ) : elt.type === "Instagram" ? (
                    <FaInstagram
                      className="text-background/60 hover:text-background"
                      size={20}
                    />
                  ) : elt.type === "LinkedIn" ? (
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
              ))}
            </div>
          </div>
          <div className="lg:w-5/12 flex flex-row">
            {menu
              .filter((menuElt) => menuElt.children.length > 0)
              .map((menuElt) => (
                <div key={menuElt.id} className="w-[4/12] mb-[30px] px-2">
                  <h4 className="text-base font-bold relative pb-3 font-montserrat">
                    {menuElt.label}
                  </h4>
                  <ul className="list-none p-0 m-0">
                    {menuElt.children.map((menuSubElt) => (
                      <li
                        className="py-[10px] flex items-center first:pt-0"
                        key={menuSubElt.id}
                      >
                        <Link
                          className="text-white/70 transition duration-300 inline-block leading-5 hover:text-white capitalize text-xs lg:text-sm"
                          href={menuSubElt.url}
                        >
                          {menuSubElt.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
          <div className="lg:w-2/12 flex text-xs flex-col items-center">
            <h4 className="text-base font-bold relative pb-3 font-montserrat">
              Nous contacter
            </h4>
            <p>
              {contact.address}
              <br />
              {contact.country}
              <br />
              <br />
              <strong>Téléphone:</strong> {contact.telephone}
              <br />
              <strong>Email:</strong> {contact.email}
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="text-center">
          &copy; Copyright{" "}
          <strong>
            <span>INSEED</span>
          </strong>
          . Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
