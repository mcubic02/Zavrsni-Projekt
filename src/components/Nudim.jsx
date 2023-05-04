function Nudim({donacija}) {
    if(donacija.kategorija === "nudi")
    return(
        <tr>
            <td>{donacija.tip}</td>
            <td>{donacija.vrijednost}</td>
            <td>{donacija.opis}</td>
        </tr>
    )
}

export default Nudim
