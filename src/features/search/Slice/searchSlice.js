import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSearchResultes, getPostComments, getMoreSearchResultes } from '../../../api/reddit'

const initialState = {
    posts:      [],
    status:     'idle',
    status2:    'idle',
    error:       null,
    nextPostId: '',
};

export const  fetchSearchResults   = createAsyncThunk('search/fetchSearchResults', async (data) => {
       const  response             = await getSearchResultes(data);
       return response;
});

export const  fetchMoreSearchPosts = createAsyncThunk('posts/fetchMoreSearchPosts', async (data) => {
       const  response             = await getMoreSearchResultes(data);
       return response;
});

export const   fetchSearchComments = createAsyncThunk('posts/fetchSearchComments', async ( data ) => {
       const { permalink }         = data;
       const   response            = await getPostComments(permalink);
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
                const { nextPost, posts } = action.payload;
                state.status     = 'succeeded';
                state.posts      = posts;
                state.nextPostId = nextPost;
            })
            .addCase(fetchSearchResults.rejected,  (state, action) => {
                state.status = 'failed';
                state.error  = action.error.message;
            })
        //More Search results======================================
            .addCase(fetchMoreSearchPosts.pending,   (state, action) => {
                state.status2 = 'loading';

            })
            .addCase(fetchMoreSearchPosts.fulfilled, (state, action) => {
                const { nextPost, posts } = action.payload;
                state.status2    = 'succeeded';
                state.posts      = [...state.posts, ...posts];
                state.nextPostId = nextPost;
            })
            .addCase(fetchMoreSearchPosts.rejected,  (state, action) => {
                state.status2 = 'failed';
                state.error   = action.error.message;
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