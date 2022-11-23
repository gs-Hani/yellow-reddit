import React from 'react';

import { PostAuthor } from '../../components/PostAuthor';
import { TimeAgo }    from '../../components/TimeAgo';

import './Comment.css';

export const Comment = ( {comment} ) => {
    return (
        <div className='Comment'>
            <PostAuthor author={comment.author}      />
            <TimeAgo timestamp={comment.created_utc} /><br/>
            {comment.body}
        </div>
    )
};