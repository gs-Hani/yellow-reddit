import { configureStore } from '@reduxjs/toolkit';

import postsReducer     from '../features/posts/Slice/postsSlice';
import subredditReducer from '../features/subreddits/Slice/subredditSlice';

export default configureStore({
  reducer: {
    posts:     postsReducer,
    subreddit: subredditReducer,
  },
});
