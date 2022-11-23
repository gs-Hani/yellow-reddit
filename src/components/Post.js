import React from 'react';

import { PostAuthor } from './PostAuthor';
import { TimeAgo }    from './TimeAgo';
import { Subbredit }  from './Subreddit';

import './Post.css';

export const Post = (props) => {
    const { post, children } = props
    
    const Text = () => {
      if (post.selftext) {return (<p>{post.selftext}</p>)}
      else               {return null}
    };

    const Image = () => {
      if (post.url_overridden_by_dest) {return (<img src={post.url_overridden_by_dest} alt=""/>)}
      else                             {return null}
    };

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
    
    const Box = () => {
      if (!Text && !Image && !Video) {return null}
      else { 
        return (
        <div className='content-box'>
          <Text/>
          <Image/>
          <Video/>
        </div>) }
    };

    return (
      <article className="post-excerpt">
        <h3>{post.title}</h3>
        <div className='sub-header'>
          <Subbredit subreddit={post.subreddit}   />
          <PostAuthor   author={post.author}      />
          <TimeAgo   timestamp={post.created_utc} />
        </div>
        <Box/>
        {children}
      </article>
    )
};