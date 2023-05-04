import { useState, useEffect } from 'react'
import '../styles/Donacije.css'
import axios from 'axios';
import DonacijeForma from '../components/DonacijeForma';

function Donacije({checked}) {



    const [donacije, postaviDonacije] = useState({});
    const [showForm, setShowForm] = useState(false);

    function formShow() {
        setShowForm(true);
    }

    useEffect(() => {
        axios.get("/donacije").then((res) => postaviDonacije(res.data));
    }, [])
    console.log(donacije);

    return (
        <div className='donacije'>
            <div className='novaDonacija'>
                <button id='novaDonacijaButton' onClick={formShow}>Nova Donacija</button>
            </div>
            {showForm ?
                <DonacijeForma setShowForm={setShowForm} postaviDonacije={postaviDonacije} checked={checked}/>
                :
                ""
            }

        </div>

    )
}


export default Donacije