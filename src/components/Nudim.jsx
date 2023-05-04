import axios from "axios";
function Nudim({donacija, checked, postaviDonacije}) {

    async function Prihvati() {

        await axios.patch(`/donacije/${donacija.id}`, { kategorija: "donirano" });
        const rezultat = await axios.get("/donacije");
        postaviDonacije(rezultat.data);
    }

    if(donacija.kategorija === "nudi")
    return(
        <tr>
            <td>{donacija.tip}</td>
            <td>{donacija.vrijednost}</td>
            <td>{donacija.opis}</td>
            <td className="lastColumn">
            {checked ? 
                <> 
                <button id="prihvatiButton" onClick={Prihvati}>Prihvati</button>
                </>
                :
                ""
            }
            </td>
        </tr>
    )
}

export default Nudim
