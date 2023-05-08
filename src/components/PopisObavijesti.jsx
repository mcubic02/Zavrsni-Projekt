import '../styles/PopisObavijesti.css'
import {FaTrash} from 'react-icons/fa'
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import CheckedContext from '../context/CheckedContext';

function PopisObavijesti({obavijest, postaviObavijesti}) {

    const {checked, handleChange} = useContext(CheckedContext);
    const [godina, postaviGodinu]= useState("");
    const [dan, postaviDan]= useState("");
    const [mjesec, postaviMjesec]= useState("");
    async function Delete() {
        await axios.delete(`/obavijesti/${obavijest.id}`);

        const rezultat = await axios.get("/obavijesti");
        postaviObavijesti(rezultat.data);
        
    }

    useEffect(()=>{

        console.log(obavijest.datum);
        const date = new Date(obavijest.datum);
        console.log(date);
        postaviDan(date.getDate());
        postaviMjesec(date.getMonth() + 1);
        console.log(date.getMonth());
        postaviGodinu(date.getFullYear());
        
    },[])



    return(
        <div className='obavijestBox'>
            <div className='naslovLabel' style={{backgroundColor: obavijest.vazno ? 'rgba(63, 138, 63, 0.495)' : 'var(--backgroundColor)' }}>
                <p className='naslovObavijesti'>{obavijest.naslov}</p>
                <div className='datumIDelete'>
                <p className='datumObavijesti'>{dan}.{mjesec}.{godina}</p> 
                {checked ?
                <button id='trashButton' onClick={Delete}>
                    <FaTrash/>
                </button>
                :
                ""
                }
                </div>

                
            </div>
            <div className='sadrzajObavijesti'>
                <p>{obavijest.tekst}</p>
            </div>
        </div>
        
    )
}

export default PopisObavijesti