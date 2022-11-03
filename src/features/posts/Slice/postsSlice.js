import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

// import { client } from '../../../api/client';
import { getSubredditPosts } from '../../../api/reddit';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  sorting:'/'
};

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await client.get('/fakeApi/posts')
//   return response.data
// });

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit, sorting) => {
  const  response = await getSubredditPosts(subreddit, sorting);
  return response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action)  { state.posts.push(action.payload) },
      prepare(title, content, userId) {
        return { payload: {
                  id: nanoid(),
                  date: new Date().toISOString(),
                  title,
                  content,
                  user: userId,
                  reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
                }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const   existingPost         = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    postRefreshed(state) {
      state.status = 'idle';
    },
    sortingChanged(state,action) {
      state.sorting = action.payload
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const   existingPost       = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  //thunks go here
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { postAdded, postUpdated, postRefreshed, reactionAdded, sortingChanged } = postsSlice.actions

export const selectAllPosts =  state          => state.posts.posts;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export default postsSlice.reducer;