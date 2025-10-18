"use server";

import client from "@/lib/strapi";

export const fetchMetaData = async (url:string, type:"informations" | "publications" | "articles" | "categories" ) : Promise<{title:string, description:string}>=>{
    const informations = client.collection("informations");
    const publications = client.collection("publications");
    const articles = client.collection("articles");
    const categories = client.collection("categories");

    if (type === "categories"){
        const {data:categoryList} = await categories.find({
            filters:{
                slug:url
            }
        })

        if(categoryList.length < 1 || !categoryList) {
            return {
                title:"",
                description:""
            }
        }

        return {
            title:`${categoryList[0].name} - Actualités`,
            description:`Pages des actualités - ${categoryList[0].name} `
        }
    }

    if (type === "articles"){
        const { data: articlesList } = await articles.find({
            filters:{
                slug:url
            },
            populate:{
                category:{
                    fields:["name"]
                }
            }
         });

        if(articlesList.length < 1 || !articlesList) {
            return {
                title:"",
                description:""
            }
        }

        return {
            title:`${articlesList[0].title} - ${articlesList[0].category?.name} - Actualités`,
            description:`Pages de l'article -${articlesList[0].title} - ${articlesList[0].category?.name}`
        }
    }

    if (type === "publications"){
        const {data : publicationsList} = await publications.find({
            filters:{
                publicationSlug:url
            }
        })

        if(publicationsList.length < 1 || !publicationsList) {
            return {
                title:"",
                description:""
            }
        }

        return {
            title:`${publicationsList[0].title} - ${publicationsList[0].type} - Publication`,
            description:`Pages de la publication -${publicationsList[0].title} - ${publicationsList[0].type}`
        }
    }

    if (type === "informations"){
        const {data: informationsList} = await informations.find({
            filters:{
                slug:url
            }
        })

        if(informationsList.length < 1 || !informationsList) {
            return {
                title:"",
                description:""
            }
        }

         return {
            title:`${informationsList[0].title} - Information`,
            description:`Pages de l'information -${informationsList[0].title}`
        }
    }

    
    return {
        title:"",
        description:""
    }

}

