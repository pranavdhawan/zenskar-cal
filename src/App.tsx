import React from 'react'
import './App.css'
import Home from './x'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SecondCal from './y';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/first' element={<Home />} />
          <Route path='/second' element={<SecondCal />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
