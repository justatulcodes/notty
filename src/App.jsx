import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import './landing/Landing'
import Landing from './landing/Landing'
import Notes from './notes/Notes'
import Auth from './authentication/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>

      <Route path="/" element={ <Landing/> } />
      <Route path="/auth" element={ <Auth/> } />
      <Route path="/notes" element={ <Notes/> } />

    </Routes>
    </>
  )
}

export default App
