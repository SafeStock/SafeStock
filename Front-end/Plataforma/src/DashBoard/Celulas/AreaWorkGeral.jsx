import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "../Celulas/AreaWork";
import { AreaWorkDashDono } from "./AreaWorkDashDono";

export function AreaWorkGeral({
  NewText,
  DisplayFlexParaFuncionarios,
  DisplayParaDashGeral,
  abrirModal
}) {
  return (
    <div className="h-[100vh] w-full bg-transparent items-center flex flex-col">
      
      <AreaTittle texto={NewText} />

      <AreaWork
        displayFuncionarios={DisplayFlexParaFuncionarios}
        abrirModal={abrirModal} // ← Passa para o componente filho
      />

      <AreaWorkDashDono displayParaDash={DisplayParaDashGeral} />
    </div>
  );
}
