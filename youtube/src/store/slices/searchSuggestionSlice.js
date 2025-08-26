import { createSlice } from "@reduxjs/toolkit";

const searchSuggestionSlice = createSlice({
    name:'searchSuggestion',
    initialState:{
        suggestions:{}
    },
    reducers:{
        setSuggestions:(state, action) =>{
            const newSuggestions = {...state.suggestions, ...action.payload}
            
            if (Object.keys(newSuggestions).length > 200) {
                const firstKey = Object.keys(newSuggestions)[0]
                delete newSuggestions[firstKey]
            }
            
            return {...state, suggestions: newSuggestions}
        }
    }
})

export const {setSuggestions} = searchSuggestionSlice.actions;
export default searchSuggestionSlice.reducer;