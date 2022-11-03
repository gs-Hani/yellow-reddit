import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subreddits: [],
    currentSubbredit:"/r/popular/"
};

const subredditSlice = createSlice({
    name:'subreddit',
    initialState,
    reducers:{
        selectedSubreddit(state, action) {
            state.currentSubbredit = (action.payload);
        }
    }
});

export const { selectedSubreddit } = subredditSlice.actions;

export const selectCurrentSubreddit =  state => state.subreddit.currentSubbredit;

export default subredditSlice.reducer;