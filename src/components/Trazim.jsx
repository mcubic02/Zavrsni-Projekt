function Trazim({donacija}) {
    if(donacija.kategorija === "trazi")
    return(
        <tr>
            <td>{donacija.tip}</td>
            <td>{donacija.vrijednost}</td>
            <td>{donacija.opis}</td>
        </tr>
    )
}

export default Trazim
