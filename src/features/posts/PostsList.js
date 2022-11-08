import   React, { useEffect }/*=====*/from 'react';
import { useSelector, useDispatch }   from 'react-redux';
import { Link }/*===================*/from 'react-router-dom';

import { Spinner }/*================*/from '../../components/Spinners';
// import { PostAuthor }/*=============*/from './PostAuthor';
// import { TimeAgo }/*================*/from './TimeAgo';
// import { Subbredit }/*==============*/from './Subreddit';
import { Post }/*===================*/from './Post'
// import { ReactionButtons }/*========*/from './ReactionButtons';
import { selectAllPosts, fetchPosts } from './Slice/postsSlice';
import { selectCurrentSubreddit }/*================*/from '../subreddits/Slice/subredditSlice';

export const PostsList = () => {

  const dispatch   = useDispatch();
  //selectors======================================
  const posts      = useSelector(selectAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const subreddit  = useSelector(selectCurrentSubreddit);
  const error      = useSelector(state => state.posts.error);
  
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

    content = orderedPosts.map((post, index) => (
      <Post key={post.id} post={post} >

        <Link to={`/posts/${post.id}`} state={{ permalink: post.permalink, index:index, id:post.id }} className="button muted-button">
          {post.num_comments} comments
        </Link>

      </Post>
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  } 

  useEffect(() => {
    // if (postStatus === 'idle') {}
    dispatch(fetchPosts(subreddit));
    
  }, [ dispatch, subreddit]);
  
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

// const PostExcerpt = (props) => {
//   const { post, index } = props;
//   return (
//     <article className="post-excerpt">
//       <h3>{post.title}</h3>
//       <div>
//         <Subbredit subreddit={post.subreddit}   />
//         <PostAuthor   author={post.author}      />
//         <TimeAgo   timestamp={post.created_utc} />
//       </div>
//       <img src={post.thumbnail} alt=""/> <br/>
//       {/* <p className="post-content">{post.body}</p> */}
//       {/*.content.substring(0, 100)*/}
//       {/* <ReactionButtons post={post} /> */}
//       <Link to={`/posts/${post.id}`} state={{ post:post, index: index }} className="button muted-button">
//       {post.num_comments} comments
//       </Link>
//     </article>
//   )
// };