import '../styles/PopisObavijesti.css'
import {FaTrash} from 'react-icons/fa'
function PopisObavijesti({obavijest}) {


    return(
        <div className='obavijestBox'>
            <div className='naslovLabel' style={{backgroundColor: obavijest.vazno ? 'rgb(208, 56, 56, 0.50)' : '#d3cece' }}>
                <p className='naslovObavijesti'>{obavijest.naslov}</p>
                <div className='datumIDelete'>
                <p className='datumObavijesti'>{obavijest.datum}</p> 
                <button id='trashButton'>
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