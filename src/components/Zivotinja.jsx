import { useEffect, useState } from 'react'
import '../styles/Zivotinja.css'
import axios from 'axios';

function Zivotinja( {zivotinja, checked, postaviZivotinje, selectedOption1, selectedOption2} ){

    const[udomljenaZivotinja, setUdomljenaZivotinja] = useState("");
    async function udomiZivotinju() {

        await axios.patch(`/zivotinje/${zivotinja.id}`, {udomljen: true});
        const rezultat = await axios.get("/zivotinje");
        postaviZivotinje(rezultat.data);
    }
  
    useEffect(() => {
        if(zivotinja.udomljen === true){
            setUdomljenaZivotinja("udomljen");
            }
        else
            setUdomljenaZivotinja("neUdomljen");
    }, [])
    if((selectedOption1 === "svi" || selectedOption1 === zivotinja.vrsta) && (selectedOption2 === "sviUdomljeni" || selectedOption2 === udomljenaZivotinja))
    return(
       <div className="zivotinjaBox"  style={{ backgroundColor: zivotinja.udomljen ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
            <p className='imeGodine'>{zivotinja.ime}, {zivotinja.godine} </p>
            <p>Vrsta: {zivotinja.vrsta}</p>
            <p>{zivotinja.cip ? "Čipiran" : "Nije Čipiran" }</p>
            <p>{zivotinja.opis}</p>
            <p>Pregled: {zivotinja.pregled}</p>
            {zivotinja.udomljen ? <p className='udomljen' >UDOMLJEN!</p> : <button id='udomljenButton' onClick={udomiZivotinju}>Udomi</button> }
            {checked ?  <button id='urediButton' >Uredi</button> : ""}
       </div>
    )
    else
    return ("");

}

export default Zivotinja