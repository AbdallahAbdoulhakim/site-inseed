import Topbar from "@/components/base/Topbar";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/base/Navbar";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  return (
    <header className="w-full mx-auto sticky top-0 bg-primary text-default border border-slate-500 z-10 transition-all duration-500">
      <Topbar />
      <div className="container mx-auto px-4 relative flex items-center justify-between min-h-15 pt-[10px]">
        {/* BRANDING */}
        <Link href="/" className="leading-none flex items-center">
          <Image
            className="max-h-10 mr-2 hidden lg:block"
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
        <Navbar />
        <MobileNavbar />
      </div>
    </header>
  );
}
