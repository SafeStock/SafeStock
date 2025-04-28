import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function TelaFuncionarios() {

  return (
    <FundoPadrao>
      <NavBarArea/>

      <AreaWorkGeral 
      NewText="Funcionários" 
      DisplayPadrao='none' 
      DisplayFlexParaFuncionarios='flex'
      DisplayParaDashGeral='none'
      />
      
    </FundoPadrao>
  );
}