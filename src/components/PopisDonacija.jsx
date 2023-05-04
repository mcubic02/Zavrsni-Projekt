import { useEffect, useState } from "react"
import Donirano from "./Donirano"
import Nudim from "./Nudim"
import Trazim from "./Trazim"
import '../styles/PopisDonacija.css'
function PopisDonacija({ donacije }) {


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
                    <Trazim donacija={donacija} />
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
                    <Nudim donacija={donacija} />
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
                    <Donirano donacija={donacija} />
                ))}

            </table>

        </div>
    )
}

export default PopisDonacija
