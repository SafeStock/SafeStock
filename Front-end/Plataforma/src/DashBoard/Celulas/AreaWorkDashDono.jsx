import { AreaKPIsDonoLateralEsquerda } from "../Moleculas/AreaKPIsDono";
import { AreaKPIsLateralDireita } from "../Moleculas/AreaKPIsDono";

export function AreaWorkDashDono({displayParaDash ="none"}) {
    return(
        <div className="h-full w-full items-start  flex-row bg-transparent" style={{display: displayParaDash}}>
            <AreaKPIsDonoLateralEsquerda/>
            <AreaKPIsLateralDireita/>
        </div>
    );
}