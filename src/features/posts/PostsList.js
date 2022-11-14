import   React, { useEffect }/*=====*/from 'react';
import { useSelector, useDispatch }   from 'react-redux';
import { Link }/*===================*/from 'react-router-dom';

import { Spinner }/*================*/from '../../components/Spinners';
import { Post }/*===================*/from '../../components/Post';
import { Sorting }/*===============*/ from './Sorting'
import { selectAllPosts, fetchPosts } from './Slice/postsSlice';
import { selectCurrentSubreddit
              ,selectCurrentSorting } from '../subreddits/Slice/subredditSlice';
import { orderData }/*============*/ from '../../utilities/orderData';

import './PostsList.css';

export const PostsList = () => {

  const dispatch   = useDispatch();
  //selectors======================================
  const posts      = useSelector(selectAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const subreddit  = useSelector(selectCurrentSubreddit);
  const sorting    = useSelector(selectCurrentSorting);
  const error      = useSelector(state => state.posts.error);
  
  let content;

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#examples
        const orderedPosts = orderData(posts);
    content = orderedPosts.map((post, index) => (
      <Post key={post.id} post={post} >

        <Link to=     {`/posts/${post.id}`} 
              state=  {{ permalink: post.permalink, 
                         index:     index, 
                         id:        post.id, 
                         from:      'posts' }} 
              className="button muted-button">
          {post.num_comments} comments
        </Link>

      </Post>
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  } 

  useEffect(() => {
       dispatch(fetchPosts({subreddit, sorting}));
  }, [ dispatch,            subreddit, sorting]);
  
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <Sorting/>
      {content}
    </section>
  );
};