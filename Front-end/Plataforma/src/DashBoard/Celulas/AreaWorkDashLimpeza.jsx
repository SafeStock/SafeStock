import { AreaKPIsDonoLateralEsquerda } from "../Moleculas/AreaKPIsDono";
import { AreaKPIsLateralDireita } from "../Moleculas/AreaKPIsDono";

export function AreaWorkDashLimpez() {
    return(
    <div className="flex justify-center items-center h-[82vh] w-[100vw]">
      <AreaKPIsDonoLateralEsquerda />
      <AreaKPIsLateralDireita />
    </div>
    )
}