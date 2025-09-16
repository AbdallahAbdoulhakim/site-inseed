"use client";
import Breadcrumb from "@/components/public/Breadcrumb";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchSubMenuByUrl } from "@/actions/menu";
import DotLoading from "@/components/base/DotLoading";

export default function PageHeader() {
  const [loading, setLoading] = useState(true);
  const [breadcrumb, setBreadCrumb] = useState<
    {
      id: string;
      label: string;
      description: string;
      url: string;
    }[]
  >([]);

  const pathname = usePathname();

  useEffect(() => {
    async function loadData() {
      const breadCrumbresponse = await fetchSubMenuByUrl(pathname);
      setBreadCrumb(breadCrumbresponse);
      setLoading(false);
    }

    loadData();
  }, [pathname]);

  return (
    <div
      className={
        loading
          ? "flex flex-col items-center justify-center"
          : breadcrumb.length > 0
          ? "flex flex-col"
          : "hidden"
      }
    >
      {loading ? (
        <DotLoading className="mt-5" />
      ) : (
        <>
          <div className="py-15 flex items-center min-h-[20vh] relative bg-primary">
            <div className="container mx-auto relative flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center">
                <div className="px-5 md:px-0  text-center">
                  <h2 className="text-2xl lg:text-5xl font-[500] text-white font-poppins">
                    {breadcrumb.at(-1)?.label}
                  </h2>

                  {breadcrumb.at(-1)?.description && (
                    <p className="text-white/80">
                      {breadcrumb.at(-1)?.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Breadcrumb breadcrumb={breadcrumb} />
        </>
      )}
    </div>
  );
}
