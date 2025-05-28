import { AreaKPIsDonoLateralEsquerda } from "../Moleculas/AreaKPIsDono";
import { AreaKPIsLateralDireita } from "../Moleculas/AreaKPIsDono";

export function AreaWorkDashLimpeza() {
    return(
    <div className="flex justify-center items-start h-[85vh] w-[100vw]">
      <AreaKPIsDonoLateralEsquerda />
      <AreaKPIsLateralDireita 
      NameUse="Registro de Uso"
      buttonNameUse="Registrar Uso"
      />
    </div>
    )
}