import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
export function HistoricoUso() {
  return (

    <div className="flex">
      <AreaWorkGeral
        NewText={`Historico de Uso`}
        titles={["Nome", "Cargo", "Email", "Telefone"]}
      />
    </div>
  );
}