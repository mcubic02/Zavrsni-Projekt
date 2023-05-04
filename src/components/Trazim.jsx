import axios from "axios";

function Trazim({donacija, checked, postaviDonacije}) {

    async function Donirano() {

        await axios.patch(`/donacije/${donacija.id}`, { kategorija: "donirano" });
        const rezultat = await axios.get("/donacije");
        postaviDonacije(rezultat.data);
        
    }

    async function Izbrisi() {
        await axios.delete(`/donacije/${donacija.id}`);

        const rezultat = await axios.get("/donacije");
        postaviDonacije(rezultat.data);
    }
    if(donacija.kategorija === "trazi")
    return(
        <tr>
            <td>{donacija.tip}</td>
            <td>{donacija.vrijednost}</td>
            <td>{donacija.opis}</td>
            <td className="lastColumn">
            {checked ? 
                <> 
                <button id="doniranoButton" onClick={Donirano}>Donirano</button>
                <button id="izbrisiButton" onClick={Izbrisi}>Izbriši</button>
                </>
                :
                <button id="donirajButton" onClick={Donirano}>Doniraj</button>
            }
            </td>
        </tr>
    )
}

export default Trazim
