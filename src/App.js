/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
// import {css} from '@emotion/react';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <div>
      <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/coins/:id" element={<CoinPage/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
