import React from 'react';

import { PostAuthor } from './PostAuthor';
import { TimeAgo }    from './TimeAgo';

export const Comment = ( {comment} ) => {
    return (
        <div>
            <PostAuthor author={comment.author}      />
            <TimeAgo timestamp={comment.created_utc} /><br/>
            {comment.body}
        </div>
    )
};