import Kontakt from "../components/Kontakt"
import Karta from "../components/Karta"
import KontaktForma from "../components/KontaktForma"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import '../styles/OpciPodaci.css'
import OdgovoriForme from "../components/OdgovoriForme"
import CheckedContext from "../context/CheckedContext"

function OpciPodaci() {

    const {checked, handleChange} = useContext(CheckedContext);
    const [poruke, postaviPoruke] = useState([]);

    const refreshPage = () => {
        window.location.reload();
      };
    
    useEffect(() => {
        const dohvacanje = async() => 
        {
            const dohvacanjePoruka = await axios.get("/poruke");
            try{
                const data = dohvacanjePoruka.data;
                const sortedData = data.sort((a,b) => new Date(b.datum) - new Date(a.datum));
                postaviPoruke(sortedData);
            }
            catch(error) 
            {
                console.log(error);
            }
        }
        dohvacanje();
    }, [])

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
           <KontaktForma postaviPoruke={postaviPoruke} refreshPage={refreshPage}/>
           }
        </div>
    </div>
    )
}


export default OpciPodaci