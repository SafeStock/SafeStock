import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "../Celulas/AreaWork";
import { AreaWorkDashDono } from "./AreaWorkDashDono";
import { AreaWorkHistoricoUso } from "../Celulas/AreaWorkHistoricoUso";
import { AreaWorkHistoricoAlerta } from "../Celulas/AreaWorkHistoricoAlerta";

export function AreaWorkGeral({
  NewText,
  DisplayFlexParaFuncionarios,
  DisplayParaDashGeral,
  DisplayHistoricoAlerta,
  DisplayHistoricoUso,
  abrirModal
}) {
  return (
    <div className="h-[100vh] w-full bg-transparent items-center flex flex-col">
      
      <AreaTittle texto={NewText} />

      <AreaWork
        displayFuncionarios={DisplayFlexParaFuncionarios}
        displayHistoricoAlerta={DisplayHistoricoAlerta}
        displayHistoricoUso={DisplayHistoricoUso}
        abrirModal={abrirModal} // ← Passa para o componente filho
      />
      <AreaWorkDashDono displayParaDash={DisplayParaDashGeral} />
    </div>
  );
}

