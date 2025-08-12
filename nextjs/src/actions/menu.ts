"use server";

import prisma from "@/lib/prisma";

export const fetchMenu = async () => {
  const bruteMenu = await prisma.menuItem.findMany({
    where: { AND: [{ is_active: true, parentId: null }] },
    orderBy: {
      display_order: "asc",
    },
    include: {
      children: {
        orderBy: {
          display_order: "asc",
        },
        where: { is_active: true },
        include: {
          children: {
            orderBy: {
              display_order: "asc",
            },
            where: { is_active: true },
            include: {
              children: {
                orderBy: {
                  display_order: "asc",
                },
                where: { is_active: true },
              },
            },
          },
        },
      },
    },
  });

  return bruteMenu;
};
