import React from 'react';

import { PostAuthor } from './PostAuthor';
import { TimeAgo }    from './TimeAgo';
import { Subbredit }  from './Subreddit';

export const Post = (props) => {
    const { post, children } = props
    return (
      <article className="post-excerpt">
        <h3>{post.title}</h3>
        <div>
          <Subbredit subreddit={post.subreddit}   />
          <PostAuthor   author={post.author}      />
          <TimeAgo   timestamp={post.created_utc} />
        </div>
        <img src={post.thumbnail} alt=""/> <br/>
        {children}
      </article>
    )
};