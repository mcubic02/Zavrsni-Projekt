import { useEffect, useState } from "react"
import Donirano from "./Donirano"
import Nudim from "./Nudim"
import Trazim from "./Trazim"

function PopisDonacija({donacija}) {

    const[donirano, postaviDonirano] = useState(false);
    const[trazim, postaviTrazim] = useState(false);
    const[nudim, postaviNudim] = useState(false);
    useEffect(() => {
        if(donacija.kategorija === "trazi")
        postaviTrazim(true);
    else if(donacija.kategorija === "nudi")
        postaviNudim(true);
    else    
        postaviDonirano(true);
    },[])
    
    return(
        <div className="popisDonacija">
            <div className="trazim">
                <table>
                    <tr>
                        Tražimo:
                    </tr>
                
                    <tr>{trazim ? <Trazim/> : ""} </tr>
                    </table>
            </div>
            <div className="nudim">
                <table>
                        <tr>
                            Nudim:
                        </tr>
                    
                        <tr>{nudim ? <Nudim/> : ""} </tr>
                </table>
            </div>
            <div className="donirano">
            {donirano ? <Donirano/> : ""}
            </div>
            
        </div>
    )
}

export default PopisDonacija
