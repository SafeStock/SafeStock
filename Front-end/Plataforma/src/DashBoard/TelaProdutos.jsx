import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";


export function TelaProdutos() {
  

  return (
    <div className="flex justify-end items-end">
      <AreaWorkGeral
        NewText="Produtos"
        titles={["Produto"]}
        
      />
    </div>
  );
}