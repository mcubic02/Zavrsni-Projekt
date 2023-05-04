import { useState, useEffect } from 'react'
import '../styles/Donacije.css'
import axios from 'axios';
import DonacijeForma from '../components/DonacijeForma';
import PopisDonacija from '../components/PopisDonacija';
import Trazim from '../components/Trazim';
import Nudim from '../components/Nudim';
import Donirano from '../components/Donirano';

function Donacije({checked}) {



    const [donacije, postaviDonacije] = useState([]);
    const [showForm, setShowForm] = useState(false);

    function formShow() {
        setShowForm(true);
    }

     
    useEffect(() => {
        const dohvacanje = async () => {
            const dohvacanjeDonacija = await axios.get("/donacije");
    
            try {
    
                postaviDonacije(dohvacanjeDonacija.data);
                console.log(donacije);
            } catch (error) {
                console.log(error);
            }
        };
    
        dohvacanje();
    }, []);
    
    console.log(donacije);

    return (
        <div className='donacije'>
            <div className='novaDonacija'>
                <button id='novaDonacijaButton' onClick={formShow}>Nova Donacija</button>
            
            {showForm ?
                <DonacijeForma setShowForm={setShowForm} postaviDonacije={postaviDonacije} checked={checked}/>
                :
                ""
            }
            </div>
            <div className='popisDonacija'>
                <table className='tablicaTrazim'>
                    <tr>Tražimo:</tr>
                    {donacije.map((donacija)=>(
                    <Trazim donacija={donacija}/>
                    ))}
                    
                </table>
                <table className='tablicaNudim'>
                    <tr>Nudim:</tr>
                    {donacije.map((donacija)=>(
                    <Nudim donacija={donacija}/>
                    ))}
                    
                </table>
                <table className='tablicaDonirano'>
                    <tr>Donirano:</tr>
                    {donacije.map((donacija)=>(
                    <Donirano donacija={donacija}/>
                    ))}
                    
                </table>
              
            </div>

        </div>

    )
}


export default Donacije