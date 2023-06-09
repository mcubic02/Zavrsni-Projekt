import { Routes, Route, Link } from 'react-router-dom'
import Donacije from '../pages/Donacije'
import Obavijesti from '../pages/Obavijesti'
import OpciPodaci from '../pages/OpciPodaci'
import Popis from '../pages/Popis'
import Unos from '../pages/Unos'
import ReactSwitch from 'react-switch'
import { useState, useContext } from 'react'
import '../styles/Naslov.css'
import CheckedContext from '../context/CheckedContext'

function Naslov() {
    const {checked, handleChange} = useContext(CheckedContext);
    
    const [zivotinje, postaviZivotinje] = useState([]);
  
  
    return(
        <>
      <div className='naslovBox'>
        <div className='naslov'>
          <div className='tekstNasova'>
            <p>Azil za životinje Šapa</p>
          </div>
          <div className='adminBox'>
            <p>VIEW: {checked ? 'ADMIN' : 'KORISNIK'} </p>
            <div className='reactSwitch'>
            <ReactSwitch
              checked={checked}
              onChange={handleChange}
            /></div>
          </div>
        </div>
        <nav>
          <ul>
            <Link to="/" className='nav-link' >Opći podaci</Link>
            <Link to="/obavijesti" className='nav-link'>Obavijesti</Link>
            <Link to="/donacije" className='nav-link' >Donacije</Link>
            <Link to="/popis" className='nav-link' >Popis životinja</Link>
            <Link to="/unos" className='nav-link' >Unos</Link>
          </ul>
        </nav>
      </div>
      <div className='box'>
      <Routes>
        <Route path="/" element={<OpciPodaci checked={checked}/>}></Route>
        <Route path="/donacije" element={<Donacije checked = {checked}/>}></Route>
        <Route path="/popis" element={<Popis checked={checked} zivotinje={zivotinje} postaviZivotinje={postaviZivotinje}/>}></Route>
        <Route path="/unos" element={<Unos checked = {checked} zivotinje={zivotinje} postaviZivotinje={postaviZivotinje}/>}></Route>
        <Route path="/obavijesti" element={<Obavijesti checked={checked} />}></Route>
      </Routes>
      </div>
    </>
    )
}

export default Naslov