"use server";

import prisma from "@/lib/prisma";
import client from "@/lib/strapi";
import { truncateString } from "@/lib/miscellaneous";

export const fetchMenu = async (type: "MAIN" | "FOOTER") => {
  const bruteMenu = await prisma.menuItem.findMany({
    where: { AND: [{ is_active: true, parentId: null , type:type }] },
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


export const fetchSubMenuByUrl = async (url:string)=>{
  let breadCrumb : {id:string, label:string, description:string, url:string}[] =[]

  const pathParts = url.split("/").filter((part) => part.length > 0);

  const type = pathParts[0]
  
  const subMenu = await prisma.menuItem.findFirst({
    where:{AND:[{url:`/${type}`},{type:"MAIN"}]},
    orderBy:{
      display_order:"asc"
    },include: {
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
  })

  if(!subMenu) return [];

  if(type === "news"){
    breadCrumb.push({id:subMenu.id, label:subMenu.label, description:subMenu?.description || "", url:subMenu.url})

    if(pathParts.length > 1){
       const subCategory = subMenu.children.find(subElt=> subElt.url === `/${type}/${pathParts[1]}`)
       if(subCategory){
        breadCrumb.push({id:subCategory.id, label:subCategory.label, description:subCategory?.description || "", url:subCategory.url})
       }
    }

    if(pathParts.length > 2 ){
        const articleElt = await fetchArticleTitleBySlug(pathParts[2])
        if(articleElt){
          breadCrumb.push({id:articleElt.id, label:articleElt.title, url:`/${type}/${pathParts[1]}/${articleElt.slug}`, description:""})
        }
    }
  }



  return breadCrumb

}


export const fetchArticleTitleBySlug = async (url:string)=>{

  const articles = client.collection("articles");
  const { data: articlesList } = await articles.find({
    filters: {
      slug: url,
    },
    fields:["title", "slug"]
  }) 

  return {
    id:articlesList[0].documentId,
    title:truncateString(articlesList[0].title, 110),
    slug:articlesList[0].slug
  }
 
}