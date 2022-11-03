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
import { EditPostForm }   from './features/posts/EditPostForm';

function App() {

  return (
    <Router>
      <h1>My Reddit</h1>
      {/* <Navbar /> */}
      <div className="App">
        <Routes>
          <Route exact path='/' 
            element={
              <React.Fragment>
                {/* <AddPostForm /> */}
                <PostsList />
              </React.Fragment>
            }
          />
          <Route exact path="/posts/:postId"    element={<SinglePostPage/>}  />
          <Route exact path="/editPost/:postId" element={<EditPostForm/>}    />
          <Route /*==========================*/ element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App