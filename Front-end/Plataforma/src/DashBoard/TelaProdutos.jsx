import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";


export function TelaProdutos() {
  

  return (
    <div className="flex">
      <AreaWorkGeral
        NewText="Produtos"
        titles={["Produto"]}
        
      />
    </div>
  );
}