import   React, { useEffect }/*=====*/from 'react';
import { useSelector, useDispatch }   from 'react-redux';
import { Link }/*===================*/from 'react-router-dom';

import { Spinner } from '../../components/Spinners';
import { PostAuthor }/*=============*/from './PostAuthor';
import { TimeAgo }/*================*/from './TimeAgo';
import { Subbredit }/*==============*/from './Subreddit';
// import { ReactionButtons }/*========*/from './ReactionButtons';
import { selectAllPosts, fetchPosts } from './Slice/postsSlice';
import { selectCurrentSubreddit }     from '../subreddits/Slice/subredditSlice';

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <Subbredit subreddit={post.subreddit}   />
        <PostAuthor   author={post.author}      />
        <TimeAgo   timestamp={post.created_utc} />
      </div>
      <img src={post.thumbnail} alt=""/> <br/>
      {/* <p className="post-content">{post.body}</p> */}
      {/*.content.substring(0, 100)*/}
      {/* <ReactionButtons post={post} /> */}
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
};

export const PostsList = () => {

  const dispatch   = useDispatch();
  //selectors======================================
  const posts      = useSelector(selectAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const subreddit  = useSelector(selectCurrentSubreddit);
  const error      = useSelector(state => state.posts.error);
  console.log(subreddit);
  let content;

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#examples
    const orderedPosts = posts.slice().sort((a, b) => {
      const  A     = JSON.stringify(a.created_utc);
      const  B     = JSON.stringify(b.created_utc);
      const  order = B.localeCompare(A);
      return order
    });
    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }
  

  useEffect(() => {
    // if (postStatus === 'idle') {}
    dispatch(fetchPosts(subreddit));
    
  }, [ dispatch, subreddit]);
  
  // const renderedPosts = orderedPosts.map(post => (

  //   <article className="post-excerpt" key={post.id}>
  //     <h3>{post.title}</h3>
  //     <div>
  //       <PostAuthor userId={post.user} />
  //       <TimeAgo timestamp={post.date} />
  //     </div>
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <ReactionButtons post={post} />
  //     <Link to={`/posts/${post.id}`} className="button muted-button">
  //       View Post
  //     </Link>
  //   </article>

  // ));
  
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};