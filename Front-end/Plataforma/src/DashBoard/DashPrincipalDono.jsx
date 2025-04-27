import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function DashPrincipalDono() {
  return (
    <FundoPadrao>
      <NavBarArea/>

      <AreaWorkGeral 
      NewText="Boas Vindas Ariadne!" 
      DisplayPadrao='flex' 
      DisplayFlexParaFuncionarios='none'
      DisplayParaDashGeral='flex'
      />

    </FundoPadrao>
  );
}