import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CheckedContext from "../context/CheckedContext";

function DonacijeForma({postaviDonacije, setShowForm}) {

    const {checked, handleChange} = useContext(CheckedContext);
    const [warning, setWarning] = useState("");
    const [tipoviDonacija, postaviTipoveDonacija] = useState([]);
    const [formaPodaci, postaviPodatke] = useState({
        tip : "",
        vrijednost: "",
        opis: ""
    });

    function obradiPodatke(objekt) {
        return {
                tip: objekt.tip,
                vrijednost: objekt.vrijednost,
                opis: objekt.opis,
                kategorija: objekt.kategorija
        };
    }

    function handleNumberChange(event) {
        event.preventDefault();
        promjenaUlaza(event);
        const godine = event.target.value
        if (godine >= 0) {
          setWarning('');
        } else {

          setWarning('Vrijednost ne može biti negativan broj');
        }
      }

      const saljiDonaciju = async (event) => {
        {checked ? 
            formaPodaci.kategorija = "trazi"
            :
            formaPodaci.kategorija = "nudi"
        }
        const zaSlanje = obradiPodatke(formaPodaci);
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

    useEffect(() => {
        const dohvacanje = async () => {
            const dohvacanjeTipova = await axios.get("/tipDonacije");
            try {
                postaviTipoveDonacija(dohvacanjeTipova.data);

            } catch (error) {
                console.log(error);
            }

        };
        console.log(tipoviDonacija);

        dohvacanje();
    }, []);

    
    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    return(
        <div className='donacijaForma'>
        <p className='donacijaNaslov'>Nova donacija:</p>
        
        <form onSubmit={saljiDonaciju}>
            <div className='tipDonacije'>
            <p>
                <label>
                    Vrsta:
                    <br></br>
                    <select
                    className='selectDonacije'
                        name="tip"
                        value={formaPodaci.tipDonacije}
                        onChange={promjenaUlaza}
                        required
                    >
                        <option value="">Odaberi vrstu</option>
                        {tipoviDonacija.map((tipDonacije) => (
                            <option key={tipDonacije} value={tipDonacije}>
                                {tipDonacije}
                            </option>
                        )
                        )
                        }
                    </select>
                </label>
            </p>
            </div>
            <p className='iznosDonacije'>
                <label>
                    Vrijednost:
                    <br></br>
                    <input
                        className='vrijednostDonacije'
                        type="number"
                        name="vrijednost"
                        value={formaPodaci.vrijednost}
                        onChange={handleNumberChange}
                        required
                    />
                    
                </label>
            </p>
            {warning && <p className='warning1'>{warning}</p>}
            <p className='opisDonacije'>
                <label>
                    Opis:
                    <br></br>
                    <textarea id="message-input3" placeholder="Type your message here" name='opis' value={formaPodaci.opis} onChange={promjenaUlaza}></textarea>
                    
                </label>
            </p>
            <button type='submit' id='objaviButton' >Objavi</button>
        </form>
        
    </div>
    )
}

export default DonacijeForma