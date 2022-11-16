import   React, { useEffect }       from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation }/*==========*/from 'react-router-dom';
import   InfiniteScroll/*=========*/from 'react-infinite-scroller';

import { fetchSearchResults,
       fetchMoreSearchPosts }/*===*/from './Slice/searchSlice';
import { Spinner }/*==============*/from '../../components/Spinners';
import { Content }/*==============*/from '../../components/Content';

import './SearchList.css'

export const SearchList = (props) => {
    
    const   location    = useLocation();
    const { pathname }  = location;
    const   searchTerm  = pathname.split('/')[2];
    const   dispatch    = useDispatch(); 

    const searchResults = useSelector(state => state.search.posts);
    const status        = useSelector(state => state.search.status);
    const moreStatus    = useSelector(state => state.search.status2);
    const error         = useSelector(state => state.search.error);
    const nextPostId    = useSelector(state => state.search.nextPostId);
    const subreddit     = useSelector(state => state.subreddit.currentSubbredit);
    
    const loadMore = () => {
        if (searchResults && moreStatus !== 'loading') {
          dispatch(fetchMoreSearchPosts({subreddit, searchTerm, nextPostId}));
          }
      };
    
    useEffect(() => {
        if (searchTerm !== null) {
            if (subreddit === '/r/popular/') {
                dispatch(fetchSearchResults({subreddit:'',searchTerm}));
            } else {
                dispatch(fetchSearchResults({subreddit,searchTerm}));
            }
            
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }, [dispatch, searchTerm, subreddit])

    // let content; // An array of the search result posts

    if        (status === 'loading')   { //==============================

      return <Spinner text="Loading..." />

    } else if (status === 'succeeded') { //==============================

      return (
        <section className="search-results">
          <h2>Search results for "{searchTerm}"</h2>
          <InfiniteScroll 
          pageStart   ={0}
          loadMore    ={loadMore}
          hasMore     ={true}
          loader      ={<Spinner key={0} text="Loading more..." />}
          threshold   ={2000}
          initialLoad ={false}
          className   ='content'>
            <Content data={ searchResults } />
          </InfiniteScroll>
        </section>
      );

    } else if (status === 'failed')    { //==============================

      return <div>{error}</div>

    };

    // if        (status === 'loading')   { //==================
    //     content = <Spinner text="Loading..." />
    // } else if (status === 'succeeded') { //==================

    //         const orderedPosts = orderData(searchResults);
    //     content = orderedPosts.map((post, index) => (

    //         <Post key={post.id} post={post} >
      
    //           <Link to=     {`/posts/${post.id}`} 
    //                 state=  {{ permalink: post.permalink, 
    //                            index:     index, 
    //                            id:        post.id, 
    //                            from:      'search' }} 
    //                 className="button muted-button">
    //             {post.num_comments} comments
    //           </Link>
      
    //         </Post>

    //       ));
    // } else if (status === 'failed')    { //==================
    //     content = <div>{error}</div>
    // };

    // return(
    //     <div className="search-results">
    //         <h2>Search results for "{searchTerm}"</h2>
    //         {content}
    //     </div>
    // )
};