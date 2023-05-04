import { useState, useEffect } from 'react'
import '../styles/Donacije.css'
import axios from 'axios';

function Donacije() {

    const [formaPodaci, postaviPodatke] = useState({
        tip : "",
        vrijednost: "",
        opis: ""
    });
    const [tipoviDonacija, postaviTipoveDonacija] = useState([]);
    const [warning, setWarning] = useState("");
    const [showForm, setShowForm] = useState(false);

    function handleNumberChange(event) {
        promjenaUlaza(event);
        const godine = event.target.value
        if (godine >= 0) {
          setWarning('');
        } else {

          setWarning('Dob ne može biti negativan broj');
        }
      }
      function formShow() {
        setShowForm(true);
      }

    useEffect(() => {
        const dohvacanje = async () => {
            const dohvacanjeTipova = axios.get("/tipDonacije");

            try {

                postaviTipoveDonacija((await dohvacanjeTipova).data);

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
    return (
        <div className='donacije'>
            <div className='novaDonacija'>
                <button id='novaDonacijaButton' onClick={formShow}>Nova Donacija</button>
            </div>
            {showForm ? 
            <div className='donacijaForma'>
                <p className='donacijaNaslov'>Nova donacija:</p>
                
                <form>
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
                    {warning && <p className='warning'>{warning}</p>}
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
            :
            ""
            }

        </div>
        
    )
}


export default Donacije