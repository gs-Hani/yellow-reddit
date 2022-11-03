import   React                           from 'react';
import { formatDistanceToNow } from 'date-fns';

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const milliseconds = timestamp * 1000;
    const date = new Date(milliseconds);
    // const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago `;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}