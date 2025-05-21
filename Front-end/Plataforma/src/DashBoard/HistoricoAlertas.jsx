import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function HistoricoAlertas() {

  return (
    <div className="flex justify-end items-end">
      <AreaWorkGeral
        NewText={`Historico de Alertas`}
        titles={["Numzei"]}
      />

    </div>
  );
}
