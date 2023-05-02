import { useState, useEffect} from "react"
import ObavijestForma from "../components/ObavijestForma";
import '../styles/Obavijesti.css'
import axios from "axios";
import PopisObavijesti from "../components/PopisObavijesti";

function Obavijesti({checked}) {
    const [prikazForme, setPrikazForme] = useState(false);
    const [obavijesti, postaviObavijesti] = useState([]);

    useEffect(() => {
        axios.get("/obavijesti").then((res) => postaviObavijesti(res.data));
    }, [])
      console.log(obavijesti);
    function prikaziFormu() {
        setPrikazForme(true);
    }
    return (
        <div className="sveObavijesti">  
            <div className="dodavanjeObavijesti">
                <div className="topObavijesti">
                    <button id="novaObavijest" onClick={prikaziFormu}>Nova obavijest</button>
                </div>
                <div className="bottomObavijesti">
                    {prikazForme ? <ObavijestForma checked = {checked} postaviObavijesti={postaviObavijesti} setPrikazForme={setPrikazForme}/> : ""}
                </div>
            </div>
            <div className="popisObavijesti">
                {obavijesti.map((obavijest)=>(
                    <PopisObavijesti obavijest={obavijest} postaviObavijesti={postaviObavijesti} checked={checked}/>
                ))}
                
            </div>
        </div>
    )
}


export default Obavijesti