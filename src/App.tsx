import React from 'react'
import './App.css'
import Home from './x'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import SecondCal from './y';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/first" replace />} />
          <Route path='/first' element={<SecondCal />} />
          <Route path='/second' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
