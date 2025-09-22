import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

 interface Classification {
    id:string;
    norder: number;
    slug: string;
    level:1|2;
    parentId:string|null;
    name: string;
    open:boolean;
    publications: number;
    checked:boolean;
    children:Classification[]

}



interface PublicationFilterState {
    themes:Classification[],
    geos:Classification[],
    categories:Classification[],
    collections:Classification[],
    themesTags:number[],
    geosTags:number[],
    categoriesTags:number[],
    collectionsTags:number[]
    page:number

}


const initialState: PublicationFilterState = {
    themes:[],
    geos:[],
    categories:[],
    collections:[],
    themesTags:[],
    geosTags:[],
    categoriesTags:[],
    collectionsTags:[],
    page:1
}

export const publicationFilterSlice = createSlice({
    name:"publicationFilter",
    initialState,
    reducers:{
        setPage:(state, action:PayloadAction<{page:number}>)=>{
            const {page} = action.payload
            state.page = page
        },
        uncheckAll:(state, action)=>{
            state.themes.forEach(element=>{
                if(element.children && element.children.length){
                    element.children.forEach(child=>{
                        child.checked = false;
                        
                    })
                }
                element.checked = false
                element.open = false
            })

            state.geos.forEach(element=>{
                if(element.children && element.children.length){
                    element.children.forEach(child=>{
                        child.checked = false 
                    })
                }
                element.checked = false
                element.open = false
            })

            state.categories.forEach(element=>{
                if(element.children && element.children.length){
                    element.children.forEach(child=>{
                        child.checked = false;   
                    })
                }
                element.checked = false
                element.open = false
            })

            state.collections.forEach(element=>{
                if(element.children && element.children.length){
                    element.children.forEach(child=>{
                        child.checked = false; 
                    })
                }
                element.checked = false
                element.open = false
            })

            state.categoriesTags=[]
            state.themesTags=[]
            state.collectionsTags=[]
            state.geosTags=[]
            state.page = 1
       

        },
        toggleOpenState:(state, action:PayloadAction<{id:string,type: "CATÉGORIES" | "NIVEAU GÉOGRAPHIQUE" | "THÈMES" | "COLLECTIONS" }>)=>{
             const {id,  type} = action.payload
            if (type === "THÈMES"){
                const foundElement = state.themes.find(elt=> elt.id === id)
                if(!foundElement ||!foundElement.children || foundElement.children.length === 0) return

                const hasCheckedChildren = foundElement.children.some(child=> child.checked)

                if(hasCheckedChildren){
                    foundElement.open = true
                } else {
                    foundElement.open = !foundElement.open
                }     
            }
            if (type === "CATÉGORIES"){
                const foundElement = state.categories.find(elt=> elt.id === id)
                if(!foundElement ||!foundElement.children || foundElement.children.length === 0) return

                const hasCheckedChildren = foundElement.children.some(child=> child.checked)

                if(hasCheckedChildren){
                    foundElement.open = true
                } else {
                    foundElement.open = !foundElement.open
                }     
            }
            if (type === "NIVEAU GÉOGRAPHIQUE"){
                const foundElement = state.geos.find(elt=> elt.id === id)
                if(!foundElement ||!foundElement.children || foundElement.children.length === 0) return

                const hasCheckedChildren = foundElement.children.some(child=> child.checked)

                if(hasCheckedChildren){
                    foundElement.open = true
                } else {
                    foundElement.open = !foundElement.open
                }     
            }
            if (type === "COLLECTIONS"){
                const foundElement = state.collections.find(elt=> elt.id === id)
                if(!foundElement ||!foundElement.children || foundElement.children.length === 0) return

                const hasCheckedChildren = foundElement.children.some(child=> child.checked)

                if(hasCheckedChildren){
                    foundElement.open = true
                } else {
                    foundElement.open = !foundElement.open
                }     
            }
        },

         toggleById:(state, action:PayloadAction<{id:string,  level: 1|2, parentId:string | null, type: "CATÉGORIES" | "NIVEAU GÉOGRAPHIQUE" | "THÈMES" | "COLLECTIONS"}>)=>{
            const {id,  type, level, parentId} = action.payload
            state.page = 1

            if(type === "THÈMES"){
                if(level === 1){
                    const foundElement = state.themes.find(elt=> elt.id === id)

                    if(!foundElement) return

                    state.themesTags = foundElement.checked ? state.themesTags.filter(elt=> elt !== foundElement.norder) : [...state.themesTags, foundElement.norder]

                    if(!foundElement.checked && foundElement.children && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true

                            if(!state.themesTags.find(elt=> elt === child.norder)){
                                state.themesTags = [...state.themesTags, child.norder]
                            }
                        })
                        foundElement.open = true
                    }

                    if(foundElement.checked && foundElement.children && foundElement.children.length > 0 && foundElement.children.every(child=> child.checked )){
                        foundElement.children.forEach(child=>{
                            child.checked = false
                            state.themesTags = state.themesTags.filter(elt=> elt !== child.norder)
                        })
                        foundElement.open = false
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.themes.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)

                    if(!foundElement) return

                    state.themesTags = foundElement.checked ? state.themesTags.filter(elt=> elt !== foundElement.norder) : [...state.themesTags, foundElement.norder]

                    if(foundElement.checked){
                        parent.checked = false
                        state.themesTags = state.themesTags.filter(elt=> elt !== parent.norder)
                    }

                    if(!foundElement.checked && parent.children.every(child=> child.id === foundElement.id ? true : child.checked)){
                        parent.checked = true

                        if(!state.themesTags.find(elt=> elt === parent.norder)){
                            state.themesTags = [...state.themesTags, parent.norder]
                        }
                    }

                    foundElement.checked = !foundElement.checked
                }
            }

            if(type === "CATÉGORIES"){
                if(level === 1){
                    const foundElement = state.categories.find(elt=> elt.id === id)

                    if(!foundElement) return

                    state.categoriesTags = foundElement.checked ? state.categoriesTags.filter(elt=> elt !== foundElement.norder) : [...state.categoriesTags, foundElement.norder]

                    if(!foundElement.checked && foundElement.children  && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true

                            if(!state.categoriesTags.find(elt=> elt === child.norder)){
                                state.categoriesTags = [...state.categoriesTags, child.norder]
                            }
                            
                        })
                        foundElement.open = true
                    }

                    if(foundElement.checked && foundElement.children && foundElement.children.length > 0 && foundElement.children.every(child=> child.checked )){
                        foundElement.children.forEach(child=>{
                            child.checked = false
                            state.categoriesTags = state.categoriesTags.filter(elt=> elt !== child.norder)
                        })
                        foundElement.open = false
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.categories.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)

                    if(!foundElement) return

                    state.categoriesTags = foundElement.checked ? state.categoriesTags.filter(elt=> elt !== foundElement.norder) : [...state.categoriesTags, foundElement.norder]

                    if(foundElement.checked){
                        parent.checked = false
                        state.categoriesTags = state.categoriesTags.filter(elt=> elt !== parent.norder)
                    }

                    if(!foundElement.checked && parent.children.every(child=> child.id === foundElement.id ? true : child.checked)){
                        parent.checked = true

                        if(!state.categoriesTags.find(elt=> elt === parent.norder)){
                            state.categoriesTags = [...state.categoriesTags, parent.norder]
                        }
                    }

                    foundElement.checked = !foundElement.checked
                }
            }

            if(type === "NIVEAU GÉOGRAPHIQUE"){
                if(level === 1){
                    const foundElement = state.geos.find(elt=> elt.id === id)

                    if(!foundElement) return

                    state.geosTags = foundElement.checked ? state.geosTags.filter(elt=> elt !== foundElement.norder) : [...state.geosTags, foundElement.norder]

                    if(!foundElement.checked && foundElement.children && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true

                            if(!state.geosTags.find(elt=> elt === child.norder)){
                                state.geosTags = [...state.geosTags, child.norder]
                            }
                        })
                        foundElement.open = true
                    }

                    if(foundElement.checked && foundElement.children && foundElement.children.length > 0 && foundElement.children.every(child=> child.checked )){
                        foundElement.children.forEach(child=>{
                            child.checked = false

                            state.geosTags = state.geosTags.filter(elt=> elt !== child.norder)
                        })
                        foundElement.open = false
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.geos.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)
                    
                    if(!foundElement) return

                    state.geosTags = foundElement.checked ? state.geosTags.filter(elt=> elt !== foundElement.norder) : [...state.geosTags, foundElement.norder]

                    if(foundElement.checked){
                        parent.checked = false
                        state.geosTags = state.geosTags.filter(elt=> elt !== parent.norder)
                    }

                    if(!foundElement.checked && parent.children.every(child=> child.id === foundElement.id ? true : child.checked)){
                        parent.checked = true

                        if(!state.geosTags.find(elt=> elt === parent.norder)){
                            state.geosTags = [...state.geosTags, parent.norder]
                        }
                    }

                    foundElement.checked = !foundElement.checked
                }
            }

            if(type === "COLLECTIONS"){
                if(level === 1){
                    const foundElement = state.collections.find(elt=> elt.id === id)

                    if(!foundElement) return

                    state.collectionsTags = foundElement.checked ? state.collectionsTags.filter(elt=> elt !== foundElement.norder) : [...state.collectionsTags, foundElement.norder]

                    if(!foundElement.checked && foundElement.children && foundElement.children.length > 0){
                        foundElement.children.forEach(child=>{
                            child.checked = true

                             if(!state.collectionsTags.find(elt=> elt === child.norder)){
                                state.collectionsTags = [...state.collectionsTags, child.norder]
                            }
                        })
                        foundElement.open = true
                    }

                    if(foundElement.checked && foundElement.children && foundElement.children.length > 0 && foundElement.children.every(child=> child.checked )){
                        foundElement.children.forEach(child=>{
                            child.checked = false

                            state.collectionsTags = state.collectionsTags.filter(elt=> elt !== child.norder)
                        })
                        foundElement.open = false
                    }

                    foundElement.checked = !foundElement.checked
 
                }

                if (level === 2){
                    const parent = state.collections.find(elt=> elt.id === parentId)

                    if(!parent) return

                    const foundElement = parent.children.find(child=> child.id === id)

                    if(!foundElement) return

                    state.collectionsTags = foundElement.checked ? state.collectionsTags.filter(elt=> elt !== foundElement.norder) : [...state.collectionsTags, foundElement.norder]

                    if(foundElement.checked){
                        parent.checked = false

                        state.collectionsTags = state.collectionsTags.filter(elt=> elt !== parent.norder)
                    }

                    if(!foundElement.checked && parent.children.every(child=> child.id === foundElement.id ? true : child.checked)){
                        parent.checked = true

                        if(!state.collectionsTags.find(elt=> elt === parent.norder)){
                            state.collectionsTags = [...state.collectionsTags, parent.norder]
                        }
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
            checked?:boolean;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                checked?:boolean;
                publications: number;
            }[]
        }[], themes:{
            id:string;
            norder: number;
            slug: string;
            name: string;
            checked?:boolean;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                checked?:boolean;
                publications: number;
            }[]
        }[], geos:{
            id:string;
            norder: number;
            slug: string;
            name: string;
            checked?:boolean;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                checked?:boolean;
                publications: number;
            }[]
        }[], collections:{
            id:string;
            norder: number;
            slug: string;
            name: string;
            checked?:boolean;
            publications: number;
            children:{
                id:string;
                norder: number;
                slug: string;
                name: string;
                checked?:boolean;
                publications: number;
            }[]
        }[], page:number}>)=>{
            const {categories, themes, geos, collections, page} = action.payload

            state.categoriesTags=[]
            state.themesTags=[]
            state.collectionsTags=[]
            state.geosTags=[]
            state.page = page
     

            categories.forEach(cat=>{
                state.categoriesTags = cat.checked ? [...state.categoriesTags, cat.norder]:state.categoriesTags

                const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:child.checked ?? false, open:false, level:2, parentId:cat.id, children:[]} as Classification

                    state.categoriesTags = child.checked ? [...state.categoriesTags, child.norder]:state.categoriesTags
                    return returnValue
                } ) 

                 state.categories.push({...cat, checked:cat.checked ?? false, open:newchildren.some(child=>child.checked) ?? false, level:1, parentId:null, children:newchildren})
            })

            themes.forEach(cat=>{
                state.themesTags = cat.checked ? [...state.themesTags, cat.norder]:state.themesTags
                const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:child.checked ?? false, open:false, level:2, parentId:cat.id, children:[]} as Classification
                    state.themesTags = child.checked ? [...state.themesTags, child.norder]:state.themesTags
                    return returnValue
                } ) 
                state.themes.push({...cat, checked:cat.checked ?? false, open:newchildren.some(child=>child.checked) ?? false, level:1, parentId:null, children:newchildren})
            })

            geos.forEach(cat=>{
                 state.geosTags = cat.checked ? [...state.geosTags, cat.norder]:state.geosTags
                 const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:child.checked ?? false, open:false, level:2, parentId:cat.id, children:[]} as Classification
                    state.geosTags = child.checked ? [...state.geosTags, child.norder]:state.geosTags
                    return returnValue
                } ) 
                state.geos.push({...cat, checked:cat.checked ?? false, open:newchildren.some(child=>child.checked) ?? false, level:1, parentId:null, children:newchildren})
            })

            collections.forEach(cat=>{
                state.collectionsTags = cat.checked ? [...state.collectionsTags, cat.norder]:state.collectionsTags
                 const newchildren = cat.children.map(child=> {
                    const returnValue = {...child, checked:child.checked ?? false, open:false, level:2, parentId:cat.id, children:[]} as Classification
                     state.collectionsTags = child.checked ? [...state.collectionsTags, child.norder]:state.collectionsTags
                    return returnValue
                } ) 
                state.collections.push({...cat, checked:cat.checked ?? false, open:newchildren.some(child=>child.checked) ?? false, level:1, parentId:null, children:newchildren})
            })   
            

        }
    }
})


export const { uncheckAll,toggleOpenState, toggleById, reset, setPage} = publicationFilterSlice.actions

export const selectCategories = (state: RootState) => state.publicationFilter.categories
export const selectThemes = (state: RootState) => state.publicationFilter.themes
export const selectGeos = (state: RootState) => state.publicationFilter.geos
export const selectCollections = (state: RootState) => state.publicationFilter.collections

export const selectCategoriesTags = (state: RootState) => state.publicationFilter.categoriesTags
export const selectThemesTags = (state: RootState) => state.publicationFilter.themesTags
export const selectGeosTags = (state: RootState) => state.publicationFilter.geosTags
export const selectCollectionsTags = (state: RootState) => state.publicationFilter.collectionsTags
export const selectPage = (state:RootState)=> state.publicationFilter.page



export default publicationFilterSlice.reducer