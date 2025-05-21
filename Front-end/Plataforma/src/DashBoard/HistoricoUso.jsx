import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
export function HistoricoUso() {
  return (

    <div className="flex justify-end items-end">
      <AreaWorkGeral
        NewText={`Historico de Uso`}
        titles={["Nome", "Sobrenome", "Cargo", "Email", "Telefone", "Fome"]}
      />
    </div>
  );
}