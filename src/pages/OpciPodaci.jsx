import Kontakt from "../components/Kontakt"
import Karta from "../components/Karta"
import KontaktForma from "../components/KontaktForma"
import '../styles/OpciPodaci.css'

function OpciPodaci() {
    return (
    <div className="opciPodaci">
        <div className="leftPodaci">
            <Kontakt/>
            <Karta/>
        </div>
        <div className="rightPodaci">
           <KontaktForma/>
        </div>
    </div>
    )
}


export default OpciPodaci