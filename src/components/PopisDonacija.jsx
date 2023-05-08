
import Donirano from "./Donirano"
import Nudim from "./Nudim"
import Trazim from "./Trazim"
import '../styles/PopisDonacija.css'
import { useContext } from "react"
import CheckedContext from "../context/CheckedContext"

function PopisDonacija({ donacije, postaviDonacije }) {

    const {checked, handleChange} = useContext(CheckedContext);

    return (
        <div className='popisDonacija'>
            <p className="naslovTablice">Tražimo:</p>
            <table className='tablicaTrazim'>

                <tr className="firstRow">
                    <td>Tip</td>
                    <td>Vrijednost</td>
                    <td>Opis</td>
                </tr>
                {donacije.map((donacija) => (
                    <Trazim donacija={donacija} checked={checked} postaviDonacije = {postaviDonacije}/>
                ))}

            </table>
            <p className="naslovTablice">Nudi se:</p>
            <table className='tablicaNudim'>

                <tr className="firstRow">
                    <td>Tip</td>
                    <td>Vrijednost</td>
                    <td>Opis</td>

                </tr>
                {donacije.map((donacija) => (
                    <Nudim donacija={donacija} checked={checked} postaviDonacije={postaviDonacije} />
                ))}

            </table>
            <p className="naslovTablice">Donirano:</p>
            <table className='tablicaDonirano'>

                <tr className="firstRow">
                    <td>Tip</td>
                    <td>Vrijednost</td>
                    <td>Opis</td>
                </tr>
                {donacije.map((donacija) => (
                    <Donirano donacija={donacija} checked={checked} postaviDonacije={postaviDonacije}/>
                ))}

            </table>

        </div>
    )
}

export default PopisDonacija
