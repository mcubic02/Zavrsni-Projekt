import '../styles/OdgovoriForme.css'

function OdgovoriForme ({poruka}){
    return(
    <div className='poruka'>
        <p className='porukaOd'>Poruka od: {poruka.ime} {poruka.prezime}</p>
        <p className='porukaKontakt'>Kontakt: {poruka.mail}</p>
        <p className='poslanaPoruka'>{poruka.poruke}</p>
    </div>
    )
}

export default OdgovoriForme