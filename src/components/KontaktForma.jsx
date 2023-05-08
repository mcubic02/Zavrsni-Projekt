import { useState, useEffect } from 'react'
import '../styles/KontaktForma.css'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";

function KontaktForma({postaviPoruke}) {

    const [showMessage, setShowMessage] = useState(false);
    const [formaPodaci, postaviPodatke] = useState({
         ime: "",
         prezime: "",
         mail: "",
         poruke: ""
     });
    //  const refreshPage = () => {
    //     window.location.reload();
    //   };
     function obradiPodatke(objekt) {
        return {
            
                ime: objekt.ime,
                prezime: objekt.prezime,
                mail: objekt.mail,
                poruke: objekt.poruke,
                datum: objekt.datum
            
        };
    }

   
    const saljiPodatke = async (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('message-input');
        formaPodaci.poruke = messageInput.value;
        messageInput.value='';
        formaPodaci.datum = new Date();
        const zaSlanje = obradiPodatke(formaPodaci);
        await axios.post("/poruke", zaSlanje);

        const rezultat = await axios.get("/poruke");

      
        postaviPoruke(rezultat.data);

        setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);

        postaviPodatke(
            {
            ime: "",
            prezime: "",
            mail: "",
            poruke: "",
            datum:""
        })
        // refreshPage();
    };

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    };

    // const [poruka, saljiPoruku] = useState(false); 
    // const  [ime, postaviIme] = useState("");
    // const [imee, promjenaImena] = useState(false);
    // const promjenaUlaza = (event) => {
    //     const { ime } = event.target;

    //     postaviPodatke({ ...formaPodaci, [ime]: value });
    // };
    return(
        
            showMessage ? 
            <p className='messageSent'>Poruka je poslana!</p>
            :
            <div className="kontaktForma">
            <p className='kontaktNaslov'>Kontaktirajte nas!</p>
            <form onSubmit={saljiPodatke}>
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
                    <label>
                        Prezime:
                        <br></br>
                        <input
                            
                            type="prezime"
                            name="prezime"
                            value={formaPodaci.prezime}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <br></br>
                        <input
                            className='email'
                            type="email"
                            name="mail"
                            value={formaPodaci.mail}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div className="message-box">
                    <label>
                        Poruka:
                        <br></br>
                        <textarea id="message-input" placeholder="Type your message here"></textarea>
                    </label>
                     
                </div>

                <button id="submitButton1" type="submit" >Pošalji poruku</button>

            </form>

        </div>
            
    )
}

export default KontaktForma