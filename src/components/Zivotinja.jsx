import { useEffect, useState } from 'react'
import '../styles/Zivotinja.css'
import axios from 'axios';

function Zivotinja( {zivotinja, checked, postaviZivotinje} ){


    async function udomiZivotinju() {
        postaviUdomljen(true);
        await axios.patch(`/zivotinje/${zivotinja.id}`, {udomljen: true});
        const rezultat = await axios.get("/zivotinje");
        postaviZivotinje(rezultat.data);
    }
    const [udomljen, postaviUdomljen] = useState("");
    useEffect(() => {
        postaviUdomljen(zivotinja.udomljen);
    }, [])

    return(
       <div className="zivotinjaBox"  style={{ backgroundColor: udomljen ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
            <p className='imeGodine'>{zivotinja.ime}, {zivotinja.godine} </p>
            <p>Vrsta: {zivotinja.vrsta}</p>
            <p>Cip: {zivotinja.cip ? "cipiran" : "nije cipiran" }</p>
            <p>Opis: {zivotinja.opis}</p>
            <p>Pregled: {zivotinja.pregled}</p>
            {udomljen ? <p className='udomljen' >UDOMLJEN!</p> : <button id='udomljenButton' onClick={udomiZivotinju}>Udomi</button> }
            {checked ?  <button id='urediButton' >Uredi</button> : ""}
       </div>
    )

}

export default Zivotinja