import React from 'react'
import './App.css'
import Calendar from './components/Calendar'
import Home from './x'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MyCalendar from './y';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/first' element={<Home />} />
          <Route path='second' element={<MyCalendar />} />
          <Route path='/third' element={
            <div className='flex justify-center items-center h-screen bg-gray-200'>
              <div className='bg-gray-900 text-white w-full p-4'>
                <h1 className='text-2xl'>
                  Zenskar
                </h1>
                <Calendar />
              </div>
            </div>
          } />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
