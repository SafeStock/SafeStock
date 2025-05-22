import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function HistoricoAlertas() {

  return (
    <div className="flex">
      <AreaWorkGeral
        NewText={`Historico de Alertas`}
        titles={["Alerta", "Status", "Data e Hora"]}
      />

    </div>
  );
}
