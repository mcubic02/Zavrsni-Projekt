import '../styles/ObavijestForma.css'
import { useState } from 'react';
import axios from 'axios';

function ObavijestForma({checked, postaviObavijesti, setPrikazForme}) {

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
        if(isChecked)
            setIsChecked(false);
        else
            setIsChecked(true);
    }

    const objaviObavijest = async (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('message-input2');
        formaPodaci.tekst = messageInput.value;
        messageInput.value='';
        formaPodaci.vazno = isChecked;

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
                        <textarea id="message-input2" placeholder="Type your message here"></textarea>
                    </label>
                </div>
                {checked ? 
                <div>
                    <label className='checkboxLabel2'>
                        <input
                            className='checkbox2'
                            type="checkbox"
                            name="važno"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
        
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