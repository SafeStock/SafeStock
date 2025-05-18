import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function HistoricoUso() {

  return (
    <FundoPadrao>
      <NavBarArea/>
      
       <AreaWorkGeral
        NewText= "Historico de Uso"
        DisplayHistoricoUso= "flex"
        DisplayHistoricoAlerta= "none"
        DisplayFlexParaFuncionarios= "none"
      />
    </FundoPadrao>
    
  );
}