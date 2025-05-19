import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "../Celulas/AreaWork";
import { AreaWorkDashDono } from "./AreaWorkDashDono";
import { AreaWorkHistoricoUso } from "../Celulas/AreaWorkHistoricoUso";
import { AreaWorkHistoricoAlerta } from "../Celulas/AreaWorkHistoricoAlerta";
import { AreaWorkProdutos } from "../Celulas/AreaWorkProdutos";

export function AreaWorkGeral({
  NewText,
  DisplayFlexParaFuncionarios,
  DisplayParaDashGeral,
  DisplayHistoricoAlerta,
  DisplayHistoricoUso,
  DisplayParaProdutos,
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

      <AreaWorkProdutos 
      displayParaProdutos={DisplayParaProdutos} 
      abrirModal={abrirModal}
      />
      
      <AreaWorkDashDono displayParaDash={DisplayParaDashGeral} />
    </div>
  );
}

