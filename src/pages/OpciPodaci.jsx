import Kontakt from "../components/Kontakt"
import Karta from "../components/Karta"
import KontaktForma from "../components/KontaktForma"
import { useState, useEffect } from "react"
import axios from "axios"
import '../styles/OpciPodaci.css'
import OdgovoriForme from "../components/OdgovoriForme"

function OpciPodaci({checked}) {

    const [poruke, postaviPoruke] = useState([]);

    useEffect(() => {
        axios.get("/poruke").then((res) => postaviPoruke(res.data));
    }, [])
      console.log(poruke);
    return (
    <div className="opciPodaci">
        <div className="leftPodaci">
            <Kontakt checked={checked}/>
            <Karta/>
        </div>
        <div className="rightPodaci">
            {checked ? <p className="odgovori">Odgovori na formu:</p> : ""}
           {checked ? 
           poruke.map((poruka) => (
            <div className="okvirOdgovora">
           <OdgovoriForme poruka={poruka} /> 
           </div>
           ))
           
           : 
           <KontaktForma postaviPoruke={postaviPoruke}
           />}
        </div>
    </div>
    )
}


export default OpciPodaci