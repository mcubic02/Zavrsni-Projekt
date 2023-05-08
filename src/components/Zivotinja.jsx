import { useEffect, useState, useContext } from 'react'
import '../styles/Zivotinja.css'
import axios from 'axios';
import CheckedContext from '../context/CheckedContext';


function Zivotinja({ zivotinja, postaviZivotinje, selectedOption1, selectedOption2 }) {

    const {checked, handleChange} = useContext(CheckedContext);
    const [mijenjamo, postaviMijenjamo] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [udomljenaZivotinja, setUdomljenaZivotinja] = useState(false);
    const [selectedDate,setSelectedDate]=useState(null);
    const [podatci, postaviPodatkee] = useState({});
    
    const handleDateChange = (event) => {
        event.preventDefault();
        setSelectedDate(event.target.value);
        promjenaUlaza(event);
        console.log(event.target.value);
        console.log(selectedDate);
    }
    function handleCheckboxChange(event) {
        event.preventDefault();
        setIsChecked(event.target.checked);
        promjenaUlaza(event);
    }
    function handleCheckboxChange1(event) {
        event.preventDefault();
        setIsChecked1(event.target.checked);
        promjenaUlaza({...podatci,udomljen : event.target.checked});
    }
    const handleOptionClick = (event) => {
        event.preventDefault();
        setSelectedOption(event.target.value);
        console.log(selectedOption);
        promjenaUlaza(event);
    }
    async function udomiZivotinju() {

        await axios.patch(`/zivotinje/${zivotinja.id}`, { udomljen: true });
        const rezultat = await axios.get("/zivotinje");
        postaviZivotinje(rezultat.data);
        
    }

    function Uredi() {
            setIsChecked(zivotinja.cip);
            setIsChecked1(zivotinja.udomljen);
        const dohvacanje = async () => {
            const dohvacanjeZivotinje = axios.get(`/zivotinje/${zivotinja.id}`);
            try {
                postaviPodatkee((await dohvacanjeZivotinje).data);
            } catch (error) {
                console.log(error);
            }
            setSelectedOption((await dohvacanjeZivotinje).data.vrsta);
            setSelectedDate((await dohvacanjeZivotinje).data.pregled);
        };
        dohvacanje();
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
        
        const zaSlanje = obradiPodatke(podatci);
        await axios.put(`/zivotinje/${zivotinja.id}`, zaSlanje);
        const rezultat = await axios.get(`/zivotinje`);
        postaviPodatkee(rezultat.data);
        postaviMijenjamo(false);
       
    }

    function promjenaUlaza (event){
        console.log(podatci.cip);
        postaviPodatkee({ ...podatci, [event.target.name]: event.target.value });
        
        console.log(podatci);
    }

    useEffect(() => {
        console.log(checked);
        
        if (zivotinja.udomljen === true)  {
            setUdomljenaZivotinja("udomljen");
        }
        else if(zivotinja.udomljen === false)
            setUdomljenaZivotinja("neUdomljen");
    }, [])
    if ((selectedOption1 === "svi" || selectedOption1 === zivotinja.vrsta) && (selectedOption2 === "sviUdomljeni" || selectedOption2 === udomljenaZivotinja))

        return (<>
            {mijenjamo ?
                <div className='zivotinjaBox' style={{ backgroundColor: zivotinja.udomljen ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
                    <form onSubmit={Spremi}>
                    <p className='imeGodine'>
                        <input
                            className='ime1'
                            type="ime"
                            name="ime"
                            value={podatci.ime || ""}
                            onChange={promjenaUlaza}
                            
                        />
                        ,
                        <input
                            className='dobLabel1'
                            type="number"
                            name="godine"
                            value={podatci.godine || ""}
                            onChange={promjenaUlaza}
                        />
                    </p>
                    <div className='options1'>
                    <p> 
                            <label>
                                Vrsta:
                                <input
                                    className='radio1'
                                    name='vrsta'
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
                                    name='vrsta'
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
                                    name='vrsta'
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
                                name="cip"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                value={isChecked}
                            />
                            Čipiran
                        </label>
                    </p>
                    <div className="message-boxx">
                    <p>
                            <label>
                                Opis:
                                <input type="text" id="message-inputt" name="opis" placeholder="Upisite opis" value={podatci.opis} onChange={promjenaUlaza}></input>
                            </label>
                            </p>
                    </div>
                    <p>
                    <label className='pregledLabel'>
                                        Pregled:
                                        <input
                                            id='pregled'
                                            type="date"
                                            name="pregled"
                                            value = {selectedDate}
                                            onChange={handleDateChange}
                                            
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
                            />
                            Udomljen
                        </label>
                    </p>
                    <button className='zivotinjeButton' >Spremi</button>
                    </form>
                </div>

                :

                <div className="zivotinjaBox" style={{ backgroundColor: zivotinja.udomljen ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
                    <p className='imeGodine'>{zivotinja.ime}, {zivotinja.godine} </p>
                    <p>Vrsta: {zivotinja.vrsta}</p>
                    <p>{zivotinja.cip || zivotinja.cip === "on" ? "Čipiran" : "Nije Čipiran"}</p>
                    <p>{zivotinja.opis}</p>
                    <p>Pregled: {zivotinja.pregled}</p>
                    {checked ? "":zivotinja.udomljen ? <p className='udomljen' >UDOMLJEN!</p> : <button id='udomljenButton' onClick={udomiZivotinju}>Udomi</button>}
                    {checked ? <button className='zivotinjeButton' onClick={Uredi}>Uredi</button> : ""}
                </div>
            }
        </>
        )
    else
        return ("");

}

export default Zivotinja