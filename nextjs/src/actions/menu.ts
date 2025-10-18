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
subtitle?: string , short?:string, type?:string, parutionNumber?:string; parutionDate?:string , printableUrl? : string, printableSize?:string, printableType?:string, printableTitle?:string,  dataUrl? : string, dataSize?:string, dataType?: string, dataTitle?:string; }>=>{
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

    if (pathParts.length > 1){
      const publicationElt = await fetchPublicationDetailsBySlug(pathParts[1])
      
      if (publicationElt){
        breadcrumb.push({id:publicationElt.id, label:publicationElt.title, url:`/${publicationElt.slug}`, description:publicationElt.title})

         return {breadcrumb:breadcrumb , title:publicationElt.short,  parutionNumber:publicationElt.parutionNumber, 
          printableUrl:publicationElt.printableUrl ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${publicationElt.printableUrl}` : "", dataUrl:publicationElt.dataUrl ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${publicationElt.dataUrl}` : "", type: publicationElt.type, subtitle:publicationElt.title, short:publicationElt.abstract, parutionDate:publicationElt.parutionDate, dataSize:publicationElt.dataSize, printableSize:publicationElt.printableSize }
      }
    }

      return {breadcrumb:breadcrumb , title:breadcrumb.at(-1)?.label, subtitle:breadcrumb.at(-1)?.description, type:"publication"}
  }

  if(type === "information"){

   const informationBase = await fetchInformationDetailsBySlug("information")


   if (!informationBase) return {breadcrumb : breadcrumb, title:breadcrumb.at(-1)?.label, subtitle:breadcrumb.at(-1)?.description, type:"L'INSEED"} 

    if(pathParts.length > 2 || pathParts.length === 1){
      return {breadcrumb:breadcrumb, title:informationBase.information?.title, parutionDate:informationBase.information?.publicationDate, subtitle:informationBase.information?.abstract, type:"L'INSEED"}
    }

    const informationElt = await fetchInformationDetailsBySlug(pathParts.at(-1) ?? "default")

   

    if (!informationElt) {
       return {breadcrumb:breadcrumb, title:informationBase.information?.title, parutionDate:informationBase.information?.publicationDate, subtitle:informationBase.information?.abstract, type:"L'INSEED"}
    }

   informationElt.parentsList.forEach(elt=> 
    breadcrumb.push({id:elt.id, label:elt.title, description:"", url:`/information/${elt.slug}`})
   )


   return {breadcrumb:breadcrumb, title:informationElt.information?.title, parutionDate:informationElt.information?.publicationDate, subtitle:informationElt.information?.abstract, type:"L'INSEED", printableType:informationElt.information?.printable?.type, printableUrl:informationElt.information?.printable?.fileUrl, printableSize:informationElt.information?.printable?.fileSize, printableTitle:informationElt.information?.printable?.title}


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
    title: publicationsList[0].title ? truncateString(publicationsList[0].title, 110):"",
    abstract: publicationsList[0].abstract ? truncateString(publicationsList[0].abstract,500):"",
    parutionNumber:publicationsList[0].parutionNumber,
    parutionDate:publicationsList[0].parutionDate,
    printableUrl:publicationsList[0].printable?.url,
    dataUrl:publicationsList[0].data?.url,
    dataSize : publicationsList[0].data?.size,
    printableSize : publicationsList[0].printable?.size,
  }
}

interface Information {
  id:string;
  title:string;
  abstract:string;
  short:string;
  slug:string;
  publicationDate:string;
  parent?:Information
}

function traverseParents(element:Information, arr:{id:string, slug:string, title:string}[]) {

  let parents :{id:string, slug:string, title:string}[] = []

  arr.unshift({id:element.id, title:element.title, slug:element.slug})


  // Process the current node
  if(element.parent){
    traverseParents(element.parent, arr)
  }
  
  
  return parents
}


export const fetchInformationDetailsBySlug = async (url:string)=>{
  const informations = client.collection("informations");
  const {data: informationsList} = await informations.find({
    filters:{
      slug:url
    },
    fields:["abstract", "short", "title", "slug", "publicationDate"],
    populate:{
      information_documents: {
        fields: ["title", "description", "type", "category", "position"],
        populate: {
          file: {
            fields: ["name", "url", "size"],
          },
        },
      },
      parent:{
        fields:["title", "slug"],
        populate:{
          parent:{
            fields:["title", "slug"],
            populate:{
              parent:{
                fields:["title", "slug"]
              }
            }
          }
        }
      }
    }
  })



  if(!informationsList || informationsList.length === 0) return;

    const documents : {id:string, title:string, description:string, type:string, category:string, fileName:string, fileUrl:string, fileSize:string|undefined}[] =
    informationsList[0].information_documents &&
    informationsList[0].information_documents.length > 0
      ? informationsList[0].information_documents
          .filter((elt: { position: string }) => elt.position === "main")
          .map(
            (elt: {
              id: string;
              documentId: string;
              title: string;
              description: string;
              type: string;
              category: string;
              file: {
                name: string;
                url: string;
                size: string | number;
              };
            }) => ({
              id: elt.documentId,
              title: elt.title,
              description: elt.description,
              type: elt.type,
              category: elt.category,
              fileName: elt.file.name,
              fileUrl: elt.file.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${elt.file.url}`
                : "#",
              fileSize: elt.file.size,
            })
          )
      : [];

 const information = {
    id:informationsList[0].documentId,
    title:informationsList[0].title,
    abstract:informationsList[0].abstract,
    short:informationsList[0].short,
    slug:informationsList[0].slug,
    publicationDate:informationsList[0].publicationDate,
    printable:documents[0] ,
    parent:informationsList[0].parent ? {
      id:informationsList[0].parent?.documentId,
      title:informationsList[0].parent?.title,
      slug:informationsList[0].parent?.slug,
      parent:informationsList[0].parent?.parent ? {
         id:informationsList[0].parent?.parent?.documentId,
      title:informationsList[0].parent?.parent?.title,
      slug:informationsList[0].parent?.parent?.slug,
      parent: informationsList[0].parent?.parent?.parent ? {
          id:informationsList[0].parent?.parent?.parent?.documentId,
      title:informationsList[0].parent?.parent?.parent?.title,
      slug:informationsList[0].parent?.parent?.parent?.slug,
      } : null
      }:null
    }:null,
  }

  let parentsList : {id:string, slug:string, title:string}[] = []
  traverseParents(information as unknown as Information, parentsList)

  return {information:information, parentsList:parentsList}
}

