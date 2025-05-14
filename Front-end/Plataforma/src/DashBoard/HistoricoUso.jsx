import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { AreaSubTitle } from "../DashBoard/Moleculas/AreaSubTitle";

export function HistoricoUso() {

  return (
    <FundoPadrao>
      <NavBarArea/>
      
      <AreaWorkGeral
              NewText={`Historico de Uso`}
              DisplayPadrao='flex'
              DisplayFlexParaFuncionarios='none'
              DisplayParaDashGeral='none'
              DisplayHistoricoUso='flex'
              DisplayHistoricoAlerta='none'
            />
            <AreaSubTitle title1="Produto"/>
    </FundoPadrao>
    
  );
}