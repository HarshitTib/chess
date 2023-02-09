import './App.css';
import Board from "./pages/Board/Board"
import Home from './pages/Home';
import Navbar from './components/Navbar';
import GameOver from './pages/GameOver';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Board' element={<Board/>}/>
          <Route path = '/GameOver' element = {<GameOver/>}/>
          <Route path = '*' element={<div>404 not found</div>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
