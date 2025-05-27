import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";


export function TelaProdutos() {
  

  return (
    <div className="flex">
      <AreaWorkGeral
        NewText="Produtos"
        titles={["Nome", "Categoria", "Quantidade", "Limite", "Data de Validade", "Data de Entrada"]}
        tabela="produtos"
        campos={["nome", "categoriaProduto","quantidade", "limiteSemanalDeUso", "dataValidade", "dataEntrada"]}
      />
    </div>
  );
}