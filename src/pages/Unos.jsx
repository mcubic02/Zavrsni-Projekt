import { useState, useContext } from 'react'
import '../styles/Unos.css'
import axios from 'axios';
import CheckedContext from '../context/CheckedContext';

function Unos({ postaviZivotinje }) {

    const { checked, handleChange } = useContext(CheckedContext);
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
        udomljen: "neUdomljen"
    });

    const unesiZivotinju = async (event) => {
        event.preventDefault();
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
                udomljen: ""
            }
        )
    }

    function handleCheckboxChange(event) {
        if (isChecked){
            setIsChecked(false);
            formaPodaci.cip = "neCipiran"
        }
        else
        {
            setIsChecked(true);
            formaPodaci.cip = "cipiran"
        }
    
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        promjenaUlaza(event);
    }

    const handleOptionClick = (event) => {
        setSelectedOption(event.target.value);
        console.log(event.target.value);
        promjenaUlaza(event);
    }

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);

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
            udomljen: "neUdomljen"

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
                    <p className='unosNaslov'>Unos nove životinje</p>
                    <form onSubmit={unesiZivotinju}>
                        <div className='flexForma'>
                            <div className='left'>
                                <div className='divIme'>
                                    <label>
                                        Ime:
                                        <br></br>
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
                                        <br></br>
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
                                <div className="message-box1">
                                    <label>
                                        Opis:
                                        <br></br>
                                        <textarea id="message-input1" placeholder="Upisite opis" name='opis' value={formaPodaci.opis} onChange={promjenaUlaza}></textarea>
                                    </label>

                                </div>

                            </div>
                            <div className='right'>
                                <div className='pregledDiv'>
                                    <label className='pregledLabel'>
                                        Datum zadnjeg pregleda:
                                        <br></br>
                                        <input
                                            id='pregled'
                                            type="date"
                                            name="pregled"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            required
                                        />

                                    </label>
                                </div>
                                <div>
                                    <label className='checkboxLabel'>
                                        <input
                                            id='checkbox'
                                            type="checkbox"
                                            name="cip"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}

                                        />
                                        Čipiran
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
                                            name='vrsta'
                                            checked={selectedOption === 'pas'}
                                            onChange={handleOptionClick}
                                        />
                                        Pas
                                    </label>
                                    <br></br>
                                    <label>

                                        <input
                                            className='radio'
                                            type="radio"
                                            value="mačka"
                                            name='vrsta'
                                            checked={selectedOption === 'mačka'}
                                            onChange={handleOptionClick}
                                        />
                                        Mačka
                                    </label>
                                    <br></br>
                                    <label className='radioLabel'>

                                        <input
                                            className='radio'
                                            type="radio"
                                            value="ostalo"
                                            name='vrsta'
                                            checked={selectedOption === 'ostalo'}
                                            onChange={handleOptionClick}
                                        />
                                        Ostalo
                                    </label>
                                </div>

                            </div>
                        </div>


                        <button id="submitButton" type="submit" >Unesi životinju</button>

                    </form>
                </div>
            </div>
        )

}


export default Unos