import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";


export function TelaProdutos() {
  

  return (
    <FundoPadrao>
      
      <NavBarArea />

      <AreaWorkGeral
        NewText="Produtos"
        titles={["Produto"]}
      />
    </FundoPadrao>
  );
}