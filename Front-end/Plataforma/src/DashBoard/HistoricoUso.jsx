import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";


export function HistoricoUso() {

  return (
    <FundoPadrao>
      <NavBarArea/>
      <AreaWorkGeral
              NewText={`Historico de Uso`}
              DisplayPadrao='flex'
              DisplayFlexParaFuncionarios='none'
              DisplayParaDashGeral='none'
            />
    </FundoPadrao>
  );
}