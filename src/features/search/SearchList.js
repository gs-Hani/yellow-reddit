import   React, { useEffect }       from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link }/*====*/from 'react-router-dom';

import { fetchSearchResults }/*===*/from './Slice/searchSlice';
import { Spinner }/*==============*/from '../../components/Spinners';
import { orderData } /*==========*/from '../../utilities/orderData';
import { Post }/*=================*/from '../../components/Post';

import './SearchList.css'

export const SearchList = (props) => {
    
    const   location   = useLocation();
    const { pathname } = location;
    const   searchTerm = pathname.split('/')[2];
    const   dispatch   = useDispatch();

    useEffect(() => {
        if (searchTerm !== null) {
            dispatch(fetchSearchResults(searchTerm));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch,searchTerm])
    
    const searchResults = useSelector(state => state.search.posts);
    const status        = useSelector(state => state.search.status);
    const error         = useSelector(state => state.search.error);
    
    let content; // An array of the search result posts

    if        (status === 'loading')   { //==================
        content = <Spinner text="Loading..." />
    } else if (status === 'succeeded') { //==================

            const orderedPosts = orderData(searchResults);
        content = orderedPosts.map((post, index) => (

            <Post key={post.id} post={post} >
      
              <Link to=     {`/posts/${post.id}`} 
                    state=  {{ permalink: post.permalink, 
                               index:     index, 
                               id:        post.id, 
                               from:      'search' }} 
                    className="button muted-button">
                {post.num_comments} comments
              </Link>
      
            </Post>

          ));
    } else if (status === 'failed')    { //==================
        content = <div>{error}</div>
    };

    return(
        <div className="search-results">
            <h1>Search results for "{searchTerm}"</h1>
            {content}
        </div>
    )
}