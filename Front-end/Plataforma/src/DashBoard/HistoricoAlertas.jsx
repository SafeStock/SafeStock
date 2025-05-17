import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function HistoricoAlertas() {

  return (
    <FundoPadrao>
      <NavBarArea/>
      <AreaWorkGeral
              NewText={`Historico de Alertas`}
            />
    </FundoPadrao>
  );
}