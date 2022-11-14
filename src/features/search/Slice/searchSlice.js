import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSearchResultes, getPostComments } from '../../../api/reddit'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

export const  fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (data) => {
       const  response           = await getSearchResultes(data);
       return response;
});

export const  fetchSearchComments = createAsyncThunk('posts/fetchSearchComments', async ( data ) => {
       const { permalink }        = data;
       const   response           = await getPostComments(permalink);
       return  response;
});

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        //Search results===========================================
            .addCase(fetchSearchResults.pending,   (state, action) => {
                state.status = 'loading';
        
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts  = action.payload;
            })
            .addCase(fetchSearchResults.rejected,  (state, action) => {
                state.status = 'failed';
                state.error  = action.error.message;
            })
        //Comments========================================
            .addCase(fetchSearchComments.pending,   (state, action) => {
            state.posts[action.meta.arg.index].commentsStatus = 'loading';

            })
            .addCase(fetchSearchComments.fulfilled, (state, action) => {
            state.posts[action.meta.arg.index].commentsStatus = 'succeeded';
            state.posts[action.meta.arg.index].comments       = action.payload;
             })
            .addCase(fetchSearchComments.rejected,  (state, action) => {
            state.posts[action.meta.arg.index].commentsStatus = 'failed';
            state.posts[action.meta.arg.index].error          = action.error.message;
        })
    }
});

export const selectSearchPosts = state => state.search.posts;

export default searchSlice.reducer;