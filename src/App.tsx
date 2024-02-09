import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';
import Posts from './containers/Posts/Posts';
import NewPost from './containers/NewPost/NewPost';
import Post from './containers/Post/Post';

const App = () => (
  <>
    <header><Appbar /></header>
    <main className="container-fluid">
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/new-post' element={<NewPost />} />
        <Route path='/posts/:id' element={<Post />} />
        <Route path='/posts/:id/edit' element={<NewPost />} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </main>
  </>
);

export default App
