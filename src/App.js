import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home';
import CategoryHome from './Components/categoryHome';
import CreatePost from './Components/createPost';
import Login from './Components/login';
import Register from './Components/register';
import EditorProfile from './Components/editorProfile';
import ReadingList from './Components/ReadinList';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/:category/:subCategory/' element={<CategoryHome/>}/>
        <Route exact path='/:category/' element={<CategoryHome/>}/>
        <Route exact path='/category/' element={<CategoryHome/>}/>
        <Route exact path='/create-post' element={<CreatePost/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/editor-profile' element={<EditorProfile/>}/>
        <Route exact path='/reading-list' element={<ReadingList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
