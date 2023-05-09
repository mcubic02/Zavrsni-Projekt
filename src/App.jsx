import './App.css'
import Naslov from './components/Naslov'
import CheckedContext from './context/CheckedContext.jsx'
import { useState, useEffect } from 'react'

function App() {

  useEffect(() => {
    const storedChecked = localStorage.getItem('checked');
    if (storedChecked === null) {
      // If no value is stored, set the default value
      localStorage.setItem('checked', JSON.stringify(checked));
    } else {
      setChecked(JSON.parse(storedChecked));
    }
  }, []);

  const [checked, setChecked] = useState(false);
  const handleChange = (val) => {
    const newValue = val;
    setChecked(newValue);
    localStorage.setItem('checked', JSON.stringify(newValue));
  };
  return (
    <>
    <CheckedContext.Provider value={{ checked, handleChange}}>
    <Naslov />
    </CheckedContext.Provider>
    </>

  )
}

export default App
