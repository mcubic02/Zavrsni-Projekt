import '../styles/ObavijestForma.css'
import { useState } from 'react';
import axios from 'axios';

function ObavijestForma({checked, postaviObavijesti, setPrikazForme, refreshPage}) {

    const [isChecked, setIsChecked] = useState(false);

    const [formaPodaci, postaviPodatke] = useState({
        naslov: "",
        tekst: "",
        datum: "",
        vazno: ""
    });
    function obradiPodatke(objekt) {
        return {
                naslov: objekt.naslov,
                tekst: objekt.tekst,
                datum: objekt.datum,
                vazno: objekt.vazno
        };
    }

    function handleCheckboxChange(event) {
        const {checked} = event.target;
        setIsChecked(checked);
        postaviPodatke({ ...formaPodaci, vazno: checked });
    }

    const objaviObavijest = async (event) => {
        event.preventDefault();
        formaPodaci.vazno = isChecked;
        formaPodaci.datum = new Date();

        const zaSlanje = obradiPodatke(formaPodaci);
        await axios.post("/obavijesti", zaSlanje);

        const rezultat = await axios.get("/obavijesti");
        postaviObavijesti(rezultat.data);
        postaviPodatke(
            {
            naslov: "",
            tekst: "",
            datum: "",
            vazno: ""
        })
        setPrikazForme(false);
        refreshPage();
    };

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    };

    return (
        <div className='obavijestForma'>
            <p className='kontaktNaslov1'>Unesite novu obavijest:</p>
            <form onSubmit={objaviObavijest}>
                <label>
                    <p className='obavijestiNaslov'>Naslov:</p>
                    <input
                        className='naslovInput'
                        type='text'
                        name='naslov'
                        value={formaPodaci.naslov}
                        onChange={promjenaUlaza}
                        required
                    >
                    </input>
                </label>
                <div id='message-box3'>
                    <label>
                        Tekst:
                        <br></br>
                        <textarea id="message-input2" placeholder="Type your message here" name='tekst' value={formaPodaci.tekst} onChange={promjenaUlaza}></textarea>
                    </label>
                </div>
                {checked ? 
                <div>
                    <label className='checkboxLabel2'>
                        <input
                            className='checkbox2'
                            type="checkbox"
                            name="vazno"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            value={isChecked}
        
                        />
                        Važno
                    </label>
                </div>
                :
                ""
                }
                
                <button className='submitButton' type='submit'>Objavi</button>
            </form>
        </div>
    )
}

export default ObavijestForma