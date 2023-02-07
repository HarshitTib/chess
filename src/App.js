import './App.css';
import Board from "./pages/board/Board"
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/board' element={<Board/>}/>
          <Route path = '*' element={<div>404 not found</div>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
