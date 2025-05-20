import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
export function HistoricoUso() {
  return (

    <div className="relative left-[18vh]">
      <AreaWorkGeral
        NewText={`Historico de Uso`}
        titles={["Nome", "Sobrenome", "Cargo", "Email", "Telefone", "Fome"]}

      />
    </div>
  );
}