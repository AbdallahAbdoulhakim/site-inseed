import { fetchMenu } from "@/actions/menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const menu = await fetchMenu();

  return (
    <NavigationMenu
      className="hidden xl:block font-montserrat"
      viewport={false}
    >
      <NavigationMenuList className="space-x-1">
        {menu.map((princip) => (
          <React.Fragment key={princip.id}>
            {princip.children.length > 0 ? (
              <>
                {princip.children.every(
                  (child) => child.children.length === 0
                ) ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="ml-[5px] bg-primary text-[16px] font-semibold rounded-none border-primary/10 hover:border-b-2  hover:border-secondary text-background/70 hover:text-background cursor-pointer transition-all duration-300 ease-in-out">
                      {princip.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-99 bg-white shadow-2xl border-none">
                      <ul className="grid w-fit gap-4">
                        {princip.children.map((secondary) => (
                          <li
                            className="hover:text-secondary text-tertiary text-[15px]"
                            key={secondary.id}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className="text-[15px] w-[200px] font-semibold"
                                href={secondary.url}
                              >
                                {secondary.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="ml-[5px] bg-primary text-[16px] font-semibold rounded-none border-primary/10 hover:border-b-2  hover:border-secondary text-background/70 hover:text-background cursor-pointer transition-all duration-300 ease-in-out">
                      {princip.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-99 bg-white shadow-2xl border-none">
                      <ul className="grid gap-2 grid-cols-3  w-[750px]">
                        {princip.children.map((component) => (
                          <ListItem
                            key={component.id}
                            title={component.label}
                            href={component.url}
                            className="text-tertiary text-[15px] font-semibold"
                          >
                            <ul className="flex flex-col gap-1 ml-5">
                              {component.children.map((child) => (
                                <li key={child.id}>
                                  <Link
                                    className="text-link text-[12px] font-normal hover:text-secondary hover:underline"
                                    href={child.url}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    className="ml-[5px] bg-primary text-[16px] font-poppins font-semibold  rounded-none border-primary/10 hover:border-b-2  hover:border-secondary text-background/70 hover:text-background cursor-pointer transition-all duration-300 ease-in-out"
                    href={princip.url}
                  >
                    {princip.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </React.Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link className="hover:text-secondary" href={href}>
          {title}
        </Link>
      </NavigationMenuLink>
      {children}
    </li>
  );
}
