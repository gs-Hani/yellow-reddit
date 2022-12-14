import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSubreddits } from '../../../api/reddit'

const initialState = {
    subreddits: [],
    currentSubbredit:'/r/popular/',
    currentSorting:'hot/',
    status: 'idle',
    error: null,
};

export const  fetchSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async () => {
       const  response        = await getSubreddits();
       return response;
});

const subredditSlice = createSlice({
    name:'subreddit',
    initialState,
    reducers:{
        selectedSubreddit(state, action) {
            state.currentSubbredit = (action.payload);
        },
        sortingChanged(state,action) {
            state.currentSorting = action.payload
        },
    },
    //thunks go here
    extraReducers(builder) {
        builder
        .addCase(fetchSubreddits.pending,   (state, action) => {
            state.status     = 'loading';

        })
        .addCase(fetchSubreddits.fulfilled, (state, action) => {
            state.status     = 'succeeded';
            state.subreddits = action.payload;
        })
        .addCase(fetchSubreddits.rejected,  (state, action) => {
            state.status     = 'failed';
            state.error      = action.error.message;
        })
    }
});

export const { selectedSubreddit, sortingChanged } = subredditSlice.actions;

export const selectCurrentSubreddit =  state => state.subreddit.currentSubbredit;
export const selectCurrentSorting   =  state => state.subreddit.currentSorting;
export const selectSubreddits       =  state => state.subreddit.subreddits;

export default subredditSlice.reducer;