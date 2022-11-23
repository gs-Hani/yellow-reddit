import   React, { useEffect }       from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link }        from 'react-router-dom';

import { Post }/*=================*/from './Post';
import { Spinner }/*==============*/from './Spinners'   
import { Comment }/*==============*/from '../features/posts/Comment';
import { fetchComments }/*========*/from '../features/posts/Slice/postsSlice';
import { fetchSearchComments }/*==*/from '../features/search/Slice/searchSlice';
import { orderData }/*============*/from '../utilities/orderData';

export const SinglePostPage = () => {
  
  const   location   = useLocation();
  const { permalink, index, id, from }    = location.state;
  
  const post            = useSelector(state => state[from].posts.find(post => post.id === id));
  const commentsStatus  = useSelector(state => state[from].posts[index].commentsStatus);
  const fetchedComments = useSelector(state => state[from].posts[index].comments);
  const commentError    = useSelector(state => state[from].posts[index].error);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if        (from === 'posts')   {
      dispatch(fetchComments(      {permalink, index}));
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else if (from === 'search')  {
      dispatch(fetchSearchComments({permalink, index}));
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    }, [ dispatch, permalink, index, from ]
  );
  
  let comments

  if (commentsStatus === 'loading') {
    comments = <Spinner text="Loading..." />
  } else if (commentsStatus === 'succeeded') {
    const orderedComments = orderData(fetchedComments)
    
    comments = orderedComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
    ));
    
  } else if (commentsStatus === 'failed') {
    comments = <div>{commentError}</div>
  } 

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  };

  return (
    <Post key={post.id} post={post} >
      <Link to={'/'} className="button muted-button">
        Back to feed
      </Link>
      {comments}
    </Post>
  )
}