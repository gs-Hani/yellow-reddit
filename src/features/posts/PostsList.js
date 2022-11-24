import   React, { useEffect, useState } from 'react';
import { useSelector, useDispatch }/*=*/from 'react-redux';
import   InfiniteScroll/*=============*/from 'react-infinite-scroller';

import { Spinner }/*================*/from '../../components/Spinners';
import { Content }/*================*/from '../../components/Content';
import { Sorting }/*================*/from './Sorting'
import { selectAllPosts, fetchPosts
                    ,fetchMorePosts } from './Slice/postsSlice';
import { selectCurrentSubreddit
              ,selectCurrentSorting } from '../subreddits/Slice/subredditSlice';

import './PostsList.css';

export const PostsList = () => {

  const dispatch   = useDispatch();
  //selectors======================================
  const posts      = useSelector(selectAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const moreStatus = useSelector(state => state.posts.status2);
  const subreddit  = useSelector(selectCurrentSubreddit);
  const sorting    = useSelector(selectCurrentSorting);
  const error      = useSelector(state => state.posts.error);
  const nextPostId = useSelector(state => state.posts.nextPostId);

  const [oldId, setOldId] = useState(null); // local state

  const loadMore = () => {
    if (posts && moreStatus !== 'loading' && nextPostId !== oldId) {
      dispatch(fetchMorePosts({subreddit, sorting, nextPostId}));
      setOldId(nextPostId);
    }
  };
  console.log(posts);
  useEffect(() => {
       dispatch(fetchPosts({subreddit, sorting}));
       window.scrollTo({top: 0, behavior: 'smooth'});
  }, [ dispatch,            subreddit, sorting]);

  if        (postStatus === 'loading')   { //==============================

    return <Spinner text="Loading..." />

  } else if (postStatus === 'succeeded') { //==============================

    return (
      <section className="posts-list">
        <Sorting/>
        <InfiniteScroll 
          pageStart   ={0}
          loadMore    ={loadMore}
          hasMore     ={nextPostId === oldId ? false : true}
          loader      ={<Spinner key={0} text="Loading more..." />}
          threshold   ={2000}
          initialLoad ={false}
          className   ='content'>
            <Content data={ posts } />
          </InfiniteScroll>
      </section>
    );

  } else if (postStatus === 'failed')   { //==============================

    return <div>{error}</div>

  };
  
};