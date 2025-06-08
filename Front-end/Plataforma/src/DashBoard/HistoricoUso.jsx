import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
export function HistoricoUso() {

  const cargo = sessionStorage.getItem('cargo');
  let display = 'none';

  if (cargo === 'limpeza') {
    display = 'flex';
  }
  return (

    <div className="flex overflow-hidden">
      <AreaWorkGeral
        NewText={`Historico de Uso`}
        titles={["Produto", "Quantidade", "Data de Validade", "Data de Saída"]}
        tabela="registroUso"
        campos={["produto", "quantidade", "dataValidade","dataHoraSaida"]}
        displayButton={display}
      />
    </div>
  );
}