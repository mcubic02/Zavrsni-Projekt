import { useEffect, useState } from 'react'
import '../styles/Zivotinja.css'
import axios from 'axios';

function Zivotinja({ zivotinja, checked, postaviZivotinje, selectedOption1, selectedOption2 }) {

    const [mijenjamo, postaviMijenjamo] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [isChecked, setIsChecked] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false);
    const [udomljenaZivotinja, setUdomljenaZivotinja] = useState(false);
    const [text, setText]= useState("");
    const [selectedDate,setSelectedDate]=useState("");
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        vrsta: "",
        cip: "",
        godine: "",
        opis: "",
        pregled: "",
        udomljen:""
    });
    
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }
    function handleCheckboxChange(event) {
        if(isChecked)
            setIsChecked(false);
        else
            setIsChecked(true);
    }
    function handleCheckboxChange1(event) {
        if(isChecked1)
            setIsChecked1(false);
        else
            setIsChecked1(true);
    }
    const handleOptionClick = (event) => {
        setSelectedOption(event.target.value);
    }
    async function udomiZivotinju() {

        await axios.patch(`/zivotinje/${zivotinja.id}`, { udomljen: true });
        const rezultat = await axios.get("/zivotinje");
        postaviZivotinje(rezultat.data);
        
    }

    function Uredi() {
        console.log(zivotinja);
        postaviPodatke(zivotinja);

        console.log(formaPodaci);
        
        postaviMijenjamo(true);
    }
    function obradiPodatke(objekt) {
        console.log(objekt);
        return {
                ime: objekt.ime,
                vrsta: objekt.vrsta,
                cip: objekt.cip,
                godine: objekt.godine,
                opis: objekt.opis,
                pregled: objekt.pregled,
                udomljen: objekt.udomljen
        
        };
    }

    
    async function Spremi() {
        
        const zaSlanje = obradiPodatke(formaPodaci);
        await axios.put(`/zivotinje/${zivotinja.id}`, zaSlanje);
        const rezultat = await axios.get(`/zivotinje`);
        postaviPodatke(rezultat.data);
        postaviMijenjamo(false);
    }

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    useEffect(() => {
        if (zivotinja.udomljen === true) {
            setUdomljenaZivotinja("udomljen");
        }
        else
            setUdomljenaZivotinja("neUdomljen");
    }, [])
    if ((selectedOption1 === "svi" || selectedOption1 === zivotinja.vrsta) && (selectedOption2 === "sviUdomljeni" || selectedOption2 === udomljenaZivotinja))

        return (<>
            {mijenjamo ?
                <div className='zivotinjaBox' style={{ backgroundColor: zivotinja.udomljen ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
                    <p className='imeGodine'>
                        <input
                            className='ime1'
                            type="ime"
                            name="ime"
                            value={formaPodaci.ime}
                            onChange={promjenaUlaza}
                            required
                        />
                        ,
                        <input
                            className='dobLabel1'
                            type="number"
                            name="godine"
                            value={formaPodaci.godine}
                            onChange={promjenaUlaza}
                        />
                    </p>
                    <div className='options1'>
                    <p> 
                            <label>
                                Vrsta:
                                <input
                                    className='radio1'
                                    type="radio"
                                    value="pas"
                                    checked={selectedOption === 'pas'}
                                    onChange={handleOptionClick}
                                />
                                Pas
                            </label>
                            <label>

                                <input
                                    className='radio1'
                                    type="radio"
                                    value="mačka"
                                    checked={selectedOption === 'mačka'}
                                    onChange={handleOptionClick}
                                />
                                Mačka
                            </label>
                            <label className='radioLabel1'>

                                <input
                                    className='radio1'
                                    type="radio"
                                    value="ostalo"
                                    checked={selectedOption === 'ostalo'}
                                    onChange={handleOptionClick}
                                />
                                Ostalo
                            </label>

                    </p>
                    </div>
                    <p>
                        <label className='checkboxLabel1'>
                            <input
                                className='checkbox1'
                                type="checkbox"
                                name="prezime"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            Čipiran
                        </label>
                    </p>
                    <div className="message-boxx">
                    <p>
                            <label>
                                Opis:
                                <textarea id="message-inputt" placeholder="Upisite opis" value={formaPodaci.opis} ></textarea>
                            </label>
                            </p>
                    </div>
                    <p>
                    <label className='pregledLabel'>
                                        Pregled:
                                        <input
                                            id='pregled'
                                            type="date"
                                            name="prezime"
                                            value = {selectedDate}
                                            onChange={handleDateChange}
                                            required
                                        />
                                        
                                    </label>
                    </p>
                    <p>
                    <label className='checkboxLabel1'>
                            <input
                                className='checkbox1'
                                type="checkbox"
                                name="udomljen"
                                checked={isChecked1}
                                onChange={handleCheckboxChange1}
                                required
                            />
                            Udomljen
                        </label>
                    </p>
                    <button className='zivotinjeButton' onClick={Spremi} >Spremi</button>
                </div>

                :

                <div className="zivotinjaBox" style={{ backgroundColor: zivotinja.udomljen ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
                    <p className='imeGodine'>{zivotinja.ime}, {zivotinja.godine} </p>
                    <p>Vrsta: {zivotinja.vrsta}</p>
                    <p>{zivotinja.cip ? "Čipiran" : "Nije Čipiran"}</p>
                    <p>{zivotinja.opis}</p>
                    <p>Pregled: {zivotinja.pregled}</p>
                    {zivotinja.udomljen ? <p className='udomljen' >UDOMLJEN!</p> : <button id='udomljenButton' onClick={udomiZivotinju}>Udomi</button>}
                    {checked ? <button className='zivotinjeButton' onClick={Uredi}>Uredi</button> : ""}
                </div>
            }
        </>
        )
    else
        return ("");

}

export default Zivotinja