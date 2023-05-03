import { useState } from 'react'
import '../styles/Unos.css'
import axios from 'axios';

function Unos({ checked, zivotinje, postaviZivotinje}) {

    const [selectedOption, setSelectedOption] = useState("mačka");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [warning, setWarning] = useState("");
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        vrsta: "",
        cip: "",
        godine: "",
        opis: "",
        pregled: "",
        udomljen:""
    });

    const unesiZivotinju = async(event) => {
        event.preventDefault();
        const messageInput = document.getElementById('message-input1');
        formaPodaci.poruka = messageInput.value;
        messageInput.value = "";
        formaPodaci.vrsta = selectedOption;
        formaPodaci.cip = isChecked;
        formaPodaci.pregled = selectedDate;
        formaPodaci.udomljen = false;

        const zaSlanje = obradiPodatke(formaPodaci);
        await axios.post(`/zivotinje`, zaSlanje);
        const rezultat = await axios.get("/zivotinje");
        postaviZivotinje(rezultat.data);
        postaviPodatke(
            {
                ime: "",
                vrsta: "",
                cip: "",
                godine: "",
                opis: "",
                pregled: "",
                udomljen:""
            }
        )
    }

    function handleCheckboxChange(event) {
        if(isChecked)
            setIsChecked(false);
        else
            setIsChecked(true);
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

    const handleOptionClick = (event) => {
        setSelectedOption(event.target.value);
    }

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    }


    function obradiPodatke(objekt) {
        return {
                ime: objekt.ime,
                vrsta: objekt.vrsta,
                cip: objekt.cip,
                godine: objekt.godine,
                opis: objekt.opis,
                pregled: objekt.pregled,
                udomljen: false
        
        };
    }
    function handleNumberChange(event) {
        promjenaUlaza(event);
        const godine = event.target.value
        if (godine >= 0) {
          setWarning('');
        } else {

          setWarning('Dob ne može biti negativan broj');
        }
      }

    if (!checked)
        return (
            <div className='adminOnly'>
                <p className='lock'>🔐</p>
                <p className='labelAdminOnly'>Morate biti prijavljeni kao administrator za pristup ovoj stranici!</p>
            </div>
        )
    else
        return (
            <div className='adminView'>
                <div className="unosForma">
                    <p className='unosNaslov'>Unos nove zivotinje</p>
                    <form onSubmit={unesiZivotinju}>
                        <div className='flexForma'>
                            <div className='left'>
                                <div className='divIme'>
                                    <label>
                                        Ime:
                                        <input
                                            className='ime'
                                            type="ime"
                                            name="ime"
                                            value={formaPodaci.ime}
                                            onChange={promjenaUlaza}
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label >
                                        Dob:
                                        <input
                                            className='dobLabel'
                                            type="number"
                                            name="godine"
                                            value={formaPodaci.godine}
                                            onChange={handleNumberChange}
                                            required
                                        />
                                            {warning && <p className='warning'>{warning}</p>}

                                         
                                    </label>
                                </div>
                                <div className='options'>
                                    <p className='optionVrsta'>Vrsta:</p>
                                    <br></br>
                                    <label>

                                        <input
                                            className='radio'
                                            type="radio"
                                            value="pas"
                                            checked={selectedOption === 'pas'}
                                            onChange={handleOptionClick}
                                        />
                                        Pas
                                    </label>
                                    <label>

                                        <input
                                            className='radio'
                                            type="radio"
                                            value="mačka"
                                            checked={selectedOption === 'mačka'}
                                            onChange={handleOptionClick}
                                        />
                                        Mačka
                                    </label>
                                    <label className='radioLabel'>

                                        <input
                                            className='radio'
                                            type="radio"
                                            value="ostalo"
                                            checked={selectedOption === 'ostalo'}
                                            onChange={handleOptionClick}
                                        />
                                        Ostalo
                                    </label>
                                </div>
                            </div>
                            <div className='right'>
                                <div>
                                    <label className='checkboxLabel'>
                                        <input
                                            className='checkbox'
                                            type="checkbox"
                                            name="prezime"
                                            checked = {isChecked}
                                            onChange={handleCheckboxChange}
                                            
                                        />
                                        Čipiran
                                    </label>
                                </div>
                                <div>
                                    <label className='pregledLabel'>
                                        Datum zadnjeg pregleda:
                                        <input
                                            id='pregled'
                                            type="date"
                                            name="prezime"
                                            value = {selectedDate}
                                            onChange={handleDateChange}
                                            required
                                        />
                                        
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="message-box">
                            <label>
                                Opis:
                                <br></br>
                                <textarea id="message-input1" placeholder="Upisite opis"></textarea>
                            </label>

                        </div>

                        <button id="submitButton" type="submit" >Posalji poruku</button>

                    </form>
                </div>
            </div>
        )

}


export default Unos