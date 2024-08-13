import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
    name: 'app',
    initialState:{
        books:[],
        isSubmitForm:false
    },
    reducers:{
        setBooks:(state,action)=>{
            state.books=action.payload
        },
        setSubmitForm:(state,action)=>{
            state.isSubmitForm = action.payload
        }
    }
})

export default appSlice.reducer
export const {setBooks,setSubmitForm} = appSlice.actions