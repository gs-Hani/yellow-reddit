import   React  from 'react';
import { Link } from 'react-router-dom';
import { Post } from './Post';

export const Content = ({data}) => {
  return data.map((post, index) => (

    <Post key={post.id} post={post} >

      <Link to=     {`/posts/${post.id}`} 
            state=  {{ permalink: post.permalink, 
                       index:     index, 
                       id:        post.id, 
                       from:      'posts' }} 
                       className="button muted-button">
        {post.num_comments} comments
      </Link>

    </Post>

  ));
};  