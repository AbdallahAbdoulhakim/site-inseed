import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

interface Classification {
    id:string;
    norder: number;
    slug: string;
    name: string;
    publications: number;
    checked:boolean;
    children:Classification[]

}

interface PublicationFilterState {
    themes:Classification[],
    geos:Classification[],
    categories:Classification[],
    collections:Classification[]
}


const initialState: PublicationFilterState = {
    themes:[],
    geos:[],
    categories:[],
    collections:[]
}


export const publicationFilterSlice = createSlice({
    name:"publicationFilter",
    initialState,
    reducers:{

         toggleById:(state, action:PayloadAction<{id:string,  level: 1|2, parentId:string | null, type: "CATÉGORIES" | "NIVEAU GÉOGRAPHIQUE" | "THÈMES" | "COLLECTIONS"}>)=>{
            const {id,  type, level, parentId} = action.payload

            if(type === "THÈMES"){
                if(level === 1){
                    const foundElement = state.themes.find(elt=> elt.id === id)

                    if(!foundElement) return

                    if(!foundElement.checked && foundElement.children && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true
                        })
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.themes.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)

                    if(!foundElement) return

                    if(foundElement.checked){
                        parent.checked = false
                    }

                    foundElement.checked = !foundElement.checked
                }
            }

            if(type === "CATÉGORIES"){
                if(level === 1){
                    const foundElement = state.categories.find(elt=> elt.id === id)

                    if(!foundElement) return

                    if(!foundElement.checked && foundElement.children  && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true
                        })
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.categories.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)

                    if(!foundElement) return

                    if(foundElement.checked){
                        parent.checked = false
                    }

                    foundElement.checked = !foundElement.checked
                }
            }

            if(type === "NIVEAU GÉOGRAPHIQUE"){
                if(level === 1){
                    const foundElement = state.geos.find(elt=> elt.id === id)

                    if(!foundElement) return

                    if(!foundElement.checked && foundElement.children && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true
                        })
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.geos.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)

                    if(!foundElement) return

                    if(foundElement.checked){
                        parent.checked = false
                    }

                    foundElement.checked = !foundElement.checked
                }
            }

            if(type === "COLLECTIONS"){
                if(level === 1){
                    const foundElement = state.collections.find(elt=> elt.id === id)

                    if(!foundElement) return

                    if(!foundElement.checked && foundElement.children && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true
                        })
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.collections.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)

                    if(!foundElement) return

                    if(foundElement.checked){
                        parent.checked = false
                    }

                    foundElement.checked = !foundElement.checked
                }
            }

           
            return;
          
        },
        reset : (state, action:PayloadAction<{categories:{
            id:string;
            norder: number;
            slug: string;
            name: string;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                publications: number;
            }[]
        }[], themes:{
            id:string;
            norder: number;
            slug: string;
            name: string;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                publications: number;
            }[]
        }[], geos:{
            id:string;
            norder: number;
            slug: string;
            name: string;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                publications: number;
            }[]
        }[], collections:{
            id:string;
            norder: number;
            slug: string;
            name: string;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                publications: number;
            }[]
        }[]}>)=>{
            const {categories, themes, geos, collections} = action.payload

            categories.forEach(cat=>{
                const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:false, children:[]} as Classification
                    return returnValue
                } ) 

                 state.categories.push({...cat, checked:false, children:newchildren})
            })

            themes.forEach(cat=>{
                const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:false, children:[]} as Classification
                    return returnValue
                } ) 
                state.themes.push({...cat, checked:false, children:newchildren})
            })

            geos.forEach(cat=>{
                 const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:false, children:[]} as Classification
                    return returnValue
                } ) 
                state.geos.push({...cat, checked:false, children:newchildren})
            })

            collections.forEach(cat=>{
                 const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:false, children:[]} as Classification
                    return returnValue
                } ) 
                state.collections.push({...cat, checked:false, children:newchildren})
            })

           
        }
    }
})


export const {  toggleById, reset} = publicationFilterSlice.actions

export const selectCategories = (state: RootState) => state.publicationFilter.categories
export const selectThemes = (state: RootState) => state.publicationFilter.themes
export const selectGeos = (state: RootState) => state.publicationFilter.geos
export const selectCollections = (state: RootState) => state.publicationFilter.collections


export default publicationFilterSlice.reducer