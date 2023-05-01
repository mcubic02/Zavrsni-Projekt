import { useState } from 'react';
import '../styles/Filter.css'
function Filter({selectedOption1, setSelectedOption1, selectedOption2, setSelectedOption2}) {
    const handleFilterClick1 = (event) => {
        setSelectedOption1(event.target.value);
    }
    const handleFilterClick2 = (event) => {
        setSelectedOption2(event.target.value);
    }
    return(
       
        
        <div className='filterBox'>
            <p className='filterLabel'>FILTERI</p>
            <div className='top'>
            <p className='vrsteLabel'>Vrste:</p>
            <label>
                <input
                    type="radio"
                    value="svi"
                    checked={selectedOption1 === 'svi'}
                    onChange={handleFilterClick1}
                />
                Svi
            </label>
            <br></br>
            <label>
                
                <input
                    type="radio"
                    value="pas"
                    checked={selectedOption1 === 'pas'}
                    onChange={handleFilterClick1}
                />
                Pas
            </label>
            <br></br>
            <label>
                <input
                    type="radio"
                    value="mačka"
                    checked={selectedOption1 === 'mačka'}
                    onChange={handleFilterClick1}
                />
                Mačka
            </label>
            

            </div>
            <div className='bottom'>
            <p className='statusLabel'>Status:</p>
            <label>
                <input
                    type="radio"
                    value="sviUdomljeni"
                    checked={selectedOption2 === 'sviUdomljeni'}
                    onChange={handleFilterClick2}
                />
                Svi
            </label>
            <br></br>
            <label>
                
                <input
                    type="radio"
                    value="udomljen"
                    checked={selectedOption2 === 'udomljen'}
                    onChange={handleFilterClick2}
                />
                Udomljen
            </label>
            <br></br>
            <label>
                <input
                    type="radio"
                    value="neUdomljen"
                    checked={selectedOption2 === 'neUdomljen'}
                    onChange={handleFilterClick2}
                />
                Nije udomljen
            </label>
            

            </div>
        </div>
    )
}

export default Filter;