import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
export function HistoricoUso() {
  return (

    <div className="flex">
      <AreaWorkGeral
        NewText={`Historico de Uso`}
        titles={["Produto", "Quantidade", "Data de Validade", "Data de Saída"]}
        tabela="registroUso"
        campos={["produto","quantidade","dataValidade","dataHoraSaida"]}
      />
    </div>
  );
}