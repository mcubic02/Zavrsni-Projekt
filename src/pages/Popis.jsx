import axios from "axios"
import '../styles/Popis.css'
import { useState, useEffect } from "react";
import Zivotinja from "../components/Zivotinja";
import Filter from "../components/Filter";

function Popis({checked, zivotinje, postaviZivotinje}) {
    
    const [selectedOption1, setSelectedOption1] = useState("svi");
    const [selectedOption2, setSelectedOption2] = useState("sviUdomljeni");
    const [reRender, setReRender] = useState("");
    
    useEffect(() => {
    const dohvacanje = async () => {
        const dohvacanjeZivotinja = axios.get("/zivotinje");

        try {

            postaviZivotinje((await dohvacanjeZivotinja).data);
            console.log(zivotinje);
        } catch (error) {
            console.log(error);
        }
    };

    dohvacanje();
}, []);
    return (
        <div className="popisBox">
        <div className="left">
           <Filter 
           selectedOption1={selectedOption1} 
           setSelectedOption1={setSelectedOption1} 
           selectedOption2={selectedOption2} 
           setSelectedOption2={setSelectedOption2}
           />
        </div>
        <div className="right">
            {zivotinje.map((zivotinja) => (
                <Zivotinja 
                zivotinja={zivotinja} 
                postaviZivotinje = {postaviZivotinje} 
                checked={checked}
                selectedOption1={selectedOption1} 
                selectedOption2={selectedOption2} 
                reRender= {reRender}
                setReRender = {setReRender}
                />
            ))}
        </div>
        </div>
    
    )
}


export default Popis