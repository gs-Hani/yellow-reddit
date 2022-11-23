import React , { useState } from 'react';

import { SearchBar } from '../search/SearchBar';

import './Header.css';
import redditLogo from '../../resources/reddit-5.svg';
import menuArrow  from '../../resources/chevron_left_FILL0_wght300_GRAD0_opsz48.svg'

export const Header = () => {

  const [display, setDisplay] = useState(false);
  const handleDisplay = () => {
    if (!display) {
      setDisplay(true);
      document.getElementById("subreddit-container").style.right = "0";
    } else {
      setDisplay(false);
      document.getElementById("subreddit-container").style.right = "-300px";
    }
  };
  
  return (
    <div id='Header'>
      <img src={redditLogo} alt='redditLogo'/>
      <h1>Yellow <span>Reddit</span></h1>
      <SearchBar/>
      <label><input type="checkbox" onClick={handleDisplay} className='side-menu'/>
             <img id="arrow" src={menuArrow} alt=""/>
      </label>
    </div>
  )
}