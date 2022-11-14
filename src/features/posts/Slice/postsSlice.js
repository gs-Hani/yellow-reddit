import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSubredditPosts, getPostComments } from '../../../api/reddit';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

export const   fetchPosts = createAsyncThunk('posts/fetchPosts', async (data) => {
       const   response   = await getSubredditPosts(data);
       return  response;
});

export const  fetchComments = createAsyncThunk('posts/fetchComments', async ( data ) => {
       const { permalink }  = data;
       const   response     = await getPostComments(permalink);
       return  response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postRefreshed(state) {
      state.status = 'idle';
    }
  },
  //thunks go here
  extraReducers(builder) {
    builder
    //Posts===========================================
      .addCase(fetchPosts.pending,   (state, action) => {
        state.status = 'loading';

      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts  = action.payload;
      })
      .addCase(fetchPosts.rejected,  (state, action) => {
        state.status = 'failed';
        state.error  = action.error.message;
      })
    //Comments========================================
      .addCase(fetchComments.pending,   (state, action) => {
        state.posts[action.meta.arg.index].commentsStatus = 'loading';

      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.posts[action.meta.arg.index].commentsStatus = 'succeeded';
        state.posts[action.meta.arg.index].comments       = action.payload;
      })
      .addCase(fetchComments.rejected,  (state, action) => {
        state.posts[action.meta.arg.index].commentsStatus = 'failed';
        state.posts[action.meta.arg.index].error          = action.error.message;
      })
  }
});

export const { postRefreshed } = postsSlice.actions

export const   selectAllPosts  =  state => state.posts.posts;

export default postsSlice.reducer;