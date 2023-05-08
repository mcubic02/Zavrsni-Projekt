import '../styles/PopisObavijesti.css'
import {FaTrash} from 'react-icons/fa'
import axios from 'axios';
import { useEffect, useState } from 'react';

function PopisObavijesti({obavijest, postaviObavijesti, checked}) {

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
            <div className='naslovLabel' style={{backgroundColor: obavijest.vazno ? 'rgb(208, 56, 56, 0.50)' : '#d3cece' }}>
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