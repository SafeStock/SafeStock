import { AreaKPIsDonoLateralEsquerda } from "../Moleculas/AreaKPIsDono";
import { AreaKPIsLateralDireita } from "../Moleculas/AreaKPIsDono";

export function AreaWorkDashDono() {
  return (
    <div className="flex flex-row w-full bg-transparent ">
      <AreaKPIsDonoLateralEsquerda />
      <AreaKPIsLateralDireita />
    </div>
  );
}
