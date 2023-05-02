import { useState } from "react"
import ObavijestForma from "../components/ObavijestForma";
import '../styles/Obavijesti.css'

function Obavijesti({checked}) {
    const [prikazForme, setPrikazForme] = useState(false);
    function prikaziFormu() {
        setPrikazForme(true);
    }
    return (
        <>
            <div className="dodavanjeObavijesti">
                <div className="topObavijesti">
                    <button id="novaObavijest" onClick={prikaziFormu}>Nova obavijest</button>
                </div>
                <div className="bottomObavijesti">
                    {prikazForme ? <ObavijestForma checked = {checked}/> : ""}
                </div>
            </div>
            <div className="popisObavijesti">

            </div>
        </>
    )
}


export default Obavijesti