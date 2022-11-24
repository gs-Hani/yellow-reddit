import   React, { useEffect } from 'react';
import { useSelector, useDispatch }     from 'react-redux';
import { Link }                         from 'react-router-dom';

import { selectedSubreddit } from './Slice/subredditSlice'; //action creator
import { selectSubreddits } from './Slice/subredditSlice'; //selector
import { fetchSubreddits } from './Slice/subredditSlice'; //async thunk

import { Spinner } from '../../components/Spinners';

import './Subreddits.css';
import redditLogo from '../../resources/reddit-4.svg';

export const Subreddits = () => {
    const dispatch              = useDispatch();

    const subreddits = useSelector(selectSubreddits);
    const status     = useSelector(state => state.subreddit.status);
    const error      = useSelector(state => state.subreddit.error);

    useEffect(() => { if (status === 'idle') { dispatch(fetchSubreddits());} }, [ dispatch, status ]);
    
    let content;

    if      (status === 'loading')   { content = <Spinner text="Loading..." /> } 
    else if (status === 'succeeded') { content = subreddits.map((subreddit) => ( 
        <Subreddit key={subreddit.id} subreddit={subreddit} /> ));} 
    else if (status === 'failed')    { <div>{error}</div> };

    return (
      <div id='subreddit-container'>
        <h2>Popular Subreddits</h2>
        <section className="subreddits-list">
          <div className="subreddit">
            <Link to={'/'} onClick={() => dispatch(selectedSubreddit('/r/popular/'))} >
              <img src={redditLogo} alt=''/>
              <span>Popular</span>
            </Link>
          </div>
          {content}
        </section>
      </div>
      );
};

//A Singular Subreddit ==============================================================================================
const Subreddit = (props) => {

  const   dispatch    = useDispatch();
  const { subreddit } = props;

  return (
    <div className="subreddit" >

      <Link to={'/'} onClick={() => dispatch(selectedSubreddit(subreddit.url))}>
        <img src={subreddit.icon_img || redditLogo} alt=''/>
        <span>{subreddit.display_name_prefixed}</span>
      </Link>
      
    </div>
  )

};