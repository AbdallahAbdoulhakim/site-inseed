import Topbar from "@/components/base/Topbar";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/base/Navbar";
import MobileNavbar from "./MobileNavbar";
import { fetchMenu } from "@/actions/menu";

export interface MenuItem {
  id: string;
  label: string;
  description: string | null;
  url: string;
  display_order: number;
  is_active: boolean;
  parentId: string | null;
  children: MenuItem[];
}

export default async function Header() {
  const menu = await fetchMenu();
  return (
    <header className="w-full mx-auto sticky top-0 bg-primary text-default z-10 transition-all duration-500">
      <Topbar />
      <div className="container mx-auto px-4 relative flex items-center justify-between min-h-15 pt-[10px]">
        {/* BRANDING */}
        <Link href="/" className="leading-none flex items-center">
          <Image
            className="max-h-10 w-auto mr-2 hidden lg:block"
            width={40}
            height={40}
            src="/logo_inseed_alt.png"
            alt=""
          />
          <h1 className="text-4xl m-0 font-semibold text-background font-montserrat block xl:hidden 2xl:block">
            INSEED
          </h1>
          <span className="text-secondary ml-0.5 text-5xl">.</span>
        </Link>
        {/* NAVBAR */}
        <Navbar menu={menu} />
        <MobileNavbar menu={menu} />
      </div>
    </header>
  );
}
