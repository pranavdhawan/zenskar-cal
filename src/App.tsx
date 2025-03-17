import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar from './components/Calendar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''>
        <div>
          <h1>
            Zenskar
          </h1>
          <Calendar />
        </div>
      </div>
    </>
  )
}

export default App
