import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function TelaFuncionarios() {
  return (
    <div className="relative left-[18vh]">
      <AreaWorkGeral
        NewText={`Funcionários`}
        titles={["Nome","SobreNome"]}

      />
    </div>
  );
}
