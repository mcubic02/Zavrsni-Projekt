function Donirano({donacija}) {
    if(donacija.kategorija === "donirano")
    return(
        <tr>
            <td>{donacija.tip}</td>
            <td>{donacija.vrijednost}</td>
            <td>{donacija.opis}</td>
        </tr>
    )
}

export default Donirano
