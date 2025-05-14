import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function TelaFuncionarios() {

  return (
    <FundoPadrao>
      <NavBarArea/>

      <AreaWorkGeral 
      NewText="Funcionários" 
      DisplayFlexParaFuncionarios='flex'
      DisplayParaDashGeral='none'
      />
      
    </FundoPadrao>
  );
}