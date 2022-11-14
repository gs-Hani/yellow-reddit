import   React /*====*/from 'react';
import { useDispatch } from 'react-redux';
// import { Link }/*====*/from 'react-router-dom';

import { selectedSubreddit } from '../subreddits/Slice/subredditSlice'

export const Navbar = () => {

  const dispatch = useDispatch();

  return (
    <nav>
      <section>
        <h1>My Reddit</h1>

        <div className="navContent">
          <div className="navLinks">
            <button className="sorting" type="button" onClick={() => dispatch(selectedSubreddit('/'))}/*=======*/>Home</button>
            <button className="sorting" type="button" onClick={() => dispatch(selectedSubreddit('/r/popular/'))} >Popular</button>
          </div>
        </div>
      </section>
    </nav>
  )
}