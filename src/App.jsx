import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Donacije from './components/Donacije'
import Obavijesti from './components/Obavijesti'
import OpciPodaci from './components/OpciPodaci'
import Popis from './components/Popis'
import Unos from './components/Unos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to="/" >Opci podaci</Link>
        </li>
        <li>
        <Link to="/obavijesti" >Obavijesti</Link>
        </li>
        <li>
        <Link to="/donacije" >Donacije</Link>
        </li>
        <li>
        <Link to="/popis" >Popis</Link>
        </li>
        <li>
        <Link to="/unos" >Unos</Link>
        </li>
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
