import   React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// import { Navbar } from './app/Navbar';

import { PostsList }      from './features/posts/PostsList';
import { SinglePostPage } from './features/posts/SinglePostPage';

function App() {

  return (
    <div className="App"> 
      <h1>My Reddit</h1>
      <main>
        <Router>
          {/* <Navbar /> */}
            <Routes>
              <Route exact path='/' 
                element={
                  <React.Fragment>
                    <PostsList />
                  </React.Fragment>
                }
              />
              <Route exact path="/posts/:postId" element={<SinglePostPage/>}  />
              <Route /*=======================*/ element={<Navigate to="/"/>} />
            </Routes>
        </Router>
      </main>
      {/* <aside>
        <Subreddits />
      </aside> */}
    </div>
  )
}

export default App