import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/base/Header";
import Footer from "@/components/base/Footer";
import ScrollToTopButton from "@/components/base/ScrollToTopButton";
import Topbar from "@/components/base/Topbar";

import { GoogleAnalytics } from "@next/third-parties/google";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "500",
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | INSEED",
    default:
      "Accueil - INSEED - Institut National de la Statistique et des Études Économiques et Démographiques",
  },
  description: "Site Web officiel de l'INSEED - Comores.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.inseed-comores.org"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} ${montserrat.variable} ${poppins.variable} antialiased`}
      >
        <div className="relative flex flex-col min-h-screen max-w-full overflow-hidden">
          <Topbar />
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </div>
        <ScrollToTopButton />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
