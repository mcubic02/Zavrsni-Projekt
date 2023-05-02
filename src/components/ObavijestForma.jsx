import '../styles/ObavijestForma.css'
function ObavijestForma({checked}) {
    return (
        <div className='obavijestForma'>
            <p className='kontaktNaslov1'>Unesite novu obavijest:</p>
            <form>
                <label>
                    <p className='obavijestiNaslov'>Naslov:</p>
                    <input
                        className='naslovInput'
                        type='text'
                        name='naslov'
                        required
                    >
                    </input>
                </label>
                <div id='message-box3'>
                    <label>
                        Tekst:
                        <br></br>
                        <textarea id="message-input2" placeholder="Type your message here"></textarea>
                    </label>
                </div>
                {checked ? 
                <div>
                    <label className='checkboxLabel2'>
                        <input
                            className='checkbox2'
                            type="checkbox"
                            name="važno"
                            required
                        />
                        Važno
                    </label>
                </div>
                :
                ""
                }
                
                <button className='submitButton'>Objavi</button>
            </form>
        </div>
    )
}

export default ObavijestForma