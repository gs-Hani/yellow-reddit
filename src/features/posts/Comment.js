import React from 'react';

import { PostAuthor } from '../../components/PostAuthor';
import { TimeAgo }    from '../../components/TimeAgo';

export const Comment = ( {comment} ) => {
    return (
        <div>
            <PostAuthor author={comment.author}      />
            <TimeAgo timestamp={comment.created_utc} /><br/>
            {comment.body}
        </div>
    )
};