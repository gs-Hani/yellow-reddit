import React from 'react';

import { PostAuthor } from './PostAuthor';
import { TimeAgo }    from './TimeAgo';
import { Subbredit }  from './Subreddit';

import './Post.css';

export const Post = (props) => {
    const { post, children } = props
    // console.log(post);
    const Video = () => {
        if (post.secure_media && post.secure_media.reddit_video && post.secure_media.reddit_video.fallback_url) {
          return (
            <video controls preload='auto' autoPlay muted loop>
              <source src={post.secure_media.reddit_video.fallback_url} type="video/mp4"/>
              Your browser does not support the video tag
            </video>
          );
        } else { 
          return null
        };
    }; 
    
    return (
      <article className="post-excerpt">
        <h3>{post.title}</h3>
        <div>
          <Subbredit subreddit={post.subreddit}   />
          <PostAuthor   author={post.author}      />
          <TimeAgo   timestamp={post.created_utc} />
        </div>
        <Video/>
        <img src={post.url} alt=""/> <br/>
        {children}
      </article>
    )
};