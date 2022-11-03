import   React               from 'react';
import { useSelector }       from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { PostAuthor }        from './PostAuthor';
import { selectPostById }    from './Slice/postsSlice';

export const SinglePostPage = () => {
  const   search     = useLocation();
  const { pathname } = search;
  const   postId     = pathname.split('/')[2];
  
  const post = useSelector(state => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}