import { AreaKPIsDonoLateralEsquerda } from "../Moleculas/AreaKPIsDono";
import { AreaKPIsLateralDireita } from "../Moleculas/AreaKPIsDono";

export function AreaWorkDashDono() {
  return (
    <div className="flex justify-center items-center h-[80vh] w-[90vw]">
      <AreaKPIsDonoLateralEsquerda />
      <AreaKPIsLateralDireita />
    </div>
  );
}
