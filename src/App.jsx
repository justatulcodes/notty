import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import './pages/Landing'
import Landing from './pages/Landing'
import Notes from './pages/Notes'
import Auth from './pages/Auth'

function App() {

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
