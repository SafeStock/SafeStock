import { AreaKPIsDonoLateralEsquerda } from "../Moleculas/AreaKPIsDono";
import { AreaKPIsLateralDireita } from "../Moleculas/AreaKPIsDono";

export function AreaWorkDashDono() {
  return (
    <div className="flex justify-center items-start h-[85vh] w-[100vw]">
      <AreaKPIsDonoLateralEsquerda />
      <AreaKPIsLateralDireita
      NavigateOn="block"
       />
    </div>
  );
}
