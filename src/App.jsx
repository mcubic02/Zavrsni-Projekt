import './App.css'
import Naslov from './components/Naslov'
import CheckedContext from './context/CheckedContext.jsx'
import { useState } from 'react'

function App() {

  const [checked, setChecked] = useState(true);
  const handleChange = val => {
    setChecked(val)
  }
  return (
    <>
    <CheckedContext.Provider value={{ checked, handleChange}}>
    <Naslov />
    </CheckedContext.Provider>
    </>

  )
}

export default App
