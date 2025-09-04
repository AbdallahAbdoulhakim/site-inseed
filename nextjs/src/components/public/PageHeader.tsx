"use client";
import Breadcrumb from "./Breadcrumb";
import { useEffect, useState } from "react";
import { MenuItem } from "@/components/base/Header";
import { usePathname } from "next/navigation";
import { fetchSubMenuByUrl } from "@/actions/menu";

export default function PageHeader() {
  const [loading, setLoading] = useState(true);
  const [menuElt, setMenuElt] = useState<MenuItem | null | undefined>();

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part.length > 0);

  useEffect(() => {
    async function loadData() {
      const subMenu = await fetchSubMenuByUrl(`/${pathParts[0]}`);
      setMenuElt(subMenu);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div
      className={
        loading
          ? "flex flex-col items-center justify-center"
          : menuElt?.children.find((elt) => elt.url === pathname)
          ? "flex flex-col"
          : "hidden"
      }
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <>
          <div className="py-15 flex items-center min-h-[20vh] relative bg-primary">
            <div className="container mx-auto relative flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center">
                <div className="max-w-lg px-5 md:px-0  text-center">
                  <h2 className="text-5xl font-[500] text-white font-poppins">
                    {
                      menuElt?.children.find((elt) => elt.url === pathname)
                        ?.label
                    }
                  </h2>

                  {menuElt?.children.find((elt) => elt.url === pathname)
                    ?.description && (
                    <p className="text-white/80">
                      {
                        menuElt?.children.find((elt) => elt.url === pathname)
                          ?.description
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Breadcrumb pathParts={pathParts} menuElt={menuElt} />
        </>
      )}
    </div>
  );
}
