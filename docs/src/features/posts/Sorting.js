import   React            from 'react';
import { useDispatch }    from 'react-redux';

import { sortingChanged } from '../subreddits/Slice/subredditSlice'; //action creator

import './Sorting.css';

export const Sorting = () => {

       const dispatch = useDispatch();

    return (
        <div className='sorting'>
            <button onClick={() => dispatch(sortingChanged('hot/'))}    >Hot   </button>
            <button onClick={() => dispatch(sortingChanged('new/'))}    >New   </button>
            <button onClick={() => dispatch(sortingChanged('top/'))}    >Top   </button>
            <button onClick={() => dispatch(sortingChanged('rising/'))} >Rising</button>
        </div>
    );
};