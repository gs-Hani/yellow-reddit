import   React, { useEffect }       from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link }        from 'react-router-dom';

// import { PostAuthor }/*===========*/from './PostAuthor';
// import { Subbredit }/*============*/from './Subreddit';
import { Post }/*=================*/from './Post';
import { Spinner }/*==============*/from '../../components/Spinners'   
import { Comment }/*==============*/from './Comment';
import { selectPostById }/*=======*/from './Slice/postsSlice';
import { fetchComments }/*========*/from './Slice/postsSlice';

export const SinglePostPage = () => {
  
  const   location   = useLocation();
  // const { pathname } = location;
  // const   postId     = pathname.split('/')[2];
  const { permalink, index, id }    = location.state;
  
  const post            = useSelector(state => selectPostById(state, id));
  const commentsStatus  = useSelector(state => state.posts.posts[index].commentsStatus);
  const fetchedComments = useSelector(state => state.posts.posts[index].comments);
  const commentError    = useSelector(state => state.posts.posts[index].error);
  
  const             dispatch = useDispatch();
  useEffect(() => { dispatch(fetchComments( {permalink, index} )); }, [ dispatch, permalink, index ]);
  
  let comments

  if (commentsStatus === 'loading') {
    comments = <Spinner text="Loading..." />
  } else if (commentsStatus === 'succeeded') {
    // Sort comments in reverse chronological order by datetime string
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#examples
    const orderedComments = fetchedComments.slice().sort((a, b) => {
      const  A     = JSON.stringify(a.created_utc);
      const  B     = JSON.stringify(b.created_utc);
      const  order = B.localeCompare(A);
      return order
    });
    
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