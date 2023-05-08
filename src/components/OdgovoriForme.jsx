import '../styles/OdgovoriForme.css'
import { useEffect, useState } from 'react';

function OdgovoriForme ({poruka}){

    const [godina, postaviGodinu]= useState("");
    const [dan, postaviDan]= useState("");
    const [mjesec, postaviMjesec]= useState("");
    const [sat, postaviSat] = useState("");
    const [minute, postaviMinute] = useState("");

    useEffect(()=>{
    const date = new Date(poruka.datum);
    console.log(date);
    postaviDan(date.getDate());
    postaviMjesec(date.getMonth() + 1);
    console.log(date.getMonth());
    postaviGodinu(date.getFullYear());
    postaviSat(date.getHours());
    postaviMinute(date.getMinutes());
    
    },[])
    return(
    <div className='poruka'>
        <p className='porukaOd'>Poruka od: {poruka.ime} {poruka.prezime}</p>
        <p className='porukaKontakt'>Kontakt: {poruka.mail}</p>
        <p className='poslanaPoruka'>{poruka.poruke}</p>
        <p className='datumPoruke'>{dan}.{mjesec}.{godina}. {sat}:{minute}</p>
        
    </div>
    );
}

export default OdgovoriForme