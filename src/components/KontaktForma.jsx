import { useState } from 'react'
import '../styles/KontaktForma.css'
import axios from 'axios';

function KontaktForma() {
  
    const [formaPodaci, postaviPodatke] = useState({
         ime: "",
         prezime: "",
         mail: "",
        poruka: ""
     });
    // const [poruka, saljiPoruku] = useState(false); 
    // const  [ime, postaviIme] = useState("");
    // const [imee, promjenaImena] = useState(false);
    // const promjenaUlaza = (event) => {
    //     const { ime } = event.target;

    //     postaviPodatke({ ...formaPodaci, [ime]: value });
    // };
    return(
        <div className="kontaktForma">
            <form >
                <div>
                    <label>
                        Ime:
                        <input
                            className='ime'
                            type="ime"
                            name="imee"
                           
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Prezime:
                        <input
                            
                            type="prezime"
                            name="prezime"
                           
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            className='email'
                            type="email"
                            name="email"
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

                <button id="submitButton" type="submit" >Posalji poruku</button>

            </form>
        </div>
    )
}

export default KontaktForma