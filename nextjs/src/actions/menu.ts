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


export const fetchSubMenuByUrl = async (url:string)  : Promise<{breadcrumb:{id:string, label:string, description:string, url:string}[] , title?:string , 
subtitle?: string , short?:string, type?:string, parutionNumber?:string; parutionDate?:string , printableUrl? : string, printableSize?:string,  dataUrl? : string, dataSize?:string; }>=>{
  let breadcrumb : {id:string, label:string, description:string, url:string}[] =[]

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


  if(!subMenu) return {breadcrumb:[]};

  if(type === "news"){
    breadcrumb.push({id:subMenu.id, label:subMenu.label, description:subMenu?.description || "", url:subMenu.url})

    if(pathParts.length > 1){
       const subCategory = subMenu.children.find(subElt=> subElt.url === `/${type}/${pathParts[1]}`)
       if(subCategory){
        breadcrumb.push({id:subCategory.id, label:subCategory.label, description:subCategory?.description || "", url:subCategory.url})
       }
    }

    if(pathParts.length > 2 ){
        const articleElt = await fetchArticleTitleBySlug(pathParts[2])
        
        if(articleElt){
          breadcrumb.push({id:articleElt.id, label:articleElt.title, url:`/${type}/${pathParts[1]}/${articleElt.slug}`, description:""})
        }
    }
    

     return {breadcrumb:breadcrumb , title:breadcrumb.at(-1)?.label, subtitle:breadcrumb.at(-1)?.description, type:"news"}
  }

  if(type==="publications"){

    breadcrumb.push({id:subMenu.id, label:subMenu.label, description:subMenu?.description || "", url:subMenu.url})

    if(pathParts.length > 1){
       const subCategory = subMenu.children.find(subElt=> subElt.url === `/${type}/${pathParts[1]}`)
       if(subCategory){
        breadcrumb.push({id:subCategory.id, label:subCategory.label, description:subCategory?.description || "", url:subCategory.url})
       }
    }

    if (pathParts.length > 2){
      const publicationElt = await fetchPublicationDetailsBySlug(pathParts[2])
      
      if (publicationElt){
        breadcrumb.push({id:publicationElt.id, label:publicationElt.title, url:`/${pathParts[1]}/${publicationElt.slug}`, description:publicationElt.title})

         return {breadcrumb:breadcrumb , title:publicationElt.short,  parutionNumber:publicationElt.parutionNumber, 
          printableUrl:publicationElt.printableUrl ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${publicationElt.printableUrl}` : "", dataUrl:publicationElt.dataUrl ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${publicationElt.dataUrl}` : "", type: publicationElt.type, subtitle:publicationElt.title, short:publicationElt.abstract, parutionDate:publicationElt.parutionDate, dataSize:publicationElt.dataSize, printableSize:publicationElt.printableSize }
      }
    }

      return {breadcrumb:breadcrumb , title:breadcrumb.at(-1)?.label, subtitle:breadcrumb.at(-1)?.description, type:"publication"}
  }

   return {breadcrumb:breadcrumb , title:breadcrumb.at(-1)?.label, subtitle:breadcrumb.at(-1)?.description, type:"default"}

}


export const fetchArticleTitleBySlug = async (url:string)=>{

  const articles = client.collection("articles");
  const { data: articlesList } = await articles.find({
    filters: {
      slug: url,
    },
    fields:["title", "slug"]
  }) 

   if(!articlesList || articlesList.length === 0) return;

  return {
    id:articlesList[0].documentId,
    title:truncateString(articlesList[0].title, 110),
    slug:articlesList[0].slug
  }
 
}

export const fetchPublicationDetailsBySlug = async (url:string)=>{
  const publications = client.collection("publications");
  const {data: publicationsList} = await publications.find({
    filters:{
      publicationSlug:url
    },
    fields:["type","short", "title", "abstract", "publicationSlug", "parutionNumber", "parutionDate"],
    populate:{
      data:{
        fields:["name", "url", "size"]
      },
      printable:{
        fields:["name", "url", "size"]
      }
    }
  })

  if(!publicationsList || publicationsList.length === 0) return;

  return {
    id:publicationsList[0].documentId,
    type:publicationsList[0].type,
    short:publicationsList[0].short,
    slug:publicationsList[0].publicationSlug,
    title: truncateString(publicationsList[0].title, 110),
    abstract:truncateString(publicationsList[0].abstract,500),
    parutionNumber:publicationsList[0].parutionNumber,
    parutionDate:publicationsList[0].parutionDate,
    printableUrl:publicationsList[0].printable?.url,
    dataUrl:publicationsList[0].data?.url,
    dataSize : publicationsList[0].data?.size,
    printableSize : publicationsList[0].printable?.size,
  }
}