import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Donacije from './pages/Donacije'
import Obavijesti from './pages/Obavijesti'
import OpciPodaci from './pages/OpciPodaci'
import Popis from './pages/Popis'
import Unos from './pages/Unos'
import ReactSwitch from 'react-switch'

function App() {
  const [checked, setChecked] = useState(true);
  const handleChange = val => {
    setChecked(val)
  }

  return (
    <>
      <div className='naslovBox'>
        <div className='naslov'>
          <div className='tekstNasova'>
            <p>Azil za životinje</p>
          </div>
          <div className='adminBox'>
            <p>ADMIN:</p>
            <div className='reactSwitch'>
            <ReactSwitch
              checked={checked}
              onChange={handleChange}
            /></div>
          </div>
        </div>
        <nav>
          <ul>
            <Link to="/" className='nav-link' >Opci podaci</Link>
            <Link to="/obavijesti" className='nav-link'>Obavijesti</Link>
            <Link to="/donacije" className='nav-link' >Donacije</Link>
            <Link to="/popis" className='nav-link' >Popis</Link>
            <Link to="/unos" className='nav-link' >Unos</Link>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<OpciPodaci />}></Route>
        <Route path="/donacije" element={<Donacije />}></Route>
        <Route path="/popis" element={<Popis />}></Route>
        <Route path="/unos" element={<Unos />}></Route>
        <Route path="/obavijesti" element={<Obavijesti />}></Route>
      </Routes>
    </>
  )
}

export default App
