import { Menu } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { MenuItem } from "@/components/base/Header";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MobileNavbar({ menu }: { menu: MenuItem[] }) {
  return (
    <section className="py-4 font-montserrat!">
      <div className="block bg-primary xl:hidden">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" className="cursor-pointer" size="icon">
                <Menu className="size-7 text-white/80" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto bg-primary/90 border-none">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      className="max-h-10 mr-2"
                      width={40}
                      height={40}
                      src="/logo_inseed_alt.png"
                      alt=""
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="multiple"
                  className="flex w-full flex-col gap-4"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.children.length > 0) {
    return (
      <AccordionItem key={item.id} value={item.label} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold text-[15px]  hover:no-underline text-background/70 hover:text-background cursor-pointer">
          {item.label}
        </AccordionTrigger>
        <AccordionContent className="mt-2 border border-[#006459] bg-[#007466] p-5 flex flex-col space-y-5">
          {item.children.map((subItem) => (
            <React.Fragment key={subItem.id}>
              {subItem.children.length > 0 ? (
                <AccordionItem
                  key={subItem.id}
                  value={subItem.label}
                  className="border-b-0"
                >
                  <AccordionTrigger className="text-md py-0 font-semibold text-[15px]  hover:no-underline text-background/70 hover:text-background cursor-pointer">
                    {subItem.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4 mt-2 border border-[#006459] bg-[#007466] p-3"
                    >
                      {subItem.children.map((subSubItem) => (
                        <SubMenuLink key={subSubItem.id} item={subSubItem} />
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <SubMenuLink item={subItem} />
              )}
            </React.Fragment>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <React.Fragment key={item.id}>
      {item.url.includes("?") ? (
        <a
          key={item.id}
          href={item.url}
          className="text-md font-semibold text-background/70 hover:text-background"
        >
          {item.label}
        </a>
      ) : (
        <Link
          key={item.id}
          href={item.url}
          className="text-md font-semibold text-background/70 hover:text-background"
        >
          {item.label}
        </Link>
      )}
    </React.Fragment>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <React.Fragment>
      {item.url.includes("?") ? (
        <a
          className="text-background/70 hover:text-background font-semibold"
          href={item.url}
        >
          {item.label}
        </a>
      ) : (
        <Link
          className="text-background/70 hover:text-background font-semibold"
          href={item.url}
        >
          {item.label}
        </Link>
      )}
    </React.Fragment>
  );
};
