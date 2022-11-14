import React from 'react';

import { SearchBar } from '../search/SearchBar';

import './Header.css';
import redditLogo from '../../resources/reddit-4.svg';

export const Header = () => {
  
  return (
    <div id='Header'>
      <img src={redditLogo} alt='redditLogo'/>
      <h1>My Reddit</h1>
      <SearchBar/>
    </div>
  )
}