import axios from "axios";
import { useContext } from "react";
import CheckedContext from "../context/CheckedContext";

function Donirano({donacija, postaviDonacije}) {

    const {checked, handleChange} = useContext(CheckedContext);

    async function Izbrisi() {
        await axios.delete(`/donacije/${donacija.id}`);

        const rezultat = await axios.get("/donacije");
        postaviDonacije(rezultat.data);
    }
    
    function obradiPodatke(objekt) {
        return {
                tip: objekt.tip,
                vrijednost: objekt.vrijednost,
                opis: objekt.opis,
                kategorija: objekt.kategorija
        };
    }
    async function Ponovi() {
        donacija.kategorija = "trazi"
        const zaSlanje = obradiPodatke(donacija);
        await axios.post(`/donacije`, zaSlanje);

        const rezultat = await axios.get(`/donacije`);
        postaviDonacije(rezultat.data);
        postaviPodatke({
            tip : "",
            vrijednost: "",
            opis: "",
            kategorija: ""
        }
        )
        setShowForm(false);
    }

    if(donacija.kategorija === "donirano")
    return(
        <tr>
            <td>{donacija.tip}</td>
            <td>{donacija.vrijednost}</td>
            <td>{donacija.opis}</td>
            <td className="lastColumn">
            {checked ? 
                <> 
                <button id="ponoviButton" onClick={Ponovi}>Ponovi</button>
                <button id="izbrisiButton" onClick={Izbrisi}>Izbriši</button>
                </>
                :
                ""
            }
            </td>
        </tr>
    )
}

export default Donirano
