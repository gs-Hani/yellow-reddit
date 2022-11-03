import React from 'react';

export const PostAuthor = ({ author }) => {
   return <span>{author ? ` Posted by u/${author}` : 'Unknown author'}</span>
};