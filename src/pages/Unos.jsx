import { useState } from 'react'
import '../styles/Unos.css'

function Unos({ checked }) {

    const [selectedOption, setSelectedOption] = useState("mačka");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

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
                    <form >
                        <div className='flexForma'>
                            <div className='left'>
                                <div className='divIme'>
                                    <label>
                                        Ime:
                                        <input
                                            className='ime'
                                            type="ime"
                                            name="ime"

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
                                            name="prezime"

                                            required
                                        />
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
                                            required
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
                                <textarea id="message-input" placeholder="Upisite opis"></textarea>
                            </label>

                        </div>

                        <button id="submitButton" type="submit" >Posalji poruku</button>

                    </form>
                </div>
            </div>
        )

}


export default Unos