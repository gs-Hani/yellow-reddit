import   React  from 'react';
import { Link } from 'react-router-dom';
import { Post } from './Post';

export const Content = ({data}) => {
  return data.map((post, index) => (

    <Post key={post.id} post={post} >
      <div className='footer'>
        <Link to=     {`/posts/${post.id}`} 
              state=  {{ permalink: post.permalink, 
                        index:     index, 
                        id:        post.id, 
                        from:      'posts' }} 
                        className="button muted-button">
          {post.num_comments} comments
        </Link>
        <span>{post.upvote_ratio * 100}%+</span>
      </div>
      
    </Post>

  ));
};  