import   React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Header }         from './features/header/Header';
import { PostsList }      from './features/posts/PostsList';
import { SinglePostPage } from './components/SinglePostPage';
import { SearchList }     from './features/search/SearchList';
import { Subreddits }     from './features/subreddits/Subreddits';

import './App.css';

function App() {
  
  return (
    <div className="App"> 
      <Router className='Router'>
      <Header id='Header'/>
        <main>
          <Routes>
            <Route exact path="/"                   element={<PostsList/>}      />
            <Route exact path="/posts/:postId"      element={<SinglePostPage/>} />
            <Route exact path="/search/:searchTerm" element={<SearchList/>}     />
          </Routes>
        </main> 
        <aside>
          <Subreddits />
        </aside>   
      </Router>
    </div>
  )
}

export default App