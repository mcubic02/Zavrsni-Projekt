import { useState, useEffect } from 'react';
import '../styles/Kontakt.css'
import axios from 'axios'

function Kontakt({checked}) {

    const [kontakt, postaviKontakt] = useState([]);
    const [uredivanje, postaviUredivanje] = useState(false);

    function Uredi(){
        postaviUredivanje(true);
    }
    useEffect(() => {
        const dohvacanje = async () => {
            const dohvacanjeKontakta = axios.get("/kontakt");
    
            try {
                postaviKontakt((await dohvacanjeKontakta).data);
            } catch (error) {
                console.log(error);
            }
        };
    
        dohvacanje();
    }, []);

    async function MijenjajKontakt(){
        console.log("Uslko u mijenjaj");
        const zaSlanje = obradiPodatke(kontakt);
        console.log(zaSlanje);
        await axios.put(`/kontakt`,zaSlanje);
        const res = await axios.get(`/kontakt`);
        postaviKontakt(res.data);
        postaviUredivanje(false);
    }

    function obradiPodatke(objekt) {
        console.log("uslp u obradi");
        return {
                ime: objekt.ime,
                adresa: objekt.adresa,
                broj: objekt.broj,
                mail: objekt.mail
        };
    }

    function PromjenaUlaza (event)   {
       const {name, value} = event.target;
       console.log(kontakt.name);
       postaviKontakt({...kontakt,[name]:value});
       console.log(kontakt);
    }

    if(checked)
    {
        if(uredivanje)
        return(
            <div className='kontaktBox'>
                <form onSubmit={MijenjajKontakt}>
                <input
                    type='text'
                    name='ime'
                    value={kontakt.ime}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                <input
                    type='text'
                    name='adresa'
                    value={kontakt.adresa}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                <input
                    type='text'
                    name='broj'
                    value={kontakt.broj}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                <input
                    type='email'
                    name='mail'
                    value={kontakt.mail}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                 <button id='spremiKontakt'  type='submit'>Spremi</button>
                </form>
                </div>
        )
        else
        return(
            <div className="kontaktBox">
                <p>{kontakt.ime}</p>
                <p>{kontakt.adresa}</p>
                <p>{kontakt.broj}</p>
                <p>{kontakt.mail}</p>
                <button id='urediKontakt' onClick={Uredi}>Uredi</button>
            </div>
        )
    }
    else
    return(
        <div className="kontaktBox">
                <p>{kontakt.ime}</p>
                <p>{kontakt.adresa}</p>
                <p>{kontakt.broj}</p>
                <p>{kontakt.mail}</p>
                </div>
    )
}

export default Kontakt