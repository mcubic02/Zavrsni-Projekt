import '../styles/PopisObavijesti.css'
import {FaTrash} from 'react-icons/fa'
import axios from 'axios';

function PopisObavijesti({obavijest, postaviObavijesti}) {

    async function Delete() {
        await axios.delete(`/obavijesti/${obavijest.id}`);

        const rezultat = await axios.get("/obavijesti");
        postaviObavijesti(rezultat.data);
    }

    return(
        <div className='obavijestBox'>
            <div className='naslovLabel' style={{backgroundColor: obavijest.vazno ? 'rgb(208, 56, 56, 0.50)' : '#d3cece' }}>
                <p className='naslovObavijesti'>{obavijest.naslov}</p>
                <div className='datumIDelete'>
                <p className='datumObavijesti'>{obavijest.datum}</p> 
                <button id='trashButton' onClick={Delete}>
                    <FaTrash/>
                </button>
                </div>
                
            </div>
            <div className='sadrzajObavijesti'>
                <p>{obavijest.tekst}</p>
            </div>
        </div>
        
    )
}

export default PopisObavijesti