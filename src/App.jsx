import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Donacije from './pages/Donacije'
import Obavijesti from './pages/Obavijesti'
import OpciPodaci from './pages/OpciPodaci'
import Popis from './pages/Popis'
import Unos from './pages/Unos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <ul>
        <Link to="/" className='nav-link' >Opci podaci</Link>
        <Link to="/obavijesti" className='nav-link'>Obavijesti</Link>
        <Link to="/donacije" className='nav-link' >Donacije</Link>
        <Link to="/popis" className='nav-link' >Popis</Link>
        <Link to="/unos" className='nav-link' >Unos</Link>
      </ul>
    </nav>
    <Routes>
      <Route path = "/" element = {<OpciPodaci />}></Route>
      <Route path = "/donacije" element = {<Donacije />}></Route>
      <Route path = "/popis" element = {<Popis />}></Route>
      <Route path = "/unos" element = {<Unos />}></Route>
      <Route path = "/obavijesti" element = {<Obavijesti />}></Route>
    </Routes>
    </>
  )
}

export default App
