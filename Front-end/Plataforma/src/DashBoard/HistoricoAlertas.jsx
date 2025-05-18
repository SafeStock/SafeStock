import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function HistoricoAlertas() {

  return (
    <FundoPadrao>
      <NavBarArea/>
      <AreaWorkGeral
              NewText={`Historico de Alertas`}
              DisplayPadrao='flex'
              DisplayFlexParaFuncionarios='none'
              DisplayParaDashGeral='none'
              DisplayHistoricoUso='none'
              DisplayHistoricoAlerta='flex'
            />
    </FundoPadrao>
  );
}