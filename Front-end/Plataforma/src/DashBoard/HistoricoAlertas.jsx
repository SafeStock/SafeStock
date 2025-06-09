import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function HistoricoAlertas() {

  return (
    <div className="flex overflow-hidden">
      <AreaWorkGeral
        NewText={`Historico de Alertas`}
        titles={["Alerta" ,"Produto" , "Status", "Data e Hora"]}
        tabela={"historicoAlertas"}
        campos={["status","produto.nome","descricao","dataHora"]}
      />

    </div>
  );
}
