import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";


interface PublicationMobile {
    open : boolean
}

const initialState: PublicationMobile = {
    open:false
}


export const publicationMobileSlice = createSlice({
    name:"publicationMobile",
    initialState,
    reducers:{
          toggleOpen:(state, action)=>{
            
            state.open = !state.open
        },
    }
})


export const { toggleOpen} = publicationMobileSlice.actions

export const selectOpen = (state: RootState) => state.publicationMobile.open


export default publicationMobileSlice.reducer